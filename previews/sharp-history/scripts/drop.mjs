// Drop the exclamation and watch both gaps: the bar's top pulls away from the
// sloping wall, the dot closes on the floor. Somewhere they cross.
import { readFileSync, writeFileSync } from 'node:fs';
import { readPaths, polylines } from './stroke-bbox.mjs';
const base = readFileSync('r1-parts/triangle-alert.svg', 'utf8');
function dense(p) {
  const raw = polylines(p.d, 64).flatMap(r => r.pts), out = [];
  for (let i = 0; i < raw.length - 1; i++) {
    const a = raw[i], b = raw[i+1], n = Math.max(1, Math.ceil(Math.hypot(b[0]-a[0], b[1]-a[1]) * 16));
    for (let k = 0; k < n; k++) out.push([a[0]+(b[0]-a[0])*k/n, a[1]+(b[1]-a[1])*k/n]);
  }
  out.push(raw[raw.length-1]); return out;
}
function gaps(src) {
  const paths = readPaths(src), wall = dense(paths[0]);
  const out = [];
  for (const p of paths.slice(1)) {
    const ink = p.filled ? 0 : 1;
    let best = Infinity;
    for (const q of dense(p)) for (const w of wall) best = Math.min(best, Math.hypot(q[0]-w[0], q[1]-w[1]) - 1 - ink);
    out.push({ what: p.filled ? 'dot' : 'bar', gap: +best.toFixed(3) });
  }
  return out;
}
const move = (d, shorten = 0) => base
  .replace(/M12 9L12 13/, `M12 ${+(9 + d + shorten).toFixed(3)}L12 ${+(13 + d).toFixed(3)}`)
  .replace(/M13 17C13 17\.5523 12\.5523 18 12 18C11\.4477 18 11 17\.5523 11 17C11 16\.4477 11\.4477 16 12 16C12\.5523 16 13 16\.4477 13 17Z/,
    `M13 ${+(17+d).toFixed(3)}C13 ${+(17.5523+d).toFixed(3)} 12.5523 ${+(18+d).toFixed(3)} 12 ${+(18+d).toFixed(3)}C11.4477 ${+(18+d).toFixed(3)} 11 ${+(17.5523+d).toFixed(3)} 11 ${+(17+d).toFixed(3)}C11 ${+(16.4477+d).toFixed(3)} 11.4477 ${+(16+d).toFixed(3)} 12 ${+(16+d).toFixed(3)}C12.5523 ${+(16+d).toFixed(3)} 13 ${+(16.4477+d).toFixed(3)} 13 ${+(17+d).toFixed(3)}Z`);

console.log('drop\tbar gap\tdot gap\tworst');
for (const d of [0, 0.25, 0.5, 0.75, 1]) {
  const g = gaps(move(d));
  console.log(`${d}\t${g[0].gap}\t${g[1].gap}\t${Math.min(...g.map(x=>x.gap)).toFixed(3)}`);
}
// best plain drop
let best = { worst: -1 };
for (let d = 0; d <= 1.2; d += 0.01) {
  const g = gaps(move(d)), w = Math.min(...g.map(x=>x.gap));
  if (w > best.worst) best = { d: +d.toFixed(2), worst: +w.toFixed(3), bar: g[0].gap, dot: g[1].gap };
}
console.log('\nbest plain drop:', best);
// drop plus a shorter bar
let best2 = { worst: -1 };
for (let d = 0; d <= 1.2; d += 0.05) for (let s = 0; s <= 1.2; s += 0.05) {
  const g = gaps(move(d, s)), w = Math.min(...g.map(x=>x.gap));
  if (w > best2.worst + 1e-9) best2 = { drop: +d.toFixed(2), shorten: +s.toFixed(2), worst: +w.toFixed(3), bar: g[0].gap, dot: g[1].gap };
}
console.log('best drop plus a shorter bar:', best2);
writeFileSync('triangle-alert-dropped.svg', move(best.d));

console.log('\nround-number options:');
console.log('drop\tshorten\tbar\tdot\tworst');
for (const [d, s] of [[0.5, 0], [0, 1], [0.5, 0.5], [0, 1.15], [0.25, 0.75]]) {
  const g = gaps(move(d, s));
  console.log(`${d}\t${s}\t${g[0].gap}\t${g[1].gap}\t${Math.min(...g.map(x=>x.gap)).toFixed(3)}`);
}
writeFileSync('triangle-alert-half-drop.svg', move(0.5));
writeFileSync('triangle-alert-shortbar.svg', move(0, 1));
