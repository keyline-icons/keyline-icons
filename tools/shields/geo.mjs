// Path geometry for the shield batch: parse M/L/H/V/C/Z into segments, split
// cubics, find where a path crosses u = x - y = k, offset a run of cubics.
import { arcTo } from '../v5/geom.mjs';

export const f = (v) => { const r = Math.round(v * 1e4) / 1e4; return String(Object.is(r, -0) ? 0 : r); };
export const P = (p) => `${f(p[0])} ${f(p[1])}`;
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const unit = (a) => mul(a, 1 / len(a));
export const u = (p) => p[0] - p[1];
export const deg = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** Subpaths of absolute segments: { start, segs: [{ k: 'L'|'C', a, c1?, c2?, b }], closed }. */
export function parse(d) {
  const tok = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/g);
  const subs = [];
  let i = 0, cmd, cur, start, sp;
  const n = () => +tok[i++];
  while (i < tok.length) {
    if (/^[MLHVCZ]$/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'M') { cur = [n(), n()]; start = cur; sp = { start, segs: [], closed: false }; subs.push(sp); cmd = 'L'; }
    else if (cmd === 'L') { const p = [n(), n()]; sp.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (cmd === 'H') { const p = [n(), cur[1]]; sp.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (cmd === 'V') { const p = [cur[0], n()]; sp.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (cmd === 'C') { const c1 = [n(), n()], c2 = [n(), n()], p = [n(), n()]; sp.segs.push({ k: 'C', a: cur, c1, c2, b: p }); cur = p; }
    else if (cmd === 'Z') { if (len(sub(cur, start)) > 1e-9) sp.segs.push({ k: 'L', a: cur, b: start }); sp.closed = true; cur = start; cmd = null; }
    else throw new Error('bad path at ' + tok[i]);
  }
  return subs;
}
export const emitSegs = (segs, close = false) =>
  `M${P(segs[0].a)}` + segs.map((s) => (s.k === 'L' ? `L${P(s.b)}` : `C${P(s.c1)} ${P(s.c2)} ${P(s.b)}`)).join('') + (close ? 'Z' : '');
export function at(s, t) {
  if (s.k === 'L') return add(s.a, mul(sub(s.b, s.a), t));
  const v = 1 - t;
  return [0, 1].map((j) => v * v * v * s.a[j] + 3 * v * v * t * s.c1[j] + 3 * v * t * t * s.c2[j] + t * t * t * s.b[j]);
}
export function tan(s, t) {
  if (s.k === 'L') return unit(sub(s.b, s.a));
  const v = 1 - t;
  const d = [0, 1].map((j) => 3 * v * v * (s.c1[j] - s.a[j]) + 6 * v * t * (s.c2[j] - s.c1[j]) + 3 * t * t * (s.b[j] - s.c2[j]));
  return len(d) > 1e-12 ? unit(d) : unit(sub(s.b, s.a));
}
/** De Casteljau split at t. */
export function split(s, t) {
  if (s.k === 'L') { const m = at(s, t); return [{ k: 'L', a: s.a, b: m }, { k: 'L', a: m, b: s.b }]; }
  const L = (p, q) => add(p, mul(sub(q, p), t));
  const p01 = L(s.a, s.c1), p12 = L(s.c1, s.c2), p23 = L(s.c2, s.b), p012 = L(p01, p12), p123 = L(p12, p23), m = L(p012, p123);
  return [{ k: 'C', a: s.a, c1: p01, c2: p012, b: m }, { k: 'C', a: m, c1: p123, c2: p23, b: s.b }];
}
/** Parameters in (0, 1) where g(at(s, t)) = 0. */
export function roots(s, g) {
  const N = 256, out = [];
  let t0 = 0, v0 = g(at(s, 0));
  for (let i = 1; i <= N; i++) {
    const t1 = i / N, v1 = g(at(s, t1));
    if (v0 === 0 && t0 > 0) out.push(t0);
    else if (v0 * v1 < 0) { let lo = t0, hi = t1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (g(at(s, lo)) * g(at(s, m)) <= 0) hi = m; else lo = m; } out.push((lo + hi) / 2); }
    t0 = t1; v0 = v1;
  }
  return out.filter((t) => t > 1e-9 && t < 1 - 1e-9);
}
/** Every segment split where u crosses any of ks. */
export function splitU(segs, ks) {
  const out = [];
  for (const s of segs) {
    const ts = [...new Set(ks.flatMap((k) => roots(s, (p) => u(p) - k)).map((t) => +t.toFixed(13)))].sort((a, b) => a - b);
    let rest = s, prev = 0;
    for (const t of ts) { const [l, r] = split(rest, (t - prev) / (1 - prev)); out.push(l); rest = r; prev = t; }
    out.push(rest);
  }
  return out;
}
/** Runs of a CLOSED contour's pieces that keep(midpoint) accepts, joined across the seam. */
export function runsOf(pieces, keep) {
  const flags = pieces.map((s) => keep(at(s, 0.5)));
  const k0 = flags.findIndex((x) => !x);
  if (k0 < 0) return [pieces];
  const runs = []; let cur = null;
  for (let i = 1; i <= pieces.length; i++) {
    const j = (k0 + i) % pieces.length;
    if (flags[j]) (cur ||= []).push(pieces[j]); else if (cur) { runs.push(cur); cur = null; }
  }
  if (cur) runs.push(cur);
  return runs;
}
export const arcSegs = (c, r, a0, a1) => {
  let p = [c[0] + r * Math.cos((a0 * Math.PI) / 180), c[1] + r * Math.sin((a0 * Math.PI) / 180)];
  return arcTo(c, r, a0, a1).map((q) => { const s = { k: 'C', a: p, c1: q.c1, c2: q.c2, b: q.p }; p = q.p; return s; });
};
/** Offset one cubic by `d` along the left normal of travel (screen coordinates):
 *  ends moved along their normals, handles kept on the end tangents with their
 *  lengths fitted by least squares to the true offset, split until within tol. */
export function offsetCubic(s, d, tol = 0.002) {
  const nrm = (t) => [t[1], -t[0]];
  const O = (t) => add(at(s, t), mul(nrm(tan(s, t)), d));
  const a = O(0), b = O(1), t0 = tan(s, 0), t1 = tan(s, 1);
  const B = (t) => { const v = 1 - t; return [v * v * v, 3 * v * v * t, 3 * v * t * t, t * t * t]; };
  // C(t) = (B0 + B1) a + (B2 + B3) b + alpha B1 t0 - beta B2 t1, solved for alpha, beta
  let m11 = 0, m12 = 0, m22 = 0, r1 = 0, r2 = 0;
  for (const t of [0.15, 0.3, 0.45, 0.55, 0.7, 0.85]) {
    const [b0, b1, b2, b3] = B(t), o = O(t);
    const res = sub(o, add(mul(a, b0 + b1), mul(b, b2 + b3)));
    const g1 = mul(t0, b1), g2 = mul(t1, -b2);
    m11 += g1[0] * g1[0] + g1[1] * g1[1]; m12 += g1[0] * g2[0] + g1[1] * g2[1]; m22 += g2[0] * g2[0] + g2[1] * g2[1];
    r1 += g1[0] * res[0] + g1[1] * res[1]; r2 += g2[0] * res[0] + g2[1] * res[1];
  }
  const det = m11 * m22 - m12 * m12;
  const alpha = (r1 * m22 - r2 * m12) / det, beta = (m11 * r2 - m12 * r1) / det;
  const cand = { k: 'C', a, c1: add(a, mul(t0, alpha)), c2: sub(b, mul(t1, beta)), b };
  let worst = 0;
  for (let i = 0; i <= 48; i++) { const want = O(i / 48); let m = Infinity; for (let j = 0; j <= 240; j++) m = Math.min(m, len(sub(at(cand, j / 240), want))); worst = Math.max(worst, m); }
  if (alpha > 0 && beta > 0 && worst <= tol) return [cand];
  const [l, r] = split(s, 0.5);
  return [...offsetCubic(l, d, tol), ...offsetCubic(r, d, tol)];
}
/** The closest point on a contour's segments to q: { i, t, p, dist }. */
export function closest(segs, q) {
  let best = { dist: Infinity };
  segs.forEach((s, i) => {
    let bt = 0, bd = Infinity;
    for (let j = 0; j <= 400; j++) { const dd = len(sub(at(s, j / 400), q)); if (dd < bd) { bd = dd; bt = j / 400; } }
    let lo = Math.max(0, bt - 1 / 400), hi = Math.min(1, bt + 1 / 400);
    for (let k = 0; k < 60; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (len(sub(at(s, m1), q)) < len(sub(at(s, m2), q))) hi = m2; else lo = m1; }
    const t = (lo + hi) / 2, dd = len(sub(at(s, t), q));
    if (dd < best.dist) best = { i, t, p: at(s, t), dist: dd };
  });
  return best;
}
/** A stroke's painted outline: round-capped capsule or butt bar, from a to b. */
export function footprint(a, b, round) {
  const t = unit(sub(b, a)), n = [-t[1], t[0]], K = 0.5522847498;
  const q = (c, s, w) => P(add(add(c, mul(n, s)), mul(t, w)));
  if (!round) return `M${q(a, 1, 0)}L${q(b, 1, 0)}L${q(b, -1, 0)}L${q(a, -1, 0)}Z`;
  return `M${q(a, 1, 0)}L${q(b, 1, 0)}C${q(b, 1, K)} ${q(b, K, 1)} ${q(b, 0, 1)}C${q(b, -K, 1)} ${q(b, -1, K)} ${q(b, -1, 0)}L${q(a, -1, 0)}C${q(a, -1, -K)} ${q(a, -K, -1)} ${q(a, 0, -1)}C${q(a, K, -1)} ${q(a, 1, -K)} ${q(a, 1, 0)}Z`;
}
/** A path moved by (dx, dy), command by command (never by regex over number pairs). */
export const translate = (d, dx, dy) => parse(d).map((sp) => {
  const m = (p) => [p[0] + dx, p[1] + dy];
  const segs = sp.segs.map((s) => (s.k === 'L' ? { k: 'L', a: m(s.a), b: m(s.b) } : { k: 'C', a: m(s.a), c1: m(s.c1), c2: m(s.c2), b: m(s.b) }));
  return emitSegs(segs, sp.closed);
}).join('');
