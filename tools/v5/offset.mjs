/**
 * Offsetting a contour built of lines and circular arcs.
 *
 * A duotone plate is the stroke's outer contour — the centre line offset by one
 * unit — and for a drawing made of lines and arcs that is exact arithmetic
 * rather than an approximation: a line offsets to a line, an arc to a
 * concentric arc, and a junction that was tangent stays tangent. What has to be
 * handled is the junctions that were NOT tangent: a convex corner opens and
 * takes an arc of the offset radius about the original vertex, a reflex one
 * crosses and is trimmed to the crossing.
 *
 * `verify()` is the part that matters. It samples the result and asserts every
 * sample sits `delta` from the source, which is the check the house rule asks
 * for and the only one that catches a wrong-signed normal.
 */
import { add, sub, mul, len, unit, dot, cross, onArc, arcTo, pt, n } from './geom.mjs';
import { contains } from '../../pipeline/lib/geom.mjs';

const EPS = 1e-7;
const deg = (a) => (a * 180) / Math.PI;
const rad = (a) => (a * Math.PI) / 180;

/** Tangent of a segment at its start (t=0) or end (t=1), pointing along travel. */
function tangent(seg, at) {
  if (seg.type === 'L') return unit(sub(seg.p1, seg.p0));
  const a = at === 0 ? seg.a0 : seg.a1;
  const s = Math.sign(seg.a1 - seg.a0) || 1;
  return mul([-Math.sin(rad(a)), Math.cos(rad(a))], s);
}
const startPt = (seg) => (seg.type === 'L' ? seg.p0 : onArc(seg.c, seg.r, seg.a0));
const endPt = (seg) => (seg.type === 'L' ? seg.p1 : onArc(seg.c, seg.r, seg.a1));

/** Signed area of the flattened contour; negative means the interior is on the left. */
function signedArea(segs) {
  const pts = [];
  for (const s of segs) {
    if (s.type === 'L') pts.push(s.p0, s.p1);
    else for (let i = 0; i <= 12; i++) pts.push(onArc(s.c, s.r, s.a0 + ((s.a1 - s.a0) * i) / 12));
  }
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/**
 * Offset a closed contour outward by `delta`. `segs` is the list this module's
 * `Contour` records; the interior is wherever the winding says it is.
 */
export function offsetContour(segs, delta) {
  const sign = signedArea(segs) > 0 ? 1 : -1;   // +1: clockwise on screen, interior right
  const outward = (t) => mul([t[1], -t[0]], sign);

  // Which side of a piece the material is on, asked of the drawing rather than
  // derived from the winding: a concave fillet is traversed the same way as the
  // convex arc beside it, so the winding alone gets it backwards.
  const poly = [];
  for (const s of segs) {
    if (s.type === 'L') poly.push(s.p0);
    else for (let i = 0; i < 24; i++) poly.push(onArc(s.c, s.r, s.a0 + ((s.a1 - s.a0) * i) / 24));
  }
  const materialAt = (p, dir) => contains(poly, add(p, mul(dir, 1e-4)));

  const out = segs.map((s) => {
    if (s.type === 'L') {
      const nrm = outward(tangent(s, 0));
      return { type: 'L', p0: add(s.p0, mul(nrm, delta)), p1: add(s.p1, mul(nrm, delta)) };
    }
    const mid = onArc(s.c, s.r, (s.a0 + s.a1) / 2);
    const radial = unit(sub(mid, s.c));
    const away = materialAt(mid, radial) ? -1 : 1;   // material outward -> shrink
    const rr = s.r + away * delta;
    return rr <= 1e-6 ? null : { type: 'A', c: s.c, r: rr, a0: s.a0, a1: s.a1 };
  });

  // Repair the junctions the offset opened or crossed. A piece the offset has
  // swallowed whole — the inner edge of a hook whose daylight the offset closes
  // — is dropped and its neighbours trimmed to each other instead, which is why
  // this runs to a fixed point rather than in one pass.
  let live = out.map((s, i) => (s ? { s, i } : null)).filter(Boolean);
  for (let guard = 0; guard < 40; guard++) {
    const fixed = [];
    let dropped = -1;
    for (let k = 0; k < live.length && dropped < 0; k++) {
      const cur = live[k].s, nxt = live[(k + 1) % live.length].s;
      const i = live[k].i, j = live[(k + 1) % live.length].i;
      fixed.push(cur);
      const e = endPt(cur), s0 = startPt(nxt);
      if (len(sub(e, s0)) < 1e-6) continue;
      const V = endPt(segs[i]);
      // Trim where the two offset pieces genuinely cross inside their own
      // extents; open a join arc where they do not. Deciding it from the pieces
      // rather than from the source's tangents is what survives a dropped
      // segment, where the original junction no longer exists.
      const X = crossingNear(cur, nxt, V);
      if (X && within(cur, X) && within(nxt, X)) {
        setEnd(cur, X, 'end');
        setEnd(nxt, X, 'start');
        continue;
      }
      if (Math.abs(len(sub(e, V)) - delta) < 1e-6 && Math.abs(len(sub(s0, V)) - delta) < 1e-6) {
        const a0 = deg(Math.atan2(e[1] - V[1], e[0] - V[0]));
        let a1 = deg(Math.atan2(s0[1] - V[1], s0[0] - V[0]));
        while (a1 - a0 > 180) a1 -= 360;
        while (a0 - a1 > 180) a1 += 360;
        fixed.push({ type: 'A', c: V, r: delta, a0, a1 });
        continue;
      }
      dropped = shorter(cur, nxt, live, k);
      break;
    }
    if (dropped < 0) return fixed;
    live = live.filter((_, idx) => idx !== dropped);
  }
  throw new Error('offset did not settle');
}

/** Is `p` inside the piece's own extent, rather than past either end? */
function within(s, p) {
  if (s.type === 'L') {
    const u = sub(s.p1, s.p0), t = dot(sub(p, s.p0), u) / dot(u, u);
    return t > -1e-6 && t < 1 + 1e-6;
  }
  // How far into the sweep the point sits, wrapped: atan2 answers in
  // (-180, 180], so a crossing at 210 degrees comes back as -150 and a plain
  // comparison against the arc's own range rejects it.
  const dir = Math.sign(s.a1 - s.a0) || 1;
  const a = deg(Math.atan2(p[1] - s.c[1], p[0] - s.c[0]));
  const t = ((((a - s.a0) * dir) % 360) + 360) % 360;
  return t <= Math.abs(s.a1 - s.a0) + 1e-6;
}

const spanOf = (s) => (s.type === 'L' ? len(sub(s.p1, s.p0)) : Math.abs(((s.a1 - s.a0) * Math.PI) / 180) * s.r);
const shorter = (cur, nxt, live, k) => (spanOf(cur) <= spanOf(nxt) ? k : (k + 1) % live.length);

/** Where two offset pieces cross, nearest the junction they came from. */
function crossingNear(a, b, V) {
  const cands = [];
  const lineOf = (s) => ({ p: s.p0, u: unit(sub(s.p1, s.p0)) });
  if (a.type === 'L' && b.type === 'L') {
    const la = lineOf(a), lb = lineOf(b);
    const den = cross(la.u, lb.u);
    if (Math.abs(den) > EPS) cands.push(add(la.p, mul(la.u, cross(sub(lb.p, la.p), lb.u) / den)));
  } else if (a.type === 'L' || b.type === 'L') {
    const L = a.type === 'L' ? a : b, A = a.type === 'L' ? b : a;
    const { p, u } = lineOf(L);
    const q = sub(p, A.c);
    const bq = 2 * dot(q, u), cq = dot(q, q) - A.r * A.r, disc = bq * bq - 4 * cq;
    if (disc >= 0) for (const t of [(-bq - Math.sqrt(disc)) / 2, (-bq + Math.sqrt(disc)) / 2]) cands.push(add(p, mul(u, t)));
  } else {
    const d = len(sub(b.c, a.c));
    if (d > EPS && d < a.r + b.r && d > Math.abs(a.r - b.r)) {
      const x = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
      const h = Math.sqrt(Math.max(0, a.r * a.r - x * x));
      const e = unit(sub(b.c, a.c)), nn = [-e[1], e[0]];
      cands.push(add(add(a.c, mul(e, x)), mul(nn, h)), add(add(a.c, mul(e, x)), mul(nn, -h)));
    }
  }
  if (!cands.length) return null;
  return cands.reduce((best, c) => (len(sub(c, V)) < len(sub(best, V)) ? c : best));
}

// Trimming shortens an arc; it must never turn it round, so the new angle is
// taken on the same side of the surviving end as the old one.
function setEnd(s, p, which) {
  if (s.type === 'L') { if (which === 'end') s.p1 = p; else s.p0 = p; return; }
  const dir = Math.sign(s.a1 - s.a0) || 1;
  const ref = which === 'end' ? s.a0 : s.a1;
  let ang = deg(Math.atan2(p[1] - s.c[1], p[0] - s.c[0]));
  const want = which === 'end' ? dir : -dir;
  while ((ang - ref) * want < 0) ang += 360 * want;
  while (Math.abs(ang - ref) > 360) ang -= 360 * Math.sign(ang - ref);
  if (which === 'end') s.a1 = ang; else s.a0 = ang;
}

/** Emit `M/L/C` for a contour. `close` adds the Z. */
export function contourPath(segs, close = true) {
  let d = `M${pt(startPt(segs[0]))}`;
  for (const s of segs) {
    if (s.type === 'L') d += `L${pt(s.p1)}`;
    else for (const c of arcTo(s.c, s.r, s.a0, s.a1)) d += `C${pt(c.c1)} ${pt(c.c2)} ${pt(c.p)}`;
  }
  return close ? d + 'Z' : d;
}

/** Mirror a contour about x = 12: exact, since a mirrored arc is an arc. */
export function mirrorSegs(segs) {
  return segs.map((s) =>
    s.type === 'L'
      ? { type: 'L', p0: [24 - s.p0[0], s.p0[1]], p1: [24 - s.p1[0], s.p1[1]] }
      : { type: 'A', c: [24 - s.c[0], s.c[1]], r: s.r, a0: 180 - s.a0, a1: 180 - s.a1 });
}

/** Every sample of `b` sits `delta` from `a`, or this throws. The whole point. */
export function verify(a, b, delta, tol = 0.002) {
  const sample = (segs, k = 60) => {
    const pts = [];
    for (const s of segs) {
      for (let i = 0; i <= k; i++) {
        const t = i / k;
        pts.push(s.type === 'L' ? add(s.p0, mul(sub(s.p1, s.p0), t)) : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t));
      }
    }
    return pts;
  };
  const src = sample(a, 400);
  let worst = 0;
  for (const p of sample(b)) {
    let m = Infinity;
    for (const q of src) m = Math.min(m, len(sub(p, q)));
    worst = Math.max(worst, Math.abs(m - delta));
  }
  if (worst > tol) throw new Error(`offset off by ${worst.toFixed(4)} (tolerance ${tol})`);
  return worst;
}

/* ------------------------------------------------------------- clipping */

const at = (s, t) =>
  s.type === 'L' ? add(s.p0, mul(sub(s.p1, s.p0), t)) : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t);

function split(s, t) {
  if (s.type === 'L') {
    const m = at(s, t);
    return [{ type: 'L', p0: s.p0, p1: m }, { type: 'L', p0: m, p1: s.p1 }];
  }
  const m = s.a0 + (s.a1 - s.a0) * t;
  return [{ type: 'A', c: s.c, r: s.r, a0: s.a0, a1: m }, { type: 'A', c: s.c, r: s.r, a0: m, a1: s.a1 }];
}

/** Where a segment meets the line { p : dot(p - P, n) = d }, as parameters in (0,1). */
function crossings(s, P, nrm, d) {
  const f = (t) => dot(sub(at(s, t), P), nrm) - d;
  const ts = [];
  const steps = s.type === 'L' ? 1 : 64;
  for (let i = 0; i < steps; i++) {
    let a = i / steps, b = (i + 1) / steps, fa = f(a), fb = f(b);
    if (fa === 0) ts.push(a);
    if (fa * fb < 0) {
      for (let k = 0; k < 60; k++) {
        const m = (a + b) / 2;
        if (f(a) * f(m) <= 0) b = m; else a = m;
      }
      ts.push((a + b) / 2);
    }
  }
  return ts.filter((t) => t > 1e-9 && t < 1 - 1e-9);
}

/**
 * The part of a closed contour on one side of a line, closed along the line.
 * `keep` is +1 to keep dot(p - P, n) >= d, -1 for the other side.
 */
export function clipContour(segs, P, nrm, d, keep, all = false) {
  const pieces = [];
  for (const s of segs) {
    const ts = crossings(s, P, nrm, d).sort((a, b) => a - b);
    let rest = s, base = 0;
    for (const t of ts) {
      const [a, b] = split(rest, (t - base) / (1 - base));
      pieces.push(a); rest = b; base = t;
    }
    pieces.push(rest);
  }
  const inside = (s) => Math.sign(dot(sub(at(s, 0.5), P), nrm) - d) === keep;
  const runs = [];
  let run = null;
  for (const s of [...pieces, ...pieces]) {          // twice, so a run that wraps is whole
    if (inside(s)) (run ??= []).push(s);
    else if (run) { runs.push(run); run = null; }
  }
  if (run) runs.push(run);
  if (!runs.length) return [];
  const dedupe = (run) => {
    const seen = new Set();
    return run.filter((s) => {
      const k = JSON.stringify(s);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  };
  // The default is the longest run, which is all a bubble or a handset leaves
  // on either side of the slash. A shape that reaches across the slash twice —
  // the bolt does, its apex and its far shoulder both standing clear — needs
  // every run or half the drawing goes missing.
  if (!all) return [dedupe(runs.reduce((a, b) => (b.length > a.length ? b : a)))];
  const out = [];
  const claimed = new Set();
  for (const run of runs.sort((a, b) => b.length - a.length)) {
    const keys = run.map((s) => JSON.stringify(s));
    if (keys.some((k) => claimed.has(k))) continue;
    for (const k of keys) claimed.add(k);
    out.push(dedupe(run));
  }
  return out;
}

/**
 * The runs of a contour that stay `dist` clear of an obstacle, as open paths.
 * The obstacle is given as a polyline, so this works against any shape — which
 * is what cutting one bubble around another needs.
 */
export function clipByDistance(segs, obstacle, dist) {
  const far = (p) => {
    let m = Infinity;
    for (let i = 0; i < obstacle.length; i++) {
      const a = obstacle[i], b = obstacle[(i + 1) % obstacle.length];
      const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
      m = Math.min(m, len(sub(p, add(a, mul(ab, t)))));
    }
    return m - dist;
  };
  const pieces = [];
  for (const s of segs) {
    const ts = [];
    const steps = 200;
    for (let i = 0; i < steps; i++) {
      let a = i / steps, b = (i + 1) / steps;
      if (far(at(s, a)) * far(at(s, b)) < 0) {
        for (let k = 0; k < 50; k++) {
          const m = (a + b) / 2;
          if (far(at(s, a)) * far(at(s, m)) <= 0) b = m; else a = m;
        }
        ts.push((a + b) / 2);
      }
    }
    let rest = s, base = 0;
    for (const t of ts.sort((x, y) => x - y)) {
      const [x, y] = split(rest, (t - base) / (1 - base));
      pieces.push(x); rest = y; base = t;
    }
    pieces.push(rest);
  }
  const runs = [];
  let run = null;
  for (const s of [...pieces, ...pieces]) {
    if (far(at(s, 0.5)) > 0) (run ??= []).push(s);
    else if (run) { runs.push(run); run = null; }
  }
  if (run) runs.push(run);
  if (!runs.length) return [];
  const longest = runs.reduce((a, b) => (b.length > a.length ? b : a));
  const seen = new Set();
  return [longest.filter((s) => { const k = JSON.stringify(s); if (seen.has(k)) return false; seen.add(k); return true; })];
}

/** A contour flattened to points, for the distance clip above. */
export function flatten(segs, per = 24) {
  const pts = [];
  for (const s of segs) {
    if (s.type === 'L') { pts.push(s.p0); pts.push(s.p1); }
    else for (let i = 0; i <= per; i++) pts.push(onArc(s.c, s.r, s.a0 + ((s.a1 - s.a0) * i) / per));
  }
  return pts;
}
