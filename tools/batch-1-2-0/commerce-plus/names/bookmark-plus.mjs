// bookmark-plus: the plus flush in the bookmark's TOP-RIGHT ink corner.
//
// Probed both right corners (compounds.md: put the sign where the object has
// nothing, probing the identifying feature, not the silhouette):
//   bottom right  box ink 13..21 by 15..23; the notch's apex (12, 18.6) is 1.0
//                 from the box's left edge on the centre line, so the cut takes
//                 the apex and the whole right arm of the notch (left arm cut on
//                 x = 10 at y 19.48). The notched tail is what says bookmark.
//   top right     box ink 13..21 by 1..9; only the plain r=3 corner is in the
//                 way. The top wall stops on x = 10, the right wall on y = 12.
// So top right, as bell-* seats its sign above a feature at the bottom.
//
// Construction: folder-plus's (a one-shape base: two-tone is the notched plate
// under the cut stroke, duotone the notched silhouette grey with the sign black,
// fill the notched silhouette solid with the sign stroked), the notch being
// corner.mjs's mirrored to the top (notch lines on the cut caps' far sides,
// x = 11 and y = 11, fillet r=3 about the box corner (14, 8), a quarter turn
// round each cap); sharp runs flush along the butt faces, tablet-plus's.
import { parse, emit, split, arc, line, chain, P } from '../lib/path.mjs';
import { layers, strokeEl, plateEl, solidEl } from '../lib/svg.mjs';
import { plus, signInk } from '../lib/sign.mjs';

const BOX = [14, 2];                         // path 14..20 by 2..8
const INK = signInk(...BOX);                 // 13..21 by 1..9
const NX = INK[0] - 2, NY = INK[3] + 2;      // notch lines x = 11, y = 11
const CUT_X = NX - 1, CUT_Y = NY + 1;        // stroke ends on x = 10 (top wall), y = 12 (right wall)

export const meta = { name: 'bookmark-plus', base: 'bookmark', sibling: 'folder-plus', want: [3, 1, 21, 23] };

export function build(root, corners, notes) {
  const sharp = corners === 'sharp';
  const base = (style) => layers(root, 'bookmark', style, corners);
  const [sub] = parse(base('stroke')[0].d);
  const s = sub.segs;
  let run;
  if (!sharp) {
    // M4 5 C.. 7 2 | L17 2 | C.. 20 5 | L20 20.9983 | tail .. | Z back to (4, 5)
    const top = s[1], wall = s[3];
    if (top.p0.y !== 2 || top.p1.y !== 2 || wall.p0.x !== 20) throw new Error('bookmark stroke moved');
    const [topKeep] = split(top, (CUT_X - top.p0.x) / (top.p1.x - top.p0.x));
    const [, wallKeep] = split(wall, (CUT_Y - wall.p0.y) / (wall.p1.y - wall.p0.y));
    run = chain([wallKeep, s.slice(4), s[0], topKeep]);
  } else {
    // M4 2 L20 2 L20 22 L12 18.4223 L4 22 L4 2 Z: butt ends pushed a unit, faces on the notch lines
    const top = s[0], wall = s[1];
    run = chain([line(P(20, CUT_Y - 1), wall.p1), s.slice(2), line(top.p0, P(CUT_X + 1, 2))]);
  }
  const bookmarkD = emit([run]);

  // the plate: the shipped two-tone plate with the notch cut into it
  const [pl] = parse(base('two-tone')[0].d);
  const q = pl.segs;
  let plate;
  if (!sharp) {
    // M3 5 C.. 7 1 | L17 1 | C.. 21 5 | L21 20.9983 | ...
    const ring = chain([
      q[0], line(q[1].p0, P(CUT_X, 1)),
      arc([CUT_X, 2], 1, -Math.PI / 2, 0, P(CUT_X, 1), P(NX, 2)),
      line(P(NX, 2), P(NX, BOX[1] + 6)),
      arc([BOX[0], BOX[1] + 6], 3, Math.PI, Math.PI / 2, P(NX, BOX[1] + 6), P(BOX[0], NY)),
      line(P(BOX[0], NY), P(20, NY)),
      arc([20, CUT_Y], 1, -Math.PI / 2, 0, P(20, NY), P(21, CUT_Y)),
      line(P(21, CUT_Y), q[3].p1),
      q.slice(4),
    ], true);
    plate = emit([ring]);
  } else {
    // M4 1 L20 1 C.. 21 2 L21 22 ...: square notch, flush on both faces
    const ring = chain([
      line(q[0].p0, P(NX, 1)), line(P(NX, 1), P(NX, NY)), line(P(NX, NY), P(21, NY)), line(P(21, NY), q[2].p1),
      q.slice(3),
    ], true);
    plate = emit([ring]);
  }
  const sign = plus(...BOX, sharp);
  return {
    stroke: [strokeEl(bookmarkD + sign, sharp)],
    'two-tone': [plateEl(plate), strokeEl(bookmarkD + sign, sharp)],
    duotone: [plateEl(plate), strokeEl(sign, sharp)],
    fill: [solidEl(plate), strokeEl(sign, sharp)],
  };
}
