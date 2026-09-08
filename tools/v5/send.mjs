/**
 * The paper plane, twice: `send` on the diagonal and `send-horizontal` flat.
 *
 * The drawing is Zafar's, from `refs/send.svg`, fitted rather than redrawn: a
 * broad dart with the tip on the box corner, softly filleted tail corners and a
 * notch barely two units deep. Both names come out of one construction, so the
 * pair cannot drift apart the way a plane drawn twice would.
 *
 *   T   the tip, `a` along the axis from the centre
 *   A   the tail's far corner, `b` back along the axis and `c` across it
 *   B   the tail's near corner, the mirror of A
 *   N   the notch, `d` forward of the tail line, on the axis
 *   fold  N to T, the spine that makes it read as folded paper
 *
 * The tip is a true vertex with a round join, which is `pen`'s tip exactly.
 * The two tail corners are filleted at 1 and the notch at 3.
 *
 * ## Where the numbers come from
 *
 * His drawing gives the two proportions that are a decision rather than a
 * solve, and both land on house values:
 *
 *   c = 15 / sqrt2   the tail corners run 15 units apart across the canvas
 *   d = 2            the notch is one painted gap deep
 *
 * Everything else is the box. A fillet holds the paint short of its own
 * vertex, so the ink box is set by the fillet's circle rather than by the
 * corner: radius r + 1 about a centre r / sin(phi) inside along the bisector.
 * Put that circle tangent to the box and the tail is pinned.
 *
 *   send              the tip on (22, 2) paints x = 23 and y = 1 at once, and
 *                     the corner circle tangent to x = 1 does the other two
 *                     sides together. 22 x 22, the full bleed a diagonal
 *                     object takes, which is `pen`'s box too.
 *   send-horizontal   the tip on (22, 12) gives x = 23, and the corner circle
 *                     tucked into the box corner at (3, 3) gives x = 1 and
 *                     y = 1 and y = 23. 22 x 22 as well: a plane pointing
 *                     right is very nearly as tall as it is long, so squaring
 *                     it up is what keeps the two the same plane.
 *
 * That solve is against the fillet's CIRCLE, and a fillet is drawn as one cubic
 * per corner. Over the 129 degrees these corners turn, a single cubic bulges
 * about two thousandths of a unit off the circle it stands for, which is
 * nothing to look at and is still ink outside the padding floor. So each
 * rounded solve is settled afterwards against the drawn path: two or three
 * passes of `strokedBBox`, moving the tail by what the last pass missed by.
 * The flat one is the one that needs it — it is tangent on both axes, so it
 * meets the box where the cubic's error is largest, while the diagonal is
 * tangent on one and lands within a ten-thousandth on its own.
 *
 * ## Sharp
 *
 * Sharp takes the fillets out, and a round join then paints a whole disc about
 * the vertex the fillet was holding it short of, so the drawing grows by
 * `r (1 / sin phi - 1)` at each tail corner and would paint outside its own
 * box. The tail is re-solved for it rather than de-filleted in place: hold the
 * shape, which is the notch's edge angle `theta` and, where there is room for
 * it, the tip's half-angle `psi`, and put the true vertices where the fillet
 * circles were. `send` keeps `psi` exactly and solves the tail's split; the
 * flat one is pinned on both axes and lands on b = c = 10, tail corners on
 * (2, 2) and (2, 22), which is as clean as this gets.
 */
import { Path, polyContour, add, mul, sub } from './geom.mjs';
import { offsetContour, contourPath, verify } from './offset.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const S2 = Math.SQRT2;
const C0 = [12, 12];

/** The corner fillets: the tail's two, and the notch. */
export const R_CORNER = 1;
export const R_NOTCH = 3;

/** The two planes, as the axis and tip reach that differ. */
const AXIS = {
  send: { u: [1 / S2, -1 / S2], a: 10 * S2 },
  'send-horizontal': { u: [1, 0], a: 10 },
};

// His two proportions, on the reference drawing.
const C_REF = 15 / S2;
const D_REF = 2;
/** The notch's edge, in radians off the tail line. Held across all four. */
const THETA = Math.atan(D_REF / C_REF);

/**
 * The fillet circle's centre, as an offset from the tail corner.
 *
 * Both angles are read in the plane's own frame, so this serves the diagonal
 * and the flat one alike; the caller turns it into the canvas.
 */
const corner = (psi) => {
  const phi = (Math.PI / 2 - THETA - psi) / 2;   // half the corner's interior angle
  const beta = (psi + Math.PI / 2 - THETA) / 2;  // the inward bisector, off the axis
  const k = R_CORNER / Math.sin(phi);
  return { phi, beta, k };
};

/** The four points of a solve, in the canvas. */
function points(name, { a, b, c, d }) {
  const { u } = AXIS[name];
  const nrm = [-u[1], u[0]];
  const at = (along, across) => add(C0, add(mul(u, along), mul(nrm, across)));
  return { T: at(a, 0), A: at(-b, -c), B: at(-b, c), N: at(-b + d, 0) };
}

/** The closed outline of a solve, for a given corner treatment. */
function outline(name, p, sharp) {
  const { T, A, B, N } = points(name, p);
  const r = sharp ? 0 : R_CORNER;
  return polyContour([A, T, B, N], [r, 0, r, sharp ? 0 : R_NOTCH]);
}

/**
 * Move the tail by whatever the drawn path misses the box by.
 *
 * `send` is tangent on one axis only, so its x carries both sides; the flat one
 * is tangent on both and each axis moves its own parameter.
 */
function settle(name, p) {
  let { b, c } = p;
  const flat = name !== 'send';
  for (let i = 0; i < 8; i++) {
    const q = flat ? { ...p, b, c, d: c * Math.tan(THETA) } : { ...p, b, c };
    const [x0, y0] = strokedBBox(String(outline(name, q, false)), 1, 'round');
    b += x0 - 1;
    if (flat) c += y0 - 1;
  }
  return flat
    ? { ...p, b, c, d: c * Math.tan(THETA), psi: Math.atan(c / (p.a + b)) }
    : { ...p, b, psi: Math.atan(c / (p.a + b)) };
}

/**
 * The four points, solved for one name and one corner treatment.
 *
 * Returned in the plane's own frame as `{ a, b, c, d }` plus the tip's
 * half-angle, so the sharp solve can hold the shape the rounded one set.
 */
function solve(name, sharp) {
  const { a } = AXIS[name];
  const diag = name === 'send';
  if (!sharp) {
    if (diag) {
      // c and d are his; b is whatever puts the corner circle on x = 1.
      const c = C_REF, d = D_REF;
      let b = 5;
      for (let i = 0; i < 60; i++) {
        const { beta, k } = corner(Math.atan(c / (a + b)));
        // A.x = 12 - (b + c) / sqrt2, and the bisector sits 45 degrees round
        b = S2 * (9 + k * Math.cos(beta - Math.PI / 4)) - c;
      }
      return settle(name, { a, b, c, d });
    }
    // Flat: the circle tucks into the box corner at (3, 3), which is both axes
    // at once, so b and c are solved together and psi is not free.
    let b = 10, c = 10;
    for (let i = 0; i < 200; i++) {
      const { beta, k } = corner(Math.atan(c / (a + b)));
      b = 9 + k * Math.cos(beta);
      c = 9 + k * Math.sin(beta);
    }
    return settle(name, { a, b, c, d: c * Math.tan(THETA) });
  }
  // Sharp: true vertices, so each tail corner paints a disc of 1 about itself.
  if (diag) {
    // b + c = 10 sqrt2 lands x = 1 and y = 23 together; psi is held.
    const { psi } = solve(name, false);
    const t = Math.tan(psi);
    const c = (20 * S2 * t) / (1 + t);
    return { a, b: 10 * S2 - c, c, d: c * Math.tan(THETA), psi };
  }
  // Flat: x = 1 gives b = 10, y = 1 and y = 23 give c = 10.
  return { a, b: 10, c: 10, d: 10 * Math.tan(THETA), psi: Math.atan(10 / 20) };
}

/** The solved parameters, in the plane's own frame. */
export const PLANE = Object.fromEntries(
  Object.keys(AXIS).flatMap((k) => [
    [k, solve(k, false)],
    [`${k}|sharp`, solve(k, true)],
  ]),
);

const parts = (k, sharp) => points(k, PLANE[sharp ? `${k}|sharp` : k]);

/** The closed outline: tail corner, tip, tail corner, notch. */
export function body(k, { sharp = false } = {}) {
  return outline(k, PLANE[sharp ? `${k}|sharp` : k], sharp);
}

/** The spine, from the notch out to the tip. Both ends land in other ink. */
export function fold(k, { sharp = false } = {}) {
  const { T, N } = parts(k, sharp);
  return new Path().M(N).L(T).toString();
}

/** The plate: the outline offset a unit, checked sample by sample. */
export function plate(k, opts = {}) {
  const c = body(k, opts);
  const off = offsetContour(c.segs, 1);
  verify(c.segs, off, 1);
  return contourPath(off);
}

/** How far along the fold the fill's crease closes, from the notch. */
export const CREASE_REACH = 0.5;

/**
 * The crease, knocked out of the fill: a wedge that starts at the notch's ink
 * and closes to a point half way along the fold.
 *
 * This is the drawing's one deliberate exception, and it is Zafar's call from a
 * reference rather than anything the guide would produce. `map`'s rule — a
 * panelled object opens one whole panel and leaves its folds black — was tried
 * first and is wrong here twice over. Opening the near wing leaves the spine
 * with ink on one side and white on the other, so what reads is the fold's near
 * EDGE rather than the fold. Slotting it at a constant two units reads as a
 * plane sawn in half. A paper plane is one sheet creased down the middle, and
 * what says that is a wedge: widest where the sheet is doubled over at the
 * tail, closing as the two halves come back together toward the nose.
 *
 * What the exception does NOT get to do is spend the notch's ink. The wedge was
 * built once with its mouth on the plate's own dent, so the white ran straight
 * out of the tail — and where its side crossed the dent's edge it pinched the
 * near wing to a needle, which is the fault Zafar drew an arrow at. So the
 * wedge is an island: its back is the notch's INNER ink edge, the notch keeps
 * its two units all the way round, and every edge here is ink the stroke draws.
 *
 *   the sides    from the notch's ink at the fold's own width, closing on a
 *                point at CREASE_REACH along the fold
 *   the back     where the notch's two inner offsets cross, on the axis
 *                1 / cos t forward of it, cut by the notch's own arc
 *   the radius   the notch's fillet plus the unit the stroke paints on the tip
 *                side of it: 4 rounded, and 1 sharp, where there is no fillet
 *                and the round JOIN is the whole of the ink on that side
 *
 * Wound against the plate, so nonzero knocks it out.
 */
export function spine(k, { sharp = false } = {}) {
  const { u } = AXIS[k];
  const { a, b, d } = PLANE[sharp ? `${k}|sharp` : k];
  const nrm = [-u[1], u[0]];
  const at = (along, across) => add(C0, add(mul(u, along), mul(nrm, across)));
  const st = Math.sin(THETA), ct = Math.cos(THETA);
  const uN = -b + d;
  const shoulder = uN + (1 - st) / ct;
  const back = uN + 1 / ct;
  const apex = uN + CREASE_REACH * (a - uN);
  return polyContour(
    [at(apex, 0), at(shoulder, -1), at(back, 0), at(shoulder, 1)],
    [0, 0, (sharp ? 0 : R_NOTCH) + 1, 0],
  ).toString();
}
