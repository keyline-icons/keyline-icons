// The 1.8.0 batch (6 Oct 2026): long arrows, asked for by a user as alternatives to the short ones.
// STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of layers { kind, d }.
//
// The names are the other set's `move-*` row, taken name to name: its `move-right` is this long
// arrow, and the set's own `move` (the four-way cross) is already the head of that row. Nothing is
// taken from its drawings. Each part comes off a shipped drawing here:
//
// - The cardinal shaft is `arrow-left-right`'s, moved onto y=12: 3..21, the apex left to the round
//   join as there and in `move`. The head is 4 back with wings 4 either side, ink 2..22 by 7..17.
//   It was drawn first at that row's own 3; his call on seeing it (6 Oct 2026) was "try head 4",
//   on these and on the four pairs below, which read a touch heavier for it at 16px.
// - The diagonal head is `arrow-up-right`'s corner: arms on the axes, r=0.5 at the corner, the
//   shaft stopping 0.6 short of it on each axis (0.1757 in sharp, as there). Its arms are 6, the
//   cardinal head's 5.66 turned through 45 degrees and put on the grid. The box is 4..20 (ink
//   3..21): the diagonal runs 16 * sqrt 2 = 22.6 against the cardinal's 18, the same 1.13 the
//   shipped arrow-up-right keeps against arrow-right.
// - A long arrow is one element, so every style is the stroke, as `arrow-right` and `move` ship.
//   The double-headed `move-horizontal`, `move-vertical`, `move-diagonal` and `move-diagonal-flip`
//   are one line with a head at each end: one element too. The last is the other set's
//   `move-diagonal-2`, renamed on his word for the mirror it is, as `scale-unbalanced-flip` is
//   `scale-unbalanced`'s; their name redirects to it.
// - Redrawn with them: `arrow-left-right`, `arrow-right-left`, `arrow-down-up` and `arrow-up-down`,
//   two of the long arrows side by side, the first grey in two-tone and duotone as they shipped.
//   The head of 4 would put their wings on 2 and 22 at the old rows 6 and 18 (ink 1..23), so the
//   rows step in a unit each, to 7 and 17: ink stays 2..22 square, and each arrow's wings still
//   clear the other's shaft by 4.
//
// Sharp: butt caps, each free end a stub along its run (1 on an axis, 0.414 on a diagonal), the
// diagonal corner true, joins round.
import * as X from '../batch-1-5-0/lib15.mjs';

const { P, assert, ink } = X;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d });
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
const C = { tail: 3, tip: 21, back: 4, wing: 4 };
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
const D = { lo: 4, hi: 20, arm: 6, r: 0.5, short: 0.6, shortSharp: 0.1757 };
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
  'move-diagonal': [diagonal, true, 0], 'move-diagonal-flip': [diagonal, true, 1],
};
const BOX = { [cardinal.name]: [2, 7, 22, 17], [diagonal.name]: [3, 3, 21, 21] };

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

/* ---------------------------------------------------------------------- the pairs */
// One long arrow turned (quarter turns from pointing right) and slid onto its row or column.
const one = (sharp, [q, dx, dy]) => X.shift(X.mapPts(cardinal(sharp, false), turn(q)), dx, dy);
// [the grey arrow, the black arrow, whether the grey one comes first in the stroke path], each in
// the place and order it shipped in, so only the head and the rows change.
const PAIRS = {
  'arrow-left-right': [[2, 0, -5], [0, 0, 5], true],
  'arrow-right-left': [[0, 0, -5], [2, 0, 5], true],
  'arrow-down-up': [[3, 5, 0], [1, -5, 0], false],
  'arrow-up-down': [[1, 5, 0], [3, -5, 0], true],
};
for (const [name, [grey, black, greyFirst]] of Object.entries(PAIRS)) {
  STYLES[name] = (sharp) => {
    const g = one(sharp, grey), k = one(sharp, black), both = greyFirst ? g + k : k + g;
    const b = ink(both, sharp ? 'butt' : 'round');
    assert(Math.max(...b.map((v, i) => Math.abs(v - [2, 2, 22, 22][i]))) < 1e-3, `${name} ${sharp ? 'sharp' : 'regular'} paints ${b.map((v) => v.toFixed(3))}`);
    return { stroke: [S(both)], 'two-tone': [M(g), S(k)], duotone: [M(g), S(k)], fill: [S(both)] };
  };
}
