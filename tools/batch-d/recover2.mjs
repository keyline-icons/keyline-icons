/**
 * His centreline out of an outlined piece: pair each outer sample with its
 * NEAREST inner sample and take the midpoint.
 *
 * Pairing by arc length misaligns where the two runs differ in length, which is
 * every curved piece, and pairing across the caps curls the result; nearest
 * point is stable in the middle, so the fit runs on the middle 85% with the
 * termini held. One cubic then lands within a few thousandths of his curve.
 */
import { readFileSync } from 'node:fs';
const src = readFileSync(process.argv[2], 'utf8');
const d = src.match(/ d="([^"]*)"/)[1];
const toks = d.match(/[MLCZHV]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
const subs = []; let i = 0, cmd = null, cur = null, start = null, cell = null;
const n = () => parseFloat(toks[i++]);
while (i < toks.length) {
  if (/^[MLCZHV]$/i.test(toks[i])) cmd = toks[i++].toUpperCase();
  if (cmd === 'M') { cur = [n(), n()]; start = cur; cell = { segs: [] }; subs.push(cell); cmd = 'L'; }
  else if (cmd === 'L') { const p = [n(), n()]; cell.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
  else if (cmd === 'H') { const p = [n(), cur[1]]; cell.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
  else if (cmd === 'V') { const p = [cur[0], n()]; cell.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
  else if (cmd === 'C') { const a = [n(), n()], b = [n(), n()], e = [n(), n()]; cell.segs.push({ k: 'C', a: cur, c1: a, c2: b, b: e }); cur = e; }
  else if (cmd === 'Z') { cur = start; } else i++;
}
const D = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const at = (s, u) => (s.k === 'L'
  ? [s.a[0] + (s.b[0] - s.a[0]) * u, s.a[1] + (s.b[1] - s.a[1]) * u]
  : [0, 1].map((k) => (1 - u) ** 3 * s.a[k] + 3 * (1 - u) ** 2 * u * s.c1[k] + 3 * (1 - u) * u * u * s.c2[k] + u ** 3 * s.b[k]));

const idx = +process.argv[3];
const T0 = [+process.argv[4], +process.argv[5]], T1 = [+process.argv[6], +process.argv[7]];
const segs = subs[idx].segs;
const pts = [];
for (const s of segs) for (let k = 0; k < 80; k++) pts.push(at(s, k / 80));
const nearest = (p) => pts.reduce((b, q, j) => (D(q, p) < D(pts[b], p) ? j : b), 0);
const i0 = nearest(T0), i1 = nearest(T1);
const wrap = (a, b) => (a <= b ? pts.slice(a, b + 1) : pts.slice(a).concat(pts.slice(0, b + 1)));
const A = wrap(i0, i1), B = wrap(i1, i0);
const closest = (p, run) => run.reduce((b, q) => (D(q, p) < D(b, p) ? q : b), run[0]);
let mid = A.map((p) => { const q = closest(p, B); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; });
// order along the piece, then keep the middle where the pairing is honest
mid = mid.filter((p) => D(p, T0) > 1.2 && D(p, T1) > 1.2);
function fit(P, p0, p3) {
  const cum = [0]; for (let k = 1; k < P.length; k++) cum.push(cum[k - 1] + D(P[k - 1], P[k]));
  const tot = cum[cum.length - 1];
  const d0 = D(P[0], p0), d1 = D(P[P.length - 1], p3);
  const t = cum.map((v) => (v + d0) / (tot + d0 + d1));
  let a11 = 0, a12 = 0, a22 = 0; const b = [[0, 0], [0, 0]];
  for (let k = 0; k < P.length; k++) {
    const u = 1 - t[k], B1 = 3 * u * u * t[k], B2 = 3 * u * t[k] * t[k], B0 = u ** 3, B3 = t[k] ** 3;
    a11 += B1 * B1; a12 += B1 * B2; a22 += B2 * B2;
    for (const q of [0, 1]) { const r = P[k][q] - B0 * p0[q] - B3 * p3[q]; b[0][q] += B1 * r; b[1][q] += B2 * r; }
  }
  const det = a11 * a22 - a12 * a12;
  const c1 = [0, 1].map((q) => (a22 * b[0][q] - a12 * b[1][q]) / det);
  const c2 = [0, 1].map((q) => (a11 * b[1][q] - a12 * b[0][q]) / det);
  let worst = 0;
  for (let k = 0; k < P.length; k++) {
    const u = 1 - t[k];
    const q = [0, 1].map((z) => u ** 3 * p0[z] + 3 * u * u * t[k] * c1[z] + 3 * u * t[k] * t[k] * c2[z] + t[k] ** 3 * p3[z]);
    worst = Math.max(worst, D(q, P[k]));
  }
  return { c1, c2, worst };
}
const r = (p) => p.map((v) => Math.round(v * 1e4) / 1e4).join(' ');
if (process.argv[8] === '--split') {
  // an S needs two cubics: cut at the sample where the turn reverses
  let best = 0, bestK = Math.floor(mid.length / 2);
  for (let k = 6; k < mid.length - 6; k++) {
    const a = mid[k - 5], b = mid[k], c = mid[k + 5];
    const cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
    if (k > 6) { const prev = best; if (Math.sign(cr) !== Math.sign(prev) && prev !== 0) bestK = k; }
    best = cr;
  }
  const J = mid[bestK];
  const f1 = fit(mid.slice(0, bestK + 1), T0, J), f2 = fit(mid.slice(bestK), J, T1);
  console.log(`${idx}: M${r(T0)}C${r(f1.c1)} ${r(f1.c2)} ${r(J)}C${r(f2.c1)} ${r(f2.c2)} ${r(T1)}`);
  console.log(`     split at ${r(J)}  worst ${Math.max(f1.worst, f2.worst).toFixed(4)}`);
} else {
  const f = fit(mid, T0, T1);
  console.log(`${idx}: M${r(T0)}C${r(f.c1)} ${r(f.c2)} ${r(T1)}   samples ${mid.length}  worst ${f.worst.toFixed(4)}`);
}
