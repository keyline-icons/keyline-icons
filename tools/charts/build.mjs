/**
 * Emit the chart and diagram batch into raw/ (or --out=DIR/raw).
 *   node tools/charts/build.mjs [name ...] [--out=DIR]
 *
 * Round one, 10 Sep 2026: chart-diagram, chart-pyramid, chart-waterfall,
 * chart-no-axes-combined, chart-scatter-3d. Built on the v5 libraries the way
 * tools/v7/build.mjs is, and on the chart family's own vocabulary: the axis is
 * an L from (3,3) to (21,21) turning on r=2, the plot it leaves is x 6..22 by
 * y 2..18, and bars are 2-unit strokes standing 2 clear of the foot. Every
 * plate is an offset checked sample by sample, every knockout is wound against
 * its plate, and every sharp free end goes through `sharpEndIn` so the two
 * treatments paint the same box.
 *
 * The names are Font Awesome's inventory and nothing else: the free repo holds
 * chart-diagram alone of these five, and its layout (a header over children)
 * is the only thing read off it. The rest are drawn from what the words mean.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, add, sub, mul, unit } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });

/* ------------------------------------------------------------- helpers */

function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
const runPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join('');
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};
const reverseSeg = (g) =>
  g.type === 'L' ? { type: 'L', p0: g.p1, p1: g.p0 } : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 };
const windingOf = (segs) => Math.sign(areaOf(flatten(segs, 24)));
/** `segs` wound AGAINST `plateSegs`, so it cuts under the non-zero rule. */
const hole = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? [...segs].reverse().map(reverseSeg) : segs);

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1);
  return off;
}

/**
 * A polyline whose free ends sharp pushes out, so the butt cap paints where
 * the round cap's disc reached. `ends` says which of the two are free; an end
 * that lands on another stroke stays put. `box` is the box the rounded drawing
 * paints, which is what clamps a diagonal end's corners.
 */
function sharpen(pts, ends = [true, true], box = [1, 1, 23, 23]) {
  const p = pts.map((q) => [...q]);
  if (ends[0]) {
    const dir = unit(sub(p[0], p[1]));
    p[0] = add(p[0], mul(dir, sharpEndIn(p[0], dir, box)));
  }
  if (ends[1]) {
    const last = p.length - 1;
    const dir = unit(sub(p[last], p[last - 1]));
    p[last] = add(p[last], mul(dir, sharpEndIn(p[last], dir, box)));
  }
  return p;
}
const run = (pts, sharp, ends = [true, true], box) => runPath(sharp ? sharpen(pts, ends, box) : pts);

/** An open elbow a -> v -> b turning on r=2 rounded and a true corner sharp, both free ends squared. */
function elbow([a, v, b], sharp) {
  const out = (p) => (sharp ? add(p, mul(unit(sub(p, v)), sharpEndIn(p, unit(sub(p, v))))) : p);
  const A = out(a), B = out(b);
  return new Path().M(A).corner(v, B, sharp ? 0 : 2).L(B).toString();
}
/** The family's axis: up the left at x=3 and along the foot at y=21, turning on r=2. */
const AXIS = (sharp) => elbow([[3, 3], [3, 21], [21, 21]], sharp);

/** A box on the ladder, both treatments, with its plate. */
const box = ([x0, y0, x1, y1], r) => polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);

const SETS = {};

/* -------------------------------------------------------- chart-diagram */

/**
 * A hierarchy: one header over two children, joined by a stem, a rail and two
 * drops. Font Awesome's has three children; three across 20 units of ink with
 * the house 2 between leaves each 3.33 wide on the path, which is no interior
 * at all, so it is two. The vertical budget is the whole drawing: ink 2..22 is
 * (h1 + 2) + 2 + 2 + 2 + (h2 + 2) for the header, the gap, the rail, the gap
 * and the children, so h1 + h2 = 10 and both take 5 for an interior of 3.
 *
 * Header 3..21 by 3..8 on r=2 (its height of 5 cannot take the body's 3, and 2
 * fills to 3); children 3..10 and 14..21 by 16..21 on r=1, 2 apart. The stem
 * runs from the header's bottom edge to the rail, the rail from one child's
 * centre line to the other's turning down on r=1, and every end lands ON a
 * centre line, so nothing is free and sharp squares nothing.
 */
SETS['chart-diagram'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const header = box([3, 3, 21, 8], sharp ? 0 : 2);
    const kids = [box([3, 16, 10, 21], sharp ? 0 : 1), box([14, 16, 21, 21], sharp ? 0 : 1)];
    const bodies = [header, ...kids];
    const plates = bodies.map((b) => plateOf(b.segs));
    const r = sharp ? 0 : 1;
    const wires = 'M12 8L12 12' +
      new Path().M([6.5, 16]).corner([6.5, 12], [17.5, 12], r).corner([17.5, 12], [17.5, 16], r).L([17.5, 16]).toString();
    const d = bodies.map(String).join('') + wires;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(wires)];
  }
  return out;
};

/* -------------------------------------------------------- chart-pyramid */

/**
 * A triangle in three layers. The sharp triangle is `triangle-alert`'s, apex
 * (12,3) over a base from (2,21) to (22,21), which paints 1..23 by 2..22 with
 * round joins. The rounded one takes r=2 at every corner (fill: 3, on the
 * ladder) and its vertices are solved BACKWARDS so the painted arcs land on
 * that same box, §3 of the reference: the apex sits above the canvas and the
 * base corners outside it, which is the normal result of a fillet at an
 * oblique corner.
 *
 * Two rules at y=9 and y=15 run wall to wall, each end on the side's centre
 * line so the cap is buried, dividing the height 3..21 into three bands of 6
 * with interiors of 4. The fill opens the middle band the way `map` opens its
 * middle leaf: a knockout bounded by the rules' inner ink at 10 and 14 and by
 * the sides' inner ink, offset a unit perpendicular to each side, with the
 * corners at the true crossings.
 */
function pyramid(sharp) {
  const R = sharp ? 0 : 2;
  const want = [1, 2, 23, 22];
  let ya = 3, xb = 2;
  const tri = () => polyContour([[12, ya], [xb, 21], [24 - xb, 21]], [R, R, R]);
  if (!sharp) {
    for (let i = 0; i < 40; i++) {
      // apex for the top, then base for the left; the two converge in a few passes
      let lo = -6, hi = 3;
      for (let j = 0; j < 60; j++) { ya = (lo + hi) / 2; if (strokedBBox(tri().d, 1, 'round')[1] > want[1]) hi = ya; else lo = ya; }
      lo = -6; hi = 2;
      for (let j = 0; j < 60; j++) { xb = (lo + hi) / 2; if (strokedBBox(tri().d, 1, 'round')[0] > want[0]) hi = xb; else lo = xb; }
    }
  }
  const t = tri();
  const b = strokedBBox(t.d, 1, sharp ? 'butt' : 'round');
  if (Math.max(...b.map((v, i) => Math.abs(v - want[i]))) > 0.002) throw new Error(`pyramid box ${b.join(', ')}`);
  // the left side's line and its inner ink line, as x at a height
  const d = [xb - 12, 21 - ya], L = Math.hypot(...d);
  const xLeft = (y) => 12 + (d[0] / d[1]) * (y - ya);
  const inner = L / d[1];                                     // 1 / cos(angle off vertical)
  return { t, xLeft, xInner: (y) => xLeft(y) + inner, ya, xb };
}

SETS['chart-pyramid'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const { t, xLeft, xInner } = pyramid(sharp);
    const plate = plateOf(t.segs);
    const rules = [9, 15].map((y) => run([[xLeft(y), y], [24 - xLeft(y), y]], sharp, [false, false])).join('');
    const d = t.toString() + rules;
    const panel = lineSegs([[xInner(10), 10], [24 - xInner(10), 10], [24 - xInner(14), 14], [xInner(14), 14], [xInner(10), 10]]);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, panel))];
  }
  return out;
};

/* ------------------------------------------------------ chart-waterfall */

/**
 * Four bars on the list family's 4 pitch at x 7, 11, 15 and 19, which puts 2
 * of daylight between them and centres the run on the plot with 2 either side.
 * A waterfall is the one column chart whose bars do not share a base: the
 * first stands on the plot floor to 11, the second floats from that level up
 * to 5, the third falls from 5 to 9, and the last stands on the floor to that
 * level, a rise, a rise, a fall and the total. Stroke only, like every open
 * chart in the family.
 */
SETS['chart-waterfall'] = () => {
  const BARS = [[[7, 17], [7, 11]], [[11, 11], [11, 5]], [[15, 5], [15, 9]], [[19, 17], [19, 9]]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(AXIS(sharp) + BARS.map((b) => run(b, sharp)).join(''))];
  }
  return out;
};

/* ----------------------------------------------- chart-no-axes-combined */

/**
 * `bar-chart`'s composition, three bars on no axis painting the vertical
 * 18 by 22, with a line series over them. The line is `chart-line`'s
 * vocabulary at 45 degrees, up, down and up, turning on r=1, from (4,10) to
 * (20,2) so its ink spans 3..21 like the bars do; the bars stand on 22 at x 7,
 * 12 and 17 on the family's 5 pitch, and each rises to the last whole unit that
 * keeps its cap 2 clear of the run above it: a cap 4 from a 45-degree line on
 * the centre lines is 5.66 in x + y, so the tops are 13, 12 and 11 and every
 * bar sits 2.24 under the line.
 */
SETS['chart-no-axes-combined'] = () => {
  const out = {};
  const BOX = [3, 1, 21, 23];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const A = sharp ? sharpen([[4, 10], [10, 4]], [true, false], BOX)[0] : [4, 10];
    const B = sharp ? sharpen([[14, 8], [20, 2]], [false, true], BOX)[1] : [20, 2];
    const line = new Path().M(A).corner([10, 4], [14, 8], r).corner([14, 8], B, r).L(B).toString();
    const bars = [[[7, 22], [7, 13]], [[12, 22], [12, 12]], [[17, 22], [17, 11]]].map((b) => run(b, sharp, [true, true], BOX)).join('');
    out[`stroke.${key}`] = [S(line + bars)];
  }
  return out;
};

/* ---------------------------------------------------- chart-scatter-3d */

/**
 * Three axes from one origin at (8,16): y up to 3, x right to 21, and z
 * down-left at 45 degrees to (3,21), so the drawing paints 2..22 both ways.
 * The origin is a true vertex with the round join: three arms meeting cannot
 * take the family's r=2 turn without the third arm poking out of the arc's
 * far side. The readings are beads, filled r=1.5 painting 3, the dot ladder's
 * "an element of its own", at (13,5), (19,8) and (14,11): every bead clears the
 * axes by 2.5 and its neighbours by 2.8 or more. A bead stays round in sharp,
 * as `tag`'s eyelet does. Open glyph, stroke only.
 */
SETS['chart-scatter-3d'] = () => {
  const O = [8, 16];
  const BEADS = [[13, 5], [19, 8], [14, 11]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const BOX = [2, 2, 22, 22];
    const axes = run([[8, 3], O, [21, 16]], sharp, [true, true], BOX) + run([O, [3, 21]], sharp, [false, true], BOX);
    out[`stroke.${key}`] = [S(axes), F_(BEADS.map((c) => circlePath(c, 1.5)).join(''))];
  }
  return out;
};

/* ------------------------------------------------------------------ main */

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  const names = want.length ? want : Object.keys(SETS);
  for (const name of names) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const variants = SETS[name]();
    writeSet(root, name, variants);
    const inkOf = (layers, cap) => {
      const b = strokedBBox(layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join(''), 1, cap);
      for (const l of layers.filter((l) => l.kind !== 'stroke')) {
        const q = strokedBBox(l.d, 0, 'butt');
        b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
      }
      return b;
    };
    const box = inkOf(variants['stroke.regular'], 'round');
    const sbox = inkOf(variants['stroke.sharp'], 'butt');
    console.log(name.padEnd(24), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
      ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
      ' sharp', sbox.map((v) => v.toFixed(2).padStart(6)).join(' '),
      ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS };
