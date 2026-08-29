// How each set places the same drawing in its own box, in 24 units of painted ink.
import { readFileSync } from 'node:fs';
import { pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';

function box(ds, { half = 0, scale = 1 } = {}) {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const d of ds) { const p = pathBBox(d); if(!p) continue;
    b = [Math.min(b[0],p[0]), Math.min(b[1],p[1]), Math.max(b[2],p[2]), Math.max(b[3],p[3])]; }
  return [ (b[0]-half)*scale, (b[1]-half)*scale, (b[2]+half)*scale, (b[3]+half)*scale ];
}
const ds=(s)=>[...s.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]);

const rows = [];
const add=(label, b)=>rows.push([label, ...b.map(v=>+v.toFixed(2)), +(b[2]-b[0]).toFixed(2), +(b[3]-b[1]).toFixed(2)]);

// Keyline: 2px stroke, so a unit of ink each side of the path.
add('keyline rounded', box(ds(readFileSync(`${K}/triangle-alert.svg`,'utf8')), {half:1}));
add('keyline sharp', box(ds(readFileSync('sharp/triangle-alert.svg','utf8')), {half:1}));
add('keyline fitted', box(ds(readFileSync('fitted/triangle-alert.svg','utf8')), {half:1}));

// Hugeicons Alert02, stroke 1.5 on the same 24 box.
const hug = readFileSync('prior/package/dist/esm/Alert02Icon.js','utf8');
add('hugeicons stroke', box([...hug.matchAll(/d: "([^"]+)"/g)].map(m=>m[1]), {half:0.75}));

// Font Awesome solid, 512 box, filled: the outline is the ink.
const fa = readFileSync('prior/fa/package/svgs/solid/triangle-exclamation.svg','utf8');
add('fontawesome solid', box(ds(fa), {scale:24/512}));

console.log(['drawing','x0','y0','x1','y1','w','h'].join('\t'));
for (const r of rows) console.log(r.join('\t'));
