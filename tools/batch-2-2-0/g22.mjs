// The 2.2.0 gap batch (21 Oct 2026): nine names a sweep of two product sites found missing, drawn
// on his "try". Round 1 was reviewed as stroke drawings (scratchpad sheet); his call: keep all nine,
// build the other styles. Not drawn, with the reason on the sheet: user-star (a five-point star
// stays hollow only above R 4.3, the user sign box is 6) and calendar-sync (a dial-class sign at
// the 6 box, calendar-clock's wall).
//
// Compounds start from the shipped sibling's eight files with the sign swapped (octagon-minus off
// octagon-x, alarm-clock-x off alarm-clock-minus, book-open-text off book-open). The new bases
// follow their sibling's tones: mails as images (front plate, back a muted cut stroke), router as
// radio (body black, antennas grey, LEDs grey through the black), speaker body grey with its
// woofer and tweeter black, crosshair as locate with the inner ticks cut through the fill,
// message-dashed and split stroke in every style (circle-dashed, move-up).
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
  // two fillets on one edge must fit it: overlapping ones make the path double back on itself
  // (factory's 3-long uprights under r=1 at both ends, 21 Oct 2026), which nothing downstream sees
  const tOf = (i) => { const r = radii[i] || 0; if (r <= 0 || (!closedP && (i === 0 || i === n - 1))) return 0; const A = pts[(i - 1 + n) % n], V = pts[i], B = pts[(i + 1) % n]; return L.fillet(A, V, B, r).t; };
  for (let i = 0; i < (closedP ? n : n - 1); i++) { const j = (i + 1) % n, e = len(sub(pts[j], pts[i])); assert(tOf(i) + tOf(j) <= e + 1e-6, `fillets overlap on the edge ${pt(pts[i])} - ${pt(pts[j])}: ${(tOf(i) + tOf(j)).toFixed(3)} on ${e.toFixed(3)}`); }
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
/** a filleted polygon's inner edge, exactly: every edge moved d inward, a convex corner's radius d
    smaller (a point at r <= d), a reflex corner's d larger (drawing-a-new-icon.md section 7: build an
    inset, never offset inward). The region a knockout to the walls stays inside. */
function insetPoly(pts, radii, d) {
  const n = pts.length, A = pts.reduce((a, p, i) => a + cross(p, pts[(i + 1) % n]), 0), sg = Math.sign(A);
  const edge = (i) => { const a = pts[i], b = pts[(i + 1) % n], u = unit(sub(b, a)), nr = mul([-u[1], u[0]], sg * d); return [add(a, nr), u]; };
  const meetL = ([p, u], [q, w]) => { const t = cross(sub(q, p), w) / cross(u, w); return add(p, mul(u, t)); };
  const q = [], rr = [];
  for (let i = 0; i < n; i++) {
    const prev = edge((i - 1 + n) % n), cur = edge(i);
    q.push(meetL(prev, cur));
    const e1 = sub(pts[i], pts[(i - 1 + n) % n]), e2 = sub(pts[(i + 1) % n], pts[i]);
    const convex = Math.sign(cross(e1, e2)) === sg, r = radii[i] || 0;
    rr.push(convex ? Math.max(0, r - d) : r + d);
  }
  return runs(LA.dLA(LA.polyLA(q, rr)));
}
/**
 * A closed chain of lines and arcs with a fillet at each joint, solved exactly: the fillet's centre is
 * where the two curves offset by r meet (a line moves parallel, an arc changes radius), on the side the
 * corner turns about; each curve is trimmed to its foot. segs: {t:'L', a, b} or {t:'A', c, r, a, b}
 * (the short way round, or `dir`); radii[i] is the joint between segs[i] and segs[i + 1] (0 keeps the
 * true corner). The same skeleton with zero radii is the sharp half.
 */
function chainD(segs, radii) {
  const n = segs.length;
  const tanAt = (s, p, end) => { if (s.t === 'L') return unit(sub(s.b, s.a)); const rr = unit(sub(p, s.c)), dd = s.dir ?? arcDir(s); return dd > 0 ? [-rr[1], rr[0]] : [rr[1], -rr[0]]; };
  const foot = (s, X) => (s.t === 'L' ? add(s.a, mul(unit(sub(s.b, s.a)), dot(sub(X, s.a), unit(sub(s.b, s.a))))) : add(s.c, mul(unit(sub(X, s.c)), s.r)));
  const offsets = (s, r) => (s.t === 'L' ? [1, -1].map((k) => { const u = unit(sub(s.b, s.a)), nn = mul([-u[1], u[0]], k * r); return { t: 'L', p: add(s.a, nn), u }; }) : [s.r + r, s.r - r].filter((x) => x > 0).map((x) => ({ t: 'C', c: s.c, r: x })));
  const hit = (A, B) => {
    if (A.t === 'L' && B.t === 'L') { const den = cross(A.u, B.u); if (Math.abs(den) < 1e-12) return []; return [add(A.p, mul(A.u, cross(sub(B.p, A.p), B.u) / den))]; }
    if (A.t === 'C' && B.t === 'C') { const dd = len(sub(B.c, A.c)); if (dd < 1e-12) return []; const x = (dd * dd + A.r * A.r - B.r * B.r) / (2 * dd), h2 = A.r * A.r - x * x; if (h2 < 0) return []; const e = unit(sub(B.c, A.c)), nn = [-e[1], e[0]], h = Math.sqrt(h2); return [add(add(A.c, mul(e, x)), mul(nn, h)), add(add(A.c, mul(e, x)), mul(nn, -h))]; }
    const Ln = A.t === 'L' ? A : B, Cc = A.t === 'L' ? B : A, q = sub(Ln.p, Cc.c), bq = 2 * dot(q, Ln.u), cq = dot(q, q) - Cc.r * Cc.r, disc = bq * bq - 4 * cq;
    if (disc < 0) return []; return [1, -1].map((k) => add(Ln.p, mul(Ln.u, (-bq + k * Math.sqrt(disc)) / 2)));
  };
  const cuts = segs.map(() => ({}));
  const fil = [];
  for (let i = 0; i < n; i++) {
    const A = segs[i], B = segs[(i + 1) % n], J = A.b, r = radii[i] || 0;
    if (r <= 0) { fil.push(null); continue; }
    // the fillet sits on the side the path turns to, for both curves: a line moves that way, an arc
    // shrinks if that side is its centre's and grows if not
    const t1 = tanAt(A, J), t2 = tanAt(B, J), side = Math.sign(cross(t1, t2));
    const off = (s, t) => {
      const nn = mul([-t[1], t[0]], side);
      if (s.t === 'L') return { t: 'L', p: add(s.a, mul(nn, r)), u: unit(sub(s.b, s.a)) };
      return { t: 'C', c: s.c, r: dot(nn, sub(s.c, J)) > 0 ? s.r - r : s.r + r };
    };
    let best = null;
    for (const X of hit(off(A, t1), off(B, t2))) { const dd = len(sub(X, J)); if (!best || dd < best.dd) best = { X, dd }; }
    assert(best, `chainD: no fillet r=${r} at ${pt(J)}`);
    const T1 = foot(A, best.X), T2 = foot(B, best.X);
    cuts[i].end = T1; cuts[(i + 1) % n].start = T2; fil.push({ X: best.X, T1, T2 });
  }
  let d = '';
  for (let i = 0; i < n; i++) {
    const s = segs[i], a = cuts[i].start ?? s.a, b = cuts[i].end ?? s.b;
    if (i === 0) d += `M${pt(a)}`;
    d += s.t === 'L' ? `L${pt(b)}` : arcPts(s.c, s.r, a, b, s.dir ?? arcDir(s));
    const f = fil[i]; if (f) d += arcPts(f.X, radii[i], f.T1, f.T2, 0);
  }
  return d + 'Z';
}
/** an arc's own way round: the short one unless dir is given */
function arcDir(s) { const a0 = Math.atan2(s.a[1] - s.c[1], s.a[0] - s.c[0]), a1 = Math.atan2(s.b[1] - s.c[1], s.b[0] - s.c[0]); let dd = a1 - a0; while (dd > Math.PI) dd -= 2 * Math.PI; while (dd < -Math.PI) dd += 2 * Math.PI; return dd > 0 ? 1 : -1; }
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
        // each axis only inside its own band: feather-2's short sharp tail once moved the whole drawing 0.4
        const inBand = (v) => Math.abs(v) > 0.01 && Math.abs(v) < 0.21;
        const sx = inBand(dx) ? dx : 0, sy = inBand(dy) ? dy : 0;
        CENTRED.push(`${name} ${sx.toFixed(3)},${sy.toFixed(3)}`);
        return Object.fromEntries(STY.map((s) => [s, v[s].map((l) => ({ ...l, d: shift(l.d, sx, sy) }))]));
      }
    }
    return v;
  };
  if (opt.aliases) ALIASES[name] = opt.aliases;
}


/* ===================================================================== 2.2.0 */
const corners = (sh) => (sh ? 'sharp' : 'regular');
const ext = (a, b, k) => add(b, mul(unit(sub(b, a)), k));          // b pushed k further along a->b
/** a sibling's eight files with one sign swapped: every style's layer that carries `from` gets `to` */
function swapSign(name, sh, from, to) {
  const out = {};
  for (const st of STY) out[st] = rawLayers(name, st, corners(sh)).map((l) => (l.d.includes(from) ? { ...l, d: l.d.replace(from, to) } : l));
  return out;
}
/** holes for an existing filled path: each region run wound against the path's first contour, emitted as subpaths */
function holesAgainst(d, shape) {
  const outer = Bo.area(runs(d)[0]);
  return Bo.emitShape(shape.map((r) => (Math.sign(Bo.area(r)) === Math.sign(outer) ? Bo.revRun(r) : r)));
}
/** the solid of a fill variant (first solid layer's d) */
const solidOf = (name, sh, style = 'fill') => rawLayers(name, style, corners(sh)).find((l) => l.kind === 'solid' || l.kind === 'plate').d;

// octagon-minus: octagon-x with circle-minus's minus (a hollow body takes the container sign,
// drawing-a-new-icon.md section 9). Fill: the octagon solid with the minus's band cut out.
def('octagon-minus', (sh) => {
  const X = sh ? 'M8.7071 8.7071L15.2929 15.2929M15.2929 8.7071L8.7071 15.2929' : 'M9 9L15 15M15 9L9 15';
  const minusD = sh ? 'M7 12L17 12' : 'M8 12L16 12';
  const v = swapSign('octagon-x', sh, X, minusD);
  const oct = solidOf('octagon-x', sh, 'two-tone');                 // the plate: the octagon's painted silhouette
  v.fill = [F(E(minus(runs(oct), band(minusD, sh))))];
  return v;
}, { aliases: ['stop-minus', 'blocked', 'blocked-by', 'no-entry'] });

// alarm-clock-x: alarm-clock-minus with an x, signs inside the face (his ruling on the family); the
// tips on radius 4 like the check's (inner ink 7, gap 2), sharp ends out 0.414 on the diagonal.
def('alarm-clock-x', (sh) => {
  const a = sh ? 2 * R2 + 0.4142 / R2 : 2 * R2;
  const X = `M${pt([12 - a, 13 - a])}L${pt([12 + a, 13 + a])}M${pt([12 + a, 13 - a])}L${pt([12 - a, 13 + a])}`;
  const minusD = sh ? 'M7 13L17 13' : 'M8 13L16 13';
  const v = swapSign('alarm-clock-minus', sh, minusD, X);
  const face = solidOf('alarm-clock-minus', sh, 'two-tone');
  v.fill = [F(E(minus(runs(face), band(X, sh)))), ...rawLayers('alarm-clock-minus', 'fill', corners(sh)).filter((l) => l.kind === 'stroke')];
  return v;
}, { aliases: ['alarm-clock-off', 'alarm-off', 'alarm-delete', 'dismiss-alarm', 'cancel-alarm'] });

// mails: mail on images' stack. Front envelope 6..22 by 8..20 r=3, its flap at mail's slope to an r=1
// fillet; the back one 4 up and left, kept where it stands 4 (2 painted) clear of the front: an L.
// Tones as images': front plate, back a muted cut stroke, the flap black in duotone (mail's split);
// fill is mail's (the flap's triangle solid under the drawing) with the back stroked.
const MAILS = { x0: 6, y0: 8, x1: 22, y1: 20, r: 3 };
const FLAP_VY = MAILS.y0 + MAILS.r + (4 / 9.2929) * ((MAILS.x0 + MAILS.x1) / 2 - MAILS.x0);
def('mails', (sh, R) => {
  const { x0, y0, x1, y1, r } = MAILS, cx = (x0 + x1) / 2;
  const body = rect(x0, y0, x1, y1, r, sh, R);
  const flapPts = [[x0, y0 + r], [cx, FLAP_VY], [x1, y0 + r]];
  const flap = poly(flapPts, [0, 1, 0], sh, R, { ends: [false, false] });
  const back = poly([[2, 13], [2, 4], [15, 4]], [0, 3, 0], sh, R);
  const plate = E(grow(body));
  // duotone: no outline, so the flap's ends run to the plate's edge (x0 - 1, x1 + 1): round caps
  // reach it already; butt ends extend until the face's outer corner is on it (mail's sharp duotone)
  let flapDuo = flap;
  if (sh) {
    const s = Math.sin(Math.atan2(FLAP_VY - (y0 + r), cx - x0));
    const yAt = (x) => y0 + r - (x0 - x) * Math.tan(Math.atan2(FLAP_VY - (y0 + r), cx - x0));
    const L0 = [x0 - 1 + s, yAt(x0 - 1 + s)], L1 = [x1 + 1 - s, yAt(x0 - 1 + s)];
    flapDuo = `M${pt(L0)}L${pt(flapPts[0])}` + flap.slice(flap.indexOf('L')) + `L${pt(L1)}`;
  }
  // fill: the flap's region (top corners, top edge, the V back) solid under the whole drawing
  const top = sh ? `M${x0} ${y0 + r}L${x0} ${y0}L${x1} ${y0}L${x1} ${y0 + r}` : new Path().M([x0, y0 + r]).corner([x0, y0], [x1, y0], r).corner([x1, y0], [x1, y0 + r], r).L([x1, y0 + r]).toString();
  const vBack = poly([...flapPts].reverse(), [0, 1, 0], sh, R, { ends: [false, false] });
  const region = top + vBack.slice(vBack.indexOf('L')) + 'Z';
  return styled([S(back + body + flap)], [Pl(plate), S(back + body + flap)], [Pl(plate), M(back), S(flapDuo)], [F(region), S(back + body + flap)]);
}, { aliases: ['emails', 'envelopes', 'messages', 'inbox', 'mail-stack', 'newsletter'] });

// split: a fork. Trunk on 12 to a corner at y 13, each branch an S of git-fork's r=3 turns into a
// vertical on 6 and 18 under move-up's head at half-width 3. Open, one component: every style is
// the stroke drawing (move-up's). Sharp squares the turns as git-fork's does.
def('split', (sh, R) => {
  const left = poly([[12, 21], [12, 13], [6, 13], [6, 3]], [0, 3, 3, 0], sh, R, { ends: [true, false] });
  const right = sh ? poly([[12, 13], [18, 13], [18, 3]], [0, 0, 0], sh, R, { ends: [false, false] }) : poly([[12, 16], [12, 13], [18, 13], [18, 3]], [0, 3, 3, 0], sh, R, { ends: [false, false] });
  const heads = poly([[3, 6], [6, 3], [9, 6]], [0, 0, 0], sh, R) + poly([[15, 6], [18, 3], [21, 6]], [0, 0, 0], sh, R);
  return [S(left + right + heads)];
}, { aliases: ['fork', 'diverge', 'branch', 'ab-test', 'route-split', 'call-split'] });

// message-dashed: message's ellipse (rx 10, ry 8 about 12,11) dashed at circle-dashed's proportion
// (dash 0.4 of the pitch), dashes centred on the left, top and right extremes so the box holds, two a
// quadrant; the tail is a dash and runs along the ellipse until it stands one gap from its neighbours.
// Every style the dashes (circle-dashed); sharp stubs each arc end a unit along its tangent.
const MD = (() => {
  const C = [12, 11], a = 10, b = 8, E2 = (t) => L.ellPoint(C, a, b, 0, t);
  const t0 = 138.0, t1 = 104.0 + 360, N = 4000, ts = [], ss = [0];
  for (let i = 0; i <= N; i++) ts.push(t0 + ((t1 - t0) * i) / N);
  for (let i = 1; i <= N; i++) ss.push(ss[i - 1] + len(sub(E2(ts[i]), E2(ts[i - 1]))));
  const find = (arr, v) => { let lo = 0, hi = N; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (arr[m] < v) lo = m; else hi = m; } return lo; };
  const tAt = (s) => { const i = find(ss, s); return ts[i] + ((s - ss[i]) / (ss[i + 1] - ss[i])) * (ts[i + 1] - ts[i]); };
  const sOf = (t) => { const i = find(ts, t); return ss[i] + ((t - ts[i]) / (ts[i + 1] - ts[i])) * (ss[i + 1] - ss[i]); };
  const p = (sOf(360) - sOf(180)) / 4, dash = 0.4 * p, g = p - dash;
  const centres = [0, 1, 2, 3, 4, 5].map((k) => sOf(180) + k * p);
  const dashes = centres.map((c) => { const ta = tAt(c - dash / 2), tb = tAt(c + dash / 2); return `M${pt(E2(ta))}` + L.ellArcC(C, a, b, 0, ta, tb); });
  const tE = tAt(centres.at(-1) + dash / 2 + g), tS = tAt(centres[0] - dash / 2 - g);
  assert(tS > t0 && tE < t1, 'message-dashed: the tail has no shoulder');
  const tail = `M${pt(E2(tE))}` + L.ellArcC(C, a, b, 0, tE, t1) + 'L5 21L4.5686 16.353' + L.ellArcC(C, a, b, 0, t0, tS);
  return { dashes, tail };
})();
def('message-dashed', (sh, R) => {
  const d = [...MD.dashes, MD.tail].map((s) => (sh ? stubEnds(s, 'both', R) : s)).join('');
  return [S(d)];
}, { aliases: ['message-circle-dashed', 'draft', 'comment-draft', 'empty-message', 'placeholder'] });

// book-open-text: book-open with two lines a page, 2 clear of wall, spine and edges. Duotone as the
// base's (left page grey, right page black over the whole plate): the left lines black, the right
// ones open through page and plate both, as the fill opens them (grey lines through the black page
// were the appliance split, his 1 Oct format says otherwise). Fill: the lines' bands out.
def('book-open-text', (sh) => {
  const lines = sh ? 'M5 9L9 9M5 13L9 13M15 9L19 9M15 13L19 13' : 'M6 9L8 9M6 13L8 13M16 9L18 9M16 13L18 13';
  const leftL = lines.split(/(?=M)/).slice(0, 2).join(''), rightL = lines.split(/(?=M)/).slice(2).join('');
  const base = Object.fromEntries(STY.map((st) => [st, rawLayers('book-open', st, corners(sh))]));
  const addLines = (layers) => layers.map((l, i) => (i === layers.length - 1 && l.kind === 'stroke' ? { ...l, d: l.d + lines } : l));
  const [plate, page] = base.duotone;                               // plate (book less the spine slot), right page solid
  assert(plate.kind === 'plate' && page.kind === 'solid', 'book-open duotone layers moved');
  const fillSolid = base.fill[0];
  return styled(addLines(base.stroke), addLines(base['two-tone']),
    [Pl(plate.d + holesAgainst(plate.d, band(rightL, sh))), F(E(minus(runs(page.d), band(rightL, sh)))), S(leftL)],
    // fill: book-open's own fill path kept verbatim (its spine slot meets the outline at a point, (12,5),
    // which a boolean merges into one self-touching contour: LOOPS under evenodd), the lines' bands
    // added as holes wound against the outline
    [F(fillSolid.d + holesAgainst(fillSolid.d, band(lines, sh)))]);
}, { aliases: ['reading', 'read', 'docs', 'documentation', 'manual', 'guide', 'reference', 'article', 'book-text'] });

// crosshair: a reticle. Ring r=8 with the four ticks crossing it from the frame to radius 4; locate's
// tones (disc plate, ticks black in duotone). Fill: the disc solid with the ticks' inner runs cut out
// as far as the ring's inner edge (a knockout stops at the stroke's outline), the outer stubs solid.
def('crosshair', (sh, R) => {
  const ring = circ([12, 12], 8);
  const ticks = sh ? 'M12 1L12 9M12 23L12 15M1 12L9 12M23 12L15 12' : 'M12 2L12 8M12 22L12 16M2 12L8 12M22 12L16 12';
  const outer = sh ? 'M12 1L12 4M12 23L12 20M1 12L4 12M23 12L20 12' : 'M12 2L12 4M12 22L12 20M2 12L4 12M22 12L20 12';
  const plate = disc([12, 12], 9);
  const slots = meet(band(ticks, sh), disc([12, 12], 7));
  return styled([S(ring + ticks)], [Pl(E(plate)), S(ring + ticks)], [Pl(E(plate)), S(ticks)], [F(E(U(minus(plate, slots), band(outer, sh))))]);
}, { aliases: ['reticle', 'aim', 'target', 'scope', 'sight', 'viewfinder', 'precision', 'focus'] });

// router: a wide object (22 x 18, server's long axis): server's slab r=2 at 8 tall, three LED marks on
// pitch 4, two antennas leaning out off its top. Duotone in his 1 Oct format (save's): the body grey,
// its parts black, the LEDs as beads and the antennas (radio's appliance split, a black body with grey
// parts, predates it); fill the body solid with the LEDs open, antennas stroked.
def('router', (sh, R) => {
  const body = rect(2, 12, 22, 20, 2, sh, R);
  const ant = poly([[7, 12], [5, 4]], [0, 0], sh, R, { ends: [false, true] }) + poly([[17, 12], [19, 4]], [0, 0], sh, R, { ends: [false, true] });
  const ledD = [8, 12, 16].map((x) => circ([x, 16], 1)).join('');
  const leds = U(...[8, 12, 16].map((x) => disc([x, 16], 1)));
  const solid = E(minus(grow(body), leds));
  return styled([S(body + ant), F(ledD)], [Pl(E(grow(body))), S(body + ant), F(ledD)], [Pl(E(grow(body))), S(ant), F(ledD)], [F(solid), S(ant)]);
}, { aliases: ['modem', 'wifi-router', 'access-point', 'hotspot', 'network', 'internet', 'gateway'] });

// speaker: monitor-speaker's cabinet stood alone, narrow like smartphone (NARROW): body 5..19 by
// 2..22 r=3, woofer ring r=3 on (12,15), tweeter bead r=1.5 on (12,7), 2.5 clear either side.
// Duotone body grey, woofer and tweeter black; fill the cabinet solid, the woofer's band and the
// tweeter cut out (target's fill: the stroked ring opens, its counter stays solid).
def('speaker', (sh, R) => {
  const body = rect(5, 2, 19, 22, 3, sh, R), woofer = circ([12, 15], 3), tweeter = circ([12, 7], 1.5);
  const plate = grow(body);
  const solid = E(minus(minus(plate, minus(disc([12, 15], 4), disc([12, 15], 2))), disc([12, 7], 1.5)));
  return styled([S(body + woofer), F(tweeter)], [Pl(E(plate)), S(body + woofer), F(tweeter)], [Pl(E(plate)), S(woofer), F(tweeter)], [F(solid)]);
}, { aliases: ['loudspeaker', 'audio', 'sound', 'hifi', 'stereo', 'woofer', 'bluetooth-speaker', 'music'] });

export const DROPPED = {
  'toy-brick': 'his call, 24 Oct 2026: drop it',
  'train (side)': 'his call, 25 Oct 2026: the ask was to rename the shipped train to train-front, not a new drawing; train-off goes with it',
  'tram': 'his call, 25 Oct 2026: drop tram and tram-off',
  'car-taxi-off': 'the slash runs through the roof light; the far piece left is 1.84 long, under the debris length, so what ships reads as car-off (24 Oct 2026)',
  'user-star': 'a five-point star stays hollow only above R 4.3 (about 13 units of ink); the user sign box is 6, painting 8',
  'calendar-sync': 'two arrows round a ring is a dial-class sign; at the 6 box each head is about 1 unit (calendar-clock\'s wall)',
};

/* ========================================================= objects and places */
// Round 1 stroke drawings approved 21 Oct 2026 ("drop drama, keep the rest"); his ask before the
// styles: look at how three other sets draw each subject, never copy. What that settled is written
// on each entry: mostly which parts a solid keeps apart (windows, eyes, bands, stripes, chips, the
// poles of a magnet), every split decided by our own shipped sibling first.
const arcPts = (c, r, p0, p1, dir) => {
  const a0 = deg(Math.atan2(p0[1] - c[1], p0[0] - c[0]));
  let a1 = deg(Math.atan2(p1[1] - c[1], p1[0] - c[0]));
  if (dir > 0) while (a1 <= a0) a1 += 360; else if (dir < 0) while (a1 >= a0) a1 -= 360;
  else { while (a1 - a0 > 180) a1 -= 360; while (a1 - a0 < -180) a1 += 360; }     // dir 0: the short way (a fillet)
  let d = ''; for (const s of arcTo(c, r, a0, a1)) d += `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`; return d;
};
const inkBox = (d) => PG.strokedBBox(d, 1, 'round', 400);
const dirOf = (a) => [Math.cos(rad(a)), Math.sin(rad(a))];
/** local (u along, v across) to screen: origin o, u at screen angle a */
const frameAt = (o, a) => { const Uu = dirOf(a), Vv = [-Uu[1], Uu[0]]; return (p) => add(o, add(mul(Uu, p[0]), mul(Vv, p[1]))); };
const closedOf = (d) => d.split(/(?=M)/).filter(Boolean).map((s) => (isClosed(s) ? s : s + 'Z')).join('');
/** a held end that stops short of a ring is carried onto its centre line in sharp (truck's floor) */
const onRing = (p, c, r) => add(c, mul(unit(sub(p, c)), r));

// bus: a side view facing right like truck and car, on truck's vocabulary (wheels on 7 and 17, the
// floor broken round them, held ends a unit short of the ring in regular and on its centre line in
// sharp), roof r=3 at the back, the front raked from (20,4) to (22,10) so the two ends differ (his
// 21 Oct review: "where have you seen a bus both front and back same shaped?"). A window rule wall to
// wall on 10, three posts making three passenger panes and the windscreen. Tones as truck's and car's:
// the body grey, rule, posts and wheels black; fill the body solid with the panes open, the drawing
// over it.
const BUS = [[2, 18], [2, 4], [20, 4], [22, 10], [22, 18]], BUS_R = [1, 3, 2, 2, 1];
def('bus', (sh, R) => {
  const W = [[7, 18], [17, 18]];
  const e = sh ? 0 : 1;                                  // a held end stops a unit short in regular
  const shell = poly([[5 - e, 18], ...BUS, [19 + e, 18]], [0, ...BUS_R, 0], sh, R, { ends: [false, false] });
  const mid = `M${9 + e} 18L${15 - e} 18`;
  const wheels = W.map((c) => circ(c, 2)).join('');
  const win = 'M2 10L22 10M7 4L7 10M12 4L12 10M17 4L17 10';
  const body = poly(BUS, BUS_R, sh, R, { closed: true });
  const plate = grow(body);
  const region = minus(minus(runs(body), box(0, 0, 24, 10)), U(...W.map((c) => disc(c, 2))));
  const all = shell + mid + win + wheels;
  return styled([S(all)], [Pl(E(plate)), S(all)], [Pl(E(plate)), S(win + wheels)], [F(E(region)), S(all)]);
}, { aliases: ['coach', 'transit', 'public-transport', 'school-bus', 'shuttle'] });

// tram-front: our train's front with a pantograph for its mirrors. Tones as train's: plate grey, the
// window rule, pantograph and legs black, headlights black; fill train's, the window band and the
// lamps open, the pantograph and legs stroked.
def('tram-front', (sh, R) => {
  const body = rect(4, 6, 20, 20, 3, sh, R);
  const wire = sh ? 'M7 2L17 2' : 'M8 2L16 2';
  const panto = wire + 'M10 6L12 2L14 6';
  const legs = poly([[8, 20], [7, 22]], [0, 0], sh, R, { ends: [false, true] }) + poly([[16, 20], [17, 22]], [0, 0], sh, R, { ends: [false, true] });
  const lamps = circ([8, 16], 1) + circ([16, 16], 1);
  const plate = E(grow(body));
  const win = sh ? box(5, 7, 19, 11) : runs(new Path().M([5, 11]).corner([5, 7], [19, 7], 2).corner([19, 7], [19, 11], 2).L([19, 11]).toString() + 'Z');
  const fill = minus(minus(grow(body), Array.isArray(win[0]) ? win : win), U(disc([8, 16], 1), disc([16, 16], 1)));
  return styled([S(body + 'M4 12L20 12' + panto + legs), F(lamps)], [Pl(plate), S(body + 'M4 12L20 12' + panto + legs), F(lamps)],
    [Pl(plate), S('M4 12L20 12' + panto + legs), F(lamps)], [F(E(fill)), S(panto + legs)]);
}, { aliases: ['tram', 'streetcar', 'trolley', 'light-rail', 'cable-car'] });

// car-taxi-front: the third drawing, on his second 21 Oct review. The first stood a 5 x 5 box on the
// roof like a chimney; the second painted its sign solid in the stroke style (only dots may be) on a
// cabin as wide as the body. What every reference shares: a friendly front, the greenhouse narrower
// than the body, side mirrors, round lamps, short tyres, the roof light small and centred. Ours: the
// body 3..21 by 11..19 r=3, the pillars from its top on 5.5
// and 18.5 up to a roof on 6 (corners r=2), the roof light an outlined box 10..14 by 2..6 standing on
// the roof, mirrors off the pillars' feet out to the box, tyres 19..22, lamp marks on (7, 15) and (17, 15)
// (a bead needs a 9-tall body, which reads as a box under a hat). Duotone: the silhouette grey, the roof light black over it, lamps, tyres and mirrors
// black. Fill: the silhouette solid with the windscreen and the lamps open, tyres and mirrors stroked.
def('car-taxi-front', (sh, R) => {
  const body = rect(3, 11, 21, 19, 3, sh, R);
  const cabin = poly([[5.5, 11], [7.5, 6], [16.5, 6], [18.5, 11]], [0, 2, 2, 0], sh, R, { ends: [false, false] });
  const sign = poly([[10, 6], [10, 2], [14, 2], [14, 6]], [0, 1, 1, 0], sh, R, { ends: [false, false] });
  const mirrors = poly([[5.5, 11], [3, 8.5]], [0, 0], sh, R, { ends: [false, true] }) + poly([[18.5, 11], [21, 8.5]], [0, 0], sh, R, { ends: [false, true] });
  const tyres = poly([[6, 19], [6, 22]], [0, 0], sh, R, { ends: [false, true] }) + poly([[18, 19], [18, 22]], [0, 0], sh, R, { ends: [false, true] });
  const L1 = [7, 15], L2 = [17, 15], lampD = circ(L1, 1) + circ(L2, 1), lamps = U(disc(L1, 1), disc(L2, 1));
  const signPl = grow(closedOf(sign)), sil = U(grow(body), grow(closedOf(cabin)), signPl);
  // the windscreen: the cabin's own region less its painted band, above the body's top ink
  const glass = meet(minus(runs(closedOf(cabin)), band(cabin, sh)), box(0, 0, 24, 10));
  const all = body + cabin + sign + mirrors + tyres;
  return styled([S(all), F(lampD)], [Pl(E(sil)), S(all), F(lampD)],
    [Pl(E(sil)), F(E(signPl)), S(mirrors + tyres), F(lampD)], [F(E(minus(minus(sil, glass), lamps))), S(mirrors + tyres)]);
}, { aliases: ['taxi', 'cab', 'car-front', 'ride', 'hail', 'uber'] });

/** cloud-rain's rain: a subpath of vertical runs on x 8, 12 or 16 below the cloud */
const isRain = (sub) => { const n = sub.replace(/[MLZ]/g, ' ').trim().split(/\s+/).map(Number); const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1); return !/C/.test(sub) && xs.every((x) => x === xs[0]) && [8, 12, 16].includes(xs[0]) && ys.every((y) => y >= 15); };
// cloud-lightning: cloud-rain's open cloud, its rain traded for our zap sign's bolt at 1.5x. Tones and
// fill exactly cloud-rain's: the cloud a grey stroke, the bolt black; fill the drawing (the cloud is open).
def('cloud-lightning', (sh, R) => {
  const bolt = poly([[13.5, 12], [9, 16.5], [15, 16.5], [10.5, 21]], [0, 0, 0, 0], sh, R);
  const out = {};
  for (const st of STY) out[st] = rawLayers('cloud-rain', st, corners(sh)).map((l) => ({ ...l, d: l.d.split(/(?=M)/).filter((s) => !isRain(s)).join('') })).filter((l) => l.d);
  // the rain sat in its own layer in two-tone/duotone and in the stroke's path in stroke/fill
  for (const st of STY) { const i = out[st].findIndex((l) => l.kind === 'stroke'); if (i >= 0) out[st][i] = { ...out[st][i], d: out[st][i].d + bolt }; else out[st].push(S(bolt)); }
  return out;
}, { aliases: ['storm', 'thunderstorm', 'thunder', 'lightning', 'weather', 'bolt'] });
const subsOf = (d) => d.split(/(?=M)/).filter(Boolean);

// briefcase-medical: briefcase's eight files with the flap and clasp removed and a medical cross in the
// body. His 21 Oct review: the stroked plus "looks like briefcase plus modifier" (it was the -plus sign
// exactly). The cross is a SOLID emblem now, a Red Cross's square-armed proportion (span 8, arms 3,
// corners r=0.5, true in sharp), centred on 12,14: 2 clear of the floor's ink, 2.5 of the top wall's.
// The reference solids agree on the knockout: fill is the body with the cross open, the handle stroked.
const crossD = (sh) => {
  const P = [[10.5, 10], [13.5, 10], [13.5, 12.5], [16, 12.5], [16, 15.5], [13.5, 15.5], [13.5, 18], [10.5, 18], [10.5, 15.5], [8, 15.5], [8, 12.5], [10.5, 12.5]];
  return sh ? 'M' + P.map(pt).join('L') + 'Z' : poly(P, P.map(() => 0.5), false, null, { closed: true });
};
def('briefcase-medical', (sh) => {
  const cross = crossD(sh);
  const keep = (d) => subsOf(d).filter((s) => !/^M2 10\.5/.test(s) && !/^M9\.5 12\.1132/.test(s)).join('');
  const v = Object.fromEntries(STY.map((st) => [st, rawLayers('briefcase', st, corners(sh)).map((l) => (l.kind === 'stroke' ? { ...l, d: keep(l.d) } : l)).filter((l) => l.d)]));
  const plate = rawLayers('briefcase', 'two-tone', corners(sh))[0].d;
  const handle = subsOf(v.fill.find((l) => l.kind === 'stroke').d)[0];
  return { stroke: [...v.stroke, F(cross)], 'two-tone': [...v['two-tone'], F(cross)], duotone: [...v.duotone, F(cross)], fill: [F(E(minus(runs(plate), runs(cross)))), S(handle)] };
}, { aliases: ['first-aid', 'first-aid-kit', 'medical-kit', 'medkit', 'emergency', 'doctor-bag'] });

// magnet: an upright U, outer r=8 and inner r=3 about (12,13), arms 5 wide, arm corners r=1, pole caps
// across both arms on 7. Duotone: the U grey, the poles black down to the cap line's far edge (the
// reference solids keep the poles apart); fill: the U solid with the cap lines open between the arms'
// walls (a knockout stops at the stroke's outline).
const magnetD = (sh) => {
  const r = sh ? 0 : 1, C = [12, 13];
  const P = new Path().M([4, 13]).corner([4, 3], [9, 3], r).corner([9, 3], [9, 13], r).L([9, 13]);
  for (const s of arcTo(C, 3, 180, 0)) P.C(s.c1, s.c2, s.p);
  P.corner([15, 3], [20, 3], r).corner([20, 3], [20, 13], r).L([20, 13]);
  for (const s of arcTo(C, 8, 0, 180)) P.C(s.c1, s.c2, s.p);
  return P.toString() + 'Z';
};
def('magnet', (sh) => {
  const u = magnetD(sh), caps = 'M4 7L9 7M15 7L20 7';
  const plate = grow(u);
  return styled([S(u + caps)], [Pl(E(plate)), S(u + caps)], [Pl(E(plate)), F(E(meet(plate, box(0, 0, 24, 8))))], [F(E(minus(plate, U(box(5, 6, 8, 8), box(16, 6, 19, 8)))))]);
}, { aliases: ['magnetic', 'attract', 'attraction', 'horseshoe', 'lead-magnet'] });

// traffic-cone: cone's size (18 x 22), a flat trapezoid on a base bar, top corners r=1, two bands, the
// three white spans equal. Duotone as traffic-light's: the body grey, the bands and bar black, the bands
// cut flush along the slanted plate (chart-pyramid's levels); fill the body with the bands open
// between the walls (the reference solids' white stripes), the bar stroked.
const CONE = { x0: 6, x1: 18, tl: 10.5, tr: 13.5, top: 2, foot: 22 };
const coneX = (y) => [CONE.x0 + (CONE.foot - y) * ((CONE.tl - CONE.x0) / (CONE.foot - CONE.top)), CONE.x1 - (CONE.foot - y) * ((CONE.x1 - CONE.tr) / (CONE.foot - CONE.top))];
const CONE_BANDS = (() => { const g = (21 - 3 - 4) / 3; return [3 + g + 1, 3 + 2 * g + 3]; })();
def('traffic-cone', (sh, R) => {
  const sides = poly([[CONE.x0, CONE.foot], [CONE.tl, CONE.top], [CONE.tr, CONE.top], [CONE.x1, CONE.foot]], [0, 1, 1, 0], sh, R, { ends: [false, false] });
  const bar = sh ? 'M3 22L21 22' : 'M4 22L20 22';
  const bands = CONE_BANDS.map((y) => `M${pt([coneX(y)[0], y])}L${pt([coneX(y)[1], y])}`).join('');
  const plate = grow(sides + 'Z');
  // the walls' inner edges run a unit in from their centre lines, measured square to the slope
  const cosT = Math.cos(Math.atan((CONE.tl - CONE.x0) / (CONE.foot - CONE.top))), inset = 1 / cosT;
  const slot = (y) => { const a = coneX(y - 1), b = coneX(y + 1); return runs(`M${pt([a[0] + inset, y - 1])}L${pt([a[1] - inset, y - 1])}L${pt([b[1] - inset, y + 1])}L${pt([b[0] + inset, y + 1])}Z`); };
  const wide = CONE_BANDS.map((y) => `M0 ${y}L24 ${y}`).join('');
  return styled([S(sides + bar + bands)], [Pl(E(plate)), S(sides + bar + bands)],
    [Pl(E(plate)), F(E(meet(band(wide, sh), plate))), S(bar)], [F(E(minus(plate, U(...CONE_BANDS.map(slot))))), S(bar)]);
}, { aliases: ['cone', 'road-cone', 'construction', 'roadwork', 'safety-cone', 'pylon'] });

// construction: a barrier, the board 2..22 by 4..11 r=2 with two stripes on the free diagonal, legs to
// feet. Duotone as brick-wall's: the board grey, the stripes black stopped 2 clear of its edge, legs and
// feet black; fill brick-wall's: the stripes as slots 2 short of the board's edge (the bun format).
def('construction', (sh, R) => {
  const board = rect(2, 4, 22, 11, 2, sh, R);
  const stripes = 'M5.5 11L12.5 4M11.5 11L18.5 4';
  const legs = 'M6 11L6 20M18 11L18 20', feet = sh ? 'M3 20L9 20M15 20L21 20' : 'M4 20L8 20M16 20L20 20';
  const plate = grow(board);
  const inner = 'M7.5 9L10.5 6M13.5 9L16.5 6';                         // the stripes clipped 2 clear of the plate
  const innerD = sh ? stubEnds(inner, 'both', R) : inner;
  // duotone: the stripes black bands run across the whole board and clipped to it, as traffic-cone's
  // bands are; floating rules 2 short of the edge read as a wireframe (his 25 Oct review)
  const wide = 'M1.5 15L14.5 2M7.5 15L20.5 2';
  return styled([S(board + stripes + legs + feet)], [Pl(E(plate)), S(board + stripes + legs + feet)],
    [Pl(E(plate)), F(E(meet(band(wide, sh), plate))), S(legs + feet)], [F(E(minus(plate, meet(band(stripes, sh), box(3, 5, 21, 10))))), S(legs + feet)]);
}, { aliases: ['barrier', 'road-barrier', 'roadblock', 'under-construction', 'roadwork', 'detour'] });

// factory: redrawn on his second 21 Oct review. Teeth stepping down from the stack and an arched door
// read as a broken roof over a mouse hole. What every reference shares: a stack at one end, a sawtooth
// roof whose slopes RISE away from it with the uprights on the far side, and a row of windows. Ours:
// the stack 2..7 up to 3, three teeth 5 long rising 3 (8 to 11), the teeth's corners r=0.5 (two r=1 fillets
// overrun a 3-long upright), the stack's r=1, the floor's r=2, the floor on 21; building's window dashes on 15..17 at 10, 14 and 18, 2 clear of the
// valleys and the floor. Tones as building's: plate grey, windows black; fill the windows open.
const FACTORY = [[2, 21], [2, 3], [7, 3], [7, 11], [12, 8], [12, 11], [17, 8], [17, 11], [22, 8], [22, 21]];
const FACTORY_R = [2, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 2];      // teeth r=0.5: at r=1 two fillets overran the 3-long uprights
def('factory', (sh, R) => {
  const shell = poly(FACTORY, FACTORY_R, sh, R, { closed: true });
  const win0 = 'M10 15L10 17M14 15L14 17M18 15L18 17', win = sh ? stubEnds(win0, 'both', R) : win0;
  const plate = grow(shell);
  return styled([S(shell + win)], [Pl(E(plate)), S(shell + win)], [Pl(E(plate)), S(win)], [F(E(minus(plate, band(win, sh))))]);
}, { aliases: ['industry', 'industrial', 'manufacturing', 'plant', 'production', 'warehouse', 'mill'] });

// chess-rook: redrawn on his second 21 Oct review. A straight tower on a small flare with shallow
// merlons read as a castle keep, not a piece. What the references share: a PIECE, a crenellated crown
// over a neck, the body widening to a broad foot that reads as its own band. Ours, one outline: three
// merlons 2 wide over notches 4 wide and 3 deep (the gaps paint 2 x 3), the crown 5..19 chamfered in
// to a neck 7.5..16.5 on 10 with its line, the body widening to 6.5..17.5 on 17, the foot's band 4..20
// under a line on 17, stepped out along a slope; merlon corners r=0.5, the rest r=1 (a stepped foot
// was busier; a crown cup over a separate plinth is the other set's newest layout). Duotone: plate
// grey, both lines black wall to wall; fill: the lines open between the walls (card).
const ROOK = [[5, 2], [7, 2], [7, 5], [11, 5], [11, 2], [13, 2], [13, 5], [17, 5], [17, 2], [19, 2], [19, 7], [16.5, 10], [17.5, 17], [20, 18], [20, 22], [4, 22], [4, 18], [6.5, 17], [7.5, 10], [5, 7]];
const ROOK_R = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
def('chess-rook', (sh, R) => {
  const shell = poly(ROOK, ROOK_R, sh, R, { closed: true });
  const lines = 'M7.5 10L16.5 10M6.5 17L17.5 17';
  const plate = grow(shell);
  // the walls' inner edges: the outline inset a unit (the merlons close up, the lines lie below them);
  // sharp insets its own true corners, the pulled vertices included
  const P = sh ? poly(ROOK, ROOK_R, sh, R, { closed: true, raw: true }).q : ROOK;
  const inside = insetPoly(P, sh ? P.map(() => 0) : ROOK_R, 1);
  return styled([S(shell + lines)], [Pl(E(plate)), S(shell + lines)], [Pl(E(plate)), F(E(meet(band('M2 10L22 10M2 17L22 17', sh), plate)))],
    [F(E(minus(plate, meet(band(lines, sh), inside))))]);
}, { aliases: ['rook', 'castle', 'tower', 'chess', 'strategy', 'fortress'] });

// boom-box: radio's body 2..22 by 8..20, a handle (r=2) to 4, two speaker rings r=2. Duotone in his 1
// Oct format, speaker's: the body grey, the speaker rings and the handle black (what the fill cuts, the
// duotone paints); fill radio's, the speakers' rings open round solid hubs, the handle stroked.
def('boom-box', (sh, R) => {
  const body = rect(2, 8, 22, 20, 3, sh, R);
  const handle = poly([[6, 8], [6, 4], [18, 4], [18, 8]], [0, 2, 2, 0], sh, R, { ends: [false, false] });
  const spk = circ([8, 14], 2) + circ([16, 14], 2);
  const plate = grow(body), holes = U(disc([8, 14], 3), disc([16, 14], 3)), hubs = U(disc([8, 14], 1), disc([16, 14], 1));
  return styled([S(body + handle + spk)], [Pl(E(plate)), S(body + handle + spk)], [Pl(E(plate)), S(handle + spk)], [F(E(U(minus(plate, holes), hubs))), S(handle)]);
}, { aliases: ['boombox', 'stereo', 'ghetto-blaster', 'radio', 'music', 'cassette-player'] });

// cassette-tape: a body 2..22 by 4..20 r=3, voicemail's reels and tangent at r=2, the head window a
// trapezoid on the floor. Duotone: plate grey, reels, tape and window black (the window's legs cut flush
// on the plate's floor); fill: the reels' rings, the tape and the window's frame open, stopped at the
// floor's stroke.
def('cassette-tape', (sh, R) => {
  const body = rect(2, 4, 22, 20, 3, sh, R);
  const reels = circ([8, 11], 2) + circ([16, 11], 2), tape = 'M8 13L16 13';
  const win = poly([[6, 20], [7.5, 17], [16.5, 17], [18, 20]], [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const plate = grow(body), inside = runs(rect(3, 5, 21, 19, sh ? 0 : 2, false, null));
  const winLong = poly([[5.3333, 22], [7.5, 17], [16.5, 17], [18.6667, 22]], [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const rings = U(minus(disc([8, 11], 3), disc([8, 11], 1)), minus(disc([16, 11], 3), disc([16, 11], 1)));
  // the window's legs cut through the floor as the duotone's band runs (his 25 Oct review): the head's
  // trapezoid stands apart; stopped at the floor's stroke it left two black feet under the cuts
  const holes = U(rings, band(tape, sh), meet(band(winLong, sh), plate));
  return styled([S(body + reels + tape + win)], [Pl(E(plate)), S(body + reels + tape + win)],
    [Pl(E(plate)), S(reels + tape), F(E(meet(band(winLong, sh), plate)))], [F(E(minus(plate, holes)))]);
}, { aliases: ['cassette', 'tape', 'mixtape', 'audio-tape', 'retro', 'recording'] });

// dumbbell: redrawn on his second 21 Oct review. One plate a side on a bar read as an H. What every
// reference shares: the plates STEPPED, a tall inner plate and a shorter outer one, the grip between.
// Ours keeps them one outline a side (a dividing wall would leave the outer plate a 1 interior at
// this width): the inner plate 4 x 16 (corners r=1.5), the outer 3 x 10 (r=1), the step's inside
// corner r=0.5, the grip 6 between; 22 x 18, the wide rectangle. Tools rule: the plates black, the
// grip grey; fill the plates solid under the stroked grip.
const BELL = [[9, 4], [9, 20], [5, 20], [5, 17], [2, 17], [2, 7], [5, 7], [5, 4]], BELL_R = [1.5, 1.5, 1.5, 0.5, 1, 1, 0.5, 1.5];
def('dumbbell', (sh, R) => {
  const left = poly(BELL, BELL_R, sh, R, { closed: true }), plates = left + flipX(left);
  const bar = 'M9 12L15 12';
  const solid = E(grow(plates));
  return styled([S(plates + bar)], [Pl(solid), S(plates + bar)], [M(bar), F(solid)], [F(solid), S(bar)]);
}, { aliases: ['weights', 'gym', 'fitness', 'workout', 'exercise', 'barbell', 'strength'] });

// toy-brick: a body 2..22 by 9..19 r=2, two studs 4 x 4 on its top edge. Duotone: the body grey, the
// studs black; fill the silhouette solid.
def('toy-brick', (sh, R) => {
  const body = rect(2, 9, 22, 19, 2, sh, R);
  const stud = (x) => poly([[x, 9], [x, 5], [x + 4, 5], [x + 4, 9]], [0, 1, 1, 0], sh, R, { ends: [false, false] });
  const studs = stud(6) + stud(14);
  const studSolid = U(grow(closedOf(stud(6))), grow(closedOf(stud(14))));
  const plate = U(grow(body), studSolid);
  return styled([S(body + studs)], [Pl(E(plate)), S(body + studs)], [Pl(E(plate)), F(E(studSolid))], [F(E(plate))]);
}, { aliases: ['lego', 'brick', 'block', 'building-block', 'toy', 'construction-toy'] });

// mountain: a big peak right of centre with a smaller one behind it, every corner r=1, base on 20;
// the base corners and the big apex solved so the box paints 1..23 by 3..21. Duotone: front black,
// back grey (the big peak black over the whole grey silhouette, cut on its own slope carried down
// to the base); fill the silhouette.
const MOUNTAIN = (() => {
  const build = (ax, bx, ay) => poly([[ax, 20], [7, 10], [9.5, 13], [14, ay], [bx, 20]], [1, 1, 1, 1, 1], false, null, { closed: true });
  let ax = 2, bx = 22, ay = 4;
  for (let k = 0; k < 4; k++) {
    ay = bisect((v) => inkBox(build(ax, bx, v))[1] - 3, 1, 6);
    ax = bisect((v) => inkBox(build(v, bx, ay))[0] - 1, -1, 4);
    bx = bisect((v) => inkBox(build(ax, v, ay))[2] - 23, 20, 25);
  }
  return { pts: [[ax, 20], [7, 10], [9.5, 13], [14, ay], [bx, 20]], ay };
})();
def('mountain', (sh, R) => {
  // sharp: the base corners slide along the floor (not up their bisectors), so the floor stays on 20
  const d = poly(MOUNTAIN.pts, [1, 1, 1, 1, 1], sh, R, { closed: true, pull: { 0: 'in', 4: 'out' } });
  const plate = grow(d), A = [14, MOUNTAIN.ay], V = [9.5, 13];
  const xAt = (y) => A[0] + (V[0] - A[0]) * ((y - A[1]) / (V[1] - A[1]));
  const front = runs(`M${pt([xAt(-2), -2])}L26 -2L26 26L${pt([xAt(26), 26])}Z`);
  return styled([S(d)], [Pl(E(plate)), S(d)], [Pl(E(plate)), F(E(meet(plate, front)))], [F(E(plate))]);
}, { aliases: ['mountains', 'peak', 'summit', 'hiking', 'landscape', 'terrain', 'outdoors'] });

// feather: redrawn on his second 21 Oct review. A smooth lens on a quill is a leaf (ours ships one).
// What every reference shares: the vane SPLIT, cut along the barbs, and the quill running through it
// and out below. Ours, along the free diagonal in its own frame (u along the quill, v across): the vane
// two arcs from u 6 to the tip at 26 (sagittas 4.5 above, 4 below), the quill 0..17, and one split a
// side, each a V 3 open on the edge whose apex lands ON the quill (the vane split down to the shaft:
// a join, where a notch stopped short of it would leave under 2), the lower nearer the base. Turned
// off 45 degrees until its box is square (the vane is not symmetric about the quill) and scaled to
// paint 2..22. Corners solved exactly: tip and foot r=1, the splits' edge corners r=0.5, the apexes
// true; sharp makes them all true but the tip, which stays round as leaf's sharp does. Tones and fill as
// leaf's: the vane grey with the quill black; fill the vane solid under the quill.
const FEATHER = (() => {
  const a = 6, T = 26, wU = 4.5, wL = 4, c = T - a, mid = [(a + T) / 2, 0];
  const circAt = (h, side) => { const Rr = (c * c / 4 + h * h) / (2 * h); return { c: add(mid, [0, -side * (Rr - h)]), r: Rr }; };
  const up = circAt(wU, 1), lo = circAt(wL, -1);
  const on = (C, u, sg) => [u, C.c[1] + sg * Math.sqrt(C.r * C.r - (u - C.c[0]) ** 2)];
  const split = (C, sg, uTip, uBase, uQ) => ({ tipSide: on(C, uTip, sg), baseSide: on(C, uBase, sg), Q: [uQ, 0] });
  const nU = split(up, 1, 19, 16, 13.5), nL = split(lo, -1, 14.5, 11.5, 9);
  const P0 = [a, 0], P1 = [T, 0];
  // local skeleton, +v the upper vane: base -> upper arc -> upper split -> tip -> lower arc -> lower split -> base
  const skel = [
    { t: 'A', c: up.c, r: up.r, a: P0, b: nU.baseSide }, { t: 'L', a: nU.baseSide, b: nU.Q }, { t: 'L', a: nU.Q, b: nU.tipSide },
    { t: 'A', c: up.c, r: up.r, a: nU.tipSide, b: P1 }, { t: 'A', c: lo.c, r: lo.r, a: P1, b: nL.tipSide }, { t: 'L', a: nL.tipSide, b: nL.Q },
    { t: 'L', a: nL.Q, b: nL.baseSide }, { t: 'A', c: lo.c, r: lo.r, a: nL.baseSide, b: P0 },
  ];
  const radiiR = [0.5, 0, 0.5, 1, 0.5, 0, 0.5, 1], radiiS = [0, 0, 0, 1, 0, 0, 0, 0];
  // to the screen: v flips (the upper vane goes up and left), u along the diagonal at angle th, scale k
  const toScreen = (k, o, th) => { const f = frameAt(o, th), g = (p) => f(mul([p[0], -p[1]], k)); return skel.map((s) => (s.t === 'L' ? { t: 'L', a: g(s.a), b: g(s.b) } : { t: 'A', c: g(s.c), r: s.r * k, a: g(s.a), b: g(s.b) })); };
  const quillAt = (k, o, th) => { const f = frameAt(o, th); return [f([0, 0]), f([17 * k, 0])]; };
  const draw = (k, o, th, radii) => chainD(toScreen(k, o, th), radii) + `M${pt(quillAt(k, o, th)[0])}L${pt(quillAt(k, o, th)[1])}`;
  const kAt = (th) => bisect((kk) => { const b = inkBox(draw(kk, [0, 0], th, radiiR)); return b[3] - b[1] - 20; }, 0.5, 1.5);
  const th = bisect((t) => { const b = inkBox(draw(kAt(t), [0, 0], t, radiiR)); return b[2] - b[0] - 20; }, -52, -40);
  const k = kAt(th), b0 = inkBox(draw(k, [0, 0], th, radiiR)), o = [2 - b0[0], 2 - b0[1]];
  return { vane: (sh) => chainD(toScreen(k, o, th), sh ? radiiS : radiiR), quill: quillAt(k, o, th), th, k };
})();
def('feather', (sh, R) => {
  const vane = FEATHER.vane(sh), [q0, q1] = FEATHER.quill;
  const quill = sh ? poly([q0, q1], [0, 0], sh, R, { ends: [true, false] }) : `M${pt(q0)}L${pt(q1)}`;
  const plate = grow(vane);
  return styled([S(vane + quill)], [Pl(E(plate)), S(vane + quill)], [Pl(E(plate)), S(quill)], [F(E(plate)), S(quill)]);
}, { aliases: ['quill', 'write', 'lightweight', 'light', 'plume', 'bird'] });

// footprints: redrawn on his second 21 Oct review. Oval soles over oval heels read as eggs. What every
// reference shares: SHOE prints, the sole wide at the ball and drawn in at the arch, the heel a block
// apart below it, the pair staggered. Ours: the sole a filleted polygon toe up (r=2 round the toe and
// ball, the arch a reflex corner r=2 on the inner side, the back r=1), the heel 4.6 x 4 r=1 2 clear
// below; each foot turned 10 degrees out, the left low on the box's left and floor, the right high on
// its right and top, 1..23 both ways at paw-print's 22. Sharp keeps the sole's r=2 curves (shape). Tones as paw-print's: soles grey, heels black; fill all solid.
const SOLE = [[-3, 3.2], [-2.3, 0], [2.3, 0], [3.1, 3.1], [1.9, 5.6], [2.3, 7.8], [-2.3, 7.8]], SOLE_R = [2, 2, 2, 2, 2, 1, 1];
const HEEL = [[-2.1, 11.8], [2.5, 11.8], [2.5, 15.8], [-2.1, 15.8]], HEEL_R = [1, 1, 1, 1];
const PRINTS = (() => {
  const turn = (p, deg) => { const t = rad(deg); return [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)]; };
  const foot = (m) => ({ sole: SOLE.map((p) => turn([p[0] * m, p[1]], 10 * m)), heel: HEEL.map((p) => turn([p[0] * m, p[1]], 10 * m)) });
  const box0 = (f) => inkBox(L.polyContour(f.sole, SOLE_R).toString() + L.polyContour(f.heel, HEEL_R).toString());
  const Lf = foot(1), Rf = foot(-1), bL = box0(Lf), bR = box0(Rf);
  const mv = (f, o) => ({ sole: f.sole.map((p) => add(p, o)), heel: f.heel.map((p) => add(p, o)) });
  return [mv(Lf, [1 - bL[0], 23 - bL[3]]), mv(Rf, [23 - bR[2], 1 - bR[1]])];
})();
/** a filleted polygon's plate, exactly, with the radii as given (no sharp pull) */
const growLA = (pts, radii) => { const segs = LA.polyLA(pts, radii), o = LA.offsetLA(segs, 1); LA.verifyOffset(segs, o, 1); return [runs(LA.dLA(o))[0]]; };
// sharp keeps the sole's r=2 curves (shape, as paw-print's pads stay round; only fillets under 1.2 are
// corners), its back and the heel go true, the heel pulled to the rounded box
const SOLE_RS = SOLE_R.map((r) => (r < 1.2 ? 0 : r));
def('footprints', (sh, R) => {
  const soles = PRINTS.map((f) => L.polyContour(f.sole, sh ? SOLE_RS : SOLE_R).toString()).join('');
  const heels = PRINTS.map((f) => poly(f.heel, HEEL_R, sh, R, { closed: true })).join('');
  const all = soles + heels;
  // the plates exactly, lines and arcs offset a unit (grow's free-cubic offset trips on the arch's
  // reflex fillet)
  const solePl = U(...PRINTS.map((f) => growLA(f.sole, sh ? SOLE_RS : SOLE_R))), heelPl = U(...PRINTS.map((f) => growPoly(f.heel, HEEL_R, sh, R)));
  return styled([S(all)], [Pl(E(U(solePl, heelPl))), S(all)], [Pl(E(solePl)), F(E(heelPl))], [F(E(U(solePl, heelPl)))]);
}, { aliases: ['footprint', 'steps', 'walk', 'walking', 'trail', 'track', 'tracking', 'shoe-prints'] });

// bone: redrawn in the 21 Oct self-review. The flat bone (knobs r=3.5 on a 4-unit shaft) read as a bow
// tie at 16, and bone-fractured (his ask) needs a shaft long enough to break. Laid on the free diagonal
// as the shaft wants: in its own frame (u along, v across) knobs R 2.5 on (+-a, +-2.5), the shaft's walls
// on v = +-2 (2 of daylight inside), every concave corner r=1 (sharp: the true crossings); a solved so
// it paints 2..22. One shape: duotone is the drawing.
const BONE = { R: 2.5, s: 2.5, w: 2, r: 1 };
/** the +u end of a bone, from the top wall at uEnd round both knobs to the bottom wall at uEnd */
function boneEnd(a, uEnd, sh) {
  const { R, s, w, r } = BONE, K1 = [a, -s], K2 = [a, s];
  if (sh) {
    const ju = a - Math.sqrt(R * R - (s - w) ** 2), nu = a + Math.sqrt(R * R - s * s);
    return `M${pt([uEnd, -w])}L${pt([ju, -w])}` + arcPts(K1, R, [ju, -w], [nu, 0], 1) + arcPts(K2, R, [nu, 0], [ju, w], 1) + `L${pt([uEnd, w])}`;
  }
  const on = (Cc, Fc) => add(Cc, mul(unit(sub(Fc, Cc)), R));
  const fu = a - Math.sqrt((R + r) ** 2 - (s - (w + r)) ** 2), F1 = [fu, -(w + r)], F2 = [fu, w + r];
  const N = [a + Math.sqrt((R + r) ** 2 - s * s), 0];
  return `M${pt([uEnd, -w])}L${pt([fu, -w])}` + arcPts(F1, r, [fu, -w], on(K1, F1), 0) + arcPts(K1, R, on(K1, F1), on(K1, N), 1) + arcPts(N, r, on(K1, N), on(K2, N), 0)
    + arcPts(K2, R, on(K2, N), on(K2, F2), 1) + arcPts(F2, r, on(K2, F2), [fu, w], 0) + `L${pt([uEnd, w])}`;
}
const turnUV = (d) => xf(d, ([u, v]) => [-u, -v]);
const placeUV = (d) => xf(d, ([u, v]) => [12 + (u + v) / R2, 12 + (v - u) / R2]);
const boneWhole = (a, sh) => { const h1 = boneEnd(a, 0, sh), h2 = turnUV(boneEnd(a, 0, sh)); return h1 + h2.slice(h2.indexOf('L')) + 'Z'; };
const BONE_A = bisect((a) => inkBox(placeUV(boneWhole(a, false)))[0] - 2, 3, 12);
def('bone', (sh) => { const d = placeUV(boneWhole(BONE_A, sh)), plate = E(grow(d)); return styled([S(d)], [Pl(plate), S(d)], [S(d)], [F(plate)]); },
  { aliases: ['dog', 'pet', 'dog-bone', 'treat', 'skeleton'] });

// bone-fractured: his 21 Oct ask. bone's drawing broken across the middle of the shaft: the halves stay
// on their own knobs, the break a zig (one tooth into one notch, 1 deep) and the two edges kept 2 apart
// square to the zig (2.25 either side along the bone); two short ticks either side of the break on its
// axis, 2 clear of the walls, the impact marks the references use. Tones: two shapes, so the halves go
// grey with the ticks black in duotone; fill the halves solid under the stroked ticks.
const FRACT_E = 2.25;
let FRACT_V0 = null;
def('bone-fractured', (sh, R) => {
  const e = FRACT_E, w = BONE.w;
  const h1 = boneEnd(BONE_A, e, sh), h2 = turnUV(boneEnd(BONE_A, e, sh));
  const half1 = h1 + `L${pt([e + 1, 0])}Z`, half2 = h2 + `L${pt([-e + 1, 0])}Z`;
  const halves = placeUV(half1) + placeUV(half2);
  // the ticks sit on the break's axis and stand off until both halves' ink, in both corners, is 2 clear
  // of theirs (at 3 out they stood 1.47 off the tooth's corner, sharp 1.12; lint's SPACING, 25 Oct)
  const tickU = 0, ticksAt = (v0) => `M${pt([tickU, -v0])}L${pt([tickU, -(v0 + 2)])}M${pt([tickU, v0])}L${pt([tickU, v0 + 2])}`;
  const inkPts = (d, s2) => { const o = []; for (const run of parseRuns(E(band(d, s2)))) for (const sg of run.segs) for (let j = 0; j < 24; j++) o.push(L.segAt(sg, j / 24)); return o; };
  const halvesIn = (s2) => { const a = boneEnd(BONE_A, e, s2), b = turnUV(boneEnd(BONE_A, e, s2)); return placeUV(a + `L${pt([e + 1, 0])}Z`) + placeUV(b + `L${pt([-e + 1, 0])}Z`); };
  const tickIn = (v0, s2) => (s2 ? stubEnds(placeUV(ticksAt(v0)), 'both', R || [1, 1, 23, 23]) : placeUV(ticksAt(v0)));
  const gapAt = (v0) => Math.min(...[false, true].map((s2) => { const A = inkPts(halvesIn(s2), s2), B = inkPts(tickIn(v0, s2), s2); let m = 1e9; for (const p of A) for (const q of B) m = Math.min(m, len(sub(p, q))); return m; }));
  const v0 = FRACT_V0 ?? (FRACT_V0 = bisect((v) => gapAt(v) - 2, w + 2, w + 6, 30));
  const ticks = tickIn(v0, sh);
  const plate = U(grow(placeUV(half1)), grow(placeUV(half2)));
  return styled([S(halves + ticks)], [Pl(E(plate)), S(halves + ticks)], [Pl(E(plate)), S(ticks)], [F(E(plate)), S(ticks)]);
}, { aliases: ['broken-bone', 'fracture', 'injury', 'orthopedic', 'x-ray', 'bone-break'] });

// skull: redrawn on his second 21 Oct review. A circle on a narrow square jaw with one tooth line and
// a nose dot read as a light bulb with a face. What every reference shares: the cranium WIDE over a
// jaw that steps in at the cheekbones, a nose cavity as a point-up shape, the teeth as two or more
// lines. Ours: the cranium r=9 about (12,11) onto a jaw 6..18 down to 22 (cheeks concave r=1, chin
// r=2), two tooth lines on 10 and 14 from the floor up 2 (the only pair that keeps 2 clear in that
// jaw), bead eyes on (8.5, 11) and (15.5, 11) (the stroke style carries only dots; a bigger eye has to
// be a ring, which reads as goggles), the nose an inverted V from (12, 14) to its feet on 16, 2.1
// clear of the eyes and 2 of the teeth. 20 x 22. Duotone: plate grey, eyes, nose and teeth black;
// fill: eyes, nose and teeth open (each tooth a slot up from the floor's stroke).
const SKULL = { C: [12, 11], R: 9, jx0: 6, jx1: 18, jb: 22 };
function skullD(sh) {
  const { C, R, jx0, jx1, jb } = SKULL;
  if (sh) {
    const yj = (x) => C[1] + Math.sqrt(R * R - (x - C[0]) ** 2), Lp = [jx0, yj(jx0)], Rp = [jx1, yj(jx1)];
    return `M${pt(Lp)}` + arcPts(C, R, Lp, Rp, 1) + `L${jx1} ${jb}L${jx0} ${jb}Z`;
  }
  const fy = (jx) => C[1] + Math.sqrt((R + 1) ** 2 - (Math.abs(jx - C[0]) + 1) ** 2);
  const Fr = [jx1 + 1, fy(jx1)], Fl = [jx0 - 1, fy(jx0)], onC = (Fc) => add(C, mul(unit(sub(Fc, C)), R));
  const jaw = new Path().M([jx1, Fr[1]]).corner([jx1, jb], [jx0, jb], 2).corner([jx0, jb], [jx0, Fl[1]], 2).L([jx0, Fl[1]]).toString();
  return `M${pt(onC(Fl))}` + arcPts(C, R, onC(Fl), onC(Fr), 1) + arcPts(Fr, 1, onC(Fr), [jx1, Fr[1]], 0) + jaw.slice(jaw.indexOf('L')) + arcPts(Fl, 1, [jx0, Fl[1]], onC(Fl), 0) + 'Z';
}
/** the skull's plate exactly (grow's cubic offset stood 0.0015 past the 1 floor at the crown): the
    cranium grown to r=10, which meets the jaw's walls grown to 5 and 19 at one point in both corners
    (the regular cheek fillet's centre, the sharp corner's trimmed offset), the chin r+1 */
function skullPlate(sh) {
  const { C, R, jx0, jx1, jb } = SKULL, y = C[1] + Math.sqrt((R + 1) ** 2 - (jx1 + 1 - C[0]) ** 2);
  const Lw = [jx0 - 1, y], Rw = [jx1 + 1, y], rc = sh ? 1 : 3, cy = jb + 1 - rc;
  const cR = [jx1 + 1 - rc, cy], cL = [jx0 - 1 + rc, cy];
  return `M${pt(Lw)}` + arcPts(C, R + 1, Lw, Rw, 1) + `L${pt([jx1 + 1, cy])}` + arcPts(cR, rc, [jx1 + 1, cy], [cR[0], jb + 1], 1)
    + `L${pt([cL[0], jb + 1])}` + arcPts(cL, rc, [cL[0], jb + 1], [jx0 - 1, cy], 1) + 'Z';
}
def('skull', (sh, R) => {
  const d = skullD(sh);
  const teeth = sh ? stubEnds('M10 22L10 20M14 22L14 20', 'end', R) : 'M10 22L10 20M14 22L14 20';
  const nose = poly([[10.75, 16], [12, 14], [13.25, 16]], [0, 0, 0], sh, R);
  const eyes = [[8.5, 11], [15.5, 11]], eyeD = eyes.map((c) => circ(c, 1.5)).join('');
  const plate = runs(skullPlate(sh));
  const holes = U(...eyes.map((c) => disc(c, 1.5)), band(nose, sh), meet(band(teeth, sh), box(0, 0, 24, SKULL.jb - 1)));
  return styled([S(d + teeth + nose), F(eyeD)], [Pl(E(plate)), S(d + teeth + nose), F(eyeD)], [Pl(E(plate)), S(teeth + nose), F(eyeD)], [F(E(minus(plate, holes)))]);
}, { aliases: ['death', 'danger', 'poison', 'halloween', 'pirate', 'skeleton', 'dead'] });

// dna: redrawn on his second 21 Oct review. Two crossings with the back strand cut at each read as two
// zigzags. What the references share: a half turn standing up, the strands wide at both ends and
// crossing once in the middle, rungs across, long at the ends and short near the crossing. Ours: the
// strands 12 +/- 8 cos(pi (y - 2) / 20) from 2 to 22 (18 wide, crossing on 12 with no cut: a half turn
// has no back strand to hide), rungs on 4, 8, 16 and 20 (whole rows, crisp at 24) ending on the strands' centre lines. Open:
// two-tone and duotone the ladder split (strands black, rungs grey), fill the drawing. Sharp: the
// strands' four ends stubbed a unit along their tangents, held to the rounded box.
const DNA = (() => {
  const AMP = 8, xA = (y) => 12 + AMP * Math.cos((Math.PI * (y - 2)) / 20), xB = (y) => 24 - xA(y);
  const dxA = (y) => -AMP * (Math.PI / 20) * Math.sin((Math.PI * (y - 2)) / 20);
  const strand = (f, df) => {
    let d = `M${pt([f(2), 2])}`;
    for (let y = 2; y < 22 - 1e-9; y += 2.5) { const a = y, b = Math.min(22, y + 2.5), h = (b - a) / 3; d += `C${pt([f(a) + df(a) * h, a + h])} ${pt([f(b) - df(b) * h, b - h])} ${pt([f(b), b])}`; }
    return d;
  };
  const strands = [strand(xA, dxA), strand(xB, (y) => -dxA(y))];
  const rungs = [4, 8, 16, 20].map((y) => `M${pt([xB(y), y])}L${pt([xA(y), y])}`).join('');
  return { strands, rungs };
})();
def('dna', (sh, R) => {
  const strands = DNA.strands.map((s) => (sh ? stubEnds(s, 'both', R) : s)).join('');
  return styled([S(strands + DNA.rungs)], [M(DNA.rungs), S(strands)], [M(DNA.rungs), S(strands)], [S(strands + DNA.rungs)]);
}, { aliases: ['genetics', 'gene', 'helix', 'biology', 'science', 'genome', 'chromosome'] });

// fire-extinguisher. Tools rule: the canister black, head, lever and hose grey, the label grey through
// the black (surface detail); fill the canister and head solid with the label open between the walls,
// the lever and hose stroked.
// Redrawn in the 21 Oct self-review: the old neck and bar on top with a hose off to the side read as a
// spray bottle. The construction the references share: a valve head ON the canister, its lever out one
// way, the hose curving down the other side. Ours: the canister 9..17 (dome r=4 on 8, floor 21, r=2),
// a head box 11..15 by 4..8 standing on the dome, the lever off its right wall up at 26.6 degrees to
// 19,3, the hose off its left wall round two r=2 corners down to a free end on 17, a label rule on 16.
def('fire-extinguisher', (sh, R) => {
  const can = (() => { const p = new Path().M([9, 12]); for (const s of arcTo([13, 12], 4, 180, 360)) p.C(s.c1, s.c2, s.p); const f = poly([[17, 12], [17, 21], [9, 21], [9, 12]], [0, 2, 2, 0], sh, R, { ends: [false, false] }); return p.toString() + f.slice(f.indexOf('L')) + 'Z'; })();
  const head = poly([[11, 8], [11, 4], [15, 4], [15, 8]], [0, 1, 1, 0], sh, R, { closed: true });
  const label = 'M9 16L17 16';
  const lever = poly([[15, 5], [19, 3]], [0, 0], sh, R, { ends: [false, true] });
  const hose = poly([[11, 6], [7, 6], [5, 8], [5, 17]], [0, 2, 2, 0], sh, R, { ends: [false, true] });
  const plate = grow(can), slot = box(10, 15, 16, 17), headR = grow(head);
  const outer = lever + hose;
  // duotone: head, lever and hose one grey shape (two 0.4 layers that touch paint twice)
  const grey = U(headR, band(outer, sh), slot);
  return styled([S(can + head + label + outer)], [Pl(E(U(plate, headR))), S(can + head + label + outer)],
    // duotone (his 25 Oct "colors must be vice versa"): canister and head black, the label and the
    // horn, hose and bracket grey, the label read through the black; one grey shape, none under the black
    (() => { const lab = meet(band('M2 16L22 16', sh), plate), blk = minus(U(plate, headR), lab), gry = minus(U(paintedBy([{ kind: 'stroke', d: outer }], sh), lab), blk);
      return [Pl(E(gry)), F(E(blk))]; })(), [F(E(U(minus(plate, slot), headR))), S(outer)]);
}, { aliases: ['extinguisher', 'fire-safety', 'emergency', 'safety', 'fire'] });

// flashlight: lying on the free diagonal, head up and right, with a beam of three rays (lightbulb-on's
// vocabulary). In its own frame: body 0..9 by 2.5 either side, the head flaring to 4.5 at the lens on
// 13, corners r=1, a grip band on 4; rays 2 clear of the lens and each other, fanning 30 degrees; turned
// 45 degrees and scaled so the box paints 2..22. Tones as lightbulb-on's: the torch black, the rays
// grey, the band grey through the black; fill the torch with the band open, the rays stroked.
const TORCH = (() => {
  const geo = (k, o) => {
    const U2 = [Math.SQRT1_2, -Math.SQRT1_2], V2 = [Math.SQRT1_2, Math.SQRT1_2];
    const P = (u, v) => add(o, add(mul(U2, u * k), mul(V2, v * k)));
    const shell = [P(0, -2.5), P(9, -2.5), P(13, -4.5), P(13, 4.5), P(9, 2.5), P(0, 2.5)];
    const u0 = 13 + 4 / k;
    const rays = [[-4, -30], [0, 0], [4, 30]].map(([v, a]) => { const s0 = P(u0, v), dir = add(mul(U2, Math.cos(rad(a))), mul(V2, Math.sin(rad(a)))); return [s0, add(s0, mul(dir, 3 * k))]; });
    // the grip's slot in the fill: its band (half width 1, i.e. 1/k in this frame) between the walls'
    // inner edges (2.5 - 1/k either side)
    const h = 1 / k, slot = [P(4 - h, -2.5 + h), P(4 + h, -2.5 + h), P(4 + h, 2.5 - h), P(4 - h, 2.5 - h)];
    return { shell, grip: [P(4, -2.5), P(4, 2.5)], rays, slot };
  };
  const dOf = (g) => poly(g.shell, g.shell.map(() => 1), false, null, { closed: true }) + g.rays.map(([a, b]) => `M${pt(a)}L${pt(b)}`).join('');
  let k = 1, o = [3, 18];
  for (let it = 0; it < 30; it++) {
    const b = inkBox(dOf(geo(k, o)));
    k *= Math.sqrt((20 / (b[2] - b[0])) * (20 / (b[3] - b[1])));
    const b2 = inkBox(dOf(geo(k, o)));
    o = [o[0] + (2 - b2[0]), o[1] + (22 - b2[3])];
  }
  return geo(k, o);
})();
def('flashlight', (sh, R) => {
  const shell = poly(TORCH.shell, TORCH.shell.map(() => 1), sh, R, { closed: true });
  const grip = `M${pt(TORCH.grip[0])}L${pt(TORCH.grip[1])}`;
  const rays = TORCH.rays.map(([a, b]) => poly([a, b], [0, 0], sh, R)).join('');
  const plate = grow(shell), slot = runs('M' + TORCH.slot.map(pt).join('L') + 'Z');
  return styled([S(shell + grip + rays)], [Pl(E(plate)), S(shell + grip + rays)], [M(rays), Pl(E(slot)), F(E(minus(plate, slot)))], [F(E(minus(plate, slot))), S(rays)]);
}, { aliases: ['torch', 'light', 'beam', 'flash', 'lamp', 'search-light'] });

// binoculars: the third drawing, on his second 21 Oct review. The first read as two bottles linked (a
// centred neck on a straight barrel), the stepped redraw still did. What the references share: the
// objectives WIDER than the eyepieces, the barrels narrowing up to them, a bridge between. Ours puts
// the objectives in as glasses' lenses: rings r=4 on (6,17) and (18,17), 2 apart; each barrel two
// walls tangent to its ring up to an eyepiece end 6..10 on 3 (corners r=1), the inner wall straight
// down x 10 onto the ring's side; the bridge two rules on 8 and 12 between the inner walls, 2 apart.
// 22 x 20. Duotone: the silhouette grey, the lens rings black. Fill: the silhouette solid with each
// ring's upper arc open inside its barrel, so the lens shows under the tube.
const flipX = (d) => xf(d, (p) => [24 - p[0], p[1]]);
const BINO = (() => {
  const C = [6, 17], r = 4, Po = [6, 3], Pi = [10, 3];
  const tan = (P, side) => { const dd = len(sub(C, P)), a = Math.asin(r / dd), base = Math.atan2(C[1] - P[1], C[0] - P[0]), t = base + side * a; return add(P, mul([Math.cos(t), Math.sin(t)], Math.sqrt(dd * dd - r * r))); };
  const To = tan(Po, 1), Ti = tan(Pi, -1);
  assert(Math.abs(Ti[0] - 10) < 1e-9 && Math.abs(Ti[1] - 17) < 1e-9, 'binoculars: the inner wall is off the ring side');
  return { C, r, Po, Pi, To, Ti: [10, 17] };
})();
def('binoculars', (sh, R) => {
  const { C, r, Po, Pi, To, Ti } = BINO;
  const barrel = poly([To, Po, Pi, Ti], [0, 1, 1, 0], sh, R, { ends: [false, false] });
  const ring = circ(C, r), bridge = 'M10 8L14 8M10 12L14 12';
  const left = barrel + ring, all = left + flipX(left) + bridge;
  // a side's silhouette: the walls closed round the ring's lower arc, one contour (growing the tube and
  // the disc apart leaves both grown walls tangent to the disc, which the boolean cannot walk)
  const side = barrel + arcPts(C, r, Ti, To, 1) + 'Z';
  const sideSil = grow(side);
  const sil = U(sideSil, runs(flipX(E(sideSil))), box(10, 7, 14, 13));      // the bridge's plate between the walls' centre lines
  const annulus = (c) => minus(disc(c, r + 1), disc(c, r - 1));
  const rings = U(annulus(C), annulus([24 - C[0], C[1]]));
  // the fill's lens line: the band of the ring's arc over its top, between the walls' inner edges (a
  // knockout stops at the stroke's outline)
  const uo = unit(sub(To, Po)), no = [uo[1], -uo[0]];                  // the outer wall's normal into the tube (+x)
  assert(no[0] > 0, 'binoculars: the wall normal points out of the tube');
  const atY = (p0, u, y) => add(p0, mul(u, (y - p0[1]) / u[1]));
  const oA = atY(add(Po, no), uo, 4), oB = atY(add(Po, no), uo, 24);
  const between = runs(`M${pt(oA)}L9 4L9 24L${pt(oB)}Z`);
  const upper = `M${pt(Ti)}` + arcPts(C, r, Ti, To, -1);
  const lensLine = meet(band(upper, sh), between), lensLines = U(lensLine, runs(flipX(E(lensLine))));
  return styled([S(all)], [Pl(E(sil)), S(all)], [Pl(E(sil)), F(E(rings))], [F(E(minus(sil, lensLines)))]);
}, { aliases: ['binocular', 'explore', 'search', 'spy', 'view', 'birdwatching', 'lookout', 'field-glasses'] });

// satellite-dish: redrawn on his second 21 Oct review. On a post and base, with a feed bead and no
// signal, the dish read as a desk lamp. What every reference shares: the bowl low left facing up and
// right, the feed out of its rim, and two waves in the far corner. Ours: the bowl a half disc R=7 on
// its rim (corners r=1), the feed along the axis from the rim's middle to the waves' centre, the waves
// podcast's pitch (r=4 and 8, a 2 gap) over the quarter facing away from the bowl; the bowl's back and
// the outer wave set the box, 2..22 both ways. Tones as lightbulb-on's: the instrument black (the bowl
// a solid, the feed), the waves grey, two-tone with the bowl's plate. Fill: the bowl solid, the rest
// stroked. Sharp: the rim's corners true (inside the box), each wave end stubbed a unit along its
// tangent, the feed's free end the cap cut's 0.414.
const DISH = (() => {
  const Rb = 7, r1 = 4, r2 = 8, Mc = [3 + Rb, 21 - Rb], Fc = [21 - r2, 3 + r2];
  return { Rb, r1, r2, M: Mc, F: Fc, A: onArc(Mc, Rb, -135), B: onArc(Mc, Rb, 45), back: onArc(Mc, Rb, 135) };
})();
function bowlD(sh) {
  const { Rb: r, M: Mc, A, B } = DISH;
  if (sh) return `M${pt(B)}` + arcPts(Mc, r, B, A, 1) + 'Z';
  // a corner r=1 at each end of the rim: inside the bowl, a unit off the chord, internally tangent
  const nrm = unit(sub(DISH.back, Mc));
  const fB = L.filletLineArc(B, unit(sub(A, B)), nrm, Mc, r, 1), fA = L.filletLineArc(A, unit(sub(B, A)), nrm, Mc, r, 1);
  return `M${pt(fB.T)}` + arcPts(fB.F, 1, fB.T, fB.A, 0) + arcPts(Mc, r, fB.A, fA.A, 1) + arcPts(fA.F, 1, fA.A, fA.T, 0) + 'Z';
}
def('satellite-dish', (sh, R) => {
  const { M: Mc, F: Fc, r1, r2 } = DISH, bowl = bowlD(sh);
  const wave = (r) => `M${pt(onArc(Fc, r, -90))}` + arcPts(Fc, r, onArc(Fc, r, -90), onArc(Fc, r, 0), 1);
  const waves0 = wave(r1) + wave(r2), waves = sh ? stubEnds(waves0, 'both', R) : waves0;
  const feed = sh ? poly([Mc, Fc], [0, 0], sh, R, { ends: [false, true] }) : `M${pt(Mc)}L${pt(Fc)}`;
  const plate = E(grow(bowl));
  return styled([S(bowl + feed + waves)], [Pl(plate), S(bowl + feed + waves)], [Pl(plate), S(feed + waves)], [F(plate), S(feed + waves)]);
}, { aliases: ['satellite', 'dish', 'antenna', 'broadcast', 'signal', 'tv', 'reception', 'uplink'] });

// cookie: the house ring r=10 with a bite r=4 centred on the ring at the top right, both cuts r=1
// (sharp: the true crossings); three chips as beads, each 2 clear of everything. Duotone: the cookie
// grey, the chips black; fill the cookie with the chips open (the reference solids agree).
function cookieD(sh) {
  const C = [12, 12], Rr = 10, bc = onArc(C, Rr, -45), br = 4;
  if (sh) {
    const d0 = len(sub(bc, C)), x = (d0 * d0 + Rr * Rr - br * br) / (2 * d0), h = Math.sqrt(Rr * Rr - x * x), e = unit(sub(bc, C)), n = [-e[1], e[0]];
    const P1 = add(add(C, mul(e, x)), mul(n, h)), P2 = add(add(C, mul(e, x)), mul(n, -h));
    return `M${pt(P1)}` + arcPts(C, Rr, P1, P2, 1) + arcPts(bc, br, P2, P1, -1) + 'Z';
  }
  const both = (() => { const d0 = len(sub(bc, C)), a = Rr - 1, b = br + 1, x = (d0 * d0 + a * a - b * b) / (2 * d0), h = Math.sqrt(a * a - x * x), e = unit(sub(bc, C)), n = [-e[1], e[0]]; return [add(add(C, mul(e, x)), mul(n, h)), add(add(C, mul(e, x)), mul(n, -h))]; })();
  const [F1, F2] = both, onR = (Fc) => add(C, mul(unit(sub(Fc, C)), Rr)), onB = (Fc) => add(bc, mul(unit(sub(Fc, bc)), br));
  return `M${pt(onR(F1))}` + arcPts(C, Rr, onR(F1), onR(F2), 1) + arcPts(F2, 1, onR(F2), onB(F2), 0) + arcPts(bc, br, onB(F2), onB(F1), -1) + arcPts(F1, 1, onB(F1), onR(F1), 0) + 'Z';
}
/** its plate exactly (an offset of arcs is arcs): the ring at 11, the bite at 3, each corner the
    stroke's corner grown a unit (r=2 about a rounded corner's centre, r=1 about a sharp one's vertex) */
function cookiePlate(sh) {
  const C = [12, 12], bc = onArc(C, 10, -45);
  const corners = (() => {
    if (sh) { const d0 = len(sub(bc, C)), x = (d0 * d0 + 100 - 16) / (2 * d0), h = Math.sqrt(100 - x * x), e = unit(sub(bc, C)), n = [-e[1], e[0]]; return { F: [add(add(C, mul(e, x)), mul(n, h)), add(add(C, mul(e, x)), mul(n, -h))], r: 1 }; }
    const d0 = len(sub(bc, C)), a = 9, b = 5, x = (d0 * d0 + a * a - b * b) / (2 * d0), h = Math.sqrt(a * a - x * x), e = unit(sub(bc, C)), n = [-e[1], e[0]];
    return { F: [add(add(C, mul(e, x)), mul(n, h)), add(add(C, mul(e, x)), mul(n, -h))], r: 2 };
  })();
  const [F1, F2] = corners.F, rr = corners.r;
  const onR = (Fc) => add(C, mul(unit(sub(Fc, C)), 11)), onB = (Fc) => add(bc, mul(unit(sub(Fc, bc)), 3));
  return `M${pt(onR(F1))}` + arcPts(C, 11, onR(F1), onR(F2), 1) + arcPts(F2, rr, onR(F2), onB(F2), 0) + arcPts(bc, 3, onB(F2), onB(F1), -1) + arcPts(F1, rr, onB(F1), onR(F1), 0) + 'Z';
}
const CHIPS = [[8.5, 8], [13.5, 12.5], [8, 15.5]];
def('cookie', (sh) => {
  const d = cookieD(sh), chips = CHIPS.map((c) => circ(c, 1.5)).join(''), plate = runs(cookiePlate(sh));
  return styled([S(d), F(chips)], [Pl(E(plate)), S(d), F(chips)], [Pl(E(plate)), F(chips)], [F(E(minus(plate, U(...CHIPS.map((c) => disc(c, 1.5))))))]);
}, { aliases: ['cookies', 'biscuit', 'cookie-consent', 'privacy', 'snack', 'tracking'] });

// pizza: redrawn on his second 21 Oct review ("still not acceptable"). Stood on its point with one
// bead on its axis the slice read as wifi, and tilted with a lone bead it reads as rss. What every
// reference shares: the slice TILTED, tip low left, crust up right, two or three toppings off the axis.
// Ours: a 76-degree sector on the free diagonal, tip and crust corners r=1, solved to paint 1..23 (a
// sector leaves two corners empty, the round size); the crust line 4 in (the old 3 painted a 1 gap);
// three beads, cookie's chips, on seats solved for the widest gap (2.07 against 2; a 72-degree slice
// holds 1.86). Sharp: the tip slides up the axis and each crust corner along the crust until its round
// join paints the rounded box. Duotone: the slice grey, the crust black from the edge to the crust
// line's far side, the beads black. Fill: the slice solid, the crust line's band between the walls and
// the beads open.
const PIZZA = (() => {
  const h = 38, crust = 4, seats = [[7.45, 0], [11.45, -3.15], [11.45, 3.15]];
  const local = (Rc) => {
    const dA = dirOf(-h), dB = dirOf(h), nA = [-dA[1], dA[0]], nB = [dB[1], -dB[0]], C = [0, 0];
    const fA = L.filletLineArc(C, dA, nA, C, Rc, 1), fB = L.filletLineArc(C, dB, nB, C, Rc, 1);
    const tip = L.fillet(mul(dB, 10), C, mul(dA, 10), 1);
    return `M${pt(tip.T2)}L${pt(fA.T)}` + arcPts(fA.F, 1, fA.T, fA.A, 0) + arcPts(C, Rc, fA.A, fB.A, 1) + arcPts(fB.F, 1, fB.A, fB.T, 0) + `L${pt(tip.T1)}C${pt(tip.C1)} ${pt(tip.C2)} ${pt(tip.T2)}Z`;
  };
  const place = (Rc, o) => xf(local(Rc), frameAt(o, -45));
  const Rc = bisect((Rr) => { const b = inkBox(place(Rr, [0, 0])); return b[2] - b[0] - 22; }, 8, 30);
  const b0 = inkBox(place(Rc, [0, 0])), o = [1 - b0[0], 23 - b0[3]], f = frameAt(o, -45);
  return { h, Rc, ri: Rc - crust, o, f, d: place(Rc, o), beads: seats.map(f) };
})();
def('pizza', (sh, R) => {
  const { h, Rc, ri, o, f } = PIZZA;
  let d, sideA, sideB, V;
  if (!sh) { d = PIZZA.d; V = o; sideA = [o, f(mul(dirOf(-h), Rc))]; sideB = [o, f(mul(dirOf(h), Rc))]; }
  else {
    // the tip's true vertex up the axis until its round join meets the rounded box's wall; each crust
    // corner along the crust (angle about the tip) until its own join paints inside the box
    const ax = dirOf(-45);
    V = add(o, mul(ax, (R[0] + 1 - o[0]) / ax[0]));
    const onC = (a) => add(o, mul(dirOf(a), Rc));
    const aA = -45 - h, aB = -45 + h;
    const cA = onC(aA)[1] - 1 >= R[1] - 1e-9 ? aA : bisect((a) => onC(a)[1] - 1 - R[1], aA, -45);
    const cB = onC(aB)[0] + 1 <= R[2] + 1e-9 ? aB : bisect((a) => R[2] - (onC(a)[0] + 1), aB, -45);
    const PA = onC(cA), PB = onC(cB);
    d = `M${pt(V)}L${pt(PA)}` + arcPts(o, Rc, PA, PB, 1) + 'Z';
    sideA = [V, PA]; sideB = [V, PB];
  }
  // the crust line: the arc 4 in, from wall to wall on the sides' centre lines
  const onSide = ([a, b]) => { const u = unit(sub(b, a)); return add(a, mul(u, bisect((t) => len(sub(add(a, mul(u, t)), o)) - ri, 0, 40))); };
  const QA = onSide(sideA), QB = onSide(sideB), inner = `M${pt(QA)}` + arcPts(o, ri, QA, QB, 1);
  // sharp's wedge is narrower (the tip slid up the axis turns both sides in), so its beads are seated
  // again for the widest gap on the same terms: the inner bead on the axis, the outer pair mirrored
  let seats = PIZZA.beads;
  if (sh) {
    const lineGap = (c, [a, b]) => { const u = unit(sub(b, a)); return Math.abs(cross(u, sub(c, a))) - 2.5; };
    const gapOf = (S3) => Math.min(...S3.flatMap((c) => [lineGap(c, sideA), lineGap(c, sideB), Math.abs(len(sub(c, o)) - ri) - 2.5]),
      len(sub(S3[0], S3[1])) - 3, len(sub(S3[0], S3[2])) - 3, len(sub(S3[1], S3[2])) - 3);
    let best = null;
    for (let a0 = 5; a0 <= 11; a0 += 0.05) for (let a1 = 8; a1 <= 14; a1 += 0.05) for (let b1 = 2; b1 <= 4.5; b1 += 0.05) {
      const S3 = [[a0, 0], [a1, -b1], [a1, b1]].map(f), g = gapOf(S3);
      if (!best || g > best.g) best = { g, S3, k: [a0, a1, b1] };
    }
    if (process.env.PIZZA) console.log('pizza sharp seats', best.k.map((v) => v.toFixed(2)), 'gap', best.g.toFixed(3), 'regular', gapOf(PIZZA.beads).toFixed(3));
    seats = best.S3;
  }
  const beadD = seats.map((c) => circ(c, 1.5)).join(''), beads = U(...seats.map((c) => disc(c, 1.5)));
  const plate = grow(d), crustBand = minus(plate, disc(o, ri - 1));
  // the walls' inner edges meet on the axis 1/sin(h) ahead of the tip: the slot lives in that wedge
  const uA = unit(sub(sideA[1], sideA[0])), uB = unit(sub(sideB[1], sideB[0]));
  const nA = [-uA[1], uA[0]], nB = [uB[1], -uB[0]];
  const X = bisect((t) => { const p = add(V, mul(dirOf(-45), t)); return dot(sub(p, V), nA) - 1; }, 0, 5);
  const Xp = add(V, mul(dirOf(-45), X)), inside = runs(`M${pt(Xp)}L${pt(add(Xp, mul(uA, 40)))}L${pt(add(Xp, mul(uB, 40)))}Z`);
  assert(Math.abs(dot(sub(Xp, V), nB) - 1) < 1e-6, 'pizza: the wedge apex is off the B wall');
  return styled([S(d + inner), F(beadD)], [Pl(E(plate)), S(d + inner), F(beadD)], [Pl(E(plate)), F(E(crustBand)), F(beadD)],
    [F(E(minus(plate, U(meet(band(inner, sh), inside), beads))))]);
}, { aliases: ['pizza-slice', 'slice', 'food', 'fast-food', 'italian', 'snack'] });

// hamburger: redrawn on his second 21 Oct review. The patty a single line read as a divider (menu's
// rule between two buns). What every reference shares: the patty a BODY of its own that overhangs the
// buns. Ours: the top bun a half disc r=8 standing on the patty's top edge (its feet on the corners'
// tangents, a composite), the patty 2..22 by 10..14 r=2, the bottom bun apart 4..20 by 18..22 (top
// corners r=1, floor r=2): three separate layers cannot keep the 2 gaps inside 22. No seeds: a bead
// keeps 2 clear of the dome only on its axis. Duotone: the buns grey, the patty black over the top
// bun's plate. Fill: all solid, the top bun cut from the patty along their shared edge (the band of
// that edge between the dome's walls).
def('hamburger', (sh, R) => {
  const C = [12, 10], top = `M4 10` + arcPts(C, 8, [4, 10], [20, 10], 1);
  const patty = rect(2, 10, 22, 14, 2, sh, R), bun = poly([[4, 18], [20, 18], [20, 22], [4, 22]], [1, 1, 2, 2], sh, R, { closed: true });
  // the dome's plate exactly: the arc grown a unit is the half disc r=9 (grow's cubic offset stood
  // 0.0014 past the 1 floor at the crown); its foot runs under the patty's plate
  const domePl = meet(disc(C, 9), box(0, 0, 24, 11)), pattyPl = grow(patty), bunPl = grow(bun);
  const seam = meet(band('M4 10L20 10', sh), disc(C, 7));             // the shared edge inside the dome's walls
  const all = top + patty + bun;
  return styled([S(all)], [Pl(E(U(domePl, pattyPl, bunPl))), S(all)], [Pl(E(U(domePl, bunPl))), F(E(pattyPl))],
    [F(E(minus(U(domePl, pattyPl, bunPl), seam)))]);
}, { aliases: ['burger', 'cheeseburger', 'fast-food', 'food', 'sandwich', 'meal'] });

/* ================================================================ incident.io sweep (22 Oct 2026) */
// Eight names a sweep of incident.io's icon sprite found missing, on his "draw all 8, show me before
// figma": message-alert and message-square-alert (one name on his list, one per bubble), merge, tags,
// rss, pager, target-arrow, users-3, robot-arm. Each starts from the shipped icon it sits beside; the
// site's own glyphs are an inventory of subjects, never a construction.

/** a sibling's stroke layers with one subpath swapped: `pick` finds it, `to` replaces it */
function swapSub(name, sh, st, pick, to) {
  return rawLayers(name, st, corners(sh)).map((l) => {
    if (l.kind !== 'stroke') return l;
    const parts = subsOf(l.d), i = parts.findIndex(pick);
    if (i < 0) return l;
    parts[i] = to; return { ...l, d: parts.join('') };
  });
}

// message-alert: message-question with the alert sign in the question's place. The two signs stand
// one height in every container (circle, badge and shield all 6..18), so here the question's 6..16:
// stem 7..11 over the mark the question's dot already is, (12,15). Every style is message-question's
// with the hook swapped; fill cuts the stem's band where the hook's was.
def('message-alert', (sh) => {
  const stem = sh ? 'M12 6L12 12' : 'M12 7L12 11';
  const isHook = (s) => s.startsWith('M10.4');
  const out = {};
  for (const st of ['stroke', 'two-tone', 'duotone']) {
    out[st] = swapSub('message-question', sh, st, isHook, stem);
    assert(out[st].some((l) => l.d.includes(stem)), `message-alert ${st}: the hook was not found`);
  }
  const outline = subsOf(rawLayers('message-question', 'fill', corners(sh))[0].d)[0];
  out.fill = [F(outline + holesAgainst(outline, U(band(stem, sh), disc([12, 15], 1))))];
  return out;
}, { aliases: ['message-circle-warning', 'message-warning', 'message-exclamation', 'comment-alert', 'chat-alert', 'important-message', 'urgent'] });

// message-square-alert: message-square-x with the x swapped for the alert sign in the same 6 box (ink
// 6..14, 2 off both walls): file-alert's 2-long stem over its mark, stem 7..9, mark (12,13). Duotone
// and fill as message-square-x's: the sign black over the plate, cut out of the fill.
def('message-square-alert', (sh) => {
  const X = sh ? 'M8.7071 6.7071L15.2929 13.2929M15.2929 6.7071L8.7071 13.2929' : 'M9 7L15 13M15 7L9 13';
  const stem = sh ? 'M12 6L12 10' : 'M12 7L12 9', mark = circ([12, 13], 1);
  const out = {};
  for (const st of ['stroke', 'two-tone', 'duotone']) {
    const ls = rawLayers('message-square-x', st, corners(sh));
    assert(ls.some((l) => l.kind === 'stroke' && l.d.includes(X)), `message-square-alert ${st}: the x was not found`);
    out[st] = [...ls.map((l) => (l.kind === 'stroke' && l.d.includes(X) ? { ...l, d: l.d.replace(X, stem) } : l)), F(mark)];
  }
  const outline = subsOf(rawLayers('message-square-x', 'fill', corners(sh))[0].d)[0];
  out.fill = [F(outline + holesAgainst(outline, U(band(stem, sh), disc([12, 13], 1))))];
  return out;
}, { aliases: ['message-square-warning', 'message-square-exclamation', 'comment-alert', 'chat-alert', 'important-message', 'urgent'] });

// merge: split turned over, the pair's grammar kept: two inlets on split's outlets (x 6 and 18) rising
// to y 11, each an S of git-fork's r=3 turns into the trunk on 12, one move-up head (half-width 3) on
// its top. Open, one component: every style is the stroke drawing (split's).
def('merge', (sh, R) => {
  const left = poly([[6, 21], [6, 11], [12, 11], [12, 3]], [0, 3, 3, 0], sh, R, { ends: [true, false] });
  const right = sh ? poly([[18, 21], [18, 11], [12, 11]], [0, 0, 0], sh, R, { ends: [true, false] }) : poly([[18, 21], [18, 11], [12, 11], [12, 8]], [0, 3, 3, 0], sh, R, { ends: [true, false] });
  const head = poly([[9, 6], [12, 3], [15, 6]], [0, 0, 0], sh, R);
  return [S(left + right + head)];
}, { aliases: ['join', 'converge', 'combine', 'merge-arrows', 'call-merge', 'route-merge', 'unify'] });

// tags: two of tag on the house stack (copy, mails): the front tag is tag's own construction at an
// 8 edge (square corner (6,6) r=3, top and left edges 8 long to r=2 turns onto the diagonals, the
// end's r=2 corners solved onto the box at 23), the back one 4 up and left, drawn where it stands 4 (2
// painted) clear of the front: its corner and two edges out to its own turns, an L. Eyelet a bead 5 in.
const TAGS = (() => { const c = 6, e = 8, m = 22.828427 - c - e; return { pts: [[c, c], [c + e, c], [c + e + m, c + m], [c + m, c + e + m], [c, c + e]], radii: [3, 2, 2, 2, 2] }; })();
def('tags', (sh, R) => {
  const front = poly(TAGS.pts, TAGS.radii, sh, R, { closed: true });
  const back = poly([[10, 2], [2, 2], [2, 10]], [0, 3, 0], sh, R);
  return [S(front + back), F(circ([11, 11], 1.5))];
}, { aliases: ['labels', 'price-tags', 'categories', 'tagging', 'taxonomy', 'badges'] });

// rss: cast's fan out of its frame, the mark r=1 on the fan's centre with its ink flush on the arcs'
// cap ends (cast's dot on the frame's edge), arcs out to the default box 2..22. Three takes for his
// pick: two arcs at equal gaps (r 9 and 18, gaps 7), cast's pitch carried to the box (r 6, 12, 18, gaps
// 4), and a bead on the half unit (r 9 and 17.5, gaps 6.5).
const fanD = (O, rs) => rs.map((r) => `M${pt([O[0], O[1] - r])}` + arcPts(O, r, [O[0], O[1] - r], [O[0] + r, O[1]], 1)).join('');
const rssDef = (O, dot, rs) => (sh, R) => { const d = fanD(O, rs); return [S(sh ? stubEnds(d, 'both', R) : d), F(circ(O, dot))]; };
def('rss', rssDef([3, 21], 1, [9, 18]), { aliases: ['feed', 'rss-feed', 'subscribe', 'atom', 'news-feed', 'syndication', 'blog'] });
def('rss-b', rssDef([3, 21], 1, [6, 12, 18]));
def('rss-c', rssDef([3.5, 20.5], 1.5, [9, 17.5]));

// pager: tablet's landscape body (path 2..22 by 4..20, r=3) with a screen 2 in from the walls (6..18
// by 8..12, r=1) over a row of calculator's keys, marks r=1 on pitch 4 (8, 12, 16 on y 16), each 2
// clear of the screen and the floor.
def('pager', (sh, R) => {
  const body = rect(2, 4, 22, 20, 3, sh, R), screen = rect(6, 8, 18, 12, 1, sh, R);
  return [S(body + screen), F([8, 12, 16].map((x) => circ([x, 16], 1)).join(''))];
}, { aliases: ['beeper', 'on-call', 'oncall', 'page', 'paging', 'alert-device', 'incident'] });

// target-arrow: target's rings (r 10 and 6) and bead with an arrow in the bullseye: the shaft from the
// bead out to (18,6) on the diagonal, its fletching a chevron there pointing the way it flies (arms 4
// along the axes), the rings cut where they come within 4 of the arrow (radar's cut, caps 2 clear).
function segDist(p, a, b) { const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab))); return len(sub(p, add(a, mul(ab, t)))); }
def('target-arrow', (sh, R) => {
  const C = [12, 12], T = [18, 6], s = 4, A1 = [T[0] + s, T[1]], A2 = [T[0], T[1] - s];
  const segs = [[C, T], [T, A1], [T, A2]];
  // sharp: the arms' butt ends reach a unit further and the rings' cut ends take a unit stub, so the
  // standoff is measured a unit longer
  const ext = sh ? 1 : 0;
  const keep = (p) => Math.min(...segs.map(([a, b]) => segDist(p, a, b))) >= 4 + ext;
  const rings = [10, 6].map((r) => L.clipRun(L.parseRuns(circ(C, r))[0], keep)).join('');
  const fletch = poly([A1, T, A2], [0, 0, 0], sh, R);
  const ringD = sh ? stubEnds(rings, 'both', R) : rings;
  return [S(ringD + `M${pt(C)}L${pt(T)}` + fletch), F(circ(C, 1.5))];
}, { aliases: ['goal', 'bullseye', 'aim', 'hit', 'objective', 'dart', 'archery', 'achievement'] });

// users-3: three people, the middle one in front. Middle: head r=3 on (12,9) over user's body retuned
// whole for the two beside it (dome two r=4 quarter arcs with user's 2 flat, floor corners r=1, path
// 7..17 by 16..21). Each side person is users' back person on a narrower body, standing a row higher:
// the head's outer half on (5,6) and (19,6), a shoulder of r=3 from its top (19,13) out to the frame and
// down to the floor's r=1 corner, every part 2 clear of the front.
function sidePerson(sh, R, flip) {
  const f = (p) => (flip ? [24 - p[0], p[1]] : p);
  const head = `M${pt(f([19, 3]))}` + arcPts(f([19, 6]), 3, f([19, 3]), f([19, 9]), flip ? -1 : 1);
  const sh1 = `M${pt(f([19, 13]))}` + arcPts(f([19, 16]), 3, f([19, 13]), f([22, 16]), flip ? -1 : 1) + `L${pt(f([22, 20]))}` + arcPts(f([21, 20]), 1, f([22, 20]), f([21, 21]), flip ? -1 : 1);
  return sh ? stubEnds(head, 'both', R) + stubEnds(sh1, 'both', R) : head + sh1;
}
def('users-3', (sh, R) => {
  const body = sh
    ? `M11 16L13 16` + arcPts([13, 20], 4, [13, 16], [17, 20], 1) + `L17 21L7 21L7 20` + arcPts([11, 20], 4, [7, 20], [11, 16], 1) + 'Z'
    : `M11 16L13 16` + arcPts([13, 20], 4, [13, 16], [17, 20], 1) + arcPts([16, 20], 1, [17, 20], [16, 21], 1) + `L8 21` + arcPts([8, 20], 1, [8, 21], [7, 20], 1) + arcPts([11, 20], 4, [7, 20], [11, 16], 1) + 'Z';
  return [S(body + circ([12, 9], 3) + sidePerson(sh, R, false) + sidePerson(sh, R, true))];
}, { aliases: ['team', 'group', 'people', 'users-group', 'crowd', 'community', 'members', 'audience'] });

// robot-arm: an industrial arm, first take. A turntable (dome r=4 on a floor 2..12 at y 21), the arm
// up from its crown to an elbow ring r=2 on (10,6), the forearm out to a wrist ring r=2 on (18,9), and
// gripper's jaws cut down to a hand: two hooks opening below the wrist, tips 4 apart.
def('robot-arm', (sh, R) => {
  const J1 = [10, 6], J2 = [18, 9];
  const floor = poly([[2, 21], [12, 21]], [0, 0], sh, R);
  const dome = `M3 21` + arcPts([7, 21], 4, [3, 21], [11, 21], 1);
  const onR = (J, p, r) => add(J, mul(unit(sub(p, J)), r));
  const arm = `M7 17L${pt(onR(J1, [7, 17], 2))}`, fore = `M${pt(onR(J1, J2, 2))}L${pt(onR(J2, J1, 2))}`;
  const jawL = poly([onR(J2, [16, 12], 2), [16, 13], [17, 16]], [0, 1, 0], sh, R, { ends: [false, true] });
  const jawR = poly([onR(J2, [20, 12], 2), [20, 13], [19, 16]], [0, 1, 0], sh, R, { ends: [false, true] });
  return [S(floor + dome + arm + circ(J1, 2) + fore + circ(J2, 2) + jawL + jawR)];
}, { aliases: ['robotic-arm', 'automation', 'industrial-robot', 'manufacturing', 'assembly', 'robot'] });

// users-3, second take: the side people as users' back person, not slivers. Each a head r=3 on (5,6)
// and (19,6) cut only where it comes within 4 of the middle head (226 degrees kept, a C opening on the
// middle one), and users' own shoulder, the r=6 arc about (8,20) and (16,20), from where it stands 4
// clear of the middle body down to its floor corner r=1.
const keepFrom = (C, r) => (p) => len(sub(p, C)) >= r;
/** a clipped run without the zero-length pieces a cut landing on a segment's end leaves behind */
function noZero(d) {
  let o = '', cur = null;
  for (const m of d.matchAll(/([MLCZ])([^MLCZ]*)/g)) {
    const n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    if (m[1] === 'M') { cur = [n[0], n[1]]; o += 'M' + m[2].trim(); continue; }
    if (m[1] === 'Z') { o += 'Z'; continue; }
    const ps = []; for (let i = 0; i < n.length; i += 2) ps.push([n[i], n[i + 1]]);
    if (ps.every((q) => len(sub(q, cur)) < 1e-6)) continue;
    o += m[1] + m[2].trim(); cur = ps.at(-1);
  }
  return o;
}
function sidePerson2(sh, R, flip) {
  const f = (p) => (flip ? [24 - p[0], p[1]] : p), dir = flip ? -1 : 1;
  const headRun = L.parseRuns(circ(f([19, 6]), 3))[0];
  const head = noZero(L.clipRun(headRun, keepFrom([12, 9], 7)));
  const a0 = -Math.acos(0.528), P0 = f(add([16, 20], mul([Math.cos(a0), Math.sin(a0)], 6)));
  const shoulder = `M${pt(P0)}` + arcPts(f([16, 20]), 6, P0, f([22, 20]), dir) + arcPts(f([21, 20]), 1, f([22, 20]), f([21, 21]), dir);
  return sh ? stubEnds(head, 'both', R) + stubEnds(shoulder, 'both', R) : head + shoulder;
}
def('users-3b', (sh, R) => {
  const body = sh
    ? `M11 16L13 16` + arcPts([13, 20], 4, [13, 16], [17, 20], 1) + `L17 21L7 21L7 20` + arcPts([11, 20], 4, [7, 20], [11, 16], 1) + 'Z'
    : `M11 16L13 16` + arcPts([13, 20], 4, [13, 16], [17, 20], 1) + arcPts([16, 20], 1, [17, 20], [16, 21], 1) + `L8 21` + arcPts([8, 20], 1, [8, 21], [7, 20], 1) + arcPts([11, 20], 4, [7, 20], [11, 16], 1) + 'Z';
  return [S(body + circ([12, 9], 3) + sidePerson2(sh, R, false) + sidePerson2(sh, R, true))];
});

// robot-arm, two more takes. b: a plinth (3..11 by 18..21, r=1), the post straight up to an elbow ring
// r=2, the forearm level to a wrist ring r=2 and gripper's jaws below it (each a 45-degree out-and-in
// on an r=1 turn, tips 4 apart). c: the same parts posed: the arm leaning up from the plinth to the
// elbow, the forearm falling to the wrist, the jaws under it.
const jaws = (W, sh, R, span = 2, drop = 7) => {
  const onR = (p) => add(W, mul(unit(sub(p, W)), 2));
  const l = poly([onR([W[0] - 2, W[1] + 3]), [W[0] - span - 1, W[1] + 4], [W[0] - 2, W[1] + drop]], [0, 1, 0], sh, R, { ends: [false, true] });
  const r = poly([onR([W[0] + 2, W[1] + 3]), [W[0] + span + 1, W[1] + 4], [W[0] + 2, W[1] + drop]], [0, 1, 0], sh, R, { ends: [false, true] });
  return l + r;
};
def('robot-arm-b', (sh, R) => {
  const E1 = [7, 5], W = [17, 5];
  const plinth = rect(3, 18, 11, 21, 1, sh, R);
  const post = `M7 18L7 7`, fore = `M9 5L15 5`;
  return [S(plinth + post + circ(E1, 2) + fore + circ(W, 2) + jaws(W, sh, R))];
});
def('robot-arm-c', (sh, R) => {
  const E1 = [9, 5], W = [18, 10];
  const plinth = rect(2, 18, 10, 21, 1, sh, R);
  const onR = (J, p) => add(J, mul(unit(sub(p, J)), 2));
  const arm = `M6 18L${pt(onR(E1, [6, 18]))}`, fore = `M${pt(onR(E1, W))}L${pt(onR(W, E1))}`;
  return [S(plinth + arm + circ(E1, 2) + fore + circ(W, 2) + jaws(W, sh, R))];
});

/* =========================================================== his refs (24 Oct 2026) */
// Zafar's fixed drawings of sixteen drafts and five new names, dropped in refs/ on 24 Oct. His rounded
// stroke is the drawing: inlined here because refs/ is emptied at commit, and where his file was an
// outlined stroke (car-front, factory) the centre line is solved off its two edges (each point the
// mean of the matching outer and inner points). Where his geometry turned out to be a skeleton this
// file already had (crosshair, traffic-cone, hamburger, cassette-tape, factory, mountain) it is
// rebuilt on that skeleton and checked against his path (refsCheck, under 0.03 everywhere). Plates
// are his closed outlines grown a unit. Sharp takes each fillet off as its true vertex and cuts every
// free straight end (sharp.md); round shapes of about 2 and over stay (a heel, a plate's end, a dome).
const HIS = (d) => absHV(d);
const rot180 = (d) => xf(d, (p) => [24 - p[0], 24 - p[1]]);
const mirror = (shape) => runs(flipX(E(shape)));
/** the region inside a closed stroked outline, clear of its ink (where a knockout to the walls lives) */
const innerOf = (d) => Bo.union(...subs(d).map((s) => [Bo.shrink(runs(s)[0])]));
/** where a ray from p along u meets the circle (c, r), forward */
function rayCircle(p, u, c, r) {
  const q = sub(p, c), b = dot(q, u), cc = dot(q, q) - r * r, disc0 = b * b - cc;
  assert(disc0 >= 0, 'rayCircle: no meeting');
  return add(p, mul(u, -b + Math.sqrt(disc0)));
}
/** the two meetings of circles (c1, r1) and (c2, r2), the one nearer `near` */
function circleCircle(c1, r1, c2, r2, near) {
  const d0 = len(sub(c2, c1)), x = (d0 * d0 + r1 * r1 - r2 * r2) / (2 * d0), h = Math.sqrt(r1 * r1 - x * x), e = unit(sub(c2, c1)), n = [-e[1], e[0]];
  const A = add(add(c1, mul(e, x)), mul(n, h)), B = add(add(c1, mul(e, x)), mul(n, -h));
  return len(sub(A, near)) < len(sub(B, near)) ? A : B;
}
export const REFS = {};          // name -> his rounded stroke as dropped, for refsCheck

// crosshair: his ticks stop on radius 5 (the draft's on 4); otherwise the draft.
REFS.crosshair = 'M20 12C20 16.4183 16.4183 20 12 20M20 12C20 7.5817 16.4183 4 12 4M20 12H22M20 12H17M12 20C7.5817 20 4 16.4183 4 12M12 20V22M12 20V17M4 12C4 7.5817 7.5817 4 12 4M4 12H2M4 12H7M12 4V2M12 4V7';
def('crosshair', (sh, R) => {
  const ring = circ([12, 12], 8);
  const ticks = sh ? 'M12 1L12 8M12 23L12 16M1 12L8 12M23 12L16 12' : 'M12 2L12 7M12 22L12 17M2 12L7 12M22 12L17 12';
  const outer = sh ? 'M12 1L12 4M12 23L12 20M1 12L4 12M23 12L20 12' : 'M12 2L12 4M12 22L12 20M2 12L4 12M22 12L20 12';
  const plate = disc([12, 12], 9), slots = meet(band(ticks, sh), disc([12, 12], 7));
  return styled([S(ring + ticks)], [Pl(E(plate)), S(ring + ticks)], [Pl(E(plate)), S(ticks)], [F(E(U(minus(plate, slots), band(outer, sh))))]);
}, { aliases: ['reticle', 'aim', 'target', 'scope', 'sight', 'viewfinder', 'precision', 'focus'] });

// traffic-cone: his cone stands 4..20 on a bar 2..22, the top 10..14 on 2 with r=2 shoulders, the two
// bands at the thirds (26/3 and 46/3). Tones and fill the draft's.
REFS['traffic-cone'] = 'M8 8.6667L6 15.3333L4 22M4 22H2M4 22H20M6 15.3333H18M8 8.6667L9.57241 3.4253C9.8262 2.57934 10.6048 2 11.4881 2H12.5119C13.3952 2 14.1738 2.57934 14.4276 3.4253L16 8.6667M8 8.6667H16M20 22L18 15.3333L16 8.6667M20 22H22';
const TC = { x0: 4, x1: 20, tl: 10, tr: 14, top: 2, foot: 22 };
const tcX = (y) => [TC.x0 + (TC.foot - y) * ((TC.tl - TC.x0) / (TC.foot - TC.top)), TC.x1 - (TC.foot - y) * ((TC.x1 - TC.tr) / (TC.foot - TC.top))];
const TC_BANDS = [2 + 20 / 3, 2 + 40 / 3];
def('traffic-cone', (sh, R) => {
  const sides = poly([[TC.x0, TC.foot], [TC.tl, TC.top], [TC.tr, TC.top], [TC.x1, TC.foot]], [0, 2, 2, 0], sh, R, { ends: [false, false] });
  const bar = sh ? 'M1 22L23 22' : 'M2 22L22 22';
  const bands = TC_BANDS.map((y) => `M${pt([tcX(y)[0], y])}L${pt([tcX(y)[1], y])}`).join('');
  const plate = grow(sides + 'Z');
  const cosT = Math.cos(Math.atan((TC.tl - TC.x0) / (TC.foot - TC.top))), inset = 1 / cosT;
  const slot = (y) => { const a = tcX(y - 1), b = tcX(y + 1); return runs(`M${pt([a[0] + inset, y - 1])}L${pt([a[1] - inset, y - 1])}L${pt([b[1] - inset, y + 1])}L${pt([b[0] + inset, y + 1])}Z`); };
  const wide = TC_BANDS.map((y) => `M${pt([0, y])}L${pt([24, y])}`).join('');
  return styled([S(sides + bar + bands)], [Pl(E(plate)), S(sides + bar + bands)],
    [Pl(E(plate)), F(E(meet(band(wide, sh), plate))), S(bar)], [F(E(minus(plate, U(...TC_BANDS.map(slot))))), S(bar)]);
}, { aliases: ['cone', 'road-cone', 'construction', 'roadwork', 'safety-cone', 'pylon'] });

// hamburger: his top bun a half disc r=8 on (12,11) resting on the patty 2..22 by 12..16 (r=2 ends),
// the bottom bun hung from the patty's floor at 4 and 20 down to 21 (r=3). Sharp: the dome's feet run
// on to the patty's centre line (they land on it), the patty and bun corners true. Duotone: the buns
// grey, the patty black. Fill: all solid, the patty's two edges cut between the buns' walls.
REFS.hamburger = 'M4 11C4 6.5817 7.5817 3 12 3C16.4183 3 20 6.5817 20 11M4 12H20C21.1046 12 22 12.8954 22 14C22 15.1046 21.1046 16 20 16H4C2.8954 16 2 15.1046 2 14C2 12.8954 2.8954 12 4 12ZM4 16V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V16';
def('hamburger', (sh, R) => {
  const C = [12, 11];
  const dome = (sh ? 'M4 12L4 11' : 'M4 11') + arcPts(C, 8, [4, 11], [20, 11], 1) + (sh ? 'L20 12' : '');
  const patty = rect(2, 12, 22, 16, 2, sh, R);
  const bun = poly([[4, 16], [4, 21], [20, 21], [20, 16]], [0, 3, 3, 0], sh, R, { ends: [false, false] });
  const domePl = meet(disc(C, 9), box(0, 0, 24, 12)), pattyPl = grow(patty), bunPl = grow(bun + 'Z');
  const seams = meet(band('M4 12L20 12M4 16L20 16', sh), box(5, 0, 19, 24));
  const all = dome + patty + bun;
  // fill (his 25 Oct idea, the split only): three pieces 2 apart, the top bun to 10, the patty a pill
  // 1..23 by 12..16, the bottom bun the stroke's own from 18 down; square where the buns are cut, as
  // heart-crack. His sketch carried sesame seeds; the stroke has none, so the fill adds none
  const topBun = meet(disc(C, 9), box(0, 0, 24, 10));
  const pattyF = runs(rect(1, 12, 23, 16, sh ? 0 : 2, false, null)), bunF = meet(bunPl, box(0, 18, 24, 24));   // the bun's own floor and corners
  return styled([S(all)], [Pl(E(U(domePl, pattyPl, bunPl))), S(all)], [Pl(E(U(domePl, bunPl))), F(E(pattyPl))],
    [F(E(U(topBun, pattyF, bunF)))]);
}, { aliases: ['burger', 'cheeseburger', 'fast-food', 'food', 'sandwich', 'meal'] });

// cassette-tape: his reels on 10 with the tape tangent under them on 12, the head window 16.5 high
// (legs from 6 and 18 on the floor, r=0.5 at the top). Tones and fill the draft's.
REFS['cassette-tape'] = 'M18 20H19C20.6569 20 22 18.6569 22 17V7C22 5.3431 20.6569 4 19 4H5C3.3431 4 2 5.3431 2 7V17C2 18.6569 3.3431 20 5 20H6M18 20H6M18 20L16.6382 16.7764C16.5535 16.607 16.3804 16.5 16.191 16.5H7.809C7.6196 16.5 7.4465 16.607 7.3618 16.7764L6 20M8 12C9.1046 12 10 11.1046 10 10C10 8.8954 9.1046 8 8 8C6.8954 8 6 8.8954 6 10C6 11.1046 6.8954 12 8 12ZM8 12H16M16 12C17.1046 12 18 11.1046 18 10C18 8.8954 17.1046 8 16 8C14.8954 8 14 8.8954 14 10C14 11.1046 14.8954 12 16 12Z';
def('cassette-tape', (sh, R) => {
  const body = rect(2, 4, 22, 20, 3, sh, R);
  const reels = circ([8, 10], 2) + circ([16, 10], 2), tape = 'M8 12L16 12';
  const k = 1.3618 / 3.2236, V = [6 + 3.5 * k, 16.5], W = [24 - V[0], 16.5];        // his legs' slope, through (6,20)
  const win = poly([[6, 20], V, W, [18, 20]], [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const winLong = poly([[6 - 2 * k, 22], V, W, [18 + 2 * k, 22]], [0, 0.5, 0.5, 0], sh, R, { ends: [false, false] });
  const plate = grow(body), inside = runs(rect(3, 5, 21, 19, sh ? 0 : 2, false, null));
  const rings = U(minus(disc([8, 10], 3), disc([8, 10], 1)), minus(disc([16, 10], 3), disc([16, 10], 1)));
  // the window's legs cut through the floor as the duotone's band runs (his 25 Oct review): the head's
  // trapezoid stands apart; stopped at the floor's stroke it left two black feet under the cuts
  const holes = U(rings, band(tape, sh), meet(band(winLong, sh), plate));
  return styled([S(body + reels + tape + win)], [Pl(E(plate)), S(body + reels + tape + win)],
    [Pl(E(plate)), S(reels + tape), F(E(meet(band(winLong, sh), plate)))], [F(E(minus(plate, holes)))]);
}, { aliases: ['cassette', 'tape', 'mixtape', 'audio-tape', 'retro', 'recording'] });

// cookie: his ring r=10 bitten twice at the right (a free curve, then a circle r=4 on (19.07,4.93)),
// the bites meeting the ring through small soft corners; five chips inside and two crumbs in the bite.
// His path stops 0.04 short of where it starts: closed on its start. Sharp: each soft corner taken
// off to where the bite's curve, carried straight on, meets the ring (the upper bite is a circle, so
// that one is the two circles' crossing). Duotone: the cookie grey, chips and crumbs black. Fill: the
// cookie with the chips open, the crumbs solid.
REFS.cookie = 'M20.1398 17.8089C20.4024 17.4409 20.3855 16.9425 20.0984 16.5931C20.0285 16.5081 19.9449 16.435 19.8511 16.3772C19.4761 16.1456 19.142 15.8537 18.8622 15.5132C17.4595 13.8064 17.3643 10.3315 19.0711 8.9289C16.8619 8.9289 15.0711 7.1381 15.0711 4.9289C15.0711 4.4882 15.1439 4.0505 15.2866 3.6335C15.3223 3.5293 15.3405 3.4198 15.3405 3.3097C15.3405 2.8575 15.0372 2.4617 14.6006 2.3441C13.7526 2.1157 12.8782 2 12 2C6.4772 2 2 6.4772 2 12C2 17.5228 6.4772 22 12 22C15.37 22 18.3507 20.3329 20.1624 17.7785';
const COOKIE_D = HIS(REFS.cookie.replace(/20\.1624 17\.7785$/, '20.1398 17.8089Z'));
const COOKIE_IN = [[9, 8, 1], [13.5, 11.5, 1.5], [10, 17, 1], [15, 17, 1], [6.5, 12.5, 1.5]], COOKIE_OUT = [[20.5, 4.5, 1.5], [22, 13, 1]];
function cookieSharp() {
  const C = [12, 12], Bc = [19.0711, 4.9289], P = [19.8511, 16.3772];
  const A = rayCircle(P, unit(sub(P, [19.4761, 16.1456])), C, 10);
  const B = circleCircle(C, 10, Bc, 4, [15.6, 2.7]);
  return `M${pt(A)}L${pt(P)}C19.4761 16.1456 19.142 15.8537 18.8622 15.5132C17.4595 13.8064 17.3643 10.3315 19.0711 8.9289` + arcPts(Bc, 4, [19.0711, 8.9289], B, 1) + arcPts(C, 10, B, A, -1) + 'Z';
}
def('cookie', (sh) => {
  const d = sh ? cookieSharp() : COOKIE_D;
  const dots = [...COOKIE_IN, ...COOKIE_OUT].map(([x, y, r]) => circ([x, y], r)).join('');
  const crumbs = COOKIE_OUT.map(([x, y, r]) => circ([x, y], r)).join('');
  const plate = grow(d), chips = U(...COOKIE_IN.map(([x, y, r]) => disc([x, y], r)));
  return styled([S(d), F(dots)], [Pl(E(plate)), S(d), F(dots)], [Pl(E(plate)), F(dots)], [F(E(minus(plate, chips)) + crumbs)]);
}, { aliases: ['cookies', 'biscuit', 'cookie-consent', 'privacy', 'snack', 'tracking'] });

// binoculars: his barrels widen down from the eyepiece end (4..10 on 8, the outer wall at a fifth of
// a unit a unit) to 2..10 at the floor on 20, the inner floor corner scooped (r=3 about (10,20), r=3/11
// turns at both ends), eyepieces 5..9 up to 4 on the barrel's top, two bridge rules on 10 and 14.
// Sharp: every r=1 corner true, the scoop r=3 itself. Duotone: the barrels black, eyepieces and
// bridge rules grey. Fill: one solid, the eyepieces open inside, daylight between the bridge rules.
REFS.binoculars = 'M10 10H14M14 14H10M5 8H4.8198C4.34312 8 3.93271 8.33646 3.83922 8.80388L2.01942 17.9029C2.0065 17.9675 2 18.0332 2 18.099V19C2 19.5523 2.44772 20 3 20H6.72727C6.8779 20 7 19.8779 7 19.7273C7 18.221 8.22104 17 9.72727 17C9.8779 17 10 16.8779 10 16.7273V9C10 8.44772 9.55228 8 9 8M5 8V5C5 4.44772 5.44772 4 6 4H8C8.55228 4 9 4.44772 9 5V8M5 8H9M19 8H19.1802C19.6569 8 20.0673 8.33646 20.1608 8.80388L21.9806 17.9029C21.9935 17.9675 22 18.0332 22 18.099V19C22 19.5523 21.5523 20 21 20H17.2727C17.1221 20 17 19.8779 17 19.7273C17 18.221 15.779 17 14.2727 17C14.1221 17 14 16.8779 14 16.7273V9C14 8.44772 14.4477 8 15 8M19 8V5C19 4.44772 18.5523 4 18 4H16C15.4477 4 15 4.44772 15 5V8M19 8H15';
const BINO_L = HIS('M5 8H4.8198C4.34312 8 3.93271 8.33646 3.83922 8.80388L2.01942 17.9029C2.0065 17.9675 2 18.0332 2 18.099V19C2 19.5523 2.44772 20 3 20H6.72727C6.8779 20 7 19.8779 7 19.7273C7 18.221 8.22104 17 9.72727 17C9.8779 17 10 16.8779 10 16.7273V9C10 8.44772 9.55228 8 9 8M5 8V5C5 4.44772 5.44772 4 6 4H8C8.55228 4 9 4.44772 9 5V8M5 8H9');
def('binoculars', (sh) => {
  const [b0, eye] = subs(BINO_L);
  const barrel = sh ? 'M4 8L2 18L2 20L7 20' + arcPts([10, 20], 3, [7, 20], [10, 17], 1) + 'L10 8Z' : b0 + 'Z';
  const eyeD = sh ? 'M5 8L5 4L9 4L9 8' : eye;
  const left = sh ? barrel + eyeD : BINO_L, bridge = 'M10 10L14 10M14 14L10 14';
  const all = left + flipX(left) + bridge;
  const bL = grow(barrel), eL = grow(eyeD + 'Z');
  const barrels = U(bL, mirror(bL)), eyes = U(eL, mirror(eL));
  // his 25 Oct review: duotone the other way round, the barrels black with the eyepieces and the
  // bridge's rules grey (the black over them where they meet); fill as he drew it, all one solid with
  // each eyepiece's inside open down to the barrel's top and daylight between the two rules
  // the eyepiece's inner edge, exactly: its walls on 5 and 9 and top on 4 a unit in, the barrel's top
  // edge on 7 below (the r=1 corners leave the inside square); a shrink of the open path came back wrong
  const eyeHoles = U(box(6, 5, 8, 7), box(16, 5, 18, 7));
  return styled([S(all)], [Pl(E(U(barrels, eyes, box(10, 10, 14, 14)))), S(all)],
    [Pl(E(U(eyes, band(bridge, sh)))), F(E(barrels))], [F(E(minus(U(barrels, eyes, band(bridge, sh)), eyeHoles)))]);
}, { aliases: ['binocular', 'explore', 'search', 'spy', 'view', 'birdwatching', 'lookout', 'field-glasses'] });

// bus: his side view, the body 2..22 by 4..18 (r=2 at the back and floor) with a round nose (an arc
// r=150/17 about (224/17, 194/17), standing vertical on x 22, met by the roof through an r=30/17
// turn), wheels r=2 on 7 and 17, the floor between them; a window rule on 9 with posts on 8 and 14,
// the windscreen's sill stepping down from (14,9) at 45 degrees to 12 (r=1) and on to the nose.
// Sharp: corners true, the roof meeting the nose's arc, the floor's held ends on the wheels' centre
// lines (truck's). Duotone: the body grey, the glass black, wheels black. Fill: the body solid with
// the panes open, the drawing over it.
REFS.bus = 'M10 18H14M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18ZM5 18H4C2.89543 18 2 17.1046 2 16V6C2 4.89543 2.89543 4 4 4H17.4118C17.7936 4 18.1651 4.12384 18.4706 4.35294C20.6924 6.0193 22 8.63449 22 11.4118V12V16C22 17.1046 21.1046 18 20 18H19M14 4V9M14 9L16.7071 11.7071C16.8946 11.8946 17.149 12 17.4142 12H22M14 9H8M8 9H2M8 9V4';
const BUS_BODY = HIS('M5 18H4C2.89543 18 2 17.1046 2 16V6C2 4.89543 2.89543 4 4 4H17.4118C17.7936 4 18.1651 4.12384 18.4706 4.35294C20.6924 6.0193 22 8.63449 22 11.4118V12V16C22 17.1046 21.1046 18 20 18H19');
const BUS_WIN = HIS('M14 4V9M14 9L16.7071 11.7071C16.8946 11.8946 17.149 12 17.4142 12H22M14 9H8M8 9H2M8 9V4');
const NOSE = { c: [224 / 17, 194 / 17], r: 150 / 17 };
def('bus', (sh) => {
  const xI = NOSE.c[0] + Math.sqrt(NOSE.r ** 2 - (NOSE.c[1] - 4) ** 2);
  const body = sh ? `M5 18L2 18L2 4L${pt([xI, 4])}` + arcPts(NOSE.c, NOSE.r, [xI, 4], [22, NOSE.c[1]], 1) + 'L22 18L19 18' : BUS_BODY;
  const win = sh ? 'M14 4L14 9L17 12L22 12M14 9L2 9M8 9L8 4' : BUS_WIN;
  const floor = sh ? 'M9 18L15 18' : 'M10 18L14 18', wheels = circ([7, 18], 2) + circ([17, 18], 2);
  const bodyC = body + 'Z', plate = grow(bodyC);
  const panes = runs('M-1 -1L25 -1L25 12L17 12L14 9L-1 9Z');
  const region = minus(minus(runs(bodyC), panes), U(disc([7, 18], 2), disc([17, 18], 2)));
  // duotone as car-front's and the taxi's: the body grey, the glass black, each pane what the frame
  // leaves inside the outline (the posts and sill read as grey between them), the wheels black. The
  // frame drawn as black rules over the grey (his 25 Oct review: "wrong") read as a wireframe
  // (built from inset edges, not by subtracting the frame's bands, whose caps meet the outline's and
  // trip the boolean): the outline's inner region, above the rule's and the sill's inner edges and the
  // diagonal's carried a unit up-right, less the two posts
  const above = runs("M-1 -1L25 -1L25 11L17.4142 11L14.4142 8L-1 8Z");
  const glass = minus(meet(innerOf(bodyC), above), U(box(7, -1, 9, 9), box(13, -1, 15, 9)));
  const all = floor + wheels + body + win;
  return styled([S(all)], [Pl(E(plate)), S(all)], [Pl(E(plate)), F(E(glass)), S(wheels)], [F(E(region)), S(all)]);
}, { aliases: ['coach', 'transit', 'public-transport', 'school-bus', 'shuttle'] });

// car-taxi-front: his front (25 Oct, his second file), the body 3..21 by 12..20 (top corners r=3
// about (6,15) and (18,15), the floor's corners run into the tyres), tyre blocks 1 wide under it on 5
// and 18 down to 22, a cabin whose pillars climb from the body's corners to an r=3 roof on 6, the roof
// light a trapezoid standing on the roof (10.5..13.5 on 2, out to the roof's tangent points), mirrors
// out to 3.5 and 20.5 on 11, lamp dashes on 16. Sharp: the body square, the cabin's corners true and
// its pillars run on to the body's top line, free ends cut. Duotone: the silhouette grey, the
// windscreen, roof light and tyres black, mirrors and lamps black. Fill: the silhouette solid with the
// windscreen and lamps open.
REFS['car-taxi-front'] = 'M19 12.1707C18.6872 12.0602 18.3506 12 18 12H6C5.64936 12 5.31278 12.0602 5 12.1707M19 12.1707C20.1652 12.5825 21 13.6937 21 15V17C21 18.6569 20.6569 20 19 20M15.3638 6C16.8716 6 18.1451 7.11906 18.3389 8.61429L18.6482 11L19 12.1707M19 20V22H18V20M19 20H18M5 20C3.3431 20 3 18.6569 3 17V15C3 13.6937 3.83479 12.5825 5 12.1707M5 20V22H6V20M5 20H6M8.63617 6C7.12842 6 5.85492 7.11906 5.66107 8.61429L5.35177 11L5 12.1707M6 20H18M15.3638 6H8.63617M15.3638 6L13.5 2H10.5L8.63617 6M18.6482 11H20.5M5.35177 11H3.5M7 16H8M16 16H17';
const TAXI = {
  body: HIS('M6 12H18C18.3506 12 18.6872 12.0602 19 12.1707C20.1652 12.5825 21 13.6937 21 15V17C21 18.6569 20.6569 20 19 20H5C3.3431 20 3 18.6569 3 17V15C3 13.6937 3.83479 12.5825 5 12.1707C5.31278 12.0602 5.64936 12 6 12Z'),
  cabin: HIS('M5 12.1707L5.35177 11L5.66107 8.61429C5.85492 7.11906 7.12842 6 8.63617 6H15.3638C16.8716 6 18.1451 7.11906 18.3389 8.61429L18.6482 11L19 12.1707'),
  sign: 'M8.63617 6L10.5 2L13.5 2L15.3638 6',
  tyres: 'M18 20L19 20L19 22L18 22ZM5 20L6 20L6 22L5 22Z',
};
const footOn = (a, b, y) => add(b, mul(sub(b, a), (y - b[1]) / (b[1] - a[1])));       // a->b carried on to y
def('car-taxi-front', (sh) => {
  const body = sh ? 'M3 12L21 12L21 20L3 20Z' : TAXI.body;
  const cabin = sh ? `M${pt(footOn([5.35177, 11], [5, 12.1707], 12))}L5.35177 11L6 6L18 6L18.6482 11L${pt(footOn([18.6482, 11], [19, 12.1707], 12))}` : TAXI.cabin;
  const mirrors = sh ? 'M5.35177 11L2.5 11M18.6482 11L21.5 11' : 'M5.35177 11L3.5 11M18.6482 11L20.5 11';
  const lamps = sh ? 'M6 16L9 16M15 16L18 16' : 'M7 16L8 16M16 16L17 16';
  const strokes = sh ? body + cabin + TAXI.sign + TAXI.tyres + mirrors + lamps : HIS(REFS['car-taxi-front']);
  const bodyPl = grow(body), cabPl = grow(cabin + 'Z'), tyrePl = grow(TAXI.tyres), signPl = grow(TAXI.sign + 'Z');
  const sil = U(bodyPl, cabPl, tyrePl, signPl);
  const glass = meet(runs(cabin + 'Z'), box(0, 0, 24, 12));                         // inside the frame's centre line, above the body's
  const pane = minus(minus(runs(cabin + 'Z'), band(cabin, sh)), band('M0 12L24 12', sh));
  // duotone: the roof light black above the roof's grey band, the windscreen black below it, so the two
  // read apart (the light on the glass's centre line merged them into one hat)
  // mirrors grey with the body (black bars stuck on the grey read as rules, 25 Oct); the lamps solids
  const light = meet(signPl, box(0, 0, 24, 5));
  // his 25 Oct "try vice versa" (body black, parts grey) went back the same day: every other vehicle
  // has the grey body, and one black body breaks the run of them
  return styled([S(strokes)], [Pl(E(sil)), S(strokes)], [Pl(E(U(bodyPl, cabPl, signPl, band(mirrors, sh)))), F(E(U(pane, tyrePl, light, band(lamps, sh))))],
    [F(E(minus(sil, U(pane, band(lamps, sh))))), S(mirrors)]);
}, { aliases: ['taxi', 'cab', 'taxi-front', 'ride', 'hail', 'yellow-cab'] });

// car-front (new, his): the body 3..21 from a top line on 10 (r=3 shoulders) down to the floor on 18,
// whose ends drop into tyre feet to 20 at both sides; the cabin's pillars climb at 23 degrees to an
// r=3 roof on 4, mirrors out to 3.5 and 20.5 on 9, lamps on 8 and 16 (13.5..14.5). His file was the
// outlined stroke: centre line solved off its edges. Sharp: the body square, each foot's inner side
// carried down to the floor on 20 (17.5 and 6.5), the cabin's corners true and its pillars on to the
// body's top line. Tones as car-taxi-front's.
REFS['car-front'] = 'M6 10L18 10C18.3506 10 18.6872 10.0602 19 10.1707C20.1652 10.5825 21 11.6937 21 13L21 18.0346C21 19.12 20.12 20 19.0346 20C18.1327 20 17.3465 19.3862 17.1278 18.5113L17 18L7 18L6.8722 18.5113C6.6535 19.3862 5.8673 20 4.9654 20C3.88 20 3 19.12 3 18.0346L3 13C3 11.6937 3.8348 10.5825 5 10.1707C5.3128 10.0602 5.6494 10 6 10ZM5 10.1707L5.35177 9L6.71988 5.81574C7.19319 4.71403 8.27713 4 9.47624 4L14.5238 4C15.7229 4 16.8068 4.71403 17.2801 5.81574L18.6482 9L19 10.1707M18.6482 9L20.5 9M5.35177 9L3.5 9M8 13.5L8 14.5M16 13.5L16 14.5';
const CARF = {
  body: HIS('M6 10L18 10C18.3506 10 18.6872 10.0602 19 10.1707C20.1652 10.5825 21 11.6937 21 13L21 18.0346C21 19.12 20.12 20 19.0346 20C18.1327 20 17.3465 19.3862 17.1278 18.5113L17 18L7 18L6.8722 18.5113C6.6535 19.3862 5.8673 20 4.9654 20C3.88 20 3 19.12 3 18.0346L3 13C3 11.6937 3.8348 10.5825 5 10.1707C5.3128 10.0602 5.6494 10 6 10Z'),
  cabin: HIS('M5 10.1707L5.35177 9L6.71988 5.81574C7.19319 4.71403 8.27713 4 9.47624 4L14.5238 4C15.7229 4 16.8068 4.71403 17.2801 5.81574L18.6482 9L19 10.1707'),
};
/** car-front's four styles (its -off cuts these) */
function carFront(sh) {
  const body = sh ? 'M3 10L21 10L21 20L17.5 20L17 18L7 18L6.5 20L3 20Z' : CARF.body;
  const cabin = sh ? `M${pt(footOn([5.35177, 9], [5, 10.1707], 10))}L5.35177 9L7.5 4L16.5 4L18.6482 9L${pt(footOn([18.6482, 9], [19, 10.1707], 10))}` : CARF.cabin;
  const mirrors = sh ? 'M5.35177 9L2.5 9M18.6482 9L21.5 9' : 'M5.35177 9L3.5 9M18.6482 9L20.5 9';
  const lamps = sh ? 'M8 12.5L8 15.5M16 12.5L16 15.5' : 'M8 13.5L8 14.5M16 13.5L16 14.5';
  const strokes = body + cabin + mirrors + lamps;
  const bodyPl = grow(body), cabPl = grow(cabin + 'Z'), sil = U(bodyPl, cabPl);
  const glass = meet(runs(cabin + 'Z'), box(0, 0, 24, 10));
  const pane = minus(minus(runs(cabin + 'Z'), band(cabin, sh)), band('M0 10L24 10', sh));
  // duotone (his 25 Oct review, "same here" as bus): no black rules over the grey. The body, cabin and
  // mirrors one grey shape; the glass the pane inside the frame (a grey frame 2 wide round it, clear of
  // the mirrors), the lamps black solids
  const duo = [Pl(E(U(sil, band(mirrors, sh)))), F(E(U(pane, band(lamps, sh))))];
  return { strokes, mirrors, lamps, sil, glass, pane, v: styled([S(strokes)], [Pl(E(sil)), S(strokes)], duo, [F(E(minus(sil, U(pane, band(lamps, sh))))), S(mirrors)]) };
}
def('car-front', (sh) => carFront(sh).v, { aliases: ['car', 'vehicle', 'automobile', 'drive', 'driving', 'front-view'] });

// dumbbell: his, laid on the free diagonal in a frame of s = 2.806/sqrt 2: the bar 2s long, each side
// an inner plate (a stadium 2s wide, 7s long) and an outer one (an r=s U hung off it), the axle's end
// a stub s long. Sharp keeps the r=s ends (round shapes of about 2 stay) and cuts the stubs' free
// ends. Tools rule, the draft's: the plates black, bar and stubs grey; fill the plates solid.
REFS.dumbbell = 'M10.2461 19.3665L4.63355 13.7539L3.93198 13.0524C3.15705 12.2774 3.15705 11.021 3.93198 10.2461C4.70691 9.47115 5.96332 9.47115 6.73825 10.2461L13.7539 17.2618C14.5288 18.0367 14.5288 19.2931 13.7539 20.068C12.979 20.8429 11.7226 20.8429 10.9476 20.068L10.2461 19.3665ZM4.63355 13.7539L3.5812 14.8063C2.80627 15.5812 2.80627 16.8376 3.5812 17.6125L4.98433 19.0157M10.2461 19.3665L9.19373 20.4188C8.4188 21.1937 7.16239 21.1937 6.38746 20.4188L4.98433 19.0157M4.98433 19.0157L3.5812 20.4188M19.3665 10.2461L13.7539 4.63355L13.0524 3.93198C12.2774 3.15705 11.021 3.15705 10.2461 3.93198C9.47115 4.70691 9.47115 5.96332 10.2461 6.73825L17.2618 13.7539C18.0367 14.5288 19.2931 14.5288 20.068 13.7539C20.8429 12.979 20.8429 11.7226 20.068 10.9476L19.3665 10.2461ZM13.7539 4.63355L14.8063 3.5812C15.5812 2.80627 16.8376 2.80627 17.6125 3.5812L19.0157 4.98433M19.3665 10.2461L20.4188 9.19373C21.1937 8.4188 21.1937 7.16239 20.4188 6.38746L19.0157 4.98433M19.0157 4.98433L20.4188 3.5812M10.5969 13.4031L13.4031 10.5969';
const DB = {
  inner: HIS('M10.2461 19.3665L4.63355 13.7539L3.93198 13.0524C3.15705 12.2774 3.15705 11.021 3.93198 10.2461C4.70691 9.47115 5.96332 9.47115 6.73825 10.2461L13.7539 17.2618C14.5288 18.0367 14.5288 19.2931 13.7539 20.068C12.979 20.8429 11.7226 20.8429 10.9476 20.068L10.2461 19.3665Z'),
  outer: HIS('M4.63355 13.7539L3.5812 14.8063C2.80627 15.5812 2.80627 16.8376 3.5812 17.6125L4.98433 19.0157L6.38746 20.4188C7.16239 21.1937 8.4188 21.1937 9.19373 20.4188L10.2461 19.3665'),
};
// sharp (his 25 Oct "these are not sharp"): every corner true, bandage's way. In the bar's frame (u along
// the bar, v across it, 0 at the centre) the rounded plates are an inner stadium u -6.449..-2.481 by
// v +-6.945 and an outer U to u -9.922 by v +-3.969 with r=s outer corners; squared as they stand their
// corners would paint past the rounded drawing's 2 pads, so each corner is pulled in to where the
// rounded curve reached (u + v = -12.728 on the centre line): the inner plate to v +-6.279, the outer
// to u -9.328 by v +-3.400. The stub keeps its 1.98 of daylight past the outer plate, butt at -12.31
const uv = ([u, v]) => [12 + (u + v) / R2, 12 + (v - u) / R2];
const uvD = (pts, close) => 'M' + pts.map((q) => pt(uv(q))).join('L') + (close ? 'Z' : '');
const DBS = {
  inner: uvD([[-6.449, -6.279], [-2.481, -6.279], [-2.481, 6.279], [-6.449, 6.279]], true),
  outer: uvD([[-6.449, -3.4], [-9.328, -3.4], [-9.328, 3.4], [-6.449, 3.4]], false),
  stub: uvD([[-9.328, 0], [-12.31, 0]], false),
};
assert(Math.abs(-6.449 - 6.279 + 12.728) < 1e-3 && Math.abs(-9.328 - 3.4 + 12.728) < 1e-3, 'dumbbell sharp: a corner is off the rounded reach');
def('dumbbell', (sh, R) => {
  const DB0 = sh ? DBS : DB;
  const stub = sh ? DBS.stub : 'M4.98433 19.0157L3.5812 20.4188';
  const side = DB0.inner + DB0.outer, plates = side + rot180(side), stubs = stub + rot180(stub), bar = 'M10.5969 13.4031L13.4031 10.5969';
  // duotone: the two plates told apart by tone, not by a slit (his 25 Oct review): the inner plates
  // black, the outer plates with bar and stubs one grey shape under them
  const innerB = U(grow(DB0.inner), runs(rot180(E(grow(DB0.inner)))));
  const outerG = U(grow(DB0.outer + 'Z'), runs(rot180(E(grow(DB0.outer + 'Z')))), band(bar + stubs, sh));
  return styled([S(plates + stubs + bar)], [Pl(E(U(grow(DB0.inner), grow(DB0.outer + 'Z'), runs(rot180(E(U(grow(DB0.inner), grow(DB0.outer + 'Z')))))))), S(plates + stubs + bar)],
    // fill (his 25 Oct file): the plates one solid each side, no slit between inner and outer
    [Pl(E(outerG)), F(E(innerB))], [F(E(U(grow(DB0.inner), grow(DB0.outer + 'Z'), runs(rot180(E(U(grow(DB0.inner), grow(DB0.outer + 'Z')))))))), S(bar + stubs)]);
}, { aliases: ['weights', 'gym', 'fitness', 'workout', 'exercise', 'barbell', 'strength'] });

// factory: his is the draft's shell (stack 2..7 to 3, three teeth rising 3 in 5, r=0.5 teeth, floor on
// 21 r=2, windows on 10, 14, 18) with a band across the stack on 7 and a line of smoke from the
// stack's right, hooked down at 11 (r=1.5) and run out on 3 to 22. His file was the outlined stroke.
// Duotone: plate grey, windows, band and smoke black, the band a solid across the stack flush with its
// sides (as a rule its round cap stood on the grey's edge). Fill: windows and band open, smoke stroked.
REFS.factory = 'M7 7L7 10.1169C7 10.5055 7.424 10.7456 7.7572 10.5457L11.2428 8.4543C11.576 8.2544 12 8.4945 12 8.8831L12 10.1169C12 10.5055 12.424 10.7456 12.7572 10.5457L16.2428 8.4543C16.576 8.2544 17 8.4945 17 8.8831L17 10.1169C17 10.5055 17.424 10.7456 17.7572 10.5457L21.2428 8.4543C21.576 8.2544 22 8.4945 22 8.8831L22 19C22 20.1046 21.1046 21 20 21L4 21C2.8954 21 2 20.1046 2 19L2 4C2 3.4477 2.4477 3 3 3L6 3C6.5523 3 7 3.4477 7 4L7 7ZM2 7L7 7M11 4.5C11 3.6716 11.6716 3 12.5 3L22 3M10 15L10 17M14 15L14 17M18 15L18 17';
def('factory', (sh, R) => {
  const shell = poly(FACTORY, FACTORY_R, sh, R, { closed: true });
  const win0 = 'M10 15L10 17M14 15L14 17M18 15L18 17', win = sh ? stubEnds(win0, 'both', R) : win0;
  const stackBand = 'M2 7L7 7', smoke = poly([[11, 4.5], [11, 3], [22, 3]], [0, 1.5, 0], sh, R, { ends: [true, true] });
  const plate = grow(shell), slot = meet(band(stackBand, sh), box(3, 0, 6, 24));
  const bandSolid = meet(band('M-1 7L10 7', sh), meet(plate, box(-1, 0, 8, 24)));
  return styled([S(shell + stackBand + smoke + win)], [Pl(E(plate)), S(shell + stackBand + smoke + win)], [Pl(E(plate)), F(E(bandSolid)), S(win + smoke)],
    [F(E(minus(plate, U(band(win, sh), slot)))), S(smoke)]);
}, { aliases: ['industry', 'industrial', 'manufacturing', 'plant', 'production', 'warehouse', 'mill'] });

// feather: his, symmetric about the quill on x + y = 24: a vane with a round head (r 5.29 about the
// quill's end, (15.71, 8.29)), straight sides down to a squared base (the left side near-vertical,
// the floor its mirror, r~1 at each turn) through which the quill runs out to (3,21); one barb from
// the quill to the right side. Sharp: the turns true (the base at (5.24,18.76), where the sides
// meet), the quill's free ends cut. Duotone as leaf's: vane grey, quill and barb black. Fill: the vane
// solid with quill and barb open inside it, the quill's tail stroked.
REFS.feather = 'M15.7124 8.28764L13.5933 10.4067L9.73007 14.2699M9.73007 14.2699L5.4532 18.5468M9.73007 14.2699L15.694 15.7838M9.73007 14.2699L8.4142 8.10794M5.4532 18.5468L3 21M8.4142 8.10794L11.9734 4.54871C14.0384 2.48376 17.3863 2.48376 19.4513 4.54871C21.5162 6.61367 21.5162 9.96162 19.4513 12.0266L15.8921 15.5858L12.3328 19.145C12.1057 19.3722 11.7876 19.4838 11.4683 19.4483L6.08421 18.8501C5.83841 18.8228 5.6185 18.7121 5.4532 18.5468C5.28791 18.3815 5.17724 18.1616 5.14993 17.9158L4.5517 12.5317C4.51622 12.2124 4.62781 11.8943 4.85498 11.6672L8.4142 8.10794Z';
const FEA_VANE = HIS('M5.4532 18.5468C5.28791 18.3815 5.17724 18.1616 5.14993 17.9158L4.5517 12.5317C4.51622 12.2124 4.62781 11.8943 4.85498 11.6672L11.9734 4.54871C14.0384 2.48376 17.3863 2.48376 19.4513 4.54871C21.5162 6.61367 21.5162 9.96162 19.4513 12.0266L15.8921 15.5858L12.3328 19.145C12.1057 19.3722 11.7876 19.4838 11.4683 19.4483L6.08421 18.8501C5.83841 18.8228 5.6185 18.7121 5.4532 18.5468Z');
function featherSharp() {
  // the left side x = 4.5517 + k (y - 12.5317), k its slope; the base where it crosses x + y = 24,
  // the shoulder where it meets the head's side x + y = 16.5222
  const k = (5.14993 - 4.5517) / (17.9158 - 12.5317), on = (s) => { const y = (s - 4.5517 + k * 12.5317) / (1 + k); return [s - y, y]; };
  const base = on(24), Q1 = on(16.5222), Q2 = [24 - Q1[1], 24 - Q1[0]], head = [15.7124, 8.28764], hr = len(sub([11.9734, 4.54871], head));
  return { vane: `M${pt(base)}L${pt(Q1)}L11.9734 4.54871` + arcPts(head, hr, [11.9734, 4.54871], [19.4513, 12.0266], 1) + `L${pt(Q2)}Z`, base };
}
def('feather', (sh, R) => {
  const fs = sh ? featherSharp() : null, vane = sh ? fs.vane : FEA_VANE;
  const tip = sh ? fs.base : [5.4532, 18.5468];
  const quill = sh ? poly([[3, 21], [15.7124, 8.28764]], [0, 0], sh, R) : 'M3 21L15.7124 8.28764';
  // two barbs off the quill's one point (his 25 Oct file): right to the lower edge, left up to the upper one
  const barb = 'M9.73007 14.2699L15.694 15.7838M9.73007 14.2699L8.4142 8.10794', tail = sh ? poly([[3, 21], tip], [0, 0], sh, R, { ends: [true, false] }) : `M3 21L${pt(tip)}`;
  const plate = grow(vane), slots = meet(band(quill + barb, sh), innerOf(vane));
  return styled([S(vane + quill + barb)], [Pl(E(plate)), S(vane + quill + barb)], [Pl(E(plate)), S(quill + barb)], [F(E(minus(plate, slots))), S(tail)]);
}, { aliases: ['quill', 'write', 'lightweight', 'light', 'plume', 'bird'] });

// feather-2 (new, his): a free-drawn plume, the vane one closed curve with a notch cut into its far
// side, the quill a short tail out of its base. Sharp: the vane's soft tip at the top right taken to
// where its two curves' tangents meet, the tail's end stubbed along its tangent.
REFS['feather-2'] = 'M4 21C4.11569 20.135 4.25856 18.9284 4.51086 17.5453M4.51086 17.5453C5.5566 11.8125 8.48231 3.04712 19.1444 3.00001C19.6336 2.99785 20.0516 3.40201 19.9948 3.89633C19.3251 9.72344 9.51661 10.7285 14.5144 10.3551C20.8834 9.87919 12.8956 16.7176 4.51086 17.5453Z';
def('feather-2', (sh, R) => {
  const SOFT = 'C19.6336 2.99785 20.0516 3.40201 19.9948 3.89633';
  // his 25 Oct "slightly redraw to fix these, the rounded options too": sharp sat at 2.90 a side. The
  // tail now leaves the quill's end straight down (its last cubic's first handle vertical, the second
  // on the vane's own tangent), so a butt end paints the round cap's box; and sharp's tip corner, the
  // two edges' meeting point, slides in along its bisector until its join stops on the rounded box
  // (x 21), as mountain's apex and pizza's tip do
  let src = REFS['feather-2'].replace('M4 21C4.11569 20.135 4.25856 18.9284 4.51086 17.5453', 'M4 21C4 19.8 4.2919 18.7366 4.51086 17.5453');
  assert(src !== REFS['feather-2'], 'feather-2: the tail moved');
  if (sh) {
    const A = [19.1444, 3.00001], tA = unit(sub(A, [8.48231, 3.04712])), Bp = [19.9948, 3.89633], tB = unit(sub([19.3251, 9.72344], Bp));
    const t = cross(sub(Bp, A), tB) / cross(tA, tB), X = add(A, mul(tA, t));
    const inward = unit(add(mul(tA, -1), tB)), Xi = add(X, mul(inward, (X[0] - 20) / -inward[0]));
    assert(src.includes(SOFT), 'feather-2: the soft tip moved');
    src = src.replace(SOFT, `L${pt(Xi)}L19.9948 3.89633`);
  }
  const [tail0, vane] = subs(HIS(src));
  // sharp: the free end straight down, carried the cap's unit on so the butt end paints the floor at 22
  const tail = sh ? 'M4 22L' + tail0.slice(1) : tail0;
  assert(tail0.startsWith('M4 21C4 '), 'feather-2: the tail end is not vertical');
  const plate = grow(vane);
  return styled([S(tail + vane)], [Pl(E(plate)), S(tail + vane)], [Pl(E(plate)), S(tail)], [F(E(plate)), S(tail)]);
}, { aliases: ['quill', 'plume', 'write', 'light', 'lightweight'] });

// fire-extinguisher: his canister 8..16 (a dome r=4 on 11, floor 21, r=2), the head a ring r=2 on
// (12,5) sitting on the dome, a nozzle horn off the head's right (5 to 17, flaring to 3 and 7 at 20),
// the hose off the head's left round an r=6 turn down x 4 to 20, a bracket from the canister on 16,
// where the label rule crosses. Sharp: the floor's corners true, the horn's and hose's free ends cut.
// Duotone in his 1 Oct format: the canister and its head one grey shape, the label a black band
// across it, horn, hose and bracket black (the draft's appliance split, a black canister with grey
// parts, went with radio's). Fill: canister and head solid, the label open, the rest stroked.
REFS['fire-extinguisher'] = 'M12 7C9.7909 7 8 8.7909 8 11V16M12 7C14.2091 7 16 8.7909 16 11V16M12 7C13.1046 7 14 6.1046 14 5M12 7C10.8954 7 10 6.1046 10 5M16 16V19C16 20.1046 15.1046 21 14 21H10C8.8954 21 8 20.1046 8 19V16M16 16H8M8 16H4M14 5H17M14 5C14 3.8954 13.1046 3 12 3C10.8954 3 10 3.8954 10 5M17 5V4L20 3M17 5V6L20 7M10 5C6.68629 5 4 7.68629 4 11V20';
def('fire-extinguisher', (sh, R) => {
  const dome = 'M8 11' + arcPts([12, 11], 4, [8, 11], [16, 11], 1);
  const can = dome + poly([[16, 11], [16, 21], [8, 21], [8, 11]], [0, 2, 2, 0], sh, R, { ends: [false, false] }).replace(/^M[^LC]*/, '') + 'Z';
  const head = circ([12, 5], 2), label = 'M8 16L16 16', bracket = 'M8 16L4 16';
  // his 25 Oct "slightly redraw": the horn's mouth flared at 18 degrees, and a free end at that angle
  // cut square in sharp stood 0.09 over the rounded drawing's top and floor (1.91 pads). At 45 degrees
  // a butt end carried to the cap's box paints exactly the round cap's corner: the mouth a V from 18
  // out to (20, 3) and (20, 7), the tips where they were
  const horn = 'M14 5L18 5' + poly([[18, 5], [20, 3]], [0, 0], sh, R, { ends: [false, true] }) + poly([[18, 5], [20, 7]], [0, 0], sh, R, { ends: [false, true] });
  const hose = 'M10 5' + arcPts([10, 11], 6, [10, 5], [4, 11], -1) + (sh ? 'L4 21' : 'L4 20');
  const plate = grow(can), headR = grow(head), slot = box(9, 15, 15, 17), outer = horn + hose + bracket;
  return styled([S(can + head + label + outer)], [Pl(E(U(plate, headR))), S(can + head + label + outer)],
    // duotone (his 25 Oct "colors must be vice versa"): canister and head black, the label and the
    // horn, hose and bracket grey, the label read through the black; one grey shape, none under the black
    (() => { const lab = meet(band('M2 16L22 16', sh), plate), blk = minus(U(plate, headR), lab), gry = minus(U(paintedBy([{ kind: 'stroke', d: outer }], sh), lab), blk);
      return [Pl(E(gry)), F(E(blk))]; })(), [F(E(U(minus(plate, slot), headR))), S(outer)]);
}, { aliases: ['extinguisher', 'fire-safety', 'emergency', 'safety', 'fire'] });

// flashlight: his, lying flat: the handle 2..10 by 8..16, the neck an S-curve out to the head 18..22 by
// 6..18 (r=2 corners all round), the lens a rule on 17, a switch dash on 12. Sharp: the four corners
// true, the S-curve kept, the switch's ends cut. Duotone: the handle grey, the head and switch black.
// Fill: solid with both open between the walls.
REFS.flashlight = 'M12 12L10 12M17 7L17 17M4 16L9.76393 16C11.2344 16 12.6847 16.3424 14 17C15.3153 17.6576 16.7656 18 18.2361 18L20 18C21.1046 18 22 17.1046 22 16L22 8C22 6.89543 21.1046 6 20 6L18.2361 6C16.7656 6 15.3153 6.34237 14 7C12.6847 7.65763 11.2344 8 9.76393 8L4 8C2.89543 8 2 8.89543 2 10L2 14C2 15.1046 2.89543 16 4 16Z';
def('flashlight', (sh, R) => {
  const neckB = 'C11.2344 16 12.6847 16.3424 14 17C15.3153 17.6576 16.7656 18 18.2361 18', neckT = 'C16.7656 6 15.3153 6.34237 14 7C12.6847 7.65763 11.2344 8 9.76393 8';
  const body = sh ? `M2 16L9.76393 16${neckB}L22 18L22 6L18.2361 6${neckT}L2 8Z` : HIS(subs(REFS.flashlight)[2]);
  const lens = 'M17 7L17 17', sw = sh ? 'M9 12L13 12' : 'M12 12L10 12';
  const plate = grow(body), slots = meet(band(lens + sw, sh), innerOf(body));
  // duotone as solids, not rules over the grey (bus's review, 25 Oct): the head from the lens's line
  // to the front black, the switch a black solid, the handle grey
  const head = meet(plate, box(17, -1, 25, 25));
  return styled([S(sw + lens + body)], [Pl(E(plate)), S(sw + lens + body)], [Pl(E(meet(plate, box(-1, -1, 17, 25)))), F(E(U(head, band(sw, sh))))], [F(E(minus(plate, slots)))]);
}, { aliases: ['torch', 'light', 'beam', 'flash', 'lamp', 'search-light'] });

// footprints: his shoe prints, each a sole (a free curve closed by a heel line) with a round heel
// hung under that line (r=2.565), the right print the left's mirror 2 higher. Nothing to take off in
// sharp: the heels are shapes and every end lands (a faceted sharp sole was tried and refused, 25 Oct).
// Fill (25 Oct, mountain-snow's terms): the heel line
// cut through the print, so the heel stands apart from the sole; opened only between the walls it left
// a floating slot. Duotone the same pieces, as paw-print's tones: soles grey, heels black.
REFS.footprints = 'M8.25779 17.2767H3.12819M8.25779 17.2767C8.25779 15.3874 9.1078 13.5 9.79667 10.6641C10.5075 7.73798 9.28371 4.52383 7.23187 4.0515C5.18003 3.57917 2.61522 6.41315 2.10226 10.1918C1.6919 13.2147 2.61522 16.1746 3.12819 17.2767M8.25779 17.2767L8.25779 19.4352C8.25779 20.8517 7.10949 22 5.69299 22C4.27649 22 3.12819 20.8517 3.12819 19.4352V17.2767M15.7422 15.2767H20.8718M15.7422 15.2767C15.7422 13.3874 14.8922 11.5 14.2033 8.66411C13.4925 5.73798 14.7163 2.52383 16.7681 2.0515C18.82 1.57917 21.3848 4.41315 21.8977 8.19178C22.3081 11.2147 21.3848 14.1746 20.8718 15.2767M15.7422 15.2767L15.7422 17.4352C15.7422 18.8517 16.8905 20 18.307 20C19.7235 20 20.8718 18.8517 20.8718 17.4352V15.2767';
const FP = {
  sole: HIS('M8.25779 17.2767C8.25779 15.3874 9.1078 13.5 9.79667 10.6641C10.5075 7.73798 9.28371 4.52383 7.23187 4.0515C5.18003 3.57917 2.61522 6.41315 2.10226 10.1918C1.6919 13.2147 2.61522 16.1746 3.12819 17.2767Z'),
  heel: HIS('M8.25779 17.2767L8.25779 19.4352C8.25779 20.8517 7.10949 22 5.69299 22C4.27649 22 3.12819 20.8517 3.12819 19.4352L3.12819 17.2767'),
};
def('footprints', (sh) => {
  const right = (d) => shift(flipX(d), 0, -2);
  const line = 'M8.25779 17.2767L3.12819 17.2767';
  // sharp: the sole closed on its heel line (round joins at both corners) and the heel's walls landing
  // on that line, where three butt ends at one point would notch the corner
  const left = sh ? FP.sole + FP.heel : line + FP.sole.replace(/Z$/, '') + FP.heel, all = left + right(left);
  const soleL = grow(FP.sole), heelL = grow(FP.heel + 'Z');
  const soles = U(soleL, runs(right(E(soleL)))), heels = U(heelL, runs(right(E(heelL))));
  const seamL = band('M0 17.2767L11 17.2767', sh), seams = U(seamL, runs(right(E(seamL))));
  const solid = minus(U(soles, heels), seams), below = U(box(0, 17.2767, 12, 30), box(12, 15.2767, 24, 30));
  return styled([S(all)], [Pl(E(U(soles, heels))), S(all)], [Pl(E(minus(solid, below))), F(E(meet(solid, below)))], [F(E(solid))]);
}, { aliases: ['footprint', 'steps', 'walk', 'walking', 'trail', 'track', 'tracking', 'shoe-prints'] });

// mountain-snow (dropped as mountain; renamed 25 Oct to the other set's name for a snow-capped peak):
// his outline is the draft's (two peaks, r=1 everywhere, solved to paint 1..23 by 3..21) with a snow
// line across the big peak from slope to slope. Fill (25 Oct): the snow line cut through both slopes,
// so the cap stands apart from the mountains; each end runs out along its slope's normal just far
// enough to clear the silhouette, the left one clipped to the big peak so the cut never reaches the
// small one. Duotone the same pieces: the mountains grey, the cap black. The first fill opened the
// line between the slopes and left a floating flag; the first duotone blacked the big peak's foot
// over the small peak (his review).
REFS['mountain-snow'] = 'M17.3651 9.41633L14.9563 4.5559C14.5785 3.7935 13.4816 3.8214 13.1429 4.602L10.4388 10.8358L10.1462 11.5104C9.84981 12.1937 8.93731 12.3248 8.46051 11.7526L7.92131 11.1056C7.47501 10.57 6.63141 10.644 6.28521 11.249L2.13351 18.5033C1.75201 19.1699 2.23341 20 3.00151 20H20.9987C21.7406 20 22.2242 19.2206 21.8947 18.5559L17.3651 9.41633ZM10.4388 10.8358C10.9076 10.6119 12.2136 10.0874 13.5 10.5C15.835 11.249 16.6284 9.8895 17.3651 9.41633';
def('mountain-snow', (sh, R) => {
  const d = poly(MOUNTAIN.pts, [1, 1, 1, 1, 1], sh, R, { closed: true, pull: { 0: 'in', 4: 'out' } });
  const q = sh ? poly(MOUNTAIN.pts, [1, 1, 1, 1, 1], sh, R, { closed: true, raw: true, pull: { 0: 'in', 4: 'out' } }).q : MOUNTAIN.pts;
  const X = (p, u, r, v) => add(p, mul(u, cross(sub(r, p), v) / cross(u, v)));          // line p+su meets r+tv
  const big = unit(sub(q[3], q[2])), ds = unit(sub(q[1], q[2])), nb = [-ds[1], ds[0]];  // up the big slope; up the small one; off it toward the big peak
  let [s0, c0, m0, m1, m2, c1, s1] = [[10.4388, 10.8358], [10.9076, 10.6119], [12.2136, 10.0874], [13.5, 10.5], [15.835, 11.249], [16.6284, 9.8895], [17.3651, 9.41633]];
  // the left end slides 0.16 down his slope (handle with it) to where the small peak's slope, carried
  // 2 off, crosses it: the fill's gap turns there and runs up beside the small peak, its lower side on
  // the small peak's edge, so the gap is 2 wide all round and the small slope runs straight into it.
  // His end cut the gap straight out across the slope, which left a step on the small peak's shoulder
  // (his 25 Oct review) and a cap corner 1.55 from it
  const e = X(q[2], big, add(q[2], mul(nb, 2)), ds);
  c0 = add(c0, sub(e, s0)); s0 = e;
  if (sh) {
    // sharp's apex slides down its bisector into the box, which moves the right slope: its end (with
    // its handle) goes to the nearest point of the sharp slope
    const u = unit(sub(q[4], q[3])), f1 = add(q[3], mul(u, dot(sub(s1, q[3]), u)));
    c1 = add(c1, sub(f1, s1)); s1 = f1;
  }
  const body = `C${pt(c0)} ${pt(m0)} ${pt(m1)}C${pt(m2)} ${pt(c1)} ${pt(s1)}`, snow = `M${pt(s0)}` + body;
  const plate = grow(d), n1 = normalAt(d, s1), at = (p, n, k) => add(p, mul(n, k));
  // the gap: the line's band, run out along the right slope's normal to clear it, and the leg up the
  // small slope. Sharp's bend is a mitre: band and leg each run back along themselves to where their
  // outer sides meet, so they overlap there (a wedge laid against both only touched them, and the
  // union kept a slit up to the bend)
  const lo = sub(s0, nb), hi = add(s0, nb), up = mul(ds, 5), ts = unit(sub(c0, s0)), nl = [-ts[1], ts[0]];
  const Xm = X(add(s0, nl), ts, lo, ds), back = sh ? dot(sub(Xm, add(s0, nl)), ts) : 0, legBack = sh ? dot(sub(Xm, lo), ds) : 0;
  const leg = runs(`M${pt(add(lo, mul(ds, legBack)))}L${pt(add(hi, mul(ds, legBack)))}L${pt(add(hi, up))}L${pt(add(lo, up))}Z`);
  const cut = U(band(`M${pt(add(s0, mul(ts, back)))}L${pt(s0)}${body}L${pt(at(s1, n1, 1.4))}`, sh), leg);
  // the cap's side of the gap's centre line: up the leg, along the line, out past the right slope
  const far = add(s0, mul(ds, 6)), f1 = at(s1, n1, 8);
  const above = runs(`M${pt([far[0], -6])}L${pt(far)}L${pt(s0)}${body}L${pt(f1)}L30 ${f1[1]}L30 -6Z`);
  const solid = minus(plate, cut), rest = minus(solid, above), cap = meet(solid, above);
  // duotone (his 25 Oct file): the snow grey above its line, the mountains black up to it, the gap
  // itself with the mountains and no daylight between
  const snowCap = minus(meet(plate, above), cut), hills = U(minus(plate, above), meet(plate, cut));   // not plate minus cap: both outlines ran over the apex, a hairline apart
  return styled([S(d + snow)], [Pl(E(plate)), S(d + snow)], [Pl(E(snowCap)), F(E(hills))], [F(E(U(rest, cap)))]);
}, { aliases: ['mountain', 'mountains', 'peak', 'summit', 'snow', 'hiking', 'landscape', 'terrain', 'outdoors'] });

// satellite-dish: his, on ninths: the bowl a half disc r=70/9 about (88/9, 128/9) with its diameter
// on the anti-diagonal (soft r~1 ends), the feed from the bowl's centre up and right to (12,12),
// waves r=40/9 and 80/9 about (118/9, 98/9) over the far quarter. Sharp: the diameter's ends true,
// free ends cut. Duotone in his 1 Oct format, volume's: the bowl grey, the feed and the waves black;
// fill the bowl.
REFS['satellite-dish'] = 'M9.77778 14.2222L5.12967 9.57411C4.92133 9.36578 4.63867 9.24867 4.344 9.24867C3.98422 9.24867 3.64678 9.42289 3.43833 9.716C2.50267 11.0323 2 12.6072 2 14.2222C2 18.5178 5.48222 22 9.77778 22C11.3928 22 12.9677 21.4973 14.284 20.5617C14.5771 20.3532 14.7513 20.0158 14.7513 19.656C14.7513 19.3613 14.6342 19.0787 14.4259 18.8703L9.77778 14.2222ZM9.77778 14.2222L12 12M13.1111 6.44444C15.5657 6.44444 17.5556 8.43433 17.5556 10.8889M13.1111 2C18.0203 2 22 5.97967 22 10.8889';
def('satellite-dish', (sh, R) => {
  const [bowl0, , w1, w2] = subs(HIS(REFS['satellite-dish']));
  const O = [88 / 9, 128 / 9], r = 70 / 9, e0 = add(O, mul([-Math.SQRT1_2, -Math.SQRT1_2], r)), e1 = add(O, mul([Math.SQRT1_2, Math.SQRT1_2], r));
  const bowl = sh ? `M${pt(e0)}` + arcPts(O, r, e0, e1, -1) + 'Z' : bowl0;
  const feed = sh ? poly([O, [12, 12]], [0, 0], sh, R, { ends: [false, true] }) : `M${pt(O)}L12 12`;
  const waves = sh ? stubEnds(w1 + w2, 'both', R) : w1 + w2;
  const plate = E(grow(bowl));
  return styled([S(bowl + feed + waves)], [Pl(plate), S(bowl + feed + waves)], [Pl(plate), S(feed + waves)], [F(plate), S(feed + waves)]);
}, { aliases: ['satellite', 'dish', 'antenna', 'broadcast', 'signal', 'tv', 'reception', 'uplink'] });

// heart-handshake (new, his): heart's outline with two hands meeting inside it: the hand from the
// heart's dip round a knuckle loop and out to its right side, two fingers to the lower right side.
// Sharp: the fingers' free ends cut. Fill (25 Oct, heart-crack's terms): the hand line and the
// fingers cut through the heart's wall, so the solid parts into the two hands, the line out of the
// dip straight up (along its own end it would shave the right lobe) and out of the right side along
// the wall's normal, the fingers out along themselves. Duotone the same two pieces: the upper hand
// black, the lower one with its fingers grey. The first duotone laid the lines black over a grey
// heart and its caps stood on the edge, a sliver at the dip and a bulge at the side (his review).
REFS['heart-handshake'] = 'M15.5 13.5L18 16M12 16L14.7494 18.7441M12 4.5L9.36791 7.4611C8.59978 8.32525 8.63837 9.63837 9.45592 10.4559C10.3087 11.3087 11.6913 11.3087 12.5441 10.4559L13.6409 9.35907C14.4938 8.50618 15.7275 8.06219 16.857 8.48544C18.8195 9.22086 20.1118 10.559 20.5 12.5M12 4.5C10.8426 3.5459 9.5 3 8 3C4.6862 3 2 5.5743 2 8.75C2 13.75 7.4376 17.1033 12 21C16.5624 17.1033 22 13.75 22 8.75C22 5.5743 19.3138 3 16 3C14.5 3 13.1574 3.5459 12 4.5Z';
/** the outward unit normal of closed path d at its point nearest p */
function normalAt(d, p) {
  let best = null;
  for (const run of parseRuns(d)) for (const sg of run.segs) for (let j = 0; j <= 400; j++) { const q = L.segAt(sg, j / 400), dd = len(sub(q, p)); if (!best || dd < best.dd) best = { dd, sg, t: j / 400 }; }
  const a = L.segAt(best.sg, Math.max(0, best.t - 1e-4)), b = L.segAt(best.sg, Math.min(1, best.t + 1e-4)), u = unit(sub(b, a));
  const n = [-u[1], u[0]], c = [12, 11];
  return dot(n, sub(p, c)) > 0 ? n : mul(n, -1);
}
def('heart-handshake', (sh, R) => {
  const [f1, f2, hand, heart] = subs(HIS(REFS['heart-handshake']));
  const fingers = sh ? stubEnds(f1, 'start', R) + stubEnds(f2, 'start', R) : f1 + f2;
  const plate = grow(heart);
  const out = (q, n, k) => pt(add(q, mul(n, k)));
  // the hand meets the wall at 37 degrees, so cut to its end it leaves the upper hand a spike: the
  // cut leaves the line where the wall beside it is 2 thick (the hand 2 from the wall's centre line)
  // and runs out square through the wall; the rest of the line stays solid in the lower hand
  const hr = parseRuns(hand)[0].segs, last = hr.at(-1), wall = [];
  for (const run of parseRuns(heart)) for (const sg of run.segs) for (let j = 0; j <= 300; j++) wall.push(L.segAt(sg, j / 300));
  const D = (t) => { const q = L.segAt(last, t); return Math.min(...wall.map((w) => len(sub(w, q)))); };
  const tE = bisect((t) => D(t) - 2, 0, 1, 50);
  const end = L.segAt(last, tE), nE = normalAt(heart, end);
  const handTo = hr.slice(0, -1).map((sg) => L.segD(sg, false)).join('') + L.segD(L.segPiece(last, 0, tE), false);
  assert(hand.startsWith('M12 4.5'), 'hand moved');
  const handCut = `M12 1.5L12 4.5${handTo}L${out(end, nE, 3)}`;
  const fingerCut = subs(fingers).map((f) => { const ps = [...f.matchAll(/-?\d*\.?\d+/g)].map((m) => +m[0]), a = [ps[0], ps[1]], b = [ps.at(-2), ps.at(-1)]; return `M${pt(a)}L${out(b, unit(sub(b, a)), 3)}`; }).join('');
  const solid = minus(plate, band(handCut + fingerCut, sh));
  const far = add(end, mul(nE, 8)), upper = runs(`M12 -6L12 4.5${handTo}L${pt(far)}L30 ${far[1]}L30 -6Z`);
  const top = meet(solid, upper), rest = minus(solid, upper);
  // sharp: his hand line stops 0.365 short of the wall's centre line, which the round cap hides; a butt
  // face there stood its inner corner 0.075 out of the wall's ink (the T sweep). Sharp runs the line on
  // along its own tangent until both corners are buried
  let handS = hand;
  if (sh) {
    const q1 = L.segAt(last, 1), u = unit(sub(q1, L.segAt(last, 1 - 1e-4))), n = [-u[1], u[0]];
    const worst = (k) => { const q = add(q1, mul(u, k)); return Math.max(...[add(q, n), sub(q, n)].map((c) => Math.min(...wall.map((w) => len(sub(w, c)))))) - 0.99; };
    let k = 0; while (worst(k) > 0 && k < 1) k += 0.005;
    assert(worst(k) <= 0, 'heart-handshake: no landing for the sharp hand');
    handS = hand + `L${pt(add(q1, mul(u, k)))}`;
  }
  return styled([S(fingers + handS + heart)], [Pl(E(plate)), S(fingers + handS + heart)], [Pl(E(rest)), F(E(top))], [F(E(solid))]);
}, { aliases: ['handshake', 'care', 'charity', 'volunteer', 'partnership', 'agreement', 'support', 'donate'] });

// scan-zap (new, his, dropped as focus-flash; renamed 25 Oct into the scan family with the set's own\n// name for the bolt sign, bell-zap and file-zap's): scan's frame with zap's bolt in it (the bolt cloud-lightning carries, 4 up).
// Styles as scan-eye's: two-tone and duotone the frame grey, the bolt black; fill the drawing.
REFS['scan-zap'] = 'M3 8V6C3 4.34315 4.34315 3 6 3H8M16 3H18C19.6569 3 21 4.34315 21 6V8M21 16V18C21 19.6569 19.6569 21 18 21H16M8 21H6C4.34315 21 3 19.6569 3 18V16M13.5 8L9 12.5H15L10.5 17';
def('scan-zap', (sh, R) => {
  const frame = rawStroke('scan', sh)[0].d;
  assert(subs(frame).length === 4, 'scan frame moved');
  const bolt = poly([[13.5, 8], [9, 12.5], [15, 12.5], [10.5, 17]], [0, 0, 0, 0], sh, R);
  return styled([S(frame + bolt)], [M(frame), S(bolt)], [M(frame), S(bolt)], [S(frame + bolt)]);
}, { aliases: ['focus-flash', 'scan-bolt', 'flash', 'focus', 'autofocus', 'camera-flash', 'quick-scan'] });

/* ===================================================== sides, offs and the dashed bubble (24 Oct) */
// His three asks of 24 Oct beside the refs: our train is renamed train-front and every *-front gets
// its side view under the bare name (train, tram, car-taxi; car and bus already are); every transport
// base takes an -off where one fits; message-square-dashed beside message-dashed.

// car-taxi: our car moved down 2 under the roof light car-taxi-front carries, a rule 3 long on 3
// centred on the roof (2 of daylight to it). Every style car's, the light black.
def('car-taxi', (sh) => {
  const sign = sh ? 'M6.5 3L11.5 3' : 'M7.5 3L10.5 3', out = {};
  for (const st of STY) {
    out[st] = rawLayers('car', st, corners(sh)).map((l) => ({ ...l, d: shift(l.d, 0, 2) }));
    const i = out[st].findLastIndex((l) => l.kind === 'stroke');
    if (i >= 0) out[st][i] = { ...out[st][i], d: out[st][i].d + sign }; else out[st].push(S(sign));
  }
  // duotone: the windows as black panes on the grey body (his 25 Oct review, "the windows are
  // missing"): the glass is what car's fill opens, its solid's two holes
  const glass = subs(rawLayers('car', 'fill', corners(sh)).find((l) => l.kind === 'solid').d).slice(1).map((w) => shift(w, 0, 2)).join('');
  assert(subs(glass).length === 2, 'car-taxi: car\'s windows moved');
  const di = out.duotone.findIndex((l) => l.kind === 'plate');
  out.duotone.splice(di + 1, 0, F(glass));
  return out;
}, { aliases: ['taxi', 'cab', 'ride', 'hail', 'yellow-cab'] });

// train: a side view facing right, the rail half of the vocabulary: the body 2..22 from a roof on 4 to
// a floor on 15 (back corners r=2), its nose a quarter round r=9 about (13,13) from the roof down to
// x 22, which runs on to the floor (r=2: the nose's own vertical keeps x 22 in the box); the window
// rule on 9 to the nose with posts on 7.5 and 13 (two panes and the windscreen); three wheels as beads
// r=1.5 on 19.5, 2 clear of the floor. 22 x 18. Tones as bus's: the body grey, the windows' frame and
// wheels black; fill the body with the panes open.
const TRAIN_S = { c: [13, 13], r: 9 };
function trainSide(sh) {
  const { c, r } = TRAIN_S;
  const nose = arcPts(c, r, [13, 4], [22, 13], 1);
  const body = sh ? 'M2 15L2 4L13 4' + nose + 'L22 15Z'
    : chainD([{ t: 'L', a: [2, 15], b: [2, 4] }, { t: 'L', a: [2, 4], b: [13, 4] }, { t: 'A', c, r, a: [13, 4], b: [22, 13], dir: 1 }, { t: 'L', a: [22, 13], b: [22, 15] }, { t: 'L', a: [22, 15], b: [2, 15] }], [2, 0, 0, 2, 2]);
  const xR = c[0] + Math.sqrt(r * r - (c[1] - 9) ** 2);
  const win = `M2 9L${pt([xR, 9])}M7.5 4L7.5 9M13 4L13 9`;
  const wheels = [6, 12, 18].map((x) => circ([x, 19.5], 1.5)).join('');
  const plate = grow(body), panes = runs(`M-1 -1L25 -1L25 9L-1 9Z`);
  return styled([S(body + win), F(wheels)], [Pl(E(plate)), S(body + win), F(wheels)], [Pl(E(plate)), S(win), F(wheels)], [F(E(minus(runs(body), panes))), S(body + win), F(wheels)]);
}
def('train', (sh) => trainSide(sh), { aliases: ['railway', 'rail', 'high-speed-train', 'bullet-train', 'locomotive', 'commute'] });

// train-front: our shipped train, renamed on his ask (24 Oct): its eight files as they ship, read from
// raw/train-front since the rename moved them there (2.2.0).
def('train-front', (sh) => Object.fromEntries(STY.map((st) => [st, rawLayers('train-front', st, corners(sh))])), { aliases: ['train', 'subway', 'metro', 'railway', 'locomotive'] });

// tram: a side view on the rail vocabulary: a body 2..22 by 7..16 (r=2), tram-front's pantograph on its
// roof (the wire 8..16 on 3), the window rule on 11 with posts on 7, 12 and 17, two wheel beads r=1.5 on
// 20.5 at 7 and 17, 2 clear of the floor. Tones as tram-front's.
function tramSide(sh, R) {
  const body = rect(2, 7, 22, 16, 2, sh, R);
  const panto = (sh ? 'M7 3L17 3' : 'M8 3L16 3') + 'M10 7L12 3L14 7';
  const win = 'M2 11L22 11M7 7L7 11M12 7L12 11M17 7L17 11';
  const wheels = circ([7, 20.5], 1.5) + circ([17, 20.5], 1.5);
  const plate = grow(body), panes = runs('M-1 -1L25 -1L25 11L-1 11Z');
  return styled([S(body + panto + win), F(wheels)], [Pl(E(plate)), S(body + panto + win), F(wheels)], [Pl(E(plate)), S(panto + win), F(wheels)],
    [F(E(minus(runs(body), panes))), S(body + panto + win), F(wheels)]);
}
def('tram', (sh, R) => tramSide(sh, R), { aliases: ['streetcar', 'trolley', 'light-rail', 'tramway', 'cable-car'] });

// message-square-dashed: message-square dashed on square-dashed's terms: each corner arc a dash (run on
// 1.75 down the long sides so every gap on them is 4.5), a dash 3 long centred on the top and floor,
// the tail a dash of its own from the floor's corner round to 12.25 up the left wall. Sharp: corners
// true (square-dashed's L pieces), every free end stubbed a unit, the tail's floor end run a unit along
// the floor the bubble had.
def('message-square-dashed', (sh) => {
  const d = sh
    ? 'M3 8.75L3 3L7 3M9.5 3L14.5 3M17 3L21 3L21 8.75M21 11.25L21 17L17 17M15 17L10 17M8 17L7 17L3 21L3 11.25'
    : 'M3 7.75L3 6' + arcPts([6, 6], 3, [3, 6], [6, 3], 1) + 'M10.5 3L13.5 3M18 3' + arcPts([18, 6], 3, [18, 3], [21, 6], 1) + 'L21 7.75M21 12.25L21 14' + arcPts([18, 14], 3, [21, 14], [18, 17], 1)
      + 'M14 17L11 17M7 17L3 21L3 12.25';
  return [S(d)];
}, { aliases: ['message-square-draft', 'draft', 'comment-draft', 'empty-message', 'placeholder', 'chat-dashed'] });

/* ---------------------------------------------------------------- the -off kit */
// The house -off (drawing-a-new-icon.md section 8, copy-off's recipe): the base at its own size, the
// slash M2 2L22 22 in the stroke's path; the near side (x - y <= 0) runs into the slash's centre line,
// the far side stops 2 clear of the slash's ink (u >= 4 sqrt 2 regular; sharp's butt corners 1.59
// clear). Two-tone: the base's plates cut the same way (far at 3 sqrt 2, tangent to the far caps)
// under the near strokes; duotone: everything the base paints grey in one shape, only the slash black;
// fill: the base's solids cut, its strokes cut, the slash. Pieces under 2 long are debris and go.
const OFF_U4 = 4 * R2, OFF_US = 4 * R2 - 2, OFF_U3 = 3 * R2;
const offPieces = (d, sharp) => {
  const u = (p) => p[0] - p[1];
  const tg = (s, t) => { const h = 1e-5, a = L.segAt(s, Math.max(0, t - h)), b = L.segAt(s, Math.min(1, t + h)); return unit(sub(b, a)); };
  const keep = (s, t) => { const p = L.segAt(s, t); if (u(p) <= 0) return true; if (!sharp) return u(p) >= OFF_U4; const T = tg(s, t), n = [-T[1], T[0]]; return Math.min(u(add(p, n)), u(sub(p, n))) >= OFF_US; };
  let near = '', far = '';
  for (const run of parseRuns(d)) {
    const ps = [];
    run.segs.forEach((s, i) => {
      let t = 0, k = keep(s, 0);
      for (let j = 1; j <= 400; j++) { const tj = j / 400, kj = keep(s, tj); if (kj !== k) { const tb = bisect((x) => (keep(s, x) === k ? -1 : 1), (j - 1) / 400, tj, 60); if (k && tb - t > 1e-6) ps.push([i, t, tb]); t = tb; k = kj; } }
      // a cut landing on a segment's end leaves a zero-length piece (ship's cabin corner on u = 0)
      if (k && 1 - t > 1e-6) ps.push([i, t, 1]);
    });
    const chains = [];
    for (const pc of ps) { const last = chains.at(-1)?.at(-1); if (last && ((last[0] === pc[0] && Math.abs(last[2] - pc[1]) < 1e-9) || (last[0] + 1 === pc[0] && last[2] === 1 && pc[1] === 0))) chains.at(-1).push(pc); else chains.push([pc]); }
    if (run.closed && chains.length > 1) { const f = chains[0][0], l = chains.at(-1).at(-1); if (f[1] === 0 && f[0] === 0 && l[0] === run.segs.length - 1 && l[2] === 1) chains[0] = [...chains.pop(), ...chains[0]]; }
    // a closed run the slash never reaches stays closed (its last join, not two caps)
    if (run.closed && ps.length === run.segs.length && ps.every(([, t0, t1]) => t0 === 0 && t1 === 1)) { const dd = run.segs.map((s, k) => L.segD(s, k === 0)).join('') + 'Z'; if (u(L.segAt(run.segs[0], 0)) <= 0) near += dd; else far += dd; continue; }
    for (const ch of chains) {
      const segs = ch.map(([i, t0, t1]) => L.segPiece(run.segs[i], t0, t1));
      let length = 0; for (const sg of segs) for (let j = 1; j <= 20; j++) length += len(sub(L.segAt(sg, j / 20), L.segAt(sg, (j - 1) / 20)));
      // debris is what the cut leaves: a run the slash never reached stays whatever its length (a lamp)
      const intact = ch[0][0] === 0 && ch[0][1] === 0 && ch.at(-1)[0] === run.segs.length - 1 && ch.at(-1)[2] === 1;
      if (length < 2 && !intact) continue;
      const dd = segs.map((s, k) => L.segD(s, k === 0)).join('');
      if (u(L.segAt(segs[Math.floor(segs.length / 2)], 0.5)) <= 0) near += dd; else far += dd;
    }
  }
  return { near, far };
};
const OFF_SLASH = (sharp) => (sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22');
const nearHalf = () => [runs('M-10 -10L-10 40L40 40Z')[0]];
const farHalf = (c) => [runs(`M${c - 10} -10L40 -10L40 ${40 - c}Z`)[0]];
/** a region cut for an -off: the near side to the slash's centre line, the far side from c; specks go */
const offRegion = (X, sharp) => {
  const halves = [nearHalf(), farHalf(sharp ? OFF_US : OFF_U3)];
  // what the slash leaves of a hole goes when it is a sliver (his file-off rule 1, slivers deleted):
  // car-front-off's windscreen corner showed 0.6 beside the slash's ink, a notch in the near piece's
  // cut edge rather than a hole of its own, so each hole's part on each side is measured on what the
  // slash does not cover and, under 1, filled back in
  const slashInk = band(OFF_SLASH(sharp), sharp), areaOf = (R) => (R && R.length ? Math.abs(R.reduce((t, x) => t + Bo.area(x), 0)) : 0);
  const inside = (r, set) => set.some((o) => o !== r && Math.abs(Bo.area(o)) > 0.8 && Bo.winding(Bo.flat(r, 0.05)[0], [Bo.flat(o, 0.05)]) !== 0);
  const holes = X.filter((r) => inside(r, X)).map((r) => (Bo.area(r) < 0 ? Bo.revRun(r) : r));
  const filled = [];
  for (const h of holes) for (const half of halves) {
    const part = meet([h], half); if (!part || !part.length) continue;
    let seen; try { seen = areaOf(minus(part, slashInk)); } catch { seen = areaOf(part); }
    if (seen < 1) filled.push(...part.filter((r) => Bo.area(r) > 0));
  }
  let cut = U(meet(X, halves[0]), meet(X, halves[1]), ...filled.map((r) => meet([r], U(halves[0], halves[1]))));
  // and daylight the cut leaves narrower than a unit between a piece's outline and the slash's ink goes
  // too (ship-off's deck left a 0.3 nick under the cabin wall): each side's outlines closed by 0.5,
  // kept only within 1 of the slash's ink and outside the side's own holes, so nothing else moves
  const reach = U(...band(OFF_SLASH(sharp), false).map((r) => [Bo.grow(r, 1)]));
  for (const half of halves) {
    const side = meet(cut, half); if (!side || !side.length) continue;
    const outs = side.filter((r) => !inside(r, side)), hs = side.filter((r) => inside(r, side)).map((r) => (Bo.area(r) < 0 ? Bo.revRun(r) : r));
    let closed;
    try { closed = U(...outs.map((r) => [Bo.grow(Bo.area(r) < 0 ? Bo.revRun(r) : r, 0.5)])); closed = U(...closed.filter((r) => Bo.area(r) > 0).map((r) => [Bo.shrink(r, 0.5)])); } catch { continue; }
    try {
      let add = meet(meet(closed, reach), half);
      if (add && add.length && hs.length) add = minus(add, hs);
      // a closing that only re-traces the cut edge adds slivers of no area: those are left out
      add = (add || []).filter((r) => Math.abs(Bo.area(r)) > 1e-3);
      if (add.length) cut = U(cut, add);
    } catch (e) { if (process.env.DBG) console.log('offRegion: closing skipped', e.message); }
  }
  return cut.filter((r) => inside(r, cut) || Math.abs(Bo.area(r)) > 0.8);
};
/** dots (filled circles, given as d) kept only where they clear the slash's ink: near by 1, far by 2 */
const offDots = (d) => subs(d).filter((s) => { const b = PG.pathBBox(s), c = [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2], r = (b[2] - b[0]) / 2, u = c[0] - c[1]; return u <= 0 ? -u / R2 - r >= 2 : u / R2 - r >= 3; }).join('');
const isDot = (s) => { const b = PG.pathBBox(s); return /C/.test(s) && Math.abs(b[2] - b[0] - (b[3] - b[1])) < 1e-3 && b[2] - b[0] <= 3.01; };
/** subpaths that draw something (raw files carry the odd bare M) */
const drawn = (d) => subs(d).filter((s) => /[LC]/.test(s)).join('');
/**
 * Everything a set of layers paints, as one region. A stroke whose band lies inside the solids adds
 * nothing, and its caps touching their edge (a rule ending on a wall) trip the boolean: those are
 * left out, tested as the centre line inside the solids shrunk by 0.98.
 */
// a closed stroke's band is a ring: banded as an open run its seam took two caps, and butt caps at a
// corner seam left a notch (sharp rocket-off's flame tip, 0.74 short of the fill)
const ringBand = (sp, sharp) => {
  if (!/Z\s*$/.test(sp)) return band(sp, sharp);
  let r = runs(sp)[0]; if (Bo.area(r) < 0) r = Bo.revRun(r);
  const out = [Bo.grow(r)];
  try { const inn = Bo.shrink(r); if (Bo.area(inn) > 1e-3) return minus(out, [inn]); } catch { /* a loop too small to hold a counter */ }
  return out;
};
function paintedBy(layers, sharp) {
  let acc = U(...layers.filter((l) => l.kind === 'plate' || l.kind === 'solid').map((l) => runs(l.d)));
  const core = acc ? acc.filter((r) => Bo.area(r) > 0).map((r) => Bo.flat(Bo.shrink(r, 0.98), 0.05)) : [];
  const inCore = (p) => core.length && Bo.winding(p, core) !== 0;
  for (const l of layers.filter((x) => x.kind === 'stroke' || x.kind === 'muted')) for (const sp of subs(drawn(l.d))) {
    const pts = []; for (const run of parseRuns(sp)) for (const sg of run.segs) for (let j = 0; j <= 12; j++) pts.push(L.segAt(sg, j / 12));
    if (pts.every(inCore)) continue;
    if (!acc) { acc = ringBand(sp, sharp); continue; }
    // a band running tangent to the solids' edge (ship's wave under its hull) trips the boolean: then
    // union it a segment at a time, and last, nudged 0.002 off the tangency
    try { acc = U(acc, ringBand(sp, sharp)); continue; } catch { /* below */ }
    let ok = false;
    try { let a2 = acc; for (const run of parseRuns(sp)) for (const sg of run.segs) a2 = U(a2, band(L.segD(sg, true), sharp)); acc = a2; ok = true; } catch { /* below */ }
    if (!ok) acc = U(acc, band(shift(sp, 0.002, 0.002), sharp));
  }
  return acc;
}
function offOf(base0, sharp, fixFar = (d) => d) {
  const slash = OFF_SLASH(sharp);
  // beads go whole or not at all, in every style (a bead cut by the slash leaves a half disc, and one
  // kept by the solids' cut can sit under the slash's ink): each solid layer's dots pass offDots first
  const base = Object.fromEntries(Object.entries(base0).map(([st, ls]) => [st, ls.map((l) => {
    if (l.kind !== 'solid') return l;
    const parts = subs(l.d), dots = parts.filter(isDot), rest = parts.filter((x) => !isDot(x));
    return { ...l, d: rest.join('') + offDots(dots.join('')) };
  }).filter((l) => l.d)]));
  const strokeOf = (layers) => drawn(layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join(''));
  const dotsOf = (layers) => layers.filter((l) => l.kind === 'solid').map((l) => subs(l.d).filter(isDot).join('')).join('');
  const sp0 = offPieces(drawn(strokeOf(base.stroke)), sharp), sp = { ...sp0, far: fixFar(sp0.far) };
  const stroke = [S(sp.near + sp.far + slash)], sd = offDots(dotsOf(base.stroke)); if (sd) stroke.push(F(sd));
  // two-tone: the plates (and any solid that is not a dot) cut, the near strokes and dots, the slash
  const tt = base['two-tone'];
  const ttPlate = U(...tt.filter((l) => l.kind === 'plate').map((l) => runs(l.d)));
  const ttNear = offPieces(strokeOf(tt), sharp).near, ttMuted = offPieces(tt.filter((l) => l.kind === 'muted').map((l) => l.d).join(''), sharp).near;
  const ttDots = subs(offDots(dotsOf(tt))).filter((s) => { const b = PG.pathBBox(s); return b[0] - b[3] <= 0; }).join('');
  // the far side goes muted (sharp.md, two-tone -off): its plate, and every far stroke no plate holds
  // greyed into that one shape. Dropping them lost ship-off's cabin and car-front-off's mirror (his
  // 25 Oct review); a muted stroke over the plate would paint twice
  const ttFarS = fixFar(offPieces(strokeOf(tt), sharp).far), ttFarM = offPieces(drawn(tt.filter((l) => l.kind === 'muted').map((l) => l.d).join('')), sharp).far;
  const ttFarGrey = paintedBy([...(ttPlate && ttPlate.length ? [{ kind: 'plate', d: E(offRegion(ttPlate, sharp)) }] : []), { kind: 'stroke', d: ttFarS }, { kind: 'muted', d: ttFarM }].filter((l) => l.d), sharp);
  const twoTone = [];
  if (ttFarGrey && ttFarGrey.length) twoTone.push(Pl(E(ttFarGrey)));
  if (ttMuted) twoTone.push(M(ttMuted));
  twoTone.push(S(ttNear + slash)); if (ttDots) twoTone.push(F(ttDots));
  // fill: solids cut, strokes cut
  const fl = base.fill, fs = U(...fl.filter((l) => l.kind === 'solid' || l.kind === 'plate').map((l) => runs(l.d)));
  const fp0 = offPieces(strokeOf(fl), sharp), fp = { ...fp0, far: fixFar(fp0.far) };
  // a pocket of daylight the slash closes off between strokes and solids (ship-off's cabin corner
  // under the slash, 0.13) is a speck: filled into the solid
  let fsCut = fs && fs.length ? offRegion(fs, sharp) : [];
  try {
    const ink = paintedBy([...(fsCut.length ? [{ kind: 'solid', d: E(fsCut) }] : []), { kind: 'stroke', d: fp.near + fp.far + slash }], sharp);
    const pockets = ink.filter((r) => Math.abs(Bo.area(r)) < 0.6 && ink.some((o) => o !== r && Math.abs(Bo.area(o)) > 0.8 && Bo.winding(Bo.flat(r, 0.05)[0], [Bo.flat(o, 0.05)]) !== 0)).map((r) => (Bo.area(r) < 0 ? Bo.revRun(r) : r));
    // grown 0.05 so the filled pocket overlaps the ink round it rather than meeting it edge to edge
    if (pockets.length) fsCut = U(fsCut, ...pockets.map((r) => [Bo.grow(r, 0.05)]));
  } catch (e) { if (process.env.DBG) console.log('offOf: pockets skipped', e.message); }
  const fill = [];
  if (fsCut.length) fill.push(F(E(fsCut)));
  fill.push(S(fp.near + fp.far + slash));
  // duotone: the fill's drawing in grey, one shape, only the slash black (styles.md, -off: bot-off,
  // camera-off, eye-off as shipped). Greying the duotone instead merged its black details into the
  // body and lost the windscreens and lamps (his 25 Oct review: "what are these?")
  const grey = paintedBy(fill.slice(0, -1).concat(fp.near + fp.far ? [{ kind: 'stroke', d: fp.near + fp.far }] : []), sharp);
  const duotone = [Pl(E(grey)), S(slash)];
  return { stroke, 'two-tone': twoTone, duotone, fill };
}
const baseStyles = (name, sh) => (STYLES[name] ? STYLES[name](sh) : Object.fromEntries(STY.map((st) => [st, rawLayers(name, st, corners(sh))])));
export const OFF_BASES = { 'car-off': 'car', 'car-front-off': 'car-front', 'car-taxi-front-off': 'car-taxi-front', 'bus-off': 'bus', 'tram-front-off': 'tram-front', 'train-front-off': 'train-front', 'truck-off': 'truck', 'plane-off': 'plane', 'ship-off': 'ship', 'bike-off': 'bike', 'bike-2-off': 'bike-2', 'rocket-off': 'rocket', 'rocket-vertical-off': 'rocket-vertical' };
// what a slash swallows goes before the cut: ship's porthole (12, 14..15) sits 0.42 inside the slash's
// ink, neither crossing it nor 2 clear, and under 2 long (drawing-a-new-icon.md section 8); every style
const OFF_DROP = { 'ship-off': (sp) => { const b = PG.pathBBox(sp); return b[0] >= 10.9 && b[2] <= 13.1 && b[1] >= 12.9 && b[3] <= 16.1; } };
const dropped = (base, f) => (f ? Object.fromEntries(Object.entries(base).map(([st, ls]) => [st, ls.map((l) => ({ ...l, d: subs(l.d).filter((sp) => !f(sp)).join('') })).filter((l) => l.d)])) : base);
// a far cut at a T: sharp tram-front's pantograph leg lands on the roof just past the cut, and cut on
// its own standoff its butt face stood left of the roof's (a step, the T sweep's VV 0.60): the leg
// ends instead where its face runs through the roof's cut corner (10.6569, 5)
function landFace(d, from, to, corner) {
  const dir = unit(sub(from, to)), n = [-dir[1], dir[0]];
  const s = bisect((k) => dot(sub(corner, add(to, mul(dir, k))), dir), 0, len(sub(from, to)), 60);
  const p = add(to, mul(dir, s));
  assert(Math.abs(dot(sub(corner, p), dir)) < 1e-6 && Math.abs(dot(sub(corner, p), n)) < 1, 'land face off');
  return p;
}
for (const [name, b] of Object.entries(OFF_BASES)) {
  if (name === 'car-front-off') continue;
  def(name, (sh) => {
    let fix;
    // bike-2's fork runs radially from the bars to the front axle, so the slash cuts it right where it
    // crosses the wheel: its stub butted the wheel's cut end (round caps pinched, sharp ends stepped,
    // the T sweep's VV 0.43). The stub, under 3 long, goes; the bars end at the frame's joint
    if (name === 'bike-2-off') fix = (d) => d.replace(/(L15\.8462 9)L(?:16\.3748 10\.7179|16\.7082 11\.8015)/, '$1');
    if (name === 'tram-front-off' && sh) {
      const p = landFace(null, [10, 6], [12, 2], [10.6569, 5]);
      fix = (d) => { assert(!d || /M10\.0347 5\.9306L12 2/.test(d), 'tram-front-off: the leg moved'); return d.replace(/M10\.0347 5\.9306L12 2/, `M${pt(p)}L12 2`); };
    }
    return offOf(dropped(baseStyles(b, sh), OFF_DROP[name]), sh, fix);
  });
}
// car-front-off: his rounded stroke as drawn (his far ends stop 1.54 to 1.89 clear of the slash where
// the house cut leaves 2); every other style, and sharp, cut from car-front by the kit.
REFS['car-front-off'] = 'M19 10.1707C18.6872 10.0602 18.3506 10 18 10H15M19 10.1707C20.1652 10.5825 21 11.6937 21 13V15.5M19 10.1707L18.6482 9M5 10.1707C3.83479 10.5825 3 11.6937 3 13V18.0346C3 19.12 3.87996 20 4.96544 20C5.86731 20 6.65345 19.3862 6.87219 18.5113L7 18H17L17.1278 18.5113C17.3465 19.3862 18.1327 20 19.0346 20C19.3183 20 19.588 19.9399 19.8317 19.8317M5 10.1707C5.31278 10.0602 5.64936 10 6 10H10M5 10.1707L5.35177 9M9.47624 4H14.5238C15.7229 4 16.8068 4.71403 17.2801 5.81574L18.6482 9M18.6482 9H20.5M5.35177 9H3.5M5.35177 9L6.44816 6.44816M8 14.5V13.5M2 2L6.44816 6.44816M6.44816 6.44816L10 10M10 10L19.8317 19.8317M19.8317 19.8317L22 22';
def('car-front-off', (sh) => {
  const v = offOf(carFront(sh).v, sh);
  if (!sh) v.stroke = [S(HIS(REFS['car-front-off']))];
  return v;
}, { aliases: ['no-car', 'no-driving', 'car-slash'] });

// dropped or renamed on his 25 Oct review: gone from the batch (their builders above stay as the record)
for (const n of ['toy-brick', 'train', 'tram', 'focus-flash', 'mountain']) delete STYLES[n];
