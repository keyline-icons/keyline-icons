// The 1.4.0 batch (28 Sep 2026): eleven names from a banking app's menu, every style
// in both corner treatments. STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill },
// each a list of layers { kind: stroke | muted | solid | plate, d }.
//
// Three are compounds on shipped siblings and copy those siblings' raw geometry verbatim
// (copy-check on copy-plus, globe-search on globe-x with map-pin-search's lens, calendar-days
// on calendar); arrow-right-left and arrow-up-down are repeat's two arrows with the loop
// legs dropped; history is rotate-ccw with clock hands. The five objects (landmark,
// money-bag, gold-bars, stamp, newspaper) are drawn in d14.mjs as lines and arcs.
import * as A from './la.mjs';
import * as B from './bool.mjs';
import * as D from './d14.mjs';
import { circle, pt, outlines, minGap } from './lib.mjs';

const { Ls, As, dLA, offsetLA, verifyOffset, bandAny, toGeo, polyLA, rrectLA } = A;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), P = (d) => ({ kind: 'plate', d });
const E = (shape) => B.emitShape(shape);
const geo = (segs) => [toGeo(segs)];
const grow = (segs) => { const o = offsetLA(segs, 1); verifyOffset(segs, o, 1); return o; };
const shrink = (segs) => offsetLA(segs, -1);
const band = (segs, sharp) => geo(bandAny(segs, sharp ? 'butt' : 'round'));
const runs = (d) => B.runFromD(d);
const rect = (x0, y0, x1, y1) => [[{ t: 'L', p: [[x0, y0], [x1, y0]] }, { t: 'L', p: [[x1, y0], [x1, y1]] }, { t: 'L', p: [[x1, y1], [x0, y1]] }, { t: 'L', p: [[x0, y1], [x0, y0]] }]];
const openD = (runsObj) => Object.values(runsObj).map((s) => dLA(s, false)).join('');
const dots = (list) => list.map(([x, y, r]) => circle([x, y], r)).join('');

/* ------------------------------------------------------------------ copy-check */
// copy-plus with the plus swapped for the 6 x 4 check, centred on the front square (15, 15).
const COPY = {
  regular: {
    back: 'M15.8284 4C15.4046 2.8015 14.2714 2 13 2L5 2C3.34315 2 2 3.34315 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284',
    backFill: 'M15.8284 4C15.4046 2.8015 14.2714 2 13 2L5 2C3.34315 2 2 3.34315 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284',
    backDuo: 'M15.8284 4C15.4046 2.8015 14.2714 2 13 2L5 2C3.3432 2 2 3.3432 2 5L2 13C2 14.2714 2.8015 15.4046 4 15.8284',
    front: 'M11 8L19 8C20.65684 8 22 9.34316 22 11L22 19C22 20.65684 20.65684 22 19 22L11 22C9.34316 22 8 20.65684 8 19L8 11C8 9.34316 9.34316 8 11 8Z',
    plate: 'M11 7L19 7C21.20914 7 23 8.79086 23 11L23 19C23 21.20914 21.20914 23 19 23L11 23C8.79086 23 7 21.20914 7 19L7 11C7 8.79086 8.79086 7 11 7Z',
    check: [Ls([12, 15], [14, 17]), Ls([14, 17], [18, 13])],
  },
  sharp: {
    back: 'M16 5L16.0001 2L2 2L2 16.0001L5 16',
    backFill: 'M15.8284 5L15.8284 2L2 2L2 15.8284L5 15.8284',
    backDuo: 'M16 5L16.0001 2L2 2L2 16.0001L5 16',
    front: 'M8 8L22 8L22 22L8 22L8 8Z',
    plate: 'M8 7L22 7C22.5523 7 23 7.4477 23 8L23 22C23 22.5523 22.5523 23 22 23L8 23C7.4477 23 7 22.5523 7 22L7 8C7 7.4477 7.4477 7 8 7Z',
    // the check's free ends run 0.4142 on along their 45-degree arms
    check: [Ls([11.7071, 14.7071], [14, 17]), Ls([14, 17], [18.2929, 12.7071])],
  },
};
function copyCheck(sharp) {
  const c = COPY[sharp ? 'sharp' : 'regular'];
  const check = dLA(c.check, false);
  const cut = B.intersect(band(c.check, sharp), runs(c.plate));
  return {
    stroke: [S(c.back + c.front + check)],
    'two-tone': [P(c.plate), S(c.back + c.front + check)],
    duotone: [P(c.plate), S(c.backDuo + check)],
    fill: [S(c.backFill), F(E(B.subtract(runs(c.plate), cut)))],
  };
}

/* ---------------------------------------------------------------- globe-search */
// globe-x's opened globe, every style as shipped, with map-pin-search's lens moved one
// unit right so it fills the x's 16..22 box exactly.
const GLOBE = {
  regular: {
    globe: 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12M2 12L22 12M12 2C14.6667 5 16 8.5 16 12M12 2C9.33333 5 8 8.5 8 12C8 15.5 9.33333 19 12 22',
    lens: 'M21 18.5C21 19.8807 19.8807 21 18.5 21C17.1193 21 16 19.8807 16 18.5C16 17.1193 17.1193 16 18.5 16C19.8807 16 21 17.1193 21 18.5ZM20.5 20.5L22 22',
    plate: 'M12 1C18.0751 1 23 5.9249 23 12L8 12C8 15.5 9.3333 19 12 22L12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1Z',
  },
  sharp: {
    globe: 'M12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2C17.5228 2 22 6.4771 22 12M2 12L22 12M12 2C14.6667 5 16 8.5 16 12M12 2C9.3333 5 8 8.5 8 12C8 15.5 9.3333 19 12 22',
    lens: 'M21 18.5C21 19.8807 19.8807 21 18.5 21C17.1193 21 16 19.8807 16 18.5C16 17.1193 17.1193 16 18.5 16C19.8807 16 21 17.1193 21 18.5ZM20.2678 20.2678L22.2929 22.2929',
    plate: 'M23 12L8 12C8 15.5 9.3333 19 12 22L12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1C18.0751 1 23 5.9249 23 12Z',
  },
  // globe-x's fill silhouette, identical in both corners as shipped
  fill: 'M12 1C18.0751 1 23 5.9249 23 12C23 11.4477 22.5523 11 22 11L16.9658 11C16.7774 8.2182 15.8031 5.4794 14.0649 3L9.9351 3C8.1969 5.4793 7.2226 8.2182 7.0342 11L3 11L3 13L7.0342 13C7.2658 16.4205 8.6858 19.7761 11.2529 22.6641C11.4504 22.8863 11.7246 22.998 12 22.998L12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM12 3.5713C13.7801 5.8823 14.7568 8.4349 14.958 11L9.042 11C9.2432 8.4349 10.2199 5.8823 12 3.5713Z',
};
function globeSearch(sharp) {
  const g = GLOBE[sharp ? 'sharp' : 'regular'];
  return {
    stroke: [S(g.globe + g.lens)],
    'two-tone': [P(g.plate), S(g.globe + g.lens)],
    duotone: [M(g.globe), S(g.lens)],
    fill: [F(GLOBE.fill), S(g.lens)],
  };
}

/* --------------------------------------------------------------- calendar-days */
// calendar's body and ticks; the header rule gives way to a 2 x 3 grid of day marks
// (r=1) under the ticks. With the rule on 11 the space below it is 8 tall and two rows
// need 10 (mark 2, gap 2, mark 2, and 2 either side), so the grid takes the rule's place:
// rows 12 and 16 sit 3 from the ticks' ends and 3 from the floor, columns 8, 12, 16
// under the ticks, 3 from each wall.
const CAL = {
  regular: {
    body: 'M6 5L18 5C19.6569 5 21 6.34315 21 8L21 18C21 19.6569 19.6569 21 18 21L6 21C4.34315 21 3 19.6569 3 18L3 8C3 6.34315 4.34315 5 6 5Z',
    ticks: 'M8 3L8 7M16 3L16 7',
    plate: 'M6 4L18 4C20.2091 4 22 5.79086 22 8L22 18C22 20.2091 20.2091 22 18 22L6 22C3.79086 22 2 20.2091 2 18L2 8C2 5.79086 3.79086 4 6 4Z',
  },
  sharp: {
    body: 'M3 5L21 5L21 21L3 21L3 5Z',
    ticks: 'M8 2L8 8M16 2L16 8',
    plate: 'M3 4L21 4C21.5523 4 22 4.4477 22 5L22 21C22 21.5523 21.5523 22 21 22L3 22C2.4477 22 2 21.5523 2 21L2 5C2 4.4477 2.4477 4 3 4Z',
  },
  days: [[8, 12, 1], [12, 12, 1], [16, 12, 1], [8, 16, 1], [12, 16, 1], [16, 16, 1]],
};
function calendarDays(sharp) {
  const c = CAL[sharp ? 'sharp' : 'regular'];
  const marks = dots(CAL.days);
  return {
    stroke: [S(c.body + c.ticks), F(marks)],
    'two-tone': [P(c.plate), S(c.body + c.ticks), F(marks)],
    duotone: [P(c.plate), S(c.ticks), F(marks)],
    fill: [F(E(B.subtract(runs(c.plate), runs(marks)))), S(c.ticks)],
  };
}

/* ------------------------------------------------------ arrow-right-left, -up-down */
// repeat's two arrows (rows 6 and 18, heads 3 each side at 45 degrees, apex on the
// shaft's end) with the loop legs dropped. Tones follow repeat: the first arrow grey.
const ARROWS = {
  regular: { a: 'M3 6L21 6M18 3L21 6L18 9', b: 'M21 18L3 18M6 15L3 18L6 21' },
  sharp: { a: 'M2 6L21 6M17.7071 2.7071L21 6L17.7071 9.2929', b: 'M22 18L3 18M6.2929 14.7071L3 18L6.2929 21.2929' },
};
// a quarter turn clockwise: (x, y) -> (24 - y, x); the top arrow becomes the right one, pointing down
const turn = (d) => d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (_, x, y) => pt([24 - +y, +x]));
function arrows(sharp, vertical) {
  const k = ARROWS[sharp ? 'sharp' : 'regular'];
  const a = vertical ? turn(k.a) : k.a, b = vertical ? turn(k.b) : k.b;
  return { stroke: [S(a + b)], 'two-tone': [M(a), S(b)], duotone: [M(a), S(b)], fill: [S(a + b)] };
}

/* --------------------------------------------------------------------- history */
// rotate-ccw as shipped, with clock hands at the r=9 ring's scale. The upright hand
// stops on 8, not clock's 6 scaled (6.6): the arrowhead's lower arm ends at (8.4, 6.09)
// and a hand from 7 would clear it by 1.71; from 8 it clears 2.08. Both hands are 4,
// each 3 from the ring's inner edge.
const HIST = {
  regular: {
    arc: 'M3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349M4.2857 3L4.7293 6.105C4.7683 6.3784 5.0216 6.5683 5.295 6.5293L8.4 6.0857',
    hands: 'M12 8L12 12L16 12',
  },
  sharp: {
    arc: 'M3.4273 9.0828L3.2117 10.0593C3.071 10.6966 3 11.3473 3 12C3 16.9706 7.0294 21 12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 3 12 3C9.5169 3 7.1441 4.0259 5.4432 5.8349L4.9867 6.3204M4.1631 2.1414L4.7999 6.5999L9.2586 5.9631',
    hands: 'M12 7L12 12L17 12',
  },
};
function history(sharp) {
  const h = HIST[sharp ? 'sharp' : 'regular'];
  return { stroke: [S(h.arc + h.hands)], 'two-tone': [M(h.arc), S(h.hands)], duotone: [M(h.arc), S(h.hands)], fill: [S(h.arc + h.hands)] };
}

/* -------------------------------------------------------------------- landmark */
export const LANDMARK = { eave: 8, c0: 12, c1: 17, rb: 0.5, ra: 2 };
function landmark(sharp) {
  const g = D.landmark(sharp, LANDMARK);
  const roof = dLA(g.closed.roof), rest = openD(g.open), plate = geo(grow(g.closed.roof));
  return {
    stroke: [S(roof + rest)],
    'two-tone': [P(E(plate)), S(roof + rest)],
    duotone: [P(E(plate)), S(rest)],
    fill: [F(E(plate)), S(rest)],
  };
}

/* ------------------------------------------------------------------- money-bag */
// Duotone: the gathered top black down to the tie's lower edge, over the whole bag grey.
// Fill: the silhouette solid with the tie cut out to the inner edge (the rim holds).
// The tie up to 7 and the shoulders fuller (vertex 9, r=8), 28 Sep 2026, so the sign family
// (his ask: signs centred in the bag, not a cut corner) holds check, plus and minus at the house
// 6 and x at 0.85; at the first draft's tie on 8 the x held 0.7 and the dollar 0.55.
export const BAG = { notch: 2, tw: 5.5, ny: 7, sy: 9, rs: 8 };
function moneyBag(sharp, kind = null) {
  const g = D.moneyBag(sharp, BAG);
  const body = g.closed.body, tie = g.open.tie[0];
  const outline = dLA(body), tieD = dLA([tie], false);
  const plate = geo(grow(body));
  const topShape = geo(grow(topClosed(body, tie)));
  const black = B.intersect(topShape, rect(-1, -1, 25, tie.p0[1] + 1));
  // The sign compounds (his ask, 28 Sep 2026: centred in the bag, never a cut corner). The
  // sign is black over the grey bag in duotone ("modifiers black") and knocked out of the fill,
  // as badge-dollar-sign's dollar is.
  const sign = kind ? bagSign(kind, sharp) : null;
  const signD = sign ? sign.map((r) => dLA(r, false)).join('') : '';
  const cut = sign ? B.union(...sign.map((r) => band(r, sharp))) : [];
  // Fill, his drawing 28 Sep 2026: the knot drawn as its outline with the window open (the knot's
  // contour shrunk by the stroke's half width), the tie and the body solid. The first draft cut a slot
  // at the tie instead.
  const knotWindow = geo(shrink(topClosed(body, tie)));
  const fill = B.subtract(plate, knotWindow);
  if (sign && !sharp) {
    // measured on the rounded drawing (sharp's extended ends double-count, as cloud's did)
    let m = Infinity;
    for (const a of outlines(signD, 96)) for (const b of outlines(outline + tieD, 96)) m = Math.min(m, minGap(a, b));
    const want = kind === 'dollar-sign' ? 1 : 2;
    if (m - 2 < want - 0.02) throw new Error(`money-bag-${kind}: sign clears the bag by ${(m - 2).toFixed(3)}, wants ${want}`);
  }
  return {
    stroke: [S(outline + tieD + signD)],
    'two-tone': [P(E(plate)), S(outline + tieD + signD)],
    duotone: sign ? [P(E(plate)), F(E(black)), S(signD)] : [P(E(plate)), F(E(black))],
    fill: [F(E(sign ? B.subtract(fill, cut) : fill))],
  };
}
/**
 * A sign centred in the bag's body, on the midpoint between the tie's ink and the floor's inner
 * edge (y 14). Sizes are the cloud rule (compounds.md, *A sign inside a curved body*): each grown
 * until its painted gap to the outline would drop under 2 (the dollar under 1, the ring rule for a
 * currency letterform in a frame, `RING_CLEARANCE`), rounded down to a twentieth, and never past
 * the house sign (the 6 box; the dollar is badge-dollar-sign's 8 x 12 about its centre). Measured
 * by bagsigns.mjs on BAG: x 0.85, plus 1, minus 1 (fits 1.6), check 1 (fits 1.1), dollar 0.65.
 * Sharp runs its free ends on (0.4142 on a diagonal, 1 on an axis) as absolute units.
 */
export const BAG_SIGN = { c: 14, x: 0.85, plus: 1, minus: 1, check: 1, 'dollar-sign': 0.65 };
function bagSign(kind, sharp) {
  const c = BAG_SIGN.c, s = BAG_SIGN[kind];
  const P = (x, y) => [12 + (x - 12) * s, c + (y - 12) * s];      // the house sign's frame, centred on (12, 12)
  const run = (pts) => pts.slice(1).map((p, i) => Ls(pts[i], p));
  const on = (segs, which = 'both') => { if (!sharp) return segs; const out = segs.map((x) => ({ ...x })); const k = (t) => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); };
    if (which !== 'end') { const f = out[0], t = [f.p1[0] - f.p0[0], f.p1[1] - f.p0[1]], L = Math.hypot(...t), kk = k(t); out[0] = Ls([f.p0[0] - (t[0] / L) * kk, f.p0[1] - (t[1] / L) * kk], f.p1); }
    if (which !== 'start') { const l = out.at(-1), t = [l.p1[0] - l.p0[0], l.p1[1] - l.p0[1]], L = Math.hypot(...t), kk = k(t); out[out.length - 1] = Ls(l.p0, [l.p1[0] + (t[0] / L) * kk, l.p1[1] + (t[1] / L) * kk]); }
    return out; };
  if (kind === 'x') return [on(run([P(9, 9), P(15, 15)])), on(run([P(15, 9), P(9, 15)]))];
  if (kind === 'plus') return [on(run([P(12, 9), P(12, 15)])), on(run([P(9, 12), P(15, 12)]))];
  if (kind === 'minus') return [on(run([P(9, 12), P(15, 12)]))];
  if (kind === 'check') return [on(run([P(9, 12), P(11, 14), P(15, 10)]))];
  if (kind === 'dollar-sign') {
    // badge-dollar-sign's dollar: stem 6..18, bars on 7, 12, 17, bowls r=2.5 (kept round in sharp: shape, not fillet)
    const r = 2.5 * s, stem = on(run([P(12, 6), P(12, 18)]));
    const top = on([Ls(P(14.5, 7), P(10.5, 7))], 'start'), bot = on([Ls(P(13.5, 17), P(9.5, 17))], 'end');
    return [stem, [...top, As(P(10.5, 9.5), r, 270, 90), Ls(P(10.5, 12), P(13.5, 12)), As(P(13.5, 14.5), r, -90, 90), ...bot]];
  }
  throw new Error('no bag sign ' + kind);
}
/** The gathered top as its own closed contour: the body's run from the left neck vertex over the top to the right one, closed by the tie. */
function topClosed(body, tie) {
  const near = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6;
  const i0 = body.findIndex((s) => near(A.sP(s), tie.p0));
  const out = [];
  for (let k = 0; k < body.length; k++) {
    const s = body[(i0 + k) % body.length];
    out.push(s);
    if (near(A.eP(s), tie.p1)) break;
  }
  out.push(Ls(tie.p1, tie.p0));
  return out;
}

/* ------------------------------------------------------------------- gold-bars */
// Duotone: the top ingot black, the two under it grey. Fill: all three solid.
function goldBars(sharp) {
  const g = D.goldBars(sharp, {});
  const { top, left, right } = g.closed;
  const d = dLA(top) + dLA(left) + dLA(right);
  const pt_ = geo(grow(top)), pl = geo(grow(left)), pr = geo(grow(right));
  return {
    stroke: [S(d)],
    'two-tone': [P(E(pt_) + E(pl) + E(pr)), S(d)],
    duotone: [P(E(pl) + E(pr)), F(E(pt_))],
    fill: [F(E(pt_) + E(pl) + E(pr))],
  };
}

/* ----------------------------------------------------------------------- stamp */
// Duotone: the pad black from its top edge's ink down, the knob and neck grey, the
// print line black. Fill: the silhouette solid and the print line.
export const STAMP = { rpt: 4, rpb: 1 };   // his drawing, 28 Sep 2026
function stamp(sharp) {
  const g = D.stamp(sharp, STAMP);
  const outline = dLA(g.closed.outline), print = openD(g.open);
  const plate = geo(grow(g.closed.outline));
  const pad = B.intersect(plate, rect(-1, (STAMP.pt0 ?? 12) - 1, 25, 25));
  return {
    stroke: [S(outline + print)],
    'two-tone': [P(E(plate)), S(outline + print)],
    duotone: [P(E(plate)), F(E(pad)), S(print)],
    fill: [F(E(plate)), S(print)],
  };
}

/* ------------------------------------------------------------------- newspaper */
// His drawing, 28 Sep 2026. Duotone: the folded back column black to the front
// page's outer edge (x = fx - 1), the page grey, the text black, no fold line (the
// change of tone is the fold). Fill: the page solid with the text cut out, the back
// column a frame: its interior open, bounded by the page's painted edge, so the
// page's own bottom-left corner bites into the hole. First drafts (fold line black
// in duotone, fold cut out of a solid fill) were replaced by this.
export const NEWS = { fx: 8, by: 9, r: 3, rb: 2, lines: [[12, 17, 8], [12, 17, 12], [12, 15, 16]] };
function newspaper(sharp) {
  const g = D.newspaper(sharp, NEWS);
  const { fx, by, r, rb } = NEWS;
  const outline = dLA(g.closed.outline), rest = openD(g.open);
  const plate = geo(grow(g.closed.outline));
  const { fold, ...text } = g.open;
  const lines = B.union(...Object.values(text).map((s) => band(s, sharp)));
  let back, hole;
  if (sharp) {
    // straight fold: the column's painted region left of the page, and its open interior
    back = geo(polyLA([[2, by - 1], [fx - 1, by - 1], [fx - 1, 22], [2, 22]], [1, 0, 0, 1]));
    hole = geo(polyLA([[4, by + 1], [fx - 1, by + 1], [fx - 1, 20], [4, 20]], [0, 0, 0, 0]));
  } else {
    // the curl about C = (fx - r, 21 - r): its column-side ink edge is the r - 1 circle about C.
    const C = [fx - r, 21 - r], cb = [3 + r, 21 - r];          // cb: the silhouette's bottom-left corner centre
    const deg = (a) => (a * 180) / Math.PI;
    // the hollow's point: where the curl's inner edge meets the corner's inner edge (x midway between the centres)
    const xm = (C[0] + cb[0]) / 2, ym = C[1] + Math.sqrt((r - 1) ** 2 - (xm - C[0]) ** 2);
    // duotone black: the column straight down to the page's outer edge (his ruling, 28 Sep 2026: "keep
    // it straight for duotone"; following the curl left a step at the floor that no seam fixes)
    back = geo(polyLA([[2, by - 1], [fx - 1, by - 1], [fx - 1, 22], [2, 22]], [rb + 1, 0, 0, r + 1]));
    hole = geo([
      As([3 + rb, by + rb], rb - 1, 180, 270), Ls([3 + rb, by + 1], [fx - 1, by + 1]), Ls([fx - 1, by + 1], [fx - 1, C[1]]),
      As(C, r - 1, 0, deg(Math.atan2(ym - C[1], xm - C[0]))), As(cb, r - 1, deg(Math.atan2(ym - cb[1], xm - cb[0])), 180), Ls([4, cb[1]], [4, by + rb]),
    ]);
  }
  assertInside(back, plate, 'newspaper back column');
  assertInside(hole, plate, 'newspaper hollow');
  return {
    stroke: [S(outline + rest)],
    'two-tone': [P(E(plate)), S(outline + rest)],
    duotone: [P(E(plate)), F(E(back)), S(openD(text))],
    fill: [F(E(B.subtract(B.subtract(plate, lines), hole)))],
  };
}
/** Every sampled point of `a`'s boundary lies inside or on `b` (a black region never past its plate). */
function assertInside(a, b, what) {
  const polys = B.shapePolys(b);
  for (const run of a) for (const p of B.flat(run, 0.05)) {
    if (B.insideShape(p, polys)) continue;
    const segDist = (a, c) => { const ux = c[0] - a[0], uy = c[1] - a[1], L = ux * ux + uy * uy || 1; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ux + (p[1] - a[1]) * uy) / L)); return Math.hypot(a[0] + ux * t - p[0], a[1] + uy * t - p[1]); };
    const near = polys.some((poly) => poly.some((q, i) => segDist(q, poly[(i + 1) % poly.length]) < 0.01));
    if (!near) throw new Error(`${what}: ${p.map((v) => v.toFixed(3))} outside`);
  }
}

export const STYLES = {
  'copy-check': copyCheck,
  'globe-search': globeSearch,
  'calendar-days': calendarDays,
  'arrow-right-left': (sh) => arrows(sh, false),
  'arrow-up-down': (sh) => arrows(sh, true),
  history,
  landmark,
  'money-bag': (sh) => moneyBag(sh),
  'money-bag-check': (sh) => moneyBag(sh, 'check'),
  'money-bag-dollar-sign': (sh) => moneyBag(sh, 'dollar-sign'),
  'money-bag-minus': (sh) => moneyBag(sh, 'minus'),
  'money-bag-plus': (sh) => moneyBag(sh, 'plus'),
  'money-bag-x': (sh) => moneyBag(sh, 'x'),
  'gold-bars': goldBars,
  stamp,
  newspaper,
};
