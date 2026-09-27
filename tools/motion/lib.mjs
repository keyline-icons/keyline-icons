// Shared helpers for the two treatments explored on 27 Sep 2026:
// motion lines on a moving object, and a container joined to its glyph.
import { Path, polyPath, onArc, fillet, add, sub, mul, len, unit, dot, pt, n } from '../v5/geom.mjs';
import { strokedBBox, outlines, minGap } from '../../pipeline/lib/geom.mjs';

export { Path, polyPath, onArc, fillet, add, sub, mul, len, unit, dot, pt, n, strokedBBox, outlines, minGap };

export const R2 = Math.SQRT2;
export const rad = (a) => (a * Math.PI) / 180;
export const deg = (a) => (a * 180) / Math.PI;

/** Ink box of one or more d strings, round caps, half-width 1. */
export function ink(ds) {
  const d = [].concat(ds).join(' ');
  return strokedBBox(d, 1, 'round');
}
export const pads = (b) => [b[0], b[1], 24 - b[2], 24 - b[3]];

/** Ink-to-ink gap between two drawings (every subpath of each), 0 when they cross. */
export function gap(dA, dB) {
  let best = Infinity;
  for (const a of outlines(dA, 96)) for (const b of outlines(dB, 96)) best = Math.min(best, minGap(a, b));
  return best - 2;
}

/** Distance from a point to a drawing's centreline, minus the two half-widths. */
export function gapPoint(p, d) {
  let best = Infinity;
  for (const o of outlines(d, 96)) for (let i = 0; i + 1 < o.length; i++) best = Math.min(best, segDist(p, o[i], o[i + 1]));
  return best - 2;
}
export function segDist(p, a, b) {
  const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return len(sub(p, add(a, mul(ab, t))));
}

/** Pairwise map of an absolute M/L/C/Z path (what the v5 builder emits). */
export function mapPath(d, f) {
  return d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) => { const q = f([+x, +y]); return `${n(q[0])} ${n(q[1])}`; });
}
export const mirrorY = (d) => mapPath(d, ([x, y]) => [x, 24 - y]);
export const mirrorX = (d) => mapPath(d, ([x, y]) => [24 - x, y]);

/** Where the line through P along u meets the circle (c, r); the root with the smaller parameter. */
export function lineCircle(P, u, c, r, pick = 'min') {
  const q = sub(P, c), b = 2 * dot(q, u), cc = dot(q, q) - r * r, disc = b * b - 4 * cc;
  if (disc < 0) throw new Error('line misses circle');
  const t1 = (-b - Math.sqrt(disc)) / 2, t2 = (-b + Math.sqrt(disc)) / 2;
  const t = pick === 'min' ? Math.min(t1, t2) : Math.max(t1, t2);
  return add(P, mul(u, t));
}
export const angleOf = (p, c) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

/**
 * A regular five-point star, the house `star`'s construction: inner vertices at
 * 0.45 of the tip radius, every corner filleted r = 0.5, tips starting at
 * `rot - 90` degrees (screen angles, so +rot turns it clockwise).
 */
export function star5(C, Rv, rot = 0, ratio = 0.45, rTip = 0.5, rIn = 0.5) {
  const pts = [], radii = [];
  for (let k = 0; k < 5; k++) {
    const a1 = rad(rot - 90 + 72 * k), a2 = rad(rot - 90 + 36 + 72 * k);
    pts.push([C[0] + Rv * Math.cos(a1), C[1] + Rv * Math.sin(a1)]); radii.push(rTip);
    pts.push([C[0] + ratio * Rv * Math.cos(a2), C[1] + ratio * Rv * Math.sin(a2)]); radii.push(rIn);
  }
  return polyPath(pts, radii);
}

export function bisect(f, lo, hi, n = 60) {
  // f(lo) and f(hi) differ in sign; returns the root
  let flo = f(lo);
  for (let i = 0; i < n; i++) {
    const m = (lo + hi) / 2, fm = f(m);
    if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m;
  }
  return (lo + hi) / 2;
}

export const seg = (a, b) => `M${pt(a)}L${pt(b)}`;
export const fmt = (v, dp = 2) => { if (Math.abs(v) < 5e-5) return '0'; const s = v.toFixed(dp); return s.includes('.') ? s.replace(/\.?0+$/, '') : s; };
