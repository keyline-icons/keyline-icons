// Keyline Icons 1.2.0, group commerce-plus: -plus compounds on shipped bases.
//
//   node build.mjs --out=DIR [name ...]
//
// Every file these names ship in raw/ comes out of this script, byte for byte on
// a re-run. The bases are read from raw/ in this checkout: a compound is its base
// cut and translated, never redrawn, so a base redraw means a re-run here.
//
// Each name lives in names/<name>.mjs with its construction and the sibling it
// follows; this file writes the eight variants and asserts, for each, that the
// ink box is the one the name promises (sharp paints its rounded sibling's box
// exactly) and that the four styles are not copies of each other.
import { mkdirSync, writeFileSync, rmSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STYLES, CORNERS, fileName, svgOf } from './lib/svg.mjs';
import { inkOfSvg } from './ink.mjs';
import { RAW, outDir } from '../paths.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const BASES = RAW;
const OUT = join(outDir(), 'raw');

const NAMES = ['heart-plus', 'bookmark-plus', 'shopping-cart-plus', 'home-plus', 'shopping-basket-plus'];
// users-plus and shopping-bag-plus were dropped on his call (round 2): no module, no raw/.
// video-plus was dropped on his word on 24 Sep 2026 ("it looks off"): the plus took the
// second reel's place, and a one-reel camera did not read as video. Its module stays as history.

// the snapshot must still be the shipped drawing: a base redrawn upstream means a re-run from a fresh copy
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const report = {};
for (const name of NAMES) {
  if (only.length && !only.includes(name)) continue;
  const mod = await import(`./names/${name}.mjs`);
  const notes = [];
  const out = {};
  for (const corners of CORNERS) {
    const v = mod.build(BASES, corners, notes);
    for (const style of STYLES) out[fileName(style, corners)] = svgOf(v[style]);
  }
  // assert: every variant paints the promised box, sharp included
  const inks = {};
  for (const [f, svg] of Object.entries(out)) {
    const b = inkOfSvg(svg);
    inks[f] = b;
    const off = Math.max(...b.map((v, i) => Math.abs(v - mod.meta.want[i])));
    if (off > 0.002) throw new Error(`${name} ${f}: ink ${b.map((v) => v.toFixed(3)).join(',')} should be ${mod.meta.want.join(',')}`);
  }
  // assert: the styles differ (a derivation has produced identical variants before)
  for (const corners of CORNERS) {
    const seen = new Map();
    for (const style of STYLES) {
      const svg = out[fileName(style, corners)];
      if (seen.has(svg)) throw new Error(`${name} ${corners}: ${style} is a copy of ${seen.get(svg)}`);
      seen.set(svg, style);
    }
  }
  const dir = join(OUT, name);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  for (const [f, svg] of Object.entries(out)) writeFileSync(join(dir, f), svg);
  report[name] = { notes, inks };
  console.log(name.padEnd(22), 'ink', mod.meta.want.join(','), ' ', notes.join(' | '));

  // an alternative seat, drawn for the sheet only, lands in alt/raw/<name>/
  // shopping-basket-plus's alternative (buildAlt) was not taken; it is not written.
}
