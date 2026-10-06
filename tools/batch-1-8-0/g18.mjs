// The 1.8.0 batch (6 Oct 2026): long arrows, asked for by a user as alternatives to the short ones.
// STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of layers { kind, d }.
//
// The names are the other set's `move-*` row, taken name to name: its `move-right` is this long
// arrow, and the set's own `move` (the four-way cross) is already the head of that row. Nothing is
// taken from its drawings. Each part comes off a shipped drawing here:
//
// - The cardinal shaft and head are `arrow-left-right`'s lower row, moved onto y=12: shaft 3..21,
//   a head 3 back with wings 3 either side, the apex left to the round join as there and in `move`.
//   Ink 2..22 by 8..16. A head of 4 reads a touch heavier at 16px, and is the other set's; this one
//   is ours.
// - The diagonal head is `arrow-up-right`'s corner: arms on the axes, r=0.5 at the corner, the
//   shaft stopping 0.6 short of it on each axis (0.1757 in sharp, as there). Its arms are 4, the
//   cardinal head's 4.24 turned through 45 degrees and put on the grid. The box is 4..20 (ink
//   3..21): the diagonal runs 16 * sqrt 2 = 22.6 against the cardinal's 18, the same 1.13 the
//   shipped arrow-up-right keeps against arrow-right.
// - A long arrow is one element, so every style is the stroke, as `arrow-right` and `move` ship.
//   The double-headed `move-horizontal`, `move-vertical`, `move-diagonal` and `move-diagonal-2`
//   are one line with a head at each end: one element too.
//
// Sharp: butt caps, each free end a stub along its run (1 on an axis, 0.414 on a diagonal), the
// diagonal corner true, joins round.
import * as X from '../batch-1-5-0/lib15.mjs';

const { P, assert, ink } = X;
const S = (d) => ({ kind: 'stroke', d });
const allStroke = (d) => ({ stroke: [S(d)], 'two-tone': [S(d)], duotone: [S(d)], fill: [S(d)] });
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const unit = (a) => mul(a, 1 / Math.hypot(a[0], a[1]));
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
/** Sharp's stub on a free end: 1 along an axis, (1 - sin t) / cos t off it (0.4142 at 45 degrees). */
const k45 = (t) => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); };
const stubOut = (free, from) => { const t = unit(sub(free, from)); return add(free, mul(t, k45(t))); };
const poly = (pts) => 'M' + pts.map(P).join('L');

// Every drawing is built pointing up-right (diagonal) or right (cardinal) and turned into place.
// Rotations about (12,12) by quarter turns, and the mirror that swaps the diagonal's ends.
const turn = (q) => ([x, y]) => { let p = [x, y]; for (let i = 0; i < ((q % 4) + 4) % 4; i++) p = [24 - p[1], p[0]]; return p; };

/* ------------------------------------------------------------------- cardinal */
const C = { tail: 3, tip: 21, back: 3, wing: 3 };
/** A right-pointing long arrow; `twoHeads` puts the same head on the tail. */
function cardinal(sharp, twoHeads) {
  const y = 12, head = (tip, dir) => {
    const w1 = [tip - dir * C.back, y - C.wing], w2 = [tip - dir * C.back, y + C.wing], apex = [tip, y];
    return poly(sharp ? [stubOut(w1, apex), apex, stubOut(w2, apex)] : [w1, apex, w2]);
  };
  // The shaft runs into the apex, where the round join buries its end; a free tail takes the stub.
  const tail = twoHeads || !sharp ? [C.tail, y] : stubOut([C.tail, y], [C.tip, y]);
  return poly([tail, [C.tip, y]]) + head(C.tip, 1) + (twoHeads ? head(C.tail, -1) : '');
}

/* ------------------------------------------------------------------- diagonal */
const D = { lo: 4, hi: 20, arm: 4, r: 0.5, short: 0.6, shortSharp: 0.1757 };
const K = (4 / 3) * (Math.SQRT2 - 1) * D.r; // the quarter arc's control offset, 0.5523r (drawing-a-new-icon.md section 7)
/** The corner head at (hi, lo), pointing up-right, as arrow-up-right's. */
function corner(sharp) {
  const { lo, hi, arm, r } = D;
  if (sharp) return poly([[hi - arm - 1, lo], [hi, lo], [hi, lo + arm + 1]]);
  return `M${P([hi - arm, lo])}L${P([hi - r, lo])}C${P([hi - r + K, lo])} ${P([hi, lo + r - K])} ${P([hi, lo + r])}L${P([hi, lo + arm])}`;
}
/** The up-right long arrow; `twoHeads` puts the corner on the tail too (turned a half). */
function diagonal(sharp, twoHeads) {
  const { lo, hi } = D, s = sharp ? D.shortSharp : D.short;
  const tip = [hi - s, lo + s];
  const tail = twoHeads ? [lo + s, hi - s] : sharp ? stubOut([lo, hi], [hi, lo]) : [lo, hi];
  const back = twoHeads ? X.mapPts(corner(sharp), turn(2)) : '';
  return poly([tail, tip]) + corner(sharp) + back;
}

/* ---------------------------------------------------------------------- names */
// Quarter turns clockwise from the drawing's own direction: right for a cardinal, up-right for a diagonal.
const NAMES = {
  'move-right': [cardinal, false, 0], 'move-down': [cardinal, false, 1], 'move-left': [cardinal, false, 2], 'move-up': [cardinal, false, 3],
  'move-up-right': [diagonal, false, 0], 'move-down-right': [diagonal, false, 1], 'move-down-left': [diagonal, false, 2], 'move-up-left': [diagonal, false, 3],
  'move-horizontal': [cardinal, true, 0], 'move-vertical': [cardinal, true, 3],
  'move-diagonal': [diagonal, true, 0], 'move-diagonal-2': [diagonal, true, 1],
};
const BOX = { [cardinal.name]: [2, 8, 22, 16], [diagonal.name]: [3, 3, 21, 21] };

export const STYLES = {};
for (const [name, [draw, two, q]] of Object.entries(NAMES)) {
  STYLES[name] = (sharp) => {
    const d = X.mapPts(draw(sharp, two), turn(q));
    // Every variant paints its family's box, turned with it, in both corners (section 10's assertion).
    let want = BOX[draw.name];
    if (q % 2) want = [want[1], want[0], want[3], want[2]];
    const b = ink(d, sharp ? 'butt' : 'round');
    assert(Math.max(...b.map((v, i) => Math.abs(v - want[i]))) < 1e-3, `${name} ${sharp ? 'sharp' : 'regular'} paints ${b.map((v) => v.toFixed(3))}, wants ${want}`);
    return allStroke(d);
  };
}
