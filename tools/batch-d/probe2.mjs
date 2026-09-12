import { readFileSync } from 'node:fs';
const WATER = 'M2 20.3479C4.3679 21.6637 7.179 20.7413 9.5 19.8407C11.671 18.7159 14.2704 18.7635 16.4239 19.8595C18.1685 20.6303 20.0809 21.0813 22 20.8551';
const toks = WATER.match(/[MC]|-?\d*\.?\d+/g);
const cubics = []; let i = 0, cur = null;
while (i < toks.length) {
  const c = toks[i++];
  if (c === 'M') cur = [+toks[i++], +toks[i++]];
  else if (c === 'C') { const c1 = [+toks[i++], +toks[i++]], c2 = [+toks[i++], +toks[i++]], p = [+toks[i++], +toks[i++]]; cubics.push([cur, c1, c2, p]); cur = p; }
}
const at = (k, t) => { const u = 1 - t; return [0, 1].map((j) => u**3*k[0][j] + 3*u*u*t*k[1][j] + 3*u*t*t*k[2][j] + t**3*k[3][j]); };
const yAt = (x) => {
  for (const k of cubics) {
    const lo = Math.min(k[0][0], k[3][0]), hi = Math.max(k[0][0], k[3][0]);
    if (x < lo || x > hi) continue;
    let a = 0, b = 1;
    for (let n = 0; n < 60; n++) { const m = (a + b) / 2; if (at(k, m)[0] < x) a = m; else b = m; }
    return at(k, (a + b) / 2)[1];
  }
  return null;
};
for (const x of [6.5521, 17.4479, 12]) console.log(`wave at x=${x}: y=${yAt(x).toFixed(4)}`);
// and the fill's winding at the porthole
const fill = readFileSync(process.argv[2], 'utf8').match(/<path d="([^"]*)" fill="black"/)[1];
const subs = fill.split(/(?=M)/).filter(Boolean);
const flat = (d) => {
  const t = d.match(/[MLCZ]|-?\d*\.?\d+/g) || []; const pts = []; let j = 0, cur2 = null;
  while (j < t.length) {
    const c = t[j++];
    if (c === 'M') { cur2 = [+t[j++], +t[j++]]; pts.push(cur2); }
    else if (c === 'L') { cur2 = [+t[j++], +t[j++]]; pts.push(cur2); }
    else if (c === 'C') { const c1 = [+t[j++], +t[j++]], c2 = [+t[j++], +t[j++]], p = [+t[j++], +t[j++]];
      for (let n = 1; n <= 16; n++) pts.push(at([cur2, c1, c2, p], n / 16)); cur2 = p; }
  }
  return pts;
};
const winding = (pts, P) => {
  let w = 0;
  for (let n = 0; n < pts.length; n++) {
    const a = pts[n], b = pts[(n + 1) % pts.length];
    if (a[1] <= P[1]) { if (b[1] > P[1] && ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1])) > 0) w++; }
    else if (b[1] <= P[1] && ((b[0]-a[0])*(P[1]-a[1]) - (P[0]-a[0])*(b[1]-a[1])) < 0) w--;
  }
  return w;
};
console.log('subpaths in fill:', subs.length);
let total = 0;
subs.forEach((d, n) => { const w = winding(flat(d), [12, 14.5]); total += w; console.log(`  sub ${n}: winding ${w}  starts ${d.slice(0, 26)}`); });
console.log('total winding at the porthole:', total, total === 0 ? '(a hole)' : '(PAINTED)');
