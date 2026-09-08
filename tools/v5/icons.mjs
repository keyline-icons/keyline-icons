/**
 * The v0.5.0 batch, rounded stroke drawings.
 *
 * Each export returns the stroke variant's `d`. Duotone, fill and the sharp
 * half are derived once a drawing is approved; this file is what gets rendered
 * for review.
 */
import { Path, polyPath, polyContour, circlePath, onArc, pt, n, unit, dot, sub, add, mul, len, filletLineArc, filletArcArc, circleCross } from './geom.mjs';
import { strokedBBox, subpaths } from '../../pipeline/lib/geom.mjs';

/**
 * How far a fillet pulls a vertex's PAINTED extreme in, against the true point
 * a round join paints once the fillet is gone.
 *
 * The arc sits `r / sin t` along the bisector from the vertex and reaches back
 * `r`, so the extreme lands `r/sin t - r` short of the vertex — and the sharp
 * sibling, whose round join paints a disc about the vertex itself, lands the
 * full amount further out. That is the whole reason a de-filleted acute corner
 * grows: `zap` by 0.91, the sparkle tips by 0.86.
 *
 * So a sharp drawing's extreme vertices are moved IN by this, and the two
 * treatments then paint the same box. It is a re-solve rather than a
 * conversion, which is exactly what the house asks for when a de-fillet would
 * otherwise paint outside its rounded sibling.
 */
export const filletPull = (r, t) => r * (1 / Math.sin(t) - 1);

/* ------------------------------------------------------------------ phone */

/**
 * The handset: two pads at the ends of a waisted band.
 *
 * Skeleton, all of it forced once the pads and the two arcs are chosen:
 *
 *   C  = (20, 4)      the arcs' common centre, on the drawing's own symmetry
 *                     axis (the anti-diagonal), so the shape is its own mirror
 *   Ro = 18           tangent to the pad's outer wall at (2,4) and to the far
 *                     pad's floor at (20,22) — which is what makes every
 *                     junction G1 without a fillet
 *   Ri = 14           so the band is 4 wide against pads of 7: the waist is
 *                     what stops it reading as a bracket
 *   neck              the pad's inner wall turns at (9,8) onto a 3:4 slope and
 *                     joins the inner arc through a 1-unit fillet
 *
 * Ink 1..23, the full-bleed size a diagonal sweep of this kind takes.
 */
export function phonePath({ pad = 7, r = 2, Ro = 18, Ri = 14, neck = [9, 8], slope = [-0.8, 0.6], sharp = false } = {}) {
  const C = [20, 4];
  const rr = sharp ? 0 : r;
  const u = unit(slope);
  let nrm = [-u[1], u[0]];
  if (dot(nrm, sub(C, neck)) < 0) nrm = mul(nrm, -1);
  const ang = (p, c) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
  const M = (p) => [24 - p[1], 24 - p[0]];             // reflect in the anti-diagonal

  // Where the neck meets the inner arc: through a 1-unit fillet rounded, at the
  // true crossing sharp.
  let T, A, F;
  if (sharp) {
    const q = sub(neck, C);
    const bq = 2 * dot(q, u), cq = dot(q, q) - Ri * Ri;
    const t = (-bq + Math.sqrt(bq * bq - 4 * cq)) / 2;
    T = A = add(neck, mul(u, t));
  } else {
    const f = filletLineArc(neck, u, nrm, C, Ri, 1);
    T = f.T; A = f.A; F = f.F;
  }
  const mT = M(T), mA = M(A), mF = F && M(F), mN = M(neck);

  const p = new Path()
    .M([C[0] - Ro, C[1]])
    .corner([C[0] - Ro, C[1] - r], [C[0] - Ro + pad, C[1] - r], rr)
    .corner([C[0] - Ro + pad, C[1] - r], [C[0] - Ro + pad, C[1] + 4], rr)
    .corner(neck, add(neck, u), rr);
  p.L(T);
  if (!sharp) p.A(F, ang(T, F), ang(A, F));
  p.A(C, ang(A, C), ang(mA, C));
  if (!sharp) p.A(mF, ang(mA, mF), ang(mT, mF));
  p.L(mT)
    .corner(mN, [C[0], mN[1]], rr)
    .corner([C[0] + r, mN[1]], [C[0] + r, C[1] + Ro], rr)
    .corner([C[0] + r, C[1] + Ro], [C[0] - Ro, C[1] + Ro], rr)
    .L([C[0], C[1] + Ro])
    .A(C, 90, 180)
    .Z();
  return p;
}

export const phone = (o = {}) => phonePath(o).toString();

/** Mirror a path about x = 12: pairs of numbers are points, so this is exact. */
export function mirrorX(d) {
  return d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, x, y) => `${n(24 - Number(x))} ${y}`);
}
/* --------------------------------------------------------------- messages */

/** The shipped bubble, verbatim from raw/message. */
export const BUBBLE =
  'M4.5686 16.353C2.915 14.8839 2 12.9769 2 11C2 6.5817 6.4772 3 12 3C17.5228 3 22 6.5817 22 11' +
  'C22 15.4183 17.5228 19 12 19C11.1845 19 10.3721 18.9202 9.5808 18.7624L5 21L4.5686 16.353Z';

export const messageLines = ({ top = [8, 16], bot = [8, 13] } = {}) =>
  `${BUBBLE}M${top[0]} 9L${top[1]} 9M${bot[0]} 13L${bot[1]} 13`;

/* ------------------------------------------------------------------ quote */

/**
 * An arc that leaves the body tangentially at angle `t` and passes through the
 * tail's tip. Tangency puts its centre on the body's own radius through that
 * point, so there is one unknown left: how far along. |B + s·u − T| = |s|
 * solves it in closed form, and the sign of s says which side it curves to.
 */
function tangentArc(C, R, t, T) {
  const u = [Math.cos((t * Math.PI) / 180), Math.sin((t * Math.PI) / 180)];
  const B = onArc(C, R, t);
  const w = sub(B, T);
  const s = -dot(w, w) / (2 * dot(u, w));
  const O = add(B, mul(u, s));
  const ang = (p) => (Math.atan2(p[1] - O[1], p[0] - O[0]) * 180) / Math.PI;
  return { O, aB: ang(B), aT: ang(T), B };
}

/** The shorter of the two ways round, signed. */
const shortWay = (a0, a1) => (((a1 - a0) % 360) + 540) % 360 - 180;

/**
 * One quote mark: a comma. A round body with a tail pulled out of it, drawn
 * as a single closed contour and stroked, so what you read as the mark's
 * counter is simply the body's interior.
 *
 * Both of the tail's edges leave the body TANGENTIALLY — the outer at 3
 * o'clock, the inner at `tIn` — so neither junction is a corner that has to be
 * filleted, and the only vertex in the drawing is the tip where they cross.
 *
 * Two numbers decide the whole family, and they pull against each other:
 *
 *   a mark paints  2R + 2       so the pair's daylight is  20 − 2(2R + 2)
 *                               = 16 − 4R
 *   the counter is  2(R − 1)    across at the body
 *
 * At R = 3 both come out at 4; at R = 3.5 the counter is 5 and the daylight 2.
 * Zafar drew it at 3.5 and sent the file, so 3.5 it is: the bigger body, the
 * house's own 2 between the marks.
 *
 * Vertically the mark paints (R + 1) + (h + 1) for a tail dropping `h`, so
 * cy = R + 6 puts the body's crown on 5 and cy + h = 18 puts the tip on 19,
 * which is the 20 × 14 box centred on 12 that his drawing measures.
 *
 * There is nothing for the sharp treatment to do here: no drawn fillet to
 * remove and no free end to square, the same as `circle` and `more-horizontal`.
 * Sharp and rounded are one drawing.
 */
export function comma({ C, R = 3, h = 7, dx = -1, tOut = 0, tIn = 120 }) {
  const T = [C[0] + dx, C[1] + h];
  const out = tangentArc(C, R, tOut, T);
  const inn = tangentArc(C, R, tIn, T);
  const p = new Path().M(out.B);
  const dOut = shortWay(out.aB, out.aT);
  p.A(out.O, out.aB, out.aB + dOut, Math.sign(dOut) || 1);   // body -> tip
  const dIn = shortWay(inn.aT, inn.aB);
  p.A(inn.O, inn.aT, inn.aT + dIn, Math.sign(dIn) || 1);     // tip -> body
  p.A(C, tIn, tIn + ((((tOut - tIn) % 360) + 360) % 360), 1); // and round the body
  return p.Z();
}

/** 180 degrees about the canvas' centre: an opening mark becomes a closing one. */
export const turn = (d) => d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, x, y) => `${n(24 - Number(x))} ${n(24 - Number(y))}`);

const MARK = { R: 3.5, h: 8.5, dx: -1.25, tIn: 120, cy: 9.5 };

export function quoteContours({ single = false, o = MARK } = {}) {
  const xs = single ? [12] : [3 + o.R, 21 - o.R];
  return xs.map((cx) => comma({ C: [cx, o.cy], R: o.R, h: o.h, dx: o.dx, tIn: o.tIn }));
}

export function quoteMarks({ close = false, ...rest } = {}) {
  const d = quoteContours(rest).map((m) => m.toString()).join('');
  return close ? turn(d) : d;
}

export const applyTurn = (d, on) => (on ? turn(d) : d);

export const quote = (opts = {}) => quoteMarks(opts);

/* ----------------------------------------------------------------- layers */

/**
 * A plate over two chevrons. The plate is a rhombus on a 1:2 slope, so a
 * vertical step between a flank and the chevron under it is a painted gap of
 * 2.2 without an irrational offset. The plate's side fillet pulls its own
 * vertex in, so the half-width is solved to put the painted extreme on 2..22.
 */
export function layersParts({ hh = 5.5, r = 1, hc = 10, top = 1, bottom = 23, sharp = false } = {}) {
  const rr = sharp ? 0 : r;
  let hw = hc + 1;                                   // the plate's own side vertex
  if (sharp) hw = hc;                                // sharp: the vertex IS the ink
  else for (let i = 0; i < 40; i++) hw = hc + r * (1 / Math.sin(Math.atan2(hh, hw)) - 1);
  const apexBack = sharp ? 0 : r * (1 / Math.sin(Math.atan2(hw, hh)) - 1);
  const cy = top + 1 + hh - apexBack;                // the apex's ink lands on `top`
  const step = (bottom - 1 + apexBack - cy - hh) / 2;
  const plate = polyContour(
    [[12, cy - hh], [12 + hw, cy], [12, cy + hh], [12 - hw, cy]],
    [rr, rr, rr, rr],
  );
  const slope = hh / hw;
  const u = unit([hw, -hh]);
  const k = sharp ? sharpEnd(u) : 0;
  const chev = (dy) => {
    const apex = cy + hh + dy;
    const end = apex - hc * slope;
    const a = [12 - hc - k * u[0], end + k * u[1]];
    const b = [12 + hc + k * u[0], end - k * u[1]];
    return new Path().M(a).corner([12, apex], b, rr).L(b).toString();
  };
  return { plate, chevrons: chev(step) + chev(2 * step) };
}

export const layers = (o = {}) => {
  const { plate, chevrons } = layersParts(o);
  return plate.toString() + chevrons;
};

/**
 * How far a free end is pushed for its butt cap to paint where the round cap's
 * disc reached: k = (1 - sin t) / cos t, with t measured off the nearer axis.
 * A unit on an axis, 0.414 at 45 degrees, and never a shortening.
 */
export function sharpEndIn(p, dir, box = [1, 1, 23, 23]) {
  // The angle rule, then clamped so the cap's own corners stay inside the box
  // the rounded drawing paints. Where the box binds first the arm loses a
  // little of its reach, which is the trade the set already makes on 25 names.
  const nrm = [-dir[1], dir[0]];
  const fits = (k) => {
    const e = [p[0] + k * dir[0], p[1] + k * dir[1]];
    return [1, -1].every((sgn) => {
      const c = [e[0] + sgn * nrm[0], e[1] + sgn * nrm[1]];
      return c[0] >= box[0] - 1e-9 && c[1] >= box[1] - 1e-9 && c[0] <= box[2] + 1e-9 && c[1] <= box[3] + 1e-9;
    });
  };
  let lo = 0, hi = sharpEnd(dir);
  if (fits(hi)) return hi;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (fits(m)) lo = m; else hi = m;
  }
  return lo;
}

export function sharpEnd(dir) {
  const a = Math.abs(Math.atan2(dir[1], dir[0])) % (Math.PI / 2);
  const t = Math.min(a, Math.PI / 2 - a);
  return (1 - Math.sin(t)) / Math.cos(t);
}

/* -------------------------------------------------------------------- sun */

const DISC = circlePath([12, 12], 4.5);
const DIRS = [0, 45, 90, 135, 180, 225, 270, 315];

export const sunRays = (inner, outer) =>
  DIRS.map((a) => `M${pt(onArc([12, 12], inner, a))}L${pt(onArc([12, 12], outer, a))}`).join('');

export const sunDots = (rad) => DIRS.map((a) => circlePath(onArc([12, 12], rad, a), 1)).join('');

export const sun = () => DISC + sunRays(8.5, 10);
export const sunMedium = ({ outer = 9.25 } = {}) => DISC + sunRays(8.5, outer);
export const sunDim = ({ rad = 8.5 } = {}) => DISC + sunDots(rad);

/* --------------------------------------------------------------- language */

/* --------------------------------------------------------------- language */

/**
 * Two bubbles in conversation, each carrying a letterform: the outlined one
 * above with an A, the one in front below with a CJK mark.
 *
 * The set's standing rule is that it draws no letters, because a letter's
 * counter closes at icon size — the eight sort icons that carried A and Z were
 * drawn and dropped for exactly this. Zafar asked for it here anyway, so the A
 * carries its crossbar low, at 78 per cent of the height, which is the one
 * placement that leaves a counter surviving 24px.
 *
 * A bubble is a rounded rectangle with its own corner drawn out into a tail,
 * rather than the ellipse `message` uses: the letterforms need the interior a
 * rectangle gives, and there is nothing left over at the ellipse's size.
 */
export function bubbleRect({ x0, y0, x1, y1, r = 3, tail = 2, corner = 'bl', sharp = false }) {
  const rr = sharp ? 0 : r;
  const p = new Path();
  if (corner === 'bl') {
    p.M([x0 + rr, y0])
      .corner([x1, y0], [x1, y1], rr)
      .corner([x1, y1], [x0, y1], rr)
      .L([x0 + rr, y1])
      .L([x0, y1 + tail])
      .corner([x0, y0], [x1, y0], rr)
      .L([x0 + rr, y0]);
  } else {
    p.M([x1 - rr, y0])
      .corner([x0, y0], [x0, y1], rr)
      .corner([x0, y1], [x1, y1], rr)
      .L([x1 - rr, y1])
      .L([x1, y1 + tail])
      .corner([x1, y0], [x0, y0], rr)
      .L([x1 - rr, y0]);
  }
  return p.Z();
}

/**
 * `language` is Zafar's drawing, 8 Sep 2026: the letter A beside the
 * character, both set as loose strokes at the drawing's own scale rather than
 * as glyphs squeezed into boxes, which is what makes them hold at 24px. It
 * fills the 1..23 ink box exactly on both axes.
 *
 * It arrived as an outlined fill, and every number below is the centreline
 * recovered from that outline unchanged, with one exception: the top mark sat
 * at y 12, which left 1.00 of white to the bar beneath it where the house
 * wants 2, and 1.61 to each falling stroke. At y 11 those read 2.00 and 2.47,
 * the ink box does not move, and nothing else in the drawing changes.
 */

/**
 * The A: two legs meeting at a point, and a crossbar. Nothing closes, so the
 * counter is whatever the bar leaves — at ten units with the bar six down it
 * measures 3.33 across, which is open at 24px. That is the whole reason this
 * drawing works where the same letter inside a bubble did not.
 */
export function letterA({ apex, feet, barY, sharp = false }) {
  const [left, right] = feet;
  const leg = unit([right[0] - apex[0], right[1] - apex[1]]);
  const e = sharp
    ? Math.min(sharpEndIn(right, leg), sharpEndIn(left, [-leg[0], leg[1]]))
    : 0;
  const t = (barY - apex[1]) / (right[1] - apex[1]);
  const inset = (right[0] - apex[0]) * t;
  // The crossbar dies on the legs, so both its ends are T-junctions and take
  // no extension: pushed out, a butt cap would paint past the leg it lands on.
  return `M${n(left[0] - e * leg[0])} ${n(left[1] + e * leg[1])}L${n(apex[0])} ${n(apex[1])}` +
    `L${n(right[0] + e * leg[0])} ${n(right[1] + e * leg[1])}` +
    `M${n(apex[0] - inset)} ${n(barY)}L${n(apex[0] + inset)} ${n(barY)}`;
}

/**
 * The falling pair. A curve rather than the straight diagonal the set usually
 * draws: two cubics a stroke, tangent-continuous where the two cross at
 * (17, 19.543). They are his curves, carried verbatim rather than re-solved
 * onto a circle they were never on — the best-fit arc misses by 0.019, which
 * is nothing to look at and everything to the character's hand.
 */
const FALLING = [
  { p0: [14, 15], c: [[14.4767, 16.1439], [15.5203, 18.0076], [17, 19.543], [18.1074, 20.6922], [19.459, 21.6576], [21, 22]] },
  { p0: [20, 15], c: [[19.5234, 16.1439], [18.4797, 18.0076], [17, 19.543], [15.8926, 20.6922], [14.541, 21.6576], [13, 22]] },
];

/**
 * The character: the top mark, the long bar under it, and the falling pair
 * crossing below. Each stroke starts ON the bar, so its top end is a
 * T-junction and only the foot is extended sharp — along the last handle's
 * tangent, which is where the round cap's disc actually reached.
 */
export function letterCJK({ dot, bar, strokes = FALLING, sharp = false }) {
  const rule = ([x0, x1, y]) => {
    const k = sharp ? sharpEndIn([x1, y], [1, 0]) : 0;
    return `M${n(x0 - k)} ${n(y)}L${n(x1 + k)} ${n(y)}`;
  };
  const parts = [rule(dot), rule(bar)];
  for (const { p0, c } of strokes) {
    let d = `M${n(p0[0])} ${n(p0[1])}` +
      `C${n(c[0][0])} ${n(c[0][1])} ${n(c[1][0])} ${n(c[1][1])} ${n(c[2][0])} ${n(c[2][1])}` +
      `C${n(c[3][0])} ${n(c[3][1])} ${n(c[4][0])} ${n(c[4][1])} ${n(c[5][0])} ${n(c[5][1])}`;
    if (sharp) {
      const u = unit([c[5][0] - c[4][0], c[5][1] - c[4][1]]);
      const k = sharpEndIn(c[5], u);
      d += `L${n(c[5][0] + k * u[0])} ${n(c[5][1] + k * u[1])}`;
    }
    parts.push(d);
  }
  return parts.join('');
}

export function languageParts({
  A = { apex: [6, 2], feet: [[2, 11], [10, 11]], barY: 8 },
  cjk = { dot: [16, 18, 11], bar: [12, 22, 15] },
  sharp = false,
} = {}) {
  return { A: letterA({ ...A, sharp }), CJK: letterCJK({ ...cjk, sharp }) };
}

export const language = (o = {}) => {
  const p = languageParts(o);
  return p.A + p.CJK;
};

/* --------------------------------------------------------------- share-2 */

/**
 * share-2: an arrowhead with a tail swept out of its back, re-solved from
 * Zafar's drawing on to lines and arcs so the offsetter can plate it. His
 * curves fitted circles to within 0.11 and 0.03, so this is a tightening
 * rather than a redraw: the outer tail is R 10, the inner R 12, the back edge
 * runs down x 12.5, and the three knobs left over — the head's half-height,
 * the apex and the tail's tip — are solved to put the ink on 2..22 by 4..20.
 */
const s2add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const s2sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const s2mul = (a, k) => [a[0] * k, a[1] * k];
const s2len = (a) => Math.hypot(a[0], a[1]);
const s2unit = (a) => s2mul(a, 1 / s2len(a));
const s2dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const deg = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
const at = (C, R, t) => [C[0] + R * Math.cos(rad(t)), C[1] + R * Math.sin(rad(t))];
const angOf = (C, P) => deg(Math.atan2(P[1] - C[1], P[0] - C[0]));

/** The circle of radius R through two points; `side` picks which centre. */
function through(P, Q, R, side) {
  const M = s2mul(s2add(P, Q), 0.5), c = s2len(s2sub(Q, P));
  const h = Math.sqrt(Math.max(0, R * R - (c / 2) ** 2));
  const e = s2unit(s2sub(Q, P));
  return s2add(M, s2mul([-e[1], e[0]], h * side));
}

/* ---- segments: {k:'L',a,b} or {k:'A',C,R,a0,a1} (a1 signed sweep target) --- */
const segPoint = (s, t) => s.k === 'L' ? s2add(s.a, s2mul(s2sub(s.b, s.a), t)) : at(s.C, s.R, s.a0 + (s.a1 - s.a0) * t);
function flatten(segs, n = 160) {
  const out = [];
  for (const s of segs) for (let i = 0; i < n; i++) out.push(segPoint(s, i / n));
  return out;
}
function inside(poly, p) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
  }
  return c;
}
function crossLineCircle(P, u, C, R) {
  const q = s2sub(P, C), b = 2 * s2dot(q, u), c = s2dot(q, q) - R * R;
  const d = b * b - 4 * c;
  if (d < 0) return [];
  return [(-b - Math.sqrt(d)) / 2, (-b + Math.sqrt(d)) / 2].map((t) => s2add(P, s2mul(u, t)));
}
function crossCircles(C1, R1, C2, R2) {
  const d = s2len(s2sub(C2, C1));
  if (d < 1e-9 || d > R1 + R2 || d < Math.abs(R1 - R2)) return [];
  const x = (d * d + R1 * R1 - R2 * R2) / (2 * d);
  const h = Math.sqrt(Math.max(0, R1 * R1 - x * x));
  const e = s2unit(s2sub(C2, C1)), nn = [-e[1], e[0]];
  return [1, -1].map((k) => s2add(s2add(C1, s2mul(e, x)), s2mul(nn, h * k)));
}

/**
 * The fillet of radius r where `s1` ends and `s2` begins.
 *
 * Which side the fillet sits on is not a thing to reason about: a corner where
 * the tail peels off the head is a notch, and the fillet is OUTSIDE the ink,
 * while the corner at the arrowhead's point is a bulge and it is inside. So
 * both offsets are tried both ways and the answer is the candidate whose two
 * tangency points actually land on the two segments.
 */
function spanT(s, P) {
  if (s.k === 'L') {
    const u = s2sub(s.b, s.a), L = s2len(u);
    return s2dot(s2sub(P, s.a), s2mul(u, 1 / L)) / L;
  }
  const a = angOf(s.C, P), sweep = s.a1 - s.a0;
  let t = ((a - s.a0) * Math.sign(sweep)) % 360;
  if (t < 0) t += 360;
  return t / Math.abs(sweep);
}
function filletAt(s1, s2, r) {
  const V = segPoint(s1, 1);
  const geo = (s) => s.k === 'L'
    ? { k: 'L', P: s.a, u: s2unit(s2sub(s.b, s.a)), n: [-s2unit(s2sub(s.b, s.a))[1], s2unit(s2sub(s.b, s.a))[0]] }
    : { k: 'A', C: s.C, R: s.R };
  const g1 = geo(s1), g2 = geo(s2);
  const cands = [];
  for (const q1 of [1, -1]) for (const q2 of [1, -1]) {
    let pts = [];
    if (g1.k === 'L' && g2.k === 'L') {
      const P1 = s2add(g1.P, s2mul(g1.n, r * q1)), P2 = s2add(g2.P, s2mul(g2.n, r * q2));
      const den = g1.u[0] * g2.u[1] - g1.u[1] * g2.u[0];
      if (Math.abs(den) > 1e-9) {
        const t = ((P2[0] - P1[0]) * g2.u[1] - (P2[1] - P1[1]) * g2.u[0]) / den;
        pts = [s2add(P1, s2mul(g1.u, t))];
      }
    } else if (g1.k === 'L') pts = crossLineCircle(s2add(g1.P, s2mul(g1.n, r * q1)), g1.u, g2.C, g2.R + r * q2);
    else if (g2.k === 'L') pts = crossLineCircle(s2add(g2.P, s2mul(g2.n, r * q2)), g2.u, g1.C, g1.R + r * q1);
    else pts = crossCircles(g1.C, g1.R + r * q1, g2.C, g2.R + r * q2);
    for (const F of pts) cands.push(F);
  }
  const onto = (s, F) => s.k === 'L'
    ? s2add(s.a, s2mul(s2unit(s2sub(s.b, s.a)), s2dot(s2sub(F, s.a), s2unit(s2sub(s.b, s.a)))))
    : s2add(s.C, s2mul(s2unit(s2sub(F, s.C)), s.R));
  const ok = [];
  for (const F of cands) {
    const T1 = onto(s1, F), T2 = onto(s2, F);
    const t1 = spanT(s1, T1), t2 = spanT(s2, T2);
    if (t1 > -1e-6 && t1 < 1 + 1e-6 && t2 > -1e-6 && t2 < 1 + 1e-6) ok.push({ F, T1, T2, d: s2len(s2sub(F, V)) });
  }
  if (!ok.length) throw new Error('no fillet at ' + V.map((v) => v.toFixed(2)) + ' r=' + r);
  return ok.reduce((a, b) => (a.d < b.d ? a : b));
}

/**
 * The sharp half re-solves three numbers rather than just dropping the radii.
 *
 * Every one of them is a fillet that was carrying an extreme: the apex's r=1
 * holds the point on 22, the two back corners hold the box on 4 and 20, and
 * the tail's tip holds the left on 2. Taken out, a round join paints a disc
 * about the true vertex instead, so the drawing grew 0.56 to the right, 0.57
 * top and bottom, and only 0.07 to the left — which is why it came out
 * off-centre, 1.93 against 1.44, as well as too big.
 *
 * So `apex`, `k` and `tx` are read back off the ROUNDED drawing's painted box
 * and each sharp vertex is placed a unit inside it. Measured rather than
 * derived, because two of these corners are not symmetric about their own
 * bisector and the extreme is not along it.
 */
export function share2(opts = {}) {
  if (opts.sharp && !opts.solved) {
    const bb = strokedBBox(String(share2({ ...opts, sharp: false })), 1, 'round');
    return share2({ ...opts, solved: true, apex: bb[2] - 1, k: 12 - (bb[1] + 1), tx: bb[0] + 1 });
  }
  return share2raw(opts);
}

function share2raw({ sharp = false, solved = false, xb = 12.5, k = 7.5692, apex = 21.5596, tx = 2.9333,
                     root = 4.5, Rout = 10, Rin = 12 } = {}) {
  // The apex carries a bigger fillet than the rest: at 0.5 the point reaches
  // 22.28 and the drawing stops being centred, which is the one thing the
  // linter catches here.
  const r = sharp ? 0 : 0.5, rTip = r, rApex = sharp ? 0 : 1;
  const yTop = 12 - k, yBot = 12 + k;
  // `root` is how far down the back edge the tail starts, and it is what sets
  // the straight run left showing between the head's corner fillet and the
  // tail's: at 3.5 that run was 1.97 and the arrowhead read soft, at 4.5 it is
  // 2.96 and the head has a back. Past that the tail's own root goes thin.
  const yA = yTop + root, yB = yBot - root;
  const T = [tx, yBot - 0.5];
  const A = [xb, yA], B = [xb, yB];
  const Oo = through(A, T, Rout, -1), Oi = through(T, B, Rin, 1);
  const arc = (C, R, P, Q, dir) => {
    let a0 = angOf(C, P), a1 = angOf(C, Q);
    while (dir > 0 && a1 < a0) a1 += 360;
    while (dir < 0 && a1 > a0) a1 -= 360;
    return { k: 'A', C, R, a0, a1 };
  };
  const segs = [
    { k: 'L', a: [xb, yTop], b: A },
    arc(Oo, Rout, A, T, -1),
    arc(Oi, Rin, T, B, 1),
    { k: 'L', a: B, b: [xb, yBot] },
    { k: 'L', a: [xb, yBot], b: [apex, 12] },
    { k: 'L', a: [apex, 12], b: [xb, yTop] },
  ];
    const radii = [r, rTip, r, r, rApex ?? r, r];   // the corner AFTER each segment
  const fil = segs.map((s, i) => (radii[i] > 1e-9 ? filletAt(s, segs[(i + 1) % segs.length], radii[i]) : null));

  const p = new Path();
  const startAt = fil[segs.length - 1] ? fil[segs.length - 1].T2 : segPoint(segs[0], 0);
  p.M(startAt);
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i], f = fil[i], prev = fil[(i + segs.length - 1) % segs.length];
    const from = prev ? prev.T2 : segPoint(s, 0);
    const to = f ? f.T1 : segPoint(s, 1);
    if (s.k === 'L') p.L(to);
    else {
      const dir = Math.sign(s.a1 - s.a0) || 1;
      let a0 = angOf(s.C, from), a1 = angOf(s.C, to);
      while (dir > 0 && a1 < a0) a1 += 360;
      while (dir < 0 && a1 > a0) a1 -= 360;
      p.A(s.C, a0, a1, dir);
    }
    if (f) {
      const a0 = angOf(f.F, f.T1), a1 = angOf(f.F, f.T2);
      let d = ((a1 - a0) % 360 + 540) % 360 - 180;
      p.A(f.F, a0, a0 + d, Math.sign(d) || 1);
    }
  }
  return p.Z();
}

/* ------------------------------------------------------------------- zap */

/**
 * The bolt: a hexagon, apex at the top, foot at the bottom and a shoulder each
 * side, drawn point-symmetric about the canvas centre so the two halves are
 * one decision. Three vertices are given and the other three are the 180
 * degree turn of them.
 *
 * The radii are not uniform, and the reason is the sharp sibling. A fillet at
 * a vertex of interior half-angle t pulls the painted extreme in by
 * r(1/sin t − 1) against the true point a round join would paint, so at the
 * 37-degree tips and the 45-degree shoulders a radius of 1 costs 1.70 and
 * 1.28 — the sharp drawing would then paint out at 0.49, through the 1-unit
 * floor no rounded name breaks. At 0.5 it costs half that and sharp lands on
 * 1.31 and 1.09, inside the box. The two inner notches are near enough square
 * to take the full 1, and they set no extreme anyway.
 *
 * The four extreme vertices are then solved so the PAINTED extremes, not the
 * vertices, sit on 2 and 22.
 */
export function zapPath({ sharp = false,
                          apex = [14, 2.0932], shoulder = [2.3094, 14], notch = [11, 14] } = {}) {
  const turn = (q) => [24 - q[0], 24 - q[1]];
  const RADII = [0.5, 0.5, 1, 0.5, 0.5, 1];
  const build = (a, sh, r) => polyContour([a, sh, notch, turn(a), turn(sh), turn(notch)], r);
  if (!sharp) return build(apex, shoulder, RADII);
  // The apex sets the top and the shoulder the left; the point symmetry carries
  // the other two. Read the rounded drawing's painted box and put each sharp
  // vertex a unit inside it, so its round join paints exactly where the fillet
  // did. Measured rather than derived, because the bisector at the apex is 26
  // degrees off vertical and the extreme is not along it.
  const bb = strokedBBox(String(build(apex, shoulder, RADII)), 1, 'round');
  const a = [apex[0], bb[1] + 1], sh = [bb[0] + 1, shoulder[1]];
  return build(a, sh, [0, 0, 0, 0, 0, 0]);
}

/* ------------------------------------------------------------- text marks */

/**
 * The four formatting marks. Letters, which the set otherwise avoids — the
 * eight sort icons that carried A and Z were drawn and dropped because a
 * counter closes at icon size — but bold and italic read as nothing without
 * them, and `language` already set the precedent. The counters here are wide:
 * the B's bowls are 9 and 11 across painted, the U's 10.
 *
 * Sharp squares the free ends and drops the B's two stem corners. An end that
 * lands ON another stroke is a T-junction and takes no extension: the italic
 * stem dies on its own serifs, so only the four serif ends move.
 */
export const textMark = {
  italic: (sharp) => sharp
    ? 'M9 3L22 3M2 21L15 21M16 3L9 21'
    : 'M10 3H21M3 21H14M16 3L9 21',

  underline: (sharp) => {
    const t = sharp ? 2 : 3;
    return new Path().M([6, t]).L([6, 11]).A([12, 11], 180, 0, -1).L([18, t]).toString() +
      (sharp ? 'M2 21L22 21' : 'M3 21H21');
  },

  // The bowl's arc is a half circle, so its radius IS half its height and only
  // the shoulder is free: the lower bowl is set a unit wider than the upper,
  // which is what stops a B reading as an 8.
  /**
   * The B as a SKELETON, not an outline — the same lesson the numerals taught:
   * a stem, a top bar, a bowl, a middle bar, a second bowl, a foot. Nothing
   * closes, so nothing encloses a fillable region, so it needs no duotone and
   * no fill and it sits with the other three marks as stroke only. Drawn as
   * two runs that meet on the stem and on the middle bar, which are junctions,
   * not corners: the upper bowl dies on the bar at (13,11) rather than
   * retracing it.
   */
  bold: () =>
    'M5 21V3H13C15.2091 3 17 4.7909 17 7C17 9.2091 15.2091 11 13 11' +
    'M5 11H14C16.7614 11 19 13.2386 19 16C19 18.7614 16.7614 21 14 21H5',

  // The first draw put a flat bar across the top and a bowl under it, which is
  // a 5, not an S. An S has no bar: two half-and-a-bit circles sharing a point,
  // the upper opening down-right and the lower up-left, meeting at (12,12) —
  // which is exactly where the rule crosses.
  /**
   * Zafar's 8 Sep drawing: the S is BROKEN, two arcs rather than one stroke.
   * The top bowl keeps only its left flank and crown, 180 to 317 degrees, and
   * the bottom bowl is unchanged at -90 to 160. What went is the diagonal
   * between them, which ran along the rule and was ink the rule already laid.
   *
   * That makes the bottom bowl's start a T-junction rather than a free end:
   * (12, 12) sits on the rule's own centre line, so its butt cap is buried by
   * construction and sharp does not extend it. The other three ends are free.
   */
  strikethrough: (sharp, { r = 4, top = [180, 317], bot = [-90, 160] } = {}) => {
    const rad = (t) => (t * Math.PI) / 180;
    const tan = (t) => [-Math.sin(rad(t)), Math.cos(rad(t))];   // travel, increasing t
    const push = (p, u) => { const k = sharpEndIn(p, u); return [p[0] + k * u[0], p[1] + k * u[1]]; };
    const arc = (c, [t0, t1], { freeStart = true, freeEnd = true } = {}) => {
      const A = onArc(c, r, t0), B = onArc(c, r, t1);
      const out0 = mul(tan(t0), -1), out1 = tan(t1);
      const p = new Path().M(sharp && freeStart ? push(A, out0) : A);
      if (sharp && freeStart) p.L(A);
      p.A(c, t0, t1, 1);
      if (sharp && freeEnd) p.L(push(B, out1));
      return p.toString();
    };
    return arc([12, 8], top) +
      arc([12, 16], bot, { freeStart: false }) +
      (sharp ? 'M2 12L22 12' : 'M3 12H21');
  },
};

/**
 * The B's two bowls, as separate contours so each keeps its own counter.
 *
 * Only the letter's own corners are filleted. The two bowls meet halfway down
 * the stem, and filleting there put a curve on each of them, which pinched the
 * stem's left edge into a waist — the stem is one straight line from the top
 * corner to the bottom one, so the mid junction is square on both bowls.
 */
export function boldBowls({ sharp = false, x0 = 5, top = 3, mid = 11, bot = 21, upper = 13, lower = 14, r = 1 } = {}) {
  const rr = sharp ? 0 : r;
  const bowl = (y0, y1, xr, rTop, rBot) => {
    const h = (y1 - y0) / 2;
    const p = new Path().M([x0 + rTop, y0]).L([xr, y0]).A([xr, y0 + h], -90, 90, 1).L([x0 + rBot, y1]);
    if (rBot) p.A([x0 + rBot, y1 - rBot], 90, 180, 1); else p.L([x0, y1]);
    p.L([x0, y0 + rTop]);
    if (rTop) p.A([x0 + rTop, y0 + rTop], 180, 270, 1);
    return p.Z();
  };
  return [bowl(top, mid, upper, rr, 0), bowl(mid, bot, lower, 0, rr)];
}

/* ------------------------------------------------- lists, quotes and chains */

/**
 * Read off the references before drawing, which the first pass was not: the
 * numerals in an ordered list are SKELETONS — a 1 is a flag, a stem and a
 * base, a 2 is a base, a diagonal and a hook — so nothing encloses and nothing
 * has a counter to lose, which is the only way a numeral survives 6 units
 * against a 2-unit pen. There are two of them, not three. `text-quote` runs
 * its FIRST line short and the quoted block long, not the other way round. And
 * `unlink` carries break marks; two hooks facing each other only say apart.
 */
const sixAng = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
const sixAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sixMul = (a, k) => [a[0] * k, a[1] * k];
const ROWS = [5, 12, 19];
const sixRule = (x0, x1, y, e = 0) => `M${n(x0 - e)} ${n(y)}${e ? 'L' + n(x1 + e) + ' ' + n(y) : 'H' + n(x1)}`;
const sixDot = (cx, cy, r = 1) => new Path().M([cx + r, cy]).A([cx, cy], 0, 360, 1).Z().toString();

export const sixIcon = {
  /**
   * The bullets are FILLED, not stroked. A circle under a 2-unit pen paints an
   * annulus two units wider than its own path, which is what the first build
   * shipped; filled, it is a mark off the dot ladder and carries the rules'
   * own weight.
   *
   * Zafar's 8 Sep drawing (refs/list.svg) takes it to the ladder's 3 — the
   * size that reads as an element of its own rather than as punctuation — on
   * centres at x = 3.5, and moves the rules out to 8 for it: the bullet's ink
   * ends on 5, the rule's begins on 7, so the gap is exactly the house 2.
   *
   * The ink is 2..22 by 3.5..20.5, so it carries the same OPTICAL warning it
   * always has — 20 wide where a horizontal drawing is drawn 22. That is a
   * decision about the gutter family rather than about this drawing: `list`,
   * `list-ordered` and `text-quote` all sit on 2-unit side padding, and
   * `list-check` and the other signed rules all sit on 1. One of the two is
   * wrong and it is the same answer for all five.
   */
  list: (sharp) => ({
    dots: ROWS.map((y) => sixDot(3.5, y, 1.5)).join(''),
    rules: ROWS.map((y) => sixRule(8, 21, y, sharp ? 1 : 0)).join(''),
  }),

  /**
   * Both numerals are set on the same 3..7, so the ink lands on 2..22 with
   * equal padding either side — the first build ran 1.5 left against 2 right,
   * and had the numerals 1.5 from the rules where the guide asks 2. The rules
   * start at 11 for that 2, and the 1 and the 2 are placed at 3 and 15 so the
   * box closes on 2..22 vertically as well.
   */
  'list-ordered': (sharp) => {
    const e = sharp ? 1 : 0;
    const one = (y) => `M3.5 ${n(y + 1.5)}L5 ${n(y)}L5 ${n(y + 5)}M${n(3 - e)} ${n(y + 5)}${e ? 'L' + n(7 + e) + ' ' + n(y + 5) : 'H7'}`;
    const two = (y) =>
      `M3 ${n(y + 1.3)}C3 ${n(y + 0.5)} 3.84 ${n(y)} 4.89 ${n(y)}` +
      `C6.05 ${n(y)} 7 ${n(y + 0.7)} 7 ${n(y + 1.7)}` +
      `C7 ${n(y + 3.6)} 3 ${n(y + 4.9)} 3 ${n(y + 6)}${e ? 'L' + n(7 + e) + ' ' + n(y + 6) : 'H7'}`;
    return one(3) + two(15) + ROWS.map((y) => sixRule(11, 21, y, e)).join('');
  },

  'text-quote': (sharp) => {
    const e = sharp ? 1 : 0;
    return sixRule(3, 16, ROWS[0], e) +
      `M3 ${n(ROWS[1] - e)}${e ? 'L3 ' + n(ROWS[2] + e) : 'V' + n(ROWS[2])}` +
      ROWS.slice(1).map((y) => sixRule(7, 21, y, e)).join('');
  },

};

/**
 * The chain on the diagonal — `link`'s own construction, a half stadium each
 * side, on a 45 degree axis. The corner sets the size: the painted extreme
 * sits (d + r + 1) along the axis, which at 45 degrees is (d + r + 1)/sqrt2 in
 * x, so d + r + 1 = 14 lands it on 22.
 */
export function sixChain({ sharp = false, r = 4, arm = 2, bar = 4, broken = false, gap = 0, ticks = false } = {}) {
  const u = [1 / Math.SQRT2, -1 / Math.SQRT2], nm = [1 / Math.SQRT2, 1 / Math.SQRT2];
  const C = [12, 12];
  // The far end of a half stadium paints a DISC of radius r + 1 about its own
  // centre, so the extreme is that centre's x plus r + 1 — not the axial reach
  // divided by root two, which is what the first pass assumed and what put the
  // drawing 0.64 outside its own box. 12 + d/sqrt2 + r + 1 = 22 solves it.
  const d = (9 - r) * Math.SQRT2 - gap;
  const k = sharp ? sharpEnd(u) : 0;                 // 0.414 at 45 degrees
  const half = (sgn) => {
    const c = sixAdd(C, sixMul(u, sgn * (d + gap)));
    const armEnd = sixMul(u, -sgn * (arm + k));
    const e1 = sixAdd(c, sixMul(nm, r)), e2 = sixAdd(c, sixMul(nm, -r));
    return new Path().M(sixAdd(e1, armEnd)).L(e1).A(c, 45, 45 - sgn * 180, -sgn).L(sixAdd(e2, armEnd)).toString();
  };
  const mid = broken ? '' : new Path().M(sixAdd(C, sixMul(u, -(bar + k)))).L(sixAdd(C, sixMul(u, bar + k))).toString();
  const spark = ticks
    ? [1, -1].map((sgn) => {
        const a = sixAdd(C, sixMul(nm, sgn * (5.5 - k))), b = sixAdd(C, sixMul(nm, sgn * (8 + k)));
        return `M${n(a[0])} ${n(a[1])}L${n(b[0])} ${n(b[1])}`;
      }).join('')
    : '';
  return half(1) + half(-1) + mid + spark;
}

/* ------------------------------------------------------------- link-2 */

/**
 * link-2, refitted to Zafar's 8 Sep drawing (refs/link-2.svg).
 *
 * Two half stadiums on the true 45 degree diagonal, each with ONE WHOLE FLANK
 * left out — the side the other link passes through — traced cap, flank, cap
 * and stopped. The second link is the first turned 180 degrees about (12,12),
 * so the pair cannot drift apart.
 *
 * What changed from the drawing this replaces is the axis: that one ran its
 * flank at 55.8 degrees, this one at 45, which is the house's own free
 * diagonal and what makes the drawing its own mirror.
 *
 * Three numbers carry it, and two of the three are forced rather than chosen:
 *
 *   r = 3.625      the cap radius. His caps measure 3.552 and 3.713 — one
 *                  radius drawn twice, Figma's handles apart — and 3.625 is
 *                  the mean rounded to the eighth every centre then lands on.
 *   cap1 = (5.625, 15.875)   NOT free. The far cap's disc sets three of the
 *                  four ink edges, so x = r + 2 puts the ink on 1 and
 *                  y = 20.5 - (r + 1) puts it on 20.5.
 *   cap2 = (10.75, 10.75)    the inner cap on the perpendicular through the
 *                  canvas centre, which is his drawing to 0.15.
 *
 * Ink 1..23 by 3.5..20.5: 22 x 17, the horizontal size, centred on both axes.
 *
 * **It cannot reach the guide's 2 units between the links, and the arithmetic
 * says why rather than the eye.** Write `b` for each link's own perpendicular
 * offset from the diagonal. The binding pair is link 1's free end against link
 * 2's flank, and their separation is exactly twice that offset, while the
 * width is pinned at 22 — so
 *
 *     gap    = 2|b| - 2                  1.54 as drawn, |b| = 5/(2 sqrt2)
 *     height = 22 - 2 sqrt2 |b|          17 as drawn
 *
 * and 2 units of daylight costs |b| = 2, a height of 16.34, and — because the
 * second pair, link 1's outer free end against link 2's inner cap, tightens as
 * the pair slides — the flank shortened from 7.25 to 6.42 as well. Both are
 * redraws of his drawing rather than fits of it, so the gap stands at 1.54,
 * which is what his own file measures.
 */
export function link2Path({ r = 3.625, cap1 = [5.625, 15.875], cap2 = [10.75, 10.75], sharp = false } = {}) {
  const U = unit(sub(cap2, cap1));                      // the 45 degree axis
  const N = [-U[1], U[0]];                              // its normal, +n side
  const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const half = (sgn) => {
    const flip = (p) => (sgn > 0 ? p : [24 - p[0], 24 - p[1]]);
    const c1 = flip(cap1), c2 = flip(cap2);
    const nn = mul(N, sgn), uu = mul(U, sgn);
    // A free end here is an arc terminus whose tangent runs along the axis, so
    // it takes the diagonal cut like any other 45 degree end: 0.414, not the
    // unit an axis-aligned end would take.
    const k = sharp ? sharpEnd(uu) : 0;
    const p = new Path();
    p.M(add(add(c1, mul(nn, r)), mul(uu, k)));
    if (k) p.L(add(c1, mul(nn, r)));
    p.A(c1, ang(nn), ang(mul(uu, -1)), 0).A(c1, ang(mul(uu, -1)), ang(mul(nn, -1)), 0);
    p.L(add(c2, mul(nn, -r)));                          // the drawn flank
    p.A(c2, ang(mul(nn, -1)), ang(uu), 0).A(c2, ang(uu), ang(nn), 0);
    if (k) p.L(add(add(c2, mul(nn, r)), mul(uu, -k)));
    return p.toString();
  };
  return half(1) + half(-1);
}

/* --------------------------------------------------------------- sparkle */

/**
 * The four-pointed star. Eight vertices — four tips on the axes at `R`, four
 * waists on the diagonals at `w` — so the arms are straight-flanked and the
 * waist is a concave fillet, which is what the references draw rather than the
 * quarter-circle star a naive construction gives. `w` runs at 0.4 R, which is
 * what Zafar's own file measures.
 *
 * The radii are split for the reason `zap`'s are: a fillet at an acute vertex
 * pulls the painted extreme in by r(1/sin t − 1), so the tips take the
 * smallest ladder radius and the waist, which is obtuse and sets no extreme,
 * takes 1.5. R is then solved so the painted tip lands on 2, not the vertex.
 */
export function sparkleStar({ c = [12, 12], R = 9.836, w = null, rTip = 0.5, rWaist = 1.5, sharp = false } = {}) {
  const ww = w ?? R * 0.4;
  // Each tip is on an axis and symmetric about it, so the pull is along that
  // axis and the sharp tip radius falls straight out of it. The waist is
  // obtuse and sets no extreme, so it is left where it is.
  const half = Math.acos((R - ww / Math.SQRT2) / Math.hypot(R - ww / Math.SQRT2, ww / Math.SQRT2));
  const Rs = sharp ? R - filletPull(rTip, half) : R;
  const pts = [];
  for (let i = 0; i < 4; i++) {
    const a = -90 + i * 90, b = a + 45;
    pts.push([c[0] + Rs * Math.cos((a * Math.PI) / 180), c[1] + Rs * Math.sin((a * Math.PI) / 180)]);
    pts.push([c[0] + ww * Math.cos((b * Math.PI) / 180), c[1] + ww * Math.sin((b * Math.PI) / 180)]);
  }
  return polyContour(pts, pts.map((_, i) => (sharp ? 0 : i % 2 === 0 ? rTip : rWaist)));
}

/**
 * The pair, on Zafar's numbers: the big star R 7 on (15,15), the small R 4.25
 * on (6.25,6.25). Every one of those is a quarter unit, the ink comes out on
 * 1..23 both ways centred, and the two clear each other by 2.44 — all of which
 * my own solved decimals only approximated.
 */
export function sparklePair({ sharp = false } = {}) {
  return [
    sparkleStar({ c: [15, 15], R: 7, sharp }),
    sparkleStar({ c: [6.25, 6.25], R: 4.25, sharp }),
  ];
}

/* ---------------------------------------------------------------- unlink */

/**
 * unlink, refitted to Zafar's 8 Sep drawing (refs/unlink.svg).
 *
 * The chain come apart on the diagonal, with a break mark at each far corner.
 * What changed is what the two halves ARE: the drawing this replaces bent them
 * as quarter arcs of one circle about (12,12), and these are SEMICIRCLES — the
 * rounded end of a stadium, which is `link`'s own construction turned 45
 * degrees. Two arcs of one circle read as a circle cut in half; two capsule
 * ends read as a chain that has come apart, which is the icon.
 *
 * The radius is derived, not picked. Each cap centre sits its own radius from
 * (12,12) along the axis, so the painted extreme is r/sqrt2 + r + 1 from the
 * centre, and landing that on 2 — the arcs' own 20 x 20 box, inside the ticks'
 * 22 x 22 — gives
 *
 *     r (1 + 1/sqrt2) + 1 = 10   ->   r = 18 - 9 sqrt2 = 5.272078
 *
 * which is his file to four decimals, endpoints included: he kept the old
 * drawing's arc ENDS at 12 ± 7.4559 and bulged the arc between them out into
 * a half circle, and 2 x r/sqrt2 is that same 7.4559.
 *
 * Ink 1..23 both ways, the ticks setting all four edges, nothing closer than
 * 2.03 — the tick's inner cap against the near arc's terminus.
 */
export function unlinkPath(sharp = false, k = 0.8) {
  const S2 = Math.SQRT2;
  const r = (18 - 9 * S2) * k;
  const U = [1 / S2, -1 / S2], N = [1 / S2, 1 / S2], C = [12, 12];
  const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  // Both arc ends are 45 degree termini, so they take the diagonal cut rather
  // than the unit an axis-aligned end takes — which is what the old drawing's
  // ends were, and why this is not the same number as the one it replaces.
  const arc = (sgn) => {
    const c = add(C, mul(U, sgn * r));
    const nn = mul(N, sgn), uu = mul(U, sgn);
    const k = sharp ? sharpEnd(uu) : 0;
    // The cap bulges toward `uu`, so its flat side — the one the arc's two ends
    // are tangent to — faces the other way, and that is where a free end grows.
    const p = new Path().M(add(add(c, mul(nn, r)), mul(uu, -k)));
    if (k) p.L(add(c, mul(nn, r)));
    p.A(c, ang(nn), ang(uu), 0).A(c, ang(uu), ang(mul(nn, -1)), 0);
    if (k) p.L(add(add(c, mul(nn, -r)), mul(uu, -k)));
    return p.toString();
  };
  // The ticks are axis-aligned, so each free end takes the whole unit. Both
  // ends of one, not just the outer: a tick extended at one end only paints a
  // unit shorter than its rounded sibling, which is the defect the extension
  // exists to prevent.
  // The ticks scale with the drawing but the pen does not, so the whole thing
  // is `k` about (12, 12) and the ink comes out 2 wider than 20k either way.
  const e = sharp ? 1 : 0;
  const g = (v) => 12 + k * (v - 12);
  const tick = (x0, y0, x1, y1) => `M${n(x0)} ${n(y0)}L${n(x1)} ${n(y1)}`;
  return arc(-1) + arc(1) +
    tick(g(8), g(5) + e, g(8), g(2) - e) + tick(g(5) + e, g(8), g(2) - e, g(8)) +
    tick(g(16), g(19) - e, g(16), g(22) + e) + tick(g(19) - e, g(16), g(22) + e, g(16));
}

/* ------------------------------------------------------------- sliders */

/**
 * sliders-horizontal and -vertical, from Zafar's 8 Sep drawing.
 *
 * The change is that each rail is now BROKEN at its knob. The knob was always
 * a tick crossing an unbroken rail; now the rail stops 2 clear of the knob's
 * ink on ONE side and runs into it on the other, which is what gives the knob
 * air without a knockout the stroke style is not allowed.
 *
 * Which side breaks is not a choice per row — it is the LONGER side every
 * time, so the gap lands where there is room for it:
 *
 *   knob 16   left 13 long, right 5    break left,  rail 3..12 and 16..21
 *   knob 10   left 7,       right 11   break right, rail 3..10 and 14..21
 *   knob 14   left 11,      right 7    break left,  rail 3..10 and 14..21
 *
 * The cut lands on `knob -/+ 4`: the knob's ink reaches 1, the guide asks 2,
 * and the rail's own cap adds the last unit.
 *
 * The rail end that runs into the knob is a T-junction: its butt cap sits on
 * the knob's own centre line and is buried by construction, so sharp does not
 * extend it. Only the four genuinely free ends take the unit — the rail's two
 * outer ends, its cut end, and the knob's two tips.
 *
 * The vertical is the horizontal transposed, exactly, which is what keeps the
 * pair from drifting apart one member at a time.
 */
export function slidersPath({ vertical = false, sharp = false, rails = [5, 12, 19], knobs = [16, 10, 14] } = {}) {
  const e = sharp ? 1 : 0;
  // (along the rail, across it) -> canvas, so one construction serves both
  const P = (a, b) => (vertical ? [b, a] : [a, b]);
  const seg = (a0, b0, a1, b1) => `M${n(P(a0, b0)[0])} ${n(P(a0, b0)[1])}L${n(P(a1, b1)[0])} ${n(P(a1, b1)[1])}`;
  let d = '';
  rails.forEach((p, i) => {
    const k = knobs[i];
    const breakLeft = k - 3 > 21 - k;
    // the cut end is free and takes the unit; the end that meets the knob is a
    // T-junction and does not
    if (breakLeft) {
      d += seg(3 - e, p, k - 4 + e, p) + seg(21 + e, p, k, p);
    } else {
      d += seg(3 - e, p, k, p) + seg(21 + e, p, k + 4 - e, p);
    }
    // One segment, not the two halves his file exports. Same ink, and it keeps
    // SPACING quiet: two butt caps meeting end-to-end on the rail measure a gap
    // of exactly 0.00 between themselves, where two round caps overlap and read
    // as one element.
    d += seg(k, p - 2 - e, k, p + 2 + e);
  });
  return d;
}

/* ------------------------------------------------------------- bell-ring */

/**
 * The two sound waves, and nothing else: `bell-ring` is `bell` with these
 * added, read straight out of `raw/bell/` so the two cannot drift apart.
 *
 * A wave is CONCENTRIC with the dome, which is what makes the clearance one
 * number rather than a curve-to-curve solve. The dome is r=5 about (12, 8) and
 * paints out to 6, so a wave whose centre line is at R paints in to R - 1 and
 * the guide's 2 units give R = 9 exactly.
 *
 * Where it starts and stops is forced too, not chosen:
 *
 *   the near end   on the dome's own horizontal, (21, 8) — any lower and it
 *                  runs at the skirt, which flares out past radius 9
 *   the far end    where its ink meets the bell's own top ink at y = 2:
 *                  8 + 9 sin t - 1 = 2, so sin t = -5/9 and the end lands on
 *                  (12 + sqrt56, 3)
 *
 * That second one is what keeps the drawing centred. Run to where the canvas
 * allows instead (sin t = -2/3, ink on y = 1) and the box is 20 x 21 with 1
 * unit of padding at the top against 2 at the bottom, which is a real skew
 * rather than the odd-extent kind. Stopped on y = 3 the ink is 2..22 both
 * ways: 20 x 20, centred, and on the square size.
 */
/** The bell's own stroke, for measuring a wave's clearance against. */
const BELL = 'M12 3C14.7614 3 17 5.23858 17 8C17 13 19 14 19 15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15C5 14 7 13 7 8C7 5.23858 9.23858 3 12 3Z';

/**
 * The longest a free end may be pushed along `dir` before its butt cap's ink
 * comes within `want` of `obstacle`. Bisected rather than solved: the obstacle
 * is a bezier skirt and the binding point slides along it as the cap moves.
 */
function clearBy(p, dir, obstacle, want, reach = 1, cap = 1) {
  const pts = subpaths(obstacle, 400).subs.flatMap((s) => s.pts);
  const nrm = [-dir[1], dir[0]];
  const gap = (k) => {
    const e = [p[0] + k * dir[0], p[1] + k * dir[1]];
    let best = Infinity;
    for (const sgn of [1, -1]) {
      const c = [e[0] + sgn * nrm[0] * cap, e[1] + sgn * nrm[1] * cap];
      for (const q of pts) best = Math.min(best, Math.hypot(c[0] - q[0], c[1] - q[1]) - reach);
    }
    return best;
  };
  if (gap(1) >= want) return 1;
  let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (gap(m) >= want) lo = m; else hi = m; }
  return lo;
}

export function bellWaves({ sharp = false, R = 9, c = [12, 8], plate = null } = {}) {
  const end = -Math.asin(5 / 9) * 180 / Math.PI;          // -33.749 degrees
  const wave = (mirror) => {
    const sgn = mirror ? -1 : 1;
    const flip = (q) => [mirror ? 24 - q[0] : q[0], q[1]];
    const A = flip(onArc(c, R, 0)), B = flip(onArc(c, R, end));
    // travel runs from A to B, so the outward direction at A is its reverse
    const tan = (t) => [sgn * Math.sin((t * Math.PI) / 180), -Math.cos((t * Math.PI) / 180)];
    const outA = mul(tan(0), -1), outB = tan(end);
    // clamped to the ROUNDED drawing's own box, not the canvas: a butt cap's
    // corner may not paint outside what the rounded sibling paints
    const box = [2, 2, 22, 22];
    // The far end is bound by the box; the NEAR end is bound by the bell — it
    // grows straight at the skirt, which flares out past radius 9, and the full
    // unit costs 0.03 of the guide's 2. So it is cut to the clearance instead,
    // which is what the house does wherever a gap binds before the box does.
    // Measured against the PLATE where there is one, because that is the bell's
    // real painted edge: the stroke's own centre line reads 2.00 clear here and
    // the plate, which flares with the skirt, reads 0.07 of overlap.
    const kA = sharp
      ? Math.min(sharpEndIn(A, outA, box),
                 clearBy(A, outA, BELL, 2),
                 plate ? clearBy(A, outA, plate, 2, 0) : 1)
      : 0;
    const kB = sharp ? sharpEndIn(B, outB, box) : 0;
    const p = new Path().M(kA ? add(A, mul(outA, kA)) : A);
    if (kA) p.L(A);
    p.A(flip(c), mirror ? 180 : 0, mirror ? 180 - end : end, mirror ? 1 : -1);
    if (kB) p.L(add(B, mul(outB, kB)));
    return p.toString();
  };
  return wave(false) + wave(true);
}
