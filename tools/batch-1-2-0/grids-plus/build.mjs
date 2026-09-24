// grids-plus, Keyline Icons 1.2.0: seven `-plus` compounds on shipped bases.
//   node build.mjs --out=DIR            writes DIR/raw/<name>/*.svg (8 files each)
//   node build.mjs --out=DIR --report   also prints the construction numbers
// Every coordinate comes from a shipped raw/ file (read from this checkout) or is
// solved here; nothing is typed into an SVG by hand. Rerunning is byte-identical.
import { outDir } from '../paths.mjs';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  STYLES, CORNERS, fileName, shipped, tags, dOf, fmt, parse, emit, translate, subpathsOf,
  arcCubic, pointSeg, centreGap, svg, strokeTag, fillTag, assert, swapOnce,
} from './lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPORT = process.argv.includes('--report');
const log = (...a) => { if (REPORT) console.log(...a); };
const notes = {};
const note = (name, s) => (notes[name] ||= []).push(s);

// ---------------------------------------------------------------------------
// The sign. Box-6 corner families write the plus vertical first
// (`M19 16V22M16 19H22`, drawing-a-new-icon §9); the container families write it
// horizontal first (`M8 12L16 12M12 8L12 16`, shield-plus). Each compound below
// uses the spelling of the family its sibling belongs to.
// Sharp: every arm end is a free axis-aligned end, so it runs on by 1 (k = 1 on
// an axis, sharp.md *Free ends*) and the butt face lands where the round cap did.
const plusV = (cx, cy, h, sharp) => { const e = h + (sharp ? 1 : 0); return `M${fmt(cx)} ${fmt(cy - e)}L${fmt(cx)} ${fmt(cy + e)}M${fmt(cx - e)} ${fmt(cy)}L${fmt(cx + e)} ${fmt(cy)}`; };
const plusH = (cx, cy, h, sharp) => { const e = h + (sharp ? 1 : 0); return `M${fmt(cx - e)} ${fmt(cy)}L${fmt(cx + e)} ${fmt(cy)}M${fmt(cx)} ${fmt(cy - e)}L${fmt(cx)} ${fmt(cy + e)}`; };

// ---------------------------------------------------------------------------
// Sign swaps on a shipped sibling: grid-squares-check, grid-circles-check and
// circle-dashed-check are copied file for file and only the check is replaced.
//
// The grid cell plus is the house 6-box plus, his call on the second round: 6
// long, paints 8, centred on whole numbers. The freed cell's ink is 13..22 (9, odd),
// so no whole-number plus is centred in it; flush in the base's ink corner it is
// app-plus's plus exactly, `M18 15V21M15 18H21` (the house block moved (-1,-1)),
// ink 14..22, 3 clear of the neighbouring cells. The base does not move: flush,
// the gap is 3 wherever the base sits (cell 9, plus 8), and 2 would need the plus
// 1 short of the ink corner (13..21, on the sheet as the alternative), where it is
// the second set's layout-grid-add plus coordinate for coordinate (overlay 40.4).
// Against the shipped cell signs: x 14..21 both axes (7), check 13..22 by 14..21
// (9 by 7), plus 14..22 (8 by 8); the plus's arm is 6 against the x's 7.07.
const CELL_PLUS = [18, 18, 3];
function swapSign(name, sibling, from, to, verify) {
  const out = {};
  for (const c of CORNERS) for (const s of STYLES) {
    const f = fileName(s, c);
    out[f] = swapOnce(shipped(sibling, s, c), from[c], to[c], `${sibling} ${f}`);
  }
  verify(out);
  return out;
}

/** The part of a compound that is not the sign must be the base with its bottom-right cell taken out. */
function verifyCellCompound(base, signs) {
  return (out) => {
    for (const c of CORNERS) {
      const pool = new Set(STYLES.flatMap((s) => tags(shipped(base, s, c)).flatMap((t) => subpathsOf(dOf(t)))));
      for (const s of STYLES) {
        for (const t of tags(out[fileName(s, c)])) for (const sp of subpathsOf(dOf(t))) {
          if (signs[c].includes(sp)) continue;
          assert(pool.has(sp), `${base} ${s} ${c}: ${sp.slice(0, 40)} is not a subpath of the shipped base`);
          const nums = parse(sp).flatMap((k) => k.args.map(Number));
          const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
          assert(Math.min(...xs) < 12 || Math.min(...ys) < 12, `${base} ${s} ${c}: a bottom-right cell subpath survived`);
        }
      }
    }
  };
}

function gridCell(base, [cx, cy, h] = CELL_PLUS) {
  const CHECK = { regular: 'M14 17.5L16.3333 20L21 15', sharp: 'M13.7035 17.1823L16.3333 20L21.2689 14.7118' };
  const PLUS = { regular: plusV(cx, cy, h, false), sharp: plusV(cx, cy, h, true) };
  if (cx === 18 && cy === 18) {
    // app-plus's own plus, both corners (duotone spells it with L, as this family does)
    for (const c of CORNERS) assert(dOf(tags(shipped('app-plus', 'duotone', c))[1]) === PLUS[c], `cell plus drifted from app-plus ${c}`);
  }
  const signSubs = { regular: subpathsOf(PLUS.regular), sharp: subpathsOf(PLUS.sharp) };
  const out = swapSign(`${base}-plus`, `${base}-check`, CHECK, PLUS, verifyCellCompound(base, signSubs));
  if (cx === 18 && cy === 18) {
    const cells = dOf(tags(out[fileName('stroke', 'regular')])[0]).replace(PLUS.regular, '');
    note(`${base}-plus`, `plus to the nearest cell: ${(centreGap(PLUS.regular, cells) - 2).toFixed(3)} painted`);
  }
  return out;
}

function circleDashed() {
  // circle-dashed-check carries circle-check's mark unscaled; the plus is
  // shield-plus's (circle-plus's without the .005 artefact), sharp as shield-plus sharp.
  const CHECK = { regular: 'M8 12L10.6667 15L16 9', sharp: 'M7.7016 11.6644L10.6667 15L16.2984 8.6644' };
  const PLUS = { regular: plusH(12, 12, 4, false), sharp: plusH(12, 12, 4, true) };
  assert(PLUS.regular === 'M8 12L16 12M12 8L12 16', 'plus drifted from shield-plus');
  assert(dOf(tags(shipped('shield-plus', 'stroke', 'sharp'))[0]).endsWith(PLUS.sharp), 'sharp plus drifted from shield-plus');
  return swapSign('circle-dashed-plus', 'circle-dashed-check', CHECK, PLUS, (out) => {
    // the dashes are circle-dashed's, to the sibling's own rounding
    for (const c of CORNERS) {
      const want = parse(dOf(tags(shipped('circle-dashed', 'stroke', c))[0])).flatMap((k) => k.args.map(Number));
      for (const s of STYLES) {
        const d = tags(out[fileName(s, c)]).map(dOf).join('').replace(PLUS[c], '');
        const got = parse(d).flatMap((k) => k.args.map(Number));
        assert(got.length === want.length && got.every((v, i) => Math.abs(v - want[i]) < 1e-4), `circle-dashed-plus ${s} ${c}: dashes are not the base's`);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// wifi-plus. wifi-x's construction (drawing-a-new-icon §8): the fan moves 2 left
// onto (10,18), the sign takes the box 16..22 by 12..18 outside the fan's ink,
// each arc's right half is re-cut to its own clearance and the inner two end
// together. The plus reaches different points from the x (its arm ends, not a
// diagonal), so the angles are solved again. The solver is first run on the x
// and must land on wifi-x's shipped numbers.
const FAN_C = [10, 18], HALF = Math.asin(2 / 3);
const P = (r, th) => [FAN_C[0] + r * Math.sin(th), FAN_C[1] - r * Math.cos(th)];
const dSign = (p, segs) => Math.min(...segs.map(([a, b]) => pointSeg(p, a, b)));
/** Largest angle off the apex at which the arc's centre line still clears the sign's by `need` (ink 2). */
function ownAngle(r, segs, need = 4) {
  const ok = (th) => { for (let k = 0; k <= 200; k++) if (dSign(P(r, (th * k) / 200), segs) < need - 1e-9) return false; return true; };
  if (ok(HALF)) return HALF;
  let lo = 0, hi = HALF;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; ok(m) ? (lo = m) : (hi = m); }
  return lo;
}
function fanCut(signSegs) {
  const own = [4, 8, 12].map((r) => ownAngle(r, signSegs));
  const inner = Math.min(own[0], own[1]);
  return { own, cut: [inner, inner, own[2]] };
}
/**
 * The fan's subpaths, translated, with each arc's right half re-cut at `cut[i]`.
 * Sharp cut ends: `unit` is wifi-x's full-unit stub along the tangent (replay
 * only); `house` is the 1.1.0 compound builder's stub, k = (1 - sin t)/cos t
 * with t off the nearer axis (stubAt, tools/v8/c2/cutter.mjs), which keeps the
 * butt corners inside the round cap's box.
 */
function wifiFan(corners, cut, stub = 'house') {
  const src = subpathsOf(dOf(tags(shipped('wifi', 'stroke', corners))[0]));
  assert(src.length === 3, 'wifi has three arcs');
  return src.map((sp, i) => {
    const r = [4, 8, 12][i];
    const k = parse(translate(sp, -2, 0));
    const cs = k.filter((x) => x.cmd === 'C');
    assert(cs.length === 2, 'each wifi arc is two cubics split at the apex');
    const apex = cs[0].args.slice(4).map(Number);
    assert(Math.abs(apex[0] - FAN_C[0]) < 1e-9 && Math.abs(apex[1] - (FAN_C[1] - r)) < 1e-9, `arc ${r}: apex not on (10, ${18 - r})`);
    const a0 = -Math.PI / 2, a1 = -Math.PI / 2 + cut[i];
    const { p1, p2, p3 } = arcCubic(FAN_C, r, a0, a1);
    const right = { cmd: 'C', args: [...p1, ...p2, ...p3].map(fmt) };
    const upto = k.indexOf(cs[1]);
    const head = k.slice(0, upto);
    const tail = [right];
    if (corners === 'sharp') {
      const t = [Math.cos(cut[i]), Math.sin(cut[i])];
      const off = Math.min(cut[i], Math.PI / 2 - cut[i]);
      const k = stub === 'unit' ? 1 : (1 - Math.sin(off)) / Math.cos(off);
      tail.push({ cmd: 'L', args: [fmt(p3[0] + k * t[0]), fmt(p3[1] + k * t[1])] });
    }
    return emit([...head, ...tail]);
  });
}
function wifiCompound(signD, signSegs, cutInfo) {
  const out = {};
  const dot = { regular: dOf(tags(shipped('wifi', 'stroke', 'regular'))[1]), sharp: dOf(tags(shipped('wifi', 'stroke', 'sharp'))[1]) };
  for (const c of CORNERS) {
    const sharp = c === 'sharp';
    const fan = wifiFan(c, cutInfo.cut).join('');
    const dotD = translate(dot[c], -2, 0);
    const sign = signD(sharp);
    const stroke = svg(strokeTag(fan + sign, { sharp }), fillTag(dotD));
    const toned = svg(strokeTag(fan, { sharp, op: 0.4 }), fillTag(dotD, { op: 0.4 }), strokeTag(sign, { sharp }));
    out[fileName('stroke', c)] = stroke;
    out[fileName('fill', c)] = stroke;
    out[fileName('two-tone', c)] = toned;
    out[fileName('duotone', c)] = toned;
  }
  return out;
}
function wifiPlus() {
  // replay wifi-x first: the same solver on the x must give the shipped cuts
  const X = [[[16, 12], [22, 18]], [[22, 12], [16, 18]]];
  const xCut = fanCut(X);
  const deg = (a) => (a * 180) / Math.PI;
  assert(Math.abs(deg(xCut.own[2]) - 34.14) < 0.01 && Math.abs(deg(xCut.own[1]) - 17.11) < 0.01 && Math.abs(deg(xCut.own[0]) - deg(HALF)) < 1e-6, `wifi-x replay: ${xCut.own.map(deg)}`);
  for (const c of CORNERS) {
    const mine = wifiFan(c, xCut.cut, 'unit');
    const theirs = subpathsOf(dOf(tags(shipped('wifi-x', 'stroke', c))[0])).slice(0, 3);
    mine.forEach((m, i) => {
      const a = parse(m).flatMap((k) => k.args.map(Number)), b = parse(theirs[i]).flatMap((k) => k.args.map(Number));
      assert(a.length === b.length && a.every((v, j) => Math.abs(v - b[j]) < 2e-4), `wifi-x replay ${c} arc ${i}: ${m} vs ${theirs[i]}`);
    });
  }
  const PLUS_SEGS = [[[19, 12], [19, 18]], [[16, 15], [22, 15]]];
  const cutInfo = fanCut(PLUS_SEGS);
  note('wifi-plus', `own clearance angles off the apex: r4 ${deg(cutInfo.own[0]).toFixed(2)}, r8 ${deg(cutInfo.own[1]).toFixed(2)}, r12 ${deg(cutInfo.own[2]).toFixed(2)} (x: 41.81 uncut, 17.11, 34.14); shipped cut: inner pair ${deg(cutInfo.cut[0]).toFixed(2)}, outer ${deg(cutInfo.cut[2]).toFixed(2)}`);
  const out = wifiCompound((sharp) => plusV(19, 15, 3, sharp), PLUS_SEGS, cutInfo);
  // gaps on the rounded centre lines: every arc and the dot against the sign
  const fan = wifiFan('regular', cutInfo.cut);
  const sign = plusV(19, 15, 3, false);
  fan.forEach((a, i) => note('wifi-plus', `arc r${[4, 8, 12][i]} to plus: ${(centreGap(a, sign) - 2).toFixed(3)} painted`));
  note('wifi-plus', `dot to plus: ${(Math.hypot(16 - 10, 15 - 18) - 2).toFixed(3)} painted`);
  return out;
}

// ---------------------------------------------------------------------------
// terminal-plus. terminal-sparkles is the precedent for where a sign goes: the
// underline holds the bottom right, so the sign takes the top right, and the
// base moves 2 left so the sign's box, 15..23 by 4..12, is the lead star's.
// The 6 box would fit unmoved (flush at 21, 2.32 clear of the chevron), but
// there the plus stands centred over the underline, 13..20 under 14..20, and
// the pair reads as a plus-minus sign at 16px (rendered, see the sheet's
// alternatives). Moved, the plus's arm stands right of the underline's end.
function terminalPlus({ shift = -2, at = [19, 8] } = {}) {
  const out = {};
  for (const c of CORNERS) {
    const sharp = c === 'sharp';
    const base = tags(shipped('terminal', 'stroke', c)).map(dOf);
    assert(base.length === 1, 'terminal stroke is one path');
    const subs = subpathsOf(base[0]);
    assert(subs.length === 2, 'terminal: chevron and underline');
    const under = subs.find((sp) => parse(sp).length === 2), chev = subs.find((sp) => sp !== under);
    assert(under && chev, 'terminal: cannot tell the underline from the chevron');
    const mv = (d) => (shift ? translate(d, shift, 0) : d);
    const sign = plusV(at[0], at[1], 3, sharp);
    const stroke = svg(strokeTag(mv(base[0]) + sign, { sharp }));
    // the tones are the base's own split, taken from its two-tone: chevron black, underline grey
    const tt = tags(shipped('terminal', 'two-tone', c));
    const greyT = tt.filter((t) => /opacity="0\.4"/.test(t)).map(dOf), blackT = tt.filter((t) => !/opacity="0\.4"/.test(t)).map(dOf);
    assert(greyT.length === 1 && blackT.length === 1, 'terminal two-tone: one grey layer, one black');
    const same = (a, b) => { const x = parse(a).flatMap((k) => k.args.map(Number)), y = parse(b).flatMap((k) => k.args.map(Number)); return x.length && x.every((v) => y.includes(v)) && y.every((v) => x.includes(v)); };
    assert(same(greyT[0], under) && same(blackT[0], chev), `terminal two-tone ${c}: not chevron black, underline grey`);
    const toned = svg(strokeTag(mv(blackT[0]) + sign, { sharp }), strokeTag(mv(greyT[0]), { sharp, op: 0.4 }));
    Object.assign(out, { [fileName('stroke', c)]: stroke, [fileName('fill', c)]: stroke, [fileName('two-tone', c)]: toned, [fileName('duotone', c)]: toned });
    if (shift === -2) {
      // the moved base must be terminal-sparkles's own, in both corners
      const sp = tags(shipped('terminal-sparkles', 'stroke', c)).map(dOf)[0];
      const got = parse(mv(base[0])).flatMap((k) => k.args.map(Number)), want = parse(sp).flatMap((k) => k.args.map(Number));
      assert(got.every((v) => want.includes(v)) && want.every((v) => got.includes(v)), `terminal-plus ${c}: the moved base is not terminal-sparkles's`);
    }
    if (!sharp && shift === -2) {
      note('terminal-plus', `plus to chevron: ${(centreGap(sign, mv(chev)) - 2).toFixed(3)} painted; to underline ${(centreGap(sign, mv(under)) - 2).toFixed(3)}`);
      note('terminal-plus', `unmoved alternative: plus at (17,8) clears the chevron by ${(centreGap(plusV(17, 8, 3, false), chev) - 2).toFixed(3)}`);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// link-plus. Two links on the free diagonal leave the top-left and bottom-right
// corners empty, but neither holds a 6 box inside the base's ink: flush at the
// bottom right (plus centre 19, 16.5) its arm ends sit 3.27 short of the house 2
// from the upper link's straight run (needs cx + cy >= 40.28, has 35.5). The
// base spans x 1..23 already, so it can only move up: 2.5 puts its ink on
// y 1..18 and the sign on 16..22 both axes (map-pin's and wifi-x's escape,
// the sign outside the base's ink corner). Both links stay whole.
function linkPlus() {
  const DY = -2.5;
  const out = {};
  for (const c of CORNERS) {
    const sharp = c === 'sharp';
    const st = tags(shipped('link', 'stroke', c)).map(dOf);
    assert(st.length === 1, 'link stroke is one path');
    const both = translate(st[0], 0, DY);
    // Tones: the upper link grey, the lower link and the plus black, in both corners.
    // That is link's regular two-tone; its sharp two-tone and duotone grey the LOWER
    // link instead (the shipped corners disagree). The compound takes the regular
    // split in both, which also keeps the black plus off a black neighbour.
    const links = subpathsOf(st[0]);
    assert(links.length === 2, 'link: two links');
    const top = (d) => Math.min(...parse(d).flatMap((k) => k.args.map(Number).filter((_, i) => i % 2 === 1)));
    const [upper, lower] = top(links[0]) < top(links[1]) ? links : [links[1], links[0]];
    const greyReg = tags(shipped('link', 'two-tone', 'regular')).filter((t) => /opacity="0\.4"/.test(t)).map(dOf);
    assert(greyReg.length === 1 && top(greyReg[0]) < 5, 'link regular two-tone no longer greys the upper link');
    const sign = plusV(19, 19, 3, sharp);
    const stroke = svg(strokeTag(both + sign, { sharp }));
    const toned = svg(strokeTag(translate(upper, 0, DY), { sharp, op: 0.4 }), strokeTag(translate(lower, 0, DY) + sign, { sharp }));
    Object.assign(out, { [fileName('stroke', c)]: stroke, [fileName('fill', c)]: stroke, [fileName('two-tone', c)]: toned, [fileName('duotone', c)]: toned });
    if (!sharp) {
      const [a, b] = subpathsOf(both);
      note('link-plus', `plus to the links: ${(centreGap(sign, a) - 2).toFixed(3)} and ${(centreGap(sign, b) - 2).toFixed(3)} painted`);
      // where the base would have had to be: flush in its own ink corner, unmoved
      const flush = plusV(19, 16.5, 3, false);
      note('link-plus', `unmoved, flush at the base's corner (plus 16..22 x 13.5..19.5): ${(Math.min(centreGap(flush, subpathsOf(st[0])[0]), centreGap(flush, subpathsOf(st[0])[1])) - 2).toFixed(3)} painted`);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// grid-2x2-plus. His call on the second round: the base moves (-1,-1) and the
// sign is the house plus in its own box, M19 16V22M16 19H22 (paints 8, ink
// 15..23), so the compound is 1..23 on both axes with the sign outside the
// base's ink corner (map-pin's and user's escape, recentred). The L's edges
// paint to 12 and the plus starts at 15: a gap of 3.
//
// The sign takes the bottom-right cell (grid-squares-plus's move). The cells
// share walls, so taking one out cuts the frame's bottom-right corner away
// between the two divider ends; the dividers stay whole and their outer halves
// become the L's edges, crossing exactly at the L's reflex corner.
//
// Notch corners. The L's two new convex corners are corners of a cell, a
// mid-size part (9) that gains filled styles: r=2 on the ladder
// (drawing-a-new-icon §3; plate and fill r=3). The other set draws r=1 there on
// its unmoved dividers; after the move neither r=1 nor r=2 lies on its arcs.
// r=3, the frame's radius, read as a letter P at 16px.
//
// Stroke and two-tone keep the grid as drawn. The two-tone plate is the L's
// outer contour, its reflex corner square under the dividers' crossing (a
// rounded corner there would put grey past the crossing's ink).
//
// Duotone and fill, his drawings of 24 Sep 2026 (fourth round; they replace
// the third round's app-plus tile):
//   - duotone is the stroke drawing itself, the whole L and both dividers, at
//     0.4 under the black plus (the muting rides stroke-opacity, as on
//     circle-dashed-plus and link-plus);
//   - fill is the two-tone plate solid (square reflex under the crossing, r=3 on
//     the two cut corners) with ONE knockout, the top-left cell's interior:
//     3..10 on both axes after the move, r=2 at the frame's corner (the stroke's
//     r=3 less the half-width) and square at the three divider corners. The
//     other two cells go solid with the frame; there are no slots.
//   - sharp by the house rule: the sharp L at 0.4; the sharp plate (outer
//     corners r=1, reflex square) with the cell square at all four corners.
// The plate clears the plus by 3, the stroke's own gap, in every style.

const KAPPA = 0.5522847;

/**
 * The corners either side of a plate's notch, whose lines meet at (v, v):
 * the convex corner into the notch, the reflex corner (0 when it is a vertex)
 * and the convex corner out of it, each as a quarter-arc radius.
 */
function notchSig(d, v) {
  const segs = [];
  let pos = null;
  for (const { cmd, args } of parse(d)) {
    const a = args.map(Number);
    if (cmd === 'M') { pos = a; continue; }
    const to = cmd === 'H' ? [a[0], pos[1]] : cmd === 'V' ? [pos[0], a[0]] : cmd === 'C' ? a.slice(4) : cmd === 'L' ? a : null;
    if (!to) continue;
    segs.push({ cmd, from: pos, to });
    pos = to;
  }
  const eq = (x, y) => Math.abs(x - y) < 1e-6;
  const quarter = (s) => {
    assert(s && s.cmd === 'C', 'notch corner is not a cubic');
    const dx = Math.abs(s.to[0] - s.from[0]), dy = Math.abs(s.to[1] - s.from[1]);
    assert(eq(dx, dy), 'notch corner is not a quarter arc');
    return +dx.toFixed(4);
  };
  let i = segs.findIndex((s) => s.cmd === 'C' && eq(s.from[1], v) && eq(s.to[0], v) && eq(s.from[0] - v, s.to[1] - v));
  if (i >= 0) return { into: quarter(segs[i - 2]), reflex: +(segs[i].from[0] - v).toFixed(4), out: quarter(segs[i + 2]) };
  i = segs.findIndex((s) => eq(s.to[0], v) && eq(s.to[1], v));
  assert(i >= 0, `no notch at (${v}, ${v})`);
  return { into: quarter(segs[i - 1]), reflex: 0, out: quarter(segs[i + 2]) };
}

function grid2x2({ r = 2, shift = [-1, -1], plus = [19, 3], cut = r + 1, reflex = 3 } = {}) {
  const out = {};
  const base = {
    stroke: dOf(tags(shipped('grid-2x2', 'stroke', 'regular'))[0]),
    plate: dOf(tags(shipped('grid-2x2', 'two-tone', 'regular'))[0]),
  };
  const has = (d, x) => assert(d.includes(x), `grid-2x2 no longer contains ${x}`);
  // the corners the L keeps are the base's, spelled as the base spells them; the
  // base runs its frame clockwise and the L the other way, so each is reversed
  has(base.stroke, 'H18C19.65685 3 21 4.34315 21 6'); has(base.stroke, 'H6C4.34315 21 3 19.65685 3 18'); has(base.stroke, 'V6C3 4.34315 4.34315 3 6 3');
  const TR = 'C21 4.34315 19.65685 3 18 3', TL = 'C4.34315 3 3 4.34315 3 6', BL = 'C3 19.65685 4.34315 21 6 21';
  const a = 21 - r, b = 12 - r, K = KAPPA * r;
  const L = {
    regular: r
      ? `M3 12H${fmt(a)}C${fmt(a + K)} 12 21 ${fmt(b + K)} 21 ${fmt(b)}V6${TR}H6${TL}V18${BL}H${fmt(b)}C${fmt(b + K)} 21 12 ${fmt(a + K)} 12 ${fmt(a)}V3`
      : `M3 12H21V6${TR}H6${TL}V18${BL}H12V3`,
    sharp: 'M3 12L21 12L21 3L3 3L3 21L12 21L12 3',
  };
  // Plates, in the unmoved frame (walls 3..21, plate 2..22, notch lines 13): the
  // frame's r=4 corners kept as the base's plate spells them, a convex corner of
  // radius c where each notch line meets the plate's edge, and the reflex corner
  // at (13,13) square (q = 0) or an arc of radius q tangent to both notch lines.
  has(base.plate, 'M6 2H18C20.20914 2 22 3.79086 22 6V18'); has(base.plate, 'H6C3.79086 22 2 20.20914 2 18V6C2 3.79086 3.79086 2 6 2Z');
  const notch = (c, q) => {
    const kc = KAPPA * c, kq = KAPPA * q, lo = 13 - c, hi = 22 - c;
    assert(hi - (13 + q) > 1e-9, 'grid-2x2-plus: the notch corners overlap');
    const inner = q ? `H${fmt(13 + q)}C${fmt(13 + q - kq)} 13 13 ${fmt(13 + q - kq)} 13 ${fmt(13 + q)}` : 'H13';
    return `V${fmt(lo)}C22 ${fmt(lo + kc)} ${fmt(hi + kc)} 13 ${fmt(hi)} 13${inner}V${fmt(hi)}C13 ${fmt(hi + kc)} ${fmt(lo + kc)} 22 ${fmt(lo)} 22`;
  };
  const plateReg = (c, q) => `M6 2H18C20.20914 2 22 3.79086 22 6${notch(c, q)}H6C3.79086 22 2 20.20914 2 18V6C2 3.79086 3.79086 2 6 2Z`;
  // two-tone: the L's outer contour, reflex square under the crossing
  const PLATE = {
    regular: plateReg(r + 1, 0),
    // sharp: the round-join stroke's painted silhouette, outer corners r=1, reflex 0 (sharp.md *Landing*)
    sharp: 'M3 2L21 2C21.5523 2 22 2.4477 22 3L22 12C22 12.5523 21.5523 13 21 13L13 13L13 21C13 21.5523 12.5523 22 12 22L3 22C2.4477 22 2 21.5523 2 21L2 3C2 2.4477 2.4477 2 3 2Z',
  };
  has(dOf(tags(shipped('grid-2x2', 'two-tone', 'sharp'))[0]), 'M3 2L21 2C21.5523 2 22 2.4477 22 3L22 21');
  // fill's knockout: the top-left cell, in the unmoved frame (walls 3, dividers
  // 12, so the interior is 4..11), wound against the plate so nonzero and
  // evenodd agree; its corner at the frame is the frame's r=3 less a unit
  const k2 = fmt(6 - 2 * KAPPA);
  const HOLE = {
    regular: `M6 4C${k2} 4 4 ${k2} 4 6V11H11V4Z`,
    sharp: 'M4 4L4 11L11 11L11 4Z',
  };
  const [dx, dy] = shift, mv = (d) => (dx || dy ? translate(d, dx, dy) : d);
  for (const c of CORNERS) {
    const sharp = c === 'sharp';
    const sign = plusV(plus[0], plus[0], plus[1], sharp);
    out[fileName('stroke', c)] = svg(strokeTag(mv(L[c]) + sign, { sharp }));
    out[fileName('two-tone', c)] = svg(fillTag(mv(PLATE[c]), { op: 0.4 }), strokeTag(mv(L[c]) + sign, { sharp }));
    out[fileName('duotone', c)] = svg(strokeTag(mv(L[c]), { sharp, op: 0.4 }), strokeTag(sign, { sharp }));
    out[fileName('fill', c)] = svg(fillTag(mv(PLATE[c]) + mv(HOLE[c]), { evenodd: true }), strokeTag(sign, { sharp }));
  }
  if (r === 2 && dx === -1 && dy === -1 && plus[0] === 19) {
    const sign = plusV(19, 19, 3, false);
    assert(sign === 'M19 16L19 22M16 19L22 19', 'grid-2x2-plus: the plus is not the house block');
    assert(mv(HOLE.regular) === 'M5 3C3.8954 3 3 3.8954 3 5V10H10V3Z', `grid-2x2-plus: the cell knockout moved: ${mv(HOLE.regular)}`);
    note('grid-2x2-plus', `plus to the L: ${(centreGap(sign, mv(L.regular)) - 2).toFixed(3)} painted; plus to the plate (fill): ${(centreGap(sign, mv(PLATE.regular)) - 1).toFixed(3)} painted`);
  }
  return out;
}

// The candidates the sheet shows beside the drafts (never written to raw/).
export const ALTERNATIVES = {
  'grid-squares-plus': [
    ['plus 1 short of the ink corner, 13..21: gap 2 to the cells, ink corner at 22 left empty; it is the second set\'s layout-grid-add plus coordinate for coordinate (overlay 40.4 against 34.5 drafted)', () => gridCell('grid-squares', [17, 17, 3])],
  ],
  'terminal-plus': [
    ['base unmoved, plus at (17,8): stacks over the underline', () => terminalPlus({ shift: 0, at: [17, 8] })],
  ],
};

// ---------------------------------------------------------------------------
const BUILD = {
  'grid-2x2-plus': grid2x2,
  'terminal-plus': terminalPlus,
  'link-plus': linkPlus,
  'circle-dashed-plus': circleDashed,
  'grid-squares-plus': () => gridCell('grid-squares'),
  'grid-circles-plus': () => gridCell('grid-circles'),
  'wifi-plus': wifiPlus,
};

export function buildAll() {
  const all = {};
  for (const [name, fn] of Object.entries(BUILD)) {
    const out = fn();
    assert(Object.keys(out).length === 8, `${name}: ${Object.keys(out).length} files`);
    // the four styles must not all be one drawing, and each file must be finite and closed
    for (const [f, text] of Object.entries(out)) assert(!/NaN|Infinity/.test(text) && text.endsWith('</svg>\n'), `${name} ${f}`);
    all[name] = out;
  }
  return all;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const all = buildAll();
  for (const [name, out] of Object.entries(all)) {
    const dir = join(outDir(), 'raw', name);
    mkdirSync(dir, { recursive: true });
    for (const [f, text] of Object.entries(out)) writeFileSync(join(dir, f), text);
  }
  for (const [n, list] of Object.entries(notes)) for (const s of list) log(`${n.padEnd(20)} ${s}`);
  console.log(`wrote ${Object.keys(all).length} names, ${Object.keys(all).length * 8} files`);
}
export { notes, grid2x2 };
