// Writing raw/<name>/Container=regular, Style=<s>, Corners=<c>.svg from layer lists.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
const hasHoles = (d) => (d.match(/M/g) || []).length > 1;
export function doc(layers, cap) {
  const out = [HEAD];
  for (const { kind, d, join = 'round' } of layers) {
    if (kind === 'stroke' || kind === 'muted')
      out.push(`<path d="${d}" fill="none" stroke="black"${kind === 'muted' ? ' stroke-opacity="0.4"' : ''} stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`);
    else
      out.push(`<path${hasHoles(d) ? ' fill-rule="evenodd" clip-rule="evenodd"' : ''} d="${d}" fill="black"${kind === 'plate' ? ' fill-opacity="0.4"' : ''}/>`);
  }
  out.push('</svg>', '');
  return out.join('\n');
}
export function writeSet(root, name, byCorners) {
  const dir = join(root, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [corners, styles] of Object.entries(byCorners))
    for (const [style, layers] of Object.entries(styles))
      writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round'));
}
