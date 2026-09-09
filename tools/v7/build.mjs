/**
 * Emit the v0.7.0 drawings into raw/ (or --out=DIR/raw).
 *   node tools/v7/build.mjs [name ...] [--out=DIR]
 *
 * The square bubble family (message-square and its eight companions), and five
 * singles: qr-code, scan, scissors, hourglass, rocket. Every plate is an
 * offset checked sample by sample, every knockout is wound against its plate
 * and every sharp free end goes through `sharpEndIn`, so the two treatments
 * paint the same box.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, clipContour, clipByDistance, flatten } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, onArc, add, sub, mul, len, unit, dot } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { outlineRun, unionContours } from '../v6/outline.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });
const deg = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
const SQ2 = Math.SQRT2;

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
/** `segs` wound WITH `plateSegs`, so it paints beside it. */
const solid = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? segs : [...segs].reverse().map(reverseSeg));

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1);
  return off;
}
const circleSegs = (c, r) => [0, 90, 180, 270].map((a) => ({ type: 'A', c, r, a0: a, a1: a + 90 }));
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));
const runPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join('');
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}

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

/** The knockouts of a set of runs: crossing runs are unioned, the rest outlined one by one. */
function runHoles(plateSegs, runs, sharp, crossing = false) {
  const cap = sharp ? 'butt' : 'round';
  const segsOf = runs.map(lineSegs);
  if (!crossing) return segsOf.map((r) => hole(plateSegs, outlineRun(r, 1, cap))).join('');
  const loops = unionContours(segsOf.map((r) => outlineRun(r, 1, cap)), segsOf, 1, cap)
    .filter((l) => Math.abs(areaOf(flatten(l, 32))) > 0.01);
  if (loops.length !== 1) throw new Error(`crossing runs gave ${loops.length} loops`);
  return hole(plateSegs, loops[0]);
}

/** Every sample of `segs` sits `delta` from the source set, or a listed circle, or this throws. */
function checkPlate(source, segs, extras = [], tol = 0.003, faces = []) {
  // a butt cap's face runs from 1 off its cut down to 0 and back: not an offset
  const isFace = (s) => s.type === 'L' && faces.some((c) => [s.p0, s.p1].every((q) => Math.abs(len(sub(q, c)) - 1) < 1e-6));
  segs = segs.filter((s) => !isFace(s));
  const samples = (list, k) => {
    const pts = [];
    for (const s of list) for (let i = 0; i <= k; i++) {
      const t = i / k;
      pts.push(s.type === 'L' ? add(s.p0, mul(sub(s.p1, s.p0), t)) : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t));
    }
    return pts;
  };
  const src = samples(source, 400);
  const sample = samples(segs, 40);
  let worst = 0, at = null;
  for (const p of sample) {
    let m = Infinity;
    for (const q of src) m = Math.min(m, len(sub(p, q)));
    const ok = Math.abs(m - 1) < tol || extras.some(([c, r]) => Math.abs(len(sub(p, c)) - r) < tol);
    if (!ok && Math.abs(m - 1) > worst) { worst = Math.abs(m - 1); at = p; }
  }
  if (worst > 0) throw new Error(`plate off by ${worst.toFixed(4)} at ${at.map((v) => v.toFixed(3))}`);
}

const SETS = {};

/* ------------------------------------------------- the square bubble */

/**
 * A rounded rectangle whose bottom-left corner is drawn out into the tail: the
 * left wall runs on to (3,21) and comes back up at 45 degrees to the bottom
 * edge at (7,17). Body 3..21 by 3..17, so the whole thing paints 2..22 on both
 * axes, the square size. Three corners take the house r=3; the tail's two
 * vertices stay true, the way `message`'s own tail and `tag`'s point do, so
 * the ink lands on 22 exactly. Sharp takes the three fillets out and nothing
 * else: a closed body has no free end to square.
 */
const BUBBLE = [[3, 3], [21, 3], [21, 17], [7, 17], [3, 21]];
const bubble = (sharp) => polyContour(BUBBLE, sharp ? [0, 0, 0, 0, 0] : [3, 3, 3, 0, 0]);

/**
 * The signs sit inside the body at the full six units, as they do in the round
 * `message-*`, on a box 9..15 by 7..13: the bubble's own centre is (12,10), and
 * the walls' inner ink at 4 and 16 leaves the x exactly 2 above and below.
 */
const SIGN = {
  plus: { runs: [[[12, 7], [12, 13]], [[9, 10], [15, 10]]], crossing: true },
  minus: { runs: [[[9, 10], [15, 10]]] },
  check: { runs: [[[9, 10], [11, 12], [15, 8]]] },
  x: { runs: [[[9, 7], [15, 13]], [[15, 7], [9, 13]]], crossing: true },
  lines: { runs: [[[8, 8], [16, 8]], [[8, 12], [13, 12]]] },
};

function bubbleSet(sign) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = bubble(sharp);
    const pl = plateOf(body.segs);
    const runs = sign ? SIGN[sign].runs.map((r) => (sharp ? sharpen(r) : r)) : [];
    const d = body.toString() + runs.map(runPath).join('');
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(pl) + (sign ? runHoles(pl, runs, sharp, SIGN[sign].crossing) : ''))];
  }
  return out;
}
SETS['message-square'] = () => bubbleSet(null);
for (const s of Object.keys(SIGN)) SETS[`message-square-${s}`] = () => bubbleSet(s);

/* --------------------------------------------------- message-square-dot */

/**
 * The badge is the r=3 ring in the six-unit box flush with the body's ink
 * corner, so it is centred on (18,6) — which is also the centre of the body's
 * top-right fillet, so that whole corner goes. The stroke stops where its
 * centre line meets r=7 about the badge (a round cap is then tangent to r=6),
 * the plate is cut on r=6 and turns onto it on an r=1 arc about each cap, so
 * its corners sit exactly 1.000 from the cuts: `bell-dot`'s construction.
 *
 * Sharp: a butt cap is a bar, and its NEARER corner is what reaches the badge,
 * so the cut is where that corner lands on r=6, and the plate runs flush along
 * the bar's face and follows the circle between the two faces.
 */
const BADGE = [18, 6];
SETS['message-square-dot'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 3;
    // top-edge cut (xc, 3) and right-wall cut (21, yc)
    const xc = sharp ? 18 - Math.sqrt(36 - 4) : 18 - Math.sqrt(49 - 9);
    const yc = sharp ? 6 + Math.sqrt(36 - 4) : 6 + Math.sqrt(49 - 9);
    const body = new Path().M([xc, 3]).corner([3, 3], [3, 21], r).L([3, 21]).L([7, 17]).corner([21, 17], [21, 3], r).L([21, yc]);
    const ring = circlePath(BADGE, 3);
    const R = sharp ? 1 : 4;
    let plate;
    if (!sharp) {
      const E1 = [xc, 3], E2 = [21, yc];
      const T1 = add(E1, mul(sub(BADGE, E1), 1 / 7)), T2 = add(E2, mul(sub(BADGE, E2), 1 / 7));
      plate = new Path().M([xc, 2]).corner([2, 2], [2, 22], R).L([2, 21]).A([3, 21], 180, 45, -1).L([7 + 0.4142, 18])
        .corner([22, 18], [22, 2], R).L([22, yc])
        .A(E2, 0, deg(E2, T2), -1)
        .A(BADGE, deg(BADGE, T2), deg(BADGE, T1), 1)
        .A(E1, deg(E1, T1), 270, -1).Z();
    } else {
      plate = new Path().M([xc, 2]).corner([2, 2], [2, 22], R).L([2, 21]).A([3, 21], 180, 45, -1).L([7 + 0.4142, 18])
        .corner([22, 18], [22, 2], R).L([22, yc]).L([20, yc])
        .A(BADGE, deg(BADGE, [20, yc]), deg(BADGE, [xc, 4]), 1)
        .L([xc, 4]).Z();
    }
    // the plate hugs the uncut bubble at 1, except on the bite: r=6 about the
    // badge and, rounded, the two r=1 turns about the caps
    const cuts = [[xc, 3], [21, yc]];
    checkPlate(bubble(sharp).segs, plate.segs, [[BADGE, 6], [cuts[0], 1], [cuts[1], 1]], 0.003, cuts);
    const disc = circleSegs(BADGE, 4), holeSegs = circleSegs(BADGE, 2);
    const d = ring + body.toString();
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate.toString() + solid(plate.segs, disc)), S(d)];
    out[`fill.${key}`] = [F_(plate.toString() + solid(plate.segs, disc) + hole(plate.segs, holeSegs))];
  }
  return out;
};

/* --------------------------------------------------- message-square-off */

/**
 * The slash and its one-sided knockout, §8: write u = x - y. The base runs into
 * the slash and stops on its centre line (u <= 0) on the lower left, and stands
 * off 2 units of daylight (u >= 4 sqrt 2) on the upper right. Here the slash
 * passes through the top-left corner itself, so the left wall and the lower
 * half of that fillet are the near piece and the top edge resumes at
 * x = 3 + 4 sqrt 2; the right wall stops at y = 21 - 4 sqrt 2 = 15.34, which is
 * `file-off`'s constant since both walls sit on 21.
 *
 * Far side: plate only, the way `message-off` does it. Rounded, the far plate
 * is the silhouette clipped on u = 3 sqrt 2 and traced round each cap on r=1;
 * sharp, the ends are pushed a unit toward the slash and the plate is the
 * sharp silhouette clipped straight through the bars' nearer corners.
 */
const SL = [1, -1];
SETS['message-square-off'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = bubble(sharp);
    const pl = plateOf(body.segs);
    const near = clipContour(body.segs, [0, 0], SL, 0, -1)[0];
    const nearD = contourPath(near, false);
    let farD, farPlate;
    if (!sharp) {
      const far = clipContour(body.segs, [0, 0], SL, 4 * SQ2, 1)[0];
      farD = contourPath(far, false);
      const E1 = [3 + 4 * SQ2, 3];                       // top-edge cut
      // the right cut lands on the bottom-right fillet: solve its angle
      const C = [18, 14];
      let lo = 0, hi = 90;
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (dot(onArc(C, 3, m), SL) > 4 * SQ2) lo = m; else hi = m; }
      const th = (lo + hi) / 2, E2 = onArc(C, 3, th);
      const away = mul([1, -1], 1 / SQ2);                // toward the slash is -away
      const Tn1 = sub(E1, away), Tn2 = sub(E2, away);
      farPlate = new Path().M([E1[0], 2]).L([18, 2]).A([18, 6], 270, 360, 1).L([22, 14]).A(C, 0, th, 1)
        .A(E2, th, deg(E2, Tn2), 1).L(Tn1).A(E1, 135, 270, 1).Z();
      const onNotch = (s) => s.type === 'L' && [s.p0, s.p1].every((q) => Math.abs(dot(q, SL) - 3 * SQ2) < 1e-6);
      checkPlate(body.segs, farPlate.segs.filter((s) => !onNotch(s)), [[E1, 1], [E2, 1]], 0.003);
      // the notch is slash-parallel and sits 3 sqrt 2 out
      for (const q of [Tn1, Tn2]) if (Math.abs(dot(q, SL) - 3 * SQ2) > 1e-6) throw new Error('notch off the line');
    } else {
      const E1 = [3 + 4 * SQ2 - 1, 3], E2 = [21, 21 - 4 * SQ2 + 1];
      farD = runPath([E1, [21, 3], E2]);
      // the nearer butt corners, (E1x, 4) and (20, E2y), both sit on u = 3 + 4√2 - 4
      const cut = dot([E1[0], 4], SL);
      if (Math.abs(dot([20, E2[1]], SL) - cut) > 1e-9) throw new Error('sharp corners disagree');
      farPlate = { segs: clipContour(pl, [0, 0], SL, cut, 1)[0] };
      farPlate.toString = () => contourPath(farPlate.segs);
    }
    const nearPlate = contourPath(clipContour(pl, [0, 0], SL, 0, -1)[0]);
    const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
    out[`stroke.${key}`] = [S(nearD + farD + slash)];
    out[`duotone.${key}`] = [P(nearPlate + farPlate.toString()), S(nearD + slash)];
    out[`fill.${key}`] = [F_(nearPlate + farPlate.toString()), S(slash)];
  }
  return out;
};

/* ------------------------------------------------------ messages-square */

/**
 * Two square bubbles in conversation, `messages`' composition: the larger one
 * behind at the top left with its tail bottom-left, the reply in front at the
 * bottom right with its tail bottom-right. The one in front carries the plate;
 * the one behind is a bare stroke cut 2 clear of the front's ink, and in fill
 * it contributes its band. Both are the base bubble's construction at r=2,
 * which is the ladder's pick for a body under 16 that gains a fill.
 */
const BACK = [[3, 3], [16, 3], [16, 13], [6, 13], [3, 16]];
const FRONT = [[12, 10], [21, 10], [21, 21], [18, 18], [12, 18]];
SETS['messages-square'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const cap = sharp ? 'butt' : 'round';
    const front = polyContour(FRONT, sharp ? [0, 0, 0, 0, 0] : [2, 2, 0, 0, 2]);
    const back = polyContour(BACK, sharp ? [0, 0, 0, 0, 0] : [2, 2, 2, 0, 0]);
    const pl = plateOf(front.segs);
    // the back's path stays 3 from the front's plate: 2 of daylight past its own ink
    let run = clipByDistance(back.segs, flatten(pl, 24), 3)[0];
    if (sharp) {
      const first = run[0], last = run[run.length - 1];
      const ext = (s, atStart) => {
        if (s.type !== 'L') throw new Error('sharp cut end on an arc');
        const dir = atStart ? unit(sub(s.p0, s.p1)) : unit(sub(s.p1, s.p0));
        const p = atStart ? s.p0 : s.p1;
        const q = add(p, mul(dir, sharpEndIn(p, dir)));
        return atStart ? { ...s, p0: q } : { ...s, p1: q };
      };
      run = [ext(first, true), ...run.slice(1, -1), ext(last, false)];
    }
    const d = front.toString() + contourPath(run, false);
    const band = outlineRun(run, 1, cap);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(pl) + solid(pl, band))];
  }
  return out;
};

/* ------------------------------------------------------------- qr-code */

/**
 * Three finder squares, 6 on the path at r=1, painting 8 with a 4-unit well —
 * the interior floor, and the reason they carry no centre: a 2-unit mark in a
 * 4-unit well leaves 1 either side. The data lives in the free quadrant,
 * 12..22 square, on a pitch of 4 — marks of 2 and bars of 2 — so every gap in
 * the drawing is exactly 2.
 */
const FINDERS = [[3, 3], [15, 3], [3, 15]];
const QR_DOTS = [[13, 13], [13, 21], [17, 21]];
const QR_BARS = [[[17, 13], [21, 13]], [[13, 17], [17, 17]], [[21, 17], [21, 21]]];
SETS['qr-code'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const finders = FINDERS.map(([x, y]) => polyContour([[x, y], [x + 6, y], [x + 6, y + 6], [x, y + 6]], sharp ? [0, 0, 0, 0] : [1, 1, 1, 1]));
    const plates = finders.map((f) => plateOf(f.segs));
    const wells = FINDERS.map(([x, y]) => polyContour([[x + 1, y + 1], [x + 5, y + 1], [x + 5, y + 5], [x + 1, y + 5]], [0, 0, 0, 0]).segs);
    const bars = QR_BARS.map((b) => (sharp ? sharpen(b) : b)).map(runPath).join('');
    const dots = QR_DOTS.map((c) => circlePath(c, 1)).join('');
    const strokes = finders.map(String).join('') + bars;
    out[`stroke.${key}`] = [S(strokes), F_(dots)];
    out[`duotone.${key}`] = [P(plates.map(contourPath).join('')), S(strokes), F_(dots)];
    out[`fill.${key}`] = [F_(plates.map((p, i) => contourPath(p) + hole(p, wells[i])).join('') + dots), S(bars)];
  }
  return out;
};

/* ---------------------------------------------------------------- scan */

// `scan-face`'s four brackets, verbatim, with the face left out: the frame is
// the drawing. Stroke only, being an open glyph with no container.
SETS.scan = () => {
  const out = {};
  for (const key of ['regular', 'sharp']) {
    const src = readFileSync(`${ROOT}/raw/scan-face/Container=regular, Style=stroke, Corners=${key}.svg`, 'utf8');
    const d = /d="([^"]*)"/.exec(src)[1];
    const parts = d.split(/(?=M)/);
    if (parts.length < 5) throw new Error('scan-face has changed shape');
    out[`stroke.${key}`] = [S(parts.slice(0, 4).join(''))];
  }
  return out;
};

/* ------------------------------------------------------------ scissors */

/**
 * Two r=3 handle rings at (6,18) and (18,18) — the badge ring, painting 8, so
 * the pair sit exactly 2 apart — and two blades leaving each ring at its inner
 * 45-degree point for the opposite top corner, tips on y=3. The whole thing
 * paints 2..22. The blade rising left to right is whole, the free diagonal's
 * direction; the other is the one cut at the pivot, `shuffle`'s rule with the
 * house 2: it ends ON the front blade's centre line below the pivot, where its
 * cap is buried, and resumes above it with its ink 2 clear.
 */
SETS.scissors = () => {
  const out = {};
  const RA = [6, 18], RB = [18, 18], TA = [17, 3], TB = [7, 3];
  const A0 = add(RA, mul([1, -1], 3 / SQ2)), B0 = add(RB, mul([-1, -1], 3 / SQ2));
  // the pivot: A and B are mirror images about x = 12
  const ua = unit(sub(TA, A0)), ub = unit(sub(TB, B0));
  const tP = (12 - A0[0]) / ua[0];
  const PV = add(A0, mul(ua, tP));
  const cross = Math.abs(ua[0] * ub[1] - ua[1] * ub[0]);   // sin of the crossing angle
  const reach = 4 / cross;                                 // 1 + 2 + 1, measured along B
  const B2 = add(PV, mul(ub, reach));
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const box = [2, 2, 22, 22];
    const a = sharp ? sharpen([A0, TA], [false, true], box) : [A0, TA];
    const b1 = [B0, PV];                                    // both ends land on ink
    const b2 = sharp ? sharpen([B2, TB], [true, true], box) : [B2, TB];
    const blades = runPath(a) + runPath(b1) + runPath(b2);
    const rings = circlePath(RA, 3) + circlePath(RB, 3);
    const discs = [RA, RB].map((c) => circleSegs(c, 4));
    const holes = [RA, RB].map((c) => circleSegs(c, 2));
    out[`stroke.${key}`] = [S(rings + blades)];
    out[`duotone.${key}`] = [P(discs.map(contourPath).join('')), S(rings + blades)];
    out[`fill.${key}`] = [F_(discs.map((d, i) => contourPath(d) + hole(d, holes[i])).join('')), S(blades)];
  }
  return out;
};

/* ----------------------------------------------------------- hourglass */

/**
 * Two bulbs tip to tip at (12,12) under a bar top and bottom, 18 by 22, the
 * vertical size. Each bulb is closed along the bar, under it, the way `podium`
 * closes its stairs along the ground: that is what gives the drawing a
 * region to fill without adding a line. Shoulders r=2; the waist is a true
 * vertex where four diagonals meet, so the round join is the neck.
 *
 * The plate is the union silhouette drawn as one contour, since two bulb plates
 * would overlap at the waist and an overlap cancels under Figma's evenodd.
 * Its vertices are the bulb edges offset a unit; the waist crossings and the
 * bar-to-wall corners are reflex and stay true. Fill opens the upper bulb and
 * leaves the lower one solid: the sand has run down.
 */
SETS.hourglass = () => {
  const out = {};
  const dg = unit([6, 5]);                     // the diagonal's direction, (18,7) -> (12,12)
  const nrm = [dg[1], -dg[0]];                 // its outward normal on the right side, (5,6)/|..| with sign
  const off = (p, k) => add(p, mul([Math.abs(nrm[0]), Math.abs(nrm[1])], k));
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const top = polyContour([[6, 2], [6, 7], [12, 12], [18, 7], [18, 2]], [0, r, 0, r, 0]);
    const bot = polyContour([[6, 22], [6, 17], [12, 12], [18, 17], [18, 22]], [0, r, 0, r, 0]);
    const bars = sharp ? 'M3 2L21 2M3 22L21 22' : 'M4 2L20 2M4 22L20 22';
    const barSegs = sharp
      ? [...lineSegs([[3, 2], [21, 2]]), ...lineSegs([[3, 22], [21, 22]])]
      : [...lineSegs([[4, 2], [20, 2]]), ...lineSegs([[4, 22], [20, 22]])];
    // outer offset of the right diagonal: through (18,7) + n, direction (-6,5)
    const O = off([18, 7], 1);
    const yWall = O[1] + ((19 - O[0]) / -6) * 5;       // where it meets x = 19
    const xWaist = O[0] + ((12 - O[1]) / 5) * -6;      // where it meets y = 12
    const R = r + 1;
    const p = new Path().M([5, 3]).L([4, 3]);
    if (sharp) p.L([3, 3]).L([3, 1]).L([21, 1]).L([21, 3]); else p.A([4, 2], 90, 270, 1).L([20, 1]).A([20, 2], 270, 450, 1);
    p.L([19, 3]).corner([19, yWall], [xWaist, 12], R).L([xWaist, 12]).corner([19, 24 - yWall], [19, 21], R).L([19, 21]);
    if (sharp) p.L([21, 21]).L([21, 23]).L([3, 23]).L([3, 21]); else p.L([20, 21]).A([20, 22], 270, 450, 1).L([4, 23]).A([4, 22], 90, 270, 1);
    p.L([5, 21]).corner([5, 24 - yWall], [24 - xWaist, 12], R).L([24 - xWaist, 12]).corner([5, yWall], [5, 3], R).Z();
    checkPlate([...top.segs, ...bot.segs, ...barSegs], p.segs, [], 0.003, sharp ? [[3, 2], [21, 2], [3, 22], [21, 22]] : []);
    // the upper bulb's well: the ink's inner edges, shoulders at r - 1
    const I = off([18, 7], -1);
    const yIn = I[1] + ((17 - I[0]) / -6) * 5, yTip = I[1] + ((12 - I[0]) / -6) * 5;
    const well = polyContour([[7, 3], [7, yIn], [12, yTip], [17, yIn], [17, 3]], [0, Math.max(0, r - 1), 0, Math.max(0, r - 1), 0]);
    checkPlate([...top.segs, ...barSegs], well.segs);
    const d = bars + top.toString() + bot.toString();
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(p.toString()), S(d)];
    out[`fill.${key}`] = [F_(p.toString() + hole(p.segs, well.segs))];
  }
  return out;
};

/* -------------------------------------------------------------- rocket */

/**
 * Upright, 18 by 22. The body is a bullet: walls at 7 and 17 from y=9 down to a
 * base at 18 on r=2 corners, and above 9 two arcs of one radius tangent to the
 * walls and meeting at a true point on (12,2), so the nose is one curve into
 * the wall with no corner. A bead window, painting 3, sits 2.5 clear of the
 * walls; the fins are single strokes off the walls to 2 below the base,
 * because a fin small enough for this canvas has no interior to show; and the
 * exhaust is a bar 2 under the base, so the whole thing paints 1..23 tall.
 */
SETS.rocket = () => {
  const out = {};
  const R = Math.sqrt(2.4 * 2.4 + 49);          // through (12,2), tangent to x=17 at (17,9)
  const CR = [17 - R, 9], CL = [7 + R, 9];
  const aTipR = deg(CR, [12, 2]), aTipL = deg(CL, [12, 2]);
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const body = new Path().M([12, 2]).A(CR, aTipR, 0, 1).L([17, 9]).corner([17, 18], [7, 18], r).corner([7, 18], [7, 9], r).L([7, 9]).A(CL, 180, aTipL, 1).Z();
    const pl = plateOf(body.segs);
    const box = [3, 1, 21, 23];
    const fins = [[[7, 15], [4, 19]], [[17, 15], [20, 19]]].map((f) => (sharp ? sharpen(f, [false, true], box) : f)).map(runPath).join('');
    const bar = sharp ? 'M8 22L16 22' : 'M9 22L15 22';
    const bead = circlePath([12, 10], 1.5);
    const d = body.toString() + fins + bar;
    out[`stroke.${key}`] = [S(d), F_(bead)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d), F_(bead)];
    out[`fill.${key}`] = [F_(contourPath(pl) + hole(pl, circleSegs([12, 10], 1.5))), S(fins + bar)];
  }
  return out;
};

/* ------------------------------------------------------------------ main */

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
