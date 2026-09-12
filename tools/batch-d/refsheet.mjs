/** His drawing beside the one in the tree, at several sizes. Root attributes kept. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const [out, ...names] = process.argv.slice(2);
const SCR = process.env.SCR;
const inner = (s) => s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
const root = (s) => (s.match(/<svg([^>]*)>/)[1] || '')
  .replace(/\s(width|height|xmlns|viewBox)="[^"]*"/g, '');
const cell = (svg, size, label) => svg
  ? `<div class="c"><svg width="${size}" height="${size}" viewBox="0 0 24 24"${root(svg)}>${inner(svg)}</svg><div>${label}</div></div>`
  : `<div class="c"><div class="none" style="width:${size}px;height:${size}px"></div><div>${label}</div></div>`;
const rows = names.map((n) => {
  const his = existsSync(`${SCR}/refs/${n}.svg`) ? readFileSync(`${SCR}/refs/${n}.svg`, 'utf8') : null;
  const ours = existsSync(`raw/${n}/Container=regular, Style=stroke, Corners=regular.svg`)
    ? readFileSync(`raw/${n}/Container=regular, Style=stroke, Corners=regular.svg`, 'utf8') : null;
  const cells = [cell(his, 96, 'his 96'), cell(his, 40, '40'), cell(his, 24, '24'), cell(his, 16, '16'),
    '<div class="sep"></div>', cell(ours, 96, 'in tree 96'), cell(ours, 24, '24'), cell(ours, 16, '16')];
  return `<div class="row"><div class="lbl">${n}</div><div class="cells">${cells.join('')}</div></div>`;
});
writeFileSync(out, `<title>refs</title><style>
body{font:12px/1.3 Inter,system-ui,sans-serif;background:#fff;color:#111;margin:0;padding:16px}
.row{display:flex;align-items:center;gap:16px;padding:10px 12px;border:1px solid #eee;border-radius:10px;margin-bottom:8px}
.row:nth-child(even){background:#fafafa}
.lbl{width:90px;flex:none;font-weight:600;font-size:13px}
.cells{display:flex;align-items:flex-end;gap:18px}
.c{text-align:center;color:#a3a3a3;font-size:9px}
.sep{width:1px;align-self:stretch;background:#ddd;margin:0 6px}
.none{background:repeating-linear-gradient(45deg,#f3f3f3,#f3f3f3 4px,#fff 4px,#fff 8px);border-radius:6px}
svg{display:block}</style>${rows.join('\n')}`);
