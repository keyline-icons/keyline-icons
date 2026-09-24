// home-plus: the plus TOP RIGHT, where the roof slopes away, on bell-plus's seat.
//
// Probed (diag/home-*.svg):
//   bottom right, flush   box ink 14..22 by 14..22: the door's right post (x = 15,
//                         ink 14..16, floor up to y = 14) is inside it. Clearing it
//                         needs the post on x <= 11 (x <= 12 with the escape): a
//                         door redraw, ruled out.
//   top right, flush      box ink 14..22 by 2..10. The roof's right slope runs
//                         through the box, so the roof ends where its cap is 2 clear
//                         of the box: centre line x = 11, one unit LEFT of the apex
//                         (12). The gable goes. Fails.
//   top right, escape     house moved (-1, +1), box path 16..22 by 2..8 (ink 15..23
//                         by 1..9), bell-plus's seat and plus exactly, compound
//                         1..23 both ways (map-pin-plus's recentring). The roof ends
//                         on x = 12, one unit RIGHT of the apex (11): the gable
//                         keeps its peak and the right slope goes, as bell-plus
//                         loses its right shoulder. The right wall ends on y = 12,
//                         its cap on the notch line. Drawn here.
// No placement keeps any of the right slope: its lowest point (the eave) is 1.40
// under the escape box, and 3 (cap plus gap) is needed.
//
// Construction as bell-plus and bookmark-plus: notch lines x = 13 and y = 11 (2 off
// the sign's ink), r=3 fillet about the box corner (16, 8), an r=1 turn round each
// round cap; sharp takes the house stub on the slope (k from sharp-cap-cut, far
// corner on x = 13) and a butt face on y = 11 on the wall, the plate following
// each bar and square in the notch. Every style is the base's own layers, moved:
// two-tone the notched plate under the cut stroke, duotone the notched plate grey
// with the door and the plus black, fill the notched silhouette with the door
// knocked out and the plus stroked.
import { parse, emit, translate, split, solveCoord, nearest, tangent, arc, line, chain, stub, P, at } from '../lib/path.mjs';
import { layers, strokeEl, withD } from '../lib/svg.mjs';
import { plus, signInk, distToBox } from '../lib/sign.mjs';

const DX = -1, DY = 1;
const BOX = [16, 2];                         // path 16..22 by 2..8
const INK = signInk(...BOX);                 // 15..23 by 1..9
const NX = INK[0] - 2, NY = INK[3] + 2;      // notch lines x = 13, y = 11
const WALL_X = 20;                           // the right wall's centre line, moved
const want = [1, 1, 23, 23];

export const meta = { name: 'home-plus', base: 'home', sibling: 'bell-plus', want };

const moved = (d) => translate(parse(d), DX, DY);
const isRing = (sub) => sub.closed;

/** The house's stroke opened: roof ends past the apex, right wall ends under the box. */
function cutHouse(ring, sharp, notes) {
  const s = ring.segs;
  if (!sharp) {
    // (19.29,10.40) slope (12.29,4.47) | apex fillet to (9.71,4.47) | ... | wall (20,20) to (20,11.93) | eave
    if (s.length !== 10) throw new Error(`home stroke has ${s.length} segments`);
    const apex = s[1], wall = s[8];
    if (apex.t !== 'C' || wall.p0.x !== WALL_X || wall.p1.x !== WALL_X) throw new Error('home stroke moved');
    const ta = solveCoord(apex, 0, NX - 1);            // x = 12, the cap's far side on x = 13
    const [, apexKeep] = split(apex, ta);
    const tw = solveCoord(wall, 1, NY + 1);            // y = 12, the cap's far side on y = 11
    const [wallKeep] = split(wall, tw);
    const E = at(apex, ta);
    return { run: chain([apexKeep, s.slice(2, 8), wallKeep]), E };
  }
  // M20 11 L11 3.9963 L2 11 L2 22 L20 22 L20 11 Z (moved)
  if (s.length !== 5) throw new Error(`sharp home stroke has ${s.length} segments`);
  const slope = s[0], wall = s[4];
  const apexPt = slope.p1;
  const t = solveCoord(slope, 0, NX - 1);              // the regular end's grid line, x = 12
  const E = at(slope, t);
  const u = tangent(slope, t).map((v) => -v);          // down the slope, into the removed part
  const f = stub(E, u, want);
  // the wall keeps its whole run: its butt face on y = 11 is the notch line
  if (wall.p1.y !== NY) throw new Error(`sharp wall top at ${wall.p1.y}`);
  notes.push(`sharp slope stub k ${f.k.toFixed(4)}, face (${f.corners.map((c) => c.map((v) => v.toFixed(4)).join(', ')).join(') (')})`);
  return { run: chain([line(P(...f.end), apexPt), s.slice(1, 4), wall]), E, u, face: f };
}

/** A regular plate notched round the two caps. Works on each style's own contour. */
function notchRegular(ring, E) {
  const s = ring.segs;
  let best = { d: Infinity };
  s.forEach((g, i) => { const q = nearest(g, E); if (q.d < best.d) best = { ...q, i }; });
  if (Math.abs(best.d - 1) > 0.02) throw new Error(`plate is ${best.d.toFixed(4)} from the roof's cut end`);
  const iW = s.findIndex((g) => g.t === 'L' && Math.abs(g.p0.x - (WALL_X + 1)) < 1e-9 && Math.abs(g.p1.x - (WALL_X + 1)) < 1e-9 && Math.min(g.p0.y, g.p1.y) < NY + 1 && Math.max(g.p0.y, g.p1.y) > NY + 1);
  if (iW < 0) throw new Error('no plate wall on x = 21 across y = 12');
  const [upper] = split(s[best.i], best.t);
  const Q = upper.p1;
  const w = s[iW];
  const [, wallKeep] = split(w, (NY + 1 - w.p0.y) / (w.p1.y - w.p0.y));
  const between = [];
  for (let k = (iW + 1) % s.length; k !== best.i; k = (k + 1) % s.length) between.push(s[k]);
  const capEnd = P(NX, E[1]);
  return emit([chain([
    wallKeep, between, upper,
    arc(E, 1, Math.atan2(Q.y - E[1], Q.x - E[0]), 0, Q, capEnd),
    line(capEnd, P(NX, BOX[1] + 6)),
    arc([BOX[0], BOX[1] + 6], 3, Math.PI, Math.PI / 2, P(NX, BOX[1] + 6), P(BOX[0], NY)),
    line(P(BOX[0], NY), P(WALL_X, NY)),
    arc([WALL_X, NY + 1], 1, -Math.PI / 2, 0, P(WALL_X, NY), P(WALL_X + 1, NY + 1)),
  ], true)]);
}

/** A sharp plate notched: clipped straight on x = 13 from the slope face's outer corner, square notch, flush on the wall's face. */
function notchSharp(ring, cut) {
  const s = ring.segs;
  const [c1, c2] = cut.face.corners;
  const Fo = c1[0] > c2[0] ? c1 : c2, Fi = Fo === c1 ? c2 : c1;   // outer corner up and right, on x = 13
  if (Math.abs(Fo[0] - NX) > 1e-3) throw new Error(`slope face outer corner at x ${Fo[0]}`);
  // the slope run: a straight segment heading down-right across x = 13 above the notch
  const iS = s.findIndex((g) => g.t === 'L' && g.p1.x > g.p0.x && g.p1.y > g.p0.y && g.p0.x < NX && g.p1.x > NX && g.p0.y < BOX[1] + 6);
  const iW = s.findIndex((g) => g.t === 'L' && Math.abs(g.p0.x - (WALL_X + 1)) < 0.01 && Math.abs(g.p1.x - (WALL_X + 1)) < 0.01 && g.p1.y - g.p0.y > 5);
  if (iS < 0 || iW < 0) throw new Error('sharp plate: slope or wall not found');
  // each style spells its slope its own way (the fill's runs 0.0095 high at x = 13,
  // the duotone's is written to two decimals): the plate runs from its own slope's
  // start to the stroke's outer corner, so the notch stays on x = 13 in every style
  const g = s[iS], d = [g.p1.x - g.p0.x, g.p1.y - g.p0.y];
  const off = Math.abs((Fo[0] - g.p0.x) * d[1] - (Fo[1] - g.p0.y) * d[0]) / Math.hypot(...d);
  if (off > 0.01) throw new Error(`plate slope is ${off.toFixed(4)} off the face's outer corner`);
  const onSlope = P(...Fo);
  // the bar's inner edge, carried on to the notch line x = 13
  const u = cut.u, tI = (NX - Fi[0]) / u[0];
  const onNotch = P(NX, Fi[1] + u[1] * tI);
  const between = [];
  for (let k = (iW + 1) % s.length; k !== iS; k = (k + 1) % s.length) between.push(s[k]);
  return {
    d: emit([chain([
      line(P(WALL_X + 1, NY), s[iW].p1), between,
      // His ruling, 24 Sep 2026, on the round-3 sheet ("serious knock offs, I can't
      // approve them"): following the face to its inner corner and down the bar's
      // inner edge put a V bite in the sharp two-tone, duotone and fill. The plate is
      // the silhouette clipped straight on the notch line from the face's outer corner,
      // the heart-off law (sharp.md: a far piece is the sharp silhouette clipped
      // exactly on the cut line; short reads as a bite), as shipped bell-plus and
      // map-pin-plus do. In two-tone the grey then shows in the sliver between the
      // slanted face and the line, as it does on theirs.
      line(g.p0, onSlope), line(onSlope, P(NX, NY)), line(P(NX, NY), P(WALL_X + 1, NY)),
    ], true)]),
    onNotch,
  };
}

export function build(root, corners, notes) {
  const sharp = corners === 'sharp';
  const L = (style) => layers(root, 'home', style, corners);
  const st = L('stroke'), tt = L('two-tone'), du = L('duotone'), fi = L('fill');
  const sign = plus(...BOX, sharp);

  const [ring, door] = moved(st[0].d);
  const cut = cutHouse(ring, sharp, notes);
  const houseD = emit([cut.run, door]);
  if (!sharp) {
    const pts = [];
    for (const g of cut.run.segs) for (let i = 0; i <= 200; i++) pts.push(at(g, i / 200));
    notes.push(`regular: house centre line to sign ink box ${Math.min(...pts.map((p) => distToBox(p, INK))).toFixed(3)} (3 = 2 painted); roof ends (${cut.E.map((v) => v.toFixed(4)).join(', ')}), apex at x = 11`);
  } else {
    notes.push(`sharp: slope face corners to sign ink box ${Math.min(...cut.face.corners.map((c) => distToBox(c, INK))).toFixed(3)}`);
  }

  const notch = (d) => {
    const subs = moved(d);
    return subs.map((sub) => (isRing(sub) ? { raw: sharp ? notchSharp(sub, cut).d : notchRegular(sub, cut.E) } : { raw: emit([sub]) })).map((x) => x.raw).join('');
  };
  if (sharp) notes.push('sharp plate: clipped straight on x = 13 from the slope face\'s outer corner, square notch at (13, 11)');

  const duDoor = emit(moved(du[1].d));
  return {
    stroke: [withD(st[0], houseD + sign)],
    'two-tone': [withD(tt[0], notch(tt[0].d)), withD(tt[1], houseD + sign)],
    duotone: [withD(du[0], notch(du[0].d)), withD(du[1], duDoor + sign)],
    fill: [withD(fi[0], notch(fi[0].d)), strokeEl(sign, sharp)],
  };
}
