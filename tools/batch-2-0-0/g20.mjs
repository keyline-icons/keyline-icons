// The 2.0.0 refs batch (18 Oct 2026): Zafar's 65 drawings dropped in refs/ on 16 Oct, fixed onto the
// house rules and named. STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of
// layers { kind, d }. CONTAINERS[base][container](sharp) is the same for a Container=square or
// Container=circle variant added to a shipped set (zap, star, dot), which gen20.mjs writes beside the
// set's shipped files without touching them.
//
// Most refs are built on shipped drawings (arrow-big-up-dash, braces, brackets, parentheses,
// octagon-x, triangle-alert, the box's hexagon, move-*, arrow-u-turn-*, at, unplug, list-collapse,
// cursor-panel), so each reads its sibling's raw files here and carries the sibling exactly; the
// rest are drawn here, on the refs' proportions where they set them. What each one changed from its
// ref is said above it.
//
// Names: the other set's name where the drawing is its subject (gallery-thumbnails, list-checks,
// nfc, workflow, plug-zap, tally-5, library-big, circle-dot, square-dot, circle-star, square-star),
// the house's grammar everywhere else: a container is a variant, so zap-circle is zap's
// Container=circle, which the build names circle-zap; a second drawing takes -2 on its base
// (align-left-2); a single bracket is the singular of the shipped pair (brace-left, bracket-left,
// parenthesis-left).
import * as L from '../batch-1-4-0/lib.mjs';
import * as A from '../batch-1-4-0/la.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import * as X from '../batch-1-5-0/lib15.mjs';

const { rawLayers, mapPts, P, assert, ink } = X;
const { polyLA, dLA, toGeo } = A;
export const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
export const C = (s) => (s ? 'sharp' : 'regular');
export const STY = ['stroke', 'two-tone', 'duotone', 'fill'];
const R2 = Math.SQRT2;

/* ----------------------------------------------------------------- helpers */
// Every emitted region wound by nesting (outer +, hole -), as the 1.8.0 batch does it: a hole wound
// with its outline paints solid under nonzero, which is what icons/ and the site use.
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
const shapeOf = (d) => B.runFromD(d);
const angOf = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
const bez = (p, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]); };
function circ3(a, b, c) {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-12) return null;
  const q = (p) => p[0] * p[0] + p[1] * p[1];
  const ux = (q(a) * (b[1] - c[1]) + q(b) * (c[1] - a[1]) + q(c) * (a[1] - b[1])) / d;
  const uy = (q(a) * (c[0] - b[0]) + q(b) * (a[0] - c[0]) + q(c) * (b[0] - a[0])) / d;
  return { c: [ux, uy], r: Math.hypot(a[0] - ux, a[1] - uy) };
}
/**
 * A shipped closed glyph (zap, star) as its polygon and corner radii: the lines are the drawing, the
 * cubics between two lines are that corner's fillet, read off as a radius (a shipped fillet is
 * often a quarter circle and a short piece whose circle differs in the second decimal, 0.5 and
 * 0.4865 at zap's tips, so the radius is the longest piece's, snapped to 0.05 steps). Rebuilt by polyLA, every corner is
 * exactly tangent again, which is what offsetLA needs to offset it exactly.
 */
function polygonOf(d) {
  const run = L.parseRuns(d)[0].segs;
  const lines = [], radii = [];
  let pending = [];
  for (const s of run) {
    if (s.t === 'L' && Math.hypot(s.p[1][0] - s.p[0][0], s.p[1][1] - s.p[0][1]) > 0.05) { lines.push(s.p); radii.push(pending); pending = []; }
    else if (s.t === 'C') pending.push(s);
  }
  radii[0] = [...pending, ...radii[0]];               // the fillet that closes the loop belongs to the first corner
  const meet = (a, b) => {
    const d1 = L.sub(a[1], a[0]), d2 = L.sub(b[1], b[0]), den = L.cross(d1, d2);
    const t = L.cross(L.sub(b[0], a[0]), d2) / den;
    return L.add(a[0], L.mul(d1, t));
  };
  const V = lines.map((ln, i) => meet(lines[(i - 1 + lines.length) % lines.length], ln));
  const R = radii.map((cs) => {
    if (!cs.length) return 0;
    const main = cs.reduce((a, b) => (Math.hypot(...L.sub(b.p[3], b.p[0])) > Math.hypot(...L.sub(a.p[3], a.p[0])) ? b : a));
    const c = circ3(main.p[0], bez(main.p, 0.5), main.p[3]);
    const r = Math.round(c.r / 0.05) * 0.05;
    assert(Math.abs(r - c.r) < 0.01, `fillet r ${c.r} is off the 0.05 grid`);
    return r;
  });
  return { V, R };
}
/** A polygon glyph scaled about a point (radii with it), as line and arc segments. */
const scaledPoly = ({ V, R }, s, [cx, cy], [tx, ty]) => polyLA(V.map(([x, y]) => [tx + (x - cx) * s, ty + (y - cy) * s]), R.map((r) => r * s));
/** The painted silhouette of a closed stroked outline: offset a unit out, verified sample by sample. */
const outerLA = (segs) => { const o = A.offsetLA(segs, 1); A.verifyOffset(segs, o, 1); return [toGeo(o)]; };
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
const layersMap = (v, f) => Object.fromEntries(STY.map((s) => [s, v[s].map(({ kind, d }) => ({ kind, d: f(d) }))]));
const fromRaw = (name, container = 'regular') => (sharp) => Object.fromEntries(STY.map((s) => [s, rawLayers(name, s, C(sharp), container)]));
/** Assert a variant's painted box, every layer, against the box wanted (drawing-a-new-icon.md section 10). */
export function paintedBox(layers, sharp) {
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
export const CONTAINERS = {};
/**
 * No zero-length pieces (drawing-a-new-icon.md, generator checks): a fillet whose tangent lands on
 * a run's own end, or an offset's collapsed corner, leaves an L back onto the point it starts
 * from, which createNodeFromSvg drops, so Figma's signature would disagree with raw/.
 */
function dropZero(d) {
  const out = [];
  let cur = null, start = null;
  for (const c of X.parseD(d)) {
    if (c.c === 'M') { cur = start = c.p[0]; out.push(c); continue; }
    if (c.c === 'Z') { cur = start; out.push(c); continue; }
    if (c.p.every((q) => Math.hypot(q[0] - cur[0], q[1] - cur[1]) < 1e-4)) continue;
    out.push(c); cur = c.p.at(-1);
  }
  return X.emitD(out);
}
const tidy = (v) => layersMap(v, dropZero);
const def = (name, f, want) => { STYLES[name] = (sharp) => tidy(want ? wantBox(name, f(sharp), sharp, typeof want === 'function' ? want(sharp) : want) : f(sharp)); };
const defC = (base, container, f, want) => { (CONTAINERS[base] ??= {})[container] = (sharp) => tidy(wantBox(`${container}-${base}`, f(sharp), sharp, want)); };

/* ------------------------------------------------- arrow-big-down/left/right-dash */
// Zafar's three are the shipped arrow-big-up-dash turned, which is what they should be: every
// variant here is that one's, mapped, so the tones and the sharp heads come with it. The maps are
// the ones that turn arrow-big-up into the shipped arrow-big-down, -left and -right (asserted).
const TURN = { down: ([x, y]) => [x, 24 - y], left: ([x, y]) => [y, x], right: ([x, y]) => [24 - y, x] };
const pointSet = (d) => new Set(X.parseD(d).flatMap((c) => (c.c === 'Z' ? [] : c.p.map(P))));
for (const [dir, f] of Object.entries(TURN)) {
  for (const k of ['regular', 'sharp']) {
    const want = pointSet(rawLayers(`arrow-big-${dir}`, 'stroke', k)[0].d), got = pointSet(mapPts(rawLayers('arrow-big-up', 'stroke', k)[0].d, f));
    assert([...want].every((p) => got.has(p)), `arrow-big-up mapped ${dir} is not the shipped arrow-big-${dir} (${k})`);
  }
  def(`arrow-big-${dir}-dash`, (sharp) => layersMap(fromRaw('arrow-big-up-dash')(sharp), (d) => mapPts(d, f)), dir === 'down' ? [3, 1, 21, 23] : [1, 3, 23, 21]);
}

/* ------------------------------------- brace-, bracket-, parenthesis-left and -right */
// Zafar's six singles are the shipped pairs' halves, each moved to the centre (6 in from either
// side), every style the stroke as the pairs are. His round pair carried each other's names: the
// one bulging right is ")", the right parenthesis. Named as the singular of the shipped pair.
const HALF = { brace: 'braces', bracket: 'brackets', parenthesis: 'parentheses' };
for (const [single, pair] of Object.entries(HALF)) for (const side of ['left', 'right']) {
  def(`${single}-${side}`, (sharp) => {
    const half = subs(rawLayers(pair, 'stroke', C(sharp))[0].d).find((s) => (meanAxis(s, 0) < 12) === (side === 'left'));
    const d = X.shift(half, side === 'left' ? 6 : -6, 0);
    // A sharp diagonal end stands 0.02 past the rounded box on x (the parentheses' stub, shipped):
    // the pair is symmetric, a single is not, so the single centres on its own ink (section 1,
    // "centre each treatment on its own ink, measured with its own cap").
    const b = ink(d, sharp ? 'butt' : 'round');
    return allStroke(X.shift(d, (24 - b[0] - b[2]) / 2, 0));
  }, (sharp) => (sharp && single === 'parenthesis' ? [8.9902, 1, 15.0098, 23] : [9, 1, 15, 23]));
}

/* ------------------------------------------- parentheses-ellipsis, parentheses-x */
// Zafar's two put the shipped parentheses round braces-ellipsis's three 2 marks on a 4 pitch (2
// clear of the bows, as drawn) and round circle-x's x. Symbol glyphs: every style the stroke.
const ELLIPSIS = [8, 12, 16].map((x) => L.circle([x, 12], 1)).join('');
def('parentheses-ellipsis', (sharp) => allStroke(rawLayers('parentheses', 'stroke', C(sharp))[0].d, [F(ELLIPSIS)]), [3, 1, 21, 23]);
def('parentheses-x', (sharp) => allStroke(rawLayers('parentheses', 'stroke', C(sharp))[0].d + rawLayers('x', 'stroke', C(sharp), 'circle')[1].d), [3, 1, 21, 23]);

/* ------------------------------------------------------------- frames and glyphs */
// A glyph in a frame takes the container grammar every shipped one does (play, check, x): two-tone a
// plate under the frame and the black glyph, duotone the grey plate and the black glyph, fill the
// plate with the glyph's painted silhouette knocked out. Frames are read off shipped drawings:
// the containers off play's, the octagon off octagon-x, the triangle off triangle-alert, the hexagon
// off box (the set's own hexagon, the isometric box's outline).
function frameOf(name, sharp, container = 'regular') {
  const st = rawLayers(name, 'stroke', C(sharp), container), tt = rawLayers(name, 'two-tone', C(sharp), container);
  const frame = name === 'box' ? subs(st[0].d).at(-1) : subs(st[0].d)[0];
  return { frame, plate: tt.find((l) => l.kind === 'plate').d };
}
const FRAMES = {
  circle: (sharp) => frameOf('play', sharp, 'circle'),
  square: (sharp) => frameOf('play', sharp, 'square'),
  octagon: (sharp) => frameOf('octagon-x', sharp),
  triangle: (sharp) => frameOf('triangle-alert', sharp),
  hexagon: (sharp) => frameOf('box', sharp),
};
/** glyph: { stroke: d of the stroked part, dots: d of the solid marks, hole: Shape knocked out of the fill } */
function framed(fr, g) {
  const dots = g.dots ? [F(g.dots)] : [];
  const sd = (extra) => (g.stroke ? [S(extra + g.stroke)] : extra ? [S(extra)] : []);
  return {
    stroke: [...sd(fr.frame), ...dots],
    'two-tone': [Pl(fr.plate), ...sd(fr.frame), ...dots],
    duotone: [Pl(fr.plate), ...sd(''), ...dots],
    fill: [F(E(B.subtract(shapeOf(fr.plate), g.hole)))],
  };
}
// The dot: the shipped dot's 4 mark at the frame's centre, unscaled (a mark of the dot ladder keeps
// its rung in every frame), knocked out of the fill at its own edge. Sharp keeps it round, as the
// shipped dot does.
const dotAt = (c) => ({ dots: L.circle(c, 2), hole: shapeOf(L.circle(c, 2)) });
// The zap: the shipped bolt at 5/9 about the centre, Zafar's scale, which puts its ink 2 clear of
// the square's inner edge, the tightest of the frames (one glyph, one size, compounds.md).
// The star: the shipped star at 1/2 about the centre of its box. Zafar's ran 1/2 across and 0.526
// down, a stretched star squared off to 10 by 10; the shipped star scaled uniformly is the glyph.
const ZAP = (sharp, dy = 0) => { const g = scaledPoly(polygonOf(rawLayers('zap', 'stroke', C(sharp))[0].d), 5 / 9, [12, 12], [12, 12 + dy]); return { stroke: dLA(g), hole: outerLA(g) }; };
const STAR_C = (() => { const b = paintedBox([S(rawLayers('star', 'stroke', 'regular')[0].d)], false); return [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]; })();
const STAR = (sharp, dy = 0) => { const g = scaledPoly(polygonOf(rawLayers('star', 'stroke', C(sharp))[0].d), 1 / 2, STAR_C, [12, 12 + dy]); return { stroke: dLA(g), hole: outerLA(g) }; };
for (const container of ['circle', 'square']) {
  defC('dot', container, (sharp) => framed(FRAMES[container](sharp), dotAt([12, 12])), container === 'square' ? [2, 2, 22, 22] : [1, 1, 23, 23]);
  defC('zap', container, (sharp) => framed(FRAMES[container](sharp), ZAP(sharp)), container === 'square' ? [2, 2, 22, 22] : [1, 1, 23, 23]);
  defC('star', container, (sharp) => framed(FRAMES[container](sharp), STAR(sharp)), container === 'square' ? [2, 2, 22, 22] : [1, 1, 23, 23]);
}

/* ------------------------------------------- octagon-dot, triangle-dot, hexagon-* */
// octagon-x and triangle-alert with the dot for their sign, every variant otherwise theirs. The
// triangle's dot sits on Zafar's 14, a unit above the centroid, 2.34 off the walls and 4 off the
// floor. The hexagon is the box's outline (Zafar's sat on the other set's hexagon: 100 per cent of
// theirs under his), 22 by 22 as a round form should be; its glyphs keep the centre where they clear
// the slanted walls by 2 and otherwise rise until they do (the star, as Zafar raised it).
def('octagon-dot', (sharp) => framed(FRAMES.octagon(sharp), dotAt([12, 12])), [2, 2, 22, 22]);
def('triangle-dot', (sharp) => framed(FRAMES.triangle(sharp), dotAt([12, 14])), [1, 2, 23, 22]);
def('hexagon-dot', (sharp) => framed(FRAMES.hexagon(sharp), dotAt([12, 12])), [1, 1, 23, 23]);
def('hexagon-zap', (sharp) => framed(FRAMES.hexagon(sharp), ZAP(sharp)), [1, 1, 23, 23]);
// The star rises 0.75, not Zafar's 1: centred, its lower tips stand 1.54 off the lower walls; at 1
// up its top tip stands 1.98 off the upper ones (1.80 sharp); at 0.75 both sides clear by 2.20
// (2.02 and 2.09 sharp), the balance point.
export const HEX_STAR_DY = -0.75;
def('hexagon-star', (sharp) => framed(FRAMES.hexagon(sharp), STAR(sharp, HEX_STAR_DY)), [1, 1, 23, 23]);

/* ------------------------------------------------------------- ban-square, -flip */
// ban in the square container: the frame and a diagonal from corner to corner. Zafar's diagonal
// stopped at (4, 4), 0.17 inside the corner arc's centre line; it now lands on it at 45 degrees,
// (6 - 3/sqrt 2), as ban's slash lands on its ring. Styles are ban's: two-tone the plate under the
// frame and slash, duotone the grey plate and the slash cut 2 clear of the plate's edge, fill the
// plate with that slash knocked out. Sharp: the slash runs into the true corner, and the duotone
// slash stops with its butt corners 2 clear of the plate's straight edges. The -flip is the mirror.
function banSquare(sharp) {
  const fr = FRAMES.square(sharp);
  const e = sharp ? 3 : 6 - 3 / R2;                 // the frame's centre line on the diagonal
  const g = sharp ? 4 + 1 / R2 : 6 - 1 / R2;        // duotone ends: 2 clear of the plate
  const slash = poly([[e, e], [24 - e, 24 - e]]), inner = poly([[g, g], [24 - g, 24 - g]]);
  const hole = [B.band(shapeOf(inner)[0], sharp ? 'butt' : 'round')];
  return {
    stroke: [S(fr.frame + slash)],
    'two-tone': [Pl(fr.plate), S(fr.frame + slash)],
    duotone: [Pl(fr.plate), S(inner)],
    fill: [F(E(B.subtract(shapeOf(fr.plate), hole)))],
  };
}
def('ban-square', banSquare, [2, 2, 22, 22]);
def('ban-square-flip', (sharp) => layersMap(banSquare(sharp), X.mirrorX), [2, 2, 22, 22]);

/* ------------------------------------------------- arrow-up/down/left/right-through-line */
// Zafar's arrow-through: the shipped move-* arrow crossing a line broken 2 clear of the shaft, every
// style the stroke as arrow-right-to-line's is. Each direction carries its own shipped move-* (all
// eight variants); the line is drawn across it, its ends stubbed in sharp.
const THROUGH = { right: 'move-right', left: 'move-left', up: 'move-up', down: 'move-down' };
for (const [dir, base] of Object.entries(THROUGH)) {
  def(`arrow-${dir}-through-line`, (sharp) => {
    const across = dir === 'left' || dir === 'right' ? (a) => [12, a] : (a) => [a, 12];
    const line = openRun([across(3), across(8)], sharp) + openRun([across(16), across(21)], sharp);
    const v = fromRaw(base)(sharp);
    return Object.fromEntries(STY.map((s) => [s, v[s].map((l) => (l.kind === 'stroke' ? { kind: 'stroke', d: l.d + line } : l))]));
  }, [2, 2, 22, 22]);
}

/* ------------------------------------------------------------ the U-turns at a line */
// Zafar's eight uturn drawings are the shipped arrow-u-turn-left, two to the left, with a line 2
// clear of the bend, and its seven turns and mirrors. Every style the stroke, as the shipped pair's.
// Named on the shipped pair: -line for the line, up and down for the turned ones, -flip for the
// mirror across the arrow's own axis (the head on the other side of the bend).
function uTurnLine(sharp) {
  const d = X.shift(rawLayers('arrow-u-turn-left', 'stroke', C(sharp))[0].d, -2, 0) + openRun([[21, 4], [21, 20]], sharp);
  return allStroke(d);
}
const ROT = ([x, y]) => [24 - y, x];
const UTURN = {
  'arrow-u-turn-left-line': (d) => d,
  'arrow-u-turn-left-line-flip': X.mirrorY,
  'arrow-u-turn-right-line': X.mirrorX,
  'arrow-u-turn-right-line-flip': (d) => X.mirrorX(X.mirrorY(d)),
  'arrow-u-turn-up-line': (d) => mapPts(d, ROT),
  'arrow-u-turn-up-line-flip': (d) => X.mirrorX(mapPts(d, ROT)),
  'arrow-u-turn-down-line': (d) => X.mirrorY(mapPts(d, ROT)),
  'arrow-u-turn-down-line-flip': (d) => X.mirrorX(X.mirrorY(mapPts(d, ROT))),
};
for (const [name, f] of Object.entries(UTURN)) def(name, (sharp) => layersMap(uTurnLine(sharp), f), /up|down/.test(name) ? [3, 2, 21, 22] : [2, 3, 22, 21]);

/* ===================================================================== lists */
/**
 * An open path's free ends stubbed for sharp (sharp.md, free ends): a straight L along each end's
 * tangent, k45 off a line end (the cap cut) and a full unit off a curve's end (the cut leaves arc
 * ends alone), either stopped where a butt corner would leave `box`, the rounded drawing's ink box
 * ("where the box binds, the stub stops at the box").
 */
function stubEnds(d, which = 'both', box = [0, 0, 24, 24]) {
  const stub = (p, t, line) => {
    const u = unit(t), n = [-u[1], u[0]];
    const fits = (k) => [1, -1].every((sg) => { const q = L.add(L.add(p, L.mul(u, k)), L.mul(n, sg)); return q[0] >= box[0] - 1e-9 && q[1] >= box[1] - 1e-9 && q[0] <= box[2] + 1e-9 && q[1] <= box[3] + 1e-9; });
    let k = line ? k45(u) : 1;
    if (!fits(k)) k = L.bisect((kk) => (fits(kk) ? -1 : 1), 0, k);
    return L.add(p, L.mul(u, k));
  };
  return L.parseRuns(d).map(({ segs, closed }) => {
    if (closed) return L.segD(segs[0], true) + segs.slice(1).map((s) => L.segD(s)).join('') + 'Z';
    const first = segs[0], last = segs.at(-1);
    const t0 = first.t === 'L' ? L.sub(first.p[0], first.p[1]) : L.sub(first.p[0], first.p[1].some((v, i) => Math.abs(v - first.p[0][i]) > 1e-9) ? first.p[1] : first.p[2]);
    const t1 = last.t === 'L' ? L.sub(last.p[1], last.p[0]) : L.sub(last.p[3], last.p[2].some((v, i) => Math.abs(v - last.p[3][i]) > 1e-9) ? last.p[2] : last.p[1]);
    const s0 = which === 'both' || which === 'start' ? stub(first.p[0], t0, first.t === 'L') : null;
    const s1 = which === 'both' || which === 'end' ? stub(last.p.at(-1), t1, last.t === 'L') : null;
    return (s0 ? `M${P(s0)}L${P(first.p[0])}` : `M${P(first.p[0])}`) + segs.map((s) => L.segD(s)).join('') + (s1 ? `L${P(s1)}` : '');
  }).join('');
}
const rules = (rows, sharp) => rows.map(([y, a, b]) => openRun([[a, y], [b, y]], sharp)).join('');

// align-left-2, align-right-2: Zafar's list-align-left and -right, a second drawing of the shipped
// align-left (rules only): the margin as a bar the rows hang off, rows of 13, 13, 10 and 6 on a 5
// pitch, 3 off the bar. Tones as list's: the rows grey, the bar black, the part that says which
// side; fill the stroke.
function alignLeft2(sharp) {
  const bar = openRun([[3, 3], [3, 21]], sharp), rows = rules([[4.5, 8, 21], [9.5, 8, 21], [14.5, 8, 18], [19.5, 8, 14]], sharp);
  return { stroke: [S(bar + rows)], 'two-tone': [M(rows), S(bar)], duotone: [M(rows), S(bar)], fill: [S(bar + rows)] };
}
def('align-left-2', alignLeft2, [2, 2, 22, 22]);
def('align-right-2', (sharp) => layersMap(alignLeft2(sharp), X.mirrorX), [2, 2, 22, 22]);

// list-checks: Zafar's, the other set's name: two of the house's 6 x 4 checks as bullets beside
// two rules on rows 7 and 17 (list-todo's rules, its rows a unit nearer so the pair centres). Tones
// as list-todo's: rules grey, checks black; fill the stroke.
function listChecks(sharp) {
  const checks = [7, 17].map((y) => openRun([[2, y], [4, y + 2], [8, y - 2]], sharp)).join('');
  const r = rules([[7, 12, 22], [17, 12, 22]], sharp);
  return { stroke: [S(checks + r)], 'two-tone': [M(r), S(checks)], duotone: [M(r), S(checks)], fill: [S(checks + r)] };
}
def('list-checks', listChecks, [1, 4, 23, 20]);

// list-indent-increase, -decrease: Zafar's two were the other set's list-indent-* point for point
// (100 per cent both ways under the overlay). Rebuilt on the shipped list-collapse instead: its
// three rows (6, 12 and 18) and its arrow, head 3 back, turned to point along the rows, 6 long so
// the tip keeps 2 off the rules; the rules run 12..22 so the drawing is 22 wide, as a horizontal
// one is drawn (at list-collapse's 13..21 it stood 20). Tones as list-collapse's: the arrow
// grey and the rules black in duotone, two-tone and fill the stroke.
function listIndent(sharp, dir) {
  const arrow = dir > 0 ? openRun([[2, 12], [8, 12]], sharp, 'start') + openRun([[5, 9], [8, 12], [5, 15]], sharp)
    : openRun([[8, 12], [2, 12]], sharp, 'start') + openRun([[5, 9], [2, 12], [5, 15]], sharp);
  const r = rules([[6, 12, 22], [12, 12, 22], [18, 12, 22]], sharp);
  return { stroke: [S(arrow + r)], 'two-tone': [S(arrow + r)], duotone: [M(arrow), S(r)], fill: [S(arrow + r)] };
}
def('list-indent-increase', (sharp) => listIndent(sharp, 1), [1, 5, 23, 19]);
def('list-indent-decrease', (sharp) => listIndent(sharp, -1), [1, 5, 23, 19]);

// list-nested: Zafar's sub-list, three rules stepping in by 2 under disclosure triangles. His
// triangles were solid fills, which stroke does not carry (styles.md, "if it is not a dot, outline
// it"): each is a 2 x 3 triangle stroked, which paints a 4 x 5 solid (its in-radius 0.75 is under
// the stroke's half width), the bullet he drew with the house's round corners. Rows on a 7.5 pitch
// (his 7 put one triangle 1.61 off the next), rules 2 off each triangle as his were. Tones as list's: triangles black, rules grey; fill the stroke.
function listNested(sharp) {
  const tri = [[4.5, 3], [12, 5], [19.5, 7]].map(([y, x]) => `M${P([x, y - 1.5])}L${P([x + 2, y])}L${P([x, y + 1.5])}Z`).join('');
  const r = rules([[4.5, 9, 21], [12, 11, 21], [19.5, 13, 21]], sharp);
  return { stroke: [S(tri + r)], 'two-tone': [M(r), S(tri)], duotone: [M(r), S(tri)], fill: [S(tri + r)] };
}
def('list-nested', listNested, [2, 2, 22, 22]);

/* =================================================================== symbols */
// Typographic marks: every style the stroke, black (the symbol-glyph rule, styles.md), each
// centred on its own ink with whole paddings. The dot of each is the shipped dot's 4 mark: Zafar's
// colon used 3 marks, which cannot sit on whole paddings (an odd width about 12 lands on .5).
const DOT = (c) => L.circle(c, 2);
// hyphen and pipe: Zafar's, as drawn (hyphen 10 long against minus's 14).
def('hyphen', (sharp) => allStroke(openRun([[7, 12], [17, 12]], sharp)), [6, 11, 18, 13]);
def('pipe', (sharp) => allStroke(openRun([[12, 5], [12, 19]], sharp)), [11, 4, 13, 20]);
// colon: two 4 marks 4 apart, as far apart as they are wide, Zafar's proportion at the 4 mark.
def('colon', () => { const d = F(DOT([12, 8]) + DOT([12, 16])); return { stroke: [d], 'two-tone': [d], duotone: [d], fill: [d] }; }, [10, 6, 14, 18]);
// comma: a 4 mark and a tail. Zafar's comma and accent were solid wedges, which stroke cannot carry
// and which read as specks at 16px (3 by 4). The tail leaves the mark's centre line a unit right of
// its centre, buried in it, and turns left to end at 45 degrees, so its sharp butt end paints
// exactly where the round cap did (k = 0.414 on both axes).
const tail = (x, y) => `M${P([x + 1, y])}C${P([x + 1, y + 2])} ${P([x, y + 4])} ${P([x - 1, y + 5])}`;
const comma = (x, y, sharp, box) => ({ dot: DOT([x, y]), tail: sharp ? stubEnds(tail(x, y), 'end', box) : tail(x, y) });
function commaGlyph(sharp) {
  const c = comma(12, 10, sharp, [10, 8, 14, 16]);
  return { stroke: [S(c.tail), F(c.dot)], 'two-tone': [S(c.tail), F(c.dot)], duotone: [S(c.tail), F(c.dot)], fill: [S(c.tail), F(c.dot)] };
}
def('comma', commaGlyph, [10, 8, 14, 16]);
// semicolon: the colon's top mark over the comma, centred as a whole (the pair stands 16 tall).
function semicolonGlyph(sharp) {
  const c = comma(12, 14, sharp, [10, 4, 14, 20]), dots = DOT([12, 6]) + c.dot;
  return { stroke: [S(c.tail), F(dots)], 'two-tone': [S(c.tail), F(dots)], duotone: [S(c.tail), F(dots)], fill: [S(c.tail), F(dots)] };
}
def('semicolon', semicolonGlyph, [10, 4, 14, 20]);
// accent-grave: the backtick as a short stroke falling to the right, 6 tall at 3 to 1 (a 45 degree
// stroke this short reads as a backslash). Sharp: the butt ends stand 0.18 past on x, the cap
// cut's allowance, symmetric.
def('accent-grave', (sharp) => allStroke(openRun([[11, 9], [13, 15]], sharp)), (sharp) => (sharp ? [9.8228, 8, 14.1772, 16] : [10, 8, 14, 16]));
// tilde: Zafar's wave, 14 by 4 and turned half about the centre, as drawn.
const TILDE = 'M5 13.8563C5.5395 11.8015 6.5934 10.4402 7.9162 10.0894C9.239 9.7386 10.7149 10.4291 12 12C13.2851 13.5709 14.761 14.2614 16.0838 13.9106C17.4066 13.5598 18.4605 12.1985 19 10.1437';
def('tilde', (sharp) => allStroke(sharp ? stubEnds(TILDE, 'both', [4, 9, 20, 15]) : TILDE), [4, 9, 20, 15]);
// tally-5: Zafar's prepared, the other set's name: four strokes on a 5 pitch about the centre and
// the gate across them, a 1 in 2 slope corner to corner. Marks: every style the stroke.
def('tally-5', (sharp) => allStroke([4.5, 9.5, 14.5, 19.5].map((x) => openRun([[x, 5], [x, 19]], sharp)).join('') + openRun([[2, 17], [22, 7]], sharp)), [1, 4, 23, 20]);

/* =================================================================== objects */
const ang = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
/** An open polyline with a fillet of radii[i] at each interior vertex, as line and arc segments (g18b's). */
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
const growLA = (segs) => { const o = A.offsetLA(segs, 1); A.verifyOffset(segs, o, 1); return o; };
const rectLA = (x0, y0, x1, y1, r, sharp) => polyLA([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], sharp ? [0, 0, 0, 0] : [r, r, r, r]);

// diamond-dot: Zafar's, a square turned 45 degrees round the dot. 22 by 22, as round forms are
// (his paints 20, which reads small with the corners of the box empty), corners r=2 (the ladder's
// step nearest his 2.35; the house 3 turns it toward a circle). Sharp: true points on 2 and 22.
function diamondFrame(sharp) {
  const v = sharp ? 10 : 10 + 2 * (R2 - 1);
  const segs = polyLA([[12, 12 - v], [12 + v, 12], [12, 12 + v], [12 - v, 12]], sharp ? [0, 0, 0, 0] : [2, 2, 2, 2]);
  return { frame: dLA(segs), plate: dLA(growLA(segs)) };
}
def('diamond-dot', (sharp) => framed(diamondFrame(sharp), dotAt([12, 12])), [1, 1, 23, 23]);

// gallery-thumbnails: Zafar's, the other set's name: a card over three thumbnails, the gallery
// family's card radius (2). His card was 12 tall over thumbnails on 20, 20 by 18 overall, which
// reads as a square owing 20; the card grows to 14 and the thumbnails drop to 21, 2 below it. Styles as gallery-horizontal's: two-tone the card's plate, duotone the
// grey card and black thumbnails, fill the solid card and stroked thumbnails.
function galleryThumbnails(sharp) {
  const card = rectLA(3, 3, 21, 17, 2, sharp);
  const thumbs = openRun([[3, 21], [6, 21]], sharp) + openRun([[10.5, 21], [13.5, 21]], sharp) + openRun([[18, 21], [21, 21]], sharp);
  const plate = dLA(growLA(card));
  return { stroke: [S(dLA(card) + thumbs)], 'two-tone': [Pl(plate), S(dLA(card) + thumbs)], duotone: [Pl(plate), S(thumbs)], fill: [F(plate), S(thumbs)] };
}
def('gallery-thumbnails', galleryThumbnails, [2, 2, 22, 22]);

// workflow: Zafar's diagram-nested, the other set's name for two boxes on an elbow. His elbow was
// the other set's to the point (r=2 from (7, 10) to (13, 17)); it turns on r=3 here, the house's
// elbow, and the boxes keep his 8 by 6 at r=2. Styles as connection's: plates under the boxes in
// two-tone, grey boxes and a black link in duotone, solid boxes and the stroked link in fill.
// Sharp: square boxes and a square elbow, as the house's elbows go.
function workflow(sharp) {
  const a = rectLA(3, 4, 11, 10, 2, sharp), b = rectLA(13, 14, 21, 20, 2, sharp);
  const link = dLA(openLA([[7, 10], [7, 17], [13, 17]], [0, sharp ? 0 : 3, 0]), false);
  const boxes = dLA(a) + dLA(b), plates = dLA(growLA(a)) + dLA(growLA(b));
  return { stroke: [S(boxes + link)], 'two-tone': [Pl(plates), S(boxes + link)], duotone: [Pl(plates), S(link)], fill: [F(plates), S(link)] };
}
def('workflow', workflow, [2, 3, 22, 21]);

// code-panel: Zafar's, cursor-panel's grammar with code in the opened corner: the frame (3..21 by
// 4..20, r=3) open across its top left, the shipped code chevrons at 4/7 in the gap (his ran 3.3
// wide at 6.3 and 10.7, off the grid; these are code's own, scaled). The body is open, so two-tone
// is the duotone split (frame grey, code black, his cloud-terminal ruling); fill the stroke.
function codePanel(sharp) {
  const frame = sharp ? openRun([[18, 4], [21, 4], [21, 20], [3, 20], [3, 16]], sharp) : dLA(openLA([[18, 4], [21, 4], [21, 20], [3, 20], [3, 16]], [0, 3, 3, 3, 0]), false);
  const s = 4 / 7, map = ([x, y]) => [3 + (x - 2) * s, 4 + (y - 5) * s];
  const code = openRun([[8, 5], [2, 12], [8, 19]].map(map), sharp) + openRun([[16, 5], [22, 12], [16, 19]].map(map), sharp);
  return { stroke: [S(frame + code)], 'two-tone': [M(frame), S(code)], duotone: [M(frame), S(code)], fill: [S(frame + code)] };
}
def('code-panel', codePanel, [2, 3, 22, 21]);

// nfc: Zafar's four waves, the other set's name (18.6 per cent of theirs under the overlay), as
// drawn: each a 4 pitch on from the last, as wifi's arcs are. Every style the stroke: waves read
// as a level, so a grey one would say "weaker" (wifi's ruling).
const NFC = 'M16.2729 2C18.6731 4.7501 20 8.3104 20 12C20 15.6896 18.6731 19.2499 16.2729 22M12 4C13.9319 6.2001 15 9.0483 15 12C15 14.9517 13.9319 17.7999 12 20M8 7C9.288 8.3751 10 10.1552 10 12C10 13.8448 9.288 15.6249 8 17M4 9C4.644 9.825 5 10.8931 5 12C5 13.1069 4.644 14.175 4 15';
const centreOnInk = (d, sharp) => { const b = ink(d, sharp ? 'butt' : 'round'); return X.shift(d, (24 - b[0] - b[2]) / 2, (24 - b[1] - b[3]) / 2); };
def('nfc', (sharp) => allStroke(sharp ? stubEnds(NFC, 'both', [3, 1, 21, 23]) : NFC), [3, 1, 21, 23]);

// plug-zap: Zafar's, the other set's name: the shipped unplug's plug (its half with the cord) and
// the house bolt of the zap compounds at 1.5 (his, exactly: 6 by 9 in the free corner). Styles are
// unplug's for the plug (its plate in two-tone, a black body and grey prongs and cord in duotone),
// the bolt black in all, as a sign is.
function plugZap(sharp) {
  const keep = (d) => subs(d).filter((s) => meanAxis(s, 0) - meanAxis(s, 1) < 0).join('');
  const bolt = openRun([[20.5, 2], [16, 6.5], [22, 6.5], [17.5, 11]], sharp);
  const v = fromRaw('unplug')(sharp);
  const out = {};
  for (const style of STY) {
    out[style] = v[style].map(({ kind, d }) => ({ kind, d: keep(d) })).filter((l) => l.d);
    const black = out[style].find((l) => l.kind === 'stroke');
    if (black) black.d += bolt; else out[style].push(S(bolt));
  }
  return out;
}
def('plug-zap', plugZap, [1, 1, 23, 23]);

// map-pin-2: Zafar's, a second drawing of map-pin: a ball on a stick set into the ground, the
// ground an ellipse (10 by 3 about (12, 18)) opened 2 either side of the stick. Two-tone a plate
// under the ball; duotone the pin black (the ball solid) on grey ground; fill the ball solid.
// Sharp: the ball stays round, the stick's foot and the ground's ends take the stub.
function mapPin2(sharp) {
  const t0 = -Math.acos(0.4) * 180 / Math.PI, t1 = 180 - t0;
  const ground = L.ellArc([12, 18], 10, 3, 0, t0, t1);
  const g = sharp ? stubEnds(ground, 'both', [1, 2, 23, 22]) : ground;
  const stick = openRun([[12, 9], [12, 17]], sharp, 'end'), ball = L.circle([12, 6], 3), disc = L.circle([12, 6], 4);
  return { stroke: [S(ball + stick + g)], 'two-tone': [Pl(disc), S(ball + stick + g)], duotone: [M(g), F(disc), S(stick)], fill: [F(disc), S(stick + g)] };
}
def('map-pin-2', mapPin2, [1, 2, 23, 22]);

// library-big: Zafar's books, the other set's name for books on a shelf, one leaning. Two upright
// books 5 by 18 sharing a wall, as he drew them, corners r=1 (his 1.5 fills to 2.5, off the ladder),
// and a third leaning on the second. His leaning book stood 0.82 into the second's wall, neither
// touching nor clear; here it is solved to rest on the floor line (21), reach 22, and lean exactly
// on the second's wall (x = 12, joined, as a composite), which tilts it 19 degrees and shortens it
// to 17.86 so it stands no taller than the others. Two-tone: one plate under the three. Duotone and
// fill keep the books apart: the shared wall a 2 slot (book-open's spine), the second book black
// between grey ones in duotone.
const LEAN = (() => {
  // rounded rect 5 wide, h tall, r=1, turned by -th; solve th and h so it spans x 12..22, y 3..21
  const ext = (th, a) => [1.5 * Math.cos(th) + a * Math.sin(th), 1.5 * Math.sin(th) + a * Math.cos(th)];
  let th = 0.33, a = 8;
  for (let i = 0; i < 200; i++) { const [ex, ey] = ext(th, a); th += (4 - ex) * 0.05; a += (8 - ey) * 0.5; }
  const [ex, ey] = ext(th, a);
  assert(Math.abs(ex - 4) < 1e-9 && Math.abs(ey - 8) < 1e-9, 'leaning book did not solve');
  return { th, a, c: [17, 12] };
})();
function leaningBook(sharp) {
  // sharp: true corners solved onto the same extents (12..22 by 3..21 on the centre line), so each
  // corner's round join paints where the rounded book's fillet does; a fillet's midpoint (deFillet)
  // falls 0.1 short on a turned box
  const { th, a, c } = LEAN, r = 1, cs = Math.cos(th), sn = Math.sin(th), den = cs * cs - sn * sn;
  const hw = sharp ? (5 * cs - 9 * sn) / den : 1.5 + r, hh = sharp ? (9 * cs - 5 * sn) / den : a + r;
  const rot = ([x, y]) => [c[0] + x * Math.cos(th) + y * Math.sin(th), c[1] - x * Math.sin(th) + y * Math.cos(th)];
  return polyLA([[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]].map(rot), sharp ? [0, 0, 0, 0] : [r, r, r, r]);
}
function libraryBig(sharp) {
  const b1 = rectLA(2, 3, 7, 21, 1, sharp), b2 = rectLA(7, 3, 12, 21, 1, sharp), b3 = leaningBook(sharp);
  const outline = dLA(b1) + dLA(b2) + dLA(b3);
  const g = [b1, b2, b3].map((b) => [toGeo(growLA(b))]);
  const slot = shapeOf(dLA(rectLA(6, 1, 8, 23, 0, true)));
  const s1 = B.subtract(g[0], slot), s2 = B.subtract(g[1], slot);
  const plate = E(B.union(g[0], g[1], g[2]));
  return {
    stroke: [S(outline)],
    'two-tone': [Pl(plate), S(outline)],
    duotone: [Pl(E(B.union(s1, g[2]))), F(E(s2))],
    fill: [F(E(B.union(s1, s2, g[2])))],
  };
}
def('library-big', libraryBig, [1, 2, 23, 22]);

// list-pin: Zafar's, a list with a pushpin. His pin was a 16 pin at 0.81 (corners 0.82, base 13.36 to
// 15.2); redrawn on his outline with whole numbers: cap 8 by 3 on r=1, stem 4 wide, the flare out to
// a 13 base 1.5 tall, the needle on the centre line, his three rules as drawn. Tones as the pin's
// and list's: two-tone the pin's plate and grey rules, duotone the black pin over grey needle and
// rules, fill the solid pin.
function pinLA(sharp) {
  const P12 = [[11.5, 4], [19.5, 4], [19.5, 7], [17.5, 7], [17.5, 10.5], [22, 13.5], [22, 15], [9, 15], [9, 13.5], [13.5, 10.5], [13.5, 7], [11.5, 7]];
  return polyLA(P12, sharp ? P12.map(() => 0) : [1, 1, 1, 0.5, 1, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 1]);
}
function listPin(sharp) {
  const pin = pinLA(sharp), needle = openRun([[15.5, 15], [15.5, 20]], sharp, 'end');
  const r = rules([[10, 2, 7], [15, 2, 5], [20, 2, 11]], sharp);
  const plate = dLA(growLA(pin));
  return {
    stroke: [S(dLA(pin) + needle + r)],
    'two-tone': [Pl(plate), M(r), S(dLA(pin) + needle)],
    duotone: [M(r + needle), F(plate)],
    fill: [F(plate), S(needle + r)],
  };
}
def('list-pin', listPin, [1, 3, 23, 21]);

// plug-circle: Zafar's plug-2-or-plug-circle, named as bot-circle is: the shipped at's ring and
// tail, the tail turned in to become the cord of the shipped unplug's plug, mirrored, inside. As he
// drew it. Styles as unplug's: the plug's plate in two-tone, a black body and grey prongs and cord
// in duotone, the solid body in fill.
const PLUG_RING = 'M17 20.6603C15.4798 21.5379 13.7554 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12L22 13C22 14.6569 20.6569 16 19 16C18.2316 16 17.5308 15.7112 17 15.2361';
// His plug was unplug's at 1.03 to 1.05, which put its corners on r=2.06 and 2.11; it is unplug's own
// plug here, mirrored, moved up the diagonal until the tail's end lands on its back (PLUG_T),
// which leaves the back exactly 2 off the ring.
const PLUG_T = (() => {
  // unplug's plug back: centre (7.1855, 16.8145), mirrored to (16.8145, 16.8145)
  const c = 16.8145, r = Math.hypot(10.4853 - 7.1855, 20.1144 - 16.8145), e = [17, 15.2361];
  return L.bisect((t) => Math.hypot(e[0] - (c - t), e[1] - (c - t)) - r, 2, 6);
})();
const plugPart = (sharp) => subs(rawLayers('unplug', 'stroke', C(sharp))[0].d)
  .filter((sub) => meanAxis(sub, 0) - meanAxis(sub, 1) < 0 && !/L(2 22|1\.7071 22\.2929)$/.test(sub))
  .map((sub) => mapPts(sub, ([x, y]) => [24 - x - PLUG_T, y - PLUG_T]));
function plugCircle(sharp) {
  const ring = sharp ? stubEnds(PLUG_RING, 'start', [1, 1, 23, 23]) : PLUG_RING;
  const [body, ...pr] = plugPart(sharp);
  const prongs = pr.join('');
  const solid = E([B.grow(shapeOf(body)[0])]);
  return {
    stroke: [S(ring + body + prongs)],
    'two-tone': [Pl(solid), S(ring + body + prongs)],
    duotone: [M(ring + prongs), F(solid)],
    fill: [F(solid), S(ring + prongs)],
  };
}
def('plug-circle', plugCircle, [1, 1, 23, 23]);

// book-open-2: Zafar's, a second drawing of book-open: the book open with its left page standing,
// part turned, over the cover. His page edges were free cubics that fit circles to within 0.07 (the
// standing page's top R 8.25, the cover's bottom R 20, the right page's bottom R 13.6), so they are
// those circles now, through whole points: every edge meets the spine at its top T (13, 8) or its
// foot (13, 21), where his met it at four points 0.6 apart. The standing page's bottom now lands on
// the foot along the spine (R 5 about (8, 21)) instead of at 56 degrees, which closed the cover's
// last 3 units of white between them into a wedge. Corners r 1 on the cover and the standing page,
// r 2 on the right page, as he had them; the standing page's top-left fillet sits on (8, 4) so the
// top paints 2. Paints 2..22 both ways.
// Sharp: the fillets come off and the edges run on to true corners; the standing page's top is
// re-solved through (7, 3) at the same R 8, since the regular arc runs on to y 2.66 and would paint
// above the box. The two arcs at the foot meet there as one path, so its round join paints 22.
// Two-tone: one plate under the whole book. Duotone: the standing page black over the full grey
// book, as circles is. Fill, as Zafar drew it on 18 Oct: the solid book with the standing page's
// inside knocked out to its stroke's inner edge, so the page stands white in its own outline; slots
// on the free edge and spine read as two scratches rather than a page.
const BOOK2 = (() => {
  const T = [13, 8], Ft = [13, 21], J = [7, 6];
  const below = (cs) => cs.sort((s, t) => t[1] - s[1])[0];
  // the circle of radius R through p that holds the fillet (q, rq) inside it; and through p and q
  const holding = (p, q, rq, R) => {
    const dd = Math.hypot(q[0] - p[0], q[1] - p[1]), a = (R * R - (R - rq) ** 2 + dd * dd) / (2 * dd), h = Math.sqrt(R * R - a * a);
    const u = [(q[0] - p[0]) / dd, (q[1] - p[1]) / dd], m = [p[0] + a * u[0], p[1] + a * u[1]];
    return below([[m[0] - h * u[1], m[1] + h * u[0]], [m[0] + h * u[1], m[1] - h * u[0]]]);
  };
  const through = (p, q, R) => holding(p, q, 0, R);
  const touch = (c, R, q) => L.add(c, L.mul(L.unit(L.sub(q, c)), R));
  const yAt = (c, R, x) => c[1] - Math.sqrt(R * R - (x - c[0]) ** 2);
  const arc = (c, r, a0, a1) => L.arcC(c, r, typeof a0 === 'number' ? a0 : angOf(c, a0), typeof a1 === 'number' ? a1 : angOf(c, a1));
  const cTop = holding(T, [8, 4], 1, 8), cTopS = through(T, [7, 3], 8), cRight = holding(T, [19, 7], 2, 10);
  const cCover = [4, 40.25], rCover = 21.25, cFoot = [19, 29], cPage = [8, 21];
  const tPage = touch(cTop, 8, [8, 4]), tRight = touch(cRight, 10, [19, 7]);
  const bl = [3, yAt(cCover, rCover, 3)], br = [21, yAt(cFoot, 10, 21)], tr = [21, yAt(cRight, 10, 21)], pl = [7, cPage[1] - Math.sqrt(24)];
  return {
    T, Ft, J,
    // toT: the cover and the right page, from the junction J round to T; top: the standing page's
    // top to its free edge; page: down that edge to the foot
    regular: {
      toT: `M${P(J)}L4 6` + arc([4, 7], 1, -90, -180) + 'L3 18' + arc([4, 18], 1, 180, 90) + arc(cCover, rCover, -90, Ft)
        + arc(cFoot, 10, Ft, -90) + arc([19, 17], 2, 90, 0) + 'L21 7' + arc([19, 7], 2, 0, tRight) + arc(cRight, 10, tRight, T),
      top: arc(cTop, 8, T, tPage) + arc([8, 4], 1, tPage, -180),
      page: 'L7 15' + arc([8, 15], 1, 180, 90) + arc(cPage, 5, -90, 0),
    },
    sharp: {
      toT: `M${P(J)}L3 6L${P(bl)}` + arc(cCover, rCover, bl, Ft) + arc(cFoot, 10, Ft, br) + `L${P(tr)}` + arc(cRight, 10, tr, T),
      top: arc(cTopS, 8, T, [7, 3]),
      page: `L${P(pl)}` + arc(cPage, 5, pl, 0),
    },
  };
})();
function bookOpen2(sharp) {
  const g = sharp ? BOOK2.sharp : BOOK2.regular, { T, Ft, J } = BOOK2;
  const stroke = g.toT + g.top + g.page + `M${P(T)}L${P(Ft)}`;
  const silhouette = B.grow(shapeOf(g.toT + g.top + `L${P(J)}Z`)[0]);
  const front = B.grow(shapeOf(`M${P(T)}` + g.top + g.page + `L${P(T)}Z`)[0]);
  const inside = B.shrink(shapeOf(`M${P(T)}` + g.top + g.page + `L${P(T)}Z`)[0]);
  return {
    stroke: [S(stroke)],
    'two-tone': [Pl(E([silhouette])), S(stroke)],
    duotone: [Pl(E([silhouette])), F(E([front]))],
    fill: [F(E(B.subtract([silhouette], [inside])))],
  };
}
def('book-open-2', bookOpen2, [2, 2, 22, 22]);

/* ================================================================ ampersand */
// Redrawn from scratch, as Zafar asked: his ran on free cubics whose loop was no circle, whose arm
// curled back on itself and whose bowl broke at the turn. Built from circles and tangents instead,
// one stroke as written: the arm's end at the right extreme of the bowl's big arc (r=9 about
// (9, 12)), down that arc to the bottom, on round the small arc (r=5 about (9, 16)) that sets the
// left side, up the cross stroke (the internal tangent of that arc and the loop), round the loop
// (r=3.5 about (10.5, 6.5)) against the clock, and down the leg, tangent off the loop, to the foot
// at (20, 21). The leg crosses the cross stroke and the bowl, as an ampersand's does; 15 per cent of
// it lies on the other set's (theirs bends its cross stroke and leg and caps the arm with a serif).
// Paints 3..21 by 2..22. A symbol: every style the stroke. Sharp: the two ends take the stub.
const rad = (a) => (a * Math.PI) / 180, degA = (a) => (a * 180) / Math.PI;
const cwT = (a) => [-Math.sin(rad(a)), Math.cos(rad(a))];
const nrm = (v) => { const k = Math.hypot(v[0], v[1]); return [v[0] / k, v[1] / k]; };
function tangentsCC(c1, r1, c2, r2) {
  const out = [], d = L.sub(c2, c1), D = Math.hypot(d[0], d[1]), base = Math.atan2(d[1], d[0]);
  for (const s of [1, -1]) {
    const cosT = (r1 - s * r2) / D;
    if (Math.abs(cosT) > 1) continue;
    for (const k of [1, -1]) {
      const a1 = base + k * Math.acos(cosT), n = [Math.cos(a1), Math.sin(a1)];
      const p1 = L.add(c1, L.mul(n, r1)), p2 = L.add(c2, L.mul(n, s * r2));
      out.push({ p1, p2, a1: degA(a1), a2: degA(Math.atan2(p2[1] - c2[1], p2[0] - c2[0])), s });
    }
  }
  return out;
}
const AMP = { U: [10.5, 6.5], rU: 3.5, Wl: [9, 16], rWl: 5, Rr: 9, F: [20, 21] };
function ampersandD(sharp) {
  const { U, rU, Wl, rWl, Rr, F } = AMP, Wr = [Wl[0], Wl[1] + rWl - Rr];
  const along = (t, a, sign) => L.dot(nrm(L.sub(t.p2, t.p1)), cwT(a)) * sign > 0.999;
  const cross = tangentsCC(Wl, rWl, U, rU).find((t) => t.s === -1 && along(t, t.a1, 1) && along(t, t.a2, -1));
  const leg = tangentsCC(U, rU, F, 0).find((t) => L.dot(nrm(L.sub(F, t.p1)), cwT(t.a1)) < -0.999);
  assert(cross && leg, 'ampersand tangents');
  let w1 = cross.a1; while (w1 < 90) w1 += 360;
  let u1 = leg.a1; while (u1 > cross.a2) u1 -= 360;
  const d = `M${P(L.add(Wr, [Rr, 0]))}` + L.arcC(Wr, Rr, 0, 90) + L.arcC(Wl, rWl, 90, w1) + `L${P(cross.p2)}` + L.arcC(U, rU, cross.a2, u1) + `L${P(F)}`;
  return sharp ? stubEnds(d, 'both', [3, 2, 21, 22]) : d;
}
def('ampersand', (sharp) => allStroke(ampersandD(sharp)), [3, 2, 21, 22]);
