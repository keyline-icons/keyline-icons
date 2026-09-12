import { readFileSync } from 'node:fs';
import { outlines, minGap, pathBBox } from '../../pipeline/lib/geom.mjs';
const src = readFileSync(process.argv[2], 'utf8');
const paths = [...src.matchAll(/<path ([^>]*?)d="([^"]*)"([^>]*)>/g)].map((m) => ({ attrs: m[1] + m[3], d: m[2] }));
const items = [];
for (const p of paths) {
  const isStroke = !/fill="black"/.test(p.attrs) || /stroke="black"/.test(p.attrs);
  const subs = p.d.split(/(?=M)/).filter(Boolean);
  for (const s of subs) items.push({ d: s.trim(), reach: isStroke ? 1 : 0, o: outlines(s, 48)[0], box: pathBBox(s) });
}
items.forEach((it, i) => console.log(String(i).padStart(2), it.d.slice(0, 58).padEnd(60), 'box', it.box.map((v) => v.toFixed(1)).join(',')));
const rows = [];
for (let i = 0; i < items.length; i++)
  for (let j = i + 1; j < items.length; j++) {
    const g = minGap(items[i].o, items[j].o);
    if (g <= 1e-6) continue;
    rows.push([g - items[i].reach - items[j].reach, i, j]);
  }
rows.sort((a, b) => a[0] - b[0]);
console.log('--- tightest pairs');
for (const [g, i, j] of rows.slice(0, 6)) console.log(`  ${g.toFixed(3)}  ${i} <-> ${j}   ${items[i].d.slice(0, 30)} | ${items[j].d.slice(0, 30)}`);
