/**
 * The outline of a stroked open run, as one closed contour.
 *
 * A container makes an open glyph fillable, and the filled style knocks the
 * glyph out of the disc — so the glyph has to become the boundary of its own
 * ink rather than a stroke. `percent`'s circle fill is the precedent: its slash
 * ships as the stadium it paints.
 *
 * `offsetContour` cannot do this. It picks each arc's side by asking whether
 * the material lies outward, tested against the contour as a polygon, and a run
 * doubled back on itself encloses no area for that test to read. Fed the
 * dollar's S it put the second bowl's offset on the wrong side and opened a
 * join arc across the inflection. The side of a stroke offset does not depend
 * on curvature at all: it is fixed by the tangent, so an arc's left offset is
 * `r + sign(sweep) * half` and nothing else needs deciding.
 */
import { onArc, add, sub, mul, unit, len, dot } from '../v5/geom.mjs';

const deg = (r) => (r * 180) / Math.PI;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));
const startPt = (s) => (s.type === 'L' ? s.p0 : onArc(s.c, s.r, s.a0));
const endPt = (s) => (s.type === 'L' ? s.p1 : onArc(s.c, s.r, s.a1));
const revSeg = (g) => (g.type === 'L'
  ? { type: 'L', p0: g.p1, p1: g.p0 }
  : { type: 'A', c: g.c, r: g.r, a0: g.a1, a1: g.a0 });

const tangentAt = (s, which) => {
  if (s.type === 'L') return unit(sub(s.p1, s.p0));
  const a = ((which === 'end' ? s.a1 : s.a0) * Math.PI) / 180;
  return unit(mul([-Math.sin(a), Math.cos(a)], Math.sign(s.a1 - s.a0) || 1));
};

/** Left of travel, in screen coordinates, so a rightward run offsets upward. */
const leftOf = (t) => [t[1], -t[0]];

function leftOffset(s, half) {
  if (s.type === 'L') {
    const n = mul(leftOf(unit(sub(s.p1, s.p0))), half);
    return { type: 'L', p0: add(s.p0, n), p1: add(s.p1, n) };
  }
  const r = s.r + Math.sign(s.a1 - s.a0) * half;
  return r <= 1e-9 ? null : { type: 'A', c: s.c, r, a0: s.a0, a1: s.a1 };
}

const within = (s, p) => {
  if (s.type === 'L') {
    const u = sub(s.p1, s.p0), t = dot(sub(p, s.p0), u) / dot(u, u);
    return t > -1e-6 && t < 1 + 1e-6;
  }
  const dir = Math.sign(s.a1 - s.a0) || 1;
  let a = ang(s.c, p);
  const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
  for (let k = -2; k <= 2; k++) if (a + 360 * k >= lo - 1e-6 && a + 360 * k <= hi + 1e-6) return true;
  return false;
};

const lineLine = (a, b) => {
  const u = sub(a.p1, a.p0), v = sub(b.p1, b.p0);
  const d = u[0] * v[1] - u[1] * v[0];
  if (Math.abs(d) < 1e-12) return [];
  const w = sub(b.p0, a.p0);
  const t = (w[0] * v[1] - w[1] * v[0]) / d;
  return [add(a.p0, mul(u, t))];
};
const lineArc = (l, a) => {
  const d = sub(l.p1, l.p0), f = sub(l.p0, a.c);
  const A = dot(d, d), B = 2 * dot(f, d), C = dot(f, f) - a.r * a.r;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return [];
  const q = Math.sqrt(disc);
  return [(-B - q) / (2 * A), (-B + q) / (2 * A)].map((t) => add(l.p0, mul(d, t)));
};
const arcArc = (a, b) => {
  const d = len(sub(b.c, a.c));
  if (d < 1e-9 || d > a.r + b.r || d < Math.abs(a.r - b.r)) return [];
  const x = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
  const h2 = a.r * a.r - x * x;
  if (h2 < 0) return [];
  const h = Math.sqrt(h2), u = unit(sub(b.c, a.c)), n = [-u[1], u[0]];
  const m = add(a.c, mul(u, x));
  return [add(m, mul(n, h)), sub(m, mul(n, h))];
};
const crossings = (a, b) =>
  a.type === 'L' && b.type === 'L' ? lineLine(a, b)
  : a.type === 'L' ? lineArc(a, b)
  : b.type === 'L' ? lineArc(b, a)
  : arcArc(a, b);

const setEnd = (s, p, which) => {
  if (s.type === 'L') { if (which === 'end') s.p1 = p; else s.p0 = p; return; }
  const dir = Math.sign(s.a1 - s.a0) || 1;
  let a = ang(s.c, p);
  const anchor = which === 'end' ? s.a0 : s.a1;
  while (a - anchor > 180) a -= 360;
  while (anchor - a > 180) a += 360;
  if (which === 'end') s.a1 = a; else s.a0 = a;
};

/**
 * `segs` stroked at `half` either side, as a closed contour.
 * `cap` is 'round' or 'butt'; a butt cap is the chord the round one subtends.
 */
/**
 * Merge runs of collinear lines and continuing arcs.
 *
 * `sharpen` emits an end stub as its own L, so a sharpened bar arrives as three
 * collinear pieces. Each of those junctions offsets to two coincident ends,
 * which is a join with nothing to join, and the union's boundary walk then has
 * a choice where there is no corner: the sharp euro grew a zigzag across its
 * bowl. Merging first leaves one segment and no choice.
 */
function merge(segs) {
  const out = [];
  for (const s of segs) {
    const prev = out[out.length - 1];
    if (prev && prev.type === 'L' && s.type === 'L') {
      const a = sub(prev.p1, prev.p0), b = sub(s.p1, s.p0);
      if (Math.abs(a[0] * b[1] - a[1] * b[0]) < 1e-9 && dot(a, b) > 0) { prev.p1 = s.p1; continue; }
    }
    if (prev && prev.type === 'A' && s.type === 'A'
        && len(sub(prev.c, s.c)) < 1e-9 && Math.abs(prev.r - s.r) < 1e-9
        && Math.abs(prev.a1 - s.a0) < 1e-9
        && Math.sign(prev.a1 - prev.a0) === Math.sign(s.a1 - s.a0)) { prev.a1 = s.a1; continue; }
    out.push({ ...s });
  }
  return out;
}

export function outlineRun(rawSegs, half = 1, cap = 'round') {
  const segs = merge(rawSegs);
  const fwd = segs.map((s) => leftOffset(s, half)).filter(Boolean);
  const back = [...segs].reverse().map(revSeg).map((s) => leftOffset(s, half)).filter(Boolean);
  const tail = endPt(segs[segs.length - 1]), head = startPt(segs[0]);
  const rev = [...segs].reverse().map(revSeg);
  const pieces = [];
  const joinsAt = [];
  fwd.forEach((s, i) => { pieces.push(s); if (i < fwd.length - 1) joinsAt.push([pieces.length - 1, endPt(segs[i]), i]); });
  joinsAt.push([pieces.length - 1, tail]);
  back.forEach((s, i) => { pieces.push(s); if (i < back.length - 1) joinsAt.push([pieces.length - 1, endPt(rev[i])]); });
  joinsAt.push([pieces.length - 1, head]);

  // Which side of a join the left offset lands on, decided from the turn: the
  // offsets separate on the outside of a corner and cross on the inside.
  const turnSign = (i) => {
    const a = segs[i], b = segs[(i + 1) % segs.length];
    if (!a || !b) return 1;
    const d0 = tangentAt(a, 'end'), d1 = tangentAt(b, 'start');
    return Math.sign(d0[0] * d1[1] - d0[1] * d1[0]) || 1;
  };

  // A join on the INSIDE has to cross, and when the piece between two turns is
  // short enough the crossing lands past its end: the whole piece is swallowed
  // by its neighbour's ink and has to go, with its neighbours trimmed to each
  // other instead. `offsetContour` runs to a fixed point for the same reason.
  // Without it his rupee's waist, which doubles back after a unit and three
  // quarters, kept a spur of black poking into the white of the leg.
  const swallowed = new Set();
  for (let pass = 0; pass < 8; pass++) {
    const bad = [];
    for (let k = 0; k < joinsAt.length; k++) {
      const [idx, V, srcIdx] = joinsAt[k];
      if (swallowed.has(idx)) continue;
      const isCap = len(sub(V, tail)) < 1e-9 || len(sub(V, head)) < 1e-9;
      if (isCap || srcIdx === undefined || turnSign(srcIdx) > 0) continue;
      let j = (idx + 1) % pieces.length;
      while (swallowed.has(j)) j = (j + 1) % pieces.length;
      const a = pieces[idx], b = pieces[j];
      const X = crossings(a, b).filter((p) => within(a, p) && within(b, p));
      if (!X.length) bad.push([idx, j]);
    }
    if (!bad.length) break;
    for (const [i, j] of bad) {
      const li = a2len(pieces[i]), lj = a2len(pieces[j]);
      swallowed.add(li < lj ? i : j);
    }
  }
  const keep = pieces.map((s, i) => (swallowed.has(i) ? null : { ...s, _i: i }));
  const out = keep.filter(Boolean);
  const vertexAfter = new Map(joinsAt.map(([idx, V]) => [idx, V]));

  for (let k = out.length - 1; k >= 0; k--) {
    const cur = out[k], nxt = out[(k + 1) % out.length];
    const V = vertexAfter.get(cur._i) || vertexAfter.get(cur._i);
    if (!V) continue;
    const e = endPt(cur), s0 = startPt(nxt);
    if (len(sub(e, s0)) < 1e-9) continue;
    const isCap = len(sub(V, tail)) < 1e-9 || len(sub(V, head)) < 1e-9;
    if (!isCap) {
      const X = crossings(cur, nxt)
        .filter((p) => within(cur, p) && within(nxt, p))
        .sort((p, q) => len(sub(p, V)) - len(sub(q, V)))[0];
      if (X) { setEnd(cur, X, 'end'); setEnd(nxt, X, 'start'); continue; }
      // Only on the INSIDE of a turn. The offsets there have to meet, and when
      // the piece between two corners is short the meeting point lands past its
      // end; extending both to it is the same repair as dropping the piece.
      // Gate it on the turn or it eats every convex corner: the franc's F lost
      // the round join at its top left and came back square.
      const d0 = tangentAt(cur, 'end'), d1 = tangentAt(nxt, 'start');
      if (d0[0] * d1[1] - d0[1] * d1[0] < 0) {
        const Y = crossings(cur, nxt).sort((p, q) => len(sub(p, V)) - len(sub(q, V)))[0];
        if (Y && len(sub(Y, V)) < 6) { setEnd(cur, Y, 'end'); setEnd(nxt, Y, 'start'); continue; }
      }
    }
    if (isCap && cap === 'butt') { out.splice(k + 1, 0, { type: 'L', p0: e, p1: s0 }); continue; }
    let a0 = ang(V, e), a1 = ang(V, s0);
    while (a1 - a0 > 180) a1 -= 360;
    while (a0 - a1 > 180) a1 += 360;
    if (isCap) {
      // A cap is a 180 degree reversal, and at exactly 180 the shorter way is a
      // coin toss: the head cap came back swept through the run instead of
      // around its end, and the dollar's stem lost its top. Pick the half that
      // bulges along the tangent pointing OUT of the run, which is the only
      // thing that distinguishes them.
      const isTail = len(sub(V, tail)) < 1e-9;
      const tSeg = isTail ? segs[segs.length - 1] : segs[0];
      const t = isTail ? tangentAt(tSeg, 'end') : mul(tangentAt(tSeg, 'start'), -1);
      const want = add(V, mul(t, half));
      const mid = (m) => onArc(V, half, (a0 + m) / 2);
      a1 = len(sub(mid(a1), want)) < len(sub(mid(a0 + (a1 > a0 ? -180 : 180)), want))
        ? a1 : a0 + (a1 > a0 ? -180 : 180);
    }
    out.splice(k + 1, 0, { type: 'A', c: V, r: half, a0, a1 });
  }
  return out.map(({ _i, ...g }) => g);
}

/* ----------------------------------------------------------------- union */

/**
 * The union of several outline contours, as closed contours again.
 *
 * A glyph is several runs and they cross: the dollar's stem crosses its S three
 * times. Knocked out one run at a time the overlaps flip back to solid — under
 * `evenodd` because two holes cancel, under non-zero because two reversed
 * windings sum to -1 and paint. `plus` ships its circle fill as ONE cross-shaped
 * contour for exactly this reason, so the union has to happen before the
 * knockout rather than be left to the fill rule.
 *
 * Split every segment where it meets another contour, drop the pieces that lie
 * inside one, and chain what is left. Arcs stay arcs: only the ends move.
 */
/**
 * Distance from a point to a run's centreline, which is what decides whether a
 * piece of one outline lies inside another's ink.
 *
 * Testing the midpoint against the other outline as a POLYGON is what the first
 * pass did, and it dropped the dollar's stem cap: the two boundaries touch
 * tangentially at a T-junction, where an even-odd crossing count is a coin
 * toss. The centreline distance has no such case — a point is inside the ink
 * exactly when it is nearer than the half width.
 */
const distToSeg = (s, p) => {
  if (s.type === 'L') {
    const u = sub(s.p1, s.p0), d2 = dot(u, u);
    const t = d2 < 1e-12 ? 0 : Math.max(0, Math.min(1, dot(sub(p, s.p0), u) / d2));
    return len(sub(p, add(s.p0, mul(u, t))));
  }
  const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
  let a = ang(s.c, p);
  let on = false;
  for (let k = -2; k <= 2; k++) if (a + 360 * k >= lo && a + 360 * k <= hi) on = true;
  if (on) return Math.abs(len(sub(p, s.c)) - s.r);
  return Math.min(len(sub(p, onArc(s.c, s.r, s.a0))), len(sub(p, onArc(s.c, s.r, s.a1))));
};
/**
 * With a butt cap the ink stops flat at the free end, so the disc a round cap
 * would paint is not there. Measured as a stadium anyway, the sharp euro's bowl
 * swallowed the fragment of bar that runs past it and the union lost the piece
 * that closes the loop. Only the two FREE ends are squared off; every interior
 * junction still has a round join.
 */
const distToRunEnd = (s, p, which) => {
  if (s.type === 'L') {
    const u = sub(s.p1, s.p0), d2 = dot(u, u);
    if (d2 < 1e-12) return Infinity;
    const t = dot(sub(p, s.p0), u) / d2;
    if (which === 'start' && t < 0) return Infinity;
    if (which === 'end' && t > 1) return Infinity;
    return distToSeg(s, p);
  }
  const lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
  let a = ang(s.c, p);
  for (let k = -2; k <= 2; k++) if (a + 360 * k >= lo && a + 360 * k <= hi) return Math.abs(len(sub(p, s.c)) - s.r);
  const keep = which === 'start' ? s.a1 : s.a0;
  return len(sub(p, onArc(s.c, s.r, keep)));
};
/** A piece's own length, for deciding which of two the other has swallowed. */
const a2len = (s) => (s.type === 'L' ? len(sub(s.p1, s.p0)) : (Math.abs(s.a1 - s.a0) * Math.PI * s.r) / 180);

const distToRun = (segs, p, cap = 'round') => {
  if (cap !== 'butt' || !segs.length) return Math.min(...segs.map((s) => distToSeg(s, p)));
  return Math.min(...segs.map((s, i) => {
    if (segs.length === 1) {
      const a = distToRunEnd(s, p, 'start'), b = distToRunEnd(s, p, 'end');
      return Math.max(a, b) === Infinity ? Infinity : distToSeg(s, p);
    }
    if (i === 0) return distToRunEnd(s, p, 'start');
    if (i === segs.length - 1) return distToRunEnd(s, p, 'end');
    return distToSeg(s, p);
  }));
};

const paramOf = (s, p) => {
  if (s.type === 'L') {
    const u = sub(s.p1, s.p0);
    return dot(sub(p, s.p0), u) / dot(u, u);
  }
  const span = s.a1 - s.a0, dir = Math.sign(span) || 1;
  let a = ang(s.c, p);
  while (dir * (a - s.a0) < -1e-9) a += 360 * dir;
  while (dir * (a - s.a0) > Math.abs(span) + 1e-9) a -= 360 * dir;
  return (a - s.a0) / span;
};
const at = (s, t) => (s.type === 'L'
  ? add(s.p0, mul(sub(s.p1, s.p0), t))
  : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t));
const cut = (s, t0, t1) => (s.type === 'L'
  ? { type: 'L', p0: at(s, t0), p1: at(s, t1) }
  : { type: 'A', c: s.c, r: s.r, a0: s.a0 + (s.a1 - s.a0) * t0, a1: s.a0 + (s.a1 - s.a0) * t1 });
const key = (p) => `${Math.round(p[0] * 1e4)},${Math.round(p[1] * 1e4)}`;

export function unionContours(contours, runs, half = 1, cap = 'round') {
  const kept = [];
  contours.forEach((segs, i) => {
    for (const s of segs) {
      const ts = [0, 1];
      contours.forEach((other, j) => {
        if (i === j) return;
        for (const o of other) {
          for (const p of crossings(s, o)) {
            if (!within(s, p) || !within(o, p)) continue;
            const t = paramOf(s, p);
            if (t > 1e-6 && t < 1 - 1e-6) ts.push(t);
          }
        }
      });
      // Merge crossings that land all but on top of each other before cutting.
      // The sharp euro's bar ends a third of a unit outside the bowl it crosses,
      // which puts two crossings a hair apart and leaves a sliver piece between
      // them; a sliver has two ends in the same place and the walk can leave by
      // either, which is where its phantom loops came from.
      ts.sort((a, b) => a - b);
      const span = s.type === 'L' ? len(sub(s.p1, s.p0)) : (Math.abs(s.a1 - s.a0) * Math.PI * s.r) / 180;
      const minT = span > 1e-9 ? 2e-3 / span : 1;
      const cuts = ts.filter((t, k) => k === 0 || k === ts.length - 1 || t - ts[k - 1] > minT);
      for (let k = 0; k < cuts.length - 1; k++) {
        if (cuts[k + 1] - cuts[k] < minT) continue;
        const mid = at(s, (cuts[k] + cuts[k + 1]) / 2);
        if (runs.some((r, j) => j !== i && distToRun(r, mid, cap) < half - 1e-3)) continue;
        kept.push(cut(s, cuts[k], cuts[k + 1]));
      }
    }
  });

  // Chain the survivors nose to tail. Every kept end meets exactly one other,
  // because a crossing that split one piece split the piece it crossed too.
  // Matched by distance rather than by an exact key: the same crossing solved
  // from two different segment pairs lands a few 1e-9 apart, and an exact hash
  // then leaves a piece with no continuation, which chains into a loop that was
  // never there. The sharp euro grew three of them.
  const near = (p, q) => len(sub(p, q)) < 1e-6;
  const startsNear = (p) => kept.filter((s) => near(startPt(s), p));
  // At a crossing two kept pieces start on the same point, one from each
  // contour, and taking whichever came first cuts the corner: the dollar's S
  // grew a spike where the stem crosses it. Take the sharpest turn one way
  // instead, which is the boundary walk every union algorithm does.
  const dirIn = (s) => (s.type === 'L'
    ? unit(sub(s.p1, s.p0))
    : unit(mul([-Math.sin((s.a1 * Math.PI) / 180), Math.cos((s.a1 * Math.PI) / 180)], Math.sign(s.a1 - s.a0))));
  const dirOut = (s) => (s.type === 'L'
    ? unit(sub(s.p1, s.p0))
    : unit(mul([-Math.sin((s.a0 * Math.PI) / 180), Math.cos((s.a0 * Math.PI) / 180)], Math.sign(s.a1 - s.a0))));
  const turn = (a, b) => {
    const d = deg(Math.atan2(a[0] * b[1] - a[1] * b[0], dot(a, b)));
    return d;
  };
  const used = new Set();
  const loops = [];
  for (const seed of kept) {
    if (used.has(seed)) continue;
    const loop = [];
    let cur = seed;
    for (let guard = 0; guard < kept.length + 2; guard++) {
      used.add(cur);
      loop.push(cur);
      const nexts = startsNear(endPt(cur)).filter((s) => !used.has(s));
      if (!nexts.length) break;
      const d = dirIn(cur);
      cur = nexts.length === 1 ? nexts[0]
        : nexts.reduce((a, b) => (turn(d, dirOut(b)) > turn(d, dirOut(a)) ? b : a));
    }
    if (loop.length) loops.push(loop);
  }
  return loops;
}
