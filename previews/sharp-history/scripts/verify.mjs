// For every file, compare the source bbox against the sharp output's bbox.
// Where nothing was removed the two must agree exactly; the emitter is the
// only thing that touched the path, and it must be lossless.
import { readdirSync, readFileSync } from 'node:fs';
import { pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const I='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const ds=(s)=>[...s.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]);
let checked=0, drift=[];
for (const f of readdirSync(`${I}/stroke`)) {
  if (!f.endsWith('.svg')) continue;
  const a=ds(readFileSync(`${I}/stroke/${f}`,'utf8')), b=ds(readFileSync(`${I}/sharp/${f}`,'utf8'));
  if (a.length!==b.length) { drift.push([f,'path count']); continue; }
  for (let i=0;i<a.length;i++){
    // only paths that came through unchanged in command count
    const ca=(a[i].match(/C/g)||[]).length, cb=(b[i].match(/C/g)||[]).length;
    if (ca!==cb) continue;                       // a fillet went, bounds may move
    checked++;
    const A=pathBBox(a[i]), B=pathBBox(b[i]);
    const d=Math.max(...A.map((v,j)=>Math.abs(v-B[j])));
    if (d>0.001) drift.push([f,i,+d.toFixed(3)]);
  }
}
console.log({pathsCheckedUnchanged:checked, drift:drift.slice(0,20), driftCount:drift.length});
