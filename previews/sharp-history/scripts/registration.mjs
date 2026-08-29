// A duotone's tint is the stroke offset outward by half the stroke width, so
// EVERY point on the tint outline should sit exactly 1 unit from the stroke
// centreline. Bounding boxes cannot see a corner that slid sideways; this can.
import { readdirSync, readFileSync } from 'node:fs';
import { polylines } from './stroke-bbox.mjs';

const R = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/duotone';

function split(src) {
  const tint = [], strokes = [];
  const root = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  for (const m of src.matchAll(/<path ([^>]*)\/>/g)) {
    const a = m[1], d = /d="([^"]*)"/.exec(a)[1];
    const st = root && !/stroke="none"/.test(a);
    if (/fill-opacity/.test(a) && !st) tint.push(d); else if (st) strokes.push(d);
  }
  return { tint, strokes };
}
const pts = (ds) => ds.flatMap((d) => polylines(d, 48).flatMap((r) => r.pts));
const segs = (ds) => ds.flatMap((d) => polylines(d, 48).flatMap((r) => {
  const out = []; for (let i = 0; i < r.pts.length - 1; i++) out.push([r.pts[i], r.pts[i+1]]); return out;
}));
function distTo(p, S) {
  let m = Infinity;
  for (const [a, b] of S) {
    const vx = b[0]-a[0], vy = b[1]-a[1], L2 = vx*vx + vy*vy;
    let t = L2 ? ((p[0]-a[0])*vx + (p[1]-a[1])*vy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(p[0]-a[0]-vx*t, p[1]-a[1]-vy*t);
    if (d < m) m = d;
  }
  return m;
}
// how far the tint strays from "1 unit off the centreline", ignoring the
// endpoints of open strokes where the offset legitimately turns a corner
function offsetError(tint, strokes) {
  const S = segs(strokes);
  if (!S.length) return null;
  const errs = pts(tint).map((p) => Math.abs(distTo(p, S) - 1));
  errs.sort((a, b) => a - b);
  return errs[Math.floor(errs.length * 0.98)];   // 98th percentile, so a lone cap does not dominate
}

const DIR = process.argv[2] || 'duotone-mid';
const rows = [];
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg'))) {
  const A = split(readFileSync(`${R}/${f}`, 'utf8').replace(/\n\s*/g, ''));
  const B = split(readFileSync(`${DIR}/${f}`, 'utf8').replace(/\n\s*/g, ''));
  if (!A.tint.length || !A.strokes.length) continue;
  const before = offsetError(A.tint, A.strokes), after = offsetError(B.tint, B.strokes);
  if (before === null || after === null || before === undefined || after === undefined) continue;
  rows.push([f.replace('.svg', ''), +before.toFixed(2), +after.toFixed(2), +(after - before).toFixed(2)]);
}
rows.sort((a, b) => b[3] - a[3]);
// the metric only means anything where the tint actually traces the stroke;
// a container tint (square-*, whose square is never stroked) sits nowhere near
// one, and reads as a huge error in the rounded original too
const usable = rows.filter((r) => r[1] <= 0.3);
const worse = usable.filter((r) => r[3] > 0.25);
console.log({ measured: rows.length, tintTracesStroke: usable.length, worseThanRounded: worse.length });
console.log(worse.slice(0, 25).map(([n, b, a, d]) => `${n} ${b}->${a}`).join(', '));
