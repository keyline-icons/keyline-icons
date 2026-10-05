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
const { Ls, As, polyLA, dLA, toGeo, offsetLA, verifyOffset } = A;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
const C = (s) => (s ? 'sharp' : 'regular');
// every emitted region wound by nesting (outer +, hole -): a hole wound with its outer contour paints
// solid under nonzero, which is what the site and icons/ use (the dropped book-open-check's spine slot did)
const E = (shape) => B.emitShape(orientShape(shape));
/** bool.mjs's orient probes from a contour's first point, which can sit on another contour (book-open's spine slot
 *  touches the outline at the notch). Here a contour is inside another when most of its own points are, so one
 *  shared point decides nothing and a hole at the centre cannot pull its outline in. */
function orientShape(shape) {
  const polys = shape.map((r) => B.flat(r, 0.05));
  return shape.map((r, i) => {
    let depth = 0;
    polys.forEach((o, j) => {
      if (j === i) return;
      const pts = polys[i].filter((_, k) => k % 3 === 0);
      if (pts.filter((pt) => B.winding(pt, [o]) !== 0).length > pts.length / 2) depth++;
    });
    const want = depth % 2 === 0 ? 1 : -1;
    return Math.sign(B.area(r)) === want ? r : B.revRun(r);
  });
}
const geo = (segs) => [toGeo(segs)];
const grow = (segs) => { const o = offsetLA(segs, 1); verifyOffset(segs, o, 1); return o; };
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
// His drawing (refs/, 5 Oct 2026), fitted verbatim: a narrower bracket than bracket-arrow-left's
// (15..21, its corners r=4 as the family's) and bracket-arrow-left's arrow turned to enter, shifted
// a unit right so its shaft starts on 3: ink 2..22 by 3..21. Sharp: the bracket's ends a unit on,
// its corners true; the arrow is the family's sharp arrow on the same shift. Bracket grey, arrow
// black in two-tone and duotone, as bracket-arrow-left's.
function logIn(sharp) {
  const bracket = sharp ? 'M14 4L21 4L21 20L14 20' : 'M15 4L17 4C19.2091 4 21 5.7909 21 8L21 16C21 18.2091 19.2091 20 17 20L15 20';
  const arrow = mapPts(layer('bracket-arrow-left', 'two-tone', sharp, 'stroke'), ([x, y]) => [15.8907 - x, y]);
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
// His drawing (refs/, 5 Oct 2026): battery's body opened top and bottom for a full-height bolt,
// (11,8) (8,12) (12,12) (9,16), point-symmetric about the body's centre, with battery's terminal.
// One fix: his wall ends at (14,6) and (6,18) stood 1.61 from the bolt's ends; opened half a unit
// more, to 14.5 and 5.5, they clear by 2.03 and keep his symmetry. An opened body is not a closed
// region, so no plate is notched round the bolt (his cloud-terminal ruling, 24 Sep 2026): two-tone
// is the duotone split, the walls grey and the terminal and bolt black as battery's duotone has its
// terminal; fill is the stroke, as cloud-terminal's and battery-sparkles' are. Sharp: square
// corners, the walls' cut ends a unit on, the bolt's ends on their own k.
const BOLT = [[11, 8], [8, 12], [12, 12], [9, 16]];
function batteryCharging(sharp) {
  const term = sharp ? 'M22 8.5L22 15.5' : 'M22 9.5L22 14.5';
  const e = sharp ? 1 : 0;
  const walls = sharp
    ? `M${6 + e} 6L2 6L2 18L${5.5 + e} 18M${14.5 - e} 6L18 6L18 18L${14 - e} 18`
    : 'M6 6L5 6C3.3431 6 2 7.3431 2 9L2 15C2 16.6569 3.3431 18 5 18L5.5 18M14.5 6L15 6C16.6569 6 18 7.3431 18 9L18 15C18 16.6569 16.6569 18 15 18L14 18';
  const kb = (p0, p1) => k45(L_unit(p0, p1));
  const bolt = sharp
    ? polyline([L.add(BOLT[0], L.mul(L_unit(BOLT[1], BOLT[0]), kb(BOLT[1], BOLT[0]))), BOLT[1], BOLT[2], L.add(BOLT[3], L.mul(L_unit(BOLT[2], BOLT[3]), kb(BOLT[2], BOLT[3])))])
    : polyline(BOLT);
  // 2 painted units between every wall end and the bolt (sharp: the butt face's nearer corner)
  const bp = L.parseRuns(polyline(BOLT)).flatMap((r) => r.segs.flatMap((sg) => Array.from({ length: 201 }, (_, i) => L.segAt(sg, i / 200))));
  const dist = (p) => Math.min(...bp.map((q) => Math.hypot(q[0] - p[0], q[1] - p[1])));
  for (const run of L.parseRuns(walls)) for (const end of [run.segs[0].p[0], run.segs.at(-1).p.at(-1)]) {
    const d = sharp ? Math.min(dist([end[0], end[1] - 1]), dist([end[0], end[1] + 1])) - 1 : dist(end) - 2;
    assert(d >= (sharp ? 2 - 0.4142 : 2) - 1e-3, `battery-charging: a wall end clears the bolt by ${d.toFixed(3)}`);
  }
  return {
    stroke: [S(walls + term + bolt)],
    'two-tone': [M(walls), S(term + bolt)],
    duotone: [M(walls), S(term + bolt)],
    fill: [S(walls + term + bolt)],
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
// A capsule on the free diagonal (bottom left to top right, as search and paperclip run), his
// proportions (refs/, 5 Oct 2026): caps r=4.69 about (7.69,16.31) and (16.31,7.69), ink on 2..22,
// and a divider across the middle from wall to wall. Every curve is shape and nothing ends free, so sharp is the same
// drawing. Two-tone: the plate under the whole stroke. Duotone and fill split it at the divider
// (image's ridge rule, the region on one side cut out): the upper half black over the grey in
// duotone, solid in fill with the lower half left an outline.
const DIAG = { a: [Math.SQRT1_2, -Math.SQRT1_2], n: [Math.SQRT1_2, Math.SQRT1_2] };
const at = (c, s, t) => [c[0] + s * DIAG.a[0] + t * DIAG.n[0], c[1] + s * DIAG.a[1] + t * DIAG.n[1]];
/** The half plane u = x - y <= k (lo) or >= k, as a triangle well past the canvas; its long edge is the line u = k. */
const halfPlane = (k, lo) => B.runFromD(lo ? `M${k - 60} -60L${k + 60} 60L${k - 60} 60Z` : `M${k - 60} -60L${k + 60} 60L${k + 60} -60Z`);
function pill() {
  // his radius (refs/, 5 Oct 2026): the divider's ends on (8.68412, 8.68412) and (15.31588, 15.31588)
  const R = (12 - 8.68412) * Math.SQRT2, c = [12, 12], s = (9 - R) * Math.SQRT2;
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
// His drawing (refs/, 5 Oct 2026), fitted verbatim: a cover 16 wide (path 5..21, r=3), three rings
// through its spine from 3 to 7 (crossing the wall at 5), and the elastic band on x=17, 6..18, 2
// clear of the cover all round. Ink 2..22 by 1..23. Two-tone: the plate under the stroke; duotone:
// the cover grey, rings and band black; fill: the cover solid with the band cut out, the rings
// stroked over it. Sharp: square corners, every free end a unit on. `dx` moves the whole notebook,
// which notebook-pen does.
function notebookParts(sharp, dx = 0) {
  const body = polyLA([[5 + dx, 2], [21 + dx, 2], [21 + dx, 22], [5 + dx, 22]], sharp ? [0, 0, 0, 0] : [3, 3, 3, 3]);
  const rings = [7, 12, 17].map((y) => openRun([[3 + dx, y], [7 + dx, y]], sharp)).join('');
  return { body, rings };
}
function notebook(sharp) {
  const { body, rings } = notebookParts(sharp);
  const band = openRun([[17, 6], [17, 18]], sharp);
  const bodyD = dLA(body), plate = geo(grow(body));
  const cutBand = [B.band(B.runFromD(band)[0], sharp ? 'butt' : 'round')];
  return {
    stroke: [S(bodyD + rings + band)],
    'two-tone': [Pl(E(plate)), S(bodyD + rings + band)],
    duotone: [Pl(E(plate)), S(rings + band)],
    fill: [F(E(B.subtract(plate, cutBand))), S(rings)],
  };
}

/* ---------------------------------------------------------------- notebook-pen */
// His drawing (refs/, 5 Oct 2026): square-pen's pen moved a unit right and a unit up, so its nib
// clears the rings by 2.53, over the notebook without its band. As he drew it the pen reached 23
// on the right against the rings' 2 on the left, so the notebook moves a unit left (a compound is
// its base translated) and the ink sits on 1..23 both ways. The cover opens where its centre line
// comes within 4 of the pen's (his right wall stopped 1.91 short of 2). Styles as square-pen's:
// two-tone the pen's plate under the stroke; duotone the notebook grey (strokes at 0.4), the pen a
// black solid; fill the pen solid over the notebook's stroke.
const PEN_SHIFT = ([x, y]) => [x + 1, y - 1];
function notebookPen(sharp) {
  const penLine = mapPts(layer('square-pen', 'two-tone', sharp, 'stroke').split('M').filter(Boolean).slice(1).map((x) => 'M' + x).join(''), PEN_SHIFT);
  // The pen's stroke is the same line in both treatments (its end is shape, its joins round), so
  // its solid and plate are too. square-pen's sharp solid flattens the end cap to 22.93 where its
  // own stroke paints 23, which the ink box read as notebook-pen sitting 0.07 off-centre.
  const penSolid = mapPts(layer('square-pen', 'duotone', false, 'solid'), PEN_SHIFT);
  const penPlate = mapPts(layer('square-pen', 'two-tone', false, 'plate'), PEN_SHIFT);
  const { body, rings } = notebookParts(sharp, -1);
  const penPts = L.parseRuns(penLine).flatMap((r) => r.segs.flatMap((sg) => Array.from({ length: 201 }, (_, i) => L.segAt(sg, i / 200))));
  const far = (p) => Math.min(...penPts.map((q) => Math.hypot(q[0] - p[0], q[1] - p[1])));
  const kept = clipBody(body, (p) => far(p) - 4);
  assert(kept.length === 1, `notebook-pen: the cover splits into ${kept.length}`);
  let open = kept[0];
  if (sharp) {
    const f = open[0], l = open.at(-1);
    open = [{ ...f, p0: L.sub(f.p0, L.mul(L.unit(L.sub(f.p1, f.p0)), 1)) }, ...open.slice(1, -1), { ...l, p1: L.add(l.p1, L.mul(L.unit(L.sub(l.p1, l.p0)), 1)) }];
  }
  const bodyD = dLA(open, false);
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
// the slash. Duotone and fill: image's fill on the near side (the ground under the ridge cut out)
// and the far piece, grey in duotone under the black slash, solid in fill.
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
  let nearD = '', farD = '', frameFar = null;
  L.parseRuns(line).forEach((run, k) => {
    for (const pc of X.clipRunF(run, (s, t) => -X.u(L.segAt(s, t))).map(real).filter((pc) => pc.length)) nearD += X.segsD(pc);
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
  // duotone's near solid is fill's, grey: image's own duotone and fill differ (a black ridge on grey
  // against a ground cut out), and an -off has no black but the slash, so the ridge goes as fill cuts it
  const nearDuo = nearFill;
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

/* --------------------------------------------------------------------- syringe */
// Drawn along its own axis and laid on the free diagonal, needle bottom left: a barrel 12 long and
// 6 across (path), its front corners r=2, closed at the back by the finger flange (10 across);
// the plunger's rod and thumb press behind it; two graduations off the upper wall, 4 apart and 2
// clear of the ends; the needle from the barrel's front. The needle's length is the free number,
// solved so the ink is 20 square; the whole drawing then sits on 2..22. Sharp: the barrel's front
// corners true, every free end 0.4142 along its own diagonal. Two-tone: the barrel's plate under
// the stroke; duotone: the barrel grey, everything else black; fill: the barrel solid with the
// graduations cut in from its wall, the rest stroked.
function syringe(sharp) {
  const build = (Lx, c) => build0(Lx, c, sharp);
  function build0(L, c, sharp) {
  const k = sharp ? 0.4142 : 0;
  {
    const W = (x, y) => [c[0] + x * DIAG.a[0] + y * DIAG.n[0], c[1] + x * DIAG.a[1] + y * DIAG.n[1]];
    const ext = (p0, p1, which = 'end') => { const t = L_unit(p0, p1); return which === 'end' ? [p0, [p1[0] + t[0] * k, p1[1] + t[1] * k]] : [[p0[0] - t[0] * k, p0[1] - t[1] * k], p1]; };
    const barrel = openPolyLA([W(5, -3), W(-7, -3), W(-7, 3), W(5, 3)], [0, sharp ? 0 : 2, sharp ? 0 : 2, 0]);
    const lines = [
      ext(W(-7, 0), W(-L, 0)),                       // needle, its tip free
      [ext(W(5, 0), W(5, -5))[1], W(5, 0), W(9, 0)],  // the flange's upper half turning into the rod, so the
                                                      // barrel's ends and the rod touch one subpath (lint read 1.0)
      ext(...ext(W(9, -3), W(9, 3)), 'start'),       // thumb press
      ext(W(5, 0), W(5, 5)),                         // flange's lower half
      ext(W(-3, -3), W(-3, -1)),                     // graduations off the wall
      ext(W(1, -3), W(1, -1)),
    ];
    const closed = polyLA([W(5, -3), W(-7, -3), W(-7, 3), W(5, 3)], [0, sharp ? 0 : 2, sharp ? 0 : 2, 0]);
    return { barrel, lines, closed };
  }
  }
  const dOf = (g) => dLA(g.barrel, false) + g.lines.map((l) => polyline(l)).join('');
  // the needle's length, solved on the rounded drawing so its ink is 20 wide; sharp keeps that
  // length, its stubs landing on the same box
  const roundBox = (Lx, c) => { const g = build(Lx, c); return L.strokedBBox(dOf(g), 1, sharp ? 'butt' : 'round'); };
  const Lr = L.bisect((Lx) => { const bb = L.strokedBBox(dLA(buildRound(Lx).barrel, false) + buildRound(Lx).lines.map((l) => polyline(l)).join(''), 1, 'round'); return bb[2] - bb[0] - 20; }, 8, 20, 60);
  const b0 = L.strokedBBox(dLA(buildRound(Lr).barrel, false) + buildRound(Lr).lines.map((l) => polyline(l)).join(''), 1, 'round');
  const c = [12 + (12 - (b0[0] + b0[2]) / 2), 12 + (12 - (b0[1] + b0[3]) / 2)];
  const g = build(Lr, c);
  const b = roundBox(Lr, c);
  assert(b.every((v, i) => Math.abs(v - [2, 2, 22, 22][i]) < 2e-3), `syringe box ${b.map((v) => v.toFixed(3))}`);
  const d = dOf(g);
  const plate = geo(grow(g.closed));
  const inner = geo(offsetLA(g.closed, -1));
  const ticks = g.lines.slice(4).map((l) => [B.band(B.runFromD(polyline(l))[0], sharp ? 'butt' : 'round')]);
  const tickD = g.lines.slice(4).map((l) => polyline(l)).join('');
  const othersNoBarrel = g.lines.slice(0, 4).map((l) => polyline(l)).join('');
  return {
    stroke: [S(d)],
    'two-tone': [Pl(E(plate)), S(d)],
    duotone: [Pl(E(plate)), S(othersNoBarrel + tickD)],
    fill: [F(E(B.subtract(plate, B.intersect(inner, B.union(...ticks))))), S(othersNoBarrel)],
  };
  function buildRound(Lx) { return build0(Lx, [12, 12], false); }
}
const L_unit = (p0, p1) => { const v = [p1[0] - p0[0], p1[1] - p0[1]], n = Math.hypot(...v); return [v[0] / n, v[1] / n]; };

/* ----------------------------------------------------------------------- scale */
// A balance: the post (12, 2..22) with a knob above the beam (y=6, 5..19), a foot (7..17 on 22),
// and two triangular pans hung from the beam's ends, bases on y=14 six wide. The pans' corners
// are r=1, their base vertices solved so the fillet's extreme sits on 2 and 22 (ink 1..23); in
// sharp the true corner sits there and its round join paints the unit. The apex is under the beam.
// Ink 1..23 both ways: it reads as round, which owes 22 on both axes.
// Two-tone: the pans' plates under the stroke; duotone: the pans grey solids, post, beam and foot
// black; fill: the pans solid, the rest stroked.
function scale(sharp) {
  const pan = (side) => {
    const ax = side < 0 ? 5 : 19;
    const mk = (x0) => polyLA(side < 0 ? [[ax, 6], [ax + (ax - x0), 14], [x0, 14]] : [[ax, 6], [x0, 14], [ax - (x0 - ax), 14]], sharp ? [0, 0, 0] : [1, 1, 1]);
    if (sharp) return mk(side < 0 ? 2 : 22);
    const x0 = L.bisect((x) => { const bb = L.strokedBBox(dLA(mk(x)), 1, 'round'); return side < 0 ? bb[0] - 1 : bb[2] - 23; }, side < 0 ? 0 : 21, side < 0 ? 3 : 24, 60);
    return mk(x0);
  };
  const pans = [pan(-1), pan(1)];
  const rest = openRun([[12, 2], [12, 22]], sharp, 'start') + openRun([[5, 6], [19, 6]], false, 'none') + openRun([[7, 22], [17, 22]], sharp);
  const panD = pans.map((p) => dLA(p)).join('');
  const plates = pans.map((p) => E(geo(grow(p)))).join('');
  return {
    stroke: [S(panD + rest)],
    'two-tone': [Pl(plates), S(panD + rest)],
    duotone: [Pl(plates), S(rest)],
    fill: [F(plates), S(rest)],
  };
}

/* ------------------------------------------------------------------- signature */
// Sign here: an x, a written stroke and the line under them. The x is the house x at 4 (3..7 by
// 8..12); the stroke two half turns r=2 on y=10, over then under, from 12 to 20; the line runs the
// width on y=16. Ink 1..23 by 7..17. Three elements, so two-tone and duotone take the one-part-grey
// split: the line grey, the x and the stroke black. Sharp: the x's arms 0.4142 along their
// diagonals, the stroke's ends a unit on along their tangents, the line's ends a unit on.
function signature(sharp) {
  const a = sharp ? 0.4142 / Math.SQRT2 : 0;
  const x = `M${P([3 - a, 8 - a])}L${P([7 + a, 12 + a])}M${P([7 + a, 8 - a])}L${P([3 - a, 12 + a])}`;
  const wave = (sharp ? 'M12 11L12 10' : 'M12 10') + L.arcC([14, 10], 2, 180, 360) + L.arcC([18, 10], 2, 180, 0) + (sharp ? 'L20 9' : '');
  const line = openRun([[2, 16], [22, 16]], sharp);
  return { stroke: [S(x + wave + line)], 'two-tone': [M(line), S(x + wave)], duotone: [M(line), S(x + wave)], fill: [S(x + wave + line)] };
}

/* ----------------------------------------------------------------------- gavel */
// His drawing (refs/, 5 Oct 2026): a mallet on the anti-diagonal, its head a neck between two
// flared caps (the flares r=1.68 S-turns) with a line across each end of the neck, and a handle 3
// wide with a round end, running from the head's lower face to the bottom left. Ink 1..23 both ways.
// One fix: his caps' corners were r=2.09, off the ladder, a size that puts each arc's extreme on the
// padding exactly. At r=2 the extremes would poke 0.04 out, so each cap's end face moves in 0.053
// along the head instead, and the arcs land on 2 with their extremes still on 2 and 22. The head is
// one closed run, so the two halves meet as a corner, not as two ends. Sharp: each cap corner's arc
// becomes the true point at the arc's own extreme (11.7492,2), (7,6.7492), (17.2508,17),
// (22,12.2508), so the round join paints the rounded box (drawing-a-new-icon.md, de-filleting); the
// flares and the handle's end are shape and stay. Two-tone: the silhouette's plate under the stroke. Duotone, the tools rule (head
// black, handle grey): the silhouette grey, the head black over it with the neck's two lines cut out
// so the grey shows through them. Fill: the silhouette solid with the same two lines cut out.
const GAVEL = {
  handle: 'M10.5611 10.3105L2.6476 18.2238C2.2329 18.6387 1.9999 19.2014 2 19.7881C2.0001 20.3748 2.2333 20.9375 2.6481 21.3523C3.0631 21.7671 3.6257 22.0001 4.2124 22C4.5028 22 4.7905 21.9427 5.0588 21.8315C5.3272 21.7203 5.571 21.5573 5.7765 21.3518L13.6891 13.4384',
  a: 'M18.8874 9.7042L14.2958 5.1126C13.9801 4.797 13.8028 4.3688 13.8028 3.9224C13.8028 3.476 13.6255 3.0479 13.3098 2.7322L13.1634 2.5858C12.3824 1.8047 11.1161 1.8047 10.335 2.5858L7.5858 5.335C6.8047 6.1161 6.8047 7.3824 7.5858 8.1634L7.7322 8.3098C8.0479 8.6255 8.476 8.8028 8.9224 8.8028C9.3688 8.8028 9.797 8.9801 10.1126 9.2958L14.7042 13.8874',
  b: 'M14.7042 13.8874C15.0199 14.203 15.1972 14.6312 15.1972 15.0776C15.1972 15.524 15.3745 15.9521 15.6902 16.2678L15.8366 16.4142C16.6176 17.1953 17.8839 17.1953 18.665 16.4142L21.4142 13.665C22.1953 12.8839 22.1953 11.6176 21.4142 10.8366L21.2678 10.6902C20.9521 10.3745 20.524 10.1972 20.0776 10.1972C19.6312 10.1972 19.203 10.0199 18.8874 9.7042',
  lines: 'M10.1126 9.2958L14.2958 5.1126M14.7042 13.8874L18.8874 9.7042',
};
const GAVEL_SHARP = [
  ['L13.1634 2.5858C12.3824 1.8047 11.1161 1.8047 10.335 2.5858L7.5858 5.335C6.8047 6.1161 6.8047 7.3824 7.5858 8.1634L7.7322 8.3098', 'L11.7492 2L7 6.7492L7.7322 8.3098'],
  ['L15.8366 16.4142C16.6176 17.1953 17.8839 17.1953 18.665 16.4142L21.4142 13.665C22.1953 12.8839 22.1953 11.6176 21.4142 10.8366L21.2678 10.6902', 'L17.2508 17L22 12.2508L21.2678 10.6902'],
];
function gavel(sharp) {
  let a = GAVEL.a, b = GAVEL.b;
  if (sharp) for (const [from, to] of GAVEL_SHARP) { a = a.replace(from, to); b = b.replace(from, to); }
  assert(!sharp || (a !== GAVEL.a && b !== GAVEL.b), 'gavel: a sharp corner did not match');
  const headD = a + b.replace(/^M[^LC]*/, '') + 'Z';
  const strokes = GAVEL.handle + headD + GAVEL.lines;
  const head = B.runFromD(headD);
  const handle = B.runFromD(GAVEL.handle + 'Z');
  const silhouette = B.union(head.map((r) => B.grow(r)), handle.map((r) => B.grow(r)));
  // the neck's lines meet both walls square, so each knockout is its line a unit short at both ends
  // with flat ends: it stops flush on the walls' inner edge and the rim holds
  const cuts = [[[10.1126, 9.2958], [14.2958, 5.1126]], [[14.7042, 13.8874], [18.8874, 9.7042]]].map(([p0, p1]) => {
    const t = L_unit(p0, p1);
    return B.band(B.runFromD(polyline([L.add(p0, t), L.sub(p1, t)]))[0], 'butt');
  });
  const headSolid = B.subtract(head.map((r) => B.grow(r)), cuts);
  return {
    stroke: [S(strokes)],
    'two-tone': [Pl(E(silhouette)), S(strokes)],
    duotone: [Pl(E(silhouette)), F(E(headSolid))],
    fill: [F(E(B.subtract(silhouette, cuts)))],
  };
}

/* ------------------------------------------------------------------- telescope */
// A tube raised 30 degrees toward the top right (12 long, 5 across, r=1) with the eyepiece run out
// of its lower end, on a stem 2 below the tube's middle and three legs. The legs' spread and length
// are the free numbers, solved so the ink is 18 wide by 20 tall (3..21 by 2..22); four variants were
// rendered against this one at 16px (45 degrees, no stem, two legs). Sharp: the tube's corners pulled
// in along both of its axes until the true corner's round join paints the rounded top, the free ends
// stubbed on the axis each one bounds. Two-tone: the tube's plate
// under the stroke; duotone: the tube black, the stand grey (the tools rule); fill: the tube solid.
const TELE = { deg: 30, Lf: 7, Lb: 5, w: 2.5, eye: 3, stem: 2 };
function teleParts(o, sharp, c, pull = 0) {
  const th = (o.deg * Math.PI) / 180, a = [Math.cos(th), -Math.sin(th)], n = [Math.sin(th), Math.cos(th)];
  const atx = (s, t) => [c[0] + s * a[0] + t * n[0], c[1] + s * a[1] + t * n[1]];
  const r = sharp ? 0 : 1;
  const tube = polyLA([atx(o.Lf - pull, -o.w + pull), atx(o.Lf - pull, o.w - pull), atx(-o.Lb + pull, o.w - pull), atx(-o.Lb + pull, -o.w + pull)], [r, r, r, r]);
  const top = atx(0, o.w - pull), hub0 = atx(0, o.w), hub = [hub0[0], hub0[1] + o.stem];
  // a free end's stub: k on the axis that end bounds. The eyepiece bounds the left, so its own
  // k45; a side leg's foot bounds the side, where a stub long enough for the floor (0.54) puts the
  // face's corner 0.03 past the rounded cap, so it takes the shorter of the two and the middle leg
  // keeps the floor.
  const end = (p0, p1, k) => { const t = L_unit(p0, p1); return polyline([p0, [p1[0] + t[0] * k, p1[1] + t[1] * k]]); };
  const kOf = (p0, p1, mode) => {
    const t = L_unit(p0, p1).map(Math.abs), nn = [t[1], t[0]];
    const kx = t[0] > 1e-9 ? (1 - nn[0]) / t[0] : Infinity, ky = t[1] > 1e-9 ? (1 - nn[1]) / t[1] : Infinity;
    return mode === 'min' ? Math.min(kx, ky) : k45(L_unit(p0, p1));
  };
  const leg = (dx, mode) => { const f = [hub[0] + dx, hub[1] + o.H]; return sharp ? end(hub, f, kOf(hub, f, mode)) : polyline([hub, f]); };
  const e0 = atx(-o.Lb, 0), e1 = atx(-o.Lb - o.eye, 0);
  const runs = [
    sharp ? end(e0, e1, kOf(e0, e1, 'own')) : polyline([e0, e1]),
    'M' + P(top) + 'L' + P(hub),
    leg(-o.spread, 'min'), leg(o.spread, 'min'), leg(0, 'own'),
  ];
  return { tube, eye: runs[0], stand: runs.slice(1).join('') };
}
function telescope(sharp) {
  const dOf = (g) => dLA(g.tube) + g.eye + g.stand;
  const box = (o, sh = false, c = [0, 0]) => L.strokedBBox(dOf(teleParts(o, sh, c)), 1, sh ? 'butt' : 'round');
  const spread = L.bisect((sp) => { const b = box({ ...TELE, spread: sp, H: 10 }); return b[2] - b[0] - 18; }, 2, 14, 60);
  const H = L.bisect((h) => { const b = box({ ...TELE, spread, H: h }); return b[3] - b[1] - 20; }, 3, 18, 60);
  const o = { ...TELE, spread, H };
  const b0 = box(o);
  const c = [12 - (b0[0] + b0[2]) / 2, 12 - (b0[1] + b0[3]) / 2];
  // sharp: the tube's corners pulled in until the true corner's round join paints the rounded top
  const pull = sharp ? L.bisect((pl) => L.strokedBBox(dOf(teleParts(o, true, c, pl)), 1, 'butt')[1] - 2, 0, 1, 60) : 0;
  const g = teleParts(o, sharp, c, pull);
  const b = L.strokedBBox(dOf(g), 1, sharp ? 'butt' : 'round');
  assert(b.every((v, i) => Math.abs(v - [3, 2, 21, 22][i]) < 2e-3), `telescope box ${b.map((v) => v.toFixed(3))}`);
  const tubeD = dLA(g.tube), plate = E(geo(grow(g.tube)));
  return {
    stroke: [S(tubeD + g.eye + g.stand)],
    'two-tone': [Pl(plate), S(tubeD + g.eye + g.stand)],
    duotone: [M(g.eye + g.stand), F(plate)],
    fill: [F(plate), S(g.eye + g.stand)],
  };
}

/* ----------------------------------------------------------------- stethoscope */
// The binaural as a U (arms on 4 and 10 from the ear ends at 3, an r=3 turn about (7,8)), the tube
// down from its foot and round an r=5 turn about (12,16) to the chest piece, a ring r=3 about (17,10)
// it rises into. Ink 3..21 by 2..22; the chest piece clears the right arm by 2. Both turns are
// shape, kept round in sharp, where the ear ends take a unit on. One element with one closed part:
// two-tone puts the chest piece's disc under the stroke, duotone the disc grey under the black
// tube, fill the disc solid.
function stethoscope(sharp) {
  const e = sharp ? 1 : 0;
  const u = `M4 ${3 - e}L4 8` + L.arcC([7, 8], 3, 180, 90) + L.arcC([7, 8], 3, 90, 0) + `L10 ${3 - e}`;
  const tube = 'M7 11L7 16' + L.arcC([12, 16], 5, 180, 90) + L.arcC([12, 16], 5, 90, 0) + 'L17 13';
  const ringSegs = [As([17, 10], 3, 0, 360)];
  const ring = dLA(ringSegs);
  const disc = E(geo(grow(ringSegs)));
  return {
    stroke: [S(u + tube + ring)],
    'two-tone': [Pl(disc), S(u + tube + ring)],
    duotone: [Pl(disc), S(u + tube)],
    fill: [F(disc), S(u + tube)],
  };
}

/* ------------------------------------------------------------------ hand-coins */
// hand-heart's hand as shipped, with two coins where the heart was: rings r=2.5 about (18.5,4.5),
// which puts the ink on 1 and 22 to keep hand-heart's box, and (9.5,5.5), 2 clear of it. Any coin
// larger comes within 2 of the fingertips (a single r=3.5 coin stood 0.4 off them). Tones as
// hand-heart's: two-tone the hand's and the coins' plates under the stroke; duotone the coins grey,
// the hand black; fill the hand and the coins solid, the thumb's line and the cuff stroked.
function handCoins(sharp) {
  const c = C(sharp);
  const L2 = rawLayers('hand-heart', 'stroke', c).find((l) => l.kind === 'stroke').d;
  const sub = L2.split(/(?=M)/);
  const heart = sub[0];
  assert(/C/.test(heart) && sub.length >= 2, 'hand-heart: the heart is its first subpath');
  const hand = sub.slice(1).join('');
  const coins = [[18.5, 4.5], [9.5, 5.5]].map((cc) => [As(cc, 2.5, 0, 360)]);
  const coinD = coins.map((r) => dLA(r)).join('');
  const discs = coins.map((r) => E(geo(grow(r)))).join('');
  const handPlate = rawLayers('hand-heart', 'two-tone', c).find((l) => l.kind === 'plate').d;
  const duoHand = rawLayers('hand-heart', 'duotone', c).filter((l) => l.kind !== 'muted');
  const fillHand = rawLayers('hand-heart', 'fill', c).find((l) => l.kind === 'solid').d;
  const fillLines = rawLayers('hand-heart', 'fill', c).find((l) => l.kind === 'stroke').d.split(/(?=M)/).filter((x) => x !== heart.trim() && !x.startsWith(heart.slice(0, 12))).join('');
  // the same check on the coins as on any compound: 2 painted units to the hand
  if (!sharp) {
    let m = Infinity;
    const hp = L.parseRuns(hand).flatMap((r) => r.segs.flatMap((sg) => Array.from({ length: 201 }, (_, i) => L.segAt(sg, i / 200))));
    for (const [cc] of [[[18.5, 4.5]], [[9.5, 5.5]]]) for (const q of hp) m = Math.min(m, Math.hypot(q[0] - cc[0], q[1] - cc[1]) - 2.5);
    assert(m - 2 >= 2 - 1e-6, `hand-coins: a coin clears the hand by ${(m - 2).toFixed(3)}`);
  }
  return {
    stroke: [S(coinD + hand)],
    'two-tone': [Pl(handPlate + discs), S(coinD + hand)],
    duotone: [Pl(discs), ...duoHand],
    fill: [F(fillHand + discs), S(fillLines)],
  };
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
  syringe,
  scale,
  signature,
  gavel,
  telescope,
  stethoscope,
  'hand-coins': handCoins,
};
