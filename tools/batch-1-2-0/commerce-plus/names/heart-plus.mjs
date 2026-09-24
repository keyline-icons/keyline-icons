// heart-plus: the heart cut as heart-sparkles cuts it, the plus flush in its ink corner.
//
// Sibling: map-pin-plus (a tapering body whose tapering side is dropped, the tip
// left as the end of the other side, the plate notched on x and y and turned
// round both caps). Its escape (pin one left, sign outside the ink corner) is not
// needed here: compounds.md's inequality for a tapering body is `R >= 10` for
// half-width R with the tip on x = 12, and the heart's R is 11, so the box flush
// in the heart's ink corner (ink 15..23 by 14..22) clears the tip by exactly 2.
// The cut is heart-sparkles' own: the right side ends on y = 11 (its cap's far
// side 2 above the box) and the whole lower right side goes, the tip staying as
// the left side's end.
import { parse, emit, split, solveCoord, nearest, tangent, arc, line, chain, reverse, stub, P, at } from '../lib/path.mjs';
import { layers, strokeEl, plateEl, solidEl } from '../lib/svg.mjs';
import { plus, signInk, distToBox } from '../lib/sign.mjs';

const BOX = [16, 15];                       // sign box path 16..22 by 15..21
const INK = signInk(...BOX);                // 15..23 by 14..22
const NOTCH = { x: INK[0] - 2, y: INK[1] - 2 }; // 13, 12: the cut caps' far sides
const BASE_INK = [1, 2, 23, 22];

export const meta = {
  name: 'heart-plus', base: 'heart', sibling: 'map-pin-plus',
  box: `sign box path ${BOX[0]}..${BOX[0] + 6} by ${BOX[1]}..${BOX[1] + 6}, ink ${INK.join(',')}`,
  want: BASE_INK,
};

/** The heart's stroke cut open: right side ends on y = 11, the lower right side goes. */
function cutRun(d, sharp, notes) {
  const [sub] = parse(d);
  const s = sub.segs;
  if (s.length !== 6) throw new Error(`heart stroke has ${s.length} segments`);
  const last = s[5];                        // (22, 8.75) down to the tip (12, 21)
  const yCut = NOTCH.y - 1;                 // 11: its cap's far side on the notch line
  const t = solveCoord(last, 1, yCut);
  const [keep] = split(last, t);
  const E = at(last, t);
  // walk from the cut end over the right lobe and down the left side to the tip
  let segs = [...reverse([keep]), ...reverse(s.slice(0, 5))];
  const tip = [segs.at(-1).p1.x, segs.at(-1).p1.y];
  if (Math.hypot(tip[0] - 12, tip[1] - 21) > 1e-9) throw new Error('tip moved');
  if (sharp) {
    // free ends take the house stub, clamped to the rounded box
    const uCut = tangent(last, t);          // travel direction into the removed part
    const a = stub(E, uCut, BASE_INK);
    const uTip = tangent(segs.at(-1), 1);
    const b = stub(tip, uTip, BASE_INK);
    segs = [line(a.end, segs[0].p0), ...segs, line(segs.at(-1).p1, b.end)];
    notes.push(`sharp stubs: cut end k ${a.k.toFixed(4)}${a.clamped ? ' (box)' : ''}, tip k ${b.k.toFixed(4)}${b.clamped ? ' (clamped to the rounded box, 0.4611 unclamped)' : ''}`);
    return { run: chain([segs]), E, tip, faces: { cut: a.corners, tip: b.corners }, uCut };
  }
  return { run: chain([segs]), E, tip };
}

/** The regular plate notched: round the cut cap, along y = 12, r=3 fillet, down x = 13, round the tip. */
function notchRegular(plateD, E, tip) {
  const [sub] = parse(plateD);
  const s = sub.segs;
  // s[1] runs (23, 8.75) to (19.42, 15.99); the point 1.000 from the cut end is on it
  const q = nearest(s[1], E);
  if (Math.abs(q.d - 1) > 0.02) throw new Error(`plate is ${q.d.toFixed(4)} from the cut end`);
  const [upper] = split(s[1], q.t);
  const Q = upper.p1;
  const aQ = Math.atan2(Q.y - E[1], Q.x - E[0]);
  const capBottom = P(E[0], E[1] + 1);
  // s[5] ends on the left side's offset at the tip, (11.3506, 21.7607)
  const L = s[5].p1;
  const aL = Math.atan2(L.y - tip[1], L.x - tip[0]);
  const ring = chain([
    s[0], upper,
    arc(E, 1, aQ, Math.PI / 2, Q, capBottom),
    line(capBottom, P(BOX[0], NOTCH.y)),
    arc([BOX[0], BOX[1]], 3, -Math.PI / 2, -Math.PI, P(BOX[0], NOTCH.y), P(NOTCH.x, BOX[1])),
    line(P(NOTCH.x, BOX[1]), P(NOTCH.x, tip[1])),
    arc(tip, 1, 0, aL, P(NOTCH.x, tip[1]), L),
    s.slice(6),
  ], true);
  return emit([ring]);
}

/** The sharp plate notched: clipped straight on the notch lines, square notch corner. */
function notchSharp(plateD, faces, E, uCut, notes) {
  const [sub] = parse(plateD);
  const s = sub.segs;                        // s[0] starts on the left side's offset at the tip
  // the cut face's outer corner lies on the right side's offset, s[5]
  const [o1, o2] = faces.cut;
  const O = o1[0] > o2[0] ? o1 : o2;
  // the stroke's outer edge is the curve's offset down to the cut, then the
  // straight stub's edge from there to O: split the plate where it passes the
  // cut end's normal point and run straight on to the face
  const along = (O[0] - E[0]) * uCut[0] + (O[1] - E[1]) * uCut[1];
  const N = [O[0] - uCut[0] * along, O[1] - uCut[1] * along];   // E + normal
  const q = nearest(s[5], N);
  if (q.d > 0.02) throw new Error(`sharp plate is ${q.d.toFixed(4)} off the cut end's normal point`);
  const [upper0] = split(s[5], q.t);
  const upper = { ...upper0, p1: P(N[0], N[1]), c2: P(upper0.c2.x + N[0] - upper0.p1.x, upper0.c2.y + N[1] - upper0.p1.y) };
  // The stub tilts, so its outer corner lands on the notch line and its inner
  // corner above it. His ruling, 24 Sep 2026, on the round-3 sheet ("serious knock offs, I can't
  // approve them"): following the face to its inner corner and down the bar's
  // inner edge put a V bite in the sharp two-tone, duotone and fill. The plate is
  // the silhouette clipped straight on the notch line from the face's outer corner,
  // the heart-off law (sharp.md: a far piece is the sharp silhouette clipped
  // exactly on the cut line; short reads as a bite), as shipped bell-plus and
  // map-pin-plus do. In two-tone the grey then shows in the sliver between the
  // slanted face and the line, as it does on theirs.
  if (Math.abs(O[1] - NOTCH.y) > 1e-3) throw new Error(`cut face outer corner at y ${O[1]}`);
  notes.push(`sharp plate clipped on y = ${NOTCH.y} from the cut face's outer corner (${O.map((v) => v.toFixed(4)).join(', ')})`);
  // tip face: where its line meets x = 13, and its outer corner
  const [t1, t2] = faces.tip;
  const inner = t1[0] > t2[0] ? t1 : t2, outer = inner === t1 ? t2 : t1;
  const k = (NOTCH.x - inner[0]) / (outer[0] - inner[0]);
  const onNotch = P(NOTCH.x, inner[1] + (outer[1] - inner[1]) * k);
  const ring = chain([
    s.slice(0, 5), upper,
    line(upper.p1, P(O[0], O[1])),
    line(P(O[0], O[1]), P(NOTCH.x, NOTCH.y)),
    line(P(NOTCH.x, NOTCH.y), onNotch),
    line(onNotch, P(outer[0], outer[1])),
    line(P(outer[0], outer[1]), s[0].p0),
  ], true);
  return emit([ring]);
}

export function build(root, corners, notes) {
  const sharp = corners === 'sharp';
  const base = (style) => layers(root, 'heart', style, corners);
  const strokeD = base('stroke')[0].d;
  const plateD = base('two-tone')[0].d;
  const cut = cutRun(strokeD, sharp, notes);
  const sign = plus(...BOX, sharp);
  const heartD = emit([cut.run]);
  const plate = sharp ? notchSharp(plateD, cut.faces, cut.E, cut.uCut, notes) : notchRegular(plateD, cut.E, cut.tip);
  // clearance: the heart's centre line against the sign's painted box
  if (!sharp) {
    const pts = [];
    for (const g of cut.run.segs) for (let i = 0; i <= 200; i++) pts.push(at(g, i / 200));
    notes.push(`regular: heart centre line to sign ink box ${Math.min(...pts.map((p) => distToBox(p, INK))).toFixed(3)} (3 = 2 painted)`);
  } else {
    // a butt end paints to its face: measure the face corners, not the centre line
    const d = (cs) => Math.min(...cs.map((c) => distToBox(c, INK))).toFixed(3);
    notes.push(`sharp: face corners to sign ink box, cut ${d(cut.faces.cut)}, tip ${d(cut.faces.tip)}`);
  }
  return {
    stroke: [strokeEl(heartD + sign, sharp)],
    'two-tone': [plateEl(plate), strokeEl(heartD + sign, sharp)],
    // heart's duotone is the stroke drawing (a one-shape icon); a compound on it is
    // folder-plus's: the notched silhouette grey, the modifier black
    duotone: [plateEl(plate), strokeEl(sign, sharp)],
    fill: [solidEl(plate), strokeEl(sign, sharp)],
  };
}
