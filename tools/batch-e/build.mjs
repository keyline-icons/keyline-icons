/**
 * Emit batch E of the v0.8.0 work into raw/ (or --out=DIR/raw).
 *   node tools/batch-e/build.mjs [name ...] [--out=DIR]
 *
 * Twelve names from a month of empty searches on the site, 10 Sep 2026:
 * coffee, cake, soup, bottle, key, coins, film, paintbrush, paint-roller,
 * palette, easel, broom. Built on the v5 libraries the way tools/charts/build.mjs
 * is: every closed body is a polygon with a per-vertex radius or a run of
 * circular arcs, every plate is an offset checked sample by sample, every
 * knockout is wound against its plate, and every sharp free end goes through
 * `sharpEndIn` so the two treatments paint the same box.
 *
 * The names are the brief and nothing else is read off another set: each
 * drawing is derived from the house envelope, the radius ladder and the 2-unit
 * gap, and the overlap check in the skill's tools/ is run against the reference
 * set's drawing for every name that exists there.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten, clipContour, clipByDistance } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, circleCross, onArc, add, sub, mul, unit, dot, cross, len } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { offsetPath, verify as verifyCubic } from '../v6/offset-cubic.mjs';
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
const deg = (a) => (a * 180) / Math.PI;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

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
/** `segs` wound WITH `plateSegs`, so it paints beside it. */
const solidOn = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? segs : [...segs].reverse().map(reverseSeg));

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1);
  return off;
}

const circleSegs = (c, r) => [{ type: 'A', c, r, a0: 0, a1: 360 }];

/**
 * A polyline whose free ends sharp pushes out, so the butt cap paints where
 * the round cap's disc reached. `ends` says which of the two are free; an end
 * that lands on another stroke stays put.
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

/** A box on the ladder, with its plate. */
const box = ([x0, y0, x1, y1], r) => polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);

/**
 * The inner ink contour of a filleted polygon: every edge moved a unit into
 * the material, a convex corner's radius down by one (floored at zero, a true
 * corner), a reflex corner's up by one. This is what a knockout is bounded by,
 * so a panel opened in a fill ends exactly on the ink the stroke already draws.
 */
function inset(pts, radii) {
  const nv = pts.length;
  const orient = Math.sign(areaOf(pts));
  const out = [], rr = [];
  for (let i = 0; i < nv; i++) {
    const A = pts[(i - 1 + nv) % nv], V = pts[i], B = pts[(i + 1) % nv];
    const u = unit(sub(A, V)), w = unit(sub(B, V));
    const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
    const bis = unit(add(u, w));
    const convex = Math.sign(cross(sub(V, A), sub(B, V))) === orient;
    out.push(add(V, mul(bis, (convex ? 1 : -1) / Math.sin(alpha / 2))));
    rr.push(convex ? Math.max(0, (radii[i] ?? 0) - 1) : (radii[i] ?? 0) + 1);
  }
  return polyContour(out, rr);
}

/** The runs of a closed contour on one side of a horizontal line, as knockouts. */
const panelBelowLine = (inner, y, keep) => clipContour(inner.segs, [0, y], [0, 1], 0, keep, true);

/** A stadium: the outline of a stroked straight run, round caps. */
function stadium(a, b, half = 1) {
  const t = unit(sub(b, a)), n = [t[1], -t[0]];
  const p = new Path().M(add(a, mul(n, half))).L(add(b, mul(n, half)));
  p.A(b, ang(b, p.cur), ang(b, p.cur) + 180, 1);
  p.L(add(a, mul(n, -half)));
  p.A(a, ang(a, p.cur), ang(a, p.cur) + 180, 1);
  return p.Z();
}

/**
 * A stroked arc run outlined into a band: outer arc, cap, inner arc, cap. The
 * caps are half turns routed through the point off the end of the stroke, so
 * neither can pick the wrong way round; sharp caps are flat, and a sharp end
 * carries the same straight stub the stroke does.
 */
function arcBand(seg, sharp, stubs = [0, 0]) {
  const { c, r, a0, a1 } = seg;
  const s = Math.sign(a1 - a0) || 1;
  const tan = (a) => mul([-Math.sin((a * Math.PI) / 180), Math.cos((a * Math.PI) / 180)], s);
  const E0 = onArc(c, r, a0), E1 = onArc(c, r, a1);
  const p = new Path().M(onArc(c, r + 1, a0));
  p.A(c, a0, a1, s);
  if (sharp) {
    const t1 = tan(a1);
    p.L(add(onArc(c, r + 1, a1), mul(t1, stubs[1]))).L(add(onArc(c, r - 1, a1), mul(t1, stubs[1]))).L(onArc(c, r - 1, a1));
  } else p.A(E1, a1, a1 + 180 * s, s);
  p.A(c, a1, a0, -s);
  if (sharp) {
    const t0 = mul(tan(a0), -1);
    p.L(add(onArc(c, r - 1, a0), mul(t0, stubs[0]))).L(add(onArc(c, r + 1, a0), mul(t0, stubs[0])));
  } else p.A(E0, a0 + 180 * s, a0 + 360 * s, s);
  return p.Z();
}

/**
 * One wisp of steam: an S of two r=2.5 arcs rising four units and crossing one
 * unit either side of its centre, which is a 3-4-5 triangle (cos 0.6, sin 0.8)
 * so every on-curve point lands on the half grid. Three of them on a 6 pitch
 * keep the house 2 between their ink. Sharp adds the unit as a straight stub
 * along each end's tangent, the arc's own endpoint never moving.
 */
function wisp(x, sharp, box = [1, 1, 23, 23], yb = 7) {
  const T = deg(Math.acos(0.6));
  const k0 = sharp ? sharpEndIn([x - 1, yb], [0, 1], box) : 0;
  const k1 = sharp ? sharpEndIn([x + 1, yb - 4], [0, -1], box) : 0;
  const p = new Path().M([x - 1, yb + k0]);
  if (k0) p.L([x - 1, yb]);
  p.A([x + 1.5, yb], 180, 180 + T, 1);            // to (x, yb - 2)
  p.A([x - 1.5, yb - 4], T, 0, -1);               // to (x + 1, yb - 4)
  if (k1) p.L([x + 1, yb - 4 - k1]);
  return p.toString();
}
const steam = (xs, sharp, box, yb) => xs.map((x) => wisp(x, sharp, box, yb)).join('');


/**
 * A scalloped edge of alternating circular arcs, peak to peak, tangent at every
 * junction. Arcs rather than cubics because the offset of an arc is an arc, so
 * the plate is exact arithmetic; and the chain starts and ends ON a peak, where
 * the tangent is horizontal, so the corner it makes with a wall is a true right
 * angle that takes an ordinary fillet.
 *
 * `half` is the distance from a peak to the next trough, `amp` the rise from
 * the mean line to either. Every arc has the same radius, centred alternately
 * below a peak and above a trough.
 */
function scallop(p, x0, x1, yPeak, amp, half) {
  const R = (half * half / 4 + amp * amp) / (2 * amp);
  const mean = yPeak + amp;
  const n = Math.round((x1 - x0) / half);
  const ang = (c, q) => (Math.atan2(q[1] - c[1], q[0] - c[0]) * 180) / Math.PI;
  let cur = [x0, yPeak];
  for (let i = 0; i < n; i++) {
    const up = i % 2 === 0;                       // leaving a peak, or leaving a trough
    const cx = x0 + i * half;
    const c = [cx, up ? yPeak + R : yPeak + 2 * amp - R];
    const end = i === n - 1 ? [x1, yPeak] : [cx + half / 2, mean];
    p.A(c, ang(c, cur), ang(c, end), up ? 1 : -1);
    cur = end;
    if (i === n - 1) break;
    // the next arc carries on from the inflection to the following peak or trough
    const c2 = [cx + half, up ? yPeak + 2 * amp - R : yPeak + R];
    const end2 = [cx + half, up ? yPeak + 2 * amp : yPeak];
    p.A(c2, ang(c2, cur), ang(c2, end2), up ? -1 : 1);
    cur = end2;
  }
  return p;
}


/**
 * A dot, round in the rounded treatment and SQUARE in sharp, on r=0.5. His
 * ruling of 11 Sep 2026, looking at the cake's two flames beside its squared
 * body: "circles must be squares in sharp".
 *
 * **r=0.5 is the set's own answer, not a softening.** It is what the shipped
 * sharp half already does when it squares something round — the toggles and the
 * `sliders-2` knobs all carry r=0.5 squares — and the arithmetic lands on the
 * linter's allowance exactly. A square of side `d` on r=0.5 reaches
 * `(d/2 - 0.5)sqrt 2 + 0.5` from its centre, so a 3-unit bead measures 3.828
 * across, which is `2(sqrt 2 - 1)` past the ladder's 3 and precisely the
 * CAP_CORNER allowance DOT grants a sharp drawing. At r=0 it measures 4.243
 * and fails.
 *
 * The square keeps the circle's own box, which is what the shipped treatment
 * does to every rounded body: the slider's pill keeps 6..14 by 4..10 and only
 * its corners change. What it cannot keep is the DIAGONAL, where the corner
 * reaches 0.414 further than the arc did — the standing allowance elsewhere,
 * and a real 0.414 off any neighbour's daylight, which SPACING has no way to
 * excuse.
 *
 * Note this is NOT what the shipped sharp half does to a DOT: 33 drawings keep
 * a round filled mark in sharp, `alert`, `more-horizontal`, `tag`'s eyelet,
 * `lock`'s keyhole and every git node among them. Sweeping those is his call.
 */
const markGlyph = (c, r, sharp) => {
  if (!sharp) return circlePath(c, r);
  const k = 0.5;
  return polyContour([[c[0] - r, c[1] - r], [c[0] + r, c[1] - r], [c[0] + r, c[1] + r], [c[0] - r, c[1] + r]], [k, k, k, k]).toString();
};
/** The same dot as segments, for a knockout wound against its plate. */
const markSegs = (c, r, sharp) => sharp
  ? polyContour([[c[0] - r, c[1] - r], [c[0] + r, c[1] - r], [c[0] + r, c[1] + r], [c[0] - r, c[1] + r]], [0.5, 0.5, 0.5, 0.5]).segs
  : circleSegs(c, r);


/**
 * Absolute M/L/C only, with `H` and `V` expanded against the running point.
 * Two things need it: `vectorPaths` in Figma rejects H and V outright, and the
 * cubic offsetter's parser reads neither — fed one it returns NaN rather than
 * failing, which is how a plate came out non-finite rather than wrong.
 */
function expandHV(d) {
  const toks = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  let i = 0, cmd = '', cur = [0, 0], start = [0, 0], out = '';
  const num = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/^[A-Za-z]$/.test(toks[i])) cmd = toks[i++];
    const C = cmd.toUpperCase(), rel = cmd !== C;
    const ax = (v) => (rel ? v + cur[0] : v), ay = (v) => (rel ? v + cur[1] : v);
    if (C === 'M') { cur = [ax(num()), ay(num())]; start = cur; out += `M${pt(cur)}`; cmd = rel ? 'l' : 'L'; }
    else if (C === 'L') { cur = [ax(num()), ay(num())]; out += `L${pt(cur)}`; }
    else if (C === 'H') { cur = [ax(num()), cur[1]]; out += `L${pt(cur)}`; }
    else if (C === 'V') { cur = [cur[0], ay(num())]; out += `L${pt(cur)}`; }
    else if (C === 'C') { const a = [ax(num()), ay(num())], b = [ax(num()), ay(num())], e = [ax(num()), ay(num())]; out += `C${pt(a)} ${pt(b)} ${pt(e)}`; cur = e; }
    else if (C === 'Z') { out += 'Z'; cur = start; }
    else i++;
  }
  return out;
}

const SETS = {};

/* -------------------------------------------------------------- coffee */

/**
 * ZAFAR'S DRAWING, 11 Sep 2026, carried at HIS width. The cup is 12 wide on
 * r=1 top corners and r=3 bottom ones, the handle is a half-ring of r=3 hung
 * off the right wall on 1-unit stubs, and the steam is two of his wisps: two
 * tangent arcs of r=2.5 each sweeping acos(0.6), so each runs 2 across while
 * rising 4 on the 3-4-5 triangle.
 *
 * **The size is bought in HEIGHT, not width.** His mug measures 18 x 20, which
 * reads as nothing: w/h is 0.9000 against the vertical band's 0.8929, so it
 * misses by seven thousandths and falls through the classifier onto the bare
 * optical floor, which is `power`'s trap. Widening the cup to reach 20 x 20 was
 * tried and rejected on sight — "it looks like a pod with that wide" — and the
 * handle is why it cannot be narrow AND wide: a ring of radius r at cx paints
 * from cx+r-1 to cx+r+1, so holding the house 2 to the cup's ink fixes
 * cx + r = wall + 4 and the icon's right ink edge is always `wall + 5`. So the
 * cup keeps its 12 and the drawing grows to 18 x 22, the house vertical size,
 * by dropping the cup's floor one unit and lifting the steam one.
 *
 * The steam is centred on the FRAME rather than on the cup: the handle carries
 * the drawing's mass to the right, and centred on the cup's own axis the wisps
 * read as pushed left, which is what he marked. The handle's two ends land on
 * the cup's wall, a T-junction, so sharp does not extend them; only the four
 * wisp ends are free.
 */
SETS.coffee = () => {
  const out = {};
  const L = 4, W = 16, TOP = 11, BOT = 22, HY = 16;       // his cup, one unit deeper
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const cup = polyContour([[L, TOP], [W, TOP], [W, BOT], [L, BOT]], sharp ? [0, 0, 0, 0] : [1, 1, 3, 3]);
    const plate = plateOf(cup.segs);
    const handle = new Path().M([W, HY - 3]).L([W + 1, HY - 3]).A([W + 1, HY], -90, 90, 1).L([W, HY + 3]).toString();
    const open = handle + steam([9.5, 14.5], sharp, undefined, 6);
    out[`stroke.${key}`] = [S(cup.toString() + open)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(cup.toString() + open)];
    out[`fill.${key}`] = [F_(contourPath(plate)), S(open)];
  }
  return out;
};

/* ---------------------------------------------------------------- soup */

/**
 * ZAFAR'S DRAWING, 11 Sep 2026. The bowl is the segment of a circle: rim chord
 * from (2,12) to (22,12) and the belly through (12,20), which is
 * R = (10^2 + 8^2) / (2 x 8) = 10.25 about (12,9.75) — his own curve measures
 * 0.0011 from that arc, so the arc is what is emitted and the plate offsets
 * exactly. Three wisps on a 6 pitch. Ink 1..23 by 3..21, the horizontal size.
 *
 * **His fix for the "floating pot" is the base line, and where it sits is the
 * whole point.** My first cut hung a rule at y=22, two units under the bowl's
 * lowest ink, and a bowl with daylight beneath it hovers. His runs at y=20,
 * which is the belly's own nadir, so the bowl RESTS on it and the line reads as
 * the table: it is a composite at the point of contact and stands proud either
 * side, where the belly has already curved away. A base under a bowl either
 * touches it or does not belong.
 *
 * The two rim corners are true vertices rather than fillets, both the same, so
 * the round join does the rounding and the rim lands exactly on 1 and 23;
 * `tag`'s point and `package`'s corners are the precedent.
 */
SETS.soup = () => {
  const out = {};
  const c = [12, 9.75], R = 10.25, FOOT = 20;
  const ang = (q) => (Math.atan2(q[1] - c[1], q[0] - c[0]) * 180) / Math.PI;
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bowl = new Path().M([2, 12]).L([22, 12]).A(c, ang([22, 12]), ang([2, 12]), 1).Z();
    const plate = plateOf(bowl.segs);
    const table = run([[5, FOOT], [19, FOOT]], sharp);
    const open = table + steam([6, 12, 18], sharp, undefined, 8);
    out[`stroke.${key}`] = [S(bowl.toString() + open)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(bowl.toString() + open)];
    out[`fill.${key}`] = [F_(contourPath(plate)), S(open)];
  }
  return out;
};

/* ---------------------------------------------------------------- cake */

/**
 * ZAFAR'S DRAWING, 11 Sep 2026. It needed no fitting: ink 1..23 by 3..21, the
 * horizontal size, padding 1/3/1/3, body corners on r=1, and the flames on the
 * dot ladder's 2-unit mark. Only the derived styles are ours.
 *
 * His icing is a DRIP: three lobes hanging from y=14 to y=16 between four
 * anchors, with a short stem rising at each interior anchor to say where one
 * drip ends and the next begins. He drew it as four overlapping subpaths; it
 * is emitted here as one continuous run wall to wall plus the two stems, which
 * paints identically and gives the fill a boundary it can follow.
 *
 * **The fill takes the `truck` pattern rather than a knockout**, and the drip
 * is why. Opening the sponge below it would need the drip offset a unit along
 * its own normal, and an offset of a free cubic is not a cubic; the run also
 * meets itself at each anchor, where the lower offsets cross. So the icing is
 * filled as a closed region whose every edge lies UNDER ink — the body's own
 * centre lines and the drip's centre line — and the whole stroke drawing is
 * kept over it. `fill/gift` and `fill/truck` are the precedent, and the 0.00
 * they report is the same tangency, not crowding.
 */
const CAKE_DRIP =
  'M5 14V14.6256C5 15.3847 6.04468 16 7.33333 16C7.96044 16 8.56113 15.8513 8.99999 15.5875' +
  'C9.17555 15.482 9.41579 15.4225 9.66667 15.4225C9.91755 15.4225 10.1578 15.482 10.3333 15.5875' +
  'C10.7722 15.8513 11.3729 16 12 16C12.6271 16 13.2278 15.8513 13.6667 15.5875' +
  'C13.8422 15.482 14.0825 15.4225 14.3333 15.4225C14.5842 15.4225 14.8245 15.482 15 15.5875' +
  'C15.4389 15.8513 16.0396 16 16.6667 16C17.2938 16 17.8945 15.8513 18.3333 15.5875' +
  'C18.5089 15.482 18.7491 15.4225 19 15.4225V14';
/** His drip, as the cubics the icing region closes along, right to left. */
const CAKE_DRIP_SEGS = CAKE_DRIP;

SETS.cake = () => {
  const out = {};
  const L = 5, W = 19, TOP = 11, FOOT = 20, HANG = 14;
  const STEMS = [9.66667, 14.3333];
  const CANDLES = [9, 15];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const body = polyContour([[L, TOP], [W, TOP], [W, FOOT], [L, FOOT]], [r, r, r, r]);
    const plate = plateOf(body.segs);
    // each drip stem rises from the run, so its foot is a T-junction and only
    // its head is free; the candles and the plate are free at their far ends
    const stems = STEMS.map((x) => run([[x, 15.4225], [x, HANG]], sharp, [false, true])).join('');
    const candles = CANDLES.map((x) => run([[x, TOP], [x, 8]], sharp, [false, true])).join('');
    const flames = CANDLES.map((x) => markGlyph([x, 4], 1, sharp)).join('');
    const table = run([[2, FOOT], [22, FOOT]], sharp);
    const d = body.toString() + CAKE_DRIP + stems + candles + table;
    // the icing, closed along ink: the drip, then the body's own centre lines
    const icing = new Path().M([L, HANG]);
    icing.d += CAKE_DRIP.slice(CAKE_DRIP.indexOf('V'));
    icing.cur = [W, HANG];
    icing.corner([W, TOP], [L, TOP], r).corner([L, TOP], [L, HANG], r).L([L, HANG]);
    out[`stroke.${key}`] = [S(d), F_(flames)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(flames)];
    out[`fill.${key}`] = [F_(icing.toString() + 'Z' + flames), S(d)];
  }
  return out;
};

/* ---------------------------------------------------------- cake-slice */

/**
 * `cake-slice` was drawn on 11 Sep 2026 and dropped on Zafar's word the same
 * day. What it recorded, should it ever come back: a bare wedge reads as a
 * pennant whatever line is drawn in it, so it needed the cake's own icing band
 * AND a cherry to read as cake at all, and the cherry had to TOUCH the icing,
 * since 2 units of daylight under it reads as floating. Its front vertex was
 * solved rather than placed, because an r=1 fillet at 61 degrees pulls its
 * painted extreme a full unit inside the corner it replaced.
 */

/* -------------------------------------------------------------- bottle */

/**
 * ZAFAR'S DRAWING, 11 Sep 2026. Ink 6..18 by 1..23, so 12 x 22, the house
 * vertical size with the short axis free; padding 6/1/6/1; every pair of
 * elements touching, so nothing in it can crowd. It needed no fitting.
 *
 * His cap is a BAR rather than a block — a pill 7 wide and 1 tall on r=0.5
 * ends, which paints 3 thick — and that is what lets the neck be 5 wide at the
 * top. My own cut had reasoned an overhanging cap needed a neck too narrow to
 * keep its interior; a bar sidesteps it, because a bar has no interior to lose.
 * The neck then flares on his own S into walls at 7 and 17 and the base is a
 * curve rather than a corner.
 *
 * **The plate mutes the BODY only and the cap stays a full-strength stroke**,
 * `gift`'s pattern, where the box is muted and the lid and bow are not. That is
 * also what keeps the offset honest: closed along the neck's top the body has
 * two convex 90-degree corners and curves everywhere else, which offsets
 * exactly, where the union with the overhanging cap would put a reflex corner
 * at each side of the neck and `offsetPath` runs a straight chord across a
 * reflex rather than trimming it to the crossing.
 *
 * The fill takes the `truck` pattern like the cake: the milk is a region closed
 * along ink — his wave, then his own walls and base — with the whole stroke
 * drawing kept over it.
 */
const BOTTLE_BODY =
  'M9.5 3C9.5 4 9.76903 5.30796 8.5 7C7 9 7 11 7 12.5V19C7 19.7993 7.55199 21.4572 9.71485 21.9443' +
  'C9.90293 21.9867 10.0969 22 10.2897 22H13.7103C13.9031 22 14.0971 21.9867 14.2851 21.9443' +
  'C16.448 21.4572 17 19.7993 17 19V12.5C17 11 17 9 15.5 7C14.231 5.30796 14.5 4 14.5 3';
const BOTTLE_CAP =
  'M9.5 3H9C8.72386 3 8.5 2.77614 8.5 2.5C8.5 2.22386 8.72386 2 9 2H15C15.2761 2 15.5 2.22386 15.5 2.5' +
  'C15.5 2.77614 15.2761 3 15 3H14.5';
const BOTTLE_CAP_SHARP = 'M9.5 3H8.5V2H15.5V3H14.5';
const BOTTLE_NECK_TOP = 'M9.5 3H14.5';
const BOTTLE_MILK =
  'M7 14.2764C7.48139 14.2764 7.94988 14.4033 8.33498 14.6382C8.72008 14.8731 9.18857 15 9.66997 15' +
  'C10.1514 15 10.6199 14.8731 11.0049 14.6382C11.39 14.4033 11.8585 14.2764 12.3399 14.2764' +
  'C12.8213 14.2764 13.2898 14.4033 13.6749 14.6382C14.06 14.8731 14.5285 15 15.0099 15' +
  'C15.8526 15 16.6231 14.6129 17 14';
/** His milk line run backwards, so the region below it can close along it. */
const BOTTLE_MILK_BACK =
  'M17 14C16.6231 14.6129 15.8526 15 15.0099 15C14.5285 15 14.06 14.8731 13.6749 14.6382' +
  'C13.2898 14.4033 12.8213 14.2764 12.3399 14.2764C11.8585 14.2764 11.39 14.4033 11.0049 14.6382' +
  'C10.6199 14.8731 10.1514 15 9.66997 15C9.18857 15 8.72008 14.8731 8.33498 14.6382' +
  'C7.94988 14.4033 7.48139 14.2764 7 14.2764';
/** His body from the left wall at the milk line, round the base, up to the right. */
const BOTTLE_BELOW =
  'M7 14.2764V19C7 19.7993 7.55199 21.4572 9.71485 21.9443C9.90293 21.9867 10.0969 22 10.2897 22' +
  'H13.7103C13.9031 22 14.0971 21.9867 14.2851 21.9443C16.448 21.4572 17 19.7993 17 19V14';

SETS.bottle = () => {
  const out = {};
  const closed = expandHV(BOTTLE_BODY + 'Z');
  const plate = offsetPath(closed, 1);
  const check = verifyCubic(closed, plate, 1);
  if (!check.ok) throw new Error(`bottle plate off by ${check.worst.toFixed(4)}`);
  const milk = expandHV(BOTTLE_BELOW + BOTTLE_MILK_BACK.slice(BOTTLE_MILK_BACK.indexOf('C')) + 'Z');
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const cap = sharp ? BOTTLE_CAP_SHARP : BOTTLE_CAP;
    // the body is emitted CLOSED: its `Z` runs exactly where the neck's top
    // chord did, so the picture is unchanged, and the region is then a closed
    // subpath rather than one a second stroke closes — which is what COVERAGE
    // measures, and `CLOSED_BY_STROKE` is the alternative nobody should need
    // when the shape can simply close itself.
    const d = expandHV(BOTTLE_BODY + 'Z') + expandHV(cap) + BOTTLE_MILK;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(milk), S(d)];
  }
  return out;
};

/* ----------------------------------------------------------------- key */

/**
 * A key lying flat: the bow a ring of r=4 about (6,12), the shaft on the
 * centre line from the ring to x=22, and two teeth of 4 at x=17 and 21
 * hanging 2 apart. Ink 1..23 by 7..17, the horizontal size. The bow fills to
 * a disc, since a ring's counter is not detail (the qr-code ruling); the
 * shaft and teeth stay stroked over it.
 */
SETS.key = () => {
  const out = {};
  const C = [6, 12], R = 4;
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const bit = run([[10, 12], [22, 12]], sharp, [false, true]) +
      run([[17, 12], [17, 16]], sharp, [false, true]) + run([[21, 12], [21, 16]], sharp, [false, true]);
    const ring = circlePath(C, R);
    out[`stroke.${key}`] = [S(ring + bit)];
    out[`duotone.${key}`] = [P(circlePath(C, R + 1)), S(ring + bit)];
    out[`fill.${key}`] = [F_(circlePath(C, R + 1)), S(bit)];
  }
  return out;
};

/* ------------------------------------------------ key-square, key-round */

/**
 * A key on the anti-diagonal, on HIS drawing of 11 Sep 2026.
 *
 * Two earlier pairs are in the history and both were wrong. The first stood the
 * FLAT key's parts up on the diagonal, a bow and two teeth hanging off a centre
 * line, and read as a stick with two prongs. The second drew the whole key as
 * one silhouette, which was the right idea and still a small, timid key: a bow
 * of 4 on a shank of 4, filed down until the box fitted.
 *
 * His drawing settles three things none of the measurements could:
 *
 *   THE BOW IS BIG. Radius 6 about (16, 8), painted 14 across against a shank
 *   painted 7. That is what carries the icon at 16px, and it is what makes the
 *   difference between a key and a stick with a ring on it.
 *
 *   THE BIT IS CUT SQUARE TO THE FRAME, not to the shank. Every notch is an H
 *   and a V of 2.5, so the teeth land on pixel edges at any size while the
 *   shank runs at 45 degrees between them. Drawn square to the SHANK they land
 *   nowhere and mush at 16.
 *
 *   THE KEY STANDS ON A FOOT. The tip is not a face cut across the shank: the
 *   shank ends in a vertical edge and a horizontal one, so the drawing sits on
 *   the frame's own axes at both ends, and the 45 degrees is only the middle.
 *
 * The shank's flanks are the lines x + y = 20.5 and x + y = 27.5, one on each
 * side of the bow's own diagonal x + y = 24, and the bit's notches step out to
 * x + y = 30. Writing the flanks that way is what keeps every corner on the
 * grid: the inner corners are the half-integer points of 27.5 and the outer
 * ones of 30.
 *
 * The ink is 1..23 both ways, 22 x 22 on the nose, and the box is set by four
 * EDGES rather than by corners: the bow's own circle right and top, the foot's
 * vertical edge left and its horizontal edge bottom. That is why the sharp
 * treatment paints the same box without being shortened, which is what the
 * previous pair needed: a 90-degree corner's round join reaches exactly the
 * vertex, so squaring it changes nothing.
 *
 * What was fitted, against his file:
 *
 *   - the flanks were 19.9 and 26.55 and the shank sat 0.5 off the bow's
 *     diagonal; they are now 20.5 and 27.5, symmetric about it
 *   - the bow was 0.034 out of round; it is a circle of 6 about (16, 8)
 *   - the tip's vertical edge leaned 0.59 and its horizontal one 0.28; both
 *     are true now, and the foot carries r=2 corners
 *   - the notches were 2.35 and 2.34 and ran to nothing at the bow; they are
 *     2.5, and the last one leaves 2.67 of flank for the notch fillet
 *   - his corners are hard, which paints round outside and square inside. They
 *     are filleted, and SMALL: r=0.5 on the bit and r=1 where the foot's edges
 *     meet the flanks. At r=1 the bit's 2.5 edges are four fifths arc and the
 *     cut reads as a wave rather than as teeth, which is the whole difference
 *     between a key and a worm. The toe itself takes r=2, the one corner in the
 *     drawing that is a real shoulder rather than a cut
 *   - the counter was a 1.41 dash 1.93 off centre, which left 1.17 to the
 *     bow's inner edge. It is the same dash on the axis, 2.83 long from
 *     (15, 9) to (17, 7) and centred on the bow, which stands 2.59 clear.
 *
 * `key-square` is the same key with a square bow, and the square is cut to the
 * FRAME rather than to the shank, like the bit: 12 by 12 about (16, 8), so it
 * paints the circle's own box exactly, 9..23 by 1..15. Its bottom-left corner
 * is the one the shank runs into and it is never drawn, being buried under the
 * shank, so the square carries three r=3 corners and the shank meets its flat
 * left and bottom sides at 135 degrees.
 */
const KEY2 = {
  C: [16, 8], R: 6, SQ: 6,
  FOOT: [[2, 18.5], [2, 22], [5.5, 22]],
  BIT: [[7, 20.5], [9.5, 20.5], [9.5, 18], [12, 18], [12, 15.5]],
  DASH: [[15, 9], [17, 7]],
  ON: [6, 14.5],                       // a point on the upper flank, between the foot and the bow
  R_FOOT: 1, R_TOE: 2, R_BIT: 0.5, R_SQ: 3, R_NOTCH: 1,
};
const AX = [Math.SQRT1_2, -Math.SQRT1_2];        // up the shank, toward the bow
const OUT = [Math.SQRT1_2, Math.SQRT1_2];        // across it, away from the axis

/**
 * The reflex fillet in the notch where a straight edge runs into a circle:
 * `filletLineArc` solves the shoulder, where the fillet sits inside the circle
 * at R - r, and this solves the notch, where it sits outside at R + r.
 */
function notchLineArc(P, u, nrm, C, R, r, near) {
  const q = sub(add(P, mul(nrm, r)), C);
  const b = 2 * dot(q, u), c = dot(q, q) - (R + r) * (R + r);
  const disc = b * b - 4 * c;
  if (disc < 0) throw new Error('no fillet in that notch');
  const s = [(-b - Math.sqrt(disc)) / 2, (-b + Math.sqrt(disc)) / 2]
    .reduce((a, v) => (Math.abs(v - near) < Math.abs(a - near) ? v : a));
  const T = add(P, mul(u, s));
  const F = add(T, mul(nrm, r));
  return { T, F, A: add(C, mul(sub(F, C), R / (R + r))) };
}
const angAt = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;

/** The silhouette: down the upper flank, round the foot, up the bit, round the bow. */
function key2Body(square, sharp) {
  const { C, R, SQ, FOOT, BIT, ON } = KEY2;
  const rf = sharp ? 0 : KEY2.R_FOOT, rt = sharp ? 0 : KEY2.R_TOE, rb = sharp ? 0 : KEY2.R_BIT;
  const rn = sharp ? 0 : KEY2.R_NOTCH, rs = sharp ? 0 : KEY2.R_SQ;
  const p = new Path().M(ON);
  p.corner(FOOT[0], FOOT[1], rf);
  p.corner(FOOT[1], FOOT[2], rt);
  p.corner(FOOT[2], BIT[0], rf);
  for (let i = 0; i < BIT.length - 1; i++) p.corner(BIT[i], BIT[i + 1], rb);
  const last = BIT[BIT.length - 1];
  if (square) {
    // the square's near sides, met at 135 degrees, and the far corner swallowed
    const loJ = [27.5 - (C[1] + SQ), C[1] + SQ];                 // on the bottom side, x + y = 27.5
    const upJ = [C[0] - SQ, 20.5 - (C[0] - SQ)];                 // on the left side, x + y = 20.5
    const box = [[C[0] + SQ, C[1] + SQ], [C[0] + SQ, C[1] - SQ], [C[0] - SQ, C[1] - SQ]];
    p.corner(last, loJ, rb);
    p.corner(loJ, box[0], rn);
    p.corner(box[0], box[1], rs);
    p.corner(box[1], box[2], rs);
    p.corner(box[2], upJ, rs);
    p.corner(upJ, ON, rn);
  } else {
    const lower = notchLineArc(last, AX, OUT, C, R, rn, 2.5);
    const upper = notchLineArc(ON, AX, mul(OUT, -1), C, R, rn, 8);
    p.corner(last, lower.T, rb);
    p.L(lower.T);
    if (rn) p.A(lower.F, angAt(lower.F, lower.T), angAt(lower.F, lower.A), 0);
    p.A(C, angAt(C, lower.A), angAt(C, upper.A), -1);
    if (rn) p.A(upper.F, angAt(upper.F, upper.A), angAt(upper.F, upper.T), 0);
    p.L(upper.T);
  }
  return p.Z();
}

/**
 * The counter's own band, for the fill to knock out: a stadium where the stroke
 * has round caps and the flat rectangle the butt caps paint where it is sharp.
 * `palette`'s beads inverted the same way, and it is the reason a fill reads as
 * a key rather than as a lollipop.
 */
function dashSlot(sharp) {
  const [a, b] = KEY2.DASH;
  if (!sharp) return stadium(a, b);
  const u = unit(sub(b, a)), nrm = [u[1], -u[0]];
  const A = add(a, mul(u, -sharpEndIn(a, mul(u, -1)))), B = add(b, mul(u, sharpEndIn(b, u)));
  return polyContour([add(A, nrm), add(B, nrm), sub(B, nrm), sub(A, nrm)], [0, 0, 0, 0]);
}

const key2Set = (square) => () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = key2Body(square, sharp);
    const d = String(body);
    const dash = run(KEY2.DASH, sharp);
    const plate = plateOf(body.segs);
    out[`stroke.${key}`] = [S(d + dash)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d + dash)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, dashSlot(sharp).segs))];
  }
  return out;
};
SETS['key-square'] = key2Set(true);
SETS['key-round'] = key2Set(false);

/* --------------------------------------------------------------- coins */

/**
 * Two stacks of coins, on his reference of 11 Sep 2026. The drawing it
 * replaces was two flat discs seen face on, a front coin with a rim ring and a
 * smaller one behind; this is the money seen from the side, stacked, which is
 * what the word means to anyone typing it into a search box.
 *
 * THE CYLINDER IS ALREADY IN THE SET and this borrows it whole: `database`
 * draws one as an ellipse of rx 8 by ry 2, vertical walls, and a division that
 * is the FRONT half of the same ellipse. Four to one is the house's read of a
 * cylinder and nothing here re-derives it: rx 6 by ry 1.5 is that ratio at the
 * size two stacks can share.
 *
 *   front   centre 16, top ellipse at y=10, bottom at 20.5, divisions at 13.5
 *           and 17 — three coins on a 3.5 pitch
 *   back    centre 8, top ellipse at y=3.5, division at 7, bottom at 10.5 —
 *           two coins on the same pitch, standing higher and further back, and
 *           CUT at x=6 where the front stack takes over
 *
 * The cut is the composition: a round cap paints a unit past its end, so an
 * end at x=6 puts its ink at 7 and the front's leftmost ink is 9. Two units,
 * the house gap, the same argument `messages` makes. The back stack carries
 * TWO coins and not three for the same reason a comb is not a cylinder: each
 * division that survives the cut is a 4-unit prong off the left wall, and at
 * three of them the drawing reads as a fork. Two, with the bottom curve under
 * them, reads as a stack standing behind. y=10 for the front's top
 * is the other end of it: at 8.5 the two top ellipses close to 0.70 of each
 * other, and 10 is where they stand 2.18 apart, which costs the front stack
 * one coin of height and buys the pair its daylight.
 *
 * Ink 1..23 both ways. The back stack's left wall sets the left edge, the
 * front's right wall the right, the back's top ellipse the top and the front's
 * bottom the bottom: four different elements, one on each side, which is what
 * a composition of two objects should do rather than one of them carrying it.
 *
 * Sharp is the same drawing, as `database`'s sharp is: a cylinder has no
 * corner to square. Only the two cut ends change, to the butt cap and its
 * unit of extension.
 *
 * The fill is the front stack solid with a band knocked out under the top face
 * and at each division, spanning the walls' inner edges so the walls stay solid
 * either side. Three bands, and the top face itself stays SOLID, which is where
 * it parts from `database`: a database's lid is a rim you look into, and the
 * top of a coin stack is a coin seen face on. The back stack stays a STROKE
 * over it, which is what `copy` and `layers` do with the element behind — a
 * fill solidifies the object in front, not the whole picture.
 */
const CYL = { rx: 6, ry: 1.5 };
const ePt = (c, rx, ry, a) => [c[0] + rx * Math.cos((a * Math.PI) / 180), c[1] + ry * Math.sin((a * Math.PI) / 180)];
const eTan = (rx, ry, a) => [-rx * Math.sin((a * Math.PI) / 180), ry * Math.cos((a * Math.PI) / 180)];

/** An elliptical arc as cubics, split at 90 degrees, in the given direction. */
function earc(c, rx, ry, a0, a1) {
  const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / 90));
  let d = '';
  for (let i = 0; i < n; i++) {
    const b0 = a0 + ((a1 - a0) * i) / n, b1 = a0 + ((a1 - a0) * (i + 1)) / n;
    const k = (4 / 3) * Math.tan(((b1 - b0) * Math.PI) / 720);
    const p0 = ePt(c, rx, ry, b0), p1 = ePt(c, rx, ry, b1);
    const t0 = eTan(rx, ry, b0), t1 = eTan(rx, ry, b1);
    d += `C${pt(add(p0, mul(t0, k)))} ${pt(sub(p1, mul(t1, k)))} ${pt(p1)}`;
  }
  return d;
}
const ellipsePath = (c, rx, ry, cw = true) =>
  `M${pt(ePt(c, rx, ry, 0))}` + earc(c, rx, ry, 0, cw ? 360 : -360) + 'Z';

/** Flatten an M/L/C path far enough to read its winding. */
function samplePath(d, per = 12) {
  const pts = [];
  let cur = null;
  for (const t of d.match(/[MLCZ][^MLCZ]*/g) ?? []) {
    const n = (t.slice(1).match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number);
    if (t[0] === 'M' || t[0] === 'L') { cur = [n[0], n[1]]; pts.push(cur); }
    else if (t[0] === 'C') {
      const p0 = cur, c1 = [n[0], n[1]], c2 = [n[2], n[3]], p1 = [n[4], n[5]];
      for (let i = 1; i <= per; i++) {
        const u = i / per, v = 1 - u;
        pts.push([v * v * v * p0[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u * u * u * p1[0],
          v * v * v * p0[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u * u * u * p1[1]]);
      }
      cur = p1;
    }
  }
  return pts;
}
/** `build(cw)` wound against `plate`, so it cuts under the non-zero rule too. */
const cutOut = (plate, build) => {
  const want = -Math.sign(areaOf(samplePath(plate)));
  const a = build(true);
  return Math.sign(areaOf(samplePath(a))) === want ? a : build(false);
};

/** The distance from a point to a sampled polygon. */
const distToPoly = (p, poly) => {
  let m = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
    const t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
    m = Math.min(m, Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy));
  }
  return m;
};

SETS.coins = () => {
  const out = {};
  const { rx, ry } = CYL;
  const B = [8, 3.5], F = [16, 10], BB = 10.5, FB = 20.5;
  const BDIV = [7], FDIV = [13.5, 17];
  const aIn = (Math.acos((rx - 1) / rx) * 180) / Math.PI;           // 33.56, the wall's inner edge

  // the front stack: a closed silhouette for the plate, and the open runs the stroke draws
  const sil = `M${pt(ePt(F, rx, ry, 180))}` + earc(F, rx, ry, 180, 360)
    + `L${pt([F[0] + rx, FB])}` + earc([F[0], FB], rx, ry, 0, 180) + 'Z';
  const frontTop = ellipsePath(F, rx, ry);
  const frontBody = `M${pt([F[0] - rx, F[1]])}L${pt([F[0] - rx, FB])}`
    + earc([F[0], FB], rx, ry, 180, 0) + `L${pt([F[0] + rx, F[1]])}`;
  const halfEll = (c) => `M${pt([c[0] - rx, c[1]])}` + earc(c, rx, ry, 180, 0);
  const front = frontTop + frontBody + FDIV.map((y) => halfEll([F[0], y])).join('');

  const plate = offsetPath(sil, 1);
  const check = verifyCubic(sil, plate, 1);
  if (!check.ok) throw new Error(`coins plate off by ${check.worst.toFixed(4)}`);

  // Where each of the back stack's runs goes behind: the last angle whose ink
  // still stands the house 2 off the front stack's, which is 3 from its plate.
  // Read off the plate rather than set as one vertical line, so the runs the
  // front does not reach keep their length: the top division clears it and
  // runs nearly the full width, the bottom one is cut to a stub.
  const poly = samplePath(plate, 24);
  const cutAngle = (c) => {
    for (let a = 180; a >= 0; a -= 0.25) if (distToPoly(ePt(c, rx, ry, a), poly) < 3) return Math.min(180, a + 0.25);
    return 0;
  };

  // A band knocked out under the top face and at each division, between the
  // walls' inner edges so the walls stay solid either side. The top face is
  // NOT opened the way `database`'s is: the top of a coin stack is a coin seen
  // face on, and it is solid. His call, 11 Sep 2026, and the three bands are
  // what make the fill read as coins rather than as a tin.
  //
  // The band is 1.5, not the stroke's own 2, which is the second half of his
  // call. At 2 the white is WIDER than the 1.5 of coin left between two of
  // them and the stack reads as rings on a pole; at 1.5 the fill is the exact
  // inverse of the stroke's interior, ink and white swapped, and the coins are
  // the thing you see. It is the one place in the batch where a knockout is
  // not the same width as the ink it replaces, and a 3.5 pitch is why.
  const HALF = 0.75;
  const bandAt = (y) => (cw) => {
    const [lo, hi] = cw ? [y - HALF, y + HALF] : [y + HALF, y - HALF];
    return `M${pt(ePt([F[0], lo], rx, ry, 180 - aIn))}` + earc([F[0], lo], rx, ry, 180 - aIn, aIn)
      + `L${pt(ePt([F[0], hi], rx, ry, aIn))}` + earc([F[0], hi], rx, ry, aIn, 180 - aIn) + 'Z';
  };

  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // only the back stack's cut ends are free; every other end dies on an ellipse
    const runTo = (c, a) => {
      const e = ePt(c, rx, ry, a), t = unit(eTan(rx, ry, a));
      return earc(c, rx, ry, 180, a) + (sharp ? `L${pt(add(e, mul(t, -sharpEndIn(e, mul(t, -1)))))}` : '');
    };
    const backTop = ellipsePath(B, rx, ry);
    const backWall = `M${pt([B[0] - rx, B[1]])}L${pt([B[0] - rx, BB])}` + runTo([B[0], BB], cutAngle([B[0], BB]));
    const backDivs = BDIV.map((y) => `M${pt([B[0] - rx, y])}` + runTo([B[0], y], cutAngle([B[0], y]))).join('');
    const back = backTop + backWall + backDivs;
    const d = front + back;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate + [F[1], ...FDIV].map((y) => cutOut(plate, bandAt(y))).join('')), S(back)];
  }
  return out;
};

/* ---------------------------------------------------------------- film */

/**
 * A strip, on HIS drawing of 11 Sep 2026. Mine ran two perforation rules at
 * x=8 and 16 with three rungs a side and no bar across, so the picture was one
 * tall window and the strip read as a door.
 *
 * His puts a rule across the middle at y=12, wall to wall, and that is the
 * whole fix: a film strip is FRAMES, and one rule across turns a single window
 * into two of them. The sprockets then fall where the frames say they should,
 * at 7.5 and 16.5, each the midpoint of its own frame, and there are two a
 * side rather than three.
 *
 * HIS RULES SIT AT 7 AND 17 AND OURS STAY AT 8 AND 16, and that is not a
 * preference. His drawing lands on the reference set's own film coordinate for
 * coordinate — body, bar, sprockets and rules all — and scores 86 against it
 * where the drawing it replaces scored 41. The bar and the sprocket heights
 * are forced once you ask for two equal frames, so they are not the tell; the
 * rules are the one free number in the drawing, and moving them back to ours
 * takes it to 60 with the multiply overlay showing red beside blue down both
 * rules. It is also the better strip: a 5-wide margin gives the perforations
 * room to read as perforations rather than as slots.
 *
 * Everything in it is a composite, so nothing here is spaced: the rules die on
 * the body, the sprockets on the body and a rule, and the bar crosses both
 * rules. What the gaps have to clear is the WHITE, and his numbers do it with
 * nothing to spare: the margin is 4 wide between the wall and the rule, which
 * is 2 of white once the ink is taken off both sides, and the sprockets cut it
 * into four cells 2.5 tall. The house minimum, twice, which is what lets a
 * 20-wide strip carry four frames and eight sprocket cells at all.
 *
 * The fill opens two frames between the rules and punches a sprocket HOLE on
 * each of the three lines the margin carries, 7.5, 12 and 16.5, each 3 by 2 on
 * r=0.5 with 2.5 of solid either side. It is not the stroke inverted and it is
 * not the stroke's own white either: a filled strip's margin is HOLES, which
 * is what the perforations are, and his call of 11 Sep 2026. Inverting the
 * margin faithfully gives eight cells of two different heights and reads as a
 * ladder.
 */
SETS.film = () => {
  const out = {};
  const RAIL = [8, 16], PERF = [7.5, 16.5], MID = 12;
  const T = [false, false];                       // every end dies on the body or a rule
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = box([3, 3, 21, 21], sharp ? 0 : 3);
    const plate = plateOf(body.segs);
    const rules = RAIL.map((x) => run([[x, 3], [x, 21]], sharp, T)).join('')
      + run([[3, MID], [21, MID]], sharp, T)
      + PERF.map((y) => run([[3, y], [RAIL[0], y]], sharp, T) + run([[RAIL[1], y], [21, y]], sharp, T)).join('');
    const rh = sharp ? 0 : 0.5;
    const cell = ([x0, y0, x1, y1], radii) => hole(plate, polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], radii).segs);
    const four = [rh, rh, rh, rh];
    // two frames between the rules, and a sprocket HOLE on each of the three
    // lines the margin carries, 3 by 2 with 2.5 of solid either side
    const cells = cell([9, 4, 15, 11], [0, 0, 0, 0]) + cell([9, 13, 15, 20], [0, 0, 0, 0])
      + [PERF[0], MID, PERF[1]].map((y) =>
        cell([4, y - 1, 7, y + 1], four) + cell([17, y - 1, 20, y + 1], four)).join('');
    const d = body.toString() + rules;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + cells)];
  }
  return out;
};

/* ---------------------------------------------------------- paintbrush */

/**
 * A brush standing up, on HIS drawing of 11 Sep 2026.
 *
 * The first of mine was diagonal with bristles that widened from a true POINT,
 * and a point is a nib: it read as a fountain pen. The second stood it up but
 * built it out of three parts bolted together, a block on a bar on a stick,
 * and his answer is that a brush is ONE piece: the block's walls flare into the
 * ferrule, the ferrule tapers into the handle, and the handle swells to a
 * round end. One silhouette, three widths.
 *
 *   block    6..18 by 2..12 on r=2 top corners, two bristle cuts hanging from
 *            its top edge at x=10 and x=14, 4 and 6 long
 *   ferrule  out to 4 and 20 at y=12, held to y=13, then a r=3 turn in to the
 *            handle's width at y=16
 *   handle   10..14 down to a half-round end of r=2 landing on y=22
 *
 * Ink 3..21 by 1..23, the vertical band exactly.
 *
 * HIS FLARE OF 1 STANDS. It was widened to 2 once, on the argument that a
 * 1-unit step is 0.67 of a pixel at 16 and the ferrule disappears there, and
 * he turned it down on sight: "paintbrush is not mine". The ink is 4..20 by
 * 1..23, 16 by 22, and the short axis is the drawing's own business.
 *
 * The one thing not his: the shoulder's two corners are r=0.5 each rather than
 * his r=1 point over a hard reflex notch. A 1-unit step gives the pair exactly
 * 1 to spend and 0.5 each is what lets both be filleted, which is the house
 * rule; the difference is half a unit of arc and nothing reads it.
 *
 * The rest is his to the number: the r=3 taper, the r=1.5 notch where the
 * ferrule meets the handle, and the handle's own width of 4, which leaves the
 * 2 of white the house asks for and not a unit more.
 *
 * The fill fills the BLOCK and leaves everything under its rule white, ferrule
 * and handle both, so the white runs on down the handle to its end. His call
 * of 11 Sep 2026, twice: a band under the block is not it. It is built from
 * the drawing's own inner contour, offset a unit in, clipped at the rule's
 * lower ink edge and closed along it, so the white is exactly the white the
 * stroke draws. The two bristle cuts invert on top of that.
 */
SETS.paintbrush = () => {
  const out = {};
  const CUT = [[10, 6], [14, 8]];
  const FX = 19;                     // the ferrule's wall, 1 proud of the block
  const HB = 14.5, HY = 19.5, HR = 2.5;   // the handle at its widest, and its half-round end
  const SLOPE = 0.2;                 // the handle's side, 1 in 5, so it swells toward the end
  const VX = HB - SLOPE * (HY - 16); // where that side crosses the ferrule's underside
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = (v) => (sharp ? 0 : v);
    const toe = HB + SLOPE * (22 - HY);        // where the sharp treatment's side reaches the floor
    const body = new Path().M([12, 2])
      .corner([18, 2], [18, 12], r(2))
      .corner([18, 12], [FX, 12], r(0.5))
      .corner([FX, 12], [FX, 16], r(0.5))
      .corner([FX, 16], [VX, 16], r(3))
      .corner([VX, 16], [HB, HY], r(1.5));
    if (sharp) body.L([toe, 22]).L([24 - toe, 22]).L([24 - HB, HY]);
    else body.L([HB, HY]).A([12, HY], 0, 180, 1);
    body.corner([24 - VX, 16], [24 - FX, 16], r(1.5))
      .corner([24 - FX, 16], [24 - FX, 12], r(3))
      .corner([24 - FX, 12], [6, 12], r(0.5))
      .corner([6, 12], [6, 2], r(0.5))
      .corner([6, 2], [12, 2], r(2))
      .Z();
    const plate = plateOf(body.segs);
    const rule = run([[6, 12], [18, 12]], sharp, [false, false]);
    const cuts = CUT.map(([x, y]) => run([[x, 2], [x, y]], sharp, [false, true])).join('');
    // A cut's slot starts at the top edge's INNER ink edge, not at the frame:
    // run it up to y=1 and the fill eats the block's top edge and the two cuts
    // open out of the drawing. Flat at the top, round at the bottom, which is
    // the cut's own ink from 3 down.
    const cutSlot = ([x, y]) => hole(plate, polyContour(
      [[x - 1, 3], [x + 1, 3], [x + 1, y + 1], [x - 1, y + 1]], [0, 0, r(1), r(1)],
    ).segs);
    const d = body.toString() + rule + cuts;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    // HIS fill: everything below the block's rule stays WHITE, ferrule and
    // handle both, so the white runs on down the handle to its end. Not a band
    // under the block: the drawing's own inner contour, clipped at the rule's
    // lower ink edge and closed along it.
    // The white below the rule is built rather than offset. `offsetContour`
    // only ever goes outward, reading the material's side off the drawing and
    // not off the winding, and an inward offset of this shape would cusp at
    // the flare's r=0.5 corner anyway. So the panel is the same edges moved a
    // unit in, with every radius a unit smaller where the corner is convex and
    // a unit larger where it is reflex, which is what an inset contour is.
    const u = unit(sub([HB, HY], [VX, 16])), nrm = [u[1], -u[0]];
    const side = add([HB, HY], mul(nrm, -1));           // the handle's side, a unit in
    const sideX = (y) => side[0] + (u[0] / u[1]) * (y - side[1]);
    const wx = sideX(15);
    // the inset side runs to the end's own centre line and the panel closes on
    // a half circle from there, 1.48 rather than 1.5 because the side leans
    const meet = [sideX(HY), HY];
    const panel = new Path().M([12, 13]).L([18, 13])
      .corner([18, 15], [wx, 15], r(3) && 2)
      .corner([wx, 15], meet, r(1.5) && 2.5)
      .L(meet);
    if (sharp) panel.L([sideX(21), 21]).L([24 - sideX(21), 21]).L([24 - meet[0], meet[1]]);
    else panel.A([12, HY], 0, 180, 1);
    panel.corner([24 - wx, 15], [24 - 18, 15], r(1.5) && 2.5)
      .corner([6, 15], [6, 13], r(3) && 2)
      .L([6, 13]).Z();
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, panel.segs) + CUT.map(cutSlot).join(''))];
  }
  return out;
};

/* -------------------------------------------------------- paintbrush-2 */

/**
 * `paintbrush-2`, the same brush mid-stroke with its bristles splayed, was
 * drawn on 11 Sep 2026 and DROPPED on his word the same day. It never went to
 * Figma. What it was: the brush laid on the anti-diagonal, half-width 7.5 at
 * the tip narrowing to 4.5 at the handle, a rule across the head and two cuts
 * from the tip, ink 1..23 both ways.
 *
 * Two things it established about drawing on the diagonal are worth keeping,
 * because the next diagonal drawing will meet both:
 *
 * - EACH TREATMENT NEEDS ITS OWN SCALE. A box is measured on the frame's axes,
 *   so an axis-aligned corner reaches the same whether it is filleted or
 *   squared, which is why `paintbrush` needs no correction. Rotate the drawing
 *   and every corner meets the box on its BISECTOR instead, where a true point
 *   reaches a full unit past the vertex and an r=1 fillet reaches 0.767; a
 *   square end adds 0.414 of its own. It came to 0.9975 rounded against 0.9223
 *   sharp, which is the same argument `key-round` settles with its own D.
 * - A SHARP FREE END'S EXTENSION IS NOT SCALED. The unit `sharpEndIn` adds to
 *   put a butt cap where the round one painted is a unit whatever the drawing
 *   is scaled to, so the sharp treatment is always the tighter of the two: the
 *   clearance between two elements comes out as (their gap) * scale - 2.
 */

/* -------------------------------------------------------- paint-roller */

/**
 * A roller and its frame, on HIS drawing of 11 Sep 2026.
 *
 * Mine ran the arm out of the roller's right end, down at x=21 and back LEFT
 * along y=13 into a grip under the roller's middle, so the frame wrapped the
 * drawing's inside and the grip hung where the roller already was. His turns
 * it inside out: the arm leaves the roller at the same place, goes right to
 * x=22, down the OUTSIDE at y=13, and back to a handle at 11..15, so the frame
 * encloses a corner of the frame instead of doubling back on the roller.
 *
 *   roller   2..18 by 2..9 on r=2, four units wider than mine
 *   arm      (18, 5.5) to (22, 5.5) to (22, 13) to (13, 13) to (13, 16), the
 *            three turns on r=2, both ends dying on a solid
 *   handle   11..15 by 16..22 on r=0.5, narrow and long where mine was wide
 *            and short, which is what a roller's handle is
 *
 * Ink 1..23 both ways, 22 x 22 where mine stood 20 x 22. Every clearance in it
 * is 2 exactly and none of them is spare: the arm's vertical stands 4 from the
 * roller's right wall and its horizontal 4 under the roller's base, which is
 * the house 2 once the ink is taken off both.
 *
 * Both boxes fill solid and the arm stays a stroke, its ends buried in them.
 */
SETS['paint-roller'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r2 = sharp ? 0 : 2, rh = sharp ? 0 : 0.5;
    const roller = box([2, 2, 18, 9], r2), handle = box([11, 16, 15, 22], rh);
    const plates = [roller, handle].map((c) => plateOf(c.segs));
    const arm = new Path().M([18, 5.5])
      .corner([22, 5.5], [22, 13], r2)
      .corner([22, 13], [13, 13], r2)
      .corner([13, 13], [13, 16], r2)
      .L([13, 16]).toString();
    const d = roller.toString() + handle.toString() + arm;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(arm)];
  }
  return out;
};

/* ------------------------------------------------------------- palette */

/**
 * A palette: the house circle of r=10 with a thumb notch bitten out of it at
 * 45 degrees, a concave arc of r=3 about a point 8.5 from the centre, and
 * FIVE beads of paint (filled r=1.5) on radius 5.5. The notch's lips take r=1
 * fillets, tangent to the rim from inside and to the notch from outside.
 * Ink 1..23. The fill knocks the beads out of the solid.
 *
 * Three beads at 150, 210 and 270 was the first cut and his of 11 Sep 2026 has
 * five, which is what a palette actually looks like: they run round the rim
 * rather than sitting in a line. His five measure 5.30 to 5.79 from the centre
 * and 56.4 to 58.7 degrees apart, so they are one arc drawn by hand; ours are
 * 5.5 and 57.5 exactly, at 110, 167.5, 225, 282.5 and 340. That spacing is not
 * chosen either, it is the most the ring will take: 57.5 degrees on radius 5.5
 * is a chord of 5.29, which leaves 2.29 between two beads, and the ring itself
 * is fixed by the rim at one end and the notch at the other, 2 clear of the
 * rim's inner ink and 2.43 of the notch's.
 *
 * THE UPPER LIP IS HIS TOO. It runs out to 3 o'clock instead of mirroring the
 * lower one, so the thumb hole opens on the rim's own edge rather than biting a
 * symmetric notch out of it, and the palette stops reading as a disc with a
 * chunk missing. He drew it as a cubic tangent to the notch at one end and to
 * the rim at the other; here it is the ARC those two tangencies fix, radius
 * 3.079 about (18.921, 12), which is the same curve solved rather than eyed.
 *
 * THE BEADS STAY ROUND IN SHARP, his call of 11 Sep 2026, and it is the other
 * half of the ruling that squares a dot: "circles must be squares in sharp"
 * covers the MARKS and beads of the ladder, the ones that stand for a state,
 * and these are paint. A blob of paint has no corner to square at any weight,
 * the way a coin and a key's bow have none. It also takes the three SPACING
 * warnings the squared beads earned off the sharp half: a square of side 3 on
 * r=0.5 reaches 0.414 further on its diagonal than the circle did, and with
 * five beads at 57.5 degrees that was 1.48 where the round ones stand 2.29.
 */
SETS.palette = () => {
  const out = {};
  const c = [12, 12], R = 10, d = 8.5, rn = 3;
  const n = onArc(c, d, 45);
  const beads = [110, 167.5, 225, 282.5, 340].map((a) => onArc(c, 5.5, a));
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    let body;
    // crossings of rim and notch, either side of the 45-degree line
    const X = [circleCross(c, R, n, rn, onArc(c, R, 20)), circleCross(c, R, n, rn, onArc(c, R, 70))];
    // HIS upper lip: one arc tangent to the notch and to the rim at 3 o'clock,
    // so the thumb hole opens on the rim's own edge rather than biting a
    // symmetric notch out of it. Its radius is not chosen, the two tangencies
    // fix it: centre on y=12 at 22 - RL, RL + rn from the notch's centre.
    const aL = 22 - n[0], bL = 12 - n[1];
    const RL = (aL * aL + bL * bL - rn * rn) / (2 * (rn + aL));
    const CL = [22 - RL, 12];
    const rimU = [22, 12];
    const notchU = add(n, mul(unit(sub(CL, n)), rn));
    const lip = (p) => p.A(CL, ang(CL, rimU), ang(CL, notchU), 1);
    if (sharp) {
      body = lip(new Path().M(X[1]).A(c, ang(c, X[1]), ang(c, rimU) + 360, 1))
        .A(n, ang(n, notchU), ang(n, X[1]), -1).Z();
    } else {
      const rf = 1;
      const F = circleCross(c, R - rf, n, rn + rf, X[1]);
      const onRim = add(c, mul(sub(F, c), R / (R - rf)));
      const onNotch = add(n, mul(sub(F, n), rn / (rn + rf)));
      body = lip(new Path().M(onRim).A(c, ang(c, onRim), ang(c, rimU) + 360, 1))
        .A(n, ang(n, notchU), ang(n, onNotch), -1)
        .A(F, ang(F, onNotch), ang(F, onRim), 1).Z();
    }
    const plate = plateOf(body.segs);
    const paint = beads.map((b) => markGlyph(b, 1.5, false)).join('');
    out[`stroke.${key}`] = [S(body.toString()), F_(paint)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(body.toString()), F_(paint)];
    out[`fill.${key}`] = [F_(contourPath(plate) + beads.map((b) => hole(plate, markSegs(b, 1.5, false))).join(''))];
  }
  return out;
};

/* --------------------------------------------------------------- easel */

/**
 * An easel on HIS drawing of 11 Sep 2026: a canvas standing on a RAIL, with
 * three legs under it.
 *
 * Mine was a canvas 6..18 on three legs straight off its own bottom corners,
 * and it read as a lamp or a robot, because an easel's canvas does not grow
 * legs: it RESTS on a tray, and the tray is the widest thing in the drawing.
 * His puts that rail in at y=16 running the full 2..22, sits a 4..20 canvas on
 * it, and hangs the legs off the rail instead of off the canvas.
 *
 *   canvas  4..20 by 3..16 with r=2 top corners; its bottom edge is the rail
 *   rail    y=16 from 2 to 22, the drawing's whole width
 *   legs    (8, 16) to (6.5, 21) and (16, 16) to (17.5, 21), and a short
 *           centre leg from (12, 16) to (12, 19)
 *
 * Ink 1..23 by 2..22, 22 x 20. His feet were at 6.571 and 17.429, a 10-in-7
 * slope from a hand drawing; 6.5 and 17.5 is 3-in-10 and symmetric.
 *
 * The centre leg is SHORT and that is the drawing: three legs of equal length
 * read as a stool, and a short one reads as the rear leg of a tripod seen from
 * the front. It stops at 19 so its cap stands 2.9 clear of the splayed legs.
 *
 * The canvas fills solid and the rail and legs stay stroked over it, which is
 * `copy`'s treatment of the element behind. Its bottom edge lies under the
 * rail, so the closed contour costs nothing to draw.
 */
SETS.easel = () => {
  const out = {};
  const BOX = [1, 1, 23, 23];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const canvas = polyContour([[4, 3], [20, 3], [20, 16], [4, 16]], [r, r, 0, 0]);
    const plate = plateOf(canvas.segs);
    const rail = run([[2, 16], [22, 16]], sharp, [true, true], BOX);
    const legs = run([[8, 16], [6.5, 21]], sharp, [false, true], BOX)
      + run([[16, 16], [17.5, 21]], sharp, [false, true], BOX)
      + run([[12, 16], [12, 19]], sharp, [false, true], BOX);
    const d = canvas.toString() + rail + legs;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate)), S(rail + legs)];
  }
  return out;
};

/* --------------------------------------------------------------- broom */

/**
 * A broom on HIS drawing of 11 Sep 2026, and it is a SWEPT head, not a box.
 *
 * Mine was a trapezoid on a stick: a flat sweep edge, straight flaring sides,
 * a collar rule across it. Every measurement was green and it read as a
 * dustpan, because a broom's head is not a shape with corners, it is a fan of
 * bristles that has been used: the sweep edge BOWS, the top edge dips, and the
 * whole head hangs off the stick at an angle rather than square to it.
 *
 * His head is four free curves and nothing in it is on the ladder, which is
 * the point. The pieces, with A the binding's left end and B its right:
 *
 *   bind     A (11.61, 13.54) to B (16.11, 16.25), the head's top
 *   top      A out to the head's left tip at (3, 15.35), dipping
 *   sweep    that tip round to (14.55, 20.54), the bow the floor puts in it
 *   right    back up to B
 *   collar   two curves from A and B meeting at (15.93, 11.16)
 *   stick    from there to (21, 2)
 *
 * Ink 2..22 by 1..23, 20 by 22, and his numbers land it exactly: the head's
 * tip sets the left edge, the sweep's belly the bottom, and the stick's round
 * cap the top and right. Nothing was moved.
 *
 * THE CURVES ARE HIS, VERBATIM, and the construction is what makes that
 * affordable. A drawing of free cubics cannot take a plate the usual way:
 * `offsetContour` wants lines and arcs, and v6's `offsetPath` does not trim a
 * reflex corner, which is what the notch at A and B is. So neither the plate
 * nor the fill offsets anything:
 *
 *   duotone  the plate is the head's and the collar's own CENTRE-LINE regions,
 *            not their outer contour. A plate ending on the centre line paints
 *            exactly the same as one offset a unit, because the stroke covers
 *            the difference, and it cannot leak by construction.
 *   fill     the HEAD's region solid with the whole stroke drawing over it,
 *            `truck`'s pattern, so the collar stays white and open. His call
 *            of 11 Sep 2026, and it is what a broom's binding looks like.
 *
 * The stick's sharp end takes the CUT RULE's own k, (1 - sin t)/cos t, and is
 * not clamped to the drawing's box. Clamped, the butt stops where its far
 * corner would cross x=22 and the drawing's top falls from 1 to 1.29, which is
 * what he saw. Uncut the top stays on 1 and the far corner stands 0.16 past 22
 * instead, which the rule allows at 0.414 but the EYE does not: the drawing
 * then sits 2 off the left wall and 1.84 off the right, and he read the
 * imbalance straight off the highlighter.
 *
 * So the sharp treatment is CENTRED on what it actually paints. A diagonal
 * free end cannot hold both edges of the box, but neither edge has to be held
 * exactly: what has to hold is the long axis, 22, which the head and the
 * stick's leading corner keep either way. The cut end's 0.16 is therefore
 * SPLIT, 0.08 to each side, and the drawing stands 1.92 clear on both walls.
 * The shift is solved rather than typed: each treatment is drawn once,
 * measured with its own cap, and re-emitted moved by whatever puts the middle
 * of its ink on 12 (which is nothing at all in the rounded treatment, his
 * drawing landing on 2..22 by itself).
 */
const BROOM = {
  A: [11.6106, 13.5362], B: [16.1118, 16.2453], E: [15.9271, 11.1603], F: [21, 2],
  TOP: 'C10.257 14.466 6.63986 16.1295 3 15.3456',
  SWEEP: 'C5.87685 18.8355 12.2148 24.7603 14.5521 20.5399',
  RIGHT: 'C15.1662 19.4704 16.3379 17.1141 16.1118 16.2453',
  COLLAR_L: 'C12.0558 12.2895 13.5424 10.069 15.9271 11.1603',
  COLLAR_R: 'C16.9171 15.0561 18.0077 12.3742 15.9271 11.1603',
  COLLAR_R_BACK: 'C18.0077 12.3742 16.9171 15.0561 16.1118 16.2453',
};
SETS.broom = () => {
  const out = {};
  /** every x in a run of absolute `C` pairs, the numbers alternating x, y */
  const shiftX = (s, dx) => {
    let i = 0;
    return s.replace(/-?\d+(?:\.\d+)?/g, (m) => (i++ % 2 ? m : num(Number(m) + dx)));
  };
  const draw = (sharp, dx) => {
    const [A, B, E, F] = [BROOM.A, BROOM.B, BROOM.E, BROOM.F].map(([x, y]) => [x + dx, y]);
    const c = (k) => shiftX(BROOM[k], dx);
    // the head is emitted CLOSED and its Z runs exactly where the binding line
    // did, so the picture is unchanged and the drawing has a closed contour to
    // justify its fill, which is what COVERAGE measures (`bottle`'s lesson)
    const head = `M${pt(A)}${c('TOP')}${c('SWEEP')}${c('RIGHT')}Z`;
    const collar = `M${pt(A)}${c('COLLAR_L')}${c('COLLAR_R_BACK')}Z`;
    const d = head
      + `M${pt(A)}${c('COLLAR_L')}`
      + `M${pt(B)}${c('COLLAR_R')}`
      + run([E, F], sharp, [false, true]);
    return { head, collar, d };
  };
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const probe = strokedBBox(draw(sharp, 0).d, 1, sharp ? 'butt' : 'round');
    const { head, collar, d } = draw(sharp, 12 - (probe[0] + probe[2]) / 2);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(head + collar), S(d)];
    out[`fill.${key}`] = [F_(head), S(d)];
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
    const ink = inkOf(variants['stroke.regular'], 'round');
    const sink = inkOf(variants['stroke.sharp'], 'butt');
    console.log(name.padEnd(14), 'ink', ink.map((v) => v.toFixed(3).padStart(7)).join(' '),
      ` ${(ink[2] - ink[0]).toFixed(1)} x ${(ink[3] - ink[1]).toFixed(1)}`,
      ' sharp', sink.map((v) => v.toFixed(3).padStart(7)).join(' '),
      ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS };
