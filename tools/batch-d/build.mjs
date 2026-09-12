/**
 * Emit batch D of the v0.8.0 work into raw/ (or --out=DIR/raw).
 *   node tools/batch-d/build.mjs [name ...] [--out=DIR]
 *
 * Eleven names from a month of empty searches on the site, 10 Sep 2026:
 * plane (flight, airline), ship (boat), train, bike, tree-palm (island),
 * leaf and wind-turbine (clean energy), droplet (water), piggy-bank (pig),
 * bird (crow). Built on the v5 libraries the way tools/charts/build.mjs
 * is: a closed body is a polygon of lines and circular arcs with a per-vertex
 * radius, so its plate is an exact offset checked sample by sample; a knockout
 * is wound against its plate; every sharp free end goes through `sharpEndIn`,
 * an arc's free end takes a straight stub along its tangent, and a vertex that
 * a fillet defined an extreme for is re-solved per treatment so both paint the
 * same box, which every set asserts before it writes.
 *
 * The names are the brief and nothing else: the reference set's drawings of
 * the same names were fetched only to run the multiply overlay against, after
 * drawing, and every construction here starts from the house envelope, the
 * radius ladder and the 2-unit gap.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, polyContour, circlePath, onArc, add, sub, mul, unit, len, dot } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { outlineRun } from '../v6/outline.mjs';
import { strokedBBox, outlines, minGap } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });

/* ------------------------------------------------------------- helpers */

function num(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
const pt = (p) => `${num(p[0])} ${num(p[1])}`;
const runPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${pt(p)}`).join('');
const lineSegs = (pts) => pts.slice(1).map((p, i) => ({ type: 'L', p0: pts[i], p1: p }));
const rad = (a) => (a * Math.PI) / 180;
const deg = (a) => (a * 180) / Math.PI;
const angleOf = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};
const reverseSeg = (g) =>
  g.type === 'L' ? { type: 'L', p0: g.p1, p1: g.p0 } : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 };
const windingOf = (segs) => Math.sign(areaOf(flatten(segs, 24)));
/** `segs` wound AGAINST `plateSegs`, so it cuts under the non-zero rule. */
const hole = (plateSegs, segs) =>
  contourPath(windingOf(plateSegs) === windingOf(segs) ? [...segs].reverse().map(reverseSeg) : segs);
const circleSegs = (c, r) => [{ type: 'A', c, r, a0: 0, a1: 360 }];

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = offsetContour(segs, 1);
  verify(segs, off, 1);
  return off;
}

/**
 * A filleted polygon and its plate. An r=1 fillet in a reflex corner offsets
 * outward to an arc of radius 0 sitting exactly on the fillet's own centre,
 * which is also where the two offset edges cross; the offsetter's dropped-arc
 * path handled that on one plane and collapsed the next to a point, so the
 * plate is taken from the same polygon with the reflex radii at 0, whose
 * trimmed crossings are the same points. Checked against the drawn body.
 */
function bodyAndPlate(pts, radii) {
  const nv = pts.length;
  let area = 0;
  for (let i = 0; i < nv; i++) { const p = pts[i], q = pts[(i + 1) % nv]; area += p[0] * q[1] - q[0] * p[1]; }
  const reflex = pts.map((V, i) => {
    const A = pts[(i - 1 + nv) % nv], B = pts[(i + 1) % nv];
    const c = (V[0] - A[0]) * (B[1] - V[1]) - (V[1] - A[1]) * (B[0] - V[0]);
    return Math.sign(c) !== Math.sign(area);
  });
  const body = polyContour(pts, radii);
  const base = polyContour(pts, radii.map((r, i) => (reflex[i] && r <= 1 ? 0 : r)));
  const plate = offsetContour(base.segs, 1);
  verify(body.segs, plate, 1);
  return { body, plate };
}

/** A polyline whose free ends sharp pushes out along their own tangents. */
function sharpen(pts, ends = [true, true], box = [1, 1, 23, 23]) {
  const p = pts.map((q) => [...q]);
  if (ends[0]) {
    const dir = unit(sub(p[0], p[1]));
    p[0] = add(p[0], mul(dir, sharpEndIn(p[0], dir, box)));
  }
  if (ends[1]) {
    const last = p.length - 1;
    const dir = unit(sub(p[last], p[last - 1]));
    p[last] = add(p[last], mul(dir, sharpEndIn(p[last], dir, box)));
  }
  return p;
}
const run = (pts, sharp, ends = [true, true], box) => runPath(sharp ? sharpen(pts, ends, box) : pts);

/**
 * An open circular arc about `c` from `a0` to `a1` (screen degrees, the sign
 * of a1 - a0 is the direction). Sharp adds a straight stub along the tangent
 * at each free end, never moving the arc's own endpoint: the rule the clock
 * rings were caught breaking.
 */
function arcRun(c, r, a0, a1, sharp, ends = [true, true], box = [1, 1, 23, 23]) {
  const dir = Math.sign(a1 - a0) || 1;
  const travel = (a) => mul([-Math.sin(rad(a)), Math.cos(rad(a))], dir);
  const p0 = onArc(c, r, a0), p1 = onArc(c, r, a1);
  const p = new Path();
  if (sharp && ends[0]) {
    const back = mul(travel(a0), -1);
    p.M(add(p0, mul(back, sharpEndIn(p0, back, box)))).L(p0);
  } else p.M(p0);
  p.A(c, a0, a1, dir);
  if (sharp && ends[1]) {
    const fwd = travel(a1);
    p.L(add(p1, mul(fwd, sharpEndIn(p1, fwd, box))));
  }
  return p.toString();
}

/** Bisect x in [lo, hi] until f(x) lands on `want`; f is monotonic on the range. */
function solve(f, lo, hi, want) {
  const up = f(hi) > f(lo);
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if ((f(m) > want) === up) hi = m; else lo = m;
  }
  return (lo + hi) / 2;
}

const inkOf = (layers, cap) => {
  const stroked = layers.filter((l) => l.kind === 'stroke').map((l) => l.d).join('');
  const b = stroked ? strokedBBox(stroked, 1, cap) : [Infinity, Infinity, -Infinity, -Infinity];
  for (const l of layers.filter((l) => l.kind !== 'stroke')) {
    const q = strokedBBox(l.d, 0, 'butt');
    b[0] = Math.min(b[0], q[0]); b[1] = Math.min(b[1], q[1]); b[2] = Math.max(b[2], q[2]); b[3] = Math.max(b[3], q[3]);
  }
  return b;
};
function assertBox(name, variants, want, tol = 0.002) {
  for (const [key, layers] of Object.entries(variants)) {
    const b = inkOf(layers, key.endsWith('sharp') ? 'butt' : 'round');
    const err = Math.max(...b.map((v, i) => Math.abs(v - want[i])));
    if (err > tol) throw new Error(`${name} ${key}: box ${b.map((v) => v.toFixed(3)).join(', ')} should be ${want.join(', ')}`);
  }
}

/** Tightest painted gap between distinct, non-touching subpaths of the stroke layer, for the report. */
function tightest(layers) {
  const polys = [];
  for (const l of layers) for (const p of outlines(l.d, 48)) polys.push({ p, reach: l.kind === 'stroke' ? 1 : 0 });
  let best = Infinity;
  for (let i = 0; i < polys.length; i++)
    for (let j = i + 1; j < polys.length; j++) {
      const g = minGap(polys[i].p, polys[j].p);
      if (g <= 1e-6) continue;
      best = Math.min(best, g - polys[i].reach - polys[j].reach);
    }
  return best;
}

const SETS = {};
const SETS_OLD = {};
const BOXES = {};

/* --------------------------------------------------------------- plane */

/**
 * A top view on the free diagonal, nose up-right: the "flight" glyph every
 * airport uses, which is what five people typed. Drawn in a local frame
 * (a along the axis, b across it) as one closed polygon and mapped onto the
 * canvas, so the fillets are rotation-invariant. Fuselage 5 wide on the path
 * (interior 3), a pointed nose 5 long, swept wings with a root chord of 7 and
 * a tip chord of 3, a flat-backed tail 4 units of half-span, and the house 2
 * between the wing's trailing edge and the tailplane's leading edge. Every
 * corner is r=1 (fill: 2), including the reflex ones at the roots.
 *
 * The box is 1..23 both ways, the diagonal full-bleed size every `-off`
 * icon paints. Three numbers are solved rather than chosen: the nose length
 * puts the painted apex on (23,1), the wingspan puts the trailing wingtips
 * on x=1 and y=23, and the tail length keeps the back corners half a unit
 * inside that, so the wingtips are the only extremes on the far sides. Sharp
 * re-solves all three at r=0, since a round join paints a unit about a vertex
 * where a fillet painted r+1 about its centre.
 */
// SUPERSEDED. Zafar redrew it on 12 Sep 2026 and the drawing in the tree is his, fitted by tools/batch-d/refit.mjs. This construction is superseded; it is kept because plane-takeoff and plane-landing measure against it.
SETS_OLD['plane'] = () => {
  const U = [Math.SQRT1_2, -Math.SQRT1_2], V = [-Math.SQRT1_2, -Math.SQRT1_2];
  const map = ([a, b]) => add(add([12, 12], mul(U, a)), mul(V, b));
  const HF = 2.5, UW1 = 6, UT1 = -1, UT2 = -4, UW2 = -3, US = -7, WT = 4;
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 1;
    const cap = sharp ? 'butt' : 'round';
    const points = (Ln, W, Lt) => {
      const half = [[Ln, 0], [Ln - 5, HF], [UW1, HF], [UT1, W], [UT2, W], [UW2, HF], [US, HF], [-Lt, WT]];
      const pts = [...half, ...half.slice(1).reverse().map(([a, b]) => [a, -b])];
      return pts.map(map);
    };
    const poly = (Ln, W, Lt) => polyContour(points(Ln, W, Lt), points(Ln, W, Lt).map(() => r));
    const box = (Ln, W, Lt) => strokedBBox(poly(Ln, W, Lt).d, 1, cap);
    // each extreme belongs to one part: the nose alone sets the right edge, the
    // tail corners are solved with the wings retracted (or the wingtips, once
    // on the edge, would hide them from the box), and the wings come last
    const Ln = solve((x) => box(x, 5, 10)[2], 12, 16, 23);
    const Lt = solve((x) => box(Ln, 5, x)[0], 8, 13, 1.5);   // tail corners sit half a unit inside
    const W = solve((x) => box(Ln, x, Lt)[0], 8, 13, 1);
    const { body, plate } = bodyAndPlate(points(Ln, W, Lt), points(Ln, W, Lt).map(() => r));
    out[`stroke.${key}`] = [S(body)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(body)];
    out[`fill.${key}`] = [F_(contourPath(plate))];
  }
  return out;
};
BOXES['plane'] = [1, 1, 23, 23];

/* ---------------------------------------------------------------- ship */

/**
 * A hull, a cabin and a mast, the square size. The hull is a trapezoid with
 * its deck on y=13 and its keel on y=21, sides sloping in 4 over 8, keel
 * corners r=2 (fill: 3) and deck corners r=1, since the same radius reads
 * rounder on a 63-degree corner than on a 117-degree one; the deck corners
 * are solved so the r=1 arcs paint x=2 and 22. The cabin is an open U 8..16 by 7..13 on r=1 standing on the deck, so
 * its feet are T-junctions and sharp squares nothing but the mast's tip; the
 * mast runs 12,3 to 12,7 and lands on the cabin's roof. The silhouette for
 * the plate is one authored contour (Figma fills are evenodd, so two
 * overlapping subpaths would cut where they meet); the fill follows `truck`,
 * hull solid and the cabin an outline over it, with the cabin's feet buried
 * a unit in the hull's solid.
 */
// SUPERSEDED. Superseded 12 Sep 2026 by his own drawing, fitted in tools/batch-d/refit.mjs: a cabin on a bowed deck over a waterline, where this was a flat trapezoid hull.
SETS_OLD['ship'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const cap = sharp ? 'butt' : 'round';
    const rb = sharp ? 0 : 2, rc = sharp ? 0 : 1;
    const hull = (xa) => polyContour([[xa, 13], [24 - xa, 13], [17, 21], [7, 21]], [rc, rc, rb, rb]);
    const xa = sharp ? 3 : solve((x) => strokedBBox(hull(x).d, 1, cap)[0], 0, 4, 2);
    const h = hull(xa);
    const sil = polyContour([[xa, 13], [8, 13], [8, 7], [16, 7], [16, 13], [24 - xa, 13], [17, 21], [7, 21]], [rc, 0, rc, rc, 0, rc, rb, rb]);
    const cabin = new Path().M([8, 13]).corner([8, 7], [16, 7], rc).corner([16, 7], [16, 13], rc).L([16, 13]).toString();
    const mast = run([[12, 7], [12, 3]], sharp, [false, true], [2, 2, 22, 22]);
    const d = h.toString() + cabin + mast;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plateOf(sil.segs))), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plateOf(h.segs))), S(cabin + mast)];
  }
  return out;
};
BOXES['ship'] = [2, 2, 22, 22];

/* --------------------------------------------------------------- train */

/**
 * A front view, the vertical size: the house body 4..20 by 2..18 on r=3, a
 * windscreen rule at y=8 wall to wall, two headlamps as beads (filled r=1.5,
 * painting 3) at 8.5 and 15.5 on y=13, 2 clear of the rule, the floor and the
 * walls, and two 45-degree legs from the floor at x=8 and 16 down to (4,22)
 * and (20,22), the splayed feet a rail vehicle stands on in every set's front
 * view. The fill opens the windscreen as a panel, bounded by the walls' inner
 * ink and the rule's, top corners on the body's inner r=2, and cuts the lamps
 * out of the face; the legs stay strokes.
 */
// SUPERSEDED. Superseded 12 Sep 2026 by his own drawing, fitted in tools/batch-d/refit.mjs, which adds the mirrors and puts the lamps below the screen rule.
SETS_OLD['train'] = () => {
  const BOX = [3, 1, 21, 23];
  const LAMPS = [[8.5, 13], [15.5, 13]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 3;
    const body = polyContour([[4, 2], [20, 2], [20, 18], [4, 18]], [r, r, r, r]);
    const plate = plateOf(body.segs);
    const rule = 'M4 8L20 8';
    const legs = run([[8, 18], [4, 22]], sharp, [false, true], BOX) + run([[16, 18], [20, 22]], sharp, [false, true], BOX);
    const beads = LAMPS.map((c) => circlePath(c, 1.5)).join('');
    const pane = polyContour([[5, 3], [19, 3], [19, 7], [5, 7]], [Math.max(0, r - 1), Math.max(0, r - 1), 0, 0]).segs;
    const d = body.toString() + rule + legs;
    out[`stroke.${key}`] = [S(d), F_(beads)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(beads)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, pane) + LAMPS.map((c) => hole(plate, circleSegs(c, 1.5))).join('')), S(legs)];
  }
  return out;
};
BOXES['train'] = [3, 1, 21, 23];

/* ---------------------------------------------------------------- bike */

/**
 * Two wheels and a frame. The wheels are rings of r=4 at (6,16) and (18,16),
 * painting 10 with an interior of 6 and the house 2 between them: r=4.5 was
 * drawn first and the two rings' ink touched, since 22 units of width hold
 * two painted 2r+2 discs and a gap only up to r=4. The frame is a seat tube
 * from the rear hub to a saddle on y=4 and a fork from the front hub to a
 * handlebar on the same line, both at 79 degrees (2.4 across on a rise of
 * 12, so the posts cross y=8 on 7.6 and 16.4 exactly), joined by a top tube
 * on y=8 that clears the wheels' ink and the bars by the house 2; the saddle
 * and the bar are 3-unit dashes on 7..10 and 14..17, so their painted ends
 * sit 2 apart. The hub ends are free ends inside the rings and sharp
 * squares them there; every other end is a T-junction. A crank between the
 * wheels is not available: a vertex 2 clear of both rings' ink has to sit 7
 * from both hubs, which puts it on y=11.4 at the earliest, and the tubes to
 * it would run inside 2 of the seat tube for most of their length. Ink
 * 1..23 by 3..21, the horizontal size. A first cut was a bare trapezoid on
 * two wheels, which read as a cart. The fill is the discs with the frame over them, the way
 * `chart-scatter-bubble`'s rings fill.
 */
// SUPERSEDED by his drawing in tools/batch-d/refit.mjs: kept for the record,
// and moved to SETS_OLD after a run of this file silently overwrote two of
// his refits in raw/.
SETS_OLD['bike'] = () => {
  const HUBS = [[6, 16], [18, 16]];
  const BOX = [1, 3, 23, 21];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const rings = HUBS.map((c) => circlePath(c, 4)).join('');
    const discs = HUBS.map((c) => circlePath(c, 5)).join('');
    const seat = run([HUBS[0], [8.4, 4]], sharp, [true, false], BOX);
    const fork = run([HUBS[1], [15.6, 4]], sharp, [true, false], BOX);
    const tube = 'M7.6 8L16.4 8';                         // where the two posts cross y=8, exactly
    const bars = run([[7, 4], [10, 4]], sharp, [true, true], BOX) + run([[14, 4], [17, 4]], sharp, [true, true], BOX);
    const frame = seat + fork + tube + bars;
    out[`stroke.${key}`] = [S(rings + frame)];
    out[`duotone.${key}`] = [P(discs), S(rings + frame)];
    out[`fill.${key}`] = [F_(discs), S(frame)];
  }
  return out;
};
BOXES['bike'] = [1, 3, 23, 21];

/* ----------------------------------------------------------- tree-palm */

/** `H`/`V` shorthand written out as `L`, which changes no point. */
function expandHV(d) {
  const t = d.match(/[MLHVCSQTAZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  let out = '', x = 0, y = 0, cmd = '';
  for (let i = 0; i < t.length; i += 1) {
    if (/[MLHVCSQTAZ]/i.test(t[i])) { cmd = t[i]; if (cmd !== 'H' && cmd !== 'V') out += cmd; continue; }
    if (cmd === 'H') { x = +t[i]; out += `L${num(x)} ${num(y)}`; continue; }
    if (cmd === 'V') { y = +t[i]; out += `L${num(x)} ${num(y)}`; continue; }
    const n = [];
    while (i < t.length && !/[MLHVCSQTAZ]/i.test(t[i])) n.push(+t[i++]);
    i -= 1;
    out += n.map((v) => num(v)).join(' ');
    if (n.length >= 2) { x = n[n.length - 2]; y = n[n.length - 1]; }
  }
  return out;
}

/**
 * HIS DRAWING, 12 Sep 2026, from `refs/tree-palm.svg`, applied as it came.
 *
 * It took three redraws of mine to get here and his edit finished the fourth.
 * Five bare arcs read as a fountain; four lens blades read as a scary bat; four
 * open strokes read as a palm and thinned to a spider by 24px. Reading his two
 * references gave the frond its DOME — a half arc out of the crown and a
 * straight underside back carrying a serration, the run stopping short so no
 * two fronds cross — and that much of mine he kept.
 *
 * What he added is what mine was missing, and it is the half that makes it a
 * tree rather than a crown: a THIRD frond drooping down-left with its own
 * serration, and a ROOT FLARE where the trunk meets the ground, which is the
 * tapering foot both of his references draw and a single stroked trunk cannot
 * have. He also turned the whole crown over, so the long frond is on the right
 * and the trunk leans away from it rather than under it.
 *
 * Four open runs, enclosing nothing: stroke-only, as it has been since the
 * first version. Ink 1..23 by 2..22 on his own coordinates, nothing refitted.
 */
const TREE_PALM = 'M11.8 7.99997C11.8552 5.22287 14.1223 3.00037 16.9 3.00037C19.6777 3.00037 21.9448 5.22287 22 7.99997H19.7L18.7 6.99997L17.7 7.99997H12M10.6 7.99997C10.5449 5.66467 8.6359 3.80027 6.3 3.80027C3.9641 3.80027 2.0551 5.66467 2 7.99997H4L5 6.99997L6 7.99997H10.2M11.2 7.99997C13.6354 11.0148 14.9639 14.7734 14.9639 18.649C14.9639 19.4355 14.9091 20.2211 14.8 21C14 21 11.9 21 10.6 21C11.2 19.5 11.2 18 11 16.5M11 9.09982C8.95002 7.97988 6.3809 8.70093 5.21295 10.7239C4.045 12.7468 4.70512 15.3323 6.7 16.5476L7.7 14.8156L7.33397 13.4496L8.7 13.0835L10.8 9.44623';

SETS['tree-palm'] = () => {
  const BOX = [1, 2, 23, 22];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // H and V carry ONE number where every other command carries pairs, so a
    // helper that walks coordinate pairs reads them off by one: the sharp stubs
    // came out five units long and diagonal. His file is kept as he wrote it and
    // the shorthand is expanded here, which moves nothing.
    const runs = expandHV(TREE_PALM).split(/(?=M)/).filter(Boolean);
    const d = runs.map((r) => (sharp ? stubTail(r, BOX) : r)).join('');
    out[`stroke.${key}`] = [S(d)];
  }
  return out;
};
BOXES['tree-palm'] = [1, 2, 23, 22];

/** An open arc run's LAST end pushed out along its own tangent, for sharp. */
function stubTail(d, box) {
  const t = d.match(/[MLCAZ]|-?\d*\.?\d+/gi) || [];
  // read the final point and the one just before it off the flattened run
  const pts = [];
  for (let i = 0; i < t.length; i++) if (!/[MLCAZ]/i.test(t[i])) pts.push(+t[i]);
  const end = [pts[pts.length - 2], pts[pts.length - 1]];
  const prev = [pts[pts.length - 4], pts[pts.length - 3]];
  const dir = unit(sub(end, prev));
  const k = sharpEndIn(end, dir, box);
  return `${d}L${num(end[0] + dir[0] * k)} ${num(end[1] + dir[1] * k)}`;
}

/* ---------------------------------------------------------------- leaf */

/**
 * A lens on the free diagonal with a midrib. The two sides are quarter arcs
 * of one radius 17 about (4,4) and (20,20), which are symmetric about both
 * diagonals, and the tips are r=1 fillets (fill: 2) whose circles sit on
 * (20,4) and (4,20) so the painted tips land on (22,2) and (2,22): the
 * fillet's CIRCLE is what is tangent to the box, §3 of the reference. Across
 * the middle the lens is 11.4 on the path. The rib runs along the axis from
 * (7.5,16.5) to (16.5,7.5), which is as far as the lens keeps 2 of daylight
 * either side of it: half-width w(t) = 17 - sqrt(128 + t^2) must clear 4, so
 * t <= 6.4. Sharp re-solves the side radius so the arcs cross exactly on
 * (21,3) and (3,21), a unit inside the box for the round join, and the rib's
 * ends square up, the rib shortened to t = 5.4 so its cap corners keep the 2.
 * The fill knocks the rib out as a stadium.
 */
// SUPERSEDED by his drawing in tools/batch-d/refit.mjs: kept for the record,
// and moved to SETS_OLD after a run of this file silently overwrote two of
// his refits in raw/.
SETS_OLD['leaf'] = () => {
  const BOX = [2, 2, 22, 22];
  const RIB = [[7.5, 16.5], [16.5, 7.5]];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    let lens;
    if (!sharp) {
      lens = new Path().M([20, 3]).A([20, 20], -90, -180, -1).A([4, 20], 180, 90, -1)
        .A([4, 4], 90, 0, -1).A([20, 4], 0, -90, -1).Z();
    } else {
      // Quarter circles of r=18 about (21,21) and (3,3): each arc's own apex
      // IS the tip, so the tips sit on (21,3) and (3,21) and the round join
      // paints the box. Any other centre puts an arc's apex past the tip.
      lens = new Path().M([21, 3]).A([21, 21], -90, -180, -1).A([3, 3], 90, 0, -1).Z();
    }
    const plate = plateOf(lens.segs);
    let ribPts = RIB;
    if (sharp) {
      // the butt cap's corners are what reach the sides: shorten the rib until
      // the nearer corner sits 3 from the lens's centre line (its ink plus 2)
      const U = [Math.SQRT1_2, -Math.SQRT1_2], N = [Math.SQRT1_2, Math.SQRT1_2];
      const cornerGap = (t) => {
        const E = add([12, 12], mul(U, t + Math.SQRT2 - 1));
        return Math.min(...[1, -1].map((s) => 18 - len(sub(add(E, mul(N, s)), [21, 21]))));
      };
      const t = solve(cornerGap, 3, 7, 3);
      ribPts = sharpen([add([12, 12], mul(U, -t)), add([12, 12], mul(U, t))], [true, true], BOX);
    }
    const rib = runPath(ribPts);
    const d = lens.toString() + rib;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, outlineRun(lineSegs(ribPts), 1, sharp ? 'butt' : 'round')))];
  }
  return out;
};
BOXES['leaf'] = [2, 2, 22, 22];

/* -------------------------------------------------------- wind-turbine */

/**
 * A tower and three blades from one hub, the vertical size. The blades are
 * 120 degrees apart, one straight up; their length is 8 / cos 30, which puts
 * the side tips on x=4 and 20 and so the ink on 3..21, and the hub then
 * sits 2 + L down from the top so the upper tip paints y=1. The tower drops
 * from the hub to (12,22). Rotor radius 9.24 against a tower of 10.8, which
 * is a turbine's proportion. Open strokes meeting at a point: stroke only,
 * four free ends squared in sharp.
 */
// SUPERSEDED 12 Sep 2026: three bare lines and a post, redrawn in refit.mjs
// from his references with a hub, a mast and a ground rule.
SETS_OLD['wind-turbine'] = () => {
  const BOX = [3, 1, 21, 23];
  const L = 8 / Math.cos(rad(30));
  const H = [12, 2 + L];
  const tips = [270, 30, 150].map((a) => add(H, mul([Math.cos(rad(a)), Math.sin(rad(a))], L)));
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    // the tower and the upper blade are one run through the hub: split there,
    // the linter trims both pieces' hub ends and reads the pair as a 0 gap
    const d = run([tips[0], H, [12, 22]], sharp, [true, true], BOX) + tips.slice(1).map((t) => run([H, t], sharp, [false, true], BOX)).join('');
    out[`stroke.${key}`] = [S(d)];
  }
  return out;
};
BOXES['wind-turbine'] = [3, 1, 21, 23];

/* ------------------------------------------------------------- droplet */

/**
 * A drop, the vertical size: a body circle of r=8 about (12,14), so the
 * ink is 3..21 across and reaches 23 at the bottom, and a tip whose r=1
 * fillet circle sits on (12,3) so the painted apex lands on y=1. The sides
 * are the two external tangents common to those circles, which fixes the
 * tip's angle at 79 degrees with nothing chosen. Sharp puts a true vertex on
 * (12,2) and takes the tangents from that point instead; the round join
 * paints the same apex.
 */
// SUPERSEDED by his drawing in tools/batch-d/refit.mjs: kept for the record,
// and moved to SETS_OLD after a run of this file silently overwrote two of
// his refits in raw/.
SETS_OLD['droplet'] = () => {
  const C = [12, 14], R = 8;
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    let body;
    if (!sharp) {
      const F = [12, 3], r = 1;
      const dd = len(sub(C, F));
      const ny = -(R - r) / dd, nx = Math.sqrt(1 - ny * ny);
      const onC = (s) => add(C, mul([s * nx, ny], R)), onF = (s) => add(F, mul([s * nx, ny], r));
      body = new Path().M(onC(1)).A(C, angleOf(C, onC(1)), angleOf(C, onC(-1)), 1)
        .L(onF(-1)).A(F, angleOf(F, onF(-1)), angleOf(F, onF(1)), 1).Z();
    } else {
      const T = [12, 2];
      const dd = len(sub(C, T));
      const ny = -R / dd, nx = Math.sqrt(1 - ny * ny);
      const onC = (s) => add(C, mul([s * nx, ny], R));
      body = new Path().M(onC(1)).A(C, angleOf(C, onC(1)), angleOf(C, onC(-1)), 1).L(T).Z();
    }
    const plate = plateOf(body.segs);
    out[`stroke.${key}`] = [S(body)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(body)];
    out[`fill.${key}`] = [F_(contourPath(plate))];
  }
  return out;
};
BOXES['droplet'] = [3, 1, 21, 23];

/* ---------------------------------------------------------- piggy-bank */

/**
 * A side view on the horizontal size, ink 1..23 by 3..21. The body is the
 * house rounded rectangle 2..22 by 8..17 on r=3 with an ear rising off its
 * back: base 13..19 on the top edge, apex solved so the r=1 fillet paints
 * y=3 (h = 4.92, from 5 = 8 - h + sqrt(h^2 + 9) / 3), and the ear's right
 * foot lands exactly on the corner fillet's tangent point. An eye is a bead
 * (filled r=1.5) at (17,12.5), 2 clear of the back's inner ink; two legs
 * hang from the floor at x=7 and 17 to y=20; and the coin is a dash on y=4
 * from x=6 to 10, 2 clear of the back and 2.6 from the ear's edge, which is
 * what says bank rather than pig. The fill is the silhouette solid with the
 * eye cut out and the legs and the coin left as strokes. Sharp puts the
 * ear's vertex on (16,4) for the same painted top.
 */
// SUPERSEDED by his drawing in tools/batch-d/refit.mjs.
SETS_OLD['piggy-bank'] = () => {
  const BOX = [1, 3, 23, 21];
  const EYE = [15.5, 12.5];
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const r = sharp ? 0 : 3, re = sharp ? 0 : 1;
    const ya = sharp ? 4 : 8 - (54 + Math.sqrt(54 * 54 - 4 * 8 * 72)) / 16;
    const { body, plate } = bodyAndPlate(
      [[2, 8], [11, 8], [14, ya], [17, 8], [20, 8], [20, 11], [22, 11], [22, 14], [20, 14], [20, 17], [2, 17]],
      [r, 0, re, 0, r, 0, re, re, 0, r, r]);
    const legs = run([[7, 17], [7, 20]], sharp, [false, true], BOX) + run([[16, 17], [16, 20]], sharp, [false, true], BOX);
    const coin = run([[4, 4], [8, 4]], sharp, [true, true], BOX);
    const eye = circlePath(EYE, 1.5);
    const d = body.toString() + legs + coin;
    out[`stroke.${key}`] = [S(d), F_(eye)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(eye)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, circleSegs(EYE, 1.5))), S(legs + coin)];
  }
  return out;
};
BOXES['piggy-bank'] = [1, 3, 23, 21];

/* ---------------------------------------------------------------- bird */

/**
 * A perched bird facing up-right, on the free diagonal: a body circle of
 * r=6.5 about (10,13) under a head circle of r=4 about (15,6), one outline
 * walked round the union with the neck crossings as reflex corners, a beak
 * off the head's front to a true point on (22,6), a tail off the body's
 * lower left to a true point on (2,19) off base points at 150 and 180
 * degrees (a base past 192 puts the edge inside the circle: the tangents
 * from the apex touch at 93.6 and 192.6), an eye as a 2-unit mark (filled r=1)
 * at the head's centre, 2 clear of the head's inner ink, and two legs
 * dropping from the body at x=8 and 12 to y=22. The points paint through the
 * round join, so the ink is 1..23 both ways and the rounded and sharp
 * outlines are the same drawing: a closed shape with no fillet has nothing
 * for sharp to square but the legs. The fill is the silhouette solid with
 * the eye cut out, legs as strokes.
 */
// SUPERSEDED by his drawing in tools/batch-d/refit.mjs.
SETS_OLD['bird'] = () => {
  const B = [10, 13], RB = 6.5, H = [15, 6], RH = 4;
  const BEAK = [22, 6], TAIL = [2, 19];
  const BOX = [1, 1, 23, 23];
  const out = {};
  // the two crossings of the circles, upper (neck) and lower (breast)
  const dd = len(sub(H, B)), e = unit(sub(H, B)), nn = [-e[1], e[0]];
  const x = (dd * dd + RB * RB - RH * RH) / (2 * dd), hh = Math.sqrt(RB * RB - x * x);
  const X = [1, -1].map((s) => add(add(B, mul(e, x)), mul(nn, hh * s)));
  const [X1, X2] = X[0][1] > X[1][1] ? X : [X[1], X[0]];          // X1 breast (lower), X2 neck (upper)
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const beakBase = [-25, 25].map((a) => onArc(H, RH, a));
    const tailBase = [150, 180].map((a) => onArc(B, RB, a));
    const p = new Path().M(X2);
    // over the head clockwise (increasing screen angle) to the beak, round the beak, on to the breast
    p.A(H, angleOf(H, X2) - 360, angleOf(H, beakBase[0]), 1).L(BEAK).L(beakBase[1])
      .A(H, angleOf(H, beakBase[1]), angleOf(H, X1), 1)
      .A(B, angleOf(B, X1), angleOf(B, tailBase[0]), 1).L(TAIL).L(tailBase[1])
      .A(B, angleOf(B, tailBase[1]), angleOf(B, X2) + 360, 1).Z();
    const plate = plateOf(p.segs);
    const legTop = (lx) => [lx, B[1] + Math.sqrt(RB * RB - (lx - B[0]) ** 2)];
    const legs = [8, 12].map((lx) => run([legTop(lx), [lx, 22]], sharp, [false, true], BOX)).join('');
    const eye = circlePath(H, 1);
    const d = p.toString() + legs;
    out[`stroke.${key}`] = [S(d), F_(eye)];
    out[`duotone.${key}`] = [P(contourPath(plate)), S(d), F_(eye)];
    out[`fill.${key}`] = [F_(contourPath(plate) + hole(plate, circleSegs(H, 1))), S(legs)];
  }
  return out;
};
BOXES['bird'] = [1, 1, 23, 23];

/* ------------------------------------------------------------------ main */

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const outArg = args.find((a) => a.startsWith('--out='));
  const root = outArg ? resolve(outArg.slice(6)) : ROOT;
  const want = args.filter((a) => !a.startsWith('--'));
  const names = want.length ? want : Object.keys(SETS);
  for (const name of names) {
    if (!SETS[name]) throw new Error(`no such set: ${name}`);
    const variants = SETS[name]();
    assertBox(name, variants, BOXES[name]);
    writeSet(root, name, variants);
    const box = inkOf(variants['stroke.regular'], 'round');
    console.log(name.padEnd(14), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
      ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
      ` gap ${tightest(variants['stroke.regular']).toFixed(2)}`,
      ` ${Object.keys(variants).length} variants`);
  }
}

export { SETS };
