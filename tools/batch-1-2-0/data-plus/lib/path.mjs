// Path data as segments, for cutting shipped drawings without redrawing them.
//
// A shipped base is re-emitted from its own command text wherever a segment
// survives a cut untouched, so a number like 4.34315 is never re-rounded to
// 4.3432. Only a segment that was split, moved or made new is written from
// coordinates, at four decimals. Cubics are split by de Casteljau, so a cut
// piece is the same curve, not a refit.

export const fmt = (v) => {
  if (!Number.isFinite(v)) throw new Error(`non-finite ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
};
const P = (p) => `${fmt(p[0])} ${fmt(p[1])}`;
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const unit = (a) => mul(a, 1 / len(a));
const near = (a, b, e = 1e-6) => Math.abs(a[0] - b[0]) < e && Math.abs(a[1] - b[1]) < e;

/** Absolute M L H V C Z only, which is all a Figma export writes. */
export function parse(d) {
  if (/[a-z]/.test(d.replace(/e-?\d/g, ''))) throw new Error(`relative command in ${d}`);
  const subs = [];
  let cur = null, pt = [0, 0], start = [0, 0];
  for (const m of d.matchAll(/([MLHVCZ])([^MLHVCZ]*)/g)) {
    const c = m[1], n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    const src = c + m[2].trim();
    if (c === 'M') { if (n.length !== 2) throw new Error(`M arity in ${d}`); pt = [n[0], n[1]]; start = pt; cur = { segs: [], closed: false }; subs.push(cur); }
    else if (c === 'L') { if (n.length !== 2) throw new Error(`L arity`); cur.segs.push({ t: 'L', p0: pt, p1: [n[0], n[1]], src }); pt = [n[0], n[1]]; }
    else if (c === 'H') { if (n.length !== 1) throw new Error(`H arity`); cur.segs.push({ t: 'L', p0: pt, p1: [n[0], pt[1]], src }); pt = [n[0], pt[1]]; }
    else if (c === 'V') { if (n.length !== 1) throw new Error(`V arity`); cur.segs.push({ t: 'L', p0: pt, p1: [pt[0], n[0]], src }); pt = [pt[0], n[0]]; }
    else if (c === 'C') { if (n.length !== 6) throw new Error(`C arity`); cur.segs.push({ t: 'C', p0: pt, c1: [n[0], n[1]], c2: [n[2], n[3]], p1: [n[4], n[5]], src }); pt = [n[4], n[5]]; }
    else if (c === 'Z') { if (!near(pt, start, 1e-9)) cur.segs.push({ t: 'L', p0: pt, p1: start, src: null, closing: true }); cur.closed = true; pt = start; }
  }
  return subs;
}

export function at(s, u) {
  if (s.t === 'L') return add(s.p0, mul(sub(s.p1, s.p0), u));
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * s.p0[k] + 3 * v * v * u * s.c1[k] + 3 * v * u * u * s.c2[k] + u * u * u * s.p1[k]);
}
export function tangent(s, u) {
  if (s.t === 'L') return unit(sub(s.p1, s.p0));
  const v = 1 - u;
  const d = [0, 1].map((k) => 3 * v * v * (s.c1[k] - s.p0[k]) + 6 * v * u * (s.c2[k] - s.c1[k]) + 3 * u * u * (s.p1[k] - s.c2[k]));
  return unit(d);
}
/** The piece of a segment between parameters u0 < u1, as a new segment. */
export function slice(s, u0, u1) {
  if (s.t === 'L') return { t: 'L', p0: at(s, u0), p1: at(s, u1) };
  const split = (g, u) => {
    const a = add(g.p0, mul(sub(g.c1, g.p0), u)), b = add(g.c1, mul(sub(g.c2, g.c1), u)), c = add(g.c2, mul(sub(g.p1, g.c2), u));
    const d = add(a, mul(sub(b, a), u)), e = add(b, mul(sub(c, b), u)), m = add(d, mul(sub(e, d), u));
    return [{ t: 'C', p0: g.p0, c1: a, c2: d, p1: m }, { t: 'C', p0: m, c1: e, c2: c, p1: g.p1 }];
  };
  let g = s;
  if (u0 > 1e-12) g = split(g, u0)[1];
  if (u1 < 1 - 1e-12) g = split(g, (u1 - u0) / (1 - u0))[0];
  return { t: 'C', p0: g.p0, c1: g.c1, c2: g.c2, p1: g.p1 };
}
/** Parameter where f(point) crosses `value` on a segment it crosses once. */
export function solve(s, f, value) {
  let lo = 0, hi = 1;
  const flo = f(at(s, lo)) - value, fhi = f(at(s, hi)) - value;
  if (flo * fhi > 0) throw new Error(`segment does not cross ${value}: ${flo} ${fhi}`);
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2, fm = f(at(s, m)) - value;
    if ((fm > 0) === (flo > 0) && fm !== 0) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}
export const xOf = (p) => p[0], yOf = (p) => p[1];

/** A circular arc as cubics, split at every multiple of 90 degrees it passes, so extremes are endpoints. */
export function arc(c, r, a0, a1, end = null) {
  const rad = (a) => (a * Math.PI) / 180;
  const cuts = [a0];
  const dir = Math.sign(a1 - a0);
  let k = dir > 0 ? Math.floor(a0 / 90) + 1 : Math.ceil(a0 / 90) - 1;
  while (dir > 0 ? k * 90 < a1 - 1e-9 : k * 90 > a1 + 1e-9) { cuts.push(k * 90); k += dir; }
  cuts.push(a1);
  const out = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const b0 = cuts[i], b1 = cuts[i + 1];
    if (Math.abs(b1 - b0) < 1e-9) continue;
    const h = (4 / 3) * Math.tan(rad(b1 - b0) / 4) * r;
    const p0 = [c[0] + r * Math.cos(rad(b0)), c[1] + r * Math.sin(rad(b0))];
    let p1 = [c[0] + r * Math.cos(rad(b1)), c[1] + r * Math.sin(rad(b1))];
    const t0 = [-Math.sin(rad(b0)), Math.cos(rad(b0))], t1 = [-Math.sin(rad(b1)), Math.cos(rad(b1))];
    const seg = { t: 'C', p0, c1: add(p0, mul(t0, h)), c2: sub(p1, mul(t1, h)), p1 };
    out.push(seg);
  }
  // land exactly on a point the caller already holds (a cut on a shipped curve), which sits within a hair of the circle
  if (end) {
    const last = out[out.length - 1];
    if (len(sub(last.p1, end)) > 2e-3) throw new Error(`arc end ${last.p1} is ${len(sub(last.p1, end))} from ${end}`);
    last.c2 = add(last.c2, sub(end, last.p1)); last.p1 = end;
  }
  return out;
}
export const line = (p0, p1) => ({ t: 'L', p0, p1 });

/**
 * Emit a run of segments. A segment still carrying its shipped `src` is written
 * as shipped; everything else from coordinates. `hv` writes new axis-aligned
 * lines as H and V, for bases spelled that way.
 */
export function emit(segs, { closed = false, hv = false } = {}) {
  if (!segs.length) return '';
  let d = `M${P(segs[0].p0)}`;
  let cur = segs[0].p0;
  for (const s of segs) {
    if (!near(s.p0, cur, 2e-4)) throw new Error(`gap in run at ${s.p0} (from ${cur})`);
    if (closed && s.closing) { cur = s.p1; continue; }
    if (s.src) d += s.src;
    else if (s.t === 'L') {
      if (hv && Math.abs(s.p0[1] - s.p1[1]) < 1e-9) d += `H${fmt(s.p1[0])}`;
      else if (hv && Math.abs(s.p0[0] - s.p1[0]) < 1e-9) d += `V${fmt(s.p1[1])}`;
      else d += `L${P(s.p1)}`;
    } else d += `C${P(s.c1)} ${P(s.c2)} ${P(s.p1)}`;
    cur = s.p1;
  }
  return d + (closed ? 'Z' : '');
}
/** Every coordinate moved by (dx, dy); the text is regenerated, command by command. */
export function translateSegs(segs, dx, dy) {
  const m = (p) => [p[0] + dx, p[1] + dy];
  return segs.map((s) => (s.t === 'L' ? { t: 'L', p0: m(s.p0), p1: m(s.p1), closing: s.closing }
    : { t: 'C', p0: m(s.p0), c1: m(s.c1), c2: m(s.c2), p1: m(s.p1) }));
}
export function translateD(d, dx, dy) {
  return parse(d).map((sp) => emit(translateSegs(sp.segs, dx, dy), { closed: sp.closed })).join('');
}
/** Signed area of a closed run, curves sampled (screen coordinates: positive is clockwise on screen). */
export function area(segs) {
  const pts = [];
  for (const s of segs) for (let i = 0; i < 16; i++) pts.push(at(s, i / 16));
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
}
export function reverse(segs) {
  return segs.slice().reverse().map((s) => (s.t === 'L' ? { t: 'L', p0: s.p1, p1: s.p0 } : { t: 'C', p0: s.p1, c1: s.c2, c2: s.c1, p1: s.p0 }));
}
/**
 * The house sharp stub for a free end that was round-capped: a straight run
 * along the end tangent, k = (1 - sin t) / cos t, t off the nearer axis, so
 * the butt face's outer corner lands where the round cap reached.
 */
export function stub(end, dir) {
  const a = Math.atan2(Math.abs(dir[1]), Math.abs(dir[0]));
  const t = Math.min(a, Math.PI / 2 - a);
  const k = (1 - Math.sin(t)) / Math.cos(t);
  return { k, p: add(end, mul(dir, k)) };
}
/**
 * A closed contour clipped to x <= xmax (or x >= xmin): the parts on the kept
 * side, the crossings joined by a straight vertical, which is how the base's
 * own band knockout already ends at the walls.
 */
export function clipX(segs, { xmax = Infinity, xmin = -Infinity }) {
  const inside = (p) => p[0] <= xmax + 1e-9 && p[0] >= xmin - 1e-9;
  const f = xOf;
  const pieces = [];
  for (const s of segs) {
    const a = s.p0, b = s.p1;
    const bound = [xmax, xmin].filter(Number.isFinite);
    // sample for crossings, then refine
    const us = [0];
    const n = 400;
    let prev = at(s, 0);
    for (let i = 1; i <= n; i++) {
      const u = i / n, p = at(s, u);
      for (const X of bound) if ((prev[0] - X) * (p[0] - X) < 0) {
        let lo = (i - 1) / n, hi = u;
        for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if ((f(at(s, lo)) - X) * (f(at(s, m)) - X) <= 0) hi = m; else lo = m; }
        us.push((lo + hi) / 2);
      }
      prev = p;
    }
    us.push(1);
    for (let i = 0; i < us.length - 1; i++) {
      const u0 = us[i], u1 = us[i + 1];
      if (u1 - u0 < 1e-12) continue;
      const mid = at(s, (u0 + u1) / 2);
      if (!inside(mid)) continue;
      const untouched = u0 === 0 && u1 === 1;
      const piece = untouched ? s : slice(s, u0, u1);
      if (!untouched) {
        // snap the crossing coordinate exactly onto the bound
        for (const X of bound) {
          if (Math.abs(piece.p0[0] - X) < 1e-6) piece.p0 = [X, piece.p0[1]];
          if (Math.abs(piece.p1[0] - X) < 1e-6) piece.p1 = [X, piece.p1[1]];
        }
      }
      pieces.push(piece);
    }
  }
  // join pieces that do not meet with vertical lines on the bound
  const out = [];
  for (let i = 0; i < pieces.length; i++) {
    const s = pieces[i];
    if (out.length && !near(out[out.length - 1].p1, s.p0, 1e-6)) out.push(line(out[out.length - 1].p1, s.p0));
    out.push(s);
  }
  if (out.length && !near(out[out.length - 1].p1, out[0].p0, 1e-6)) out.push({ ...line(out[out.length - 1].p1, out[0].p0), closing: true });
  return out;
}
