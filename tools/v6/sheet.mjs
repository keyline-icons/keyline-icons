/**
 * A review sheet as HTML, so it can be opened in a browser and looked at.
 *   node tools/v6/sheet.mjs <out.html>
 * Rows come from `rows` below; each is { name, note, paths:[{d,fill}] }.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
export const shipped = (name, style = 'stroke') =>
  [...readFileSync(`${ROOT}/icons/${style}/${name}.svg`, 'utf8').matchAll(/<path([^>]*)d="([^"]*)"([^>]*)/g)]
    .map((m) => ({ d: m[2], fill: /fill="currentColor"/.test(m[1] + m[3]) }));

const SIZES = [96, 40, 24, 16];

export function html(rows, title = 'keyline-icons — review') {
  const cell = (r, s, colour) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"
    stroke="${colour}" stroke-width="2" stroke-linecap="${r.cap ?? 'round'}" stroke-linejoin="round">${
    r.paths.map((p) => typeof p === 'string'
      ? `<path d="${p}"/>`
      : `<path d="${p.d}"${p.fill ? ' fill="' + colour + '" stroke="none"' : ''}${p.plate ? ` fill="${p.loud ?? colour}" fill-opacity="${p.loud ? 1 : 0.4}" stroke="none"` : ''}/>`).join('')
  }</svg>`;
  return `<title>${title}</title>
<style>
  body{font:13px/1.4 Inter,system-ui,sans-serif;background:#fff;color:#111;margin:0;padding:24px}
  h1{font-size:17px;margin:0 0 18px}
  .row{display:flex;align-items:center;gap:22px;padding:14px 16px;border:1px solid #eee;border-radius:12px;margin-bottom:8px}
  .row:nth-child(even){background:#fafafa}
  .lbl{width:190px;flex:none}
  .lbl b{display:block;font-size:14px}
  .lbl span{color:#737373;font-size:11.5px;white-space:pre-line}
  .cells{display:flex;align-items:center;gap:26px}
  .c{text-align:center;color:#a3a3a3;font-size:10px}
</style>
<h1>${title}</h1>
${rows.map((r) => `<div class="row"><div class="lbl"><b>${r.name}</b><span>${r.note ?? ''}</span></div>
  <div class="cells">${SIZES.map((s) => `<div class="c">${cell(r, s, '#111')}<div>${s}</div></div>`).join('')}
  ${r.ref ? `<div class="c" style="margin-left:18px">${cell(r.ref, 40, '#a3a3a3')}<div>${r.ref.name}</div></div>` : ''}</div></div>`).join('\n')}
`;
}

export function write(out, rows, title) { writeFileSync(out, html(rows, title)); console.log('wrote', out); }
