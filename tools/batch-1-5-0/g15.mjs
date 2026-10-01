// The 1.5.0 batch (1 Oct 2026): the drawings shadcn/create's icon previews still lacked.
// STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of layers
// { kind: stroke | muted | solid | plate, d }.
//
// Eight are compounds on shipped drawings and read those drawings' raw files, so a
// compound always carries its base exactly: arrow-left-right (arrow-right-left
// mirrored), square-arrow-out-up-right (the square-arrow-in family with the arrow
// leaving), file-alert (file-x with package-alert's sign), file-chart-column
// (file-text's file with chart-column's bars), star-off (star with the house slash),
// archive-x, cloud-upload and message-question (a sign inside the body, sized by the
// cloud rule).
import * as L from '../batch-1-4-0/lib.mjs';
import * as B from '../batch-1-4-0/bool.mjs';
import * as X from './lib15.mjs';
import * as D from './d15.mjs';
import * as R4 from './d15r4.mjs';

const { rawD, rawLayers, absD, mirrorX, P, u, U3, SLASH, assert } = X;
const S = (d) => ({ kind: 'stroke', d }), M = (d) => ({ kind: 'muted', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d });
const C = (s) => (s ? 'sharp' : 'regular');
const dot = (c, r = 1) => L.circle(c, r);
/** Every listed subpath removed from d; each must be there. */
function without(d, ...subs) {
  let out = d;
  for (const s of subs) { assert(out.includes(s), `subpath ${s} not in ${d.slice(0, 60)}`); out = out.replace(s, ''); }
  return out;
}

/* ----------------------------------------------------------- arrow-left-right */
// arrow-right-left mirrored across the vertical centre line: the upper arrow points left
// and keeps the grey, the lower one points right.
function arrowLeftRight(sharp) {
  const c = C(sharp), out = {};
  for (const st of ['stroke', 'two-tone', 'duotone', 'fill']) out[st] = rawLayers('arrow-right-left', st, c).map((l) => ({ ...l, d: mirrorX(l.d) }));
  return out;
}

/* -------------------------------------------------- square-arrow-out-up-right */
// The square-arrow-in family's square (14 units, r 3, opened at the corner the arrow
// passes) and its arrow (the dashed-panel family's long L head, r 0.5 turn, shaft 0.5
// short of it), with the arrow turned round so it leaves through the corner. Built in
// the in-family's frame (square bottom right, arrow top left) and mirrored to the
// external-link corner. Two-tone and duotone: the opened square grey, the arrow black.
function squareArrowOut(sharp) {
  const square = sharp
    ? 'M14 7L21 7L21 21L7 21L7 14'
    : absD(rawLayers('square-arrow-in-down-right', 'duotone', 'regular').find((l) => l.kind === 'muted').d);
  if (sharp) assert(rawLayers('square-arrow-in-down-right', 'duotone', 'sharp').find((l) => l.kind === 'muted').d === square, 'square-arrow-in moved');
  // tip at (3, 3): the L head's arms run back along the top and the left, the tail stops in the square's open corner
  const arrow = sharp
    ? 'M11.2929 11.2929L3.1464 3.1464M12 3L3 3L3 12'
    : 'M11 11L3.5 3.5M11 3L3.5 3C3.2239 3 3 3.2239 3 3.5L3 11';
  const sq = mirrorX(square), ar = mirrorX(arrow);
  return {
    stroke: [S(sq + ar)],
    'two-tone': [M(sq), S(ar)],
    duotone: [M(sq), S(ar)],
    fill: [S(sq + ar)],
  };
}

/* ------------------------------------------------------------------ file-alert */
// file-x's opened file, every style as shipped, with package-alert's sign in the same
// 6-unit box (14..20 by 16..22): a 2-unit stem on the box's centre line and the r = 1
// mark 2 below it. Sharp runs the stem's ends out a unit each (painted extent = rounded,
// the alert family's rule); the mark stays round, as package-alert's does.
const FILE_X = { regular: 'M14 16L20 22M20 16L14 22', sharp: 'M13.7071 15.7071L20.2929 22.2929M20.2929 15.7071L13.7071 22.2929' };
function fileAlert(sharp) {
  const c = C(sharp), x = FILE_X[c];
  const stem = sharp ? 'M17 15L17 19' : 'M17 16L17 18';
  const mark = dot([17, 22]);
  const swap = (style) => rawLayers('file-x', style, c).map((l) => (l.kind === 'stroke' && l.d.includes(x) ? { ...l, d: without(l.d, x) + stem } : l));
  return {
    stroke: [...swap('stroke'), F(mark)],
    'two-tone': [...swap('two-tone'), F(mark)],
    duotone: [...swap('duotone'), F(mark)],
    fill: [...swap('fill'), F(mark)],
  };
}

/* ----------------------------------------------------------- file-chart-column */
// file-text's file with chart-column's three bars in place of the text: columns on 8, 12
// and 16 standing on 18 (2 clear of the floor), in chart-column's order, the middle the
// shortest and the right the tallest. The right column is the one the fold limits: its
// top on 12 clears the fold's turn by 2.07, so the three are 4, 3 and 6 tall.
export const BARS = { x: [8, 12, 16], base: 18, h: [4, 3, 6] };
const FILE_TEXT = { regular: 'M8 13L12 13M8 17L16 17', sharp: 'M7 13L13 13M7 17L17 17' };
function fileChartColumn(sharp) {
  const c = C(sharp), e = sharp ? 1 : 0;
  const bars = BARS.x.map((x, i) => `M${x} ${BARS.base + e}L${x} ${BARS.base - BARS.h[i] - e}`).join('');
  const lines = FILE_TEXT[c];
  const swap = (style) => rawLayers('file-text', style, c).map((l) => (l.kind === 'stroke' && l.d.includes(lines) ? { ...l, d: without(l.d, lines) + bars } : l));
  // the fill: file-text's silhouette and fold hole, the bars cut out as file-text cuts its lines
  const [fillD] = rawLayers('file-text', 'fill', c).map((l) => l.d);
  const subs = fillD.split(/(?=M)/);
  const plate = subs[0], fold = subs.at(-1);
  assert(subs.length === 4 && /14 3\.4142/.test(fold), 'file-text fill changed shape');
  const holes = B.runFromD(bars).map((r) => B.band(r, sharp ? 'butt' : 'round'));
  const shape = B.orient([...B.runFromD(plate), ...holes, ...B.runFromD(fold)]);
  return {
    stroke: swap('stroke'),
    'two-tone': swap('two-tone'),
    duotone: swap('duotone'),
    fill: [F(shape.map((r) => B.emitRun(r)).join(''))],
  };
}

/* -------------------------------------------------------------------- star-off */
// star with the house slash (his rule: an -off is its original at the same size). The
// near side runs into the slash and stops on its centre line; the far side stands off
// at u = 4 sqrt 2 (sharp: the butt face's nearer corner on 4 sqrt 2 - 2). Plates as
// heart-off ships them, the star being a one-shape icon like the heart: the near piece
// cut on u = 0, the far piece notched on u = 3 sqrt 2 with an r = 1 turn about each far
// stroke end (sharp: clipped straight on 4 sqrt 2 - 2). Two-tone drops the far strokes,
// duotone is the plates grey under a black slash, fill the plates solid.
function starOff(sharp) {
  const c = C(sharp);
  const line = rawD('star', 'stroke', c, 'stroke');
  const plate = rawD('star', 'two-tone', c, 'plate');
  const { near, far } = X.offStroke(line, sharp);
  assert(near.length === 1 && far.length === 1, `star-off: ${near.length} near and ${far.length} far pieces`);
  const nearD = X.segsD(near[0]), farD = X.segsD(far[0]);
  const [prun] = L.parseRuns(plate);
  const nearPlate = X.clipRunF(prun, (s, t) => -u(L.segAt(s, t)));
  assert(nearPlate.length === 1, 'near plate in one piece');
  const nearPlateD = X.segsD(nearPlate[0], true);
  let farPlateD;
  if (sharp) {
    const fp = X.clipRunF(prun, (s, t) => u(L.segAt(s, t)) - X.US);
    assert(fp.length === 1, 'far plate in one piece');
    farPlateD = X.segsD(fp[0], true);
  } else farPlateD = roundedFarPlate(far[0], prun, line);
  const slash = SLASH[c];
  return {
    stroke: [S(nearD + farD + slash)],
    'two-tone': [Pl(nearPlateD + farPlateD), S(nearD + slash)],
    duotone: [Pl(nearPlateD + farPlateD), S(slash)],
    fill: [F(nearPlateD + farPlateD), S(slash)],
  };
}
/**
 * The far plate of a regular -off: the base's plate from the point beside each far stroke
 * end (the end pushed out a unit along its outward normal), an r = 1 turn about the end
 * round to the notch line u = 3 sqrt 2, and that line between the two turns (bell-dot's
 * recipe, as heart-off and monitor-off ship).
 */
function roundedFarPlate(farSegs, prun, baseD) {
  const [base] = L.parseRuns(baseD);
  const polys = [B.flat(base.segs.map((s) => ({ t: s.t, p: s.p })), 0.02)];
  const E = [farSegs[0].p[0], farSegs.at(-1).p.at(-1)];
  const into = [X.tangent(farSegs[0], 0), X.tangent(farSegs.at(-1), 1).map((v) => -v)];   // along the piece, away from the cut
  const out = E.map((e, k) => {
    const t = into[k], n = [-t[1], t[0]];
    const probe = [e[0] + n[0] * 0.5, e[1] + n[1] * 0.5];
    return B.winding(probe, polys) !== 0 ? [-n[0], -n[1]] : n;           // the side away from the star's inside
  });
  const O = E.map((e, k) => [e[0] + out[k][0], e[1] + out[k][1]]);
  const T = E.map((e) => [e[0] - 1 / X.R2, e[1] + 1 / X.R2]);           // on u = 3 sqrt 2, the cap's tangent point
  for (const t of T) assert(Math.abs(u(t) - U3) < 1e-6, 'notch tangent off the line');
  // the plate's own contour from O[0] to O[1], the far way round
  const near = (q) => { let best = { d: Infinity }; prun.segs.forEach((s, i) => { for (let j = 0; j <= 2000; j++) { const p = L.segAt(s, j / 2000), d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < best.d) best = { d, i, t: j / 2000 }; } }); return best; };
  const refine = (q, b) => { let lo = Math.max(0, b.t - 1 / 2000), hi = Math.min(1, b.t + 1 / 2000); const s = prun.segs[b.i]; for (let k = 0; k < 60; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; const d1 = Math.hypot(...L.segAt(s, m1).map((v, j) => v - q[j])), d2 = Math.hypot(...L.segAt(s, m2).map((v, j) => v - q[j])); if (d1 < d2) hi = m2; else lo = m1; } return { ...b, t: (lo + hi) / 2, d: Math.hypot(...L.segAt(s, (lo + hi) / 2).map((v, j) => v - q[j])) }; };
  const A = refine(O[0], near(O[0])), Bp = refine(O[1], near(O[1]));
  assert(A.d < 2e-3 && Bp.d < 2e-3, `far plate: the offset point is ${Math.max(A.d, Bp.d).toFixed(4)} off the plate`);
  const walk = (a, b) => {                                                  // forward along the plate from a to b
    const segs = [], n = prun.segs.length;
    if (a.i === b.i && b.t > a.t) return [L.segPiece(prun.segs[a.i], a.t, b.t)];
    segs.push(L.segPiece(prun.segs[a.i], a.t, 1));
    for (let i = (a.i + 1) % n; i !== b.i; i = (i + 1) % n) segs.push(prun.segs[i]);
    if (b.t > 0) segs.push(L.segPiece(prun.segs[b.i], 0, b.t));
    return segs;
  };
  const meanU = (segs) => segs.reduce((acc, s) => acc + u(L.segAt(s, 0.5)), 0) / segs.length;
  const fwd = walk(A, Bp), bwd = walk(Bp, A);
  let piece = meanU(fwd) > meanU(bwd) ? fwd : bwd.reverse().map((s) => ({ t: s.t, p: [...s.p].reverse() }));
  piece[0] = { ...piece[0], p: [O[0], ...piece[0].p.slice(1)] };
  piece[piece.length - 1] = { ...piece.at(-1), p: [...piece.at(-1).p.slice(0, -1), O[1]] };
  // r = 1 turns about each end, the way that never crosses the stroke's own run
  const deg = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const turn = (e, from, to, avoid) => {
    let a0 = deg([from[0] - e[0], from[1] - e[1]]), a1 = deg([to[0] - e[0], to[1] - e[1]]);
    const av = deg(avoid);
    const inside = (a, lo, hi) => { let x = a; while (x < lo) x += 360; while (x > lo + 360) x -= 360; return x <= hi; };
    let up = a1; while (up < a0) up += 360;                 // a0 -> a1 increasing
    if (inside(av, a0, up)) { let dn = a1; while (dn > a0) dn -= 360; return L.arcC(e, 1, a0, dn); }
    return L.arcC(e, 1, a0, up);
  };
  let d = `M${P(T[0])}`;
  d += turn(E[0], T[0], O[0], into[0]);
  d += piece.map((s) => L.segD(s)).join('');
  d += turn(E[1], O[1], T[1], into[1]);
  return d + 'Z';
}

/* -------------------------------------------------------------------- save-off */
// save with the house slash, star-off's recipe on the floppy's body and hub: the near side
// runs into the slash and stops on its centre line, the far side stands off at 4 sqrt 2
// (sharp: the butt face's nearer corner on 4 sqrt 2 - 2). The shutter goes (his call, 1 Oct
// 2026: all the cut left of it was a stub under the top edge), its window with it. Plates:
// the near one cut on u = 0, the far one notched on 3 sqrt 2 with an r = 1 turn about each far
// end of the body (sharp: clipped straight on 4 sqrt 2 - 2). The hub's disc is cut out of the
// near solid as save's fill cuts it. Two-tone drops the far strokes, duotone is the solids
// grey under a black slash, fill the solids and the slash.
function saveOff(sharp) {
  const c = C(sharp), base = D.save(sharp), f = D.FLOPPY;
  const line = without(base.stroke[0].d, D.open(D.floppy(sharp).shutter));
  const farF = sharp
    ? (s, t) => { const p = L.segAt(s, t), tg = X.tangent(s, t), n = [-tg[1], tg[0]]; return Math.min(u([p[0] + n[0], p[1] + n[1]]), u([p[0] - n[0], p[1] - n[1]])) - X.US; }
    : (s, t) => u(L.segAt(s, t)) - X.U4;
  let nearD = '', farD = '', bodyFar = null;
  // a cut that lands exactly on a sharp corner leaves a zero-length piece of the next edge
  const real = (pc) => pc.filter((sg) => Math.hypot(sg.p.at(-1)[0] - sg.p[0][0], sg.p.at(-1)[1] - sg.p[0][1]) > 1e-6);
  L.parseRuns(line).forEach((run, k) => {
    for (const pc of X.clipRunF(run, (s, t) => -u(L.segAt(s, t))).map(real).filter((pc) => pc.length)) nearD += X.segsD(pc);
    const far = X.clipRunF(run, farF).map(real).filter((pc) => pc.length);
    for (const pc of far) farD += X.segsD(pc);
    if (k === 0) { assert(far.length === 1, `save-off: the body has ${far.length} far pieces`); bodyFar = far[0]; }
  });
  const plateD = base['two-tone'][0].d;
  const [prun] = L.parseRuns(plateD);
  // the half planes u <= k (lo) and u >= k, as triangles and quads well past the canvas
  const half = (k, lo) => B.runFromD(lo ? `M${k - 40} -40L${k + 60} 60L${k - 40} 60Z` : `M${k - 40} -40L${k + 60} 60L${k + 120} 60L${k + 120} -40Z`);
  const nearPlate = B.intersect(B.runFromD(plateD), half(0, true));
  let farPlateD;
  if (sharp) farPlateD = B.emitShape(B.intersect(B.runFromD(plateD), half(X.US, false)));
  else farPlateD = roundedFarPlate(bodyFar, prun, L.parseRuns(line).map((r) => X.segsD(r.segs, r.closed))[0]);
  // the hub as save draws it in duotone and fill, a disc, cut out of the near solid
  const nearSolid = B.subtract(nearPlate, B.runFromD(L.circle(f.hub, f.hr)));
  const farSolid = B.runFromD(farPlateD);
  const slash = SLASH[c];
  const solids = B.emitShape(nearSolid) + B.emitShape(farSolid);
  return {
    stroke: [S(nearD + farD + slash)],
    'two-tone': [Pl(B.emitShape(nearPlate) + farPlateD), S(nearD + slash)],
    duotone: [Pl(solids), S(slash)],
    fill: [F(solids), S(slash)],
  };
}

/* ------------------------------------------------------------------- archive-x */
// archive's box, every style as shipped, with an x in place of the handle. The body under
// the lid is 9 tall inside the ink, so the x is sized by the cloud rule: centred on the
// body's inside (12, 14.5), grown until it would come within 2 of the lid, the walls or the
// floor, floored to a twentieth. Sharp runs each arm on 0.4142 along its own diagonal.
export const ARCHIVE_X = { c: [12, 14.5] };
const ARCHIVE_HANDLE = { regular: 'M10 13L14 13', sharp: 'M9 13L15 13' };
const xSign = (c, h, sharp) => {
  const k = h + (sharp ? 0.4142 / Math.SQRT2 : 0);                      // sharp: 0.4142 on along each diagonal
  return `M${P([c[0] - k, c[1] - k])}L${P([c[0] + k, c[1] + k])}M${P([c[0] + k, c[1] - k])}L${P([c[0] - k, c[1] + k])}`;
};
function archiveX(sharp) {
  const c = C(sharp), handle = ARCHIVE_HANDLE[c];
  const body = without(rawD('archive', 'stroke', 'regular', 'stroke'), ARCHIVE_HANDLE.regular);
  const h = ARCHIVE_X.h ?? (ARCHIVE_X.h = X.fitScale((s) => xSign(ARCHIVE_X.c, 3 * s, false), body) * 3);
  const x = xSign(ARCHIVE_X.c, h, sharp);
  const swap = (style) => rawLayers('archive', style, c).map((l) => (l.kind === 'stroke' && l.d.includes(handle) ? { ...l, d: without(l.d, handle) + x } : l));
  return { stroke: swap('stroke'), 'two-tone': swap('two-tone'), duotone: swap('duotone'), fill: swap('fill') };
}

/* ---------------------------------------------------------------- cloud-upload */
// cloud with the house arrow-up sign inside it, as cloud-check and cloud-x carry theirs:
// centred on (12, 12.5) and sized by the cloud rule. Duotone: the cloud grey, the arrow
// black; fill: the arrow cut out of the solid cloud.
export const CLOUD_UP = { c: [12, 12.5] };
const arrowUp = (c, s, sharp, short = 0) => {
  const k = 3 * s, e = sharp ? 1 : 0, ed = sharp ? 0.4142 / Math.SQRT2 : 0;
  return `M${P([c[0], c[1] + k + e])}L${P([c[0], c[1] - k + short])}M${P([c[0] - k - ed, c[1] + ed])}L${P([c[0], c[1] - k])}L${P([c[0] + k + ed, c[1] + ed])}`;
};
// cloud-download is the same sign turned over (his ask, 1 Oct 2026: the pair). Each arrow is
// fitted by the cloud rule and the pair takes the smaller of the two, so they read as one size.
const arrowDown = (c, s, sharp, short = 0) => X.mapPts(arrowUp([c[0], 25 - c[1]], s, sharp, short), ([x, y]) => [x, 25 - y]);
function cloudArrow(sharp, down = false) {
  const c = C(sharp);
  const cloud = rawD('cloud', 'stroke', c, 'stroke'), plate = rawD('cloud', 'two-tone', c, 'plate');
  if (CLOUD_UP.s === undefined) {
    const body = rawD('cloud', 'stroke', 'regular', 'stroke');
    CLOUD_UP.up = X.fitScale((v) => arrowUp(CLOUD_UP.c, v, false), body);
    CLOUD_UP.down = X.fitScale((v) => arrowDown(CLOUD_UP.c, v, false), body);
    CLOUD_UP.s = Math.min(CLOUD_UP.up, CLOUD_UP.down);
  }
  const s = CLOUD_UP.s, draw = down ? arrowDown : arrowUp;
  const sign = draw(CLOUD_UP.c, s, sharp);
  // the knockout: the shaft's end under the head is under the head's own join, so it is cut half a
  // unit short to keep the two caps from sharing an arc, which the boolean cannot walk
  const cut = B.union(...B.runFromD(draw(CLOUD_UP.c, s, sharp, 0.5)).map((r) => [B.band(r, sharp ? 'butt' : 'round')]));
  const fill = B.subtract(B.runFromD(plate), cut);
  return {
    stroke: [S(cloud + sign)],
    'two-tone': [Pl(plate), S(cloud + sign)],
    duotone: [Pl(plate), S(sign)],
    fill: [F(B.emitShape(fill))],
  };
}

/* ------------------------------------------------------------ message-question */
// message's round bubble with the question mark centred on its ellipse (12, 11), as the
// family centres every sign. The mark is question's own, scaled about its hook: the bubble
// is 14 tall inside the ink, so with 2 clear above and below the mark is 10 tall, hook
// radius 1.6 (question's 4 at 0.4).
export const QUESTION = { s: 0.4, c: [12, 11] };
const QUESTION_HOOK = 'M8 9C8 6.7909 9.7909 5 12 5C14.2091 5 16 6.7909 16 9C16 10.6148 15.029 12.0712 13.5385 12.6923C12.6068 13.0805 12 13.9907 12 15';
function questionMark(s, c, sharp) {
  // question: hook top 5 (ink 4), end 15 (ink 16), mark on 19 (ink 18..20): ink 4..20 about 12.
  // Scaled by s about its hook's centre line x = 12, its height 10s + 6 centred on c.
  const H = 10 * s + 6, top = c[1] - H / 2 + 1;                  // hook path top
  const hook = X.mapPts(QUESTION_HOOK, ([x, y]) => [12 + (x - 12) * s + (c[0] - 12), top + (y - 5) * s]);
  const end = top + 10 * s;
  const sharpHook = sharp ? hook.replace(/^M(-?[\d.]+) (-?[\d.]+)/, (m, x, y) => `M${X.f4(+x)} ${X.f4(+y + 1)}L${X.f4(+x)} ${X.f4(+y)}`) + `L${P([c[0], end + 1])}` : hook;
  return { hook: sharpHook, mark: dot([c[0], end + 4]) };
}
function messageQuestion(sharp) {
  const c = C(sharp);
  const bubble = rawD('message', 'stroke', c, 'stroke'), plate = rawD('message', 'two-tone', c, 'plate');
  const q = questionMark(QUESTION.s, QUESTION.c, sharp);
  const cut = B.union(B.runFromD(q.hook).map((r) => B.band(r, sharp ? 'butt' : 'round')), B.runFromD(q.mark));
  const fill = B.subtract(B.runFromD(plate), cut);
  return {
    stroke: [S(bubble + q.hook), F(q.mark)],
    'two-tone': [Pl(plate), S(bubble + q.hook), F(q.mark)],
    duotone: [Pl(plate), S(q.hook), F(q.mark)],
    fill: [F(B.emitShape(fill))],
  };
}

const mirrorSet = (set, mx, my) => Object.fromEntries(Object.entries(set).map(([st, ls]) => [st, ls.map((l) => ({ ...l, d: X.mapPts(l.d, ([x, y]) => [mx ? 24 - x : x, my ? 24 - y : y]) }))]));

export const STYLES = {
  'arrow-left-right': arrowLeftRight,
  'square-arrow-out-up-right': squareArrowOut,
  // the other three corners (his ask, 1 Oct 2026: all four if one), mirrors of the first
  'square-arrow-out-up-left': (sh) => mirrorSet(squareArrowOut(sh), true, false),
  'square-arrow-out-down-right': (sh) => mirrorSet(squareArrowOut(sh), false, true),
  'square-arrow-out-down-left': (sh) => mirrorSet(squareArrowOut(sh), true, true),
  'file-alert': fileAlert,
  'file-chart-column': fileChartColumn,
  'star-off': starOff,
  'archive-x': archiveX,
  'cloud-upload': (sh) => cloudArrow(sh, false),
  'cloud-download': (sh) => cloudArrow(sh, true),
  'message-question': messageQuestion,
  // the new objects, drawn in d15.mjs
  clipboard: (sh) => D.clipboard(sh),
  // the family (his ask and references, 1 Oct 2026): the sign on the board
  ...Object.fromEntries(Object.entries(D.INNER).map(([k, inner]) => [`clipboard-${k}`, (sh) => D.clipboard(sh, { inner })])),
  save: (sh) => D.save(sh),
  tv: (sh) => D.tv(sh),
  target: (sh) => D.target(sh),
  'columns-3': (sh) => D.columns3(sh),
  frame: (sh) => D.frame(sh),
  container: (sh) => D.container(sh),
  // round 4 (his asks, 1 Oct 2026; clipboard-clock, clipboard-pen and workflow drawn and dropped by him)
  ...Object.fromEntries(Object.entries(R4.SIGNS4).map(([k, inner]) => [`clipboard-${k}`, (sh) => D.clipboard(sh, { inner })])),
  paste: (sh) => R4.paste(sh),
  ...Object.fromEntries(['check', 'plus', 'minus', 'x'].map((k) => [`save-${k}`, (sh) => D.save(sh, { sign: R4.saveSign(D.INNER[k]) })])),
  'save-off': saveOff,
  blocks: (sh) => R4.blocksOut(sh),
  'blocks-2': (sh) => D.blocks(sh),
  hexagons: (sh) => R4.hexagons(sh),
  'flip-horizontal': (sh) => D.flip(sh, false),
  'flip-vertical': (sh) => D.flip(sh, true),
};
