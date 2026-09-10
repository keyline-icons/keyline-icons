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
import { arcThrough } from '../v6/icons.mjs';
import { outlineRun, unionContours } from '../v6/outline.mjs';
import { offsetPath, verify as verifyCubic } from '../v6/offset-cubic.mjs';
import { strokedBBox, outlines } from '../../pipeline/lib/geom.mjs';

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
 * Zafar's redraw, 10 Sep 2026, fitted rather than re-derived: three finder
 * squares at the top-left, top-right and bottom-right, two connector elbows
 * running out of the middle, two bars and three cells. Every gap in it is
 * exactly 2.00 and the ink is 2..22 in both axes, so the only thing that
 * needed changing was the corner radius.
 *
 * **His finders came in at r = 0.8333 and ship at 1.** Five sixths is not on
 * the ladder, and the ladder is not a preference here: a filled style adds a
 * unit to every radius, and only 0.5, 1, 2, 3 and 4 survive that step. At 1
 * the corner is the same corner the previous finders used and the extents do
 * not move, since a radius only ever pulls a corner in.
 *
 * The rest is his. The elbows turn on r=2 with three units of run either side,
 * the cells are marks on the dot ladder, and the third finder sits bottom
 * RIGHT rather than bottom left, which is his call about what the pattern
 * looks like rather than a scannable code.
 */
const QR = {
  finders: [[3, 3], [16, 3], [16, 16]],            // 5 on the path, painting 7
  elbows: [[[12, 7], [12, 12], [17, 12]], [[12, 21], [12, 16], [7, 16]]],
  bars: [[[8, 12], [3, 12]], [[3, 16], [3, 21]]],
  cells: [[21, 12], [7, 21], [12, 3]],
};

/** A run with one filleted turn, whose two free ends square up in sharp. */
function qrElbow([a, v, b], sharp) {
  const out = (p) => (sharp ? add(p, mul(unit(sub(p, v)), sharpEndIn(p, unit(sub(p, v))))) : p);
  const A = out(a), B = out(b);
  return new Path().M(A).corner(v, B, sharp ? 0 : 2).L(B).toString();
}

SETS['qr-code'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const finders = QR.finders.map(([x, y]) =>
      polyContour([[x, y], [x + 5, y], [x + 5, y + 5], [x, y + 5]], sharp ? [0, 0, 0, 0] : [1, 1, 1, 1]));
    const plates = finders.map((f) => plateOf(f.segs));
    const runs = QR.elbows.map((e) => qrElbow(e, sharp)).join('')
      + QR.bars.map((b) => scanRun(b, sharp)).join('');
    const cells = QR.cells.map((c) => scanCell(c, sharp)).join('');
    const strokes = finders.map(String).join('') + runs;
    out[`stroke.${key}`] = [S(strokes), F_(cells)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(strokes), F_(cells)];
    // a finder fills to the solid block: a ring's counter is not interior
    // detail, and knocking it out leaves the filled style painting the stroke
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('') + cells), S(runs)];
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
    out[`duotone.${key}`] = [P(discs.map((c) => contourPath(c)).join('')), S(rings + blades)];
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


/* ----------------------------------------------- scissors, horizontal */

/**
 * The same scissors turned a quarter turn clockwise, rings on the left and
 * blades opening to the right, which is the direction `bar-chart-horizontal`
 * and `tag-horizontal-start` already read in.
 *
 * The construction is not rotated; its SEED POINTS are, and the drawing is
 * then built in the rotated frame. Turning the emitted path instead means
 * turning arcs, whose sweep direction a coordinate swap silently inverts, and
 * it is the same class of mistake as translating a path with a regex over its
 * numbers. Rotating the seeds costs one helper and cannot go wrong quietly.
 *
 * The clamp box is the icon's own 2..22 square, which is symmetric under the
 * quarter turn, so a sharp end solved before the rotation is the same end
 * after it.
 */
const rot90 = (p) => [24 - p[1], p[0]];

function scissorsGeom(sharp) {
  const RA = [6, 18], RB = [18, 18], TA = [17, 3], TB = [7, 3];
  const A0 = add(RA, mul([1, -1], 3 / SQ2)), B0 = add(RB, mul([-1, -1], 3 / SQ2));
  const ua = unit(sub(TA, A0)), ub = unit(sub(TB, B0));
  const PV = add(A0, mul(ua, (12 - A0[0]) / ua[0]));
  const cross = Math.abs(ua[0] * ub[1] - ua[1] * ub[0]);   // sin of the crossing angle
  const B2 = add(PV, mul(ub, 4 / cross));                  // 1 + 2 + 1, measured along B
  const box = [2, 2, 22, 22];
  return {
    rings: [RA, RB],
    // the whole blade is free at the tip; the cut blade's lower end is buried
    // in the front blade's ink and the front blade's own lower end is its ring
    runs: [
      sharp ? sharpen([A0, TA], [false, true], box) : [A0, TA],
      [B0, PV],
      sharp ? sharpen([B2, TB], [true, true], box) : [B2, TB],
    ],
  };
}

function scissorsSet(horizontal) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const g = scissorsGeom(sharp);
    const turn = (p) => (horizontal ? rot90(p) : p);
    const rings = g.rings.map(turn);
    const blades = g.runs.map((r) => runPath(r.map(turn))).join('');
    const ringPath = rings.map((c) => circlePath(c, 3)).join('');
    const discs = rings.map((c) => circleSegs(c, 4));
    const holes = rings.map((c) => circleSegs(c, 2));
    out[`stroke.${key}`] = [S(ringPath + blades)];
    out[`duotone.${key}`] = [P(discs.map((c) => contourPath(c)).join('')), S(ringPath + blades)];
    out[`fill.${key}`] = [F_(discs.map((d, i) => contourPath(d) + hole(d, holes[i])).join('')), S(blades)];
  }
  return out;
}
SETS.scissors = () => scissorsSet(false);
SETS['scissors-horizontal'] = () => scissorsSet(true);

/* ------------------------------------------------------- the scan family */

/**
 * Everything in the family is the same four corner brackets with something
 * different inside, so the frame is READ from `scan-face` rather than restated
 * — one source, and a change to the brackets carries to all of them.
 *
 * What the interior may occupy is set by the brackets' arms rather than by the
 * canvas. An arm paints a stadium 2 units deep reaching 9 units along each
 * edge, so at the frame's own midlines there is no bracket ink at all, and the
 * clearance an interior owes is measured against the arms and their end caps.
 * Every interior below lands on exactly 2.00 at its tightest, which is why the
 * rules run to 7 and 17 and the barcode's bars stand on 7, 11 and 17.
 *
 * Obligation is derived here as everywhere else, so the family is deliberately
 * mixed: a rule, a line of text and a barcode enclose nothing and ship stroke
 * only, like `scan` and `scan-face`; an eye, a lens, a heart and a finder
 * square each close a region and owe all three styles for it.
 */
function scanFrame(sharp) {
  const src = readFileSync(`${ROOT}/raw/scan-face/Container=regular, Style=stroke, Corners=${sharp ? 'sharp' : 'regular'}.svg`, 'utf8');
  const parts = /d="([^"]*)"/.exec(src)[1].split(/(?=M)/);
  if (parts.length < 5) throw new Error('scan-face has changed shape');
  return parts.slice(0, 4).join('');
}

/** A rule or bar inside the frame: both ends free, so both square up in sharp. */
const scanRun = (pts, sharp, ends = [true, true]) => runPath(sharp ? sharpen(pts, ends) : pts);

/** A filled cell: a mark on the dot ladder, a disc rounded and a square sharp. */
const scanCell = ([x, y], sharp) => (sharp
  ? contourPath(polyContour([[x - 1, y - 1], [x + 1, y - 1], [x + 1, y + 1], [x - 1, y + 1]], [0, 0, 0, 0]).segs)
  : circlePath([x, y], 1));

/** Stroke-only members: the frame plus open runs. */
const scanOpen = (runs) => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(scanFrame(sharp) + runs.map((r) => scanRun(r, sharp)).join(''))];
  }
  return out;
};

// A beam across the whole scan area rather than a short mark inside it: the
// rule's caps land level with the frame's own side arms and clear them by
// exactly 2, so the icon keeps `scan`'s 20 x 20 ink box.
SETS['scan-line'] = () => scanOpen([[[3, 12], [21, 12]]]);

// Three rules on the frame's own 4-unit rhythm, left-aligned on 7 where the
// side arms allow nothing closer, and running 10, 8 and 6 so the block reads
// as text trailing off rather than as a comb.
SETS['scan-text'] = () => scanOpen([[[7, 8], [17, 8]], [[7, 12], [15, 12]], [[7, 16], [13, 16]]]);

// Bars at 7, 11 and 17: the arms fix the outer two, and the third stands off
// centre because evenly spaced bars read as a comb and a barcode is uneven.
SETS['scan-barcode'] = () => scanOpen([[[7, 7], [7, 17]], [[11, 7], [11, 17]], [[17, 7], [17, 17]]]);

/**
 * The lens is r=3 about (11,11) and the handle runs to (16,16), which puts the
 * magnifier's own ink on 7..17 in both axes — centred in the frame, where
 * hanging the handle off a centred lens would sit the whole mark low and right.
 * The handle's upper end is buried in the lens, so only its tip squares up.
 */
SETS['scan-search'] = () => {
  const C = [11, 11], R = 3;
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const handle = sharp ? sharpen([[13, 13], [16, 16]], [false, true]) : [[13, 13], [16, 16]];
    const lens = circlePath(C, R);
    const disc = circleSegs(C, R + 1);
    const d = scanFrame(sharp) + lens + runPath(handle);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(disc)), S(d)];
    // the lens fills; the frame and the handle stay strokes over it, which is
    // `lock`'s pattern — the filled region is one part of the object
    out[`fill.${key}`] = [F_(contourPath(disc)), S(scanFrame(sharp) + runPath(handle))];
  }
  return out;
};

/**
 * An almond of half-width 6 and half-height 5 about (12,12), drawn as our own
 * `eye` is: two circular arcs meeting at true cusps, each through the tips and
 * the crown. The centre offset falls out of the two, `u = (a² - b²) / 2b`.
 *
 * The pupil is a filled bead rather than `eye`'s ring, and that is arithmetic
 * rather than a liberty. A ring needs its own daylight: the lid's inner ink
 * sits at `b - 1` from the centre and a ring of path radius p paints to p + 1,
 * so `b - p >= 4`, and at b = 5 that leaves p = 1, which paints a solid 4
 * across and is off the dot ladder. A bead of 3 clears the lid by 2.5.
 */
SETS['scan-eye'] = () => {
  const a = 6, b = 5, c = [12, 12];
  const u = (a * a - b * b) / (2 * b);
  const ang = (o, p) => deg(o, p);
  const top = [c[0], c[1] + u], bot = [c[0], c[1] - u];
  const L = [c[0] - a, c[1]], Rt = [c[0] + a, c[1]];
  const almond = new Path().M(L)
    .A(top, ang(top, L), ang(top, Rt), 1)
    .A(bot, ang(bot, Rt), ang(bot, L), 1)
    .Z();
  const plate = plateOf(almond.segs);
  const pupil = circlePath(c, 1.5);
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // a cusp is already a point and there is no free end, so the eye itself is
    // one drawing in both treatments, exactly as `eye` and `heart` are
    const d = scanFrame(sharp) + almond.toString();
    out[`stroke.${key}`] = [S(d), F_(pupil)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(pupil)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, circleSegs(c, 1.5))), S(scanFrame(sharp))];
  }
  return out;
};

/**
 * HELD, not shipped. The drawing is right and its PLATE is not: it measures
 * 0.317 from its own stroke where a plate is 1.000, because `offsetPath`
 * bridges a reflex corner with a straight run between the two untrimmed
 * offsets instead of trimming both to their crossing, and the heart's top
 * notch is the deepest reflex corner anything here has asked it for. The
 * shipped `heart` measures 0.998 and is the control that proves it.
 *
 * `verify` did not catch it because it RETURNS a verdict rather than throwing,
 * and every call site here and in v6 drops the return on the floor. Fixing the
 * offsetter is the real repair and it moves shipped drawings, so it is not
 * being done in the middle of a review.
 *
 * Our own heart at half size about the centre. A heart is free curves with no
 * fillet on the ladder and no internal daylight to lose, so unlike a glyph
 * built on the gap rule it scales honestly; the tips land on 7 and 17 and the
 * crown and point on half units, which is what a 20 x 18 form does when halved.
 */
const HELD_scanHeart = () => {
  const src = readFileSync(`${ROOT}/icons/stroke/heart.svg`, 'utf8');
  const d0 = /d="([^"]*)"/.exec(src)[1];
  const half = d0.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) =>
    `${num(12 + (Number(x) - 12) / 2)} ${num(12 + (Number(y) - 12) / 2)}`);
  const plate = offsetPath(half, 1);
  verifyCubic(half, plate, 1);
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const d = scanFrame(sharp) + half;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate), S(scanFrame(sharp))];
  }
  return out;
};

/**
 * Zafar's redraw, 10 Sep 2026, fitted. The interior is his own `qr-code`
 * reduced rather than a second opinion about what a QR code looks like: both
 * elbows and the left bar are `QR.elbows` and `QR.bars[0]` unchanged, and the
 * two cells that survive sit on `QR.cells`' own positions.
 *
 * The drawing he handed over put those two cells half a unit inboard, at
 * 11.5,3 and 20.5,12, which leaves 1.5 of daylight against the bracket and
 * against the elbow's cap where the house asks 2. Both snap onto the cell his
 * `qr-code` already uses, and at 12,3 and 21,12 every gap in the drawing
 * measures exactly 2. Nothing else moved: the third cell and the two short
 * bars are his, half units and all, and they clear everything by 2.5.
 *
 * It is STROKE ONLY, and that is the redraw's own doing. Nothing in it closes
 * now that the finder square is gone, and an open glyph with no container owes
 * no duotone and no fill.
 */
SETS['scan-qr-code'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const runs = qrElbow(QR.elbows[0], sharp)
      + qrElbow(QR.elbows[1], sharp)
      + scanRun(QR.bars[0], sharp)
      + scanRun([[7.5, 7], [7.5, 8]], sharp)
      + scanRun([[16.5, 16], [16.5, 17]], sharp);
    const cells = scanCell([12, 3], sharp) + scanCell([21, 12], sharp) + scanCell([16.5, 7.5], sharp);
    out[`stroke.${key}`] = [S(scanFrame(sharp) + runs), F_(cells)];
  }
  return out;
};


/* ------------------------------------------------------------ the slash */

/**
 * A bare diagonal, and the same diagonal inside each container.
 *
 * The set has no separate `square-slash` or `circle-slash` to draw: a
 * container is a variant property here, so one drawing with three Container
 * values is the whole family. The bare one runs corner to corner and paints
 * 1..23, which is the circle size and what every full-bleed diagonal in the
 * set already measures; the contained one is `x`'s own falling bar, so the
 * two icons cannot drift apart.
 *
 * **It runs "/" and `ban` runs "\", and that is the rule rather than a
 * coincidence.** A free diagonal runs bottom-left to top-right, and negation
 * is the one case that runs the other way. So a slash is a separator, a
 * divide, an "or"; `ban`'s falling chord is the prohibition sign, and its
 * chord spans the whole ring where this one is a mark inside it. Nothing else
 * separates the two at 16px, which is why the direction is not negotiable.
 *
 * The container geometry is READ from `raw/x` rather than restated, for the
 * same reason the scan frame is read from `scan-face`.
 */
const xPath = (container, style, corners, index) => {
  const f = `${ROOT}/raw/x/Container=${container}, Style=${style}, Corners=${corners}.svg`;
  const subs = [...readFileSync(f, 'utf8').matchAll(/d="([^"]*)"/g)].map((m) => m[1]);
  return subs[index];
};

/** Wind `segs` against a plate given only the plate's PATH, by signed area. */
const holeAgainst = (plateD, segs) => {
  const area = (pts) => {
    let a = 0;
    for (let i = 0; i < pts.length; i++) { const q = pts[i], r = pts[(i + 1) % pts.length]; a += q[0] * r[1] - r[0] * q[1]; }
    return a;
  };
  const plate = outlines(plateD)[0];
  const wound = Math.sign(area(plate)) === Math.sign(area(flatten(segs, 24)))
    ? [...segs].reverse().map((g) => (g.type === 'L' ? { type: 'L', p0: g.p1, p1: g.p0 } : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 }))
    : segs;
  return contourPath(wound);
};

SETS.slash = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const corners = sharp ? 'sharp' : 'regular';
    const cap = sharp ? 'butt' : 'round';
    // the bare mark, and the contained one, which is x's falling bar
    const bare = sharp ? sharpen([[2, 22], [22, 2]]) : [[2, 22], [22, 2]];
    const mark = sharp ? sharpen([[15, 9], [9, 15]]) : [[15, 9], [9, 15]];
    // it IS x's bar, or the two icons have quietly drifted
    const want = xPath('circle', 'stroke', corners, 1).split(/(?=M)/)[1];
    if (runPath(mark) !== want) throw new Error(`slash is not x's bar: ${runPath(mark)} vs ${want}`);

    out[`regular.stroke.${key}`] = [S(runPath(bare))];
    for (const container of ['square', 'circle']) {
      const ring = xPath(container, 'stroke', corners, 0);
      const plate = xPath(container, 'duotone', corners, 0);
      const band = outlineRun(lineSegs(mark), 1, cap);
      out[`${container}.stroke.${key}`] = [S(ring + runPath(mark))];
      out[`${container}.duotone.${key}`] = [P(plate), S(runPath(mark))];
      out[`${container}.fill.${key}`] = [F_(plate + holeAgainst(plate, band))];
    }
  }
  return out;
};


/* ------------------------------------------------------- search-slash */

/**
 * The `/` inside the glass, and it is one bar of `search-x` rather than a new
 * mark: the lens, the handle and the muted disc are all READ from that icon,
 * so the family cannot drift and the sign is the same sign at the same size.
 * `slash` is half of `x` for the same reason one step up.
 *
 * The sign's endpoints sit exactly 3 from the lens centre, which is the whole
 * of what the glass allows — inner ink edge at 6, the house gap takes 2 and
 * the sign's own ink takes 1 — so a diagonal is the one sign that reaches that
 * limit rather than stopping short of it, and this is that diagonal.
 *
 * It runs bottom-left to top-right, the free diagonal's direction, and that
 * is what makes it a `/` rather than a negation: a slash cutting the whole
 * drawing is the `-off` family's mark and means the capability is off, where
 * this one is a character inside the field the way `/` opens a search.
 *
 * `search-2-slash` is NOT drawn. Every other sign in this family has a
 * `search-2` twin, so the two families are asymmetric until someone says
 * whether the slash earns one.
 */
const searchPart = (style, corners, index) => {
  const f = `${ROOT}/raw/search-x/Container=regular, Style=${style}, Corners=${corners}.svg`;
  const paths = [...readFileSync(f, 'utf8').matchAll(/d="([^"]*)"/g)].map((m) => m[1]);
  return paths[index];
};

SETS['search-slash'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const corners = sharp ? 'sharp' : 'regular';
    // search-x's stroke is lens, handle, then its two bars; the "/" is the last
    const subs = searchPart('stroke', corners, 0).split(/(?=M)/);
    if (subs.length !== 4) throw new Error(`search-x is not lens+handle+two bars: ${subs.length} subpaths`);
    const [lens, handle, , bar] = subs;
    // and it is the bar that RISES, or the sign is a negation rather than a slash
    const pts = bar.match(/-?\d*\.?\d+/g).map(Number);
    if (!(pts[0] > pts[2] && pts[1] < pts[3])) throw new Error(`that bar falls, it does not rise: ${bar}`);
    const disc = searchPart('duotone', corners, 0);
    const segs = [{ type: 'L', p0: [pts[0], pts[1]], p1: [pts[2], pts[3]] }];
    const band = outlineRun(segs, 1, sharp ? 'butt' : 'round');
    const d = lens + handle + bar;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(disc), S(d)];
    // the lens fills and the handle stays a stroke over it, as search-x does
    out[`fill.${key}`] = [F_(disc + holeAgainst(disc, band)), S(handle)];
  }
  return out;
};


/* ------------------------------------------------------- the chart family */

/**
 * Seven plots on one axis, and a pie that has none. `chart-spline` was drawn
 * with them and dropped on his word.
 *
 * The axis is the family's frame the way the brackets are the scan family's:
 * an L from (3,3) down to the corner and out to (21,21), turning on r=2, both
 * ends free so both square up in sharp. It paints x 2..4 up the left and
 * y 20..22 along the foot, which is what fixes the plot area — everything
 * inside clears those by the house 2, so a plot lives in x 6..22 by y 2..18
 * and every drawing below is composed inside that box.
 *
 * **What is NOT here is as deliberate as what is.** Lucide's `chart-no-axes-*`
 * icons are this set's `bar-chart` family already: their `chart-no-axes-column`
 * is three bars on no axis, which is `bar-chart-2`, and the increasing and
 * decreasing pair are `bar-chart` and `bar-chart-down`. Drawing them again
 * under a second name is the `ticket-slash` mistake — see *Compare a variant
 * against its own family*. What the axis versions add is the axis, which the
 * set genuinely did not have, so `chart-column` and `chart-bar` are the same
 * bars WITH one and are their own drawings rather than duplicates.
 *
 * `chart-pie` is the one with no axis, and the collision to check there is not
 * Lucide's but our own: `circle-quarter` is a ring with a wedge INSET by four
 * units, a level indicator. A pie's slice reaches the rim, which is a different
 * drawing and reads as one.
 *
 * **These are Zafar's drawings, redrawn 10 Sep 2026**, and they replaced a set
 * scaled off `bar-chart` that had itself replaced Lucide's coordinates. His
 * plot runs on a 5 pitch rather than the 7 the scaling gave, which is 3 units
 * of daylight between bars instead of 5 and holds together at 16. Only the
 * arithmetic was ours: a collinear cubic written as the line it paints, two
 * polyline vertices read off their exact y values, and one sharp end clamped to
 * the box its rounded sibling paints.
 */
const AXIS = (sharp) => qrElbow([[3, 3], [3, 21], [21, 21]], sharp);
const bars = (runs, sharp) => runs.map((r) => scanRun(r, sharp)).join('');

/** Stroke-only members: the axis plus open runs. */
const chartOpen = (runs) => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(AXIS(sharp) + bars(runs, sharp))];
  }
  return out;
};

/**
 * ZAFAR'S REDRAW, 10 Sep 2026, fitted. He tightened the plot from a 7 pitch to
 * a 5, which puts three bars in the same box with 3 units of daylight instead
 * of 5 and reads better at 16 than the scaled `bar-chart` did.
 *
 * The axis is unchanged. It paints x 2..4 up the left and y 20..22 along the
 * foot, so a plot lives in x 6..22 by y 2..18 and everything below clears the
 * axis by the house 2 and its neighbours by 3.
 *
 * The only thing his files needed was arithmetic. `chart-bar`'s top rule was a
 * cubic whose control points are collinear, which paints as a straight line and
 * stores as a curve, so it is written as one; and `chart-line`'s two interior
 * vertices sat at x 9.154 and 18.577 where his y values were exactly 12 and 11,
 * so they are read as 9 and 19.
 */
SETS['chart-column'] = () => chartOpen([[[8, 17], [8, 8]], [[13, 17], [13, 11]], [[18, 17], [18, 5]]]);

// The same three readings lying down, every bar starting on 7, two clear of
// the upright.
SETS['chart-bar'] = () => chartOpen([[[7, 7], [16, 7]], [[7, 12], [13, 12]], [[7, 17], [19, 17]]]);

// A gantt is the one chart whose bars do not share a start: equal runs of 6,
// each 3 further along than the last, so consecutive rows overlap in x the way
// scheduled work does.
SETS['chart-gantt'] = () => chartOpen([[[7, 7], [13, 7]], [[10, 12], [16, 12]], [[13, 17], [19, 17]]]);

/**
 * The reading as a line: a steep rise, a long plateau and a steep rise, turning
 * on r=1 at both vertices. A chart's peaks are readings rather than corners, so
 * this is the one drawing in the family where that is a judgement call, and his
 * answer is to round them.
 */
SETS['chart-line'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    // The end at 21,5 climbs at 72 degrees, so its butt cap's far corner runs
    // ahead of the round cap's disc: the angle rule alone puts it on 22.18
    // where the rounded drawing stops at 22. Clamping to the drawing's OWN
    // painted box rather than the canvas costs that end most of its reach,
    // which is the trade the set already makes on 25 names.
    const BOX = [2, 2, 22, 22];
    const A = sharp ? sharpen([[7, 17], [9, 12]], [true, false], BOX)[0] : [7, 17];
    const B = sharp ? sharpen([[19, 11], [21, 5]], [false, true], BOX)[1] : [21, 5];
    const d = new Path().M(A).corner([9, 12], [19, 11], r).corner([19, 11], B, r).L(B).toString();
    out[`stroke.${key}`] = [S(AXIS(sharp) + d)];
  }
  return out;
};

/**
 * THE REST OF THE FAMILY, on his plot and his ladder.
 *
 * His `chart-column` plots painted heights of 11, 8 and 14 on bars at x 8, 13
 * and 18, and his `chart-bar` plots the same three lengths on rows at y 7, 12
 * and 17 from x 7. Sorted versions of that ladder were drawn as
 * `chart-{column,bar}-{increasing,decreasing}` and dropped on his word.
 *
 * The fat pairs take his `chart-candlestick` pitch, bodies of 4 on 7..11 and
 * 15..19, because that is where he already put two wide things in this plot:
 * they paint 6 each with the house 2 between and 2 to spare at the far end.
 *
 * A stacked bar's division is a rule across the body, cap to cap with its two
 * side walls, so it is one element with the body and owes it no gap. What it
 * does owe is 2 to the walls it runs parallel to, which is what puts the
 * divisions where they are rather than at the halfway mark, and it sets a floor
 * on the body: 2 of wall, 2 of daylight, 2 of rule, 2 of daylight and 2 of wall
 * is **10 painted before a division fits at all**. That is why the pair carries
 * the ladder's two tallest readings and not its clearest contrast.
 */
const FOOT = 17, START = 7;

/**
 * A body on r=1, its own plate, and any rules drawn across it.
 *
 * **The fill KNOCKS OUT THE SMALLER SEGMENT; it does not draw the rule.** A
 * stacked body fills solid, so a rule painted over it at full strength is black
 * on black and the drawing loses its divisions entirely. That is what shipped
 * first. Knocking out the RULE's own band was the second attempt and is also
 * wrong: it leaves a slot the width of a stroke floating in the middle of the
 * bar and says nothing about which side is which.
 *
 * His correction, in his words: *"not the line should be whole, but the smaller
 * part of the square inside it."* So the rule divides the body's INTERIOR in
 * two and the smaller part is voided whole. What is left is the larger segment
 * plus the wall all round it, and the boundary between solid and void IS the
 * rule — drawn by not drawing it.
 *
 * The interior is the box inset 1 on the path, since a wall is 2 painted. The
 * voids come out 2 by 2 and 2 by 3 in the columns, 2 by 2 and 3 by 2 in the
 * rows: they are as uneven as the readings they stand for, which is the point.
 */
function chartBodies(boxes, rules = []) {
  const out = {};
  // the smaller of the two parts the rule cuts the body's interior into
  const slotFor = ([x0, y0, x1, y1], [p, q]) => {
    const inner = [x0 + 1, y0 + 1, x1 - 1, y1 - 1];
    const shorter = (a, b, c, d) => (b - a <= d - c ? [a, b] : [c, d]);
    if (p[1] === q[1]) {                      // a rule across, so it cuts in y
      const [a, b] = shorter(inner[1], p[1] - 1, p[1] + 1, inner[3]);
      return [inner[0], a, inner[2], b];
    }
    const [a, b] = shorter(inner[0], p[0] - 1, p[0] + 1, inner[2]);
    return [a, inner[1], b, inner[3]];
  };
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const bodies = boxes.map(([x0, y0, x1, y1]) =>
      polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]));
    const plates = bodies.map((b) => plateOf(b.segs));
    // a rule is buried in its body's ink at both ends, so neither end is free
    const marks = rules.map((m) => scanRun(m, sharp, [false, false])).join('');
    const d = AXIS(sharp) + bodies.map(String).join('') + marks;
    const solid = plates.map((c) => contourPath(c)).join('');
    const slots = rules.map((m, i) => {
      const [a, b, c2, d2] = slotFor(boxes[i], m);
      const box = polyContour([[a, b], [c2, b], [c2, d2], [a, d2]], [0, 0, 0, 0]);
      return hole(plates[i], box.segs);
    }).join('');
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(solid), S(d)];
    out[`fill.${key}`] = [F_(solid + slots), S(AXIS(sharp))];
  }
  return out;
}

// Two bodies of 4 paint 6 each, so the plot's 16 holds them with the house 2
// between and 2 to spare. **Spent one unit either side rather than both on the
// right**, which centres the pair on the plot's own middle at 14. Sitting them
// where his candlestick sits its bodies, on 7..11 and 15..19, is the other
// reading of the same rule, and it produced Lucide's drawing coordinate for
// coordinate: the overlap check came back 100 against 100 and it did not ship.
const COL_BIG = [[8, 8, 12, FOOT], [16, 5, 20, FOOT]];
const ROW_BIG = [[START, 5, 16, 9], [START, 13, 19, 17]];
SETS['chart-column-big'] = () => chartBodies(COL_BIG);
SETS['chart-bar-big'] = () => chartBodies(ROW_BIG);
// the top segment is 4 painted in both columns, so the division reads as one
// reading taken twice rather than two arbitrary marks
SETS['chart-column-stacked'] = () => chartBodies(COL_BIG, [[[8, 12], [12, 12]], [[16, 10], [20, 10]]]);
SETS['chart-bar-stacked'] = () => chartBodies(ROW_BIG, [[[12, 5], [12, 9]], [[14, 13], [14, 17]]]);

/**
 * Three nodes and the two edges between them.
 *
 * **An edge ends ON its node's centre line, not short of it**, which is what
 * `git-graph` and `git-fork` already do: a round cap sitting 2 from an r=2
 * node's centre paints the band from 1 to 3, exactly the ring's own, so the two
 * are one piece and owe each other no daylight. Stopping 2 clear instead is
 * what makes this drawing impossible — the exclusion zones round two nodes 8
 * apart overlap, and nothing can be drawn between them.
 *
 * The angle at the middle node is the constraint that placed all three. Two
 * edges leaving a node at theta have `2d sin(theta/2) - 2` of daylight at
 * distance d, and they first appear from under the ring at d = R+1 = 3, so the
 * house 2 asks `sin(theta/2) >= 2/3`, or **theta >= 83.6 degrees**. A compact
 * triangle of three nodes cannot hold that at any corner; a path of two edges
 * only has to hold it at one. B is placed to make the angle exactly 90, which
 * gives 2.24 of daylight where the edges come out from under the ring.
 *
 * **It warns at 0.83 anyway, and the warning is wrong.** SPACING measures
 * subpath to subpath, so it finds the two edge CAPS, which sit at radius 2 on
 * either side of B and are 2.83 apart on their centre lines. Both are buried in
 * the ring's own band, which paints every direction from 1 to 3, so nothing of
 * that gap is visible. `layered` cannot excuse it either: it asks whether the
 * covering element is FILLED, and a node is a ring. No layout removes it — the
 * caps are `2R sin(theta/2)` apart, so 2 painted would need theta = 180 and a
 * straight line of three nodes is not a network. Accepted, four warnings.
 */
// His touch-up, 10 Sep 2026: the whole thing slid down 2, which puts the lowest
// node's ink exactly 2 above the foot and its highest 2 below the plot's top,
// where mine sat flush against the top and floated 4 clear of the foot. Every
// standing element in the family stands on that same 2.
const NET = { R: 2, A: [9, 7], B: [11, 15], C: [19, 13] };
SETS['chart-network'] = () => {
  const { R, A, B, C } = NET;
  const toward = (p, q) => add(p, mul(unit(sub(q, p)), R));
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const nodes = [A, B, C].map((c) => circlePath(c, R)).join('');
    const discs = [A, B, C].map((c) => circleSegs(c, R + 1));
    const holes = [A, B, C].map((c) => circleSegs(c, R - 1));
    // both ends are buried in a ring, so neither squares up in sharp
    const edges = [[A, B], [B, C]]
      .map(([p, q]) => runPath([toward(p, q), toward(q, p)])).join('');
    const d = AXIS(sharp) + nodes + edges;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(discs.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(discs.map((c, i) => contourPath(c) + hole(c, holes[i])).join('')), S(AXIS(sharp) + edges)];
  }
  return out;
};

/**
 * HIS TWO, 10 Sep 2026: one reading rising and the same one falling, each a
 * single cubic rather than the two arcs `chart-spline` is built from. A lone
 * curve needs no tangent matched to anything, so there is nothing to construct
 * and the control points are his.
 *
 * They sit inside the plot rather than filling it: the ink runs x 6..20 by
 * y 6..17 against the 6..22 by 4..18 his `chart-line` reaches, so the curve
 * reads as a trend through the middle of the plot rather than a route between
 * two corners.
 */
const LINE_CURVE = {
  increasing: 'M19 7C17.9091 9.8125 13.9818 15.55 7 16',
  decreasing: 'M7 7C8.09091 9.8125 12.0182 15.55 19 16',
};
for (const [way, d] of Object.entries(LINE_CURVE)) {
  SETS[`chart-line-${way}`] = () => {
    const out = {};
    // two free ends on a curve, so the treatments carry one curve and differ
    // only in their caps, as `chart-spline` does
    for (const sharp of [false, true]) out[`stroke.${sharp ? 'sharp' : 'regular'}`] = [S(AXIS(sharp) + d)];
    return out;
  };
}

/**
 * The same reading as a curve, and it takes `chart-line`'s own two ends: 7,17
 * up to 21,5. **It is two arcs, not a fitted curve.** The second is the first
 * turned through 180 degrees about their meeting point at 14,11, so the
 * tangents match there by construction rather than by eye, and a smooth join is
 * the whole of what makes it a spline.
 *
 * The first arc is struck through a point 1.5 below the middle of its own
 * chord. Below 1 the drawing straightens into a diagonal and stops reading as
 * a curve; above 2 it bulges past the 16 by 14 its ends already fix, which is
 * the box his line paints.
 *
 * Drawn with the batch, dropped on his word, and brought back on his word.
 */
SETS['chart-spline'] = () => {
  const A = [7, 17], B = [21, 5], J = [14, 11], SAG = 1.5;
  const mid = [(A[0] + J[0]) / 2, (A[1] + J[1]) / 2];
  const seg = arcThrough(A, [mid[0], mid[1] + SAG], J);
  const turned = { c: [2 * J[0] - seg.c[0], 2 * J[1] - seg.c[1]], r: seg.r };
  const ang = (o, p) => (Math.atan2(p[1] - o[1], p[0] - o[0]) * 180) / Math.PI;
  const d = new Path().M(A)
    .A(seg.c, ang(seg.c, A), ang(seg.c, J))
    .A(turned.c, ang(turned.c, J), ang(turned.c, B))
    .toString();
  const out = {};
  // both free ends sit on a curve, so there is no tangent to run a squared cap
  // out along: the two treatments carry one curve and differ in their caps
  for (const sharp of [false, true]) out[`stroke.${sharp ? 'sharp' : 'regular'}`] = [S(AXIS(sharp) + d)];
  return out;
};

/**
 * The line chart closed down to a baseline, which is what makes it an area and
 * what gives it the filled styles the open ones do not owe.
 *
 * **It does NOT carry `chart-line`'s polyline, and that is the baseline's
 * doing rather than an oversight.** His redrawn line arrives at 21,5 climbing
 * at 72 degrees, and the wall an area has to drop from there is vertical, so
 * closing his line leaves an 18.43 degree needle at the top right that no
 * ladder radius can round off. An area wants a shallow final approach; this one
 * arrives at 45 degrees and its corner takes r=1 like the two feet. The two feet turn
 * on r=1 so the fill's own corners land on 2; the data points stay true
 * vertices, because a chart's peaks are readings rather than corners.
 */
SETS['chart-area'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const area = polyContour([[7, 15], [13, 9], [16, 12], [21, 7], [21, 17], [7, 17]], [0, 0, 0, 0, r, r]);
    const plate = plateOf(area.segs);
    const d = AXIS(sharp) + area.toString();
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate)), S(AXIS(sharp))];
  }
  return out;
};

/**
 * Five readings as beads on the dot ladder, every pair at least 5 apart so the
 * house 2 of daylight survives between them. They stay round in sharp, as the
 * dice pips do: a squared-off point is a cell, and this is a point.
 */
const SCATTER = [[8, 16], [13, 12], [11, 7], [18, 13], [19, 7]];
SETS['chart-scatter'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(AXIS(sharp)), F_(SCATTER.map((c) => circlePath(c, 1.5)).join(''))];
  }
  return out;
};

/**
 * Two candles, each a body on r=1 with a wick out of the top and the bottom.
 * A wick meets its body cap to cap, so the pair is one element and owes no gap
 * between them; what has to clear is body to body, which is the 2 between 12
 * and 14.
 */
SETS['chart-candlestick'] = () => {
  // His: bodies of 4 on an 8 pitch from 9, the left one open at the top of the
  // plot and the right one closed at the bottom, so the pair reads as a rise.
  const CANDLES = [{ x: 7, y0: 5, y1: 10, hi: 3, lo: 13 }, { x: 15, y0: 9, y1: 15, hi: 6, lo: 17 }];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const bodies = CANDLES.map((c) =>
      polyContour([[c.x, c.y0], [c.x + 4, c.y0], [c.x + 4, c.y1], [c.x, c.y1]], [r, r, r, r]));
    const plates = bodies.map((b) => plateOf(b.segs));
    // a wick's outer end is free; the end at the body is buried in its ink
    const wicks = CANDLES.flatMap((c) => [
      scanRun([[c.x + 2, c.hi], [c.x + 2, c.y0]], sharp, [true, false]),
      scanRun([[c.x + 2, c.y1], [c.x + 2, c.lo]], sharp, [false, true]),
    ]).join('');
    const d = AXIS(sharp) + bodies.map(String).join('') + wicks;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plates.map((c) => contourPath(c)).join('')), S(d)];
    out[`fill.${key}`] = [F_(plates.map((c) => contourPath(c)).join('')), S(AXIS(sharp) + wicks)];
  }
  return out;
};

/**
 * `chart-network` was drawn twice and is NOT shipped, and the reason is a
 * ceiling rather than a preference.
 *
 * Two edges leaving one ringed node of radius r at an angle theta have
 * `2r sin(theta/2) - 2` units of daylight where they cross the rim, so the
 * house 2 needs `r sin(theta/2) >= 2`. At the r=2 the plot area allows, that
 * asks `sin(theta/2) >= 1`, which only a straight line satisfies — even at 150
 * degrees it is 1.86 — and the ring cannot grow instead: our node is r=3
 * painting 8, three of those need centres 10 apart, and their ink then crosses
 * the axis inside a 16 by 16 plot.
 *
 * Drawn on BEADS instead the arithmetic is satisfied, because edges meeting at
 * a centre genuinely meet and the bead covers the junction. Rendered, it is a
 * triangle with three dots on it and reads as a triangle. That is the floor
 * doing its job and the drawing still failing, which is the whole of why a
 * render comes before a decision.
 */

/**
 * HIS EXPLODED PIE, 10 Sep 2026, solved. Three slices of 90, 60 and 210
 * degrees, each slid out along its own bisector, which is the composition he
 * drew: a quarter, a sliver and the remainder, so the drawing says unequal
 * data rather than a divided circle.
 *
 * **Each slice moves by `2 / sin(half its own angle)` and no other number will
 * do.** Sliding a slice d along its bisector moves each of its two straight
 * edges `d·sin(a/2)` sideways, so the cut between two neighbours opens by the
 * sum of their two contributions. Asking every cut for the house 2 painted, so
 * 4 on the centre lines, is three equations in three offsets, and they separate:
 * each slice must contribute exactly 2 on its own, giving 2.828 for the 90, 4
 * for the 60 and 2.071 for the 210. **A uniform offset cannot do it** — set to
 * clear the narrowest pair it leaves the others at 2.86, and it was shipped at
 * d=4 for an hour with cuts of 2.83, 3.86 and 4.69 before he called the spaces
 * huge. The narrow slice travels furthest because it has the least leverage.
 *
 * The radius is then what the box allows. With those offsets the ink comes to
 * `2r + 7.464` wide by `1.866r + 6` tall, so 22 wide caps r at 7.27 and it
 * ships at **r=7**: every cut 2.00, ink 21.46 by 19.06.
 *
 * **It is wider than it is tall and that is the shape, not a defect** — an
 * exploded pie has no slice reaching the rim in every direction, so it cannot
 * be square the way the whole circle it replaced was. `SIZE_KNOWN` carries the
 * arithmetic for why 22 by 18 is not available.
 *
 * The 210 slice is reflex at its apex, which is the corner `offsetContour` is
 * known to bridge (see the scan-heart note). It does not here, and that was
 * checked rather than assumed: `verify` passes on all three plates at 1.000.
 */
const PIE = { C: [12, 12], R: 7, GAP: 2, ANG: [90, 60, 210], FROM: -90 };
const rad = (d) => (d * Math.PI) / 180;
const onCircle = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];

/** Each slice's own displaced centre and the arc it carries. */
function pieWedges() {
  const out = [];
  let a = PIE.FROM;
  for (const w of PIE.ANG) {
    const a0 = a, a1 = a + w;
    // its own edges move GAP sideways, so every cut is 2·GAP on the centre
    // lines whatever its neighbours are
    const d = PIE.GAP / Math.sin(rad(w / 2));
    const c = onCircle(PIE.C, d, (a0 + a1) / 2);
    out.push({ c, a0, a1, d,
      segs: [
        { type: 'L', p0: c, p1: onCircle(c, PIE.R, a0) },
        { type: 'A', c, r: PIE.R, a0, a1 },
        { type: 'L', p0: onCircle(c, PIE.R, a1), p1: c },
      ] });
    a = a1;
  }
  return out;
}

SETS['chart-pie'] = () => {
  const wedges = pieWedges();
  const plates = wedges.map((w) => plateOf(w.segs));
  // slide the whole thing onto its own painted centre, which no slice does for
  // it: the three bisectors do not cancel
  const rough = wedges.map((w) => contourPath(w.segs)).join('');
  const b = strokedBBox(rough, 1, 'round');
  const dx = 12 - (b[0] + b[2]) / 2, dy = 12 - (b[1] + b[3]) / 2;
  const shift = (segs) => segs.map((g) => (g.type === 'L'
    ? { type: 'L', p0: [g.p0[0] + dx, g.p0[1] + dy], p1: [g.p1[0] + dx, g.p1[1] + dy] }
    : { type: 'A', c: [g.c[0] + dx, g.c[1] + dy], r: g.r, a0: g.a0, a1: g.a1 }));
  const strokeD = wedges.map((w) => contourPath(shift(w.segs))).join('');
  const plateD = plates.map((c) => contourPath(shift(c))).join('');
  const out = {};
  // a wedge has no fillet to remove and no free end to square, so the two
  // corner treatments are one drawing, as `eye` and `heart` are
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(strokeD)];
    out[`duotone.${key}`] = [P(plateD), S(strokeD)];
    out[`fill.${key}`] = [F_(plateD)];
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
  // a set that carries containers keys three-part, so ask for the bare one
  const pick = (corners) => variants[`stroke.${corners}`] ?? variants[`regular.stroke.${corners}`];
  const box = inkOf(pick('regular'), 'round');
  const sbox = inkOf(pick('sharp'), 'butt');
  console.log(name.padEnd(22), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
    ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
    ' sharp', sbox.map((v) => v.toFixed(2).padStart(6)).join(' '),
    ` ${Object.keys(variants).length} variants`);
}
