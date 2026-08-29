// Where an open end used to LAND on another part of the drawing, does it still?
// The generator pushes every free end out by a unit so a butt cap paints where
// a round cap did, which is right for an end in open space and wrong for an end
// that was already touching something.
import { readFileSync } from 'node:fs';
import { readPaths, polylines } from './stroke-bbox.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';

function parts(file) {
  const runs = [];
  for (const p of readPaths(readFileSync(file, 'utf8'))) for (const r of polylines(p.d, 24)) runs.push(r);
  return runs;
}
function dist(p, run) {
  let m = Infinity;
  for (let i = 0; i < run.pts.length - 1; i++) {
    const a = run.pts[i], b = run.pts[i+1];
    const vx = b[0]-a[0], vy = b[1]-a[1], L = vx*vx + vy*vy;
    let t = L ? ((p[0]-a[0])*vx + (p[1]-a[1])*vy) / L : 0;
    t = Math.max(0, Math.min(1, t));
    m = Math.min(m, Math.hypot(p[0]-a[0]-vx*t, p[1]-a[1]-vy*t));
  }
  return m;
}
// An open end "lands" if it sits on some other run.
function landings(runs) {
  const out = [];
  runs.forEach((r, i) => {
    if (r.closed) return;
    for (const end of [r.pts[0], r.pts[r.pts.length-1]]) {
      let best = Infinity;
      runs.forEach((o, j) => { if (i !== j) best = Math.min(best, dist(end, o)); });
      out.push(best);
    }
  });
  return out;
}
const names = readFileSync('grew.txt','utf8').trim().split('\n');
const broken = [];
for (const n of names) {
  const R = landings(parts(`${K}/${n}.svg`));
  const S = landings(parts(`solved/${n}.svg`));
  if (R.length !== S.length) { broken.push([n, 'shape changed']); continue; }
  // an end that was touching (<=0.05) and now is not, or vice versa
  let worst = 0;
  for (let i = 0; i < R.length; i++) if (R[i] <= 0.05) worst = Math.max(worst, S[i]);
  if (worst > 0.05) broken.push([n, +worst.toFixed(2)]);
}
console.log('drawings where an end that landed on the drawing no longer does:', broken.length);
console.log(broken.map(([a,b]) => `${a} ${b}`).join('\n'));
