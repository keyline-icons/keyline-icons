/**
 * cloud-terminal, from his refs/cloud-code.svg (24 Sep 2026): the house cloud
 * opened from (9,19) round to (22,15), and the house terminal prompt at half
 * size in the opening. Renamed: `code` in this set is the </> pair, and what
 * sits in the cloud is the prompt, so cloud-code and cloud-shell are aliases.
 *
 * Two changes to his drawing, both measured:
 *   the chevron's tip fillet was the terminal's r=0.5 halved with the rest, to
 *     0.25, off the ladder; it is redrawn at r=0.5 about the same apex (16.5,15)
 *   the underscore started at 17.5, 1.69 of painted space from the chevron's
 *     lower arm (under the 1.9 band); from 18 it is 2.01, and whole
 *
 * Styles, the cloud being open:
 *   two-tone  the cloud grey, the prompt black, as duotone. His ruling (24 Sep
 *             2026): an outline opened for a glyph takes no plate notched round
 *             the opening; "we don't do this kind of cut outs".
 *   duotone   the cloud grey, the prompt black: the open-frame split
 *             (cursor-panel), as the table merges' base grey, operation black
 *   fill      the stroke. A solid cloud was tried: the chevron knockout breaks
 *             out of an opened solid, and a closed solid can only keep the
 *             underscore off it with a one-unit moat, half the house notch
 *
 *   node build.mjs --out=DIR   writes DIR/raw/cloud-terminal/*.svg
 */
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { outDir } from '../paths.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const NAME = 'cloud-terminal';
const fileName = (s, c) => `Container=regular, Style=${s}, Corners=${c}.svg`;
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const cap = (sh) => (sh ? 'butt' : 'round');
const L = {
  s: (d, sh) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${cap(sh)}" stroke-linejoin="round"/>\n`,
  g: (d, sh) => `<path d="${d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap(sh)}" stroke-linejoin="round"/>\n`,
};
const svg = (layers, sh) => HEAD + layers.map(([k, d]) => L[k](d, sh)).join('') + '</svg>\n';
const f = (v) => { let s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };

// the house cloud's own lobes, both corners (sharp keeps them: "cloud's lobes")
const LOBES = 'C22 12.7909 20.2091 11 18 11C18 7.6863 15.3137 5 12 5C8.6863 5 6 7.6863 6 11C3.7909 11 2 12.7909 2 15C2 17.2091 3.7909 19 6 19';
const cloud = (sh) => (sh ? `M22 16L22 15${LOBES}L10 19` : `M22 15${LOBES}H9`);

// the terminal chevron at half size: apex (16.5,15), arms to (13,12) and (13,18)
const A = [16.5, 15], U = [-3.5, -3], len = Math.hypot(...U), u = [U[0] / len, U[1] / len];
function chevron(sh) {
  if (sh) {
    // fillet removed; free ends stubbed k = (1 - sin t)/cos t along the arm
    const k = (1 + u[1]) / -u[0];
    const e1 = [13 + k * u[0], 12 + k * u[1]], e2 = [13 + k * u[0], 18 - k * u[1]];
    return `M${f(e1[0])} ${f(e1[1])}L${f(A[0])} ${f(A[1])}L${f(e2[0])} ${f(e2[1])}`;
  }
  // r=0.5 about the apex, spelled as the shipped terminal's tip, translated
  const t = 0.5 / Math.tan(Math.atan2(3, 3.5));
  const T1 = [A[0] + t * u[0], A[1] + t * u[1]], T2 = [T1[0], 2 * A[1] - T1[1]];
  const c = [A[0] - 0.2101, 0.1801];
  return `M13 12L${f(T1[0])} ${f(T1[1])}C${f(c[0])} ${f(A[1] - c[1])} ${f(c[0])} ${f(A[1] + c[1])} ${f(T2[0])} ${f(T2[1])}L13 18`;
}
const underscore = (sh) => (sh ? 'M22 19L17 19' : 'M21 19H18');

function build(sh) {
  const all = cloud(sh) + chevron(sh) + underscore(sh);
  return {
    stroke: svg([['s', all]], sh),
    'two-tone': svg([['g', cloud(sh)], ['s', chevron(sh) + underscore(sh)]], sh),
    duotone: svg([['g', cloud(sh)], ['s', chevron(sh) + underscore(sh)]], sh),
    fill: svg([['s', all]], sh),
  };
}

const DEST = join(outDir(), 'raw');
mkdirSync(join(DEST, NAME), { recursive: true });
for (const c of ['regular', 'sharp']) {
  const v = build(c === 'sharp');
  for (const [s, text] of Object.entries(v)) writeFileSync(join(DEST, NAME, fileName(s, c)), text);
}
console.log(join(DEST, NAME));
