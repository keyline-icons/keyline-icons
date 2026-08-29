// What a stroked path actually paints.
//
// Round cap and round join are the easy half: the painted region is the
// Minkowski sum with a disc, so the box is the geometry box grown by half the
// stroke width on every side. Mitre joins are not, and that is the whole
// problem — a mitre reaches 1/sin(half the interior angle) past its vertex,
// which at a sharp apex is a long way further than a fillet ever went.
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / len(a));
const perp = (a) => [-a[1], a[0]];

function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [0, 1].map((i) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]);
}

/** Flatten a `d` into polylines. Curves are sampled; these drawings are mostly lines. */
export function polylines(d, steps = 24) {
  const runs = [];
  let pts = [], x = 0, y = 0, sx = 0, sy = 0;
  const flush = (closed) => { if (pts.length > 1) runs.push({ pts, closed }); pts = []; };
  for (const { cmd, args } of tokenize(d)) {
    const rel = cmd === cmd.toLowerCase(), U = cmd.toUpperCase();
    const ax = (i) => (rel ? x + args[i] : args[i]);
    const ay = (i) => (rel ? y + args[i] : args[i]);
    if (U === 'M') { flush(false); x = ax(0); y = ay(1); sx = x; sy = y; pts.push([x, y]); }
    else if (U === 'L' || U === 'H' || U === 'V') {
      const nx = U === 'V' ? x : U === 'H' ? (rel ? x + args[0] : args[0]) : ax(0);
      const ny = U === 'H' ? y : U === 'V' ? (rel ? y + args[0] : args[0]) : ay(1);
      x = nx; y = ny; pts.push([x, y]);
    } else if (U === 'C') {
      const p0 = [x, y], p1 = [ax(0), ay(1)], p2 = [ax(2), ay(3)], p3 = [ax(4), ay(5)];
      for (let i = 1; i <= steps; i++) pts.push(cubic(p0, p1, p2, p3, i / steps));
      x = p3[0]; y = p3[1];
    } else if (U === 'Z') {
      if (Math.abs(x - sx) > 1e-9 || Math.abs(y - sy) > 1e-9) pts.push([sx, sy]);
      flush(true); x = sx; y = sy; pts.push([x, y]);
    }
  }
  flush(false);
  return runs;
}

function isect(p, u, q, v) {
  const den = u[0] * v[1] - u[1] * v[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((q[0] - p[0]) * v[1] - (q[1] - p[1]) * v[0]) / den;
  return add(p, mul(u, t));
}

/**
 * Every point the stroke can paint: the offset edges, the mitre tips where the
 * join takes one, and the butt-cap corners at a free end.
 */
export function paintedPoints(d, { w = 1, join = 'miter', cap = 'butt', limit = 4 } = {}) {
  const out = [];
  for (const { pts, closed } of polylines(d)) {
    const P = pts.filter((p, i) => i === 0 || Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) > 1e-9);
    if (closed && P.length > 1 && Math.hypot(P[0][0] - P[P.length - 1][0], P[0][1] - P[P.length - 1][1]) < 1e-9) P.pop();
    const n = P.length;
    if (n < 2) { if (n === 1) out.push(P[0]); continue; }
    const seg = [];
    const count = closed ? n : n - 1;
    for (let i = 0; i < count; i++) {
      const a = P[i], b = P[(i + 1) % n];
      const dir = unit(sub(b, a)), nor = perp(dir);
      seg.push({ a, b, dir, nor });
      for (const s of [1, -1]) { out.push(add(a, mul(nor, s * w))); out.push(add(b, mul(nor, s * w))); }
    }
    // Joins.
    const joins = closed ? seg.length : seg.length - 1;
    for (let i = 0; i < joins; i++) {
      const cur = seg[i], nxt = seg[(i + 1) % seg.length];
      const cosT = cur.dir[0] * nxt.dir[0] + cur.dir[1] * nxt.dir[1];
      const turn = Math.acos(Math.max(-1, Math.min(1, cosT)));      // exterior turn
      const half = (Math.PI - turn) / 2;                            // half the interior angle
      if (join === 'round') { const v = cur.b; for (const dx of [-w, w]) for (const dy of [-w, w]) out.push([v[0] + dx, v[1] + dy]); continue; }
      const ratio = 1 / Math.sin(half);
      if (join === 'miter' && ratio <= limit) {
        for (const s of [1, -1]) {
          const p = isect(add(cur.a, mul(cur.nor, s * w)), cur.dir, add(nxt.a, mul(nxt.nor, s * w)), nxt.dir);
          if (p) out.push(p);
        }
      }
      // A bevel adds nothing the offset endpoints above do not already carry.
    }
    if (!closed && cap === 'round') {
      for (const v of [P[0], P[n - 1]]) for (const dx of [-w, w]) for (const dy of [-w, w]) out.push([v[0] + dx, v[1] + dy]);
    }
  }
  return out;
}

export function paintedBBox(paths, opts) {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const { d, filled } of paths) {
    const pts = filled ? polylines(d).flatMap((r) => r.pts) : paintedPoints(d, opts);
    for (const p of pts) {
      b[0] = Math.min(b[0], p[0]); b[1] = Math.min(b[1], p[1]);
      b[2] = Math.max(b[2], p[0]); b[3] = Math.max(b[3], p[1]);
    }
  }
  return b;
}

/** Split an icon file into its paths, flagging the ones that are fills. */
export function readPaths(src) {
  return [...src.matchAll(/<path[^>]*>/g)].map((m) => ({
    d: m[0].match(/ d="([^"]+)"/)[1],
    filled: / stroke="none"/.test(m[0]) || (/ fill="currentColor"/.test(m[0]) && !/ stroke="currentColor"/.test(m[0])),
  }));
}
