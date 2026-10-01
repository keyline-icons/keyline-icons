// The 1.5.0 batch's new objects, drawn as lines and arcs (la.mjs segments) so every
// plate and inner edge is an exact offset. Each builder returns the four styles for one
// corner treatment; g15.mjs maps names onto them.
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import { P, assert } from './lib15.mjs';

const { Ls, As, dLA, offsetLA, verifyOffset, polyLA, rrectLA, toGeo, bandAny } = A;
export const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
export const geo = (segs) => [toGeo(segs)];
export const grow = (segs, d = 1) => { const o = offsetLA(segs, d); verifyOffset(segs, o, d); return o; };
export const shrink = (segs, d = 1) => offsetLA(segs, -d);
export const E = (shape) => B.emitShape(shape);
export const open = (segs) => dLA(segs, false);
export const closed = (segs) => dLA(segs, true);
/** The painted band of an open LA run (the fill knockout of a stroke). */
export const band = (segs, sharp) => geo(bandAny(segs, sharp ? 'butt' : 'round'));

/* ------------------------------------------------------------------ clipboard */
// The board is the vertical rectangle (18 x 22 of ink with the clip): path 4..20 by 4..22,
// r 3 (square in sharp). The clip straddles the board's top edge, centred, 10 by 5 on r 2,
// so the board's top corners run straight into its sides and stop on them (a joined part,
// as a handle meets its body); its slot is 8 by 3, open in the fill as a clamp's is. A clip
// 8 wide on 2..6 sat on the other set's line for line (checked by overlay, 1 Oct 2026).
export const BOARD = { x0: 4, y0: 4, x1: 20, y1: 22, r: 3 };
export const CLIP = { x0: 7, x1: 17, y0: 2, y1: 7, r: 2 };
const pill = (c) => c.r * 2 >= c.y1 - c.y0 - 1e-9;

/** The clip, closed. A pill keeps its round ends in sharp (a shape, like mic's capsule); a rounded rectangle squares. */
export function clipLA(sharp, c = CLIP) {
  const r = sharp && !pill(c) ? 0 : c.r;
  return polyLA([[c.x0, c.y0], [c.x1, c.y0], [c.x1, c.y1], [c.x0, c.y1]], [r, r, r, r]);
}
/** The board's closed outline (for its plate). */
export const boardLA = (sharp, b = BOARD) => polyLA([[b.x0, b.y0], [b.x1, b.y0], [b.x1, b.y1], [b.x0, b.y1]], Array(4).fill(sharp ? 0 : b.r));
/**
 * The board's stroke: the closed outline opened where the clip sits on the top edge, and,
 * for a corner sign, opened at the bottom right too (file-x's cut: the floor stops on 10,
 * the right wall on 12; sharp runs each cut end on a unit).
 */
export function boardRuns(sharp, { notch = false } = {}, b = BOARD, c = CLIP) {
  const r = sharp ? 0 : b.r, e = sharp ? 1 : 0;
  const tl = r ? [As([b.x0 + r, b.y0 + r], r, 270, 180)] : [];
  const bl = r ? [As([b.x0 + r, b.y1 - r], r, 180, 90)] : [];
  const br = r ? [As([b.x1 - r, b.y1 - r], r, 90, 0)] : [];
  const tr = r ? [As([b.x1 - r, b.y0 + r], r, 0, -90)] : [];
  // left part: from the clip's left side, round the top-left corner, down the left wall
  const left = [Ls([c.x0, b.y0], [b.x0 + r, b.y0]), ...tl, Ls([b.x0, b.y0 + r], [b.x0, b.y1 - r]), ...bl];
  if (!notch) {
    return [[...left, Ls([b.x0 + r, b.y1], [b.x1 - r, b.y1]), ...br, Ls([b.x1, b.y1 - r], [b.x1, b.y0 + r]), ...tr, Ls([b.x1 - r, b.y0], [c.x1, b.y0])].filter(nonzero)];
  }
  return [
    [...left, Ls([b.x0 + r, b.y1], [10 + e, b.y1])].filter(nonzero),
    [Ls([b.x1, 12 + e], [b.x1, b.y0 + r]), ...tr, Ls([b.x1 - r, b.y0], [c.x1, b.y0])].filter(nonzero),
  ];
}
const nonzero = (s) => s.type !== 'L' || Math.hypot(s.p1[0] - s.p0[0], s.p1[1] - s.p0[1]) > 1e-9;

/** file-x's plate notch round a bottom-right corner sign, in this board's frame. */
function notchedPlate(sharp, b = BOARD) {
  const r = sharp ? 0 : b.r, R = r + 1;
  const segs = [];
  // clockwise from the top-left corner
  if (sharp) segs.push(As([b.x0, b.y0], 1, 180, 270)); else segs.push(As([b.x0 + r, b.y0 + r], R, 180, 270));
  segs.push(Ls([b.x0 + r, b.y0 - 1], [b.x1 - r, b.y0 - 1]));
  if (sharp) segs.push(As([b.x1, b.y0], 1, 270, 360)); else segs.push(As([b.x1 - r, b.y0 + r], R, 270, 360));
  segs.push(Ls([b.x1 + 1, b.y0 + r], [b.x1 + 1, 12]));
  segs.push(As([b.x1, 12], 1, 0, 90));                                  // round the right wall's cut end
  if (sharp) segs.push(Ls([b.x1, 13], [11, 13]), Ls([11, 13], [11, 22]));
  else segs.push(Ls([b.x1, 13], [14, 13]), As([14, 16], 3, 270, 180), Ls([11, 16], [11, 22]));
  segs.push(As([10, 22], 1, 0, 90));                                    // round the floor's cut end
  segs.push(Ls([10, b.y1 + 1], [b.x0 + r, b.y1 + 1]));
  if (sharp) segs.push(As([b.x0, b.y1], 1, 90, 180)); else segs.push(As([b.x0 + r, b.y1 - r], R, 90, 180));
  segs.push(Ls([b.x0 - 1, b.y1 - r], [b.x0 - 1, b.y0 + r]));
  return segs.filter(nonzero);
}

/** The house arrow-right sign in file-*'s 6-unit box (14..20 by 16..22), as file-arrow-right draws it. */
export const ARROW_RIGHT = { regular: 'M14 19L20 19M17 16L20 19L17 22', sharp: 'M13 19L20 19M16.7071 15.7071L20 19L16.7071 22.2929' };

export function clipboard(sharp, { sign = null, inner = null } = {}) {
  const clip = clipLA(sharp), board = boardLA(sharp);
  const runs = boardRuns(sharp, { notch: !!sign });
  const strokeD = runs.map(open).join('') + closed(clip);
  const signD = sign ? sign[sharp ? 'sharp' : 'regular'] : inner ? inner[sharp ? 'sharp' : 'regular'] : '';
  const dots = inner?.dots ?? (sign?.dot ? [sign.dot] : []);
  const mark = dots.length ? [F(dots.map((c) => A.dLA(A.circleLA(c, 1), true)).join(''))] : [];
  const clipPlate = geo(grow(clip)), counter = geo(shrink(clip));
  const boardPlate = sign ? geo(notchedPlate(sharp)) : geo(grow(board));
  const silhouette = B.union(boardPlate, clipPlate);
  const clipBand = B.subtract(clipPlate, counter);
  // an inner sign is cut out of the fill, as message-check's is; a corner sign stands in the notch
  let fill = B.subtract(silhouette, counter);
  if (inner) {
    const knock = inner.knock ? inner.knock[sharp ? 'sharp' : 'regular'] : signD;
    fill = B.subtract(fill, B.union(...B.runFromD(knock).map((r) => [B.band(r, sharp ? 'butt' : 'round')])));
    for (const c of dots) fill = B.subtract(fill, geo(A.circleLA(c, 1)));
  }
  const signLayer = signD ? [S(signD)] : [];
  return {
    stroke: [S(strokeD + signD), ...mark],
    'two-tone': [Pl(E(silhouette)), S(strokeD + signD), ...mark],
    duotone: [Pl(E(boardPlate)), F(E(clipBand)), ...signLayer, ...mark],
    fill: inner ? [F(E(fill))] : [F(E(fill)), ...signLayer, ...mark],
  };
}
/**
 * The clipboard family's signs, on the board (his references, 1 Oct 2026: a clipboard carries
 * its sign where you would write, never in a cut corner). The house 6-unit signs centred on
 * (12, 15): the board's free inside runs from the clip's ink (8) to the floor's (21), so a sign
 * there clears the clip by 3 and the floor by 2. paste and copy are the arrow sign pointing out
 * and in; list is two rows of marks and lines, 4 apart.
 */
export const INNER = {
  check: { regular: 'M9 15L11 17L15 13', sharp: 'M8.7071 14.7071L11 17L15.2929 12.7071' },
  plus: { regular: 'M12 12L12 18M9 15L15 15', sharp: 'M12 11L12 19M8 15L16 15' },
  minus: { regular: 'M9 15L15 15', sharp: 'M8 15L16 15' },
  x: { regular: 'M9 12L15 18M15 12L9 18', sharp: 'M8.7071 11.7071L15.2929 18.2929M15.2929 11.7071L8.7071 18.2929' },
  // knock: the fill's cut, the shaft half a unit short under the head's join (cloud-upload's fix:
  // two caps on one arc are a chain the boolean cannot walk)
  paste: {
    regular: 'M9 15L15 15M12 12L15 15L12 18', sharp: 'M8 15L15 15M11.7071 11.7071L15 15L11.7071 18.2929',
    knock: { regular: 'M9 15L14.5 15M12 12L15 15L12 18', sharp: 'M8 15L14.5 15M11.7071 11.7071L15 15L11.7071 18.2929' },
  },
  copy: {
    regular: 'M15 15L9 15M12 12L9 15L12 18', sharp: 'M16 15L9 15M12.2929 11.7071L9 15L12.2929 18.2929',
    knock: { regular: 'M15 15L9.5 15M12 12L9 15L12 18', sharp: 'M16 15L9.5 15M12.2929 11.7071L9 15L12.2929 18.2929' },
  },
  list: { regular: 'M12 13L16 13M12 17L16 17', sharp: 'M11 13L17 13M11 17L17 17', dots: [[8, 13], [8, 17]] },
};
/**
 * The file family's corner signs in their 6-unit box (14..20 by 16..22), read off file-plus,
 * file-minus, file-check, file-x, file-arrow-*, file-zap and file-alert as they ship.
 * clipboard-paste is the arrow-right one, so the family has no clipboard-arrow-right.
 */
export const SIGNS = {
  plus: { regular: 'M17 16L17 22M14 19L20 19', sharp: 'M17 15L17 23M13 19L21 19' },
  minus: { regular: 'M14 19L20 19', sharp: 'M13 19L21 19' },
  check: { regular: 'M14 19L16 21L20 17', sharp: 'M13.7071 18.7071L16 21L20.2929 16.7071' },
  x: { regular: 'M14 16L20 22M20 16L14 22', sharp: 'M13.7071 15.7071L20.2929 22.2929M20.2929 15.7071L13.7071 22.2929' },
  'arrow-up': { regular: 'M17 22L17 16M14 19L17 16L20 19', sharp: 'M17 23L17 16M13.7071 19.2929L17 16L20.2929 19.2929' },
  'arrow-down': { regular: 'M17 16L17 22M14 19L17 22L20 19', sharp: 'M17 15L17 22M13.7071 18.7071L17 22L20.2929 18.7071' },
  'arrow-left': { regular: 'M20 19L14 19M17 16L14 19L17 22', sharp: 'M21 19L14 19M17.2929 15.7071L14 19L17.2929 22.2929' },
  zap: { regular: 'M18 16L15 19L19 19L16 22', sharp: 'M18.2929 15.7071L15 19L19 19L15.7071 22.2929' },
  alert: { regular: 'M17 16L17 18', sharp: 'M17 15L17 19', dot: [17, 22] },
};

/* ----------------------------------------------------------------------- save */
// A floppy disk: the house square (path 3..21, r 3) with its top right corner cut off at
// 45 degrees, the shutter hanging from the top edge as a U joined to the body, and the hub a
// ring r 3 on (12, 14), midway between the shutter's ink and the floor's (his pick of two,
// 1 Oct 2026, over a label standing on the floor: the hub's place takes a compound's sign).
// Sharp squares every corner but the chamfer's, which stay true points under the round join.
// Duotone and fill carry the details as solid shapes (his reference, 1 Oct 2026): the
// shutter is its U's centre line closed 2 below the body's edge (7..13 by 4..7, r 1, square
// in sharp), the hub a disc of r 3; black on the grey body in duotone, cut out of the black
// one in fill. A compound's sign stands in the hub's place, black over the grey, a band cut
// out of the fill.
export const FLOPPY = { cut: 4, fr: 2, sh: [7, 13, 7], shr: 1, hub: [12, 14], hr: 3 };
export function floppyLA(sharp, f = FLOPPY) {
  const r = sharp ? 0 : 3, fr = sharp ? 0 : f.fr;
  return polyLA([[3, 3], [21 - f.cut, 3], [21, 3 + f.cut], [21, 21], [3, 21]], [r, fr, fr, r, r]);
}
/** A U from a body edge: x0..x1, its far side on y, from the edge at ey. */
function uRun(x0, x1, ey, y, r, sharp) {
  const rr = sharp ? 0 : r, dir = Math.sign(y - ey);
  const pts = [[x0, ey], [x0, y], [x1, y], [x1, ey]];
  if (!rr) return pts.slice(1).map((p, i) => Ls(pts[i], p));
  const a = (c, a0, a1) => As(c, rr, a0, a1);
  return dir > 0
    ? [Ls([x0, ey], [x0, y - rr]), a([x0 + rr, y - rr], 180, 90), Ls([x0 + rr, y], [x1 - rr, y]), a([x1 - rr, y - rr], 90, 0), Ls([x1, y - rr], [x1, ey])]
    : [Ls([x0, ey], [x0, y + rr]), a([x0 + rr, y + rr], 180, 270), Ls([x0 + rr, y], [x1 - rr, y]), a([x1 - rr, y + rr], 270, 360), Ls([x1, y + rr], [x1, ey])];
}
/** The floppy's parts: { body, shutter, plate, d } (the stroke without the hub). */
export function floppy(sharp, f = FLOPPY) {
  const body = floppyLA(sharp, f);
  const shutter = uRun(f.sh[0], f.sh[1], 3, f.sh[2], f.shr, sharp);
  return { body, shutter, plate: geo(grow(body)), d: closed(body) + open(shutter) };
}
/**
 * save, or a compound with its sign in the hub's place (sign: { regular, sharp, knock? } as
 * the clipboard's INNER). The sign is cut out of the fill and grey through the black in
 * duotone, as the hub's ring is.
 */
export function save(sharp, { sign = null } = {}, f = FLOPPY) {
  const { plate, d } = floppy(sharp, f);
  const hubD = A.dLA(A.circleLA(f.hub, f.hr), true);
  const signD = sign ? sign[sharp ? 'sharp' : 'regular'] : '';
  const knockD = sign ? (sign.knock ? sign.knock[sharp ? 'sharp' : 'regular'] : signD) : '';
  const shutter = shutterShape(sharp, f), hub = geo(A.circleLA(f.hub, f.hr));
  const cut = sign ? B.union(...B.runFromD(knockD).map((r) => [B.band(r, sharp ? 'butt' : 'round')])) : hub;
  const strokeD = d + (sign ? signD : hubD);
  return {
    stroke: [S(strokeD)],
    'two-tone': [Pl(E(plate)), S(strokeD)],
    duotone: sign ? [Pl(E(plate)), F(E(shutter)), S(signD)] : [Pl(E(plate)), F(E(shutter) + E(hub))],
    fill: [F(E(B.subtract(B.subtract(plate, shutter), cut)))],
  };
}
/** The shutter as a solid: its U's centre line closed 2 below the body's edge. */
export const shutterShape = (sharp, f = FLOPPY) => geo(polyLA([[f.sh[0], 4], [f.sh[1], 4], [f.sh[1], f.sh[2]], [f.sh[0], f.sh[2]]], Array(4).fill(sharp ? 0 : 1)));

/* ------------------------------------------------------------------------- tv */
// A television: the horizontal rectangle (path 2..22, r 3) under a pair of rabbit-ear
// antennas that meet on the middle of its top edge. Duotone as monitor and radio: the
// screen black, the antennas grey; fill: the screen solid under the stroked antennas.
export const TV = { top: 8, bot: 21, ant: [[8, 3], [16, 3]] };
export function tv(sharp, t = TV) {
  const r = sharp ? 0 : 3;
  const body = polyLA([[2, t.top], [22, t.top], [22, t.bot], [2, t.bot]], [r, r, r, r]);
  const e = sharp ? 1 : 0;
  const apex = [12, t.top];
  const arm = (q) => { const v = [q[0] - apex[0], q[1] - apex[1]], L = Math.hypot(...v); return [q[0] + (v[0] / L) * extend(v), q[1] + (v[1] / L) * extend(v)]; };
  // sharp: a free end runs on (1 - sin t) / cos t along itself, t off the nearer axis (sharp.md, Free ends)
  function extend(v) { if (!sharp) return 0; const a = Math.atan2(Math.abs(v[1]), Math.abs(v[0])), th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); }
  const ant = `M${P(arm(t.ant[0]))}L${P(apex)}L${P(arm(t.ant[1]))}`;
  const plate = geo(grow(body));
  return {
    stroke: [S(closed(body) + ant)],
    'two-tone': [Pl(E(plate)), S(closed(body) + ant)],
    duotone: [M(ant), F(E(plate))],
    fill: [F(E(plate)), S(ant)],
  };
}

/* --------------------------------------------------------------------- target */
// A bullseye in radar's vocabulary: the r 10 ring, the r 6 ring two clear inside it, and
// radar's centre bead (r 1.5). Fill: the outer ring's counter solid (a ring's counter is
// not detail), the inner ring and the bead knocked out of it. Duotone: the disc grey, the
// inner ring and the bead black.
export function target(sharp) {
  const ring = (r) => L_circle([12, 12], r);
  const bead = L_circle([12, 12], 1.5);
  const outer = A.circleLA([12, 12], 10), inner = A.circleLA([12, 12], 6);
  const disc = geo(grow(outer));
  const innerBand = B.subtract(geo(grow(inner)), geo(shrink(inner)));
  const beadShape = geo(A.circleLA([12, 12], 1.5));
  return {
    stroke: [S(ring(10) + ring(6)), F(bead)],
    'two-tone': [Pl(E(disc)), S(ring(10) + ring(6)), F(bead)],
    duotone: [Pl(E(disc)), S(ring(6)), F(bead)],
    fill: [F(E(B.subtract(B.subtract(disc, innerBand), beadShape)))],
  };
}
import { circle as L_circle } from '../batch-1-4-0/lib.mjs';

/* ------------------------------------------------------------------ columns-3 */
// Three equal columns in the house square (path 3..21, r 3): rules on 9 and 15 across the
// whole height, as grid-3x3 draws its verticals. Duotone and fill as grid-3x3: the frame's
// plate grey with the rules black 2 short of its edge; fill, the rules cut out to the
// frame's inner edge.
export function columns3(sharp) {
  const r = sharp ? 0 : 3;
  const body = polyLA([[3, 3], [21, 3], [21, 21], [3, 21]], [r, r, r, r]);
  const rules = 'M9 3L9 21M15 3L15 21';
  const plate = geo(grow(body));
  const e = sharp ? 1 : 0;
  const inner = `M9 ${5 - e}L9 ${19 + e}M15 ${5 - e}L15 ${19 + e}`;
  const slots = B.union(...[9, 15].map((x) => geo(polyLA([[x - 1, 4], [x + 1, 4], [x + 1, 20], [x - 1, 20]], [0, 0, 0, 0]))));
  return {
    stroke: [S(closed(body) + rules)],
    'two-tone': [Pl(E(plate)), S(closed(body) + rules)],
    duotone: [Pl(E(plate)), S(inner)],
    fill: [F(E(B.subtract(plate, slots)))],
  };
}

/* --------------------------------------------------------------------- blocks */
// Three blocks stacked, two on the floor and one on top of them, sharing their edges (his
// call, 1 Oct 2026: big units, not four small squares). Blocks 10 by 10 on r 2 (the mid-size
// rung); the top one's lower corners stand square on the shared edge. Ink 1..23 both ways.
// Duotone and fill are three equal solids 10 by 10, the shared edges' width between them, the
// top one black over two grey in duotone. The house divider rule (grid-3x3, columns-3: the
// seams cut 2 short of the edge) was drawn first and its seams read as a letter T; a gap
// carved only under the top block leaves a notch in each lower one, so the row's top drops
// to the gap's floor and the top block to the lower ones' width.
export function blocks(sharp) {
  const r = sharp ? 0 : 2, o = sharp ? 1 : 3;
  const top = r ? [Ls([7, 12], [7, 2 + r]), As([7 + r, 2 + r], r, 180, 270), Ls([7 + r, 2], [17 - r, 2]), As([17 - r, 2 + r], r, 270, 360), Ls([17, 2 + r], [17, 12])] : [Ls([7, 12], [7, 2]), Ls([7, 2], [17, 2]), Ls([17, 2], [17, 12])];
  const row = polyLA([[2, 12], [22, 12], [22, 22], [2, 22]], [r, r, r, r]);
  const strokeD = open(top) + closed(row) + 'M12 12L12 22';
  const topBox = polyLA([[7, 2], [17, 2], [17, 12], [7, 12]], [r, r, 0, 0]);
  const plate = B.union(geo(grow(topBox)), geo(grow(row)));
  const box = (x0, y0, x1, y1, rr) => geo(polyLA([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], rr));
  // the solids stand apart, so every corner takes the one radius (his rule, 1 Oct 2026)
  const upper = box(7, 1, 17, 11, [o, o, o, o]);
  const lower = B.union(box(1, 13, 11, 23, [o, o, o, o]), box(13, 13, 23, 23, [o, o, o, o]));
  return {
    stroke: [S(strokeD)],
    'two-tone': [Pl(E(plate)), S(strokeD)],
    duotone: [Pl(E(lower)), F(E(upper))],
    fill: [F(E(B.union(upper, lower)))],
  };
}

/* ---------------------------------------------------------------------- frame */
// The design tool's frame mark: two horizontal and two vertical rules crossing, each
// running 3 past the crossings, so the square they close (14 between centre lines)
// dominates and the tails read as a frame's, not a hash's. Rules on 5 and 19 from 2 to 22:
// the corners stand empty, so lint holds it to the round forms' 22. A mark, not an
// object (command's ruling): every style is the black stroke.
export function frame(sharp) {
  const e = sharp ? 1 : 0;
  const d = `M${2 - e} 5L${22 + e} 5M${2 - e} 19L${22 + e} 19M5 ${2 - e}L5 ${22 + e}M19 ${2 - e}L19 ${22 + e}`;
  return { stroke: [S(d)], 'two-tone': [S(d)], duotone: [S(d)], fill: [S(d)] };
}

/* ------------------------------------------------------------------ container */
// A shipping container, seen square on with its depth running up to the right: the front
// face 16 by 10 with three ribs across its height (pitch 4, two clear of each other and
// the walls), the back face the front moved (4, -4), only its top and right edges seen.
// Corners r 2, every depth edge tangent to both faces' corners (sharp: true corners).
// Fill as package fills its box: the whole silhouette solid, the face edges gone, the ribs
// cut out to the front's rim (the first draft left the top and the end as outlines, half a
// fill beside package's whole one). Duotone: the front black with the ribs grey through it,
// the top and the end grey. A front view, container-2, was drawn and dropped on 1 Oct 2026:
// on its own it read as a grille or a barcode.
export const CONT = { x0: 2, y0: 9, x1: 18, y1: 19, dx: 4, ribs: [6, 10, 14], r: 2 };
export function container(sharp, k = CONT) {
  const r = sharp ? 0 : k.r, q = r / Math.SQRT2;
  const { x0, y0, x1, y1, dx } = k;
  const front = polyLA([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);
  const bx0 = x0 + dx, by0 = y0 - dx, bx1 = x1 + dx, by1 = y1 - dx;
  // the depth edges join the faces' corners where both corners turn through 45 degrees
  const at = (cx, cy, sx, sy) => [cx + sx * (r - q), cy + sy * (r - q)];
  const tl = [at(x0, y0, 1, 1), at(bx0, by0, 1, 1)], tr = [at(x1, y0, -1, 1), at(bx1, by0, -1, 1)], br = [at(x1, y1, -1, -1), at(bx1, by1, -1, -1)];
  // one run round the back: up the top-left depth edge, over the back's top, down its right side, back along the bottom-right depth edge
  const backRun = r
    ? [Ls(tl[0], tl[1]), As([bx0 + r, by0 + r], r, 225, 270), Ls([bx0 + r, by0], [bx1 - r, by0]), As([bx1 - r, by0 + r], r, 270, 360), Ls([bx1, by0 + r], [bx1, by1 - r]), As([bx1 - r, by1 - r], r, 0, 45), Ls(br[1], br[0])]
    : [Ls([x0, y0], [bx0, by0]), Ls([bx0, by0], [bx1, by0]), Ls([bx1, by0], [bx1, by1]), Ls([bx1, by1], [x1, y1])];
  const trEdge = `M${P(tr[0])}L${P(tr[1])}`;
  const ribs = k.ribs.map((x) => `M${x} ${y0}L${x} ${y1}`).join('');
  const strokeD = closed(front) + open(backRun) + trEdge + ribs;
  const silLA = r
    ? [As([x0 + r, y1 - r], r, 90, 180), Ls([x0, y1 - r], [x0, y0 + r]), As([x0 + r, y0 + r], r, 180, 225), ...backRun, As([x1 - r, y1 - r], r, 45, 90), Ls([x1 - r, y1], [x0 + r, y1])]
    : [Ls([x0, y1], [x0, y0]), ...backRun, Ls([x1, y1], [x0, y1])];
  const sil = geo(grow(silLA));
  const frontPlate = geo(grow(front));
  // the ribs as slots, stopping on the front's inner edge so its rim holds
  const slots = B.union(...k.ribs.map((x) => geo(polyLA([[x - 1, y0 + 1], [x + 1, y0 + 1], [x + 1, y1 - 1], [x - 1, y1 - 1]], [0, 0, 0, 0]))));
  const frontSolid = B.subtract(frontPlate, slots);
  return {
    stroke: [S(strokeD)],
    'two-tone': [Pl(E(sil)), S(strokeD)],
    duotone: [Pl(E(sil)), F(E(frontSolid))],
    fill: [F(E(B.subtract(sil, slots)))],
  };
}

/* ---------------------------------------------------------------------- flips */
// A mirror: two triangles pointing at a dashed axis, each the other's reflection (his pick of
// two, 1 Oct 2026; right triangles back to back "looked wrong", brackets across the axis sat on
// the other set's line). Each paints 1..9 by 6..18, two clear of the dashes (2 long on a pitch
// of 6, so 2 of daylight between them; sharp runs each dash a unit on at both ends), its three
// corners filleted 1 (sharp: true points, the vertices solved again so the painted box is the
// rounded one's; the round-2 draft painted from 2, 20 wide where a circle-class drawing is 22).
// flip-vertical is the same drawing turned a quarter. Two-tone: plates grey
// under every stroke; duotone: both triangles grey, the axis black (his rule, 1 Oct 2026; the
// first draft blacked the original and greyed the mirror and the axis); fill: both solid under a
// black axis.
export function flip(sharp, vertical = false) {
  const rad = sharp ? [0, 0, 0] : [1, 1, 1];
  const tri = (bx, ax, h) => [[bx, 12 - h], [ax, 12], [bx, 12 + h]];
  let h = 5, bx = 3, ax = 9;
  for (let k = 0; k < 4; k++) {
    h = solve((v) => -inkOf(polyLA(tri(bx, ax, v), rad))[1], -6, 3, 9);
    bx = solve((x) => inkOf(polyLA(tri(x, ax, h), rad))[0], 1, -1, 5);
    ax = solve((x) => inkOf(polyLA(tri(bx, x, h), rad))[2], 9, 6, 11);
  }
  const L = polyLA(tri(bx, ax, h), rad), R = polyLA(tri(24 - bx, 24 - ax, h), rad);
  const e = sharp ? 1 : 0;
  const dashes = [[2, 4], [8, 10], [14, 16], [20, 22]].map(([a0, a1]) => `M12 ${a0 - e}L12 ${a1 + e}`).join('');
  const turn = (d) => (vertical ? mapPts(d, ([x, y]) => [24 - y, x]) : d);
  const dl = turn(closed(L)), dr = turn(closed(R)), dd = turn(dashes);
  const pl = turn(E(geo(grow(L)))), pr = turn(E(geo(grow(R))));
  return {
    stroke: [S(dl + dr + dd)],
    'two-tone': [Pl(pl + pr), S(dl + dr + dd)],
    duotone: [Pl(pl + pr), S(dd)],
    fill: [F(pl + pr), S(dd)],
  };
}
import { mapPts } from './lib15.mjs';

/* ------------------------------------------------------- solving to whole ink */
import { strokedBBox as SBB } from '../../pipeline/lib/geom.mjs';
/** Painted box of a closed LA contour (round join, stroke 2). */
export const inkOf = (segs) => SBB(dLA(segs, true), 1, 'round');
/** Bisect one parameter until f(p) hits the target (f monotone on [lo, hi]). */
export function solve(f, target, lo, hi, it = 80) {
  let flo = f(lo) - target;
  for (let i = 0; i < it; i++) { const m = (lo + hi) / 2, fm = f(m) - target; if ((fm < 0) === (flo < 0)) { lo = m; flo = fm; } else hi = m; }
  return (lo + hi) / 2;
}
