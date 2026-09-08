/**
 * Geometry helpers for the v0.5.0 batch.
 *
 * Everything here emits absolute M/L/C only — `vectorPaths` in Figma rejects
 * H/V and arcs, and `raw/` is what gets pushed there.
 */

export const K = 0.5522847498307936; // circle constant, control offset / radius

export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const mul = (a, k) => [a[0] * k, a[1] * k];
export const len = (a) => Math.hypot(a[0], a[1]);
export const unit = (a) => mul(a, 1 / len(a));
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export const cross = (a, b) => a[0] * b[1] - a[1] * b[0];

/** 4dp, trailing zeros gone, and a throw on anything non-finite. */
export function n(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate: ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
export const pt = (p) => `${n(p[0])} ${n(p[1])}`;

/* ------------------------------------------------------------------- arcs */

/** A point on the circle centred `c`, radius `r`, at screen angle `a` (deg, y down). */
export const onArc = (c, r, a) => [c[0] + r * Math.cos((a * Math.PI) / 180), c[1] + r * Math.sin((a * Math.PI) / 180)];

/**
 * Cubic segments for the arc from `a0` to `a1` (degrees, screen angles: 0 east,
 * 90 south). Split so no piece exceeds 90 degrees and so every cardinal the arc
 * crosses is an exact endpoint — the container rule from the skill, and what
 * keeps (22,12)-style points on the grid.
 */
export function arcTo(c, r, a0, a1) {
  const out = [];
  const dir = a1 > a0 ? 1 : -1;
  const stops = [a0];
  for (let k = Math.ceil(Math.min(a0, a1) / 90) * 90; k <= Math.max(a0, a1); k += 90)
    if (Math.abs(k - a0) > 1e-9 && Math.abs(k - a1) > 1e-9) stops.push(k);
  stops.push(a1);
  stops.sort((x, y) => (dir > 0 ? x - y : y - x));
  for (let i = 0; i + 1 < stops.length; i++) {
    const s = stops[i], e = stops[i + 1];
    if (Math.abs(e - s) < 1e-9) continue;
    const d = ((e - s) * Math.PI) / 180;
    const k = (4 / 3) * Math.tan(d / 4) * r;
    const p0 = onArc(c, r, s), p1 = onArc(c, r, e);
    const t0 = [-Math.sin((s * Math.PI) / 180), Math.cos((s * Math.PI) / 180)];
    const t1 = [-Math.sin((e * Math.PI) / 180), Math.cos((e * Math.PI) / 180)];
    out.push({ c1: add(p0, mul(t0, k)), c2: sub(p1, mul(t1, k)), p: p1 });
  }
  return out;
}

/** A full circle as four cubics, split on the cardinals. */
export function circlePath(c, r) {
  const p0 = onArc(c, r, 0);
  let d = `M${pt(p0)}`;
  for (const s of arcTo(c, r, 0, 360)) d += `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p)}`;
  return d + 'Z';
}

/* ---------------------------------------------------------------- fillets */

/**
 * The fillet at vertex V between neighbours A and B, radius r.
 * §7 of drawing-a-new-icon.md, verbatim: at a right angle it collapses to
 * t = r and k = 0.5523r, which is the test that this is right.
 */
export function fillet(A, V, B, r) {
  const u = unit(sub(A, V)), w = unit(sub(B, V));
  const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
  const t = r / Math.tan(alpha / 2);
  const T1 = add(V, mul(u, t)), T2 = add(V, mul(w, t));
  const k = (4 / 3) * Math.tan((Math.PI - alpha) / 4) * r;
  const bis = unit(add(u, w));
  const F = add(V, mul(bis, r / Math.sin(alpha / 2)));   // the fillet's own centre
  return { T1, T2, C1: sub(T1, mul(u, k)), C2: sub(T2, mul(w, k)), t, F };
}

/**
 * A closed polygon with a per-vertex radius. `pts` is [[x,y], ...] and `radii`
 * the matching list (0 for a true corner, which is what the sharp treatment
 * takes).
 */
export function polyPath(pts, radii) {
  const nv = pts.length;
  const parts = [];
  for (let i = 0; i < nv; i++) {
    const A = pts[(i - 1 + nv) % nv], V = pts[i], B = pts[(i + 1) % nv];
    const r = radii[i] ?? 0;
    if (r <= 1e-9) parts.push({ T1: V, T2: V, arc: null });
    else {
      const f = fillet(A, V, B, r);
      parts.push({ T1: f.T1, T2: f.T2, arc: f });
    }
  }
  let d = `M${pt(parts[0].T1)}`;
  for (let i = 0; i < nv; i++) {
    const p = parts[i];
    if (p.arc) d += `C${pt(p.arc.C1)} ${pt(p.arc.C2)} ${pt(p.T2)}`;
    const nxt = parts[(i + 1) % nv];
    d += `L${pt(nxt.T1)}`;
  }
  return d.replace(/L[^LCMZ]*$/, '') + 'Z';
}

/* ------------------------------------------------------------- path build */

/** A tiny path builder: moveTo / lineTo / arc / cubic, absolute, M-L-C only. */
export class Path {
  constructor() { this.d = ''; this.cur = null; this.segs = []; }
  M(p) { this.d += `M${pt(p)}`; this.cur = p; this.start = p; return this; }
  L(p) {
    if (len(sub(p, this.cur)) > 1e-9) { this.d += `L${pt(p)}`; this.segs.push({ type: 'L', p0: this.cur, p1: p }); this.cur = p; }
    return this;
  }
  C(c1, c2, p) { this.d += `C${pt(c1)} ${pt(c2)} ${pt(p)}`; this.cur = p; return this; }
  /** Arc about `c` from the current point to angle `a1`; radius taken from the current point. */
  A(c, a0, a1, dir = 0) {
    const r = len(sub(this.cur, c));
    let end = a1;
    if (dir) {
      while (dir > 0 && end <= a0) end += 360;
      while (dir < 0 && end >= a0) end -= 360;
    } else {
      while (end - a0 > 180) end -= 360;
      while (a0 - end > 180) end += 360;
    }
    if (Math.abs(end - a0) < 1e-9) return this;
    for (const s of arcTo(c, r, a0, end)) this.C(s.c1, s.c2, s.p);
    this.segs.push({ type: 'A', c, r, a0, a1: end });
    return this;
  }
  /** A filleted corner: turn from the current point toward `B` around vertex `V`. */
  corner(V, B, r) {
    const f = fillet(this.cur, V, B, r);
    this.L(f.T1);
    if (r > 1e-9) {
      this.C(f.C1, f.C2, f.T2);
      const a = (p) => (Math.atan2(p[1] - f.F[1], p[0] - f.F[0]) * 180) / Math.PI;
      let a0 = a(f.T1), a1 = a(f.T2);
      while (a1 - a0 > 180) a1 -= 360;
      while (a0 - a1 > 180) a1 += 360;
      this.segs.push({ type: 'A', c: f.F, r, a0, a1 });
      this.cur = f.T2;
    } else this.L(V);
    return this;
  }
  Z() {
    if (this.start && len(sub(this.start, this.cur)) > 1e-9) this.segs.push({ type: 'L', p0: this.cur, p1: this.start });
    this.d += 'Z';
    return this;
  }
  toString() { return this.d; }
}

/**
 * The fillet of radius `r` between a straight line (through P, unit direction
 * u) and a circle (centre C, radius R), tangent to both, sitting on the side of
 * the line that `nrm` points to and tangent to the circle from inside.
 * Returns the two tangent points and the fillet's centre.
 */
export function filletLineArc(P, u, nrm, C, R, r) {
  // F = P + s*u + r*nrm, with |F - C| = R - r.
  const q = sub(add(P, mul(nrm, r)), C);
  const b = 2 * dot(q, u), c = dot(q, q) - (R - r) * (R - r);
  const disc = b * b - 4 * c;
  if (disc < 0) throw new Error('no fillet between that line and arc');
  const roots = [(-b - Math.sqrt(disc)) / 2, (-b + Math.sqrt(disc)) / 2].sort((x, y) => x - y);
  const s = roots.find((v) => v >= -1e-9) ?? roots[1];
  const F = add(add(P, mul(u, s)), mul(nrm, r));
  const T = add(P, mul(u, s));                       // on the line
  const A = add(C, mul(sub(F, C), R / (R - r)));     // on the circle
  return { F, T, A, s };
}

/**
 * A closed filleted polygon as a `Path`, so its segments are recorded and it
 * can be offset. Same construction as `polyPath`, but it starts at the first
 * fillet's exit so the closing line lands on the right point.
 */
export function polyContour(pts, radii) {
  const nv = pts.length;
  const start = radii[0] > 1e-9
    ? fillet(pts[nv - 1], pts[0], pts[1], radii[0]).T2
    : pts[0];
  const p = new Path().M(start);
  for (let i = 1; i < nv; i++) p.corner(pts[i], pts[(i + 1) % nv], radii[i] ?? 0);
  p.corner(pts[0], pts[1], radii[0] ?? 0);
  return p.Z();
}

/**
 * The fillet of radius `r` in the notch where two circles cross — the join
 * where a quote mark's tail runs back into its bowl. Concave, so the fillet's
 * centre sits `R + r` from one and `ri + r` from the other.
 */
export function filletArcArc(B, R, T, ri, r, toward) {
  const d = len(sub(T, B));
  const a = R + r, b = ri + r;
  const x = (d * d + a * a - b * b) / (2 * d);
  const h2 = a * a - x * x;
  if (h2 < 0) throw new Error('no fillet in that notch');
  const h = Math.sqrt(h2);
  const e = unit(sub(T, B)), nrm = [-e[1], e[0]];
  const both = [1, -1].map((k) => add(add(B, mul(e, x)), mul(nrm, h * k)));
  const F = toward ? both.reduce((p, q) => (len(sub(q, toward)) < len(sub(p, toward)) ? q : p)) : both[0];
  return {
    F,
    onB: add(B, mul(unit(sub(F, B)), R)),      // tangency on the bowl
    onT: add(T, mul(unit(sub(F, T)), ri)),     // tangency on the tail's inner arc
  };
}

/** Where two circles cross, the crossing nearer `toward`. */
export function circleCross(B, R, T, ri, toward) {
  const d = len(sub(T, B));
  const x = (d * d + R * R - ri * ri) / (2 * d);
  const h = Math.sqrt(Math.max(0, R * R - x * x));
  const e = unit(sub(T, B)), nrm = [-e[1], e[0]];
  const both = [1, -1].map((k) => add(add(B, mul(e, x)), mul(nrm, h * k)));
  return both.reduce((p, q) => (len(sub(q, toward)) < len(sub(p, toward)) ? q : p));
}
