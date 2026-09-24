// Reading shipped raw/ variants and writing raw/-format files.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
export const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
export const CORNERS = ['regular', 'sharp'];
export const fileName = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;

/** The layers of a shipped variant, bottom first: { d, stroked, muted, evenodd, tag }. */
export function layers(root, name, style, corners) {
  const svg = readFileSync(join(root, name, fileName(style, corners)), 'utf8');
  return [...svg.matchAll(/<path [^>]*\/>/g)].map(([tag]) => ({
    tag,
    d: / d="([^"]+)"/.exec(tag)[1],
    stroked: / stroke="black"/.test(tag),
    muted: /opacity="0\.4"/.test(tag),
    evenodd: /fill-rule="evenodd"/.test(tag),
  }));
}

const cap = (sharp) => (sharp ? 'butt' : 'round');
/** A stroke layer, the attribute order the shipped files use. */
export const strokeEl = (d, sharp, opacity = 1) =>
  `<path d="${d}" stroke="black"${opacity < 1 ? ` stroke-opacity="${opacity}"` : ''} stroke-width="2" stroke-linecap="${cap(sharp)}" stroke-linejoin="round"/>`;
/** The muted plate. */
export const plateEl = (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>`;
/** A solid; knockouts go in under evenodd, and are wound against the outline as well so nonzero agrees. */
export const solidEl = (d, evenodd = false) =>
  evenodd ? `<path fill-rule="evenodd" clip-rule="evenodd" d="${d}" fill="black"/>` : `<path d="${d}" fill="black"/>`;
/** Re-emit a shipped layer with a new d, every other attribute as shipped. */
export const withD = (layer, d) => layer.tag.replace(/ d="[^"]+"/, ` d="${d}"`);

export const svgOf = (els) => [HEAD, ...els, '</svg>', ''].join('\n');
