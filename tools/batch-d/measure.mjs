/** Measure a handed-over drawing against the house rules before fitting it. */
import { readFileSync } from 'node:fs';
import { strokedBBox, outlines, minGap, roundedCorners, subpaths } from '../../pipeline/lib/geom.mjs';

const file = process.argv[2];
const src = readFileSync(file, 'utf8');
const paths = [...src.matchAll(/<path ([^>]*?)d="([^"]*)"([^>]*)>/g)]
  .map((m) => ({ attrs: m[1] + m[3], d: m[2] }));

for (const [i, p] of paths.entries()) {
  const stroked = !/fill="black"/.test(p.attrs) || /stroke="black"/.test(p.attrs);
  const b = strokedBBox(p.d, stroked ? 1 : 0, 'round');
  console.log(`path ${i} ${stroked ? 'stroke' : 'fill  '} ink ${b.map((v) => v.toFixed(3).padStart(8)).join(' ')}  subpaths ${subpaths(p.d, 8).subs.length}  chars ${p.d.length}`);
  for (const c of roundedCorners(p.d)) console.log(`   corner r=${c.radius.toFixed(4)}`);
}
const all = paths.map((p) => p.d).join('');
const stroked = !/fill="black"/.test(paths[0].attrs);
const B = strokedBBox(all, 1, 'round');
console.log('WHOLE ink', B.map((v) => v.toFixed(3)).join(', '), ` ${(B[2] - B[0]).toFixed(2)} x ${(B[3] - B[1]).toFixed(2)}`,
  ` pads L${B[0].toFixed(2)} T${B[1].toFixed(2)} R${(24 - B[2]).toFixed(2)} B${(24 - B[3]).toFixed(2)}`);

// tightest painted gap between subpaths of the stroked layers
const polys = [];
for (const p of paths) {
  const isStroke = !/fill="black"/.test(p.attrs) || /stroke="black"/.test(p.attrs);
  for (const o of outlines(p.d, 48)) polys.push({ o, reach: isStroke ? 1 : 0 });
}
let best = [Infinity];
for (let i = 0; i < polys.length; i++)
  for (let j = i + 1; j < polys.length; j++) {
    const g = minGap(polys[i].o, polys[j].o);
    if (g <= 1e-6) continue;
    const painted = g - polys[i].reach - polys[j].reach;
    if (painted < best[0]) best = [painted, i, j];
  }
console.log('tightest painted gap', best[0] === Infinity ? 'n/a' : best[0].toFixed(3), best.slice(1).join('/'));
