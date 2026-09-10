/**
 * Emit the emoji batch into raw/ (or --out=DIR/raw).
 *   node tools/emoji/build.mjs [name ...] [--out=DIR]
 *
 * Seven faces on the `circle` container's own ring, and the two thumbs. Every
 * plate is an exact offset checked sample by sample, every knockout is wound
 * against its plate, and every sharp free end goes through `sharpEndIn`, so
 * the two treatments paint the same box.
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, polyContour, onArc, arcTo, add, sub, mul, len, unit } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { outlineRun } from '../v6/outline.mjs';
import { strokedBBox, outlines } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });
const deg = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
const rad = (a) => (a * Math.PI) / 180;

/* ------------------------------------------------------------- helpers */

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
const circleSegs = (c, r) => [0, 90, 180, 270].map((a) => ({ type: 'A', c, r, a0: a, a1: a + 90 }));
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}

/** A polyline whose free ends sharp pushes out, so the butt cap paints where the disc reached. */
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

/**
 * A stroked arc as a run of segments. Sharp adds the unit as a STRAIGHT stub
 * along the end tangent, never by moving the arc's own endpoint (the rule the
 * clock rings paid for), at the length the cap-cut rule gives that angle.
 */
function arcRun(c, r, a0, a1, sharp, box = [1, 1, 23, 23]) {
  const arc = { type: 'A', c, r, a0, a1 };
  if (!sharp) return [arc];
  const s = Math.sign(a1 - a0);
  const tan = (a) => mul([-Math.sin(rad(a)), Math.cos(rad(a))], s);   // direction of travel at angle a
  const p0 = onArc(c, r, a0), p1 = onArc(c, r, a1);
  const out0 = mul(tan(a0), -1), out1 = tan(a1);
  const q0 = add(p0, mul(out0, sharpEndIn(p0, out0, box)));
  const q1 = add(p1, mul(out1, sharpEndIn(p1, out1, box)));
  return [{ type: 'L', p0: q0, p1: p0 }, arc, { type: 'L', p0: p1, p1: q1 }];
}

/* ---------------------------------------------------------------- faces */

/**
 * A face is the `circle` container's own ring, r=10 about (12,12), painting
 * 1..23: the circle size. Everything inside stays within ink radius 7, which
 * is the house 2 clear of the ring's inner edge.
 *
 * The features are `scan-face`'s own face, verbatim: ticks a unit long at
 * (9,10)..(9,11) and (15,10)..(15,11), and its mouth, two cubics from (9,15)
 * to (15,15) dipping to 16.5. That is the set's existing face and the reason
 * for this redraw (10 Sep 2026): the first cut had moved the ticks up a row
 * and widened the mouth to 8..16, and three of its parts had landed exactly
 * on Lucide's paths. The frown is the same mouth turned over about y = 16,
 * ends on 17 and the crest on 15.5, so its ink clears the eyes' by 2.5; the
 * neutral mouth is the chord alone, 9..15 on 16; the expressionless eyes are
 * dashes on the ticks' own centre line, 10.5. The laugh keeps its eyes two
 * rows up (8..9): its open mouth needs a chord on 13 to hold a 3-unit
 * interior, see `laughMouth`.
 */
const C = [12, 12];
const RING = circleSegs(C, 10);
const EYES = [[[9, 10], [9, 11]], [[15, 10], [15, 11]]];
const SMILE = [[9, 15], [10, 16], [11, 16.5], [12, 16.5], [13, 16.5], [14, 16], [15, 15]];
const FROWN = SMILE.map(([x, y]) => [x, 32 - y]);

/**
 * scan-face's mouth is two cubics, and the fill's knockout wants its outline.
 * The offset of a cubic is not a cubic, so each side is approximated the way
 * the reference prescribes: endpoints pushed out along the normals, the end
 * tangents held, and the two handle lengths re-solved so the offset's
 * midpoint lands on the true offset at t = 0.5. `verifyOutline` then samples
 * the result and requires every point to sit exactly 1 from the mouth's
 * centre line, or 1 from an end for the caps. A flattened outline was tried
 * first and came out as a few hundred facet joins per mouth, the
 * micro-segment defect the set already bans.
 *
 * The stroke carries the cubics verbatim. Sharp adds the unit as a straight
 * stub along each end's tangent, 0.414 at these 45-degree ends, and the
 * outline's ends become butt faces across the stubs.
 */
const bez = (a, b, c, d, t) => { const u = 1 - t; return [u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0], u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1]]; };
const bezT = (a, b, c, d, t) => { const u = 1 - t; return unit([3*u*u*(b[0]-a[0]) + 6*u*t*(c[0]-b[0]) + 3*t*t*(d[0]-c[0]), 3*u*u*(b[1]-a[1]) + 6*u*t*(c[1]-b[1]) + 3*t*t*(d[1]-c[1])]); };
const leftOf = (t) => [t[1], -t[0]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
/** One cubic offset by `d` to the left of travel, handles re-solved on the midpoint. */
function offsetCubic([a, b, c, dd], d) {
  const t0 = unit(sub(b, a)), t1 = unit(sub(dd, c));
  const q0 = add(a, mul(leftOf(t0), d)), q3 = add(dd, mul(leftOf(t1), d));
  const m = add(bez(a, b, c, dd, 0.5), mul(leftOf(bezT(a, b, c, dd, 0.5)), d));
  const v = mul(sub(m, mul(add(q0, q3), 0.5)), 8 / 3);
  const nt1 = mul(t1, -1);
  const det = cross(t0, nt1);
  const h0 = cross(v, nt1) / det, h1 = cross(t0, v) / det;
  return [q0, add(q0, mul(t0, h0)), sub(q3, mul(t1, h1)), q3];
}
const revCubic = ([a, b, c, d]) => [d, c, b, a];
const cubicsD = (list, start = true) => list.map((k, i) => `${i === 0 && start ? `M${pt(k[0])}` : ''}C${pt(k[1])} ${pt(k[2])} ${pt(k[3])}`).join('');
function cubicRun(P, sharp, box = [1, 1, 23, 23]) {
  const [p0, c1, c2, p3, c4, c5, p6] = P;
  const cubics = [[p0, c1, c2, p3], [p3, c4, c5, p6]];
  let d = cubicsD(cubics);
  // samples of the centre line, for the outline check
  const centre = [];
  for (const k of cubics) for (let i = 0; i <= 60; i++) centre.push(bez(...k, i / 60));
  const t0 = unit(sub(p0, c1)), t1 = unit(sub(p6, c5));       // outward end tangents
  let q0 = p0, q1 = p6;
  if (sharp) {
    q0 = add(p0, mul(t0, sharpEndIn(p0, t0, box))); q1 = add(p6, mul(t1, sharpEndIn(p6, t1, box)));
    d = `M${pt(q0)}L${pt(p0)}` + d.slice(d.indexOf('C')) + `L${pt(q1)}`;
    for (let i = 0; i <= 8; i++) { centre.push(add(p0, mul(sub(q0, p0), i / 8))); centre.push(add(p6, mul(sub(q1, p6), i / 8))); }
  }
  // the outline: left side forward, cap, right side back, cap
  const L = cubics.map((k) => offsetCubic(k, 1));
  const R = cubics.map((k) => offsetCubic(k, -1)).reverse().map(revCubic);
  const nEnd = leftOf(unit(sub(p6, c5))), nStart = leftOf(unit(sub(c1, p0)));
  let outline;
  if (sharp) {
    const sL = add(q0, mul(nStart, 1)), sR = sub(q0, mul(nStart, 1)), eL = add(q1, mul(nEnd, 1)), eR = sub(q1, mul(nEnd, 1));
    outline = `M${pt(sL)}L${pt(L[0][0])}` + cubicsD(L, false) + `L${pt(eL)}L${pt(eR)}L${pt(R[0][0])}` + cubicsD(R, false) + `L${pt(sR)}Z`;
  } else {
    const capEnd = arcTo(p6, 1, deg(p6, L[1][3]), deg(p6, L[1][3]) + 180).map((s) => `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`).join('');
    const capStart = arcTo(p0, 1, deg(p0, R[1][3]), deg(p0, R[1][3]) + 180).map((s) => `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`).join('');
    outline = cubicsD(L) + capEnd + cubicsD(R, false) + capStart + 'Z';
  }
  verifyOutline(outline, centre, sharp ? [] : [p0, p6]);
  return { d, outline };
}
/** Every sample of an outline sits 1 from the centre line, or on a cap's circle. */
function verifyOutline(outline, centre, caps) {
  const pts = outlines(outline, 40).flat();
  let worst = 0, at = null;
  for (const q of pts) {
    let m = Infinity;
    for (const c of centre) m = Math.min(m, len(sub(q, c)));
    for (const c of caps) m = Math.min(m, Math.abs(len(sub(q, c)) - 1) + 1);
    if (Math.abs(m - 1) > worst) { worst = Math.abs(m - 1); at = q; }
  }
  if (worst > 0.02) throw new Error(`mouth outline off by ${worst.toFixed(4)} at ${at.map((v) => v.toFixed(3))}`);
}
/** A `d` wound against `plateSegs`, so it cuts under the non-zero rule. */
function holeD(plateSegs, d) {
  const pts = outlines(d, 24).flat();
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
  if (Math.sign(a) !== windingOf(plateSegs)) return d;
  // reverse: walk the commands backwards
  const cmds = [...d.matchAll(/([MLC])([^MLCZ]*)/g)].map((m) => [m[1], m[2].trim().split(/\s+/).map(Number)]);
  const points = []; // [point, cmdInto]
  let cur = null;
  for (const [c, v] of cmds) {
    if (c === 'M') { cur = [v[0], v[1]]; points.push({ p: cur }); }
    else if (c === 'L') { cur = [v[0], v[1]]; points.push({ p: cur, via: null }); }
    else { const h1 = [v[0], v[1]], h2 = [v[2], v[3]]; cur = [v[4], v[5]]; points.push({ p: cur, via: [h1, h2] }); }
  }
  let out = `M${pt(points[points.length - 1].p)}`;
  for (let i = points.length - 1; i > 0; i--) {
    const seg = points[i], prev = points[i - 1];
    out += seg.via ? `C${pt(seg.via[1])} ${pt(seg.via[0])} ${pt(prev.p)}` : `L${pt(prev.p)}`;
  }
  return out + 'Z';
}
const lineRun = (pts, sharp) => { const q = sharp ? sharpen(pts) : pts; return { d: q.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join(''), segs: lineSegs(q) }; };
const runHole = (plate, r, cap) => (r.outline ? holeD(plate, r.outline) : hole(plate, outlineRun(r.segs, 1, cap)));

const MOUTH = {
  smile: (sharp) => cubicRun(SMILE, sharp),
  frown: (sharp) => cubicRun(FROWN, sharp),
  neutral: (sharp) => lineRun([[9, 16], [15, 16]], sharp),
};
const EYE = {
  tick: (sharp) => EYES.map((e) => lineRun(e, sharp)),
  // flat eyes, 2 long, on the ticks' own centre line
  dash: (sharp) => [[[8, 10.5], [10, 10.5]], [[14, 10.5], [16, 10.5]]].map((e) => lineRun(e, sharp)),
  // brows slanting in and down at 45 degrees, which is the whole of an angry face
  angry: (sharp) => [[[8, 9], [10, 11]], [[16, 9], [14, 11]]].map((e) => lineRun(e, sharp)),
  // the laugh's row, two up: see `laughMouth`
  high: (sharp) => EYES.map((e) => e.map((p) => [p[0], p[1] - 2])).map((e) => lineRun(e, sharp)),
};

/**
 * The open mouth: a half-disc of r=5 about (12,13), flat top on y=13 from 7 to
 * 17, bottom on 18, so its ink reaches 19 and no further. Its top corners take
 * r=1, the smallest fillet whose filled form (r=2) is on the ladder.
 *
 * Why the eyes move up for this face and no other: the chord's ink top is 12,
 * the house gap wants the eyes' ink to end on 10, so the ticks sit at 8..9,
 * two rows above the family's 10..11. With the family's eyes the chord would
 * have to sit on 15, and a closed shape 3 tall has no interior at all. As drawn the interior is 3, under the
 * 4 the reference asks of a closed shape and nearly twice what the Lucide
 * mouth this follows holds; it is the ceiling the ring allows.
 */
const D_C = [12, 13], D_R = 5, D_F = 1;
function laughMouth(sharp) {
  if (sharp) return new Path().M([7, 13]).L([17, 13]).A(D_C, 0, 180, 1).Z();
  const dx = Math.sqrt((D_R - D_F) ** 2 - D_F ** 2);                 // fillet centres at (12 +- dx, 14)
  const FR = [12 + dx, 13 + D_F], FL = [12 - dx, 13 + D_F];
  const TR = add(D_C, mul(sub(FR, D_C), D_R / (D_R - D_F)));           // tangency on the big arc
  const TL = add(D_C, mul(sub(FL, D_C), D_R / (D_R - D_F)));
  return new Path().M([FL[0], 13]).L([FR[0], 13])
    .A(FR, 270, deg(FR, TR), 1)
    .A(D_C, deg(D_C, TR), deg(D_C, TL), 1)
    .A(FL, deg(FL, TL), 270, 1).Z();
}

const FACES = {
  'face-smile': { eyes: 'tick', mouth: 'smile' },
  'face-frown': { eyes: 'tick', mouth: 'frown' },
  'face-neutral': { eyes: 'tick', mouth: 'neutral' },
  'face-expressionless': { eyes: 'dash', mouth: 'neutral' },
  'face-angry': { eyes: 'angry', mouth: 'frown' },
  'face-laugh': { eyes: 'high', mouth: null },
};

/** Every run of the features, as segment lists, plus the closed mouth where there is one. */
function features(spec, sharp) {
  const runs = EYE[spec.eyes](sharp);
  if (spec.mouth) runs.push(MOUTH[spec.mouth](sharp));
  const closed = spec.mouth ? null : laughMouth(sharp);
  return { runs, closed };
}

function faceSet(spec) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const cap = sharp ? 'butt' : 'round';
    const { runs, closed } = features(spec, sharp);
    const plate = circleSegs(C, 11);
    const d = contourPath(RING) + runs.map((r) => r.d).join('') + (closed ? closed.toString() : '');
    // the fill knocks each feature out as its own ink: a capsule per run, the mouth's outer contour
    const holes = runs.map((r) => runHole(plate, r, cap)).join('')
      + (closed ? hole(plate, plateOf(closed.segs)) : '');
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + holes)];
  }
  return out;
}
export const SETS = {};
for (const [name, spec] of Object.entries(FACES)) SETS[name] = () => faceSet(spec);

/* ------------------------------------------------------ face-smile-plus */

/**
 * `clock-plus` reflected about y = 12: the ring opens where the sign goes,
 * running from (22,12) down, round and up to (12,2) and stopping, so both caps
 * sit 2 clear of the sign's ink, and the plus is the house sign in the
 * top-right box, 16..22 by 2..8.
 *
 * Stroke only, and with both eyes, by Zafar's ruling of 10 Sep 2026. The
 * house notch that would clear the sign in a duotone or fill covers the right
 * eye (2.12 from the sign, 2.59 inside the notch, and no eye row satisfies
 * both), so the first cut winked; he preferred the whole face and gave up the
 * two filled styles for this one icon instead. `COVERAGE` agrees: the cut ring
 * is an open glyph and owes no fill.
 */
SETS['face-smile-plus'] = () => {
  const out = {};
  const spec = FACES['face-smile'];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const ring = sharp
      ? new Path().M([22, 11]).L([22, 12]).A(C, 0, 270, 1).L([13, 2])
      : new Path().M([22, 12]).A(C, 0, 270, 1);
    const plus = sharp ? 'M19 1L19 9M15 5L23 5' : 'M19 2L19 8M16 5L22 5';
    const { runs } = features(spec, sharp);
    out[`stroke.${key}`] = [S(ring.toString() + runs.map((r) => r.d).join('') + plus)];
  }
  return out;
};

/* --------------------------------------------------------------- thumbs */

/**
 * A hand, 22 by 22. The cuff is a 6-wide box on the left, walls at 2 and 8
 * with the divider on 8 running top to bottom. The thumb rises off the
 * divider's top at (8,10) as a tapering bar, outer edge to (10,2), inner edge
 * from (16,10) to (15,2), closed by a flat top on y=2 with r=2 corners, so the
 * ink reaches 1 and the top squares up in sharp like every other corner. The
 * first cut ended the thumb in an r=3 half-disc, which read too big and
 * bumpy, and stayed round in sharp beside squared corners: half one
 * treatment, half the other. Zafar, 10 Sep 2026. The fingers slope in as
 * they curl: the right edge is the common tangent of the two r=2 corners at
 * (20,12) and (17,20), placed so the arcs land the ink on 23 both ways.
 *
 * Sharp cannot keep that slope and hold the box, since an oblique vertex's
 * join disc reaches past its fillet's extreme, so its corners are re-solved
 * the way the crown's tips are: the slope keeps its direction and runs from
 * (22,10) to (17.5,22). The divider ends on ink at both ends and is never
 * extended.
 *
 * The fill opens the CUFF as a panel, Zafar's own drawing of 10 Sep 2026: the
 * white is the cuff's interior between the ink, 3..7 by 11..21, on r=1
 * corners (the body's r=2 inset by the stroke), and square in sharp. The
 * first cut slotted the divider instead, the way the solid thumbs in other
 * sets do, and he sent it back. `thumbs-down` is the same drawing turned a
 * half turn.
 */
const ROOT_V = [8, 10], THUMB_TL = [10, 2], THUMB_TR = [15, 2], CROTCH = [16, 10];
export function thumbContour(sharp) {
  const p = new Path();
  if (sharp) {
    p.M([2, 10]).L(ROOT_V).L(THUMB_TL).L(THUMB_TR).L(CROTCH).L([22, 10]).L([17.5, 22]).L([2, 22]).Z();
  } else {
    // the slope: common right tangent of r=2 corners about (20,12) and (17,20)
    const C1 = [20, 12], C2 = [17, 20], r = 2;
    const dir = unit(sub(C2, C1)), nrm = [dir[1], -dir[0]];   // the RIGHT normal, toward the fingers' outside
    const aN = deg([0, 0], nrm);
    p.M([4, 10]).L(ROOT_V).corner(THUMB_TL, THUMB_TR, r).corner(THUMB_TR, CROTCH, r).L(CROTCH)
      .L([C1[0], 10]).A(C1, -90, aN, 1).L(add(C2, mul(nrm, r))).A(C2, aN, 90, 1)
      .L([4, 22]).A([4, 20], 90, 180, 1).L([2, 12]).A([4, 12], 180, 270, 1).Z();
  }
  return p;
}
const turn = (d) => d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, x, y) => `${num(24 - Number(x))} ${num(24 - Number(y))}`);

function thumbSet(down) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = thumbContour(sharp);
    const pl = plateOf(body.segs);
    const divider = 'M8 10L8 22';
    // the cuff panel: the interior between the wall, the divider and the rims
    const panel = polyContour([[3, 11], [7, 11], [7, 21], [3, 21]], sharp ? [0, 0, 0, 0] : [1, 1, 1, 1]).segs;
    const d = body.toString() + divider;
    const f = (s) => (down ? turn(s) : s);
    out[`stroke.${key}`] = [S(f(d))];
    out[`duotone.${key}`] = [P(f(contourPath(pl))), S(f(d))];
    out[`fill.${key}`] = [F_(f(contourPath(pl) + hole(pl, panel)))];
  }
  return out;
}
SETS['thumbs-up'] = () => thumbSet(false);
SETS['thumbs-down'] = () => thumbSet(true);

/* ------------------------------------------------------------------ main */

// writes only when it IS the command, so importing its geometry never touches raw/
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
function main() {
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
  console.log(name.padEnd(22), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
    ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
    ' sharp', sbox.map((v) => v.toFixed(2).padStart(6)).join(' '),
    ` ${Object.keys(variants).length} variants`);
}
}
