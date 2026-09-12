/** Multiply overlay: ours blue, the reference set's red; shared ink goes black. */
import { readFileSync, writeFileSync } from 'node:fs';
const [out, ...pairs] = process.argv.slice(2);
const inner = (s) => s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
const cells = pairs.map((p) => {
  const [ours, theirs, label] = p.split(':');
  const root = 'fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  return `<div class="c"><div class="st"><svg viewBox="0 0 24 24" ${root} stroke="#1d4ed8">${inner(readFileSync(ours, 'utf8'))}</svg><svg viewBox="0 0 24 24" ${root} stroke="#dc2626" style="position:absolute;left:0;top:0;mix-blend-mode:multiply">${inner(readFileSync(theirs, 'utf8'))}</svg></div><div class="l">${label}</div></div>`;
});
writeFileSync(out, `<title>overlay</title><style>body{margin:0;padding:16px;font:12px Inter,system-ui,sans-serif;background:#fff}.row{display:flex;gap:16px}.c{text-align:center}.st{position:relative;width:150px;height:150px;background:#fff}.st svg{position:absolute;left:0;top:0;width:150px;height:150px}.l{margin-top:6px;color:#111}</style><div class="row">${cells.join('')}</div>`);
