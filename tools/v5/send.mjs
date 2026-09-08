/**
 * The paper plane, twice: `send` on the diagonal and `send-horizontal` flat.
 *
 * One construction, two sets of numbers, so the pair cannot drift apart the way
 * a plane drawn twice would. Four points and a fold:
 *
 *   T   the tip, `a` along the axis from the centre
 *   A   the tail's far corner, `b` back along the axis and `c` across it
 *   B   the tail's near corner, the mirror of A
 *   N   the notch, `inset` forward of the tail line, on the axis
 *   fold  N to T, the spine that makes it read as folded paper
 *
 * Every one of A, B and T is a TRUE vertex with a round join rather than a
 * fillet, which is `pen`'s tip exactly and is what makes sharp and regular the
 * same outline here: there is no fillet to take out. Only the notch is
 * filleted, and it is interior, so removing it in sharp cannot reach the box.
 *
 * ## Where the numbers come from
 *
 * The box, in both cases. A round join paints a disc of the half-width about a
 * true vertex, so each of the three corners puts ink exactly one unit past
 * itself in every direction, and the ink box falls straight out of the vertices:
 *
 *   horizontal   tip on (22, 12) and the tail line on x = 2 gives 1..23 across;
 *                the tail half-span of 8 gives 3..21 down. 22 x 18, the house
 *                horizontal size, centred.
 *   diagonal     the tip on (22, 2) puts ink on 23 and 1 at once, and the tail
 *                corners are then pinned by one equation rather than two:
 *                b + c = 10 sqrt2 lands the left edge on 1 and the bottom on 23
 *                together. 22 x 22, the full bleed a diagonal object takes,
 *                which is `pen`'s box too.
 *
 * That leaves how the tail is split between reach and span a free choice rather
 * than a solve, and it is set to keep the proportion the flat one has: `c` = 8
 * in both, so the two planes have the same tail and only the body lengthens.
 */
import { Path, polyContour, add, mul, sub, n } from './geom.mjs';
import { offsetContour, contourPath, verify } from './offset.mjs';

const S2 = Math.SQRT2;
const C0 = [12, 12];

/** The two planes, as the parameters that differ. */
export const PLANE = {
  'send-horizontal': { u: [1, 0], a: 10, b: 10, c: 8, inset: 4 },
  // b + c = 10 sqrt2 is the whole box constraint; c is held at the flat one's 8
  send: { u: [1 / S2, -1 / S2], a: 10 * S2, b: 10 * S2 - 8, c: 8, inset: 4 },
};

const parts = (k) => {
  const { u, a, b, c, inset } = PLANE[k];
  const nrm = [-u[1], u[0]];
  const at = (along, across) => add(C0, add(mul(u, along), mul(nrm, across)));
  return {
    T: at(a, 0),
    A: at(-b, -c),
    B: at(-b, c),
    N: at(-b + inset, 0),
  };
};

/** The closed outline: tail corner, tip, tail corner, notch. */
export function body(k, { sharp = false, notch = 1 } = {}) {
  const { T, A, B, N } = parts(k);
  return polyContour([A, T, B, N], [0, 0, 0, sharp ? 0 : notch]);
}

/** The spine, from the notch out to the tip. Both ends land in other ink. */
export function fold(k) {
  const { T, N } = parts(k);
  return new Path().M(N).L(T).toString();
}

/** The plate: the outline offset a unit, checked sample by sample. */
export function plate(k, opts = {}) {
  const c = body(k, opts);
  const off = offsetContour(c.segs, 1);
  verify(c.segs, off, 1);
  return contourPath(off);
}

/**
 * The panel the fill opens: everything on one side of the fold, inset a unit.
 *
 * The house rule is that a fill opens one WHOLE panel and never slots the line
 * that divides it, and that every edge of the panel is ink the stroke already
 * draws. The fold leaves exactly two panels and both satisfy that, so which one
 * opens is a reading rather than a solve: the near wing opens, so the mass sits
 * along the top edge and the plane reads as seen from slightly above.
 */
export function panel(k, { sharp = false } = {}) {
  const { T, B, N } = parts(k);
  const unit = (v) => { const L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; };
  const inner = (P, Q, R) => {
    // the vertex P pulled a unit inside the corner it makes between Q and R
    const e1 = unit(sub(Q, P)), e2 = unit(sub(R, P));
    const bis = unit(add(e1, e2));
    const half = Math.acos(Math.max(-1, Math.min(1, (e1[0] * bis[0] + e1[1] * bis[1]))));
    return add(P, mul(bis, 1 / Math.sin(half)));
  };
  const t = inner(T, B, N), b = inner(B, N, T), nn = inner(N, T, B);
  return polyContour([nn, t, b], [0, 0, sharp ? 0 : 0.5]).toString();
}
