// Round 4 of the 1.5.0 batch (his asks, 1 Oct 2026): the clipboard's further signs, paste,
// the save family, and two more block drawings. Drawn and dropped by him the same day: a clock
// and a pen as second objects in the clipboard's opened corner (the clock's hands at the house
// minimum blurred at 24), workflow (blocks of 6, the size he had called too small), and
// octagons for hexagons (they cannot nest, so the top one floats).
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import * as X from './lib15.mjs';
import * as D from './d15.mjs';

const { Ls, As, polyLA } = A;
const { S, M, F, Pl, E, geo, grow, open, closed } = D;
const { assert, P } = X;
const C = (sharp) => (sharp ? 'sharp' : 'regular');
const band = (d, sharp) => B.union(...B.runFromD(d).map((r) => [B.band(r, sharp ? 'butt' : 'round')]));
const rect = (x0, y0, x1, y1, rr = [0, 0, 0, 0]) => geo(polyLA([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], rr));

/* ------------------------------------------------------------- clipboard signs */
// file-code, file-terminal and file-type's own signs, verbatim: the file's inside and the
// board's are the same width (walls 4 and 20) and the signs sit on the same centre, so each
// clears the clip and the floor by 2 as it clears the fold and the floor in the file.
function fileSign(name, sharp) {
  const subs = (d) => d.split(/(?=M)/);
  const base = subs(X.rawD('file', 'stroke', C(sharp), 'stroke'));
  const all = subs(X.rawD(name, 'stroke', C(sharp), 'stroke'));
  for (const s of base) assert(all.includes(s), `${name}: the file's subpath ${s.slice(0, 24)} is not in it`);
  return all.filter((s) => !base.includes(s)).join('');
}
export const SIGNS4 = {
  // the house exclamation (cloud-alert's): a 2-long stem over the 2-unit mark, 2 between
  alert: { regular: 'M12 12L12 14', sharp: 'M12 11L12 15', dots: [[12, 18]] },
  code: { regular: fileSign('file-code', false), sharp: fileSign('file-code', true) },
  terminal: { regular: fileSign('file-terminal', false), sharp: fileSign('file-terminal', true) },
  type: { regular: fileSign('file-type', false), sharp: fileSign('file-type', true) },
};

/* ------------------------------------------------------------------------ paste */
// A page held in front of a clipboard (his reference, 1 Oct 2026: paste is "a file on top of
// it"). The clipboard stands back at the top left, board 2..16 by 4..21 on r 3 with the clip
// 8 by 5 on r 2 centred on it (the clipboard's own clip and board, narrowed); the page is the
// house file at 10 by 11, its fold 4 (vertical 2, r 2, across 2, as the file's 6 is 3, 3, 3),
// standing below the clip's ink by 2. The board opens 2 clear of the page, its cut ends on
// whole lines, so the clipboard is the opened body copy's back square is: two-tone plates
// the clip and the page, duotone greys the clipboard behind a black page, fill strokes it in
// front of a solid one. The page's fold is a hole in the solid, as the file's fill cuts it.
export const PASTE = { board: [2, 4, 16, 21], clip: [5, 2, 13, 7], page: [12, 11, 22, 22], fold: 4 };
export function paste(sharp, k = PASTE) {
  const r = sharp ? 0 : 3, cr = sharp ? 0 : 2, pr = sharp ? 0 : 2, e = sharp ? 1 : 0;
  const [bx0, by0, bx1, by1] = k.board, [cx0, cy0, cx1, cy1] = k.clip, [px0, py0, px1, py1] = k.page, f = k.fold;
  // the page's ink and the cut lines: 2 of daylight and a cap's unit back from it
  const wallEnd = py0 - 1 - 2 - 1, floorEnd = px0 - 1 - 2 - 1;
  const left = r
    ? [Ls([cx0, by0], [bx0 + r, by0]), As([bx0 + r, by0 + r], r, 270, 180), Ls([bx0, by0 + r], [bx0, by1 - r]), As([bx0 + r, by1 - r], r, 180, 90), Ls([bx0 + r, by1], [floorEnd, by1])]
    : [Ls([cx0, by0], [bx0, by0]), Ls([bx0, by0], [bx0, by1]), Ls([bx0, by1], [floorEnd + e, by1])];
  const right = r
    ? [Ls([cx1, by0], [bx1 - r, by0]), As([bx1 - r, by0 + r], r, 270, 360), Ls([bx1, by0 + r], [bx1, wallEnd])]
    : [Ls([cx1, by0], [bx1, by0]), Ls([bx1, by0], [bx1, wallEnd + e])];
  const nz = (segs) => segs.filter((s) => s.type !== 'L' || Math.hypot(s.p1[0] - s.p0[0], s.p1[1] - s.p0[1]) > 1e-9);
  const clip = polyLA([[cx0, cy0], [cx1, cy0], [cx1, cy1], [cx0, cy1]], [cr, cr, cr, cr]);
  const page = polyLA([[px1 - f, py0], [px0, py0], [px0, py1], [px1, py1], [px1, py0 + f]], [0, pr, pr, pr, 0]);
  const foldD = sharp ? `M${px1 - f} ${py0}L${px1 - f} ${py0 + f}L${px1} ${py0 + f}` : `M${px1 - f} ${py0}L${px1 - f} ${py0 + f / 2}C${P([px1 - f, py0 + f / 2 + 1.1046])} ${P([px1 - f + 0.8954, py0 + f])} ${px1 - f + 2} ${py0 + f}L${px1} ${py0 + f}`;
  const back = open(nz(left)) + open(nz(right)) + closed(clip);
  const front = closed(page) + foldD;
  const pagePlate = geo(grow(page));
  // the fold's hole: inside the fold's lines and the diagonal, a stroke's half width in
  // the fold's hole as the file's fill cuts it: inside the fold's centre line, clear of the diagonal's band
  const foldRegion = sharp
    ? polyLA([[px1 - f, py0], [px1, py0 + f], [px1 - f, py0 + f]], [0, 0, 0])
    : [Ls([px1 - f, py0], [px1 - f, py0 + f / 2]), As([px1 - f + 2, py0 + f / 2], 2, 180, 90), Ls([px1 - f + 2, py0 + f], [px1, py0 + f]), Ls([px1, py0 + f], [px1 - f, py0])];
  const hole = B.subtract(geo(foldRegion), band(`M${px1 - f} ${py0}L${px1} ${py0 + f}`, sharp));
  const solid = B.subtract(pagePlate, hole);
  return {
    stroke: [S(back + front)],
    'two-tone': [Pl(E(B.union(geo(grow(clip)), pagePlate))), S(back + front)],
    duotone: [M(back), F(E(solid))],
    fill: [S(back), F(E(solid))],
  };
}

/* ------------------------------------------------------------------ save family */
// save's compounds put the sign in the hub's place, centred on (12, 14): the clipboard's
// signs a unit up. save-off is the house cut across the floppy (star-off's recipe): the near
// side runs into the slash and stops on its centre line, the far side stands off at 4 sqrt 2;
// two-tone drops the far strokes, duotone greys the solids under a black slash, fill is the
// solids and the slash.
export const saveSign = (inner) => ({
  regular: X.shift(inner.regular, 0, -1), sharp: X.shift(inner.sharp, 0, -1),
  ...(inner.knock ? { knock: { regular: X.shift(inner.knock.regular, 0, -1), sharp: X.shift(inner.knock.sharp, 0, -1) } } : {}),
});

/* ----------------------------------------------------------------------- blocks */
// blocks (his ask, 1 Oct 2026: "the default option with 4 squares, one is out"): three
// blocks in an L sharing their edges, cells 8 on r 2, and the fourth lifted out of the corner
// diagonally, 6 on r 2, 2 clear of both. Four blocks in a square are the square class, 20 by
// 20 as grid-squares and layout-dashboard (painted 2..22; drawn at 22 its sharp half filled
// the box's corners and read square). Cells of 7 put the L on the other set's lines, so 8 and
// 6. Duotone and fill as the pyramid: four equal solids 8 by 8, the shared edges' width
// between the three, the lifted one black over three grey in duotone.
export function blocksOut(sharp) {
  const r = sharp ? 0 : 2, o = sharp ? 1 : 3;
  const ell = polyLA([[3, 5], [11, 5], [11, 13], [19, 13], [19, 21], [3, 21]], [r, r, 0, r, r, r]);
  const out = polyLA([[15, 3], [21, 3], [21, 9], [15, 9]], [r, r, r, r]);
  const inner = 'M3 13L11 13M11 13L11 21';
  const strokeD = closed(ell) + inner + closed(out);
  const plate = B.union(geo(grow(ell)), geo(grow(out)));
  // the solids stand apart, so every corner takes the one radius (his rule, 1 Oct 2026)
  const three = B.union(rect(2, 4, 10, 12, [o, o, o, o]), rect(2, 14, 10, 22, [o, o, o, o]), rect(12, 14, 20, 22, [o, o, o, o]));
  const lifted = rect(14, 2, 22, 10, [o, o, o, o]);
  return {
    stroke: [S(strokeD)],
    'two-tone': [Pl(E(plate)), S(strokeD)],
    duotone: [Pl(E(three)), F(E(lifted))],
    fill: [F(E(B.union(three, lifted)))],
  };
}
// hexagons (his reference, 1 Oct 2026: "bottom 2, top 1"): three pointy-topped hexagons, two
// side by side and one nested over them, 2 of daylight between the pair; the top one sits up
// so the whole paints 1..23 both ways (its two gaps 2.59). Corners filleted 1.
export const HEX = { a: 4, gap: 2, r: 1 };
function hexagon(c, a, r, k = 1) {
  const R = (2 * a) / Math.sqrt(3);
  const pts = [[0, -R], [a, -R / 2], [a, R / 2], [0, R], [-a, R / 2], [-a, -R / 2]].map(([x, y]) => [c[0] + x, c[1] + y * k]);
  return polyLA(pts, Array(6).fill(r));
}
export function hexagons(sharp, h = HEX) {
  const r = sharp ? 0 : h.r, D2 = (2 * h.a + h.gap + 2) / 2;
  const bottom = (yb) => [[12 - D2, yb], [12 + D2, yb]];
  // solve the rows' heights so the painted box is 1..23
  const at = (yb, yt) => [...bottom(yb), [12, yt]].map((c) => hexagon(c, h.a, r));
  let yb = 16, yt = 6;
  for (let i = 0; i < 6; i++) {
    yb = D.solve((v) => Math.max(...at(v, yt).map((s) => D.inkOf(s)[3])), 23, 10, 22);
    yt = D.solve((v) => -Math.min(...at(yb, v).map((s) => D.inkOf(s)[1])), -1, 0, 12);
  }
  const hx = at(yb, yt);
  const d = hx.map((s) => closed(s)).join('');
  const plates = hx.map((s) => geo(grow(s)));
  return {
    stroke: [S(d)],
    'two-tone': [Pl(E(B.union(...plates))), S(d)],
    duotone: [Pl(E(B.union(plates[0], plates[1]))), F(E(plates[2]))],
    fill: [F(E(B.union(...plates)))],
  };
}
