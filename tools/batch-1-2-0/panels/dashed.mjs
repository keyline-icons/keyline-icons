/**
 * The dashed panels' two-tone made to match the solid panels (his, 24 Sep 2026:
 * "make the dashed panels' two-tone match"): a grey plate with the strip left as
 * its window, under the release's stroke paths verbatim. Before, they greyed the
 * strip and left the dashed area white, the reverse of panel-* after the table
 * restyle. Stroke, duotone and fill are the release's files, copied untouched.
 *
 *   node dashed.mjs   writes raw-dashed/<name>/*.svg beside this file
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, rrect } from '../lib/shape.mjs';
import { RAW, outDir } from '../paths.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const WT = RAW;
const DEST = join(outDir(), 'raw');
const fileName = (s, c) => `Container=regular, Style=${s}, Corners=${c}.svg`;
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const STRIP = { top: [[3, 3, 21, 9], [3, 3, 0, 0]], bottom: [[3, 15, 21, 21], [0, 0, 3, 3]], left: [[3, 3, 9, 21], [3, 0, 0, 3]], right: [[15, 3, 21, 21], [0, 3, 3, 0]] };
function windowOf(sharp, [x0, y0, x1, y1], r) {                  // counter-clockwise: a hole in the plate
  const [a, b, c, d] = sharp ? [0, 0, 0, 0] : r;
  const p = new P(sharp);
  p.M(x0 + a, y0); if (a) p.arc(x0 + a, y0 + a, a, 270, 180); p.L(x0, y1 - d); if (d) p.arc(x0 + d, y1 - d, d, 180, 90);
  p.L(x1 - c, y1); if (c) p.arc(x1 - c, y1 - c, c, 90, 0); p.L(x1, y0 + b); if (b) p.arc(x1 - b, y0 + b, b, 0, -90);
  return p.Z().d;
}
const NAMES = ['top', 'bottom', 'left', 'right'].flatMap((s) => [`panel-${s}-dashed`, `panel-${s}-open-dashed`, `panel-${s}-close-dashed`]);
for (const n of NAMES) {
  const side = n.split('-')[1];
  mkdirSync(join(DEST, n), { recursive: true });
  for (const c of ['regular', 'sharp']) {
    const sharp = c === 'sharp';
    for (const s of ['stroke', 'duotone', 'fill']) copyFileSync(join(WT, n, fileName(s, c)), join(DEST, n, fileName(s, c)));
    const strokes = [...readFileSync(join(WT, n, fileName('stroke', c)), 'utf8').matchAll(/<path[^>]*\/>\n?/g)].map((m) => m[0].endsWith('\n') ? m[0] : m[0] + '\n');
    const plate = rrect(new P(sharp), 2, 2, 22, 22, sharp ? 1 : 4).d + windowOf(sharp, ...STRIP[side]);
    writeFileSync(join(DEST, n, fileName('two-tone', c)), HEAD + `<path d="${plate}" fill="black" fill-opacity="0.4"/>\n` + strokes.join('') + '</svg>\n');
  }
  console.log(n);
}
