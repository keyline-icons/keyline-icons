// Change ONLY the corner radius, keep the house round cap. Then every join is a
// tangent arc and the painted box is just the geometry box grown by a unit, so
// comparing geometry boxes is the whole test.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const { refillet } = await import('./refillet-lib.mjs');
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const box = (list) => { let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const d of list) { const p = pathBBox(d); if (!p) continue;
    b = [Math.min(b[0],p[0]), Math.min(b[1],p[1]), Math.max(b[2],p[2]), Math.max(b[3],p[3])]; } return b; };

const radii = [0, 0.5, 1, 1.5, 2];
const files = readdirSync('sharp-roundcap').filter((f) => f.endsWith('.svg'));
const rows = [];
for (const file of files) {
  const T = box(ds(readFileSync(`${K}/${file}`, 'utf8')));
  const src = readFileSync(`sharp-roundcap/${file}`, 'utf8');
  const per = {};
  for (const r of radii) {
    let out = src, bad = false;
    if (r > 0) out = src.replace(/ d="([^"]+)"/g, (m, d) => { const v = refillet(d, r); if (v === null) { bad = true; return m; } return ` d="${v}"`; });
    if (bad) { per[r] = null; continue; }
    if (r === 1) { mkdirSync('r1', { recursive: true }); writeFileSync(`r1/${file}`, out); }
    const b = box(ds(out));
    per[r] = +Math.max(T[0]-b[0], b[2]-T[2], T[1]-b[1], b[3]-T[3], 0).toFixed(3);
  }
  rows.push({ name: file.replace('.svg',''), ...per });
}
writeFileSync('radius-test.json', JSON.stringify(rows, null, 1));
console.log('drawings:', rows.length, '\n');
console.log('radius\tidentical\t<=0.1\t<=0.25\t<=0.5\tover 0.5\tworst');
for (const r of radii) {
  const v = rows.map((x) => x[r]).filter((x) => x !== null);
  const c = (f) => v.filter(f).length;
  const worst = rows.filter(x=>x[r]!==null).sort((a,b)=>b[r]-a[r])[0];
  console.log(`${r}\t${c(x=>x<=0.001)}\t\t${c(x=>x>0.001&&x<=0.1)}\t${c(x=>x>0.1&&x<=0.25)}\t${c(x=>x>0.25&&x<=0.5)}\t${c(x=>x>0.5)}\t\t${worst[r]} (${worst.name})`);
}
console.log('\nstill over 0.25 at r=1:', rows.filter(x=>x[1]>0.25).length);
console.log(rows.filter(x=>x[1]>0.25).sort((a,b)=>b[1]-a[1]).slice(0,20).map(x=>`${x.name} ${x[1]}`).join(', '));
