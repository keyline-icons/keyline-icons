/**
 * Zafar's redrawn plane, train and ship of 12 Sep 2026, fitted.
 *   node tools/batch-d/refit.mjs [name ...] [--out=DIR]
 *
 * His drawings arrived in refs/ and are INLINED here, because refs/ is his drop
 * folder and is emptied before every commit. Each is kept as drawn: the rounded
 * stroke variant ships his own `d` verbatim, which is what "fit it, do not
 * re-derive it" means, and every other variant is derived from it.
 *
 * What that derivation needs is that his curves are circular: every cubic in
 * the three files fits a circle to better than 0.004, so `his.mjs` reads them
 * back as lines and arcs and `v5/offset.mjs` offsets them exactly rather than
 * approximately. The plates below are therefore verified sample by sample, and
 * the sharp halves are the same skeletons with every fillet taken out and each
 * vertex pulled in along its bisector so the two treatments paint one box.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, clipContour, clipByDistance } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, add, sub, mul, unit, len, dot } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { flatten } from '../v5/offset.mjs';
import { readSubpaths, skeletonOf, deFillet } from './his.mjs';
import { offsetPath, verify as verifyOffset } from '../../.claude/skills/icon-system/tools/offset.mjs';
import { strokedBBox, outlines, minGap } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d, join) => ({ kind: 'stroke', d: snapPath(String(d)), ...(join ? { join } : {}) });
const F_ = (d) => ({ kind: 'solid', d: snapPath(String(d)) });
const P = (d) => ({ kind: 'plate', d: snapPath(String(d)) });
const M_ = (d, join) => ({ kind: 'muted', d: snapPath(String(d)), ...(join ? { join } : {}) });

/* --------------------------------------------------------------- helpers */

const revSeg = (g) => (g.type === 'L'
  ? { type: 'L', p0: g.p1, p1: g.p0 }
  : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 });
const revRun = (segs) => [...segs].reverse().map(revSeg);
const startOf = (s) => (s.type === 'L' ? s.p0 : onA(s, s.a0));
const endOf = (s) => (s.type === 'L' ? s.p1 : onA(s, s.a1));
const onA = (s, a) => [s.c[0] + s.r * Math.cos((a * Math.PI) / 180), s.c[1] + s.r * Math.sin((a * Math.PI) / 180)];

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
  return a / 2;
};
const windingOf = (segs) => Math.sign(areaOf(flatten(segs, 24)));
/** `segs` wound AGAINST `plateSegs`, so it cuts under the non-zero rule. */
const hole = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? revRun(segs) : segs);
const circleSegs = (c, r) => [{ type: 'A', c, r, a0: 0, a1: 360 }];

/** `holeD` wound against `plateD`, as path data, so it cuts under non-zero. */
function holeAgainst(plateD, holeD) {
  const area = (d) => {
    const pts = [];
    for (const m of d.matchAll(/-?\d*\.?\d+ -?\d*\.?\d+/g)) pts.push(m[0].split(' ').map(Number));
    let a = 0;
    for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
    return a;
  };
  if (Math.sign(area(plateD)) !== Math.sign(area(holeD))) return holeD;
  return reverseD(holeD);
}
/** Reverse a closed M/L/C/Z run, so a knockout can be wound the other way. */
function reverseD(d) {
  const t = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const segs = []; let i = 0, cur = null, start = null;
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') { cur = [+t[i++], +t[i++]]; start = cur; }
    else if (c === 'L') { const p = [+t[i++], +t[i++]]; segs.push({ t: 'L', a: cur, b: p }); cur = p; }
    else if (c === 'C') { const c1 = [+t[i++], +t[i++]], c2 = [+t[i++], +t[i++]], p = [+t[i++], +t[i++]]; segs.push({ t: 'C', a: cur, c1, c2, b: p }); cur = p; }
    else if (c === 'Z' || c === 'z') { if (len(sub(cur, start)) > 1e-9) segs.push({ t: 'L', a: cur, b: start }); cur = start; }
  }
  const f = (v) => String(Math.round(v * 1e4) / 1e4);
  const P2 = (p) => `${f(p[0])} ${f(p[1])}`;
  let out = `M${P2(segs[segs.length - 1].b)}`;
  for (let k = segs.length - 1; k >= 0; k--) {
    const s2 = segs[k];
    out += s2.t === 'L' ? `L${P2(s2.a)}` : `C${P2(s2.c2)} ${P2(s2.c1)} ${P2(s2.a)}`;
  }
  return out + 'Z';
}

/** A polyline whose free ends sharp pushes out along their own tangents. */
function sharpen(pts, ends = [true, true], box = [1, 1, 23, 23]) {
  const p = pts.map((q) => [...q]);
  if (ends[0]) { const dir = unit(sub(p[0], p[1])); p[0] = add(p[0], mul(dir, sharpEndIn(p[0], dir, box))); }
  if (ends[1]) {
    const i = p.length - 1, dir = unit(sub(p[i], p[i - 1]));
    p[i] = add(p[i], mul(dir, sharpEndIn(p[i], dir, box)));
  }
  return p;
}
const pathOf = (pts) => pts.map((q, i) => `${i ? 'L' : 'M'}${q.map((v) => String(Math.round(v * 1e4) / 1e4)).join(' ')}`).join('');
const run = (pts, sharp, ends = [true, true], box) => pathOf(sharp ? sharpen(pts, ends, box) : pts);


/**
 * Drop any piece a re-import would drop.
 *
 * Offsetting a run of free cubics leaves a hairline connector wherever two
 * pieces were tangent-continuous, and `createNodeFromSvg` discards those on
 * import: the file and the design file then disagree for ever over a segment
 * neither of them paints. 64 of them came out of these plates, and three
 * variants' signatures differed because of it. The threshold is the one the
 * reference sets, 0.01, not 1e-4 — a tangent join lands around 2e-4 and sails
 * through anything tighter.
 */
function snapPath(d, eps = 0.01) {
  // H and V are in the tokeniser because leaving them out does not fail, it
  // DELETES: `H18.5` matched nothing, so the cyclist's arm vanished from every
  // rounded bike variant while the sharp ones, rebuilt from a skeleton, kept
  // it. Same class as translating a path with a regex over its number pairs.
  const t = d.match(/[MLCZHV]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const known = t.filter((x) => /^[MLCZHV]$/i.test(x)).length;
  let i = 0, cur = null, out = '';
  const near = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) < eps;
  const f = (v) => String(Math.round(v * 1e4) / 1e4);
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') { cur = [+t[i++], +t[i++]]; out += `M${f(cur[0])} ${f(cur[1])}`; }
    else if (c === 'L') {
      const p = [+t[i++], +t[i++]];
      if (!near(p, cur)) { out += `L${f(p[0])} ${f(p[1])}`; cur = p; }
    } else if (c === 'C') {
      const c1 = [+t[i++], +t[i++]], c2 = [+t[i++], +t[i++]], p = [+t[i++], +t[i++]];
      if (!near(p, cur)) { out += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p[0])} ${f(p[1])}`; cur = p; }
    } else if (c === 'H') {
      const p = [+t[i++], cur[1]];
      if (!near(p, cur)) { out += `L${f(p[0])} ${f(p[1])}`; cur = p; }
    } else if (c === 'V') {
      const p = [cur[0], +t[i++]];
      if (!near(p, cur)) { out += `L${f(p[0])} ${f(p[1])}`; cur = p; }
    } else if (c === 'Z' || c === 'z') out += 'Z';
    else throw new Error(`snapPath: unhandled command ${c} in ${d.slice(0, 40)}`);
  }
  if (i < t.length) throw new Error(`snapPath: ${t.length - i} token(s) left over`);
  void known;
  return out;
}

/** A closed contour's plate: offset a unit outward, checked sample by sample. */
function plateOf(segs, tol = 0.01) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1, tol);
  return off;
}

/** A skeleton of {p, r} re-emitted as a path; r = 0 is a plain vertex. */
function runPath(pts) {
  const p = new Path().M(pts[0].p);
  for (let i = 1; i < pts.length - 1; i++) p.corner(pts[i].p, pts[i + 1].p, pts[i].r);
  p.L(pts[pts.length - 1].p);
  return p;
}

/** Assert a variant's ink, so nothing reaches raw/ with the box moved. */
/** The painted box of a variant's layers. */
function inkOf(layers, cap) {
  const stroked = layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join('');
  const b = stroked ? strokedBBox(stroked, 1, cap) : [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers.filter((l) => l.kind !== 'stroke')) {
    const q = strokedBBox(l.d, l.kind === 'muted' ? 1 : 0, cap);
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  return b;
}
function assertBox(name, key, layers, want, tol = 0.01) {
  if (!want) return null;
  const stroked = layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join('');
  const b = stroked ? strokedBBox(stroked, 1, key.endsWith('sharp') ? 'butt' : 'round') : [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers.filter((l) => l.kind !== 'stroke')) {
    const q = strokedBBox(l.d, 0, 'butt');
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  if (key.endsWith('sharp')) {
    // The rule for a sharp half is that it never paints OUTSIDE its rounded
    // sibling, not that it matches it: where the canvas binds on an end's side
    // axis before its own disc box does, the arm loses a little reach and that
    // is the trade the set already makes on 25 names. The leaf's stalk is one
    // of them, 0.4 short at the foot because its cap's far corner would
    // otherwise cross x = 2.
    const outside = [want[0] - b[0], want[1] - b[1], b[2] - want[2], b[3] - want[3]];
    if (Math.max(...outside) > tol)
      throw new Error(`${name} ${key}: ink ${b.map((v) => v.toFixed(3)).join(', ')} paints outside ${want.join(', ')}`);
    if (Math.max(...outside.map((v) => -v)) > 0.75)
      throw new Error(`${name} ${key}: ink ${b.map((v) => v.toFixed(3)).join(', ')} sits well inside ${want.join(', ')}`);
    return b;
  }
  const err = Math.max(...b.map((v, i) => Math.abs(v - want[i])));
  if (err > tol) throw new Error(`${name} ${key}: ink ${b.map((v) => v.toFixed(3)).join(', ')} should be ${want.join(', ')}`);
  return b;
}

const SETS = {};
const BOXES = {};

/* ----------------------------------------------------------------- plane */

/**
 * HIS DRAWING, 12 Sep 2026, kept verbatim in the rounded stroke.
 *
 * An airliner from above on the free diagonal, nose up-right. Four runs meet at
 * two hubs, A on the fuselage's left flank and B on its right, so nothing in it
 * is a free end: the wing's trailing edge dies on the fuselage line at
 * (8.4518, 12.5) and the right tailplane's leading edge on the other at
 * (11.5, 15.5). The nose is the part worth reading twice — two arcs, one
 * centred on the vertical through the tip and one on the horizontal, so they
 * meet at (22, 2) at a right angle and the round join alone makes the point,
 * which is what puts the ink on 23 and 1 exactly.
 *
 * Measured before anything was touched: ink 1..23 both ways, pads 1/1/1/1,
 * tightest painted gap 2.277, every fillet within 0.036 of r=1. Nothing needed
 * moving, so nothing was moved.
 */
const PLANE_D = 'M12.3777 6.89571L4.12243 5.15935C3.82207 5.13348 3.52537 5.23874 3.31215 5.44687L2.29854 6.43628C1.86659 6.85791 1.90899 7.55323 2.38925 7.92183L8.45179 12.5M12.3777 6.89571L16.7849 3.69424C18.3008 2.59307 20.1263 2.00002 22 2.00006C22 3.82478 21.3976 5.59847 20.2864 7.04578L16.9641 11.3727M12.3777 6.89571L6 16L3.14755 16.0832C2.47038 16.35 2.29202 17.2051 2.80845 17.7091L6.3958 21.2108C6.91213 21.7149 7.78815 21.5408 8.0615 20.8798L8 18L16.9641 11.3727M11.5 15.5L16.4226 21.62C16.8002 22.0888 17.5125 22.1303 17.9445 21.7086L18.9581 20.7191C19.1713 20.511 19.2791 20.2214 19.2526 19.9282L16.9641 11.3727';

/**
 * The painted silhouette, traced once round his own segments.
 *
 * The outer boundary is the nose, then the right tailplane backwards, then the
 * stretch of fuselage line between the two tail roots, then the tail backwards,
 * then the stretch of the other fuselage line down to the wing root, then the
 * wing backwards. The two pieces it does NOT use — fuselage line above the wing
 * root and below the tailplane root — are the interior strokes that make the
 * drawing read as a plane rather than a blade, and they stay strokes.
 */
function planeOutline(subs) {
  const [wing, nose, tail, tailplane] = subs;
  const W = endOf(wing[wing.length - 1]);            // wing root on the tail's first line
  const R = startOf(tailplane[0]);                   // tailplane root on the tail's last line
  const tailMid = tail.slice(1, tail.length - 1);    // (6,16) round to (8,18)
  const sixteen = endOf(tail[0]);                    // (6, 16)
  const eighteen = startOf(tail[tail.length - 1]);   // (8, 18)
  return [
    ...nose,
    ...revRun(tailplane),
    { type: 'L', p0: R, p1: eighteen },
    ...revRun(tailMid),
    { type: 'L', p0: sixteen, p1: W },
    ...revRun(wing),
  ];
}

SETS['plane'] = () => {
  const out = {};
  const rounded = readSubpaths(PLANE_D);
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    let subs = rounded;
    let d = PLANE_D;
    if (sharp) {
      // the nose is arcs rather than fillets and is carried across untouched
      const rebuilt = rounded.map((segs, i) => (i === 1 ? segs : readSubpaths(runPath(deFillet(skeletonOf(segs))).toString())[0]));
      subs = rebuilt;
      d = rebuilt.map((segs, i) => (i === 1
        ? new Path().M(startOf(segs[0])).toString().replace(/^M/, 'M') + segsToPath(segs)
        : segsToPath(segs, true))).join('');
    }
    const outline = planeOutline(subs);
    const plate = plateOf(outline);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate))];
  }
  return out;
};
BOXES['plane'] = [1, 1, 23, 23];

/** Segments back to a `d`, with the leading M when asked for. */
function segsToPath(segs, withM) {
  const p = new Path().M(startOf(segs[0]));
  for (const s of segs) {
    if (s.type === 'L') p.L(s.p1);
    else p.A(s.c, s.a0, s.a1, Math.sign(s.a1 - s.a0) || 1);
  }
  return withM === undefined || withM ? p.toString() : p.toString().replace(/^M[^ML]* [^ML]*/, '');
}

/* ----------------------------------------------------------------- train */

/**
 * HIS DRAWING, 12 Sep 2026, with one thing moved.
 *
 * A cab seen head-on: the house body on 4..20 by 2..18 at r=3, a windscreen
 * rule wall to wall on y=9, two lamps as beads on the dot ladder, two splayed
 * legs, and a mirror either side. Ink 1..23 both ways, which is the circle
 * size on a drawing that reads as a box, and it is his call rather than the
 * ladder's: the mirrors and the legs are what reach the edges.
 *
 * **The mirrors moved from y=5.5 to y=5.** His sit 3.5 above the rule on the
 * centre lines, which is 1.5 of daylight where the house asks 2, and the
 * mirror is the part that can move: the rule divides the drawing and the walls
 * are the body. At y=5 the gap is exactly 2.00 and the mirror springs from the
 * corner fillet's own tangent point, which is where interior detail is
 * supposed to start.
 *
 * Spelled as one closed body rather than his six open pieces. It paints the
 * same, and it stops `SPACING` measuring the wall's two halves as though they
 * were neighbours — his wall is cut at the mirror, so the upper half read 1.5
 * from the rule as a fragment rather than as an element.
 */
SETS['train'] = () => {
  const BOX = [1, 1, 23, 23];
  const LAMPS = [[8.5, 13.5], [15.5, 13.5]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 3;
    const body = polyContour([[4, 2], [20, 2], [20, 18], [4, 18]], [r, r, r, r]);
    const plate = plateOf(body.segs);
    const rule = 'M4 9L20 9';
    const mirrors = run([[4, 5], [2, 5]], sharp, [false, true], BOX) + run([[20, 5], [22, 5]], sharp, [false, true], BOX);
    const legs = run([[7, 18], [5, 22]], sharp, [false, true], BOX) + run([[17, 18], [19, 22]], sharp, [false, true], BOX);
    const beads = LAMPS.map((c) => circlePath(c, 1.5)).join('');
    // the screen is opened as a panel, its top corners on the body's inner r=2
    const pane = polyContour([[5, 3], [19, 3], [19, 8], [5, 8]], [Math.max(0, r - 1), Math.max(0, r - 1), 0, 0]).segs;
    const d = body.toString() + rule + mirrors + legs;
    out[`stroke.${key}`] = [S(d), F_(beads)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(beads)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, pane) + LAMPS.map((c) => hole(plate, circleSegs(c, 1.5))).join('')), S(rule ? mirrors + legs : '')];
  }
  return out;
};
BOXES['train'] = [1, 1, 23, 23];


/* ------------------------------------------------------------------ ship */

/**
 * HIS DRAWING, 12 Sep 2026, recovered from an outlined export.
 *
 * It arrived as outlined fills rather than strokes, so the centrelines were
 * read back by pairing each outer sample with its nearest inner one and taking
 * the midpoint: arc-length pairing misaligns wherever the two runs differ in
 * length, which is every curve here, and it left 0.13 of error on the hull.
 * Nearest-point pairing lands every piece within 0.026, and the right-hand wave
 * within 0.038 once it is split into the two cubics an S needs.
 *
 * The drawing: a cabin on 7..17 by 5..11 at r=2, open at the bottom so the deck
 * is its floor; a mast two units above it; a deck bowed up to (12,10) at the
 * middle; two hull sides falling from the deck's ends to the water; a wave
 * across the bottom; and a porthole, which is a one-unit stroke painting the
 * dot ladder's 3. The hull's ends die ON the wave, which is what lets the
 * silhouette close along a line another stroke already covers — `podium`'s
 * move — so the plate is the hull and the cabin stays an outline over it, the
 * way `truck` keeps its cab.
 */
const SHIP = {
  deck: 'M4.1928 12.6255C6.6256 11.3464 9.2068 10.1362 12 10C14.7932 10.1362 17.3744 11.3464 19.8072 12.6255',
  hullR: 'M19.8072 12.6255C20.3892 15.2745 19.3973 18.1502 17.4479 20',
  hullL: 'M4.1928 12.6255C3.6017 15.268 4.6068 18.1541 6.5521 20',
  water: 'M2 20.3479C4.3679 21.6637 7.179 20.7413 9.5 19.8407C11.671 18.7159 14.2704 18.7635 16.4239 19.8595C18.1685 20.6303 20.0809 21.0813 22 20.8551',
};

/** A cubic's unit tangent at its start or end, for a sharp end's straight stub. */
function cubicTangent(segs, which) {
  const s = which === 'start' ? segs[0] : segs[segs.length - 1];
  const e = 1e-3;
  const q = (t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u ** 3 * s.p0[k] + 3 * u * u * t * s.c1[k] + 3 * u * t * t * s.c2[k] + t ** 3 * s.p1[k]);
  };
  const [a, b] = which === 'start' ? [q(e), q(0)] : [q(1 - e), q(1)];
  return unit(sub(b, a));
}
/** M/L/C into {p0,c1,c2,p1} cubics, so an end tangent can be taken. */
function cubicsOf(d) {
  const t = d.match(/[MLC]|-?\d*\.?\d+/gi) || [];
  const out = []; let i = 0, cur = null;
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') cur = [+t[i++], +t[i++]];
    else if (c === 'L') { const p = [+t[i++], +t[i++]]; out.push({ p0: cur, c1: cur, c2: p, p1: p }); cur = p; }
    else if (c === 'C') { const c1 = [+t[i++], +t[i++]], c2 = [+t[i++], +t[i++]], p = [+t[i++], +t[i++]]; out.push({ p0: cur, c1, c2, p1: p }); cur = p; }
  }
  return out;
}
const fmtN = (v) => String(Math.round(v * 1e4) / 1e4);
/** His curve with a straight stub added at the free ends sharp squares. */
function stubbed(d, ends, box = [1, 1, 23, 23]) {
  const cu = cubicsOf(d);
  let head = '', tail = '';
  if (ends[0]) {
    // cubicTangent already points out of the curve at that end; negating it
    // sent the stub back INTO the drawing and left the wave 0.37 short
    const t = cubicTangent(cu, 'start');
    const p0 = cu[0].p0, k = sharpEndIn(p0, t, box);
    head = `M${fmtN(p0[0] + t[0] * k)} ${fmtN(p0[1] + t[1] * k)}L`;
  }
  if (ends[1]) {
    const t = cubicTangent(cu, 'end'), p1 = cu[cu.length - 1].p1, k = sharpEndIn(p1, t, box);
    tail = `L${fmtN(p1[0] + t[0] * k)} ${fmtN(p1[1] + t[1] * k)}`;
  }
  return (head ? head + d.slice(1) : d) + tail;
}


/** The wave's y at an x, for running the hull's feet onto it. */
function waveYAt(cubics, x) {
  const at = (k, t) => { const u = 1 - t; return [0, 1].map((j) => u**3*k.p0[j] + 3*u*u*t*k.c1[j] + 3*u*t*t*k.c2[j] + t**3*k.p1[j]); };
  for (const k of cubics) {
    const lo = Math.min(k.p0[0], k.p1[0]), hi = Math.max(k.p0[0], k.p1[0]);
    if (x < lo || x > hi) continue;
    let a = 0, b = 1;
    for (let n = 0; n < 60; n++) { const m = (a + b) / 2; if (at(k, m)[0] < x) a = m; else b = m; }
    return at(k, (a + b) / 2)[1];
  }
  return null;
}
/**
 * A hull side run on along its own end tangent until it meets the wave.
 *
 * His sides stop at y=20 while the wave sits 0.78 lower on the left and 0.27 on
 * the right, so the foot floated inside the wave's ink. Buried, it looks
 * right; as the silhouette's corner it is not on the wave at all, and the
 * plate's offset there came to a point out in the white. Run on to the
 * crossing, the corner sits on the wave and its offset stays under the wave's
 * own paint.
 */
function ontoWave(hullD, waveCubics) {
  const cu = cubicsOf(hullD);
  const last = cu[cu.length - 1];
  const t = unit(sub(last.p1, last.c2));
  let lo = 0, hi = 4;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    const q = add(last.p1, mul(t, m));
    const wy = waveYAt(waveCubics, q[0]);
    if (wy === null || q[1] < wy) lo = m; else hi = m;
  }
  const end = add(last.p1, mul(t, (lo + hi) / 2));
  return { d: hullD + `L${fmtN(end[0])} ${fmtN(end[1])}`, end };
}

/** A cubic split at parameter t, de Casteljau. */
function splitCubic(k, t) {
  const lerp = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const ab = lerp(k[0], k[1]), bc = lerp(k[1], k[2]), cd = lerp(k[2], k[3]);
  const abc = lerp(ab, bc), bcd = lerp(bc, cd), m = lerp(abc, bcd);
  return [[k[0], ab, abc, m], [m, bcd, cd, k[3]]];
}
/** The piece of a cubic run between two x values, as {p0,c1,c2,p1} cubics. */
function runBetween(cubics, x0, x1) {
  const at = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u*u*u*k[0][i] + 3*u*u*t*k[1][i] + 3*u*t*t*k[2][i] + t*t*t*k[3][i]); };
  const cut = (k, x) => { let lo = 0, hi = 1; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (at(k, m)[0] < x) lo = m; else hi = m; } return (lo + hi) / 2; };
  const out = [];
  for (const c of cubics) {
    const k = [c.p0, c.c1, c.c2, c.p1];
    const lo = Math.min(k[0][0], k[3][0]), hi = Math.max(k[0][0], k[3][0]);
    if (hi <= x0 || lo >= x1) continue;
    let piece = k;
    if (lo < x0 && x0 < hi) piece = splitCubic(piece, cut(piece, x0))[1];
    const lo2 = Math.min(piece[0][0], piece[3][0]), hi2 = Math.max(piece[0][0], piece[3][0]);
    if (lo2 < x1 && x1 < hi2) piece = splitCubic(piece, cut(piece, x1))[0];
    out.push(piece);
  }
  return out;
}
/** The painted capsule of a straight stroked segment, closed. */
function segCapsule(a, b, sharp, box = [1, 1, 23, 23]) {
  const t = unit(sub(b, a)), n = [t[1], -t[0]];
  const A = sharp ? add(a, mul(mul(t, -1), sharpEndIn(a, mul(t, -1), box))) : a;
  const B = sharp ? add(b, mul(t, sharpEndIn(b, t, box))) : b;
  const p = new Path().M(add(A, n)).L(add(B, n));
  if (sharp) p.L(sub(B, n)).L(sub(A, n));
  else {
    // a cap is a half turn and it has no short way round: route it through the
    // travel direction, which is what makes it a stadium instead of a lens
    p.A(B, ang(n), ang(n) + 180, 1);
    p.L(sub(A, n));
    p.A(A, ang(mul(n, -1)), ang(mul(n, -1)) + 180, 1);
  }
  return p.Z().toString();
}

/**
 * HIS DRAWING, 12 Sep 2026, with three things repaired on his review.
 *
 * 1. **The deck and the two hull sides are ONE subpath now.** They met at the
 *    shoulders as three separate runs, so each shoulder carried two round CAPS
 *    rather than a join, and a full disc of ink stood proud of both curves —
 *    the two noses he marked. Joined, the shoulder paints the join's wedge and
 *    nothing more, and his drawing is otherwise untouched.
 * 2. **The silhouette closes along the WAVE, not across a chord.** It used a
 *    straight line at y=20 between the hull's feet, so where the wave rises
 *    above that the plate showed below it. Closing on the wave's own centre
 *    line puts the plate's bottom edge exactly on the wave's lower ink.
 * 3. **The porthole's knockout is a stadium.** Its cap arcs were swept the
 *    short way round and came out as a lens a third of the size.
 */
SETS['ship'] = () => {
  const BOX = [1, 2, 23, 22];
  const HULL_L = [6.5521, 20], HULL_R = [17.4479, 20];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 2;
    const cabin = new Path().M([7, 11.3]).L([7, 7]).corner([7, 5], [15, 5], r).L([15, 5])
      .corner([17, 5], [17, 11.3], r).L([17, 11.3]).toString();
    const mast = run([[12, 5], [12, 3]], sharp, [false, true], BOX);
    const port = run([[12, 14], [12, 15]], sharp, [true, true], BOX);
    const water = sharp ? stubbed(SHIP.water, [true, true], BOX) : SHIP.water;
    // one continuous gunwale: left hull up, across the deck, right hull down,
    // each side run on to the wave so the silhouette's feet sit on it
    const waveCu = cubicsOf(SHIP.water);
    const L = ontoWave(SHIP.hullL, waveCu), R = ontoWave(SHIP.hullR, waveCu);
    const footL = cubicsOf(SHIP.hullL).slice(-1)[0].p1;
    const hull = `M${fmtN(L.end[0])} ${fmtN(L.end[1])}L${fmtN(footL[0])} ${fmtN(footL[1])}`
      + revCubics(SHIP.hullL)
      + SHIP.deck.replace(/^M[\d.\- ]*/, '')
      + SHIP.hullR.replace(/^M[\d.\- ]*/, '')
      + `L${fmtN(R.end[0])} ${fmtN(R.end[1])}`;
    const d = cabin + mast + hull + water + port;

    // the silhouette closes along the wave between the two feet
    const back = runBetween(waveCu, L.end[0], R.end[0]).reverse()
      .map((k) => `C${fmtN(k[2][0])} ${fmtN(k[2][1])} ${fmtN(k[1][0])} ${fmtN(k[1][1])} ${fmtN(k[0][0])} ${fmtN(k[0][1])}`).join('');
    const sil = hull + back + 'Z';
    const plate = snapPath(offsetPath(sil, 1));
    verifyOffset(sil, plate, 1, 0.06);
    const hole = holeAgainst(plate, segCapsule([12, 14], [12, 15], sharp, BOX));
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate + hole), S(cabin + mast + water)];
  }
  return out;
};
BOXES['ship'] = [1, 2, 23, 22];

/** A cubic run reversed, as `L`-prefixed path data to append to a contour. */
function revCubics(d) {
  const cu = cubicsOf(d).reverse();
  return cu.map((s) => `C${fmtN(s.c2[0])} ${fmtN(s.c2[1])} ${fmtN(s.c1[0])} ${fmtN(s.c1[1])} ${fmtN(s.p0[0])} ${fmtN(s.p0[1])}`).join('');
}
/** A 2-wide capsule knocked out along a segment, wound against a clockwise plate. */
function holeCapsule(a, b, sharp) {
  const t = unit(sub(b, a)), n = [t[1], -t[0]];
  const A = sharp ? sub(a, t) : a, B = sharp ? add(b, t) : b;
  const p = new Path().M(add(A, n));
  if (sharp) p.L(add(B, n)).L(sub(B, n)).L(sub(A, n));
  else {
    p.L(add(B, n));
    p.A([B[0], B[1]], (Math.atan2(n[1], n[0]) * 180) / Math.PI, (Math.atan2(-n[1], -n[0]) * 180) / Math.PI, -1);
    p.L(sub(A, n));
    p.A([A[0], A[1]], (Math.atan2(-n[1], -n[0]) * 180) / Math.PI, (Math.atan2(n[1], n[0]) * 180) / Math.PI, -1);
  }
  return p.Z().toString();
}


/* -------------------------------------- plane-takeoff and plane-landing */

/**
 * HIS DRAWINGS, 12 Sep 2026, replacing two of mine he sent back twice.
 *
 * A side view, not the base plane turned: one closed body climbing to the
 * upper right over a full-width rule at y=20. Ink 1..23 by 3..21, pads of 1
 * and 3, and the plane stands the house 2 clear of the rule.
 *
 * `plane-landing` is that drawing ROTATED, not mirrored.
 *
 * It was mirrored about y=10, and mirrored it flies on its back. This is a top
 * view, not a side view: the wing sweeps back and to the upper left, and that
 * is the face of the aeroplane you are looking at. Reflect it and the wing
 * hangs below the fuselage and the tailplane stands above it, which is a plane
 * upside down — Zafar, 12 Sep 2026: "made the landing plane upside down."
 *
 * Of the four rigid transforms only the mirror about y puts the nose down and
 * to the right, and it is the one that turns the plane over, so descending and
 * upright is a rotation. The angle is not free: rotated, the drawing's ink box
 * grows, and the one that lands it on the takeoff plane's own box — 14 tall,
 * top on 3, bottom on 17, the house 2 clear of the rule — is 35.93 degrees. It
 * takes the fuselage from 22.6 up to 13.3 down, so the pair reads as one plane
 * climbing and the same plane on approach. Solved here rather than written
 * down, so a change to his takeoff carries.
 *
 * His file leaves the joins to MITER; they are drawn round here, which is the
 * house join, and every corner in the body is obtuse enough that the two are
 * the same drawing to the eye. Nothing is re-filleted for sharp: free cubics
 * again, so sharp differs in the rule's caps and the stubs its ends take.
 */
const TAKEOFF_BODY = 'M4.75868 15.0745L2.12997 12.2845C1.91703 12.0585 1.973 11.6972 2.24476 11.5434L2.81221 11.2222C2.9425 11.1484 3.10015 11.1375 3.23971 11.1926L5.81818 12.2105C5.95774 12.2656 6.11539 12.2547 6.24568 12.1809L9.38135 10.4059C9.66547 10.2451 9.71091 9.86114 9.47189 9.64081L5.35995 5.85025C5.12094 5.62992 5.16637 5.24594 5.45049 5.08512L7.25391 4.06429C7.39983 3.98168 7.57884 3.97849 7.72774 4.05583L14.4372 7.54091C14.4381 7.54138 14.4391 7.54163 14.4401 7.54165C14.4411 7.54168 14.4422 7.54146 14.4431 7.54103L16.9659 6.36693C18.7954 5.51549 20.985 6.18364 21.9986 7.9022C21.9995 7.90369 21.9997 7.90548 21.9993 7.90715C21.9993 7.90715 21.9993 7.90715 21.9993 7.90715L8.38391 15.6142C7.19534 16.287 5.68996 16.0629 4.75868 15.0745Z';
/** Every coordinate of a path through `fn`. */
const mapPath = (d, fn) => d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, a, b) => {
  const q = fn([+a, +b]);
  return `${fmtN(q[0])} ${fmtN(q[1])}`;
});
const spin = (d, degs) => { const a = (degs * Math.PI) / 180, co = Math.cos(a), si = Math.sin(a);
  return mapPath(d, (q) => [12 + (q[0] - 12) * co - (q[1] - 10) * si, 10 + (q[0] - 12) * si + (q[1] - 10) * co]); };

const LANDING_BODY = (() => {
  const tall = (deg) => { const b = strokedBBox(spin(TAKEOFF_BODY, deg), 1, 'round'); return b[3] - b[1]; };
  let lo = 25, hi = 44;                                   // 14 units of ink, as takeoff paints
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (tall(m) < 14) lo = m; else hi = m; }
  const turned = spin(TAKEOFF_BODY, (lo + hi) / 2);
  const b = strokedBBox(turned, 1, 'round');
  return mapPath(turned, (q) => [q[0] + 12 - (b[0] + b[2]) / 2, q[1] + 3 - b[1]]);
})();

function planePair(body) {
  const BOX = [1, 3, 23, 21];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const rule = run([[2, 20], [22, 20]], sharp, [true, true], BOX);
    const fine = refineCubics(body);
    const plate = snapPath(trimInset(offsetPath(fine, 1), fine, 1));
    verifyOffset(fine, plate, 1, 0.02);
    const d = body + rule;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate), S(rule)];
  }
  return out;
}
SETS['plane-takeoff'] = () => planePair(TAKEOFF_BODY);
SETS['plane-landing'] = () => planePair(LANDING_BODY);
BOXES['plane-takeoff'] = [1, 3, 23, 21];
BOXES['plane-landing'] = [1, 3, 23, 21];



/* --- a stroked cubic as a closed capsule, for knocking out of a solid --- */

const bezAt = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u*u*u*k[0][i] + 3*u*u*t*k[1][i] + 3*u*t*t*k[2][i] + t*t*t*k[3][i]); };
const bezTan = (k, t) => { const u = 1 - t; return unit([0, 1].map((i) => 3*u*u*(k[1][i]-k[0][i]) + 6*u*t*(k[2][i]-k[1][i]) + 3*t*t*(k[3][i]-k[2][i]))); };
const leftOf = (t) => [t[1], -t[0]];
const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];

/**
 * One cubic offset by `d` to the left of travel, end tangents held and the two
 * handle lengths re-solved so the offset's midpoint lands on the true offset at
 * t = 0.5 — the emoji batch's construction. Offsetting the control points
 * instead leaves an error two orders of magnitude larger, and flattening first
 * returns the micro-segments this file spends a helper removing.
 */
function offsetCubic(k, d) {
  const t0 = unit(sub(k[1], k[0])), t1 = unit(sub(k[3], k[2]));
  const q0 = add(k[0], mul(leftOf(t0), d)), q3 = add(k[3], mul(leftOf(t1), d));
  const m = add(bezAt(k, 0.5), mul(leftOf(bezTan(k, 0.5)), d));
  const v = mul(sub(m, mul(add(q0, q3), 0.5)), 8 / 3);
  const nt1 = mul(t1, -1);
  const det = cross2(t0, nt1);
  return [q0, add(q0, mul(t0, cross2(v, nt1) / det)), sub(q3, mul(t1, cross2(t0, v) / det)), q3];
}
const revCubic = (k) => [k[3], k[2], k[1], k[0]];
const ang = (v) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** The painted capsule of a single stroked cubic, closed, ready to be a hole. */
function cubicCapsule(k, sharp, box = [1, 1, 23, 23]) {
  const out = unit(sub(k[0], k[1])), fwd = unit(sub(k[3], k[2]));
  const e0 = sharp ? sharpEndIn(k[0], out, box) : 0;
  const e1 = sharp ? sharpEndIn(k[3], fwd, box) : 0;
  const A = add(k[0], mul(out, e0)), B = add(k[3], mul(fwd, e1));
  const L = offsetCubic(k, 1), R = revCubic(offsetCubic(k, -1));
  const nA = leftOf(unit(sub(k[1], k[0]))), nB = leftOf(unit(sub(k[3], k[2])));
  const p = new Path().M(add(A, nA));
  if (sharp) p.L(L[0]); else p.L(L[0]);
  p.C(L[1], L[2], L[3]);
  if (sharp) { p.L(add(B, nB)); p.L(sub(B, nB)); p.L(R[0]); }
  // a half turn has no short way round: route each cap through the travel
  // direction, as segCapsule does, or the cap bulges backward over the body
  else p.A(k[3], ang(nB), ang(nB) + 180, 1);
  p.C(R[1], R[2], R[3]);
  if (sharp) { p.L(sub(A, nA)); p.L(add(A, nA)); }
  else p.A(k[0], ang(mul(nA, -1)), ang(mul(nA, -1)) + 180, 1);
  return p.Z().toString();
}

/* ------------------------------------------------------------- droplet */

/**
 * A drop, solved rather than written down: a body circle of radius `R` about
 * (12,`cy`), an apex at (12,`apexY`), and the two outer tangents between them.
 *
 * Rounded, the apex is an r=1 tip circle centred one below the point and the
 * tangents run to it, which is the construction the first drawing used and the
 * reason its corner stays on the ladder at every size. Sharp, the two tangents
 * are drawn to the circle itself and meet at the point.
 */
/**
 * The apex a MITRED sharp tip needs so it paints the box the rounded drop does.
 *
 * A de-filleted vertex normally paints at radius 1, which is the house join —
 * and on a drop that is the whole icon rounded off: the stroke gets away with
 * it because the white interior still comes to a point, the FILL does not, and
 * Zafar read it straight off as "droplet fill in sharp is rounded". A true
 * point is the `level` wedges' exception, a per-layer MITER, and it overshoots
 * the vertex by `d / R` rather than by 1 — so the apex comes IN by the
 * difference and the ink lands exactly where it did.
 */
const mitredApex = (cy, R, inkTop) => (inkTop + cy / R) / (1 + 1 / R);

function dropPath(cy, R, apexY, sharp) {
  const p = new Path();
  if (sharp) {
    apexY = mitredApex(cy, R, apexY - 1);
    const d0 = cy - apexY, L = Math.sqrt(d0 * d0 - R * R);
    const sn = R / d0, cs = L / d0;                    // the tangent's heading
    const T = [12 + L * sn, apexY + L * cs], TL = [24 - T[0], T[1]];
    return p.M(T).A([12, cy], ang(sub(T, [12, cy])), ang(sub(TL, [12, cy])), 1)
      .L([12, apexY]).L(T).Z().toString();
  }
  const tip = [12, apexY + 1], d0 = cy - tip[1];
  const ny = -(R - 1) / d0, nx = Math.sqrt(1 - ny * ny);
  const TB = [12 + R * nx, cy + R * ny], TBL = [24 - TB[0], TB[1]];
  const TA = [12 + nx, tip[1] + ny], TAL = [24 - TA[0], TA[1]];
  return p.M(TB).A([12, cy], ang(sub(TB, [12, cy])), ang(sub(TBL, [12, cy])), 1)
    .L(TAL).A(tip, ang(sub(TAL, tip)), ang(sub(TA, tip)), 1).L(TB).Z().toString();
}

/**
 * HIS DRAWING, 12 Sep 2026, third size and the one that stands.
 *
 * An r=7 circle about (12,14) with the two tangents to an r=1 tip circle on
 * (12,4), apex (12,3), so the ink is 4..20 by 2..22: 16 by 20, pads of 4 and 2,
 * WHOLE numbers on the grid. That is the point of it and it is what the two
 * earlier goes got wrong — r=8 was the ladder's vertical 18 by 22 and too
 * heavy beside the rest of the batch, and nine tenths of that came out at 3.80
 * of side padding, a number no icon in the set has.
 *
 * His own drawing is a hair elliptical, 7 across by 7.2 down, and the tip
 * corner is 0.86. Rebuilt on the construction: a true circle and the r=1 tip,
 * which lands every pad on an integer and keeps the corner on the ladder.
 *
 * The highlight is his, verbatim. Its painted gap to the body's inner edge is
 * 1.40, and it stays as drawn: it is a curve he drew by hand.
 */
const DROPLET_BODY = dropPath(14, 7, 3, false);
const DROPLET_SHARP = dropPath(14, 7, 3, true);

/**
 * HIS CALL, 12 Sep 2026: the drop carries NO inner curve.
 *
 * The family shipped a shine inside the bowl — a short arc following the
 * lower-right wall — and it did not survive the derivation. In duotone it is a
 * black mark on a grey that is the same drop, so it reads as a crack rather
 * than as a highlight; in fill it has to be knocked out, and a 2-wide slot
 * hanging in a solid teardrop reads as a chip out of the edge. Dropped, the
 * three styles are the three things they are meant to be: an outline, a grey
 * drop under it, and a solid. `droplets` and `droplet-off` lose theirs with it,
 * so the family is one drawing throughout.
 */
SETS['droplet'] = () => {
  const BOX = [4, 2, 20, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = sharp ? DROPLET_SHARP : DROPLET_BODY;
    // sharp's tip is a POINT: the stroke joins it with a mitre and the solid
    // takes the crossing of the two flanks rather than the arc an offset puts
    // over a vertex
    const plate = snapPath(sharp ? miterOffset(offsetPath(body, 1), body, 1) : offsetPath(body, 1));
    verifyOffset(body, plate, 1, 0.05);
    const join = sharp ? 'miter' : undefined;
    out[`stroke.${key}`] = [S(body, join)];
    out[`duotone.${key}`] = [P(plate), S(body, join)];
    out[`fill.${key}`] = [F_(plate)];
  }
  return out;
};
BOXES['droplet'] = [4, 2, 20, 22];

/* ---------------------------------------------------------------- leaf */

/**
 * HIS DRAWING, 12 Sep 2026, replacing the lens that was there.
 *
 * A leaf with a stalk: one closed body of four cubics, and a stalk that starts
 * INSIDE it at (12.5,14) and runs out to (3,21), so the two are a composite
 * rather than neighbours and nothing measures a gap between them. The fill
 * keeps the stalk as a stroke over the solid, which is what makes the midrib
 * read; knocked out it would cut the leaf in half.
 *
 * It was taken up to 22 for a while on a misread of "size issue", on the
 * argument that a diagonal shape empties the corners of its box. He sent it
 * back: a leaf is drawn at the SQUARE 20, ink 2..22 both ways, pads of 2 all
 * round. This is his own 12 Sep path at nine tenths, which lands the ink on
 * 2..22 to four decimals.
 *
 * **The stalk's tip leaves at 45 degrees, and that is the sharp variant's
 * doing.** Its round cap sets the leaf's LEFT and its BOTTOM at once, and a
 * butt cap has only two corners: at 45 degrees they land on both extremes
 * exactly, and at any other angle one of them falls short while the other
 * would paint outside the rounded cap. His exit was 24 degrees off the
 * vertical, which left sharp 0.4 short at the floor. The control point is his,
 * projected onto the 45-degree ray, so the curve keeps its shape and only the
 * last hair of it turns.
 */
const LEAF_BODY = 'M7.2784 17.9298C6.0328 15.8736 4.6092 11.144 8.88 8.6765C12.6338 6.5076 15.5004 8.0067 18.9941 3.1908C19.2226 2.8757 19.7335 2.969 19.8579 3.3373C21.2259 7.3899 21.9545 13.7344 18.5503 17.5014C14.2791 22.228 8.5181 20.0005 7.2784 17.9298Z';
const LEAF_STALK = 'M12.5003 14.0037C10.5004 18.5012 6.2492 17.7512 3.0003 21';

const LEAF_BOX = [2, 2, 22, 22];

SETS['leaf'] = () => {
  const BOX = LEAF_BOX;
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // only the stalk's outer end is free; its other end is buried in the body
    const stalk = sharp ? stubbed(LEAF_STALK, [false, true], BOX) : LEAF_STALK;
    const plate = snapPath(offsetPath(LEAF_BODY, 1));
    verifyOffset(LEAF_BODY, plate, 1, 0.05);
    const d = LEAF_BODY + stalk;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate), S(stalk)];
  }
  return out;
};
BOXES['leaf'] = LEAF_BOX;


/* ---------------------------------------------------------------- bike */

/**
 * HIS DRAWING, 12 Sep 2026, replacing the two-wheels-and-a-trapezoid that was
 * there — which read as a cart rather than a bicycle.
 *
 * Two wheels as rings of r=3.5 sitting in the bottom corners, a saddle, and a
 * frame that zigzags between them on small fillets. The wheels' centres are
 * forced once the radius is chosen: the ink floor puts them at 22 − 3.5 − 1 =
 * 17.5 and the side pads at 1 + 4.5 = 5.5 and 23 − 4.5 = 18.5. That is worth
 * writing down because those three numbers are also the reference set's, and
 * the multiply overlay scores 60 percent on the pair of circles alone while
 * the frame and the saddle share nothing; it is his drawing and his call.
 *
 * Its frame runs 0.93 from the right wheel, 1.02 from the left and 1.16 from
 * the saddle, all under the house 2. Rendered at 16px it still reads as a
 * bicycle, so the three warnings ride with the drawing rather than the drawing
 * being pulled apart to silence them.
 */
const BIKE = {
  wheelR: 'M18.5 21C20.433 21 22 19.433 22 17.5C22 15.567 20.433 14 18.5 14C16.567 14 15 15.567 15 17.5C15 19.433 16.567 21 18.5 21Z',
  wheelL: 'M5.5 21C7.43296 21 9 19.433 9 17.5C9 15.567 7.43296 14 5.5 14C3.56704 14 2 15.567 2 17.5C2 19.433 3.56704 21 5.5 21Z',
  saddle: 'M17 5C17.5523 5 18 4.55227 18 4C18 3.44772 17.5523 3 17 3C16.4477 3 16 3.44772 16 4C16 4.55227 16.4477 5 17 5Z',
  frame: 'M12 17L12.8981 13.4076C12.957 13.1719 12.8381 12.928 12.6161 12.8294L9.33021 11.369C8.97011 11.2089 8.92805 10.7146 9.25593 10.496L13.9757 7.34952C14.2437 7.17088 14.6082 7.28844 14.7212 7.58998L15.8783 10.6756C15.9515 10.8707 16.1381 11 16.3465 11H18.5',
};

SETS['bike'] = () => {
  const BOX = [1, 2, 23, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // the frame's corners are his own small fillets; sharp takes them out and
    // pulls each vertex in so both treatments paint one box, and squares the
    // two free ends
    let frame = BIKE.frame;
    if (sharp) {
      const sk = deFillet(skeletonOf(readSubpaths(BIKE.frame)[0]));
      const pts = sk.map((q) => q.p);
      const ends = sharpen([pts[0], pts[1]], [true, false], BOX)[0];
      const last = sharpen([pts[pts.length - 2], pts[pts.length - 1]], [false, true], BOX)[1];
      frame = runPath([{ p: ends, r: 0 }, ...sk.slice(1, -1), { p: last, r: 0 }]).toString();
    }
    const rings = BIKE.wheelR + BIKE.wheelL + BIKE.saddle;
    // a ring's counter is not interior detail, so the wheels and the saddle
    // fill solid; the frame stays a stroke over them, the way `truck` keeps
    // its cab and `chart-scatter-bubble` its axis
    const discs = [[[18.5, 17.5], 4.5], [[5.5, 17.5], 4.5], [[17, 4], 2]]
      .map(([c, r]) => circlePath(c, r)).join('');
    const d = rings + frame;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(discs), S(d)];
    out[`fill.${key}`] = [F_(discs), S(frame)];
  }
  return out;
};
BOXES['bike'] = [1, 2, 23, 22];


/* -------------------------------------------------------- wind-turbine */

/**
 * HIS DRAWING, 12 Sep 2026, dropped into `refs/` after two goes of mine.
 *
 * The rotor is the one I had solved and he kept: a ring hub of r=2.5 at
 * (12,9.5) with three blades from r=3.5 to r=7.5 at 120 degrees, so the up one
 * tips at (12,2); the mast leaves the ring's own ink edge at y=13 and runs to
 * the ground. Two things are his and both are better.
 *
 * **The motion arcs.** I had ruled them out on arithmetic: a blade's ink
 * reaches 8.5 from the hub, so an arc OUTSIDE the rotor needs a path radius of
 * 10.5 and its ink would leave the grid. He put them at r=8, which is inside
 * that reach, and ran them through the EMPTY sectors between the blades, where
 * the only thing they have to clear is the blade on either side. The answer
 * was never the radius, it was which 60 degrees of the circle to draw.
 *
 * Their ends are solved rather than placed, at the house 2 from what each one
 * runs into, 4 centre to centre. Toward the up blade that is the blade's LINE
 * and not its tip, and the distance from the hub's vertical is 8cos(theta), so
 * the answer comes out at a flat 60 degrees. Toward a lower blade it is the
 * TIP, which the cosine rule puts at 29.72 degrees off that blade, leaving
 * the arc 0.2795 short of the horizontal.
 *
 * **The narrower base.** His rule runs 5 to 19 rather than my 2 to 22, and
 * with the arcs drawn the ink no longer needs the corners: 3..21 by 1..23, the
 * ladder's vertical 18 by 22, which is what a tower on a footing should be.
 *
 * The mast and each lower blade leave the ring 60 degrees apart, so they part
 * at 1.5 rather than the house 2 where they emerge; both are buried in the
 * ring's ink at that point and the daylight only opens outside it. That, and
 * the blades meeting the ring at all, are the warnings it carries.
 */
SETS['wind-turbine'] = () => {
  const HUB = [12, 9.5], R = 2.5, ARC = 8, TIP = 7.5, BOX = [3, 1, 21, 23];
  const rad = (a) => (a * Math.PI) / 180;
  const deg = (a) => (a * 180) / Math.PI;
  const on = (r, a) => [HUB[0] + r * Math.cos(rad(a)), HUB[1] + r * Math.sin(rad(a))];
  // the cosine rule for the angle off a blade at which the arc is 4 from its tip
  const dA = deg(Math.acos((ARC * ARC + TIP * TIP - 16) / (2 * ARC * TIP)));
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // The inner ends are T-junctions into the ring, and SHARP has to start them
    // a unit further in. A round cap centred on the ring's outer edge at 3.5
    // reaches back to 2.5 and fills the join; a butt cap there is a chord
    // TANGENT to that edge, so it meets the ring at one point and leaves an
    // empty wedge either side of every blade. Starting the sharp arms on the
    // ring's own centre line at 2.5 paints exactly what the round cap painted.
    const rIn = sharp ? R : R + 1;
    const blades = [270, 30, 150].map((a) => run([on(rIn, a), on(TIP, a)], sharp, [false, true], BOX)).join('');
    const mast = run([[12, HUB[1] + rIn], [12, 22]], sharp, [false, false], BOX);
    const ground = run([[5, 22], [19, 22]], sharp, [true, true], BOX);
    const arc = (a0, a1) => {
      const d = new Path().M(on(ARC, a0)).A(HUB, a0, a1, a1 > a0 ? 1 : -1).toString();
      return sharp ? stubbed(d, [true, true], BOX) : d;
    };
    const arcs = arc(-60, 30 - dA) + arc(150 + dA, 240);
    const ring = circlePath(HUB, R);
    const d = blades + mast + ground + arcs + ring;
    // the ring is the only closed region, so it is what the filled styles have
    // to work with: its counter is not interior detail, so it fills solid
    const disc = circlePath(HUB, R + 1);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(disc), S(d)];
    out[`fill.${key}`] = [F_(disc), S(blades + mast + ground + arcs)];
  }
  return out;
};
BOXES['wind-turbine'] = [3, 1, 21, 23];


/**
 * Every LONG cubic of `d` cut down to pieces of `max` across: the same curve,
 * offset far better.
 *
 * `offsetPath` fits ONE cubic to each offset segment, and its error grows with
 * the segment's length and curvature. On the bird's body that error put the
 * plate 0.006 outside the drawing it came from, which the padding check reads
 * as an icon touching the edge.
 *
 * The cut is by LENGTH with a floor of two, and both halves of that are paid
 * for: by length alone the bird's tail tip is a single short cubic that turns
 * 180 degrees, and it came back 0.006 wide; at a flat two the long body curves
 * were still not enough. Two is the floor because the shortest thing here is a
 * 0.5 fillet, whose halves the offsetter still fits cleanly.
 */
function refineCubics(d, max = 1.5) {
  const f = (v) => String(Math.round(v * 1e5) / 1e5);
  const cut = (k, t) => {
    const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), p = L(p012, p123);
    return [[k[0], p01, p012, p], [p, p123, p23, k[3]]];
  };
  const t = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  let i = 0, cur = null, out = '';
  while (i < t.length) {
    const c = t[i++];
    if (c === 'M') { cur = [+t[i++], +t[i++]]; out += `M${f(cur[0])} ${f(cur[1])}`; }
    else if (c === 'L') { const q = [+t[i++], +t[i++]]; out += `L${f(q[0])} ${f(q[1])}`; cur = q; }
    else if (c === 'C') {
      let k = [cur, [+t[i++], +t[i++]], [+t[i++], +t[i++]], [+t[i++], +t[i++]]];
      // the control polygon bounds the curve, so its length is the safe ruler
      let hull = 0;
      for (let j = 1; j < 4; j++) hull += Math.hypot(k[j][0] - k[j - 1][0], k[j][1] - k[j - 1][1]);
      const n = Math.max(2, Math.ceil(hull / max));
      for (let j = n; j > 1; j--) { const [a, b] = cut(k, 1 / j); out += `C${a.slice(1).map((q) => `${f(q[0])} ${f(q[1])}`).join(' ')}`; k = b; }
      out += `C${k.slice(1).map((q) => `${f(q[0])} ${f(q[1])}`).join(' ')}`;
      cur = k[3];
    } else if (c === 'Z' || c === 'z') out += 'Z';
    else throw new Error(`refineCubics: unhandled ${c}`);
  }
  return out;
}

/**
 * A closed path cut clear of a disc, and closed again along that disc.
 *
 * The move `droplets` makes, written once: a MODIFIER standing over a body
 * does not sit on a full plate, it takes a bite out of it, and the bite is the
 * arc that holds the house gap all the way round. Pass the modifier's centre
 * and its painted radius plus 2, and what comes back is the plate with that
 * arc in place of everything the disc covered.
 */
/**
 * A closed path cut by a half plane, kept where `dot(q - P, n) <= 0` and
 * bridged with the straight line the cut leaves behind.
 *
 * This is what squares a SHARP plate's end. An offset puts a round join at a
 * convex corner, so a plate built on a butt-capped stroke still comes to the
 * cut wearing the rounded cap's bulge and a unit of grey stands past the black
 * bar. Offsetting a run extended past the cut and then planing it off at the
 * cut leaves the flat face the butt cap paints.
 */
/**
 * The run of a CLOSED segment list between the samples nearest `P` and `Q`,
 * taking whichever way round `keep` holds for.
 */
function runBetweenNearest(segs, P, Q, keep = () => true) {
  const find = (T) => { let best = [0, 0, Infinity];
    segs.forEach((g, i) => { for (let u = 0; u <= 600; u++) { const e = len(sub(segAt(g, u / 600), T)); if (e < best[2]) best = [i, u / 600, e]; } });
    return best; };
  const a = find(P), b = find(Q);
  // cut the contour at both marks, then walk from a to b the long and short way
  const cut = [];
  segs.forEach((g, i) => {
    const ts = [];
    if (i === a[0]) ts.push(a[1]);
    if (i === b[0]) ts.push(b[1]);
    ts.sort((x, y) => x - y);
    let rest = g, base = 0;
    for (const t of ts) { if (t <= base + 1e-9 || t >= 1 - 1e-9) continue;
      const [x, y] = segSplit(rest, (t - base) / (1 - base)); cut.push({ g: x, mark: true }); rest = y; base = t; }
    cut.push({ g: rest, mark: ts.some((t) => t >= 1 - 1e-9) });
  });
  const isAt = (pt, T) => len(sub(pt, T)) < 1e-6;
  const pieces = cut.map((c) => c.g);
  const starts = pieces.map((g) => startOf(g));
  const iA = starts.findIndex((q) => isAt(q, segAt(segs[a[0]], a[1])));
  const iB = starts.findIndex((q) => isAt(q, segAt(segs[b[0]], b[1])));
  if (iA < 0 || iB < 0) return [];
  const walk = (from, to) => { const out = []; for (let k = from; k !== to; k = (k + 1) % pieces.length) out.push(pieces[k]); return out; };
  const one = walk(iA, iB), two = walk(iB, iA);
  const okRun = (run) => run.length && keep(segAt(run[Math.floor(run.length / 2)], 0.5));
  return okRun(one) ? one : (okRun(two) ? two : one);
}

/** A path truncated at the point nearest `Q`. */
function truncAt(d, Q) {
  const t = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const bez = (k, u) => { const w = 1 - u; return [0, 1].map((j) => w ** 3 * k[0][j] + 3 * w * w * u * k[1][j] + 3 * w * u * u * k[2][j] + u ** 3 * k[3][j]); };
  const cutC = (k, u) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), q = L(p012, p123);
    return [k[0], p01, p012, q]; };
  const segs = []; let i = 0, cur = null, st = null;
  while (i < t.length) { const c = t[i++];
    if (c === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
    else if (c === 'L') { const z = [+t[i++], +t[i++]]; segs.push({ L: [cur, z] }); cur = z; }
    else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]]; segs.push({ k: [cur, a, b, z] }); cur = z; }
    else { cur = st; } }
  const at = (g, u) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * u, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * u] : bez(g.k, u));
  let best = [0, 0, Infinity];
  segs.forEach((g, j) => { for (let u = 0; u <= 400; u++) { const e = len(sub(at(g, u / 400), Q)); if (e < best[2]) best = [j, u / 400, e]; } });
  const [j, u] = best;
  const keep = segs.slice(0, j);
  if (u > 1e-6) keep.push(segs[j].L ? { L: [segs[j].L[0], at(segs[j], u)] } : { k: cutC(segs[j].k, u) });
  const p = new Path().M(keep[0].L ? keep[0].L[0] : keep[0].k[0]);
  for (const g of keep) { if (g.L) p.L(g.L[1]); else p.C(g.k[1], g.k[2], g.k[3]); }
  return p.toString();
}

/**
 * An OUTWARD offset's join arcs turned back into corners.
 *
 * `offsetPath` puts an arc of the offset distance over every convex vertex,
 * which is what a round join paints and is right for the rounded half. A SHARP
 * drawing's vertex is a point, and its fill is the outline of that point, so
 * the arc has to become the crossing of the two edges either side — the same
 * rule the sharp converter has for a de-filleted corner. Without it every sharp
 * drop in the set came out of the fill with a rounded tip while its own stroke
 * ended in a point.
 */
function miterOffset(d, srcD, delta) {
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const c = t[i++];
      if (c === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (c === 'L') { const q = [+t[i++], +t[i++]]; out.push({ L: [cur, q] }); cur = q; }
      else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], q = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, q] }); cur = q; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  const dir4 = (g, t) => { const e = 1e-4; return unit(sub(at4(g, Math.min(1, t + e)), at4(g, Math.max(0, t - e)))); };
  const ext = (g, t) => (g.L
    ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t]
    : bez4(g.k, t));
  // the source's own corners: a junction where the tangent jumps
  const src = walk(srcD), corners = [];
  for (let i = 0; i < src.length; i++) {
    const a = src[i], b = src[(i + 1) % src.length];
    if (len(sub(at4(a, 1), at4(b, 0))) > 1e-6) continue;
    if (len(sub(dir4(a, 1), dir4(b, 0))) > 2e-3) corners.push(at4(a, 1));
  }
  if (!corners.length) return d;
  let segs = walk(d);
  for (const V of corners) {
    // A join arc is a segment every sample of which stands `delta` from the
    // vertex. The tolerance is 0.01 rather than 0.002 because the arc is a
    // CUBIC approximation of it: at 90 degrees that costs 3e-4 of radius and
    // 0.002 is plenty, but `offsetPath` emits one cubic for a turn of any
    // angle, and droplet-off's slash-side corner turns 127, where the same
    // approximation is out by 0.004. At 0.002 that corner was not recognised
    // as a join at all and the sharp fill kept a round blob where its own
    // stroke ends flat, which is what he pointed at.
    const isJoin = (g) => {
      for (let i = 0; i <= 8; i++) if (Math.abs(len(sub(at4(g, i / 8), V)) - delta) > 1e-2) return false;
      return true;
    };
    const j = segs.findIndex(isJoin);
    if (j < 0) continue;
    let k = j;
    while (k + 1 < segs.length && isJoin(segs[k + 1])) k++;
    const A = segs[(j - 1 + segs.length) % segs.length], B = segs[(k + 1) % segs.length];
    let best = [1, 0, Infinity];
    for (let x = 0; x <= 300; x++) for (let y = 0; y <= 300; y++) {
      const ta = 1 + (x / 300) * 0.8, tb = -(y / 300) * 0.8;
      const e = len(sub(ext(A, ta), ext(B, tb)));
      if (e < best[2]) best = [ta, tb, e];
    }
    let [ta, tb] = best, step = 0.003;
    for (let n = 0; n < 40; n++) { step /= 2;
      for (const [da, db] of [[step, 0], [-step, 0], [0, step], [0, -step], [step, step], [-step, -step], [step, -step], [-step, step]]) {
        const e = len(sub(ext(A, ta + da), ext(B, tb + db)));
        if (e < best[2]) { best = [ta + da, tb + db, e]; ta += da; tb += db; } } }
    if (best[2] > 0.02) continue;                  // no crossing: leave the arc
    const cutC = (kk, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      const p01 = L(kk[0], kk[1]), p12 = L(kk[1], kk[2]), p23 = L(kk[2], kk[3]);
      const p012 = L(p01, p12), p123 = L(p12, p23), q = L(p012, p123);
      return [[kk[0], p01, p012, q], [q, p123, p23, kk[3]]]; };
    const newA = A.L ? { L: [A.L[0], ext(A, ta)] } : { k: cutC(A.k, ta)[0] };
    const newB = B.L ? { L: [ext(B, tb), B.L[1]] } : { k: cutC(B.k, tb)[1] };
    const out = [];
    for (let i = 0; i < segs.length; i++) {
      if (i >= j && i <= k) continue;
      out.push(i === (j - 1 + segs.length) % segs.length ? newA : (i === (k + 1) % segs.length ? newB : segs[i]));
    }
    segs = out;
  }
  const p = new Path().M(segs[0].L ? segs[0].L[0] : segs[0].k[0]);
  for (let i = 0; i < segs.length; i++) {
    const g = segs[i];
    const prev = segs[(i - 1 + segs.length) % segs.length];
    if (i && len(sub(g.L ? g.L[0] : g.k[0], prev.L ? prev.L[1] : prev.k[3])) > 1e-6) p.L(g.L ? g.L[0] : g.k[0]);
    if (g.L) p.L(g.L[1]); else p.C(g.k[1], g.k[2], g.k[3]);
  }
  return p.Z().toString();
}

/** Is `q` inside the closed path `d`? Ray casting on its flattened form. */
function insidePath(d, q) {
  const t = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  const poly = []; let i = 0, cur = null, st = null;
  const bez = (k, u) => { const w = 1 - u; return [0, 1].map((j) => w ** 3 * k[0][j] + 3 * w * w * u * k[1][j] + 3 * w * u * u * k[2][j] + u ** 3 * k[3][j]); };
  while (i < t.length) { const c = t[i++];
    if (c === 'M') { cur = [+t[i++], +t[i++]]; st = cur; poly.push(cur); }
    else if (c === 'L') { cur = [+t[i++], +t[i++]]; poly.push(cur); }
    else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]];
      for (let u = 1; u <= 12; u++) poly.push(bez([cur, a, b, z], u / 12)); cur = z; }
    else { cur = st; } }
  let n = false;
  for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
    const p1 = poly[a], p2 = poly[b];
    if ((p1[1] > q[1]) !== (p2[1] > q[1]) && q[0] < ((p2[0] - p1[0]) * (q[1] - p1[1])) / (p2[1] - p1[1]) + p1[0]) n = !n;
  }
  return n;
}
/** The lateral direction at a cut end that leaves the shape `src` encloses. */
function outwardAt(src, P, t) {
  const m = [t[1], -t[0]];
  const probe = (k) => add(add(P, mul(t, -0.35)), mul(m, 0.45 * k));
  return insidePath(src, probe(1)) ? mul(m, -1) : m;
}

/** The centre of the circle through three points. */
function circumcentre(A, B, C) {
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
  const a = A[0] * A[0] + A[1] * A[1], b = B[0] * B[0] + B[1] * B[1], c = C[0] * C[0] + C[1] * C[1];
  return [(a * (B[1] - C[1]) + b * (C[1] - A[1]) + c * (A[1] - B[1])) / d,
    (a * (C[0] - B[0]) + b * (A[0] - C[0]) + c * (B[0] - A[0])) / d];
}
/** Which way round the circle takes A to B through M. */
function turnOf(c, A, M, B) {
  const a = ang(sub(A, c)), m = ang(sub(M, c)), b = ang(sub(B, c));
  const fwd = (from, to) => { let d = to - from; while (d <= 0) d += 360; return d; };
  return fwd(a, m) < fwd(a, b) ? 1 : -1;
}

/**
 * The half disc a ROUND cap paints past a free end, taken off a solid so what
 * is left is what a BUTT cap paints.
 *
 * The window is the cap's own radius and nothing wider. That is the whole
 * difference from `clipPlane`, which works on a plate whose band carries on
 * past the end and so has to guess how far the cap's business reaches: here
 * the solid's boundary beyond the cut face is either the cap, which is exactly
 * `half` from the end, or the drawing's own edge, which is further off. The
 * droplets' bite is tangent to that circle 0.84 beyond the face, so it comes
 * through untouched and the cut lands on the tangency, which is where the bar
 * ends.
 */
function clipCap(d, P, n, half = 1) {
  return clipByOk(d, (q) => { const v = sub(q, P);
    return !(v[0] * n[0] + v[1] * n[1] > 1e-9 && len(v) < half + 1e-9); });
}

/**
 * A ROUND cap turned into a BUTT one, on a solid that already has the right
 * edges everywhere else.
 *
 * The cap is the only stretch of the boundary that stands at exactly the half
 * width from the free end for its whole length — the same signature
 * `miterOffset` reads a join by — so it can be found and replaced by the chord
 * across it, which is the flat face. Cutting with a plane instead is what went
 * wrong twice here: a plane through the end amputates the bite, which runs on
 * past the face, and a plane windowed by the cap's own radius leaves a shoulder
 * of it standing wherever the boundary crosses the window twice.
 */
function buttCap(d, P, half = 1) {
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const q = t[i++];
      if (q === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (q === 'L') { const z = [+t[i++], +t[i++]]; out.push({ L: [cur, z] }); cur = z; }
      else if (q === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, z] }); cur = z; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  const segs = walk(d);
  const onCap = (g) => { for (let i = 0; i <= 8; i += 1) if (Math.abs(len(sub(at4(g, i / 8), P)) - half) > 1e-2) return false; return true; };
  const n = segs.length;
  let start = -1;
  for (let i = 0; i < n; i += 1) if (onCap(segs[i]) && !onCap(segs[(i - 1 + n) % n])) { start = i; break; }
  if (start < 0) return d;
  let end = start;
  while (onCap(segs[(end + 1) % n]) && (end + 1) % n !== start) end += 1;
  const keep = [];
  for (let k = end + 1; k < end + 1 + n; k += 1) { const i = k % n;
    if ((k - (end + 1)) >= n - (end - start + 1)) break;
    keep.push(segs[i]);
  }
  const S = (g) => (g.L ? g.L[0] : g.k[0]), E = (g) => (g.L ? g.L[1] : g.k[3]);
  let out = `M${fmtN(S(keep[0])[0])} ${fmtN(S(keep[0])[1])}`;
  for (const g of keep) out += g.L
    ? `L${fmtN(g.L[1][0])} ${fmtN(g.L[1][1])}`
    : `C${fmtN(g.k[1][0])} ${fmtN(g.k[1][1])} ${fmtN(g.k[2][0])} ${fmtN(g.k[2][1])} ${fmtN(g.k[3][0])} ${fmtN(g.k[3][1])}`;
  return `${out}L${fmtN(S(keep[0])[0])} ${fmtN(S(keep[0])[1])}Z`;
}

function clipPlane(d, P, n, away) {
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const cutC = (k, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), q = L(p012, p123);
    return [[k[0], p01, p012, q], [q, p123, p23, k[3]]]; };
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const q = t[i++];
      if (q === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (q === 'L') { const z = [+t[i++], +t[i++]]; out.push({ L: [cur, z] }); cur = z; }
      else if (q === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, z] }); cur = z; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  // What a butt cap fails to paint is the OUTER QUARTER of the disc a round cap
  // would have painted: beyond the cut face AND outside the stroke, 90 degrees
  // of it. Everything else the offset puts there is either the bar itself or
  // the drawing's own interior carrying on past the end, which a half plane
  // through the cut would take away with it — the bank's mouth runs past its
  // lips, and planed flat it lost a bite of grey it was right to have.
  //
  // `away` is the lateral direction that leaves the drawing; the caller reads it
  // off the source contour, since the plate alone cannot tell inside from out.
  const ok = (q) => {
    const v = sub(q, P);
    if (len(v) > 2.6) return true;
    return !(v[0] * n[0] + v[1] * n[1] > 0 && v[0] * away[0] + v[1] * away[1] > 0);
  };
  return clipByOk(d, ok);
}

/** A path cut down to the parts where `ok` holds, closed up again. */
function clipByOk(d, ok) {
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const cutC = (k, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), q = L(p012, p123);
    return [[k[0], p01, p012, q], [q, p123, p23, k[3]]]; };
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const q = t[i++];
      if (q === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (q === 'L') { const z = [+t[i++], +t[i++]]; out.push({ L: [cur, z] }); cur = z; }
      else if (q === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, z] }); cur = z; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  const keep = [];
  for (const g of walk(d)) {
    const ts = [];
    for (let i = 0; i < 120; i++) { let a = i / 120, b = (i + 1) / 120;
      if (ok(at4(g, a)) !== ok(at4(g, b))) { for (let k2 = 0; k2 < 40; k2++) { const m = (a + b) / 2; if (ok(at4(g, a)) === ok(at4(g, m))) a = m; else b = m; } ts.push((a + b) / 2); } }
    let lo = 0;
    for (const t of [...ts, 1]) {
      if (t - lo > 1e-9 && ok(at4(g, (lo + t) / 2)))
        keep.push(g.L ? { L: [at4(g, lo), at4(g, t)] } : { k: cutC(cutC(g.k, t)[0], t > 0 ? lo / t : 0)[1] });
      lo = t;
    }
  }
  if (!keep.length) throw new Error('clipPlane: nothing survived');
  const S = (g) => (g.L ? g.L[0] : g.k[0]), E = (g) => (g.L ? g.L[1] : g.k[3]);
  let at0 = 0;
  for (let i = 0; i < keep.length; i++) if (len(sub(E(keep[(i + keep.length - 1) % keep.length]), S(keep[i]))) > 1e-6) { at0 = i; break; }
  const run = keep.slice(at0).concat(keep.slice(0, at0));
  let out = `M${fmtN(S(run[0])[0])} ${fmtN(S(run[0])[1])}`;
  for (let i = 0; i < run.length; i++) {
    const g = run[i];
    if (i && len(sub(S(g), E(run[i - 1]))) > 1e-6) out += `L${fmtN(S(g)[0])} ${fmtN(S(g)[1])}`;
    out += g.L
      ? `L${fmtN(g.L[1][0])} ${fmtN(g.L[1][1])}`
      : `C${fmtN(g.k[1][0])} ${fmtN(g.k[1][1])} ${fmtN(g.k[2][0])} ${fmtN(g.k[2][1])} ${fmtN(g.k[3][0])} ${fmtN(g.k[3][1])}`;
  }
  return `${out}Z`;
}

function clipFromDisc(d, c, r) {
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const cutC = (k, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), p = L(p012, p123);
    return [[k[0], p01, p012, p], [p, p123, p23, k[3]]]; };
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const q = t[i++];
      if (q === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (q === 'L') { const z = [+t[i++], +t[i++]]; out.push({ L: [cur, z] }); cur = z; }
      else if (q === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], z = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, z] }); cur = z; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  const ok = (q) => len(sub(q, c)) >= r;
  const keep = [];
  for (const g of walk(d)) {
    const ts = [];
    for (let i = 0; i < 60; i++) { let a = i / 60, b = (i + 1) / 60;
      if (ok(at4(g, a)) !== ok(at4(g, b))) { for (let k2 = 0; k2 < 30; k2++) { const m = (a + b) / 2; if (ok(at4(g, a)) === ok(at4(g, m))) a = m; else b = m; } ts.push((a + b) / 2); } }
    let lo = 0;
    for (const t of [...ts, 1]) {
      if (t - lo > 1e-6 && ok(at4(g, (lo + t) / 2)))
        keep.push(g.L ? { L: [at4(g, lo), at4(g, t)] } : { k: cutC(cutC(g.k, t)[0], t > 0 ? lo / t : 0)[1] });
      lo = t;
    }
  }
  if (!keep.length) throw new Error('clipFromDisc: nothing survived');
  const S = (g) => (g.L ? g.L[0] : g.k[0]), E = (g) => (g.L ? g.L[1] : g.k[3]);
  let at0 = 0;
  for (let i = 0; i < keep.length; i++) if (len(sub(E(keep[(i + keep.length - 1) % keep.length]), S(keep[i]))) > 1e-6) { at0 = i; break; }
  const run = keep.slice(at0).concat(keep.slice(0, at0));
  const A = S(run[0]), B = E(run[run.length - 1]);
  let out = `M${fmtN(A[0])} ${fmtN(A[1])}`;
  for (const g of run) out += g.L
    ? `L${fmtN(g.L[1][0])} ${fmtN(g.L[1][1])}`
    : `C${fmtN(g.k[1][0])} ${fmtN(g.k[1][1])} ${fmtN(g.k[2][0])} ${fmtN(g.k[2][1])} ${fmtN(g.k[3][0])} ${fmtN(g.k[3][1])}`;
  // the bridge is the way round the disc that runs INSIDE what was cut away
  const poly = [];
  for (const g of walk(d)) for (let i = 0; i <= 200; i++) poly.push(at4(g, i / 200));
  const inside = (q) => { let n = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j];
      if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < ((b[0] - a[0]) * (q[1] - a[1])) / (b[1] - a[1]) + a[0]) n = !n; }
    return n; };
  const onC = (deg) => [c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] + r * Math.sin((deg * Math.PI) / 180)];
  const mid = (dir) => { let e = ang(A); if (dir > 0) { while (e <= ang(sub(B, c))) e += 360; } else { while (e >= ang(sub(B, c))) e -= 360; } return onC((ang(sub(B, c)) + e) / 2); };
  const aA = ang(sub(A, c)), aB = ang(sub(B, c));
  const midAt = (dir) => { let e = aA; if (dir > 0) { while (e <= aB) e += 360; } else { while (e >= aB) e -= 360; } return onC((aB + e) / 2); };
  const dir = inside(midAt(1)) ? 1 : -1;
  const p = new Path().M(B).A(c, aB, aA, dir);
  return out + p.toString().replace(/^M[^CLAZ]*/, '') + 'Z';
}

/* ------------------------------------------------ pig and piggy-bank */

/**
 * HIS DRAWINGS, 12 Sep 2026. `piggy-bank` replaces the slotted box that was
 * there and `pig` is a new name he drew beside it, the same animal without the
 * bank: a body in one closed run with the ear, the snout, the two legs and the
 * belly, a curly tail that starts ON the body at (4.075,11.99) and a filled
 * r=1 eye.
 *
 * The pig is his drawing scaled 1.000829 in Y about the floor at y=21. One
 * point sat off the grid — the ear's corner at 3.0149, which put the top pad
 * at 2.01 — and spreading 0.015 over the whole height is invisible where
 * moving that one corner is not. Ink 1..23 by 2..22.
 *
 * **The bank's back is OPEN, and that is the whole icon**: the outline stops
 * at (13.074,6) and picks up again at (3.414,9), with the coin hanging over
 * the gap. A plate has to close it, and the closure is not invented: it is his
 * PIG's own back cubic carried onto the bank's two ends by the similarity that
 * maps one chord to the other, so the filled bank has the back the pig has.
 * Ink 1..23 both ways, the coin's own ink topping it out at 1.
 *
 * Neither is re-filleted for sharp. Both bodies are free cubics carrying 0.5
 * corners that nothing here can unpick without redrawing them, which is the
 * ruling `leaf` and `bird` already stand on: sharp differs in the caps and in
 * the stub the tail and the bank's two open ends take.
 */
const PIG = {
  body: 'M4.0749 11.9925C4.0749 15.1509 5.0194 17.021 6.8228 18.0115C6.9918 18.1044 7.1038 18.2783 7.1038 18.4713L7.1038 20.4996C7.1038 20.7759 7.3277 21 7.6038 21L9.4673 21C9.6348 21 9.7912 20.916 9.8838 20.7763L11.474 18.3792C11.5666 18.2395 11.723 18.1555 11.8905 18.1555L12.2975 18.1555C12.4651 18.1555 12.6214 18.2395 12.7141 18.3791L14.3043 20.7763C14.3969 20.916 14.5533 21 14.7208 21L16.5346 21C16.8107 21 17.0346 20.7759 17.0346 20.4996L17.0346 17.7846C17.0346 17.5421 17.2111 17.3363 17.4468 17.28C20.0664 16.6559 20.09 14.9685 20.0359 13.914C20.0217 13.638 20.2377 13.4148 20.5138 13.4148L21.5 13.4148C21.7761 13.4148 22 13.1907 22 12.9144L22 11.0708C22 10.7944 21.7761 10.5704 21.5 10.5704L20.5407 10.5704C20.2543 10.5704 20.0284 10.3298 20.0264 10.0431C20.0161 8.5618 19.5959 7.4312 18.5591 6.9149C18.3666 6.8191 18.2263 6.6327 18.2263 6.4175L18.2263 3.4855C18.2263 3.2091 18.0019 2.9831 17.7263 3.001C15.7712 3.1278 14.6975 3.9882 14.2076 4.6549C14.0711 4.8405 13.8418 4.9478 13.6162 4.9013C8.9271 3.9337 5.942 6.152 4.5466 9.5102C4.2408 10.2462 4.0749 11.0754 4.0749 11.9925Z',
  tail: 'M4.0749 11.9925C3.1315 11.6765 1.4333 10.3807 2.1881 7.7258',
  eye: [16, 9.5],
};

SETS['pig'] = () => {
  const BOX = [1, 2, 23, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // the tail dies in the body at one end and curls free at the other
    const tail = sharp ? stubbed(PIG.tail, [false, true], BOX) : PIG.tail;
    const fine = refineCubics(PIG.body);
    const plate = snapPath(trimInset(offsetPath(fine, 1), fine, 1));
    verifyOffset(fine, plate, 1, 0.02);
    const eye = circlePath(PIG.eye, 1);
    const d = PIG.body + tail;
    out[`stroke.${key}`] = [S(d), F_(eye)];
    out[`duotone.${key}`] = [P(plate), S(d), F_(eye)];
    out[`fill.${key}`] = [F_(plate + holeAgainst(plate, eye)), S(tail)];
  }
  return out;
};
BOXES['pig'] = [1, 2, 23, 22];

/**
 * HIS TWO PLATES, 12 Sep 2026, from `refs/piggy-bank-duotone-rounded.svg` and
 * `refs/piggy-bank-duotone-sharp.svg`, applied as they came.
 *
 * The bank's back is open and a plate has to close it, and every closure solved
 * here was wrong: an arc bulged for clearance, an arc about the coin at the far
 * lip's radius, then his earlier cubic carried onto the sharp bar. He drew both
 * treatments out instead, so they are constants. The rounded one is the body
 * plate and the coin's own disc; the sharp one is a single path carrying both,
 * and its mouth leaves the tail on the BAR the butt cap paints — a straight run
 * from the offset's end to (4.2236,9.5869) before the curve starts, which is
 * why nothing here needs a cap arc or a face to cut on.
 *
 * Nothing derives them and nothing checks them against a clearance: SPACING
 * reports what they measure and that is his answer, not a fault.
 */
const PIGGY_PLATE = {
  regular: 'M12.2064 5.5027C12.3515 5.2496 12.5572 4.9788 12.8253 4.7134C13.095 4.4464 13.4326 4.1802 13.845 3.9401C14.2577 3.6997 14.7434 3.4865 15.3083 3.3242C15.8731 3.162 16.5141 3.0515 17.2375 3.014C17.6708 2.9916 18.0649 3.16 18.3439 3.4344C18.6209 3.7069 18.7895 4.0872 18.7895 4.5V7.12074C19.2109 7.34267 19.5695 7.63568 19.8613 7.9924C20.2066 8.4145 20.4387 8.9011 20.5849 9.4165C20.6903 9.78793 20.7523 10.1783 20.7802 10.579H21.5C21.9139 10.579 22.2902 10.7479 22.5606 11.0183C22.831 11.2886 23 11.665 23 12.079V13.9211C23 14.3351 22.831 14.7114 22.5606 14.9817C22.2903 15.2521 21.914 15.4211 21.5 15.4211H20.8208C20.8179 15.5817 20.8078 15.7538 20.7852 15.932C20.7324 16.3489 20.6096 16.8156 20.342 17.2746C20.0719 17.7381 19.6758 18.1562 19.128 18.5C18.6708 18.7869 18.1185 19.0157 17.4598 19.1837V21.5C17.4598 21.9139 17.2909 22.2902 17.0206 22.5606C16.7502 22.831 16.3738 23 15.9598 23H13.8308C13.5932 23 13.3624 22.9436 13.156 22.8396C12.9496 22.7356 12.7669 22.5838 12.6255 22.3928L10.9699 20.1579H10.9247L9.2693 22.3928C9.1279 22.5837 8.9453 22.7355 8.7388 22.8396C8.5323 22.9437 8.3015 23 8.0639 23H5.8795C5.4655 23 5.0892 22.831 4.8189 22.5606C4.5486 22.2903 4.3795 21.914 4.3795 21.5V19.7849C4.08519 19.6255 3.80596 19.4466 3.5433 19.2464C3.204 18.9879 2.8949 18.6958 2.6185 18.3682C2.3421 18.0407 2.1013 17.6813 1.8962 17.2901C1.6912 16.8992 1.5232 16.4792 1.3904 16.0309C1.2577 15.5828 1.1602 15.1064 1.0958 14.6021C1.0314 14.0978 1 13.564 1 13C1 12.4741 1.0532 11.9673 1.1575 11.4818C1.262 10.9961 1.4171 10.5344 1.6192 10.0988C1.7569 9.802 1.9077 9.5122 2.0718 9.2309C2.2359 8.9495 2.4133 8.6764 2.6043 8.413C2.7923 8.1536 3.0934 8 3.4139 8C8.5 10 10 8.5 12.2064 5.5027ZM7 7C8.6569 7 10 5.6569 10 4C10 2.3431 8.6569 1 7 1C5.3431 1 4 2.3431 4 4C4 5.6569 5.3431 7 7 7Z',
  sharp: 'M12.2064 5.5027C12.3515 5.2496 12.5572 4.9788 12.8253 4.7134C13.095 4.4464 13.4326 4.1802 13.845 3.9401C14.2577 3.6997 14.7434 3.4865 15.3083 3.3242C15.8731 3.162 16.5141 3.0515 17.2375 3.014C17.6708 2.9916 18.0649 3.16 18.3439 3.4344C18.6209 3.7069 18.7895 4.0872 18.7895 4.5V7.4175C18.7895 7.5279 18.6378 7.0463 18.6999 7.1326C18.762 7.2188 18.4379 6.9564 18.5391 7.0005C19.0704 7.2322 19.5133 7.567 19.8613 7.9924C20.2066 8.4145 20.4387 8.9011 20.5849 9.4165C20.7304 9.9294 20.7932 10.4784 20.7979 11.0409C20.799 11.1849 20.5771 10.6324 20.6699 10.7289C20.7627 10.8254 20.1702 10.579 20.314 10.579H21.5C21.9139 10.579 22.2902 10.7479 22.5606 11.0183C22.831 11.2886 23 11.665 23 12.079V13.9211C23 14.3351 22.831 14.7114 22.5606 14.9817C22.2903 15.2521 21.914 15.4211 21.5 15.4211H20.2839C20.1459 15.4211 20.7456 15.1682 20.6593 15.2584C20.573 15.3486 20.799 14.7247 20.8069 14.8626C20.8229 15.1421 20.8373 15.5208 20.7852 15.932C20.7324 16.3489 20.6096 16.8156 20.342 17.2746C20.0719 17.7381 19.6758 18.1562 19.128 18.5C18.5866 18.8397 17.9119 19.098 17.0851 19.2703C16.9648 19.2953 17.4189 19.0268 17.3437 19.1157C17.2684 19.2047 17.4598 18.6721 17.4598 18.795V21.5C17.4598 21.9139 17.2909 22.2902 17.0206 22.5606C16.7502 22.831 16.3738 23 15.9598 23H13.8308C13.5932 23 13.3624 22.9436 13.156 22.8396C12.9496 22.7356 12.7669 22.5838 12.6255 22.3928L10.82 19.9555C10.7729 19.8919 11.0657 20.1391 10.9968 20.1044C10.9281 20.0698 11.301 20.1579 11.2218 20.1579H10.6729C10.5937 20.1579 10.9666 20.0698 10.8977 20.1045C10.829 20.1391 11.1218 19.8919 11.0746 19.9555L9.2693 22.3928C9.1279 22.5837 8.9453 22.7355 8.7388 22.8396C8.5323 22.9437 8.3015 23 8.0639 23H5.8795C5.4655 23 5.0892 22.831 4.8189 22.5606C4.5486 22.2903 4.3795 21.914 4.3795 21.5V19.4879C4.3795 19.3878 4.5113 19.8385 4.4586 19.7576C4.4061 19.6769 4.7298 19.9628 4.6399 19.9189C4.2489 19.7277 3.8823 19.5048 3.5433 19.2464C3.204 18.9879 2.8949 18.6958 2.6185 18.3682C2.3421 18.0407 2.1013 17.6813 1.8962 17.2901C1.6912 16.8992 1.5232 16.4792 1.3904 16.0309C1.2577 15.5828 1.1602 15.1064 1.0958 14.6021C1.0314 14.0978 1 13.564 1 13C1 12.4741 1.0532 11.9673 1.1575 11.4818C1.262 10.9961 1.4171 10.5344 1.6192 10.0988C1.7569 9.802 1.9077 9.5122 2.0718 9.2309C2.2359 8.9495 2.4133 8.6764 2.6043 8.413L4.2236 9.5869C5.2077 10.0275 6.2739 10.2553 7.3522 10.2553C10.0583 10.2553 12.2064 7.66453 12.2064 5.5027ZM10 4C10 5.6569 8.6569 7 7 7C5.3431 7 4 5.6569 4 4C4 2.3431 5.3431 1 7 1C8.6569 1 10 2.3431 10 4Z',
};

const PIGGY = {
  body: 'M13.074 6C13.4604 5.3259 14.6805 4.1477 17.2892 4.0127C17.5649 3.9984 17.7895 4.2239 17.7895 4.5L17.7895 7.4175C17.7895 7.6383 17.9368 7.8288 18.1392 7.9171C19.311 8.4281 19.7857 9.5613 19.7979 11.0491C19.8002 11.3367 20.0264 11.579 20.314 11.579L21.5 11.579C21.7761 11.579 22 11.8028 22 12.079L22 13.9211C22 14.1972 21.7761 14.4211 21.5 14.4211L20.2839 14.4211C20.0078 14.4211 19.7927 14.6441 19.8085 14.9198C19.8692 15.978 19.8425 17.6743 16.8811 18.2913C16.6406 18.3414 16.4598 18.5493 16.4598 18.795L16.4598 21.5C16.4598 21.7761 16.236 22 15.9598 22L13.8308 22C13.6724 22 13.5233 21.9249 13.429 21.7976L11.6236 19.3603C11.5293 19.233 11.3802 19.1579 11.2218 19.1579L10.6729 19.1579C10.5145 19.1579 10.3654 19.233 10.2711 19.3603L8.4657 21.7976C8.3714 21.9249 8.2224 22 8.0639 22L5.8795 22C5.6034 22 5.3795 21.7761 5.3795 21.5L5.3795 19.4879C5.3795 19.2877 5.2589 19.1084 5.0791 19.0205C3.0584 18.0324 2 16.1626 2 13C2 12.0836 2.1851 11.2551 2.5263 10.5197C2.7763 9.9809 3.072 9.4716 3.4139 9',
  coin: [7, 4, 2],
  eye: [16, 10.5],
};

SETS['piggy-bank'] = () => {
  const BOX = [1, 1, 23, 23];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = PIGGY.body;
    const plate = PIGGY_PLATE[key];
    const coin = circlePath([PIGGY.coin[0], PIGGY.coin[1]], PIGGY.coin[2]);
    const disc = circlePath([PIGGY.coin[0], PIGGY.coin[1]], PIGGY.coin[2] + 1);
    const eye = circlePath(PIGGY.eye, 1);
    const d = body + coin;
    out[`stroke.${key}`] = [S(d), F_(eye)];
    out[`duotone.${key}`] = [P(plate), S(d), F_(eye)];
    out[`fill.${key}`] = [F_(plate + holeAgainst(plate, eye))];
  }
  return out;
};
BOXES['piggy-bank'] = [1, 1, 23, 23];

/**
 * The barbs an offset leaves, cut away. Works both ways.
 *
 * `offsetPath` classifies a join as convex or reflex from the contour's own
 * winding and not from the sign of the offset, so on an inward one it puts an
 * ARC where it should put a trim, and every sharp corner of the shape comes
 * back as a hook. The test that finds them needs no boolean algebra: a point
 * on the true inset is exactly `delta` from the shape it came from, and every
 * point on a barb is nearer than that. Split at the crossings, keep the far
 * pieces, and the kept ends meet at the corner the trim should have made.
 */
function trimInset(d, srcD, delta, round = false, eps = 0.004) {
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const cutC = (k, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), p = L(p012, p123);
    return [[k[0], p01, p012, p], [p, p123, p23, k[3]]]; };
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const c = t[i++];
      if (c === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (c === 'L') { const q = [+t[i++], +t[i++]]; out.push({ L: [cur, q] }); cur = q; }
      else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], q = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, q] }); cur = q; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  // the source flattened, then bucketed on a unit grid: the distance query runs
  // on the nine cells round the point instead of the whole outline, which is
  // what makes this usable on a hundred-segment plate
  const poly = [];
  for (const g of walk(srcD)) {
    const L = g.L ? len(sub(g.L[1], g.L[0])) : len(sub(g.k[3], g.k[0])) + 1;
    const n = Math.max(6, Math.ceil(L * 8));
    for (let i = 0; i < n; i++) poly.push(at4(g, i / n));
  }
  const cell = new Map();
  const key = (x, y) => `${Math.floor(x)},${Math.floor(y)}`;
  poly.forEach((q, i) => { const k = key(q[0], q[1]); if (!cell.has(k)) cell.set(k, []); cell.get(k).push(i); });
  const near = (q) => {
    let m = Infinity;
    for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) {
      const list = cell.get(key(q[0] + dx, q[1] + dy));
      if (!list) continue;
      for (const i of list) {
        const a = poly[i], b = poly[(i + 1) % poly.length];
        const ab = sub(b, a), L2 = ab[0] * ab[0] + ab[1] * ab[1] || 1;
        const u = Math.max(0, Math.min(1, ((q[0] - a[0]) * ab[0] + (q[1] - a[1]) * ab[1]) / L2));
        m = Math.min(m, len(sub(q, add(a, mul(ab, u)))));
      }
    }
    return m;
  };
  const ok = (q) => near(q) >= delta - eps;
  const keep = [];
  for (const g of walk(d)) {
    const ts = [];
    for (let i = 0; i < 60; i++) { let a = i / 60, b = (i + 1) / 60;
      if (ok(at4(g, a)) !== ok(at4(g, b))) { for (let k2 = 0; k2 < 30; k2++) { const m = (a + b) / 2; if (ok(at4(g, a)) === ok(at4(g, m))) a = m; else b = m; } ts.push((a + b) / 2); } }
    let lo = 0;
    for (const t of [...ts, 1]) {
      if (t - lo > 1e-6 && ok(at4(g, (lo + t) / 2)))
        keep.push(g.L ? { L: [at4(g, lo), at4(g, t)] } : { k: cutC(cutC(g.k, t)[0], t > 0 ? lo / t : 0)[1] });
      lo = t;
    }
  }
  if (!keep.length) throw new Error('trimInset: nothing survived');
  // Where a barb was cut out the two survivors do not meet, and what belongs in
  // the gap depends on the treatment: ROUNDED wants the arc of radius `delta`
  // about the vertex, which is what the stroke's own round join paints there,
  // and SHARP wants the chord, which is the point.
  const nearest = (q) => { let best = null, m = Infinity;
    for (const a of poly) { const e = len(sub(q, a)); if (e < m) { m = e; best = a; } }
    return best; };
  const S = (g) => (g.L || g.k)[0], E = (g) => (g.L ? g.L[1] : g.k[3]);
  // ROUNDED: pull both runs back by `fillet` and blend through the point they
  // were cut from, so an interior corner of a counter is a turn and not a spike
  const fillet = 0.5;
  if (round) {
    const back = (g, fromEnd) => {
      const L = g.L ? len(sub(g.L[1], g.L[0])) : len(sub(g.k[3], g.k[0]));
      const t = Math.min(0.45, fillet / Math.max(L, 0.01));
      if (g.L) return fromEnd
        ? { L: [g.L[0], at4(g, 1 - t)] } : { L: [at4(g, t), g.L[1]] };
      return fromEnd
        ? { k: cutC(g.k, 1 - t)[0] } : { k: cutC(g.k, t)[1] };
    };
    for (let i = 0; i < keep.length; i++) {
      const nxt = keep[(i + 1) % keep.length];
      if (len(sub(S(nxt), E(keep[i]))) > 1e-6) { keep[i] = back(keep[i], true); keep[(i + 1) % keep.length] = back(nxt, false); }
    }
  }
  const p = new Path().M(S(keep[0]));
  for (let i = 0; i < keep.length; i++) {
    const g = keep[i];
    if (i && len(sub(S(g), E(keep[i - 1]))) > 1e-6) {
      if (round) p.C(E(keep[i - 1]), S(g), S(g));   // filled in below
      else p.L(S(g));
    }
    if (g.L) p.L(g.L[1]); else p.C(g.k[1], g.k[2], g.k[3]);
  }
  return p.Z().toString();
}

/**
 * An inward offset's APEX, carried to the point the two edges really cross.
 *
 * `offsetPath` reads a join as convex or reflex off the contour's own winding
 * and not off the sign of the offset, so on an inward one it puts an ARC over
 * a corner it should be cutting. `trimInset` then takes the barb away by
 * distance and chords the gap, and at a sharp apex that costs the whole tip:
 * the bird's tail came back with three units of its wing curve replaced by a
 * straight line, which is what "the wing is straight, not curved" was.
 *
 * So: drop the arc the offset put over `vertex`, then run the two edges either
 * side of it on to their true crossing. Same rule as the sharp converter's —
 * a de-filleted corner has to reach where the edges actually meet.
 */
function insetCross(d, srcD, delta) {
  const walk = (str) => { const t = str.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || []; let i = 0, cur = null, st = null; const out = [];
    while (i < t.length) { const c = t[i++];
      if (c === 'M') { cur = [+t[i++], +t[i++]]; st = cur; }
      else if (c === 'L') { const q = [+t[i++], +t[i++]]; out.push({ L: [cur, q] }); cur = q; }
      else if (c === 'C') { const a = [+t[i++], +t[i++]], b = [+t[i++], +t[i++]], q = [+t[i++], +t[i++]]; out.push({ k: [cur, a, b, q] }); cur = q; }
      else { if (len(sub(cur, st)) > 1e-9) out.push({ L: [cur, st] }); cur = st; } }
    return out; };
  const bez4 = (k, t) => { const u = 1 - t; return [0, 1].map((i) => u ** 3 * k[0][i] + 3 * u * u * t * k[1][i] + 3 * u * t * t * k[2][i] + t ** 3 * k[3][i]); };
  const at4 = (g, t) => (g.L ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t] : bez4(g.k, t));
  const cutC = (k, t) => { const L = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const p01 = L(k[0], k[1]), p12 = L(k[1], k[2]), p23 = L(k[2], k[3]);
    const p012 = L(p01, p12), p123 = L(p12, p23), q = L(p012, p123);
    return [[k[0], p01, p012, q], [q, p123, p23, k[3]]]; };
  // keep only what a true offset would keep: a point on one is exactly `delta`
  // from the source, and a barb is nearer. Same rule `trimInset` runs on.
  const poly = [];
  for (const g of walk(srcD)) { const n = 240; for (let i = 0; i < n; i++) poly.push(at4(g, i / n)); }
  const near = (q) => { let m = Infinity;
    for (let i = 0; i < poly.length; i++) { const a = poly[i], b = poly[(i + 1) % poly.length];
      const ab = sub(b, a), L2 = ab[0] * ab[0] + ab[1] * ab[1] || 1;
      const u = Math.max(0, Math.min(1, ((q[0] - a[0]) * ab[0] + (q[1] - a[1]) * ab[1]) / L2));
      m = Math.min(m, len(sub(q, add(a, mul(ab, u))))); }
    return m; };
  const ok = (q) => near(q) >= delta - 0.004;
  const keep = [];
  for (const g of walk(d)) {
    const ts = [];
    for (let i = 0; i < 90; i++) { let a = i / 90, b = (i + 1) / 90;
      if (ok(at4(g, a)) !== ok(at4(g, b))) { for (let k = 0; k < 30; k++) { const m = (a + b) / 2; if (ok(at4(g, a)) === ok(at4(g, m))) a = m; else b = m; } ts.push((a + b) / 2); } }
    let lo = 0;
    for (const t of [...ts, 1]) {
      if (t - lo > 1e-6 && ok(at4(g, (lo + t) / 2)))
        keep.push(g.L ? { L: [at4(g, lo), at4(g, t)] } : { k: cutC(cutC(g.k, t)[0], t > 0 ? lo / t : 0)[1] });
      lo = t;
    }
  }
  if (!keep.length) throw new Error('insetCross: nothing survived');
  const S = (g) => (g.L || g.k)[0], E = (g) => (g.L ? g.L[1] : g.k[3]);
  // extend a piece past its own end, so two runs can be met beyond where the
  // barb was cut away
  const ext = (g, t) => (g.L
    ? [g.L[0][0] + (g.L[1][0] - g.L[0][0]) * t, g.L[0][1] + (g.L[1][1] - g.L[0][1]) * t]
    : bez4(g.k, t));
  const cross = (A, B) => {                     // A's tail against B's head
    let best = [1, 0, Infinity];
    for (let i = 0; i <= 300; i++) for (let j = 0; j <= 300; j++) {
      const ta = 1 + (i / 300) * 0.6, tb = -(j / 300) * 0.6;
      const e = len(sub(ext(A, ta), ext(B, tb)));
      if (e < best[2]) best = [ta, tb, e];
    }
    let [ta, tb] = best, step = 0.002;
    for (let k = 0; k < 40; k++) { step /= 2;
      for (const [da, db] of [[step,0],[-step,0],[0,step],[0,-step],[step,step],[-step,-step],[step,-step],[-step,step]]) {
        const e = len(sub(ext(A, ta + da), ext(B, tb + db)));
        if (e < best[2]) { best = [ta + da, tb + db, e]; ta += da; tb += db; } } }
    return best;
  };
  const cut = (g, lo, hi) => (g.L
    ? { L: [ext(g, lo), ext(g, hi)] }
    : { k: cutC(cutC(g.k, hi)[0], hi > 0 ? lo / hi : 0)[1] });
  for (let i = 0; i < keep.length; i++) {
    const j = (i + 1) % keep.length;
    if (len(sub(S(keep[j]), E(keep[i]))) < 1e-6) continue;
    const [ta, tb, err] = cross(keep[i], keep[j]);
    if (err > 0.02) continue;                   // no crossing: leave the chord
    keep[i] = keep[i].L ? { L: [keep[i].L[0], ext(keep[i], ta)] } : { k: extendC(keep[i].k, ta) };
    keep[j] = keep[j].L ? { L: [ext(keep[j], tb), keep[j].L[1]] } : { k: extendC(keep[j].k, tb, true) };
  }
  const p = new Path().M(S(keep[0]));
  for (let i = 0; i < keep.length; i++) {
    const g = keep[i];
    if (i && len(sub(S(g), E(keep[i - 1]))) > 1e-6) p.L(S(g));
    if (g.L) p.L(g.L[1]); else p.C(g.k[1], g.k[2], g.k[3]);
  }
  return p.Z().toString();
}

/** A cubic re-parameterised to 0..t (or t..1 when `head`), t outside 0..1 allowed. */
function extendC(k, t, head = false) {
  const L = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  const split = (kk, u) => { const p01 = L(kk[0], kk[1], u), p12 = L(kk[1], kk[2], u), p23 = L(kk[2], kk[3], u);
    const p012 = L(p01, p12, u), p123 = L(p12, p23, u), q = L(p012, p123, u);
    return [[kk[0], p01, p012, q], [q, p123, p23, kk[3]]]; };
  if (head) { // keep t..1
    const u = t;
    return split(k, u)[1];
  }
  return split(k, t)[0];
}

/* ---------------------------------------------------------------- bird */

/**
 * HIS DRAWING, 12 Sep 2026, replacing the perched chick that was there.
 *
 * A bird facing right with a swept tail: one closed body of four cubics and a
 * line, a wing curve whose BOTH ends sit exactly on the body outline (0.0000
 * measured, so it is a composite and nothing measures a gap across it), a beak
 * folded off the right edge with both its ends buried 0.06 and 0.23 inside the
 * body's own ink, two legs of different lengths, and an eye as a filled r=1 at
 * (16,8) which stands 2.02 clear of the body's inner edge.
 *
 * Ink 1..23 by 2..22, pads of 1 and 2. Nothing here is re-filleted: the body
 * is free cubics with no corner on the ladder to square, so sharp differs only
 * in the legs' caps and the stubs their free ends take.
 *
 * The fill opens the TAIL and knocks the eye out as a disc. Its two ends are
 * sharp points and `trimInset` is what makes them: an inward offset hooks at
 * every corner, and the hooks came out as barbs hanging into the white.
 * The beak stays a stroke over the solid, which merges it into the silhouette
 * the way the legs merge.
 */
const BIRD = {
  body: 'M10.8703 7.09631L2.09556 18.7651C1.8455 19.0976 2.11884 19.5572 2.53791 19.5002C4.92655 19.1754 6.76928 18.5988 8.17135 17.8575C19.009 18.1077 21.551 8.4795 19.2462 5.33273C16.6431 1.63 13.9428 3.1503 12.918 4.37329L10.8703 7.09631Z',
  wing: [[8.17135, 17.8575], [13.4666, 15.0578], [12.4764, 9.90848], [10.8703, 7.09631]],
  beak: 'M20.0269 7.24186L21.8164 8.63661C22.1089 8.86462 22.0404 9.31531 21.6925 9.45086L20.0269 10.1',
  // the TAIL's own interior: the body from the wing's top end round the tail
  // to its bottom end, closed by the wing
  tail: 'M10.8703 7.09631L2.09556 18.7651C1.8455 19.0976 2.11884 19.5572 2.53791 19.5002C4.92655 19.1754 6.76928 18.5988 8.17135 17.8575C13.4666 15.0578 12.4764 9.90848 10.8703 7.09631Z',
  legs: [[[10, 17.9861], [10, 21]], [[13.5, 17.4], [13.5, 19.9714]]],
  eye: [16, 8],
};

SETS['bird'] = () => {
  const BOX = [1, 2, 23, 22];
  const wingD = `M${fmtN(BIRD.wing[0][0])} ${fmtN(BIRD.wing[0][1])}C${BIRD.wing.slice(1).map((q) => `${fmtN(q[0])} ${fmtN(q[1])}`).join(' ')}`;
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // only the legs have a free end; the wing and the beak both die in the body
    const legs = BIRD.legs.map((l) => run(l, sharp, [false, true], BOX)).join('');
    const fine = refineCubics(BIRD.body);
    const plate = snapPath(trimInset(offsetPath(fine, 1), fine, 1));
    verifyOffset(fine, plate, 1, 0.02);
    const eye = circlePath(BIRD.eye, 1);
    const d = BIRD.body + wingD + BIRD.beak + legs;
    out[`stroke.${key}`] = [S(d), F_(eye)];
    out[`duotone.${key}`] = [P(plate), S(d), F_(eye)];
    // HIS CALL, 12 Sep 2026: the fill opens the TAIL, not the wing line. The
    // wing and the tail's own outline already enclose a region in the stroke
    // drawing, and inset by 1 it is the almond his reference shows; knocking
    // the wing out as a 2-wide band instead cut the silhouette's edge open at
    // both of the wing's ends and left the tail reading as a loose piece.
    // the tail's apex is where the body's straight edge meets the wing, and the
    // knockout has to reach the point they really cross 1.82 in from it
    const inset = snapPath(insetCross(offsetPath(BIRD.tail, -1), BIRD.tail, 1));
    out[`fill.${key}`] = [
      F_(plate + holeAgainst(plate, inset) + holeAgainst(plate, eye)),
      S(BIRD.beak + legs),
    ];
  }
  return out;
};
BOXES['bird'] = [1, 2, 23, 22];

/* ------------------------------------------- droplet-off and droplets */

/** His drop's body as segments, so it can be clipped and scaled. */
const dropSegs = (d) => readSubpaths(d)[0];
/** A contour scaled about a point. */
const scaleSegs = (segs, k, o) => segs.map((g) => (g.type === 'L'
  ? { type: 'L', p0: [o[0] + (g.p0[0] - o[0]) * k, o[1] + (g.p0[1] - o[1]) * k], p1: [o[0] + (g.p1[0] - o[0]) * k, o[1] + (g.p1[1] - o[1]) * k] }
  : { type: 'A', c: [o[0] + (g.c[0] - o[0]) * k, o[1] + (g.c[1] - o[1]) * k], r: g.r * k, a0: g.a0, a1: g.a1 }));
const moveSegs = (segs, dx, dy) => segs.map((g) => (g.type === 'L'
  ? { type: 'L', p0: [g.p0[0] + dx, g.p0[1] + dy], p1: [g.p1[0] + dx, g.p1[1] + dy] }
  : { type: 'A', c: [g.c[0] + dx, g.c[1] + dy], r: g.r, a0: g.a0, a1: g.a1 }));

/**
 * `droplet-off`, on the family's four rules (§8 of the reference).
 *
 * The slash runs `M2 2 L22 22` and the base is cut ONE-SIDED: everything with
 * u = x − y at or below 0 runs under the slash and stops on its centre line,
 * the band up to 4√2 is removed, and what is left beyond that stands off by
 * the house 2. The drop passes §8's test with room to spare — the slash
 * crosses its outline twice rather than running along it, and the far piece is
 * the tip with a 53-degree run of the body arc, some 12 units of outline, far
 * more than the 3 below which a survivor is debris.
 *
 * The drop carries no inner curve since 12 Sep 2026; see `droplet`.
 */
SETS['droplet-off'] = () => {
  const BOX = [1, 1, 23, 23];
  const N = [Math.SQRT1_2, -Math.SQRT1_2];          // unit normal of u = x − y
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const body = dropSegs(sharp ? DROPLET_SHARP : DROPLET_BODY);
    const near = clipContour(body, [0, 0], N, 0, -1)[0];
    const far = clipContour(body, [0, 0], N, 4, 1)[0];
    const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
    const nearD = contourPath(near, false), farD = contourPath(far, false);
    // the tip is on the FAR piece, so that layer is the one that mitres; the
    // near piece and the slash keep the house round join
    const join = sharp ? 'miter' : undefined;
    const farClosed = contourPath(far);
    const plate = snapPath(sharp ? miterOffset(offsetPath(farClosed, 1), farClosed, 1) : offsetPath(farClosed, 1));
    // A FILL is solid on both sides of the slash, which is what `file-off`,
    // `bell-off` and `heart-off` all ship: the base's silhouette cut in two by
    // the slash, and the slash itself the only stroke left. It was half a fill
    // here — the tip solid and the rest of the drop still an outline — which
    // reads as a stroke icon with a blob stuck on it. The near solid is the
    // silhouette cut ON the slash's centre line, so the slash covers the cut.
    const sil = offsetContour(body, 1);
    const nearSolid = contourPath(clipContour(sil, [0, 0], N, 0, -1)[0]);
    out[`stroke.${key}`] = [S(farD, join), S(nearD + slash)];
    // the far side goes muted, which is the family's law since 30 Aug 2026
    // HIS CALL, 12 Sep 2026: no plate. The far piece is a muted STROKE and
    // nothing else, so the drop reads as an outline with one arm greyed rather
    // than as a grey slab under a slash. It is a departure from `eye-off`,
    // which carries a plate on the near side as well.
    out[`duotone.${key}`] = [S(nearD + slash), M_(farD, join)];
    out[`fill.${key}`] = [F_(plate + nearSolid), S(slash)];
  }
  return out;
};
BOXES['droplet-off'] = [1, 1, 23, 23];

/**
 * HIS DRAWING, 12 Sep 2026: a small drop in front of a big one, overlapping.
 *
 * The pair standing clear on the diagonal was the earlier answer and this
 * replaces it. The two drops are his, on his centres and radii, rebuilt on the
 * `dropPath` construction so every corner is a house corner and the geometry
 * is lines and arcs the plate can be solved from exactly. The big one is
 * BEHIND, so it is cut where the small one passes: its centre line stops 4
 * from the small drop's, which puts 2 of daylight between the two paints, and
 * its round caps land exactly on the line the solid's edge follows.
 *
 * The solid cannot be the outline offset, because a cut shape has no interior
 * to offset: it is the whole drop's plate clipped 3 from the small centre line
 * and CLOSED along the small drop's own offset at 3, which is the curve that
 * keeps a flat 2 all the way round the bite. His highlight rides in the big
 * drop, moved the 0.2117 that puts that drop's centre on 13.8.
 */
const segAt = (s, t) => (s.type === 'L'
  ? [s.p0[0] + (s.p1[0] - s.p0[0]) * t, s.p0[1] + (s.p1[1] - s.p0[1]) * t]
  : onA(s, s.a0 + (s.a1 - s.a0) * t));
const segSplit = (s, t) => (s.type === 'L'
  ? [{ type: 'L', p0: s.p0, p1: segAt(s, t) }, { type: 'L', p0: segAt(s, t), p1: s.p1 }]
  : [{ ...s, a1: s.a0 + (s.a1 - s.a0) * t }, { ...s, a0: s.a0 + (s.a1 - s.a0) * t }]);
/** Is `p` inside the closed polygon `poly`? Ray casting, and the ray is +x. */
const pip = (poly, p) => {
  let n = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i], b = poly[j];
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) n = !n;
  }
  return n;
};
/** `clipByDistance`'s shape against an arbitrary test: the longest run that holds. */
function clipByTest(segs, test) {
  const pieces = [];
  for (const s of segs) {
    const ts = [];
    for (let i = 0; i < 200; i++) {
      let a = i / 200, b = (i + 1) / 200;
      if (test(segAt(s, a)) !== test(segAt(s, b))) {
        for (let k = 0; k < 50; k++) { const m = (a + b) / 2; if (test(segAt(s, a)) === test(segAt(s, m))) a = m; else b = m; }
        ts.push((a + b) / 2);
      }
    }
    let rest = s, base = 0;
    for (const t of ts.sort((x, y) => x - y)) { const [x, y] = segSplit(rest, (t - base) / (1 - base)); pieces.push(x); rest = y; base = t; }
    pieces.push(rest);
  }
  const runs = []; let run = null;
  for (const s of [...pieces, ...pieces]) { if (test(segAt(s, 0.5))) (run ??= []).push(s); else if (run) { runs.push(run); run = null; } }
  if (run) runs.push(run);
  if (!runs.length) return [];
  const best = runs.reduce((a, b) => (b.length > a.length ? b : a));
  const seen = new Set();
  return best.filter((x) => { const k = JSON.stringify(x); if (seen.has(k)) return false; seen.add(k); return true; });
}
/** Travel direction of a lines-and-arcs segment at `t` in 0..1. */
function segDir(g, t) {
  if (g.type === 'L') return unit(sub(g.p1, g.p0));
  const a = ((g.a0 + (g.a1 - g.a0) * t) * Math.PI) / 180;
  return mul([-Math.sin(a), Math.cos(a)], Math.sign(g.a1 - g.a0));
}

/** `dropPath` as segments, anywhere on the canvas and at any radius. */
function dropSegsAt(cx, cy, R, sharp) {
  const t = R / 7.2;                          // the tip corner scales with the drop
  const p = new Path();
  if (sharp) {
    const d0 = cy - mitredApex(cy, R, cy - 1.5 * R - 1), L = Math.sqrt(d0 * d0 - R * R);
    const T = [cx + L * (R / d0), cy - d0 + L * (L / d0)], TL = [2 * cx - T[0], T[1]];
    p.M(T).A([cx, cy], ang(sub(T, [cx, cy])), ang(sub(TL, [cx, cy])), 1).L([cx, cy - d0]).L(T);
  } else {
    const tip = [cx, cy - 1.5 * R + t], d0 = cy - tip[1];
    const ny = -(R - t) / d0, nx = Math.sqrt(1 - ny * ny);
    const TB = [cx + R * nx, cy + R * ny], TBL = [2 * cx - TB[0], TB[1]];
    const TA = [cx + t * nx, tip[1] + t * ny], TAL = [2 * cx - TA[0], TA[1]];
    p.M(TB).A([cx, cy], ang(sub(TB, [cx, cy])), ang(sub(TBL, [cx, cy])), 1)
      .L(TAL).A(tip, ang(sub(TAL, tip)), ang(sub(TA, tip)), 1).L(TB);
  }
  return p.segs;
}

/**
 * HIS SHARP CUT, 12 Sep 2026, from `refs/droplets-duoton-in-sharp.svg`.
 *
 * The run is the big drop's outline between the two ends HE set, and both ends
 * are longer than the clip gives: he pulled them out until the black covered
 * the plate, which is the same call he made in words first ("stretch stroke to
 * cover the gray part"). The plate he drew with it was approximate — its bars
 * are a vertical and a near-vertical where the real faces stand at 41 and 35
 * degrees — and that is the part he asked to have done properly, so the stroke
 * is his and the plate is solved off it.
 */
const DROPLETS_SHARP_CUT = 'M12 5L13.8 3.43896L18.9775 8.79657C20.2748 10.1391 21 11.9331 21 13.8C21 17.7765 17.7765 21 13.8 21C11.7344 21 9.7682 20.1128 8.4014 18.564L8 18';

const DROPLETS_BIG = [13.8, 13.8, 7.2];
const DROPLETS_SMALL = [7.2353, 10.4118, 4.2353];

SETS['droplets'] = () => {
  const BOX = [2, 2, 22, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    let sharpD = null;
    const big = dropSegsAt(...DROPLETS_BIG, sharp), small = dropSegsAt(...DROPLETS_SMALL, sharp);
    // 256 per arc, not the default 24: the clip measures against a POLYLINE,
    // whose chords cut the corner and read short, and at 24 the solid came
    // 0.01 inside the small drop's plate.
    const cut = clipByDistance(big, flatten(small, 256), 4)[0];
    // ROUNDED: close the cut centre line with the curve 4 from the small drop
    // and offset THAT. The bite's edge comes out at 3, tangent to both round
    // caps, and each cut corner comes out as the r=1 join arc, which is the cap
    // itself — `bell-dot`'s rule arrived at from the other side. Offsetting the
    // whole drop and clipping cannot do it at any radius: the plate of the WHOLE
    // drop carries the band of the arc that was cut away, so at the stroke's own
    // 4 the grey stops where the black CENTRE LINE stops and a unit of white
    // runs the length of the bite, and one unit in that band survives as a grey
    // wedge past the cap.
    const poly = flatten(big, 256);
    let bridge = clipByTest(offsetContour(small, 4), (q) => pip(poly, q));
    const A0 = startOf(cut[0]), B0 = endOf(cut[cut.length - 1]);
    if (len(sub(startOf(bridge[0]), A0)) < 0.05) bridge = bridge.slice().reverse().map(revSeg);
    let closed = [...cut, ...bridge];
    if (windingOf(closed) !== windingOf(big)) closed = revRun(closed);
    // through `offsetPath` rather than `offsetContour`: the latter is a segment
    // offsetter and collapses on a contour that turns back on itself the way
    // the bite does
    const fine = refineCubics(contourPath(closed));
    let solid = snapPath(trimInset(offsetPath(fine, 1), fine, 1));
    verifyOffset(fine, solid, 1, 0.02);

    // SHARP: the solid is the SAME solid, with the two round caps planed off.
    //
    // It was drawn from scratch here — the cut's outer offset, a bar across each
    // end and one ARC between the bars' inner corners, bulged until its closest
    // approach to the small drop was the house 2. An arc holds that 2 at exactly
    // one point: measured, the channel opened from 2.00 at (11.9,12.8) to 4.11
    // at (5.8,15.5), and he read it straight off the drawing ("that's not 2px,
    // that's more than that"). The bite is a constant standoff, so it has to be
    // an OFFSET, and the rounded solid above already is one: its bite edge is
    // the curve 4 from the small drop brought in by 1, flat 2 the whole way.
    //
    // So the only difference sharp owes is the CAPS, and `clipPlane` is the tool
    // for exactly that: it takes the outer quarter disc a butt cap fails to
    // paint and leaves everything else, including the bite running on past the
    // cut face, which a half plane through the end would have amputated.
    if (sharp) {
      // THE PLATE IS SOLVED OFF HIS RUN. A butt cap paints the BAR across the
      // cut, so the boundary is the run's outer offset, that bar, the bite, and
      // the other bar. The bite is the curve 3 from the small drop's centre
      // line, which is the house 2 off its paint the whole way, and his ends
      // land within 0.09 of it — near enough that the corner joins are a
      // hair rather than a chamfer, which is why his ends are worth keeping.
      const ends = (dd) => { const t = dd.match(/-?\d*\.?\d+(?:e-?\d+)?/g).map(Number);
        const pt = (i) => [t[i], t[i + 1]];
        return { A: pt(0), tA: unit(sub(pt(2), pt(0))),
          B: pt(t.length - 2), tB: unit(sub(pt(t.length - 2), pt(t.length - 4))) }; };
      const E = ends(DROPLETS_SHARP_CUT);
      const perp = (t) => [t[1], -t[0]];
      const outAt = (P, t) => mul(perp(t), pip(poly, add(P, mul(perp(t), 0.4))) ? -1 : 1);
      const nA = outAt(E.A, E.tA), nB = outAt(E.B, E.tB);
      const cutD = DROPLETS_SHARP_CUT;
      const firstPt = (dd) => /^M(-?[\d.]+) (-?[\d.]+)/.exec(dd).slice(1).map(Number);
      const cand = [offsetPath(refineCubics(cutD), 1), offsetPath(refineCubics(cutD), -1)];
      const outerRaw = len(sub(firstPt(cand[0]), add(E.A, nA))) < 0.01 ? cand[0] : cand[1];
      if (len(sub(firstPt(outerRaw), add(E.A, nA))) > 0.01) throw new Error('droplets: neither offset starts on his cut');
      const outer = miterOffset(truncAt(outerRaw, add(E.B, nB)), cutD, 1).replace(/Z$/, '');
      const I0 = sub(E.B, nB), I1 = sub(E.A, nA);
      let bite = runBetweenNearest(offsetContour(small, 3), I0, I1, (q) => pip(poly, q));
      if (!bite.length) throw new Error('droplets: the bite offset has no run inside the big drop');
      if (len(sub(startOf(bite[0]), I0)) > len(sub(startOf(bite[0]), I1))) bite = revRun(bite);
      // The corners are the bars' inner ends and the bite has to LAND on them,
      // not near them: joined with a straight run-up instead, the 0.09 of slack
      // reads as a nick at each corner, which is what he marked. So the bite is
      // struck as the arc through both corners and the constant-2 curve's own
      // midpoint — exact at the ends, and inside 0.09 of that curve in between,
      // which is the whole of what his ends were off by.
      const slack = Math.max(len(sub(startOf(bite[0]), I0)), len(sub(endOf(bite[bite.length - 1]), I1)));
      if (slack > 0.2) throw new Error(`droplets: his cut ends stand ${slack.toFixed(2)} off the bite`);
      const M = segAt(bite[Math.floor(bite.length / 2)], 0.5);
      const cc = circumcentre(I0, M, I1);
      const pen = new Path().M(add(E.B, nB)).L(I0)
        .A(cc, ang(sub(I0, cc)), ang(sub(I1, cc)), turnOf(cc, I0, M, I1))
        .L(add(E.A, nA));
      solid = snapPath(outer + pen.toString().replace(/^M[^LCAZ]*/, '') + 'Z');
      sharpD = cutD + contourPath(small);
    }
    const d = sharpD || contourPath(cut, false) + contourPath(small);
    // both tips are points in sharp, so the stroke mitres and the two solids
    // take the crossing rather than the arc
    const join = sharp ? 'miter' : undefined;
    const smallD = contourPath(small);
    const smallSolid = contourPath(offsetContour(small, 1));
    const smallOut = sharp ? snapPath(miterOffset(smallSolid, smallD, 1)) : smallSolid;
    out[`stroke.${key}`] = [S(d, join)];
    out[`duotone.${key}`] = [P(solid + smallOut), S(d, join)];
    out[`fill.${key}`] = [F_(solid + smallOut)];
  }
  return out;
};
BOXES['droplets'] = [2, 2, 22, 22];

/* ------------------------------------------------------------------ main */

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  for (const name of (want.length ? want : Object.keys(SETS))) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const variants = SETS[name]();
    if (BOXES[name]) for (const [key, layers] of Object.entries(variants)) assertBox(name, key, layers, BOXES[name]);
    writeSet(root, name, variants);
    const b = assertBox(name, 'stroke.regular', variants['stroke.regular'], BOXES[name])
      || inkOf(variants['stroke.regular'], 'round');
    console.log(name.padEnd(12), 'ink', b.map((v) => v.toFixed(2).padStart(6)).join(' '), ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS, BOXES, plateOf, runPath, segsToPath, revRun, startOf, endOf, assertBox, S, F_, P };
