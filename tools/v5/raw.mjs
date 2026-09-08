/** Writing raw/<name>/Container=regular, Style=<style>, Corners=<corners>.svg */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
const STROKE = (d, cap) =>
  `<path d="${d}" fill="none" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`;
const SOLID = (d) => `<path d="${d}" fill="black"/>`;
const PLATE = (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>`;
const MUTED = (d, cap) =>
  `<path d="${d}" fill="none" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`;

/** `layers` is a list of {kind: 'stroke'|'solid'|'plate', d}. Plate goes first. */
export const doc = (layers, cap = 'round') =>
  [HEAD, ...layers.map(({ kind, d }) =>
    kind === 'stroke' ? STROKE(d, cap) : kind === 'solid' ? SOLID(d) : kind === 'muted' ? MUTED(d, cap) : PLATE(d)),
    '</svg>', ''].join('\n');

export function writeSet(root, name, variants) {
  const dir = join(root, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [key, layers] of Object.entries(variants)) {
    const [style, corners] = key.split('.');
    writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round'));
  }
}
