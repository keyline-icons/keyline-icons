/**
 * The panels restyled to the table family's styling (his, 24 Sep 2026, after the
 * style audit: "do the panels and chevrons, fill one strip only"). The stroke of
 * every name is the release's, written back byte for byte; only two-tone,
 * duotone and fill change, and every wall stays the stroke's 2px.
 *
 *   panel-top, -bottom, -left, -right        the strip is the header:
 *     two-tone  grey plate, the strip cut out to the centre lines (white)
 *     duotone   the outline over a grey plate, the strip black
 *     fill      the outline over the strip, solid (as panel-*-dashed fill theirs)
 *   panel-*-open, -close                      the chevron is an operation, as
 *                                             the table merges' arrow is:
 *     two-tone  as the plain panels (grey where it can be), the chevron black
 *     duotone   the panel's lines grey, the chevron black
 *     fill      the outline over the strip, solid, the chevron black
 *   panels-top-left, -left-bottom, -right-bottom   one strip only: the one whose
 *     rule runs wall to wall is the panel (top row; left column; right column);
 *     the other is an ordinary cell, grey in two-tone and duotone. Both solid
 *     read as one black L, the construction he turned down on table-pivot.
 *
 *   node build.mjs --out=DIR   writes DIR/raw/<name>/*.svg
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, rrect } from '../lib/shape.mjs';
import { RAW, outDir } from '../paths.mjs';
import { strokedBBox, pathBBox } from '../../../pipeline/lib/geom.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const WT = RAW;
const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'], CORNERS = ['regular', 'sharp'];
const fileName = (s, c) => `Container=regular, Style=${s}, Corners=${c}.svg`;
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const cap = (sharp) => (sharp ? 'butt' : 'round');
const L = {
  s: (d, sh) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${cap(sh)}" stroke-linejoin="round"/>\n`,
  g: (d, sh) => `<path d="${d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap(sh)}" stroke-linejoin="round"/>\n`,
  p: (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>\n`,
  b: (d) => `<path d="${d}" fill="black"/>\n`,
};
const svg = (layers, sh) => HEAD + layers.map(([k, d]) => L[k](d, sh)).join('') + '</svg>\n';

/** a box out to the centre lines; clockwise, or counter-clockwise for a window */
function box(sharp, [x0, y0, x1, y1], r, ccw = false) {
  const [a, b, c, d] = sharp ? [0, 0, 0, 0] : r;
  const p = new P(sharp);
  if (!ccw) { p.M(x0 + a, y0).L(x1 - b, y0); if (b) p.arc(x1 - b, y0 + b, b, -90, 0); p.L(x1, y1 - c); if (c) p.arc(x1 - c, y1 - c, c, 0, 90); p.L(x0 + d, y1); if (d) p.arc(x0 + d, y1 - d, d, 90, 180); p.L(x0, y0 + a); if (a) p.arc(x0 + a, y0 + a, a, 180, 270); }
  else { p.M(x0 + a, y0); if (a) p.arc(x0 + a, y0 + a, a, 270, 180); p.L(x0, y1 - d); if (d) p.arc(x0 + d, y1 - d, d, 180, 90); p.L(x1 - c, y1); if (c) p.arc(x1 - c, y1 - c, c, 90, 0); p.L(x1, y0 + b); if (b) p.arc(x1 - b, y0 + b, b, 0, -90); }
  return p.Z().d;
}
const plate = (sharp) => rrect(new P(sharp), 2, 2, 22, 22, sharp ? 1 : 4).d;
// the strips, out to the centre lines, the frame's r=3 at its own corners
const STRIP = {
  top: [[3, 3, 21, 9], [3, 3, 0, 0]], bottom: [[3, 15, 21, 21], [0, 0, 3, 3]],
  left: [[3, 3, 9, 21], [3, 0, 0, 3]], right: [[15, 3, 21, 21], [0, 3, 3, 0]],
};
const NAMES = {
  'panel-top': { strip: 'top' }, 'panel-bottom': { strip: 'bottom' }, 'panel-left': { strip: 'left' }, 'panel-right': { strip: 'right' },
  'panel-top-open': { strip: 'top', op: true }, 'panel-top-close': { strip: 'top', op: true },
  'panel-bottom-open': { strip: 'bottom', op: true }, 'panel-bottom-close': { strip: 'bottom', op: true },
  'panel-left-open': { strip: 'left', op: true }, 'panel-left-close': { strip: 'left', op: true },
  'panel-right-open': { strip: 'right', op: true }, 'panel-right-close': { strip: 'right', op: true },
  'panels-top-left': { strip: 'top' }, 'panels-left-bottom': { strip: 'left' }, 'panels-right-bottom': { strip: 'right' },
};
const strokeOf = (n, c) => readFileSync(join(WT, n, fileName('stroke', c)), 'utf8');

function build(n, sharp) {
  const c = sharp ? 'sharp' : 'regular';
  const st = strokeOf(n, c);
  const d = st.match(/ d="([^"]+)"/g);
  if (d.length !== 1) throw new Error(`${n} ${c}: ${d.length} stroke paths`);
  const all = d[0].slice(4, -1);
  const [rect, r] = STRIP[NAMES[n].strip];
  const solid = box(sharp, rect, r);
  const out = { stroke: st };
  if (NAMES[n].op) {
    // the chevron: the one subpath with a diagonal leg; the rest is the panel
    const subs = all.split(/(?=M)/);
    const op = subs.filter((s) => { const q = s.match(/-?\d*\.?\d+/g).map(Number); return q.length === 6 && q[0] !== q[2] && q[1] !== q[3]; });
    if (op.length !== 1) throw new Error(`${n} ${c}: ${op.length} chevrons`);
    const lines = subs.filter((s) => s !== op[0]).join('');
    // two-tone grey where the panel can take it (his, 24 Sep 2026), as the
    // plain panels: plate with the strip as its window, the whole stroke black
    out['two-tone'] = svg([['p', plate(sharp) + box(sharp, rect, r, true)], ['s', all]], sharp);
    out.duotone = svg([['g', lines], ['s', op[0]]], sharp);
    out.fill = svg([['b', solid], ['s', all]], sharp);
  } else {
    out['two-tone'] = svg([['p', plate(sharp) + box(sharp, rect, r, true)], ['s', all]], sharp);
    out.duotone = svg([['p', plate(sharp)], ['b', solid], ['s', all]], sharp);
    out.fill = svg([['b', solid], ['s', all]], sharp);
  }
  return out;
}

const inkOf = (text, sharp) => {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const m of text.matchAll(/<path([^>]*)\/>/g)) {
    const a = m[1], d = a.match(/ d="([^"]+)"/)[1];
    const x = / stroke="black"/.test(a) ? strokedBBox(d, 1, cap(sharp)) : pathBBox(d);
    b = [Math.min(b[0], x[0]), Math.min(b[1], x[1]), Math.max(b[2], x[2]), Math.max(b[3], x[3])];
  }
  return b.map((v) => Math.round(v * 1e3) / 1e3).join(',');
};

const DEST = join(outDir(), 'raw');
for (const n of Object.keys(NAMES)) {
  mkdirSync(join(DEST, n), { recursive: true });
  const notes = [];
  for (const c of CORNERS) {
    const sharp = c === 'sharp';
    const v = build(n, sharp);
    const boxes = STYLES.map((s) => inkOf(v[s], sharp));
    if (new Set(boxes).size !== 1) throw new Error(`${n} ${c}: ink boxes ${boxes.join(' | ')}`);
    if (v.stroke !== strokeOf(n, c)) throw new Error(`${n} ${c}: stroke changed`);
    for (const s of STYLES) writeFileSync(join(DEST, n, fileName(s, c)), v[s]);
    notes.push(`${c} ${boxes[0]}`);
  }
  console.log(n.padEnd(22), notes.join(' | '));
}
