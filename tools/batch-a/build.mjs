/**
 * Emit batch A of the 0.8.0 work into raw/ (or --out=DIR/raw).
 *   node tools/batch-a/build.mjs [name ...] [--out=DIR]
 *
 * 10 Sep 2026: printer, keyboard, usb, usb-drive, calculator, eraser, tape,
 * file-zip, file-code, folder-search. The names came off a month of empty searches on
 * the site, so each name is the brief and the drawing has to read at 16px as
 * the thing that was typed. Built on the v5 libraries the way
 * tools/charts/build.mjs is: every plate is an offset checked sample by
 * sample, every knockout is wound against its plate, every sharp free end
 * goes through `sharpEndIn`, and every variant's ink box is asserted before
 * it is written.
 *
 * `file-pdf` is NOT here, on the set's own rule: it draws no letters, and a
 * PDF mark is three letters, two of them with counters that close at 24px
 * (the A/0 arithmetic in SKILL.md). The word wants an alias on `file-text`.
 *
 * One radius per icon, whatever a box's width. Bodies of 16 and over take
 * the house 3 where they stand alone (keyboard, calculator, folder, file);
 * the printer and the usb stick are assemblies of boxes and take r=2 for
 * every box in them, since a 6-tall sheet on r=3 is a pill beside a squared
 * neighbour (the chart-family lesson).
 */
import { readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, add, sub, mul, unit } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { outlineRun } from '../v6/outline.mjs';
import { offsetPath, verify as verifyCubic } from '../v6/offset-cubic.mjs';
import { strokedBBox, outlines } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });

/* ------------------------------------------------------------- helpers */

function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
const runPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join('');
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};
const reverseSeg = (g) =>
  g.type === 'L' ? { type: 'L', p0: g.p1, p1: g.p0 } : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 };
const windingOf = (segs) => Math.sign(areaOf(flatten(segs, 24)));
/** The winding of a plate given as a `d` string, off its first (outer) subpath. */
const windingOfD = (d) => Math.sign(areaOf(outlines(d)[0]));
/** `segs` wound AGAINST a plate of winding `sign`, so it cuts under the non-zero rule. */
const holeIn = (sign, segs) =>
  contourPath(windingOf(segs) === sign ? [...segs].reverse().map(reverseSeg) : segs);
const hole = (plateSegs, segs) => holeIn(windingOf(plateSegs), segs);

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1);
  return off;
}

/** A free polyline end pushed out for the butt cap; an end on another stroke stays put. */
function sharpen(pts, ends = [true, true], box = [1, 1, 23, 23]) {
  const p = pts.map((q) => [...q]);
  if (ends[0]) {
    const dir = unit(sub(p[0], p[1]));
    p[0] = add(p[0], mul(dir, sharpEndIn(p[0], dir, box)));
  }
  if (ends[1]) {
    const last = p.length - 1;
    const dir = unit(sub(p[last], p[last - 1]));
    p[last] = add(p[last], mul(dir, sharpEndIn(p[last], dir, box)));
  }
  return p;
}
const run = (pts, sharp, ends = [true, true], box) => runPath(sharp ? sharpen(pts, ends, box) : pts);

/** A box on the ladder, as a contour. */
const box = ([x0, y0, x1, y1], r) => polyContour([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);
/** A circle as one arc segment, for winding and knockouts. */
const circleSegs = (c, r) => [{ type: 'A', c, r, a0: 0, a1: 360 }];
/**
 * The knockout of an axis-aligned rule from x0..x1 at y (or y0..y1 at x):
 * a stadium a unit wide of the rule, its ends round where the cap is free
 * and square where the rule meets a wall or the cap is a butt.
 */
function ruleHole([x0, y0], [x1, y1], sharp, ends = [true, true]) {
  const horiz = y0 === y1;
  const r0 = ends[0] && !sharp ? 1 : 0, r1 = ends[1] && !sharp ? 1 : 0;
  const e0 = sharp && ends[0] ? 1 : 0, e1 = sharp && ends[1] ? 1 : 0;   // a butt cap paints a unit past the end
  if (horiz) {
    const a = x0 - (ends[0] ? (sharp ? e0 : 1) : 0), b = x1 + (ends[1] ? (sharp ? e1 : 1) : 0);
    return polyContour([[a, y0 - 1], [b, y0 - 1], [b, y0 + 1], [a, y0 + 1]], [r0, r1, r1, r0]);
  }
  const a = y0 - (ends[0] ? (sharp ? e0 : 1) : 0), b = y1 + (ends[1] ? (sharp ? e1 : 1) : 0);
  return polyContour([[x0 - 1, a], [x0 + 1, a], [x0 + 1, b], [x0 - 1, b]], [r0, r0, r1, r1]);
}

const rawOf = (name, style, corners) =>
  readFileSync(join(ROOT, 'raw', name, `Container=regular, Style=${style}, Corners=${corners}.svg`), 'utf8');
const pathsOf = (svg) => [...svg.matchAll(/<path[^>]*\sd="([^"]*)"[^>]*>/g)].map((m) => m[1]);

const SETS = {};

/* -------------------------------------------------------------- printer */

/**
 * ZAFAR'S DRAWING, 10 Sep 2026 (refs/printer.svg), fitted. A body 2..22 by
 * 10..19 whose bottom edge breaks where the printed sheet stands in front of
 * it, a dog-eared sheet going in from above (6..18, its corner cut on a
 * 45-degree run from (14,2) to (18,6)), and the output sheet 6..18 by 15..22
 * crossing the body's foot. Two things moved: his bottom edge stopped at
 * 18.2162 on the right against 6 on the left, and both ends now land ON the
 * sheet's walls at 6 and 18 as T-junctions; and his r=1.5 went to r=2, the
 * body's own radius, since a filled style adds a unit and 2.5 is off the
 * ladder. The dog-ear's two turns are r=1, a detail under 8 units. Ink
 * 1..23 both ways. The fill is the body solid with the output sheet's
 * interior knocked out where it lies over the body (closed ON the plate's
 * foot, never past it) and both sheets outlined; the duotone plate is the
 * silhouette as one contour with its inner corners trimmed.
 */
SETS.printer = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2, r1 = sharp ? 0 : 1;
    const body = new Path().M([6, 19]).corner([2, 19], [2, 10], r).corner([2, 10], [22, 10], r).corner([22, 10], [22, 19], r).corner([22, 19], [18, 19], r).L([18, 19]);
    const top = new Path().M([6, 10]).corner([6, 2], [14, 2], r).corner([14, 2], [18, 6], r1).corner([18, 6], [18, 10], r1).L([18, 10]);
    const sheet = box([6, 15, 18, 22], r);
    const sil = polyContour(
      [[6, 2], [14, 2], [18, 6], [18, 10], [22, 10], [22, 19], [18, 19], [18, 22], [6, 22], [6, 19], [2, 19], [2, 10], [6, 10]],
      [r, r1, r1, 0, r, r, 0, r, r, 0, r, r, 0]);
    const plate = plateOf(sil.segs);
    const bodyPlate = plateOf(box([2, 10, 22, 19], r).segs);
    // the output sheet's interior over the body: its inner ink, r-1 at the top
    // corners, flat on the plate's own foot at y=20
    const well = polyContour([[7, 16], [17, 16], [17, 20], [7, 20]], [Math.max(0, r - 1), Math.max(0, r - 1), 0, 0]);
    const sheets = top.toString() + sheet.toString();
    const d = body.toString() + sheets;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(bodyPlate) + hole(bodyPlate, well.segs)), S(sheets)];
  }
  return { out, want: [1, 1, 23, 23] };
};

/* ------------------------------------------------------------- keyboard */

/**
 * ZAFAR'S DRAWING, 10 Sep 2026 (refs/keyboard.svg), fitted as drawn. The
 * house body at 22 x 18 on r=3, two rows of four keys and a space bar. A
 * key is a filled 2-unit square on r=0.5 (a true corner in sharp), on a 4
 * pitch at x 6, 10, 14, 18 and rows 8 and 12, which is the gap rule's own
 * grid inside walls whose inner ink sits at 3 and 19; the bar is 8..16 at
 * y=16. The fill knocks the keys and the bar out. Note for the overlay: a
 * 4 pitch off a 2-unit wall gap lands the top row where the reference set's
 * keys sit; the bottom row (theirs staggers), the bar and the square keys
 * are his.
 */
SETS.keyboard = () => {
  const out = {};
  const KEYS = [];
  for (const y of [8, 12]) for (const x of [6, 10, 14, 18]) KEYS.push([x, y]);
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = box([2, 4, 22, 20], sharp ? 0 : 3);
    const plate = plateOf(body.segs);
    const bar = run([[8, 16], [16, 16]], sharp, [true, true], [1, 3, 23, 21]);
    const d = body.toString() + bar;
    const cap = (c) => box([c[0] - 1, c[1] - 1, c[0] + 1, c[1] + 1], sharp ? 0 : 0.5);
    const marks = KEYS.map((c) => cap(c).toString()).join('');
    const holes = KEYS.map((c) => hole(plate, cap(c).segs)).join('') + hole(plate, ruleHole([8, 16], [16, 16], sharp).segs);
    out[`stroke.${key}`] = [S(d), F_(marks)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(marks)];
    out[`fill.${key}`] = [F_(contourPath(plate) + holes)];
  }
  return { out, want: [1, 3, 23, 21] };
};

/* ------------------------------------------------------------------ usb */

/**
 * The trident, on Zafar's reference of 10 Sep 2026, redrawn 11 Sep 2026
 * because the first cut's terminals could not be seen.
 *
 * **A terminal has to be a node, not a bead.** The first cut ended each arm in
 * a filled bead of 3 (the dot ladder's "an element of its own"), and against a
 * 2-unit stroke whose own cap already paints 2, a 3-wide bead bulges half a
 * unit either side and reads as a thickening rather than a terminal — the left
 * one and the top one both vanished into their own caps. His reference draws
 * them solid and clearly fatter than the line, and a filled circle that size
 * is not available: the set fills nothing shaped in a stroke variant, and 3 is
 * the largest dot there is (§4, and the compass ruling). So they are OUTLINED,
 * which is the `git-*` family's own grammar — a ring on a connector, with the
 * line running to the ring's path exactly as `git-commit-horizontal` does.
 *
 * **8 across does not fit, and that is arithmetic.** The ladder's node is a
 * stroked r=3 painting 8. The vertical stack is forced: a top terminal clears
 * the shaft by 2 and the canvas by 1, and so does a bottom one, which pins the
 * shaft at y=12 and the terminals at y=5 and y=19 whatever their x. Then the
 * square has to clear the left ring's ink by 2 on one side and the arrowhead's
 * lower arm by 2 on the other, and those two want `xs >= 14.2` and
 * `xs <= 13.17`. They do not meet. At 6 across (rings of r=2, a square of 4)
 * the same solve has room, so that is the size, and the terminals then read at
 * 16px because they are outlined rather than filled.
 *
 * What falls out: the shaft runs y=12 from the left ring's own path at (6,12)
 * to the arrow's tip at (22,12); both branches leave ONE fork at (10,12), which
 * is 2 clear of the left ring's ink, and both run on the 3-4-5 direction, so
 * the trident is symmetric about the shaft and every branch end lands on a
 * tenth. The up branch stops on the top ring's path, the down branch on the
 * middle of the square's top edge, so neither is a free end and sharp squares
 * neither. Ink 1..23 by 3..21, the horizontal size. The rings and the square
 * close, so the fill paints them solid and keeps the shaft, the branches and
 * the head as strokes, which is `chart-scatter-bubble`'s ruling.
 */
SETS.usb = () => {
  const out = {};
  const BOX = [1, 3, 23, 21];
  const L = [4, 12], T = [14.5, 6], R = 2;
  const FORK = [10, 12], TIP = [22, 12];
  const u = [0.6, -0.8];                       // the 3-4-5 direction both branches take
  const upEnd = sub(T, mul(u, R));             // on the top ring's path
  const downEnd = [13, 16];                    // the middle of the square's top edge
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const sq = box([11, 16, 15, 20], sharp ? 0 : 1);
    const rings = circlePath(L, R) + circlePath(T, R);
    const solids = circlePath(L, R + 1) + circlePath(T, R + 1) + contourPath(plateOf(sq.segs));
    // the head's two arms are the only free ends; the shaft's right end is the
    // head's own vertex and its left end sits on the ring's path
    const arm = (p) => run([p, TIP], sharp, [true, false], BOX).replace(/L.*$/, '');
    const head = arm([20, 10]) + `L${pt(TIP)}` + arm([20, 14]).replace(/^M/, 'L');
    const wires = `M6 12L${pt(TIP)}` + `M${pt(FORK)}L${pt(upEnd)}` + `M${pt(FORK)}L${pt(downEnd)}`;
    const d = rings + sq.toString() + wires + head;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(solids), S(d)];
    out[`fill.${key}`] = [F_(solids), S(wires + head)];
  }
  return { out, want: BOX };
};

/* ------------------------------------------------------------ usb-drive */

/**
 * A flash drive lying on its side, on Zafar's reference: a body 2..14 by
 * 4..20 and the plug 14..22 by 6..18 leaving its right wall, both on r=2,
 * with the plug's two slots as marks (filled r=1) at (18,10) and (18,14),
 * which is exactly what a 12-tall plug holds at the house gap: 2 to each
 * wall, 2 between. Ink 1..23 by 3..21. The fill is the body solid with the
 * plug outlined and its marks kept; the duotone plate is the one silhouette.
 */
SETS['usb-drive'] = () => {
  const out = {};
  const MARKS = [[18, 10], [18, 14]];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const body = box([2, 4, 14, 20], r);
    const plug = new Path().M([14, 6]).corner([22, 6], [22, 18], r).corner([22, 18], [14, 18], r).L([14, 18]);
    const sil = polyContour([[2, 4], [14, 4], [14, 6], [22, 6], [22, 18], [14, 18], [14, 20], [2, 20]], [r, r, 0, r, r, 0, r, r]);
    const plate = plateOf(sil.segs);
    const d = body.toString() + plug.toString();
    const marks = MARKS.map((c) => circlePath(c, 1)).join('');
    out[`stroke.${key}`] = [S(d), F_(marks)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(marks)];
    out[`fill.${key}`] = [F_(contourPath(plateOf(body.segs))), S(plug.toString()), F_(marks)];
  }
  return { out, want: [1, 3, 23, 21] };
};

/* ----------------------------------------------------------- calculator */

/**
 * ZAFAR'S DRAWING, 10 Sep 2026 (refs/calculator.svg), fitted as drawn. The
 * tall house body, 4..20 by 2..22 on r=3, a display rule running wall to
 * wall at y=6 (a band, both ends on the walls), seven keys as marks (filled
 * r=1) on the 4 pitch at x 8, 12, 16 and rows 10, 14, 18, and the equals key
 * as a dash 12..16 on the bottom row. Every gap is the house 2. The fill
 * knocks the rule out as a bar between the walls' inner ink, the keys as
 * discs and the dash as a capsule. Note for the overlay: the 4 pitch off a
 * 2-unit wall gap lands the marks where the reference set's do; the band
 * and the equals dash are his.
 */
SETS.calculator = () => {
  const out = {};
  const KEYS = [[8, 10], [12, 10], [16, 10], [8, 14], [12, 14], [16, 14], [8, 18]];
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = box([4, 2, 20, 22], sharp ? 0 : 3);
    const plate = plateOf(body.segs);
    const rule = 'M4 6L20 6';
    const dash = run([[12, 18], [16, 18]], sharp, [true, true], [3, 1, 21, 23]);
    const d = body.toString() + rule + dash;
    const marks = KEYS.map((c) => circlePath(c, 1)).join('');
    // The fill OPENS THE DISPLAY PANEL rather than slotting the rule, which
    // is `map`'s ruling: where interior lines divide a shape into panels, the
    // fill knocks out a whole panel and the lines stay black, merged into the
    // panels either side. Zafar's own fill, 11 Sep 2026, and the first cut
    // read it the other way round. The panel is every edge the stroke already
    // draws — the body's inner ink on three sides, the rule's ink top on the
    // fourth — so it runs 5..19 by 3..5 and its top corners are the body's
    // own inner-ink arcs at r=2, which is where those boundaries actually
    // cross. A uniform small radius there would put white a full 2 units into
    // the top corners' ink. Sharp squares them with the body.
    const inner = sharp ? 0 : 2;
    const display = polyContour([[5, 3], [19, 3], [19, 5], [5, 5]], [inner, inner, 0, 0]);
    const holes = hole(plate, display.segs)
      + KEYS.map((c) => hole(plate, circleSegs(c, 1))).join('')
      + hole(plate, ruleHole([12, 18], [16, 18], sharp).segs);
    out[`stroke.${key}`] = [S(d), F_(marks)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(marks)];
    out[`fill.${key}`] = [F_(contourPath(plate) + holes)];
  }
  return { out, want: [3, 1, 21, 23] };
};

/* --------------------------------------------------------------- eraser */

/**
 * ZAFAR'S REDRAW, 10 Sep 2026 (refs/eraser.svg), fitted, with TWO numbers
 * changed on 11 Sep 2026 and both changes forced.
 *
 * What is his and stays: the block lies at 45 degrees (the free diagonal's
 * direction), its lower vertex is CUT FLAT by the ground line so the eraser
 * rests on the mark instead of touching it at a point, the line runs on from
 * that cut to the right edge, and a rule across the block marks the sleeve.
 * The flat cut is the whole point of his redraw and every corner of the
 * construction below is built from it.
 *
 * What changed, and why neither was a choice:
 *
 * - **The rule clears the ground line by 2.00, where his cleared it by 0.44.**
 *   The rule and the line are separate elements, so the house gap governs, and
 *   0.44 is not a rounding artefact: two near-parallel lines that close merge
 *   at 16px. The line's ink top is `yCut - 1` and the rule's lower cap reaches
 *   1 past its endpoint, so the endpoint solves to `yCut - 4` and nothing about
 *   it is free. It moves the rule from 40 per cent of the block to 47.
 *
 * - **The block is 10 across where his was 12.** His drawing measured 88 per
 *   cent against the reference set's eraser in both directions, which is a copy
 *   rather than convergence: same size, same angle, same radius, same flat cut,
 *   the two silhouettes a fraction of a unit apart. The rule and the line
 *   already differed; the body did not. Slimming the short axis moves both
 *   flanks, which is where the agreement lived, and the long axis grows with it
 *   since the ink box is fixed, so the block comes out 2:1 rather than 1.55:1 —
 *   an eraser's own proportion, and clear of `pen`'s 6.67-wide body.
 *
 * Everything else falls out. The centre is (12,13) and the block sits at 45
 * degrees, so its x-extent and y-extent are equal and `C.y - C.x = 1` puts the
 * left ink on 1 exactly when the top ink is on 2: one bisection on the
 * half-length `a` lands the whole box. Ink 1..23 by 2..22, the horizontal size.
 * Sharp solves its own half-length so the true corners paint the same box, and
 * takes the same rule position, since a base and its treatments are one
 * drawing. The fill opens the rubber panel, bounded by the block's inner ink,
 * the rule's and the ground's, with true corners where the block's vertices are
 * cut.
 */
SETS.eraser = () => {
  const out = {};
  const C = [12, 13], b = 5;
  const u = [Math.SQRT1_2, -Math.SQRT1_2], v = [Math.SQRT1_2, Math.SQRT1_2];
  const at = (s, t) => add(add(C, mul(u, s)), mul(v, t));
  const dir = (deg) => [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];
  const WANT = [1, 2, 23, 22];
  const yCut = 21;
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const cap = sharp ? 'butt' : 'round';
    // the uncut block, to solve the half-length on the top edge's ink
    const verts = (a) => [at(a, -b), at(a, b), at(-a, b), at(-a, -b)];   // top, right, bottom, left
    const whole = (a) => polyContour(verts(a), [r, r, r, r]);
    let lo = 6, hi = 14, a = 10;
    for (let i = 0; i < 60; i++) { a = (lo + hi) / 2; if (strokedBBox(whole(a).d, 1, cap)[1] < WANT[1]) hi = a; else lo = a; }
    const [VT, VR, VB, VL] = verts(a);
    // where the ground line cuts the two lower edges
    const cutOn = (P, Q) => add(P, mul(sub(Q, P), (yCut - P[1]) / (Q[1] - P[1])));
    const BL = cutOn(VB, VL), BR = cutOn(VB, VR);
    const body = polyContour([VT, VR, BR, BL, VL], [r, r, 0, 0, r]);
    const bb = strokedBBox(body.d, 1, cap);
    if (Math.max(...bb.map((x, i) => Math.abs(x - WANT[i]))) > 0.002) throw new Error(`eraser box ${bb.join(', ')}`);
    const k = r * Math.SQRT2;
    const F = { top: [VT[0], VT[1] + k], right: [VR[0] - k, VR[1]], left: [VL[0] + k, VL[1]] };
    const endX = sharp ? 23 : 22;
    const ground = `M${pt([VB[0], yCut])}L${endX} ${yCut}`;
    // the rule, solved so its lower cap clears the ground line's ink by 2:
    // at(sd, b).y = yCut - 4, which is the only value that satisfies it
    const sd = Math.SQRT2 * (C[1] - (yCut - 4)) + b;
    const rule = runPath([at(sd, -b), at(sd, b)]);
    const d = body.toString() + rule + ground;
    // the plate by hand: block offset plus the ground band, one contour
    const R = r + 1;
    const q0 = add(F.right, mul(dir(45), R));                       // lower-right flank starts here
    const X = add(q0, mul([-Math.SQRT1_2, Math.SQRT1_2], (yCut - 1 - q0[1]) * Math.SQRT2));   // meets the band's top edge y=20
    const p = new Path().M(X).L([endX, yCut - 1]);
    if (sharp) p.L([endX, yCut + 1]); else p.A([endX, yCut], -90, 90, 1);   // a butt cap's plate ends on the cap's own face
    p.L([BL[0], yCut + 1]).A(BL, 90, 135, 1)
      .L(add(F.left, mul(dir(135), R))).A(F.left, 135, 225, 1)
      .L(add(F.top, mul(dir(225), R))).A(F.top, 225, 315, 1)
      .L(add(F.right, mul(dir(315), R))).A(F.right, 315, 45, 1)
      .L(X).Z();
    const face = (s) => s.type === 'L' && Math.abs(s.p0[0] - endX) < 1e-9 && Math.abs(s.p1[0] - endX) < 1e-9;
    verify([...body.segs, { type: 'L', p0: [VB[0], yCut], p1: [endX, yCut] }], p.segs.filter((s) => !face(s)), 1);
    const plate = contourPath(p.segs);
    // the rubber panel: inner ink of the block, cut at the rule and at the ground
    const ri = sharp ? 0 : 1;
    const yIn = yCut - 1;
    // corners in (s,t): left end at s=-a+1, rule at s=sd-1, flanks at t=+-(b-1); the ground cuts where y = yIn
    const sL = -a + 1, sR = sd - 1, tT = -b + 1, tB = b - 1;
    // y = C.y - s/sqrt2 + t/sqrt2 = yIn  ->  t - s = (yIn - C.y) * sqrt2
    const kk = (yIn - C[1]) * Math.SQRT2;
    const onFlank = [tB - kk, tB];        // s where the bottom flank meets the ground's inner ink
    const onEnd = [sL, kk + sL];          // t where the left end meets it
    const panel = polyContour([at(sL, tT), at(sR, tT), at(sR, tB), at(onFlank[0], tB), at(onEnd[0], onEnd[1])], [ri, 0, 0, 0, 0]);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate + holeIn(windingOf(p.segs), panel.segs))];
  }
  return { out, want: WANT };
};

/* ----------------------------------------------------------------- tape */

/**
 * A roll of tape seen from above and in front, on Zafar's reference of
 * 10 Sep 2026 and his pick of 11 Sep from three candidates: the roll, its
 * core, and the tape's TORN END running down the front face.
 *
 * **The torn edge is what the first two cuts could not carry, and the reason
 * was a bad generalisation.** A tear has to zigzag ACROSS the tape's width,
 * and a strip narrow enough to lie beside a roll is a single 2-unit stroke,
 * so its teeth would be under a unit. Run down the roll's FRONT FACE the same
 * tear has the body's whole depth to work in — 8 units here — so three teeth
 * of a unit each read down to about 32px. The face-on roll of 10 Sep could
 * not have it; this one can.
 *
 * **The core is what fixes the perspective, and it is a hard inequality.**
 * The rim's inner ink must clear the core's ink by the house 2, so the core's
 * vertical radius is the rim's minus 4, and the core's own white is twice
 * that minus 2. At ry=7 the white is 4 and survives 16px, but the top face is
 * then nearly round; at ry=5 the white is 1 and gone at every size. ry=6 is
 * the trade he took: a white slot 2 units tall, which reads to about 32px and
 * closes below it, on a face whose 10:6 still reads as perspective. Nothing
 * flatter is available — at the 10:4.5 his reference actually draws, the
 * core's radius solves to 0.5 and there is no core at all.
 *
 * Everything else falls out of those two. The body's depth is the canvas: ink
 * 1..23 both ways is 22 by 22, the circle size, so the depth is 22 − 2·6 − 2
 * = 8 and the front face is 8 units tall at every x. The torn edge stands at
 * x=17, the only column where its teeth clear the right wall's ink by 2 with
 * room for three of them. Its ends land ON the rim and on the foot, so
 * neither is free and sharp squares neither: this is one drawing in both
 * treatments, as `pen` is.
 *
 * **The fill fills a face rather than cutting holes**, which is `package`'s
 * and `truck`'s pattern: one closed region under the whole stroke drawing.
 * The region is the front face LEFT of the tear — the part still wrapped — so
 * the torn edge is the boundary between the dark and the light and survives
 * into the filled style, where a knockout of it would have been a 2-unit
 * zigzag slot and noise. The rim, the core and the tear all stay strokes, so
 * the fill says what the stroke says. Its SPACING warning of 0.00 is the
 * pattern: the region is coincident with the ink it sits under.
 *
 * The plate is the silhouette offset by 1 and CHECKED — the offset of an
 * ellipse is not an ellipse, so it goes through the cubic offsetter and every
 * sample is measured; the scaled-ellipse shortcut is 0.03 out.
 */
SETS.tape = () => {
  const out = {};
  const cx = 12, cy = 8, rx = 10, ry = 6, depth = 8;
  const crx = 5, cry = 2;                       // the core
  const xz = 17, teeth = 3, amp = 1;            // the torn edge
  const KK = 0.5522847498307936;
  const up = (ex, ey, a, b) => `C${num(ex - a)} ${num(ey - KK * b)} ${num(ex - KK * a)} ${num(ey - b)} ${num(ex)} ${num(ey - b)}C${num(ex + KK * a)} ${num(ey - b)} ${num(ex + a)} ${num(ey - KK * b)} ${num(ex + a)} ${num(ey)}`;
  const dn = (ex, ey, a, b) => `C${num(ex + a)} ${num(ey + KK * b)} ${num(ex + KK * a)} ${num(ey + b)} ${num(ex)} ${num(ey + b)}C${num(ex - KK * a)} ${num(ey + b)} ${num(ex - a)} ${num(ey + KK * b)} ${num(ex - a)} ${num(ey)}`;
  /** A whole ellipse: left, top, right, bottom is clockwise on screen. */
  const ell = (ex, ey, a, b) => `M${num(ex - a)} ${num(ey)}` + up(ex, ey, a, b) + dn(ex, ey, a, b) + 'Z';
  /** The elliptical arc from parameter t0 to t1, as cubics with the tangents held. */
  const ellArc = (ex, ey, a, b, t0, t1, steps = 3) => {
    const Pt = (t) => [ex + a * Math.cos(t), ey + b * Math.sin(t)];
    const Dt = (t) => [-a * Math.sin(t), b * Math.cos(t)];
    let d = '';
    for (let i = 0; i < steps; i++) {
      const u = t0 + ((t1 - t0) * i) / steps, v = t0 + ((t1 - t0) * (i + 1)) / steps, h = (v - u) / 3;
      const p0 = Pt(u), p1 = Pt(v), d0 = Dt(u), d1 = Dt(v);
      d += `C${num(p0[0] + d0[0] * h)} ${num(p0[1] + d0[1] * h)} ${num(p1[0] - d1[0] * h)} ${num(p1[1] - d1[1] * h)} ${num(p1[0])} ${num(p1[1])}`;
    }
    return d;
  };
  // The cylinder's outline, and its plate. The outline is split into quarters
  // of a quarter before offsetting: the offsetter fits one cubic per cubic, so
  // at the ellipse's own 2-per-half it lands 0.0163 outside the ink, which the
  // plate sweep sees, and at 4 it lands 0.0014 — under the 0.0026 the bells
  // were rebuilt to. The stroke's own rim keeps its 4 cubics; only the
  // silhouette that gets offset is subdivided.
  const sil = `M${num(cx - rx)} ${num(cy)}` + ellArc(cx, cy, rx, ry, Math.PI, 2 * Math.PI, 4)
    + `L${num(cx + rx)} ${num(cy + depth)}` + ellArc(cx, cy + depth, rx, ry, 0, Math.PI, 4) + 'Z';
  const plateD = offsetPath(sil, 1);
  { const v = verifyCubic(sil, plateD, 1, 0.005); if (!v.ok) throw new Error(`tape plate off by ${v.worst.toFixed(4)}`); }
  // the torn edge: both ends land on the rim and on the foot, so neither is free
  const tz = Math.acos((xz - cx) / rx);          // the rim's parameter at the tear
  const zTop = cy + ry * Math.sin(tz), zBot = cy + depth + ry * Math.sin(tz);
  const zPts = [[xz, zTop]];
  for (let i = 0; i < teeth; i++) {
    const st = (zBot - zTop) / teeth;
    zPts.push([xz + (i % 2 ? amp : -amp), zTop + st * (i + 0.5)], [xz, zTop + st * (i + 1)]);
  }
  // the face still wrapped: the rim's front arc to the tear, down the tear,
  // the foot's arc back, and up the left wall. Every edge of it lies under ink.
  const wrapped = `M${num(cx - rx)} ${num(cy)}` + ellArc(cx, cy, rx, ry, Math.PI, tz)
    + zPts.slice(1).map((q) => `L${pt(q)}`).join('')
    + ellArc(cx, cy + depth, rx, ry, tz, Math.PI) + 'Z';
  const d = ell(cx, cy, rx, ry) + ell(cx, cy, crx, cry)
    + `M${num(cx - rx)} ${num(cy)}L${num(cx - rx)} ${num(cy + depth)}` + dn(cx, cy + depth, -rx, ry) + `L${num(cx + rx)} ${num(cy)}`
    + runPath(zPts);
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plateD), S(d)];
    out[`fill.${key}`] = [F_(wrapped), S(d)];
  }
  return { out, want: [1, 1, 23, 23] };
};

/* -------------------------------------------------------- folder-search */

/**
 * `folder-plus`'s body, plate and notch verbatim, with the lens sign the
 * set already draws for `map-pin-search` translated into the folder's
 * corner box: a ring of r=2.5 at (17.5,16.5) and a handle from (19.5,18.5)
 * to (21,20), so the sign's ink ends on the body's ink corner at (22,21).
 * The sharp handle is `map-pin-search`'s sharp handle moved the same 2
 * units. The lens stays stroked in the fill, as it does there.
 */
SETS['folder-search'] = () => {
  const out = {};
  const SIGN = { regular: 'M18 14V20M15 17H21', sharp: 'M18 13L18 21M14 17L22 17' };
  const HANDLE = { regular: 'M19.5 18.5L21 20', sharp: 'M19.2678 18.2678L21.2929 20.2929' };
  for (const key of ['regular', 'sharp']) {
    const [stroke] = pathsOf(rawOf('folder-plus', 'stroke', key));
    if (!stroke.endsWith(SIGN[key])) throw new Error(`folder-plus ${key} stroke does not end in its sign`);
    const body = stroke.slice(0, -SIGN[key].length);
    const [plate] = pathsOf(rawOf('folder-plus', 'duotone', key));
    const lens = circlePath([17.5, 16.5], 2.5) + HANDLE[key];
    out[`stroke.${key}`] = [S(body + lens)];
    out[`duotone.${key}`] = [P(plate), S(body + lens)];
    out[`fill.${key}`] = [F_(plate), S(lens)];
  }
  return { out, want: [2, 3, 22, 21] };
};

/* --------------------------------------------------- file-code, file-zip */

/** `file`'s body and `file-text`'s plate and fold knockout, read off the tree. */
function fileParts(key) {
  const [body] = pathsOf(rawOf('file', 'stroke', key));
  const [plate] = pathsOf(rawOf('file-text', 'duotone', key));
  const [fill] = pathsOf(rawOf('file-text', 'fill', key));
  const fold = fill.match(key === 'sharp' ? /M15 8[^M]*Z$/ : /M14 5[^M]*Z$/)?.[0];
  if (!fold) throw new Error(`no fold knockout in file-text ${key} fill`);
  return { body, plate, fold, sign: windingOfD(plate) };
}

/**
 * A pair of angle brackets in the file's content band. The band is fixed
 * before the brackets are: the fold's ink stops at 9 and the foot's inner
 * ink is 21, so with 2 clear of each the content runs 12..18; the walls'
 * inner ink is 5 and 19, so the tips stand on 8 and 16. Two brackets that
 * open toward each other need 2 of daylight between their open ends, and
 * that fixes their width at 2 whatever else is chosen. What the reference
 * set does with that box is a 45-degree bracket 4 tall; ours fills the
 * band, 6 tall, so the arms run at `code`'s own pitch (a 49-degree arm
 * there, 56 here) rather than the diagonal. The fill knocks each bracket
 * out as the band it paints.
 */
SETS['file-code'] = () => {
  const out = {};
  const L = [[10, 12], [8, 15], [10, 18]], Rt = [[14, 12], [16, 15], [14, 18]];
  const BOX = [3, 1, 21, 23];
  for (const key of ['regular', 'sharp']) {
    const sharp = key === 'sharp';
    const { body, plate, fold, sign } = fileParts(key);
    const runs = [L, Rt].map((pts) => (sharp ? sharpen(pts, [true, true], BOX) : pts));
    const marks = runs.map(runPath).join('');
    const holes = runs.map((pts) => holeIn(sign, outlineRun(lineSegs(pts), 1, sharp ? 'butt' : 'round'))).join('');
    out[`stroke.${key}`] = [S(body + marks)];
    out[`duotone.${key}`] = [P(plate), S(body + marks)];
    out[`fill.${key}`] = [F_(plate + fold + holes)];
  }
  return { out, want: [3, 1, 21, 23] };
};

/**
 * ZAFAR'S REDRAW, 10 Sep 2026 (refs/file-zip.svg), fitted as drawn. The zip
 * runs at x=10 (2 clear of the fold's ink at 13): a dash 2..6 standing in the
 * top wall, a dash 10..14 running into a ring pull at (10,16) on r=2, and
 * nothing else. The pull's interior is 2 and closes to a bead at 16px, and
 * the ladder's node (r=3) does not fit the file's foot or wall by a unit
 * each; his call, kept as drawn.
 *
 * **The fill knocks the lower dash and the pull out as ONE contour**, and
 * that is the whole difficulty. Two knockouts may not overlap — under the
 * non-zero rule the overlap paints, which is the briefcase defect — so the
 * first cut stopped the slot flat on the disc's topmost POINT and left the
 * two of them tangent. A tangency is not a join: just below that point the
 * disc is narrower than the 2-unit slot, so a black wedge sat in each corner
 * of the neck, which is what Zafar marked on 11 Sep 2026. The slot's sides
 * meet the disc where `x = 10 ± 1` crosses it, at `y = 16 − √8`, so the
 * contour runs down each side to that height and the disc's own arc carries
 * on from there — the long way round, since the short way is the neck the
 * slot already fills. The white is then continuous with no wedge, and the
 * pip inside it is a separate subpath wound to paint, which is the badge
 * rule that keeps the pull a ring rather than a keyhole.
 */
SETS['file-zip'] = () => {
  const out = {};
  const X = 10, PULL = [10, 16], PR = 2;
  const BOX = [3, 1, 21, 23];
  const yj = PULL[1] - Math.sqrt((PR + 1) ** 2 - 1);   // where the slot's sides cross the disc
  for (const key of ['regular', 'sharp']) {
    const sharp = key === 'sharp';
    const { body, plate, fold, sign } = fileParts(key);
    const zip = run([[X, 2], [X, 6]], sharp, [false, true], BOX)
      + run([[X, 10], [X, 14]], sharp, [true, false], BOX) + circlePath(PULL, PR);
    const r = sharp ? 0 : 1;
    const neck = new Path().M([X - 1, yj])
      .corner([X - 1, 9], [X + 1, 9], r)
      .corner([X + 1, 9], [X + 1, yj], r)
      .L([X + 1, yj]);
    const ang = (dx) => (Math.atan2(yj - PULL[1], dx) * 180) / Math.PI;
    neck.A(PULL, ang(1), ang(-1), 1).Z();      // +1: round the outside, not across the neck
    const holes = holeIn(sign, ruleHole([X, 3], [X, 6], sharp, [false, true]).segs)
      + holeIn(sign, neck.segs)
      + holeIn(sign, circleSegs(PULL, PR - 1));
    out[`stroke.${key}`] = [S(body + zip)];
    out[`duotone.${key}`] = [P(plate), S(body + zip)];
    out[`fill.${key}`] = [F_(plate + fold + holes)];
  }
  return { out, want: [3, 1, 21, 23] };
};

/* ------------------------------------------------------------------ main */

const inkOf = (layers, cap) => {
  const strokes = layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join('');
  const b = strokes ? strokedBBox(strokes, 1, cap) : [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers.filter((l) => l.kind !== 'stroke')) {
    const q = strokedBBox(l.d, 0, 'butt');
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  return b;
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  const names = want.length ? want : Object.keys(SETS);
  for (const name of names) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const { out: variants, want: box } = SETS[name]();
    for (const [key, layers] of Object.entries(variants)) {
      const cap = key.endsWith('sharp') ? 'butt' : 'round';
      const b = inkOf(layers, cap);
      const off = Math.max(...b.map((v, i) => Math.abs(v - box[i])));
      if (off > 0.003) throw new Error(`${name} ${key}: ink ${b.map((v) => v.toFixed(3)).join(' ')} wants ${box.join(' ')}`);
      for (const l of layers) if (/C(-?[\d.]+ -?[\d.]+) \1 \1/.test(l.d)) throw new Error(`${name} ${key}: zero-length cubic`);
    }
    writeSet(root, name, variants);
    console.log(name.padEnd(16), 'ink', box.join(' '), ` ${box[2] - box[0]} x ${box[3] - box[1]}`, ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS };
