// shopping-cart-plus: the plus flush in the cart's top-right ink corner, the
// basket opened there as shopping-cart-sparkles opens it.
//
// Probed: bottom right is the rear wheel (bead r=1.5 at (17, 20.5), ink 15.5..18.5
// by 19..22), which a box at ink 15..23 by 14..22 swallows; a cart without a
// wheel is not whole. Top right holds only the basket's corner: shopping-cart-
// sparkles already opens the basket there (lead star 15..23 by 2..10), so the
// cart tolerates it. Box path 16..22 by 3..9, ink 15..23 by 2..10, flush on the
// cart's ink right (23) and top (2, the rail).
//
// Cut: the basket's top edge ends on x = 12 (cap to 13, 2 short of the box) and
// its right side on y = 13 (cap to 12, 2 under the box), the sparkles' own cut
// end (19.8831, 13). Plate: tablet-plus's notch mirrored to the top, notch lines
// x = 13 and y = 12 on the caps' far sides, fillet r=3 about (16, 9), a turn round
// each cap. Duotone and fill keep the base's split: basket a plate (grey in
// duotone, solid in fill), rail and wheels black, the sign black on top.
import { parse, emit, split, solveCoord, at, tangent, arc, line, chain, stub, P } from '../lib/path.mjs';
import { layers, strokeEl, plateEl, withD } from '../lib/svg.mjs';
import { plus, signInk } from '../lib/sign.mjs';

const BOX = [16, 3];
const INK = signInk(...BOX);                 // 15..23 by 2..10
const NX = INK[0] - 2, NY = INK[3] + 2;      // 13, 12
const want = [1, 2, 23, 22];

export const meta = { name: 'shopping-cart-plus', base: 'shopping-cart', sibling: 'tablet-plus', want };

export function build(root, corners, notes) {
  const sharp = corners === 'sharp';
  const L = (style) => layers(root, 'shopping-cart', style, corners);
  const [rail, basket] = parse(L('stroke')[0].d);
  // basket: M5 7 | top edge to the corner | corner | right side down | ... | back to (5, 7)
  const b = basket.segs;
  const top = b[0];
  const side = sharp ? b[1] : b[2];             // the slanted right side
  const tSide = solveCoord(side, 1, NY + 1);    // y = 13
  const [, sideKeep] = split(side, tSide);
  const E = at(side, tSide);
  const tTop = solveCoord(top, 0, NX - 1);      // x = 12
  const [topKeep] = split(top, tTop);
  let runSegs = [sideKeep, b.slice(sharp ? 2 : 3), topKeep];
  let face = null;
  if (sharp) {
    // free ends: the side's stub runs on up its own line (a straight run carries on
    // as one segment), the top edge's butt face goes a unit out onto x = 13
    const u = tangent(side, tSide).map((v) => -v);  // into the removed corner
    face = stub(E, u, want);
    runSegs = [line(P(...face.end), sideKeep.p1), b.slice(2), line(top.p0, P(NX, 7))];
    notes.push(`sharp side stub k ${face.k.toFixed(4)}, face corners ${face.corners.map((c) => `(${c[0].toFixed(4)}, ${c[1].toFixed(4)})`).join(' ')}`);
  }
  const run = chain(runSegs);
  const cartD = emit([{ segs: rail.segs, closed: false }, run]);
  const sign = plus(...BOX, sharp);

  // the basket plate, notched
  const [pl] = parse(L('two-tone')[0].d);
  const q = pl.segs;
  let plate;
  if (!sharp) {
    // M4.02986 7.24254 C.. 5 6 | H20.9978 | C.. 22.8273 8.80787 | L20.178 14.8079 | ...
    const n = [-(tangent(side, tSide)[1]), tangent(side, tSide)[0]];   // side runs down-left: normal points right
    const out = n[0] > 0 ? n : n.map((v) => -v);
    const Q = P(E[0] + out[0], E[1] + out[1]);
    // Q must lie on the plate's own side, (22.8273, 8.80787) to (20.178, 14.8079)
    const s3 = q[3];
    const cross = (s3.p1.x - s3.p0.x) * (Q.y - s3.p0.y) - (s3.p1.y - s3.p0.y) * (Q.x - s3.p0.x);
    if (Math.abs(cross) / Math.hypot(s3.p1.x - s3.p0.x, s3.p1.y - s3.p0.y) > 2e-3) throw new Error('plate side is not the offset of the stroke side');
    const ring = chain([
      q[0], line(q[1].p0, P(NX - 1, 6)),
      arc([NX - 1, 7], 1, -Math.PI / 2, 0, P(NX - 1, 6), P(NX, 7)),
      line(P(NX, 7), P(NX, BOX[1] + 6)),
      arc([BOX[0], BOX[1] + 6], 3, Math.PI, Math.PI / 2, P(NX, BOX[1] + 6), P(BOX[0], NY)),
      line(P(BOX[0], NY), P(E[0], NY)),
      arc(E, 1, -Math.PI / 2, Math.atan2(out[1], out[0]), P(E[0], NY), Q),
      line(Q, s3.p1),
      q.slice(4),
    ], true);
    plate = emit([ring]);
  } else {
    // square notch, flush on both faces
    const [c1, c2] = face.corners;
    const outer = c1[0] > c2[0] ? c1 : c2, inner = outer === c1 ? c2 : c1;
    if (Math.abs(inner[1] - NY) > 1e-3) throw new Error(`side face inner corner at y ${inner[1]}`);
    // M5 6 | L21.9989 6 | C.. 22.9353 7.351 | L19.9363 15.351 | ...: the face's outer corner is on that side
    const s2 = q[2];
    const cross = (s2.p1.x - s2.p0.x) * (outer[1] - s2.p0.y) - (s2.p1.y - s2.p0.y) * (outer[0] - s2.p0.x);
    if (Math.abs(cross) / Math.hypot(s2.p1.x - s2.p0.x, s2.p1.y - s2.p0.y) > 2e-3) throw new Error('sharp plate side is not the offset of the stroke side');
    // His ruling, 24 Sep 2026 ("fix these knock offs too", on the round-3 cart):
    // running out along the side's butt face from its inner corner left an angled
    // beak at the notch in sharp two-tone, duotone and fill. The plate is the
    // silhouette clipped straight on y = NY, on to where the plate's own side
    // crosses the line, then down that side (sharp.md, the corner-sign clip). The
    // face's outer corner sits below the line, so two-tone shows a sliver of grey
    // past the face, as heart-plus, home-plus and bell-plus do.
    const tX = (NY - s2.p0.y) / (s2.p1.y - s2.p0.y);
    const X = P(s2.p0.x + (s2.p1.x - s2.p0.x) * tX, NY);
    if (!(tX > 0 && tX < 1) || !(X.x > outer[0])) throw new Error(`cart plate side meets y = ${NY} at ${X.x}`);
    const ring = chain([
      line(q[0].p0, P(NX, 6)), line(P(NX, 6), P(NX, NY)), line(P(NX, NY), X), line(X, s2.p1),
      q.slice(3),
    ], true);
    plate = emit([ring]);
  }

  const wheels = L('stroke')[1];
  // each style keeps its own shipped rail: sharp fill runs it on into the solid (5.1893, 7.7575)
  const du = L('duotone'), fi = L('fill');
  return {
    stroke: [strokeEl(cartD + sign, sharp), wheels.tag],
    'two-tone': [plateEl(plate), strokeEl(cartD + sign, sharp), wheels.tag],
    duotone: [withD(du[0], plate), strokeEl(du[1].d + sign, sharp), du[2].tag],
    fill: [withD(fi[0], plate), strokeEl(fi[1].d + sign, sharp), fi[2].tag],
  };
}
