// node gen21.mjs --out=DIR [name ...]: write the batch in raw/ format into DIR/raw (never into raw/).
import { STYLES, CONTAINERS } from './g21.mjs';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
const { doc } = await import('/Users/zafarismatullaev/Documents/GitHub/keyline-icons/tools/batch-1-4-0/rawio.mjs');
const args = process.argv.slice(2), out = args.find((a) => a.startsWith('--out='))?.slice(6);
const names = args.filter((a) => !a.startsWith('--'));
const want = (n) => !names.length || names.includes(n);
// no zero-length pieces (drawing-a-new-icon.md, generator checks): drop any L or C whose points all
// sit on the current point, and any subpath left with nothing to draw
function dropZero(d) {
  let out = '', cur = null, start = null, sub = '', drew = false;
  const flush = () => { if (drew) out += sub; sub = ''; drew = false; };
  for (const m of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M') { flush(); cur = start = [n[0], n[1]]; sub = 'M' + m[2].trim(); continue; }
    if (m[1] === 'Z') { sub += 'Z'; cur = start; continue; }
    const pts = []; for (let i = 0; i < n.length; i += 2) pts.push([n[i], n[i + 1]]);
    if (pts.every((q) => Math.hypot(q[0] - cur[0], q[1] - cur[1]) < 1e-3)) continue;
    sub += m[1] + m[2].trim(); cur = pts.at(-1); drew = true;
  }
  flush();
  return out;
}
const write = (name, container, f) => {
  const dir = join(out, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const corners of ['regular', 'sharp']) {
    const v = f(corners === 'sharp');
    for (const [style, layers0] of Object.entries(v)) { const layers = layers0.map((l) => ({ ...l, d: dropZero(l.d) })); writeFileSync(join(dir, `Container=${container}, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round')); }
  }
};
let n = 0;
for (const name of Object.keys(STYLES).filter(want)) { rmSync(join(out, "raw", name), { recursive: true, force: true }); try { write(name, "regular", STYLES[name]); n++; } catch (e) { console.log("FAIL", name, e.message.slice(0, 220)); } }
for (const [name, byC] of Object.entries(CONTAINERS)) if (want(name)) for (const [c, f] of Object.entries(byC)) write(name, c, f);
console.log(`wrote ${n} sets into ${out}/raw`);
