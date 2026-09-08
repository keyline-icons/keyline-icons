/**
 * A review sheet: every drawing at 96, 40, 24 and 16, on the house white.
 * `node tools/v5/sheet.mjs <out.svg>` — rows come from `rows()` below.
 */
import { writeFileSync } from 'node:fs';
import { readFileSync } from 'node:fs';

const SIZES = [96, 40, 24, 16];

const shipped = (name) => {
  const s = readFileSync(`icons/stroke/${name}.svg`, 'utf8');
  return [...s.matchAll(/d="([^"]*)"/g)].map((m) => m[1]);
};

export function sheet(rows, { cols = 1, note = '' } = {}) {
  const rowH = 132, padX = 24, labelW = 150;
  const width = padX * 2 + labelW + SIZES.reduce((a, s) => a + s + 28, 0) + 260;
  const height = 64 + rows.length * rowH;
  const out = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="Inter, -apple-system, system-ui, sans-serif">`,
    `<rect width="${width}" height="${height}" fill="#ffffff"/>`,
    `<text x="${padX}" y="36" font-size="20" font-weight="600" fill="#111">${note}</text>`,
  ];
  rows.forEach((row, i) => {
    const y = 64 + i * rowH;
    out.push(`<rect x="${padX}" y="${y}" width="${width - 2 * padX}" height="${rowH - 12}" rx="12" fill="${i % 2 ? '#fafafa' : '#fff'}" stroke="#eee"/>`);
    out.push(`<text x="${padX + 16}" y="${y + 34}" font-size="15" font-weight="600" fill="#111">${row.name}</text>`);
    (row.note ?? '').split('\n').forEach((line, k) =>
      out.push(`<text x="${padX + 16}" y="${y + 56 + k * 16}" font-size="11.5" fill="#737373">${line}</text>`));
    let x = padX + labelW + 16;
    for (const s of SIZES) {
      const cy = y + (rowH - 12) / 2 - s / 2;
      out.push(`<g transform="translate(${x} ${cy})">`);
      out.push(`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      for (const d of row.paths) out.push(`<path d="${d.d ?? d}"${d.fill ? ` fill="#111" stroke="none"` : ''}/>`);
      out.push('</svg>');
      out.push(`<text x="${s / 2}" y="${s + 16}" font-size="10" fill="#a3a3a3" text-anchor="middle">${s}</text>`);
      out.push('</g>');
      x += s + 28;
    }
    if (row.ref) {
      out.push(`<g transform="translate(${x + 24} ${y + (rowH - 12) / 2 - 20})">`);
      out.push(`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`);
      for (const d of row.ref.paths) out.push(`<path d="${d.d ?? d}"${d.fill ? ` fill="#a3a3a3" stroke="none"` : ''}/>`);
      out.push('</svg>');
      out.push(`<text x="20" y="56" font-size="10" fill="#a3a3a3" text-anchor="middle">${row.ref.name}</text>`);
      out.push('</g>');
    }
  });
  out.push('</svg>');
  return out.join('\n');
}

export { shipped };
