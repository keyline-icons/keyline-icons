// The five new objects of the 1.4.0 batch (28 Sep 2026: landmark, money-bag, gold-bars, stamp,
// newspaper), as exact lines and arcs so the style recipes can offset them. Drafted here, then
// fitted to his drawings of the stamp and the newspaper's curl (measured off his canvas, overlay
// exact); `refreshSign` is the credit-card-refresh sign he saw dropped (it closes up in a 6 box). Each builder takes (sharp, opts)
// and returns { closed: {k: segs}, open: {k: segs}, dots: [[x, y, r]] }.
// Sharp: drawn fillets removed (round join paints r=1), free ends stubbed a unit on axis.
import * as A from './la.mjs';
import { add, sub, mul, len, unit, pt, deg, rad, strokedBBox, bisect, fillet } from './lib.mjs';
const { Ls, As, polyLA, rrectLA, circleLA, dLA, sP, eP } = A;

export const dOf = (g) => Object.values(g.closed).map((s) => dLA(s, true)).join('') + Object.values(g.open).map((s) => dLA(s, false)).join('');
export function ink(g, sharp) {
  const d = dOf(g);
  const b = strokedBBox(d, 1, sharp ? 'butt' : 'round');
  for (const [x, y, r] of g.dots || []) { b[0] = Math.min(b[0], x - r); b[1] = Math.min(b[1], y - r); b[2] = Math.max(b[2], x + r); b[3] = Math.max(b[3], y + r); }
  return b;
}
const stub = (p0, p1, sharp, which = 'both') => {
  if (!sharp) return Ls(p0, p1);
  const t = unit(sub(p1, p0));
  const k = (() => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); })();
  return Ls(which === 'end' ? p0 : sub(p0, mul(t, k)), which === 'start' ? p1 : add(p1, mul(t, k)));
};
/** Solve f(x) = target by bisection on [lo, hi]. */
const solve = (f, target, lo, hi) => bisect((x) => f(x) - target, lo, hi, 60);

/* --------------------------------------------------------------- landmark */
// A pediment over three columns on a plinth line. The roof is one closed
// triangle; in rounded its vertices are solved so the filleted ink lands on 2
// (left, right, top), in sharp the vertices sit a unit in (the round join paints 1).
export function landmark(sharp, o = {}) {
  const { eave = 8, rb = 1, ra = 2, cols = [6, 12, 18], c0 = 12, c1 = 17, base = 21, bx = 3 } = o;
  let roof;
  if (sharp) roof = polyLA([[3, eave], [21, eave], [12, 3]], [0, 0, 0]);
  else {
    let x0 = 2.5, ya = 2.5;
    const build = (x, y) => polyLA([[x, eave], [24 - x, eave], [12, y]], [rb, rb, ra]);
    for (let it = 0; it < 30; it++) {
      x0 = solve((x) => strokedBBox(dLA(build(x, ya)), 1, 'round')[0], 2, -4, 4);
      ya = solve((y) => strokedBBox(dLA(build(x0, y)), 1, 'round')[1], 2, -2, 4);
    }
    roof = build(x0, ya);
  }
  const open = {};
  cols.forEach((x, i) => { open['col' + i] = [stub([x, c0], [x, c1], sharp)]; });
  open.base = [stub([bx, base], [24 - bx, base], sharp)];
  return { closed: { roof }, open, dots: [] };
}

/* -------------------------------------------------------------- money-bag */
// A sack: a gathered top flaring over a tied neck, the body swelling below.
// One closed outline; the tie is the line across the neck's two concave vertices.
export function moneyBag(sharp, o = {}) {
  // In sharp the shoulders (r=9) are shape and stay round, as bell's dome does; the
  // bottom's r=4 quarter turns are corners by the converter's guard and square off.
  // With a notch the top's two ears are acute corners, and a fillet pulls an acute
  // corner's ink in: rounded solves the ears' height so the ink still tops out on 2.
  const { ny = 8, nw = 2, tw = 4.5, notch = 0, sy = 10, bw = 9, by = 21, rt = 1, rs = 9, rbot = 4, rn = 1 } = o;
  const f = (r) => (sharp ? 0 : r);
  const build = (ty) => {
    const top = notch ? [[12 - tw, ty], [12, ty + notch], [12 + tw, ty]] : [[12 - tw, ty], [12 + tw, ty]];
    const topR = notch ? [f(rt), f(rn), f(rt)] : [f(rt), f(rt)];
    const pts = [[12 - nw, ny], ...top, [12 + nw, ny], [12 + bw, sy], [12 + bw, by], [12 - bw, by], [12 - bw, sy]];
    return polyLA(pts, [0, ...topR, 0, rs, f(rbot), f(rbot), rs]);
  };
  const ty = sharp || !notch ? 3 : solve((y) => strokedBBox(dLA(build(y)), 1, 'round')[1], 2, 1, 4);
  const body = build(ty);
  return { closed: { body }, open: { tie: [Ls([12 - nw, ny], [12 + nw, ny])] }, dots: [] };
}

/* -------------------------------------------------------------- gold-bars */
// Three ingots stacked two and one. Each is a trapezoid, wide edge down.
export function goldBars(sharp, o = {}) {
  const { h = 6, gap = 4, inset = 1.5, r = 1, bw = 8, cx = 2 } = o;
  // rows: bottom bars path y 14..20, top bar 4..10 (horizontal rectangle 22 x 18)
  const yb1 = 20, yb0 = yb1 - h, yt1 = yb0 - gap, yt0 = yt1 - h;
  const bar = (x0, y0, y1) => [[x0, y1], [x0 + inset, y0], [x0 + bw - inset, y0], [x0 + bw, y1]];
  const mk = (x0, y0, y1) => polyLA(bar(x0, y0, y1), sharp ? [0, 0, 0, 0] : [r, r, r, r]);
  let left = cx;
  if (!sharp) left = solve((x) => strokedBBox(dLA(mk(x, yb0, yb1)), 1, 'round')[0], 1, -1, 4);
  const right = 24 - left - bw;
  return {
    closed: { top: mk(12 - bw / 2, yt0, yt1), left: mk(left, yb0, yb1), right: mk(right, yb0, yb1) },
    open: {}, dots: [], meta: { left },
  };
}

/* ------------------------------------------------------------------ stamp */
// A rubber stamp: a round knob on a flared neck over a pad, and the print line.
// One outline: from the knob's right attach point down the neck, round the pad,
// up the neck's left side, then over the top of the knob back to the start.
export function openPoly(pts, radii = []) {
  const out = []; let cur = pts[0];
  for (let i = 1; i < pts.length - 1; i++) {
    const r = radii[i] ?? 0;
    if (r <= 1e-9) { out.push(Ls(cur, pts[i])); cur = pts[i]; continue; }
    const fl = fillet(pts[i - 1], pts[i], pts[i + 1], r);
    let a0 = deg(Math.atan2(fl.T1[1] - fl.F[1], fl.T1[0] - fl.F[0])), a1 = deg(Math.atan2(fl.T2[1] - fl.F[1], fl.T2[0] - fl.F[0]));
    while (a1 - a0 > 180) a1 -= 360; while (a0 - a1 > 180) a1 += 360;
    if (len(sub(fl.T1, cur)) > 1e-9) out.push(Ls(cur, fl.T1));
    out.push(As(fl.F, r, a0, a1)); cur = fl.T2;
  }
  out.push(Ls(cur, pts.at(-1)));
  return out;
}
export function stamp(sharp, o = {}) {
  // His drawing, 28 Sep 2026: the pad's top corners r=4 (shoulders), bottom corners r=1.
  const { kc = [12, 6], kr = 3, kw = 2, foot = 3, pt0 = 12, pb = 17, px = 3, line = 21, lx = 5, rp = 1.5, rpt = rp, rpb = rp, rn = 1 } = o;
  const f = (r) => (sharp ? 0 : r);
  const ay = kc[1] + Math.sqrt(kr * kr - kw * kw);
  const aL = [12 - kw, ay], aR = [12 + kw, ay];
  const fL = [12 - foot, pt0], fR = [12 + foot, pt0];
  const run = openPoly([aR, fR, [24 - px, pt0], [24 - px, pb], [px, pb], [px, pt0], fL, aL], [0, f(rn), f(rpt), f(rpb), f(rpb), f(rpt), f(rn), 0]);
  const a0 = deg(Math.atan2(aL[1] - kc[1], aL[0] - kc[0])), a1 = deg(Math.atan2(aR[1] - kc[1], aR[0] - kc[0])) + 360;
  const outline = [...run, As(kc, kr, a0, a1)];
  return { closed: { outline }, open: { print: [stub([lx, line], [24 - lx, line], sharp)] }, dots: [] };
}

/* -------------------------------------------------------------- newspaper */
// A front page over the back page's folded column on the left: one outline for the
// pair, the front page's own left edge and bottom-left corner drawn inside it, and
// three text lines on the front page.
export function newspaper(sharp, o = {}) {
  const { fx = 7, by = 9, r = 3, rb = 2, lines = [[11, 17, 8], [11, 17, 12], [11, 14, 16]] } = o;
  const f = (v) => (sharp ? 0 : v);
  const outline = polyLA([[fx, 3], [21, 3], [21, 21], [3, 21], [3, by], [fx, by]], [f(r), f(r), f(r), f(r), f(rb), 0]);
  // the front page's left edge, from the fold's top down, curling LEFT onto the floor (his drawing,
  // 28 Sep 2026: an r=3 turn about (fx - 3, 18), ending tangent to the bottom at (fx - 3, 21), so the
  // back column's hollow closes in a point). The first draft curled right into the page's own corner.
  // Sharp: the curl is a quarter turn at r=3, a corner by the converter's guard, so the fold runs straight down.
  // The curl stops where it crosses the silhouette's own bottom-left corner (both r about centres a
  // unit apart, meeting on x = (fx + 3) / 2), so its round cap is buried in that corner's stroke:
  // run on to the floor tangent it stood 0.07 past the corner's ink.
  const xc = (fx + 3) / 2, yc = 21 - r + Math.sqrt(r * r - (xc - (fx - r)) ** 2);
  const tc = (Math.atan2(yc - (21 - r), xc - (fx - r)) * 180) / Math.PI;
  const fold = sharp ? [Ls([fx, by], [fx, 21])] : [Ls([fx, by], [fx, 21 - r]), As([fx - r, 21 - r], r, 0, tc)];
  const open = { fold };
  lines.forEach(([x0, x1, y], i) => { open['l' + i] = [stub([x0, y], [x1, y], sharp)]; });
  return { closed: { outline }, open, dots: [] };
}

export const DRAFTS = { landmark, 'money-bag': moneyBag, 'gold-bars': goldBars, stamp, newspaper };

/* ---------------------------------------------------- credit-card-refresh */
// The sign candidates in credit-card-plus's box (16..22 x 14..20, centre 19,17).
// kind 'one': a 3-radius arc with one head; 'two': two arcs, a head on each.
export function refreshSign(sharp, o = {}) {
  const { kind = 'one', c = [19, 17], r = 3, gap = 70, start = -60, L = 2, arm = 45 } = o;
  const head = (E, t) => {
    const back = mul(t, -1);
    const rot = (v, a) => [v[0] * Math.cos(rad(a)) - v[1] * Math.sin(rad(a)), v[0] * Math.sin(rad(a)) + v[1] * Math.cos(rad(a))];
    return [Ls(add(E, mul(rot(back, arm), L)), E), Ls(E, add(E, mul(rot(back, -arm), L)))];
  };
  const open = {};
  const arcs = kind === 'one' ? [[start, start + 360 - gap]] : [[start, start + 180 - gap], [start + 180, start + 360 - gap]];
  arcs.forEach(([a0, a1], i) => {
    const seg = As(c, r, a0, a1);
    open['arc' + i] = [seg];
    const E = A.eP(seg), t = A.tanAt(seg, 'end');
    const [h0, h1] = head(E, t);
    open['head' + i] = [h0, h1];
  });
  const card = [Ls([22, 9], [22, 7]), As([19, 7], 3, 0, -90), Ls([19, 4], [5, 4]), As([5, 7], 3, -90, -180), Ls([2, 7], [2, 17]), As([5, 17], 3, 180, 90), Ls([5, 20], [12, 20])];
  return { closed: {}, open: { card, stripe: [Ls([2, 9], [22, 9])], ...open }, dots: [] };
}
DRAFTS['credit-card-refresh'] = refreshSign;
