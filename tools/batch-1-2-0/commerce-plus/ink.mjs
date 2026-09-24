// Ink box of every variant in a raw/<name>/ folder, each path measured with its own cap and join.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { strokedBBox } from '../../../pipeline/lib/geom.mjs';
export function inkOfSvg(svg) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const m of svg.matchAll(/<path ([^>]*)\/>/g)) {
    const a = m[1], d = /\bd="([^"]+)"/.exec(a)[1];
    const stroked = /stroke="black"/.test(a);
    const cap = (/stroke-linecap="(\w+)"/.exec(a) || [0, 'butt'])[1];
    const join = (/stroke-linejoin="(\w+)"/.exec(a) || [0, 'miter'])[1];
    const q = stroked ? strokedBBox(d, 1, cap, 48, join) : strokedBBox(d, 0, 'butt');
    for (let i = 0; i < 4; i++) b[i] = i < 2 ? Math.min(b[i], q[i]) : Math.max(b[i], q[i]);
  }
  return b;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const dir of process.argv.slice(2)) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.svg')).sort()) {
      const b = inkOfSvg(readFileSync(join(dir, f), 'utf8'));
      console.log(dir.split('/').pop().padEnd(24), f.replace('Container=regular, ', '').padEnd(36), b.map((v) => v.toFixed(3)).join(' '));
    }
  }
}
