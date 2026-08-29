// Fix the size without touching the drawing.
//
// Not a scale: only the vertices that actually stick out move, and only in the
// axis they stick out in. A flat base stays flat and at the same height, a
// vertical edge stays vertical, and every element that was never at fault is
// left exactly where it was. On triangle-alert that means the apex drops to
// y=3 and the base corners come in to x=2 and 22, which is the same triangle
// solved rather than a smaller copy of it.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r,-0) ? '0' : String(r); };
const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const box = (list) => { let b=[Infinity,Infinity,-Infinity,-Infinity];
  for (const d of list) { const p = pathBBox(d); if (!p) continue;
    b=[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[2]),Math.max(b[3],p[3])]; } return b; };

function clampPath(d, T) {
  const cx = (v) => Math.min(Math.max(v, T[0]), T[2]);
  const cy = (v) => Math.min(Math.max(v, T[1]), T[3]);
  let out = '', x = 0, y = 0, mx = 0, my = 0;
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M' || U === 'L') { x = args[0]; y = args[1]; if (U === 'M') { mx = x; my = y; }
      out += `${U}${n(cx(x))} ${n(cy(y))}`; }
    else if (U === 'H') { x = args[0]; out += `H${n(cx(x))}`; }
    else if (U === 'V') { y = args[0]; out += `V${n(cy(y))}`; }
    else if (U === 'C') { out += `C${n(cx(args[0]))} ${n(cy(args[1]))} ${n(cx(args[2]))} ${n(cy(args[3]))} ${n(cx(args[4]))} ${n(cy(args[5]))}`; x = args[4]; y = args[5]; }
    else if (U === 'Z') { out += 'Z'; x = mx; y = my; }
    else return null;
  }
  return out;
}

let solved = [], worst = 0, worstName = '';
for (const f of readdirSync('mid').filter((x) => x.endsWith('.svg'))) {
  const rSrc = readFileSync(`${K}/${f}`, 'utf8'), vSrc = readFileSync(`mid/${f}`, 'utf8');
  const T = box(ds(rSrc)), B = box(ds(vSrc));
  if (!T || !B) continue;
  const over = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
  if (over <= 0.001) continue;
  const out = vSrc.replace(/ d="([^"]+)"/g, (m, d) => { const c = clampPath(d, T); return c === null ? m : ` d="${c}"`; });
  writeFileSync(`mid/${f}`, out);
  const after = box(ds(out));
  const left = Math.max(T[0]-after[0], after[2]-T[2], T[1]-after[1], after[3]-T[3], 0);
  solved.push([f.replace('.svg',''), +over.toFixed(2), +left.toFixed(3)]);
  if (left > worst) { worst = left; worstName = f; }
}
solved.sort((a,b)=>b[1]-a[1]);
console.log({ solved: solved.length, worstRemaining: +worst.toFixed(3), worstName });
console.log(solved.slice(0,14).map(([a,b,c])=>`${a} grew ${b} -> ${c}`).join('\n'));
