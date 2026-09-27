// The 1.3.0 slashes and arrows: captions-off, subtitles-off, play-off with its
// square and circle forms, and a square entered through its corner by an arrow
// in four directions (square-arrow-in-down-right, -down-left, -up-right,
// -up-left). Every variant is solved from the original drawing and the -off
// rules; nothing is typed from a render. His rule for all of them, 27 Sep 2026:
// an -off is its original at the same size, with the slash across it.
//
//   node tools/off-arrow-in/build.mjs [--out=<dir>]   writes <dir>/raw/<name>/ (default: this checkout)
//
// -off, regular (drawing-a-new-icon.md, "The slash is M2 2L22 22"): u = x - y.
// The near side runs into the slash and stops on u = 0; the far side stands off
// at u = 4 sqrt 2. Plates: near cut on u = 0, far on u = 3 sqrt 2 with an r = 1
// turn about each stroke cut end (bell-dot's recipe, as monitor-off and
// heart-off ship). Two-tone drops the far strokes, duotone greys everything but
// the slash with the near detail cut out of the near solid, fill is the solids.
// Sharp: near ends bury on u = 0, far ends stop with the nearest butt corner at
// u = 4 sqrt 2 - 2 (monitor-off: 8.6569 on its top edge), plates clipped
// straight on that same line (monitor-off 6.6569).
//
// square-arrow-in-*: the dashed-panel family's arrow (long L head, r 0.5 turn,
// shaft 0.5 short of it) entering a 14-unit square, r 3, opened at the corner
// the arrow comes through with 2 units of daylight each side. An opened body is
// the duotone split in two-tone too (square grey, arrow black), fill the stroke.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Path, add, sub, mul, unit } from '../v5/geom.mjs';

const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? join(import.meta.dirname, '..', '..');
const R2 = Math.SQRT2;
const U4 = 4 * R2, US = 4 * R2 - 2;
const deg = (r) => (r * 180) / Math.PI, rad = (d) => (d * Math.PI) / 180;
const u = (p) => p[0] - p[1];
const ang = (p, c) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));
const on = (c, r, a) => [c[0] + r * Math.cos(rad(a)), c[1] + r * Math.sin(rad(a))];
const SW = [-1 / R2, 1 / R2];
const SLASH = { regular: 'M2 2L22 22', sharp: 'M1.7071 1.7071L22.2929 22.2929' };
const assert = (ok, msg) => { if (!ok) throw new Error(msg); };

/** Circle ∩ {u = k}, both points, lower y first. */
function circleU(c, r, k) {
  const b = 2 * (k - c[0]) - 2 * c[1], cc = (k - c[0]) ** 2 + c[1] ** 2 - r * r;
  const D = b * b - 8 * cc;
  assert(D >= 0, 'no crossing');
  return [(-b - Math.sqrt(D)) / 4, (-b + Math.sqrt(D)) / 4].map((y) => [y + k, y]);
}
/** Segment ∩ {u = k}. */
function segU(a, b, k) {
  const t = (k - u(a)) / (u(b) - u(a));
  assert(t >= -1e-9 && t <= 1 + 1e-9, `u=${k} misses the segment`);
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

/* ============================================================ captions-off */

const TL = [5, 7], TR = [19, 7], BR = [19, 17], BL = [5, 17];
const K = [8.5, 12];                                   // the left C's centre
const CA = ang([10, 10], K);                            // -53.13: the C's ends
const C_REG = 'M10 10C9.56726 9.67544 9.04093 9.5 8.5 9.5C7.11929 9.5 6 10.61929 6 12C6 13.38071 7.11929 14.5 8.5 14.5C9.04093 14.5 9.56726 14.32456 10 14';
const C_SHARP = 'M10 10C9.5673 9.6754 9.0409 9.5 8.5 9.5C7.1193 9.5 6 10.6193 6 12C6 13.3807 7.1193 14.5 8.5 14.5C9.0409 14.5 9.5673 14.3246 10 14L10.8 13.4';

function captionsOff(corners) {
  const s = corners === 'sharp';
  let near, far, nearPlate, notched, farPlate;
  if (!s) {
    const N1 = circleU(BR, 3, 0)[1], N2 = circleU(TL, 3, 0)[0];
    near = new Path().M(N1).A(BR, ang(N1, BR), 90, 1).L([5, 20]).A(BL, 90, 180, 1).L([2, 7]).A(TL, 180, ang(N2, TL), 1).toString();
    const E1 = [4 + U4, 4], E2 = [22, 22 - U4];
    assert(E2[1] < 17, 'far cut left the straight right edge');
    far = new Path().M(E1).L([19, 4]).A(TR, 270, 360, 1).L(E2).toString();
    const P1 = circleU(BR, 4, 0)[1], P2 = circleU(TL, 4, 0)[0];
    const body = () => new Path().M(P1).A(BR, ang(P1, BR), 90, 1).L([5, 21]).A(BL, 90, 180, 1).L([1, 7]).A(TL, 180, ang(P2, TL), 1);
    nearPlate = body().Z().toString();
    // The C cut out of the near solid, clipped on u = 0: one contour, no seam.
    notched = body().L([8.5, 8.5]).A(K, -90, -CA + 360 - 360, -1)   // outer edge r 3.5, west about, to (10.6, 14.8)
      .A([10, 14], -CA, -CA - 180, -1)                                // bottom cap
      .A(K, -CA, 360 + CA, 1)                                          // inner edge r 1.5, back to (9.4, 10.8)
      .A([10, 10], 180 + CA, 45, -1)                                   // top cap, as far as u = 0
      .Z().toString();
    const O1 = [E1[0], 3], O2 = [23, E2[1]], T1 = add(E1, SW);
    farPlate = new Path().M(O1).L([19, 3]).A(TR, 270, 360, 1).L(O2).A(E2, 0, 135, 1).L(T1).A(E1, 135, 270, 1).Z().toString();
  } else {
    near = 'M20 20L2 20L2 4L4 4';
    far = new Path().M([5 + US, 4]).L([22, 4]).L([22, 21 - US]).toString();
    const body = () => new Path().M([21, 21]).L([2, 21]).A([2, 20], 90, 180, 1).L([1, 4]).A([2, 4], 180, 270, 1).L([3, 3]);
    nearPlate = body().Z().toString();
    notched = body().L([8.5, 8.5]).A(K, -90, -CA + 360 - 360, -1)
      .L([11.4, 14.2]).L([10.2, 12.6]).L([9.4, 13.2])
      .A(K, -CA, 360 + CA, 1).L([10, 10]).Z().toString();
    farPlate = new Path().M([3 + US, 3]).L([22, 3]).A([22, 4], 270, 360, 1).L([23, 23 - US]).Z().toString();
  }
  const C = s ? C_SHARP : C_REG;
  const stroke = near + far + C + SLASH[corners];
  return {
    stroke: [{ kind: 'stroke', d: stroke }],
    'two-tone': [{ kind: 'plate', d: nearPlate + farPlate }, { kind: 'stroke', d: near + C + SLASH[corners] }],
    duotone: [{ kind: 'plate', d: notched + farPlate }, { kind: 'stroke', d: SLASH[corners] }],
    fill: [{ kind: 'solid', d: notched + farPlate }, { kind: 'stroke', d: SLASH[corners] }],
  };
}

/* =========================================================== subtitles-off */

// subtitles is captions' box with four text lines, and the slash runs through
// the gap in each row. The left lines stay exactly as subtitles draws them (his
// rule, 27 Sep 2026: an -off is its original at the same size); their round
// ends already reach into the slash's ink. In sharp their slash ends bury on
// u = 0, one unit on from the base's butt ends, which would otherwise stand a
// corner 0.41 out of the slash. The right lines are cut: the lower one entirely,
// the upper one to a 2.34 scrap, dropped. Duotone and fill cut the lines out as
// far as u = 0, which is under the slash either way.
function subtitlesOff(corners) {
  const s = corners === 'sharp';
  const x0 = s ? 5 : 6;
  const lines = s ? 'M5 10L10 10M5 14L14 14' : 'M6 10L8 10M6 14L12 14';
  let near, far, body, farPlate, notch;
  if (!s) {
    const N1 = circleU(BR, 3, 0)[1], N2 = circleU(TL, 3, 0)[0];
    near = new Path().M(N1).A(BR, ang(N1, BR), 90, 1).L([5, 20]).A(BL, 90, 180, 1).L([2, 7]).A(TL, 180, ang(N2, TL), 1).toString();
    const E1 = [4 + U4, 4], E2 = [22, 22 - U4];
    far = new Path().M(E1).L([19, 4]).A(TR, 270, 360, 1).L(E2).toString();
    const P1 = circleU(BR, 4, 0)[1], P2 = circleU(TL, 4, 0)[0];
    body = () => new Path().M(P1).A(BR, ang(P1, BR), 90, 1).L([5, 21]).A(BL, 90, 180, 1).L([1, 7]).A(TL, 180, ang(P2, TL), 1);
    farPlate = new Path().M([E1[0], 3]).L([19, 3]).A(TR, 270, 360, 1).L([23, E2[1]]).A(E2, 0, 135, 1).L(add(E1, SW)).A(E1, 135, 270, 1).Z().toString();
    // each line's ink cut on u = 0: along its top edge, round its start, back
    // along its bottom edge, and round its buried end as far as the slash
    notch = (p, y) => p.L([y - 1, y - 1]).L([x0, y - 1]).A([x0, y], 270, 90, -1).L([y, y + 1]).A([y, y], 90, 45, -1);
  } else {
    near = 'M20 20L2 20L2 4L4 4';
    far = new Path().M([5 + US, 4]).L([22, 4]).L([22, 21 - US]).toString();
    body = () => new Path().M([21, 21]).L([2, 21]).A([2, 20], 90, 180, 1).L([1, 4]).A([2, 4], 180, 270, 1).L([3, 3]);
    farPlate = new Path().M([3 + US, 3]).L([22, 3]).A([22, 4], 270, 360, 1).L([23, 23 - US]).Z().toString();
    notch = (p, y) => p.L([y - 1, y - 1]).L([x0, y - 1]).L([x0, y + 1]).L([y, y + 1]).L([y, y]);
  }
  const nearPlate = body().Z().toString();
  const notched = (() => { const p = body(); notch(p, 10); notch(p, 14); return p.Z().toString(); })();
  const S = SLASH[corners];
  return {
    stroke: [{ kind: 'stroke', d: near + far + lines + S }],
    'two-tone': [{ kind: 'plate', d: nearPlate + farPlate }, { kind: 'stroke', d: near + lines + S }],
    duotone: [{ kind: 'plate', d: notched + farPlate }, { kind: 'stroke', d: S }],
    fill: [{ kind: 'solid', d: notched + farPlate }, { kind: 'stroke', d: S }],
  };
}

/* ================================================================ play-off */

// play, solved rather than read: circles A (8,6) r 2, B (17,12) r 1, C (8,18)
// r 2 on the left edge x = 6; the top edge is their outer tangent.
const PA = [8, 6], PB = [17, 12], PC = [8, 18];
const ALPHA = (() => {                                  // 9 cos a + 6 sin a = 1, the up-right root
  const phi = Math.atan2(6, 9), a = phi - Math.acos(1 / Math.hypot(9, 6));
  return deg(a);
})();
const NT = on([0, 0], 1, ALPHA), NB = [NT[0], -NT[1]], AB = -ALPHA;   // top and bottom outward normals

function playOff(corners) {
  const s = corners === 'sharp';
  let near, far, nearPlate, farPlate;
  if (!s) {
    const bot0 = add(PB, NB), bot1 = add(PC, mul(NB, 2));
    const top0 = add(PA, mul(NT, 2)), top1 = add(PB, NT);
    const B0 = segU(bot0, bot1, 0);
    near = new Path().M(B0).L(bot1).A(PC, AB, 180, 1).L([6, 6]).toString();
    const F0 = segU(top0, top1, U4);
    const phiQ = deg(Math.acos((U4 - 5) / R2)) - 45;          // 5 + cos f - sin f = 4 sqrt 2 on circle B
    const Q = on(PB, 1, phiQ);
    far = new Path().M(F0).L(top1).A(PB, ALPHA, phiQ, 1).toString();
    const pbot0 = add(PB, mul(NB, 2)), pbot1 = add(PC, mul(NB, 3)), ptop1 = add(PB, mul(NT, 2));
    const C0 = segU(pbot0, pbot1, 0);
    const X0 = circleU(PA, 3, 0)[0];
    nearPlate = new Path().M(C0).L(pbot1).A(PC, AB, 180, 1).L([5, 6]).A(PA, 180, ang(X0, PA), 1).Z().toString();
    const T1 = add(F0, SW);
    farPlate = new Path().M(T1).A(F0, 135, ALPHA + 360, 1).L(ptop1).A(PB, ALPHA, phiQ, 1).A(Q, phiQ, 135, 1).L(T1).Z().toString();
  } else {
    const V1 = [6, 4], V2 = [18, 12], V3 = [6, 20];
    const nt = unit([8, -12]), nb = [nt[0], -nt[1]];
    near = new Path().M(segU(V2, V3, 0)).L(V3).L([6, 6]).toString();
    const onTop = (k) => segU(V1, V2, k), onBot = (k) => segU(V2, V3, k);
    const F0 = onTop(US + (nt[0] - nt[1]));              // nearest butt corner is P - nt
    const Qs = onBot(US - (nb[0] - nb[1]));              // nearest butt corner is P + nb
    far = new Path().M(F0).L(V2).L(Qs).toString();
    const aT = ang(add(V2, nt), V2), aB = ang(add(V2, nb), V2);
    nearPlate = new Path().M(segU(add(V2, nb), add(V3, nb), 0)).L(add(V3, nb)).A(V3, aB, 180, 1).L([5, 5]).Z().toString();
    farPlate = new Path().M(segU(add(V1, nt), add(V2, nt), US)).L(add(V2, nt)).A(V2, aT, aB, 1).L(segU(add(V2, nb), add(V3, nb), US)).Z().toString();
  }
  const stroke = near + far + SLASH[corners];
  return {
    stroke: [{ kind: 'stroke', d: stroke }],
    'two-tone': [{ kind: 'plate', d: nearPlate + farPlate }, { kind: 'stroke', d: near + SLASH[corners] }],
    duotone: [{ kind: 'plate', d: nearPlate + farPlate }, { kind: 'stroke', d: SLASH[corners] }],
    fill: [{ kind: 'solid', d: nearPlate + farPlate }, { kind: 'stroke', d: SLASH[corners] }],
  };
}

/* ======================================== play-off in its square and circle */

// His pick, 27 Sep 2026, over a version that buried the upper right so the
// play kept its tip: the house cut, exactly as every other -off. The ring is
// circle-off itself (and the same cut on the square); the small play sits on
// the slash's own line, so its left and bottom sides run into the slash and its
// tip, all of it inside the gap, goes.
const RAWS = join(import.meta.dirname, '..', '..', 'raw');
const rawD = (name, style, corners) => [...readFileSync(`${RAWS}/${name}/Container=regular, Style=${style}, Corners=${corners}.svg`, 'utf8').matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
const subpaths = (d) => d.split(/(?=M)/);
function circleRingA(corners) {                         // circle-off itself, house cut
  const [stroke] = rawD('circle-off', 'stroke', corners);
  const parts = subpaths(stroke).filter((s) => !/^M(2 2|1\.7071 1\.7071)L/.test(s));
  const near = parts.find((s) => s.startsWith('M19.0711 19.0711')), far = parts.find((s) => s !== near);
  const [plates] = rawD('circle-off', 'fill', corners);
  const pp = subpaths(plates);
  const nearPlate = pp.find((s) => /19\.7782 19\.7782/.test(s)), farPlate = pp.find((s) => s !== nearPlate);
  assert(near && far && nearPlate && farPlate, 'circle-off moved');
  return { near, far, farPlate };
}
function squareRingA(corners) {                         // the same cut on the 18-unit square, r 3
  if (corners === 'regular') {
    const n1 = on([18, 18], 3, 45);
    const near = new Path().M(n1).A([18, 18], 45, 90, 1).L([6, 21]).A([6, 18], 90, 180, 1).L([3, 6]).A([6, 6], 180, 225, 1).toString();
    const E1 = [3 + U4, 3], E2 = [21, 21 - U4];
    const far = new Path().M(E1).L([18, 3]).A([18, 6], 270, 360, 1).L(E2).toString();
    const farPlate = new Path().M([E1[0], 2]).L([18, 2]).A([18, 6], 270, 360, 1).L([22, E2[1]]).A(E2, 0, 135, 1).L(add(E1, SW)).A(E1, 135, 270, 1).Z().toString();
    return { near, far, farPlate };
  }
  const near = 'M21 21L3 21L3 3';
  const far = new Path().M([4 + US, 3]).L([21, 3]).L([21, 20 - US]).toString();
  const farPlate = new Path().M([2 + US, 2]).L([21, 2]).A([21, 3], 270, 360, 1).L([22, 22 - US]).Z().toString();
  return { near, far, farPlate };
}
/** The near plate (lower left, u <= 0), cut along u = 0 with `notch` let in on the way. */
function nearPlateA(container, corners, notch) {
  const p = new Path();
  if (container === 'circle') p.M(on([12, 12], 11, 45)).A([12, 12], 45, 225, 1);
  else if (corners === 'regular') p.M(on([18, 18], 4, 45)).A([18, 18], 45, 90, 1).L([6, 22]).A([6, 18], 90, 180, 1).L([2, 6]).A([6, 6], 180, 225, 1);
  else p.M(on([21, 21], 1, 45)).A([21, 21], 45, 90, 1).L([3, 22]).A([3, 21], 90, 180, 1).L([2, 3]).A([3, 3], 180, 225, 1);
  if (notch) notch(p);
  return p.Z().toString();
}
// the small play, solved off circle-play's own file: fillets r 1 at the left
// corners (centres F1, F3), r 0.5 at the tip (centre PAc)
const PF1 = [9.962734, 9.105541], PF3 = [9.962734, 14.894459], PT0 = [10.492732, 8.257542], PT1 = [15.802266, 11.576001];
const nT = unit(sub(PT0, PF1)), nB = [nT[0], -nT[1]], aT = ang(PT0, PF1);
const PAc = sub(PT1, mul(nT, 0.5));
const onU = (c, r, lo, hi) => {                          // angle on circle (c, r) where u = 0, inside (lo, hi)
  const base = -45, sp = deg(Math.acos(-u(c) / (r * R2)));
  const hits = [base + sp, base - sp].map((a) => ((a % 360) + 360) % 360).filter((a) => a > lo && a < hi);
  assert(hits.length === 1, 'u = 0 crossing');
  return hits[0];
};
const lineX = (a, b, c, d) => { const r = sub(b, a), s = sub(d, c), q = sub(c, a), den = r[0] * s[1] - r[1] * s[0]; const t = (q[0] * s[1] - q[1] * s[0]) / den; return add(a, mul(r, t)); };
function playTipA(corners) {
  if (corners === 'regular') {
    const th1 = onU(PF1, 1, 180, aT + 360), end1 = on(PF1, 1, th1);
    const end2 = segU(add(PAc, mul(nB, 0.5)), add(PF3, nB), 0);
    const x0 = PF1[0] - 1;                                            // the left edge
    const remnant = new Path().M(end1).A(PF1, th1, 180, -1).L([x0, PF3[1]]).A(PF3, 180, -aT, -1).L(end2).toString();
    // duotone: the remnant's own ink cut out of the near solid, its round caps
    // clipped on u = 0; the triangle it encloses stays grey as an island
    const duo = (p) => p.L(on(end1, 1, 225)).A(end1, 225, th1, -1).A(PF1, th1, 180, -1).L([x0 - 1, PF3[1]]).A(PF3, 180, -aT, -1).L(add(end2, nB)).A(end2, -aT, 45, -1);
    const island = new Path().M([PF1[0], PF1[0]]).L(PF3).L(segU(sub(PAc, mul(nB, 0.5)), PF3, 0)).Z().toString();
    // fill: the whole play is the hole, so its outline cut on u = 0 is the notch
    const tho = onU(PF1, 2, 180, aT + 360);
    const fill = (p) => p.L(on(PF1, 2, tho)).A(PF1, tho, 180, -1).L([x0 - 1, PF3[1]]).A(PF3, 180, -aT, -1).L(segU(add(PAc, mul(nB, 1.5)), add(PF3, mul(nB, 2)), 0));
    return { remnant, duo, island, fill };
  }
  const V1 = [8.9627, 7.3013], V2 = [16.4807, 12], V3 = [8.9627, 16.6987], x0 = V1[0];
  const end2 = segU(V2, V3, 0);
  const remnant = new Path().M([x0, x0]).L(V3).L(end2).toString();
  const duo = (p) => p.L([x0, x0]).L([x0 - 1, x0]).L([x0 - 1, V3[1]]).A(V3, 180, -aT, -1).L(add(end2, nB)).L(end2);
  const inner = lineX([x0 + 1, 0], [x0 + 1, 1], sub(V3, nB), sub(V2, nB));
  const island = new Path().M([x0 + 1, x0 + 1]).L(inner).L(segU(sub(V2, nB), sub(V3, nB), 0)).Z().toString();
  const fill = (p) => p.L([x0 - 1, x0 - 1]).L([x0 - 1, V3[1]]).A(V3, 180, -aT, -1).L(segU(add(V3, nB), add(V2, nB), 0));
  return { remnant, duo, island, fill };
}
function playOffBoxed(container, corners) {
  const ring = container === 'circle' ? circleRingA(corners) : squareRingA(corners);
  const tip = playTipA(corners);
  const S = SLASH[corners];
  return {
    stroke: [{ kind: 'stroke', d: ring.near + ring.far + tip.remnant + S }],
    'two-tone': [{ kind: 'plate', d: nearPlateA(container, corners, null) + ring.farPlate }, { kind: 'stroke', d: ring.near + tip.remnant + S }],
    duotone: [{ kind: 'plate', d: nearPlateA(container, corners, tip.duo) + tip.island + ring.farPlate }, { kind: 'stroke', d: S }],
    fill: [{ kind: 'solid', d: nearPlateA(container, corners, tip.fill) + ring.farPlate }, { kind: 'stroke', d: S }],
  };
}

/* ======================================================= square-arrow-in-* */

function arrowIn(corners) {
  const s = corners === 'sharp';
  const arrow = s
    ? 'M2.7071 2.7071L10.8536 10.8536M2 11L11 11L11 2'
    : 'M3 3L10.5 10.5' + new Path().M([3, 11]).L([10.5, 11]).C([10.7761, 11], [11, 10.7761], [11, 10.5]).L([11, 3]).toString();
  const square = s
    ? 'M14 7L21 7L21 21L7 21L7 14'
    : new Path().M([15, 7]).L([18, 7]).A([18, 10], 270, 360, 1).L([21, 18]).A([18, 18], 0, 90, 1).L([10, 21]).A([10, 18], 90, 180, 1).L([7, 15]).toString();
  return {
    stroke: [{ kind: 'stroke', d: square + arrow }],
    'two-tone': [{ kind: 'grey', d: square }, { kind: 'stroke', d: arrow }],
    duotone: [{ kind: 'grey', d: square }, { kind: 'stroke', d: arrow }],
    fill: [{ kind: 'stroke', d: square + arrow }],
  };
}

/** Mirror a path of absolute M/L/C/Z about the canvas centre. */
const mirror = (d, mx, my) => d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) => `${fmt(mx ? 24 - +x : +x)} ${fmt(my ? 24 - +y : +y)}`);
const fmt = (v) => { const r = Math.round(v * 10000) / 10000; return Object.is(r, -0) ? '0' : String(r); };

/* ================================================================== writer */

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
function write(name, byCorners, container = 'regular') {
  const dir = join(OUT, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const corners of ['regular', 'sharp']) {
    const cap = corners === 'sharp' ? 'butt' : 'round';
    for (const [style, layers] of Object.entries(byCorners[corners])) {
      const body = layers.map(({ kind, d }) =>
        kind === 'stroke' ? `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`
        : kind === 'grey' ? `<path d="${d}" stroke="black" stroke-opacity="0.4" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`
        : kind === 'plate' ? `<path d="${d}" fill="black" fill-opacity="0.4"/>`
        : `<path d="${d}" fill="black"/>`);
      writeFileSync(join(dir, `Container=${container}, Style=${style}, Corners=${corners}.svg`), [HEAD, ...body, '</svg>', ''].join('\n'));
    }
  }
}

const both = (f) => ({ regular: f('regular'), sharp: f('sharp') });
write('captions-off', both(captionsOff));
write('subtitles-off', both(subtitlesOff));
write('play-off', both(playOff));
for (const container of ['square', 'circle']) write('play-off', both((c) => playOffBoxed(container, c)), container);
const base = both(arrowIn);
const flip = (mx, my) => Object.fromEntries(Object.entries(base).map(([c, v]) => [c, Object.fromEntries(Object.entries(v).map(([st, ls]) => [st, ls.map((l) => ({ ...l, d: mirror(l.d, mx, my) }))]))]));
write('square-arrow-in-down-right', base);
write('square-arrow-in-down-left', flip(true, false));
write('square-arrow-in-up-right', flip(false, true));
write('square-arrow-in-up-left', flip(true, true));
console.log('wrote 7 names to', join(OUT, 'raw'));
