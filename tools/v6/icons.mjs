/**
 * The v0.6.0 batch: flame, store, buildings, cpu, graduation-cap, book (+ the
 * four signs) and book-open.
 *
 * Each builder returns a `Path` (or an object of them) so the segments are
 * recorded and `offsetContour` can derive the plate. Everything is lines and
 * circular arcs for that reason — the offset of an arc is an arc, the offset of
 * a cubic is not.
 */
import {
  Path, polyContour, circlePath, onArc, pt, n, unit, dot, sub, add, mul, len, fillet,
} from '../v5/geom.mjs';
import { sharpEndIn, filletPull } from '../v5/icons.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const deg = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

/* ------------------------------------------------------------------ flame */

/**
 * The arc that leaves `P0` along `t0` and passes through `P1`. Two points and a
 * tangent fix a circle, which is what lets a flank be joined to the bulb G1 and
 * aimed at the tip without solving a tangency by hand.
 */
export function arcFrom(P0, t0, P1) {
  const t = unit(t0), nrm = [-t[1], t[0]];
  const q = sub(P1, P0);
  const den = 2 * dot(q, nrm);
  if (Math.abs(den) < 1e-9) return null;            // straight: P1 lies on the ray
  const r = dot(q, q) / den;
  const c = add(P0, mul(nrm, r));
  return { c, r: Math.abs(r), a0: ang(c, P0), a1: ang(c, P1), dir: r > 0 ? 1 : -1 };
}

/** The arc through three points, as a centre, radius and the two end angles. */
export function arcThrough(P0, P1, P2) {
  const [ax, ay] = P0, [bx, by] = P1, [cx, cy] = P2;
  const dd = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  if (Math.abs(dd) < 1e-9) throw new Error('three collinear points');
  const a2 = ax * ax + ay * ay, b2 = bx * bx + by * by, c2 = cx * cx + cy * cy;
  const c = [(a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / dd,
             (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / dd];
  const a0 = ang(c, P0), a1 = ang(c, P1), a2a = ang(c, P2);
  const norm = (x) => ((x % 360) + 360) % 360;
  const fwd = norm(a1 - a0) < norm(a2a - a0);   // is P1 reached before P2 going clockwise?
  return { c, r: len(sub(P0, c)), a0, a1: a2a, dir: fwd ? 1 : -1 };
}

const tangentOnCircle = (th, dir) => mul([-Math.sin(rad(th)), Math.cos(rad(th))], dir);

/**
 * A bulb, a sweeping right flank, and a left flank that dips into the drawing
 * before it runs out to the tip.
 *
 * The dip is the whole icon. Two arcs tangent to the bulb and meeting at a tip
 * draw a teardrop, and six of those were rendered before the point landed: what
 * separates a flame from a droplet is an INFLECTION on one flank, so the left
 * side is built as two arcs meeting at a waist `W` with a shared tangent —
 * convex out of the bulb, concave into the tip.
 *
 * Everything else is forced. The bulb sets the bottom and both sides; each
 * flank is `arcFrom`, so the junctions are G1 without a fillet; and the tip is a
 * true vertex, where the round join paints the unit that puts the ink on 1.
 */
export function flamePath({ C = [12, 14], R = 8, A = [13, 2], th1 = 0, th2 = 200, W = [7, 7] } = {}) {
  const T1 = onArc(C, R, th1), T2 = onArc(C, R, th2);
  // The bulb is walked clockwise (th1 -> th2 increasing), so its tangent at the
  // far end points on round the circle; the right flank is solved backwards
  // from T1 and then traversed the other way.
  const right = arcFrom(T1, tangentOnCircle(th1, -1), A);
  const l1 = arcFrom(T2, tangentOnCircle(th2, 1), W);
  const tW = tangentOnCircle(l1.a1, l1.dir);
  const l2 = arcFrom(W, tW, A);
  const p = new Path().M(A);
  p.A(right.c, right.a1, right.a0, -right.dir);
  p.A(C, th1, th2, 1);
  p.A(l1.c, l1.a0, l1.a1, l1.dir);
  p.A(l2.c, l2.a0, l2.a1, l2.dir);
  return p.Z();
}

/* ------------------------------------------------------------------ store */

/**
 * A canopy over a shopfront.
 *
 * The canopy is what says shop rather than house: it is WIDER than the body it
 * covers, so the silhouette steps in at the fascia and the overhang survives
 * into the fill, where an awning drawn as stripes or scallops would not (§11).
 * Its ends drop a short valance, which is also what puts the horizontal extreme
 * on an EDGE rather than on a filleted corner — so the ink lands on 2 and 22
 * whatever radius the corners take.
 */
const STORE = {
  x0: 3, x1: 21,       // the canopy, ink 2..22
  top: 3, fascia: 9,   // its top edge and its lower edge
  valance: 6,          // where the slope stops and the drop begins
  inset: 2,            // how far the body sits inside the canopy
  floor: 21,
  rBody: 2, rCanopy: 1, rDoor: 2,
  door: 3,             // the door's half-width
  doorTop: 15,
};

export function storeSilhouette({ sharp = false } = {}) {
  const S = STORE, rc = sharp ? 0 : S.rCanopy, rb = sharp ? 0 : S.rBody;
  const wx0 = S.x0 + S.inset, wx1 = S.x1 - S.inset;
  // Clockwise, so the two steps under the fascia read as the reflex corners
  // they are and the offset trims them instead of rounding them.
  return polyContour(
    [[S.x0, S.valance], [S.x0 + 2, S.top], [S.x1 - 2, S.top], [S.x1, S.valance], [S.x1, S.fascia],
     [wx1, S.fascia], [wx1, S.floor], [wx0, S.floor], [wx0, S.fascia], [S.x0, S.fascia]],
    [rc, rc, rc, rc, rc, 0, rb, rb, 0, rc],
  );
}

/** The canopy on its own — the closed piece the stroke variant draws. */
export function storeCanopy({ sharp = false } = {}) {
  const S = STORE, r = sharp ? 0 : S.rCanopy;
  return polyContour(
    [[S.x0, S.valance], [S.x0 + 2, S.top], [S.x1 - 2, S.top], [S.x1, S.valance], [S.x1, S.fascia], [S.x0, S.fascia]],
    [r, r, r, r, r, r],
  );
}

/** The shopfront under it: two walls and the floor, hanging off the fascia. */
export function storeBody({ sharp = false } = {}) {
  const S = STORE, r = sharp ? 0 : S.rBody;
  const wx0 = S.x0 + S.inset, wx1 = S.x1 - S.inset;
  return new Path().M([wx0, S.fascia])
    .corner([wx0, S.floor], [wx1, S.floor], r)
    .corner([wx1, S.floor], [wx1, S.fascia], r)
    .L([wx1, S.fascia])
    .toString();
}

export function storeDoor({ sharp = false } = {}) {
  const S = STORE, r = sharp ? 0 : S.rDoor;
  return new Path().M([12 - S.door, S.floor])
    .corner([12 - S.door, S.doorTop], [12 + S.door, S.doorTop], r)
    .corner([12 + S.door, S.doorTop], [12 + S.door, S.floor], r)
    .L([12 + S.door, S.floor])
    .toString();
}

/** The doorway the fill opens: the door's own outer edge, down to the plate's foot. */
export function storeDoorway({ sharp = false } = {}) {
  const S = STORE, r = sharp ? 1 : S.rDoor + 1;
  const x0 = 12 - S.door - 1, x1 = 12 + S.door + 1, top = S.doorTop - 1, foot = S.floor + 1;
  return polyContour([[x0, foot], [x0, top], [x1, top], [x1, foot]], [0, r, r, 0]);
}

export const store = (o = {}) => String(storeCanopy(o)) + storeBody(o) + storeDoor(o);

/* -------------------------------------------------------------- buildings */

/**
 * A tower with a lower block against it, sharing a party wall and a ground
 * line, so the pair is ONE closed silhouette rather than two objects 2 units
 * apart. Elements that genuinely join are composites (§5), and joining is what
 * buys the room: two free-standing blocks in 24 units leave each too narrow for
 * a second window column.
 */
const B = {
  x0: 2, mid: 10, x1: 22,   // low block 2..10, tower 10..22
  top: 2, eaves: 11, floor: 22,
  r: 2,
  cols: [14, 18], lowCol: 6,
  rows: [[6, 8], [12, 14]], lowRow: [15, 17],
  door: [14, 18, 18],       // x0, x1, top
};

export function buildingsSilhouette({ sharp = false } = {}) {
  const r = sharp ? 0 : B.r;
  return polyContour(
    [[B.x0, B.eaves], [B.mid, B.eaves], [B.mid, B.top], [B.x1, B.top], [B.x1, B.floor], [B.x0, B.floor]],
    [r, r, r, r, r, r],
  );
}

const WINDOWS = [...B.cols.flatMap((x) => B.rows.map(([a, b]) => [x, a, b])),
  [B.lowCol, B.lowRow[0], B.lowRow[1]]];

export const buildingsWindows = (sharp = false) => {
  const e = sharp ? 1 : 0;   // a butt cap paints where the round cap's disc did
  return WINDOWS.map(([x, a, b]) => `M${x} ${a - e}L${x} ${b + e}`).join('');
};

/** Each window's own outline, which is what the fill knocks out. */
export const buildingsWindowHoles = (sharp = false) => {
  const r = sharp ? 0 : 1;
  return WINDOWS.map(([x, a, b]) =>
    polyContour([[x - 1, a - 1], [x + 1, a - 1], [x + 1, b + 1], [x - 1, b + 1]], [r, r, r, r]).segs);
};

export function buildingsDoorway({ sharp = false } = {}) {
  const [x0, x1, top] = B.door, r = sharp ? 1 : 3;
  return polyContour([[x0 - 1, B.floor + 1], [x0 - 1, top - 1], [x1 + 1, top - 1], [x1 + 1, B.floor + 1]], [0, r, r, 0]);
}

export function buildingsDoor({ sharp = false } = {}) {
  const [x0, x1, top] = B.door, r = sharp ? 0 : 2;
  return new Path().M([x0, B.floor])
    .corner([x0, top], [x1, top], r)
    .corner([x1, top], [x1, B.floor], r)
    .L([x1, B.floor])
    .toString();
}

export const buildings = (o = {}) =>
  String(buildingsSilhouette(o)) + buildingsWindows(o.sharp) + buildingsDoor(o);

/* -------------------------------------------------------------------- cpu */

/**
 * A package with a die in it and two pins a side.
 *
 * The pins are what set the box: they reach the 1-unit floor on all four sides,
 * so the drawing paints 22 x 22 and reads as a circle to the classifier — the
 * corners are empty, which is exactly what a leaded package looks like. The die
 * is the largest square that clears the package's inner ink by the house 2.
 */
const CPU = { x0: 4, x1: 20, die: [8, 16], pins: [9, 15], pin: 2, r: 3, rDie: 1 };

export const cpuPackage = ({ sharp = false } = {}) => {
  const r = sharp ? 0 : CPU.r;
  return polyContour(
    [[CPU.x0, CPU.x0], [CPU.x1, CPU.x0], [CPU.x1, CPU.x1], [CPU.x0, CPU.x1]],
    [r, r, r, r],
  );
};

export const cpuDie = ({ sharp = false } = {}) => {
  const r = sharp ? 0 : CPU.rDie;
  const [a, b] = CPU.die;
  return polyContour([[a, a], [b, a], [b, b], [a, b]], [r, r, r, r]);
};

export function cpuPins({ sharp = false } = {}) {
  const out = [];
  // The extension is solved at each pin's OWN free end. Passing a placeholder
  // point instead is not a shortcut: `sharpEndIn` clamps the cap's corners into
  // the ink box, so a point outside it comes back 0 and the sharp pins ship a
  // unit short — 20 x 20 against the rounded drawing's 22, which no rule
  // compares because CONSISTENCY only looks within one corner treatment.
  const end = (p, dir) => (sharp ? sharpEndIn(p, dir) : 0) + CPU.pin;
  for (const t of CPU.pins) {
    const lo = CPU.x0 - CPU.pin, hi = CPU.x1 + CPU.pin;
    out.push(`M${t} ${CPU.x0}L${t} ${n(CPU.x0 - end([t, lo], [0, -1]))}`);
    out.push(`M${t} ${CPU.x1}L${t} ${n(CPU.x1 + end([t, hi], [0, 1]))}`);
    out.push(`M${CPU.x0} ${t}L${n(CPU.x0 - end([lo, t], [-1, 0]))} ${t}`);
    out.push(`M${CPU.x1} ${t}L${n(CPU.x1 + end([hi, t], [1, 0]))} ${t}`);
  }
  return out.join('');
}

export const cpu = (o = {}) => String(cpuPackage(o)) + String(cpuDie(o)) + cpuPins(o);

/* ------------------------------------------------------- flame, with fold */

/**
 * The flame proper: the bulb, a right flank, and a left side that FOLDS.
 *
 * Six teardrops and six hollows were rendered before this landed, and the
 * finding is worth keeping: a single convex outline round a bulb is a droplet
 * whatever the flanks do, and scooping one flank out turns it into a comma. The
 * thing that reads as fire is the inner tongue — the left edge runs up out of
 * the bulb, turns at a point and comes back INTO the drawing before rising to
 * the tip, so the silhouette carries a second, smaller flame inside its own
 * outline without a second subpath.
 *
 *   bulb   C, R          the bottom and both sides
 *   right  arcFrom(T1)   G1 out of the bulb, up to the tip
 *   fold   arcFrom(T2)   G1 out of the bulb, up to the tongue tip `P`
 *   inner  arcThrough    P, a waist `M`, and the tip
 *
 * `P` and the tip are true vertices; the round join paints the unit that puts
 * the ink on 1, which is what `tag`'s point and `package`'s corners do.
 */
export function flameFold({ C = [12, 14], R = 8, A = [13, 2], th1 = 0, th2 = 195,
                            P = [10, 13], M = [11.5, 8] } = {}) {
  const T1 = onArc(C, R, th1), T2 = onArc(C, R, th2);
  const right = arcFrom(T1, tangentOnCircle(th1, -1), A);
  const fold = arcFrom(T2, tangentOnCircle(th2, 1), P);
  const inner = arcThrough(P, M, A);
  const p = new Path().M(A);
  p.A(right.c, right.a1, right.a0, -right.dir);
  p.A(C, th1, th2, 1);
  p.A(fold.c, fold.a0, fold.a1, fold.dir);
  p.A(inner.c, inner.a0, inner.a1, inner.dir);
  return p.Z();
}

/* -------------------------------------------------------- graduation-cap */

/**
 * The mortarboard: a rhombus for the board, a bowl under it for the head, and
 * the tassel hanging off the right corner.
 *
 * Two things are solved rather than placed. The board's left and right vertices
 * sit OUTSIDE the canvas — a fillet pulls a painted extreme in by
 * `r(1/sin t - 1)`, so the vertex has to go out by the same amount for the ARC
 * to land on the ink (§7). And the bowl's walls start exactly ON the board's
 * lower edges, so the two pieces join rather than nearly meet (§5).
 */
// `y` is the board's own centre line, and the drawing hangs off it: the tassel
// starts on the left tip and the bowl's walls stop on the board's lower edge, so
// moving it moves the whole cap. His 9 Sep resize is exactly that move, from 8
// to 9, with the ink 16 tall on pads of 4 rather than 18 on pads of 3.
const CAP = { y: 9, capX: 5, bowlTop: 15, tassel: 14, rTip: 1, rEnd: 2 };

/** Solve the rhombus so its ink lands on [x0,y0,x1,·] exactly. */
export function capBoard({ sharp = false, ink = [1, 4, 23] } = {}) {
  const rTip = sharp ? 0 : CAP.rTip, rEnd = sharp ? 0 : CAP.rEnd;
  let half = 11, h = 4.5;
  for (let i = 0; i < 40; i++) {
    const pts = [[12, CAP.y - h], [12 + half, CAP.y], [12, CAP.y + h], [12 - half, CAP.y]];
    const d = String(polyContour(pts, [rEnd, rTip, rEnd, rTip]));
    const bb = strokedBBox(d, 1, 'round');
    half += (ink[2] - bb[2] + (bb[0] - ink[0])) / 2;
    h += bb[1] - ink[1];   // the top vertex is at y - h, so a bigger h paints higher
    if (Math.abs(bb[0] - ink[0]) < 1e-4 && Math.abs(bb[1] - ink[1]) < 1e-4) break;
  }
  const pts = [[12, CAP.y - h], [12 + half, CAP.y], [12, CAP.y + h], [12 - half, CAP.y]];
  const path = polyContour(pts, [rEnd, rTip, rEnd, rTip]);
  return { d: String(path), path, half, h, y: CAP.y, pts, rTip, rEnd };
}

/** Where a vertical at `x` meets the board's lower-left / lower-right edge. */
const boardFoot = (b, x) => CAP.y + (b.h * (b.half - Math.abs(x - 12))) / b.half;

export function capBowl({ sharp = false } = {}) {
  const b = capBoard({ sharp });
  const x0 = 12 - CAP.capX, x1 = 12 + CAP.capX;
  // The bowl is the semicircle tangent to both walls, so the two pieces meet
  // with no corner at all and the foot lands on the ink without a fillet.
  const c = [12, CAP.bowlTop];
  return new Path().M([x0, boardFoot(b, x0)])
    .L([x0, CAP.bowlTop])
    .A(c, 180, 0, -1)
    .L([x1, boardFoot(b, x1)])
    .toString();
}

export function capTassel({ sharp = false } = {}) {
  const b = capBoard({ sharp });
  const x = 12 + b.half - (sharp ? 0 : filletPull(CAP.rTip, Math.atan2(b.h, b.half)));
  const end = CAP.tassel + (sharp ? sharpEndIn([x, CAP.tassel], [0, 1]) : 0);
  return `M${n(x)} ${CAP.y}L${n(x)} ${n(end)}`;
}

export const capBoardPath = (o = {}) => capBoard(o).path;
export const graduationCap = (o = {}) => capBoard(o).d + capBowl(o) + capTassel(o);

/* ------------------------------------------------------------------- book */

/**
 * A closed hardcover: the cover, and the spine's ledge running along the bottom
 * out of the bottom-left corner.
 *
 * The ledge is what keeps it off the `panel-*` silhouette, which is a rounded
 * square with a straight rule edge to edge (§11). This rule is an L: it leaves
 * the left wall exactly where the cover's own corner starts to turn — the two
 * arcs are concentric a unit apart, so they touch at that one point and part
 * everywhere else — and only then runs across to the right wall.
 */
const BOOK = { x0: 4, x1: 20, y0: 2, y1: 22, r: 3, ledge: 17, rLedge: 2 };

export function bookCover({ sharp = false, cut = null } = {}) {
  const r = sharp ? 0 : BOOK.r;
  const B = BOOK;
  if (!cut) return polyContour([[B.x0, B.y0], [B.x1, B.y0], [B.x1, B.y1], [B.x0, B.y1]], [r, r, r, r]);
  // The compound opens its bottom-right corner: the right wall stops above the
  // sign and the bottom wall stops short of it, the same L `file-*` cuts.
  return new Path().M([B.x1, cut.y])
    .L([B.x1, B.y0 + r]).corner([B.x1, B.y0], [B.x0, B.y0], r)
    .corner([B.x0, B.y0], [B.x0, B.y1], r)
    .corner([B.x0, B.y1], [B.x1, B.y1], r)
    .L([cut.x, B.y1])
    .toString();
}

export function bookLedge({ sharp = false, cut = null } = {}) {
  const B = BOOK, r = sharp ? 0 : B.rLedge;
  const end = cut ? cut.x : B.x1;
  const p = new Path().M([B.x0, B.ledge + r]);
  if (r) p.A([B.x0 + r, B.ledge + r], 180, 270, 1); else p.L([B.x0, B.ledge]);
  return p.L([end, B.ledge]).toString();
}

export const book = (o = {}) => String(bookCover(o)) + bookLedge(o);

/* -------------------------------------------------------------- book-open */

/**
 * Two pages over a spine. One closed outline plus the spine rule, not two page
 * shapes: the outline dips to a point between the page tops and again at the
 * foot of the spine, and both of those are true reversals, which a round join
 * paints as the tip the drawing wants.
 */
const OPEN = { x0: 2, x1: 22, top: 4, bottom: 17, r: 2, notch: 4, foot: 20, vr: 3 };

export function bookOpenOutline({ sharp = false } = {}) {
  const O = OPEN, r = sharp ? 0 : O.r;
  const nx = 12 - O.notch, spine = O.top + O.notch;
  const vx = 12 - O.vr;
  const p = new Path().M([O.x0 + r, O.top])
    .L([nx, O.top])
    .A([nx, spine], -90, 0, 1)                       // the left page's top, down to the spine
    .A([12 + O.notch, spine], 180, 270, 1)              // and the right page's top, back up
    .L([O.x1 - r, O.top])
    .corner([O.x1, O.top], [O.x1, O.bottom], r)
    .corner([O.x1, O.bottom], [O.x0, O.bottom], r)
    .L([12 + O.vr, O.bottom])
    .A([12 + O.vr, O.foot], 270, 180, -1)     // down to the foot of the spine
    .A([vx, O.foot], 0, -90, -1)              // and back up to the left page
    .L([O.x0 + r, O.bottom])
    .corner([O.x0, O.bottom], [O.x0, O.top], r)
    .corner([O.x0, O.top], [O.x1, O.top], r);
  return p.Z();
}

export const bookOpenSpine = () => `M12 ${OPEN.top + OPEN.notch}L12 ${OPEN.foot}`;
export const bookOpen = (o = {}) => bookOpenOutline(o).toString() + bookOpenSpine();

/* -------------------------------------------------- book: plate and fill */

/**
 * The book's plate, built rather than offset, because a compound's cover is cut
 * open and an open path has no contour to offset. The numbers are `file-*`'s:
 * the two families share an ink box, so they share the notch, the r=1 turns that
 * land the plate on each cut stroke's cap, and the r=3 the notch turns on.
 */
export function bookPlate({ sharp = false, cut = null } = {}) {
  const r = sharp ? 1 : BOOK.r + 1;
  if (!cut) return polyContour([[3, 1], [21, 1], [21, 23], [3, 23]], [r, r, r, r]);
  const inner = sharp ? 0 : 3;
  return polyContour(
    [[3, 1], [21, 1], [21, 13], [11, 13], [11, 23], [3, 23]],
    [r, r, 1, inner, 1, r],
  );
}

/**
 * The page block: the band the fill opens under the ledge.
 *
 * A panelled object opens a panel rather than slotting its rules (`map`,
 * `briefcase`), and the ledge leaves exactly one band to open. Its top edge is
 * the ledge's own lower ink, and every other side is the cover's inner ink — so
 * the region closes on itself with nothing to solve: the ledge's r=1 lower turn
 * ends on (5,19), which is precisely where the cover's inner corner begins.
 */
export function bookPageBlock({ sharp = false, cut = null } = {}) {
  const B = BOOK, right = cut ? 11 : 19;
  const top = B.ledge + 1, bot = B.y1 - 1;
  if (sharp) {
    const pts = [[5, top], [right, top], [right, bot], [5, bot]];
    return polyContour(pts, [0, 0, 0, 0]);
  }
  const p = new Path().M([5, 19]).A([6, 19], 180, 270, 1).L([right, top]);
  if (cut) p.L([right, bot]).L([7, bot]);
  else p.L([right, 19]).A([17, 19], 0, 90, 1).L([7, bot]);
  return p.A([7, 19], 90, 180, 1).Z();
}

/* --------------------------------------------------- book-open: the gutter */

/**
 * The gutter, which is where a filled open book keeps its spine.
 *
 * Its top is the plate's own notch — the two r=5 arcs the page tops offset to,
 * crossing at (12,5) — so the white runs out through the notch instead of
 * stopping inside it and leaving a sliver tapering to nothing. Its foot stops on
 * the bottom edge's inner ink, which is `panel-left`'s rule: a slot ends at the
 * stroke's outline, not the plate's.
 *
 * That foot is ROUNDED under the rounded treatment. It was cut square, and a
 * square-ended slot is the one thing the corner axis is meant to distinguish:
 * the two inner corners read as a defect at any size, and the sharp half then
 * had nothing of its own to say. The slot is 2 wide, so r=1 is both the ladder
 * value and the most it can take, and the foot comes out as a true semicircle
 * on (12, 15) whose lowest point stays on the same inner ink as before.
 */
export function bookOpenGutter({ sharp = false } = {}) {
  const O = OPEN, R = O.notch + 1, cy = O.top + O.notch;
  const cl = [12 - O.notch, cy], cr = [12 + O.notch, cy];
  const y11 = cy - Math.sqrt(R * R - 9), y12 = cy - Math.sqrt(R * R - 16);
  const foot = O.bottom - 1, r = sharp ? 0 : 1;
  const p = new Path().M([11, y11])
    .A(cl, ang(cl, [11, y11]), ang(cl, [12, y12]))
    .A(cr, ang(cr, [12, y12]), ang(cr, [13, y11]));
  if (r > 0) p.L([13, foot - r]).A([12, foot - r], 0, 180, 1);
  else p.L([13, foot]).L([11, foot]);
  return p.Z();
}
