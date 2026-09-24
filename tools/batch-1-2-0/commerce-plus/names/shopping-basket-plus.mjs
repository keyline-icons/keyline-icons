// shopping-basket-plus: the plus bottom right, where the basket's side slants away.
//
// Probed every seat on the right (diag/shopping-basket-*.svg; modifiers sit right):
//   top right, flush      box ink 15..23 by 2..10: the handle's right leg and top
//                         corner (ink to x 16.84) are inside it, and the rim (ink
//                         9..11) runs 1 into its bottom. The handle says basket.
//   top right, escape     basket moved (0, +1) (it is 22 wide, so it cannot move
//                         left), box ink 15..23 by 1..9: the handle is still inside
//                         and the rim's ink top (10) is 1 under the box. Fails.
//   bottom right, flush   box path 16..22 by 15..21, ink 15..23 by 14..22, the
//                         basket unmoved (compound = the base's box, 1..23 by 2..22).
//                         Notch lines x = 13, y = 12. The right side ends on y = 11,
//                         inside the rim's r=1 corner: none of the slanted side
//                         survives, the rim turns down a quarter and stops. DRAWN.
//   bottom right, escape  basket moved (0, -1), box path 16..22 by 16..22, ink 15..23
//                         by 15..23, compound 1..23 both ways (map-pin-plus's move).
//                         Notch lines x = 13, y = 13. The right side ends on y = 12:
//                         1.79 of its 8.67 slant survives. Drawn as the alternative.
// In both bottom-right seats the bottom ends on x = 12 (5.52 of its 11.04 straight
// run kept), the rim and the handle are whole, and nothing else is cut. Flush
// clears everything, so the escape (for a seat that fails, map-pin-plus) is not
// owed; it also lifts the bottom onto y = 20, ending on x = 12, which is the other
// set's basket-plus bottom run: overlay 25.2 against 9.6 flush (the plus, the same
// forced 16..22 in both, is 7.5 of each).
//
// Construction as tablet-plus and heart-plus: the plate notched on the two lines,
// r=3 fillet about the box's corner, an r=1 turn round each round cap; sharp takes
// the house stub on the slanted side (its outer corner lands on the notch line,
// its inner corner above it, so the plate follows the bar down to the line) and a
// butt face on x = 13 on the bottom, square notch. The basket's duotone and fill
// share one body contour with its two-tone plate, so one notched contour serves all
// three; each style keeps its own handle (grey in duotone, black in fill), the plus
// black on top.
import { parse, emit, translate, split, solveCoord, nearest, tangent, arc, line, chain, stub, P, at } from '../lib/path.mjs';
import { layers, strokeEl, withD } from '../lib/svg.mjs';
import { plus, signInk, distToBox } from '../lib/sign.mjs';

const SEATS = {
  flush: { dy: 0, box: [16, 15], want: [1, 2, 23, 22], sibling: 'tablet-plus' },
  escape: { dy: -1, box: [16, 16], want: [1, 1, 23, 23], sibling: 'map-pin-plus' },
};

function make(seat) {
  const { dy, box: BOX, want, sibling } = SEATS[seat];
  const INK = signInk(...BOX);
  const NX = INK[0] - 2, NY = INK[1] - 2;      // x = 13; y = 12 flush, 13 escape
  const moved = (d) => translate(parse(d), 0, dy);
  const BOTTOM = 21 + dy;                       // the bottom's centre line

  /** The body's stroke opened: bottom ends on x = 12, the right side on y = NY - 1. */
  function cutBody(sub, sharp, notes) {
    const s = sub.segs;
    if (!sharp) {
      // rim | r=1 corner | side | corner | bottom | corner | side | corner, closed
      if (s.length !== 8) throw new Error(`basket body has ${s.length} segments`);
      const bottom = s[4];
      if (bottom.p0.y !== BOTTOM || bottom.p1.y !== BOTTOM) throw new Error('basket bottom moved');
      const [, bottomKeep] = split(bottom, solveCoord(bottom, 0, NX - 1));
      // the right end: on the rim's corner (flush) or on the side (escape)
      const iR = [1, 2].find((i) => { const ys = [s[i].p0.y, s[i].p1.y]; return Math.min(...ys) <= NY - 1 && Math.max(...ys) >= NY - 1; });
      const tR = solveCoord(s[iR], 1, NY - 1);
      const [rightKeep] = split(s[iR], tR);
      const E = at(s[iR], tR);
      notes.push(`${seat}: right side ends (${E.map((v) => v.toFixed(4)).join(', ')}) on the ${iR === 1 ? "rim's corner" : `side, ${Math.hypot(E[0] - s[2].p0.x, E[1] - s[2].p0.y).toFixed(2)} of its ${Math.hypot(s[2].p1.x - s[2].p0.x, s[2].p1.y - s[2].p0.y).toFixed(2)} kept`}`);
      return { run: chain([bottomKeep, s.slice(5), s[0], iR === 2 ? s[1] : null, rightKeep]), E };
    }
    // M2.0001 10 L21.9999 10 L19 21 L5 21 L2.0001 10 Z (before the move)
    if (s.length !== 4) throw new Error(`sharp basket body has ${s.length} segments`);
    const [rim, side, bottom, left] = s;
    const t = solveCoord(side, 1, NY - 1);
    const E = at(side, t);
    const u = tangent(side, t);                  // down the side, into the removed corner
    const f = stub(E, u, want);
    notes.push(`${seat} sharp side stub k ${f.k.toFixed(4)}, face (${f.corners.map((c) => c.map((v) => v.toFixed(4)).join(', ')).join(') (')})`);
    // the bottom's butt face goes a unit out, onto the notch line
    return { run: chain([line(P(NX, BOTTOM), bottom.p1), left, rim, line(rim.p1, P(...f.end))]), E, u, face: f };
  }

  /** The body contour (two-tone plate, duotone and fill body) notched. */
  function notchPlate(sub, sharp, cut) {
    const s = sub.segs;
    const iB = s.findIndex((g) => g.t === 'L' && g.p0.y === BOTTOM + 1 && g.p1.y === BOTTOM + 1);
    if (iB < 0) throw new Error('plate bottom not found');
    const b = s[iB];
    if (!sharp) {
      const E = cut.E;
      let best = { d: Infinity };
      s.forEach((g, i) => { const q = nearest(g, E); if (q.d < best.d - 1e-9) best = { ...q, i }; });
      if (best.t < 1e-6) best = { ...best, i: (best.i - 1 + s.length) % s.length, t: 1 };
      if (Math.abs(best.d - 1) > 0.02) throw new Error(`plate is ${best.d.toFixed(4)} from the side's cut end`);
      const [upper] = split(s[best.i], best.t);
      const Q = upper.p1;
      const [, bottomKeep] = split(b, (b.p0.x - (NX - 1)) / (b.p0.x - b.p1.x));
      const between = [];
      for (let k = (iB + 1) % s.length; k !== best.i; k = (k + 1) % s.length) between.push(s[k]);
      const capEnd = P(E[0], NY);
      return emit([chain([
        bottomKeep, between, upper,
        arc(E, 1, Math.atan2(Q.y - E[1], Q.x - E[0]), Math.PI / 2, Q, capEnd),
        line(capEnd, P(BOX[0], NY)),
        arc([BOX[0], BOX[1]], 3, -Math.PI / 2, -Math.PI, P(BOX[0], NY), P(NX, BOX[1])),
        line(P(NX, BOX[1]), P(NX, BOTTOM)),
        arc([NX - 1, BOTTOM], 1, 0, Math.PI / 2, P(NX, BOTTOM), P(NX - 1, BOTTOM + 1)),
      ], true)]);
    }
    // sharp: the side's face from its outer corner (on the notch line) to its inner
    // corner, the bar's inner edge on down to the notch line, square notch, flush on
    // the bottom's face
    const [c1, c2] = cut.face.corners;
    const Fo = c1[0] > c2[0] ? c1 : c2, Fi = Fo === c1 ? c2 : c1;
    if (Math.abs(Fo[1] - NY) > 1e-3) throw new Error(`side face outer corner at y ${Fo[1]}`);
    if (!(Fi[1] < NY - 1e-3)) throw new Error('side face inner corner not above the notch line');
    const iS = s.findIndex((g) => g.t === 'L' && g.p1.y - g.p0.y > 5 && g.p0.x > 18);
    const g = s[iS];
    const off = Math.abs((Fo[0] - g.p0.x) * (g.p1.y - g.p0.y) - (Fo[1] - g.p0.y) * (g.p1.x - g.p0.x)) / Math.hypot(g.p1.x - g.p0.x, g.p1.y - g.p0.y);
    if (off > 2e-3) throw new Error(`plate side is ${off.toFixed(4)} off the face's outer corner`);
    const onLine = P(Fi[0] + cut.u[0] * (NY - Fi[1]) / cut.u[1], NY);
    const between = [];
    for (let k = (iB + 1) % s.length; k !== iS; k = (k + 1) % s.length) between.push(s[k]);
    cut.onLine = onLine;
    return emit([chain([
      line(P(NX, BOTTOM + 1), b.p1), between,
      // His ruling, 24 Sep 2026, on the round-3 sheet ("serious knock offs, I can't
      // approve them"): following the face to its inner corner and down the bar's
      // inner edge put a V bite in the sharp two-tone, duotone and fill. The plate is
      // the silhouette clipped straight on the notch line from the face's outer corner,
      // the heart-off law (sharp.md: a far piece is the sharp silhouette clipped
      // exactly on the cut line; short reads as a bite), as shipped bell-plus and
      // map-pin-plus do. In two-tone the grey then shows in the sliver between the
      // slanted face and the line, as it does on theirs.
      line(g.p0, P(...Fo)), line(P(...Fo), P(NX, NY)), line(P(NX, NY), P(NX, BOTTOM + 1)),
    ], true)]);
  }

  return {
    meta: { name: 'shopping-basket-plus', base: 'shopping-basket', sibling, want },
    build(root, corners, notes) {
      const sharp = corners === 'sharp';
      const L = (style) => layers(root, 'shopping-basket', style, corners);
      const st = L('stroke'), tt = L('two-tone'), du = L('duotone'), fi = L('fill');
      const sign = plus(...BOX, sharp);
      const [body, handle] = moved(st[0].d);
      const cut = cutBody(body, sharp, notes);
      const drawD = emit([cut.run, handle]);
      // one body contour in two-tone, duotone and fill: assert it, then notch it once
      const contour = tt[0].d;
      if (du[1].d !== contour || fi[1].d !== contour) throw new Error('basket body contours differ between styles');
      const plate = moved(contour).map((sub) => notchPlate(sub, sharp, cut)).join('');
      if (!sharp) {
        const pts = [];
        for (const g of cut.run.segs) for (let i = 0; i <= 200; i++) pts.push(at(g, i / 200));
        notes.push(`${seat}: body centre line to sign ink box ${Math.min(...pts.map((p) => distToBox(p, INK))).toFixed(3)} (3 = 2 painted)`);
      } else {
        notes.push(`${seat} sharp: side face corners to sign ink box ${Math.min(...cut.face.corners.map((c) => distToBox(c, INK))).toFixed(3)}, plate clipped straight on y = ${NY} from the face's outer corner`);
      }
      return {
        stroke: [withD(st[0], drawD + sign)],
        'two-tone': [withD(tt[0], plate), withD(tt[1], drawD + sign)],
        duotone: [withD(du[0], emit(moved(du[0].d))), withD(du[1], plate), strokeEl(sign, sharp)],
        fill: [withD(fi[0], emit(moved(fi[0].d)) + sign), withD(fi[1], plate)],
      };
    },
  };
}

const draft = make('flush'), other = make('escape');
export const meta = draft.meta;
export const build = draft.build;
// the escape seat, drawn in full for the sheet
export const metaAlt = other.meta;
export const buildAlt = other.build;
