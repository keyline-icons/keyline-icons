/**
 * The closed tables of the 1.2.0 table family, in his reference's style grammar
 * (24 Sep 2026: "we are missing table-layout, table-pivot, table-tree,
 * table-slash, table-rows, table-cells-rows ... look how duotone, fill,
 * two-tones are done").
 *
 *   table-rows         header column (x=9) and two rows (y=12), panel-left's column
 *   table-cells-rows   header column and three rows (9, 15), the table's rows
 *   table-tree         header row (9) over one cell holding a tree: a stem off the
 *                      header, two elbows, a dash after each, every gap 2
 *   table-pivot        panels-top-left's header row and column whose bottom-right
 *                      corner IS the pivot: an L arrow with a head on the right wall
 *                      and one on the bottom edge. The heads overhang the frame, so
 *                      the frame moves a unit up and left (2..20, still 18) and the
 *                      heads are 4 wide: a 6-wide head on the wall paints 23.7.
 *   table              the shipped base, restyled (stroke byte for byte the release's)
 *   table-cells-merge  restyled (drawing unchanged, table-cells/build.mjs)
 *   table-cells-split  restyled
 *
 * table-layout is panels-top-left's drawing exactly (header row, column under it)
 * and ships as its alias; table-slash is the house's table-off (built separately).
 *
 * STYLES, read off his reference (the grid of every style he sent):
 *   stroke    the outline.
 *   two-tone  the outline over a grey plate, the header and the operation's
 *             cells cut out of it to the stroke's centre line and left white
 *             (their light duotone).
 *   duotone   the outline over a grey plate, the solid cells black
 *   fill      the outline over the solid cells, the rest white
 * The solid cells are the header (table, rows, cells-rows, tree). A table with
 * no header (cells-merge, cells-split) keeps the house grid format in duotone
 * and fill, as grid-2x3 ships: filling its cells at 2px leaves a black slab.
 * Every wall stays the stroke's 2px (his, 24 Sep 2026: "why are only the first
 * two running on 2px?"): an earlier bold body cut the cells half a unit in and
 * ran 3 wide. pivot is an operation:
 * the table grey and the arrow black in two-tone and duotone (the reference's
 * pivot duotone), its fill the outline over its header column's cell, solid.
 *
 *   node build.mjs   writes raw/<name>/*.svg beside this file
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { P, rrect } from '../lib/shape.mjs';
import { RAW, outDir } from '../paths.mjs';
import { strokedBBox, pathBBox, outlines, minGap } from '../../../pipeline/lib/geom.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
// cells-merge and -split carry their stroke from the grid-2x3 round; it ships in raw/.
const CELLS_RAW = RAW;
const WT_RAW = RAW;
export const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
export const CORNERS = ['regular', 'sharp'];
export const fileName = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;

/** A box, per-corner radii [tl, tr, br, bl]; clockwise, or counter-clockwise for a hole. */
function box(p, [x0, y0, x1, y1], [a, b, c, d], ccw = false) {
  if (!ccw) {
    p.M(x0 + a, y0).L(x1 - b, y0); if (b) p.arc(x1 - b, y0 + b, b, -90, 0);
    p.L(x1, y1 - c); if (c) p.arc(x1 - c, y1 - c, c, 0, 90);
    p.L(x0 + d, y1); if (d) p.arc(x0 + d, y1 - d, d, 90, 180);
    p.L(x0, y0 + a); if (a) p.arc(x0 + a, y0 + a, a, 180, 270);
  } else {
    p.M(x0 + a, y0); if (a) p.arc(x0 + a, y0 + a, a, 270, 180);
    p.L(x0, y1 - d); if (d) p.arc(x0 + d, y1 - d, d, 180, 90);
    p.L(x1 - c, y1); if (c) p.arc(x1 - c, y1 - c, c, 90, 0);
    p.L(x1, y0 + b); if (b) p.arc(x1 - b, y0 + b, b, 0, -90);
  }
  return p.Z();
}
// the stroke's inner corners are the frame's; a cell corner there takes the
// frame's inner radius less the inset, every other cell corner is square
const IN = [[4, 4], [20, 4], [20, 20], [4, 20]];
const radii = ([x0, y0, x1, y1], r) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((q, i) => (IN.some((c) => c[0] === q[0] && c[1] === q[1]) && IN[i][0] === q[0] && IN[i][1] === q[1] ? r : 0));
const inset = ([x0, y0, x1, y1], k) => [x0 + k, y0 + k, x1 - k, y1 - k];

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const cap = (sharp) => (sharp ? 'butt' : 'round');
const L = {
  s: (d, sharp) => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${cap(sharp)}" stroke-linejoin="round"/>\n`,
  g: (d, sharp) => `<path d="${d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap(sharp)}" stroke-linejoin="round"/>\n`,
  p: (d) => `<path d="${d}" fill="black" fill-opacity="0.4"/>\n`,
  f: (d) => `<path d="${d}" fill="black" fill-rule="evenodd" clip-rule="evenodd"/>\n`,
  b: (d) => `<path d="${d}" fill="black"/>\n`,
};
const svg = (layers, sharp) => HEAD + layers.map(([k, d]) => L[k](d, sharp)).join('') + '</svg>\n';

/* ------------------------------------------------------------------ strokes */
const frame = (p, sharp) => rrect(p, 3, 3, 21, 21, sharp ? 0 : 3);
function lines(sharp, list) { const p = new P(sharp); for (const [a, b] of list) p.M(...a).L(...b); return p.d; }
const V = (x, y0, y1) => [[x, y0], [x, y1]];
const H = (y, x0, x1) => [[x0, y], [x1, y]];

const DRAW = {
  'table-rows': (sharp) => ({ table: frame(new P(sharp), sharp).d + lines(sharp, [V(9, 3, 21), H(12, 9, 21)]) }),
  'table-cells-rows': (sharp) => ({ table: frame(new P(sharp), sharp).d + lines(sharp, [V(9, 3, 21), H(9, 9, 21), H(15, 9, 21)]) }),
  'table-tree': (sharp) => {
    // the stem hangs off the header rule (buried there); every other end is free
    // and steps a unit out in sharp
    const e = sharp ? 1 : 0;
    const p = new P(sharp);
    p.M(7, 9).L(7, 17).L(10 + e, 17).M(7, 13).L(10 + e, 13).M(14 - e, 13).L(17 + e, 13).M(14 - e, 17).L(17 + e, 17);
    return { table: frame(new P(sharp), sharp).d + lines(sharp, [H(9, 3, 21)]), detail: p.d };
  },
  'table-pivot': (sharp) => {
    // header rule, the frame round from the right wall to the bottom edge, and the
    // column: one run, so the corners at (20,8) and (8,20) are joins, not two butts
    const t = new P(sharp);
    t.M(2, 8).L(20, 8);
    if (sharp) t.L(20, 2).L(2, 2).L(2, 20).L(8, 20).L(8, 8);
    else t.L(20, 5).arc(17, 5, 3, 0, -90).L(5, 2).arc(5, 5, 3, 270, 180).L(2, 17).arc(5, 17, 3, 180, 90).L(8, 20).L(8, 8);
    const a = new P(sharp);
    a.M(20, 12);
    if (sharp) a.L(20, 20).L(12, 20); else a.L(20, 17).arc(17, 17, 3, 0, 90).L(12, 20);
    const g = sharp ? 0.2929 : 0;
    a.M(18 - g, 14 + g).L(20, 12).L(22 + g, 14 + g).M(14 + g, 18 - g).L(12, 20).L(14 + g, 22 + g);
    return { table: t.d, op: a.d };
  },
  // the shipped base, restyled to its family (his "update it", 24 Sep 2026): the
  // stroke is read from the release and written back unchanged
  'table': (sharp) => ({ table: readFileSync(join(WT_RAW, 'table', fileName('stroke', sharp ? 'sharp' : 'regular')), 'utf8').match(/ d="([^"]+)"/)[1] }),
  'table-cells-merge': (sharp) => ({ table: readFileSync(join(CELLS_RAW, 'table-cells-merge', fileName('stroke', sharp ? 'sharp' : 'regular')), 'utf8').match(/ d="([^"]+)"/)[1] }),
  'table-cells-split': (sharp) => ({ table: readFileSync(join(CELLS_RAW, 'table-cells-split', fileName('stroke', sharp ? 'sharp' : 'regular')), 'utf8').match(/ d="([^"]+)"/)[1] }),
};

// cells at the stroke's inner edges; role: h header, o ordinary, x operation, d holds a detail
const CELLS = {
  'table': [['h', [4, 4, 20, 8]], ['o', [4, 10, 11, 14]], ['o', [13, 10, 20, 14]], ['o', [4, 16, 11, 20]], ['o', [13, 16, 20, 20]]],
  'table-rows': [['h', [4, 4, 8, 20]], ['o', [10, 4, 20, 11]], ['o', [10, 13, 20, 20]]],
  'table-cells-rows': [['h', [4, 4, 8, 20]], ['o', [10, 4, 20, 8]], ['o', [10, 10, 20, 14]], ['o', [10, 16, 20, 20]]],
  'table-tree': [['h', [4, 4, 20, 8]], ['d', [4, 10, 20, 20]]],
  'table-cells-merge': [['o', [4, 4, 11, 8]], ['o', [13, 4, 20, 8]], ['x', [4, 10, 20, 14]], ['o', [4, 16, 11, 20]], ['o', [13, 16, 20, 20]]],
  'table-cells-split': [['o', [4, 4, 11, 8]], ['o', [13, 4, 20, 8]], ['x', [4, 10, 6.5, 14]], ['x', [8.5, 10, 11, 14]], ['x', [13, 10, 15.5, 14]], ['x', [17.5, 10, 20, 14]], ['o', [4, 16, 11, 20]], ['o', [13, 16, 20, 20]]],
};

const plate = (sharp) => rrect(new P(sharp), 2, 2, 22, 22, sharp ? 1 : 4).d;
/** the cells two-tone leaves white: the header, and the operation's cells, one
 *  box per row (split's four cells are one cut, its rules black on white) */
function whites(cells) {
  const out = cells.filter(([r]) => r === 'h').map(([, c]) => c);
  const rows = new Map();
  for (const [r, c] of cells) if (r === 'x') { const k = `${c[1]},${c[3]}`; const b = rows.get(k); rows.set(k, b ? [Math.min(b[0], c[0]), c[1], Math.max(b[2], c[2]), c[3]] : c); }
  return [...out, ...rows.values()];
}
/** a raw file's paths as layers: black stroke s, grey fill p, evenodd fill f, fill b */
function layersOf(svgText) {
  return [...svgText.matchAll(/<path([^>]*)\/>/g)].map(([, a]) => {
    const d = a.match(/ d="([^"]+)"/)[1];
    return [/ stroke="black"/.test(a) ? 's' : /fill-opacity/.test(a) ? 'p' : /evenodd/.test(a) ? 'f' : 'b', d];
  });
}
function closed(name, sharp) {
  const { table, detail = '' } = DRAW[name](sharp);
  const cells = CELLS[name];
  // 2px walls in every style (his, 24 Sep 2026: "why are only the first two
  // running on 2px, while the other 2 is much thicker?"): no bold body. The solid
  // cells are the header where there is one, else the ordinary cells (the
  // operation's cells stay the window); each runs out to the centre lines under
  // the intact stroke, so the walls are the stroke's own.
  const headed = cells.some(([r]) => r === 'h');
  const solidRole = headed ? 'h' : 'o';
  const solid = cells.filter(([r]) => r === solidRole).map(([, c]) => box(new P(sharp), inset(c, -1), sharp ? [0, 0, 0, 0] : radii(c, 3)).d).join('');
  const out = {
    stroke: [['s', table + detail]],
    // one grey plate with the header and the operation's cells cut out to the
    // stroke's centre line (holes wound against the plate), so the grey's edge is
    // hidden by the black and its corners are the frame's r=3. Cut on the
    // stroke's own edge the two touched (lint 0.00); half a unit under it the
    // corners fell to 2.5, off the ladder
    'two-tone': [['p', plate(sharp) + whites(cells).map((c) => box(new P(sharp), inset(c, -1), sharp ? [0, 0, 0, 0] : radii(c, 3), true).d).join('')], ['s', table + detail]],
    duotone: [['p', plate(sharp)], ['b', solid], ['s', table + detail]],
    fill: [['b', solid], ['s', table + detail]],
  };
  // A table with no header carries its weight on the operated row (his pick,
  // 24 Sep 2026, "D2 with F2"): the row solid in fill, black over the grey plate
  // in duotone, the outline black in both. Split's rules inside that row are cut
  // out of it as slots (grey in duotone, white in fill), so it still reads as
  // four cells; the stroke loses those segments, or they would paint the slots
  // over. Ordinary cells solid instead turned the table into a slab.
  if (!headed) {
    const x = cells.filter(([r]) => r === 'x').map(([, c]) => c);
    const row = [Math.min(...x.map((c) => c[0])) - 1, x[0][1] - 1, Math.max(...x.map((c) => c[2])) + 1, x[0][3] + 1];
    const inner = x.slice(1).map((c) => c[0] - 1);                     // the rules between the row's cells
    const band = box(new P(sharp), row, [0, 0, 0, 0]).d + inner.map((m) => box(new P(sharp), [m - 1, row[1] + 1, m + 1, row[3] - 1], [0, 0, 0, 0], true).d).join('');
    const keep = inner.length ? frame(new P(sharp), sharp).d + lines(sharp, [V(12, 3, 9), V(12, 15, 21), H(9, 3, 21), H(15, 3, 21)]) : table;
    const rowLayer = [inner.length ? 'f' : 'b', band];
    out.duotone = [['p', plate(sharp)], rowLayer, ['s', keep]];
    out.fill = [rowLayer, ['s', keep]];
  }
  return out;
}
function pivot(sharp) {
  const { table, op } = DRAW['table-pivot'](sharp);
  // the header column's cell, whole, from the header rule down and out to the
  // centre lines (his, 24 Sep 2026: "make the left side whole", then "header
  // part is wrong. half fill half empty": run through the header row, the
  // column filled a third of it). The header row stays one empty cell.
  const col = box(new P(sharp), [2, 8, 8, 20], sharp ? [0, 0, 0, 0] : [0, 0, 0, 3]).d;
  // two-tone grey wherever a closed cell can take it (his, 24 Sep 2026: "why
  // are two-tones not filled with gray bg where possible?"): the header row;
  // the column, solid in fill, is the window, and the body is open at the arrow
  const row = box(new P(sharp), [2, 2, 20, 8], sharp ? [0, 0, 0, 0] : [3, 3, 0, 0]).d;
  return {
    stroke: [['s', table + op]],
    'two-tone': [['p', row], ['s', table + op]],
    duotone: [['g', table], ['s', op]],
    fill: [['b', col], ['s', table + op]],
  };
}

/* --------------------------------------------------------------- table-off */
// The shipped table under the house slash (drawing-a-new-icon.md, "The slash is
// M2 2L22 22"): u = x - y. The base runs into the slash and stops on its centre
// line (u <= 0); u in (0, 4 sqrt 2) is cut; the far side keeps 2 of daylight
// (u >= 4 sqrt 2). The table's rule at 15 would keep 0.34 on the far side: a
// sliver, deleted. Sharp: the slash's butt ends pushed 0.4142, near ends buried
// on y = x, far ends with their inner butt corner 2.586 off the centre line
// (u = 4.6569, calendar-off's), far solid clipped straight on u = 3.6569.
// Styles: two-tone mutes the far side (file-off's form: 40% strokes); duotone
// greys the whole table and leaves the slash black (the ops' grammar: the slash
// is the operation, and the -off rule: only the slash black); fill is the
// outline over the header, solid, cut as a plate is: 3 sqrt 2 off the slash,
// turning r=1 round each far cap it meets (bell-dot's recipe).
const R4 = 4 * Math.SQRT2, Q = Math.SQRT1_2;
function off(sharp) {
  const n = new P(sharp), fr = new P(sharp), sl = new P(sharp);
  if (sharp) {
    n.M(21, 21).L(3, 21).L(3, 3).M(3, 9).L(9, 9).M(3, 15).L(15, 15).M(12, 12).L(12, 21);
    fr.M(3 + 4.6569, 3).L(21, 3).L(21, 21 - 4.6569).M(9 + 4.6569, 9).L(21, 9);
    sl.M(1.7071, 1.7071).L(22.2929, 22.2929);
  } else {
    n.M(18 + 3 * Q, 18 + 3 * Q).arc(18, 18, 3, 45, 90).L(6, 21).arc(6, 18, 3, 90, 180).L(3, 6).arc(6, 6, 3, 180, 225)
      .M(3, 9).L(9, 9).M(3, 15).L(15, 15).M(12, 12).L(12, 21);
    fr.M(3 + R4, 3).L(18, 3).arc(18, 6, 3, -90, 0).L(21, 21 - R4).M(9 + R4, 9).L(21, 9);
    sl.M(2, 2).L(22, 22);
  }
  const head = new P(sharp);
  if (sharp) {
    head.M(3 - Q, 3 - Q).arc(3, 3, 1, 225, 180).L(2, 9).L(9, 9).Z();
    head.M(2 + 3.6569, 2).L(21, 2).arc(21, 3, 1, -90, 0).L(22, 10).L(10 + 3.6569, 10).Z();
  } else {
    // the near piece stops on the rule's centre line, under the rule: run to its
    // far edge, its tip (10,10) sat 1.83 from the column's cap across the slash
    head.M(6 - 4 * Q, 6 - 4 * Q).arc(6, 6, 4, 225, 180).L(2, 9).L(9, 9).Z();
    const cx = 3 + R4, rx = 9 + R4;                               // the far caps the plate turns round
    head.M(cx - Q, 3 + Q).arc(cx, 3, 1, 135, 270).L(18, 2).arc(18, 6, 4, -90, 0).L(22, 10).L(rx, 10).arc(rx, 9, 1, 90, 135).Z();
  }
  // two-tone as calendar-off's: the plate in two pieces, the near one to the
  // slash's centre line, the far one clipped 3 sqrt 2 off it turning r=1 round
  // the far caps (sharp: straight on u = 3.6569); near strokes black, far ones
  // dropped so the far side reads as silhouette (his "gray bg where possible")
  const pl = new P(sharp);
  if (sharp) {
    pl.M(3 - Q, 3 - Q).arc(3, 3, 1, 225, 180).L(2, 21).arc(3, 21, 1, 180, 90).L(22, 22).Z();
    pl.M(2 + 3.6569, 2).L(21, 2).arc(21, 3, 1, -90, 0).L(22, 22 - 3.6569).Z();
  } else {
    pl.M(18 + 4 * Q, 18 + 4 * Q).arc(18, 18, 4, 45, 90).L(6, 22).arc(6, 18, 4, 90, 180).L(2, 6).arc(6, 6, 4, 180, 225).Z();
    const cx = 3 + R4, wy = 21 - R4;
    pl.M(cx - Q, 3 + Q).arc(cx, 3, 1, 135, 270).L(18, 2).arc(18, 6, 4, -90, 0).L(22, wy).arc(21, wy, 1, 0, 135).Z();
  }
  const all = n.d + fr.d + sl.d;
  return {
    stroke: [['s', all]],
    'two-tone': [['p', pl.d], ['s', n.d + sl.d]],
    duotone: [['g', n.d + fr.d], ['s', sl.d]],
    fill: [['b', head.d], ['s', all]],
  };
}

/* ------------------------------------------------------------------ checks */
const inkOf = (layers, sharp) => {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [k, d] of layers) {
    const x = k === 's' || k === 'g' ? strokedBBox(d, 1, cap(sharp)) : pathBBox(d);
    b = [Math.min(b[0], x[0]), Math.min(b[1], x[1]), Math.max(b[2], x[2]), Math.max(b[3], x[3])];
  }
  return b.map((v) => Math.round(v * 1e3) / 1e3);
};
const gapOf = (a, b, ra, rb) => { let m = Infinity; for (const p of outlines(a, 48)) for (const q of outlines(b, 48)) m = Math.min(m, minGap(p, q)); return m - ra - rb; };

export const NAMES = ['table', 'table-rows', 'table-cells-rows', 'table-tree', 'table-pivot', 'table-off', 'table-cells-merge', 'table-cells-split'];
export function buildAll() {
  const icons = {}, report = {};
  for (const name of NAMES) {
    const v = {}; const r = [];
    for (const c of CORNERS) {
      const sharp = c === 'sharp';
      v[c] = name === 'table-pivot' ? pivot(sharp) : name === 'table-off' ? off(sharp) : closed(name, sharp);
      const boxes = STYLES.map((s) => inkOf(v[c][s], sharp).join(','));
      if (new Set(boxes).size !== 1) throw new Error(`${name} ${c}: ink boxes differ ${boxes.join(' | ')}`);
      const bx = boxes[0].split(',').map(Number), pads = [bx[0], bx[1], 24 - bx[2], 24 - bx[3]];
      if (pads.some((x) => Math.abs(x - Math.round(x)) > 1e-3) || pads[0] !== pads[2] || pads[1] !== pads[3]) throw new Error(`${name} ${c}: pads ${pads}`);
      r.push(`${c} ink ${boxes[0]}`);
      const texts = STYLES.map((s) => svg(v[c][s], sharp));
      const distinct = 4;
      if (new Set(texts).size !== distinct) throw new Error(`${name} ${c}: ${new Set(texts).size} distinct styles`);
    }
    // the drawing's own gaps, regular: every detail 2 clear
    const d = DRAW[name] ? DRAW[name](false) : {};
    if (d.detail) r.push(`detail to table ${gapOf(d.detail, d.table, 1, 1).toFixed(2)}`);
    if (d.op) r.push(`arrow to table ${gapOf(d.op, d.table, 1, 1).toFixed(2)}`);
    icons[name] = v; report[name] = r;
  }
  return { icons, report };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { icons, report } = buildAll();
  const DEST = join(outDir(), 'raw');
  for (const [name, v] of Object.entries(icons)) {
    mkdirSync(join(DEST, name), { recursive: true });
    for (const c of CORNERS) for (const s of STYLES) writeFileSync(join(DEST, name, fileName(s, c)), svg(v[c][s], c === 'sharp'));
    console.log(name.padEnd(20), report[name].join(' | '));
  }
}
