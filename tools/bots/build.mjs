// The bot family of 1.5.0: bot-circle's face in six more bodies, all four
// styles in both corners, 1 Oct 2026.
//
// The face is bot-circle's (his drawing, shipped as bot-2 and renamed with this
// batch): two eyes 3 long on a pitch of 4, the pair turned 8.668 degrees so it
// glances up and to the right. It is the same drawing in every member, moved
// by whole units, and its ink clears the body's by 2 at least (the circle's own
// 1.62 is his and stays). Sharp gives the eyes butt caps run out by the cap cut,
// (1 - sin t) / cos t = 0.8591, exactly as bot-circle's sharp half does.
//
//   bot-cloud    `cloud` verbatim, the face down in its body (the lobes bind), 2.00
//   bot-message  `message` verbatim, the round bubble: a chatbot without a word
//                of explanation. Face one unit down and left, 2.42
//   bot-square   `square` verbatim, the eyes where bot-circle has them: the top
//                wall is the tight side, 2.00
//   bot-heart    `heart` verbatim, the face one unit down (the cleft binds), 2.10
//   bot-droplet  `droplet`'s construction (a bulb, sides on the 3-4-5 tangent, an
//                apex fillet) solved for the 18 x 22 a vertical icon owes: bulb
//                r=8 on (12,14), apex r=2, top on 2. `droplet` is r=7 with an r=1
//                apex at 16 x 20 and carries OPTICAL. Sharp is `droplet`'s rung, a
//                mitred true point whose mitre paints the rounded box. Face in the
//                bulb, 2.64 (2.20 sharp)
//   bot-star     not `star`, whose core holds 3.7 where the face needs 6.5: tips
//                r=2, valleys r=1, inner radius 0.6, turned 9 degrees to the left.
//                Upright it stands 22 x 21.22 at these fillets, so no whole
//                padding (`star` sits 1 / 1.5, drawn before that ruling); turned
//                until tan(rho) = 0.093 / 0.5878 its box is square, 22 x 22 on 1
//                all round, `star-shooting`'s trick. Turned left it leans with the
//                face, which stays square to the star and still glances up-right;
//                turned right the face lands on the far side and reads as looking
//                back. Sharp keeps the tip fillets and squares the valleys, as
//                sharp `star` and `star-shooting` do: true points on a turned star
//                leave the one tip that bounds no side of the box an arm longer.
//
// Styles follow bot-circle: two-tone = the body's plate under the outline and
// eyes; duotone = the grey plate with black eyes; fill = the plate solid with
// the eyes knocked out as their own painted outlines (capsules, bars in sharp).
// Plates are the shipped outlines' own plates for the borrowed bodies, and
// every edge grown by 1 for the two drawn here (a tip's arc keeps its centre,
// a valley's concave arc closes to its centre).
//
// Tried and dropped (his calls, 1 Oct 2026): an octagon (a square with clipped
// corners at 16px, beside bot-square), a square bubble, a shield (beside
// shield-user), a badge and a monitor; bot-triangle (`triangle-alert`'s
// outline read as a warning sign with eyes, and no true-point triangle in the
// box clears the face by 2: 1.40 at best) and bot-briefcase (luggage with eyes).
// Brows were tried on all of them: with 2 between brow and eye they fit only the
// circle and the square, and only by dropping the face to the middle, which
// loses the glance; at 16px they read as noise.
//
//   node tools/bots/build.mjs [--out=<dir>]     writes raw/<name>/ for all six (default: this checkout)
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { arcTo, fillet, pt, add, mul } from '../v5/geom.mjs';
import { strokedBBox, outlines, minGap } from '../../pipeline/lib/geom.mjs';

const REPO = join(import.meta.dirname, '..', '..');
const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? REPO;
const f = (v) => { const r = Math.round(v * 1e4) / 1e4; return String(Object.is(r, -0) ? 0 : r); };
const K = 0.5522847498;
const norm = (v) => { const L = Math.hypot(v[0], v[1]); return [v[0] / L, v[1] / L]; };
const ink = (d) => { const b = strokedBBox(d, 1, 'round'); return Array.isArray(b) ? b : [b.x0, b.y0, b.x1, b.y1]; };
const deg = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;
const arcD = (c, r, a0, a1) => arcTo(c, r, a0, a1).map((s) => `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`).join('');

/* ---------------------------------------------------------------- borrowed */
const rawFile = (name, style, corners) => readFileSync(join(REPO, 'raw', name, `Container=regular, Style=${style}, Corners=${corners}.svg`), 'utf8');
const outlineOf = (name, corners) => rawFile(name, 'stroke', corners).match(/ d="(M[^M"]*Z)/)[1];
const plateOf = (name, corners) => rawFile(name, 'two-tone', corners).match(/<path d="(M[^M"]*Z)" fill="black" fill-opacity="0.4"/)[1];

/**
 * A filleted polygon whose every fillet is a true arc split at each multiple of
 * 90 degrees it spans (drawing-a-new-icon.md, the grid): one cubic per corner
 * bulged the star's tips 0.0009 past their box.
 */
function polyArcs(pts, radii) {
  const n = pts.length;
  const parts = pts.map((V, i) => {
    const A = pts[(i - 1 + n) % n], B = pts[(i + 1) % n], r = radii[i] ?? 0;
    if (r <= 1e-9) return { T1: V, T2: V, arcs: '' };
    const fl = fillet(A, V, B, r);
    const a0 = deg([fl.T1[0] - fl.F[0], fl.T1[1] - fl.F[1]]);
    let d = deg([fl.T2[0] - fl.F[0], fl.T2[1] - fl.F[1]]) - a0;
    while (d > 180) d -= 360;
    while (d <= -180) d += 360;
    return { T1: fl.T1, T2: fl.T2, arcs: arcD(fl.F, r, a0, a0 + d) };
  });
  let d = `M${pt(parts[0].T2)}`;
  for (let i = 1; i < n; i++) d += `L${pt(parts[i].T1)}` + parts[i].arcs;
  return d + `L${pt(parts[0].T1)}` + parts[0].arcs + 'Z';
}
// every edge moved out by `by`: each vertex slides along its bisector by by / sin(half angle)
function grow(pts, by) {
  const n = pts.length;
  return pts.map((V, i) => {
    const A = pts[(i - 1 + n) % n], B = pts[(i + 1) % n];
    const e1 = norm([V[0] - A[0], V[1] - A[1]]), e2 = norm([B[0] - V[0], B[1] - V[1]]);
    const n1 = [e1[1], -e1[0]], n2 = [e2[1], -e2[0]];
    const m = norm([n1[0] + n2[0], n1[1] + n2[1]]);
    const c = m[0] * n1[0] + m[1] * n1[1];
    return [V[0] + (m[0] * by) / c, V[1] + (m[1] * by) / c];
  });
}

/* ---------------------------------------------------------------- the star */
const starPts = (Ro, cx, cy, rho, k) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + rho + i * 36) * Math.PI) / 180, r = i % 2 ? Ro * k : Ro;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
};
function star({ k = 0.6, rt = 2, rv = 1, pad = 1 } = {}) {
  const radii = Array.from({ length: 10 }, (_, i) => (i % 2 ? rv : rt));
  let rho = -9, Ro = 12, cx = 12, cy = 12;
  for (let it = 0; it < 400; it++) {
    const b = ink(polyArcs(starPts(Ro, cx, cy, rho, k), radii));
    const W = b[2] - b[0], H = b[3] - b[1];
    rho -= (W - H) * 2;
    Ro *= (24 - 2 * pad) / Math.max(W, H);
    cx += (24 - b[2] - b[0]) / 2;
    cy += (24 - b[3] - b[1]) / 2;
  }
  const pts = starPts(Ro, cx, cy, rho, k);
  const regular = polyArcs(pts, radii);
  const sharp = polyArcs(pts, radii.map((r, i) => (i % 2 ? 0 : r)));
  for (const [what, d] of [['star', regular], ['sharp star', sharp]]) {
    const b = ink(d);
    if (b.some((v, i) => Math.abs(v - (i < 2 ? pad : 24 - pad)) > 1e-3)) throw new Error(`${what} box ${b.map(f)}`);
  }
  const plate = polyArcs(grow(pts, 1), radii.map((r, i) => (i % 2 ? Math.max(0, r - 1) : r + 1)));
  return { regular, sharp, plate };
}

/* ------------------------------------------------------------- the droplet */
const C = [12, 14];
/** Rounded: bulb R about C, apex fillet rt, sides on the 3-4-5 tangent. */
function dropRound(R, rt) {
  const nr = [0.8, -0.6];                               // the right side's out-normal
  const Tb = add(C, mul(nr, R));
  const F = [12, C[1] - R / 0.6 + rt / 0.6];            // apex fillet centre
  const TfL = [24 - (F[0] + nr[0] * rt), F[1] + nr[1] * rt];
  return `M${pt(Tb)}${arcD(C, R, deg(nr), 180 - deg(nr))}L${pt(TfL)}${arcD(F, rt, 180 - deg(nr), 360 + deg(nr))}L${pt(Tb)}Z`;
}
/** Sharp: a mitred true point whose mitre lands on `top`, grown by `by` for the plate. */
function dropSharp(R, top, by) {
  const v = (top + C[1] / R) / (1 + 1 / R);             // v - (C.y - v) / R = top
  const b = Math.asin(R / (C[1] - v));
  const V = [12, v - by / Math.sin(b)];
  const nr = [Math.cos(b), -Math.sin(b)];
  const Tb = add(C, mul(nr, R + by));
  return `M${pt(Tb)}${arcD(C, R + by, deg(nr), 180 - deg(nr))}L${pt(V)}L${pt(Tb)}Z`;
}

/* ---------------------------------------------------------------- the face */
const EYES = [[[12, 7.60279], [12.4521, 10.5685]], [[15.9543, 7], [16.4064, 9.96574]]];
function faceSegs(T, sharp) {
  const segs = EYES.map(([a, b]) => [[a[0] + T[0], a[1] + T[1]], [b[0] + T[0], b[1] + T[1]]]);
  if (!sharp) return segs;
  return segs.map(([a, b]) => {
    const u = norm([b[0] - a[0], b[1] - a[1]]);
    const off = Math.atan2(Math.abs(u[1]), Math.abs(u[0]));
    const th = Math.min(off, Math.PI / 2 - off);
    const k = (1 - Math.sin(th)) / Math.cos(th);
    return [[a[0] - u[0] * k, a[1] - u[1] * k], [b[0] + u[0] * k, b[1] + u[1] * k]];
  });
}
const lineD = (segs) => segs.map(([a, b]) => `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`).join('');
// bot2.mjs's footprint: the painted outline of a 2-wide stroke, capsule or bar
function footprint([a, b], round) {
  const u = norm([b[0] - a[0], b[1] - a[1]]), n = [-u[1], u[0]];
  const q = (c, s, t) => `${f(c[0] + n[0] * s + u[0] * t)} ${f(c[1] + n[1] * s + u[1] * t)}`;
  if (!round) return `M${q(a, 1, 0)}L${q(b, 1, 0)}L${q(b, -1, 0)}L${q(a, -1, 0)}Z`;
  return `M${q(a, 1, 0)}L${q(b, 1, 0)}C${q(b, 1, K)} ${q(b, K, 1)} ${q(b, 0, 1)}C${q(b, -K, 1)} ${q(b, -1, K)} ${q(b, -1, 0)}L${q(a, -1, 0)}C${q(a, -1, -K)} ${q(a, -K, -1)} ${q(a, 0, -1)}C${q(a, K, -1)} ${q(a, 1, -K)} ${q(a, 1, 0)}Z`;
}

// A knockout wound against its plate, so evenodd and nonzero agree: the
// footprints come out one way round, and `cloud`'s plate runs the same way.
const signedArea = (d) => { const pts = outlines(d, 32)[0]; return pts.reduce((a, p, i) => { const q = pts[(i + 1) % pts.length]; return a + p[0] * q[1] - q[0] * p[1]; }, 0) / 2; };
function reverseD(d) {
  const tok = d.match(/[MLCZ]|-?\d*\.?\d+/g), segs = [];
  let i = 0, cmd, cur, start;
  const n = () => +tok[i++];
  while (i < tok.length) {
    if (/^[MLCZ]$/.test(tok[i])) cmd = tok[i++];
    if (cmd === 'M') { cur = [n(), n()]; start = cur; cmd = 'L'; }
    else if (cmd === 'L') { const p = [n(), n()]; segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (cmd === 'C') { const c1 = [n(), n()], c2 = [n(), n()], p = [n(), n()]; segs.push({ k: 'C', a: cur, c1, c2, b: p }); cur = p; }
    else if (cmd === 'Z') { if (Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-9) segs.push({ k: 'L', a: cur, b: start }); cur = start; cmd = null; }
  }
  const r = segs.reverse(), q = (p) => `${f(p[0])} ${f(p[1])}`;
  return `M${q(r[0].b)}` + r.map((g) => (g.k === 'L' ? `L${q(g.a)}` : `C${q(g.c2)} ${q(g.c1)} ${q(g.a)}`)).join('') + 'Z';
}

/* ---------------------------------------------------------------- members */
const STAR = star();
const BODY = {
  'bot-cloud': { T: [-2, 4], body: (c) => ({ line: outlineOf('cloud', c), plate: plateOf('cloud', c), join: 'round' }) },
  'bot-message': { T: [-1, 1], body: (c) => ({ line: outlineOf('message', c), plate: plateOf('message', c), join: 'round' }) },
  'bot-square': { T: [0, 0], body: (c) => ({ line: outlineOf('square', c), plate: plateOf('square', c), join: 'round' }) },
  'bot-heart': { T: [0, 1], body: (c) => ({ line: outlineOf('heart', c), plate: plateOf('heart', c), join: 'round' }) },
  'bot-droplet': {
    T: [-2, 4],
    body: (c) => (c === 'sharp'
      ? { line: dropSharp(8, 1, 0), plate: dropSharp(8, 1, 1), join: 'miter' }
      : { line: dropRound(8, 2), plate: dropRound(9, 3), join: 'round' }),
  },
  'bot-star': { T: [-1, 3], body: (c) => ({ line: c === 'sharp' ? STAR.sharp : STAR.regular, plate: STAR.plate, join: 'round' }) },
};

const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const st = (d, sharp, j = 'round') => `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="${j}"/>\n`;
const report = [];
for (const [name, m] of Object.entries(BODY)) {
  const dir = join(OUT, 'raw', name);
  mkdirSync(dir, { recursive: true });
  for (const corners of ['regular', 'sharp']) {
    const sharp = corners === 'sharp';
    const b = m.body(corners);
    const segs = faceSegs(m.T, sharp);
    const eyes = lineD(segs);
    const holes = segs.map((s) => { const h = footprint(s, !sharp); return Math.sign(signedArea(h)) === Math.sign(signedArea(b.plate)) ? reverseD(h) : h; }).join('');
    const files = {
      stroke: HEAD + st(b.line, sharp, b.join) + st(eyes, sharp),
      'two-tone': HEAD + `<path d="${b.plate}" fill="black" fill-opacity="0.4"/>\n` + st(b.line, sharp, b.join) + st(eyes, sharp),
      duotone: HEAD + `<path d="${b.plate}" fill="black" fill-opacity="0.4"/>\n` + st(eyes, sharp),
      fill: HEAD + `<path fill-rule="evenodd" clip-rule="evenodd" d="${b.plate}${holes}" fill="black"/>\n`,
    };
    for (const [style, svg] of Object.entries(files)) writeFileSync(join(dir, `Container=regular, Style=${style}, Corners=${corners}.svg`), svg + '</svg>\n');
    // the clearance this file promises: eye ink to body ink, capsules or bars
    let g = Infinity;
    for (const bp of outlines(b.line)) for (const s of segs) g = Math.min(g, minGap(bp, outlines(footprint(s, !sharp), 24)[0]) - 1);
    const floor = sharp ? 2 - 0.414 : 2;   // a butt corner may lean into a house gap by 0.414
    if (g < floor - 1e-3) throw new Error(`${name} ${corners}: the face clears the body by ${g.toFixed(3)}`);
    report.push(`${name.padEnd(12)} ${corners.padEnd(7)} face at ${m.T} clears ${g.toFixed(2)}`);
  }
}
console.log(report.join('\n'));
