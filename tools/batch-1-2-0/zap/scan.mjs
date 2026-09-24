// Find the plus sign in every variant of <base>-plus: two subpaths, a vertical and a
// horizontal run of the same length (6 regular, 8 sharp) crossing at their midpoints.
import { readFileSync, existsSync } from 'node:fs';
import { RAW } from '../paths.mjs';
export const src = (name) => RAW + '/' + name + '/';
const num = '(-?[\\d.]+)';
const V = new RegExp(`M${num} ${num}(?:V${num}|L${num} ${num})`, 'y');
export function subpaths(d) { return d.match(/M[^M]+/g) || []; }
function run(sp) {
  const t = sp.match(/^M(-?[\d.]+) (-?[\d.]+)(?:V(-?[\d.]+)|H(-?[\d.]+)|L(-?[\d.]+) (-?[\d.]+))$/);
  if (!t) return null;
  const x0 = +t[1], y0 = +t[2];
  let x1 = x0, y1 = y0;
  if (t[3] !== undefined) y1 = +t[3]; else if (t[4] !== undefined) x1 = +t[4]; else { x1 = +t[5]; y1 = +t[6]; }
  return { x0, y0, x1, y1 };
}
export function findPlus(svg) {
  const hits = [];
  for (const m of svg.matchAll(/<path[^>]* d="([^"]+)"[^>]*>/g)) {
    const subs = subpaths(m[1]);
    for (let i = 0; i < subs.length; i++) for (let j = 0; j < subs.length; j++) {
      const a = run(subs[i]), b = run(subs[j]);
      if (!a || !b || i === j) continue;
      const va = a.x0 === a.x1 && a.y0 !== a.y1, hb = b.y0 === b.y1 && b.x0 !== b.x1;
      if (!va || !hb) continue;
      const la = Math.abs(a.y1 - a.y0), lb = Math.abs(b.x1 - b.x0);
      if (la !== lb || (la !== 6 && la !== 8)) continue;
      const cx = a.x0, cy = (a.y0 + a.y1) / 2;
      if (Math.abs((b.x0 + b.x1) / 2 - cx) > 1e-9 || Math.abs(b.y0 - cy) > 1e-9) continue;
      hits.push({ d: m[1], vi: i, hi: j, cx, cy, len: la });
    }
  }
  return hits;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  for (const base of process.argv.slice(2)) {
    const out = [];
    for (const c of ['regular', 'sharp']) for (const s of ['stroke', 'two-tone', 'duotone', 'fill']) {
      const f = `${src(base + '-plus')}Container=regular, Style=${s}, Corners=${c}.svg`;
      if (!existsSync(f)) { out.push(`${s[0]}${c[0]}:none`); continue; }
      const h = findPlus(readFileSync(f, 'utf8'));
      out.push(`${s[0]}${c[0]}:${h.length}@${h.map((x) => x.cx + ',' + x.cy).join('|')}`);
    }
    console.log((base + '-plus').padEnd(20), out.join(' '));
  }
}
