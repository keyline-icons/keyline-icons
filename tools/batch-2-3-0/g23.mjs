// Stays batch, every style in both corners (29 Oct 2026, his "do two-tone, duotone, fill and sharp for all 30").
// Each drawing is rebuilt as a skeleton (vertices, fillet radii, kept arcs) so the sharp half comes from the same
// construction: fillets off as true vertices pulled back into the rounded box, free ends stubbed by the cap cut,
// ends landing on other ink left alone. Tones follow the shipped siblings: duotone a grey body with black detail
// (briefcase, door, house), fill the black body with detail cut out, two-tone the drawing over its plate. Open
// glyphs (ski, waves-ladder, wheelchair) design no fill: two-tone and duotone take the one-grey-part split.
//   node g23.mjs <outDir> [name...]: writes <outDir>/raw, never raw/ itself
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
const REPO = resolve(import.meta.dirname, '../..');
const G = await import(`${REPO}/tools/batch-2-2-0/g22.mjs`);
const { poly, stubEnds, inkOf, S, F, Pl, M, STY } = G;
const Lb = await import(`${REPO}/tools/batch-1-4-0/lib.mjs`);
const { add, sub, mul, len, unit, dot, cross, pt, onArc, circlePath, arcC } = Lb;
const Bo = await import(`${REPO}/tools/batch-1-4-0/bool.mjs`);
const { doc } = await import(`${REPO}/tools/batch-1-4-0/rawio.mjs`);
const D2 = await import('./kit.mjs');

const assert = (ok, m) => { if (!ok) throw new Error(m); };
const subs = (d) => d.split(/(?=M)/).filter(Boolean);
const isClosed = (d) => /Z\s*$/.test(d.trim());
const runs = (d) => Bo.runFromD(d);
const U = (...s) => Bo.union(...s.filter((x) => x && x.length));
const minus = (a, ...bs) => bs.filter((b) => b && b.length).reduce((acc, b) => Bo.subtract(acc, b), a);
const meet = (a, b) => Bo.intersect(a, b);
/** closed centre-line subpaths as regions */
const region = (d) => U(...subs(d).map((s) => [runs(isClosed(s) ? s : s + 'Z')[0]]));
/** a closed outline's painted silhouette, k beyond the centre line */
const grow = (d, k = 1) => U(...subs(d).map((s) => [Bo.grow(runs(isClosed(s) ? s : s + 'Z')[0], k)]));
// Bo.shrink returns a stray unit square on an all-straight polygon (a sharp outline): those are inset here,
// every edge moved k inward and neighbours met, which is the stroke's inner edge at a convex corner
function insetLines(s, k) {
  const n = s.match(/-?\d*\.?\d+/g).map(Number), P0 = [];
  for (let i = 0; i < n.length; i += 2) P0.push([n[i], n[i + 1]]);
  const P = P0.filter((p, i) => i === 0 || len(sub(p, P0[i - 1])) > 1e-9); if (len(sub(P[0], P.at(-1))) < 1e-9) P.pop();
  const m = P.length, A = P.reduce((a, p, i) => a + cross(p, P[(i + 1) % m]), 0), sg = Math.sign(A);
  const edge = (i) => { const a = P[i], b = P[(i + 1) % m], u = unit(sub(b, a)); return [add(a, mul([-u[1], u[0]], sg * k)), u]; };
  const q = P.map((_, i) => { const [p, u] = edge((i - 1 + m) % m), [r, w] = edge(i), den = cross(u, w); return Math.abs(den) < 1e-12 ? r : add(p, mul(u, cross(sub(r, p), w) / den)); });
  return 'M' + q.map(pt).join('L') + 'Z';
}
const shrink = (d, k = 1) => U(...subs(d).map((s) => { const c = isClosed(s) ? s : s + 'Z'; return [/C/.test(c) ? Bo.shrink(runs(c)[0], k) : runs(insetLines(c, k))[0]]; }));
/** the painted band of strokes: open runs as capsules, closed ones as rings */
const band = (d, sh) => U(...subs(d).map((s) => (isClosed(s) ? minus([Bo.grow(runs(s)[0])], shrink(s)) : [Bo.band(runs(s)[0], sh ? 'butt' : 'round')])));
const disc = (c, r) => [runs(circlePath(c, r))[0]];
/** a region's d, holes wound against their outline (nonzero and evenodd agree) */
function E(shape) {
  const polys = shape.map((r) => Bo.flat(r, 0.05));
  const or = shape.map((r, i) => {
    let depth = 0;
    polys.forEach((o, j) => { if (j === i) return; const ps = polys[i].filter((_, k) => k % 3 === 0); if (ps.filter((p) => Bo.winding(p, [o]) !== 0).length > ps.length / 2) depth++; });
    const want = depth % 2 === 0 ? 1 : -1;
    return Math.sign(Bo.area(r)) === want ? r : Bo.revRun(r);
  });
  return Bo.emitShape(or);
}
const L2 = (a, b) => `M${pt(a)}L${pt(b)}`;
/** a 2-tall band across at y, cut flush along a plate: stripes and straps in duotone, never a rule stopped short */
const strip = (y, plate) => meet([runs(`M-1 ${y - 1}L25 ${y - 1}L25 ${y + 1}L-1 ${y + 1}Z`)[0]], plate);
const ext = (a, b, k) => add(b, mul(unit(sub(b, a)), k));            // b pushed k further along a->b
const arcD = (c, r, a0, a1) => `M${pt(onArc(c, r, a0))}` + arcC(c, r, a0, a1);
const dots = (cs, r = 1) => cs.map((c) => circlePath(c, r)).join('');
const J = (...ds) => ds.filter(Boolean).join('');
/** a straight piece with its free ends stubbed in sharp (ends: [start free, end free]) */
const seg = (a, b, sh, R, ends = [true, true]) => poly([a, b], [0, 0], sh, R, { ends });
/** a divider whose ends sit on an outline's centre line, pulled in so its black stays 2 clear of the plate edge */
const inset = (a, b, sh) => { const k = sh ? 1 : 2, u = unit(sub(b, a)); return L2(add(a, mul(u, k)), sub(b, mul(u, k))); };

/* ------------------------------------------------------------------ registry */
const ICONS = {}, NOTES = [];
/**
 * def(name, build): build(sh, R) returns { stroke, 'two-tone', duotone, fill } as layer lists. The rounded stroke
 * runs first; its ink box R is what the sharp half must paint within (a cap-cut corner may stand 0.414 past).
 */
function def(name, build) {
  ICONS[name] = (sh) => {
    const reg = build(false, null);
    const R = inkOf(reg.stroke, false).map((v) => (Math.abs(v - Math.round(v)) < 0.02 ? Math.round(v) : v));
    const v = sh ? build(true, R) : reg;
    for (const s of STY) assert(v[s] && v[s].length, `${name} ${sh ? 'sharp' : 'regular'} has no ${s}`);
    return v;
  };
}
/** the usual object: two-tone is the stroke over its plate */
const styled = (strokeL, plate, duo, fill) => ({ stroke: strokeL, 'two-tone': [Pl(E(plate)), ...strokeL], duotone: duo, fill });

/* ===================================================================== drawings */
// air-vent: grey body, black slot and air hooks; fill cuts the slot. The body is open at the bottom in stroke:
// the plate under the drawing stops on the chord, the silhouette closes flat a unit below it.
def('air-vent', (sh, R) => {
  const body = poly([[19, 13], [22, 13], [22, 3], [2, 3], [2, 13], [5, 13]], [0, 3, 3, 3, 3, 0], sh, R);
  const vent = seg([6, 9], [18, 9], sh, R);
  const hooks = J(stubEnds('M14 13L14 19' + arcC([16, 19], 2, 180, 0) + 'L18 18', sh ? 'both' : 'none', R), stubEnds('M9.5 13L9.5 17' + arcC([7.5, 17], 2, 0, 180), sh ? 'both' : 'none', R));
  const shut = poly([[2, 3], [22, 3], [22, 13], [2, 13]], [3, 3, 3, 3], sh, R, { closed: true });
  // the open mouth's plate runs to the line's outer edge across the gap (his ruling 29 Oct: grey ends where the black ends,
  // not on the centre line between the caps), which is the closed silhouette
  const sil = grow(shut);
  const strokeL = [S(J(body, vent, hooks))];
  return { stroke: strokeL, 'two-tone': [Pl(E(sil)), ...strokeL], duotone: [Pl(E(sil)), S(J(vent, hooks))], fill: [F(E(minus(sil, band(vent, sh)))), S(hooks)] };
});

// barn: grey body; the door a black panel with the brace a grey cut through it, the window a black square (Hugeicons'
// bulk barn); fill opens the door to the ground with the brace across it and cuts the window out
def('barn', (sh, R) => {
  const pts = (ay) => [[2, 22], [2, 10], [6, 5], [12, ay], [18, 5], [22, 10], [22, 22]];
  const ay = D2.solve(-1, 3, (v) => inkOf([S(poly(pts(v), [1, 1, 1, 1, 1, 1, 1], false, null, { closed: true }))], false)[1] - 1);
  const out = poly(pts(ay), [1, 1, 1, 1, 1, 1, 1], sh, R, { closed: true });
  const doorPts = [[8, 22], [8, 16], [16, 16], [16, 22]];
  const door = poly(doorPts, [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const braceEnd = sh ? [8, 16] : onArc([8.5, 16.5], 0.5, 225);
  const brace = L2([16, 22], braceEnd), win = poly([[10, 8], [14, 8], [14, 12], [10, 12]], [1, 1, 1, 1], sh, R, { closed: true });
  // the doorway runs on below the ground and the silhouette cuts it, so its feet are square (his ruling 29 Oct:
  // "bottom parts radii should be 0"); the brace runs past both corners and the panel's edges cut it flush at each end
  // (a round cap left inside the corner bulged past it)
  const sil = grow(out), hole = meet(grow(poly([[8, 25], [8, 16], [16, 16], [16, 25]], [0, 0.5, 0.5, 0], sh, R, { closed: true })), sil);
  const braceCut = L2(ext([16, 22], [8, 16], 2), ext([8, 16], [16, 22], 2));
  return styled([S(J(out, door, brace, win))], sil, [Pl(E(sil)), F(E(U(minus(hole, band(braceCut, sh)), grow(win))))],
    [F(E(minus(sil, minus(hole, band(braceCut, sh)), grow(win))))]);
});

// bath: grey tub, black tap and feet; fill the tub solid
def('bath', (sh, R) => {
  const tub = poly([[3, 11], [3, 19], [21, 19], [21, 11]], [0, 4, 4, 0], sh, R, { ends: [false, false] });
  const shut = poly([[3, 11], [3, 19], [21, 19], [21, 11]], [0, 4, 4, 0], sh, R, { closed: true });
  const rim = seg([2, 11], [22, 11], sh, R);
  const feet = J(seg([8, 19], [7, 21], sh, R, [false, true]), seg([16, 19], [17, 21], sh, R, [false, true]));
  const tap = 'M3 11L3 6' + arcC([6, 6], 3, 180, 360 + Math.atan2(-1.5616, 2.5616) * 180 / Math.PI);
  const head = seg([7.5, 5.5], [10, 3], sh, R);
  const sil = U(grow(shut), band(rim, sh));
  return styled([S(J(tub, rim, feet, tap, head))], grow(shut), [Pl(E(sil)), S(J(tap, head, feet))], [F(E(sil)), S(J(tap, head, feet))]);
});

// bottle-pump: grey bottle, black pump (collar solid, stem and head stroked); fill one silhouette under the pump's lines
def('bottle-pump', (sh, R) => {
  const body = poly([[6, 11], [18, 11], [18, 22], [6, 22]], [3, 3, 3, 3], sh, R, { closed: true });
  const collar = poly([[9, 11], [9, 7], [15, 7], [15, 11]], [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const collarR = poly([[9, 11], [9, 7], [15, 7], [15, 11]], [0, 0.5, 0.5, 0], sh, R, { closed: true });
  const stem = L2([12, 2], [12, 7]);
  const head = stubEnds('M9 2L13.1716 2C14.9826 2 16.7194 2.7194 18 4', sh ? 'both' : 'none', R);
  return styled([S(J(body, collar, stem, head))], U(grow(body), grow(collarR)), [Pl(E(grow(body))), F(E(grow(collarR))), S(J(stem, head))],
    [F(E(U(grow(body), grow(collarR)))), S(J(stem, head))]);
});

// caravan: grey body and hitch; window and door black panels inside the wall's inner edge, the door bitten 2 clear of
// the wheel, the wheel a black ring; fill cuts the same panels out, the hub open
def('caravan', (sh, R) => {
  const outline = poly([[6, 18], [2, 18], [2, 4], [19, 4], [19, 18], [10, 18]], [0, 2, 2, 4, 2, 0], sh, R, { ends: [false, false] });
  const shut = poly([[2, 4], [19, 4], [19, 18], [2, 18]], [2, 4, 2, 2], sh, R, { closed: true });
  const door = poly([[10, 18], [10, 8], [15, 8], [15, 18]], [0, 1, 1, 0], sh, R, { ends: [false, false] });
  const win = poly([[2, 8], [6, 8], [6, 12], [2, 12]], [0, 1.5, 1.5, 0], sh, R, { ends: [false, false] });
  const wheel = circlePath([8, 18], 2), hitch = seg([19, 14], [22, 14], sh, R, [false, true]);
  const sil = U(grow(shut), band(hitch, sh));
  const inner = shrink(shut);
  const winP = meet(grow(poly([[2, 8], [6, 8], [6, 12], [2, 12]], [0, 1.5, 1.5, 0], sh, R, { closed: true })), inner);
  const doorP = minus(meet(grow(poly([[10, 18], [10, 8], [15, 8], [15, 18]], [0, 1, 1, 0], sh, R, { closed: true })), inner), disc([8, 18], 5));
  const panels = U(winP, doorP);
  return styled([S(J(outline, door, win, wheel, hitch))], grow(shut), [Pl(E(sil)), F(E(panels)), S(wheel)],
    [F(E(minus(U(sil, band(wheel, sh)), disc([8, 18], 1), panels)))]);
});

// castle: grey walls, the doorway a black arch to the ground; fill opens it (the wall line stays a stroke-only line)
def('castle', (sh, R) => {
  const walls = poly([[2, 8], [2, 21], [22, 21], [22, 8]], [0, 2, 2, 0], sh, R);
  const wl = L2([2, 10], [22, 10]);
  const towers = J(seg([6, 10], [6, 3], sh, R, [false, true]), seg([18, 10], [18, 3], sh, R, [false, true]), L2([6, 5], [18, 5]), seg([12, 5], [12, 3], sh, R, [false, true]));
  const doorD = 'M15 21L15 16.5C15 15.3954 13.1046 14 12 14C10.8954 14 9 15.3954 9 16.5L9 21';
  const low = poly([[2, 10], [22, 10], [22, 21], [2, 21]], [0, 0, 2, 2], sh, R, { closed: true }), keep = 'M6 5L18 5L18 10L6 10Z';
  const stubs = J(seg([2, 10], [2, 8], sh, R, [false, true]), seg([22, 10], [22, 8], sh, R, [false, true]), seg([6, 5], [6, 3], sh, R, [false, true]), seg([18, 5], [18, 3], sh, R, [false, true]), seg([12, 5], [12, 3], sh, R, [false, true]));
  const sil = U(grow(low), grow(keep), band(stubs, sh)), hole = meet(grow(doorD.replace(/L15 21$/, 'L15 25').replace(/^M15 21/, 'M15 25').replace(/L9 21$/, 'L9 25') + 'Z'), sil);   // square feet: run on below the ground, cut by the silhouette
  return styled([S(J(walls, wl, towers, doorD))], U(grow(low), grow(keep)), [Pl(E(sil)), F(E(hole))], [F(E(minus(sil, hole)))]);
});

// cigarette: grey body, black ember and smoke; fill the body solid
const CIG = (sh, R) => {
  const body = poly([[2, 16], [18, 16], [18, 21], [2, 21]], [1.5, 0.5, 0.5, 1.5], sh, R, { closed: true });
  const ember = seg([22, 16], [22, 21], sh, R);
  const p1 = stubEnds('M18 12L13.5 12' + arcC([13.5, 7.5], 4.5, 90, 250), sh ? 'both' : 'none', R);
  // the second plume as one run through its corner at 19,7.5: two butt ends meeting there left the corner notched
  const p2 = stubEnds('M16 3' + arcC([16, 6], 3, -90, 0) + 'L19 7.5' + arcC([19, 10.5], 3, 270, 360) + 'L22 12', sh ? 'both' : 'none', R);
  const p3 = seg([19, 7.5], [17.5, 7.5], sh, R, [false, true]);
  return { body, ember, smoke: J(p1, p2, p3) };
};
def('cigarette', (sh, R) => {
  const c = CIG(sh, R), sil = grow(c.body);
  return styled([S(J(c.body, c.ember, c.smoke))], sil, [Pl(E(sil)), S(J(c.ember, c.smoke))], [F(E(sil)), S(J(c.ember, c.smoke))]);
});
// cigarette-off, the house -off: slash M2 2L22 22 (sharp M1.7071 1.7071L22.2929 22.2929), the base kept where u = x - y
// <= 0 or >= 4 sqrt 2; far cut ends stubbed toward the slash in sharp, near ends buried on it. Two-tone: near full, far
// muted; duotone all grey but the slash; fill the cut fill under the slash.
def('cigarette-off', (sh, R) => {
  const c = CIG(sh, R), K = 4 * Math.SQRT2, far = (p) => p[0] - p[1] >= K - 1e-3;
  // sharp free ends start a unit longer, so a piece rounded drops at 0.5 is kept at 1.5 there, never as a sharp-only fragment
  const cut = (d) => D2.cutWhere(d, ([x, y]) => x - y > 1e-9 && x - y < K - 1e-9, sh ? 1.5 : 0.5);
  const stubFar = (d) => (sh ? subs(d).map((s) => { const n = s.match(/-?\d*\.?\d+/g).map(Number), a = [n[0], n[1]], b = [n.at(-2), n.at(-1)]; const w = Math.abs(a[0] - a[1] - K) < 1e-3 && Math.abs(b[0] - b[1] - K) < 1e-3 ? 'both' : Math.abs(a[0] - a[1] - K) < 1e-3 ? 'start' : Math.abs(b[0] - b[1] - K) < 1e-3 ? 'end' : null; return w ? stubEnds(s, w, R) : s; }).join('') : d);
  const slash = sh ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
  // a piece whose every point lies within a unit of the slash's centre line hides under it (the plume's arc dips 0.2
  // past it): a fragment straddling the slash, dropped
  const buried = (s) => (s.match(/-?\d*\.?\d+/g).map(Number).reduce((m, v, i, a) => (i % 2 ? Math.max(m, Math.abs(a[i - 1] - v)) : m), 0)) < 1.4;
  const pieces = subs(stubFar(cut(J(c.body, c.ember, c.smoke)))).filter((s) => !buried(s)), farD = pieces.filter((s) => { const n = s.match(/-?\d*\.?\d+/g).map(Number); return far([n[0], n[1]]); }).join(''), nearD = pieces.filter((s) => !farD.includes(s)).join('');
  const nearHalf = [runs('M-10 -10L-10 40L40 40Z')[0]];                    // u <= 0
  const bodyS = meet(grow(c.body), nearHalf);
  return { stroke: [S(J(nearD, farD, slash))], 'two-tone': [Pl(E(bodyS)), S(nearD), M(farD), S(slash)], duotone: [Pl(E(bodyS)), M(farD), S(slash)], fill: [F(E(bodyS)), S(J(farD, slash))] };
});

// the carafe pair: filter cone grey, carafe black, handle grey; fill one solid under the handle's line
const carafe = (sh, cone, body, bodyS, handle, R) => {
  const coneR = poly(cone, [1, 1, 0, 0], sh, R, { closed: true });
  const bodyD = sh ? poly(bodyS, bodyS.map(() => 0), true, R, { closed: true }) : body;
  return { coneR, bodyD, handle, plate: U(grow(coneR), grow(bodyD)) };
};
// coffee-maker: the machine grey around it
def('coffee-maker', (sh, R) => {
  const k = carafe(sh, [[7, 11], [18, 11], [16, 15], [9, 15]],
    'M9 15L7.4 18L7.17647 18.5588C7.05989 18.8503 7 19.1613 7 19.4752C7 20.4097 7.528 21.264 8.36387 21.6819L8.44721 21.7236C8.81074 21.9054 9.2116 22 9.61803 22L15.382 22C15.7884 22 16.1893 21.9054 16.5528 21.7236L16.6361 21.6819C17.472 21.264 18 20.4097 18 19.4752C18 19.1613 17.9401 18.8503 17.8235 18.5588L17.6 18L16 15Z',
    [[9, 15], [7.4, 18], [7, 19.5], [9.5, 22], [15.5, 22], [18, 19.5], [17.6, 18], [16, 15]],
    poly([[15, 11], [21, 11], [21, 15]], [0, 3, 0], sh, R, { ends: [false, true] }), R);
  const head = poly([[3, 6], [3, 2], [19, 2], [20.5, 6]], [0, 1, 1, 1], sh, R, { closed: true });
  const stand = poly([[3, 6], [3, 22], [20, 22]], [0, 1, 0], sh, R, { ends: [false, true] });
  const strokeD = J(k.coneR, k.bodyD.replace(/Z$/, ''), k.handle, stand, head);
  const machine = U(grow(head), band(stand, sh));
  return styled([S(strokeD)], U(grow(head), k.plate), [Pl(E(U(machine, grow(k.coneR), band(k.handle, sh)))), F(E(meet(grow(k.bodyD), [runs('M-1 -1L25 -1L25 21L-1 21Z')[0]])))],   // the pot stands on the base (ink top 21), not over it
    [F(E(U(machine, k.plate))), S(k.handle)]);
});
def('coffee-pot', (sh, R) => {
  const k = carafe(sh, [[3, 4], [17, 4], [14.2, 9], [5.8, 9]],
    'M5.8 9L3.56 13.7143L3.33276 14.236C3.11328 14.7399 3 15.2837 3 15.8333L3 16.4189C3 17.9603 3.98635 19.3288 5.44868 19.8162C5.81384 19.9379 6.19623 20 6.58114 20L13.4189 20C13.8038 20 14.1862 19.9379 14.5513 19.8162C16.0136 19.3288 17 17.9603 17 16.4189L17 15.8333C17 15.2837 16.8867 14.7399 16.6672 14.236L16.44 13.7143L14.2 9Z',
    [[5.8, 9], [3.56, 13.7143], [3, 15], [3, 17], [6, 20], [14, 20], [17, 17], [17, 15], [16.44, 13.7143], [14.2, 9]],
    poly([[15, 4], [21, 4], [21, 11]], [0, 4, 0], sh, R, { ends: [false, true] }), R);
  const strokeD = J(k.coneR, k.bodyD.replace(/Z$/, ''), k.handle);
  return styled([S(strokeD)], k.plate, [Pl(E(U(grow(k.coneR), band(k.handle, sh)))), F(E(grow(k.bodyD)))], [F(E(k.plate)), S(k.handle)]);
});

// concierge-bell: grey dome, black base, stem and knob; fill one bell
def('concierge-bell', (sh, R) => {
  const base = poly([[2, 15], [22, 15], [22, 21], [2, 21]], [2, 2, 2, 2], sh, R, { closed: true });
  const dome = 'M4 15' + arcC([12, 15], 8, 180, 360), knob = J(L2([12, 7], [12, 3]), seg([9, 3], [15, 3], sh, R));
  const domeR = grow(dome + 'Z');
  return styled([S(J(base, dome, knob))], U(domeR, grow(base)), [Pl(E(domeR)), F(E(grow(base))), S(knob)], [F(E(U(domeR, grow(base)))), S(knob)]);
});

// cooking-pot: grey pot, black lid; fill both solid, 2 apart
def('cooking-pot', (sh, R) => {
  const pot = poly([[4, 11], [4, 21], [20, 21], [20, 11]], [0, 3, 3, 0], sh, R, { ends: [false, false] });
  const potR = poly([[4, 11], [4, 21], [20, 21], [20, 11]], [0, 3, 3, 0], sh, R, { closed: true });
  const rim = seg([2, 11], [22, 11], sh, R), lid = seg([4, 7], [20, 7], sh, R);
  const knob = poly([[8, 7], [8, 3], [16, 3], [16, 7]], [0, 3, 3, 0], sh, R, { ends: [false, false] });
  const knobR = poly([[8, 7], [8, 3], [16, 3], [16, 7]], [0, 3, 3, 0], sh, R, { closed: true });
  const potS = U(grow(potR), band(rim, sh)), lidS = U(grow(knobR), band(lid, sh));
  return styled([S(J(pot, rim, lid, knob))], U(grow(potR), grow(knobR)), [Pl(E(potS)), F(E(lidS))], [F(E(U(potS, lidS)))]);
});

// ev-charger: grey post and ground, black bolt, cable and plug; fill cuts the bolt
def('ev-charger', (sh, R) => {
  const body = poly([[2, 2], [14, 2], [14, 22], [2, 22]], [3, 3, 0, 0], sh, R, { closed: true });
  const ground = seg([14, 22], [22, 22], sh, R, [false, true]);
  const cable = poly([[14, 17], [20, 17], [20, 10]], [0, 2, 0], sh, R, { ends: [false, false] });
  const plug = poly([[18, 6], [22, 6], [22, 10], [18, 10]], [0, 0, 1.5, 1.5], sh, R, { closed: true });
  const prongs = J(seg([22, 6], [22, 4], sh, R, [false, true]), seg([18, 6], [18, 4], sh, R, [false, true]));
  const bolt = poly([[9, 8], [6, 12], [10, 12], [7, 16]], [0, 0, 0, 0], sh, R);
  const bodyS = U(grow(body), band(ground, sh));
  return styled([S(J(body, ground, cable, plug, prongs, bolt))], U(grow(body), grow(plug)), [Pl(E(bodyS)), S(J(bolt, cable, prongs)), F(E(grow(plug)))],
    [F(E(U(minus(bodyS, band(bolt, sh)), grow(plug)))), S(J(cable, prongs))]);
});

// grill: grey kettle and legs, black wheel and heat; the bowl is open at the top, so fill and duotone hold the coals'
// level at y 12, the waves' 2 clear: their round ends paint to y 10 (y 11 measured the 2 from the centre line and left
// 1 of daylight; found by the graduation check, 30 Oct)
def('grill', (sh, R) => {
  const rf = 1, D = Math.PI / 180;
  const bowlR = (Rr) => { const F0 = [12 - Math.sqrt((Rr - rf) ** 2 - rf * rf), 6 + rf], Fr = [24 - F0[0], F0[1]], ang = Math.atan2(F0[1] - 6, F0[0] - 12) / D; return `M4.5 6L${pt([F0[0], 6])}` + arcC(F0, rf, 270, ang) + arcC([12, 6], Rr, ang, 180 - ang) + arcC(Fr, rf, 180 - ang, -90) + 'L19.5 6'; };
  const Rr = sh ? 9 : D2.solve(8.5, 9.5, (v) => inkOf([S(bowlR(v))], false)[0] - 2);
  const bowl = sh ? stubEnds('M4.5 6L3 6' + arcC([12, 6], 9, 180, 0) + 'L19.5 6', 'both', R) : bowlR(Rr);
  const yAt = (x) => 6 + Math.sqrt(Rr * Rr - (x - 12) ** 2);
  const W = [5, 20], u = unit([2, -3.5]), lt = (t) => add(W, mul(u, t));
  const tTop = D2.solve(2, 12, (t) => { const p = lt(t); return p[1] - yAt(p[0]); });
  const rTop = [15, yAt(15)], xLeg = (y) => rTop[0] + ((y - rTop[1]) * (18 - rTop[0])) / (22 - rTop[1]);
  const legs = J(L2(lt(2), lt(tTop)), seg(rTop, [18, 22], sh, R, [false, true]), L2([7, 20], [xLeg(20), 20]));
  const S1 = (x) => stubEnds(`M${x} 9L${x} 8.80278C${x} 7.62728 ${x + 0.34795} 6.47808 ${x + 1} 5.5C${x + 1.6521} 4.52192 ${x + 2} 3.37272 ${x + 2} 2.19722L${x + 2} 2`, sh ? 'both' : 'none', R);
  const heat = J(S1(8.5), S1(13.5)), wheel = circlePath([5, 20], 2);
  const inside = region(`M${pt([12 - Rr, 6])}` + arcC([12, 6], Rr, 180, 0) + 'Z');
  const coals = U(band(bowl, sh), meet(inside, [runs('M0 12L24 12L24 24L0 24Z')[0]]));
  const greyD = U(coals, band(legs, sh));
  // two-tone: the bowl closed across its mouth and grown, so the grey ends flush with the lips' outer edge
  return styled([S(J(bowl, wheel, legs, heat))], grow(bowl), [Pl(E(greyD)), S(J(wheel, heat))],
    [F(E(minus(U(coals, band(wheel, sh)), disc([5, 20], 1)))), S(J(legs, heat))]);
});

// lighthouse: grey tower, gallery and ground, black lantern, stripes and beams; fill lights the lantern's window and
// cuts the tower apart along the stripes
def('lighthouse', (sh, R) => {
  const lantern = poly([[9, 9], [9, 5], [12, 1.451], [15, 5], [15, 9]], [0, 0, 1, 0, 0], sh, R, { closed: true });
  const roofLine = L2([9, 5], [15, 5]), gallery = seg([7, 9], [17, 9], sh, R);
  const tower = 'M9 9L7 22M15 9L17 22', ground = seg([4, 22], [20, 22], sh, R);
  const wx = (y) => 9 - (2 * (y - 9)) / 13, stripe = (y) => [[wx(y), y], [24 - wx(y), y]];
  const stripes = J(L2(...stripe(13)), L2(...stripe(17.5)));
  const rays = J(seg([22, 3], [20, 4], sh, R), seg([20, 14], [22, 15], sh, R), seg([21, 9], [22, 9], sh, R), seg([2, 3], [4, 4], sh, R), seg([4, 14], [2, 15], sh, R), seg([3, 9], [2, 9], sh, R));
  const towerR = 'M9 9L15 9L17 22L7 22Z';
  const sil = U(grow(towerR), band(gallery, sh), band(ground, sh));
  // duotone: the stripes black bands flush with the tower; fill: the tower cut into three pieces along them, each
  // piece the slice of the tower's centre-line region grown, so the cut corners round like the outline's
  const win = shrink('M9 5L15 5L15 9L9 9Z'), towerS = grow(towerR);
  const slice = (y0, y1) => grow(`M${pt([wx(y0), y0])}L${pt([24 - wx(y0), y0])}L${pt([24 - wx(y1), y1])}L${pt([wx(y1), y1])}Z`);
  const pieces = U(slice(9, 11), slice(15, 15.5), slice(19.5, 22), band(gallery, sh), band(ground, sh), grow(lantern));
  return styled([S(J(lantern, roofLine, gallery, tower, stripes, ground, rays))], U(towerS, grow(lantern)), [Pl(E(sil)), F(E(U(grow(lantern), strip(13, towerS), strip(17.5, towerS)))), S(rays)],
    [F(E(minus(pieces, win))), S(rays)]);
});

// luggage (his drawing of the fill, 29 Oct): one body, the strap a band 2 short of each wall, black on the grey in
// duotone, cut out of the fill; feet black, handle a stroke
def('luggage', (sh, R) => {
  const body = poly([[5, 6], [19, 6], [19, 20], [5, 20]], [2, 2, 2, 2], sh, R, { closed: true });
  const strap = L2([5, 11], [19, 11]), feet = J(seg([7, 20], [7, 22], sh, R, [false, true]), seg([17, 20], [17, 22], sh, R, [false, true]));
  const handle = poly([[8, 6], [9, 2], [15, 2], [16, 6]], [0, 2, 2, 0], sh, R, { ends: [false, false] });
  const bodyS = grow(body);
  const cutL = inset([5, 11], [19, 11], sh);
  return styled([S(J(body, strap, feet, handle))], bodyS, [Pl(E(U(bodyS, band(handle, sh)))), S(J(cutL, feet))], [F(E(minus(bodyS, band(cutL, sh)))), S(J(handle, feet))]);
});

// microwave: grey body, the window a black panel, buttons and feet black; fill cuts the window and buttons out
def('microwave', (sh, R) => {
  const body = poly([[2, 3], [22, 3], [22, 19], [2, 19]], [3, 3, 3, 3], sh, R, { closed: true });
  const feet = J(seg([6, 19], [6, 21], sh, R, [false, true]), seg([18, 19], [18, 21], sh, R, [false, true]));
  const win = poly([[6, 7], [14, 7], [14, 15], [6, 15]], [2, 2, 2, 2], sh, R, { closed: true });
  const btn = dots([[18, 9], [18, 13]]);
  const sil = grow(body);
  return { stroke: [S(J(body, feet, win)), F(btn)], 'two-tone': [Pl(E(sil)), S(J(body, feet, win)), F(btn)], duotone: [Pl(E(sil)), F(E(grow(win))), F(btn), S(feet)],
    fill: [F(E(minus(sil, grow(win), disc([18, 9], 1), disc([18, 13], 1)))), S(feet)] };
});

// oven: one body, as his luggage fill: the divider a band 2 short of each wall, handle and knobs; black on the grey in
// duotone, cut out of the fill. 16 x 20 on the centre line (30 Oct graduation check): his 18 x 20 painted 20 x 22, a
// square-cornered box the linter classes square and the house draws 20; the walls came in a unit each, which puts the
// top fillets' centres on the outer knobs and leaves every knob its 2
def('oven', (sh, R) => {
  const body = poly([[4, 2], [20, 2], [20, 22], [4, 22]], [4, 4, 2, 2], sh, R, { closed: true });
  const div = L2([4, 10], [20, 10]), handle = seg([9, 14], [15, 14], sh, R);
  const knobs = dots([[8, 6], [12, 6], [16, 6]]), sil = grow(body);
  const cutL = inset([4, 10], [20, 10], sh);
  return { stroke: [S(J(body, div, handle)), F(knobs)], 'two-tone': [Pl(E(sil)), S(J(body, div, handle)), F(knobs)], duotone: [Pl(E(sil)), S(J(cutL, handle)), F(knobs)],
    fill: [F(E(minus(sil, band(cutL, sh), band(handle, sh), disc([8, 6], 1), disc([12, 6], 1), disc([16, 6], 1))))] };
});

// refrigerator (ours): one body, as his luggage fill: the divider a band 2 short of each wall, handles; black on the
// grey in duotone, cut out of the fill
def('refrigerator', (sh, R) => {
  const body = poly([[5, 2], [19, 2], [19, 22], [5, 22]], [3, 3, 3, 3], sh, R, { closed: true });
  const hTop = seg([9, 6], [9, 7], sh, R), hBot = seg([9, 15], [9, 18], sh, R), handles = J(hTop, hBot), sil = grow(body);
  const cutL = inset([5, 11], [19, 11], sh);
  return styled([S(J(body, L2([5, 11], [19, 11]), handles))], sil, [Pl(E(sil)), S(J(cutL, handles))], [F(E(minus(sil, band(cutL, sh), band(handles, sh))))]);
});

// sailboat: grey sails, black hull and mast; fill both solid
def('sailboat', (sh, R) => {
  const hullP = (dx) => [[2 - dx, 16], [22 + dx, 16], [18, 22], [6, 22]];
  const dx = D2.solve(-1, 3, (v) => inkOf([S(poly(hullP(v), [1, 1, 6, 6], false, null, { closed: true }))], false)[0] - 1);
  const mainP = (ay) => [[12, ay], [20, 12], [12, 12]];
  const ay = D2.solve(0, 3, (v) => inkOf([S(poly(mainP(v), [0.5, 1, 0], false, null, { closed: true }))], false)[1] - 1);
  const hull = poly(hullP(dx), [1, 1, 6, 6], sh, R, { closed: true, pull: ['out', 'in'] }), main = poly(mainP(ay), [0.5, 1, 0], sh, R, { closed: true, pull: ['in'] });   // the sharp peak slides down the mast, not off it
  const jib = poly([[12, 5], [5, 12], [12, 12]], [0, 1, 0], sh, R, { ends: [false, false] }), jibR = poly([[12, 5], [5, 12], [12, 12]], [0, 1, 0], sh, R, { closed: true });
  // the two sails share the mast: unioned they read as one triangle, so duotone draws the mast black between them.
  // Fill (his reference, 29 Oct): three separate solids. The main keeps the mast as its edge; the jib is the part of
  // a 45-degree triangle with its vertical edge 2 clear of it; no lower mast, so the sails stand 2 off the deck
  const mast = L2([12, 12], [12, 16]), sails = U(grow(main), grow(jibR));
  const jibPiece = grow(poly([[8, 7], [3, 12], [8, 12]], [0.5, 1, 0.5], sh, R, { closed: true }));   // cut from the drawn jib it was a 3-unit nub: a 5-unit jib on the same 45 degrees
  return styled([S(J(hull, main, jib, mast))], U(sails, grow(hull)), [Pl(E(sails)), F(E(grow(hull))), S(seg([12, 5], [12, 16], sh, R, [true, false]))],
    [F(E(U(grow(main), jibPiece, grow(hull))))]);
});

// shower-head (ours): grey head and arm, black drops; fill the head solid under the arm's line
def('shower-head', (sh, R) => {
  const arm = stubEnds('M4 22L4 7' + arcC([9, 7], 5, 180, 360), sh ? 'start' : 'none', R);
  const head = 'M8 13' + arcC([14, 13], 6, 180, 360) + 'Z';
  const drops = dots([[10, 17], [14, 17], [18, 17], [12, 21], [16, 21]]);
  const headS = grow(head);
  return { stroke: [S(J(arm, head)), F(drops)], 'two-tone': [Pl(E(headS)), S(J(arm, head)), F(drops)], duotone: [Pl(E(U(headS, band(arm, sh)))), F(drops)], fill: [F(E(headS)), S(arm), F(drops)] };
});

// ski (ours), an open glyph: skis grey, skier black; fill is the stroke
def('ski', (sh, R) => {
  // sharp: the skis' butt corner leaned 0.15 under the box; their right end is lowered until it lands on it
  const ye = sh ? D2.solve(20, 21.5, (v) => inkOf([S(seg([3, 17], [21, v], true, R))], true)[3] - R[3]) : 21;
  const yS = (x) => 17 + ((x - 3) * (ye - 17)) / 18;
  const body = poly([[13, 9], [9, 13], [14, 16], [11, yS(11)]], [0, 1, 1, 0], sh, R, { ends: [true, false] });
  const arm = seg([12, 10], [16, 12], sh, R, [false, true]), skis = seg([3, 17], [21, ye], sh, R), head = circlePath([15, 4], 2);
  const st = [S(J(body, arm, skis)), F(head)], split = [M(skis), S(J(body, arm)), F(head)];
  return { stroke: st, 'two-tone': split, duotone: split, fill: st };
});

// soap-dispenser-droplet: the bottle grey round a bite 2 clear of the droplet, pump and droplet black
def('soap-dispenser-droplet', (sh, R) => {
  const body = poly([[7, 11], [4, 11], [4, 22], [10, 22]], [0, 3, 3, 0], sh, R, { ends: [false, true] });
  const collarR = poly([[7, 11], [7, 7], [13, 7], [13, 11]], [0, 0.5, 0.5, 0], sh, R, { closed: true });
  const stem = L2([10, 2], [10, 7]), head = stubEnds('M7 2L11.1716 2C12.9826 2 14.7194 2.7194 16 4', sh ? 'both' : 'none', R);
  const r = 3.25, c = [20 - r, 22 - r], a = 36.87, tr = onArc(c, r, -a), tl = onArc(c, r, 180 + a), V = [c[0], c[1] - r / Math.sin((a * Math.PI) / 180)];
  const drop = sh ? `M${pt(tr)}` + arcC(c, r, -a, 180 + a) + `L${pt(V)}Z` : (() => { const k = D2.corner(tl, V, tr, 0.5); return `M${pt(tr)}` + arcC(c, r, -a, 180 + a) + `L${pt(k.T1)}` + k.arcs + 'Z'; })();
  const bottle = poly([[4, 11], [16, 11], [16, 22], [4, 22]], [3, 3, 3, 3], sh, R, { closed: true });
  const bottleS = minus(grow(bottle), grow(drop, 3)), pump = U(grow(collarR));
  return { stroke: [S(J(body, collarR, stem, head, drop))], 'two-tone': [Pl(E(U(pump, grow(drop)))), S(J(body, collarR, stem, head, drop))],   // the bottle's side is open in the stroke: no plate past the line
    duotone: [Pl(E(bottleS)), F(E(U(pump, grow(drop)))), S(J(stem, head))], fill: [F(E(U(bottleS, pump, grow(drop)))), S(J(stem, head))] };
});

// spray-can: grey can, black cap and spray; fill can and cap one solid
def('spray-can', (sh, R) => {
  const can = poly([[12, 9], [22, 9], [22, 22], [12, 22]], [3, 3, 3, 3], sh, R, { closed: true });
  const cap = poly([[15, 9], [15, 4], [19, 5], [19, 9]], [0, 0.5, 1, 0], sh, R, { ends: [false, false] });
  const capR = poly([[15, 9], [15, 4], [19, 5], [19, 9]], [0, 0.5, 1, 0], sh, R, { closed: true });
  const spray = dots([[2, 2], [2, 6], [2, 10], [6, 4], [6, 8], [10, 6]]);
  return { stroke: [S(J(can, cap)), F(spray)], 'two-tone': [Pl(E(U(grow(can), grow(capR)))), S(J(can, cap)), F(spray)], duotone: [Pl(E(grow(can))), F(E(grow(capR))), F(spray)],
    fill: [F(E(U(grow(can), grow(capR)))), F(spray)] };
});

// stroller (ours): grey basket and handle, black hood and wheels; fill basket and hood one solid, hubs open
def('stroller', (sh, R) => {
  const basket = poly([[3, 9], [19, 9], [19, 14], [3, 14]], [0, 0, 4, 4], sh, R, { closed: true });
  const hood = 'M3 9' + arcC([10, 9], 7, 180, 270) + 'L10 9';
  const handle = poly([[19, 9], [20, 4], [21, 4]], [0, 1, 0], sh, R, { ends: [false, true] });
  const wheels = J(circlePath([7, 20], 2), circlePath([15, 20], 2));
  const hoodS = grow(hood + 'Z'), baskS = grow(basket);
  return styled([S(J(basket, hood, handle, wheels))], U(baskS, hoodS), [Pl(E(U(baskS, band(handle, sh)))), F(E(hoodS)), S(wheels)],
    [F(E(minus(U(baskS, hoodS, band(wheels, sh)), disc([7, 20], 1), disc([15, 20], 1)))), S(handle)]);
});

// tent: grey tent and ground, black pole and flap reaching the ground; fill opens the doorway and cuts the pole
def('tent', (sh, R) => {
  const sideP = (ay) => [[3, 21], [12, ay], [21, 21]];
  const ay = D2.solve(0, 4, (v) => inkOf([S(poly(sideP(v), [0, 1, 0], false, null))], false)[1] - 2);
  const sides = poly(sideP(ay), [0, 1, 0], sh, R, { ends: [false, false] });
  const apexY = sh ? Number(sides.match(/L(-?[\d.]+) (-?[\d.]+)L/)[2]) : ay;
  const half = Math.atan(9 / (21 - apexY)), top = sh ? apexY : ay + 1 / Math.sin(half) - 1;
  const yF = 21 - (4 * (21 - apexY)) / 9;
  const ground = seg([2, 21], [22, 21], sh, R), pole = L2([12, top], [12, 21]), flap = L2([12, yF], [16, 21]);
  const tri = poly(sideP(ay), [0, 1, 0], sh, R, { closed: true }), sil = U(grow(tri), band(ground, sh));
  const xF = 12 + (4 * (25 - yF)) / (21 - yF), hole = meet(grow(`M12 ${yF}L${xF} 25L12 25Z`), sil);   // square feet, as castle's
  // the doorway a solid: black in duotone, open in fill (Hugeicons' tent); the pole above it is stroke-only
  const doorway = hole;
  return styled([S(J(sides, ground, pole, flap))], grow(tri), [Pl(E(sil)), F(E(doorway))], [F(E(minus(sil, doorway)))]);
});

// vault: grey body, black door ring, hinge (stopped 2 clear) and handle; fill cuts the ring and handle, hinge solid
// vault: grey body, the door a black panel; fill as the drawing's door parted by a white ring
// 18 x 18 on the centre line (30 Oct graduation check): his 20 x 18 painted 22 x 20, a square-cornered box the linter
// classes square and the house draws 20. The left wall came in a unit and the door a unit each side to keep its 2 off
// the walls; the handle moved a unit with the door's right edge, so it keeps its 2 inside it
def('vault', (sh, R) => {
  const body = poly([[3, 3], [21, 3], [21, 21], [3, 21]], [3, 3, 3, 3], sh, R, { closed: true });
  const door = poly([[7, 7], [17, 7], [17, 17], [7, 17]], [1.5, 1.5, 1.5, 1.5], sh, R, { closed: true });
  const hinge = J(L2([3, 10], [7, 10]), L2([3, 14], [7, 14])), handle = seg([13, 11], [13, 13], sh, R);
  // duotone: the door a black panel, the hinge bars black, the handle a grey slot; fill keeps the door black, parted
  // from the body by the frame's white ring, the hinge bars cut
  // the hinge bars cut out of the fill, from the door's ring to 2 short of the outer wall (his note, 29 Oct)
  const hingeCut = J(L2([sh ? 4 : 5, 10], [7, 10]), L2([sh ? 4 : 5, 14], [7, 14]));
  const sil = grow(body), hingeS = meet(grow(poly([[3, 10], [7, 10], [7, 14], [3, 14]], [0, 0, 0, 0], sh, R, { closed: true })), sil);
  return styled([S(J(body, door, hinge, handle))], sil, [Pl(E(sil)), F(E(minus(grow(door), band(handle, sh)))), S(hingeCut)], [F(E(minus(sil, band(door, sh), band(handle, sh), band(hingeCut, sh))))]);
});

// washing-machine (ours): grey body, black drum, dial line and buttons; fill keeps the glass black in a white ring
// washing-machine (ours): the drum a black disc in duotone (Hugeicons' bulk), the porthole cut out of the fill
// 16 x 20 on the centre line (30 Oct graduation check): the 18 x 20 box painted 20 x 22, which the linter classes
// square and the house draws 20. The drum keeps r=4 and its 2 off both walls; the row lost a button, since two buttons
// and the dial need 16 of interior at the house 2 and the narrower body has 14: one button, the dial lengthened to 4
def('washing-machine', (sh, R) => {
  const body = poly([[4, 2], [20, 2], [20, 22], [4, 22]], [3, 3, 3, 3], sh, R, { closed: true });
  const drum = circlePath([12, 14], 4), dial = seg([12, 6], [16, 6], sh, R), btn = dots([[8, 6]]), sil = grow(body);
  return { stroke: [S(J(body, drum, dial)), F(btn)], 'two-tone': [Pl(E(sil)), S(J(body, drum, dial)), F(btn)], duotone: [Pl(E(sil)), F(E(disc([12, 14], 5))), S(dial), F(btn)],
    fill: [F(E(minus(sil, disc([12, 14], 5), band(dial, sh), disc([8, 6], 1))))] };
});

// waves-ladder (ours), an open glyph: water grey, ladder black; fill is the stroke
def('waves-ladder', (sh, R) => {
  const rail = (x) => stubEnds(`M${x} 14L${x} 4` + arcC([x - 2, 4], 2, 0, -180), sh ? 'both' : 'none', R);
  const rungs = J(L2([8, 8], [16, 8]), L2([8, 12], [16, 12]));
  const water = stubEnds(D2.wave(2, 22, 20, 2, 4), sh ? 'both' : 'none', R);
  const ladder = J(rail(8), rail(16), rungs), st = [S(J(ladder, water))];
  return { stroke: st, 'two-tone': [M(water), S(ladder)], duotone: [M(water), S(ladder)], fill: st };
});

// wheelchair (ours), an open glyph: wheel grey, rider black; fill is the stroke
def('wheelchair', (sh, R) => {
  const bodyP = [[9, 9], [9, 15], [16, 15], [18, 21], [21, 21]], arm = [[9, 11], [13, 11]];
  const segs = [...bodyP.slice(1).map((p, i) => [bodyP[i], p]), arm];
  const wheelCut = D2.cutWhere(D2.ring(9, 15, 6), (p) => segs.some(([a, b]) => D2.segDist(p, a, b) < 4 - 1e-9), 2);
  const wheel = sh ? stubEnds(wheelCut, 'both', R) : wheelCut;
  const body = poly(bodyP, [0, 1, 1, 1, 0], sh, R), armD = seg(...arm, sh, R, [false, true]), head = circlePath([10, 4], 2);
  const st = [S(J(body, armD, wheel)), F(head)];
  return { stroke: st, 'two-tone': [M(wheel), S(J(body, armD)), F(head)], duotone: [M(wheel), S(J(body, armD)), F(head)], fill: st };
});

export { ICONS };

/* ===================================================================== write */
if (import.meta.url === `file://${process.argv[1]}`) {
  const out = process.argv[2], only = process.argv.slice(3);
  function dropZero(d) {
    let o = '', cur = null, start = null, sb = '', drew = false;
    const flush = () => { if (drew) o += sb; sb = ''; drew = false; };
    for (const m of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
      const n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
      if (m[1] === 'M') { flush(); cur = start = [n[0], n[1]]; sb = 'M' + m[2].trim(); continue; }
      if (m[1] === 'Z') { sb += 'Z'; cur = start; continue; }
      const ps = []; for (let i = 0; i < n.length; i += 2) ps.push([n[i], n[i + 1]]);
      if (ps.every((q) => Math.hypot(q[0] - cur[0], q[1] - cur[1]) < 1e-3)) continue;
      sb += m[1] + m[2].trim(); cur = ps.at(-1); drew = true;
    }
    flush();
    return o;
  }
  let ok = 0;
  for (const [name, f] of Object.entries(ICONS)) {
    if (only.length && !only.includes(name)) continue;
    const dir = `${out}/raw/${name}`;
    rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
    try {
      for (const sh of [false, true]) {
        const v = f(sh);
        for (const s of STY) writeFileSync(`${dir}/Container=regular, Style=${s}, Corners=${sh ? 'sharp' : 'regular'}.svg`, doc(v[s].map((l) => ({ ...l, d: dropZero(l.d) })), sh ? 'butt' : 'round'));
      }
      ok++;
    } catch (e) { console.log('FAIL', name, e.message.slice(0, 300)); }
  }
  console.log(`wrote ${ok} sets`);
}
