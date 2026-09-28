/**
 * Emit the last 1.0.0 singles into raw/ (or --out=DIR/raw).
 *   node tools/singles-1-0-0-b/build.mjs [--out=DIR] [name ...]
 *
 * Twenty-six names asked for on 17 Sep 2026, less `screen-share`, dropped on his
 * word; `cctv-2` dropped the same day; `cctv` was flipped, levelled and put back.
 * `app-window` lost its title-bar rule the same day and the ruled drawing became
 * `app-window-2`; the plus, minus, x and cursor compounds are built on the new
 * base (sparkle, shield and lock were asked for and do not fit a 6-unit box).
 * Every drawing is lines and circular arcs, so every plate is `offsetContour`
 * at 1 and every knockout is `outlineRun`, both exact.
 *
 * Styles follow the 1.0.0 rules in the skill: two-tone is the stroke over its
 * plate; duotone is designed per icon (plate grey with the detail black, a
 * solid mass black with its attached strokes grey, front black over back grey,
 * or the stroke drawing for a one-shape icon); fill is the plate with the
 * detail knocked out. An open glyph owes no plate, so its two-tone and duotone
 * grey one element and its fill is the stroke.
 *
 * Sharp squares every fillet, pushes every free end out by the cut rule and
 * keeps shape arcs (rings, rolls, the mouse's egg, the earth's coasts). Where
 * a squared corner would paint past the rounded box the construction is solved
 * again for sharp, so both treatments paint one box.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Path, polyContour, circlePath, onArc, fillet, add, sub, mul, len, unit, dot } from '../v5/geom.mjs';
import { offsetContour, contourPath, verify, clipContour } from '../v5/offset.mjs';
const segStart = (s) => (s.type === 'L' ? s.p0 : onArc(s.c, s.r, s.a0));
const segEnd = (s) => (s.type === 'L' ? s.p1 : onArc(s.c, s.r, s.a1));
import { outlineRun, unionContours, subtractContours } from '../v6/outline.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const rad = (a) => (a * Math.PI) / 180;
const rot = (p, c, a) => { const s = Math.sin(rad(a)), k = Math.cos(rad(a)); const x = p[0] - c[0], y = p[1] - c[1]; return [c[0] + x * k - y * s, c[1] + x * s + y * k]; };
const f4 = (v) => { if (!Number.isFinite(v)) throw new Error(`non-finite ${v}`); const r = Math.round(v * 1e4) / 1e4; return String(Object.is(r, -0) ? 0 : r); };
const P2 = (p) => `${f4(p[0])} ${f4(p[1])}`;

function solve(fn, target, lo, hi, it = 80) {
  const s = Math.sign(fn(hi) - fn(lo));
  if (!s) throw new Error('solve: flat');
  for (let i = 0; i < it; i++) { const m = (lo + hi) / 2; if ((fn(m) - target) * s > 0) hi = m; else lo = m; }
  return (lo + hi) / 2;
}

/* ------------------------------------------------------------ primitives */

/** An open run with fillets; sharp drops the fillets and pushes free ends out. */
function run(pts, radii = [], { sharp = false, free = [false, false], box = [1, 1, 23, 23], keep = false } = {}) {
  const Q = pts.map((p) => [...p]);
  const n = Q.length;
  if (sharp && free[0]) { const d = unit(sub(Q[0], Q[1])); Q[0] = add(Q[0], mul(d, sharpEndIn(Q[0], d, box))); }
  if (sharp && free[1]) { const d = unit(sub(Q[n - 1], Q[n - 2])); Q[n - 1] = add(Q[n - 1], mul(d, sharpEndIn(Q[n - 1], d, box))); }
  const p = new Path().M(Q[0]);
  for (let i = 1; i < n - 1; i++) p.corner(Q[i], Q[i + 1], sharp && !keep ? 0 : radii[i] || 0);
  p.L(Q[n - 1]);
  return p;
}
const closed = (pts, radii, sharp) => polyContour(pts, sharp ? pts.map(() => 0) : radii);
const ring = (c, r) => ({ d: circlePath(c, r), segs: [{ type: 'A', c, r, a0: 0, a1: 360 }] });
const segsD = (segs) => contourPath(segs, false);

/** The plate of a closed contour: offset a unit and verified sample by sample. */
function plate(segs) {
  const off = offsetContour(segs.map((s) => ({ ...s })), 1);
  verify(segs, off, 1, 0.003);
  return contourPath(off);
}
/** A stroked run's ink as one closed contour. */
const capsule = (segs, sharp) => contourPath(outlineRun(segs.map((s) => ({ ...s })), 1, sharp ? 'butt' : 'round'));
/** Several crossing runs' ink as one outline. */
function inkUnion(runs, sharp) {
  const cap = sharp ? 'butt' : 'round';
  const loops = unionContours(runs.map((r) => outlineRun(r.map((s) => ({ ...s })), 1, cap)), runs, 1, cap);
  return loops.map((l) => contourPath(l)).join('');
}
const rect = (x0, y0, x1, y1) => `M${P2([x0, y0])}L${P2([x1, y0])}L${P2([x1, y1])}L${P2([x0, y1])}Z`;
const polyD = (pts) => `M${P2(pts[0])}` + pts.slice(1).map((q) => `L${P2(q)}`).join('') + 'Z';


/* --------------------------------------------------------------- winding */

/**
 * Wind every subpath of a solid by its depth, outer clockwise and each hole
 * against the shape it sits in, so non-zero and even-odd paint one picture.
 * Figma fills even-odd and a browser non-zero; a hole wound with its outline
 * is a white nick in one and solid in the other.
 */
function subpathPts(sp) {
  const pts = [];
  let cur = null;
  for (const m of sp.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const v = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M' || m[1] === 'L') { cur = [v[0], v[1]]; pts.push(cur); }
    else if (m[1] === 'C') {
      const p0 = cur;
      for (let i = 1; i <= 12; i++) { const t = i / 12, u = 1 - t; pts.push([0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * v[k] + 3 * u * t * t * v[k + 2] + t * t * t * v[k + 4])); }
      cur = [v[4], v[5]];
    }
  }
  return pts;
}
const areaPts = (pts) => pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const insidePts = (poly, p) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
function reverseSub(sp) {
  const segs = [];
  let cur = null, start = null;
  for (const m of sp.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const v = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M') { cur = [v[0], v[1]]; start = cur; }
    else if (m[1] === 'L') { segs.push({ from: cur, to: [v[0], v[1]] }); cur = [v[0], v[1]]; }
    else if (m[1] === 'C') { segs.push({ from: cur, c1: [v[0], v[1]], c2: [v[2], v[3]], to: [v[4], v[5]] }); cur = [v[4], v[5]]; }
    else if (m[1] === 'Z' && Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-6) { segs.push({ from: cur, to: start }); cur = start; }
  }
  let d = `M${P2(start)}`;
  for (const g of segs.reverse()) d += g.c1 ? `C${P2(g.c2)} ${P2(g.c1)} ${P2(g.from)}` : `L${P2(g.from)}`;
  return d + 'Z';
}
function expandHV(d) {
  let cur = [0, 0], start = [0, 0], out = '';
  for (const m of d.matchAll(/([MLCHVZ])([^MLCHVZ]*)/g)) {
    const v = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M') { cur = [v[0], v[1]]; start = cur; out += `M${P2(cur)}`; }
    else if (m[1] === 'L') { cur = [v[0], v[1]]; out += `L${P2(cur)}`; }
    else if (m[1] === 'H') { cur = [v[0], cur[1]]; out += `L${P2(cur)}`; }
    else if (m[1] === 'V') { cur = [cur[0], v[0]]; out += `L${P2(cur)}`; }
    else if (m[1] === 'C') { cur = [v[4], v[5]]; out += `C${P2([v[0], v[1]])} ${P2([v[2], v[3]])} ${P2(cur)}`; }
    else { out += 'Z'; cur = start; }
  }
  return out;
}
function windByDepth(d0) {
  const d = expandHV(d0);
  const subs = d.split(/(?=M)/).filter(Boolean);
  const polys = subs.map(subpathPts);
  return subs.map((sp, i) => {
    const probe = polys[i][0];
    const depth = polys.filter((q, j) => j !== i && Math.abs(areaPts(q)) > Math.abs(areaPts(polys[i])) && insidePts(q, probe)).length;
    const want = depth % 2 === 0 ? 1 : -1;
    try { return Math.sign(areaPts(polys[i])) === want ? sp : reverseSub(sp); } catch (e) { throw new Error(`windByDepth: ${sp.slice(0, 160)}`); }
  }).join('');
}

/* ---------------------------------------------------------------- layers */

const S = (d) => ({ kind: 'stroke', d });
const M = (d) => ({ kind: 'muted', d });
const PL = (d) => ({ kind: 'plate', d });
const SO = (d) => ({ kind: 'solid', d });
const DOT = (d) => ({ kind: 'dot', d });
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
function doc(layers, sharp) {
  const cap = sharp ? 'butt' : 'round';
  const line = ({ kind, d }) => {
    if (kind === 'stroke') return `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`;
    if (kind === 'muted') return `<path d="${d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`;
    if (kind === 'plate') return `<path d="${d}" fill="black" fill-opacity="0.4"/>`;
    if (kind === 'dot') return `<path d="${d}" fill="black"/>`;
    return `<path fill-rule="evenodd" clip-rule="evenodd" d="${windByDepth(d)}" fill="black"/>`;
  };
  return [HEAD, ...layers.filter((l) => l.d).map(line), '</svg>', ''].join('\n');
}

const SETS = {};
const set = (name, box, build) => { build.box = box; SETS[name] = build; };

/* ------------------------------------------------------------ app-window */

set('app-window-2', [2, 2, 22, 22], (sharp) => {
  // a title bar ruled off under the top edge, three dots in it 2 clear of both
  // rules: the rule is what every window drawing shares, the dots are ours
  const body = closed([[3, 3], [21, 3], [21, 21], [3, 21]], [3, 3, 3, 3], sharp);
  const rule = run([[3, 11], [21, 11]]);
  const inset = sharp ? run([[4, 11], [20, 11]]) : run([[5, 11], [19, 11]]);
  const marks = ring([7, 7], 1).d + ring([11, 7], 1).d + ring([15, 7], 1).d;
  const pl = plate(body.segs);
  return {
    stroke: [S(body.d + rule.d), DOT(marks)],
    'two-tone': [PL(pl), S(body.d + rule.d), DOT(marks)],
    duotone: [PL(pl), S(inset.d), DOT(marks)],
    fill: [SO(pl + rect(4, 10, 20, 12) + marks)],
  };
});

set('app-window', [2, 2, 22, 22], (sharp) => {
  // the window with the three dots alone marking the title bar, 2 clear of the
  // top edge; app-window-2 rules the bar off under them
  const body = closed([[3, 3], [21, 3], [21, 21], [3, 21]], [3, 3, 3, 3], sharp);
  const marks = ring([7, 7], 1).d + ring([11, 7], 1).d + ring([15, 7], 1).d;
  const pl = plate(body.segs);
  return {
    stroke: [S(body.d), DOT(marks)],
    'two-tone': [PL(pl), S(body.d), DOT(marks)],
    duotone: [PL(pl), DOT(marks)],
    fill: [SO(pl + marks)],
  };
});

/* ------------------------------------------------ app-window compounds */

// A house raw file as layers, the way file-type reads file-text.
function houseLayers(name, style, sharp) {
  const svg = readFileSync(join(ROOT, 'raw', name, `Container=regular, Style=${style}, Corners=${sharp ? 'sharp' : 'regular'}.svg`), 'utf8');
  return [...svg.matchAll(/<path ([^>]*)\/>/g)].map((m) => {
    const d = /\bd="([^"]+)"/.exec(m[1])[1];
    if (/fill-opacity="0.4"/.test(m[1])) return PL(d);
    if (/stroke-opacity="0.4"/.test(m[1])) return M(d);
    if (/stroke="black"/.test(m[1])) return S(d);
    if (/fill-rule/.test(m[1])) return SO(d);
    return DOT(d);
  });
}
const shift = (d, dx, dy) => expandHV(d).replace(/([MLC])([^MLCZ]*)/g, (m, k, v) => k + v.trim().split(/[\s,]+/).map((n, i) => f4(+n + (i % 2 ? dy : dx))).join(' ').replace(/(\S+ \S+) /g, '$1 '));
const WINDOW_DOTS = ring([7, 7], 1).d + ring([11, 7], 1).d + ring([15, 7], 1).d;
// app-plus, app-minus and app-x already carry the corner cut and the notched
// plate the app family uses; the window's dots go in above them unchanged
for (const [name, from] of [['app-window-plus', 'app-plus'], ['app-window-minus', 'app-minus'], ['app-window-x', 'app-x']]) {
  set(name, [2, 2, 22, 22], (sharp) => {
    const L = (st) => houseLayers(from, st, sharp);
    return {
      stroke: [...L('stroke'), DOT(WINDOW_DOTS)],
      'two-tone': [...L('two-tone'), DOT(WINDOW_DOTS)],
      duotone: [...L('duotone'), DOT(WINDOW_DOTS)],
      fill: L('fill').map((l) => (l.kind === 'solid' ? SO(l.d + WINDOW_DOTS) : l)),
    };
  });
}
// The cursor is globe-cursor's modifier moved from its 16..22 box onto the
// window's corner and drawn at 4/3 about it, so it runs 13..21 rather than the
// sign box's 15..21 (his, 28 Sep 2026: "I want the app-window-cursor's cursor to
// be bigger, even against the rules"). Its fillets grow with it, as the modifier's
// did from `cursor`'s. The window keeps app-plus's cut at 11, which leaves 2.31
// of daylight to each cut end where the lines would cross the cursor.
//
// A cursor this size reaches past app-plus's notched plate, and an outline
// opened for a glyph takes no plate notched round it (his ruling, 24 Sep 2026),
// so the styles are cursor-window's open frame: two-tone greys the cursor alone,
// duotone greys the window and its dots under a black cursor, fill strokes the
// window round a solid cursor.
const CURSOR_SCALE = 4 / 3, CURSOR_CORNER = [21, 21];
/** globe-cursor's modifier as a polygon and its fillet radii, read off its own edges. */
function cursorOf(sharp) {
  const globe = houseLayers('globe-cursor', 'stroke', sharp)[0].d;
  const d = shift(globe.slice(globe.lastIndexOf('M')), -1, -1);
  const lines = [];
  let cur = null;
  for (const [, k, v] of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const q = v.trim() ? v.trim().split(/[\s,]+/).map(Number) : [];
    if (k === 'M') cur = [q[0], q[1]];
    else if (k === 'L') { lines.push([cur, [q[0], q[1]]]); cur = [q[0], q[1]]; }
    else if (k === 'C') cur = [q[4], q[5]];
  }
  if (lines.length !== 4) throw new Error(`globe-cursor's cursor has ${lines.length} edges`);
  // sharp is the bare polygon, each edge starting on a vertex; rounded has a
  // fillet after every edge, its vertex where that edge and the next one meet
  if (sharp) return { pts: lines.map(([a]) => a), radii: [0, 0, 0, 0] };
  const meet = ([a, b], [c, e]) => { const r = sub(b, a), s = sub(e, c); return add(a, mul(r, ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / (r[0] * s[1] - r[1] * s[0]))); };
  const pts = [], radii = [];
  for (let i = 0; i < 4; i++) {
    const [A, T] = lines[(i + 3) % 4], [, B] = lines[i], V = meet(lines[(i + 3) % 4], lines[i]);
    pts.push(V);
    radii.push(len(sub(T, V)) * Math.tan(Math.acos(dot(unit(sub(A, V)), unit(sub(B, V)))) / 2));
  }
  // the reading holds only if every fillet lands back on the edges' own ends
  for (let i = 0; i < 4; i++) {
    const f = fillet(pts[(i + 3) % 4], pts[i], pts[(i + 1) % 4], radii[i]);
    const off = Math.max(len(sub(f.T1, lines[(i + 3) % 4][1])), len(sub(f.T2, lines[i][0])));
    if (off > 2e-3) throw new Error(`app-window-cursor: corner ${i} of the modifier comes back ${off.toFixed(4)} out`);
  }
  return { pts, radii };
}
set('app-window-cursor', [2, 2, 22, 22], (sharp) => {
  const [plusStroke] = houseLayers('app-plus', 'stroke', sharp);
  const body = plusStroke.d.slice(0, plusStroke.d.indexOf('M', 1));
  const small = cursorOf(sharp);
  const cursor = closed(small.pts.map((p) => add(CURSOR_CORNER, mul(sub(p, CURSOR_CORNER), CURSOR_SCALE))), small.radii.map((r) => r * CURSOR_SCALE), sharp);
  const solid = plate(cursor.segs);
  return {
    stroke: [S(body + cursor.d), DOT(WINDOW_DOTS)],
    'two-tone': [PL(cursor.d), S(body + cursor.d), DOT(WINDOW_DOTS)],
    duotone: [M(body), PL(WINDOW_DOTS), SO(solid)],
    fill: [S(body), SO(solid + WINDOW_DOTS)],
  };
});

/* ---------------------------------------------------------- sticky-notes */

set('sticky-notes', [1, 1, 23, 23], (sharp) => {
  // copy's back sheet behind a note folded as sticky-note is, top right
  const copy = (style) => readFileSync(join(ROOT, 'raw', 'copy', `Container=regular, Style=${style}, Corners=${sharp ? 'sharp' : 'regular'}.svg`), 'utf8');
  const back = /d="(M[^"]*?)M(?:11 8|8 8)/.exec(copy('stroke'))[1];
  const front = closed([[8, 8], [16, 8], [22, 14], [22, 22], [8, 22]], [3, 0, 0, 3, 3], sharp);
  const f = noteFold(22, 8, sharp);
  const pl = plate(front.segs);
  return {
    stroke: [S(back + front.d + f.L)],
    'two-tone': [PL(pl), S(back + front.d + f.L)],
    // the fold is a surface detail, so it shows grey through the black front
    // note rather than white (the cut-out rule; his go, 17 Sep 2026)
    duotone: [M(back), PL(f.hole), SO(pl + f.hole)],
    fill: [S(back), SO(pl + f.hole)],
  };
});

/* ----------------------------------------------------------- sticky-note */

// The note is drawn on `file`'s construction, not beside it: the fold takes the
// TOP-right corner (6-unit chamfer, the L's corner r=3), so every modifier sits
// in the standard bottom-right box on app-plus/file-check's cut, the slash is
// the standard M2 2L22 22 with file-off's cuts and pieces, the duotone is
// file's (plate grey, fold black; -off: only the slash black) and the fill
// knocks out file's fold hole. `r`,`t` are the note's right edge and top.
function noteFold(r, t, sharp) {
  const L = run([[r - 6, t], [r - 6, t + 6], [r, t + 6]], [0, 3, 0], { sharp }).d;
  const duo = sharp
    ? [SO(polyD([[r - 7, t - 1], [r - 5.5858, t - 1], [r + 1, t + 5.5858], [r + 1, t + 7], [r - 7, t + 7]]) + polyD([[r - 5, t + 2.4142], [r - 5, t + 5], [r - 2.4142, t + 5]]))]
    : [S(`M${P2([r, t + 6])}L${P2([r - 6, t])}` + L)];
  const hole = sharp
    ? polyD([[r - 6, t + 6], [r - 1.4142, t + 6], [r - 6, t + 1.4142]])
    : new Path().M([r - 6, t + 3]).A([r - 3, t + 3], 180, 90, -1).L([r - 1.4142, t + 6]).L([r - 6, t + 1.4142]).Z().d;
  return { L, duo, hole };
}
const noteBody = (sharp) => closed([[3, 3], [15, 3], [21, 9], [21, 21], [3, 21]], [3, 0, 0, 3, 3], sharp);
set('sticky-note', [2, 2, 22, 22], (sharp) => {
  const body = noteBody(sharp);
  const f = noteFold(21, 3, sharp);
  const pl = plate(body.segs);
  return {
    stroke: [S(body.d + f.L)],
    'two-tone': [PL(pl), S(body.d + f.L)],
    duotone: [PL(pl), ...f.duo],
    fill: [SO(pl + f.hole)],
  };
});
// the signs in app-plus's box 15..21, file-check's check moved one to the right
const NOTE_SIGNS = {
  plus: ['M18 15L18 21M15 18L21 18', 'M18 14L18 22M14 18L22 18'],
  minus: ['M15 18L21 18', 'M14 18L22 18'],
  x: ['M15 15L21 21M21 15L15 21', 'M14.7071 14.7071L21.2929 21.2929M21.2929 14.7071L14.7071 21.2929'],
  check: ['M15 19L17 21L21 17', 'M14.7071 18.7071L17 21L21.2929 16.7071'],
};
for (const [sign, [reg, shp]] of Object.entries(NOTE_SIGNS)) {
  set(`sticky-note-${sign}`, [2, 2, 22, 22], (sharp) => {
    const e = sharp ? 12 : 11;
    const body = run([[15, 3], [3, 3], [3, 21], [e, 21]], [0, 3, 3, 0], { sharp }).d + run([[15, 3], [21, 9], [21, e]], [], { sharp }).d;
    const sil = closed([[3, 3], [15, 3], [21, 9], [21, 11], [11, 11], [11, 21], [3, 21]], [3, 0, 0, 0, 4, 0, 3], sharp);
    const f = noteFold(21, 3, sharp);
    const mark = sharp ? shp : reg;
    const pl = plate(sil.segs);
    return {
      stroke: [S(body + f.L + mark)],
      'two-tone': [PL(pl), S(body + f.L + mark)],
      duotone: [PL(pl), ...f.duo, S(mark)],
      fill: [SO(pl + f.hole), S(mark)],
    };
  });
}
set('sticky-note-off', [1, 1, 23, 23], (sharp) => {
  // file-off's construction: the slash crosses the top-left and bottom-right
  // corners head on, the near piece (left and bottom) stops on its centre line,
  // the far piece (top edge, fold, right side) is cut back to 4, sharp's butt
  // ends one further; duotone greys everything but the slash
  const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
  const near = sharp
    ? 'M3 3L3 21L21 21'
    : new Path().M(onArc([6, 6], 3, 225)).A([6, 6], 225, 180, -1).L([3, 18]).A([6, 18], 180, 90, -1).L([18, 21]).A([18, 18], 90, 45, -1).d;
  const c = 3 + 4 * Math.SQRT2 + (sharp ? -1 : 0);      // top end x; right end y is 24 - c
  const far = run([[c, 3], [15, 3], [21, 9], [21, 24 - c]], [], { sharp }).d;
  const f = noteFold(21, 3, sharp);
  const off = offsetContour(noteBody(sharp).segs.map((q) => ({ ...q })), 1);
  const [nearPlate] = clipContour(off, [12, 12], [-Math.SQRT1_2, Math.SQRT1_2], 0, 1);
  const nearPl = contourPath([...nearPlate, { type: 'L', p0: segEnd(nearPlate[nearPlate.length - 1]), p1: segStart(nearPlate[0]) }]);
  const k = Math.SQRT1_2;
  const chamferAt = (cx, cy, a) => onArc([cx, cy], 1, a);
  const farSolid = sharp
    ? `M${P2([c, 2])}L15 2` + new Path().M([15, 2]).A([15, 3], 270, 315, 1).L(chamferAt(21, 9, 315)).A([21, 9], 315, 360, 1).d.replace(/^M[^C]*/, '') + `L22 ${f4(24 - c)}L20 ${f4(24 - c)}L${P2([c, 4])}Z`
    : new Path().M([c - k, 3 + k]).A([c, 3], 135, 270, 1).L([15, 2]).A([15, 3], 270, 315, 1).L(chamferAt(21, 9, 315)).A([21, 9], 315, 360, 1)
      .L([22, 24 - c]).A([21, 24 - c], 0, 135, 1).Z().d;
  return {
    stroke: [S(near + far + f.L + slash)],
    'two-tone': [PL(nearPl), M(far + f.L), S(near + slash)],
    duotone: [PL(nearPl), M(far + f.L), S(slash)],
    fill: [SO(nearPl + farSolid + f.hole), S(slash)],
  };
});

/* ----------------------------------------------------------- scroll-text */

// dropped on his word, 17 Sep 2026; the block is kept in session 4b774f10's
// scratchpad `grad/dropped/scroll-text/build-block.mjs`

/* ------------------------------------------------------------- newspaper */

// dropped on his word, 17 Sep 2026; the block is kept in session 4b774f10's
// scratchpad `grad/dropped/newspaper/build-block.mjs`

/* ----------------------------------------------------------- folder-tree */

set('folder-tree', [2, 2, 22, 22], (sharp) => {
  // his drawing (refs/folder-tree.svg, 17 Sep 2026), fitted: the trunk flush
  // with the top folder, both branches leaving it on r=3 corners at 8 and 19 and
  // running to 9, two 8-by-7 folders at x 13..21 with the tab flat for 3 and a
  // drop of 2 over 1, every folder corner r=1
  const box = [2, 2, 22, 22];
  const folder = (x0, y0, x1, y1) => closed([[x0, y0], [x0 + 3, y0], [x0 + 4, y0 + 2], [x1, y0 + 2], [x1, y1], [x0, y1]], [1, 1, 1, 1, 1, 1], sharp);
  const top = folder(13, 3, 21, 10), low = folder(13, 14, 21, 21);
  const tree =
    run([[3, 3], [3, 19], [9, 19]], [0, 3, 0], { sharp, free: [true, true], box }).d +
    run([[3, 5], [3, 8], [9, 8]], [0, 3, 0], { sharp, free: [false, true], box }).d;
  const pls = plate(top.segs) + plate(low.segs);
  return {
    stroke: [S(tree + top.d + low.d)],
    'two-tone': [PL(pls), S(tree + top.d + low.d)],
    duotone: [PL(pls), S(tree)],
    fill: [SO(pls), S(tree)],
  };
});

/* --------------------------------------------------------------- recycle */

function recycleArrows(Rv, c, a, sharp, box) {
  // the turn at each corner is the arrow's own bend, not a fillet, so sharp keeps it
  const r = 3;
  const V = [-90, 30, 150].map((q) => onArc(c, Rv, q));
  return V.map((B, i) => {
    const A = V[(i + 2) % 3], C = V[(i + 1) % 3];
    const s = len(sub(C, B));
    const tail = add(B, mul(unit(sub(A, B)), s / 2 - 2));
    const tip = add(B, mul(unit(sub(C, B)), s / 2 - 2));
    const u = unit(sub(tip, B));
    const arms = [135, -135].map((g) => add(tip, mul(rot(u, [0, 0], g), a)));
    return run([tail, B, tip], [0, r, 0], { sharp, free: [true, false], box, keep: true }).d + run([arms[0], tip, arms[1]], [], { sharp, free: [true, true], box }).d;
  });
}
function inkOfStroke(d, sharp) { return strokedBBox(d, 1, sharp ? 'butt' : 'round'); }
function fitRecycle(sharp) {
  // two numbers, two sizes: the arm length sets the width once the triangle's
  // radius has set the height, so each is bisected inside the other
  const loose = [0, 0, 24, 24];
  const measure = (Rv, a) => {
    const b = inkOfStroke(recycleArrows(Rv, [12, 12], a, sharp, loose).join(''), sharp);
    return b;
  };
  const RvFor = (a) => solve((Rv) => { const b = measure(Rv, a); return b[3] - b[1]; }, 22, 6, 16);
  const a = solve((a) => { const Rv = RvFor(a); const b = measure(Rv, a); return b[2] - b[0]; }, 22, 2.5, 5);
  const Rv = RvFor(a);
  const b = measure(Rv, a);
  const c = [12 - ((b[0] + b[2]) / 2 - 12), 12 - ((b[1] + b[3]) / 2 - 12)];
  return { Rv, a, c };
}
set('recycle', [1, 1, 23, 23], (sharp) => {
  // the bends are kept in sharp and each butt end paints where its round cap
  // reached, so both treatments sit on the rounded fit
  const { Rv, a, c } = fitRecycle(false);
  const [grey, ...black] = recycleArrows(Rv, c, a, sharp, [0, 0, 24, 24]);
  return {
    stroke: [S(grey + black.join(''))],
    'two-tone': [M(grey), S(black.join(''))],
    duotone: [M(grey), S(black.join(''))],
    fill: [S(grey + black.join(''))],
  };
});

/* ------------------------------------------------------ car, car-front */

// Dropped on his word 17 Sep 2026 after two redraws.

/* ----------------------------------------------------------------- earth */

/**
 * A filleted polyline offset a unit to one side: each run moves along its
 * normal, a corner on the outside of the offset takes r + 1 and one on the
 * inside r - 1, and both ends are trimmed back onto the circle `trimR` about
 * `c`, so the piece closes cleanly against a disc.
 */
function offsetCoast(pts, radii, side, c, trimR) {
  const n = pts.length;
  const nrm = (a, b) => { const u = unit(sub(b, a)); return mul([u[1], -u[0]], side); };
  const lines = pts.slice(1).map((q, i) => { const k = nrm(pts[i], q); return [add(pts[i], k), add(q, k)]; });
  const meetL = (A, B) => { const u = sub(A[1], A[0]), v = sub(B[1], B[0]); const den = u[0] * v[1] - u[1] * v[0]; const t = ((B[0][0] - A[0][0]) * v[1] - (B[0][1] - A[0][1]) * v[0]) / den; return add(A[0], mul(u, t)); };
  const Q = [lines[0][0]];
  const R = [0];
  for (let i = 1; i < n - 1; i++) {
    Q.push(meetL(lines[i - 1], lines[i]));
    const u = sub(pts[i], pts[i - 1]), v = sub(pts[i + 1], pts[i]);
    const turn = Math.sign(u[0] * v[1] - u[1] * v[0]);
    // side +1 offsets to the left of travel, which is the outside of a right turn
    const outside = turn * side > 0;
    R.push(Math.max(0, (radii[i] || 0) + (outside ? 1 : -1)));
  }
  Q.push(lines[n - 2][1]);
  R.push(0);
  const onCircle = (p0, p1) => {
    const d = sub(p1, p0), f = sub(p0, c);
    const A = dot(d, d), B = 2 * dot(f, d), C = dot(f, f) - trimR * trimR;
    const t = [(-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A), (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A)].sort((x, y) => Math.abs(x) - Math.abs(y))[0];
    return add(p0, mul(d, t));
  };
  Q[0] = onCircle(Q[0], Q[1]);
  Q[n - 1] = onCircle(Q[n - 1], Q[n - 2]);
  return { pts: Q, radii: R };
}
set('earth', [1, 1, 23, 23], (sharp) => {
  // Redrawn 17 Sep 2026 on his word: the Asia view, fitted from the continent
  // reference. Asia is one coast from the top-right of the ring to its left:
  // China's coast, Indochina curving down to the Malay tip, the Bay of Bengal,
  // a broad India, the Arabian Sea. Australia is a second coast in from the
  // bottom right. Every coast ends on the ring's centre line; sharp squares
  // the coasts' corners, and its land takes them at r = 0.5: r = 1 read the
  // same as the regular land, and 0 read as spikes.
  //
  // The coast is the border between land and ocean, so the two region styles
  // take it on its centre line: duotone lays the land black to the edge of a
  // grey disc with no rim, and the fill keeps the rim and knocks the land out
  // white inside its inner ink.
  const c = [12, 12];
  const on = (a) => onArc(c, 10, a);
  const k = (r) => (sharp ? 0 : r);
  const lands = [
    { pts: [on(-70), [15.5, 6.5], [16.3, 10], [15.5, 12.5], [14, 15.2], [12.8, 12], [11, 11.3], [8.5, 16.5], [6.3, 12.3], [4.8, 11.5], on(176)],
      radii: [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0], dir: 1 },
    { pts: [on(6), [18.2, 16], [16.8, 18.8], on(72)], radii: [0, 2, 2, 0], dir: -1 },
  ].map((l) => ({ ...l, radii: l.radii.map(k), shore: l.radii.map((r) => (sharp ? Math.min(r, 0.5) : r)) }));
  const coasts = lands.map((l) => run(l.pts, l.radii).d).join('');
  const rim = ring(c, 10).d;
  const ang = (p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
  // a coast's end moved along its own run onto the circle R
  const toCircle = (p0, p1, R) => {
    const d = sub(p1, p0), f = sub(p0, c);
    const A = dot(d, d), B = 2 * dot(f, d), C = dot(f, f) - R * R, s = Math.sqrt(B * B - 4 * A * C);
    return add(p0, mul(d, [(-B - s) / (2 * A), (-B + s) / (2 * A)].sort((x, y) => Math.abs(x) - Math.abs(y))[0]));
  };
  const land = ({ pts, shore, dir }, R) => {
    const q = pts.map((p) => [...p]), n = q.length;
    q[0] = toCircle(q[0], q[1], R);
    q[n - 1] = toCircle(q[n - 1], q[n - 2], R);
    const p = run(q, shore);
    return p.A(c, ang(p.cur), ang(q[0]), dir).Z().d;
  };
  const disc = circlePath(c, 11);
  return {
    stroke: [S(rim + coasts)],
    'two-tone': [PL(disc), S(rim + coasts)],
    duotone: [PL(disc), SO(lands.map((l) => land(l, 11)).join(''))],
    fill: [SO(disc + lands.map((l) => land(l, 9)).join(''))],
  };
});

/* ----------------------------------------------------------- hat-glasses */

set('hat-glasses', [1, 3, 23, 21], (sharp) => {
  const box = [1, 3, 23, 21];
  const crownPts = [[5, 10], [7, 4], [10, 4], [12, 5.5], [14, 4], [17, 4], [19, 10]];
  const crownR = [0, 2, 2, 2, 2, 2, 0];
  const crown = run(crownPts, crownR, { sharp });
  const brim = run([[2, 10], [22, 10]], [], { sharp, free: [true, true], box });
  const lenses = ring([7, 17], 3).d + ring([17, 17], 3).d;
  const bridge = new Path().M([10, 17]).A([12, 17], 180, 360, 1).d;
  // the hat's plate: the crown's own offset down to the brim's top, then round
  // the brim as a stadium
  const off = offsetContour(closed(crownPts, crownR, sharp).segs.map((s) => ({ ...s })), 1);
  const [top] = clipContour(off, [0, 9], [0, -1], 0, 1);
  const S0 = segStart(top[0]), E = segEnd(top[top.length - 1]);
  const hatSegs = sharp
    ? (E[0] > S0[0]
      ? [...top, { type: 'L', p0: E, p1: [23, 9] }, { type: 'L', p0: [23, 9], p1: [23, 11] }, { type: 'L', p0: [23, 11], p1: [1, 11] }, { type: 'L', p0: [1, 11], p1: [1, 9] }, { type: 'L', p0: [1, 9], p1: S0 }]
      : [...top, { type: 'L', p0: E, p1: [1, 9] }, { type: 'L', p0: [1, 9], p1: [1, 11] }, { type: 'L', p0: [1, 11], p1: [23, 11] }, { type: 'L', p0: [23, 11], p1: [23, 9] }, { type: 'L', p0: [23, 9], p1: S0 }])
    : E[0] > S0[0]
    ? [...top, { type: 'L', p0: E, p1: [22, 9] }, { type: 'A', c: [22, 10], r: 1, a0: -90, a1: 90 }, { type: 'L', p0: [22, 11], p1: [2, 11] }, { type: 'A', c: [2, 10], r: 1, a0: 90, a1: 270 }, { type: 'L', p0: [2, 9], p1: S0 }]
    : [...top, { type: 'L', p0: E, p1: [2, 9] }, { type: 'A', c: [2, 10], r: 1, a0: 270, a1: 90 }, { type: 'L', p0: [2, 11], p1: [22, 11] }, { type: 'A', c: [22, 10], r: 1, a0: 90, a1: -90 }, { type: 'L', p0: [22, 9], p1: S0 }];
  const hat = contourPath(hatSegs);
  const discs = circlePath([7, 17], 4) + circlePath([17, 17], 4);
  return {
    stroke: [S(crown.d + brim.d + lenses + bridge)],
    'two-tone': [PL(hat + discs), S(crown.d + brim.d + lenses + bridge)],
    // the lenses are the fill's solid part, so they go solid black rather than
    // black rings round a white centre (his go, 17 Sep 2026)
    duotone: [PL(hat), SO(discs), S(bridge)],
    fill: [SO(hat + discs), S(bridge)],
  };
});

/* ----------------------------------------------------------------- shirt */

function shirtContour(tipX, sharp) {
  const right = [[15, 2], [20.5, 4], [tipX, 8.5], [18.5, 10.5], [18, 22]];
  const pts = [...right, ...right.slice().reverse().map(([u, v]) => [24 - u, v])];
  const radii = [0, 2, 1, 1, 2, 2, 1, 1, 2, 0];
  const p = new Path().M(pts[0]);
  for (let i = 1; i < pts.length - 1; i++) p.corner(pts[i], pts[i + 1], sharp ? 0 : radii[i]);
  p.L(pts[pts.length - 1]).A([12, 2], 180, 0, -1);
  return p.Z();
}
set('shirt', [1, 1, 23, 23], (sharp) => {
  const tipX = solve((x) => strokedBBox(shirtContour(x, sharp).d, 1, sharp ? 'butt' : 'round')[2], 23, 20, 24);
  const body = shirtContour(tipX, sharp);
  const pl = plate(body.segs);
  return {
    stroke: [S(body.d)],
    'two-tone': [PL(pl), S(body.d)],
    duotone: [S(body.d)],
    fill: [SO(pl)],
  };
});

/* --------------------------------------------------- fingerprint-pattern */

// Redrawn 17 Sep 2026 on his references: built by build-fingerprint.mjs,
// so run that one too.

/* ----------------------------------------------------------------- radio */

set('radio', [1, 3, 23, 21], (sharp) => {
  const box = [1, 3, 23, 21];
  const body = closed([[2, 8], [22, 8], [22, 20], [2, 20]], [3, 3, 3, 3], sharp);
  const antenna = run([[6, 8], [16, 4]], [], { sharp, free: [false, true], box });
  const speaker = ring([8, 14], 2).d;
  const l1 = run([[14, 12], [18, 12]], [], { sharp, free: [true, true], box });
  const l2 = run([[14, 16], [18, 16]], [], { sharp, free: [true, true], box });
  const pl = plate(body.segs);
  const holes = circlePath([8, 14], 3) + circlePath([8, 14], 1) + capsule(l1.segs, sharp) + capsule(l2.segs, sharp);
  return {
    stroke: [S(body.d + antenna.d + speaker + l1.d + l2.d)],
    'two-tone': [PL(pl), S(body.d + antenna.d + speaker + l1.d + l2.d)],
    // his B, 17 Sep 2026: the body black like the fill, the antenna grey, the
    // dial and grille grey through the black (the cut-out rule)
    // the grey under the dial is its whole disc: the black centre dot sits on
    // top, and a ring-shaped plate would paint differently even-odd and non-zero
    duotone: [M(antenna.d), PL(circlePath([8, 14], 3) + capsule(l1.segs, sharp) + capsule(l2.segs, sharp)), SO(pl + holes)],
    fill: [SO(pl + holes), S(antenna.d)],
  };
});

/* ---------------------------------------------------------- wallet-cards */

set('wallet-cards', [1, 3, 23, 21], (sharp) => {
  // a wallet seen face on with the cards' edge ruled across its mouth and the
  // pocket under them cut with a thumb notch, set off to the left
  const box = [1, 3, 23, 21];
  const body = closed([[2, 4], [22, 4], [22, 20], [2, 20]], [3, 3, 3, 3], sharp);
  const pocket = (x0, x1) => {
    const p = new Path().M([x0, 12]);
    if (sharp) p.L([6, 12]).L([6, 13]);
    else p.L([5, 12]).A([5, 13], 270, 360, 1);
    p.A([8, 13], 180, 0, -1);
    if (sharp) p.L([10, 12]);
    else p.A([11, 13], 180, 270, 1);
    return p.L([x1, 12]);
  };
  const edge = run([[2, 8], [22, 8]]);
  const pk = pocket(2, 22);
  const pl = plate(body.segs);
  const mouth = sharp
    ? new Path().M([3, 8]).L([21, 8]).L([21, 12]).L([10, 12]).L([10, 13]).A([8, 13], 0, 180, 1).L([6, 12]).L([3, 12]).Z().d
    : new Path().M([3, 8]).L([21, 8]).L([21, 12]).L([11, 12]).A([11, 13], 270, 180, -1).A([8, 13], 0, 180, 1).A([5, 13], 0, -90, -1).L([3, 12]).Z().d;
  return {
    stroke: [S(body.d + edge.d + pk.d)],
    'two-tone': [PL(pl), S(body.d + edge.d + pk.d)],
    // HIS duotone and fill (17 Sep 2026, drawn in Figma): the cards' mouth, the
    // region between the card edge (8) and the pocket line (12, its notch
    // included) inside the body's inner edges (3..21), is cut out of the black
    // body; grey under it in duotone, open in fill
    duotone: [PL(mouth), SO(pl + mouth)],
    fill: [SO(pl + mouth)],
  };
});

/* ----------------------------------------------------------- swatch-book */

function fan(sharp, L2) {
  const Pv = [17, 17], w = 4, r = sharp ? 0 : 2;
  const strip = (th, L) => {
    const dir = rot([0, -1], [0, 0], -th), n = rot(dir, [0, 0], -90);
    const E = add(Pv, mul(dir, L));
    return { dir, n, T: add(Pv, mul(n, w)), TL: add(E, mul(n, w)), TR: add(E, mul(n, -w)), I: add(Pv, mul(n, -w)) };
  };
  const meet = (p, u, q, v) => { const den = u[0] * v[1] - u[1] * v[0]; const t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / den; return add(p, mul(u, t)); };
  const m = strip(40, 14), b = strip(80, L2);
  // the middle strip's inner edge runs down to the front strip's wall
  const mEnd = meet(m.TR, unit(sub(m.I, m.TR)), [13, 0], [0, 1]);
  // the back strip's inner edge runs down to the middle strip's outer edge
  const bEnd = meet(b.TR, unit(sub(b.I, b.TR)), m.T, unit(sub(m.TL, m.T)));
  const front = new Path().M([21, 17]).corner([21, 3], [13, 3], r).corner([13, 3], [13, 17], r).L([13, 17]).A(Pv, 180, 0, -1).Z();
  const mid = run([m.T, m.TL, m.TR, mEnd], [0, r, r, 0]);
  const back = run([b.T, b.TL, b.TR, bEnd], [0, r, r, 0]);
  return { front, mid, back, mEnd, bEnd, m, b };
}
set('swatch-book', [2, 2, 22, 22], (sharp) => {
  const L2 = solve((l) => strokedBBox(fan(sharp, l).back.d, 1, sharp ? 'butt' : 'round')[0], 2, 12, 16);
  const g = fan(sharp, L2);
  // the junctions must land on straight ink, clear of the corners either side
  const along = (p, a, b) => dot(sub(p, a), unit(sub(b, a)));
  if (g.mEnd[1] < 5 && !sharp) throw new Error('swatch: middle strip meets the front strip on its corner');
  const tb = along(g.bEnd, g.m.T, g.m.TL);
  if (tb > len(sub(g.m.TL, g.m.T)) - (sharp ? 0 : 2)) throw new Error(`swatch: back strip meets the middle strip past its straight (${tb})`);
  // the rule across the front strip and its groove were dropped on his word
  // (17 Sep 2026): the strip is a plain swatch with the pivot
  const pivot = circlePath([17, 17], 1);
  const pl = plate(g.front.segs);
  const styles = {
    stroke: [S(g.front.d + g.mid.d + g.back.d), DOT(pivot)],
    'two-tone': [PL(pl), S(g.front.d + g.mid.d + g.back.d), DOT(pivot)],
    duotone: [M(g.mid.d + g.back.d), SO(pl + pivot)],
    fill: [S(g.mid.d + g.back.d), SO(pl + pivot)],
  };
  // flipped on his word (17 Sep 2026): the front strip stands on the left and
  // the deck fans out to the right, so the whole construction is mirrored about
  // x = 12 as it leaves; every fill is re-wound by depth when it is written
  const mirror = (d) => d.replace(/([MLC])([^MLCZ]*)/g, (m, k, v) => k + v.trim().split(/[\s,]+/).map((n, i) => (i % 2 ? n : f4(24 - Number(n)))).join(' '));
  for (const k of Object.keys(styles)) styles[k] = styles[k].map((l) => ({ ...l, d: mirror(l.d) }));
  return styles;
});

/* ------------------------------------------------------------------ cctv */

// Flipped on his word (17 Sep 2026): the tilted camera looks down to the right
// with the mount on the left; he turned down a level body and the unflipped
// drawing. The front is a flared lens hood, the construction his references
// share (measured in the camera's own frame: the hood leaves the front end's
// middle a third of the body's width across, runs about half the width deep,
// and opens to about the body's width, its outer edge square to the body),
// drawn at our weight: body 11 by 7 (r2 behind, r1 in front), hood 3 across at
// the body, 4 deep, 7 across its lip (r1), tilted 22 degrees. The arm leaves
// the underside 3 behind the body's centre, drops to 17 and runs to a wall
// plate at x = 3. Fitted so the lip's ink lands on 22 and the body's on 2.
const CAM = { W: 7, L: 11, N: 3, D: 4, H: 3.5, rb: 2, rf: 1, rl: 1, th: 22, arm: -3 };
function cctvCamera(sharp) {
  const { W, L, N, D, H, rb, rf, rl, th, arm } = CAM;
  const box = [2, 2, 22, 22];
  const at = (C) => {
    const loc = ([x, y]) => rot([C[0] + x, C[1] + y], C, th);
    const body = closed([[-L / 2, -W / 2], [L / 2, -W / 2], [L / 2, W / 2], [-L / 2, W / 2]].map(loc), [rb, rf, rf, rb], sharp);
    const lip = [[L / 2, -N / 2], [L / 2 + D, -H], [L / 2 + D, H], [L / 2, N / 2]];
    const lens = run(lip.map(loc), [0, rl, rl, 0], { sharp });
    // the hood closed across the body's front end, for its plate
    const hood = closed(lip.map(loc), [0, rl, rl, 0], sharp);
    const a = loc([arm, W / 2]);
    const armRun = run([a, [a[0], 17], [3, 17]]);
    const wall = run([[3, 13], [3, 21]], [], { sharp, free: [true, true], box });
    return { body, lens, hood, extra: { arm: armRun, wall, d: armRun.d + wall.d } };
  };
  const ink = (C) => { const g = at(C); return strokedBBox(g.body.d + g.lens.d + g.extra.d, 1, sharp ? 'butt' : 'round'); };
  let cx = 12, cy = 8;
  for (let i = 0; i < 6; i++) {
    cx = solve((v) => ink([v, cy])[2], 22, 4, 20);
    cy = solve((v) => ink([cx, v])[1], 2, 2, 16);
  }
  return at([cx, cy]);
}
// A solid with the hood's plate added: the hood's plate less the solid, in the
// solid's own path, so the two never overlap (Figma fills evenodd). Offsetting
// body and hood as one silhouette swallows the 1-unit front end between the
// body's corner and the hood's neck, which the offset's repair cannot mend
function withHood(solidSegs, hoodSegs) {
  const hoodPl = offsetContour(hoodSegs.map((q) => ({ ...q })), 1);
  return contourPath(solidSegs) + subtractContours(hoodPl, [solidSegs]).map((l) => contourPath(l)).join('');
}
set('cctv', [2, 2, 22, 22], (sharp) => {
  // duotone and fill as video's: body and hood one solid, the mount grey on
  // duotone's and black on fill's
  const g = cctvCamera(sharp);
  const rest = g.lens.d + g.extra.d;
  const bodyPl = offsetContour(g.body.segs.map((q) => ({ ...q })), 1);
  const sil = withHood(bodyPl, g.hood.segs);
  const hoodPl = contourPath(offsetContour(g.hood.segs.map((q) => ({ ...q })), 1));
  return {
    stroke: [S(g.body.d + rest)],
    'two-tone': [PL(sil), S(g.body.d + rest)],
    // his B, 17 Sep 2026: the nose grey and whole under the black body, the
    // mount grey; the fill keeps body and nose one solid
    duotone: [PL(hoodPl), M(g.extra.d), SO(contourPath(bodyPl))],
    // his drawing of the fill, 17 Sep 2026: the body solid, the nose kept as its
    // outline with the opening white, the mount black
    fill: [SO(contourPath(bodyPl)), S(g.lens.d + g.extra.d)],
  };
});

/* -------------------------------------------------------------- slash cuts */

// Distance along the slash's normal `n` from the line through (12,12): the
// near side is positive. A run is cut where it crosses: near pieces keep s >= 0
// and stop on the centre line, far pieces keep s <= -4 (the house cut back to
// 4), sharp's far butt ends carried 1 further along the path.
const slashS = (p, n) => (p[0] - 12) * n[0] + (p[1] - 12) * n[1];
const segPt = (g, t) => (g.type === 'L' ? add(g.p0, mul(sub(g.p1, g.p0), t)) : onArc(g.c, g.r, g.a0 + (g.a1 - g.a0) * t));
const subSeg = (g, t0, t1) => (g.type === 'L' ? { type: 'L', p0: segPt(g, t0), p1: segPt(g, t1) } : { type: 'A', c: g.c, r: g.r, a0: g.a0 + (g.a1 - g.a0) * t0, a1: g.a0 + (g.a1 - g.a0) * t1 });
const segLen = (g) => (g.type === 'L' ? len(sub(g.p1, g.p0)) : (Math.abs(g.a1 - g.a0) * Math.PI * g.r) / 180);
function slashPieces(segs, n, keep, closedRun) {
  const N = 400, pieces = [];
  let cur = null;
  const boundary = (g, ta, tb) => {
    const ka = keep(slashS(segPt(g, ta), n));
    for (let i = 0; i < 60; i++) { const m = (ta + tb) / 2; if (keep(slashS(segPt(g, m), n)) === ka) ta = m; else tb = m; }
    return (ta + tb) / 2;
  };
  segs.forEach((g, gi) => {
    let t0 = 0, inside = keep(slashS(segPt(g, 0), n));
    for (let i = 1; i <= N; i++) {
      const t = i / N, k = keep(slashS(segPt(g, t), n));
      if (k !== inside) {
        const tb = boundary(g, (i - 1) / N, t);
        if (inside) { (cur ??= { segs: [], start: { gi, t: t0, cut: t0 > 0 } }).segs.push(subSeg(g, t0, tb)); cur.end = { gi, t: tb, cut: true }; pieces.push(cur); cur = null; }
        else { t0 = tb; cur = { segs: [], start: { gi, t: tb, cut: true } }; }
        inside = k;
      }
    }
    if (inside) { (cur ??= { segs: [], start: { gi, t: t0, cut: t0 > 0 } }).segs.push(subSeg(g, t0, 1)); cur.end = { gi, t: 1, cut: false }; }
  });
  if (cur) pieces.push(cur);
  // a closed contour's last piece runs on into its first
  if (closedRun && pieces.length > 1 && !pieces[0].start.cut && !pieces[pieces.length - 1].end.cut) {
    const last = pieces.pop();
    pieces[0] = { segs: [...last.segs, ...pieces[0].segs], start: last.start, end: pieces[0].end };
  }
  return pieces.map((pc) => ({ ...pc, segs: pc.segs.filter((q) => segLen(q) > 1e-6) }));
}
// carry a cut end `by` further along the path, past the cut, toward the slash
function extendPiece(pc, segs, by) {
  const out = pc.segs.map((q) => ({ ...q }));
  const grow = (q, at, amount) => {
    if (q.type === 'L') { const u = unit(sub(q.p1, q.p0)); if (at === 'end') q.p1 = add(q.p1, mul(u, amount)); else q.p0 = sub(q.p0, mul(u, amount)); }
    else { const da = ((amount / q.r) * 180) / Math.PI * Math.sign(q.a1 - q.a0); if (at === 'end') q.a1 += da; else q.a0 -= da; }
  };
  if (pc.end.cut) grow(out[out.length - 1], 'end', by);
  if (pc.start.cut) grow(out[0], 'start', by);
  return out;
}
const pieceD = (segs) => contourPath(segs, false);
const segEndT = (g) => (g.type === 'L' ? unit(sub(g.p1, g.p0)) : (() => { const a = (g.a1 * Math.PI) / 180, s = Math.sign(g.a1 - g.a0); return [-Math.sin(a) * s, Math.cos(a) * s]; })());
const segStartT = (g) => (g.type === 'L' ? unit(sub(g.p1, g.p0)) : (() => { const a = (g.a0 * Math.PI) / 180, s = Math.sign(g.a1 - g.a0); return [-Math.sin(a) * s, Math.cos(a) * s]; })());


set('cctv-off', [1, 1, 23, 23], (sharp) => {
  // camera-off's construction on cctv as drawn, with the standard slash: the
  // slash crosses the body's back end, so the near piece (the lower left of the
  // body, the mount hanging off it) stops on the centre line and the far piece
  // (the rest of the body, with the lens hood whole beyond it) is cut back to
  // 4, sharp's butt ends one further. Two-tone and duotone: both pieces of the
  // silhouette grey solids (near clipped on the centre line, far closed 3 off
  // the slash across its cut ends, the hood inside it), the mount's grey merged
  // into the solid it stands on so no two greys stack; two-tone keeps the near
  // strokes black, duotone only the slash; fill is both solids with the mount
  // and slash
  const g = cctvCamera(sharp);
  const n = [-Math.SQRT1_2, Math.SQRT1_2];
  const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
  const runLen = (segs) => segs.reduce((a, q) => a + segLen(q), 0);
  const near = slashPieces(g.body.segs, n, (v) => v >= 0, true);
  const far = slashPieces(g.body.segs, n, (v) => v <= -4, true);
  if (near.length !== 1 || far.length !== 1) throw new Error(`cctv-off: ${near.length} near, ${far.length} far`);
  // a run the slash cuts keeps only pieces of 3 units or more, measured as ink
  // so both corners agree: a round piece paints 2 past its run, a sharp one its
  // run with the butt ends already carried out. A run it misses stays whole
  const cutPiece = (pc) => pc.start.cut || pc.end.cut;
  const openRuns = (segs) => [
    ...slashPieces(segs, n, (v) => v >= 0, false).map((pc) => ({ pc, segs: pc.segs })),
    ...slashPieces(segs, n, (v) => v <= -4, false).map((pc) => ({ pc, segs: sharp ? extendPiece(pc, segs, 1) : pc.segs })),
  ].filter(({ pc, segs: q }) => q.length && (!cutPiece(pc) || runLen(q) + (sharp ? 0 : 2) >= 5)).map(({ segs: q }) => q);
  // the hood's lower flare runs within 4 of the slash, so it is cut back like
  // the body; its strokes stay in the stroke drawing, its plate in the far solid
  const lensRuns = openRuns(g.lens.segs);
  if (lensRuns.some((q) => slashS(segPt(q[0], 0.5), n) >= 0)) throw new Error('cctv-off: the lens hood reaches the near side');
  const detail = [...openRuns(g.extra.arm.segs), ...openRuns(g.extra.wall.segs)];
  const sideOf = (q) => slashS(segPt(q[0], 0.5), n) >= 0;
  const nearRuns = detail.filter(sideOf), farRuns = detail.filter((q) => !sideOf(q));
  const farSegs = sharp ? extendPiece(far[0], g.body.segs, 1) : far[0].segs;
  const off = offsetContour(g.body.segs.map((q) => ({ ...q })), 1);
  const [nearClip] = clipContour(off, [12, 12], n, 0, 1);
  const nearPlSegs = [...nearClip, { type: 'L', p0: segEnd(nearClip[nearClip.length - 1]), p1: segStart(nearClip[0]) }];
  const nearPl = contourPath(nearPlSegs);
  // a detail's grey is its ink less the solid it stands on, in the solid's own
  // layer, so the two greys never stack
  const cap = sharp ? 'butt' : 'round';
  const greyOf = (runs, solid) => (runs.length
    ? unionContours(runs.map((q) => outlineRun(q.map((x) => ({ ...x })), 1, cap)), runs, 1, cap)
      .flatMap((loop) => subtractContours(loop, [solid])).map((l) => contourPath(l)).join('')
    : '');
  // the far solid: the plate edge along the far run, closed across its two cut
  // ends as file-off and camera-off close theirs
  const fs = farSegs[0], fe = farSegs[farSegs.length - 1];
  const A = segPt(fs, 0), B = segPt(fe, 1);
  const tA = segStartT(fs), tB = segEndT(fe);
  const poly = g.body.segs.flatMap((q) => Array.from({ length: 32 }, (_, k) => segPt(q, k / 32)));
  const inBody = (p) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const u = poly[i], v = poly[j]; if ((u[1] > p[1]) !== (v[1] > p[1]) && p[0] < ((v[0] - u[0]) * (p[1] - u[1])) / (v[1] - u[1]) + u[0]) c = !c; } return c; };
  // probed half a unit in: a hair's probe falls between a sampled fillet's chord
  // and its arc, and turned the normal inward where the cut lands on a fillet
  const outN = (P, t) => { const k = [t[1], -t[0]]; return inBody(add(P, mul(k, 0.5))) ? mul(k, -1) : k; };
  const oA = outN(A, tA), oB = outN(B, tB);
  // the plate's own edge from A's outer point to B's, taken off the offset
  // contour so sharp's corners keep the plate's r=1 arcs
  const edge = (() => {
    const locate = (P) => {
      let best = { d: Infinity };
      off.forEach((q, i) => { for (let k = 0; k <= 400; k++) { const t = k / 400, d = len(sub(segPt(q, t), P)); if (d < best.d) best = { d, i, t }; } });
      const q = off[best.i];
      let lo = Math.max(0, best.t - 1 / 400), hi = Math.min(1, best.t + 1 / 400);
      for (let k = 0; k < 60; k++) { const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3; if (len(sub(segPt(q, a), P)) < len(sub(segPt(q, b), P))) hi = b; else lo = a; }
      return { i: best.i, t: (lo + hi) / 2 };
    };
    const a = locate(add(A, oA)), b = locate(add(B, oB));
    const out = [];
    if (a.i === b.i && a.t <= b.t) return [subSeg(off[a.i], a.t, b.t)];
    out.push(subSeg(off[a.i], a.t, 1));
    for (let i = (a.i + 1) % off.length; i !== b.i; i = (i + 1) % off.length) out.push(off[i]);
    out.push(subSeg(off[b.i], 0, b.t));
    return out.filter((q) => segLen(q) > 1e-6);
  })();
  let farSolidSegs;
  if (sharp) {
    // the base's sharp silhouette clipped on the cut line, 4 less root 2 off
    // the slash, corners at true intersections, as camera-off's
    const [farClip] = clipContour(off, [12, 12], n, -(4 - Math.SQRT2), -1);
    farSolidSegs = [...farClip, { type: 'L', p0: segEnd(farClip[farClip.length - 1]), p1: segStart(farClip[0]) }];
  } else {
    const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
    // a cap's arc turns the short way, in the sense that carries its outer
    // normal round toward the direction the run leaves the far piece in
    const capArc = (E, from, to, sense) => {
      let a0 = ang(from), a1 = ang(to);
      if (sense > 0) { while (a1 < a0) a1 += 360; } else { while (a1 > a0) a1 -= 360; }
      return { type: 'A', c: E, r: 1, a0, a1 };
    };
    const turn = (u, v) => Math.sign(u[0] * v[1] - u[1] * v[0]);
    farSolidSegs = [
      ...edge,
      capArc(B, oB, n, turn(oB, tB)),
      { type: 'L', p0: add(B, n), p1: add(A, n) },
      capArc(A, n, oA, turn(mul(tA, -1), oA)),
    ];
  }
  // the hood's plate joins the far solid: less the solid first, then clipped on
  // the solid's own closing line (3 off the slash, sharp's 4 less root 2).
  // Clipped first, its edge lay on the solid's and the subtraction walked a
  // hairline spike back along it; sharp's solid is itself clipped on that line,
  // so its hood is taken less the whole body plate instead
  const hoodPl = offsetContour(g.hood.segs.map((q) => ({ ...q })), 1);
  const hoodRest = subtractContours(hoodPl, [sharp ? off : farSolidSegs]).flatMap((loop) => clipContour(loop, [12, 12], n, sharp ? -(4 - Math.SQRT2) : -3, -1, true))
    .map((r) => contourPath([...r, { type: 'L', p0: segEnd(r[r.length - 1]), p1: segStart(r[0]) }]));
  const farSolid = contourPath(farSolidSegs) + hoodRest.join('');
  const nearGrey = greyOf(nearRuns, nearPlSegs), farGrey = greyOf(farRuns, farSolidSegs);
  const nearBody = pieceD(near[0].segs), farBody = pieceD(farSegs);
  const nearD = nearRuns.map(pieceD).join(''), farD = farRuns.map(pieceD).join('');
  return {
    stroke: [S(nearBody + farBody + lensRuns.map(pieceD).join('') + nearD + farD + slash)],
    'two-tone': [PL(nearPl + farSolid + farGrey), S(nearBody + nearD + slash)],
    duotone: [PL(nearPl + nearGrey + farSolid + farGrey), S(slash)],
    // as cctv's fill: the body's pieces solid, the nose's cut runs as outline
    fill: [SO(nearPl + contourPath(farSolidSegs)), S(lensRuns.map(pieceD).join('') + nearD + farD + slash)],
  };
});

/* --------------------------------------------------------- mouse */

// redrawn 17 Sep 2026 in build-redraws.mjs, which owns it now

/* ------------------------------------------------------------- milestone */

set('milestone', [2, 1, 22, 23], (sharp) => {
  const box = [2, 1, 22, 23];
  const board = (T) => closed([[3, 5], [17, 5], [T, 8], [17, 11], [3, 11]], [2, 1, 1, 1, 2], sharp);
  const T = solve((t) => strokedBBox(board(t).d, 1, 'round')[2], 22, 18, 24);
  const b = board(T);
  const posts = run([[12, 2], [12, 5]], [], { sharp, free: [true, false], box }).d + run([[12, 11], [12, 22]]).d + run([[8, 22], [16, 22]], [], { sharp, free: [true, true], box }).d;
  const pl = plate(b.segs);
  return {
    stroke: [S(b.d + posts)],
    'two-tone': [PL(pl), S(b.d + posts)],
    // flag's split, the tools rule: the solid mass (the sign) black over the
    // post grey (his go, 17 Sep 2026)
    duotone: [M(posts), SO(pl)],
    fill: [SO(pl), S(posts)],
  };
});

/* ------------------------------------------------------ shredder */

// redrawn 17 Sep 2026 in build-redraws.mjs, which owns it now

/* ------------------------------------------------------------- paper-bag */

set('paper-bag', [2, 2, 22, 22], (sharp) => {
  // Redrawn 17 Sep 2026 on his reference: a die-cut bag seen a little from
  // the side. The front is 3..17 under a wavy top (crests on 4, 10 and 16, the
  // valleys a unit lower, arcs of r = 2.5), a slot for the hand 2 clear under
  // the middle crest, and a gusset that opens from the top-right corner to 4
  // at the foot. Sharp squares the four corners and keeps the wave.
  const box = [2, 2, 22, 22];
  const k = sharp ? 0 : 1;
  const body = new Path().M([3, 21 - k]);
  if (sharp) body.L([3, 3]).L([4, 3]); else body.L([3, 4]).A([4, 4], 180, 270, 1);
  const R = 2.5, phi = (Math.asin(1.5 / R) * 180) / Math.PI;
  for (const x of [4, 10]) body.A([x, 3 + R], 270, 270 + phi, 1).A([x + 3, 4 - R], 90 + phi, 90 - phi, -1).A([x + 6, 3 + R], 270 - phi, 270, 1);
  if (sharp) body.L([17, 3]); else body.A([16, 4], 270, 360, 1);
  const peak = body.cur;
  // the foot's r = 1 fillet sits in an acute corner, so the rounded foot moves
  // out until the fillet's centre is (20, 20) and its ink lands on 22: the side
  // from (17, 4) runs a across and 17 down, 1 from that centre
  const a = (1632 + Math.sqrt(1632 ** 2 - 4 * 255 * 2312)) / 510;
  const gx = sharp ? 21 : 17 + a;
  body.corner([gx, 21], [3, 21], k).corner([3, 21], [3, 3], k).Z();
  const seam = run([peak, [17, 21]]);
  const slot = run([[8, 8], [12, 8]], [], { sharp, free: [true, true], box });
  const plateSegs = offsetContour(body.segs.map((s) => ({ ...s })), 1);
  verify(body.segs, plateSegs, 1, 0.003);
  const pl = contourPath(plateSegs);
  const hole = capsule(slot.segs, sharp);
  // the gusset's daylight: seam's ink (x = 18), the side's inner ink, the foot's (y = 20)
  const u = unit(sub([gx, 21], peak)), inner = add(peak, [-u[1], u[0]]);
  const at = (i, v) => add(inner, mul(u, (v - inner[i]) / u[i]));
  const gusset = polyD([at(0, 18), [18, 20], at(1, 20)]);
  // the front is the plate this side of the seam's outer ink
  const [front] = clipContour(plateSegs.map((s) => ({ ...s })), [18, 0], [1, 0], 0, -1);
  return {
    stroke: [S(body.d + seam.d + slot.d)],
    'two-tone': [PL(pl), S(body.d + seam.d + slot.d)],
    duotone: [PL(windByDepth(pl + hole)), SO(contourPath(front) + hole)],
    fill: [SO(pl + hole + gusset)],
  };
});

/* -------------------------------------------------------- case-sensitive */

set('case-sensitive', [1, 4, 23, 20], (sharp) => {
  const box = [1, 4, 23, 20];
  const legX = (y, side) => 7 + side * 5 * (19 - 5 - (19 - y)) / 14 * 0 + side * (y - 5) * (5 / 14);
  // the canvas edge limits the left foot's butt cap, so both feet take that
  // shorter push and the A stays symmetric
  const foot = (a, b) => { const d = unit(sub(b, a)); return sharpEndIn(b, d, box); };
  const k = sharp ? Math.min(foot([7, 5], [2, 19]), foot([7, 5], [12, 19])) : 0;
  const push = (p) => add(p, mul(unit(sub(p, [7, 5])), k));
  const A = `M${P2(push([2, 19]))}L7 5L${P2(push([12, 19]))}` + run([[legX(14, -1), 14], [legX(14, 1), 14]]).d;
  const a = ring([19, 16], 3).d + run([[22, 12], [22, 19]], [], { sharp, free: [true, true], box }).d;
  return {
    stroke: [S(A + a)],
    'two-tone': [M(A), S(a)],
    duotone: [M(A), S(a)],
    fill: [S(A + a)],
  };
});

// case-upper: redrawn 17 Sep 2026 in build-redraws.mjs, which owns it now

/* -------------------------------------------------- type-outline */

// redrawn 17 Sep 2026 in build-redraws.mjs, which owns it now

/* ----------------------------------------------------- file-type */

// redrawn 17 Sep 2026 in build-redraws.mjs, which owns it now

/* ------------------------------------------------------------ whole-word */

set('whole-word', [1, 3, 23, 21], (sharp) => {
  const box = [1, 3, 23, 21];
  const letters = ring([7, 11], 3).d + run([[10, 8], [10, 14]], [], { sharp, free: [true, true], box }).d +
    run([[14, 4], [14, 14]], [], { sharp, free: [true, true], box }).d + ring([17, 11], 3).d;
  const bracket = run([[2, 17], [2, 20], [22, 20], [22, 17]], [0, 2, 2, 0], { sharp, free: [true, true], box }).d;
  return {
    stroke: [S(letters + bracket)],
    'two-tone': [M(bracket), S(letters)],
    duotone: [M(bracket), S(letters)],
    fill: [S(letters + bracket)],
  };
});

/* ------------------------------------------------------------- the write */

function inkOf(layers, sharp) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers) {
    if (!l.d) continue;
    const q = l.kind === 'stroke' || l.kind === 'muted' ? strokedBBox(l.d, 1, sharp ? 'butt' : 'round') : strokedBBox(l.d, 0, 'butt');
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  return b;
}
function deadPieces(d) {
  const bad = [];
  for (const m of d.matchAll(/C(-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+) (-?[\d.]+)/g)) {
    const v = m.slice(1).map(Number);
    if (Math.abs(v[0] - v[4]) < 1e-3 && Math.abs(v[1] - v[5]) < 1e-3 && Math.abs(v[2] - v[4]) < 1e-3 && Math.abs(v[3] - v[5]) < 1e-3) bad.push(m[0]);
  }
  return bad;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const OUT = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  for (const [name, build] of Object.entries(SETS)) {
    if (want.length && !want.includes(name)) continue;
    const dir = join(OUT, 'raw', name);
    mkdirSync(dir, { recursive: true });
    const notes = [];
    for (const corners of ['regular', 'sharp']) {
      const sharp = corners === 'sharp';
      const styles = build(sharp);
      for (const style of ['stroke', 'two-tone', 'duotone', 'fill']) {
        const layers = styles[style];
        const b = inkOf(layers, sharp);
        const off = Math.max(...b.map((v, i) => Math.abs(v - build.box[i])));
        if (off > 0.003) notes.push(`${style} ${corners} ink ${b.map((v) => v.toFixed(3)).join(',')}`);
        for (const l of layers) for (const x of deadPieces(l.d || '')) notes.push(`${style} ${corners} dead ${x}`);
        writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), doc(layers, sharp));
      }
    }
    console.log(name.padEnd(22), 'box', build.box.join(','), notes.length ? '\n  ' + notes.join('\n  ') : 'ok');
  }
}

export { slashPieces, extendPiece, pieceD, cctvCamera };
export { SETS, run, closed, ring, plate, capsule, inkUnion, rect, polyD, S, M, PL, SO, DOT, doc, solve, windByDepth, offsetCoast };
