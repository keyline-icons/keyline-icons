// The five moving objects of 1.3.0, all four styles in both corners, 27 Sep 2026.
//
// Both are the drafts he picked off the exploration sheet (the star with three
// trails, the truck with two), carried into the other styles the way their
// bases and rocket-2 already carry them:
//
//   star-shooting  the house star (inner 0.45, every corner r=0.5) at tip radius
//                  7, turned 9 degrees so a leg trails down the diagonal; three
//                  trails on x+y = 18, 24, 30. Styles follow `star` for the star
//                  and `rocket-2` for the trails: two-tone = star plate under the
//                  whole drawing; duotone = grey star, black trails; fill = solid
//                  star, trails stroked. Sharp keeps the star's tip fillets (as
//                  sharp `star` does), drops the inner ones, and gives each trail
//                  end a 0.414 stub (45 degrees).
//   truck-fast     `truck` with its back wall opened: the roof runs out to the
//                  back edge as the top trail, trails at y 8 and 12 step in by 3,
//                  the bumper corner kept. Plate = the truck's silhouette with the
//                  top-left corner turned on the roof's cap; duotone = grey body,
//                  black wheels, black trails (the roof trail as its straight run);
//                  fill = the cargo box solid with the two trails knocked out as
//                  slots through the back, the rest stroked as `truck`'s fill.
//
//   send-fast      `send` rebuilt about its nose at 0.81 (radii kept), the star's trails moved
//                  out to send's 1..23 box; duotone greys the upper wing, fill cuts the crease
//                  wedge straight into the outline (one contour, no seam)
//   bike-fast      `bike` untouched plus the truck's pair of trails behind the rider
//   timer-fast     `timer` with its ring opened on the left for two trails; duotone trails
//                  cut flush along the disc, fill cuts them as slots
//
//   node tools/motion/build.mjs [--out=<dir>]     writes raw/<name>/ for all five (default: this checkout)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { Path, polyPath, fillet, add, sub, mul, len, unit, dot, pt, n, R2, rad, deg, ink, gap, bisect, seg, fmt } from './lib.mjs';

const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? join(import.meta.dirname, '..', '..');
const { writeSet } = await import('../v5/raw.mjs');
const rawOf = (name, style, corners, i = 0) =>
  [...readFileSync(join(import.meta.dirname, '..', '..', 'raw', name, `Container=regular, Style=${style}, Corners=${corners}.svg`), 'utf8').matchAll(/ d="([^"]+)"/g)][i][1];

const assert = (ok, msg) => { if (!ok) throw new Error(msg); };
const near = (a, b, tol = 1e-3) => Math.abs(a - b) <= tol;

/* ============================================================ star-shooting */

// frame: t along the travel (toward the top right), s across
const X = (t, s) => [12 + (t + s) / R2, 12 + (-t + s) / R2];

function starPoly(C, Rv, rot, ratio = 0.45) {
  const pts = [];
  for (let k = 0; k < 5; k++) {
    const a1 = rad(rot - 90 + 72 * k), a2 = rad(rot - 90 + 36 + 72 * k);
    pts.push([C[0] + Rv * Math.cos(a1), C[1] + Rv * Math.sin(a1)]);
    pts.push([C[0] + ratio * Rv * Math.cos(a2), C[1] + ratio * Rv * Math.sin(a2)]);
  }
  return pts; // even index = tip, odd = inner vertex
}
const R_TIP = 0.5, R_IN = 0.5;
/**
 * The closed star with each fillet emitted as a true arc split at every
 * multiple of 90 degrees it spans (the grid rule: a cubic only passes NEAR a
 * mid-piece extreme). One cubic across a 135-degree tip sagged 0.0017 inside
 * its own plate, which lint reads as an overlap.
 */
function starStroke(pts, sharp) {
  const N = pts.length, radii = pts.map((_, i) => (i % 2 === 0 ? R_TIP : sharp ? 0 : R_IN));
  const corner = (i) => {
    const r = radii[i];
    if (r <= 1e-9) return { T1: pts[i], T2: pts[i], r: 0 };
    const f = fillet(pts[(i - 1 + N) % N], pts[i], pts[(i + 1) % N], r);
    return { T1: f.T1, T2: f.T2, F: f.F, r };
  };
  const cs = pts.map((_, i) => corner(i));
  const p = new Path().M(cs[0].T2);
  for (let k = 1; k <= N; k++) {
    const c = cs[k % N];
    p.L(c.T1);
    if (c.r) {
      const ang = (q) => deg(Math.atan2(q[1] - c.F[1], q[0] - c.F[0]));
      let a0 = ang(c.T1), a1 = ang(c.T2);
      while (a1 - a0 > 180) a1 -= 360;
      while (a0 - a1 > 180) a1 += 360;
      p.A(c.F, a0, a1, a1 > a0 ? 1 : -1);
    }
  }
  return p.Z().toString();
}

/** The stroke's outer edge: tips an arc of r+1 about the fillet centre, inner vertices where the offset edges cross. */
function starPlate(pts, C) {
  const N = pts.length;
  const normal = (a, b) => { const d = unit(sub(b, a)); let nn = [-d[1], d[0]]; if (dot(nn, sub(mul(add(a, b), 0.5), C)) < 0) nn = mul(nn, -1); return nn; };
  const edges = pts.map((p, i) => { const q = pts[(i + 1) % N]; const nn = normal(p, q); return { a: add(p, nn), b: add(q, nn), nn }; });
  const cross = (e1, e2) => {
    const r = sub(e1.b, e1.a), s = sub(e2.b, e2.a), q = sub(e2.a, e1.a);
    const rxs = r[0] * s[1] - r[1] * s[0];
    const t = (q[0] * s[1] - q[1] * s[0]) / rxs;
    return add(e1.a, mul(r, t));
  };
  // start just after tip 0's arc
  const tipArc = (i) => {
    const V = pts[i], A = pts[(i - 1 + N) % N], B = pts[(i + 1) % N];
    const f = fillet(A, V, B, R_TIP);
    const e0 = edges[(i - 1 + N) % N], e1 = edges[i];
    return { F: f.F, from: add(f.T1, e0.nn), to: add(f.T2, e1.nn) };
  };
  const arc0 = tipArc(0);
  const p = new Path().M(arc0.to);
  for (let i = 1; i <= N; i++) {
    const k = i % N;
    if (k % 2 === 1) p.L(cross(edges[(k - 1 + N) % N], edges[k]));
    else {
      const a = tipArc(k);
      p.L(a.from);
      const ang = (q) => deg(Math.atan2(q[1] - a.F[1], q[0] - a.F[0]));
      let a0 = ang(a.from), a1 = ang(a.to);
      // the short way round the outside of the tip
      while (a1 - a0 > 180) a1 -= 360;
      while (a0 - a1 > 180) a1 += 360;
      p.A(a.F, a0, a1, a1 > a0 ? 1 : -1);
    }
  }
  return p.Z().toString();
}

// the star's centre, solved on the diagonal so its ink top (and so its right) lands on 2 and 22
const RV = 7, ROT = 9;
const tc = bisect((t) => ink(starStroke(starPoly(X(t, 0), RV, ROT), false))[1] - 2, -5, 10);
const SC = X(tc, 0);
const SP = starPoly(SC, RV, ROT);

const TRAILS = [[[3, 21], [7.5, 16.5]], [[3, 15], [6.5, 11.5]], [[9, 21], [12.5, 17.5]]];
const trailsD = (sharp) => TRAILS.map(([a, b]) => {
  if (!sharp) return seg(a, b);
  const u = unit(sub(b, a)), k = R2 - 1; // (1 - sin 45) / cos 45
  return seg(sub(a, mul(u, k)), add(b, mul(u, k)));
}).join('');

const star = {};
for (const corners of ['regular', 'sharp']) {
  const sharp = corners === 'sharp';
  const body = starStroke(SP, sharp);
  const plate = starPlate(SP, SC);
  const trails = trailsD(sharp);
  star[`stroke.${corners}`] = [{ kind: 'stroke', d: body + trails }];
  star[`two-tone.${corners}`] = [{ kind: 'plate', d: plate }, { kind: 'stroke', d: body + trails }];
  star[`duotone.${corners}`] = [{ kind: 'plate', d: plate }, { kind: 'stroke', d: trails }];
  star[`fill.${corners}`] = [{ kind: 'solid', d: plate }, { kind: 'stroke', d: trails }];
}

/* =============================================================== truck-fast */

const W = 'M9 18C9 19.1046 8.1046 20 7 20C5.8954 20 5 19.1046 5 18C5 16.8954 5.8954 16 7 16C8.1046 16 9 16.8954 9 18ZM19 18C19 19.1046 18.1046 20 17 20C15.8954 20 15 19.1046 15 18C15 16.8954 15.8954 16 17 16C18.1046 16 19 16.8954 19 18Z';
const lift = (d, from, to) => { assert(d.includes(from), `raw/truck has moved: ${from.slice(0, 40)}`); return d.replace(from, to); };

// rounded: the head of truck's stroke replaced, the tail carried verbatim
const tStroke = rawOf('truck', 'stroke', 'regular');
assert(tStroke.endsWith(W), 'truck wheels moved');
const HEAD_R = 'M14 18V7C14 5.34315 12.6569 4 11 4H5C3.34315 4 2 5.34315 2 7V17C2 17.5523 2.44772 18 3 18H4';
const ROOF_R = 'M14 18L14 7C14 5.34315 12.6569 4 11 4L2 4';
const TRAILS_R = 'M2 8L8 8M2 12L5 12';
const BUMPER_R = 'M2 16L2 17C2 17.5523 2.44772 18 3 18L4 18';
const REST_R = 'M10 18L14 18M20 18L21 18C21.5523 18 22 17.5523 22 17L22 13C22 12.4696 21.7893 11.9609 21.4142 11.5858L18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8L14 8';
assert(lift(tStroke, HEAD_R, '') === 'M10 18H14M20 18H21C21.5523 18 22 17.5523 22 17V13C22 12.4696 21.7893 11.9609 21.4142 11.5858L18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8H14' + W, 'truck stroke tail differs');

// sharp: truck's sharp stroke, the back wall opened the same way
const tSharp = rawOf('truck', 'stroke', 'sharp');
const HEAD_S = 'M14 18L14 4L2 4L2 18L5 18';
assert(tSharp.startsWith(HEAD_S), 'truck sharp head moved');
const ROOF_S = 'M14 18L14 4L1 4';              // the free end stubbed a full unit on its axis
const TRAILS_S = 'M1 8L9 8M1 12L6 12';
const BUMPER_S = 'M2 15L2 18L5 18';           // free end stubbed up a unit, corner square, end buried in the wheel as truck's
const REST_S = tSharp.slice(HEAD_S.length, tSharp.length - W.length);
assert(REST_S === 'M9 18L14 18M19 18L22 18L22 12.1716L17.8284 8L14 8', 'truck sharp tail differs');

// plates: truck's, with the top-left corner turned on the roof's cap (r=1 about (2, 4))
const PLATE_R = 'M1 4C1 3.44772 1.44772 3 2 3L11 3C13.209139 3 15 4.790861 15 7L16.585787 7C17.11622 7 17.624928 7.210714 18 7.585786L22.414214 12C22.789286 12.375072 23 12.88378 23 13.414213L23 17C23 18.104569 22.104569 19 21 19L3 19C1.895431 19 1 18.104569 1 17L1 4Z';
const PLATE_S = rawOf('truck', 'duotone', 'sharp', 0); // r=1 on every corner, already turned at (2, 4)
assert(PLATE_S.startsWith('M2 3L14 3') && PLATE_S.endsWith('L1 4C1 3.4477 1.4477 3 2 3Z'), 'truck sharp plate moved');
const DUO_TRAILS_R = 'M2 4L11 4M2 8L8 8M2 12L5 12';   // the roof trail is its straight run
const DUO_TRAILS_S = 'M1 4L12 4M1 8L9 8M1 12L6 12';

// fill: the cargo box region, its back at the ink edge x=1, the two trails knocked
// out as slots running out through it; the rest stroked on top as truck's fill
const halfTurn = (p, c, to) => {       // a semicircle about c from the current point to `to`, round the far side
  const a0 = deg(Math.atan2(p.cur[1] - c[1], p.cur[0] - c[0]));
  const a1 = deg(Math.atan2(to[1] - c[1], to[0] - c[0]));
  // go through the point on the +x side of c (the slot's closed end)
  const dir = (a0 > 0 ? -1 : 1);
  p.A(c, a0, a1 + (dir > 0 ? (a1 < a0 ? 360 : 0) : (a1 > a0 ? -360 : 0)), dir);
  return p;
};
function fillRegion(sharp) {
  const p = new Path();
  if (!sharp) {
    p.M([9, 18]).C([9, 16.8954], [8.1046, 16], [7, 16]).C([5.8954, 16], [5, 16.8954], [5, 18]).L([3, 18])
      .C([2.44772, 18], [2, 17.5523], [2, 17]).L([2, 16]).L([1, 16]).L([1, 13]).L([5, 13]);
    halfTurn(p, [5, 12], [5, 11]);
    p.L([1, 11]).L([1, 9]).L([8, 9]);
    halfTurn(p, [8, 8], [8, 7]);
    p.L([1, 7]).L([1, 4]).L([11, 4]).C([12.6569, 4], [14, 5.34315], [14, 7]).L([14, 18]).L([9, 18]).Z();
  } else {
    p.M([5, 18]).L([3, 18]).C([2.4477, 18], [2, 17.5523], [2, 17]).L([2, 15]).L([1, 15]).L([1, 13]).L([6, 13]).L([6, 11])
      .L([1, 11]).L([1, 9]).L([9, 9]).L([9, 7]).L([1, 7]).L([1, 4]).L([13, 4]).C([13.5523, 4], [14, 4.4477], [14, 5])
      .L([14, 18]).L([9, 18]).C([9, 16.8954], [8.1046, 16], [7, 16]).C([5.8954, 16], [5, 16.8954], [5, 18]).Z();
  }
  return p.toString();
}

const truck = {};
for (const corners of ['regular', 'sharp']) {
  const s = corners === 'sharp';
  const roof = s ? ROOF_S : ROOF_R, trails = s ? TRAILS_S : TRAILS_R, bumper = s ? BUMPER_S : BUMPER_R, rest = s ? REST_S : REST_R;
  const stroke = roof + trails + bumper + rest + W;
  const plate = s ? PLATE_S : PLATE_R;
  truck[`stroke.${corners}`] = [{ kind: 'stroke', d: stroke }];
  truck[`two-tone.${corners}`] = [{ kind: 'plate', d: plate }, { kind: 'stroke', d: stroke }];
  truck[`duotone.${corners}`] = [{ kind: 'plate', d: plate }, { kind: 'stroke', d: (s ? DUO_TRAILS_S : DUO_TRAILS_R) + W }];
  truck[`fill.${corners}`] = [{ kind: 'solid', d: fillRegion(s) }, { kind: 'stroke', d: roof + bumper + rest + W }];
}

/* ================================================================== checks */

export { star, truck };

/* ================================================== shared polygon helpers */

const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];
const signedArea = (pts) => pts.reduce((acc, p, i) => { const q = pts[(i + 1) % pts.length]; return acc + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const lineX = (a1, b1, a2, b2) => {
  const r = sub(b1, a1), q = sub(b2, a2), w = sub(a2, a1);
  const t = cross2(w, q) / cross2(r, q);
  return add(a1, mul(r, t));
};
/** An arc about F from `from` to `to`, the short way, split on the cardinals by Path.A. */
function arcShort(p, F, from, to) {
  const ang = (q) => deg(Math.atan2(q[1] - F[1], q[0] - F[0]));
  let a0 = ang(from), a1 = ang(to);
  while (a1 - a0 > 180) a1 -= 360;
  while (a0 - a1 > 180) a1 += 360;
  if (Math.abs(a1 - a0) > 1e-9) p.A(F, a0, a1, a1 > a0 ? 1 : -1);
  return p;
}
/** A closed polygon, each fillet a true arc (convex or concave), r=0 a true point. */
function roundedPoly(pts, radii) {
  const N = pts.length;
  const cs = pts.map((V, i) => {
    const r = radii[i] || 0;
    if (!r) return { T1: V, T2: V, r: 0 };
    const f = fillet(pts[(i - 1 + N) % N], V, pts[(i + 1) % N], r);
    return { T1: f.T1, T2: f.T2, F: f.F, r };
  });
  const p = new Path().M(cs[0].T2);
  for (let k = 1; k <= N; k++) { const c = cs[k % N]; p.L(c.T1); if (c.r) arcShort(p, c.F, c.T1, c.T2); }
  return p.Z().toString();
}
/**
 * The stroke's outer edge, one unit out: a convex corner is an arc of r+1 about
 * its fillet centre (about the vertex itself when r=0, the round join); a concave
 * one an arc of r-1 when r > 1, else the offset edges' crossing.
 */
function outerOffset(pts, radii) {
  const N = pts.length, o = Math.sign(signedArea(pts));
  const E = pts.map((a, i) => {
    const b = pts[(i + 1) % N], d = unit(sub(b, a));
    const nn = o > 0 ? [d[1], -d[0]] : [-d[1], d[0]];
    return { a: add(a, nn), b: add(b, nn), nn };
  });
  const V = pts.map((P, i) => {
    const prev = pts[(i - 1 + N) % N], next = pts[(i + 1) % N], r = radii[i] || 0;
    const ein = E[(i - 1 + N) % N], eout = E[i];
    const convex = Math.sign(cross2(sub(P, prev), sub(next, P))) === o;
    if (convex) {
      if (!r) return { kind: 'arc', F: P, R: 1, from: add(P, ein.nn), to: add(P, eout.nn) };
      const f = fillet(prev, P, next, r);
      return { kind: 'arc', F: f.F, R: r + 1, from: add(f.T1, ein.nn), to: add(f.T2, eout.nn) };
    }
    if (r > 1) { const f = fillet(prev, P, next, r); return { kind: 'arc', F: f.F, R: r - 1, from: add(f.T1, ein.nn), to: add(f.T2, eout.nn) }; }
    return { kind: 'pt', p: lineX(ein.a, ein.b, eout.a, eout.b) };
  });
  const p = new Path().M(V[0].kind === 'arc' ? V[0].to : V[0].p);
  for (let k = 1; k <= N; k++) {
    const v = V[k % N];
    if (v.kind === 'pt') p.L(v.p); else { p.L(v.from); arcShort(p, v.F, v.from, v.to); }
  }
  return { d: p.Z().toString(), V, E };
}
const windingOf = (pts) => Math.sign(signedArea(pts));

/* ================================================================ send-fast */

// `send`'s own polygon, read off its edges: nose sharp, wing tips r=1, the tail
// notch r=3. Rebuilt about the nose at a smaller size, radii kept, and the crease
// run from the notch's true vertex to the nose as send's is.
const SEND = (() => {
  const A = [[2.7164, 7.7054], [22, 2]], B = [[22, 2], [16.2946, 21.2836]];
  const Cc = [[14.5098, 21.5637], [9.9303, 14.8559]], D = [[9.1441, 14.0697], [2.4363, 9.4902]];
  const N = [22, 2], W1 = lineX(...A, ...D), W2 = lineX(...B, ...Cc), T = lineX(...Cc, ...D);
  const rOf = (V, a, b, tp) => { const al = Math.acos(dot(unit(sub(a, V)), unit(sub(b, V)))); return len(sub(tp, V)) * Math.tan(al / 2); };
  const rW = rOf(W1, N, T, [2.7164, 7.7054]), rT = rOf(T, W1, W2, [9.1441, 14.0697]);
  return { N, W1, W2, T, rW, rT, dirC: unit(sub(Cc[1], Cc[0])), dirD: unit(sub(D[1], D[0])) };
})();
assert(near(SEND.rW, 1, 2e-3) && near(SEND.rT, 3, 2e-3), `send radii read ${SEND.rW}, ${SEND.rT}`);
const RW = 1, RT = 3;
const SEND_TRAILS = [[[2, 22], [6.5, 17.5]], [[2, 16], [5.5, 12.5]], [[8, 22], [11.5, 18.5]]];
const sendTrails = (sharp) => SEND_TRAILS.map(([a, b]) => {
  if (!sharp) return seg(a, b);
  const u = unit(sub(b, a)), k = R2 - 1;
  return seg(sub(a, mul(u, k)), add(b, mul(u, k)));
}).join('');
const scaleAbout = (P, s) => add(SEND.N, mul(sub(P, SEND.N), s));
const planeRounded = (s) => {
  const pts = [SEND.N, scaleAbout(SEND.W2, s), scaleAbout(SEND.T, s), scaleAbout(SEND.W1, s)];
  return { pts, radii: [0, RW, RT, RW], d: roundedPoly(pts, [0, RW, RT, RW]) + seg(pts[2], SEND.N) };
};
// the largest size, to the hundredth, that keeps the trails 2 clear
const S_SEND = Math.floor(bisect((s) => gap(sendTrails(false), planeRounded(s).d) - 2, 0.4, 0.95) * 100) / 100;
function sendVariants(sharp) {
  const R = planeRounded(S_SEND);
  let pts = R.pts, radii = R.radii;
  if (sharp) {
    // wing tips slid back along their leading edges until the true point paints
    // the rounded tip's extreme (send's own sharp rule), trailing edges parallel
    const f1 = fillet(SEND.N, pts[3], pts[2], RW);
    const xTip = f1.F[0] - RW;                               // vertex x whose round join paints the rounded tip's leftmost ink
    const u = unit(sub(pts[3], SEND.N));
    const W1s = add(SEND.N, mul(u, (xTip - SEND.N[0]) / u[0]));
    const W2s = [24 - W1s[1], 24 - W1s[0]];
    const Ts = lineX(W1s, add(W1s, SEND.dirD), W2s, add(W2s, SEND.dirC));
    pts = [SEND.N, W2s, Ts, W1s]; radii = [0, 0, 0, 0];
  }
  const T = pts[2];
  const body = roundedPoly(pts, radii) + seg(T, SEND.N);
  const plate = outerOffset(pts, radii);
  const [vN, vW2, vT] = plate.V;
  // duotone: the lower wing black, split from the plate along the axis (send D2)
  const axisN = add(SEND.N, mul([1, -1], 1 / R2));
  const half = new Path().M(axisN);
  arcShort(half, SEND.N, axisN, vN.to);
  half.L(vW2.from); arcShort(half, vW2.F, vW2.from, vW2.to);
  if (vT.kind === 'arc') { half.L(vT.from); arcShort(half, vT.F, vT.from, add(vT.F, mul(unit(sub(SEND.N, vT.F)), vT.R))); }
  else half.L(vT.p);
  half.L(axisN).Z();
  // fill: the crease as a wedge from half way to the nose, 3 wide where it leaves through the tail
  const apex = mul(add(SEND.N, T), 0.5);
  const onAxisDist = (e, want) => {   // point on offset edge e at signed distance `want` from x+y=24
    const f = (q) => (q[0] + q[1] - 24) / R2;
    const t = (want - f(e.a)) / (f(e.b) - f(e.a));
    return add(e.a, mul(sub(e.b, e.a), t));
  };
  const B2 = onAxisDist(plate.E[1], 1.5), B1 = onAxisDist(plate.E[2], -1.5);
  // One contour, the wedge cut straight into the outline. `send` ships it as a
  // knockout subpath whose base retraces the plate's edge, and that doubled edge
  // renders as a hairline seam at zoom; this is the same shape without it.
  const vW1 = plate.V[3];
  const solid = new Path().M(vN.to).L(vW2.from);
  arcShort(solid, vW2.F, vW2.from, vW2.to);
  solid.L(B2).L(apex).L(B1).L(vW1.from);
  arcShort(solid, vW1.F, vW1.from, vW1.to);
  solid.L(vN.from);
  arcShort(solid, vN.F, vN.from, vN.to);
  const trails = sendTrails(sharp);
  return {
    stroke: [{ kind: 'stroke', d: body + trails }],
    'two-tone': [{ kind: 'plate', d: plate.d }, { kind: 'stroke', d: body + trails }],
    duotone: [{ kind: 'plate', d: plate.d }, { kind: 'solid', d: half.toString() }, { kind: 'stroke', d: trails }],
    fill: [{ kind: 'solid', d: solid.Z().toString() }, { kind: 'stroke', d: trails }],
  };
}
const send = {};
for (const c of ['regular', 'sharp']) for (const [st, layers] of Object.entries(sendVariants(c === 'sharp'))) send[`${st}.${c}`] = layers;

/* ================================================================ bike-fast */

// `bike` untouched; the truck's pair of trails, flush on the box's left edge
// behind the rider, at y 6 and 10 (2 clear of the torso and of the rear wheel)
const BIKE_TR = { regular: 'M2 6L8 6M2 10L5 10', sharp: 'M1 6L9 6M1 10L6 10' };
const bike = {};
for (const c of ['regular', 'sharp']) {
  const t = BIKE_TR[c];
  const stroke = rawOf('bike', 'stroke', c);
  bike[`stroke.${c}`] = [{ kind: 'stroke', d: stroke + t }];
  bike[`two-tone.${c}`] = [{ kind: 'plate', d: rawOf('bike', 'two-tone', c, 0) }, { kind: 'stroke', d: rawOf('bike', 'two-tone', c, 1) + t }];
  bike[`duotone.${c}`] = [{ kind: 'plate', d: rawOf('bike', 'duotone', c, 0) }, { kind: 'stroke', d: rawOf('bike', 'duotone', c, 1) + t }, { kind: 'stroke', d: rawOf('bike', 'duotone', c, 2) }];
  bike[`fill.${c}`] = [{ kind: 'solid', d: rawOf('bike', 'fill', c, 0) }, { kind: 'stroke', d: rawOf('bike', 'fill', c, 1) + t }];
}

/* =============================================================== timer-fast */

// `timer` with its ring opened on the left for two trails at y 12 and 16, the
// ring cut 2 clear of them; the trails start on the ring's own left ink (x=3), so
// the box is the timer's. Plate the timer's disc; duotone trails black, cut flush
// along the disc; fill cuts them as slots through the disc's edge.
const TC = [12, 14], TR = 8, TPR = 9;
const yCut = [12 - 4, 16 + 4];
const aTop = 180 - deg(Math.asin((yCut[0] - TC[1]) / TR));       // 228.59
const aBot = 180 - deg(Math.asin((yCut[1] - TC[1]) / TR)) + 360;  // 491.41
const onRing = (a, r = TR) => [TC[0] + r * Math.cos(rad(a)), TC[1] + r * Math.sin(rad(a))];
function timerRing(sharp) {
  const p0 = onRing(aTop), p1 = onRing(aBot);
  const p = new Path();
  if (sharp) {
    // arc ends stubbed along their own tangents: (1 - sin b) / cos b, b off the nearer axis
    const stub = (P, dir) => { const a = Math.atan2(Math.abs(dir[1]), Math.abs(dir[0])); const b = Math.min(a, Math.PI / 2 - a); return add(P, mul(dir, (1 - Math.sin(b)) / Math.cos(b))); };
    const out0 = [Math.sin(rad(aTop)), -Math.cos(rad(aTop))], out1 = [-Math.sin(rad(aBot)), Math.cos(rad(aBot))];
    p.M(stub(p0, out0)).L(p0).A(TC, aTop, aBot, 1).L(stub(p1, out1));
  } else p.M(p0).A(TC, aTop, aBot, 1);
  return p.toString();
}
const TIMER_REST = { regular: 'M9 2L15 2M12 2L12 6M12 14L12 10M17.6569 8.3431L19 7', sharp: 'M8 2L16 2M12 2L12 6M12 15L12 9M17.6569 8.3431L19.2929 6.7071' };
const TIMER_TR = { regular: [[4, 8, 12], [4, 7, 16]], sharp: [[3, 9, 12], [3, 8, 16]] };   // [x0, x1, y]
assert(rawOf('timer', 'stroke', 'regular').endsWith(TIMER_REST.regular) && rawOf('timer', 'stroke', 'sharp').endsWith(TIMER_REST.sharp), 'timer detail moved');
const DISC = rawOf('timer', 'two-tone', 'regular', 0);
assert(DISC === rawOf('timer', 'two-tone', 'sharp', 0), 'timer plates differ by corner');
const discX = (y) => TC[0] - Math.sqrt(TPR * TPR - (y - TC[1]) ** 2);   // the disc's left edge at y
const discAng = (y) => { const a = deg(Math.atan2(y - TC[1], discX(y) - TC[0])); return a < 0 ? a + 360 : a; };   // 0..360, so arcs never wrap
/** a trail as a black shape cut flush along the disc, round (or square) at its inner end */
function flushTrail([, x1, y], sharp, p = new Path()) {
  const top = [discX(y - 1), y - 1], bot = [discX(y + 1), y + 1];
  p.M(top);
  if (sharp) p.L([x1, y - 1]).L([x1, y + 1]);
  else { p.L([x1, y - 1]); p.A([x1, y], -90, 90, 1); }
  p.L(bot);
  p.A(TC, discAng(y + 1), discAng(y - 1), 1);   // back up the disc edge
  return p.Z();
}
/** the disc with both trails cut as slots through its edge, one contour */
function slottedDisc(sharp) {
  const [t1, t2] = TIMER_TR[sharp ? 'sharp' : 'regular'];
  const p = new Path().M([TC[0], TC[1] - TPR]).A(TC, -90, 90, 1);   // top, right side, bottom
  const slot = ([, x1, y]) => {
    p.A(TC, p.lastA ?? 90, discAng(y + 1), 1);
    p.L([x1, y + 1]);
    if (sharp) p.L([x1, y - 1]); else p.A([x1, y], 90, -90, -1);
    p.L([discX(y - 1), y - 1]);
    p.lastA = discAng(y - 1);
  };
  p.lastA = 90;
  slot(t2); slot(t1);
  p.A(TC, p.lastA, 270, 1);
  return p.Z().toString();
}
const TIMER_HAND_KO = {
  regular: 'M11 10L11 14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14L13 10C13 9.4477 12.5523 9 12 9C11.4477 9 11 9.4477 11 10Z',
  sharp: 'M11 9L11 15L13 15L13 9L11 9Z',
};
const timer = {};
for (const c of ['regular', 'sharp']) {
  const s = c === 'sharp';
  const trails = TIMER_TR[c].map(([x0, x1, y]) => seg([x0, y], [x1, y])).join('');
  const stroke = timerRing(s) + TIMER_REST[c] + trails;
  timer[`stroke.${c}`] = [{ kind: 'stroke', d: stroke }];
  timer[`two-tone.${c}`] = [{ kind: 'plate', d: DISC }, { kind: 'stroke', d: stroke }];
  const flush = TIMER_TR[c].map((t) => flushTrail(t, s).toString()).join('');
  timer[`duotone.${c}`] = [{ kind: 'plate', d: DISC }, { kind: 'solid', d: flush }, { kind: 'stroke', d: TIMER_REST[c] }];
  timer[`fill.${c}`] = [{ kind: 'solid', d: slottedDisc(s) + TIMER_HAND_KO[c], evenodd: true }, { kind: 'stroke', d: TIMER_REST[c].replace(/M12 1[45]L12 (9|10)/, '') }];
}

/* ================================================================== writer */

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
function writeSet2(name, variants) {
  const dir = join(OUT, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const [key, layers] of Object.entries(variants)) {
    const [style, corners] = key.split('.');
    const cap = corners === 'sharp' ? 'butt' : 'round';
    const body = layers.map(({ kind, d, evenodd }) =>
      kind === 'stroke' ? `<path d="${d}" fill="none" stroke="black" stroke-width="2" stroke-linecap="${cap}" stroke-linejoin="round"/>`
      : kind === 'plate' ? `<path d="${d}" fill="black" fill-opacity="0.4"/>`
      : `<path${evenodd ? ' fill-rule="evenodd" clip-rule="evenodd"' : ''} d="${d}" fill="black"/>`);
    writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), [HEAD, ...body, '</svg>', ''].join('\n'));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  writeSet(OUT, 'star-shooting', star);
  writeSet(OUT, 'truck-fast', truck);
  writeSet2('send-fast', send);
  writeSet2('bike-fast', bike);
  writeSet2('timer-fast', timer);
  console.log('wrote raw/{star-shooting,truck-fast,send-fast,bike-fast,timer-fast} into', OUT);
  console.log('send at', S_SEND, ' wing r', SEND.rW.toFixed(4), ' notch r', SEND.rT.toFixed(4));
  console.log('star centre', SC.map((v) => fmt(v, 4)).join(', '));
}
