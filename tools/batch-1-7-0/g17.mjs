// The 1.7.0 batch (5 Oct 2026): the drawings the other set's names and shadcn/ui's own source
// asked for that the set did not draw. STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill },
// each a list of layers { kind: stroke | muted | solid | plate, d }.
//
// Most are compounds on shipped drawings and read those drawings' raw files, so a compound
// always carries its base exactly: log-in is bracket-arrow-left with the arrow turned to enter,
// a-arrow-up, a-arrow-down and spell-check are case-upper with its small A swapped, the two
// circle-progress signs are circle-progress-check's ring with circle-dashed-plus's plus and
// circle arrow-up's arrow, heart-pulse is heart with activity at half scale, battery-charging is
// battery-full's body with the zap sign laid along it. The rest are drawn here.
import * as L from '../batch-1-4-0/lib.mjs';
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import * as X from '../batch-1-5-0/lib15.mjs';

const { rawLayers, mapPts, P, assert } = X;
const { Ls, As, polyLA, dLA, toGeo, offsetLA, verifyOffset, bandAny } = A;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
const C = (s) => (s ? 'sharp' : 'regular');
const E = (shape) => B.emitShape(shape);
const geo = (segs) => [toGeo(segs)];
const grow = (segs) => { const o = offsetLA(segs, 1); verifyOffset(segs, o, 1); return o; };
const band = (segs, sharp) => geo(bandAny(segs, sharp ? 'butt' : 'round'));
const layer = (name, style, sharp, kind, n = 0) => {
  const l = rawLayers(name, style, C(sharp)).filter((x) => x.kind === kind)[n];
  assert(l, `${name} ${style} ${C(sharp)} has no ${kind} layer ${n}`);
  return l.d;
};
/** Every variant the stroke drawing: a mark, or a glyph of one element (his ruling on `command`). */
const allStroke = (d, extra = []) => ({ stroke: [S(d), ...extra], 'two-tone': [S(d), ...extra], duotone: [S(d), ...extra], fill: [S(d), ...extra] });
const dot = (c, r) => L.circle(c, r);
/** Sharp's free end: a straight stub along the run, 1 on an axis, (1 - sin t) / cos t off it. */
const k45 = (t) => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); };
function stub(p0, p1, sharp, which = 'both') {
  if (!sharp) return [p0, p1];
  const t = L.unit(L.sub(p1, p0)), k = k45(t);
  return [which === 'end' ? p0 : L.sub(p0, L.mul(t, k)), which === 'start' ? p1 : L.add(p1, L.mul(t, k))];
}
const polyline = (pts) => 'M' + pts.map(P).join('L');
/** An open polyline whose free ends take sharp's stub; `ends` names which are free. */
function openRun(pts, sharp, ends = 'both') {
  const q = pts.map((p) => [...p]);
  if (sharp && ends !== 'none') {
    if (ends !== 'end') q[0] = stub(q[0], q[1], true, 'start')[0];
    if (ends !== 'start') q[q.length - 1] = stub(q.at(-2), q.at(-1), true, 'end')[1];
  }
  return polyline(q);
}

/* ---------------------------------------------------------------------- log-in */
// bracket-arrow-left's bracket and arrow, the arrow turned end for end so it enters: mirrored
// about x = 7.44535, which sends the apex's extreme (2) onto the bracket's mouth (12.8907) and the
// shaft's end there back onto 2. The ink box is bracket-arrow-left's, 1..23 by 3..21, and the arms
// clear the bracket's caps by 3.74. Their log-out is our bracket-arrow-right; this is its pair.
function logIn(sharp) {
  const bracket = layer('bracket-arrow-left', 'two-tone', sharp, 'muted');
  const arrow = mapPts(layer('bracket-arrow-left', 'two-tone', sharp, 'stroke'), ([x, y]) => [14.8907 - x, y]);
  return { stroke: [S(bracket + arrow)], 'two-tone': [M(bracket), S(arrow)], duotone: [M(bracket), S(arrow)], fill: [S(bracket + arrow)] };
}

/* ---------------------------------------------------- a-arrow-up, a-arrow-down */
// case-upper with its small A swapped for an arrow in the same 6 x 10 column (path 16..22 by
// 9..19): the 6-box sign arrow's head (45 degree arms, 3 deep) on a shaft the small A's height,
// so the ink box is case-upper's exactly. Big A grey, arrow black, as case-upper's split.
// Sharp: the shaft's free end on a unit, the arms 0.4142 along their diagonals; the shaft's
// other end is buried in the apex.
function aArrow(sharp, up) {
  const bigA = layer('case-upper', 'two-tone', sharp, 'muted');
  const a = 0.4142 / Math.SQRT2;                                  // 0.2929 along each axis
  const arrow = up
    ? `M${P([19, sharp ? 20 : 19])}L19 9M${P([16 - (sharp ? a : 0), 12 + (sharp ? a : 0)])}L19 9L${P([22 + (sharp ? a : 0), 12 + (sharp ? a : 0)])}`
    : `M${P([19, sharp ? 8 : 9])}L19 19M${P([16 - (sharp ? a : 0), 16 - (sharp ? a : 0)])}L19 19L${P([22 + (sharp ? a : 0), 16 - (sharp ? a : 0)])}`;
  return { stroke: [S(bigA + arrow)], 'two-tone': [M(bigA), S(arrow)], duotone: [M(bigA), S(arrow)], fill: [S(bigA + arrow)] };
}

/* ----------------------------------------------------------------- spell-check */
// case-upper's big A with the house check (6 x 4, 45 degree arms) low in the small A's column:
// path 16..22 by 15..19, so the ink box is case-upper's again; the check's near end clears the
// A's foot by 2.47. A grey, check black.
function spellCheck(sharp) {
  const bigA = layer('case-upper', 'two-tone', sharp, 'muted');
  const a = sharp ? 0.4142 / Math.SQRT2 : 0;
  const check = `M${P([16 - a, 17 - a])}L18 19L${P([22 + a, 15 - a])}`;
  return { stroke: [S(bigA + check)], 'two-tone': [M(bigA), S(check)], duotone: [M(bigA), S(check)], fill: [S(bigA + check)] };
}

/* ------------------------------------------------------------------------ type */
// The plain T beside type-outline, in heading's and bold's letter: bare strokes, no serifs,
// 20 tall (2..22), the bar 18 wide. One element, so every style is the stroke (case-sensitive's
// rule for a single glyph). Sharp: the bar's ends and the stem's foot on a unit; the stem's top
// is buried in the bar.
function type(sharp) {
  const d = sharp ? 'M3 3L21 3M12 3L12 22' : 'M4 3L20 3M12 3L12 21';
  return allStroke(d);
}

/* ----------------------------------------------------------------- list-filter */
// list-minus's three rows (6, 12, 18; ink 22 x 14), each rule shortened from both ends by 4
// more than the one above: 2..22, 6..18, 10..14. Three elements apart by 4, so the two-tone and
// duotone take the one-part-grey split: the longest rule grey, the two under it black.
function listFilter(sharp) {
  const rows = [[2, 22, 6], [6, 18, 12], [10, 14, 18]].map(([x0, x1, y]) => openRun([[x0, y], [x1, y]], sharp));
  const all = rows.join('');
  return { stroke: [S(all)], 'two-tone': [M(rows[0]), S(rows[1] + rows[2])], duotone: [M(rows[0]), S(rows[1] + rows[2])], fill: [S(all)] };
}

/* ------------------------------------------------------------------- list-todo */
// Two tasks: an open box (6 x 6, r=1, path 2..8 by 4..10) and a done one (the house check,
// path 2..8 by 16..20), each with its rule from 12 to 22 on its own centre (7 and 18). Ink
// 1..23 by 3..21, 22 x 18; box and check clear their rules by 2. The rules are the list's
// scaffolding: grey in two-tone and duotone, as list-check's; the box carries a plate, solid in fill.
function listTodo(sharp) {
  const box = polyLA([[2, 4], [8, 4], [8, 10], [2, 10]], sharp ? [0, 0, 0, 0] : [1, 1, 1, 1]);
  const boxD = dLA(box);
  const a = sharp ? 0.4142 / Math.SQRT2 : 0;
  const check = `M${P([2 - a, 18 - a])}L4 20L${P([8 + a, 16 - a])}`;
  const rules = openRun([[12, 7], [22, 7]], sharp) + openRun([[12, 18], [22, 18]], sharp);
  const plate = E(geo(grow(box)));
  return {
    stroke: [S(boxD + check + rules)],
    'two-tone': [Pl(plate), M(rules), S(boxD + check)],
    duotone: [Pl(plate), M(rules), S(check)],
    fill: [F(plate), S(rules + check)],
  };
}

/* ------------------------------------------------------------------------- dot */
// One of more-horizontal's beads (r=2, the 4 of the dot ladder) on the centre. A mark: every
// style the same disc.
function dotIcon() {
  const d = dot([12, 12], 2);
  return { stroke: [F(d)], 'two-tone': [F(d)], duotone: [F(d)], fill: [F(d)] };
}

/* -------------------------------------------------------------- braces, brackets */
// Sized to parentheses: each glyph 4 wide (path 4..8, ink 3..9), 20 tall (path 2..22), the
// pair's ink 3..21 by 1..23. A brace: r=2 turns off its tails onto a column at x=6, shoulders
// r=2 into a 45 degree beak whose apex is filleted r=0.5, its vertex solved so the extreme sits
// on 4 like a parenthesis's. A bracket: corners r=2. Marks: every style the stroke.
// Sharp: fillets gone, tails a unit on, the beak's vertex on 4 (a round join paints the 3).
const openPoly = (pts, radii) => dLA(openPolyLA(pts, radii), false);
function openPolyLA(pts, radii) {
  const out = []; let cur = pts[0];
  for (let i = 1; i < pts.length - 1; i++) {
    const r = radii[i] ?? 0;
    if (r <= 1e-9) { out.push(Ls(cur, pts[i])); cur = pts[i]; continue; }
    const fl = L.fillet(pts[i - 1], pts[i], pts[i + 1], r);
    let a0 = L.deg(Math.atan2(fl.T1[1] - fl.F[1], fl.T1[0] - fl.F[0])), a1 = L.deg(Math.atan2(fl.T2[1] - fl.F[1], fl.T2[0] - fl.F[0]));
    while (a1 - a0 > 180) a1 -= 360; while (a0 - a1 > 180) a1 += 360;
    if (L.len(L.sub(fl.T1, cur)) > 1e-9) out.push(Ls(cur, fl.T1));
    out.push(As(fl.F, r, a0, a1)); cur = fl.T2;
  }
  // a fillet whose tangent lands on the end point leaves nothing to run: no zero-length piece
  if (L.len(L.sub(pts.at(-1), cur)) > 1e-9) out.push(Ls(cur, pts.at(-1)));
  return out;
}
const mirror = (d) => mapPts(d, ([x, y]) => [24 - x, y]);
function braces(sharp) {
  let left;
  if (sharp) left = polyline([[9, 2], [6, 2], [6, 10], [4, 12], [6, 14], [6, 22], [9, 22]]);
  else {
    // the apex vertex v, so the r=0.5 fillet's extreme lands on x = 4: v = 4 - (r / sin 45 - r)
    const r = 0.5, v = 4 - (r / Math.SQRT1_2 - r);
    const sh = 12 - (6 - v);                                   // shoulders on the 45 degree lines through the apex
    left = openPoly([[8, 2], [6, 2], [6, sh], [v, 12], [6, 24 - sh], [6, 22], [8, 22]], [0, 2, 2, r, 2, 2, 0]);
  }
  return allStroke(left + mirror(left));
}
function brackets(sharp) {
  const left = sharp ? 'M9 2L4 2L4 22L9 22' : openPoly([[8, 2], [4, 2], [4, 22], [8, 22]], [0, 2, 2, 0]);
  return allStroke(left + mirror(left));
}

/* ----------------------------------------------------------------------- regex */
// `.*`: terminal-asterisk's asterisk moved up and right (ink 12..22 by 2..14) over one of
// more-horizontal's beads at the bottom left (r=2 at 4,20; ink 2..6 by 18..22). Ink 2..22 square.
// A mark: every style the stroke drawing. Sharp takes the Math asterisk's cut (the vertical a unit
// on, the diagonals half a unit along themselves): terminal-asterisk's uniform half unit left the
// top 2.5 against the bead's 2, and here the asterisk sets the box on its own.
function regex(sharp) {
  const ast = sharp ? 'M17 2L17 14M12.6 11.3L21.4 4.7M12.6 4.7L21.4 11.3'
    : mapPts(layer('terminal-asterisk', 'two-tone', false, 'stroke'), ([x, y]) => [x + 9, y - 2]);
  return allStroke(ast, [F(dot([4, 20], 2))]);
}

/* ------------------------------------------------- circle-progress-plus, -arrow-up */
// circle-progress-check's ring and dashes as shipped, with circle-dashed-plus's plus or the
// circle arrow-up's arrow in place of the check; the dashes grey in two-tone and duotone.
function circleProgress(sharp, sign) {
  const ring = layer('circle-progress-check', 'two-tone', sharp, 'stroke').split('M').filter(Boolean)[0];
  const dashes = layer('circle-progress-check', 'two-tone', sharp, 'muted');
  let glyph;
  if (sign === 'plus') glyph = sharp ? 'M7 12L17 12M12 7L12 17' : 'M8 12L16 12M12 8L12 16';
  else {
    const l = rawLayers('arrow-up', 'stroke', C(sharp), 'circle');
    glyph = l.at(-1).d;
  }
  const r = 'M' + ring;
  return { stroke: [S(r + dashes + glyph)], 'two-tone': [M(dashes), S(r + glyph)], duotone: [M(dashes), S(r + glyph)], fill: [S(r + dashes + glyph)] };
}

/* ------------------------------------------------------------ locate, locate-fixed */
// A ring r=6 (ink 5..19) with four ticks on the axes from its centre line out to 2 (ink 1..23),
// and for locate-fixed target's bead (r=1.5) on the centre. Ring plates as target's: two-tone
// the disc under the whole stroke, duotone the disc grey with ticks and bead black, fill the
// disc solid with the bead cut out. Sharp: each tick's outer end a unit on; the inner end lands
// on the ring and stays.
function locate(sharp, fixed) {
  const ringSegs = [As([12, 12], 6, 0, 360)];
  const ring = dLA(ringSegs);
  const out = sharp ? 1 : 2;
  const ticks = `M12 ${out}L12 6M12 ${24 - out}L12 18M${out} 12L6 12M${24 - out} 12L18 12`;
  const disc = E(geo(grow(ringSegs)));
  const bead = fixed ? dot([12, 12], 1.5) : '';
  const beads = fixed ? [F(bead)] : [];
  const fillDisc = fixed ? E(B.subtract(B.runFromD(disc), B.runFromD(bead))) : disc;
  return {
    stroke: [S(ring + ticks), ...beads],
    'two-tone': [Pl(disc), S(ring + ticks), ...beads],
    duotone: [Pl(disc), S(ticks), ...beads],
    fill: [F(fillDisc), S(ticks)],
  };
}

/* ------------------------------------------------------------------ heart-pulse */
// heart as shipped, with activity's trace: a peak 3 up and a trough 3 down on steep outer legs
// (rise 3 in 1) and a middle leg of 2 in 1, as activity's 8/3 and 2, run out on y=11 to the heart's
// walls, where it ends on their centre line (image's ridge rule: interior detail on a fillable body
// ends on its walls). activity at half scale (trough 14,16) came within 0.6 of the narrowing heart;
// this is the largest trace on whole units that clears it by 2 (2.03 at the trough). Two-tone the heart's plate under
// the whole stroke; duotone the plate grey, the trace black; fill the heart solid with the region
// under the trace cut out, as image's fill cuts the ground under its ridge.
function heartPulse(sharp) {
  const heart = layer('heart', 'stroke', sharp, 'stroke');
  const plate = layer('heart', 'two-tone', sharp, 'plate');
  const [run] = L.parseRuns(heart);
  // the walls on y = 11, by bisection along the outline
  const hits = [];
  run.segs.forEach((s) => {
    for (let j = 0; j < 400; j++) {
      const a = L.segAt(s, j / 400), b = L.segAt(s, (j + 1) / 400);
      if ((a[1] - 11) * (b[1] - 11) <= 0 && a[1] !== b[1]) {
        const t = L.bisect((t) => L.segAt(s, t)[1] - 11, j / 400, (j + 1) / 400, 60);
        hits.push(L.segAt(s, t)[0]);
      }
    }
  });
  const xs = [...new Set(hits.map((x) => +x.toFixed(6)))].sort((a, b) => a - b);
  assert(xs.length === 2, `heart crosses y=11 ${xs.length} times`);
  const pts = [[xs[0], 11], [9, 11], [10, 8], [13, 14], [14, 11], [xs[1], 11]];
  const trace = polyline(pts);
  // clearance to the outline: 2 painted units, the joins at the walls excepted
  let worst = Infinity;
  const inner = pts.slice(1, -1);
  for (const o of L.outlines(heart, 200)) for (const q of L.outlines(polyline(inner), 200)) worst = Math.min(worst, L.minGap(o, q));
  assert(worst - 2 >= 2 - 1e-6, `heart-pulse: the trace clears the heart by ${(worst - 2).toFixed(3)}`);
  // fill: the region under the trace, bounded by the heart's inner edge and the trace's lower ink edge
  const inside = B.runFromD(heart).map((r) => B.shrink(r));
  const traceBand = B.band(B.runFromD(trace)[0], sharp ? 'butt' : 'round');
  const below = belowTrace(pts);
  const hole = B.subtract(B.intersect(inside, below), [traceBand]);
  const fill = B.subtract(B.runFromD(plate), hole);
  return {
    stroke: [S(heart + trace)],
    'two-tone': [Pl(plate), S(heart + trace)],
    duotone: [Pl(plate), S(trace)],
    fill: [F(E(fill))],
  };
}
/** The half plane under a polyline that runs left to right, closed far below the canvas. */
function belowTrace(pts) {
  const q = [[pts[0][0] - 4, pts[0][1]], ...pts, [pts.at(-1)[0] + 4, pts.at(-1)[1]]];
  return B.runFromD(`M${q.map(P).join('L')}L${P([q.at(-1)[0], 40])}L${P([q[0][0], 40])}Z`);
}

/* ------------------------------------------------------------- battery-charging */
// battery-full's body and terminal with the zap sign (database-zap's 4 x 6 bolt, 45 degree legs
// either side of a 4-unit step) in place of the bars, at two thirds and upright, the step widened
// to 3 so every point sits on a half unit: (10.5,10) (8.5,12) (11.5,12) (9.5,14), centred on the
// inside at (10, 12). Its ink 7.5..12.5 by 9..15 clears the lid and the floor by 2, as the bars
// do. Laid along the body at full size it read as an N at 16px; a full-size bolt upright needs 12
// of the inside's 10. Duotone: battery's grey body, terminal and bolt black; fill: the body solid
// with the bolt cut out, the terminal stroked. Sharp: the two free ends 0.4142 on their diagonals.
function batteryCharging(sharp) {
  const body = layer('battery', 'stroke', sharp, 'stroke');
  const plate = layer('battery', 'two-tone', sharp, 'plate');
  const term = sharp ? 'M22 8.5L22 15.5' : 'M22 9.5L22 14.5';
  const a = sharp ? 0.4142 / Math.SQRT2 : 0;
  const bolt = polyline([[10.5 + a, 10 - a], [8.5, 12], [11.5, 12], [9.5 - a, 14 + a]]);
  const boltBand = B.band(B.runFromD(bolt)[0], sharp ? 'butt' : 'round');
  return {
    stroke: [S(body + bolt)],
    'two-tone': [Pl(plate), S(body + bolt)],
    duotone: [Pl(plate), S(term + bolt)],
    fill: [F(E(B.subtract(B.runFromD(plate), [boltBand]))), S(term)],
  };
}

/* ------------------------------------------------------------------- voicemail */
// Two reels and the tape between them. Rings r=3 on (5,12) and (19,12), the tape on their bottom
// tangent from centre to centre: ink 1..23 by 8..16, the 22 a horizontal icon owes. The reels
// stand 6 apart; drawn 2 apart at r=4 (the largest pair on whole paddings) it lands on the other
// set's drawing exactly, and at r=3 2 apart it paints 18. Two-tone: the reels' discs under the
// whole stroke; duotone: discs grey, tape black; fill: discs solid, the tape stroked. Sharp: the
// rings stay round and the tape's ends are buried in them, so nothing changes.
function voicemail() {
  const rings = [[5, 12], [19, 12]].map((c) => [As(c, 3, 0, 360)]);
  const ringD = rings.map((r) => dLA(r)).join('');
  const tape = 'M5 15L19 15';
  const discs = rings.map((r) => E(geo(grow(r)))).join('');
  return {
    stroke: [S(ringD + tape)],
    'two-tone': [Pl(discs), S(ringD + tape)],
    duotone: [Pl(discs), S(tape)],
    fill: [F(discs), S(tape)],
  };
}

/* ------------------------------------------------------------------------ pill */
// A capsule on the free diagonal (bottom left to top right, as search and paperclip run): caps
// r=4 about (7,17) and (17,7), the largest that keeps the ink on 2..22, and a divider across the
// middle from wall to wall. Every curve is shape and nothing ends free, so sharp is the same
// drawing. Two-tone: the plate under the whole stroke. Duotone and fill split it at the divider
// (image's ridge rule, the region on one side cut out): the upper half black over the grey in
// duotone, solid in fill with the lower half left an outline.
const DIAG = { a: [Math.SQRT1_2, -Math.SQRT1_2], n: [Math.SQRT1_2, Math.SQRT1_2] };
const at = (c, s, t) => [c[0] + s * DIAG.a[0] + t * DIAG.n[0], c[1] + s * DIAG.a[1] + t * DIAG.n[1]];
/** The half plane u = x - y <= k (lo) or >= k, as a triangle well past the canvas; its long edge is the line u = k. */
const halfPlane = (k, lo) => B.runFromD(lo ? `M${k - 60} -60L${k + 60} 60L${k - 60} 60Z` : `M${k - 60} -60L${k + 60} 60L${k + 60} -60Z`);
function pill() {
  const R = 4, c = [12, 12], s = 5 * Math.SQRT2;
  const body = polyLA([at(c, s + R, -R), at(c, s + R, R), at(c, -s - R, R), at(c, -s - R, -R)], [R, R, R, R]);
  const divider = `M${P(at(c, 0, -R))}L${P(at(c, 0, R))}`;
  const bodyD = dLA(body);
  const plate = geo(grow(body));
  const inner = B.runFromD(bodyD).map((r) => B.shrink(r));
  const r2 = Math.SQRT2;
  const hole = B.intersect(inner, halfPlane(-r2, true));          // u = x - y <= -sqrt 2: past the divider's lower edge
  const top = B.intersect(plate, halfPlane(-r2, false));
  const v = {
    stroke: [S(bodyD + divider)],
    'two-tone': [Pl(E(plate)), S(bodyD + divider)],
    duotone: [Pl(E(plate)), F(E(top))],
    fill: [F(E(B.subtract(plate, hole)))],
  };
  return v;
}

/* --------------------------------------------------------------------- bandage */
// A plaster on the free diagonal: a band 8 wide (path) with r=3 ends, the pad marked by two lines
// across it 4 either side of the centre. Rounded: 21 long so the ink sits on 2..22. Sharp: a
// rotated drawing takes its own scale (drawing-a-new-icon.md, Padding): with the fillets gone
// each true corner paints 1 past its vertex on the diagonal, so the whole drawing shrinks about
// the centre until the corners land on the box, 0.8787. Two-tone: the plate under the stroke.
// Duotone: the pad black (the band between the lines' outer edges) over the grey. Fill: the band
// solid with the two lines cut out wall to wall.
function bandage(sharp) {
  const c = [12, 12];
  let k = 4, h = 6 * Math.SQRT2 + 6 - 4, r = 3, pad = 4;
  if (sharp) { const sc = 9 / ((h + k) / Math.SQRT2); h *= sc; k *= sc; pad *= sc; r = 0; }
  const body = polyLA([at(c, h, -k), at(c, h, k), at(c, -h, k), at(c, -h, -k)], [r, r, r, r]);
  const bodyD = dLA(body);
  const lines = [pad, -pad].map((t) => `M${P(at(c, t, -k))}L${P(at(c, t, k))}`).join('');
  const plate = geo(grow(body));
  // the inner edge as an exact offset: the free-cubic shrink folds the sharp body's 45 degree
  // square into a speck at one corner
  const inner = geo(offsetLA(body, -1));
  const r2 = Math.SQRT2, w = (pad + 1) * r2;                    // |u| <= w: the pad between the lines' outer edges
  const strip = (u0, u1) => B.runFromD(`M${u0 - 40} -40L${u0 + 40} 40L${u1 + 40} 40L${u1 - 40} -40Z`);
  const padBand = B.intersect(plate, strip(-w, w));
  const cuts = [pad, -pad].map((t) => strip(t * r2 - r2, t * r2 + r2)).map((st) => B.intersect(inner, st)).flat();
  return {
    stroke: [S(bodyD + lines)],
    'two-tone': [Pl(E(plate)), S(bodyD + lines)],
    duotone: [Pl(E(plate)), F(E(padBand))],
    fill: [F(E(B.subtract(plate, cuts)))],
  };
}

/* -------------------------------------------------------------------- notebook */
// A cover 15 wide (path 6..21, r=3) with three rings on its spine, on 7, 12 and 17, each from x=3
// to the wall's centre line at 6 (joined). Run on through the wall into the cover, the middle ring
// came within 0.88 of notebook-pen's nib, which sits where square-pen's does; a ring stopping 2
// clear of it would end half a unit past the wall as a nub. Ink 2..22 by 1..23,
// the 22 a tall object owes. Two-tone: the plate under the stroke; duotone: the cover grey, the
// rings black; fill: the cover solid with the rings stroked beside it. Sharp: square corners, each
// ring's outer end a unit on; the inner end lands on the wall and stays.
function notebook(sharp) {
  const body = polyLA([[6, 2], [21, 2], [21, 22], [6, 22]], sharp ? [0, 0, 0, 0] : [3, 3, 3, 3]);
  const bodyD = dLA(body);
  const rings = [7, 12, 17].map((y) => openRun([[3, y], [6, y]], sharp, 'start')).join('');
  const plate = E(geo(grow(body)));
  return {
    stroke: [S(bodyD + rings)],
    'two-tone': [Pl(plate), S(bodyD + rings)],
    duotone: [Pl(plate), S(rings)],
    fill: [F(plate), S(rings)],
  };
}

/* ---------------------------------------------------------------- notebook-pen */
// notebook's cover and rings with square-pen's pen where square-pen has it; the cover opens at
// its top right, cut where its centre line comes within 4 of the pen's (2 painted between), as
// square-pen's square opens. Styles as square-pen's: two-tone the pen's plate under the whole
// stroke; duotone the notebook grey (strokes at 0.4), the pen a black solid; fill the pen solid
// over the notebook's stroke.
function notebookPen(sharp) {
  const penLine = layer('square-pen', 'two-tone', sharp, 'stroke').split('M').filter(Boolean).slice(1).map((x) => 'M' + x).join('');
  const penSolid = layer('square-pen', 'duotone', sharp, 'solid');
  const penPlate = layer('square-pen', 'two-tone', sharp, 'plate');
  const body = polyLA([[6, 2], [21, 2], [21, 22], [6, 22]], sharp ? [0, 0, 0, 0] : [3, 3, 3, 3]);
  // the pen as lines and arcs is not to hand; clip against its centre line sampled densely
  // (outlines() keeps a straight run as its two ends, which put the cut 1.17 from the barrel)
  const penPts = L.parseRuns(penLine).flatMap((r) => r.segs.flatMap((sg) => Array.from({ length: 201 }, (_, i) => L.segAt(sg, i / 200))));
  const far = (p) => Math.min(...penPts.map((q) => Math.hypot(q[0] - p[0], q[1] - p[1])));
  const kept = clipBody(body, (p) => far(p) - 4);
  assert(kept.length === 1, `notebook-pen: the cover splits into ${kept.length}`);
  let open = kept[0];
  if (sharp) {
    // the two cut ends are free: a unit on along their own runs
    const f = open[0], l = open.at(-1);
    open = [{ ...f, p0: L.sub(f.p0, L.mul(L.unit(L.sub(f.p1, f.p0)), 1)) }, ...open.slice(1, -1), { ...l, p1: L.add(l.p1, L.mul(L.unit(L.sub(l.p1, l.p0)), 1)) }];
    if (open.length === 1) open = [{ ...f, p0: L.sub(f.p0, L.mul(L.unit(L.sub(f.p1, f.p0)), 1)), p1: L.add(f.p1, L.mul(L.unit(L.sub(f.p1, f.p0)), 1)) }];
  }
  const bodyD = dLA(open, false);
  const rings = [7, 12, 17].map((y) => openRun([[3, y], [6, y]], sharp, 'start')).join('');
  return {
    stroke: [S(bodyD + rings + penLine)],
    'two-tone': [Pl(penPlate), S(bodyD + rings + penLine)],
    duotone: [M(bodyD + rings), F(penSolid)],
    fill: [F(penSolid), S(bodyD + rings)],
  };
}
/** The runs of a closed LA contour where f(point) >= 0, cut at the boundary by bisection, joined round the seam. */
function clipBody(segs, f) {
  const pieces = [];
  for (const s of segs) {
    const N = 200, ts = [0];
    let prev = f(A.segAt(s, 0));
    for (let i = 1; i <= N; i++) {
      const cur = f(A.segAt(s, i / N));
      if ((prev < 0) !== (cur < 0)) ts.push(L.bisect((t) => f(A.segAt(s, t)), (i - 1) / N, i / N, 60));
      prev = cur;
    }
    ts.push(1);
    for (let k = 0; k + 1 < ts.length; k++) {
      const t0 = ts[k], t1 = ts[k + 1];
      if (t1 - t0 < 1e-9) continue;
      const part = s.type === 'L' ? Ls(A.segAt(s, t0), A.segAt(s, t1)) : As(s.c, s.r, s.a0 + (s.a1 - s.a0) * t0, s.a0 + (s.a1 - s.a0) * t1);
      pieces.push({ part, keep: f(A.segAt(s, (t0 + t1) / 2)) >= 0 });
    }
  }
  const runs = []; let cur = null;
  for (const p of pieces) { if (!p.keep) { if (cur) { runs.push(cur); cur = null; } continue; } (cur ||= []).push(p.part); }
  if (cur) runs.push(cur);
  if (runs.length > 1 && pieces[0].keep && pieces.at(-1).keep) runs[0] = [...runs.pop(), ...runs[0]];
  return runs;
}

/* ---------------------------------------------------------------------- webcam */
// A round head on a neck down to a wide foot, 18 x 22 as a tall object owes (ink 3..21 by 1..23):
// head r=7 about (12,9), lens r=3 inside it (2 clear), neck from the head to the foot, the foot
// 4..20 on y=22, which is what sets the width. The narrower foot under an r=8 head is the other
// set's drawing to the unit; this one stands on its foot. Two-tone: the head's disc under the
// stroke; duotone: the disc grey, lens, neck and foot black; fill: the disc solid with the lens
// cut out as a ring, neck and foot stroked. Sharp: the foot's ends a unit on; the neck's ends land
// on the head and the foot and stay.
function webcam(sharp) {
  const head = [As([12, 9], 7, 0, 360)], lens = [As([12, 9], 3, 0, 360)];
  const headD = dLA(head), lensD = dLA(lens);
  const stand = 'M12 16L12 22' + openRun([[4, 22], [20, 22]], sharp);
  const disc = geo(grow(head));
  const ring = B.subtract(geo(grow(lens)), geo(offsetLA(lens, -1)));
  return {
    stroke: [S(headD + lensD + stand)],
    'two-tone': [Pl(E(disc)), S(headD + lensD + stand)],
    duotone: [Pl(E(disc)), S(lensD + stand)],
    fill: [F(E(B.subtract(disc, ring))), S(stand)],
  };
}

/* ------------------------------------------------------------------- image-off */
// image with the house slash (his rule: an -off is its original at the same size), star-off's
// and save-off's recipe: the near side runs into the slash and stops on its centre line, the far
// side stands off at u = 4 sqrt 2 (sharp: the butt face's nearer corner on 4 sqrt 2 - 2). The sun
// goes: its bead sits on u = 0.5, inside the cut, and what the near side keeps of it is a sliver.
// Plates: the near one cut on u = 0, the far one notched on 3 sqrt 2 with an r=1 turn about each
// far stroke end (sharp: clipped straight). Two-tone: the plates grey under the near strokes and
// the slash. Duotone: the plates grey, the near ridge cut out of the near one, the slash black.
// Fill: as image's, the ground under the ridge cut out, on the near side; the far piece solid.
function imageOff(sharp) {
  const c = C(sharp);
  const line = rawLayers('image', 'stroke', c).find((l) => l.kind === 'stroke').d;
  const plateD = rawLayers('image', 'two-tone', c).find((l) => l.kind === 'plate').d;
  const fillD = rawLayers('image', 'fill', c).find((l) => l.kind === 'solid').d;
  const farF = sharp
    ? (s, t) => { const p = L.segAt(s, t), tg = X.tangent(s, t), nn = [-tg[1], tg[0]]; return Math.min(X.u([p[0] + nn[0], p[1] + nn[1]]), X.u([p[0] - nn[0], p[1] - nn[1]])) - X.US; }
    : (s, t) => X.u(L.segAt(s, t)) - X.U4;
  const real = (pc) => pc.filter((sg) => Math.hypot(sg.p.at(-1)[0] - sg.p[0][0], sg.p.at(-1)[1] - sg.p[0][1]) > 1e-6);
  // a survivor under ~3 units is debris (drawing-a-new-icon.md): sharp's corner test keeps a
  // quarter-unit of the ridge round its last vertex, which the rounded cut takes whole
  const runLen = (pc) => pc.reduce((a, sg) => a + B.flat([sg], 0.05).reduce((acc, q, i, arr) => acc + (i ? Math.hypot(q[0] - arr[i - 1][0], q[1] - arr[i - 1][1]) : 0), 0) + Math.hypot(sg.p.at(-1)[0] - B.flat([sg], 0.05).at(-1)[0], sg.p.at(-1)[1] - B.flat([sg], 0.05).at(-1)[1]), 0);
  let nearD = '', farD = '', frameFar = null, ridgeNear = [];
  L.parseRuns(line).forEach((run, k) => {
    for (const pc of X.clipRunF(run, (s, t) => -X.u(L.segAt(s, t))).map(real).filter((pc) => pc.length)) { nearD += X.segsD(pc); if (k === 1) ridgeNear.push(pc); }
    const far = X.clipRunF(run, farF).map(real).filter((pc) => pc.length && runLen(pc) >= 3);
    for (const pc of far) farD += X.segsD(pc);
    if (k === 0) { assert(far.length === 1, `image-off: the frame has ${far.length} far pieces`); frameFar = far[0]; }
    else assert(far.length === 0, 'image-off: the ridge reaches the far side');
  });
  const [prun] = L.parseRuns(plateD);
  const nearPlate = B.intersect(B.runFromD(plateD), halfPlane(0, true));
  const farPlateD = sharp ? E(B.intersect(B.runFromD(plateD), halfPlane(X.US, false))) : roundedFarPlate(frameFar, prun, X.segsD(L.parseRuns(line)[0].segs, true));
  // fill: image's own fill without its sun (a hole the cut would leave as a sliver), cut on u = 0
  const fillRuns = B.runFromD(fillD);
  const noSun = fillRuns.slice(0, 2);
  const nearFill = B.intersect(noSun, halfPlane(0, true));
  const ridgeBand = ridgeNear.map((pc) => B.band(pc.map((sg) => ({ t: sg.t, p: sg.p })), sharp ? 'butt' : 'round'));
  const nearDuo = B.subtract(nearPlate, ridgeBand);
  const slash = X.SLASH[c];
  return {
    stroke: [S(nearD + farD + slash)],
    'two-tone': [Pl(E(nearPlate) + farPlateD), S(nearD + slash)],
    duotone: [Pl(E(nearDuo) + farPlateD), S(slash)],
    fill: [F(E(nearFill) + farPlateD), S(slash)],
  };
}
/**
 * The far plate of a regular -off (1.5.0's g15.mjs, copied): the base's plate from the point beside
 * each far stroke end, an r = 1 turn about the end round to the notch line u = 3 sqrt 2, and that
 * line between the two turns (bell-dot's recipe, as heart-off and monitor-off ship).
 */
function roundedFarPlate(farSegs, prun, baseD) {
  const [base] = L.parseRuns(baseD);
  const polys = [B.flat(base.segs.map((s) => ({ t: s.t, p: s.p })), 0.02)];
  const Ee = [farSegs[0].p[0], farSegs.at(-1).p.at(-1)];
  const into = [X.tangent(farSegs[0], 0), X.tangent(farSegs.at(-1), 1).map((v) => -v)];
  const out = Ee.map((e, k) => { const t = into[k], nn = [-t[1], t[0]]; const probe = [e[0] + nn[0] * 0.5, e[1] + nn[1] * 0.5]; return B.winding(probe, polys) !== 0 ? [-nn[0], -nn[1]] : nn; });
  const O = Ee.map((e, k) => [e[0] + out[k][0], e[1] + out[k][1]]);
  const T = Ee.map((e) => [e[0] - 1 / X.R2, e[1] + 1 / X.R2]);
  for (const t of T) assert(Math.abs(X.u(t) - X.U3) < 1e-6, 'notch tangent off the line');
  const near = (q) => { let best = { d: Infinity }; prun.segs.forEach((s, i) => { for (let j = 0; j <= 2000; j++) { const p = L.segAt(s, j / 2000), d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < best.d) best = { d, i, t: j / 2000 }; } }); return best; };
  const refine = (q, b) => { let lo = Math.max(0, b.t - 1 / 2000), hi = Math.min(1, b.t + 1 / 2000); const s = prun.segs[b.i]; for (let k = 0; k < 60; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; const d1 = Math.hypot(...L.segAt(s, m1).map((v, j) => v - q[j])), d2 = Math.hypot(...L.segAt(s, m2).map((v, j) => v - q[j])); if (d1 < d2) hi = m2; else lo = m1; } return { ...b, t: (lo + hi) / 2, d: Math.hypot(...L.segAt(s, (lo + hi) / 2).map((v, j) => v - q[j])) }; };
  const Aa = refine(O[0], near(O[0])), Bp = refine(O[1], near(O[1]));
  assert(Aa.d < 2e-3 && Bp.d < 2e-3, `far plate: the offset point is ${Math.max(Aa.d, Bp.d).toFixed(4)} off the plate`);
  const walk = (a, b) => { const segs = [], n = prun.segs.length; if (a.i === b.i && b.t > a.t) return [L.segPiece(prun.segs[a.i], a.t, b.t)]; segs.push(L.segPiece(prun.segs[a.i], a.t, 1)); for (let i = (a.i + 1) % n; i !== b.i; i = (i + 1) % n) segs.push(prun.segs[i]); if (b.t > 0) segs.push(L.segPiece(prun.segs[b.i], 0, b.t)); return segs; };
  const meanU = (segs) => segs.reduce((acc, s) => acc + X.u(L.segAt(s, 0.5)), 0) / segs.length;
  const fwd = walk(Aa, Bp), bwd = walk(Bp, Aa);
  const piece = meanU(fwd) > meanU(bwd) ? fwd : bwd.reverse().map((s) => ({ t: s.t, p: [...s.p].reverse() }));
  piece[0] = { ...piece[0], p: [O[0], ...piece[0].p.slice(1)] };
  piece[piece.length - 1] = { ...piece.at(-1), p: [...piece.at(-1).p.slice(0, -1), O[1]] };
  const deg = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const turn = (e, from, to, avoid) => { let a0 = deg([from[0] - e[0], from[1] - e[1]]), a1 = deg([to[0] - e[0], to[1] - e[1]]); const av = deg(avoid); const inside = (a, lo, hi) => { let x = a; while (x < lo) x += 360; while (x > lo + 360) x -= 360; return x <= hi; }; let up = a1; while (up < a0) up += 360; if (inside(av, a0, up)) { let dn = a1; while (dn > a0) dn -= 360; return L.arcC(e, 1, a0, dn); } return L.arcC(e, 1, a0, up); };
  let d = `M${P(T[0])}`;
  d += turn(Ee[0], T[0], O[0], into[0]);
  d += piece.map((s) => L.segD(s)).join('');
  d += turn(Ee[1], O[1], T[1], into[1]);
  return d + 'Z';
}

export const STYLES = {
  'log-in': logIn,
  'a-arrow-up': (sh) => aArrow(sh, true),
  'a-arrow-down': (sh) => aArrow(sh, false),
  'spell-check': spellCheck,
  type,
  'list-filter': listFilter,
  'list-todo': listTodo,
  dot: dotIcon,
  braces,
  brackets,
  regex,
  'circle-progress-plus': (sh) => circleProgress(sh, 'plus'),
  'circle-progress-arrow-up': (sh) => circleProgress(sh, 'arrow-up'),
  locate: (sh) => locate(sh, false),
  'locate-fixed': (sh) => locate(sh, true),
  'heart-pulse': heartPulse,
  'battery-charging': batteryCharging,
  voicemail,
  pill,
  bandage,
  notebook,
  'notebook-pen': notebookPen,
  webcam,
  'image-off': imageOff,
};
