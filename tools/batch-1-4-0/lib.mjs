// Helpers carried from the 1.3.0 topic batch: paths are absolute M/L/C/Z, 4dp, like every generator here.
import { resolve } from 'node:path';
import * as G from '../v5/geom.mjs';
import * as PG from '../../pipeline/lib/geom.mjs';
const REPO = resolve(import.meta.dirname, '../..');
export const { Path, arcTo, circlePath, fillet, polyPath, polyContour, filletLineArc, onArc, add, sub, mul, len, unit, dot, cross, n, pt, K } = G;
export const { strokedBBox, outlines, minGap, subpaths, enclosesArea } = PG;
export { REPO };

export const rad = (a) => (a * Math.PI) / 180;
export const deg = (a) => (a * 180) / Math.PI;
export const R2 = Math.SQRT2;
export const line = (a, b) => `M${pt(a)}L${pt(b)}`;
export const poly = (ps) => 'M' + ps.map(pt).join('L');
export const circle = (c, r) => circlePath(c, r);

/** Arc about c, radius r, from screen angle a0 to a1 (deg), as its own subpath. */
export function arc(c, r, a0, a1) {
  let d = `M${pt(onArc(c, r, a0))}`;
  for (const s of arcTo(c, r, a0, a1)) d += `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`;
  return d;
}
/** The C segments only, to append to a running path. */
export function arcC(c, r, a0, a1) {
  let d = '';
  for (const s of arcTo(c, r, a0, a1)) d += `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`;
  return d;
}

export function rrect(x0, y0, x1, y1, r) {
  return polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]).toString();
}

/* ellipse E(t) = C + a cos t u + b sin t v, u at angle th */
export function ellPoint(C, a, b, th, t) {
  const u = [Math.cos(rad(th)), Math.sin(rad(th))], v = [-u[1], u[0]];
  return add(C, add(mul(u, a * Math.cos(rad(t))), mul(v, b * Math.sin(rad(t)))));
}
function ellDer(C, a, b, th, t) {
  const u = [Math.cos(rad(th)), Math.sin(rad(th))], v = [-u[1], u[0]];
  return add(mul(u, -a * Math.sin(rad(t))), mul(v, b * Math.cos(rad(t))));
}
/** Cubic pieces of an elliptical arc from parameter t0 to t1 (deg), split at every multiple of 90 of t. */
export function ellArcC(C, a, b, th, t0, t1) {
  const stops = [t0];
  const lo = Math.min(t0, t1), hi = Math.max(t0, t1);
  for (let k = Math.ceil(lo / 90) * 90; k <= hi; k += 90) if (Math.abs(k - t0) > 1e-9 && Math.abs(k - t1) > 1e-9) stops.push(k);
  stops.push(t1);
  stops.sort((x, y) => (t1 > t0 ? x - y : y - x));
  let d = '';
  for (let i = 0; i + 1 < stops.length; i++) {
    const s = stops[i], e = stops[i + 1];
    const k = (4 / 3) * Math.tan(rad(e - s) / 4);
    const p0 = ellPoint(C, a, b, th, s), p1 = ellPoint(C, a, b, th, e);
    const c1 = add(p0, mul(ellDer(C, a, b, th, s), k));
    const c2 = sub(p1, mul(ellDer(C, a, b, th, e), k));
    d += `C${pt(c1)} ${pt(c2)} ${pt(p1)}`;
  }
  return d;
}
export const ellArc = (C, a, b, th, t0, t1) => `M${pt(ellPoint(C, a, b, th, t0))}` + ellArcC(C, a, b, th, t0, t1);
export const ellipse = (C, a, b, th = 0) => ellArc(C, a, b, th, 0, 360) + 'Z';

/** A filled round dot, as its own path (the bead of the dot ladder). */
export const dotPath = (c, r) => circlePath(c, r);

export function bisect(f, lo, hi, it = 80) {
  let flo = f(lo);
  for (let i = 0; i < it; i++) {
    const m = (lo + hi) / 2, fm = f(m);
    if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m;
  }
  return (lo + hi) / 2;
}

/** Distance from p to the nearest segment of a polyline set. */
export function distTo(p, polys) {
  let best = Infinity;
  for (const o of polys) for (let i = 0; i + 1 < o.length; i++) {
    const a = o[i], b = o[i + 1], ab = sub(b, a);
    const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
    best = Math.min(best, len(sub(p, add(a, mul(ab, t)))));
  }
  return best;
}

/** Ink box of a drawing: stroke d with round caps, plus filled dots. */
export function inkBox(d, dots = [], cap = 'round') {
  const b = d ? strokedBBox(d, 1, cap) : [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y, r] of dots) { b[0] = Math.min(b[0], x - r); b[1] = Math.min(b[1], y - r); b[2] = Math.max(b[2], x + r); b[3] = Math.max(b[3], y + r); }
  return b;
}
export const padsOf = (b) => [b[0], b[1], 24 - b[2], 24 - b[3]];
export const f2 = (v) => (Math.abs(v) < 5e-5 ? '0' : (+v.toFixed(2)).toString());

/* ---------------------------------------------------------------- cubic runs */
/** Parse an absolute M/L/C/Z path into subpaths of segments {t:'L'|'C', p:[...]} */
export function parseRuns(d) {
  const runs = [];
  let cur = null, start = null, run = null;
  for (const m of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const nums = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M') { run = { segs: [], closed: false }; runs.push(run); cur = start = [nums[0], nums[1]]; }
    else if (m[1] === 'L') { const p = [nums[0], nums[1]]; run.segs.push({ t: 'L', p: [cur, p] }); cur = p; }
    else if (m[1] === 'C') { const q = [[nums[0], nums[1]], [nums[2], nums[3]], [nums[4], nums[5]]]; run.segs.push({ t: 'C', p: [cur, ...q] }); cur = q[2]; }
    else if (m[1] === 'Z') { if (len(sub(cur, start)) > 1e-9) run.segs.push({ t: 'L', p: [cur, start] }); run.closed = true; cur = start; }
  }
  return runs;
}
export function segAt(s, t) {
  if (s.t === 'L') return add(s.p[0], mul(sub(s.p[1], s.p[0]), t));
  const [p0, c1, c2, p1] = s.p, u = 1 - t;
  return [u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0], u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1]];
}
/** The piece of a segment between parameters t0 < t1 (de Casteljau). */
export function segPiece(s, t0, t1) {
  if (s.t === 'L') return { t: 'L', p: [segAt(s, t0), segAt(s, t1)] };
  const split = (p, t) => {
    const [a, b, c, d] = p, lerp = (x, y) => add(x, mul(sub(y, x), t));
    const ab = lerp(a, b), bc = lerp(b, c), cd = lerp(c, d), abc = lerp(ab, bc), bcd = lerp(bc, cd), m = lerp(abc, bcd);
    return [[a, ab, abc, m], [m, bcd, cd, d]];
  };
  const right = split(s.p, t0)[1];
  const tt = t1 >= 1 ? 1 : (t1 - t0) / (1 - t0);
  return { t: 'C', p: tt >= 1 ? right : split(right, tt)[0] };
}
export const segD = (s, move = false) => (move ? `M${pt(s.p[0])}` : '') + (s.t === 'L' ? `L${pt(s.p[1])}` : `C${pt(s.p[1])} ${pt(s.p[2])} ${pt(s.p[3])}`);
/**
 * Keep only the parts of a closed or open run where keep(point) holds, emitting
 * true sub-segments cut at the boundary (found by bisection). Returns a d string.
 */
export function clipRun(run, keep, samples = 200) {
  const pieces = []; // [segIndex, t0, t1]
  run.segs.forEach((s, i) => {
    let t = 0, k = keep(segAt(s, 0));
    for (let j = 1; j <= samples; j++) {
      const tj = j / samples, kj = keep(segAt(s, tj));
      if (kj !== k) {
        const tb = bisect((x) => (keep(segAt(s, x)) === k ? -1 : 1), (j - 1) / samples, tj, 40);
        if (k) pieces.push([i, t, tb]);
        t = tb; k = kj;
      }
    }
    if (k) pieces.push([i, t, 1]);
  });
  // chain consecutive pieces into subpaths
  const chains = [];
  for (const pc of pieces) {
    const last = chains.at(-1)?.at(-1);
    if (last && ((last[0] === pc[0] && Math.abs(last[2] - pc[1]) < 1e-9) || (last[0] + 1 === pc[0] && last[2] === 1 && pc[1] === 0))) chains.at(-1).push(pc);
    else chains.push([pc]);
  }
  if (run.closed && chains.length > 1) {
    const f = chains[0][0], l = chains.at(-1).at(-1);
    if (f[1] === 0 && f[0] === 0 && l[0] === run.segs.length - 1 && l[2] === 1) chains[0] = [...chains.pop(), ...chains[0]];
  }
  if (run.closed && chains.length === 1 && pieces.length === run.segs.length && pieces.every((p) => p[1] === 0 && p[2] === 1))
    return run.segs.map((s, i) => segD(s, i === 0)).join('') + 'Z';
  return chains.map((ch) => ch.map(([i, t0, t1], k) => segD(segPiece(run.segs[i], t0, t1), k === 0)).join('')).join('');
}
/** Point-in-polygon on a flattened closed outline. */
export function insidePoly(q, o) {
  let w = false;
  for (let i = 0, j = o.length - 1; i < o.length; j = i++)
    if ((o[i][1] > q[1]) !== (o[j][1] > q[1]) && q[0] < ((o[j][0] - o[i][0]) * (q[1] - o[i][1])) / (o[j][1] - o[i][1]) + o[i][0]) w = !w;
  return w;
}
export function mapD(d, f) {
  return d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) => pt(f([+x, +y])));
}

/** Chain open pieces (d strings of M/L/C) head to tail into one closed subpath. */
export function chainClosed(pieceDs, tol = 1e-3) {
  const runs = pieceDs.flatMap((d) => parseRuns(d)).filter((r) => r.segs.length);
  const start = (r) => r.segs[0].p[0], end = (r) => r.segs.at(-1).p.at(-1);
  const out = [runs.shift()];
  while (runs.length) {
    const e = end(out.at(-1));
    const i = runs.findIndex((r) => len(sub(start(r), e)) < tol);
    if (i < 0) throw new Error(`chainClosed: no piece starts at ${pt(e)}; left ${runs.map((r) => pt(start(r))).join(' | ')}`);
    out.push(runs.splice(i, 1)[0]);
  }
  if (len(sub(end(out.at(-1)), start(out[0]))) > tol) throw new Error('chainClosed: loop does not close');
  // snap each join onto the previous end so the path is exactly continuous
  let d = `M${pt(start(out[0]))}`;
  for (const r of out) for (const s of r.segs) d += segD(s).replace(/^M[^LC]*/, '');
  return d + 'Z';
}
