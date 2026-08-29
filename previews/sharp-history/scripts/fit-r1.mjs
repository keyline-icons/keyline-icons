// Hold the size, change only the shape.
//
// With a round cap and tangent-arc corners the painted box is just the geometry
// box grown by a unit, so matching geometry boxes IS matching painted boxes.
// Move the vertices, re-fillet at r=1, repeat until the box matches. Nothing
// scales the stroke and nothing is left floating.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { pathBBox, tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { refillet } from './refillet-lib.mjs';

const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
mkdirSync('r1-fit', { recursive: true });
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const box = (list) => { let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const d of list) { const p = pathBBox(d); if (!p) continue;
    b = [Math.min(b[0],p[0]), Math.min(b[1],p[1]), Math.max(b[2],p[2]), Math.max(b[3],p[3])]; } return b; };

function xform(d, sx, sy, tx, ty) {
  const X = (v) => n(v * sx + tx), Y = (v) => n(v * sy + ty);
  let out = '', x = 0, y = 0, mx = 0, my = 0;
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') { x = args[0]; y = args[1]; if (U === 'M') { mx = x; my = y; } out += `${U}${X(x)} ${Y(y)}`; }
    else if (U === 'H') { x = args[0]; out += `H${X(x)}`; }
    else if (U === 'V') { y = args[0]; out += `V${Y(y)}`; }
    else if (U === 'C') { out += `C${X(args[0])} ${Y(args[1])} ${X(args[2])} ${Y(args[3])} ${X(args[4])} ${Y(args[5])}`; x = args[4]; y = args[5]; }
    else if (U === 'Z') { out += 'Z'; x = mx; y = my; }
    else return null;
  }
  return out;
}

const over = JSON.parse(readFileSync('radius-test.json', 'utf8')).filter((r) => r['1'] > 0.001).map((r) => r.name);
const rows = [];
for (const name of over) {
  const T = box(ds(readFileSync(`${K}/${name}.svg`, 'utf8')));
  const src = readFileSync(`sharp-roundcap/${name}.svg`, 'utf8');   // the vertex polygon
  let sx = 1, sy = 1, tx = 0, ty = 0, out = src;
  for (let i = 0; i < 40; i++) {
    const moved = src.replace(/ d="([^"]+)"/g, (m, d) => { const v = xform(d, sx, sy, tx, ty); return v === null ? m : ` d="${v}"`; });
    out = moved.replace(/ d="([^"]+)"/g, (m, d) => { const v = refillet(d, 1); return v === null ? m : ` d="${v}"`; });
    const b = box(ds(out));
    const ex = Math.max(Math.abs(b[0]-T[0]), Math.abs(b[1]-T[1]), Math.abs(b[2]-T[2]), Math.abs(b[3]-T[3]));
    if (ex < 0.002) break;
    const kx = (T[2]-T[0]) / (b[2]-b[0]), ky = (T[3]-T[1]) / (b[3]-b[1]);
    sx *= kx; sy *= ky;
    // recentre onto the target after the scale
    const b2 = box(ds(src.replace(/ d="([^"]+)"/g, (m, d) => { const v = xform(d, sx, sy, 0, 0); return v === null ? m : ` d="${v}"`; })
      .replace(/ d="([^"]+)"/g, (m, d) => { const v = refillet(d, 1); return v === null ? m : ` d="${v}"`; })));
    tx = T[0] - b2[0]; ty = T[1] - b2[1];
  }
  writeFileSync(`r1-fit/${name}.svg`, out);
  const b = box(ds(out));
  rows.push({ name, sx: +sx.toFixed(4), sy: +sy.toFixed(4),
    err: +Math.max(Math.abs(b[0]-T[0]), Math.abs(b[1]-T[1]), Math.abs(b[2]-T[2]), Math.abs(b[3]-T[3])).toFixed(4) });
}
rows.sort((a, b) => Math.min(a.sx, a.sy) - Math.min(b.sx, b.sy));
console.log('drawings needing the shape moved:', rows.length);
console.log('worst box error after:', Math.max(...rows.map((r) => r.err)));
for (const r of rows) console.log(`${r.name.padEnd(28)} ${r.sx} x ${r.sy}`);
