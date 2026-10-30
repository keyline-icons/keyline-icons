// Stays and amenities batch, preview round 1 (29 Oct 2026): sixty new bases off two booking
// sites' amenity lists, which served as a subject list only. Every drawing is built here on the
// house envelope, radius ladder and 2-unit gaps; nothing is traced. Stroke, rounded corners only:
// the other styles and sharp follow his verdicts.
//   node kit.mjs <outDir> [name...]: round 1 (stroke only); g23.mjs imports its helpers
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const ROOT = resolve(import.meta.dirname, '../..');
const { fillet, arcTo, pt } = await import(`${ROOT}/tools/v5/geom.mjs`);
const { strokedBBox } = await import(`${ROOT}/pipeline/lib/geom.mjs`);
const { parse, at, segsToD } = await import(`${ROOT}/tools/v8/cut.mjs`);
const { slice } = await import(`${ROOT}/tools/v8/c2/cutter.mjs`);

const D = Math.PI / 180;
const P = (c, r, a) => [c[0] + r * Math.cos(a * D), c[1] + r * Math.sin(a * D)];
const deg = (v) => Math.atan2(v[1], v[0]) / D;
const arcC = (c, r, a0, a1) => arcTo(c, r, a0, a1).map((s) => `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`).join('');
const arc = (c, r, a0, a1) => `M${pt(P(c, r, a0))}` + arcC(c, r, a0, a1);
const ring = (cx, cy, r) => arc([cx, cy], r, 0, 360) + 'Z';
const disc = ring;
const L = (...p) => 'M' + p.map(pt).join('L');
const far = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) > 1e-6;

// the fillet at V as an arc about its own centre, so every corner is a true circle piece
function corner(A, V, B, r) {
  if (!r) return { T1: V, T2: V, arcs: '' };
  const fl = fillet(A, V, B, r);
  const a0 = deg([fl.T1[0] - fl.F[0], fl.T1[1] - fl.F[1]]);
  let d = deg([fl.T2[0] - fl.F[0], fl.T2[1] - fl.F[1]]) - a0;
  while (d > 180) d -= 360; while (d <= -180) d += 360;
  return { T1: fl.T1, T2: fl.T2, arcs: arcC(fl.F, r, a0, a0 + d) };
}
function closed(pts, radii) {
  const n = pts.length;
  const c = pts.map((V, i) => corner(pts[(i - 1 + n) % n], V, pts[(i + 1) % n], radii[i] ?? 0));
  let d = `M${pt(c[0].T2)}`, cur = c[0].T2;
  for (let i = 1; i <= n; i++) {
    const k = c[i % n];
    if (far(cur, k.T1)) d += `L${pt(k.T1)}`;
    d += k.arcs; cur = k.T2;
  }
  return d + 'Z';
}
function open(pts, radii) {
  let d = `M${pt(pts[0])}`, cur = pts[0];
  for (let i = 1; i < pts.length - 1; i++) {
    const k = corner(pts[i - 1], pts[i], pts[i + 1], radii[i - 1] ?? 0);
    if (far(cur, k.T1)) d += `L${pt(k.T1)}`;
    d += k.arcs; cur = k.T2;
  }
  return d + (far(cur, pts.at(-1)) ? `L${pt(pts.at(-1))}` : '');
}
const rr = (x0, y0, x1, y1, r) => closed([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);
export const ink = (d) => { const b = strokedBBox(d, 1, 'round'); return Array.isArray(b) ? b : [b.x0, b.y0, b.x1, b.y1]; };
const solve = (lo, hi, fn) => { let flo = fn(lo); for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2, fm = fn(m); if (fm * flo <= 0) hi = m; else { lo = m; flo = fm; } } return (lo + hi) / 2; };
// soup's steam, the set's own S: 2 wide, h tall, from (x, y + h) up to (x + 2, y)
const steam = (x, y, h = 4) => { const Y = (v) => y + (v * h) / 4; return `M${pt([x, Y(4)])}C${pt([x, Y(3.2131)])} ${pt([x + 0.3705, Y(2.4721)])} ${pt([x + 1, Y(2)])}C${pt([x + 1.6295, Y(1.5279)])} ${pt([x + 2, Y(0.7869)])} ${pt([x + 2, Y(0)])}`; };
// a wave of half-sines, first half up; each half peaks exactly `amp` off the centre line
const wave = (x0, x1, yc, amp, halves) => { const w = (x1 - x0) / halves, k = (4 / 3) * amp; let d = `M${pt([x0, yc])}`; for (let i = 0; i < halves; i++) { const a = x0 + i * w, s = i % 2 ? 1 : -1; d += `C${pt([a + 0.3642 * w, yc + s * k])} ${pt([a + 0.6358 * w, yc + s * k])} ${pt([a + w, yc])}`; } return d; };
const crossX = (A, B, y) => A[0] + ((B[0] - A[0]) * (y - A[1])) / (B[1] - A[1]);

// remove from `d` every point whose centre line comes within `clear` of a keep-out test,
// splitting segments exactly at the boundary (de Casteljau), dropping runs under `keep`
function cutWhere(d, bad, keep = 1.5) {
  const out = [];
  for (const sp of parse(d)) {
    const runs = []; let cur = null;
    for (const g of sp.segs) {
      const k = 400, B = []; for (let i = 0; i <= k; i++) B.push(bad(at(g, i / k)));
      const edge = (i) => { let lo = (i - 1) / k, hi = i / k; const b0 = B[i - 1]; for (let t = 0; t < 50; t++) { const m = (lo + hi) / 2; if (bad(at(g, m)) === b0) lo = m; else hi = m; } return (lo + hi) / 2; };
      let u = 0, state = B[0];
      if (!state && !cur) cur = { segs: [], s: false };
      for (let i = 1; i <= k; i++) if (B[i] !== state) {
        const e = edge(i);
        if (!state) { if (e - u > 1e-9) cur.segs.push(slice(g, u, e)); cur.e = true; runs.push(cur); cur = null; }
        else cur = { segs: [], s: true };
        u = e; state = B[i];
      }
      if (!state) { if (!cur) cur = { segs: [], s: true }; if (1 - u > 1e-9) cur.segs.push(slice(g, u, 1)); }
    }
    if (cur) { cur.e = false; runs.push(cur); }
    if (sp.closed && runs.length >= 2 && !runs[0].s && !runs.at(-1).e) { const last = runs.pop(); runs[0].segs = [...last.segs, ...runs[0].segs]; }
    for (const r of runs) {
      const len = r.segs.reduce((a, g) => a + Math.hypot(g.p1[0] - g.p0[0], g.p1[1] - g.p0[1]), 0);
      if (r.segs.length && len >= keep) out.push(segsToD(r.segs) + (sp.closed && runs.length === 1 && !r.s && !r.e ? 'Z' : ''));
    }
  }
  return out.join('');
}
const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy; const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
// the house -off: slash M2 2L22 22, base kept where u = x - y <= 0 or >= 4 sqrt 2
const off = (d) => cutWhere(d, ([x, y]) => x - y > 1e-9 && x - y < 4 * Math.SQRT2 - 1e-9, 0.5) + 'M2 2L22 22';

// ---------------------------------------------------------------- bathroom
const ICONS = {};
const def = (name, fn) => { ICONS[name] = fn; };

// tub on two feet, rim corners r=1, basin r=4; a faucet hooked over the rim
def('bathtub', () => ({ s: closed([[2, 11], [22, 11], [22, 19], [2, 19]], [1, 1, 4, 4]) + L([7, 19], [7, 21]) + L([17, 19], [17, 21]) + 'M5 11L5 6' + arcC([8, 6], 3, 180, 360) }));
// a column up the left, hooked into a dome head; drops on the 4 pitch, rows 2 apart
def('shower-head', () => ({ s: 'M4 22L4 7' + arcC([9, 7], 5, 180, 360) + 'M8 13' + arcC([14, 13], 6, 180, 360) + 'Z', fl: [[10, 17], [14, 17], [18, 17], [12, 21], [16, 21]].map(([x, y]) => disc(x, y, 1)).join('') }));
// over a rail, one band across near the hem
def('towel', () => ({ s: L([2, 3], [22, 3]) + open([[5, 3], [5, 18], [19, 18], [19, 3]], [2, 2]) + L([5, 14], [19, 14]) + [8, 12, 16].map((x) => L([x, 18], [x, 21])).join('') }));
// barrel and motor as one outline (barrel 8 tall into a motor of r=6), a vent ring r=2 inside the motor,
// a grip raked 15 degrees back, hung from the motor's underside; grip length solved to paint y = 23
def('hair-dryer', () => {
  const C = [16, 8], R = 6, xb = C[0] - Math.sqrt(R * R - 16), a = deg([xb - C[0], 4]);
  const body = 'M' + pt([xb, 4]) + 'L4 4' + arcC([4, 6], 2, 270, 180) + 'L2 10' + arcC([4, 10], 2, 180, 90) + 'L' + pt([xb, 12]) + arcC(C, R, a, -a);
  const d = [Math.sin(15 * D), Math.cos(15 * D)], nn = [d[1], -d[0]], A0 = [15, 8];
  const hit = (q) => { const fx = q[0] - C[0], fy = q[1] - C[1], b = fx * d[0] + fy * d[1], c = fx * fx + fy * fy - R * R; const t = -b + Math.sqrt(b * b - c); return [q[0] + d[0] * t, q[1] + d[1] * t]; };
  const grip = (len) => { const l0 = hit([A0[0] - 2 * nn[0], A0[1] - 2 * nn[1]]), r0 = hit([A0[0] + 2 * nn[0], A0[1] + 2 * nn[1]]); const l1 = [l0[0] + d[0] * len, l0[1] + d[1] * len], r1 = [l1[0] + 4 * nn[0], l1[1] + 4 * nn[1]]; return open([l0, l1, r1, r0], [2, 2]); };
  const len = solve(4, 12, (v) => ink(grip(v))[3] - 23);
  return { s: body + 'Z' + ring(C[0], C[1], 2) + grip(len) };
});
// shampoo pump: head bar, stem, collar, body r=3 (bottle's 22 height)
def('bottle-pump', () => ({ s: L([9, 2], [17, 2]) + L([12, 2], [12, 7]) + open([[10, 11], [10, 7], [14, 7], [14, 11]], [0.5, 0.5]) + rr(6, 11, 18, 22, 3) }));
// trigger sprayer: a wedge head with its nozzle forward, neck, body
def('spray-bottle', () => ({ s: closed([[5, 2], [16, 2], [16, 7], [10, 7], [5, 5]], [1, 1.5, 0, 1, 1]) + L([10, 7], [10, 11]) + L([16, 7], [16, 11]) + rr(7, 11, 19, 22, 3) }));
// spoon and fork side by side: an elliptic bowl 6 x 9; the fork's outer tines one U of r=4 with the
// middle tine carrying on as its handle (crossed fork and knife was tried: in 24 the fork's head and the
// knife's blade overlap and the knockout ate the blade; fork and knife side by side is the other set's)
def('utensils', () => {
  const K = 0.5523, ex = (cx, cy, rx, ry) => `M${pt([cx + rx, cy])}C${pt([cx + rx, cy + K * ry])} ${pt([cx + K * rx, cy + ry])} ${pt([cx, cy + ry])}C${pt([cx - K * rx, cy + ry])} ${pt([cx - rx, cy + K * ry])} ${pt([cx - rx, cy])}C${pt([cx - rx, cy - K * ry])} ${pt([cx - K * rx, cy - ry])} ${pt([cx, cy - ry])}C${pt([cx + K * rx, cy - ry])} ${pt([cx + rx, cy - K * ry])} ${pt([cx + rx, cy])}Z`;
  return { s: ex(6, 6.5, 3, 4.5) + L([6, 11], [6, 22]) + 'M13 2L13 8' + arcC([17, 8], 4, 180, 0) + 'L21 2' + L([17, 2], [17, 22]) };
});
def('cooking-pot', () => ({ s: L([2, 11], [22, 11]) + open([[4, 11], [4, 21], [20, 21], [20, 11]], [3, 3]) + arc([12, 11], 6, 180, 360) + L([12, 5], [12, 3]) + L([4, 15], [2, 15]) + L([20, 15], [22, 15]) }));
def('refrigerator', () => ({ s: rr(5, 2, 19, 22, 3) + L([5, 11], [19, 11]) + L([9, 6], [9, 7]) + L([9, 15], [9, 18]) }));
def('microwave', () => ({ s: rr(2, 4, 22, 20, 3) + rr(6, 8, 14, 16, 2), fl: [8, 12, 16].map((y) => disc(18, y, 1)).join('') }));
def('oven', () => ({ s: rr(3, 2, 21, 22, 3) + L([3, 10], [21, 10]) + rr(7, 14, 17, 18, 1), fl: [8, 12, 16].map((x) => disc(x, 6, 1)).join('') }));
// body r=3, a basket handle landing on the body's straight top run, spout off the wall
def('kettle', () => ({ s: rr(7, 9, 21, 21, 3) + open([[10, 9], [10, 3], [18, 3], [18, 9]], [3, 3]) + L([7, 15], [3, 11]) }));
def('toaster', () => ({ s: rr(2, 10, 22, 20, 3) + open([[5, 10], [5, 4], [10, 4], [10, 10]], [2, 2]) + open([[14, 10], [14, 4], [19, 4], [19, 10]], [2, 2]) }));
// drip machine: head, back column, foot, a carafe in the bay
def('coffee-maker', () => ({ s: rr(4, 2, 20, 7, 1.5) + L([18, 7], [18, 22]) + L([4, 22], [20, 22]) + closed([[6, 11], [12, 11], [14, 18], [4, 18]], [1, 1, 2, 2]) }));
// bowl r=6 under square shoulders, the wine's level where the curve starts
def('wine-glass', () => ({ s: 'M6 6L6 3' + arcC([7, 3], 1, 180, 270) + 'L17 2' + arcC([17, 3], 1, 270, 360) + 'L18 6' + arcC([12, 6], 6, 0, 180) + 'Z' + L([6, 6], [18, 6]) + L([12, 12], [12, 22]) + L([8, 22], [16, 22]) }));
def('martini', () => {
  const tri = (w) => closed([[12 - w, 2], [12 + w, 2], [12, 12]], [1, 1, 1]);
  const w = solve(8, 11, (v) => ink(tri(v))[0] - 2);
  const f = fillet([12 + w, 2], [12, 12], [12 - w, 2], 1), bot = [12, f.F[1] + 1];
  const y = 5, xl = crossX([12 - w, 2], [12, 12], y), xr = 24 - xl;
  return { s: tri(w) + L([xl, y], [xr, y]) + L(bot, [12, 22]) + L([8, 22], [16, 22]) };
});

// --------------------------------------------------------- room and laundry
def('washing-machine', () => ({ s: rr(3, 2, 21, 22, 3) + ring(12, 14, 4) + L([15, 6], [17, 6]), fl: disc(7, 6, 1) + disc(11, 6, 1) }));
// soleplate flat, nose solved so the r=1 tip paints x = 1; handle a loop on the body's top run
def('iron', () => {
  const body = (tx) => closed([[tx, 18], [22, 18], [22, 11], [10, 11]], [1, 1, 1, 3]);
  const tx = solve(-2, 4, (v) => ink(body(v))[0] - 1);
  return { s: body(tx) + open([[19, 11], [19, 6], [12, 6], [12, 11]], [2, 2]) };
});
// a question-mark hook into the apex; triangle solved to paint 1..23
def('hanger', () => {
  const tri = (w) => closed([[12, 13], [12 + w, 19], [12 - w, 19]], [1, 1, 1]);
  const w = solve(8, 16, (v) => ink(tri(v))[2] - 23);
  const f = fillet([12 - w, 19], [12, 13], [12 + w, 19], 1);
  return { s: arc([12, 7], 2, 180, 450) + L([12, 9], [12, f.F[1] - 1]) + tri(w) };
});
def('crib', () => ({ s: L([3, 3], [3, 21]) + L([21, 3], [21, 21]) + L([3, 6], [21, 6]) + L([3, 17], [21, 17]) + [7.5, 12, 16.5].map((x) => L([x, 6], [x, 17])).join('') }));
// a task lamp: a dome base, the lower arm up to the elbow, the upper arm running on into a cone shade
// aimed down-left, so the arm meets the shade square to its back edge; cone length solved for width 20
def('lamp-desk', () => {
  const a = [-Math.SQRT1_2, Math.SQRT1_2], nn = [Math.SQRT1_2, Math.SQRT1_2];
  let ey = 3;
  const draw = (Lc, dx) => {
    const E = [13 + dx, ey], J = [E[0] + a[0] * 4, E[1] + a[1] * 4], W = [J[0] + a[0] * Lc, J[1] + a[1] * Lc];
    const q = (P, k) => [P[0] + nn[0] * k, P[1] + nn[1] * k];
    const shade = closed([q(J, -1.5), q(J, 1.5), q(W, 5), q(W, -5)], [1, 1, 1, 1]);
    return `M${pt([13 + dx, 21])}L${pt([21 + dx, 21])}` + arcC([17 + dx, 21], 4, 0, -180) + open([[17 + dx, 17], E, J], [1.5]) + shade;
  };
  let Lc = 6;
  for (let i = 0; i < 6; i++) { ey = solve(1, 4, (v) => { ey = v; return ink(draw(Lc, 0))[1] - 2; }); Lc = solve(4, 9, (v) => { const b = ink(draw(v, 0)); return b[2] - b[0] - 20; }); }
  const b = ink(draw(Lc, 0));
  return { s: draw(Lc, 2 - b[0]) };
});
def('air-conditioner', () => ({ s: rr(2, 3, 22, 13, 3) + L([2, 9], [22, 9]) + L([8, 17], [7, 21]) + L([12, 17], [12, 21]) + L([16, 17], [17, 21]) }));
// radiator: three fins on the 8 pitch, joined top and bottom, two feet
def('heater', () => ({ s: rr(2, 3, 6, 19, 2) + rr(10, 3, 14, 19, 2) + rr(18, 3, 22, 19, 2) + L([6, 7], [10, 7]) + L([14, 7], [18, 7]) + L([6, 15], [10, 15]) + L([14, 15], [18, 15]) + L([4, 19], [4, 21]) + L([20, 19], [20, 21]) }));
// a square door on feet, a spoked wheel handle: ring r=4, hub mark, four spokes running out to r=7
def('safe', () => { const c = [12, 11], sp = (a) => L(P(c, 7, a), P(c, 7, a + 180)); return { s: rr(2, 2, 22, 20, 3) + L([6, 20], [6, 22]) + L([18, 20], [18, 22]) + ring(12, 11, 4) + sp(45) + sp(135), fl: disc(12, 11, 1) }; });
def('elevator', () => ({ s: rr(2, 2, 22, 22, 3) + closed([[12, 5.5], [16, 10], [8, 10]], [1, 1, 1]) + closed([[8, 14], [16, 14], [12, 18.5]], [1, 1, 1]) }));
def('stairs', () => ({ s: open([[2, 20], [6, 20], [6, 16], [10, 16], [10, 12], [14, 12], [14, 8], [18, 8], [18, 4], [22, 4]], [1, 1, 1, 1, 1, 1, 1, 1]) }));
// seated figure, the wheel centred on the hip and knocked out 2 clear wherever the body crosses it
def('wheelchair', () => {
  const body = [[9, 9], [9, 15], [16, 15], [18, 21], [21, 21]], arm = [[9, 11], [13, 11]];
  const segs = [...body.slice(1).map((p, i) => [body[i], p]), arm];
  const wheel = cutWhere(ring(9, 15, 6), (p) => segs.some(([a, b]) => segDist(p, a, b) < 4 - 1e-9), 2);
  return { s: open(body, [1, 1, 1]) + L(...arm) + wheel, fl: disc(10, 4, 2) };
});
// a charging post: body r=3 carrying battery-charging's bolt, a cable out low on the right
// rising to a plug head holstered at the top, one pin
def('ev-charger', () => ({ s: rr(2, 2, 14, 22, 3) + 'M9 8L6 12L10 12L7 16' + 'M14 17L18 17' + arcC([18, 15], 2, 90, 0) + 'L20 10' + rr(18, 5, 22, 10, 1.5) + L([20, 5], [20, 3]) }));
def('smoke-detector', () => ({ s: L([2, 3], [22, 3]) + arc([12, 3], 7, 0, 180) + [5, 11, 17].map((x) => steam(x, 14, 7)).join('') }));
def('lockbox', () => ({ s: 'M8 9L8 6' + arcC([12, 6], 4, 180, 360) + 'L16 9' + rr(4, 9, 20, 22, 3), fl: [[10, 13.5], [14, 13.5], [10, 17.5], [14, 17.5]].map(([x, y]) => disc(x, y, 1)).join('') }));
def('gate', () => {
  const sg = 4, R = (81 + sg * sg) / (2 * sg), C = [12, 5 + R];
  const yAt = (x) => C[1] - Math.sqrt(R * R - (x - 12) ** 2);
  const a0 = deg([3 - 12, 9 - C[1]]), a1 = deg([21 - 12, 9 - C[1]]);
  return { s: L([3, 2], [3, 22]) + L([21, 2], [21, 22]) + arc(C, R, a0, a1) + L([3, 19], [21, 19]) + [7.5, 12, 16.5].map((x) => L([x, yAt(x)], [x, 19])).join('') };
});
def('stroller', () => ({ s: closed([[3, 9], [19, 9], [19, 14], [3, 14]], [0, 0, 4, 4]) + 'M3 9' + arcC([10, 9], 7, 180, 270) + 'L10 9' + open([[19, 9], [20, 4], [21, 4]], [1]) + ring(7, 20, 2) + ring(15, 20, 2) }));

// ------------------------------------------------------------------- leisure
def('pool', () => ({ s: 'M8 14L8 4' + arcC([6, 4], 2, 0, -180) + 'M16 14L16 4' + arcC([14, 4], 2, 0, -180) + L([8, 8], [16, 8]) + L([8, 12], [16, 12]) + wave(2, 22, 20, 2, 4) }));
def('hot-tub', () => ({ s: L([2, 11], [22, 11]) + open([[3, 11], [3, 21], [21, 21], [21, 11]], [4, 4]) + [5, 11, 17].map((x) => steam(x, 3)).join('') }));
def('tent', () => {
  const t = (ay) => open([[3, 20], [12, ay], [21, 20]], [1]);
  const ay = solve(0, 6, (v) => ink(t(v))[1] - 3);
  return { s: L([2, 20], [22, 20]) + t(ay) + open([[8, 20], [12, 13], [16, 20]], [1]) };
});
def('caravan', () => ({ s: open([[5, 18], [2, 18], [2, 4], [20, 4], [20, 18], [17, 18]], [2, 3, 3, 2]) + ring(11, 18, 2) + rr(6, 8, 15, 12, 1.5) + L([20, 14], [22, 14]) }));
def('sailboat', () => {
  const hull = (w) => closed([[12 - w, 17], [12 + w, 17], [19, 22], [5, 22]], [1, 1, 2, 2]);
  const w = solve(9, 12, (v) => ink(hull(v))[0] - 1);
  return { s: L([12, 2], [12, 17]) + closed([[12, 2], [20, 13], [12, 13]], [0, 1, 0]) + closed([[12, 6], [12, 13], [5, 13]], [0, 0, 1]) + hull(w) };
});
// a skier leaning into the run: head, torso, bent legs, one arm forward, the skis' line
def('ski', () => { const yS = (x) => 17 + ((x - 3) * 4) / 18; return { s: open([[13, 9], [9, 13], [14, 16], [11, yS(11)]], [1, 1]) + L([12, 10], [16, 12]) + L([3, 17], [21, 21]), fl: disc(15, 4, 2) }; });
// a lens with filleted tips along the free diagonal, a band across near the nose
def('surfboard', () => {
  const lens = (a, s) => {
    const R = (a * a + s * s) / (2 * s), r = 1, xf = Math.sqrt((R - r) ** 2 - (R - s) ** 2);
    const C1 = [0, R - s], C2 = [0, -(R - s)];        // C1 below (bulge up), C2 above (bulge down)
    const T = (C, F) => [C[0] + ((F[0] - C[0]) * R) / (R - r), C[1] + ((F[1] - C[1]) * R) / (R - r)];
    const Fr = [xf, 0], Fl = [-xf, 0];
    const tUR = T(C1, Fr), tLR = T(C2, Fr), tUL = T(C1, Fl), tLL = T(C2, Fl);
    const ang = (c, p) => deg([p[0] - c[0], p[1] - c[1]]);
    const segs = [
      { c: C1, r: R, a0: ang(C1, tUL), a1: ang(C1, tUR) },
      { c: Fr, r, a0: ang(Fr, tUR), a1: ang(Fr, tLR) },
      { c: C2, r: R, a0: ang(C2, tLR), a1: ang(C2, tLL) },
      { c: Fl, r, a0: ang(Fl, tLL), a1: ang(Fl, tUL) + 360 },
    ];
    return { R, segs };
  };
  const place = (a, s) => {
    const { R, segs } = lens(a, s), rot = -45 * D;
    const X = ([x, y]) => [12 + x * Math.cos(rot) - y * Math.sin(rot), 12 + x * Math.sin(rot) + y * Math.cos(rot)];
    let d = '';
    for (const g of segs) { let a1 = g.a1; if (g.c === segs[0].c && a1 < g.a0) a1 += 360; if (g.c === segs[2].c && a1 < g.a0) a1 += 360; const parts = arcTo(g.c, g.r, g.a0, a1); if (!d) d = `M${pt(X(P(g.c, g.r, g.a0)))}`; for (const p of parts) d += `C${pt(X(p.c1))} ${pt(X(p.c2))} ${pt(X(p.p))}`; }
    const x0 = a * 0.45, h = Math.sqrt(R * R - x0 * x0) - (R - s);
    return d + 'Z' + L(X([x0, -h]), X([x0, h]));
  };
  const s = 3.5, a = solve(8, 18, (v) => ink(place(v, s))[0] - 2);
  return { s: place(a, s) };
});
def('ferris-wheel', () => {
  const C = [12, 10], leg = (sg) => L(C, [12 + sg * (11 / Math.tan(60 * D)), 21]);
  return { s: ring(12, 10, 7) + leg(1) + leg(-1) + L([3, 21], [21, 21]), fl: disc(12, 10, 1.5) + [0, 60, 120, 180, 240, 300].map((a) => { const p = P(C, 7, a); return disc(p[0], p[1], 1.5); }).join('') };
});
def('suitcase', () => ({ s: rr(5, 6, 19, 22, 3) + open([[9, 6], [9, 2], [15, 2], [15, 6]], [1, 1]) + L([9, 6], [9, 22]) + L([15, 6], [15, 22]) }));
// upright case, its ribs carrying on up as the telescopic handle; two wheels seated in the bottom edge
def('suitcase-rolling', () => ({ s: rr(4, 8, 20, 20, 3) + open([[10, 8], [10, 2], [14, 2], [14, 8]], [1, 1]) + L([10, 8], [10, 20]) + L([14, 8], [14, 20]), fl: disc(5.5, 21.5, 1.5) + disc(18.5, 21.5, 1.5) }));
// dome r=7 on a rim band, a plunger with a bead (r=8 over a slab with a T was the other set's, 84%)
def('concierge-bell', () => ({ s: rr(3, 15, 21, 20, 2) + arc([12, 15], 7, 180, 360) + L([12, 8], [12, 5]), fl: disc(12, 4, 1) }));
def('passport', () => ({ s: rr(4, 2, 20, 22, 3) + ring(12, 10, 4) + L([8, 10], [16, 10]) + L([9, 18], [15, 18]) }));
def('grill', () => { const a = P([12, 12], 8, 120), b = P([12, 12], 8, 60); return { s: ring(12, 12, 8) + L([2, 12], [22, 12]) + L(a, [6, 22]) + L(b, [18, 22]), fl: disc(12, 2.5, 1.5) }; });
// mantel, two jambs, hearth; a flame on droplet's construction, apex leaning right
def('fireplace', () => {
  const C = [12, 14], R = 3, A = [12.5, 7.5];
  const d = Math.hypot(A[0] - C[0], A[1] - C[1]), base = deg([A[0] - C[0], A[1] - C[1]]), h = Math.acos(R / d) / D;
  const t1 = base + h, t2 = base - h;                    // tangent points either side of the apex
  const k = corner(P(C, R, t2), A, P(C, R, t1), 1);
  const flame = `M${pt(P(C, R, t1))}` + arcC(C, R, t1, t2 + 360) + `L${pt(k.T1)}` + k.arcs + 'Z';
  return { s: L([2, 3], [22, 3]) + L([5, 3], [5, 21]) + L([19, 3], [19, 21]) + L([2, 21], [22, 21]) + flame };
});
// two black keys painted solid by their own stroke, hung from the top rail
def('piano', () => ({ s: rr(2, 4, 22, 20, 3) + L([12, 4], [12, 20]) + rr(6, 4, 8, 11, 1) + rr(16, 4, 18, 11, 1) + L([7, 11], [7, 20]) + L([17, 11], [17, 20]) }));
def('cigarette', () => ({ s: rr(2, 14, 22, 18, 1) + L([8, 14], [8, 18]) + steam(14, 6) + steam(20, 6) }));
def('cigarette-off', () => ({ s: off(ICONS.cigarette().s) }));

// -------------------------------------------------------------------- places
def('castle', () => ({ s: closed([[2, 21], [2, 3], [6, 3], [6, 6], [10, 6], [10, 3], [14, 3], [14, 6], [18, 6], [18, 3], [22, 3], [22, 21]], [1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1]) + 'M10 21L10 16' + arcC([12, 16], 2, 180, 360) + 'L14 21' }));
// a post mill: spars on an X about the hub, a post down to the body, which clears the lower tips by 2
def('windmill', () => {
  const H = [12, 7], tips = [[7, 2], [17, 2], [7, 12], [17, 12]];
  const body = (w) => closed([[10, 15], [14, 15], [12 + w, 22], [12 - w, 22]], [1, 1, 1, 1]);
  const w = solve(4, 8, (v) => ink(body(v))[0] - 5);
  return { s: L(tips[0], tips[3]) + L(tips[1], tips[2]) + L(H, [12, 15]) + body(w), fl: disc(12, 7, 1.5) };
});
// pointed roof over the lantern, a gallery 2 wider each side, a tapered tower with two bands,
// and a beam either side drawn as a wedge of light opening outward
def('lighthouse', () => {
  const roof = (ay) => closed([[9, 5], [12, ay], [15, 5]], [0, 1, 0]);
  const ay = solve(-1, 3, (v) => ink(roof(v))[1] - 1);
  const wx = (y) => 9 - (2 * (y - 9)) / 13, band = (y) => L([wx(y), y], [24 - wx(y), y]);
  return { s: roof(ay) + L([9, 5], [9, 9]) + L([15, 5], [15, 9]) + L([7, 9], [17, 9]) + closed([[9, 9], [15, 9], [17, 22], [7, 22]], [0, 0, 1, 1]) + band(13) + band(17.5) + open([[2, 3.5], [5, 5.5], [2, 7.5]], [1]) + open([[22, 3.5], [19, 5.5], [22, 7.5]], [1]) };
});
def('barn', () => {
  const out = (ay) => closed([[2, 22], [2, 10], [6, 5], [12, ay], [18, 5], [22, 10], [22, 22]], [1, 1, 1, 1, 1, 1, 1]);
  const ay = solve(-1, 3, (v) => ink(out(v))[1] - 1);
  return { s: out(ay) + open([[8, 22], [8, 16], [16, 16], [16, 22]], [0.5, 0.5]) + L([8, 16], [16, 22]) + L([16, 16], [8, 22]) + rr(10, 8, 14, 12, 1) };
});
def('cactus', () => ({ s: arc([12, 4], 2, 180, 360) + L([10, 4], [10, 11]) + L([10, 15], [10, 22]) + L([14, 4], [14, 9]) + L([14, 13], [14, 22]) + 'M10 15L5 15' + arcC([5, 12], 3, 90, 180) + 'L2 9' + arcC([4, 9], 2, 180, 360) + 'L6 10' + arcC([7, 10], 1, 180, 90) + 'L10 11' + 'M14 13L19 13' + arcC([19, 10], 3, 90, 0) + 'L22 6' + arcC([20, 6], 2, 0, -180) + 'L18 8' + arcC([17, 8], 1, 0, 90) + 'L14 9' + L([5, 22], [19, 22]) }));
def('igloo', () => { const x = Math.sqrt(100 - 49); return { s: arc([12, 17], 10, 180, 360) + L([2, 17], [22, 17]) + L([12 - x, 10], [12 + x, 10]) + L([12, 7], [12, 10]) + arc([12, 17], 3, 180, 360) }; });

export { ICONS, open, closed, corner, rr, arc, arcC, ring, disc, L, P, solve, off, pt, D, deg, svg, cutWhere, segDist, wave, steam };
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const svg = ({ s, fl = '' }) => HEAD + `<path d="${s}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n` + (fl ? `<path d="${fl}" fill="black"/>\n` : '') + '</svg>\n';

if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = process.argv[2], only = process.argv.slice(3);
  const bad = [];
  for (const [name, g] of Object.entries(ICONS)) {
    if (only.length && !only.includes(name)) continue;
    const o = g();
    const b = ink(o.s);
    const fb = o.fl ? (() => { const q = strokedBBox(o.fl, 0, 'round'); return Array.isArray(q) ? q : [q.x0, q.y0, q.x1, q.y1]; })() : null;
    const box = fb ? [Math.min(b[0], fb[0]), Math.min(b[1], fb[1]), Math.max(b[2], fb[2]), Math.max(b[3], fb[3])] : b;
    const pads = [box[0], box[1], 24 - box[2], 24 - box[3]].map((v) => Math.round(v * 1000) / 1000);
    const whole = pads.every((v) => Math.abs(v - Math.round(v)) < 0.002), centred = Math.abs(pads[0] - pads[2]) < 0.002 && Math.abs(pads[1] - pads[3]) < 0.002;
    if (!whole || !centred) bad.push(`${name}: pads ${pads.join(' / ')}`);
    mkdirSync(`${dir}/raw/${name}`, { recursive: true });
    writeFileSync(`${dir}/raw/${name}/Container=regular, Style=stroke, Corners=regular.svg`, svg(o));
  }
  console.log(`${Object.keys(ICONS).length} defined`);
  console.log(bad.length ? bad.join('\n') : 'all boxes whole and centred');
}
