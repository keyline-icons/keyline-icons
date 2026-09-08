/**
 * The proof sheet: every variant as it was built, plus the duotone with its
 * plate recoloured, which is the only test that has ever caught a plate running
 * past its own stroke.
 *   node tools/v5/proof.mjs <out.svg> <name...>
 */
import { readFileSync, writeFileSync } from 'node:fs';

const out = process.argv[2];
const names = process.argv.slice(3);
const read = (p) => readFileSync(p, 'utf8');
const body = (svg) => {
  const root = /<svg([^>]*)>/.exec(svg)[1]
    .replace(/\s(width|height|xmlns)="[^"]*"/g, '');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
  return { root, inner };
};
const loud = (s) => s.replace(/stroke="currentColor"/g, 'stroke="#111"')
  .replace(/fill="currentColor" fill-opacity="0.4"/g, 'fill="#e11" fill-opacity="1"')
  .replace(/fill="currentColor"/g, 'fill="#111"');

const CELL = 56, BIG = 132, PAD = 20, LABEL = 116;
const cols = ['stroke', 'duotone', 'fill'];
const rows = [];
for (const name of names) {
  const cells = [];
  for (const corners of ['', 'sharp/']) for (const style of cols) {
    const p = `icons/${corners}${style}/${name}.svg`;
    try { const b = body(read(p)); cells.push({ label: `${corners ? 'sharp ' : ''}${style}`, root: b.root, svg: loud(b.inner) }); } catch { }
  }
  let plate = null;
  try { const b = body(read(`icons/duotone/${name}.svg`)); plate = { root: b.root, svg: loud(b.inner) }; } catch { }
  let plateSharp = null;
  try { const b = body(read(`icons/sharp/duotone/${name}.svg`)); plateSharp = { root: b.root, svg: loud(b.inner) }; } catch { }
  rows.push({ name, cells, plate, plateSharp });
}

const width = PAD * 2 + LABEL + 6 * (CELL + 16) + 2 * (BIG + 16);
const rowH = BIG + 36;
const height = 56 + rows.length * rowH;
const o = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Inter, system-ui, sans-serif">`,
  `<rect width="${width}" height="${height}" fill="#fff"/>`,
  `<text x="${PAD}" y="32" font-size="17" font-weight="600" fill="#111">v0.5.0 — every variant as built, and the plate recoloured</text>`];
rows.forEach((r, i) => {
  const y = 48 + i * rowH;
  o.push(`<rect x="${PAD}" y="${y}" width="${width - 2 * PAD}" height="${rowH - 10}" rx="10" fill="${i % 2 ? '#fafafa' : '#fff'}" stroke="#eee"/>`);
  o.push(`<text x="${PAD + 12}" y="${y + 26}" font-size="14" font-weight="600" fill="#111">${r.name}</text>`);
  let x = PAD + LABEL;
  for (const c of r.cells) {
    o.push(`<g transform="translate(${x} ${y + 24})"><svg width="${CELL}" height="${CELL}"${c.root.replace(/stroke="currentColor"/, 'stroke="#111"')}>${c.svg}</svg>`);
    o.push(`<text x="${CELL / 2}" y="${CELL + 14}" font-size="9" fill="#a3a3a3" text-anchor="middle">${c.label}</text></g>`);
    x += CELL + 16;
  }
  for (const [p, lbl] of [[r.plate, 'plate, recoloured'], [r.plateSharp, 'sharp plate']]) {
    if (!p) continue;
    o.push(`<g transform="translate(${x} ${y + 6})"><svg width="${BIG}" height="${BIG}"${p.root.replace(/stroke="currentColor"/, 'stroke="#111"')}>${p.svg}</svg>`);
    o.push(`<text x="${BIG / 2}" y="${BIG + 16}" font-size="9" fill="#a3a3a3" text-anchor="middle">${lbl}</text></g>`);
    x += BIG + 16;
  }
});
o.push('</svg>');
writeFileSync(out, o.join('\n'));
console.log('wrote', out);
