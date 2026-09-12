/** Writing raw/<name>/Container=regular, Style=<style>, Corners=<corners>.svg */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
const STROKE = (d, cap, join = 'round') =>
  `<path d="${d}" fill="none" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;
const SOLID = (d) => `<path d="${d}" fill="black"/>`;
const PLATE = (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>`;
const MUTED = (d, cap, join = 'round') =>
  `<path d="${d}" fill="none" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="${join}"/>`;

/**
 * `layers` is a list of {kind: 'stroke'|'solid'|'plate'|'muted', d, join}. Plate
 * goes first. `join` is optional and is only ever 'miter': a vertex the drawing
 * means as a POINT has to paint as one, which the level wedges already ship and
 * the sharp drop's tip now does too. Everything else stays on the house round.
 */
export const doc = (layers, cap = 'round') =>
  [HEAD, ...layers.map(({ kind, d, join }) =>
    kind === 'stroke' ? STROKE(d, cap, join) : kind === 'solid' ? SOLID(d) : kind === 'muted' ? MUTED(d, cap, join) : PLATE(d)),
    '</svg>', ''].join('\n');

/**
 * `variants` is keyed `<style>.<corners>`, or `<container>.<style>.<corners>`
 * where the drawing carries a container. The two-part spelling stays the
 * default because all but a handful of sets are `Container=regular` only.
 */
export function writeSet(root, name, variants) {
  const dir = join(root, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [key, layers] of Object.entries(variants)) {
    const parts = key.split('.');
    const [container, style, corners] = parts.length === 3 ? parts : ['regular', ...parts];
    writeFileSync(join(dir, `Container=${container}, Style=${style}, Corners=${corners}.svg`), doc(layers, corners === 'sharp' ? 'butt' : 'round'));
  }
}
