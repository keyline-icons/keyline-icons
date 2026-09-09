/**
 * Zafar's 9 Sep drawings, fitted.
 *
 * They arrived in `refs/` (flame, store, buildings, graduation-cap), which is
 * gitignored working space, so the geometry is inlined here rather than read —
 * a generator that depends on an untracked file is a generator that stops
 * building. The rule for all four is §"Fitting a drawing the author hands you":
 * fit it, do not re-derive it. What is changed is only what measures wrong.
 *
 *   flame            the tongue only. His bulb, right flank and tip are kept to
 *                    the coordinate; the pointed tongue he drew into the bowl
 *                    is redrawn as an arch, which is the one thing every flame
 *                    worth the name does and his did not.
 *   buildings        a degenerate cubic and a repeated vertex removed. Every
 *                    radius was already exactly 2.
 *   store            corners put on the ladder and the awning's scallop made
 *                    one repeating construction instead of eight hand-drawn
 *                    arcs of eight different radii.
 *   graduation-cap   the bowl symmetrised and solved onto the ink: his was
 *                    17.54 tall on pads 3 and 3.46, which is the fractional
 *                    extent §2 calls a defect every time.
 *
 * The sharp half needs a construction rather than a path, which is the whole
 * reason three of the four are re-expressed as parameters here: a baked fillet
 * cannot be taken out again without the converter this repo no longer carries.
 * Each builder is asserted against his own path at the rounded radii, so the
 * re-expression is checked rather than trusted.
 */
import { Path, polyContour, onArc, filletLineArc, n, sub, add, mul, len, unit, dot } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { arcFrom } from './icons.mjs';

const deg = (r) => (r * 180) / Math.PI;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

/* ------------------------------------------------------------------ flame */

/**
 * His bulb, his right flank, his tip. His tongue, redrawn.
 *
 * What he handed over ran the tongue down to a point at (9.5, 14), and a point
 * is the one thing the shape cannot afford: it reads as a comma, and at 16 the
 * bowl closes over it. Every drawing that reads as a flame arches the tongue
 * instead, so that is the rule taken from the references and nothing else is.
 *
 * Three circles and a flank, and every radius the drawing invents is on the
 * ladder. The bulb is r 8 about (12, 14) and the flank is the arc that leaves
 * its side vertically and lands on the tip, which is his cubic re-read: centre
 * (6.2143, 14), r 13.7857, and his own control point sits on it to 4dp. The
 * tongue leaves the wall at 205 degrees on an r 1 hook tangent inside the bulb,
 * turns 185 degrees, and hands the tangent to an r 2 arch running the other
 * way. The arch stops at its own angle 0.
 *
 * That last number is the one worth the paragraph. `arcTo` splits every arc on
 * the cardinals, so a foot a third of a degree past one leaves a cubic a
 * hundredth of a unit long: invisible here, dropped by `createNodeFromSvg` on
 * import, and then the design file and the repository disagree for ever over a
 * piece neither of them paints. Ending ON the cardinal makes the split the
 * endpoint, and it leaves the inner edge running straight up out of the foot,
 * which is where the tip wants it anyway.
 *
 * The painted channel between the tongue and the bowl comes to 1.84. The house
 * two applies between elements and this is one closed stroke, so the number to
 * beat is the drawing's own legibility at 16, which it holds.
 */
export const FL = {
  C: [12, 14], R: 8, tip: [16, 2], th1: 0, wall: 205, hook: 185, rHook: 1, rArch: 2,
  rLick: 10,
};

/**
 * The whole drawing as one closed path.
 *
 * There is no fillet and no free end anywhere in it, so the sharp treatment has
 * nothing to take out and both halves are this same path. The parameter is kept
 * so the call sites read like every other builder here.
 */
export function flame2({ sharp = false } = {}) {
  const { C, R, tip, th1, wall, hook, rHook, rArch, rLick } = FL;
  const side = onArc(C, R, th1);                     // (20, 14), where the bulb runs vertical
  // The flank is an S, not one arc: it leaves the tip straight DOWN and joins
  // the bulb's side straight down too, so the tip reads as a lick rather than
  // the fat end of a teardrop. Two arcs of r 10 turned through the 3-4-5 angle
  // carry it exactly 4 across and 12 down, which is why the tip sits on (16, 2)
  // and not on his 15.5: 4 and 12 are the pair that make sin a = 0.6 and put
  // the whole run on whole units.
  const a = deg(Math.asin(0.6));
  const s1 = { c: [tip[0] + rLick, tip[1]], a0: 180, a1: 180 - a, dir: -1 };
  const s2 = { c: [side[0] - rLick, side[1]], a0: -a, a1: 0, dir: 1 };
  const hc = onArc(C, R - rHook, wall);              // inside the bulb, so it hooks back
  const ha1 = wall + hook;
  const ac = onArc(hc, rHook + rArch, ha1);          // outside the hook, so the two make an S
  const foot = [ac[0] + rArch, ac[1]];
  const inner = arcFrom(foot, [0, -1], tip);
  const p = new Path()
    .M(tip)
    .A(s1.c, s1.a0, s1.a1, s1.dir)
    .A(s2.c, s2.a0, s2.a1, s2.dir)
    .A(C, th1, wall, 1)
    .A(hc, wall, ha1, 1)
    .A(ac, ha1 - 180, 0, -1)
    .A(inner.c, inner.a0, inner.a1, inner.dir)
    .Z();
  return p;
}

/* -------------------------------------------------------------- buildings */

/**
 * A low block in front of a tower, sharing a party wall and a ground line.
 *
 * His path drew the bottom edge with a cubic whose first control sat on its own
 * start point and carried the tower's left wall through a repeated vertex at
 * y = 9. Both are invisible — they render and they measure — and both are the
 * class §"A corner is not a segment" names: a piece that goes nowhere is
 * dropped by `createNodeFromSvg` on import, so the design file and the
 * repository then disagree for ever over a segment neither of them paints.
 */
export const B2 = {
  x0: 2, mid: 10, x1: 22, top: 2, eaves: 6, floor: 22, r: 2, rLow: 1.5,
  cols: [14, 18], rows: [[6, 8], [12, 14]], lowCol: 6, lowRows: [[10, 12], [16, 18]],
  door: [14, 18, 18],
};

/**
 * The tower, closed, and the low block as a separate run against its wall.
 *
 * His 9 Sep drawing raises the low block's roof from 12 to 6, which is what
 * turns the pair into a skyline rather than a tower with a shed at its foot,
 * and it takes a smaller corner with it: 1.5 against the tower's 2, so the
 * smaller mass reads lighter. Both ends of the low run land on the tower: the
 * roof on its wall and the floor inside its bottom-left corner arc, whose ink
 * already covers (10, 22). His own floor carries on to 14.5, which is buried
 * under the same black but sits half a unit off the door's foot, and that reads
 * to the linter as two elements touching.
 */
export function buildings2Tower({ sharp = false } = {}) {
  const r = sharp ? 0 : B2.r, B = B2;
  return polyContour([[B.mid, B.top], [B.x1, B.top], [B.x1, B.floor], [B.mid, B.floor]], [r, r, r, r]);
}

export function buildings2Low({ sharp = false } = {}) {
  const r = sharp ? 0 : B2.rLow, B = B2;
  return new Path().M([B.mid, B.floor])
    .corner([B.x0, B.floor], [B.x0, B.eaves], r)
    .corner([B.x0, B.eaves], [B.mid, B.eaves], r)
    .L([B.mid, B.eaves]);
}

export const buildings2Outline = (o = {}) =>
  String(buildings2Tower(o)) + String(buildings2Low(o));

/** The pair's outer boundary: an L, with the party wall's junction reflex. */
export function buildings2Silhouette({ sharp = false } = {}) {
  const r = sharp ? 0 : B2.r, rl = sharp ? 0 : B2.rLow, B = B2;
  return polyContour(
    [[B.x0, B.eaves], [B.mid, B.eaves], [B.mid, B.top], [B.x1, B.top], [B.x1, B.floor], [B.x0, B.floor]],
    [rl, 0, r, r, r, rl],
  );
}

const B2_WINDOWS = [...B2.cols.flatMap((x) => B2.rows.map(([a, b]) => [x, a, b])),
  ...B2.lowRows.map(([a, b]) => [B2.lowCol, a, b])];

export const buildings2Windows = (sharp = false) => {
  const e = sharp ? 1 : 0;
  return B2_WINDOWS.map(([x, a, b]) => `M${x} ${a - e}L${x} ${b + e}`).join('');
};

export const buildings2WindowHoles = (sharp = false) => {
  const r = sharp ? 0 : 1;
  return B2_WINDOWS.map(([x, a, b]) =>
    polyContour([[x - 1, a - 1], [x + 1, a - 1], [x + 1, b + 1], [x - 1, b + 1]], [r, r, r, r]).segs);
};

export function buildings2Door({ sharp = false } = {}) {
  const [x0, x1, top] = B2.door, r = sharp ? 0 : 2;
  return new Path().M([x0, B2.floor])
    .corner([x0, top], [x1, top], r)
    .corner([x1, top], [x1, B2.floor], r)
    .L([x1, B2.floor])
    .toString();
}

export function buildings2Doorway({ sharp = false } = {}) {
  const [x0, x1, top] = B2.door, r = sharp ? 1 : 3;
  return polyContour([[x0 - 1, B2.floor + 1], [x0 - 1, top - 1], [x1 + 1, top - 1], [x1 + 1, B2.floor + 1]], [0, r, r, 0]);
}

export const buildings2 = (o = {}) =>
  String(buildings2Outline(o)) + buildings2Windows(o.sharp) + buildings2Door(o);

/* ------------------------------------------------------------------ store */

/**
 * A shopfront under a scalloped awning.
 *
 * The awning is the change from my own store and it is the better drawing: a
 * valance says shop where a plain fascia says house. §11 warns that a
 * storefront's scallops are where an awning dies at 16px, and the answer is in
 * the pitch rather than in dropping them — four scallops on a pitch of 5, each
 * only 1.05 deep, read as one wavy edge at 16 rather than as detail that has to
 * survive individually.
 *
 * His arrived as eight arcs of eight radii between 0.93 and 2.66, none of them
 * on the ladder and none of them quite each other's mirror. It is one
 * construction here: scallop circles of 2.5 on a pitch of 5 whose centres sit on
 * the awning's own lower line, so the end scallops are tangent to the side walls
 * at exactly (2, 7.5) and (22, 7.5) and no corner is needed there at all.
 *
 * The valance slant is his, read back off it rather than chosen: extended to
 * where they really meet, his two edges cross x = 22 at exactly y = 6, and the
 * run to the top edge is 2.25 against a rise of 3 — a 3-4-5. The DOOR is left
 * square, which is the one place his drawing departs from the ladder and is not
 * a defect: a shop's opening is rectangular, and the round join paints its
 * corners at 1 anyway.
 */
export const ST = {
  // topX is 4.5 rather than the 4.25 his slant extends to, and the reason is
  // `check-figma`'s 1dp bucket: at 4.25 the r=1 fillet's tangent points land on
  // 4.75 and 3.95, both exactly on a rounding boundary, and Figma's stored
  // float and ours then fall on opposite sides of it. Four store variants
  // reported drift for a difference neither file paints.
  x: [2, 22], top: 3, topX: [4.5, 19.5], shoulder: 6, wall: 7.5, r: 1,
  R: 2.5, dip: 10, centres: [4.5, 9.5, 14.5, 19.5], cusps: [7, 12, 17], rCusp: 1,
  // The walls run up to 10, which is inside the valance's ink (its scallop
  // reaches 9.95 at x = 4): a butt cap stopping at 11 left 0.03 of daylight,
  // which is a near-miss rather than the junction the drawing means.
  bodyX: [4, 20], bodyTop: 10, floor: 21, rBody: 2,
  doorX: [9, 15], doorTop: 14, rDoor: 1,   // r=1, so the opening's corners round the way his fill draws them
};

/** Where a cusp fillet touches the scallop either side of it. */
function cuspAt(x, sharp) {
  const r = sharp ? 0 : ST.rCusp;
  const h = Math.sqrt((ST.R + r) * (ST.R + r) - (ST.R * ST.R));   // ST.R apart on x
  const F = [x, ST.wall + h];
  const on = (cx) => add([cx, ST.wall], mul(unit(sub(F, [cx, ST.wall])), ST.R));
  return { F, r, left: on(x - ST.R), right: on(x + ST.R) };
}

export function storeCanopy2({ sharp = false } = {}) {
  const r = sharp ? 0 : ST.r;
  const p = new Path().M([ST.x[0], ST.wall])
    .corner([ST.x[0], ST.shoulder], [ST.topX[0], ST.top], r)
    .corner([ST.topX[0], ST.top], [ST.topX[1], ST.top], r)
    .corner([ST.topX[1], ST.top], [ST.x[1], ST.shoulder], r)
    .corner([ST.x[1], ST.shoulder], [ST.x[1], ST.wall], r)
    .L([ST.x[1], ST.wall]);
  // Back along the valance, right to left: a scallop, a cusp, a scallop.
  for (let i = ST.centres.length - 1; i >= 0; i--) {
    const c = [ST.centres[i], ST.wall];
    const from = i === ST.centres.length - 1 ? [ST.x[1], ST.wall] : cuspAt(ST.cusps[i], sharp).left;
    const to = i === 0 ? [ST.x[0], ST.wall] : cuspAt(ST.cusps[i - 1], sharp).right;
    p.A(c, ang(c, from), ang(c, to), 1);
    if (i > 0) {
      const k = cuspAt(ST.cusps[i - 1], sharp);
      if (k.r > 1e-9) p.A(k.F, ang(k.F, k.right), ang(k.F, k.left), -1);
      else p.L(k.left);
    }
  }
  return p.Z();
}

export function storeBody2({ sharp = false } = {}) {
  const r = sharp ? 0 : ST.rBody;
  return new Path().M([ST.bodyX[0], ST.bodyTop])
    .corner([ST.bodyX[0], ST.floor], [ST.bodyX[1], ST.floor], r)
    .corner([ST.bodyX[1], ST.floor], [ST.bodyX[1], ST.bodyTop], r)
    .L([ST.bodyX[1], ST.bodyTop])
    .toString();
}

export function storeDoor2({ sharp = false } = {}) {
  const r = sharp ? 0 : ST.rDoor;
  return new Path().M([ST.doorX[0], ST.floor])
    .corner([ST.doorX[0], ST.doorTop], [ST.doorX[1], ST.doorTop], r)
    .corner([ST.doorX[1], ST.doorTop], [ST.doorX[1], ST.floor], r)
    .L([ST.doorX[1], ST.floor])
    .toString();
}

/** The body's own plate, which the canopy's plate overlaps and hides the top of. */
export function storeBodyPlate({ sharp = false } = {}) {
  const r = (sharp ? 0 : ST.rBody) + 1;
  const [a, b] = ST.bodyX;
  return polyContour([[a - 1, ST.wall + 1.5], [b + 1, ST.wall + 1.5], [b + 1, ST.floor + 1], [a - 1, ST.floor + 1]], [0, 0, r, r]);
}

/**
 * The doorway the fill opens, and it is the door's OWN footprint rather than
 * its outer edge.
 *
 * `building` grows its door a unit, which is right there: its door is 4 wide
 * and the opening would otherwise read as a slot. This one is already 6, and
 * grown it takes half the shopfront and leaves two thin legs. At its own box it
 * is 37 per cent of the body — the same share `building`'s opening takes — and
 * the legs come out as wide as the door.
 */
export function storeDoorway2({ sharp = false } = {}) {
  const r = sharp ? 0 : ST.rDoor;
  const [a, b] = ST.doorX;
  // The foot is the floor line's INNER ink, not the plate's edge. Cut to the
  // edge, the opening takes the floor with it and the shop reads as an arch you
  // can see through; the stroke has a doorway standing ON a floor, and the two
  // unit band under it is that line.
  return polyContour([[a, ST.floor - 1], [a, ST.doorTop], [b, ST.doorTop], [b, ST.floor - 1]], [0, r, r, 0]);
}

/**
 * The three ribs that panel the awning, from his 9 Sep drawing.
 *
 * Each stands on a cusp and stops where the canopy's side fillet leaves the
 * wall, which is the shoulder read off the drawing rather than a number of its
 * own: the ribs and the two slanted ends finish on the same line. Sharp takes
 * that fillet out, so its ribs run to the shoulder vertex itself.
 *
 * The foot is the cusp's apex, `F - r`, so the rib lands ON the valance rather
 * than in the air above it.
 */
export function storeRibs({ sharp = false } = {}) {
  const top = storeCanopy2({ sharp }).segs[0].p1[1];
  return ST.cusps.map((x) => {
    const k = cuspAt(x, sharp);
    return new Path().M([x, k.F[1] - k.r]).L([x, top]).toString();
  }).join('');
}

/**
 * The canopy's own interior, which is what the fill OPENS.
 *
 * A shop's awning is a panel, and §"A panelled object opens a panel" says a
 * panel is opened rather than merged: filled solid the valance disappears and
 * the drawing reads as a house. Inset by a unit the construction survives, and
 * the trapezoid's r=1 corners inset to true corners, which is why one contour
 * serves both treatments.
 *
 * The ribs are cut OUT of this contour rather than added back as islands. An
 * island's foot has to sit exactly on the hole's own boundary, and two
 * coincident edges under `evenodd` do not merge, they cancel: the first attempt
 * left a crescent of white between every rib and the valance it stands on. One
 * contour weaving up and over each rib has no coincident edge anywhere, and it
 * is what the drawing means: the awning's white is one band with three columns
 * rising into it, not four separate panels.
 *
 * Every junction lands on a whole unit, which is the check that the pitch is
 * right. The inset scallop is r 1.5 on centres 5 apart, so consecutive scallops
 * end on 6 and 8 either side of the cusp at 7, and the rib's ink is exactly
 * that 2-unit gap, tangent to both neighbours at the wall line.
 */
export function storeCanopyInner({ sharp = false } = {}) {
  const wall = ST.wall;
  const A = [ST.topX[0], ST.top], B = [ST.x[0], ST.shoulder];
  const u = unit(sub(B, A));
  const n0 = [-u[1], u[0]];
  const inward = n0[0] > 0 ? n0 : [-n0[0], -n0[1]];        // toward the middle
  const P = add(A, inward), top = ST.top + 1;
  const t1 = (top - P[1]) / u[1], t2 = (ST.x[0] + 1 - P[0]) / u[0];
  const atTop = add(P, mul(u, t1)), atWall = add(P, mul(u, t2));
  // Where a rib's own ink ends: the round cap's disc rounded, the butt cap's
  // flat top sharp. Read off the drawing rather than restated, as `storeRibs`
  // reads it.
  const ribTop = storeCanopy2({ sharp }).segs[0].p1[1];
  const p = new Path().M([ST.x[0] + 1, wall])
    .L(atWall).L(atTop)
    .L([24 - atTop[0], top]).L([24 - atWall[0], atWall[1]])
    .L([ST.x[1] - 1, wall]);
  for (let i = ST.centres.length - 1; i >= 0; i--) {
    p.A([ST.centres[i], wall], 0, 180, 1);   // the scallop, right end to left end
    if (i === 0) break;
    const x = ST.cusps[i - 1];
    p.L([x + 1, ribTop]);
    if (sharp) p.L([x - 1, ribTop]);
    else p.A([x, ribTop], 0, -180, -1);      // over the cap, so white sits above it
    p.L([x - 1, wall]);
  }
  return p.Z();
}

export const store2 = (o = {}) => String(storeCanopy2(o)) + storeBody2(o) + storeDoor2(o) + storeRibs(o);

/* -------------------------------------------------------- graduation-cap */

/**
 * His mortarboard: the board unchanged, the tassel moved to the left tip, and a
 * shallow bowl instead of the semicircle I had.
 *
 * The board IS the one already shipped, vertex for vertex — he kept it. The
 * bowl is the fit: his ran 17.54 tall on pads of 3 and 3.46, with corner radii
 * of 1.7806 on one side and 1.8450 on the other and a free cubic across the
 * bottom whose lowest point missed the ink by 0.46. Solved instead, it is one
 * arc of 9.25 centred (12, 10.75) — so its extreme lands on 20 and the ink on
 * 21 — filleted into the walls at r = 2, which puts the tangent point on y = 16
 * exactly where he drew it.
 */
// `top` is where the bowl's walls meet the board's LOWER EDGE, not a round
// number near it: his stopped at 10 against an edge at 9.7352, which is a cap
// one unit from another stroke — the near-miss §11 names, and neither 2 clear
// nor actually joined. It is solved from the board so it cannot drift if the
// board ever moves.
// The bowl is 6..18 rather than his 5..19, and the tassel is what forced it:
// hanging off the board's left tip it is already at the ink edge, so the head
// is the only free variable. At 5 the channel between them paints 1.00, which
// is the crowding band rather than the noise band; at 6 it is exactly the
// house 2 and the head still carries the board.
// `cy` puts the bowl's arc so its extreme lands on 19 and the ink on 20, which
// is the resize: 9.25 + 9.75 = 19. His own bottom fits a circle of 9.35 on
// (12, 9.65), so the radius is left where it was and only the centre moves.
export const CAP2 = { wallX: [6, 18], r: 2, Rb: 9.25, cy: 9.75, tasselX: 2, tassel: [9, 15] };
export const capFoot = (board, x) => board.y + (board.h * (board.half - Math.abs(x - 12))) / board.half;

export function capBowl2({ sharp = false, board } = {}) {
  const C = [12, CAP2.cy], R = CAP2.Rb;
  const [x0, x1] = CAP2.wallX;
  const top = capFoot(board, x0);
  if (sharp) {
    // De-filleted, the wall runs on to where it actually crosses the arc.
    const y = CAP2.cy + Math.sqrt(R * R - (12 - x0) * (12 - x0));
    const A = [x0, y], B = [x1, y];
    return new Path().M([x0, top]).L(A).A(C, ang(C, A), ang(C, B), -1).L([x1, top]).toString();
  }
  const f0 = filletLineArc([x0, top], [0, 1], [1, 0], C, R, CAP2.r);
  const f1 = filletLineArc([x1, top], [0, 1], [-1, 0], C, R, CAP2.r);
  // Every one of the three sweeps runs with the angle DECREASING: left to right
  // along the underside of a circle is counter-clockwise in screen coordinates,
  // and taking the other way round sends the bowl over the top of its own arc.
  return new Path().M([x0, top])
    .L(f0.T)
    .A(f0.F, ang(f0.F, f0.T), ang(f0.F, f0.A), -1)
    .A(C, ang(C, f0.A), ang(C, f1.A), -1)
    .A(f1.F, ang(f1.F, f1.A), ang(f1.F, f1.T), -1)
    .L([x1, top])
    .toString();
}

export function capTassel2({ sharp = false } = {}) {
  const [a, b] = CAP2.tassel;
  const end = b + (sharp ? sharpEndIn([CAP2.tasselX, b], [0, 1]) : 0);
  return `M${CAP2.tasselX} ${a}L${CAP2.tasselX} ${n(end)}`;
}

/* ------------------------------------------------------------------- book */

/**
 * The book, on the geometry the two references share.
 *
 * Neither was used and neither was copied. What they agree on is not a shape,
 * it is a RULE, and one number sets the whole lower half:
 *
 *   the spine is a ROLL, not a corner   a half turn of radius r at the foot of
 *                                       the left edge, centred (x0+r, y1-r) and
 *                                       running (x0+r, y1) -> (x0, y1-r) ->
 *                                       (x0+r, y1-2r). Its leftmost point IS the
 *                                       bottom of the cover's left edge, so the
 *                                       outline closes there with nothing drawn
 *                                       twice.
 *   the page block is 2r deep           its top line sits on y1 - 2r
 *   the margin line sits at x0 + 2r     tangent to the roll's far side
 *
 * One runs r = 2.5 (block 5), the other r = 2 (block 4, margin at 8). Ours is 2,
 * because 2.5 is off the house ladder and r + 1 = 3 has to be on it for the
 * fill. The band at 18 and the margin at 8 the first drawing already had ARE
 * that system — it was only ever missing the roll, which is the part that says
 * bound rather than panelled.
 *
 * What is deliberately NOT taken is the fore-edge. One reference draws the
 * pages' cut edge as a shallow arc inside the block's right end, and at a
 * 2-unit stroke there is nowhere to put it: the block is 4 deep, so its interior
 * is 2 units of white and an arc drawn there paints the channel solid; moved in
 * far enough to clear the wall by the house 2 it lands at x = 16 and reads as a
 * second margin line. It works at 1.5 and it does not work here.
 */
export const BK = { x: [4, 20], y: [2, 22], rHead: 3, rTail: 3, rFoot: 1, roll: 2 };
const BAND = BK.y[1] - 2 * BK.roll;          // 18
const MARGIN = BK.x[0] + 2 * BK.roll;        // 8

/**
 * The foot's notch: the fore-edge scoops in and returns to the edge it left.
 *
 * His 9 Sep drawing carries it as two free cubics, and both halves of it are
 * wrong in a way that only measures: they kink 33.7 degrees where the straight
 * fore-edge meets them, and the flick at the bottom reaches x 20.1, which puts
 * the ink 18.1 wide on an 18 box.
 *
 * The same gesture solves on the ladder. Two r=1 fillets either side of an
 * r=1.5 floor, each turned through the 3-4-5 angle, make the depth exactly 0.5
 * and the run exactly 3, tangent to the fore-edge at both ends so there is no
 * corner to fillet and nothing to round. Depth is `(r1 + r2)(1 - cos a)` and the
 * run is `2(r1 + r2) sin a`, which is why the offsets work too: the plate takes
 * r1+1 and r2-1, the same sum, so its notch is the same 0.5 over the same 3.
 *
 * Sharp keeps it, for the reason the roll is kept: what sharp takes out is a
 * corner, and this is the drawing.
 */
const NOTCH = { r: 1, floor: 1.5, sin: 0.6, cos: 0.8 };
const NOTCH_RUN = 2 * (NOTCH.r + NOTCH.floor) * NOTCH.sin;          // 3
const NOTCH_DEEP = (NOTCH.r + NOTCH.floor) * (1 - NOTCH.cos);       // 0.5

/** Scoop the notch into an edge running DOWN at `X`, starting at `yTop`. */
function notchDown(p, X, yTop, r1 = NOTCH.r, r2 = NOTCH.floor) {
  const a = deg(Math.asin(NOTCH.sin)), u = [NOTCH.cos, NOTCH.sin];
  p.L([X, yTop]);                       // `Path.A` reads its radius off the current point
  if (r1 > 1e-9) p.A([X - r1, yTop], 0, a, 1);
  const P1 = p.cur, c2 = add(P1, mul(u, r2)), a2 = ang(c2, P1);
  p.A(c2, a2, a2 - 2 * a, -1);
  const P2 = p.cur;
  if (r1 > 1e-9) {
    const c3 = add(P2, mul([-u[0], u[1]], r1)), a3 = ang(c3, P2);
    p.A(c3, a3, a3 + a, 1);
  }
  return p;
}

export function bookCover2({ sharp = false, cut = null } = {}) {
  const [x0, x1] = BK.x, [y0, y1] = BK.y, r = BK.roll;
  const rh = sharp ? 0 : BK.rHead, rt = sharp ? 0 : BK.rTail, rf = sharp ? 0 : BK.rFoot;
  // The roll is an arc, and the rounded treatment keeps it: a cover wrapping a
  // spine is the drawing. Sharp squares it, on his word of 9 Sep — the corner
  // it leaves is the one every other corner of the sharp drawing already is,
  // and a lone 3-unit curve at the foot read as a leftover rather than as a
  // treatment.
  const roll = (p) => (sharp ? p.L([x0, y1]).L([x0, BAND]) : p.A([x0 + r, y1 - r], 90, 270, 1));
  if (!cut) {
    // Down the fore-edge to the band, the notch, then the tail corner it lands
    // on: the notch's run is exactly the 3 units between them, so the corner's
    // tangent point IS where the notch ends and no straight is left over.
    const p = new Path().M([x0, sharp ? BAND : y1 - r])
      .corner([x0, y0], [x1, y0], rh)
      .corner([x1, y0], [x1, BAND], rt);
    notchDown(p, x1, BAND);
    p.corner([x1, y1], [x0, y1], rf)
      .L([sharp ? x0 : x0 + r, y1]);
    roll(p);
    return p.L([x1, BAND]).toString();
  }
  // Cut for a sign it is two runs, and the second starts on the roll — exactly
  // where the first one ends, so nothing is drawn twice and nothing is left.
  const a = new Path().M([x1, cut.y])
    .L([x1, y0 + rt]).corner([x1, y0], [x0, y0], rt)
    .corner([x0, y0], [x0, y1], rh)
    .L([x0, sharp ? y1 : y1 - r]);
  const b = new Path().M([cut.x, y1]).L([sharp ? x0 : x0 + r, y1]);
  roll(b);
  return a.toString() + b.L([cut.x, BAND]).toString();
}

/**
 * The margin line, which his 9 Sep drawing shortens to a stub.
 *
 * It ran the cover's full height, head to band, and that reads as a second
 * spine rather than as the crease a hardback has. Centred on the cover's own
 * middle it is 8 long on a 16 cover, the same half the block's white takes.
 */
const CREASE = [6, 14];
export const bookSpine2 = () => `M${MARGIN} ${CREASE[0]}L${MARGIN} ${CREASE[1]}`;
export const book2 = (o = {}) => bookCover2(o) + bookSpine2();

/** The plate: the cover's outer boundary, the roll's outer half as its foot. */
export function bookPlate2({ sharp = false, cut = null } = {}) {
  const rh = (sharp ? 0 : BK.rHead) + 1, rt = (sharp ? 0 : BK.rTail) + 1;
  const rf = (sharp ? 0 : BK.rFoot) + 1, rr = (sharp ? 0 : BK.roll) + 1;
  if (!cut) {
    // The notch offset out by 1: r+1 on the fillets and floor-1 on the floor,
    // which is the same sum, so the plate scoops the same 0.5 over the same 3
    // and the fore-edge stays parallel to the drawing on both sides of it.
    const p = new Path().M([3 + rh, 1])
      .corner([21, 1], [21, BAND], rt);
    notchDown(p, 21, BAND, NOTCH.r + 1, NOTCH.floor - 1);
    return p.corner([21, 23], [3, 23], rf)
      .corner([3, 23], [3, 1], rr)
      .corner([3, 1], [21, 1], rh)
      .Z();
  }
  const inner = sharp ? 0 : 3;
  return polyContour([[3, 1], [21, 1], [21, 13], [11, 13], [11, 23], [3, 23]], [rh, rt, 1, inner, 1, rr]);
}

/**
 * The page block the fill opens. Its left end is the roll's INNER ink, an arc of
 * `roll - 1` about the roll's centre, which paints as a round cap on (5, 20).
 *
 * It was the roll's OUTER ink, `roll + 1`, which is the same mistake as reading
 * a slot's end off the plate instead of the stroke: the roll is a stroke that
 * wraps under, so the white it encloses starts at its inner edge, not past its
 * outer one. The block began at x 8.83 and left a slab of black between the
 * spine and the pages that is exactly what his 9 Sep fill does not have.
 */
export function bookBlock2({ cut = null, sharp = false } = {}) {
  const r = BK.roll - 1, c = [BK.x[0] + BK.roll, BK.y[1] - BK.roll];
  const top = BAND + 1, bot = BK.y[1] - 1, right = cut ? 11 : BK.x[1] - 1;
  // Square at the foot, the block's left end is the spine's own inner ink;
  // rolled, it is the roll's, which paints as a cap on (5, 20).
  const dx = sharp ? BK.x[0] + 1 - c[0] : Math.sqrt(r * r - (c[1] - top) * (c[1] - top));
  const p = new Path().M([c[0] + dx, top]);
  if (cut) {
    p.L([right, top]).L([right, bot]);
  } else {
    // The notch offset IN by 1 collapses its fillets to nothing and leaves the
    // floor alone at r+1 = 2.5 on (21, 19.5). The block's right edge is that
    // arc, not the straight it used to be: at the deepest point the cover's
    // inner ink stands at 18.5, and a straight edge at 19 put half a unit of
    // white inside the black.
    const fc = [BK.x[1] + 1, BAND + NOTCH_RUN / 2], fr = NOTCH.floor + 1;
    const at = (y) => [fc[0] - Math.sqrt(fr * fr - (y - fc[1]) * (y - fc[1])), y];
    p.L(at(top)).A(fc, ang(fc, at(top)), ang(fc, at(bot)), -1);
  }
  p.L([c[0] + dx, bot]);
  return (sharp ? p : p.A(c, ang(c, [c[0] + dx, bot]), ang(c, [c[0] + dx, top]), 1)).Z();
}

/** The margin line's slot, which is now simply the stub's own ink. */
export const bookSpineSlot2 = ({ sharp = false } = {}) => {
  const r = sharp ? 0 : 1;
  return polyContour(
    [[MARGIN - 1, CREASE[0] - r], [MARGIN + 1, CREASE[0] - r],
     [MARGIN + 1, CREASE[1] + r], [MARGIN - 1, CREASE[1] + r]], [r, r, r, r]);
};
