/**
 * The pen family, on Zafar's 8 Sep drawing (refs/pen.svg).
 *
 * Two things changed and only one of them is a resize.
 *
 * **The resize is exact and uniform.** His pen is the shipped one scaled 10/9
 * about (12, 12) — every vertex, the cap radius 3 -> 10/3, the tip (3,21) ->
 * (2,22) — which takes the ink from 20 x 20 to 22 x 22, the full-bleed size a
 * diagonal object takes. Checked point for point rather than assumed: the cap
 * centre lands on (18.6667, 5.3333) and both shoulders land on his to 1e-4.
 *
 * **The band moved from the nib to the cap**, which is Lucide's `pen` and is
 * not a scale of anything. It used to close the nib wedge; it now cuts the
 * barrel just below the cap, and that is what changes the fill: there is no
 * nib triangle to knock out any more.
 *
 * ## The construction
 *
 * A stadium on the 45 degree axis with one end drawn out to a point:
 *
 *   Cc = (18.6667, 5.3333)   the cap's centre, R = 10/3 = half the bar width
 *   shoulders                where the parallel flanks stop, u = -15.79 from Cc
 *   tip                      on the axis, u = -23.57 from Cc, a true vertex
 *   band                     square across the bar at u = -1.762 from Cc
 *
 * Everything else is derived. The plate is `offsetContour` at 1 and verified,
 * the fill's knockout is the same contour inset by 1 and cut on the band, and
 * the `-off` pieces are the contour cut on the slash.
 *
 * ## What the fill knocks out, and why it is the cap end
 *
 * The house rule for a panelled object is that the fill opens one WHOLE panel
 * and never slots the lines — `map` settled that and `briefcase` repeated it —
 * and every edge of the opened panel has to be ink the stroke already draws.
 * The band leaves exactly two panels, and only the cap end satisfies that: its
 * boundary is the band on one side and the cap's own outline on the other. The
 * nib end cannot be opened, because the wedge's third edge would be a line
 * across the barrel with no ink behind it.
 *
 * That is a change of reading from the shipped fill, which opened the nib. It
 * is forced by where the band went, not chosen.
 */
import { Path, onArc, add, mul, sub, dot, n } from './geom.mjs';
import { offsetContour, contourPath, verify, clipContour } from './offset.mjs';

const S2 = Math.SQRT2;
const U = [1 / S2, -1 / S2];        // the pen's axis, pointing at the cap
const N = [1 / S2, 1 / S2];         // across it
const C0 = [12, 12];
const K = 10 / 9;                   // his scale, about the canvas centre

/** The shipped drawing's own numbers, scaled. */
const scale = (p) => [12 + K * (p[0] - 12), 12 + K * (p[1] - 12)];
const Cc = scale([18, 6]);
const R = 3 * K;
const uOf = (p) => dot(sub(p, Cc), U);
const nOf = (p) => dot(sub(p, Cc), N);
const at = (u, v) => add(Cc, add(mul(U, u), mul(N, v)));

const U_SH = uOf(scale([5.8284, 13.9289]));   // the shoulders, -15.7924
const U_TIP = uOf(scale([3, 21]));            // the tip,       -23.5702
const U_BAND = -1.76195;                      // his band, square across the bar
const ANG = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** The closed outline: cap arc, flank, nib wedge, flank. */
export function contour() {
  const p = new Path().M(at(0, R));
  p.L(at(U_SH, R)).L(at(U_TIP, 0)).L(at(U_SH, -R)).L(at(0, -R));
  // one 180 degree arc, emitted as two quarters so each stays a true circle
  p.A(Cc, ANG(mul(N, -1)), ANG(U), 0).A(Cc, ANG(U), ANG(N), 0);
  return p.Z();
}

/** The band across the barrel, both ends on a flank's own centre line. */
export const band = () => new Path().M(at(U_BAND, -R)).L(at(U_BAND, R)).toString();

/** The plate: the outline offset by a unit, and checked sample by sample. */
export function plate() {
  const c = contour();
  const off = offsetContour(c.segs, 1);
  verify(c.segs, off, 1);
  return contourPath(off);
}

/**
 * The cap end, inset a unit all round and cut on the band's inner edge — the
 * panel the fill opens. A stadium end: two short flanks and the cap's own arc.
 */
export function capPanel() {
  const r = R - 1, u0 = U_BAND + 1;
  const p = new Path().M(at(u0, r)).L(at(0, r));
  p.A(Cc, ANG(N), ANG(U), 0).A(Cc, ANG(U), ANG(mul(N, -1)), 0);
  p.L(at(u0, -r));
  return p.Z().toString();
}

/** pen-line's rule, scaled with the drawing so the pair cannot drift. */
export const rule = (sharp = false) => {
  const a = scale([13, 21]), b = scale([21, 21]);
  const e = sharp ? 1 : 0;
  return `M${n(a[0] - e)} ${n(a[1])}L${n(b[0] + e)} ${n(b[1])}`;
};

/* ----------------------------------------------------------------- -off --- */

/**
 * The slash runs at 45 degrees and the pen's axis is perpendicular to it, so
 * the cut is one number on that axis: `u` measured from the canvas centre IS
 * the perpendicular distance from the slash's centre line.
 *
 *   near piece   buried, cut ends land ON the line (u = 0)
 *   far piece    stands off, cut ends at u = 4, which puts the nearest ink 3
 *                from the line and 2 clear of the slash's own ink
 *
 * Both cuts fall on the straight flanks, which is what makes this arithmetic
 * rather than a boolean.
 */
const U_CENTRE = uOf(C0);                    // -9.4281: the centre, in Cc's frame
const uAbs = (u) => u + U_CENTRE;            // absolute u -> Cc's frame

/**
 * The far standoff is not the same number in the two treatments, and both are
 * the shipped family's, carried over rather than re-derived.
 *
 *   regular  cut at 4, so a round cap's ink reaches 3 and clears the slash's
 *            own ink by the guide's 2
 *   sharp    cut at 2.5, which is the 2.4-2.6 band section 8 authored for a
 *            butt cap's nearest corner. It measures 1.50 against the slash and
 *            always has: the standoff is authored, not solved.
 */
const FAR = { regular: 4, sharp: 2.5 };

/** The near piece as an open run: flank, nib wedge, flank. Buried on the line. */
export const nearRun = () => new Path()
  .M(at(uAbs(0), R)).L(at(U_SH, R)).L(at(U_TIP, 0)).L(at(U_SH, -R)).L(at(uAbs(0), -R))
  .toString();

/** The far piece as an open run: flank, the whole cap, flank. */
export function farRun(sharp = false) {
  const cut = uAbs(FAR[sharp ? 'sharp' : 'regular']);
  const p = new Path().M(at(cut, R)).L(at(0, R));
  p.A(Cc, ANG(N), ANG(U), 0).A(Cc, ANG(U), ANG(mul(N, -1)), 0);
  p.L(at(cut, -R));
  return p.toString();
}

/** The near piece's silhouette: the plate, cut on the slash's own centre line. */
export function nearSolid() {
  const off = offsetContour(contour().segs, 1);
  return contourPath(clipContour(off, C0, U, 0, -1)[0]);
}

/**
 * The far piece's silhouette, and the two treatments derive it differently.
 *
 * REGULAR is the open run's own outline, so it carries the round caps the
 * stroke paints and the plate's edge traces them — the shipped `-off` fill
 * draws exactly that. SHARP is the base's silhouette clipped straight on the
 * cut line, which is the law of section 29: no terminus faces, no radial jogs.
 */
export function farSolid(sharp = false) {
  const off = offsetContour(contour().segs, 1);
  if (sharp) return contourPath(clipContour(off, C0, U, FAR.sharp, 1)[0]);
  const cut = uAbs(FAR.regular), o = R + 1, i = R - 1;
  const p = new Path().M(at(cut, o)).L(at(0, o));
  p.A(Cc, ANG(N), ANG(U), 0).A(Cc, ANG(U), ANG(mul(N, -1)), 0);   // outer, R+1
  p.L(at(cut, -o));
  p.A(at(cut, -R), ANG(mul(N, -1)), ANG(mul(U, -1)), 0)           // the cut's cap
   .A(at(cut, -R), ANG(mul(U, -1)), ANG(N), 0);
  p.L(at(0, -i));
  p.A(Cc, ANG(mul(N, -1)), ANG(U), 0).A(Cc, ANG(U), ANG(N), 0);   // inner, R-1
  p.L(at(cut, i));
  // `Path.A` takes its radius from the current point but starts at the angle it
  // is given, so the two have to agree or it jumps. Arriving at `at(cut, i)` the
  // pen is on the -n side of this cap's centre — 225 degrees — exactly as it was
  // at the other cap, so both sweep 225 -> 135 -> 45. Passing 45 here drew a
  // bow tie through the middle of the cap, and it showed in the fill, not in any
  // number: the plate closed over itself.
  p.A(at(cut, R), ANG(mul(N, -1)), ANG(mul(U, -1)), 0)
   .A(at(cut, R), ANG(mul(U, -1)), ANG(N), 0);
  return p.Z().toString();
}

export const SLASH = (sharp) => (sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22');

/** Where the plate's outer edge sits, for the record: ink 1..23 both ways. */
export const inkBox = () => [1, 1, 23, 23];
