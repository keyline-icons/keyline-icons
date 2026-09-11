/**
 * Emit batch C of v0.8.0 into raw/ (or --out=DIR/raw).
 *   node tools/batch-c/build.mjs [name ...] [--out=DIR]
 *
 * Ten names off a month of empty searches, 10 Sep 2026: baby, boy, girl,
 * children, male, female, bed, sofa, door, brick-wall. Built on the v5
 * libraries the way tools/charts/build.mjs is: every closed shape is lines and
 * arcs so its plate is an exact offset checked sample by sample, every
 * knockout is wound against its plate, and every sharp free end goes through
 * `sharpEndIn` so the two treatments paint the same box. Hand-walked plates
 * (a union of two bodies) are asserted against the drawing's own ink box and
 * looked at with the plate recoloured, which is the only test that catches a
 * plate past its stroke.
 *
 * The people are figures and signs, not another avatar: the set already has
 * `user`, `users` and the badged user family. Every figure's head is the
 * house node, an r=3 ring painting 8, and the two small heads of `children`
 * are r=2, the size `circle-user`'s head takes.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, onArc, add, sub, mul, len, unit, filletLineArc } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { outlineRun } from '../v6/outline.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });
const rad = (a) => (a * Math.PI) / 180;

/* ------------------------------------------------------------- helpers */

function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
const runPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join('');
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));
const circleSegs = (c, r) => [0, 90, 180, 270].map((a) => ({ type: 'A', c, r, a0: a, a1: a + 90 }));

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

/**
 * A stroked arc as a run of segments. Sharp adds the unit as a STRAIGHT stub
 * along the end tangent, never by moving the arc's own endpoint (the rule the
 * clock rings paid for), at the length the cap-cut rule gives that angle.
 * `ends` says which ends are free.
 */
function arcRun(c, r, a0, a1, sharp, box = [1, 1, 23, 23], ends = [true, true]) {
  const arc = { type: 'A', c, r, a0, a1 };
  if (!sharp) return [arc];
  const s = Math.sign(a1 - a0);
  const tan = (a) => mul([-Math.sin(rad(a)), Math.cos(rad(a))], s);   // direction of travel at angle a
  const p0 = onArc(c, r, a0), p1 = onArc(c, r, a1);
  const out0 = mul(tan(a0), -1), out1 = tan(a1);
  const q0 = add(p0, mul(out0, sharpEndIn(p0, out0, box)));
  const q1 = add(p1, mul(out1, sharpEndIn(p1, out1, box)));
  const out = [];
  if (ends[0]) out.push({ type: 'L', p0: q0, p1: p0 });
  out.push(arc);
  if (ends[1]) out.push({ type: 'L', p0: p1, p1: q1 });
  return out;
}
const openD = (segs) => contourPath(segs, false);

/** The ink box of a list of layers, stroke layers at the treatment's cap. */
function inkOf(layers, cap) {
  const strokes = layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join('');
  const b = strokes ? strokedBBox(strokes, 1, cap) : [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers.filter((l) => l.kind !== 'stroke')) {
    const q = strokedBBox(l.d, 0, 'butt');
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  return b;
}

/** Assert every variant of a set paints `want`, §12 of the reference. */
function assertBox(name, variants, want) {
  for (const [key, layers] of Object.entries(variants)) {
    const b = inkOf(layers, key.endsWith('sharp') ? 'butt' : 'round');
    const off = Math.max(...b.map((v, i) => Math.abs(v - want[i])));
    // a stroke's fillet is one cubic and its plate is an arc split on the
    // cardinals, and the two disagree by about two thousandths at a corner
    // tangent to the box; the stroke is what was solved, so it is held tighter
    const tol = key.startsWith('stroke') ? 0.002 : 0.005;
    if (off > tol) throw new Error(`${name} ${key}: box ${b.map((v) => v.toFixed(4)).join(', ')} should be ${want.join(', ')}`);
  }
}

/**
 * Solve a parameter so a filleted shape's painted extreme lands on the grid:
 * a fillet pulls a vertex's extreme in, so the vertex sits outside the box the
 * ink lands on (§3 of the reference). `build(x)` returns a `d`; `pick` reads
 * the extreme off its rounded ink box. Monotone in x, so it bisects.
 */
function solve(build, pick, target, lo, hi) {
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (pick(strokedBBox(build(m), 1, 'round')) > target) hi = m; else lo = m;
  }
  return (lo + hi) / 2;
}

/** A hand-walked plate: points with per-vertex radii, sharp's convex corners on r=1. */
const walk = (pts, radii, sharp) => polyContour(pts, radii.map((r) => (r ? (sharp ? 1 : r) : 0)));

/**
 * Every sample of `segs` sits exactly 1 from the nearest of `sources`, or this
 * throws. It is `verify()` for a contour that is the silhouette of MORE than
 * one piece — a plate walked by hand around a body and the stroke joined to
 * it — where no single source is the thing it offsets. The same check reads
 * an opened panel, which is the same offset taken on the inside.
 */
function checkAt1(sources, segs, what, tol = 0.004) {
  const pts = (list, k) => {
    const o = [];
    for (const s of list) for (let i = 0; i <= k; i++) {
      const t = i / k;
      o.push(s.type === 'L' ? add(s.p0, mul(sub(s.p1, s.p0), t)) : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t));
    }
    return o;
  };
  const src = sources.map((s) => pts(s, 260));
  let worst = 0, at = null;
  for (const p of pts(segs, 90)) {
    let m = Infinity;
    for (const list of src) for (const q of list) m = Math.min(m, len(sub(p, q)));
    if (Math.abs(m - 1) > worst) { worst = Math.abs(m - 1); at = p; }
  }
  if (worst > tol) throw new Error(`${what}: off by ${worst.toFixed(4)} at ${at.map((v) => v.toFixed(3))}`);
  return worst;
}

/** A `d` of straight runs and cubics, as segments for the check above. */
function lineSegsOf(d) {
  const out = [];
  let cur = null;
  for (const m of d.matchAll(/([MLC])([^MLCZ]*)/g)) {
    const v = m[2].trim().split(/\s+/).map(Number);
    if (m[1] === 'M') { cur = [v[0], v[1]]; continue; }
    if (m[1] === 'L') { out.push({ type: 'L', p0: cur, p1: [v[0], v[1]] }); cur = [v[0], v[1]]; continue; }
    // a cubic, flattened into short runs: this feeds a distance check only
    const p0 = cur, c1 = [v[0], v[1]], c2 = [v[2], v[3]], p3 = [v[4], v[5]];
    const at = (t) => {
      const u = 1 - t;
      return [u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
        u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1]];
    };
    for (let i = 0; i < 24; i++) out.push({ type: 'L', p0: at(i / 24), p1: at((i + 1) / 24) });
    cur = p3;
  }
  return out;
}

const SETS = {};

/* ----------------------------------------------------------------- venus */

/**
 * The Venus sign: a ring over a cross, named for the sign rather than for
 * the word (Zafar, 11 Sep 2026, with `male` renamed `mars` in the same
 * breath). The ring is r=6 about (12,8), the size his own refs cut it to;
 * the stem starts ON the ring at (12,14) and runs to 22, and the bar sits at
 * y=19, 8.5..15.5. Ink 5..19 by 1..23: 14 by 22, the vertical rectangle's
 * height.
 *
 * The ring's radius is not free once the drawing is 22 tall: the ring's ink
 * clears the bar by 2 at `bar >= 2r + 6` and the stem shows 2 below the bar
 * at `bar <= 20`, so r <= 7 and the first cut at 7 sat exactly on both
 * floors. At 6 the two gaps open to 3 and 3, which is the room his smaller
 * ring buys. His own file scaled x by 0.857 and y by 0.9, which made the
 * ring an ellipse of 6 by 6.3 and left its gap to the bar at 1.6; one
 * uniform ring of 6 is the fit.
 *
 * A ring fills solid (a counter is not detail), so the fill is the disc with
 * the cross still stroked, and the duotone the disc muted under the whole
 * drawing. `mars` carries the same r=6 ring, which is what makes them a pair.
 */
SETS.venus = () => {
  const C = [12, 8], R = 6;
  const BOX = [5, 1, 19, 23];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const ring = contourPath(circleSegs(C, R));
    const cross = run([[12, 14], [12, 22]], sharp, [false, true], BOX) + run([[8.5, 19], [15.5, 19]], sharp, [true, true], BOX);
    out[`stroke.${key}`] = [S(ring + cross)];
    out[`duotone.${key}`] = [P(circlePath(C, R + 1)), S(ring + cross)];
    out[`fill.${key}`] = [F_(circlePath(C, R + 1)), S(cross)];
  }
  assertBox('venus', out, BOX);
  return out;
};

/* ------------------------------------------------------------------ mars */

/**
 * The Mars sign: the same r=6 ring, about (9,15), and an arrow up-right, the
 * way a free diagonal runs and the way the sign is written. The shaft leaves
 * the ring on its own centre line at 45 degrees and stops 0.6 per axis short
 * of the head's corner, which is `arrow-up-right`'s own stop; the head is a
 * 5.5 bracket on r=0.5 with its corner at (21,3), so the drawing paints
 * 2..22 both ways. Sharp squares the bracket, extends its two free ends the
 * unit, and runs the shaft on to 0.1757 per axis from the corner, again the
 * arrow family's number.
 *
 * Fitted 11 Sep 2026 from his ref, which is the first cut scaled 0.9 about
 * the centre: ring 7 to 6.3, head arms 6 to 5.4, corner fillet 0.5 to 0.45,
 * box 22 to 20. Every structural coordinate lands within 0.2 of a half unit,
 * so they go there — and the fillet comes back to 0.5, since a corner radius
 * is an absolute token and a scale is exactly what takes it off the ladder.
 * The head's own arms set the box, so putting the fillet back does not move
 * it. 20 by 20 is not the square size here: the empty corners send it
 * through the classifier to the floor a diagonal answers to, which it clears
 * on a hull of 28.
 */
SETS.mars = () => {
  const C = [9, 15], R = 6;
  const BOX = [2, 2, 22, 22];
  const K = [21, 3];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const ring = contourPath(circleSegs(C, R));
    const from = onArc(C, R, -45);
    const stop = sharp ? 0.1757 : 0.6;
    const shaft = runPath([from, [K[0] - stop, K[1] + stop]]);
    const a0 = sharp ? sharpen([[15.5, 3], K], [true, false], BOX)[0] : [15.5, 3];
    const a1 = sharp ? sharpen([K, [21, 8.5]], [false, true], BOX)[1] : [21, 8.5];
    const head = new Path().M(a0).corner(K, a1, sharp ? 0 : 0.5).L(a1).toString();
    const arrow = head + shaft;
    out[`stroke.${key}`] = [S(ring + arrow)];
    out[`duotone.${key}`] = [P(circlePath(C, R + 1)), S(ring + arrow)];
    out[`fill.${key}`] = [F_(circlePath(C, R + 1)), S(arrow)];
  }
  assertBox('mars', out, BOX);
  return out;
};

/* ------------------------------------------------------------------ baby */

/**
 * A round face with a curl of hair: the marker every set reaches for, and
 * the one that survives 16px. The head is an r=8 ring about (12,14), inner
 * ink radius 7, and everything inside stays 2 clear of it.
 *
 * Redrawn 11 Sep 2026 against Zafar's references, where the face carries its
 * features large: the eyes are BEADS, filled r=1.5 painting 3 at (9.5,12)
 * and (14.5,12) — §4's "a dot that is its own element" rather than the marks
 * of 2 the first cut used, which is punctuation and closed up at 16px — and
 * the mouth widens to the chord 9.5..14.5 with a sagitta of 0.75. It sits on
 * y=17 rather than the 16.5 the eyes leave room for: at 16.5 the gap is
 * exactly 2 rounded, and the mouth's SHARP end, extended along its own
 * tangent, spends 0.13 of it. A gap on the floor has nothing for the cap
 * extension to come out of. Features low on a big forehead is a baby's own
 * proportion anyway. The mouth is a circular arc, so its outline is exact
 * for the fill. A ring on top was tried at r=2,
 * 2.5 and 3 and could not both clear the head by 2 and keep its top on ink
 * 1, so the curl is a hook: a stub up from the crown to (12,4.5) into an
 * r=2.5 arc about (14.5,4.5) from 180 to 300 degrees, whose tail sits 2.26
 * clear of the head and 2.33 clear of the stub. Ink 3..21 by 1..23, the
 * vertical rectangle exactly. The fill is the disc with the eyes and the
 * mouth knocked out and the curl still stroked.
 */
SETS.baby = () => {
  const C = [12, 14], R = 8;
  const BOX = [3, 1, 21, 23];
  const EYES = [[9.5, 12], [14.5, 12]], ER = 1.5;
  const MH = 2.5, MS = 0.75, MY = 17;                                  // half-chord, sagitta, chord
  const MR = (MH * MH + MS * MS) / (2 * MS), MC = [12, MY + MS - MR];
  const ma = (Math.atan2(MY - MC[1], 12 - MH - 12) * 180) / Math.PI;   // the left end of the mouth
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const ring = contourPath(circleSegs(C, R));
    const curl = openD([...lineSegs([[12, 6], [12, 4.5]]), ...arcRun([14.5, 4.5], 2.5, 180, 300, sharp, BOX, [false, true])]);
    const mouthSegs = arcRun(MC, MR, ma, 180 - ma, sharp, BOX);
    const mouth = openD(mouthSegs);
    const eyes = EYES.map((e) => circlePath(e, ER)).join('');
    const disc = circleSegs(C, R + 1);
    const d = ring + curl + mouth;
    out[`stroke.${key}`] = [S(d), F_(eyes)];
    out[`duotone.${key}`] = [P(contourPath(disc)), S(d), F_(eyes)];
    out[`fill.${key}`] = [
      F_(contourPath(disc) + EYES.map((e) => hole(disc, circleSegs(e, ER))).join('') + hole(disc, outlineRun(mouthSegs, 1, sharp ? 'butt' : 'round'))),
      S(curl),
    ];
  }
  assertBox('baby', out, BOX);
  return out;
};

/* --------------------------------------------------------- boy and girl */

const angOf = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
/** The MINOR arc between two points of the circle (c, r), in the sense they give. */
function arcSeg(c, r, p0, p1) {
  let a0 = angOf(c, p0), a1 = angOf(c, p1);
  while (a1 - a0 > 180) a1 -= 360;
  while (a0 - a1 > 180) a1 += 360;
  return { type: 'A', c, r, a0, a1 };
}
/** The centre of the radius-R circle through A and B, bulging `side` (+1 = left of travel). */
function arcCentre(A, B, R, side) {
  const ch = sub(B, A), c = len(ch), u = mul(ch, 1 / c);
  const nrm = [u[1], -u[0]];
  const h = Math.sqrt(Math.max(0, R * R - (c * c) / 4));
  return add(mul(add(A, B), 0.5), mul(nrm, -side * h));
}

/**
 * The girl's bell: a flat shoulder line, two side arcs of radius R bulging
 * OUTWARD, and a flat hem, mirrored about `cx`.
 *
 * Convex is what makes it a dress. The straight-sided trapezoid drawn first
 * reads as a triangle, and the two other candidates are worse for a reason
 * worth keeping: a CONCAVE side (the A-line) brings the hem corner to 43
 * degrees and a side with a vertical tangent at the shoulder brings it to
 * 30, both of them spikes the hem has to double back from. Bulging out, the
 * shoulder opens to 142 degrees and the hem closes to 83, so the shoulders
 * take r=2 and the hem r=1: the same radius reads rounder on a sharper
 * corner (§3), and r=2 at the hem eats 2.3 units of a 14-unit hem.
 *
 * Arcs rather than cubics, because the plate is then an exact offset.
 */
function dressSegs({ cx = 12, hs, hh, sy, hy, R, rs, rh, sharp }) {
  const S = [cx - hs, sy], H = [cx - hh, hy];
  const C = arcCentre(S, H, R, -1);
  const mir = (p) => [2 * cx - p[0], p[1]];
  if (sharp) return [
    { type: 'L', p0: S, p1: mir(S) },
    arcSeg(mir(C), R, mir(S), mir(H)),
    { type: 'L', p0: mir(H), p1: H },
    arcSeg(C, R, H, S),
  ];
  // Both fillets are a line against the side circle from INSIDE it: the dress
  // sits inside that circle, since the centre is the far hem corner's side.
  const fs = filletLineArc([cx, sy], [-1, 0], [0, 1], C, R, rs);
  const fh = filletLineArc([cx, hy], [-1, 0], [0, -1], C, R, rh);
  return [
    { type: 'L', p0: fs.T, p1: mir(fs.T) },
    arcSeg(mir(fs.F), rs, mir(fs.T), mir(fs.A)),
    arcSeg(mir(C), R, mir(fs.A), mir(fh.A)),
    arcSeg(mir(fh.F), rh, mir(fh.A), mir(fh.T)),
    { type: 'L', p0: mir(fh.T), p1: fh.T },
    arcSeg(fh.F, rh, fh.T, fh.A),
    arcSeg(C, R, fh.A, fs.A),
    arcSeg(fs.F, rs, fs.A, fs.T),
  ];
}

/**
 * The hem half-width whose PAINTED half-width is `want`, solved per treatment.
 * A fillet pulls the extreme in, so the rounded hem runs wider than the sharp
 * one — and neither is a number to assume. The sharp hem's widest point is
 * its corner, whose round join paints a clean unit out, only while the side
 * arc's own extreme stays outside the sweep; deepen the flare and the arc
 * goes vertical inside it, which is what put children's sharp dress 0.17
 * past the frame.
 */
function solveHem(opts, want, lo = 3, hi = 10) {
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    const b = strokedBBox(contourPath(dressSegs({ ...opts, hh: m })), 1, 'round');
    if (opts.cx - b[0] > want) hi = m; else lo = m;
  }
  return (lo + hi) / 2;
}

/**
 * Two pictogram figures on one skeleton: the r=3 head ring about (12,5), a
 * closed body whose top edge sits on y=12 (2 clear of the head's ink), and
 * two stroke legs at x=10 and 14 (2 of daylight between them) running to 22
 * so the ink lands on 23. The boy's body is a STRAIGHT rounded rectangle on
 * r=2; the girl's is the bell below on the same shoulder line and the same
 * hem line, so the two share one skeleton and differ only in silhouette. A
 * taper was tried on the boy first, on the argument that a rectangle on two
 * legs reads as a robot; his reference says otherwise, and a taper reads as
 * a shirt on a figure whose whole job is to be the pictogram.
 *
 * NARROWED 11 Sep 2026, on Zafar's word that the pair was not good enough.
 * The diagnosis was width, not detail: a body painting 16 across under a
 * head of 8 is twice the head's width and reads as furniture, a chest of
 * drawers on two feet, which is what it did at every size. A child's
 * shoulders are nearer one and a quarter heads, so the boy's body comes in
 * to paint 10 and the girl's hem to 14, and the three units the body gives
 * up in height go to the legs: the hem moves from y=19 to y=18, so 4 of leg
 * shows under the body rather than 3 and the figures stand rather than
 * perch. Ink 7..17 for the boy and 5..19 for the girl, both 1..23 tall, so
 * both are vertical rectangles owed height and nothing else.
 *
 * Arms were drawn and dropped. They are the one thing a figure at this size
 * is actually missing, but a stroke arm off a shoulder lands in the legs'
 * daylight, and on the girl it crosses the skirt's flare, which leaves a
 * gap under 2 wherever it ends. The body has to narrow first, and once it
 * has, the figure reads without them.
 *
 * The fill is the head's disc and the body solid with the legs stroked, the
 * pictogram in solid; the duotone mutes both.
 */
function figure({ name, body, legY, legs = [10, 14], head = [12, 5], headR = 3, box }) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const segs = body(sharp);
    const ring = contourPath(circleSegs(head, headR));
    const legD = legs.map((x) => run([[x, legY], [x, 22]], sharp, [false, true], box)).join('');
    const plates = contourPath(circleSegs(head, headR + 1)) + contourPath(plateOf(segs));
    const d = ring + contourPath(segs) + legD;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates), S(d)];
    out[`fill.${key}`] = [F_(plates), S(legD)];
  }
  assertBox(name, out, box);
  return out;
}
SETS.boy = () => figure({
  name: 'boy', box: [7, 1, 17, 23], legY: 18,
  body: (sharp) => polyContour([[8, 12], [16, 12], [16, 18], [8, 18]], Array(4).fill(sharp ? 0 : 2)).segs,
});
SETS.girl = () => {
  const bell = { cx: 12, hs: 2.5, sy: 12, hy: 18, R: 10, rs: 2, rh: 1 };
  const hh = { false: solveHem({ ...bell, sharp: false }, 7), true: solveHem({ ...bell, sharp: true }, 7) };
  return figure({
    name: 'girl', box: [5, 1, 19, 23], legY: 18,
    body: (sharp) => dressSegs({ ...bell, hh: hh[sharp], sharp }),
  });
};

/* -------------------------------------------------------------- children */

/**
 * A boy and a girl side by side, each on the figures' skeleton a size down:
 * r=2 heads about (5,4) and (17.5,4) painting 6, bodies whose tops sit on
 * y=10 (2 clear of the heads' ink) and whose corners are r=1, the ladder's
 * value at this size. The boy's torso is the straight 2..8 by 10..16 box
 * with legs at 3 and 7; the girl's is the same bell as the standalone at
 * R=8, shoulders the width of her own head, flaring to a hem on y=16 solved
 * to paint out to 23, with legs at 15.5 and 19.5. Ink 1..23 both ways.
 *
 * The skeleton follows the standalone pair rather than being drawn twice,
 * so it moved when they did on 11 Sep 2026: bodies 2 shorter, legs 2
 * longer, and the girl 0.5 to the right, which pulls her hem in to paint 11
 * against her head's 6 and holds her painted left at 12, 3 clear of his
 * torso. Before that the bodies ran to y=18 and the legs were 4, which is
 * the proportion the standalone pair has now been taken off. The cut before
 * THAT ran the bodies to y=15 and the legs from there, 7 units of leg under
 * a 7-unit body, and read as a pair of stilts.
 */
SETS.children = () => {
  const BOX = [1, 1, 23, 23];
  const bell = { cx: 17.5, hs: 2, sy: 10, hy: 16, R: 8, rs: 1, rh: 1 };
  const hh = { false: solveHem({ ...bell, sharp: false }, 5.5), true: solveHem({ ...bell, sharp: true }, 5.5) };
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const heads = [[5, 4], [17.5, 4]];
    const rings = heads.map((c) => contourPath(circleSegs(c, 2))).join('');
    const discs = heads.map((c) => contourPath(circleSegs(c, 3))).join('');
    const torso = polyContour([[2, 10], [8, 10], [8, 16], [2, 16]], [r, r, r, r]);
    const skirt = dressSegs({ ...bell, hh: hh[sharp], sharp });
    const legs = [[3, 16], [7, 16], [15.5, 16], [19.5, 16]].map(([x, y]) => run([[x, y], [x, 22]], sharp, [false, true], BOX)).join('');
    const bodies = torso.toString() + contourPath(skirt);
    const plates = discs + contourPath(plateOf(torso.segs)) + contourPath(plateOf(skirt));
    const d = rings + bodies + legs;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates), S(d)];
    out[`fill.${key}`] = [F_(plates), S(legs)];
  }
  assertBox('children', out, BOX);
  return out;
};

/* ------------------------------------- boy-2, girl-2 and baby-2 */

/**
 * The three alternates Zafar asked for on 11 Sep 2026, off the candidate
 * sheet: second drawings to take apart, not finished icons. They keep the
 * base names' skeleton and add the one thing the shipped figures do not
 * have, which is LIMBS other than legs.
 *
 * Same plumbing as `figure`, but the limbs are given as polylines rather than
 * derived from a leg line, since these have arms, and the baby's legs splay.
 * Every limb is buried at its first point and free at its second, so sharp
 * extends only the outer end.
 *
 * What each one costs, measured rather than guessed:
 *
 * - `boy-2` costs one warning, at 1.80 between an arm and the leg beside it.
 *   The torso comes in to 9..15 so the arms have somewhere to hang and they
 *   leave the shoulder at the top fillet's own tangent on y=14; the arm's
 *   CAP clears the leg by 2.12, but the tight point is mid-arm rather than
 *   its end, at (6.96, 16.72), so shortening the arm does not move it. Only
 *   the angle does: taken out to (5, 16.5) rather than down to (6, 18) the
 *   pair opens to 2.77, and that is a different drawing from the one on the
 *   sheet. His pick stands and the 1.80 is what it costs.
 * - `girl-2` cannot be clean. Its arms leave the bodice inside the skirt and
 *   cross the flare on the way out, so the pair INTERSECT: the gap reads 0
 *   and there is no version of this drawing where it does not, short of
 *   narrowing the skirt until it is the boy. That is the drawing he asked
 *   for and the 0.00 is the drawing, not a defect. Legs at 10 and 14 rather
 *   than the sheet's 10.5 and 13.5, which was 1 of daylight for no reason.
 * - `baby-2` is the figure with no face, so proportion is the whole of it:
 *   the head ring goes to r=3.5 and paints 9 against a body of 8, which is
 *   an infant's ratio and the boy's is not. The body needs 6 of width for
 *   an interior of 4 (§10), which is why it is 9..15 like the boy's and not
 *   the sheet's 10..14.
 */
function figureLimbs({ name, body, limbs, head = [12, 5], headR = 3, box }) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const segs = body(sharp);
    const ring = contourPath(circleSegs(head, headR));
    const limbD = (typeof limbs === 'function' ? limbs(sharp) : limbs)
      .map((pts) => run(pts, sharp, [false, true], box)).join('');
    const plates = contourPath(circleSegs(head, headR + 1)) + contourPath(plateOf(segs));
    const d = ring + contourPath(segs) + limbD;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates), S(d)];
    out[`fill.${key}`] = [F_(plates), S(limbD)];
  }
  assertBox(name, out, box);
  return out;
}
const mirrorX = (pts, cx = 12) => pts.map(([x, y]) => [2 * cx - x, y]);

SETS['boy-2'] = () => {
  const ARM = [[9, 14], [6, 18]];
  return figureLimbs({
    name: 'boy-2', box: [5, 1, 19, 23],
    body: (sharp) => polyContour([[9, 12], [15, 12], [15, 19], [9, 19]], Array(4).fill(sharp ? 0 : 2)).segs,
    limbs: [ARM, mirrorX(ARM), [[10, 19], [10, 22]], [[14, 19], [14, 22]]],
  });
};

SETS['girl-2'] = () => {
  // the hem corner is filleted, so the vertex sits outside the ink: solve it
  const skirt = (hx, sharp) =>
    polyContour([[10, 12], [14, 12], [24 - hx, 19], [hx, 19]], sharp ? [0, 0, 0, 0] : [2, 2, 1, 1]);
  const hx = {
    false: solve((m) => skirt(m, false).toString(), (b) => 12 - b[0], 6.5, 8, 5),
    true: solve((m) => skirt(m, true).toString(), (b) => 12 - b[0], 6.5, 8, 5),
  };
  // The arm leaves the skirt's own EDGE, not a round number near it. Started
  // at x=10 the cap is half in the skirt's stroke and half in the open panel
  // behind it, and sharp's square corner pokes 0.56 into the daylight, which
  // the T-junction sweep reads as an end standing out. The side is straight
  // at this height in both treatments, so the crossing is a plain lerp down
  // the shoulder-to-hem line, and it moves with the hem the treatment solved.
  const arm = (hx) => [[10 + (hx - 10) * (1.5 / 7), 13.5], [6.5, 16]];
  return figureLimbs({
    name: 'girl-2', box: [5.5, 1, 18.5, 23],
    body: (sharp) => skirt(hx[sharp], sharp).segs,
    limbs: (sharp) => [arm(hx[sharp]), mirrorX(arm(hx[sharp])), [[10, 19], [10, 22]], [[14, 19], [14, 22]]],
  });
};

SETS['baby-2'] = () => {
  const ARM = [[9, 15], [5, 16.5]];
  return figureLimbs({
    name: 'baby-2', box: [4, 1, 20, 23], head: [12, 5.5], headR: 3.5,
    body: (sharp) => polyContour([[9, 13], [15, 13], [15, 19], [9, 19]], Array(4).fill(sharp ? 0 : 2)).segs,
    limbs: [ARM, mirrorX(ARM), [[10, 19], [9, 22]], [[14, 19], [15, 22]]],
  });
};

/* ------------------------------------------------------------------- bed */

/**
 * A bed from the side: a headboard post at x=2 from 4 down to the floor at
 * 20, a mattress 6 deep from 10 to 16 running from the post to a foot that
 * turns down on r=3 at x=22 and carries on as the far leg, and a pillow, an
 * arch 6..12 rising to y=5 on r=2 corners, 2 clear of the post. The mattress
 * is closed along the post so COVERAGE sees a region; ink 1..23 by 3..21, the
 * horizontal rectangle, centred. The first cut sat a unit lower with the
 * mattress on 12..18, and its post, floor line and foot were the reference
 * set's own three lines to the coordinate; the post is forced by the box and
 * stays, the mattress moved up two so nothing else coincides. The plate is
 * the silhouette of mattress and pillow walked by hand, square where the post
 * and the leg run through it; the fill opens the pillow as a panel, 7..11 by
 * 6..9 on r=1, so a white pillow sits on a solid mattress.
 */
SETS.bed = () => {
  const BOX = [1, 3, 23, 21];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r3 = sharp ? 0 : 3, r2 = sharp ? 0 : 2;
    const post = run([[2, 4], [2, 20]], sharp, [true, true], BOX);
    const leg = run([[22, 16], [22, 20]], sharp, [false, true], BOX);
    const slab = new Path().M([2, 10]).corner([22, 10], [22, 16], r3).L([22, 16]).L([2, 16]).Z().toString();
    const pillow = new Path().M([6, 10]).corner([6, 5], [12, 5], r2).corner([12, 5], [12, 10], r2).L([12, 10]).toString();
    const plate = walk([[1, 17], [1, 9], [5, 9], [5, 4], [13, 4], [13, 9], [23, 9], [23, 17]], [0, 0, 0, 3, 3, 0, 4, 0], sharp);
    const panel = polyContour([[7, 9], [7, 6], [11, 6], [11, 9]], [0, sharp ? 0 : 1, sharp ? 0 : 1, 0]);
    const d = post + slab + pillow + leg;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate.segs)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate.segs) + hole(plate.segs, panel.segs)), S(post + leg)];
  }
  assertBox('bed', out, BOX);
  return out;
};

/* --------------------------------------------- bed-single, bed-double */

/**
 * The two sizes, 11 Sep 2026 on his word, and they cannot be the side view
 * `bed` draws: a double bed seen from the side IS a single bed. So the pair
 * turns to face the reader, and what it shows is the BEDDING — a mattress
 * 2..22 by 11..20 on r=2, a pillow band across it on y=15, and the headboard
 * as an arch over it from (5,11) up to y=4, its two ends buried in the
 * mattress's top edge. `bed-double` divides the pillow band down x=12 into
 * two; `bed-single` leaves it whole, which is a bolster. Ink 1..23 by 3..21,
 * 22 by 18, `bed`'s own box, so the three sit as one family.
 *
 * The single is drawn NARROWER than the double, 18 against 22, which is the
 * whole of what the two names mean and is not something a pillow count can
 * carry on its own (Zafar, 11 Sep 2026: both read as a double). Its mattress
 * is 4..20 against 2..22 and its headboard 7..17 against 5..19, so the two
 * keep one height, one construction and one rhythm and differ in width, as
 * the beds themselves do. 18 by 18 falls through the size classifier to the
 * floor a diagonal answers to; 16 would not, since 16 by 18 reads as a
 * vertical rectangle and is then owed 22 of height.
 *
 * The band is what makes it a bed rather than a sofa, which this same batch
 * draws out of nearly the same parts. Two cuts before it read as upholstery:
 * a headboard on a closed base, then the same on legs. A back on a slab is a
 * sofa whatever its legs do; a horizontal line across the seat is bedding,
 * and no sofa has one.
 *
 * Two pillows drawn as their own closed shapes were measured and dropped.
 * The headboard's interior is 12 by 6, so a pair inside it at the house gap
 * takes paths 3 wide by 4 tall, and a 4-tall closed shape has an interior of
 * 2, which paints solid (§10). The band costs nothing and reads at 16px.
 */
function bedFront({ name, divided, half, arm }) {
  const BOX = [12 - half - 1, 3, 12 + half + 1, 21];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const [x0, x1] = [12 - half, 12 + half];             // the mattress's own walls
    const [h0, h1] = [12 - arm, 12 + arm];               // the headboard's
    const mattress = polyContour([[x0, 11], [x1, 11], [x1, 20], [x0, 20]], [r, r, r, r]);
    const arch = new Path().M([h0, 11]).corner([h0, 4], [h1, 4], r).corner([h1, 4], [h1, 11], r).L([h1, 11]).toString();
    const band = `M${x0} 15L${x1} 15` + (divided ? 'M12 11L12 15' : '');
    // the silhouette of mattress and headboard together, walked by hand: the
    // two reflex corners where the arch meets the mattress are trims, not turns
    const plate = walk([[x0 - 1, 21], [x0 - 1, 10], [h0 - 1, 10], [h0 - 1, 3], [h1 + 1, 3], [h1 + 1, 10], [x1 + 1, 10], [x1 + 1, 21]],
      [3, 3, 0, 3, 3, 0, 3, 3], sharp);
    // the pillow cells the fill opens: the mattress's inner ink down to the
    // band's, with the top corners on the body's own inner turn
    const q = sharp ? 0 : 1;
    const cell = (a, b, rl, rr) => hole(plate.segs, polyContour([[a, 12], [b, 12], [b, 14], [a, 14]], [rl, rr, 0, 0]).segs);
    const cells = divided ? cell(x0 + 1, 11, q, 0) + cell(13, x1 - 1, 0, q) : cell(x0 + 1, x1 - 1, q, q);
    const d = mattress.toString() + arch + band;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate.segs)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate.segs) + cells)];
  }
  assertBox(name, out, BOX);
  return out;
}
SETS['bed-single'] = () => bedFront({ name: 'bed-single', divided: false, half: 8, arm: 5 });
SETS['bed-double'] = () => bedFront({ name: 'bed-double', divided: true, half: 10, arm: 7 });

/* ------------------------------------------------------------------ sofa */

/**
 * A sofa from the front, redrawn 11 Sep 2026. He sent four references to read
 * the anatomy from and said in the same breath not to copy them, and the
 * first attempt at this did: measured against one of them it came back 95.6
 * per cent, which is a drawing rather than a derivation. What the references
 * teach, and what the first cut here lacked entirely, is one thing — THE ARMS
 * RISE ABOVE A DIPPED SEAT, with the back an arch landing on the arm tops.
 * That is anatomy. Their numbers are not.
 *
 * So ours are re-solved, and the arm's width is what moves everything: at 4
 * its interior is 2, which §10 says is gone. The arm's top is a semicircle,
 * so its width IS twice a corner radius, and the ladder holds no 2.5 — five
 * was drawn and RADIUS refused it on all three styles. That leaves 4, which
 * is theirs, and SIX, which is ours: radius 3, centres on 5 and 19, the
 * back's walls on the same two, and the legs under them. The arms then take
 * more of the 20 than the seat does, which is the price of the ladder.
 *
 * The rest follows from the budget. Ink 1..23 by 3..21 puts the back's top on
 * y=4 and the legs' feet on 20; the arms' apexes fall out of the radius at 8;
 * the seat is on 14, which leaves the arm's inner edge 2 units of straight
 * under its turn and the base 2 of interior under the seat. The seat's coves
 * take r=1 because they are reflex and a 3 there would eat the inner edge.
 *
 * The plate is the silhouette of body and back together, walked by hand, and
 * one number is solved: the back's outer edge on x=4 meets the arm's plate
 * arc of radius 4 at y = 11 - sqrt(15). The fill opens the seat-back panel
 * the way `map` opens its middle leaf, so the arms stay solid.
 */
const sofaArm = (w) => () => {
  const BOX = [1, 3, 23, 21];
  const AC = [[2 + w, 11], [22 - w, 11]];        // the arm centres; radius w, so 2w wide
  const SEAT = 14, BASE = 18, TOP = 4, LEG = 20, APEX = 11 - w;
  const IN = [2 + 2 * w, 22 - 2 * w];            // the arms' inner edges
  const BW = [2 + w, 22 - w];                    // the back's walls, on the arm centres
  const ang = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
  const arc = (c, r, a0, p1) => { let a1 = ang(c, p1); while (a1 - a0 > 180) a1 -= 360; while (a0 - a1 > 180) a1 += 360; return { type: 'A', c, r, a0, a1 }; };
  const L = (p0, p1) => ({ type: 'L', p0, p1 });
  const yc = 11 - Math.sqrt((w + 1) * (w + 1) - 1);   // the back's outer edge against the arm's plate arc
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const rw = sharp ? 0 : w, r1 = sharp ? 0 : 1, r2 = sharp ? 0 : 2;
    const PR = w + 1;                              // the arm's plate radius
    const body = polyContour(
      [[2, BASE], [2, APEX], [IN[0], APEX], [IN[0], SEAT], [IN[1], SEAT], [IN[1], APEX], [22, APEX], [22, BASE]],
      [rw, rw, rw, r1, r1, rw, rw, rw]);
    const back = new Path().M([BW[0], APEX]).corner([BW[0], TOP], [BW[1], TOP], r2).corner([BW[1], TOP], [BW[1], APEX], r2).L([BW[1], APEX]).toString();
    const legs = BW.map((x) => run([[x, BASE], [x, LEG]], sharp, [false, true], BOX)).join('');
    const plate = sharp
      ? [arc([2, APEX], 1, 180, [2, APEX - 1]), L([2, APEX - 1], [BW[0] - 1, APEX - 1]), L([BW[0] - 1, APEX - 1], [BW[0] - 1, TOP]),
         arc([BW[0], TOP], 1, 180, [BW[0], TOP - 1]), L([BW[0], TOP - 1], [BW[1], TOP - 1]), arc([BW[1], TOP], 1, 270, [BW[1] + 1, TOP]),
         L([BW[1] + 1, TOP], [BW[1] + 1, APEX - 1]), L([BW[1] + 1, APEX - 1], [22, APEX - 1]), arc([22, APEX], 1, 270, [23, APEX]),
         L([23, APEX], [23, BASE]), arc([22, BASE], 1, 0, [22, 19]), L([22, 19], [2, 19]),
         arc([2, BASE], 1, 90, [1, BASE]), L([1, BASE], [1, APEX])]
      : [arc(AC[0], PR, 180, [BW[0] - 1, yc]), L([BW[0] - 1, yc], [BW[0] - 1, TOP + 2]), arc([BW[0] + 2, TOP + 2], 3, 180, [BW[0] + 2, 3]),
         L([BW[0] + 2, 3], [BW[1] - 2, 3]), arc([BW[1] - 2, TOP + 2], 3, 270, [BW[1] + 1, TOP + 2]), L([BW[1] + 1, TOP + 2], [BW[1] + 1, yc]),
         arc(AC[1], PR, ang(AC[1], [BW[1] + 1, yc]), [23, 11]), L([23, 11], [23, BASE - PR + 1]),
         arc([22 - PR + 1, BASE - PR + 1], PR, 0, [22 - PR + 1, 19]), L([22 - PR + 1, 19], [1 + PR, 19]), arc([1 + PR, BASE - PR + 1], PR, 90, [1, BASE - PR + 1]),
         L([1, BASE - PR + 1], [1, 11])];
    const open = sharp
      ? [L([IN[0] + 1, SEAT - 1], [IN[0] + 1, APEX]), arc([IN[0], APEX], 1, 0, [IN[0], APEX - 1]), L([IN[0], APEX - 1], [BW[0] + 1, APEX - 1]), L([BW[0] + 1, APEX - 1], [BW[0] + 1, TOP + 1]),
         L([BW[0] + 1, TOP + 1], [BW[1] - 1, TOP + 1]), L([BW[1] - 1, TOP + 1], [BW[1] - 1, APEX - 1]), L([BW[1] - 1, APEX - 1], [IN[1], APEX - 1]),
         arc([IN[1], APEX], 1, 270, [IN[1] - 1, APEX]), L([IN[1] - 1, APEX], [IN[1] - 1, SEAT - 1]), L([IN[1] - 1, SEAT - 1], [IN[0] + 1, SEAT - 1])]
      : [L([IN[0] + 1, SEAT - 1], [IN[0] + 1, 11]), arc(AC[0], PR, 0, [BW[0] + 1, yc]), L([BW[0] + 1, yc], [BW[0] + 1, TOP + 2]),
         arc([BW[0] + 2, TOP + 2], 1, 180, [BW[0] + 2, TOP + 1]), L([BW[0] + 2, TOP + 1], [BW[1] - 2, TOP + 1]), arc([BW[1] - 2, TOP + 2], 1, 270, [BW[1] - 1, TOP + 2]),
         L([BW[1] - 1, TOP + 2], [BW[1] - 1, yc]), arc(AC[1], PR, ang(AC[1], [BW[1] - 1, yc]), [IN[1] - 1, 11]),
         L([IN[1] - 1, 11], [IN[1] - 1, SEAT - 1]), L([IN[1] - 1, SEAT - 1], [IN[0] + 1, SEAT - 1])];
    checkAt1([body.segs, lineSegsOf(back)], plate, 'sofa plate ' + key);
    checkAt1([body.segs, lineSegsOf(back)], open, 'sofa opening ' + key);
    const d = body.toString() + back + legs;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, open)), S(back + legs)];
  }
  assertBox('sofa', out, BOX);
  return out;
};
SETS.sofa = sofaArm(3);

/* ------------------------------------------------------------------ door */

/**
 * A closed door from the front: a leaf 6..18 by 3..21 on r=1 at the top
 * (a door's corners are square, and r=3 here is a phone), standing on a
 * threshold, with a lever handle 2 clear of the right wall.
 *
 * His ref of 11 Sep 2026, fitted, and it changes two things. The threshold
 * runs the full 2..22, so the drawing paints 1..23 by 2..22 rather than the
 * square 20: a floor that reaches past the frame is what says the door is
 * set in a wall. And the knob is a LEVER — a 2-unit stroke on x=14 from 11
 * to 13, painting the 2 by 4 capsule a round cap gives — where the first cut
 * had the bead of 3 the dot ladder offers. His file carries a second
 * threshold line from 5.333 to 18.667, coincident with both this one and the
 * leaf's own foot; it paints nothing and is dropped.
 *
 * The fill is the leaf solid with the handle knocked out as its outlined
 * run, and the threshold still stroked.
 */
SETS.door = () => {
  const BOX = [1, 2, 23, 22];
  const HANDLE = [[14, 11], [14, 13]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const leaf = polyContour([[6, 21], [6, 3], [18, 3], [18, 21]], [0, r, r, 0]);
    const floor = run([[2, 21], [22, 21]], sharp, [true, true], BOX);
    const handleSegs = lineSegs(sharp ? sharpen(HANDLE, [true, true], BOX) : HANDLE);
    const handle = contourPath(handleSegs, false);
    const plate = walk([[5, 22], [5, 2], [19, 2], [19, 22]], [0, 2, 2, 0], sharp);
    const d = leaf.toString() + floor + handle;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate.segs)), S(d)];
    out[`fill.${key}`] = [
      F_(contourPath(plate.segs) + hole(plate.segs, outlineRun(handleSegs, 1, sharp ? 'butt' : 'round'))),
      S(floor),
    ];
  }
  assertBox('door', out, BOX);
  return out;
};

/* ------------------------------------------------------------- door-open */

/**
 * ZAFAR'S DRAWING, 11 Sep 2026, fitted. The door stands open toward the
 * reader, hinged on the doorway's far jamb, and the pairing he asked for is
 * exact: the frame is the CLOSED door's own right wall, its r=1 top corner
 * and the start of its head — x=18 from 21 up to 3, running left to (14,3) —
 * and the threshold is the same y=21. Swap one drawing for the other and
 * only the leaf moves.
 *
 * The leaf is a trapezoid in perspective between the hinge on x=14 and the
 * free edge on x=6, the two converging equally about a horizon so the near
 * edge is 20.3 tall against the far edge's 15.7. Its near edge is what sets
 * the box: the bottom corner is a true point on (14,22), painting 23, and
 * the top corner's vertex is SOLVED so its r=1 arc lands on 1 — 1.68
 * rounded and the whole 2 sharp, since a true corner paints its round join a
 * clean unit out. So the drawing is 22 by 22 where the closed door is 22 by
 * 20, and that is the perspective rather than a mismatch: the leaf has swung
 * nearer than the doorway it came out of, so it paints larger.
 *
 * The threshold is CUT where the leaf's foot crosses it, at x=10.55, which
 * is the detail that puts the door in front of the floor rather than on it.
 * Its two cut ends are buried under the leaf and take no sharp extension.
 *
 * The handle is HIS, on x=11, and it is an exception written down rather
 * than a miss: the leaf's interior is 6 across, so centring the 2-unit lever
 * on 10 would clear both edges by the house 2, and he put it a unit off the
 * hinge edge instead because that is where a handle sits on a real door
 * (Zafar, 11 Sep 2026). It costs the SPACING warning at 1.00 that the icon
 * carries on purpose.
 *
 * A second warning rides with it, at 1.45 between the threshold's two
 * pieces. That is one element cut rather than two elements crowding — the
 * leaf's own foot paints across the gap — and is `globe-off`'s case.
 */
SETS['door-open'] = () => {
  const BOX = [1, 1, 23, 23];
  const HANDLE = [[11, 11], [11, 13]];
  const FAR = [6, 4, 19.68], NEAR = 14, FOOT = 22;      // x, top, bottom | hinge x | near foot
  // where the leaf's foot crosses the threshold, so the floor line can be cut
  const CUT = FAR[0] + (NEAR - FAR[0]) * (21 - FAR[2]) / (FOOT - FAR[2]);
  const leafAt = (top, r) => polyContour([[FAR[0], FAR[1]], [NEAR, top], [NEAR, FOOT], [FAR[0], FAR[2]]], [r, r, 0, r]);
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    // the near edge's top vertex, solved so the painted corner lands on ink 1
    const top = sharp ? 2 : solve((t) => leafAt(t, 1).d, (b) => b[1], 1, 1, 3);
    const leaf = leafAt(top, r);
    const frame = new Path().M([18, 21]).corner([18, 3], [14, 3], r).L([14, 3]).toString();
    const floor = run([[2, 21], [CUT, 21]], sharp, [true, false], BOX)
      + run([[NEAR, 21], [22, 21]], sharp, [false, true], BOX);
    const handleSegs = lineSegs(sharp ? sharpen(HANDLE, [true, true], BOX) : HANDLE);
    const handle = contourPath(handleSegs, false);
    const plate = plateOf(leaf.segs);
    const d = leaf.toString() + frame + floor + handle;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [
      F_(contourPath(plate) + hole(plate, outlineRun(handleSegs, 1, sharp ? 'butt' : 'round'))),
      S(frame + floor),
    ];
  }
  assertBox('door-open', out, BOX);
  return out;
};

/* ------------------------------------------------------------ brick-wall */

/**
 * Running bond in the house body: the r=3 box 3..21 with two courses of
 * mortar at y=9 and 15 (thirds, 4 of daylight a row) and the head joints
 * staggered: one at x=12 on the top and bottom courses, two at 7 and 17 on
 * the middle one, as far toward the walls as the 2-unit gap allows. Two
 * joints meeting one course from opposite sides need 4 between them for
 * their caps to clear by 2, which rules out three bricks a course over
 * two: joints at 9 and 15 against 7, 12 and 17 put caps 2 apart, touching.
 * Every joint ends on another's centre line. The fill slots
 * every joint out of the solid, each cut at the last's ink edge so no two
 * holes overlap: blocks parted by white are what say brickwork, where an
 * opened panel says `panel-left`.
 */
SETS['brick-wall'] = () => {
  const BOX = [2, 2, 22, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 3;
    const body = polyContour([[3, 3], [21, 3], [21, 21], [3, 21]], [r, r, r, r]);
    const plate = plateOf(body.segs);
    const joints = 'M3 9L21 9M3 15L21 15' +
      [[12, 3, 9], [7, 9, 15], [17, 9, 15], [12, 15, 21]]
        .map(([x, y0, y1]) => `M${x} ${y0}L${x} ${y1}`).join('');
    const slot = ([x0, y0, x1, y1]) => hole(plate, lineSegs([[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]));
    const slots = [[4, 8, 20, 10], [4, 14, 20, 16], [11, 4, 13, 8], [6, 10, 8, 14], [16, 10, 18, 14], [11, 16, 13, 20]]
      .map(slot).join('');
    const d = body.toString() + joints;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + slots)];
  }
  assertBox('brick-wall', out, BOX);
  return out;
};

/* ---------------------------------------------------------------- parked */

/**
 * The human figures, pulled out of the batch on Zafar's word of 11 Sep 2026:
 * "let's drop the humans for now", mars and venus expressly kept, since those
 * are symbols rather than people. Their drawings are gone from raw/, icons/
 * and the usage file, and their sets and Catalog rows are gone from Figma.
 *
 * The CODE stays, and so do its notes, because none of it was guessable and
 * all of it would have to be rediscovered: the width diagnosis that narrowed
 * the pair, the arms that cannot clear the legs' daylight or the skirt's
 * flare, the arithmetic that makes the baby's face the only face a ring of
 * 18 will hold, and `girl-2`'s arms leaving the skirt on a lerp rather than
 * a round number. A build with no arguments skips these; naming one still
 * draws it, so bringing any of them back is one command and a Figma push.
 */
const PARKED = new Set(['baby', 'boy', 'girl', 'children', 'baby-2', 'boy-2', 'girl-2']);

/* ------------------------------------------------------------------ main */

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  const names = want.length ? want : Object.keys(SETS).filter((n) => !PARKED.has(n));
  for (const name of names) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const variants = SETS[name]();
    writeSet(root, name, variants);
    const box = inkOf(variants['stroke.regular'], 'round');
    const sbox = inkOf(variants['stroke.sharp'], 'butt');
    console.log(name.padEnd(12), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
      ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
      ' sharp', sbox.map((v) => v.toFixed(2).padStart(6)).join(' '),
      ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS };
