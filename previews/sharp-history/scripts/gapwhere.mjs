// Where exactly is the tightest point between the exclamation and the wall?
import { readFileSync } from 'node:fs';
import { readPaths, polylines } from './stroke-bbox.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
function dense(p) {
  const raw = polylines(p.d, 64).flatMap(r => r.pts);
  const out = [];
  for (let i = 0; i < raw.length - 1; i++) {
    const a = raw[i], b = raw[i+1], n = Math.max(1, Math.ceil(Math.hypot(b[0]-a[0], b[1]-a[1]) * 16));
    for (let k = 0; k < n; k++) out.push([a[0]+(b[0]-a[0])*k/n, a[1]+(b[1]-a[1])*k/n]);
  }
  out.push(raw[raw.length-1]);
  return out;
}
function closest(file) {
  const paths = readPaths(readFileSync(file, 'utf8'));
  const wall = dense(paths[0]);
  let best = { gap: Infinity };
  for (const p of paths.slice(1)) {
    const ink = p.filled ? 0 : 1;               // a bead paints to its edge, a stroke a unit past its line
    for (const q of dense(p)) for (const w of wall) {
      const d = Math.hypot(q[0]-w[0], q[1]-w[1]) - 1 - ink;
      if (d < best.gap) best = { gap: d, glyph: q, wall: w, which: p.filled ? 'dot' : 'bar' };
    }
  }
  return best;
}
for (const [label, f] of [['rounded', `${K}/triangle-alert.svg`], ['sharp r=1, fitted', 'r1-parts/triangle-alert.svg']]) {
  const b = closest(f);
  console.log(label.padEnd(18), 'gap', b.gap.toFixed(2), 'at', b.which,
    `glyph (${b.glyph.map(v=>+v.toFixed(2)).join(', ')})`, `wall (${b.wall.map(v=>+v.toFixed(2)).join(', ')})`);
}
