// The 1.8.0 refs batch (11 Oct 2026): Zafar's drawings dropped in refs/ on 10 Oct, fixed onto the
// house rules and named, plus the aspect ratios and undo asked for in the same message.
// STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of layers { kind, d }.
//
// Most of the refs are compounds built on shipped drawings (broom, layers, inbox, home,
// handbag, shopping-basket-plus, braces, brackets, circle-dashed, badge, file), so each of those
// reads its base's raw files here and carries the base exactly; the rest are drawn here, on the
// refs' proportions where they set them. What each one changed from its ref is said above it.
//
// Names (Zafar's ask: "some names need to be fixed"): the other set's name where the drawing is its
// subject (collapse is chevrons-down-up, compact-1 and compact-flip are fold-vertical and
// fold-horizontal, plugs is unplug, three-circles-linked is webhook), base first everywhere
// else, and a second drawing of a shipped name takes -2 on its base (flip-2-horizontal).
import * as L from '../batch-1-4-0/lib.mjs';
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import * as X from '../batch-1-5-0/lib15.mjs';
import { star } from '../v8/star.mjs';
import { PAIR2_SHIPPED } from './pair2-shipped.mjs';

const { rawLayers, mapPts, P, assert, ink } = X;
const { polyLA, dLA, toGeo, offsetLA, verifyOffset } = A;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
const C = (s) => (s ? 'sharp' : 'regular');
const STY = ['stroke', 'two-tone', 'duotone', 'fill'];
const R2 = Math.SQRT2;

/* ----------------------------------------------------------------- helpers */
// Every emitted region wound by nesting (outer +, hole -), as the 1.7.0 batch does it: a hole
// wound with its outline paints solid under nonzero, which is what icons/ and the site use.
const E = (shape) => B.emitShape(orientShape(shape));
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
const allStroke = (d, extra = []) => ({ stroke: [S(d), ...extra], 'two-tone': [S(d), ...extra], duotone: [S(d), ...extra], fill: [S(d), ...extra] });
const unit = (v) => { const n = Math.hypot(v[0], v[1]); return [v[0] / n, v[1] / n]; };
/** Sharp's free end: a straight stub along the run, 1 on an axis, (1 - sin t) / cos t off it. */
const k45 = (t) => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); };
const stubOut = (free, from) => { const t = unit(L.sub(free, from)); return L.add(free, L.mul(t, k45(t))); };
const poly = (pts) => 'M' + pts.map(P).join('L');
/** An open polyline; in sharp each free end (`ends`: both | start | end | none) takes the stub. */
function openRun(pts, sharp, ends = 'both') {
  const q = pts.map((p) => [...p]);
  if (sharp && (ends === 'both' || ends === 'start')) q[0] = stubOut(q[0], q[1]);
  if (sharp && (ends === 'both' || ends === 'end')) q[q.length - 1] = stubOut(q.at(-1), q.at(-2));
  return poly(q);
}
const subs = (d) => d.split(/(?=M)/).filter(Boolean);
const numsOf = (d) => [...d.matchAll(/-?\d*\.?\d+/g)].map(Number);
const meanAxis = (d, axis) => { const n = numsOf(d).filter((_, i) => i % 2 === axis); return n.reduce((a, b) => a + b, 0) / n.length; };
/** Assert a variant's painted box, every layer, against the box wanted (drawing-a-new-icon.md section 10). */
function paintedBox(layers, sharp) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const { kind, d } of layers) {
    const k = kind === 'stroke' || kind === 'muted' ? ink(d, sharp ? 'butt' : 'round') : L.strokedBBox(d, 0, 'butt');
    b[0] = Math.min(b[0], k[0]); b[1] = Math.min(b[1], k[1]); b[2] = Math.max(b[2], k[2]); b[3] = Math.max(b[3], k[3]);
  }
  return b;
}
function wantBox(name, v, sharp, want) {
  for (const style of STY) {
    const b = paintedBox(v[style], sharp);
    assert(Math.max(...b.map((x, i) => Math.abs(x - want[i]))) < 2e-3, `${name} ${style} ${C(sharp)} paints ${b.map((x) => x.toFixed(3))}, wants ${want}`);
  }
  return v;
}

export const STYLES = {};
const def = (name, f, want) => { STYLES[name] = (sharp) => (want ? wantBox(name, f(sharp), sharp, typeof want === 'function' ? want(sharp) : want) : f(sharp)); };

/* ------------------------------------------------------- the short pairs, -3 */
// Zafar's new option (refs/, 10 Oct 2026, filed under the -2 names; "they were supposed to be new
// options", 11 Oct): the -2 pairs' two short arrows, each slid 9 along its own heading so its head
// stands at the outer end instead of meeting the other's in the middle. The -2 pairs ship
// unchanged beside them. Every variant is the shipped -2 with each arrow translated, so tones
// (black on the pair rule's side), stubs and heads stay as they shipped. Zafar's files for the
// horizontal pair carried each other's names: by the pair rule the top arrow is named first
// (arrow-left-right's top arrow points left), so the drawing filed as arrow-left-right-2 is
// arrow-right-left-3, and the other way round.
const PAIR3 = {
  // [the -2 it slides, axis the two arrows are told apart on (0 x, 1 y), slide of the low one, slide of the high one]
  'arrow-down-up-3': ['arrow-down-up-2', 0, [0, 9], [0, -9]],
  'arrow-up-down-3': ['arrow-up-down-2', 0, [0, -9], [0, 9]],
  'arrow-left-right-3': ['arrow-left-right-2', 1, [-9, 0], [9, 0]],
  'arrow-right-left-3': ['arrow-right-left-2', 1, [9, 0], [-9, 0]],
};
// Sharp: the shipped heads' true apex sat inside the drawing, where its round join painting 0.19
// past the rounded fillet cost nothing. At the outer end it is the extreme, so it slides back along
// its bisector onto the rounded fillet's extreme (4.8947 on from the wings, sharp.md's slide-back:
// the wings, the far ends, stay put) and the wing stubs are cut again along the arms it leaves.
const WING_TO_APEX = 4.8947;
function settleApex(sub, axis) {
  const n = numsOf(sub);
  if (n.length !== 10) return sub;                       // shafts pass through; a head is stub, wing, apex, wing, stub
  const p = [0, 2, 4, 6, 8].map((i) => [n[i], n[i + 1]]);
  const along = 1 - axis, dir = Math.sign(p[2][along] - p[1][along]);
  const apex = [...p[2]];
  apex[along] = p[1][along] + dir * WING_TO_APEX;
  return poly([stubOut(p[1], apex), p[1], apex, p[3], stubOut(p[3], apex)]);
}
for (const [name, [src, axis, lo, hi]] of Object.entries(PAIR3)) {
  def(name, (sharp) => {
    const v = {};
    for (const style of STY) v[style] = PAIR2_SHIPPED[src][C(sharp)][style].map(([k, d]) => ({
      kind: k === 'm' ? 'muted' : 'stroke',
      d: subs(d).map((s) => {
        const [dx, dy] = meanAxis(s, axis) < 12 ? lo : hi;
        return X.shift(sharp ? settleApex(s, axis) : s, dx, dy);
      }).join(''),
    }));
    return v;
  }, [1, 1, 23, 23]);
}

/* ------------------------------------------------------- chevrons-down-up */
// Zafar's `collapse`: the other set's chevrons-down-up, taken name to name. It is our own
// chevrons-up-down with each chevron turned over where it stands, so the two point at each other;
// every variant is that one's with the flip, tones included (the top chevron grey).
def('chevrons-down-up', (sharp) => {
  const v = {};
  for (const style of STY) v[style] = rawLayers('chevrons-up-down', style, C(sharp)).map(({ kind, d }) => ({
    kind,
    d: subs(d).map((s) => { const top = meanAxis(s, 1) < 12; return mapPts(s, ([x, y]) => [x, top ? 13 - y : 35 - y]); }).join(''),
  }));
  return v;
}, [6, 3, 18, 21]);

/* ------------------------------------------------- fold-vertical, -horizontal */
// Zafar's `compact-1` and `compact-flip` (refs/; `compact-2` and `compact-2-flip` were the same two
// files): two short arrows pointing at a rule, the other set's fold-vertical and fold-horizontal
// taken name to name. Theirs dashes the rule; Zafar's is solid and stays solid. Arrows 6 long with a
// head 3 back and 3 either side, apexes 2 clear of the rule, which runs 5..19. Two-tone and
// duotone grey the rule, the part both arrows share, as download greys its tray; fill is the
// stroke. fold-horizontal is fold-vertical with x and y swapped.
function foldVertical(sharp) {
  const arrow = (tail, apex) => {
    const dir = Math.sign(apex - tail), wy = apex - 3 * dir;
    const shaft = openRun([[12, tail], [12, apex]], sharp, 'start');
    const head = openRun([[9, wy], [12, apex], [15, wy]], sharp);
    return shaft + head;
  };
  const arrows = arrow(2, 8) + arrow(22, 16), rule = openRun([[5, 12], [19, 12]], sharp);
  return { stroke: [S(arrows + rule)], 'two-tone': [M(rule), S(arrows)], duotone: [M(rule), S(arrows)], fill: [S(arrows + rule)] };
}
def('fold-vertical', foldVertical, [4, 1, 20, 23]);
def('fold-horizontal', (sharp) => {
  const v = foldVertical(sharp), t = (d) => mapPts(d, ([x, y]) => [y, x]);
  return Object.fromEntries(STY.map((s) => [s, v[s].map(({ kind, d }) => ({ kind, d: t(d) }))]));
}, [1, 4, 23, 20]);

/* ------------------------------------------------------------------- diff */
// The ref was our own plus raised 2 over our minus on y=21, the other set's diff, name to name:
// 16 by 20 of ink, which the size rule reads as a vertical drawing short of 22. Here the plus
// takes arms of 8 (path 4..20 by 2..18) and the minus the same width on y=22, 2 under the plus's
// foot, so the ink is 18 by 22, the vertical band. A symbol glyph: every style the stroke,
// black, as percent and command ship.
def('diff', (sharp) => allStroke(openRun([[12, 2], [12, 18]], sharp) + openRun([[4, 10], [20, 10]], sharp) + openRun([[4, 22], [20, 22]], sharp)), [3, 1, 21, 23]);

/* ------------------------------------------------------------------ ratios */
// Aspect ratios (Zafar's ask, 11 Oct 2026). A ratio is the shape itself, so each is one rounded
// rectangle, sized as the size rule sizes a rectangle: its long side 22 of ink (path 20, as the
// horizontal and vertical bands have it), its short side the even number nearest the ratio,
// since an odd side cannot sit on whole equal paddings. 4:3 draws 20 by 16 (1.25; 14 would be
// 3:2's), 3:2 20 by 14 (1.43), 16:9 20 by 12 (1.67), 21:9 20 by 8 (2.50); 5:4 is left out
// because it is 4:3's 16. ratio-1-1 is square file for file (the square band's 20), as clock-3
// is clock. Radii by the ladder on the short side, as the set's own rectangles take them: 12 and
// up is a body at r=3 (monitor is 20 by 12 at 3), under that a mid-size part at r=2 (input is
// 20 by 10 at 2), so 21:9 turns at 2 where 3 would leave it a pill. One shape: duotone is the
// stroke, two-tone the plate under it.
const RATIOS = {
  'ratio-1-1': [18, 18], 'ratio-4-3': [20, 16], 'ratio-3-4': [16, 20], 'ratio-3-2': [20, 14],
  'ratio-2-3': [14, 20], 'ratio-16-9': [20, 12], 'ratio-9-16': [12, 20], 'ratio-21-9': [20, 8],
};
for (const [name, [w, h]] of Object.entries(RATIOS)) {
  def(name, (sharp) => {
    if (w === h) return Object.fromEntries(STY.map((s) => [s, rawLayers('square', s, C(sharp))]));
    const r = sharp ? 0 : Math.min(w, h) >= 12 ? 3 : 2;
    const body = polyLA([[12 - w / 2, 12 - h / 2], [12 + w / 2, 12 - h / 2], [12 + w / 2, 12 + h / 2], [12 - w / 2, 12 + h / 2]], [r, r, r, r]);
    const d = dLA(body), plate = E(geo(grow(body)));
    return { stroke: [S(d)], 'two-tone': [Pl(plate), S(d)], duotone: [S(d)], fill: [F(plate)] };
  }, [11 - w / 2, 11 - h / 2, 13 + w / 2, 13 + h / 2]);
}

/* ---------------------------------------------------------------- aspect-ratio */
// Zafar's ask (11 Oct 2026, with a reference): one aspect-ratio drawing beside the ratios, a frame
// with a corner mark in two opposite corners. The frame is 5:4, 20 by 16 (path 2..22 by 4..20) at
// r=3, the house body; each mark is a corner with arms of 4, set 4 in from the frame on both axes
// so it stands 2 clear of it, top right and bottom left as the free diagonal runs. A mark is a
// small detail, so it turns at r=1 (r=2, maximize's corner halved, read rounder than the frame
// round it: Zafar, 11 Oct 2026); at 1 its outer edge turns at 2, as the frame's inner edge does
// beside it. Tones as input's: the plate under the stroke in two-tone, the marks black on the
// grey body in duotone and cut out of the solid in fill. Sharp: the frame square, each mark's
// corner true and its ends a unit on.
function aspectRatio(sharp) {
  const frame = polyLA([[2, 4], [22, 4], [22, 20], [2, 20]], sharp ? [0, 0, 0, 0] : [3, 3, 3, 3]);
  const d = dLA(frame), plate = geo(grow(frame));
  const marks = sharp
    ? openRun([[14, 8], [18, 8], [18, 12]], true) + openRun([[6, 12], [6, 16], [10, 16]], true)
    : openD([[14, 8], [18, 8], [18, 12]], [0, 1, 0]) + openD([[6, 12], [6, 16], [10, 16]], [0, 1, 0]);
  return {
    stroke: [S(d + marks)], 'two-tone': [Pl(E(plate)), S(d + marks)], duotone: [Pl(E(plate)), S(marks)],
    fill: [F(E(B.subtract(plate, B.union(...bandsOf(marks, sharp).map((r) => [r])))))],
  };
}

/* ------------------------------------------------------- undo, redo, -dot */
// Zafar's ask: "we don't have undo and undo-dot". Built from rotate-ccw, the set's own curved arrow:
// its arc and its corner head, an L with r=0.5 at the corner whose bisector runs along the arc's
// tangent. Here the arc sweeps 135 degrees, from its free end pointing down on the right up over
// the top to 45 degrees on the left, where the tangent runs at 45 degrees and the head is
// therefore square to the axes. A horizontal drawing, so 22 wide by the size rule: the free end on
// x=22 and the corner on x=2. That fixes the arc against the gap g it leaves before the corner,
// r (1 + 1/sqrt 2) + g/sqrt 2 = 20; r=11.5 about (10.5, 18) leaves g = 0.52, the nearest of the
// half steps to rotate-ccw's 0.76 (r=11 would leave 1.73 of straight before the corner). The arms
// are 4.24, the length that takes the upper one to y=6, so the ink is 1..23 by 5..19, whole on
// both axes (the arc alone stands 5.5 off the top). The -dot puts a 4 dot on the arc's centre
// line, its foot on 19 with the arc's free end: the 2 mark it began as read small (Zafar, 11 Oct
// 2026) and a 3 bead is still a speck at 16. Its arrow goes grey there, as history greys
// rotate-ccw's under its hands. redo and redo-dot are the mirrors, as the other set pairs them.
// Sharp: the arc's free end a unit on, its other end run on to the corner, the corner true and
// each arm a unit on.
const UNDO = { c: [10.5, 18], r: 11.5, corner: 2, top: 6 };
UNDO.g = (UNDO.c[0] - UNDO.r / R2 - UNDO.corner) * R2;
function undoArrow(sharp) {
  const { c, r, g, corner: x, top } = UNDO;
  const end = [c[0] - r / R2, c[1] - r / R2], t = [-1 / R2, 1 / R2];
  const k = L.add(end, L.mul(t, g)), arm = k[1] - top;
  assert(Math.abs(k[0] - x) < 1e-9 && Math.abs(c[0] + r - 22) < 1e-9, 'undo off the 2..22 path');
  const arc = (sharp ? `M${P([c[0] + r, c[1] + 1])}L${P([c[0] + r, c[1]])}` : `M${P([c[0] + r, c[1]])}`) + L.arcC(c, r, 0, -135) + (sharp ? `L${P(k)}` : '');
  const head = sharp
    ? poly([[x, top - 1], k, [k[0] + arm + 1, k[1]]])
    : `M${P([x, top])}L${P([x, k[1] - 0.5])}C${P([x, k[1] - 0.5 + 0.5 * 0.5523])} ${P([x + 0.5 - 0.5 * 0.5523, k[1]])} ${P([x + 0.5, k[1]])}L${P([k[0] + arm, k[1]])}`;
  return arc + head;
}
const UNDO_DOT = L.circle([UNDO.c[0], 17], 2);
const mirrorAll = (v) => Object.fromEntries(STY.map((s) => [s, v[s].map(({ kind, d }) => ({ kind, d: X.mirrorX(d) }))]));
const undo = (sharp) => allStroke(undoArrow(sharp));
const undoDot = (sharp) => {
  const a = undoArrow(sharp);
  return { stroke: [S(a), F(UNDO_DOT)], 'two-tone': [M(a), F(UNDO_DOT)], duotone: [M(a), F(UNDO_DOT)], fill: [S(a), F(UNDO_DOT)] };
};
def('aspect-ratio', aspectRatio, [1, 3, 23, 21]);
def('undo', undo, [1, 5, 23, 19]);
def('undo-dot', undoDot, [1, 5, 23, 19]);
def('redo', (sharp) => mirrorAll(undo(sharp)), [1, 5, 23, 19]);
def('redo-dot', (sharp) => mirrorAll(undoDot(sharp)), [1, 5, 23, 19]);

/* -------------------------------------------------------------- text-cursor */
// Zafar's I-beam (refs/): serifs that sweep out of the stem in one curve each. Zafar drew it 7 wide
// about x=12.5 (ink 8 and 7 off the edges) and 18 tall; here it sits on x=12, spreads 8 (path
// 8..16) and stands 2..22, the vertical band's 22, so the ink is 7..17 by 1..23 on whole paddings, and each serif lands flat (its last handle on the
// tip's own row), which is what lets the sharp stub reach the box on both axes. The other set's
// name, name to name. One element: every style the stroke.
function textCursor(sharp, cx = 12, y0 = 2, y1 = 22) {
  const h = 2.25, w = 4, a = [0.4444, 0.5625], b = [1.8667, h];
  const serif = (sx, sy) => {
    // from the stem at (cx, y0 + h) out to (cx + sx * w, y0); sy flips it for the bottom pair
    const p0 = [cx, sy > 0 ? y0 + h : y1 - h], tipY = sy > 0 ? y0 : y1;
    const p1 = [cx + sx * a[0], p0[1] - sy * a[1]], p2 = [cx + sx * b[0], tipY], p3 = [cx + sx * w, tipY];
    return `M${P(p0)}C${P(p1)} ${P(p2)} ${P(p3)}` + (sharp ? `L${P([p3[0] + sx, tipY])}` : '');
  };
  return serif(-1, 1) + serif(1, 1) + `M${P([cx, y0 + h])}L${P([cx, y1 - h])}` + serif(1, -1) + serif(-1, -1);
}
def('text-cursor', (sharp) => allStroke(textCursor(sharp)), [7, 1, 17, 23]);

/* -------------------------------------------------------------- shuffle-2 */
// Zafar's `arrows-crossing`: two straight arrows crossing on the diagonals, both heads on the right,
// a second drawing of shuffle. The heads are move-up-right's corner (arms 6 on the axes, r=0.5,
// the shaft stopping 0.6 short of it on each axis, 0.1757 in sharp). The descending arrow breaks
// where it passes under the other, its cut ends 4 from the other's centre line (2 painted each
// side; 3 in sharp, where the butt face is the end), and goes grey in two-tone and duotone, as
// shuffle's broken strand does. Ink 2..22.
function shuffle2(sharp) {
  const s = sharp ? 0.1757 : 0.6, cut = (sharp ? 3 : 4) / R2;
  const corner = (cy, dir) => sharp
    ? poly([[14, cy], [21, cy], [21, cy - dir * 7]])
    : `M15 ${cy}L20.5 ${cy}C${P([20.5 + 0.2761, cy])} ${P([21, cy - dir * (0.5 - 0.2761)])} ${P([21, cy - dir * 0.5])}L21 ${cy - dir * 6}`;
  const front = openRun([[3, 21], [21 - s, 3 + s]], sharp, 'start') + corner(3, -1);
  const back = openRun([[3, 3], [12 - cut, 12 - cut]], sharp, 'start') + poly([[12 + cut, 12 + cut], [21 - s, 21 - s]]) + corner(21, 1);
  return { stroke: [S(back + front)], 'two-tone': [M(back), S(front)], duotone: [M(back), S(front)], fill: [S(back + front)] };
}
def('shuffle-2', shuffle2, [2, 2, 22, 22]);

/* --------------------------------------------------------- arrow-right-left-4 */
// Zafar's `arrows`: the exchange pair drawn with a single barb each, on the outside, right on top and
// left below as arrow-right-left runs, so a fourth drawing of that name (-3 is the short pair slid
// apart, one of four, so the four keep one number). Zafar's barbs leaned at 53
// degrees; here they take the house 45 and the long arrows' head of 4 (back 4, out 4), the apex
// left to the round join as move-right's. Top grey in two-tone and duotone, as arrow-right-left's.
// Zafar's shafts ran 4..20 on rows 9 and 15, 18 by 16 of ink, which the size rule reads as a horizontal
// drawing short of 22; spread to shafts 3..21 on rows 8 and 16 it is 20 by 18, arrow-right-left's
// own width, and reads square. Ink 2..22 by 3..21.
function arrowRightLeft4(sharp) {
  // one run each, so the apex is a round join and not two butt ends meeting at an angle in sharp
  const top = openRun([[3, 8], [21, 8], [17, 4]], sharp), bottom = openRun([[21, 16], [3, 16], [7, 20]], sharp);
  return { stroke: [S(top + bottom)], 'two-tone': [M(top), S(bottom)], duotone: [M(top), S(bottom)], fill: [S(top + bottom)] };
}
def('arrow-right-left-4', arrowRightLeft4, [2, 3, 22, 21]);

/* ------------------------------------------------------------- open runs */
const ang = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
/** An open polyline with a fillet of radii[i] at each interior vertex, as line and arc segments. */
function openLA(pts, radii) {
  const out = [];
  let prev = pts[0];
  for (let i = 1; i < pts.length - 1; i++) {
    const r = radii[i] || 0;
    if (r <= 1e-9) { out.push(A.Ls(prev, pts[i])); prev = pts[i]; continue; }
    const f = L.fillet(pts[i - 1], pts[i], pts[i + 1], r);
    let a0 = ang(f.F, f.T1), a1 = ang(f.F, f.T2);
    while (a1 - a0 > 180) a1 -= 360;
    while (a0 - a1 > 180) a1 += 360;
    out.push(A.Ls(prev, f.T1), A.As(f.F, r, a0, a1));
    prev = f.T2;
  }
  out.push(A.Ls(prev, pts.at(-1)));
  return out;
}
const openD = (pts, radii) => dLA(openLA(pts, radii), false);
const transposeAll = (v) => Object.fromEntries(STY.map((s) => [s, v[s].map(({ kind, d }) => ({ kind, d: mapPts(d, ([x, y]) => [y, x]) }))]));
const fromRaw = (name, f, container = 'regular') => (sharp) => Object.fromEntries(STY.map((s) => [s, rawLayers(name, s, C(sharp), container).map(f)]));

/* ---------------------------------------------------------------- keyframes */
// Zafar's `frames`: a keyframe (a rhombus) with the next one showing behind it as a chevron, the
// animation timeline's mark. Rebuilt on Zafar's proportions with the grid's numbers: the rhombus's
// sides lean 2 in 3 off the vertical (Zafar's 0.654), its acute top and bottom filleted r=1 (Zafar's 1.3:
// a sharp apex wants the smaller rung) and its obtuse sides r=0.5, every extreme on 2..22. The
// chevron runs parallel to the rhombus's right sides, 2.27 clear, its ends on y=3 and 21 as Zafar
// drew them. Front black, back grey (styles.md): duotone the rhombus solid and the chevron a grey
// stroke, fill the rhombus solid and the chevron black. Sharp: every vertex true, sitting where
// its rounded fillet's extreme was, the chevron's ends stubbed along their own lean.
function keyframes(sharp) {
  const phi = Math.atan(2 / 3), beta = Math.PI / 2 - phi, rt = 1, rs = 0.5;
  const H = 9 + rt / Math.sin(phi) - rt, W = H * Math.tan(phi), inset = rs / Math.sin(beta) - rs;
  const cx = 3 + W - inset, xv = 21 + inset;
  let front, chev;
  if (!sharp) {
    front = polyLA([[cx, 12 - H], [cx + W, 12], [cx, 12 + H], [cx - W, 12]], [rt, rs, rt, rs]);
    chev = openLA([[xv - 6, 3], [xv, 12], [xv - 6, 21]], [0, rs, 0]);
  } else {
    // the true vertices where the fillets' extremes were, so a round join paints the same box;
    // the chevron's ends keep the rounded drawing's x and are stubbed along the arms they leave
    front = polyLA([[cx, 3], [cx + W - inset, 12], [cx, 21], [3, 12]], [0, 0, 0, 0]);
    const v = [21, 12];
    chev = [A.Ls(stubOut([xv - 6, 3], v), v), A.Ls(v, stubOut([xv - 6, 21], v))];
  }
  const fD = dLA(front), cD = dLA(chev, false), solid = E(geo(grow(front)));
  return { stroke: [S(fD + cD)], 'two-tone': [Pl(solid), S(fD + cD)], duotone: [F(solid), M(cD)], fill: [F(solid), S(cD)] };
}
def('keyframes', keyframes, [2, 2, 22, 22]);

/* ----------------------------------------------------------------- card-sim */
// The ref, the other set's name: a card with its corner cut 5 on each axis, every corner r=2 as
// Zafar drew it (the card's short side puts it on the mid-size rung, and 2 fills to 3), and a
// 6-unit chip at r=1 (a small detail) 2 clear of the walls and the floor. Zafar's card was 14 by
// 18, 16 by 20 of ink, which the size rule reads as a vertical drawing short of 22: here it is
// 14 by 20 (path 5..19 by 2..22), the narrow vertical band, 16 by 22, its width kept. Duotone:
// the card grey and the chip a black solid over it (details as black solids); fill: the card
// solid with the chip's outline cut out. Sharp: every corner true.
function cardSim(sharp) {
  const r = sharp ? 0 : 2, rc = sharp ? 0 : 1;
  const body = polyLA([[5, 2], [14, 2], [19, 7], [19, 22], [5, 22]], [r, r, r, r, r]);
  const chip = polyLA([[9, 12], [15, 12], [15, 18], [9, 18]], [rc, rc, rc, rc]);
  const plate = geo(grow(body)), ring = B.subtract(geo(grow(chip)), geo(offsetLA(chip, -1)));
  const d = dLA(body) + dLA(chip);
  return { stroke: [S(d)], 'two-tone': [Pl(E(plate)), S(d)], duotone: [Pl(E(plate)), F(E(geo(grow(chip))))], fill: [F(E(B.subtract(plate, ring)))] };
}
def('card-sim', cardSim, [4, 1, 20, 23]);

/* ---------------------------------------------------------------------- box */
// Zafar's `box`, the other set's name: the isometric box. It is our package without its tape, every
// variant, so the two read as one object with and without the tape: package's widened body (Zafar's
// was the old narrow one, its top and bottom vertices painting 1.29 off the edges) and its seams
// running to the outline. Duotone is package's dark lid with the tape's cut filled back in: the
// top face and the V down to its lower ink edge, the round join kept at the vertex.
const isTape = (s) => /^M7 4\.[34]/.test(s);
function box(sharp) {
  const out = {};
  for (const style of STY) out[style] = rawLayers('package', style, C(sharp)).map(({ kind, d }) => ({ kind, d: subs(d).filter((s) => !isTape(s)).join('') }));
  const plate = B.runFromD(rawLayers('package', 'duotone', C(sharp)).find((l) => l.kind === 'plate').d);
  // the region above the V's lower edge: each arm offset a unit down, joined round about (12,12)
  const a = sharp ? [2, 6.8477] : [2.3084, 7.0066], d = unit(L.sub([12, 12], a)), n = [-d[1], d[0]];
  const pl = L.add([12, 12], n), pr = [24 - pl[0], pl[1]], far = 30;
  const above = `M${P(L.sub(pl, L.mul(d, far)))}L${P(pl)}` + L.arcC([12, 12], 1, ang([12, 12], pl), ang([12, 12], pr))
    + `L${P(L.add(pr, L.mul([d[0], -d[1]], far)))}L${P([pr[0] + far, -40])}L${P([pl[0] - far, -40])}Z`;
  const lid = B.intersect(plate, B.runFromD(above));
  out.duotone = [Pl(E(plate)), F(E(lid))];
  return out;
}
def('box', box, [1, 1, 23, 23]);

/* ------------------------------------------------------------- grid-masonry */
// Zafar's `masonry`: grid-2x2's frame with the rows split off-centre, top at x=9 and bottom at x=15,
// as bricks are laid. Every style is grid-2x2's: the frame's plate grey and the lines black,
// stopping 2 short of the plate's edge, in duotone; in fill the lines cut out of the solid, square
// ended 2 inside it.
function gridMasonry(sharp) {
  const frame = polyLA([[3, 3], [21, 3], [21, 21], [3, 21]], sharp ? [0, 0, 0, 0] : [3, 3, 3, 3]);
  const lines = 'M3 12L21 12M9 3L9 12M15 12L15 21';
  const e = sharp ? 4 : 5, f = 24 - e;
  const inner = `M${e} 12L${f} 12M9 ${e}L9 12M15 12L15 ${f}`;
  const plate = geo(grow(frame));
  const cut = B.runFromD('M4 11L8 11L8 4L10 4L10 11L20 11L20 13L16 13L16 20L14 20L14 13L4 13Z');
  return { stroke: [S(dLA(frame) + lines)], 'two-tone': [Pl(E(plate)), S(dLA(frame) + lines)], duotone: [Pl(E(plate)), S(inner)], fill: [F(E(B.subtract(plate, cut)))] };
}
def('grid-masonry', gridMasonry, [2, 2, 22, 22]);

/* ------------------------------------------------------------ layout-bento */
// Zafar's `bento-grid` is layout-dashboard turned on its diagonal, tile for tile (Zafar's four tiles are
// its four, x for y, r=1 as there), so every variant is that one's with x and y swapped: the
// bento's rows of mixed widths beside the dashboard's columns of mixed heights.
def('layout-bento', (sharp) => transposeAll(fromRaw('layout-dashboard', (l) => l)(sharp)), [2, 2, 22, 22]);

/* ------------------------------------------------------ flip-2-horizontal, -vertical */
// Zafar's `scan-half-dashed` and its flip: the square with one half drawn and the other dashed across
// a solid axis, the flip that shows an object and where its mirror will land. A second drawing of
// flip-horizontal (which mirrors two triangles), so -2 on the base. Not scan's corners: it is the
// square, r=3 (Zafar's 2.5 is off the ladder), its dashed half square-dashed's own right-hand dashes
// so the rhythm is the set's, and both halves' ends 2 clear of the axis, on x=8 and x=16: the
// corner dashes run on along the top and the floor to meet it (where square-dashed stops them,
// they stood 4 off the axis against the drawn half's 2: Zafar, 11 Oct 2026). Mirrors put
// their shapes grey and the axis black (flip-horizontal): duotone the drawn half a grey solid and
// the dashes grey, two-tone its plate under the whole stroke, fill it solid with the rest stroked.
function flip2(sharp) {
  const half = sharp ? 'M9 3L3 3L3 21L9 21' : openD([[8, 3], [3, 3], [3, 21], [8, 21]], [0, 3, 3, 0]);
  const axis = sharp ? 'M12 2L12 22' : 'M12 3L12 21';
  const dashes = sharp ? 'M15 3L21 3L21 7M21 9.5L21 14.5M21 17L21 21L15 21' : 'M16 3L18 3C19.6569 3 21 4.3431 21 6M21 10.5L21 13.5M21 18C21 19.6569 19.6569 21 18 21L16 21';
  // the drawn half filled to its outer edge: the bracket grown a unit, closed 2 short of the axis
  const solid = E(geo(polyLA([[2, 2], [9, 2], [9, 22], [2, 22]], sharp ? [1, 0, 0, 1] : [4, 1, 1, 4])));
  return {
    stroke: [S(half + axis + dashes)],
    'two-tone': [Pl(solid), S(half + axis + dashes)],
    duotone: [Pl(solid), M(dashes), S(axis)],
    fill: [F(solid), S(axis + dashes)],
  };
}
def('flip-2-horizontal', flip2, [2, 2, 22, 22]);
def('flip-2-vertical', (sharp) => transposeAll(flip2(sharp)), [2, 2, 22, 22]);

/* ------------------------------------------------------------------ compact */
// Zafar's `compact`: two lines of text held by two opposite corners, the summary a long thread is
// compacted into. Corners r=3 as scan's (Zafar's 2.5 is off the ladder), the lines 2 clear of the
// walls. Two-tone and duotone grey the corners and keep the text black, as scan-text does; fill
// is the stroke.
function compact(sharp) {
  const cornerTR = sharp ? 'M7 4L20 4L20 17' : openD([[8, 4], [20, 4], [20, 16]], [0, 3, 0]);
  const cornerBL = sharp ? 'M17 20L4 20L4 7' : openD([[16, 20], [4, 20], [4, 8]], [0, 3, 0]);
  const lines = openRun([[8, 10], [16, 10]], sharp) + openRun([[8, 14], [14, 14]], sharp);
  const frame = cornerTR + cornerBL;
  return { stroke: [S(frame + lines)], 'two-tone': [M(frame), S(lines)], duotone: [M(frame), S(lines)], fill: [S(frame + lines)] };
}
def('compact', compact, [3, 3, 21, 21]);

/* --------------------------------------------------------- connection, connections */
// Zafar's `two-circles-linked` and `two-circles-linked-2`: two nodes joined on the free diagonal, and
// the same pair with two more nodes standing apart in the other corners. The second is not a
// second drawing of one connection, which is what a -2 would promise, but one among several
// nodes, so it is `connections`, plural as users is (asked 11 Oct 2026). Rings r=3.5 as Zafar drew
// them; the link runs centre line to centre line, ring to ring, exactly on the diagonal (Zafar's ends
// sat 0.03 off it). Nodes as git's: two-tone a plate under each ring; duotone the rings grey discs
// and the link black over them; fill the discs solid and the link stroked. Nothing ends free, so
// sharp is the same drawing.
function nodes(rings, links) {
  const ringD = rings.map(([c, r]) => L.circle(c, r)).join(''), linkD = links.map(([a, b]) => poly([a, b])).join('');
  const discs = rings.map(([c, r]) => L.circle(c, r + 1)).join('');
  return { stroke: [S(ringD + linkD)], 'two-tone': [Pl(discs), S(ringD + linkD)], duotone: [Pl(discs), S(linkD)], fill: [F(discs), S(linkD)] };
}
const CONN = { a: [6.5, 17.5], b: [17.5, 6.5], r: 3.5 };
const connLink = () => { const o = CONN.r / R2; return [[CONN.a[0] + o, CONN.a[1] - o], [CONN.b[0] - o, CONN.b[1] + o]]; };
def('connection', () => nodes([[CONN.a, CONN.r], [CONN.b, CONN.r]], [connLink()]), [2, 2, 22, 22]);
def('connections', () => nodes([[CONN.a, CONN.r], [CONN.b, CONN.r], [[5.5, 5.5], CONN.r], [[18.5, 18.5], CONN.r]], [connLink()]), [1, 1, 23, 23]);

/* ------------------------------------------------------------------ webhook */
// Zafar's `three-circles-linked`, the other set's webhook, name to name: three r=3 nodes, each with a
// tail leaving it toward the next round the loop (top, bottom right, bottom left) and stopping 2
// clear of it. Zafar's tails left their rings at varying angles; here each runs radially along the
// line between the two centres, so the three are one construction. Nodes as git's, tails black.
// Sharp: each tail's free end stubbed along its own line.
function webhook(sharp) {
  const ns = [[12, 5], [19, 19], [5, 19]], r = 3;
  const tails = ns.map((c, i) => {
    const to = ns[(i + 1) % 3], u = unit(L.sub(to, c)), dist = Math.hypot(to[0] - c[0], to[1] - c[1]);
    return openRun([L.add(c, L.mul(u, r)), L.add(c, L.mul(u, dist - r - 4))], sharp, 'end');
  }).join('');
  const ringD = ns.map((c) => L.circle(c, r)).join(''), discs = ns.map((c) => L.circle(c, r + 1)).join('');
  return { stroke: [S(ringD + tails)], 'two-tone': [Pl(discs), S(ringD + tails)], duotone: [Pl(discs), S(tails)], fill: [F(discs), S(tails)] };
}
def('webhook', webhook, [1, 1, 23, 23]);

/* --------------------------------------------- braces-ellipsis, brackets-ellipsis */
// Zafar's `braces-with-dots` and `brackets-with-dots`: the shipped braces and brackets around an
// ellipsis of three 2 marks on a 4 pitch, the other set's word for three dots in a compound. The
// brackets hold the marks as shipped (2 clear of the stems); the braces stand further out, 2 each
// side (Zafar moved them 1, which left the marks 1.61 off the braces' bends), ink 1..23. Symbol glyphs: every style the
// stroke, marks black.
const ELLIPSIS = [8, 12, 16].map((x) => L.circle([x, 12], 1)).join('');
def('braces-ellipsis', (sharp) => {
  const d = rawLayers('braces', 'stroke', C(sharp))[0].d;
  return allStroke(subs(d).map((s) => X.shift(s, meanAxis(s, 0) < 12 ? -2 : 2, 0)).join(''), [F(ELLIPSIS)]);
}, [1, 1, 23, 23]);
def('brackets-ellipsis', (sharp) => allStroke(rawLayers('brackets', 'stroke', C(sharp))[0].d, [F(ELLIPSIS)]), [3, 1, 21, 23]);

/* --------------------------------------------------------- list-todo-circle */
// The ref: list-todo with round boxes, two r=3 rings (the node rung) beside its two rules,
// which Zafar set on rows 7 and 17. Two-tone as list-todo: plates under the rings, rules grey, rings
// black. Duotone greys the rings into discs and keeps the rules black (list-todo's grey rules
// would leave nothing black here, and no style is all grey). Fill the discs solid.
function listTodoCircle(sharp) {
  const rings = [7, 17].map((y) => L.circle([5, y], 3)).join(''), discs = [7, 17].map((y) => L.circle([5, y], 4)).join('');
  const rules = [7, 17].map((y) => openRun([[12, y], [22, y]], sharp)).join('');
  return { stroke: [S(rings + rules)], 'two-tone': [Pl(discs), M(rules), S(rings)], duotone: [Pl(discs), S(rules)], fill: [F(discs), S(rules)] };
}
def('list-todo-circle', listTodoCircle, [1, 3, 23, 21]);

/* -------------------------------------------------------- circle-dashed-user */
// Zafar's `user-circle-dashed` is circle-user's own glyph in circle-dashed's own ring, with the ring
// drawn solid along the bottom where the shoulders land. Named as the circle-dashed family is.
// The solid run takes the five lower dashes and the gaps between them, -9..189 degrees, so it reads
// as a ring solid along its lower half with three dashes over the head (11 Oct 2026: the three
// lower dashes alone, 36..144, still read as a dashed ring), and keeps the ring's rhythm at both
// ends, 27 degrees to the next dash (Zafar's own arc ran 30..150, 1.64 from the side dashes).
// Two-tone and duotone grey the dashes and keep the user black, as circle-dashed-check keeps its
// check; the solid arc goes black with the user, since the shoulders stand on it (one run, no grey
// and black meeting end to end). Fill is the stroke. Sharp: circle-dashed's sharp dashes, the arc's ends a unit on along
// its tangent as theirs are.
function circleDashedUser(sharp) {
  const dashes = subs(rawLayers('circle-dashed', 'stroke', C(sharp))[0].d).filter((s) => meanAxis(s, 1) < 10).join('');
  const c = [12, 12], a0 = -9, a1 = 189, p0 = L.onArc(c, 10, a0), p1 = L.onArc(c, 10, a1);
  const out0 = [Math.sin((a0 * Math.PI) / 180), -Math.cos((a0 * Math.PI) / 180)], out1 = [-out0[0], out0[1]];
  const arc = (sharp ? `M${P(L.add(p0, out0))}L${P(p0)}` : `M${P(p0)}`) + L.arcC(c, 10, a0, a1) + (sharp ? `L${P(L.add(p1, out1))}` : '');
  const user = rawLayers('user', 'stroke', C(sharp), 'circle')[0].d;
  return { stroke: [S(dashes + arc + user)], 'two-tone': [M(dashes), S(arc + user)], duotone: [M(dashes), S(arc + user)], fill: [S(dashes + arc + user)] };
}
def('circle-dashed-user', circleDashedUser, [1, 1, 23, 23]);

/* ======================================================= compounds on shipped bases */
import { sharpStar } from '../v8/halo.mjs';
const shapeOf = (d) => B.runFromD(d);
const bandsOf = (d, sharp) => B.runFromD(d).map((r) => B.band(r, sharp ? 'butt' : 'round'));
/** The painted box a shipped drawing's stroke variant has, so a compound that keeps the base's box asserts that one. */
const rawBox = (name, container = 'regular') => (sharp) => paintedBox(rawLayers(name, 'stroke', C(sharp), container), sharp);
/**
 * A body opened for a sign: the plate is what the cut stroke still encloses. Rounded: the outline's
 * interior less the notch, with the kept stroke's band added back, so each cut plate edge turns
 * round its cap (compounds.md, notch and round cap end together). Sharp: the base's own plate less
 * a square notch, the butt faces sitting on the notch lines (sharp.md, the notch law).
 */
function notchedPlate(sharp, { outline, kept, silhouette, notch }) {
  if (sharp) return B.subtract(shapeOf(silhouette), shapeOf(notch));
  // each band its own shape: overlapping runs inside one shape cancel under evenodd
  const region = typeof outline === 'string' ? shapeOf(outline) : outline;
  return B.union(B.subtract(region, shapeOf(notch)), ...bandsOf(kept, false).map((r) => [r]));
}
const SEARCH = (l, t, sharp) => L.circle([l + 2.5, t + 2.5], 2.5)
  + (sharp ? poly([[l + 4.2678, t + 4.2678], [l + 6.2929, t + 6.2929]]) : poly([[l + 4.5, t + 4.5], [l + 6, t + 6]]));

/* ---------------------------------------------------------------- home-smile */
// The ref: home-simple (home without its door) with a face, which is scan-face's own face
// moved half a unit down (eyes 10.5..11.5, mouth 15.5 dipping to 17) so it sits 2 clear of the
// roof and the floor. Sharp: the mouth's ends take the house stub (0.414 at 45 degrees); scan-face's
// sharp runs them a full unit, past its own round cap's box, which in this fill brings the mouth's
// cut within 1.59 of the eyes'. Tones as home-heart: the plate under the stroke; the body grey and the face
// black in duotone; the face cut out of the solid in fill.
const SMILE = (sharp) => sharp
  ? 'M9 9.5L9 12.5M15 9.5L15 12.5M8.7071 15.2071L9 15.5C10 16.5 11 17 12 17C13 17 14 16.5 15 15.5L15.2929 15.2071'
  : 'M9 10.5L9 11.5M15 10.5L15 11.5M9 15.5C10 16.5 11 17 12 17C13 17 14 16.5 15 15.5';
def('home-smile', (sharp) => {
  const body = rawLayers('home-simple', 'stroke', C(sharp))[0].d, face = SMILE(sharp);
  const plate = rawLayers('home-simple', 'two-tone', C(sharp)).find((l) => l.kind === 'plate').d;
  return {
    stroke: [S(body + face)], 'two-tone': [Pl(plate), S(body + face)], duotone: [Pl(plate), S(face)],
    fill: [F(E(B.subtract(shapeOf(plate), B.union(...bandsOf(face, sharp).map((r) => [r])))))],
  };
}, rawBox('home-simple'));

/* ----------------------------------------------------------------- file-diff */
// The ref, the other set's name: file's own outline with the diff mark inside it, a plus over
// a minus, 2 between them and 2 off the floor. Zafar left the fold out, and it has to stay out: under
// file's fold the mark fits at arms of 2 at most (the fold's arc sits 3.1 from a plus raised
// any higher), half the size the set draws a sign at. Tones as file-text: the plate under the
// stroke, the mark black on the grey body in duotone and cut out of the solid in fill.
def('file-diff', (sharp) => {
  const body = subs(rawLayers('file', 'stroke', C(sharp))[0].d)[0];
  const mark = openRun([[12, 8], [12, 14]], sharp) + openRun([[9, 11], [15, 11]], sharp) + openRun([[9, 18], [15, 18]], sharp);
  const plate = rawLayers('file', 'two-tone', C(sharp)).find((l) => l.kind === 'plate').d;
  return {
    stroke: [S(body + mark)], 'two-tone': [Pl(plate), S(body + mark)], duotone: [Pl(plate), S(mark)],
    fill: [F(E(B.subtract(shapeOf(plate), B.union(...bandsOf(mark, sharp).map((r) => [r])))))],
  };
}, rawBox('file'));

/* ------------------------------------------------------------------ inbox-dot */
// The ref: inbox with the dot badge on its top right, hung above the tray at the family's r=3,
// which painted 1 at the top against 3 at the bottom. inbox and inbox-dot are a state pair, so the
// tray stays where the bare inbox has it and the badge goes inside the tray's own box, smaller as
// it must (Zafar's ruling, 27 Sep 2026). r=3 does not fit there: flush in the corner at (19, 7) it
// needs 7 of clear stroke round it and the tray line at (19, 13) is 6 away. r=2.5 at (19.5, 6.5)
// clears the tray line but puts the notch line on y=12, so the right side ends on the tray line
// and the tray's T becomes a bare corner. r=2 at (20, 6) is flush in the corner (17..23 by 3..9 of
// ink), keeps the T and the right side's stub, and the drawing keeps the inbox's own paddings.
// The tray is notched as mail-dot's body is: notch lines x=15 and y=11, 2 off the ring's ink, r=3
// inside the corner; the top ends on x=14 and the right side on y=12, each cap's far side on its
// line. Two-tone keeps the badge's centre, fill loses it (the message family's dot rule).
const DOT = { c: [20, 6], r: 2 };
def('inbox-dot', (sharp) => {
  const ring = L.circle(DOT.c, DOT.r), tray = 'M2 13L8 13L10 16L14 16L16 13L22 13';
  let kept;
  if (sharp) {
    // the slanted wall's butt face: its outer corner on y = 11 (sharp.md, the notch law)
    const a = [17, 4], b = [22, 12.1534], d = unit(L.sub(b, a)), n = [d[1], -d[0]];
    const t = (11 - n[1] - a[1]) / d[1], e = L.add(a, L.mul(d, t));
    kept = `M${P(e)}L22 12.1534L22 20L2 20L2 12.1534L7 4L15 4`;
  } else {
    // the right side's cap on y = 12, on the fillet that turns the wall down into the tray's corner
    const f = { t: 'C', p: [[21.5574, 11.4317], [21.8468, 11.9036], [22, 12.4464], [22, 13]] };
    const s = L.bisect((u) => L.segAt(f, u)[1] - 12, 0, 1), piece = L.segPiece(f, s, 1);
    kept = `M${P(piece.p[0])}C${P(piece.p[1])} ${P(piece.p[2])} ${P(piece.p[3])}L22 17C22 18.6569 20.6569 20 19 20L5 20C3.3431 20 2 18.6569 2 17L2 13C2 12.4464 2.1532 11.9036 2.4426 11.4317L6.122 5.4317C6.6675 4.5422 7.636 4 8.6794 4L14 4`;
  }
  const outline = rawLayers('inbox', 'stroke', C(sharp))[0].d;
  // Rounded, the right side's cap sits on the slant's fillet a little right of where the slant
  // crosses the notch line, so the outline's interior stops short of the cap and the plate dips
  // between them. Filled out under the notch line to the cap's centre, the plate's edge runs flat
  // along y = 11 into the cap's top, which it meets on its tangent.
  const capX = sharp ? 0 : X.parseD(kept)[0].p[0][0];
  const plate = notchedPlate(sharp, {
    outline: sharp ? subs(outline)[0] : B.union(shapeOf(subs(outline)[0]), shapeOf(`M${capX - 1} 10L${capX} 10L${capX} 12L${capX - 1} 12Z`)), kept,
    silhouette: rawLayers('inbox', 'two-tone', C(sharp)).find((l) => l.kind === 'plate').d,
    notch: sharp ? 'M15 -10L15 11L40 11L40 -10Z' : 'M15 -10L15 8C15 9.6569 16.3431 11 18 11L40 11L40 -10Z',
  });
  const fillTray = rawLayers('inbox', 'fill', C(sharp)).find((l) => l.kind === 'solid').d;
  return {
    stroke: [S(kept + tray + ring)],
    'two-tone': [Pl(E(B.union(plate, [B.runFromD(L.circle(DOT.c, DOT.r + 1))[0]]))), S(kept + tray + ring)],
    duotone: [Pl(E(plate)), S(tray + ring)],
    fill: [F(fillTray), S(kept + tray + ring)],
  };
}, rawBox('inbox'));

/* ------------------------------------------------------------- handbag-search */
// The ref: the handbag with the search sign in the bottom-right 6 box, flush on the bag's ink
// corner (path 14..20 by 15..21). The sign is the set's own (folder-search's lens, r=2.5; Zafar's was
// 2.67). Notch lines x=11 and y=12; the bottom ends on x=10 and the right side on y=11, as Zafar cut
// them, caps' far sides on the lines. Tones as heart-plus: the bag a notched grey plate and the
// sign black in duotone, the plate solid and the sign stroked in fill.
def('handbag-search', (sharp) => {
  const handle = sharp ? 'M8 7C8 4.7909 9.7909 3 12 3C14.2091 3 16 4.7909 16 7' : 'M8 7C8 4.790861 9.790861 3 12 3C14.209139 3 16 4.790861 16 7';
  const kept = sharp ? 'M11 21L4 21L4 7L20 7L20 12' : 'M10 21L7 21C5.3431 21 4 19.6569 4 18L4 10C4 8.3431 5.3431 7 7 7L17 7C18.6569 7 20 8.3431 20 10L20 11';
  const sign = SEARCH(14, 15, sharp);
  const body = sharp ? 'M4 7L20 7L20 21L4 21Z' : dLA(polyLA([[4, 7], [20, 7], [20, 21], [4, 21]], [3, 3, 3, 3]));
  const notch = sharp ? 'M11 40L11 12L40 12L40 40Z' : 'M11 40L11 15C11 13.3431 12.3431 12 14 12L40 12L40 40Z';
  const silhouette = rawLayers('handbag', 'two-tone', C(sharp)).find((l) => l.kind === 'plate').d;
  const plate = sharp
    ? B.subtract(shapeOf(silhouette), shapeOf(notch))
    : B.union(B.subtract(shapeOf(body), shapeOf(notch)), ...bandsOf(kept + handle, false).map((r) => [r]));
  return { stroke: [S(handle + kept + sign)], 'two-tone': [Pl(E(plate)), S(handle + kept + sign)], duotone: [Pl(E(plate)), S(sign)], fill: [F(E(plate)), S(sign)] };
}, rawBox('handbag'));

/* ----------------------------------------------------- shopping-basket-search */
// The ref: shopping-basket-plus with the plus swapped for the search sign. The set's sign
// (r=2.5 lens; Zafar's was 2.67) in the plus's own box paints the plus's own 15..23 by 14..22, so the
// basket keeps every cut and notch it ships with; only the sign changes, every style.
const PLUS_IN_BASKET = { regular: 'M19 15L19 21M16 18L22 18', sharp: 'M19 14L19 22M15 18L23 18' };
def('shopping-basket-search', (sharp) => {
  const sign = SEARCH(16, 15, sharp), plus = PLUS_IN_BASKET[C(sharp)];
  return Object.fromEntries(STY.map((s) => [s, rawLayers('shopping-basket-plus', s, C(sharp)).map(({ kind, d }) => {
    if (!d.includes(plus)) return { kind, d };
    return { kind, d: d.replace(plus, sign) };
  })]));
}, rawBox('shopping-basket-plus'));

/* ------------------------------------------------------------- badge-terminal */
// The ref: the badge with a prompt in its well. Zafar's prompt was terminal's at half size, which
// sits 1.74 off the well's inner edge (badge signs clear it by 2: drawing-a-new-icon.md, the
// scalloped badge). Here it is square-terminal's own construction, a straight chevron and an
// underscore, scaled about the centre as a containered glyph is: 0.71, the one scale that keeps the
// underscore 2 off the chevron (5.66s - 2) and the ink 2 inside the well (7.07s + 1 at most 6.06). Tones as badge-check: the badge's plate grey and the prompt black in
// duotone, the prompt cut out of the solid in fill.
def('badge-terminal', (sharp) => {
  const badge = rawLayers('badge-check', 'stroke', C(sharp))[0].d;
  const plate = rawLayers('badge-check', 'duotone', C(sharp)).find((l) => l.kind === 'plate').d;
  const sc = ([x, y]) => [12 + (x - 12) * 0.71, 12 + (y - 12) * 0.71];
  const prompt = openRun([[7, 7], [11, 11], [7, 15]].map(sc), sharp) + openRun([[13, 17], [17, 17]].map(sc), sharp);
  return {
    stroke: [S(badge), S(prompt)], 'two-tone': [Pl(plate), S(badge), S(prompt)], duotone: [Pl(plate), S(prompt)],
    fill: [F(E(B.subtract(shapeOf(plate), B.union(...bandsOf(prompt, sharp).map((r) => [r])))))],
  };
}, rawBox('badge'));

/* --------------------------------------------------------- sparkle compounds */
// The AI pair (compounds.md, AI sparkle compounds): Zafar's star, a lead R 3 to 4 and a second R 2 to
// 2.5, nothing of the object within 2 of either. No plates: the object stays its stroke in every
// style, the lead star black and the second grey in two-tone and duotone.
const sparkles = (object, lead, second, sharp) => {
  const st = (c, R) => (sharp ? sharpStar(c, R) : star(c, R));
  const a = st(...lead), b = st(...second);
  return { stroke: [S(object), F(a + b)], 'two-tone': [S(object), F(a), Pl(b)], duotone: [S(object), F(a), Pl(b)], fill: [S(object), F(a + b)] };
};
// broom-sparkles: the ref, the lead star R=4 where it was put in the broom's empty corner. Zafar's
// second star (R 2.5 at 20.5, 20.5) painted to 23 on the right against the broom's 2 on the left;
// R=2 at (20, 21) keeps it 2.24 off the bristles and inside the broom's box.
def('broom-sparkles', (sharp) => sparkles(rawLayers('broom', 'stroke', C(sharp))[0].d, [[6, 6], 4], [[20, 21], 2], sharp), rawBox('broom'));

/* --------------------------------------------------------- hand-coins (redrawn) */
// Zafar's redraw (refs/): the hand closed into one shape, its palm a rising curve from the wrist that
// meets the finger line, where the shipped hand had a separate thumb pad; the left coin moved to
// x=6. Zafar's palm reached the curve through two lines meeting at a 2.5 degree kink; here it is one
// line, the curve's first handle laid along it. Tones as shipped: the hand's plate under the
// stroke and the coins' discs in two-tone; duotone the hand a black solid, the wrist line black
// and the coins grey; fill the hand and coins solid with the hand's strokes over them. Sharp: the
// wrist a unit on each end, the hand's two lower corners true, the finger's inner end stubbed.
const HAND = (() => {
  const w = [3, 16.3], c0 = [6.93264, 12.7441], k = 1.5355;
  const t = unit(L.sub(c0, w)), c1 = L.add(c0, L.mul(t, k));
  const palm = `M${P(w)}L${P(c0)}C${P(c1)} 9.6664 11.35 11.171 11.6582L13.255 12.085`;
  return {
    palm,
    regular: { finger: 'M11.17 14.17L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14L13 18C12.4 18.6 11.5 19 10.5 19L5.8284 19C5.2985 19 4.7892 19.2108 4.4142 19.5858L3 21', wrist: 'M3 14L3 22' },
    sharp: { finger: `M${P(stubOut([11.17, 14.17], [14.17, 11.17]))}L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14L12 19L5 19L3 21`, wrist: 'M3 13L3 23' },
    // the hand's own region, closed along its centre lines (wrist, palm, finger joint, knuckle, palm's foot)
    region: (sharp) => `M${P(w)}L${P(c0)}C${P(c1)} 9.6664 11.35 11.171 11.6582L13.255 12.085L14.17 11.17C14.9511 10.389 16.219 10.389 17 11.17C17.7811 11.9511 17.7811 13.219 17 14`
      + (sharp ? 'L12 19L5 19L3 21Z' : 'L13 18C12.4 18.6 11.5 19 10.5 19L5.8284 19C5.2985 19 4.7892 19.2108 4.4142 19.5858L3 21Z'),
  };
})();
const handD = (sharp) => HAND[C(sharp)].wrist + HAND.palm + HAND[C(sharp)].finger;
def('hand-coins', (sharp) => {
  const coins = L.circle([18.5, 4.5], 2.5) + L.circle([6, 5.5], 2.5), discs = L.circle([18.5, 4.5], 3.5) + L.circle([6, 5.5], 3.5);
  const region = HAND.region(sharp), solidHand = E([B.grow(B.runFromD(region)[0], 1)]);
  return {
    stroke: [S(coins + handD(sharp))],
    'two-tone': [Pl(region + discs), S(coins + handD(sharp))],
    duotone: [Pl(discs), F(solidHand), S(HAND[C(sharp)].wrist)],
    fill: [F(region + discs), S(handD(sharp))],
  };
}, [2, 1, 22, 23]);
// hand-sparkles: the ref, the redrawn hand with the pair over it. Zafar's lead star R=4 at (7, 5)
// stays; Zafar's second (R 2.5 at 18.5, 4.5) painted to 21 against the wrist's 2, so it moves a unit
// right to sit on the box, 3.8 off the knuckle.
def('hand-sparkles', (sharp) => sparkles(handD(sharp), [[7, 5], 4], [[19.5, 4.5], 2.5], sharp), [2, 1, 22, 23]);

/* ------------------------------------------------------------------ bot-simple */
// Zafar's `bot-2`, renamed: bot-2 shipped until 1.5.0 as the round bot now called bot-circle, its
// name still redirects there, and the 1.5.0 post says so. This is bot with less on it, as
// home-simple is home: no ears, no mouth, two 3 beads for eyes, bot's own antenna and bead. Zafar's
// head was r=5, which fills to 6, off the ladder; r=4 is the rung that still reads rounder than
// bot's 3. Tones as bot: the plate under the stroke; the head grey and everything on it black in
// duotone; fill the head solid with the eyes cut out.
def('bot-simple', (sharp) => {
  const head = polyLA([[4, 8], [20, 8], [20, 21], [4, 21]], sharp ? [0, 0, 0, 0] : [4, 4, 4, 4]);
  const antenna = 'M12 8L12 3.5', bead = L.circle([12, 3.5], 1.5), eyes = L.circle([9, 14.5], 1.5) + L.circle([15, 14.5], 1.5);
  const plate = geo(grow(head));
  return {
    stroke: [S(dLA(head) + antenna), F(bead + eyes)],
    'two-tone': [Pl(E(plate)), S(dLA(head) + antenna), F(bead + eyes)],
    duotone: [Pl(E(plate)), S(antenna), F(bead + eyes)],
    fill: [F(E(B.subtract(plate, shapeOf(eyes)))), S(antenna), F(bead)],
  };
}, [3, 2, 21, 22]);

/* ============================================================ Zafar's free drawings */
/** Map a drawing so its path box lands on `to` (each axis scaled on its own: fits of under half a percent). */
const fitTo = (d, from, to) => mapPts(d, ([x, y]) => [to[0] + ((x - from[0]) * (to[2] - to[0])) / (from[2] - from[0]), to[1] + ((y - from[1]) * (to[3] - to[1])) / (from[3] - from[1])]);
const pathBox = (d) => L.strokedBBox(d, 0, 'butt');
/** Turn the cubics at `idx` (fillets under the r=1.2 the sharp converter claims) into the vertex their tangents meet at. */
function deFilletAt(d, idx) {
  const cmds = X.parseD(d), endOf = (c) => c.p.at(-1);
  for (const i of idx) {
    const prev = cmds[i - 1], cur = cmds[i], next = cmds[i + 1];
    const p = endOf(prev), q = endOf(cur);
    const tin = unit(L.sub(p, prev.c === 'C' ? prev.p[1] : endOf(cmds[i - 2]))), tout = unit(L.sub(next.p[0], q));
    // p + a tin = q - b tout
    const det = tin[0] * tout[1] - tin[1] * tout[0];
    const a = ((q[0] - p[0]) * tout[1] - (q[1] - p[1]) * tout[0]) / det;
    cmds[i] = { c: 'L', p: [L.add(p, L.mul(tin, a))], extra: q };
  }
  return cmds.map((c) => (c.c === 'Z' ? 'Z' : c.extra ? `L${P(c.p[0])}L${P(c.extra)}` : c.c + c.p.map(P).join(' '))).join('');
}

/* ------------------------------------------------------------------ flame-2 */
// Zafar's `flames`: a flame with a second one burning inside it from the floor, a second drawing of
// flame (as bin-2 is bin with its lines). The ref, fitted: it painted 16 by 20.07, its tip 1.93
// off the top, and is set on flame's own 18 by 22 (ink 3..21 by 1..23, the vertical band), a scale
// of 1.143 across and 1.104 down. Two-tone: the plate under the
// stroke. Duotone: the outer flame grey, the inner one a black solid (grey body, black detail).
// Fill: the duotone's two shapes told apart by a gap where tone tells them apart (Zafar, 11 Oct
// 2026: the inner flame whole, as in duotone, not its outline cut out): the inner solid whole, the
// outer with a moat 2 wide round it that runs out through the floor where the inner flame stands,
// and the outer's two feet at the floor rounded to 1, the cut-out solids' one radius. Sharp: the fillets at the lobe's tip, at the notch
// below it and at the inner flame's tip become the vertices their tangents meet at; the main tip
// keeps its fillet, because the true point there paints 0.9 above the box and sliding it back
// blunts it (sharp.md: where a true point cannot fit, keep it rounded).
const FLAME = {
  outer: 'M11.7711 3.55811C12.2726 6.25393 12.1 8.50352 10.1737 10.1774C9.81616 10.4881 9.27261 10.0765 9.30959 9.60425C9.40889 8.336 9.1005 7.0422 8.78116 6.34242C8.66122 6.0796 8.34157 6.07522 8.16485 6.30376C7.02552 7.77721 5.44551 10.585 5.09232 12.7005C4.5239 16.1052 6.55398 21.4554 11.9134 20.969C16.201 20.5799 18.2473 17.2401 18.7345 15.6188C20.0494 10.3681 16.2383 6.29827 12.6221 3.05525C12.2575 2.72831 11.6816 3.07667 11.7711 3.55811Z',
  inner: 'M14.3362 19.4703C14.9309 17.8968 13.7815 15.2463 12.8805 13.7146C12.6874 13.3862 12.219 13.4227 12.0427 13.7604C10.3682 16.9684 9.5 16.8371 9.5 19.005C9.5 21.3317 13.4569 21.797 14.3362 19.4703Z',
};
def('flame-2', (sharp) => {
  const from = pathBox(FLAME.outer), to = [4, 2, 20, 22];
  let outer = fitTo(FLAME.outer, from, to), inner = fitTo(FLAME.inner, from, to);
  if (sharp) { outer = deFilletAt(outer, [2, 4]); inner = deFilletAt(inner, [2]); }
  const oRun = B.runFromD(outer)[0], iRun = B.runFromD(inner)[0];
  const plate = [B.grow(oRun, 1)];
  // the inner flame as a solid sits 0.05 below its stroke: its foot and the outer's stand 0.46
  // apart, so grown where it is drawn it stops 0.04 short of the floor's lowest point, a hairline
  // the fill's moat would take, and the fill would paint 0.011 short of the other styles' 23
  const inSolid = B.intersect([B.grow(B.runFromD(X.shift(inner, 0, 0.05))[0], 1)], plate);
  return {
    stroke: [S(outer + inner)], 'two-tone': [Pl(E(plate)), S(outer + inner)],
    duotone: [Pl(E(plate)), F(E(inSolid))],
    fill: [F(E(B.subtract(plate, inSolid)))],
  };
}, [3, 1, 21, 23]);

/* ------------------------------------------------------------------ unplug */
// Zafar's `plugs`, the other set's unplug, name to name. Zafar's plug is our own plug at two thirds
// (body 9.33 wide, prongs 4 apart and 3.33 long, corners r=2), laid on the free diagonal with its
// cable in the bottom-left corner; here it is that exactly, and the socket is its body and cable
// turned a half round the centre, so the two halves are one construction (Zafar's socket was a little
// smaller and further off). The prongs stop 2.95 short of the socket. Tones as plug's: two-tone
// the plates under the stroke; duotone the bodies black, prongs and cables grey; fill the bodies
// solid, prongs and cables stroked. Sharp: plug's square face corners, every free end stubbed.
// The body is built as lines and arcs (the plug's own: r=3 corners and an r=7 bottom, here 2 and
// 4.67) upright at two thirds about the cable's end, so its plate is an exact offset, then laid on
// the diagonal.
const k3 = 2 / 3;
function plugBodyLA(sharp) {
  const l = 12 - 7 * k3, r = 12 + 7 * k3, top = 22 - 15 * k3, mid = 22 - 11 * k3, c = 3 * k3, R = 7 * k3;
  const bottom = [A.Ls([r, sharp ? top : top + c], [r, mid]), A.As([12, mid], R, 0, 180), A.Ls([l, mid], [l, sharp ? top : top + c])];
  if (sharp) return [A.Ls([l, top], [r, top]), ...bottom];
  return [A.Ls([l + c, top], [r - c, top]), A.As([r - c, top + c], c, 270, 360), ...bottom, A.As([l + c, top + c], c, 180, 270)];
}
const UNP = {
  // upright scaled coordinates onto the free diagonal: the cable's end on (2, 22), pointing up-right
  at: ([x, y]) => { const s = 22 - y, t = x - 12; return [2 + (s + t) / R2, 22 + (t - s) / R2]; },
  turn: ([x, y]) => [24 - x, 24 - y],
};
def('unplug', (sharp) => {
  const { at, turn } = UNP;
  const segs = plugBodyLA(sharp);
  const bodyP = mapPts(dLA(segs), at), bodyS = mapPts(bodyP, turn);
  const plateP = mapPts(E(geo(grow(segs))), at), plateS = mapPts(plateP, turn);
  const prongs = [12 - 3 * k3, 12 + 3 * k3].map((x) => openRun([at([x, 22 - 15 * k3]), at([x, 22 - 20 * k3])], sharp, 'end')).join('');
  const cableP = openRun([at([12, 22 - 4 * k3]), at([12, 22])], sharp, 'end'), cableS = mapPts(cableP, turn);
  const lines = prongs + cableP + cableS, plates = plateP + plateS;
  return { stroke: [S(bodyP + bodyS + lines)], 'two-tone': [Pl(plates), S(bodyP + bodyS + lines)], duotone: [M(lines), F(plates)], fill: [S(lines), F(plates)] };
}, [1, 1, 23, 23]);

/* ---------------------------------------------------------------- directions */
// Zafar's `three-direction-arrows`: from a starting point, three ways to go, the one taken drawn
// through. Built on move, the set's own many-way arrow: its left and up arrows as they ship
// (shafts from 3 off the centre, heads 3 back), and in place of its down and right arrows a
// node (git's r=3 ring) at the foot with the route rising from it and turning right on an r=4
// arc into move's right arrow; r=4 is the turn that keeps the other two arrows' ends 2 clear (r=3
// leaves 1.71). Zafar's origin was a filled 5 disc, which a stroke drawing cannot carry. Duotone:
// the route black, the ways not taken grey, the node a grey disc; two-tone the disc under the
// stroke; fill the disc solid. Sharp: move's sharp arrows.
def('directions', (sharp) => {
  const up = sharp ? 'M12 10L12 2M8.7071 5.2929L12 2L15.2929 5.2929' : 'M12 9L12 2M9 5L12 2L15 5';
  const left = sharp ? 'M10 12L2 12M5.2929 15.2929L2 12L5.2929 8.7071' : 'M9 12L2 12M5 15L2 12L5 9';
  const head = sharp ? 'M18.7071 8.7071L22 12L18.7071 15.2929' : 'M19 9L22 12L19 15';
  const route = 'M12 16' + L.arcC([16, 16], 4, 180, 270) + 'L22 12' + head;
  const ring = L.circle([12, 19], 3), disc = L.circle([12, 19], 4);
  return {
    stroke: [S(ring + route + up + left)], 'two-tone': [Pl(disc), S(ring + route + up + left)],
    duotone: [Pl(disc), M(up + left), S(route)], fill: [F(disc), S(route + up + left)],
  };
}, [1, 1, 23, 23]);

/* ---------------------------------------------------------------- text-split */
// Zafar's `three-lines-with-divider`: three lines of text split by a bar, each running to the bar
// on the left and starting 2 past it on the right, the split point the same for all three while
// the lines slide (lengths 10 and 2, 8 and 4, 6 and 6). Zafar's middle line began at 4.22; it is 4,
// which is what makes every row 12. One element (the right-hand pieces sit 2 off the bar): every
// style the stroke. Sharp: every free end a unit on.
def('text-split', (sharp) => allStroke(sharp
  ? 'M1 7L12 7M3 12L12 12M5 17L12 17M12 3L12 21M15 7L19 7M15 12L21 12M15 17L23 17'
  : 'M2 7L12 7M4 12L12 12M6 17L12 17M12 4L12 20M16 7L18 7M16 12L20 12M16 17L22 17'), [1, 3, 23, 21]);

/* ------------------------------------------------------------------ the inputs */
// Zafar's input family: a text field 20 by 10 (path 2..22 by 7..17) at r=2, the mid-size rung (and
// the radius that lets a field open on its corner's tangent with 2 to spare for the I-beam), with
// its caret, a 2 rule at x=6, 2 off the wall. `input` is the field and caret; `input-cursor` adds
// the set's cursor sign; `input-sparkles` the AI pair; `text-cursor-input` (the other set's name)
// the field opened round text-cursor; `input-text-cursor` both the caret and the I-beam (Zafar's
// `text-cursor-input-filled`). Tones: the field's plate under the stroke in two-tone; the field
// grey with caret, sign and I-beam black in duotone; the caret cut out of the solid in fill.
const FIELD = (sharp) => polyLA([[2, 7], [22, 7], [22, 17], [2, 17]], sharp ? [0, 0, 0, 0] : [2, 2, 2, 2]);
const CARET = (sharp) => openRun([[6, 11], [6, 13]], sharp);
def('input', (sharp) => {
  const field = FIELD(sharp), d = dLA(field), caret = CARET(sharp), plate = geo(grow(field));
  return { stroke: [S(d + caret)], 'two-tone': [Pl(E(plate)), S(d + caret)], duotone: [Pl(E(plate)), S(caret)], fill: [F(E(B.subtract(plate, bandsOf(caret, sharp))))] };
}, [1, 6, 23, 18]);

// input-cursor: the ref set the pointer low, painting 1 under the field (6 over against 5
// under). Here it is the cursor sign globe-cursor carries, in the 6 box flush on the field's ink
// corner (path 16..22 by 11..17). Notch lines x=13 and y=8: the bottom ends on x=12, the top on
// x=20 where its corner begins, so the right side goes; each cap's far side on its line. No plate
// in any style (Zafar, 11 Oct 2026: the field's plate notched round the sign "looks ugly", drop
// it): the field stays a line, grey in two-tone and duotone with the caret and the sign black,
// and the sign solid in duotone and fill, as it is on globe-cursor. Sharp: the sign's true tip
// stands 1.87 off the top, as it stands off globe-cursor's globe.
const CURSOR_SIGN = {
  regular: 'M17.7728 21.8371L16.0114 16.3046C15.9534 16.1226 16.1272 15.9519 16.3089 16.0124L21.8399 17.8539C22.0454 17.9223 22.0557 18.2081 21.8557 18.2911L19.4925 19.2715C19.4385 19.2939 19.3949 19.3355 19.3702 19.3882L18.2085 21.8653C18.118 22.058 17.8374 22.0398 17.7728 21.8371Z',
  sharp: 'M17.9543 22L15.8719 15.8669L22 18.0514L19.4086 19.3063L17.9543 22Z',
};
def('input-cursor', (sharp) => {
  const kept = sharp ? 'M21 7L2 7L2 17L13 17' : 'M20 7L4 7C2.8954 7 2 7.8954 2 9L2 15C2 16.1046 2.8954 17 4 17L12 17';
  const sign = X.shift(CURSOR_SIGN[C(sharp)], 0, -5), caret = CARET(sharp);
  const signSolid = E([B.grow(B.runFromD(sign)[0], 1)]);
  return {
    stroke: [S(kept + caret + sign)], 'two-tone': [M(kept), S(caret + sign)],
    duotone: [M(kept), S(caret), F(signSolid)], fill: [S(kept + caret), F(signSolid)],
  };
}, [1, 6, 23, 18]);

// input-sparkles: the ref hung the lead star above the field (1 over against 6 under). Here
// the pair sits inside the field's own box: the lead R=3 on its top-right corner (the field cut
// back to the next whole line, top on x=14 and right side on y=15), the second R=2 where the
// caret was, 2 off the walls (Zafar's R 2.5 came within 1.5 of the top).
def('input-sparkles', (sharp) => sparkles(sharp ? 'M15 7L2 7L2 17L22 17L22 14' : 'M14 7L4 7C2.8954 7 2 7.8954 2 9L2 15C2 16.1046 2.8954 17 4 17L20 17C21.1046 17 22 16.1046 22 15', [[20, 9], 3], [[7, 12], 2], sharp), [1, 6, 23, 18]);

// text-cursor-input and input-text-cursor: the field opened on x=12 and x=20 (the corner's
// tangent) round text-cursor's own I-beam, set on x=16, the cut 2 clear of its stem. No plate, as
// input-cursor has none (11 Oct 2026): split by the slot it came out a block and a sliver either
// side of the beam. The field grey in two-tone and duotone, the beam and the caret black; fill
// is the stroke.
function slotted(sharp, withCaret) {
  const left = sharp ? 'M13 7L2 7L2 17L13 17' : 'M12 7L4 7C2.8954 7 2 7.8954 2 9L2 15C2 16.1046 2.8954 17 4 17L12 17';
  const right = sharp ? 'M19 7L22 7L22 17L19 17' : 'M20 7C21.1046 7 22 7.8954 22 9L22 15C22 16.1046 21.1046 17 20 17';
  const beam = textCursor(sharp, 16), caret = withCaret ? CARET(sharp) : '';
  return {
    stroke: [S(left + right + caret + beam)], 'two-tone': [M(left + right), S(caret + beam)],
    duotone: [M(left + right), S(caret + beam)], fill: [S(left + right + caret + beam)],
  };
}
def('text-cursor-input', (sharp) => slotted(sharp, false), [1, 1, 23, 23]);
def('input-text-cursor', (sharp) => slotted(sharp, true), [1, 1, 23, 23]);
