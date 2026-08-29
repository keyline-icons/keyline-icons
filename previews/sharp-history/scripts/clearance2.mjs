// Painted daylight between the container and whatever sits inside it.
// Centreline distance minus a unit of ink on each side. The house rule is 2.
import { readFileSync } from 'node:fs';
import { readPaths, polylines } from './stroke-bbox.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';

function pts(p) {
  const out = polylines(p.d, 48).flatMap(r => r.pts);
  // densify so a long straight edge does not hide its nearest point
  const dense = [];
  for (let i = 0; i < out.length - 1; i++) {
    const a = out[i], b = out[i+1], n = Math.max(1, Math.ceil(Math.hypot(b[0]-a[0], b[1]-a[1]) * 8));
    for (let k = 0; k < n; k++) dense.push([a[0] + (b[0]-a[0])*k/n, a[1] + (b[1]-a[1])*k/n]);
  }
  dense.push(out[out.length-1]);
  return dense;
}
function gap(file, opts) {
  const paths = readPaths(readFileSync(file, 'utf8'));
  if (paths.length < 2) return null;
  const body = pts(paths[0]);
  let min = Infinity;
  for (const p of paths.slice(1)) {
    // a filled bead paints to its own edge, a stroked glyph a unit past its line
    const inkOther = p.filled ? 0 : 1;
    for (const q of pts(p)) for (const b of body) min = Math.min(min, Math.hypot(q[0]-b[0], q[1]-b[1]) - 1 - inkOther);
  }
  return +min.toFixed(2);
}
for (const n of ['triangle-alert','tag','home']) {
  console.log(n.padEnd(15), 'rounded', gap(`${K}/${n}.svg`), ' r=1', gap(`r1/${n}.svg`), ' r=1 fitted', gap(`r1-parts/${n}.svg`));
}
