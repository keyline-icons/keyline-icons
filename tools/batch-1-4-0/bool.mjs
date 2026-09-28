// Region geometry (carried from the 1.3.0 topic batch): boolean ops on closed contours of lines and
// cubics, offsets through the people batch's free-cubic offsetter, and a simplify
// pass that folds its dense output back into arcs and long cubics.
//
// A run is [{t:'L'|'C', p:[...]}]; a Shape is an array of closed runs.
import * as G from '../people/geo.mjs';
const { at, split, sub, add, mul, len, unit, runHits, segLen } = G;
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export { G };

/* ---------------------------------------------------------------- basics */
export const runFromD = (d) => G.parse(d).map((s) => s.segs);
export function flat(run, step = 0.02) {
  const pts = [];
  for (const s of run) {
    const n = s.t === 'L' ? 1 : Math.max(8, Math.ceil(segLen(s) / step));
    for (let i = 0; i < n; i++) pts.push(at(s, i / n));
  }
  return pts;
}
export function area(run) {
  const q = flat(run, 0.05); let a = 0;
  for (let i = 0; i < q.length; i++) { const u = q[i], v = q[(i + 1) % q.length]; a += u[0] * v[1] - v[0] * u[1]; }
  return a / 2;
}
function windingPoly(p, poly) {
  let w = 0;
  for (let i = 0, n = poly.length; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    if (a[1] <= p[1]) { if (b[1] > p[1] && cross(sub(b, a), sub(p, a)) > 0) w++; }
    else if (b[1] <= p[1] && cross(sub(b, a), sub(p, a)) < 0) w--;
  }
  return w;
}
export const winding = (p, polys) => polys.reduce((w, poly) => w + windingPoly(p, poly), 0);
export const revRun = (r) => r.map((s) => ({ t: s.t, p: [...s.p].reverse() })).reverse();

/** Wind every contour by its nesting depth: outer +, hole -, island +. */
export function orient(shape) {
  const polys = shape.map((r) => flat(r, 0.05));
  return shape.map((r, i) => {
    const probe = polys[i][0];
    let depth = 0;
    polys.forEach((q, j) => { if (j !== i && windingPoly(probe, q) !== 0) depth++; });
    const want = depth % 2 === 0 ? 1 : -1;
    return Math.sign(area(r)) === want ? r : revRun(r);
  });
}

/* --------------------------------------------------------------- boolean */
const near = (a, b, e = 1e-5) => len(sub(a, b)) < e;
/** Cut every run of `shape` at its crossings with `other`; returns edges (open) and whole loops. */
function cutShape(shape, other, tag) {
  const edges = [], loops = [];
  shape.forEach((run, ri) => {
    const marks = []; // {i, t, p}
    other.forEach((orun) => {
      for (const h of runHits(run, orun)) marks.push({ i: h.i, t: h.ta, p: h.p });
    });
    // normalise marks at segment ends onto the next segment start, dedupe
    const norm = [];
    for (const m of marks) {
      let { i, t } = m;
      if (t > 1 - 1e-9) { i = (i + 1) % run.length; t = 0; }
      if (!norm.some((q) => near(q.p, m.p, 1e-6))) norm.push({ i, t, p: m.p });
    }
    if (!norm.length) { loops.push({ run, tag }); return; }
    norm.sort((a, b) => a.i + a.t - (b.i + b.t));
    // walk the closed run from mark k to mark k+1
    for (let k = 0; k < norm.length; k++) {
      const A = norm[k], B = norm[(k + 1) % norm.length];
      const segs = [];
      let i = A.i, t = A.t;
      const end = B.i + B.t + (k + 1 === norm.length ? run.length : 0);
      let pos = A.i + A.t;
      for (let guard = 0; guard < run.length * 2 + 2; guard++) {
        const si = i % run.length, s = run[si];
        const segEnd = Math.floor(pos) + 1;
        const stop = Math.min(segEnd, end);
        const t0 = pos - Math.floor(pos), t1 = stop - Math.floor(pos);
        if (t1 - t0 > 1e-9) segs.push(piece(s, t0, t1));
        pos = stop; i = Math.floor(pos);
        if (pos >= end - 1e-12) break;
      }
      if (!segs.length) continue;
      segs[0].p[0] = A.p; segs.at(-1).p[segs.at(-1).p.length - 1] = B.p;
      edges.push({ segs, tag, a: A.p, b: B.p });
    }
  });
  return { edges, loops };
}
function piece(s, t0, t1) {
  if (t0 <= 1e-12 && t1 >= 1 - 1e-12) return { t: s.t, p: s.p.map((q) => [...q]) };
  const [, right] = t0 > 1e-12 ? split(s, t0) : [null, s];
  const tt = t1 >= 1 - 1e-12 ? 1 : (t1 - t0) / (1 - t0);
  const r = tt >= 1 ? right : split(right, tt)[0];
  return { t: r.t, p: r.p.map((q) => [...q]) };
}
function midOf(segs) {
  // a point half way along the edge by length
  const L = segs.reduce((a, s) => a + segLen(s), 0);
  let acc = 0;
  for (const s of segs) { const l = segLen(s); if (acc + l >= L / 2) return at(s, Math.min(1, Math.max(0, (L / 2 - acc) / (l || 1)))); acc += l; }
  return at(segs.at(-1), 0.5);
}
function classify(item, polys) {
  const segs = item.segs ?? item.run;
  // try a few points along the edge, away from its ends, and vote
  const L = segs.reduce((a, s) => a + segLen(s), 0);
  const fr = [0.5, 0.3, 0.7, 0.4, 0.6];
  let vIn = 0, vOut = 0;
  for (const f of fr) {
    let acc = 0, pnt = null;
    for (const s of segs) { const l = segLen(s); if (acc + l >= L * f) { pnt = at(s, Math.min(1, Math.max(0, (L * f - acc) / (l || 1)))); break; } acc += l; }
    pnt ??= midOf(segs);
    if (winding(pnt, polys) !== 0) vIn++; else vOut++;
  }
  return vIn > vOut;
}
function chain(items) {
  const out = [];
  const used = new Set();
  for (const seed of items) {
    if (used.has(seed)) continue;
    if (seed.closedLoop) { used.add(seed); out.push(seed.segs); continue; }
    const loop = [];
    let cur = seed;
    for (let g = 0; g < items.length + 2; g++) {
      used.add(cur); loop.push(...cur.segs);
      if (near(cur.b, seed.a, 1e-4)) break;
      const nx = items.filter((e) => !used.has(e) && !e.closedLoop && near(e.a, cur.b, 1e-4));
      if (!nx.length) throw new Error(`chain: open end at ${cur.b.map((v) => v.toFixed(4))}`);
      cur = nx[0];
    }
    // snap the seam
    loop.at(-1).p[loop.at(-1).p.length - 1] = loop[0].p[0];
    out.push(loop);
  }
  return out;
}
/**
 * op: 'union' | 'subtract' | 'intersect'; A and B are Shapes (arrays of closed runs).
 * Exact tangencies and shared points (a knockout band's edge running through the
 * very point an inner edge turns about) make the walk ambiguous; if it cannot
 * close, B is nudged by a few hundred-thousandths and the op re-run.
 */
export function boolean(A, B, op) {
  const jit = [[0, 0], [3e-5, 7e-5], [-6e-5, 2e-5], [4e-5, -5e-5], [-2e-5, -8e-5]];
  let err;
  for (const [dx, dy] of jit) {
    const Bj = dx || dy ? B.map((r) => r.map((sg) => ({ t: sg.t, p: sg.p.map((q) => [q[0] + dx, q[1] + dy]) }))) : B;
    try { return booleanOnce(A, Bj, op); } catch (e) { err = e; }
  }
  throw err;
}
function booleanOnce(A, B, op) {
  A = orient(A); B = orient(B);
  const pa = A.map((r) => flat(r)), pb = B.map((r) => flat(r));
  const ca = cutShape(A, B, 'A'), cb = cutShape(B, A, 'B');
  const keep = [];
  const want = (tag, inside) => (op === 'union' ? !inside : op === 'intersect' ? inside : tag === 'A' ? !inside : inside);
  for (const e of ca.edges) if (want('A', classify(e, pb))) keep.push(e);
  for (const e of cb.edges) if (want('B', classify(e, pa))) keep.push(op === 'subtract' ? { segs: revRun(e.segs), a: e.b, b: e.a } : e);
  for (const l of ca.loops) if (want('A', classify(l, pb))) keep.push({ segs: l.run, closedLoop: true });
  for (const l of cb.loops) if (want('B', classify(l, pa))) keep.push({ segs: op === 'subtract' ? revRun(l.run) : l.run, closedLoop: true });
  return chain(keep).map((r) => clean(r)).filter((r) => r.length && Math.abs(area(r)) > 1e-3);
}
export const union = (...shapes) => shapes.reduce((acc, s) => (acc ? boolean(acc, s, 'union') : orient(s)), null);
export const subtract = (A, B) => (B.length ? boolean(A, B, 'subtract') : A);
export const intersect = (A, B) => boolean(A, B, 'intersect');

/** Drop segments shorter than eps, re-joining their neighbours. */
export function clean(run, eps = 0.005) {
  const out = [];
  for (const s of run) {
    if (segLen(s) < eps && run.length > 1) { if (out.length) out.at(-1).p[out.at(-1).p.length - 1] = s.p.at(-1); continue; }
    out.push(s);
  }
  if (out.length > 1) out[0].p[0] = out.at(-1).p.at(-1);
  return out;
}

/* ---------------------------------------------------------------- offsets */
/**
 * Replace fillet arcs of radius <= maxR with their sharp vertex. Offsetting a
 * fillet by at least its own radius collapses it to exactly that vertex's
 * offset, and the free-cubic offsetter cannot take a zero-radius arc (it throws
 * in its loop removal), so the vertex goes in first. `which` picks convex,
 * concave or both corners, judged against the contour's own winding.
 */
export function defillet(run, maxR = 1 + 1e-6, which = 'both') {
  const s = Math.sign(area(run));
  // group consecutive cubics that sit on one circle
  const groups = [];
  for (const seg of run) {
    const last = groups.at(-1);
    if (seg.t === 'C') {
      const circ = circleThrough(seg.p[0], at(seg, 0.5), seg.p[3]);
      const onCirc = circ && [0.25, 0.75].every((u) => Math.abs(len(sub(at(seg, u), circ.c)) - circ.r) < 0.01);
      if (onCirc && last && last.circ && len(sub(last.circ.c, circ.c)) < 1e-3 && Math.abs(last.circ.r - circ.r) < 1e-3) { last.segs.push(seg); continue; }
      groups.push({ segs: [seg], circ: onCirc ? circ : null });
    } else groups.push({ segs: [seg], circ: null });
  }
  const out = [];
  for (const g of groups) {
    if (g.circ && g.circ.r <= maxR) {
      const a = g.segs[0].p[0], b = g.segs.at(-1).p[3];
      const t0 = G.tan(g.segs[0], 0), t1 = G.tan(g.segs.at(-1), 1), turn = cross(t0, t1);
      const convex = Math.sign(turn) === s;
      if ((which === 'both' || (which === 'convex') === convex) && Math.abs(turn) > 1e-6) {
        const tt = cross(sub(b, a), t1) / cross(t0, t1);
        const V = add(a, mul(t0, tt));
        out.push({ t: 'L', p: [a, V] }, { t: 'L', p: [V, b] });
        continue;
      }
    }
    out.push(...g.segs);
  }
  return clean(out, 1e-4);
}
/** The region a closed centre-line contour paints out to: offset +1 (the plate, the fill's outer edge). */
export const grow = (run, d = 1) => { const r = defillet(run, d + 1e-6, 'concave'); return clean(G.offsetRun(r, (area(r) > 0 ? 1 : -1) * d, true), 0.01); };
/** The inner ink edge: offset -1. */
export const shrink = (run, d = 1) => { const r = defillet(run, d + 1e-6, 'convex'); return clean(G.offsetRun(r, (area(r) > 0 ? -1 : 1) * d, true), 0.01); };
/** The painted band of an open run, as a closed contour (round or butt caps). */
export const band = (run, cap = 'round') => clean(G.capsule(run, cap), 0.01);

/* --------------------------------------------------------------- simplify */
// Fold runs of short cubics back into circular arcs and long cubics, and runs of
// collinear lines into one; the offsetter emits a piece per unit of length.
const K = 0.5522847498;
function circleThrough(a, b, c) {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-9) return null;
  const s = (q) => q[0] * q[0] + q[1] * q[1];
  const ux = (s(a) * (b[1] - c[1]) + s(b) * (c[1] - a[1]) + s(c) * (a[1] - b[1])) / d;
  const uy = (s(a) * (c[0] - b[0]) + s(b) * (a[0] - c[0]) + s(c) * (b[0] - a[0])) / d;
  return { c: [ux, uy], r: len(sub(a, [ux, uy])) };
}
const angOf = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]);
/** Emit an arc from p0 to p1 about c (radius r) sweeping `sw` radians as cubics split at the cardinals. */
function arcSegs(c, r, a0, sw) {
  const stops = [a0];
  const lo = Math.min(a0, a0 + sw), hi = Math.max(a0, a0 + sw);
  for (let k = Math.ceil(lo / (Math.PI / 2) + 1e-9) * (Math.PI / 2); k < hi - 1e-9; k += Math.PI / 2) if (k - lo > 2e-3 && hi - k > 2e-3) stops.push(k);
  stops.push(a0 + sw);
  if (sw < 0) { const mid = stops.slice(1, -1).sort((x, y) => y - x); stops.splice(1, stops.length - 2, ...mid); }
  const out = [];
  for (let i = 0; i + 1 < stops.length; i++) {
    const t0 = stops[i], t1 = stops[i + 1];
    if (Math.abs(t1 - t0) < 1e-6) continue;
    const k = (4 / 3) * Math.tan((t1 - t0) / 4) * r;
    const s0 = [c[0] + r * Math.cos(t0), c[1] + r * Math.sin(t0)], s1 = [c[0] + r * Math.cos(t1), c[1] + r * Math.sin(t1)];
    out.push({ t: 'C', p: [s0, [s0[0] - k * Math.sin(t0), s0[1] + k * Math.cos(t0)], [s1[0] + k * Math.sin(t1), s1[1] - k * Math.cos(t1)], s1] });
  }
  return out;
}
function fitsArc(segs, tol) {
  const a = segs[0].p[0], b = segs.at(-1).p.at(-1);
  const m = midOf(segs);
  const circ = circleThrough(a, m, b);
  if (!circ || circ.r > 60) return null;
  for (const s of segs) for (let i = 0; i <= 8; i++) if (Math.abs(len(sub(at(s, i / 8), circ.c)) - circ.r) > tol) return null;
  // sweep: follow the pieces
  let sw = 0, prev = angOf(circ.c, a);
  for (const s of segs) for (let i = 1; i <= 8; i++) {
    const q = angOf(circ.c, at(s, i / 8));
    let d = q - prev; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    sw += d; prev = q;
  }
  if (Math.abs(sw) > 2 * Math.PI - 1e-3) return null;
  return { ...circ, a0: angOf(circ.c, a), sw };
}
export function simplify(run, tol = 0.0015) {
  // pass 1: collinear lines
  const lines = [];
  for (const s of run) {
    const prev = lines.at(-1);
    if (prev && prev.t === 'L' && s.t === 'L') {
      const u = sub(prev.p[1], prev.p[0]), v = sub(s.p[1], s.p[0]);
      if (Math.abs(cross(unit(u), unit(v))) < 1e-7 && dot(u, v) > 0) { prev.p[1] = s.p[1]; continue; }
    }
    lines.push({ t: s.t, p: s.p.map((q) => [...q]) });
  }
  // pass 2: maximal runs of cubics that sit on one circle become one arc
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].t !== 'C') { out.push(lines[i]); i++; continue; }
    let j = i + 1, best = null;
    // grow while the arc fit holds and the pieces stay tangent-continuous
    for (let k = i + 1; k <= lines.length; k++) {
      if (k > i + 1 && lines[k - 1].t !== 'C') break;
      const f = fitsArc(lines.slice(i, k), tol);
      if (f) { best = { f, k }; } else if (k > i + 1) break;
    }
    if (best && best.k - i >= 1) {
      const segs = arcSegs(best.f.c, best.f.r, best.f.a0, best.f.sw);
      segs[0].p[0] = lines[i].p[0]; segs.at(-1).p[3] = lines[best.k - 1].p[3];
      out.push(...segs); i = best.k;
    } else { out.push(lines[i]); i++; }
  }
  return out;
}
export const emitRun = (run) => G.emit(run, true);
export const emitShape = (shape) => shape.map((r) => G.emit(simplify(r), true)).join('');
export const emitOpen = (run) => G.emit(run, false);

/* ------------------------------------------------------------------ probes */
export const shapePolys = (shape) => shape.map((r) => flat(r, 0.02));
export const insideShape = (p, polys) => winding(p, polys) !== 0;
