/**
 * A review sheet straight from a raw/ directory: every variant at 72, the
 * duotone with its plate recoloured loud (the only test that catches a plate
 * running past its stroke), and the stroke at 40 / 24 / 16.
 *   node tools/v7/sheet.mjs <rawDir> <out.html> [name ...]
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [rawDir, out, ...only] = process.argv.slice(2);
const names = (only.length ? only : readdirSync(rawDir)).filter((n) => existsSync(join(rawDir, n)));

const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
const loud = (s) => s.replace(/fill="black" fill-opacity="0.4"/g, 'fill="#e11"').replace(/stroke-opacity="0.4"/g, 'stroke="#e11"');
const read = (name, style, corners) => {
  const p = join(rawDir, name, `Container=regular, Style=${style}, Corners=${corners}.svg`);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
};
const cell = (svg, size, label, recolour = false) => svg
  ? `<div class="c"><svg width="${size}" height="${size}" viewBox="0 0 24 24">${recolour ? loud(inner(svg)) : inner(svg)}</svg><div>${label}</div></div>`
  : `<div class="c"><div class="none" style="width:${size}px;height:${size}px"></div><div>${label}</div></div>`;

const rows = names.map((name) => {
  const cells = [];
  for (const corners of ['regular', 'sharp']) for (const style of ['stroke', 'duotone', 'fill'])
    cells.push(cell(read(name, style, corners), 72, `${corners === 'sharp' ? 'sharp ' : ''}${style}`));
  for (const corners of ['regular', 'sharp']) cells.push(cell(read(name, 'duotone', corners), 132, `${corners} plate, loud`, true));
  for (const size of [40, 24, 16]) cells.push(cell(read(name, 'stroke', 'regular'), size, `${size}`));
  for (const size of [24, 16]) cells.push(cell(read(name, 'stroke', 'sharp'), size, `sharp ${size}`));
  return `<div class="row"><div class="lbl">${name}</div><div class="cells">${cells.join('')}</div></div>`;
});

writeFileSync(out, `<title>v7 review</title>
<style>
  body{font:12px/1.3 Inter,system-ui,sans-serif;background:#fff;color:#111;margin:0;padding:16px}
  .row{display:flex;align-items:center;gap:16px;padding:8px 12px;border:1px solid #eee;border-radius:10px;margin-bottom:6px}
  .row:nth-child(even){background:#fafafa}
  .lbl{width:150px;flex:none;font-weight:600;font-size:13px}
  .cells{display:flex;align-items:flex-end;gap:14px}
  .c{text-align:center;color:#a3a3a3;font-size:9px}
  .none{background:repeating-linear-gradient(45deg,#f3f3f3,#f3f3f3 4px,#fff 4px,#fff 8px);border-radius:6px}
  svg{display:block}
</style>
${rows.join('\n')}
`);
console.log('wrote', out, names.length, 'rows');
