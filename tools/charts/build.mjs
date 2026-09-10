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
 * ZAFAR'S DRAWING, 10 Sep 2026, fitted. Five bars on the 4 pitch at x 4..20
 * standing on 21, and a line running THROUGH the field from (22,3) down to a
 * valley, up over a peak and off to (2,12), turning on r=1 like `chart-line`.
 * His vertices read back as (13.11,10.35) and (7.56,6.49) with fillets of
 * 1.01 and 1.00, so they snap to (13,10.5) and (7.5,6.5) on r=1 and nothing
 * else about the line moved. Two bar tops moved half a unit: his 14.5 and 13
 * under the runs measured 1.82 and 1.85 to the line, and 15 and 13.5 measure
 * 2.23. Ink 1..23 by 2..22, the horizontal size.
 */
SETS['chart-no-axes-combined'] = () => {
  const out = {};
  const BOX = [1, 2, 23, 22];
  const BARS = [[4, 17], [8, 12], [12, 15], [16, 13.5], [20, 10]];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const A = sharp ? sharpen([[22, 3], [13, 10.5]], [true, false], BOX)[0] : [22, 3];
    const B = sharp ? sharpen([[7.5, 6.5], [2, 12]], [false, true], BOX)[1] : [2, 12];
    const line = new Path().M(A).corner([13, 10.5], [7.5, 6.5], r).corner([7.5, 6.5], B, r).L(B).toString();
    const bars = BARS.map(([x, top]) => run([[x, 21], [x, top]], sharp, [true, true], BOX)).join('');
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

/* ----------------------------------------------------------- chart-radar */

/**
 * `chart-radar` was drawn on 10 Sep 2026 (a pointy-top hexagon with three
 * diameters and a data hexagon at half size, commit c4c5fdd9) and dropped on
 * Zafar's word the same day. The drawing is in that commit if it is wanted.
 */

/* -------------------------------------------------------- chart-tree-map */

/**
 * The house body, 3..21 on r=3, partitioned: a rule down x=11, a rule across
 * the right half at y=11 and one down x=16 below it, so the cells are one
 * tall, one wide and two small, every rule ending on another's centre line.
 * The fill slots all three rules out of the solid, each cut at the last's
 * ink edge so no two holes overlap: the blocks separated by white are what
 * says treemap where an opened panel says `panel-left`.
 */
SETS['chart-tree-map'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = box([3, 3, 21, 21], sharp ? 0 : 3);
    const plate = plateOf(body.segs);
    const rules = 'M11 3L11 21M11 11L21 11M16 11L16 21';
    const slot = ([x0, y0, x1, y1]) => hole(plate, lineSegs([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]));
    const slots = slot([10, 4, 12, 20]) + slot([12, 10, 20, 12]) + slot([15, 12, 17, 20]);
    out[`stroke.${key}`] = [S(body.toString() + rules)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(body.toString() + rules)];
    out[`fill.${key}`] = [F_(contourPath(plate) + slots)];
  }
  return out;
};

/* --------------------------------------------------- chart-scatter-bubble */

/**
 * `chart-scatter`'s plot with three readings of three sizes: rings of r=3,
 * 2 and 1.5 at (17,6), (9,14) and (18,15). Each clears the axis by at least
 * 2 (the small one 2.5 above the foot) and its neighbours by 2.56 or more,
 * which is what fixed the big one's size: a fourth unit of radius leaves no
 * placement for the other two. Rings paint 8, 6 and 5 and close, so the fill
 * is three discs on the axis.
 */
SETS['chart-scatter-bubble'] = () => {
  const BUBBLES = [[[17, 6], 3], [[9, 14], 2], [[18, 15], 1.5]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const rings = BUBBLES.map(([c, r]) => circlePath(c, r)).join('');
    const discs = BUBBLES.map(([c, r]) => circlePath(c, r + 1)).join('');
    out[`stroke.${key}`] = [S(AXIS(sharp) + rings)];
    out[`duotone.${key}`] = [P(discs), S(AXIS(sharp) + rings)];
    out[`fill.${key}`] = [F_(discs), S(AXIS(sharp))];
  }
  return out;
};

/* ---------------------------------------------------------- chart-bullet */

/**
 * `chart-bullet` was drawn on 10 Sep 2026 (c4c5fdd9) and dropped on Zafar's word.
 */

/* ------------------------------------------------------- chart-line-down */

/**
 * ZAFAR'S DRAWING, 10 Sep 2026, fitted. A line from (7,8) falling, rising and
 * falling into an arrowhead at (21,15), the head 4.5 on each arm (his 4.2 and
 * 4.67, read as one symmetric bracket) on r=0.5, and the run stopping one
 * unit short of the corner along its own direction, which is where his ends.
 * His vertices read back as (10.89,12.29) and (14.77,9.29) with fillets of
 * 0.67; they snap to (11,12.5) and (15,9.5), and the fillet goes to r=1, the
 * radius his `chart-line` turns on, rather than the ladder's nearer 0.5.
 * The head's arms sit about 1 off the run, the wedge every 4-unit head in the
 * set has. `chart-line-up` is this drawing mirrored about y=11.5, as his is.
 */
SETS['chart-line-down'] = () => {
  const out = {};
  const BOX = [2, 2, 22, 22];
  const M = (p) => p;
  const V = [[7, 8], [11, 12.5], [15, 9.5]].map(M);
  const C = M([21, 15]);
  const dir = unit(sub(C, V[2]));
  const END = sub(C, dir);                 // one unit short of the corner, his stop
  const ARM = [M([16.5, 15]), M([21, 10.5])];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const A = sharp ? sharpen([V[0], V[1]], [true, false], BOX)[0] : V[0];
    const line = new Path().M(A).corner(V[1], V[2], r).corner(V[2], END, r).L(END).toString();
    const a0 = sharp ? sharpen([ARM[0], C], [true, false], BOX)[0] : ARM[0];
    const a1 = sharp ? sharpen([C, ARM[1]], [false, true], BOX)[1] : ARM[1];
    const head = new Path().M(a0).corner(C, a1, sharp ? 0 : 0.5).L(a1).toString();
    out[`stroke.${key}`] = [S(AXIS(sharp) + line + head)];
  }
  return out;
};

/* ---------------------------------------------------- round three helpers */

/** `segs` wound WITH `plateSegs`, so it paints beside it. */
const solidOn = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? segs : [...segs].reverse().map(reverseSeg));

/** The family's small arrow: a 4-wide head on the stem, arms at 45 degrees, every end buried or free as said. */
const arrowRuns = (from, tip, dir) => {
  // dir is [0,1] for down, [0,-1] for up; the head's arms sit 2 back from the tip
  const back = [tip[0] - 2 * dir[0], tip[1] - 2 * dir[1]];
  const side = [-dir[1], dir[0]];
  return [[from, tip], [[back[0] - 2 * side[0], back[1] - 2 * side[1]], tip, [back[0] + 2 * side[0], back[1] + 2 * side[1]]]];
};

/**
 * An S between two points with horizontal tangents at both ends, as two
 * tangent arcs of radius R with straight leads either side, so the plate can
 * be an exact offset. The rise fixes the turn: 2R(1 - cos t) = rise.
 */
function sTo(p, target, R) {
  const cur = p.cur;
  const dx = target[0] - cur[0], dy = target[1] - cur[1];
  const sx = Math.sign(dx), sy = Math.sign(dy);
  const rise = Math.abs(dy);
  const t = (Math.acos(1 - rise / (2 * R)) * 180) / Math.PI;
  const run = 2 * R * Math.sin((t * Math.PI) / 180);
  const lead = (Math.abs(dx) - run) / 2;
  if (lead < 0) throw new Error('S has no room');
  const p1 = [cur[0] + sx * lead, cur[1]];
  p.L(p1);
  const C1 = [p1[0], p1[1] + sy * R];
  const a0 = -sy * 90, dir = sx * sy, a1 = a0 + dir * t;
  p.A(C1, a0, a1, dir);
  const M = p.cur;
  const C2 = [2 * M[0] - C1[0], 2 * M[1] - C1[1]];
  p.A(C2, a1 + 180, a0 + 180, -dir);
  p.L(target);
  return p;
}

/* ---------------------------------------------------------- chart-line-up */

/** `chart-line-down` mirrored about y=11.5, which is how he drew the pair. */
SETS['chart-line-up'] = () => {
  const out = {};
  const BOX = [2, 2, 22, 22];
  const M = (p) => [p[0], 23 - p[1]];
  const V = [[7, 8], [11, 12.5], [15, 9.5]].map(M);
  const C = M([21, 15]);
  const dir = unit(sub(C, V[2]));
  const END = sub(C, dir);                 // one unit short of the corner, his stop
  const ARM = [M([16.5, 15]), M([21, 10.5])];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const A = sharp ? sharpen([V[0], V[1]], [true, false], BOX)[0] : V[0];
    const line = new Path().M(A).corner(V[1], V[2], r).corner(V[2], END, r).L(END).toString();
    const a0 = sharp ? sharpen([ARM[0], C], [true, false], BOX)[0] : ARM[0];
    const a1 = sharp ? sharpen([C, ARM[1]], [false, true], BOX)[1] : ARM[1];
    const head = new Path().M(a0).corner(C, a1, sharp ? 0 : 0.5).L(a1).toString();
    out[`stroke.${key}`] = [S(AXIS(sharp) + line + head)];
  }
  return out;
};

/* ------------------------------------------- diagram-next, diagram-previous */

/**
 * `diagram-next` and `diagram-previous` were drawn on 10 Sep 2026 (14a3a69c) and
 * dropped on Zafar's word; the bars-and-arrow construction is in that commit.
 */

/* ---------------------------------- diagram-successor, diagram-predecessor */

/**
 * A half-width box and a full-width bar, with a hooked arrow from the box's
 * side turning on r=1 and pointing at the bar: the bar is the successor when
 * it sits below and the arrow comes down onto it, the predecessor when it sits
 * above and the arrow rises to it. The hook turns at x=18 so the head's near
 * arm clears the box's ink by 2, and the tip stops 2 clear of the bar.
 */
function hookedArrow(successor) {
  const out = {};
  const boxes = successor ? [[3, 3, 12, 8], [3, 16, 21, 21]] : [[3, 16, 12, 21], [3, 3, 21, 8]];
  const y0 = successor ? 5.5 : 18.5, tipY = 12, dirY = successor ? 1 : -1;
  const head = arrowRuns([18, y0], [18, tipY], [0, dirY])[1];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bodies = boxes.map((b) => box(b, sharp ? 0 : 2));
    const plates = bodies.map((b) => plateOf(b.segs));
    const wire = new Path().M([12, y0]).corner([18, y0], [18, tipY], sharp ? 0 : 1).L([18, tipY]).toString();
    const arrow = wire + run(head, sharp, [true, true]);
    const d = bodies.map(String).join('') + arrow;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(arrow)];
  }
  return out;
}
SETS['diagram-successor'] = () => hookedArrow(true);
SETS['diagram-predecessor'] = () => hookedArrow(false);

/* ------------------------------------------------------- diagram-project */

/**
 * Three nodes: two boxes on the top row 2 apart, one centred below, a wire
 * between the top pair and an L from the left box down and across into the
 * bottom one. The L's run at y=12 sits 2 from the top boxes' ink and 2 from
 * the bottom box's, which is what put the boxes on 3..8 and 16..21.
 */
SETS['diagram-project'] = () => {
  const out = {};
  const boxes = [[3, 3, 10, 8], [14, 3, 21, 8], [8.5, 16, 15.5, 21]];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bodies = boxes.map((b) => box(b, sharp ? 0 : 1));
    const plates = bodies.map((b) => plateOf(b.segs));
    const r = sharp ? 0 : 1;
    const wires = 'M10 5.5L14 5.5' + new Path().M([6.5, 8]).corner([6.5, 12], [12, 12], r).corner([12, 12], [12, 16], r).L([12, 16]).toString();
    const d = bodies.map(String).join('') + wires;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(wires)];
  }
  return out;
};

/* ------------------------------------------------------- diagram-subtask */

/**
 * A parent box top-left and its subtask bottom-right, indented, joined by an
 * L that drops from the parent at x=6 (2 clear of the child's wall at 10) and
 * enters the child on its own centre line.
 */
SETS['diagram-subtask'] = () => {
  const out = {};
  const boxes = [[3, 3, 14, 8], [10, 16, 21, 21]];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bodies = boxes.map((b) => box(b, sharp ? 0 : 2));
    const plates = bodies.map((b) => plateOf(b.segs));
    const wire = new Path().M([6, 8]).corner([6, 18.5], [10, 18.5], sharp ? 0 : 1).L([10, 18.5]).toString();
    const d = bodies.map(String).join('') + wire;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(wire)];
  }
  return out;
};

/* -------------------------------------------------------- diagram-nested */

/**
 * `diagram-nested` (a box in a box) was drawn on 10 Sep 2026 (14a3a69c) and dropped.
 */

/* --------------------------------------------------------- diagram-cells */

/**
 * `diagram-cells` (a header band over three columns) was drawn on 10 Sep 2026
 * (14a3a69c) and dropped.
 */

/* -------------------------------------------------------- diagram-sankey */

/**
 * `diagram-sankey` (one flow splitting into two, `sTo` above is its S) was drawn
 * on 10 Sep 2026 (14a3a69c) and dropped.
 */

/* ------------------------------ arrow-up-right-dots, arrow-down-left-dots */

/**
 * `arrow-up-right-dots` and its down-left twin were drawn on 10 Sep 2026
 * (14a3a69c) and dropped.
 */

/* --------------------------------------------------------- bars-progress */

/**
 * Two bars 6 tall on r=2, each with a rule marking how far it has filled, at
 * x=15 on the upper and x=10 on the lower. The fill opens the unfilled part
 * of each bar, from the rule's ink to the wall's inner ink, so the solid reads
 * as two progress bars rather than two slabs.
 */
SETS['bars-progress'] = () => {
  const out = {};
  const bars = [[3, 3, 21, 9], [3, 15, 21, 21]];
  const marks = [15, 10];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bodies = bars.map((b) => box(b, sharp ? 0 : 2));
    const plates = bodies.map((b) => plateOf(b.segs));
    const rules = bars.map(([, y0, , y1], i) => `M${marks[i]} ${y0}L${marks[i]} ${y1}`).join('');
    const r = sharp ? 0 : 1;
    const opens = bars.map(([, y0, , y1], i) =>
      hole(plates[i], polyContour([[marks[i] + 1, y0 + 1], [20, y0 + 1], [20, y1 - 1], [marks[i] + 1, y1 - 1]], [0, r, r, 0]).segs)).join('');
    const d = bodies.map(String).join('') + rules;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('') + opens)];
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
