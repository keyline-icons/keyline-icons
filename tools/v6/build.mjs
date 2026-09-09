/**
 * Emit the v0.6.0 drawings into raw/ (or --out=<dir>/raw).
 *   node tools/v6/build.mjs [name ...] [--out=DIR]
 *
 * Every plate here is `offsetContour` at 1, verified sample by sample, because
 * a plate can be exactly the right size and the wrong shape and a bounding box
 * cannot see it. Every knockout is wound AGAINST its plate and counted before
 * it ships — `send` shipped a hole that was not a hole on 8 Sep and nothing in
 * the pipeline had an opinion about it.
 */
import { resolve } from 'node:path';
import * as I from './icons.mjs';
import * as F from './refs.mjs';
import { offsetPath, verify as verifyCubic } from './offset-cubic.mjs';
import { writeSet } from '../v5/raw.mjs';
import { offsetContour, contourPath, verify, flatten } from '../v5/offset.mjs';
import { Path, onArc, n, add, sub, mul, len, dot } from '../v5/geom.mjs';
import { sharpEndIn } from '../v5/icons.mjs';
import { strokedBBox } from '../../pipeline/lib/geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d: String(d) });
const F_ = (d) => ({ kind: 'solid', d: String(d) });
const P = (d) => ({ kind: 'plate', d: String(d) });

/**
 * `offsetContour` opens a join arc at any 180-degree reversal. At a CONVEX one —
 * the foot of an open book's spine — that arc is the round tip the drawing
 * wants. At a REFLEX one — the notch between two page tops — it is wrong twice
 * over: the two offsets genuinely cross, three units away rather than next to
 * the vertex, so the crossing search does not find them, and the arc it opens
 * instead dips a unit back into the material.
 *
 * The tell is whether the two offset arcs either side of the join CROSS inside
 * their own extents. At the foot they cannot — two radius-2 arcs six units apart
 * — so the join is the round tip and stays. At the notch they do, and the join
 * is dropped and both arcs trimmed to the crossing. Measuring the join arc's own
 * distance to the source does not separate them: every point of it sits exactly
 * a unit from the vertex it turns about, in both cases.
 */
function trimReflexJoins(off, segs, delta) {
  const poly = flatten(segs, 48);
  const near = (p) => {
    let m = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
      m = Math.min(m, len(sub(p, add(a, mul(ab, t)))));
    }
    return m;
  };
  const out = [...off];
  for (let i = out.length - 1; i >= 0; i--) {
    const j = out[i];
    if (j.type !== 'A' || Math.abs(j.r - delta) > 1e-9) continue;
    const a = out[(i - 1 + out.length) % out.length], b = out[(i + 1) % out.length];
    if (a.type !== 'A' || b.type !== 'A') continue;
    const X = arcArcCrossing(a, b);
    if (!X || near(X) < delta - 1e-6) continue;
    a.a1 = spanTo(a, X);
    b.a0 = spanTo(b, X, true);
    out.splice(i, 1);
  }
  return out;
}

const degOf = (c, p) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;
const inSpan = (s, a) => {
  const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
  for (let k = -2; k <= 2; k++) if (a + 360 * k >= lo - 1e-6 && a + 360 * k <= hi + 1e-6) return true;
  return false;
};
const spanTo = (s, X, start = false) => {
  const a = degOf(s.c, X);
  for (let k = -2; k <= 2; k++) {
    const v = a + 360 * k;
    const anchor = start ? s.a1 : s.a0;
    if (Math.abs(v - anchor) <= 360) {
      const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
      if (v >= lo - 1e-6 && v <= hi + 1e-6) return v;
    }
  }
  return a;
};

/** Where two arcs' circles cross, taking the crossing inside both extents. */
function arcArcCrossing(a, b) {
  const d = len(sub(b.c, a.c));
  if (d < 1e-9 || d > a.r + b.r || d < Math.abs(a.r - b.r)) return null;
  const x = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
  const h = Math.sqrt(Math.max(0, a.r * a.r - x * x));
  const e = mul(sub(b.c, a.c), 1 / d), nr = [-e[1], e[0]];
  for (const k of [1, -1]) {
    const P = add(add(a.c, mul(e, x)), mul(nr, h * k));
    if (inSpan(a, degOf(a.c, P)) && inSpan(b, degOf(b.c, P))) return P;
  }
  return null;
}

/** The plate for a closed contour: offset a unit, and checked. */
function plateOf(segs) {
  const off = trimReflexJoins(offsetContour(segs, 1), segs, 1);
  verify(segs, off, 1);
  return off;
}

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
};

/**
 * A hole, wound against its plate. Under the non-zero rule these files use, a
 * subpath wound the same way as the body simply paints, and the drawing ships
 * solid with no interior at all — which is invisible in the path data, in the
 * box and in the linter.
 */
function hole(plateSegs, holeSegs) {
  const s = (segs) => Math.sign(areaOf(flatten(segs, 24)));
  const h = s(plateSegs) === s(holeSegs) ? [...holeSegs].reverse().map(reverseSeg) : holeSegs;
  return contourPath(h);
}
const reverseSeg = (g) =>
  g.type === 'L' ? { type: 'L', p0: g.p1, p1: g.p0 } : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 };

const SETS = {};

/* ------------------------------------------------------------------ flame */

// The tip and the tongue are true vertices already and there is not a fillet or
// a free end in the drawing, so the sharp treatment has nothing to take out:
// both halves are the same path, which is the honest answer rather than a
// difference invented to fill the axis.
SETS.flame = () => {
  // His bulb, flank and tip with the tongue arched. The plate is the cubic
  // offset, checked sample by sample; the tip is a true vertex with no fillet
  // and there is no free end anywhere, so the sharp half is the same path.
  const d = String(F.flame2());
  const pl = offsetPath(d, 1);
  verifyCubic(d, pl, 1);
  const out = {};
  for (const key of ['regular', 'sharp']) {
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(pl), S(d)];
    out[`fill.${key}`] = [F_(pl)];
  }
  return out;
};

/* ------------------------------------------------------------------ store */

/**
 * Where a contour crosses a vertical line, as the segment it happens on and the
 * angle along it. Only arcs are searched, which is all this needs: the canopy's
 * plate meets the shop wall on a scallop.
 */
function crossAtX(segs, X, ylo, yhi) {
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    if (s.type !== 'A') continue;
    const dx = X - s.c[0];
    if (Math.abs(dx) > s.r) continue;
    const dy = Math.sqrt(s.r * s.r - dx * dx);
    for (const y of [s.c[1] + dy, s.c[1] - dy]) {
      if (y < ylo || y > yhi) continue;
      const a = (Math.atan2(y - s.c[1], dx) * 180) / Math.PI;
      const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
      for (const k of [-720, -360, 0, 360, 720])
        if (a + k > lo + 1e-9 && a + k < hi - 1e-9) return { i, a: a + k, y };
    }
  }
  throw new Error(`no crossing of x=${X} between y=${ylo} and ${yhi}`);
}

/**
 * The store's silhouette, as ONE contour rather than two that overlap.
 *
 * The canopy's plate and the body's plate genuinely overlap: the plate's valance
 * dips to 11 between the scallops but only reaches 9.95 at the cusps, so the
 * body has to start above that or a notch of daylight opens at every cusp. Two
 * overlapping subpaths wound the same way do paint under the non-zero rule, and
 * that is what `icons/` and the site use, so this looked correct everywhere it
 * was checked.
 *
 * It is not correct. Figma writes every fill variant with
 * `fill-rule="evenodd"`, where an overlap CANCELS: the band where the two
 * plates meet turned white and cut straight across the valance, and the
 * `check-figma` signature could not see it, because that signature compares
 * geometry and never asks which rule paints it. So the union is cut here
 * instead. The canopy's outline is trimmed where its end scallop crosses the
 * shop wall, the body's three sides are spliced in, and the result paints the
 * same under either rule.
 */
function storeSilhouette(sharp) {
  const canopy = plateOf(F.storeCanopy2({ sharp }).segs);
  const x0 = F.ST.bodyX[0] - 1, x1 = F.ST.bodyX[1] + 1, foot = F.ST.floor + 1;
  const r = (sharp ? 0 : F.ST.rBody) + 1;
  const R = crossAtX(canopy, x1, F.ST.wall + 1.5, foot);
  const L = crossAtX(canopy, x0, F.ST.wall + 1.5, foot);
  const body = [
    { type: 'L', p0: [x1, R.y], p1: [x1, foot - r] },
    { type: 'A', c: [x1 - r, foot - r], r, a0: 0, a1: 90 },
    { type: 'L', p0: [x1 - r, foot], p1: [x0 + r, foot] },
    { type: 'A', c: [x0 + r, foot - r], r, a0: 90, a1: 180 },
    { type: 'L', p0: [x0, foot - r], p1: [x0, L.y] },
  ];
  return [
    ...canopy.slice(0, R.i), { ...canopy[R.i], a1: R.a },
    ...body,
    { ...canopy[L.i], a0: L.a }, ...canopy.slice(L.i + 1),
  ];
}

SETS.store = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const silhouette = storeSilhouette(sharp);
    const plate = contourPath(silhouette);
    const d = F.store2({ sharp });
    const door = F.storeDoorway2({ sharp }).segs;
    // The fill OPENS the canopy: a valance filled solid is a roof, and the
    // scallops are the whole reason the drawing reads as a shop.
    const inner = F.storeCanopyInner().segs;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(plate), S(d)];
    out[`fill.${key}`] = [F_(plate + hole(silhouette, inner) + hole(silhouette, door))];
  }
  return out;
};

/* -------------------------------------------------------------- buildings */

SETS.buildings = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const pl = plateOf(F.buildings2Silhouette({ sharp }).segs);
    const d = F.buildings2({ sharp });
    const holes = [F.buildings2Doorway({ sharp }).segs, ...F.buildings2WindowHoles(sharp)]
      .map((h) => hole(pl, h)).join('');
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(pl) + holes)];
  }
  return out;
};

/* -------------------------------------------------------------------- cpu */

SETS.cpu = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const pkg = I.cpuPackage({ sharp }).segs;
    const pl = plateOf(pkg);
    const d = I.cpu({ sharp });
    // The fill opens the die whole rather than slotting its outline: a panelled
    // object opens a panel (`map`, `briefcase`), and a slotted die would leave a
    // solid pip inside a white ring.
    const die = plateOf(I.cpuDie({ sharp }).segs);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(pl) + hole(pl, die)), S(I.cpuPins({ sharp }))];
  }
  return out;
};

/* -------------------------------------------------------- graduation-cap */

SETS['graduation-cap'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const board = I.capBoard({ sharp });
    const pl = plateOf(I.capBoardPath({ sharp }).segs);
    const rest = F.capBowl2({ sharp, board }) + F.capTassel2({ sharp });
    const d = board.d + rest;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    // The bowl and the tassel stay strokes under a solid board — `truck` and
    // `gift`'s pattern, where the filled region is one part of the object.
    out[`fill.${key}`] = [F_(contourPath(pl)), S(rest)];
  }
  return out;
};

/* ------------------------------------------- book, its signs, and book-open */

const SIGNS = {
  plus: { regular: 'M17 16V22M14 19H20', sharp: 'M17 15L17 23M13 19L21 19' },
  minus: { regular: 'M14 19H20', sharp: 'M13 19L21 19' },
  check: { regular: 'M14 19L16 21L20 17', sharp: 'M13.7071 18.7071L16 21L20.2929 16.7071' },
  x: { regular: 'M14 16L20 22M20 16L14 22', sharp: 'M13.7071 15.7071L20.2929 22.2929M20.2929 15.7071L13.7071 22.2929' },
};
const CUT = { regular: { x: 10, y: 12 }, sharp: { x: 11, y: 13 } };

for (const sign of [null, ...Object.keys(SIGNS)]) {
  const name = sign ? `book-${sign}` : 'book';
  SETS[name] = () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const cut = sign ? CUT[key] : null;
      const signPath = sign ? SIGNS[sign][key] : '';
      const d = F.bookCover2({ sharp, cut }) + F.bookSpine2() + signPath;
      const pl = F.bookPlate2({ sharp, cut }).segs;
      // `map` opens a panel and `panel-left` slots a rule; the book has one of
      // each, so the page block below the band opens and the spine is slotted.
      const holes = hole(pl, F.bookBlock2({ cut }).segs) + hole(pl, F.bookSpineSlot2().segs);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
      out[`fill.${key}`] = [F_(contourPath(pl) + holes), ...(sign ? [S(signPath)] : [])];
    }
    return out;
  };
}

SETS['book-open'] = () => {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const sil = I.bookOpenOutline({ sharp }).segs;
    const pl = plateOf(sil);
    const d = I.bookOpen({ sharp });
    const gutter = I.bookOpenGutter({ sharp }).segs;
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(contourPath(pl)), S(d)];
    out[`fill.${key}`] = [F_(contourPath(pl) + hole(pl, gutter))];
  }
  return out;
};

/* ------------------------------------------------------------------ main */

const args = process.argv.slice(2);
const outArg = args.find((a) => a.startsWith('--out='));
const root = outArg ? resolve(outArg.slice(6)) : ROOT;
const want = args.filter((a) => !a.startsWith('--'));
const names = want.length ? want : Object.keys(SETS);

for (const name of names) {
  if (!SETS[name]) throw new Error(`no such set: ${name}`);
  const variants = SETS[name]();
  writeSet(root, name, variants);
  const box = strokedBBox(variants['stroke.regular'][0].d, 1, 'round');
  console.log(name.padEnd(16), 'ink', box.map((v) => v.toFixed(2).padStart(6)).join(' '),
    ` ${(box[2] - box[0]).toFixed(1)} x ${(box[3] - box[1]).toFixed(1)}`,
    ` ${Object.keys(variants).length} variants`);
}
