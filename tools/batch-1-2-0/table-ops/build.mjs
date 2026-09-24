/**
 * table-rows-*, table-columns-* (1.2.0, table-ops group). Twelve names, one
 * parametric drawing: the operation sits ON the table's structure, never in a
 * corner. add and remove put a plus or an x centred on the edge where the row
 * or column goes, that edge opened round it; merge cuts the divider back to
 * stubs at the walls and runs an arrow across it at the centre. The shipped
 * `table` is not touched: these are plain frames (a frame with its rows, a
 * frame with its columns) in the set's own frame vocabulary, r=3 on a 20-wide
 * body, stroke 2, the house 6-box sign painting 8, 2 painted units between
 * separate elements.
 *
 * Everything is drawn once, as ROWS with the sign on the TOP edge (canonical
 * seeds below). The other eleven are the seeds mapped, never the emitted path
 * (drawing-a-new-icon section 8): every seed point (polygon vertex, line end,
 * sign centre, arrow tail and tip) goes through the name's map, and fillets,
 * sharp stubs, plates and knockout outlines are then built in output space.
 * Signs are re-spelled in the house order at the mapped box, so a turned plus
 * is still written vertical arm first.
 *
 *   rows    above = identity         below = mirror in y
 *   columns before = top edge to left   after = top edge to right
 *   merge   previous = up / left     next = down / right
 *
 * ONE FRAME (his ruling, 24 Sep 2026: "your tables are changing their size left
 * and right. where is the consistency?"). Every op is the table's own frame, 18
 * by 18 on the centre line at r=3 (table: 3..21), the size his reference keeps
 * across the whole family. Only its position moves, and only to centre a sign
 * that overhangs one edge; its size never changes.
 *
 *   add, remove  the sign sits a unit INSIDE the edge line (his reference: about
 *                half a unit in), so it overhangs the frame's ink by 2 and the
 *                frame moves a unit away from it: frame 3..21 by 4..22, sign on
 *                (12, 5), ink 2..22 by 1..23, paddings 2 and 1, even.
 *                A sign on the edge line itself would need the frame 5..23, off
 *                the canvas; an 18 frame cannot host it.
 *   the opening  the plus's arm lies a unit under the edge, so the edge's cut
 *                ends stop 2 clear of it, on the corner arcs at x = 5 and 19
 *                (y = 7 - 2 sqrt 2), gap 2.09. Sharp squares the corners and ends
 *                the edge on x = 6 and 18, its butt faces on the notch lines, the
 *                x-extent the round caps paint.
 *   rows         equal: the divider on the frame's middle, 13, rows 9 and 9. The
 *                notch the plate takes round the sign stops 2 clear of it (11),
 *                so in duotone and fill the divider sits 1 below the notch.
 *   merge        the same 18 frame, centred (3..21 both ways, ink 2..22), the
 *                divider on 12 cut back to stubs at the walls (path 3..5), the
 *                arrow crossing it: 6-wide head, shaft 8 (box 9..15 by 8..16),
 *                head wholly in the row it points into. Arm ends clear the stubs
 *                by 2.12; tip and tail clear the frame by 2.
 *   duotone      the table's convention for the full divider (stopped 2 short of
 *                the plate edge, table's own duotone); the merge's stubs are
 *                edge-anchored and reach the plate edge (styles.md: edge-anchored
 *                lines reach the edge), or they would vanish.
 *
 * STYLES (his reference, 24 Sep 2026: "look how duotone, fill, two-tones are
 * done"). The reference never fills a table that is being operated on: the
 * frame stays an outline in every style and the operation carries the weight.
 *   merge     two-tone and duotone: the table (frame, header and stubs) muted to
 *             0.4 as a stroke, the arrow black: the house's one-part-grey split
 *             for a glyph with no plate, and the reference's duotone. One file
 *             for both. Fill: the outline over the header, solid, as table's.
 *   add and remove carry the closed row, the one away from the sign, in every
 *   style (his: "make the other part solid like the other examples ... but for
 *   other variants too", as the header column is in table-rows):
 *     two-tone  that row grey (out to the centre lines) under the whole outline
 *     duotone   that row a black block out to the outer edge, the frame's open
 *               side grey, the sign black
 *     fill      that row solid under the whole outline
 *   A plate notched round the sign was the construction that kept biting (the
 *   24 Sep knock-offs); none of these reaches the sign.
 * The plate, notch and slot builders below stay for history (round 2); nothing
 * emits them.
 *   sharp     butt caps, fillets removed (joins stay round, so corners paint
 *             r=1). Every free end steps out (1 on an axis, 0.4142 along a
 *             diagonal); the edge's cut ends step a unit so their faces lie on
 *             the notch lines x = 6 and 18. The sharp plate runs straight down
 *             those lines from the butt face's OUTER corner (sharp.md, the
 *             24 Sep ruling): hard corners at the faces and in the notch,
 *             r=1 at the frame's four corners. An arrow's tip is not a free end.
 *
 *   node build.mjs            writes raw/<name>/*.svg beside this file
 *   node build.mjs --check    builds in memory, asserts, writes nothing
 */
import { writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { outDir } from '../paths.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { strokedBBox, pathBBox, outlines, minGap, subpaths, trimFreeEnds } from '../../../pipeline/lib/geom.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(outDir(), 'raw');

/* ------------------------------------------------------------ numbers, points */
const f = (v) => { const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => { const l = len(a); if (l < 1e-12) throw new Error('zero vector'); return [a[0] / l, a[1] / l]; };
const same = (a, b) => len(sub(a, b)) < 1e-9;
const perp = (a) => [-a[1], a[0]];
/** Where p + s*u meets q + t*v. */
const meet = (p, u, q, v) => {
  const den = u[0] * v[1] - u[1] * v[0];
  if (Math.abs(den) < 1e-12) throw new Error('parallel');
  const w = sub(q, p);
  return add(p, mul(u, (w[0] * v[1] - w[1] * v[0]) / den));
};

/* --------------------------------------------------------------- path builder */
// A path is a list of subpaths { start, segs: [{ c1?, c2?, p }], closed }.
// Zero-length pieces are never emitted (drawing-a-new-icon section 10).
class Sub {
  constructor(p) { this.start = p; this.cur = p; this.segs = []; this.closed = false; }
  L(p) { if (!same(p, this.cur)) { this.segs.push({ p }); this.cur = p; } return this; }
  C(c1, c2, p) {
    if (same(p, this.cur)) throw new Error('zero-length cubic');
    if (same(c1, this.cur) || same(c2, p)) throw new Error('control point on its endpoint');
    this.segs.push({ c1, c2, p }); this.cur = p; return this;
  }
  /** Arc about c from angle a0 to a1 (radians, y down), split at every multiple of 90 degrees. */
  A(c, r, a0, a1) {
    const q = Math.PI / 2, dir = Math.sign(a1 - a0);
    const cuts = [a0];
    for (let k = Math.ceil(Math.min(a0, a1) / q - 1e-9); k * q < Math.max(a0, a1) - 1e-9; k++)
      if (k * q > Math.min(a0, a1) + 1e-9) cuts.push(k * q);
    cuts.sort((x, y) => dir * (x - y)); cuts.push(a1);
    const at = (a) => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    const tan = (a) => [-Math.sin(a), Math.cos(a)];
    for (let i = 0; i < cuts.length - 1; i++) {
      const [s, e] = [cuts[i], cuts[i + 1]], k = (4 / 3) * Math.tan((e - s) / 4) * r;
      this.C(add(at(s), mul(tan(s), k)), sub(at(e), mul(tan(e), k)), snap(at(e)));
    }
    return this;
  }
  Z() { if (same(this.cur, this.start)) this.segs.at(-1).p = this.start; else this.L(this.start); this.closed = true; return this; }
}
const snap = (p) => p.map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v));
const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]);
/** The arc about c from p0 to p1 turning the short way (every arc here is under 180). */
function arcTo(s, c, p1) {
  const r = len(sub(s.cur, c)); let a0 = ang(c, s.cur), a1 = ang(c, p1);
  while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
  while (a0 - a1 > Math.PI) a1 += 2 * Math.PI;
  return s.A(c, r, a0, a1);
}
/** The arc about c from the current point to p1 passing through direction `via`. */
function arcVia(s, c, p1, via) {
  const r = len(sub(s.cur, c)); const a0 = ang(c, s.cur); let a1 = ang(c, p1); const av = Math.atan2(via[1], via[0]);
  // pick the sweep that contains av
  const norm = (a) => { while (a < a0) a += 2 * Math.PI; while (a >= a0 + 2 * Math.PI) a -= 2 * Math.PI; return a; };
  const e = norm(a1), v = norm(av);
  a1 = v <= e ? e : e - 2 * Math.PI;
  return s.A(c, r, a0, a1);
}
const emit = (subs) => subs.map((s) => `M${f(s.start[0])} ${f(s.start[1])}` + s.segs.map((g) => (g.c1
  ? `C${f(g.c1[0])} ${f(g.c1[1])} ${f(g.c2[0])} ${f(g.c2[1])} ${f(g.p[0])} ${f(g.p[1])}`
  : `L${f(g.p[0])} ${f(g.p[1])}`)).join('') + (s.closed ? 'Z' : '')).join('');

/**
 * A polygon or polyline with a fillet of radius r[i] at vertex i (skill section 7:
 * t = r / tan(alpha/2), handles (4/3) tan((pi - alpha)/4) r). An open run takes
 * no fillet at its ends. Built in output space from mapped vertices.
 */
function filleted(V, R, closed) {
  const n = V.length, T = [];
  for (let i = 0; i < n; i++) {
    const r = R[i] || 0;
    if (!r || (!closed && (i === 0 || i === n - 1))) { T.push(null); continue; }
    const A = V[(i - 1 + n) % n], B = V[(i + 1) % n], P = V[i];
    const u = unit(sub(A, P)), w = unit(sub(B, P));
    const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
    const t = r / Math.tan(alpha / 2), k = (4 / 3) * Math.tan((Math.PI - alpha) / 4) * r;
    if (t > len(sub(A, P)) + 1e-9 || t > len(sub(B, P)) + 1e-9) throw new Error('fillet longer than its edge');
    const T1 = snap(add(P, mul(u, t))), T2 = snap(add(P, mul(w, t)));
    T.push({ T1, T2, C1: sub(T1, mul(u, k)), C2: sub(T2, mul(w, k)) });
  }
  const first = closed && T[0] ? T[0].T2 : V[0];
  const s = new Sub(first);
  const order = closed ? [...Array(n).keys()].slice(1).concat([0]) : [...Array(n).keys()].slice(1);
  for (const i of order) {
    if (T[i]) { s.L(T[i].T1); s.C(T[i].C1, T[i].C2, T[i].T2); } else s.L(V[i]);
  }
  if (closed) s.Z();
  return s;
}
const run = (a, b) => new Sub(a).L(b);

/** Signed area of a closed subpath (flattened), positive clockwise on screen. */
function signedArea(s) {
  const pts = [s.start];
  let cur = s.start;
  for (const g of s.segs) {
    if (g.c1) for (let i = 1; i <= 16; i++) { const t = i / 16, u = 1 - t; pts.push([0, 1].map((k) => u * u * u * cur[k] + 3 * u * u * t * g.c1[k] + 3 * u * t * t * g.c2[k] + t * t * t * g.p[k])); }
    else pts.push(g.p);
    cur = g.p;
  }
  let a = 0; for (let i = 0; i < pts.length; i++) { const [p, q] = [pts[i], pts[(i + 1) % pts.length]]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
}
/** The same closed subpath walked the other way. */
function reversed(s) {
  const pts = [s.start, ...s.segs.map((g) => g.p)];
  const r = new Sub(pts.at(-1));
  for (let i = s.segs.length - 1; i >= 0; i--) { const g = s.segs[i]; if (g.c1) r.C(g.c2, g.c1, pts[i]); else r.L(pts[i]); }
  r.closed = s.closed; return r;
}
/**
 * A fill's knockouts wound AGAINST its body (styles.md, Knockouts: the site
 * paints nonzero, and a hole wound with the plate ships solid). Built in output
 * space, a mirror flips the body and not a hole drawn from its own two ends, so
 * the winding is set here rather than trusted.
 */
function withHoles(body, holes) {
  const sgn = Math.sign(signedArea(body));
  return [body, ...holes.map((h) => (Math.sign(signedArea(h)) === sgn ? reversed(h) : h))];
}

/** Sharp free-end step along the run's own tangent: 1 on an axis, (1 - sin t) / cos t off it. */
function stepOut(end, from) {
  const u = unit(sub(end, from));
  const t = Math.min(Math.acos(Math.abs(u[0])), Math.acos(Math.abs(u[1])));   // off the nearer axis
  return add(end, mul(u, (1 - Math.sin(t)) / Math.cos(t)));
}

/* -------------------------------------------------------------------- signs */
// The house spellings, box [x, y]..[x+6, y+6] (file-plus, file-x, corner.mjs).
// A run lists which of its ends are free: an arrow's tip is not (the merge
// arrow is spelled from its own seeds in mergeIcon, file-arrow-*'s order).
const SIGN = {
  plus: (x, y) => [[[x + 3, y], [x + 3, y + 6]], [[x, y + 3], [x + 6, y + 3]]].map((p) => ({ p, free: [1, 1] })),
  x: (x, y) => [[[x, y], [x + 6, y + 6]], [[x + 6, y], [x, y + 6]]].map((p) => ({ p, free: [1, 1] })),
};
const signSubs = (kind, centre, sharp) => runsOf(SIGN[kind](centre[0] - 3, centre[1] - 3), sharp);
function runsOf(runs, sharp) {
  return runs.map(({ p, free }) => {
    let q = p.map(snap);
    if (sharp) {
      q = q.slice();
      if (free[0]) q[0] = stepOut(q[0], q[1]);
      if (free[1]) q[q.length - 1] = stepOut(q.at(-1), q.at(-2));
    }
    const s = new Sub(q[0]); for (const pt of q.slice(1)) s.L(pt); return s;
  });
}

/**
 * The painted region of the arrow, as a knockout: shaft and two arms, round
 * join at the tip, caps round (regular) or butt (sharp, ends already stepped).
 * Generic in output space: each arm's inner edge is the side facing the tail.
 */
function arrowOutline(tail, tip, e1, e2, sharp) {
  const s = unit(sub(tip, tail));
  const arm = (e) => { const a = unit(sub(e, tip)); let m = perp(a); if (dot(m, sub(tail, tip)) < 0) m = mul(m, -1); let n = perp(s); if (dot(n, sub(e, tip)) < 0) n = mul(n, -1); return { e, a, m, n }; };
  const A1 = arm(e1), A2 = arm(e2);
  const q = (A) => meet(add(tail, A.n), s, add(tip, A.m), A.a);   // shaft side meets the arm's inner edge
  const o = new Sub(add(tail, A1.n));
  if (sharp) o.L(add(tail, A2.n)); else arcVia(o, tail, add(tail, A2.n), mul(s, -1));
  o.L(q(A2)).L(add(A2.e, A2.m));
  if (sharp) o.L(sub(A2.e, A2.m)); else arcVia(o, A2.e, sub(A2.e, A2.m), A2.a);
  o.L(sub(tip, A2.m));
  arcVia(o, tip, sub(tip, A1.m), s);
  o.L(sub(A1.e, A1.m));
  if (sharp) o.L(add(A1.e, A1.m)); else arcVia(o, A1.e, add(A1.e, A1.m), A1.a);
  o.L(q(A1));
  return o.Z();
}
/** A slot knockout along a -> b, flat at a (on the frame's inner edge), b round or flat. */
function slotOutline(a, b, roundB) {
  const u = unit(sub(b, a)), n = perp(u);
  const o = new Sub(add(a, n)).L(add(b, n));
  if (roundB) arcVia(o, b, sub(b, n), u); else o.L(sub(b, n));
  return o.L(sub(a, n)).Z();
}

/* ------------------------------------------------------------ the canonical seeds */
// ROWS, operation on the TOP edge / arrow UP. Numbers solved in the header.
const R2 = 7 - 2 * Math.SQRT2;                                      // y where the corner arc is at x = 5
const EDGE = {
  // regular frame: open at the top, cut ends ON the corner arcs (built by edgeFrame)
  cut: [[5, R2], [19, R2]],
  corners: { tl: [6, 7], bl: [6, 19], br: [18, 19], tr: [18, 7] },
  sharpFrame: [[6, 4], [3, 4], [3, 22], [21, 22], [21, 4], [18, 4]],
  divider: [[3, 13], [21, 13]],
  // the closed row, away from the sign: solid in fill, out to the centre lines
  // (under the intact stroke), the frame's own r=3 at its two corners
  closed: [[3, 13], [21, 13], [21, 22], [3, 22]],
  // duotone: the same row as a block out to the outer edge (divider and walls
  // inside it), the plate's r=4 (sharp r=1) at its two outer corners
  closedOuter: [[2, 12], [22, 12], [22, 23], [2, 23]],
  // the frame's open side, grey in duotone: each wall from the sign's cut end
  // down to the divider's centre line, its end buried in the block
  openSharp: [[[6, 4], [3, 4], [3, 13]], [[21, 13], [21, 4], [18, 4]]],
  dividerDuo: { regular: [[5, 13], [19, 13]], sharp: [[4, 13], [20, 13]] },
  slot: [[4, 13], [20, 13]],                                        // fill: the table's slot, frame inner edge to inner edge
  sign: [12, 5],
  notch: { x0: 6, x1: 18, y: 11, r: 3 },                             // 2 clear of the sign's ink (8..16 by 1..9)
  sharpPlate: [[2, 3], [6, 3], [6, 11], [18, 11], [18, 3], [22, 3], [22, 23], [2, 23]],
  sharpPlateR: [1, 0, 0, 0, 0, 1, 1, 1],
  ink: [2, 1, 22, 23],
};
// HIS DRAWING (24 Sep 2026, "what if we go in this direction for modifiers?"):
// the table's header rule inside the frame, so the square reads as a table and
// not as square-arrow-up with two ticks. Measured off his file: rule on 7, the
// divider's stubs on 16, the arrow 11 to 17 with its head's arms on 14. Every
// gap 2: tip to rule, arms to stubs 2.47, tail to frame. Stubs on 14, in line
// with the arms, read as one dashed line at 16px and were ruled out.
// The pair is a mirror, the rule on the side away from the arrow (his second
// drawing, then "7 ... do the merge only"): next is the seed (rule 7, arrow
// down); previous is next mirrored (rule 17, stubs 8, arrow 13 to 7). Columns
// are the rows transposed: next on x = 7, previous mirrored to x = 17 (toRight
// is the transpose of mirrorY).
const MERGE = {
  frame: [[3, 3], [21, 3], [21, 21], [3, 21]],
  header: [[3, 7], [21, 7]],
  headerFill: [[3, 7], [3, 3], [21, 3], [21, 7]],                     // fill: solid, out to the centre lines
  stubs: [[[3, 16], [5, 16]], [[21, 16], [19, 16]]],                 // [wall end, free end]
  stubsDuo: { regular: [[[3, 16], [5, 16]], [[21, 16], [19, 16]]], sharp: [[[2, 16], [5, 16]], [[22, 16], [19, 16]]] },
  slots: [[[4, 16], [5, 16]], [[20, 16], [19, 16]]],
  arrow: { tail: [12, 17], tip: [12, 11], e1: [9, 14], e2: [15, 14] },
  plate: [[2, 2], [22, 2], [22, 22], [2, 22]],
  ink: [2, 2, 22, 22],
};

const MAPS = {
  identity: ([x, y]) => [x, y],
  mirrorY: ([x, y]) => [x, 24 - y],
  toLeft: ([x, y]) => [y, 24 - x],     // top edge to the left edge, up to left
  toRight: ([x, y]) => [24 - y, x],    // top edge to the right edge, up to right
  transpose: ([x, y]) => [y, x],       // the merge rows as columns: header row to header column
};
export const NAMES = {
  'table-rows-add-above': ['edge', 'plus', 'identity'],
  'table-rows-add-below': ['edge', 'plus', 'mirrorY'],
  'table-rows-remove-above': ['edge', 'x', 'identity'],
  'table-rows-remove-below': ['edge', 'x', 'mirrorY'],
  'table-rows-merge-previous': ['merge', 'arrow', 'mirrorY', 'next'],
  'table-rows-merge-next': ['merge', 'arrow', 'identity', 'next'],
  'table-columns-add-before': ['edge', 'plus', 'toLeft'],
  'table-columns-add-after': ['edge', 'plus', 'toRight'],
  'table-columns-remove-before': ['edge', 'x', 'toLeft'],
  'table-columns-remove-after': ['edge', 'x', 'toRight'],
  'table-columns-merge-previous': ['merge', 'arrow', 'toRight', 'next'],
  'table-columns-merge-next': ['merge', 'arrow', 'transpose', 'next'],
};
export const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
export const CORNERS = ['regular', 'sharp'];
export const fileName = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;

/* -------------------------------------------------------------------- drawing */
/** The regular open frame: from one cut end round three corners to the other. */
function edgeFrame(mp) {
  const [c1, c2] = mp(EDGE.cut), K = EDGE.corners;
  const [tl, bl, br, tr] = mp([K.tl, K.bl, K.br, K.tr]);
  const P = mp([[3, 7], [3, 19], [6, 22], [18, 22], [21, 19], [21, 7]]);
  const s = new Sub(c1);
  arcTo(s, tl, P[0]); s.L(P[1]); arcTo(s, bl, P[2]); s.L(P[3]); arcTo(s, br, P[4]); s.L(P[5]); arcTo(s, tr, c2);
  return s;
}
/** The regular frame's open side: each wall from its cut end round the corner
 *  to the divider's centre line (13), where the duotone block buries it. */
function edgeOpen(mp) {
  const [c1, c2] = mp(EDGE.cut), K = EDGE.corners;
  const [tl, tr] = mp([K.tl, K.tr]);
  const P = mp([[3, 7], [3, 13], [21, 13], [21, 7]]);
  const a = new Sub(c1); arcTo(a, tl, P[0]); a.L(P[1]);
  const b = new Sub(P[2]); b.L(P[3]); arcTo(b, tr, c2);
  return [a, b];
}
/**
 * The regular plate: the frame's outer contour (r=4), turned round each cut
 * end's cap on an r=1 arc (corner.mjs's plate join), notched 2 clear of the
 * sign with r=3 corners about the sign box's corners.
 */
function edgePlate(mp, M) {
  const [c1, c2] = mp(EDGE.cut), K = EDGE.corners;
  const [tl, bl, br, tr] = mp([K.tl, K.bl, K.br, K.tr]);
  const n = EDGE.notch;
  const out = (c, p) => add(c, mul(sub(p, c), 4 / 3));             // where the cap touches the r=4 contour
  const [A, T1, Q1, N0, N1, N2, N3, Q2, T2, B, Cc, D, E, F, G] = [
    M([2, 7]), out(tl, c1), M([EDGE.cut[0][0] + 1, R2]), M([n.x0, n.y - n.r]), M([n.x0 + n.r, n.y]), M([n.x1 - n.r, n.y]), M([n.x1, n.y - n.r]),
    M([EDGE.cut[1][0] - 1, R2]), out(tr, c2), M([22, 7]), M([22, 19]), M([18, 23]), M([6, 23]), M([2, 19]),
  ].map((p, i) => (i === 1 || i === 8 ? p : snap(p)));
  const up = sub(M([12, 3]), M([12, 5]));                          // "outward", through the cap's far side
  const [nc0, nc1] = mp([[n.x0 + n.r, n.y - n.r], [n.x1 - n.r, n.y - n.r]]);
  const s = new Sub(A);
  arcTo(s, tl, T1); arcVia(s, c1, Q1, up); s.L(N0); arcTo(s, nc0, N1); s.L(N2); arcTo(s, nc1, N3);
  s.L(Q2); arcVia(s, c2, T2, up); arcTo(s, tr, B); s.L(Cc); arcTo(s, br, D); s.L(E); arcTo(s, bl, F);
  return s.Z();
}
function edgeIcon(sign, M) {
  const mp = (pts) => pts.map((p) => snap(M(p)));
  const out = {};
  for (const corners of CORNERS) {
    const sharp = corners === 'sharp';
    const frame = sharp ? filleted(mp(EDGE.sharpFrame), [], false) : edgeFrame(mp);
    const div = run(...mp(EDGE.divider));
    const sg = signSubs(sign, snap(M(EDGE.sign)), sharp);
    const duoDiv = run(...mp(EDGE.dividerDuo[corners]));
    const plate = sharp ? filleted(mp(EDGE.sharpPlate), EDGE.sharpPlateR, true) : edgePlate(mp, M);
    const [sa, sb] = mp(EDGE.slot); const slotBox = slotFlat(sa, sb);
    const closedIn = filleted(mp(EDGE.closed), sharp ? [] : [0, 0, 3, 3], true);
    const closedOut = filleted(mp(EDGE.closedOuter), sharp ? [0, 0, 1, 1] : [0, 0, 4, 4], true);
    const open = sharp ? EDGE.openSharp.map((pts) => filleted(mp(pts), [], false)) : edgeOpen(mp);
    out[corners] = {
      stroke: [{ k: 's', d: emit([frame, div, ...sg]) }],
      'two-tone': [{ k: 'p', d: emit([closedIn]) }, { k: 's', d: emit([frame, div, ...sg]) }],
      duotone: [{ k: 'g', d: emit(open) }, { k: 'b', d: emit([closedOut]) }, { k: 's', d: emit(sg) }],
      fill: [{ k: 'b', d: emit([closedIn]) }, { k: 's', d: emit([frame, div, ...sg]) }],
      _parts: { frame: emit([frame]), divider: emit([div]), sign: emit(sg), duoDiv: emit([duoDiv]), plate: emit([plate]), slot: emit([slotBox]) },
    };
  }
  return out;
}
function slotFlat(a, b) {
  const u = unit(sub(b, a)), n = perp(u);
  return new Sub(add(a, n)).L(add(b, n)).L(sub(b, n)).L(sub(a, n)).Z();
}

function mergeIcon(M, dir) {
  const mp = (pts) => pts.map((p) => snap(M(p)));
  const out = {};
  const [a0, a1] = dir === 'next' ? [MERGE.arrow.tip, MERGE.arrow.tail] : [MERGE.arrow.tail, MERGE.arrow.tip];
  const tail = snap(M(a0)), tip = snap(M(a1));
  // the head is spelled as the house spells it: left arm first on a vertical
  // arrow, top arm first on a horizontal one (file-arrow-*, corner.mjs)
  const vertical = Math.abs(tip[0] - tail[0]) < 1e-9;
  const [e1, e2] = [snap(M(MERGE.arrow.e1)), snap(M(MERGE.arrow.e2))].sort((a, b) => (vertical ? a[0] - b[0] : a[1] - b[1]));
  for (const corners of CORNERS) {
    const sharp = corners === 'sharp';
    const frame = filleted(mp(MERGE.frame), sharp ? [] : [3, 3, 3, 3], true);
    const header = run(...mp(MERGE.header));
    const headerFill = filleted(mp(MERGE.headerFill), sharp ? [] : [0, 3, 3, 0], true);
    const stubs = MERGE.stubs.map((st) => { const [w, e] = mp(st); return run(w, sharp ? stepOut(e, w) : e); });
    const duoStubs = MERGE.stubsDuo[corners].map((st) => { const [w, e] = mp(st); return run(w, sharp ? stepOut(e, w) : e); });   // edge-anchored: from the plate edge
    const arrow = runsOf([{ p: [tail, tip], free: [1, 0] }, { p: [e1, tip, e2], free: [1, 1] }], sharp);
    const plate = filleted(mp(MERGE.plate), sharp ? [1, 1, 1, 1] : [4, 4, 4, 4], true);
    // knockouts: the stubs' slots from the frame's inner edge, and the arrow's
    // painted region, both from the same (stepped, in sharp) runs as the stroke
    const slots = MERGE.slots.map((st) => { const [a, e] = mp(st); return slotOutline(a, sharp ? stepOut(e, a) : e, !sharp); });
    // the arrow's own ends, as signSubs built them
    const [shaft, head] = arrow;
    const aTail = shaft.start, aTip = shaft.cur, hp = [head.start, ...head.segs.map((g) => g.p)];
    const ko = arrowOutline(aTail, aTip, hp[0], hp[2], sharp);
    out[corners] = {
      stroke: [{ k: 's', d: emit([frame, header, ...stubs, ...arrow]) }],
      // two-tone: a grey plate with the header left as its window, under the
      // whole stroke (his: "why are two-tones not filled with gray bg where
      // possible?"), as table's own two-tone; duotone stays table grey, arrow black
      'two-tone': [{ k: 'p', d: emit(withHoles(plate, [headerFill])) }, { k: 's', d: emit([frame, header, ...stubs, ...arrow]) }],
      duotone: [{ k: 'g', d: emit([frame, header, ...stubs]) }, { k: 's', d: emit(arrow) }],
      fill: [{ k: 'b', d: emit([headerFill]) }, { k: 's', d: emit([frame, header, ...stubs, ...arrow]) }],
      _parts: { frame: emit([frame, header]), stubs: emit(stubs), sign: emit(arrow), duoStubs: emit(duoStubs), plate: emit([plate]), slot: emit(slots), ko: emit([ko]) },
    };
  }
  return out;
}

/* --------------------------------------------------------------------- output */
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const el = (L, sharp) => (L.k === 'p' ? `<path d="${L.d}" fill="black" fill-opacity="0.4"/>\n`
  : L.k === 'b' ? `<path d="${L.d}" fill="black"/>\n`
  : L.k === 'g' ? `<path d="${L.d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`
  : L.k === 'f' ? `<path d="${L.d}" fill="black" fill-rule="evenodd" clip-rule="evenodd"/>\n`
  : `<path d="${L.d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`);
export const svgOf = (layers, sharp) => HEAD + layers.map((L) => el(L, sharp)).join('') + '</svg>\n';

/* ------------------------------------------------------------------- measuring */
const inkOf = (layers, sharp) => {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const L of layers) {
    const x = L.k === 's' || L.k === 'g' ? strokedBBox(L.d, 1, sharp ? 'butt' : 'round') : pathBBox(L.d);
    b = [Math.min(b[0], x[0]), Math.min(b[1], x[1]), Math.max(b[2], x[2]), Math.max(b[3], x[3])];
  }
  return b;
};
/**
 * Painted gap between two drawings (outline to outline, less each one's reach:
 * 1 for a stroke, 0 for a filled edge). A butt end paints nothing past its face,
 * so in sharp a stroke's free ends are walked in by the half-width first, as
 * lint's SPACING does (the squared corners are then understated by 0.414 at most).
 */
const gap = (a, b, reachA = 1, reachB = 1, butt = false) => {
  const lines = (d, reach) => { const subs = subpaths(d, 64).subs; return reach && butt ? trimFreeEnds(subs, 1) : subs.map((s) => s.pts); };
  let best = Infinity;
  for (const p of lines(a, reachA)) for (const q of lines(b, reachB)) best = Math.min(best, minGap(p, q));
  return best - reachA - reachB;
};
const boxOf = (M, box) => { const [a, b] = [M([box[0], box[1]]), M([box[2], box[3]])]; return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[0], b[0]), Math.max(a[1], b[1])]; };

export function buildAll() {
  const icons = {}, report = {};
  for (const [name, [kind, sign, map, dir]] of Object.entries(NAMES)) {
    const M = MAPS[map];
    const v = kind === 'edge' ? edgeIcon(sign, M) : mergeIcon(M, dir);
    const want = boxOf(M, kind === 'edge' ? EDGE.ink : MERGE.ink);
    const notes = [];
    for (const corners of CORNERS) for (const style of STYLES) {
      const b = inkOf(v[corners][style], corners === 'sharp');
      const off = Math.max(...b.map((x, i) => Math.abs(x - want[i])));
      if (off > 1e-3) throw new Error(`${name} ${style} ${corners}: ink ${b.map(f)} wanted ${want}`);
    }
    // gaps, on the regular drawing (the rule is about the drawing; sharp reported)
    for (const corners of CORNERS) {
      const P = v[corners]._parts, bt = corners === 'sharp';
      const g = kind === 'edge'
        ? { signFrame: gap(P.sign, P.frame, 1, 1, bt), signDivider: gap(P.sign, P.divider, 1, 1, bt) }
        : { arrowStubs: gap(P.sign, P.stubs, 1, 1, bt), arrowFrame: gap(P.sign, P.frame, 1, 1, bt) };
      if (corners === 'regular') for (const [k, x] of Object.entries(g)) {
        if (x < 2 - 0.02) throw new Error(`${name}: ${k} ${x.toFixed(3)} under 2`);
      }
      notes.push(`${corners}: ` + Object.entries(g).map(([k, x]) => `${k} ${x.toFixed(2)}`).join(', '));
    }
    // STYLES: merge's two-tone is a grey plate under the whole stroke with the
    // header as its window, duotone the table grey with the arrow black, fill
    // the outline over the header, solid, as the table's own are. Add and remove carry the closed
    // row in every style (his, 24 Sep 2026: "make the other part solid like the
    // other examples ... but for other variants too"): four distinct files.
    for (const c of CORNERS) {
      const [st, tt, du, fi] = STYLES.map((s) => svgOf(v[c][s], c === 'sharp'));
      const edge = kind === 'edge';
      if (new Set([st, tt, du, fi]).size !== 4) throw new Error(`${name} ${c}: style grammar broken`);
    }
    if (svgOf(v.regular.stroke, false) === svgOf(v.sharp.stroke, true)) throw new Error(`${name}: corners identical`);
    icons[name] = v; report[name] = { ink: want, notes };
  }
  return { icons, report };
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const { icons, report } = buildAll();
  if (!process.argv.includes('--check')) {
    for (const [name, v] of Object.entries(icons)) {
      mkdirSync(join(OUT, name), { recursive: true });
      for (const corners of CORNERS) for (const style of STYLES)
        writeFileSync(join(OUT, name, fileName(style, corners)), svgOf(v[corners][style], corners === 'sharp'));
    }
  }
  for (const [name, r] of Object.entries(report)) console.log(name.padEnd(30), 'ink', r.ink.join(','), '\n   ', r.notes.join('\n    '));
}
