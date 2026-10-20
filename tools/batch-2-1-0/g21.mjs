// The 2.1.0 batch (20 Oct 2026): Zafar's refs drop of 20 Oct, the monitor-2 family and the math names
// the other set's math search had and this set did not. Round 1 was reviewed as stroke drawings
// (scratchpad sheet); his calls: planet B (his tilt, the body crossed), pen-circle and butterfly-net
// dropped, centred monitor signs kept.
//
// Round 2 (his calls): astroid, land-plot, tangent and the six gallery offs dropped; compass, lambda,
// omega, phi, radius and vector-polygon redrawn; monitor-2-arrow-down to the corner; every object
// given its designed styles. Round 3: cone his way, the other solids on the box rule, planet's fill
// his; the size audit put angle at 18 and pinned sharp mouse-pointer's tip. Approved 20 Oct 2026.
//
// STYLES[name](sharp) -> { stroke, 'two-tone', duotone, fill }, each a list of { kind, d }.
// Sharp is built from the same skeleton: fillets come off as true vertices, a vertex whose round
// join would paint past the rounded drawing's box slides back (deFillet's pull, or along an edge);
// a free straight end takes the cap cut's stub ((1 - sin t) / cos t), a free curve end a unit along
// its tangent, both stopped at the rounded box; ends landing on other ink take nothing.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const REPO = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons';
const L = await import(REPO + '/tools/batch-1-4-0/lib.mjs');
const PG = await import(REPO + '/pipeline/lib/geom.mjs');
const { Path, circlePath, polyContour, fillet, arcTo, onArc, add, sub, mul, len, unit, dot, cross, pt, bisect, parseRuns, ellPoint } = L;

export const STY = ['stroke', 'two-tone', 'duotone', 'fill'];
export const S = (d) => ({ kind: 'stroke', d }), F = (d) => ({ kind: 'solid', d }), Pl = (d) => ({ kind: 'plate', d }), M = (d) => ({ kind: 'muted', d });
const R2 = Math.SQRT2, rad = (a) => (a * Math.PI) / 180, deg = (a) => (a * 180) / Math.PI;
const assert = (ok, m) => { if (!ok) throw new Error(m); };

/* -------------------------------------------------------------- raw sources */
function absHV(d) {
  let out = '', cur = [0, 0], start = [0, 0];
  for (const m of d.matchAll(/([MLCZHV])([^MLCZHV]*)/g)) {
    const n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    const c = m[1];
    if (c === 'M') { cur = [n[0], n[1]]; start = cur; out += `M${pt(cur)}`; for (let i = 2; i < n.length; i += 2) { cur = [n[i], n[i + 1]]; out += `L${pt(cur)}`; } }
    else if (c === 'L') for (let i = 0; i < n.length; i += 2) { cur = [n[i], n[i + 1]]; out += `L${pt(cur)}`; }
    else if (c === 'H') for (const x of n) { cur = [x, cur[1]]; out += `L${pt(cur)}`; }
    else if (c === 'V') for (const y of n) { cur = [cur[0], y]; out += `L${pt(cur)}`; }
    else if (c === 'C') for (let i = 0; i < n.length; i += 6) { out += `C${pt([n[i], n[i + 1]])} ${pt([n[i + 2], n[i + 3]])} ${pt([n[i + 4], n[i + 5]])}`; cur = [n[i + 4], n[i + 5]]; }
    else if (c === 'Z') { out += 'Z'; cur = start; }
  }
  return out;
}
/** A shipped variant's layers from raw/. */
export function rawLayers(name, style, corners, container = 'regular') {
  const s = readFileSync(join(REPO, 'raw', name, `Container=${container}, Style=${style}, Corners=${corners}.svg`), 'utf8');
  return [...s.matchAll(/<path([^>]*)\/>/g)].map(([, a]) => {
    const at = (k) => a.match(new RegExp(`\\s${k}="([^"]*)"`))?.[1];
    const stroked = at('stroke') && at('stroke') !== 'none';
    return { kind: stroked ? (at('stroke-opacity') ? 'muted' : 'stroke') : at('fill-opacity') ? 'plate' : 'solid', d: absHV(at('d')) };
  });
}
const rawStroke = (name, sharp, container = 'regular') => rawLayers(name, 'stroke', sharp ? 'sharp' : 'regular', container);
const subs = (d) => d.split(/(?=M)/).filter(Boolean);
/** map every point of an M/L/C/Z path */
export const xf = (d, f) => d.replace(/([MLC])([^MLCZ]*)/g, (_, c, body) => {
  const n = body.trim().split(/[\s,]+/).map(Number), ps = [];
  for (let i = 0; i < n.length; i += 2) ps.push(pt(f([n[i], n[i + 1]])));
  return c + ps.join(' ');
});
const shift = (d, dx, dy) => xf(d, (p) => [p[0] + dx, p[1] + dy]);

/* ------------------------------------------------------------------ measure */
export function inkOf(layers, sharp) {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers) {
    const bb = l.kind === 'stroke' || l.kind === 'muted' ? PG.strokedBBox(l.d, 1, sharp ? 'butt' : 'round', 400) : PG.pathBBox(l.d);
    b = [Math.min(b[0], bb[0]), Math.min(b[1], bb[1]), Math.max(b[2], bb[2]), Math.max(b[3], bb[3])];
  }
  return b;
}
const pathBox = (d) => PG.strokedBBox(d, 0, 'round', 400);

/* --------------------------------------------------------- the skeleton kit */
// Every builder takes `sharp` and the rounded box `R` the sharp half must paint within.
const k45 = (t) => { const a = Math.abs(Math.atan2(t[1], t[0])) % (Math.PI / 2); const th = Math.min(a, Math.PI / 2 - a); return (1 - Math.sin(th)) / Math.cos(th); };
/** a stub off point p along unit t, cap cut length (or 1 for a curve), stopped where a butt corner leaves box R */
function stubFrom(p, t, line, R) {
  const u = unit(t), n = [-u[1], u[0]];
  // a straight end takes the full cap cut: it never shortens on its dominant axis, and its side
  // corner may stand up to 0.414 past the rounded box (sharp.md, free ends; the linter's allowance).
  // A curve end's unit stub stops at the box (sharp.md, what the cut leaves alone).
  const slack = line ? 0.414 : 1e-6;
  const fits = (k) => [1, -1].every((sg) => { const q = add(add(p, mul(u, k)), mul(n, sg)); return !R || (q[0] >= R[0] - slack && q[1] >= R[1] - slack && q[0] <= R[2] + slack && q[1] <= R[3] + slack); });
  let k = line ? k45(u) : 1;
  if (!fits(k)) k = bisect((kk) => (fits(kk) ? -1 : 1), 0, k);
  return add(p, mul(u, k));
}
/**
 * An open or closed polyline with a fillet radius per vertex.
 * opt.ends: [startFree, endFree] (open only; a free end is stubbed in sharp)
 * opt.pull: per vertex, how a sharp vertex that paints past R gives way: 'bis' (into the corner along
 * its bisector, deFillet's pull), 'in' (back along the incoming edge), 'out' (along the outgoing edge),
 * 'box' (onto the box's corner)
 */
export function poly(pts, radii, sharp, R, opt = {}) {
  const closedP = !!opt.closed, n = pts.length;
  const ends = opt.ends ?? [true, true];
  if (!sharp) {
    if (opt.raw) return { q: pts, radii: radii.map((r) => r || 0) };
    if (closedP) return polyContour(pts, radii.map((r) => r || 0)).toString();
    const p = new Path().M(pts[0]);
    for (let i = 1; i < n - 1; i++) p.corner(pts[i], pts[i + 1], radii[i] || 0);
    return p.L(pts.at(-1)).toString();
  }
  const q = pts.map((p) => [...p]);
  for (let i = 0; i < n; i++) {
    const r = radii[i] || 0;
    if (r <= 0 || (!closedP && (i === 0 || i === n - 1))) continue;
    const A = pts[(i - 1 + n) % n], B = pts[(i + 1) % n], V = pts[i];      // the drawing's own neighbours, never ones already moved
    const how = opt.pull?.[i] ?? 'bis';
    // 'box': a tip whose bisector is off the diagonal lands on the box's corner itself, both walls
    // exact, where pulling along the bisector stops on one wall and misses the other by a hair
    if (how === 'box') { q[i] = [Math.min(Math.max(V[0], R[0] + 1), R[2] - 1), Math.min(Math.max(V[1], R[1] + 1), R[3] - 1)]; continue; }
    const u = unit(sub(A, V)), w = unit(sub(B, V));
    const dir = how === 'in' ? u : how === 'out' ? w : unit(add(u, w));
    // smallest t >= 0 putting the unit disc about V + t dir inside R
    let t = 0;
    for (const [ax, lo] of [[0, true], [1, true], [0, false], [1, false]]) {
      const edge = lo ? R[ax] + 1 : R[ax + 2] - 1, v = V[ax], dv = dir[ax];
      if (lo && v < edge - 1e-9 && dv > 1e-9) t = Math.max(t, (edge - v) / dv);
      if (!lo && v > edge + 1e-9 && dv < -1e-9) t = Math.max(t, (edge - v) / dv);
    }
    q[i] = add(V, mul(dir, t));
  }
  if (opt.raw) return { q, radii: q.map(() => 0) };
  if (closedP) return 'M' + q.map(pt).join('L') + 'Z';
  if (ends[0]) q[0] = stubFrom(q[0], sub(q[0], q[1]), true, R);
  if (ends[1]) q[n - 1] = stubFrom(q[n - 1], sub(q[n - 1], q[n - 2]), true, R);
  return 'M' + q.map(pt).join('L');
}
const rect = (x0, y0, x1, y1, r, sharp, R) => poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r], sharp, R, { closed: true });
const circ = (c, r) => circlePath(c, r);
/** stub the free ends of an M/L/C path (sharp): `which` in both|start|end */
export function stubEnds(d, which, R) {
  return parseRuns(d).map(({ segs, closed }) => {
    if (closed) return L.segD(segs[0], true) + segs.slice(1).map((s) => L.segD(s)).join('') + 'Z';
    const f = segs[0], l = segs.at(-1);
    const dir0 = f.t === 'L' ? sub(f.p[0], f.p[1]) : sub(f.p[0], len(sub(f.p[1], f.p[0])) > 1e-9 ? f.p[1] : f.p[2]);
    const dir1 = l.t === 'L' ? sub(l.p[1], l.p[0]) : sub(l.p[3], len(sub(l.p[2], l.p[3])) > 1e-9 ? l.p[2] : l.p[1]);
    const s0 = which === 'both' || which === 'start' ? stubFrom(f.p[0], dir0, f.t === 'L', R) : null;
    const s1 = which === 'both' || which === 'end' ? stubFrom(l.p.at(-1), dir1, l.t === 'L', R) : null;
    // a straight end's stub extends its own line: rewrite the end point rather than add a piece
    let body = segs.map((s) => ({ ...s, p: s.p.map((x) => [...x]) }));
    let head = `M${pt(body[0].p[0])}`, tail = '';
    if (s0) { if (f.t === 'L') { body[0].p[0] = s0; head = `M${pt(s0)}`; } else head = `M${pt(s0)}L${pt(f.p[0])}`; }
    if (s1) { if (l.t === 'L') body.at(-1).p[1] = s1; else tail = `L${pt(s1)}`; }
    return head + body.map((s) => L.segD(s)).join('') + tail;
  }).join('');
}
const allStroke = (layers) => Object.fromEntries(STY.map((s) => [s, layers.map((l) => ({ ...l }))]));

/* ------------------------------------------------------------- region kit */
// Plates, solids and knockouts on the 1.4.0 batch's region booleans (free cubics offset and
// verified there). A shape is a list of closed runs.
const Bo = await import(REPO + '/tools/batch-1-4-0/bool.mjs');
const LA = await import(REPO + '/tools/batch-1-4-0/la.mjs');
/** a filleted polygon's plate, exactly: lines and arcs offset a unit (reflex corners trimmed, verified) */
function growPoly(pts, radii, sh, R, opt = {}) {
  const { q, radii: rr } = poly(pts, radii, sh, R, { ...opt, closed: true, raw: true });
  const segs = LA.polyLA(q, rr), o = LA.offsetLA(segs, 1);
  LA.verifyOffset(segs, o, 1);
  const d = LA.dLA(o), b = PG.pathBBox(d), b0 = PG.pathBBox(LA.dLA(segs));
  if (b[2] - b[0] < b0[2] - b0[0]) throw new Error('offset went inward');
  return [runs(d)[0]];
}
const runs = (d) => Bo.runFromD(d);
const isClosed = (d) => /Z\s*$/.test(d.trim());
/** the painted silhouette of a closed stroked outline: each closed subpath grown a unit */
const grow = (d) => Bo.union(...d.split(/(?=M)/).filter(Boolean).map((s) => [Bo.grow(runs(s)[0])]));
/** the painted band of open strokes, as a region */
const band = (d, sharp) => Bo.union(...d.split(/(?=M)/).filter(Boolean).map((s) => [Bo.band(runs(s)[0], sharp ? 'butt' : 'round')]));
const disc = (c, r) => [runs(circ(c, r))[0]];
const box = (x0, y0, x1, y1) => [runs(`M${x0} ${y0}L${x1} ${y0}L${x1} ${y1}L${x0} ${y1}Z`)[0]];
const U = (...s) => Bo.union(...s.filter((x) => x && x.length));
const minus = (a, b) => Bo.subtract(a, b);
const meet = (a, b) => Bo.intersect(a, b);
/** a region's d, holes wound against their outline (nonzero and evenodd agree) */
function E(shape) {
  const polys = shape.map((r) => Bo.flat(r, 0.05));
  const or = shape.map((r, i) => {
    let depth = 0;
    polys.forEach((o, j) => { if (j === i) return; const pts = polys[i].filter((_, k) => k % 3 === 0); if (pts.filter((p) => Bo.winding(p, [o]) !== 0).length > pts.length / 2) depth++; });
    const want = depth % 2 === 0 ? 1 : -1;
    return Math.sign(Bo.area(r)) === want ? r : Bo.revRun(r);
  });
  return Bo.emitShape(or);
}
/** the four styles of a plain object: two-tone its plate under the drawing, duotone and fill given */
const styled = (stroke, twoTone, duotone, fill) => ({ stroke, 'two-tone': twoTone, duotone, fill });

/* ----------------------------------------------------------------- registry */
export const STYLES = {};        // name -> (sharp) -> styles, Container=regular
export const CONTAINERS = {};    // name -> { square|circle: (sharp) -> styles }
export const ALIASES = {};       // name -> terms owed in lib/icon-aliases.json
export const CENTRED = [];       // sharp drawings moved onto their own ink's centre
/**
 * def(name, build): build(sharp, R) returns the stroke layers, or { stroke, 'two-tone', duotone,
 * fill } when the styles are designed. The regular stroke runs first and its ink box R is what sharp
 * must paint: sharp may stand past it by the cap cut's 0.414 at most. A symbol or an open glyph
 * returns its stroke alone and every style carries it.
 */
function def(name, build, opt = {}) {
  STYLES[name] = (sharp) => {
    const reg0 = build(false, null);
    const regStroke = Array.isArray(reg0) ? reg0 : reg0.stroke;
    // the rounded box as drawn: sampling a fillet's outline reads a hair inside the whole number it
    // paints to (mouse-pointer's 2.009), and a sharp vertex pulled to that box inherits the hair
    const R = inkOf(regStroke, false).map((v) => (Math.abs(v - Math.round(v)) < 0.02 ? Math.round(v) : v));
    const v0 = sharp ? build(true, R) : reg0;
    const v = Array.isArray(v0) ? allStroke(v0) : v0;
    const b = inkOf(v.stroke, sharp);
    if (sharp) {
      const over = Math.max(R[0] - b[0], R[1] - b[1], b[2] - R[2], b[3] - R[3]);
      assert(over < 0.415, `${name} sharp paints past its rounded box by ${over.toFixed(3)}: ${b.map((x) => x.toFixed(3))} vs ${R.map((x) => x.toFixed(3))}`);
    }
    // a diagonal free end's cap meets the walls at different points: centre each treatment on its own
    // ink (drawing-a-new-icon.md section 1, broom)
    if (sharp) {
      const dx = (24 - b[0] - b[2]) / 2, dy = (24 - b[1] - b[3]) / 2;
      if ((Math.abs(dx) > 0.01 && Math.abs(dx) < 0.21) || (Math.abs(dy) > 0.01 && Math.abs(dy) < 0.21)) {
        const sx = Math.abs(dx) > 0.01 ? dx : 0, sy = Math.abs(dy) > 0.01 ? dy : 0;
        CENTRED.push(`${name} ${sx.toFixed(3)},${sy.toFixed(3)}`);
        return Object.fromEntries(STY.map((s) => [s, v[s].map((l) => ({ ...l, d: shift(l.d, sx, sy) }))]));
      }
    }
    return v;
  };
  if (opt.aliases) ALIASES[name] = opt.aliases;
}

/* ====================================================================== refs */
// card-chip: his, on the grid as drawn: body 2..22 x 4..20 r=3, contacts on 9 and 15 both ways.
// Styles as grid's: two-tone the plate under the drawing, duotone the grey plate with the contacts
// black and stopped 2 from its edge, fill the plate with those contacts as slots (the bun format).
def('card-chip', (sh, R) => {
  const body = rect(2, 4, 22, 20, 3, sh, R), lines = 'M9 4L9 20M15 4L15 20M2 9L9 9M2 15L9 15M15 9L22 9M15 15L22 15';
  const plate = grow(body);
  const inner = sh ? 'M9 5L9 19M15 5L15 19M3 9L9 9M3 15L9 15M15 9L21 9M15 15L21 15' : 'M9 6L9 18M15 6L15 18M4 9L9 9M4 15L9 15M15 9L20 9M15 15L20 15';
  const slots = U(box(8, 5, 10, 19), box(14, 5, 16, 19), box(3, 8, 9, 10), box(3, 14, 9, 16), box(15, 8, 21, 10), box(15, 14, 21, 16));
  return styled([S(body + lines)], [Pl(E(plate)), S(body + lines)], [Pl(E(plate)), S(inner)], [F(E(minus(plate, slots)))]);
}, { aliases: ['chip', 'smart-card', 'emv', 'card-chip'] });

// flag-triangle-right (his flag-pennant-2) and flag-swallowtail (his flag-pennant): pole 2..22 on x 4,
// the cloth on 4..16. Styles as flag's: two-tone the cloth's plate, duotone the cloth black on a
// grey pole, fill the cloth solid on the pole.
const POLE = (sh) => (sh ? 'M4 1L4 23' : 'M4 2L4 22');
const TIP_X = bisect((v) => pathBox(poly([[4, 4], [v, 10], [4, 16]], [0, 0.5, 0], false))[2] - 20, 19, 22);
const SW_X = bisect((v) => pathBox(poly([[4, 4], [v, 4], [v - 4, 10], [v, 16], [4, 16]], [0, 1, 0.5, 1, 0], false))[2] - 20, 19, 23);
function flagStyles(cloth, sh) {
  const solid = grow(cloth + 'Z');
  return styled([S(POLE(sh) + cloth)], [Pl(E(solid)), S(POLE(sh) + cloth)], [F(E(solid)), M(POLE(sh))], [F(E(solid)), S(POLE(sh))]);
}
def('flag-triangle-right', (sh, R) => flagStyles(poly([[4, 4], [TIP_X, 10], [4, 16]], [0, 0.5, 0], sh, R, { ends: [false, false] }), sh), { aliases: ['pennant', 'flag-pennant'] });
def('flag-swallowtail', (sh, R) => flagStyles(poly([[4, 4], [SW_X, 4], [SW_X - 4, 10], [SW_X, 16], [4, 16]], [0, 1, 0.5, 1, 0], sh, R, { ends: [false, false], pull: { 1: 'in', 3: 'out' } }), sh), { aliases: ['pennant', 'banner', 'flag-pennant', 'burgee'] });

// gripper: his hub r 3 on (12,10); the arms leave the hub on its ring, elbows r 1 solved to paint 21.
// Tools rule: the hub a black solid, the stem and arms grey; fill the hub solid under stroked arms.
const ARM0 = onArc([12, 10], 3, 35);
const ARM_X = bisect((v) => pathBox(poly([ARM0, [v, 16], [16, 22]], [0, 1, 0], false))[2] - 20, 18, 23);
def('gripper', (sh, R) => {
  const right = poly([ARM0, [ARM_X, 16], [16, 22]], [0, 1, 0], sh, R, { ends: [false, true] });
  const arms = (sh ? 'M12 1L12 7' : 'M12 2L12 7') + right + xf(right, (p) => [24 - p[0], p[1]]);
  const hub = circ([12, 10], 3), solid = disc([12, 10], 4);
  return styled([S(arms + hub)], [Pl(E(solid)), S(arms + hub)], [M(arms), F(E(solid))], [F(E(solid)), S(arms)]);
}, { aliases: ['claw', 'grab', 'grabber', 'robot-arm', 'pick'] });

// hook: a bar 8..16 on y 3, the shank on 12 bending r 2 into a bowl r 6 about (12,15). One stroke, every style.
function hookPath(sharp, R) {
  const y0 = 5, rho = 2, cy = 16, Rb = 6, C1 = [12 + rho, y0], C2 = [12, cy];
  const t = bisect((tt) => rho * Math.cos(tt) - (cy - y0) * Math.sin(tt) + (Rb + rho), Math.PI, Math.PI / 2);
  const phi = t + Math.PI, P2 = add(C2, mul([Math.cos(phi), Math.sin(phi)], Rb));
  const p = new Path().M([12, 2]).L([12, y0]);
  for (const s of arcTo(C1, rho, 180, deg(t))) p.C(s.c1, s.c2, s.p);
  p.L(P2);
  for (const s of arcTo(C2, Rb, deg(phi) - 360, 180)) p.C(s.c1, s.c2, s.p);
  const body = sharp ? stubEnds(p.toString(), 'end', R) : p.toString();
  return (sharp ? 'M7 2L17 2' : 'M8 2L16 2') + body;
}
def('hook', (sh, R) => [S(hookPath(sh, R))], { aliases: ['crane', 'hanger', 'lift', 'webhook'] });

/* ------------------------------------------------------------ monitor-2 family */
// monitor-2: his, a screen 14 tall on our own stand. Styles as monitor's: two-tone the screen's
// plate, duotone the screen black over a grey stand, fill the screen solid on the stroked stand.
const STAND = (sh) => (sh ? 'M12 17L12 21M7 21L17 21' : 'M12 17L12 21M8 21L16 21');
const SCREEN = (sh, R) => rect(2, 3, 22, 17, 3, sh, R);
const screenPlate = (sh) => grow(SCREEN(sh, [1, 2, 23, 22]));
def('monitor-2', (sh, R) => {
  const scr = SCREEN(sh, R), plate = E(screenPlate(sh));
  return styled([S(scr + STAND(sh))], [Pl(plate), S(scr + STAND(sh))], [M(STAND(sh)), F(plate)], [F(plate), S(STAND(sh))]);
}, { aliases: ['screen', 'display', 'desktop', 'computer'] });
/** the frame opened for a corner sign: top edge to `top`, right wall from `wall` (cog: from inside the fillet) */
function monOpen(sh, top, wall) {
  if (sh) return `M${top + 1} 3L2 3L2 17L22 17L22 ${wall - 1}`;
  const p = new Path().M([top, 3]).corner([2, 3], [2, 17], 3).corner([2, 17], [22, 17], 3);
  if (wall >= 14) {
    const a = deg(Math.asin((wall - 14) / 3));
    p.L([19, 17]);
    for (const s of arcTo([19, 14], 3, 90, a)) p.C(s.c1, s.c2, s.p);
    return p.toString();
  }
  return p.corner([22, 17], [22, 3], 3).L([22, wall]).toString();
}
/**
 * The screen's plate notched for a corner sign (compounds.md, notched plates): the notch runs on the
 * caps' far sides (x = top + 1, y = wall - 1), its corner r 2 about the sign's ink corner, and the
 * plate turns r 1 round each cap so no grey stands past the black. Sharp clips straight on those
 * lines, square (sharp.md, the clip law).
 */
function notchedPlate(sh, top, wall) {
  const P = screenPlate(sh), nx = top + 1, ny = wall - 1;
  if (sh) return minus(P, box(nx, -1, 30, ny));
  const N = runs(`M${nx} -1L30 -1L30 ${ny}L${nx + 2} ${ny}` + L.arcC([nx + 2, ny - 2], 2, 90, 180) + `L${nx} -1Z`);
  let out = minus(P, [N[0]]);
  const capTop = [top, 3];
  out = minus(out, minus(meet(out, box(top, 1, nx, 3)), disc(capTop, 1)));
  if (wall >= 14) {
    const a = Math.asin((wall - 14) / 3), cap = [19 + 3 * Math.cos(a), wall];
    out = minus(out, minus(meet(out, box(cap[0], ny, 25, cap[1])), disc(cap, 1)));
  } else out = minus(out, minus(meet(out, box(22, ny, 23, wall)), disc([22, wall], 1)));
  return out;
}
const CORNER = {
  plus: (sh) => (sh ? 'M19 2L19 10M15 6L23 6' : 'M19 3L19 9M16 6L22 6'),
  minus: (sh) => (sh ? 'M15 6L23 6' : 'M16 6L22 6'),
  x: (sh) => (sh ? 'M15.7071 2.7071L22.2929 9.2929M22.2929 2.7071L15.7071 9.2929' : 'M16 3L22 9M22 3L16 9'),
  check: (sh) => (sh ? 'M15.7071 5.7071L18 8L22.2929 3.7071' : 'M16 6L18 8L22 4'),
  'arrow-in-up-right': (sh) => (sh ? 'M15 3L22 3L22 10M16.7071 8.2929L21.8536 3.1464' : 'M16 3L21.4994 3C21.7756 3 22 3.2239 22 3.5L22 9M17 8L21.5 3.5'),
  'arrow-down': (sh) => (sh ? 'M19 2L19 9M15.7071 5.7071L19 9L22.2929 5.7071' : 'M19 3L19 9M16 6L19 9L22 6'),
  dot: () => circ([19, 6], 3),
};
const CORNER_ALIASES = { 'arrow-down': ['monitor-down', 'download-to-computer'] };
function cornerStyles(sh, sign, top, wall, isDot) {
  const frame = monOpen(sh, top, wall) + STAND(sh), notched = notchedPlate(sh, top, wall);
  const grey = U(notched, band(STAND(sh), sh));
  const twoTone = isDot ? U(notched, disc([19, 6], 4)) : notched;
  return styled([S(frame + sign)], [Pl(E(twoTone)), S(frame + sign)], [Pl(E(grey)), S(sign)], [F(E(notched)), S(STAND(sh) + sign)]);
}
for (const [k, sign] of Object.entries(CORNER)) def(`monitor-2-${k}`, (sh) => cornerStyles(sh, sign(sh), 12, 13, k === 'dot'), { aliases: CORNER_ALIASES[k] });
const GEAR = (sh) => rawStroke('user-cog', sh)[0].d.split(/(?=M)/).slice(-9).map((s) => shift(s, 0, -10)).join('');
def('monitor-2-cog', (sh) => cornerStyles(sh, GEAR(sh), 10, 15, false), { aliases: ['display-settings', 'monitor-settings'] });
// centred signs on the screen's middle (12, 10), the plain 6 box: what the screen shows. Styles as
// message-square-plus's: two-tone the plate, duotone the grey screen and stand with the sign black
// (play and stop solid), fill the screen with the sign knocked out.
const PLAY_H = bisect((h) => pathBox(poly([[10, 10 - h], [15, 10], [10, 10 + h]], [1, 1, 1], false, null, { closed: true }))[3] - 13, 2, 5);
const playReg = poly([[10, 10 - PLAY_H], [15, 10], [10, 10 + PLAY_H]], [1, 1, 1], false, null, { closed: true });
const CENTRE = {
  play: (sh) => (sh ? `M10 7L${pt([inkOf([S(playReg)], false)[2] - 1, 10])}L10 13Z` : playReg),
  pause: (sh) => (sh ? 'M10 6L10 14M14 6L14 14' : 'M10 7L10 13M14 7L14 13'),
  stop: (sh, R) => rect(9, 7, 15, 13, 1, sh, R),
  'arrow-up': (sh) => (sh ? 'M12 14L12 7M8.7071 10.2929L12 7L15.2929 10.2929' : 'M12 13L12 7M9 10L12 7L15 10'),
};
const CENTRE_ALIASES = { play: ['screen-play', 'presentation', 'monitor-play'], pause: ['monitor-pause'], stop: ['stop-sharing', 'stop-presenting', 'monitor-stop'], 'arrow-up': ['monitor-up', 'screen-share', 'share-screen', 'cast-screen'] };
for (const [k, sign] of Object.entries(CENTRE)) def(`monitor-2-${k}`, (sh, R) => {
  const s = sign(sh, R), closedSign = isClosed(s), scr = SCREEN(sh, R), P = screenPlate(sh);
  const hole = closedSign ? grow(s) : band(k === 'arrow-up' ? s.replace(/L12 7M/, 'L12 8M') : s, sh);
  return styled([S(scr + STAND(sh) + s)], [Pl(E(P)), S(scr + STAND(sh) + s)],
    [Pl(E(U(P, band(STAND(sh), sh)))), closedSign ? F(E(grow(s))) : S(s)], [F(E(minus(P, hole))), S(STAND(sh))]);
}, { aliases: CENTRE_ALIASES[k] });

// monitor-speaker: his layout, house radii. Front black, back grey: the speaker a black solid with its
// cone and tweeter open, the screen behind it grey strokes; fill the speaker solid on the stroked screen.
def('monitor-speaker', (sh, R) => {
  const back = sh ? 'M9 4L2 4L2 16L9 16M9 20L5 20' : 'M8 4L5 4C3.3431 4 2 5.3431 2 7L2 13C2 14.6569 3.3431 16 5 16L8 16M8 20L6 20';
  const spk = rect(12, 4, 22, 20, 3, sh, R), dots = circ([17, 15], 2) + circ([17, 8], 1);
  const solid = minus(grow(spk), U(disc([17, 15], 2), disc([17, 8], 1)));
  return styled([S(back + spk), F(dots)], [Pl(E(grow(spk))), S(back + spk), F(dots)], [M(back), F(E(solid))], [F(E(solid)), S(back)]);
}, { aliases: ['speaker', 'audio', 'computer-speaker', 'desktop-audio'] });

// mouse-pointer: the shipped cursor's edges and corners, its notch opened into a tail along the
// diagonal. Styles as cursor's: two-tone the plate, duotone the drawing (one shape), fill solid.
const CUR = (() => {
  const meetL = (a, b, c, d) => { const r = sub(b, a), s = sub(d, c); return add(a, mul(r, cross(sub(c, a), s) / cross(r, s))); };
  const A1 = [8.3184, 20.5112], B1 = [3.0341, 3.9139], A2 = [3.9268, 3.0373], B2 = [20.5197, 8.5617];
  const A3 = [20.5672, 9.8732], B3 = [13.4774, 12.8146], A4 = [13.1107, 13.1647], B4 = [9.6254, 20.596];
  const T = meetL(A1, B1, A2, B2), W2 = meetL(A2, B2, A3, B3), W1 = meetL(A4, B4, A1, B1);
  const rOf = (V, Tp, A, B) => len(sub(Tp, V)) * Math.tan(Math.acos(dot(unit(sub(A, V)), unit(sub(B, V)))) / 2);
  const k = 2 * R2, onLine = (A, B, c) => { const r = sub(B, A); return add(A, mul(r, (c - (A[0] - A[1])) / (r[0] - r[1]))); };
  const N2 = onLine(A3, B3, k), N1 = onLine(A4, B4, -k);
  const pts = (s) => [T, W2, N2, [(s + k) / 2, (s - k) / 2], [(s - k) / 2, (s + k) / 2], N1, W1];
  const radii = [rOf(T, B1, A1, A2), rOf(W2, B2, A2, A3), 1, 1, 1, 1, rOf(W1, B4, A4, A1)];
  const s = bisect((v) => pathBox(poly(pts(v), radii, false, null, { closed: true }))[2] - 21, 30, 42);
  return { pts: pts(s), radii };
})();
def('mouse-pointer', (sh, R) => {
  // sharp's tip on the box corner (3, 3), as the shipped sharp cursor's
  const d = poly(CUR.pts, CUR.radii, sh, R, { closed: true, pull: { 0: 'box' } }), P = E(growPoly(CUR.pts, CUR.radii, sh, R, { pull: { 0: 'box' } }));
  return styled([S(d)], [Pl(P), S(d)], [S(d)], [F(P)]);
}, { aliases: ['pointer', 'arrow-pointer', 'cursor-arrow'] });

// planet (his orbit, option B): the body r 7 whole, the ring a true ellipse at his 20 degrees reaching
// 2..22, its back ending on the body, its front crossing it as he drew. Two-tone the body's plate,
// duotone the grey body under the black ring, fill the solid body opened a unit either side of the
// ring so the ring reads in front of it.
const PLANET = (() => {
  const C = [12, 12], th = -20, b = 3;
  const a = Math.sqrt((100 - b * b * Math.sin(rad(th)) ** 2) / Math.cos(rad(th)) ** 2);
  const dC = (t) => len(sub(ellPoint(C, a, b, th, t), C)) - 7;
  return { body: circ(C, 7), ring: L.ellArc(C, a, b, th, bisect(dC, 180, 260), bisect(dC, -90, 0)) };
})();
def('planet', () => {
  const { body, ring } = PLANET, P = disc([12, 12], 8);
  // fill (his 20 Oct drawing): the body and ring one solid, cut where the drawing closes a counter, the
  // ring's two loops and the body below the ring; the body above the ring stays solid
  const rb = band(ring, false), solid = U(P, rb);
  const below = minus(disc([12, 12], 6), rb).filter((r) => Bo.flat(r, 0.05).reduce((a, q) => a + q[1], 0) / Bo.flat(r, 0.05).length > 14);
  assert(below.length === 1, 'planet: expected one counter below the ring, got ' + below.length);
  // the ring band's offset lands a thousandth past the stroke's own 1..23: held to it
  const held = L.mapD(E(minus(solid, below)), ([x, y]) => [Math.min(23, Math.max(1, x)), y]);
  return styled([S(body + ring)], [Pl(E(P)), S(body + ring)], [Pl(E(P)), S(ring)], [F(held)]);
}, { aliases: ['orbit', 'saturn', 'space', 'astronomy'] });

// scan-user: scan-face's frame, the user centred inside all four brackets. Scan styles: the frame
// grey and the user black in two-tone and duotone (solid in duotone), fill the frame stroked over the solid user.
def('scan-user', (sh, R) => {
  const frame = subs(rawStroke('scan-face', sh)[0].d).slice(0, 4).join('');
  const head = circ([12, 7.5], 1.5), body = poly([[8, 13], [16, 13], [16, 17], [8, 17]], [3, 3, 1, 1], sh, R, { closed: true });
  const solid = E(U(disc([12, 7.5], 2.5), grow(body)));
  return styled([S(frame + head + body)], [M(frame), S(head + body)], [M(frame), F(solid)], [S(frame), F(solid)]);
}, { aliases: ['face-id', 'identity', 'scan-person', 'user-scan'] });

// symmetry (his something-1, something-horizontal): a frustum split by its axis. Two-tone the plate,
// duotone the grey frustum under the black axis, fill the solid halves a unit clear of the axis.
const TRAP_X = bisect((v) => pathBox(poly([[7, 5], [17, 5], [v, 19], [24 - v, 19]], [1, 1, 1, 1], false, null, { closed: true }))[2] - 22, 21, 24);
function symH(sh, R) {
  const trap = poly([[7, 5], [17, 5], [TRAP_X, 19], [24 - TRAP_X, 19]], [1, 1, 1, 1], sh, R, { closed: true, pull: { 2: 'out', 3: 'in' } });
  const axis = sh ? 'M12 1L12 23' : 'M12 2L12 22', P = grow(trap);
  const hole = Bo.union(...band(axis, sh).map((r) => [Bo.grow(r, 2)]));
  return styled([S(trap + axis)], [Pl(E(P)), S(trap + axis)], [Pl(E(P)), S(axis)], [F(E(minus(P, hole))), S(axis)]);
}
const turn = (v) => Object.fromEntries(STY.map((s) => [s, v[s].map((l) => ({ ...l, d: xf(l.d, (p) => [p[1], 24 - p[0]]) }))]));
def('symmetry-horizontal', symH, { aliases: ['mirror', 'axis', 'reflect', 'symmetric'] });
def('symmetry-vertical', (sh, R) => turn(symH(sh, R && [R[1], 24 - R[2], R[3], 24 - R[0]])), { aliases: ['mirror', 'axis', 'reflect', 'symmetric'] });

// flip-3-horizontal (his something) and its quarter turn: two right triangles under a double arrow.
// Styles as flip-horizontal's: the triangles' plates in two-tone and duotone, solid in fill.
const FT_X = bisect((v) => pathBox(poly([[10, 11], [10, 22], [v, 22]], [1, 1, 1], false, null, { closed: true }))[0] - 2, 0, 4);
function flip3(sh, R) {
  const tri = poly([[10, 11], [10, 22], [FT_X, 22]], [1, 1, 1], sh, R, { closed: true, pull: { 2: 'in' } });
  const tris = tri + xf(tri, (p) => [24 - p[0], p[1]]);
  const arrow = sh ? 'M2 5L22 5M5.2929 1.7071L2 5L5.2929 8.2929M18.7071 1.7071L22 5L18.7071 8.2929' : 'M2 5L22 5M5 2L2 5L5 8M19 2L22 5L19 8';
  const P = E(grow(tris));
  return styled([S(arrow + tris)], [Pl(P), S(arrow + tris)], [Pl(P), S(arrow)], [F(P), S(arrow)]);
}
def('flip-3-horizontal', flip3, { aliases: ['flip', 'mirror', 'reflect'] });
def('flip-3-vertical', (sh, R) => turn(flip3(sh, R && [24 - R[3], R[0], 24 - R[1], R[2]])), { aliases: ['flip', 'mirror', 'reflect'] });

// circle-slash-2 and square-slash-2 (his square-and-slash-1 and square-and-slash): the empty-set sign
// and its square twin. Symbols: every style the stroke.
const FREE = (sh) => (sh ? 'M1.7071 22.2929L22.2929 1.7071' : 'M2 22L22 2');
def('circle-slash-2', (sh) => [S(circ([12, 12], 9) + FREE(sh))], { aliases: ['empty-set', 'null', 'diameter', 'square-and-slash'] });
def('square-slash-2', (sh, R) => [S(rect(4, 4, 20, 20, 3, sh, R) + (sh ? 'M2.7071 21.2929L21.2929 2.7071' : 'M3 21L21 3'))], { aliases: ['null', 'empty', 'square-and-slash'] });

// layout-columns (his three-windows): three panes 4 x 14, 2 apart. His styles: two-tone the side
// panes plated under their outline and the middle one solid, duotone the sides grey and the middle
// black, fill all three solid.
def('layout-columns', (sh, R) => {
  const l = rect(2, 5, 6, 19, 1, sh, R), m = rect(10, 5, 14, 19, 1, sh, R), r = rect(18, 5, 22, 19, 1, sh, R);
  const sides = E(grow(l + r)), mid = E(grow(m));
  return styled([S(l + m + r)], [Pl(sides), S(l + r), F(mid)], [Pl(sides), F(mid)], [F(E(grow(l + m + r)))]);
}, { aliases: ['three-windows', 'columns', 'panes', 'tiles', 'carousel'] });

// train-track: rails and sleepers in one perspective; one connected stroke, every style.
def('train-track', (sh, R) => [S(poly([[9, 3], [3, 21]], [], sh, R) + poly([[15, 3], [21, 21]], [], sh, R) + poly([[6, 6], [18, 6]], [], sh, R) + poly([[4, 12], [20, 12]], [], sh, R) + poly([[2, 18], [22, 18]], [], sh, R))], { aliases: ['railway', 'rails', 'railroad', 'track'] });

// waves, waves-2: his curves, joined where they overlapped. Open glyphs: the one-part-grey split
// (the larger part grey: waves' lower line, waves-2's curl), fill the stroke.
const WAVE = (y) => `M2 ${y + 1.5}C2.9123 ${y + 0.5421} 4.1772 ${y} 5.5 ${y}C6.8228 ${y} 8.0877 ${y + 0.5421} 9 ${y + 1.5}C9.9123 ${y + 2.4579} 11.1772 ${y + 3} 12.5 ${y + 3}C13.8228 ${y + 3} 15.0877 ${y + 2.4579} 16 ${y + 1.5}C16.9123 ${y + 0.5421} 18.1772 ${y} 19.5 ${y}C20.4 ${y} 21.3 ${y + 0.25} 22 ${y + 0.7}`;
const CURL = 'M2 12C2 8.134 5.134 5 9 5C7.8 6.2 7.4 8 8 9.6C8.7 11.4 10.5 12.5 12.5 12.5C13.8228 12.5 15.0877 11.9579 16 11C16.9123 10.0421 18.1772 9.5 19.5 9.5C20.4 9.5 21.3 9.75 22 10.2';
const split2 = (black, grey) => styled([S(black + grey)], [S(black), M(grey)], [S(black), M(grey)], [S(black + grey)]);
def('waves', (sh, R) => { const a = sh ? stubEnds(WAVE(7), 'both', R) : WAVE(7), b = sh ? stubEnds(WAVE(14), 'both', R) : WAVE(14); return split2(a, b); }, { aliases: ['water', 'sea', 'ocean', 'waves-horizontal', 'wave'] });
def('waves-2', (sh, R) => { const c = sh ? stubEnds(CURL, 'both', R) : CURL, w = sh ? stubEnds(WAVE(16), 'both', R) : WAVE(16); return split2(w, c); }, { aliases: ['wave', 'surf', 'tide', 'tsunami', 'breaking-wave'] });

/* ===================================================================== math */
// Letters and symbols: every style the stroke (the symbol-glyph rule), containers too.
const SIG_X = bisect((cx) => pathBox(poly([[18, 3], [cx, 3], [12, 12], [cx, 21], [18, 21]], [0, 1, 1, 1, 0], false))[0] - 6, 4, 7);
const sigma = (sh, R) => poly([[18, 3], [SIG_X, 3], [12, 12], [SIG_X, 21], [18, 21]], [0, 1, 1, 1, 0], sh, R, { pull: { 1: 'in', 3: 'out' } });
const pi = (sh) => (sh ? 'M1 5L23 5M8 5L8 20' : 'M2 5L22 5M8 5L8 19') + (sh ? 'M16 5L16 16C16 17.6569 17.3431 19 19 19L20 19' : 'M16 5L16 16C16 17.6569 17.3431 19 19 19');
// lambda, redrawn on his reference's construction (a hooked top, a long stroke that sweeps into a
// tail at the foot, a straight short leg) and on our own numbers: the hook a r 2.5 circle about
// (7.5, 5.5) whose top paints 2, the long stroke tangent to it running to a r 3 fillet whose floor
// paints 22, the tail out to 19, the short leg from y 11 to (5, 21).
const LAM = (() => {
  const H = [7.5, 5.5], rh = 2.5, T = [19, 17.5], rb = 3;
  const tangentFrom = (V) => { // the tangent point on the hook circle's right side, for a line through V
    const d = len(sub(V, H)), a = Math.atan2(V[1] - H[1], V[0] - H[0]), b = Math.acos(rh / d);
    return onArc(H, rh, deg(a - b));
  };
  const build = (vx, vy) => {
    const V = [vx, vy], Q = tangentFrom(V);
    const p = new Path().M([5, 5.5]);
    const aq = deg(Math.atan2(Q[1] - H[1], Q[0] - H[0]));
    for (const s of arcTo(H, rh, 180, aq < 180 ? aq + 360 : aq)) p.C(s.c1, s.c2, s.p);
    p.corner(V, T, rb).L(T);
    return { d: p.toString(), Q, V };
  };
  const vy = bisect((y) => pathBox(build(15.5, y).d)[3] - 21, 20, 26);
  const g = build(15.5, vy);
  const J = add(g.Q, mul(unit(sub(g.V, g.Q)), (11 - g.Q[1]) / unit(sub(g.V, g.Q))[1]));
  return { long: g.d, J };
})();
const lambda = (sh, R) => (sh ? stubEnds(LAM.long, 'both', R) : LAM.long) + poly([LAM.J, [5, 21]], [], sh, R, { ends: [false, true] });
// omega, redrawn on his reference: the bowl a r 9 circle about (12, 12) from 135 degrees round the
// top to 45, each end running on along its tangent to a hairpin r 1 on the foot line (21), the feet
// out to 2 and 22. No upright stub between bowl and foot.
const OMG = (() => {
  const C = [12, 12], Rr = 9, A1 = onArc(C, Rr, 135);
  const back = [Math.sin(rad(135)), -Math.cos(rad(135))];          // from the bowl's end back toward the foot: down and right
  const V1 = add(A1, mul(back, (21 - A1[1]) / back[1]));
  return { C, Rr, A1, V1, V2: [24 - V1[0], V1[1]] };
})();
function omega(sh) {
  const { C, Rr, A1, V1, V2 } = OMG;
  const p = new Path().M(sh ? [1, 21] : [2, 21]);
  if (sh) p.L(V1); else p.corner(V1, A1, 1);
  p.L(A1);
  for (const s of arcTo(C, Rr, 135, 405)) p.C(s.c1, s.c2, s.p);
  if (sh) p.L(V2); else p.corner(V2, [22, 21], 1);
  p.L(sh ? [23, 21] : [22, 21]);
  return p.toString();
}
// phi, redrawn as the open lowercase his references show: a loop r 6 about (12, 10) from its free end
// at the upper left, down and round the bottom and right to the top, turning r 1 into the stem that
// runs down through the loop to 20.
const PHI = (() => {
  // the loop's top is where the fillet leaves it (A): solved exactly onto y 3, so the ink tops out on 2
  const Rr = 6, at = (cy) => { const C = [12, cy]; return { C, f: L.filletLineArc([12, cy - Rr], [0, 1], [1, 0], C, Rr, 1) }; };
  const cy = bisect((y) => Math.min(at(y).f.A[1], at(y).f.F[1] - 1) - 3, 8, 10);   // the fillet rises past A before it turns
  const { C, f } = at(cy);
  return { C, Rr, f, start: 212, sharpC: [12, 9] };
})();
function phi(sh, R) {
  const { Rr, f, start } = PHI, C = sh ? PHI.sharpC : PHI.C;      // sharp: the true corner on the loop's top, at 3
  const aA = deg(Math.atan2(f.A[1] - C[1], f.A[0] - C[0]));
  const p = new Path().M(onArc(C, Rr, start));
  if (sh) {
    for (const s of arcTo(C, Rr, start, -90)) p.C(s.c1, s.c2, s.p);
    p.L([12, 22]);
    return stubEnds(p.toString(), 'start', R);
  }
  for (const s of arcTo(C, Rr, start, aA)) p.C(s.c1, s.c2, s.p);
  const a0 = deg(Math.atan2(f.A[1] - f.F[1], f.A[0] - f.F[0])), a1 = deg(Math.atan2(f.T[1] - f.F[1], f.T[0] - f.F[0]));
  for (const s of arcTo(f.F, 1, a0, a1 > a0 ? a1 - 360 : a1)) p.C(s.c1, s.c2, s.p);
  p.L([12, 21]);
  return p.toString();
}
const FUNC = (() => {
  const n = [7 / Math.hypot(7, 2), 2 / Math.hypot(7, 2)], hx = 12 + (12 + 3 * Math.hypot(7, 2)) / 7, H = [hx, 6];
  const tA = deg(Math.atan2(-n[1], -n[0])) + 360, eA = 360 - deg(Math.acos((19 - hx) / 3));
  const T = onArc(H, 3, tA), H2 = [24 - H[0], 24 - H[1]], Ee = onArc(H, 3, eA);
  return `M${pt([24 - Ee[0], 24 - Ee[1]])}` + L.arcC(H2, 3, eA - 180, tA - 180) + `L${pt(T)}` + L.arcC(H, 3, tA, eA);
})();
const func = (sh, R) => (sh ? stubEnds(FUNC, 'both', R) + 'M7.5 10L17.5 10' : FUNC + 'M8.5 10L16.5 10');
def('sigma', (sh, R) => [S(sigma(sh, R))], { aliases: ['sum', 'summation', 'total'] });
def('pi', (sh) => [S(pi(sh))], { aliases: ['pi-constant', 'circle-constant'] });
def('lambda', (sh, R) => [S(lambda(sh, R))], { aliases: ['anonymous-function', 'wavelength', 'serverless'] });
def('omega', (sh) => [S(omega(sh))], { aliases: ['ohm', 'resistance', 'last'] });
def('phi', (sh, R) => [S(phi(sh, R))], { aliases: ['golden-ratio', 'phase'] });
def('function', (sh, R) => [S(func(sh, R))], { aliases: ['f-of-x', 'fx', 'formula', 'square-function'] });
function contained(glyph, scale) {
  return (container) => (sharp) => {
    const frame = subs(rawStroke('play', sharp, container)[0].d)[0], g = glyph(sharp);
    const nums = [...g.matchAll(/-?\d*\.?\d+/g)].map(Number);
    let far = 0; for (let i = 0; i < nums.length; i += 2) far = Math.max(far, Math.hypot(nums[i] - 12, nums[i + 1] - 12));
    const s = scale ?? 6 / far;
    return allStroke([S(frame + xf(g, (p) => [12 + (p[0] - 12) * s, 12 + (p[1] - 12) * s]))]);
  };
}
for (const [n, gl, sc] of [['sigma', (sh) => sigma(sh, sh ? [5, 2, 19, 22] : null)], ['pi', (sh) => pi(sh), 0.5], ['function', (sh) => func(sh, sh ? [4, 2, 20, 22] : null)]])
  CONTAINERS[n] = { square: contained(gl, sc)('square'), circle: contained(gl, sc)('circle') };

// angle: 18 x 18 on the centre line like percent, hash and command (it was drawn 16, 3 in from every
// side, a size smaller than every symbol beside it); the arc r 9 keeps its 16:8 slope and proportion
const ANG_X = bisect((v) => pathBox(poly([[21, 21], [v, 21], [v + 9, 3]], [0, 1, 0], false))[0] - 3, 1, 5);
def('angle', (sh, R) => [S(poly([[21, 21], [ANG_X, 21], [ANG_X + 9, 3]], [0, 1, 0], sh, R, { pull: { 1: 'in' } }) + L.arc([ANG_X, 21], 9, -deg(Math.atan2(18, 9)), 0))], { aliases: ['degree', 'geometry', 'corner-angle'] });
// radius, redrawn on his reference: a ring r 9 opened at the top round a bead, the radius running from
// that bead down to a bead at the centre. Beads 3 (r 1.5), the ring's cut ends 2 clear of the top
// bead (sharp: their butt corners). The ring grey and the radius black in two-tone and duotone.
const RAD = (() => {
  const C = [12, 12], Rr = 10, top = [12, 2.5], clear = 1.5 + 2 + 1;
  const d = (a) => len(sub(onArc(C, Rr, a), top)) - clear;
  const a = bisect(d, -90, 0);
  const sharpCorner = (ang) => Math.min(len(sub(onArc(C, Rr - 1, ang), top)), len(sub(onArc(C, Rr + 1, ang), top))) - 3.5;
  const as = bisect(sharpCorner, -90, 0);
  return { C, Rr, top, a, as };
})();
def('radius', (sh) => {
  const { C, Rr, top, a, as } = RAD, e = sh ? as : a;
  const line = 'M12 2.5L12 12', ringD = L.arc(C, Rr, e, 180 - e);
  const beads = circ(top, 1.5) + circ(C, 1.5);
  return styled([S(ringD + line), F(beads)], [M(ringD), S(line), F(beads)], [M(ringD), S(line), F(beads)], [S(ringD + line), F(beads)]);
}, { aliases: ['circle-radius', 'geometry'] });

// cone: its open base (his drawing, 20 Oct) is a black solid inside a grey rim in duotone and cut out
// of the fill. Its sides are tangent to the base ellipse, not run to its ends: meeting the ellipse at
// (4, 19) at an angle kinked both the outline and the open face where the side's band crossed the ring's.
const ellFace = (d) => [Bo.shrink(runs(d)[0])];
const coneTan = (yv) => {
  // the tangents from the apex (12, yv) to the ellipse (12, 19) 8 x 3, and their angle above its axis
  const y0 = 9 / (yv - 19), x0 = 8 * Math.sqrt(1 - (y0 * y0) / 9);
  return { l: [12 - x0, 19 + y0], r: [12 + x0, 19 + y0], th: (Math.asin(-y0 / 3) * 180) / Math.PI };
};
const coneSides = (yv, sh, R) => { const t = coneTan(yv); return poly([t.l, [12, yv], t.r], [0, 1, 0], sh, R, { ends: [false, false] }); };
// sharp's plate built from its parts: grow() loses the tangent joint to rounding at a true apex (it
// reads the near-zero turn as an inner corner and trips on its own spike), so the apex's round join,
// the sides offset a unit and the base arc's own offset are joined by hand
function coneSharpPlate(yv) {
  const t = coneTan(yv), V = [12, yv], u = unit(sub(t.r, V)), nR = [u[1], -u[0]], nL = [-nR[0], nR[1]];
  const run = runs(`M${pt(t.r)}` + L.ellArcC([12, 19], 8, 3, 0, -t.th, 180 + t.th))[0];
  let off = Bo.G.offsetRun(run, 1, false);
  if (len(sub(off[0].p[0], add(t.r, nR))) > 1e-3) off = Bo.G.offsetRun(run, -1, false);
  assert(len(sub(off[0].p[0], add(t.r, nR))) < 1e-3 && len(sub(off.at(-1).p.at(-1), add(t.l, nL))) < 1e-3, 'cone sharp plate: the base offset misses the sides');
  const ang = (v) => L.deg(Math.atan2(v[1], v[0]));
  const d = `M${pt(add(V, nL))}` + L.arcC(V, 1, ang(nL), ang(nR)) + `L${pt(add(t.r, nR))}` + Bo.G.emit(off, false).replace(/^M[^LC]*/, '') + 'Z';
  return [runs(d)[0]];
}
const CONE_Y = bisect((y) => pathBox(coneSides(y, false))[1] - 2, -1, 4);
def('cone', (sh, R) => {
  // sharp's true apex sits on 2, where the fillet's crest is: its own tangents, so sharp stays smooth too
  const yv = sh ? 2 : CONE_Y, sides = coneSides(yv, sh, R), ell = L.ellipse([12, 19], 8, 3, 0);
  const P = sh ? coneSharpPlate(yv) : grow(sides + L.ellArcC([12, 19], 8, 3, 0, -coneTan(yv).th, 180 + coneTan(yv).th) + 'Z');
  const face = ellFace(ell);
  return styled([S(sides + ell)], [Pl(E(P)), S(sides + ell)], [Pl(E(P)), F(E(face))], [F(E(minus(P, face)))]);
}, { aliases: ['geometry', 'solid', '3d'] });
// The box rule (his 20 Oct calls on cuboid, cylinder, pyramid, after the shipped box): one face is the
// lit face. Duotone is the grey body with that face black out to its edges, its inner edges' strokes
// included and cut straight where they meet the outline; fill is the solid body with that face's
// counter cut out. The cone keeps his own drawing (its open face black inside a grey rim).
function faceStyles(outline, P, lit, counter) {
  return styled([S(outline)], [Pl(E(P)), S(outline)], [Pl(E(P)), F(E(lit))], [F(E(minus(P, counter)))]);
}
/** a convex polygon's counter: its edges moved a unit inward, met at true corners (a fillet r 1 lands there too) */
function counterOf(pts, radii, sh, R) {
  const { q } = poly(pts, radii, sh, R, { closed: true, raw: true });
  const n = q.length, cw = q.reduce((a, p, i) => a + cross(p, q[(i + 1) % n]), 0) > 0 ? 1 : -1;
  const lines = q.map((p, i) => { const t = unit(sub(q[(i + 1) % n], p)), m = mul([-t[1], t[0]], cw); return [add(p, m), t]; });
  const at = lines.map((l, i) => { const [a, r] = lines[(i - 1 + n) % n], [b, u] = l; return add(a, mul(r, cross(sub(b, a), u) / cross(r, u))); });
  return [runs('M' + at.map(pt).join('L') + 'Z')[0]];
}
/** the lit face out to its edges: the region beyond the inner edges (a far polygon), grown a unit, met with the plate */
const litFace = (far, P) => meet(P, growPoly(far, far.map(() => 0), false, null));
def('cylinder', (sh) => {
  const lid = L.ellipse([12, 5], 8, 3, 0), outline = lid + 'M4 5L4 19M20 5L20 19' + L.ellArc([12, 19], 8, 3, 0, 0, 180);
  const P = grow(L.ellArc([12, 5], 8, 3, 0, 180, 360) + 'L20 19' + L.ellArcC([12, 19], 8, 3, 0, 0, 180) + 'Z');
  // the lid out to its rim's outer edge: its back arc is the plate's own edge, so it needs no clip
  return faceStyles(outline, P, [Bo.grow(runs(lid)[0])], ellFace(lid));
}, { aliases: ['geometry', 'solid', '3d', 'tube'] });
const HEX = [[3, 8], [8, 3], [21, 3], [21, 16], [16, 21], [3, 21]], HEX_R = [0, 1, 0, 1, 0, 1];
def('cuboid', (sh, R) => {
  const hex = poly(HEX, HEX_R, sh, R, { closed: true }), P = growPoly(HEX, HEX_R, sh, R);
  // the top face lit; the far polygon runs its two inner edges on past the outline
  const lit = litFace([[-6, 8], [16, 8], [27, -3], [27, -12], [-6, -12]], P);
  return faceStyles(hex + 'M3 8L16 8L16 21M16 8L21 3', P, lit, counterOf([[3, 8], [8, 3], [21, 3], [16, 8]], [0, 1, 0, 0], sh, R));
}, { aliases: ['cube', 'box-3d', 'geometry', 'solid', 'prism'] });
const PYR_X = bisect((v) => pathBox(poly([[v, 17], [12, 2], [24 - v, 17], [12, 22]], [1, 0, 1, 0], false, null, { closed: true }))[0] - 2, 0, 3);
def('pyramid', (sh, R) => {
  const PTS = [[PYR_X, 17], [12, 2], [24 - PYR_X, 17], [12, 22]];
  const sil = poly(PTS, [1, 0, 1, 0], sh, R, { closed: true }), P = growPoly(PTS, [1, 0, 1, 0], sh, R);
  // the right face lit (his fill: the left face solid, the right one open)
  const lit = litFace([[12, -12], [36, -12], [36, 36], [12, 36]], P);
  return faceStyles(sil + 'M12 2L12 22', P, lit, counterOf([[12, 2], [24 - PYR_X, 17], [12, 22]], [0, 1, 0], sh, R));
}, { aliases: ['geometry', 'solid', '3d', 'tetrahedron'] });

// vector-square and vector-polygon: square nodes on the corners of a square and of a pentagon (his
// "yours looks triangle"). The nodes black and the edges grey in duotone, the nodes solid in fill.
const NODES = (sh, R, cs) => cs.map(([x, y]) => rect(x - 2, y - 2, x + 2, y + 2, 1, sh, R)).join('');
function nodeStyles(nodes, edges, sh) {
  const P = E(grow(nodes));
  return styled([S(nodes + edges)], [Pl(P), S(nodes + edges)], [M(edges), F(P)], [F(P), S(edges)]);
}
def('vector-square', (sh, R) => nodeStyles(NODES(sh, R, [[5, 5], [19, 5], [5, 19], [19, 19]]), 'M7 5L17 5M7 19L17 19M5 7L5 17M19 7L19 17', sh), { aliases: ['path', 'bezier', 'vector', 'nodes', 'select'] });
const PENT = [[12, 4], [20, 10], [17, 20], [7, 20], [4, 10]];
const edgeBetween = (a, b) => {
  // the centre line from node a to node b, cut where it leaves each node's 4 x 4 box
  const exit = (p, q) => { const d = sub(q, p), t = Math.min(Math.abs(d[0]) > 1e-9 ? 2 / Math.abs(d[0]) : Infinity, Math.abs(d[1]) > 1e-9 ? 2 / Math.abs(d[1]) : Infinity); return add(p, mul(d, t)); };
  return `M${pt(exit(a, b))}L${pt(exit(b, a))}`;
};
def('vector-polygon', (sh, R) => nodeStyles(NODES(sh, R, PENT), PENT.map((p, i) => edgeBetween(p, PENT[(i + 1) % 5])).join(''), sh), { aliases: ['path', 'vector', 'nodes', 'pentagon', 'shape'] });

// weight and weight-tilde: a body r 2 and its ring resting on it. Tools rule: the body a black solid
// (the tilde open in it), the ring grey; fill the solid body on the stroked ring.
const WT_X = bisect((v) => pathBox(poly([[7, 9], [17, 9], [v, 21], [24 - v, 21]], [2, 2, 2, 2], false, null, { closed: true }))[2] - 21, 20, 23);
const weightBody = (sh, R) => poly([[7, 9], [17, 9], [WT_X, 21], [24 - WT_X, 21]], [2, 2, 2, 2], sh, R, { closed: true, pull: { 2: 'out', 3: 'in' } });
const TILDE_SMALL = (sh) => { const t = xf(rawStroke('tilde', false)[0].d, (p) => [12 + (p[0] - 12) * 0.43, 15 + (p[1] - 12) * 0.43]); return sh ? stubEnds(t, 'both', [12 - 4.01, 15 - 2, 12 + 4.01, 15 + 2]) : t; };
function weightStyles(sh, R, mark) {
  const body = weightBody(sh, R), ring = circ([12, 6], 3);
  const solid = mark ? minus(grow(body), band(mark, sh)) : grow(body);
  const plates = E(U(grow(body), disc([12, 6], 4)));
  return styled([S(body + ring + (mark || ''))], [Pl(plates), S(body + ring + (mark || ''))], [M(ring), F(E(solid))], [F(E(solid)), S(ring)]);
}
def('weight', (sh, R) => weightStyles(sh, R, null), { aliases: ['mass', 'kilogram', 'heavy', 'kettlebell'] });
def('weight-tilde', (sh, R) => weightStyles(sh, R, TILDE_SMALL(sh)), { aliases: ['approximate-weight', 'about', 'estimate'] });

// drafting-compass, redrawn on his reference's construction: the hinge, two legs and the arc the
// compass draws, centred on the hinge so it crosses both legs square. Ours: hinge r 2 on (12, 6)
// under a handle, legs to (5, 22) and (19, 22), the arc r 12 about the hinge reaching 2 and 22.
// The hinge and legs black, the arc grey in duotone; fill the hinge solid.
const DC = (() => {
  const H = [12, 6], fl = [5, 22], fr = [19, 22], Ra = 12, a0 = deg(Math.acos(9 / 12));
  return { H, fl, fr, Ra, a0, la: add(H, mul(unit(sub(fl, H)), 2)), lb: add(H, mul(unit(sub(fr, H)), 2)) };
})();
def('drafting-compass', (sh, R) => {
  const { H, fl, fr, Ra, a0, la, lb } = DC;
  const legs = (sh ? 'M12 1L12 4' : 'M12 2L12 4') + poly([la, fl], [], sh, R, { ends: [false, true] }) + poly([lb, fr], [], sh, R, { ends: [false, true] });
  const arcD = sh ? stubEnds(L.arc(H, Ra, a0, 180 - a0), 'both', R) : L.arc(H, Ra, a0, 180 - a0);
  const hinge = circ(H, 2), solid = E(disc(H, 3));
  return styled([S(legs + hinge + arcD)], [Pl(solid), S(legs + hinge + arcD)], [M(arcD), S(legs), F(solid)], [F(solid), S(legs + arcD)]);
}, { aliases: ['compass', 'dividers', 'geometry', 'draw-circle'] });
const TR_T = bisect((t) => pathBox(poly([[21, t], [21, 21], [t, 21]], [1.5, 3, 1.5], false, null, { closed: true }))[1] - 3, 0, 4);
def('triangle-right', (sh, R) => {
  const d = poly([[21, TR_T], [21, 21], [TR_T, 21]], [1.5, 3, 1.5], sh, R, { closed: true, pull: { 0: 'out', 2: 'in' } }), P = E(grow(d));
  return styled([S(d)], [Pl(P), S(d)], [S(d)], [F(P)]);
}, { aliases: ['right-triangle', 'geometry', 'shape'] });

// grid-2x2 and copy compounds: the shipped -plus's own variants, every layer, the sign swapped
function swapSign(base, plus, sign) {
  return (sh) => Object.fromEntries(STY.map((st) => {
    const ls = rawLayers(base, st, sh ? 'sharp' : 'regular');
    let hit = 0;
    const out = ls.map((l) => { if (l.d.includes(plus(sh))) { hit++; return { ...l, d: l.d.replace(plus(sh), sign(sh)) }; } return l; });
    if (!hit && st !== 'fill') throw new Error(`${base} ${st}: plus not found`);
    return [st, out];
  }));
}
const GPLUS = (sh) => (sh ? 'M19 15L19 23M15 19L23 19' : 'M19 16L19 22M16 19L22 19');
const gridSign = (check) => (sh) => (check ? (sh ? 'M15.7055 19.2971L18.3333 22L22.1467 15.76' : 'M16 19.6L18.3333 22L22 16') : (sh ? 'M15.7071 15.7071L22.2929 22.2929M22.2929 15.7071L15.7071 22.2929' : 'M16 16L22 22M22 16L16 22'));
def('grid-2x2-check', (sh) => { const v = swapSign('grid-2x2-plus', GPLUS, gridSign(true))(sh); return { ...v, stroke: v.stroke }; }, { aliases: ['grid-check', 'select-all'] });
def('grid-2x2-x', (sh) => swapSign('grid-2x2-plus', GPLUS, gridSign(false))(sh), { aliases: ['grid-remove'] });
// copy: the back sheet and the front plate from copy-plus, the sign's knockout rebuilt for each sign
function copyStyles(sh, sign) {
  const st = rawLayers('copy-plus', 'stroke', sh ? 'sharp' : 'regular')[0].d;
  const cplus = sh ? 'M15 11L15 19M11 15L19 15' : 'M15 12L15 18M12 15L18 15';
  if (!st.includes(cplus)) throw new Error('copy-plus sign moved');
  const base = st.replace(cplus, ''), [back, front] = [base.split(/(?=M)/)[0], base.split(/(?=M)/).slice(1).join('')];
  const plate = grow(front), hole = band(sign, sh);
  return styled([S(base + sign)], [Pl(E(plate)), S(base + sign)], [Pl(E(plate)), S(back + sign)], [S(back), F(E(minus(plate, hole)))]);
}
def('copy-minus', (sh) => copyStyles(sh, sh ? 'M11 15L19 15' : 'M12 15L18 15'), { aliases: ['remove-copy'] });
def('copy-x', (sh) => copyStyles(sh, sh ? 'M11.7071 11.7071L18.2929 18.2929M18.2929 11.7071L11.7071 18.2929' : 'M12 12L18 18M18 12L12 18'), { aliases: ['delete-copy'] });
// copy-off: copy cut by the house slash. The -off law (sharp.md): two-tone the front sheet's plate in
// its near and far pieces under the near strokes, duotone those plates and the back sheet grey with
// the slash black, fill the plates solid with the back sheet and slash stroked.
const U4 = 4 * R2, US = 4 * R2 - 2, U3 = 3 * R2;
function offCut(d, sharp) {
  const u = (p) => p[0] - p[1];
  const tg = (s, t) => { const h = 1e-5, a = L.segAt(s, Math.max(0, t - h)), b = L.segAt(s, Math.min(1, t + h)); return unit(sub(b, a)); };
  const pieces = (keep) => {
    let near = '', far = '';
    for (const run of parseRuns(d)) {
      const ps = [];
      run.segs.forEach((s, i) => {
        let t = 0, k = keep(s, 0);
        for (let j = 1; j <= 400; j++) { const tj = j / 400, kj = keep(s, tj); if (kj !== k) { const tb = bisect((x) => (keep(s, x) === k ? -1 : 1), (j - 1) / 400, tj, 60); if (k) ps.push([i, t, tb]); t = tb; k = kj; } }
        if (k) ps.push([i, t, 1]);
      });
      const chains = [];
      for (const pc of ps) { const last = chains.at(-1)?.at(-1); if (last && ((last[0] === pc[0] && Math.abs(last[2] - pc[1]) < 1e-9) || (last[0] + 1 === pc[0] && last[2] === 1 && pc[1] === 0))) chains.at(-1).push(pc); else chains.push([pc]); }
      if (run.closed && chains.length > 1) { const f = chains[0][0], l = chains.at(-1).at(-1); if (f[1] === 0 && f[0] === 0 && l[0] === run.segs.length - 1 && l[2] === 1) chains[0] = [...chains.pop(), ...chains[0]]; }
      for (const ch of chains) {
        const segs = ch.map(([i, t0, t1]) => L.segPiece(run.segs[i], t0, t1)), dd = segs.map((s, k) => L.segD(s, k === 0)).join('');
        const mid = L.segAt(segs[Math.floor(segs.length / 2)], 0.5);
        if (u(mid) <= 0) near += dd; else far += dd;
      }
    }
    return { near, far };
  };
  return pieces((s, t) => {
    const p = L.segAt(s, t);
    if (u(p) <= 0) return true;
    if (!sharp) return u(p) >= U4;
    const T = tg(s, t), n = [-T[1], T[0]];
    return Math.min(u(add(p, n)), u(sub(p, n))) >= US;
  });
}
/**
 * The far plate of a regular -off, ported from the 1.5.0 batch (star-off, save-off): the base's plate
 * from the point beside each far stroke end (the end pushed out a unit on its outer side), an r 1
 * turn about the end round to the notch line u = 3 sqrt 2, and that line between the two turns.
 */
const tangentAt = (s, t) => { const h = 1e-5, a = L.segAt(s, Math.max(0, t - h)), b = L.segAt(s, Math.min(1, t + h)); return unit(sub(b, a)); };
function roundedFarPlate(farSegs, prun, baseD) {
  const uu = (p) => p[0] - p[1];
  const polys = [Bo.flat(runs(baseD)[0], 0.02)];
  const Ee = [farSegs[0].p[0], farSegs.at(-1).p.at(-1)];
  const into = [tangentAt(farSegs[0], 0), mul(tangentAt(farSegs.at(-1), 1), -1)];
  const out = Ee.map((e, k) => { const t = into[k], n = [-t[1], t[0]]; return Bo.winding(add(e, mul(n, 0.5)), polys) !== 0 ? mul(n, -1) : n; });
  const O = Ee.map((e, k) => add(e, out[k]));
  const T = Ee.map((e) => [e[0] - 1 / R2, e[1] + 1 / R2]);
  for (const t of T) assert(Math.abs(uu(t) - U3) < 2e-4, 'notch tangent off the line');   // ends come back on 4dp
  const near = (q) => { let best = { d: Infinity }; prun.forEach((sg, i) => { for (let j = 0; j <= 2000; j++) { const p = L.segAt(sg, j / 2000), d = len(sub(p, q)); if (d < best.d) best = { d, i, t: j / 2000 }; } }); return best; };
  const refine = (q, b) => { let lo = Math.max(0, b.t - 1 / 2000), hi = Math.min(1, b.t + 1 / 2000); const sg = prun[b.i]; for (let k = 0; k < 60; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (len(sub(L.segAt(sg, m1), q)) < len(sub(L.segAt(sg, m2), q))) hi = m2; else lo = m1; } return { ...b, t: (lo + hi) / 2, d: len(sub(L.segAt(sg, (lo + hi) / 2), q)) }; };
  const A = refine(O[0], near(O[0])), Bq = refine(O[1], near(O[1]));
  assert(A.d < 2e-3 && Bq.d < 2e-3, `far plate: the offset point is ${Math.max(A.d, Bq.d).toFixed(4)} off the plate`);
  const walk = (a, b) => {
    const segs = [], n = prun.length;
    if (a.i === b.i && b.t > a.t) return [L.segPiece(prun[a.i], a.t, b.t)];
    segs.push(L.segPiece(prun[a.i], a.t, 1));
    for (let i = (a.i + 1) % n; i !== b.i; i = (i + 1) % n) segs.push(prun[i]);
    if (b.t > 0) segs.push(L.segPiece(prun[b.i], 0, b.t));
    return segs;
  };
  const meanU = (segs) => segs.reduce((acc, sg) => acc + uu(L.segAt(sg, 0.5)), 0) / segs.length;
  const fwd = walk(A, Bq), bwd = walk(Bq, A);
  const piece = meanU(fwd) > meanU(bwd) ? fwd : bwd.reverse().map((sg) => ({ t: sg.t, p: [...sg.p].reverse() }));
  piece[0] = { ...piece[0], p: [O[0], ...piece[0].p.slice(1)] };
  piece[piece.length - 1] = { ...piece.at(-1), p: [...piece.at(-1).p.slice(0, -1), O[1]] };
  const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  const turn = (e, from, to, avoid) => {
    let a0 = ang(sub(from, e)), a1 = ang(sub(to, e));
    const av = ang(avoid);
    const inside = (a, lo, hi) => { let x = a; while (x < lo) x += 360; while (x > lo + 360) x -= 360; return x <= hi; };
    let up = a1; while (up < a0) up += 360;
    if (inside(av, a0, up)) { let dn = a1; while (dn > a0) dn -= 360; return L.arcC(e, 1, a0, dn); }
    return L.arcC(e, 1, a0, up);
  };
  let d = `M${pt(T[0])}` + turn(Ee[0], T[0], O[0], into[0]) + piece.map((sg) => L.segD(sg)).join('') + turn(Ee[1], O[1], T[1], into[1]);
  return d + 'Z';
}
const SLASH = (sharp) => (sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22');
def('copy-off', (sh) => {
  const st = rawLayers('copy', 'stroke', sh ? 'sharp' : 'regular')[0].d, [back, front] = [st.split(/(?=M)/)[0], st.split(/(?=M)/).slice(1).join('')];
  const B = offCut(back, sh), Fr = offCut(front, sh), P = grow(front);
  // near plate: cut on the slash's centre line; far plate: clear of the slash by its notch (3 sqrt 2,
  // tangent to the far caps), its outer corners turned r 1 round each far cap (sharp: straight on 4 sqrt 2 - 2)
  const half = (c) => [runs(`M${c - 10} -10L40 -10L40 ${40 - c}Z`)[0]];          // x - y >= c
  const nearP = meet(P, [runs('M-10 -10L-10 40L40 40Z')[0]]);                         // x - y <= 0
  const farP = sh ? meet(P, half(US)) : [runs(roundedFarPlate(runs(Fr.far)[0], runs(E(P))[0], front))[0]];
  const plates = E(U(nearP, farP)), slash = SLASH(sh);
  return styled([S(B.near + B.far + Fr.near + Fr.far + slash)], [Pl(plates), S(B.near + Fr.near + slash)], [Pl(E(U(nearP, farP, band(B.near + B.far, sh)))), S(slash)], [F(plates), S(B.near + B.far + slash)]);
}, { aliases: ['copy-slash', 'no-copy'] });

export const DROPPED = {
  'pen-circle': 'reads as an A in a ring at 16 px; circle-pen exists',
  'butterfly-net': 'reads as a flag or a leaf at 16 px',
  'diamond-percent': 'the percent fits the diamond only at 0.64, beads 0.7 off the slash; alias badge-percent',
  'message-square-diff': 'the sign cannot fit: a plus, a 2 gap and a rule paint 9 tall against the bubble’s 8; alias diff',
  astroid: 'his call 20 Oct: the drawing is the other set’s alone',
  'land-plot': 'his call 20 Oct', tangent: 'his call 20 Oct',
  'gallery-*-off': 'his call 20 Oct (six): the cut shreds the rails into stubs and nobody hides a gallery',
};
export const ALIAS_ONLY = { diameter: 'circle-slash-2', 'diamond-percent': 'badge-percent', 'message-square-diff': 'diff', 'line-squiggle': null, 'decimals-arrow-left': null, 'decimals-arrow-right': null };
