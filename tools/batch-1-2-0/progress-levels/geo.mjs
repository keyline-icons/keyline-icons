// Geometry for the progress-levels drafts: lines and circular arcs, clipped by
// horizontal bands, emitted as the set's M/L/C path strings.
//
// Every contour here is a pair of mirrored side profiles (left side, walked top
// to bottom, each piece monotone in y), so a band of a bulb is the left profile
// clipped to [ya, yb], its mirror about x = 12, and the two cut edges. Arcs stay
// arcs until emission and are split at every multiple of 90 degrees they span
// (drawing-a-new-icon.md section 2), so extremes land on their own endpoints.

export const f4 = (v) => {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate ${v}`);
  const s = (Math.round(v * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, '');
  return s === '-0' ? '0' : s;
};
export const pt = (p) => `${f4(p[0])} ${f4(p[1])}`;

export const L = (a, b) => ({ t: 'L', a, b });
// Arc about c, radius r, from angle a0 to a1 (radians, screen axes: y down).
export const A = (c, r, a0, a1) => ({ t: 'A', c, r, a0, a1 });

export const at = (s, u) => {
  if (s.t === 'L') return [s.a[0] + (s.b[0] - s.a[0]) * u, s.a[1] + (s.b[1] - s.a[1]) * u];
  const th = s.a0 + (s.a1 - s.a0) * u;
  return [s.c[0] + s.r * Math.cos(th), s.c[1] + s.r * Math.sin(th)];
};
export const start = (s) => at(s, 0);
export const end = (s) => at(s, 1);

const sub = (s, u0, u1) => (s.t === 'L'
  ? L(at(s, u0), at(s, u1))
  : A(s.c, s.r, s.a0 + (s.a1 - s.a0) * u0, s.a0 + (s.a1 - s.a0) * u1));

// Parameter where a y-monotone piece crosses y = c (bisection; exact enough).
function crossU(s, c) {
  const y0 = start(s)[1], y1 = end(s)[1];
  if ((c - y0) * (c - y1) > 0) return null;
  if (s.t === 'L') return y1 === y0 ? 0 : (c - y0) / (y1 - y0);
  let lo = 0, hi = 1;
  const up = y1 > y0;
  for (let i = 0; i < 80; i++) {
    const m = (lo + hi) / 2;
    if ((at(s, m)[1] < c) === up) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

// Clip a top-to-bottom profile to the band ya <= y <= yb.
export function clip(profile, ya, yb) {
  const out = [];
  for (const s of profile) {
    const y0 = start(s)[1], y1 = end(s)[1];
    const lo = Math.min(y0, y1), hi = Math.max(y0, y1);
    if (hi < ya - 1e-12 || lo > yb + 1e-12) continue;
    if (hi - lo < 1e-12) { if (lo >= ya - 1e-12 && lo <= yb + 1e-12) out.push(s); continue; }
    let u0 = 0, u1 = 1;
    if (lo < ya) { const u = crossU(s, ya); if (y1 > y0) u0 = u; else u1 = u; }
    if (hi > yb) { const u = crossU(s, yb); if (y1 > y0) u1 = u; else u0 = u; }
    if (u1 - u0 > 1e-9) out.push(sub(s, u0, u1));
  }
  // drop slivers the band edge leaves at a vertex
  return out.filter((s) => {
    const a = start(s), b = end(s);
    return Math.hypot(b[0] - a[0], b[1] - a[1]) > 1e-3 || s.t === 'A' && Math.abs(s.a1 - s.a0) * s.r > 1e-3;
  });
}

// x where a profile crosses y (the first piece that does).
export function xAt(profile, y) {
  for (const s of profile) {
    const u = crossU(s, y);
    if (u !== null) return at(s, u)[0];
  }
  throw new Error(`profile does not reach y=${y}`);
}

export const mirrorX = (s, m = 12) => (s.t === 'L'
  ? L([2 * m - s.a[0], s.a[1]], [2 * m - s.b[0], s.b[1]])
  : A([2 * m - s.c[0], s.c[1]], s.r, Math.PI - s.a0, Math.PI - s.a1));
export const mirrorY = (s, m = 12) => (s.t === 'L'
  ? L([s.a[0], 2 * m - s.a[1]], [s.b[0], 2 * m - s.b[1]])
  : A([s.c[0], 2 * m - s.c[1]], s.r, -s.a0, -s.a1));
export const reverse = (s) => (s.t === 'L' ? L(s.b, s.a) : A(s.c, s.r, s.a1, s.a0));

// Arc to cubics, split on the quadrant lines it crosses.
function arcCubics(s) {
  const HALF = Math.PI / 2;
  const cuts = [s.a0];
  const dir = Math.sign(s.a1 - s.a0);
  if (dir > 0) for (let k = Math.floor(s.a0 / HALF) + 1; k * HALF < s.a1 - 1e-9; k++) { if (k * HALF > s.a0 + 1e-9) cuts.push(k * HALF); }
  else for (let k = Math.ceil(s.a0 / HALF) - 1; k * HALF > s.a1 + 1e-9; k--) { if (k * HALF < s.a0 - 1e-9) cuts.push(k * HALF); }
  cuts.push(s.a1);
  const out = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const t0 = cuts[i], t1 = cuts[i + 1], d = t1 - t0;
    const k = (4 / 3) * Math.tan(d / 4) * s.r;
    const p0 = [s.c[0] + s.r * Math.cos(t0), s.c[1] + s.r * Math.sin(t0)];
    const p3 = [s.c[0] + s.r * Math.cos(t1), s.c[1] + s.r * Math.sin(t1)];
    const c1 = [p0[0] - k * Math.sin(t0), p0[1] + k * Math.cos(t0)];
    const c2 = [p3[0] + k * Math.sin(t1), p3[1] - k * Math.cos(t1)];
    out.push([c1, c2, p3]);
  }
  return out;
}

// Emit a chain of pieces as one subpath. `close` ends with Z; a final straight
// piece back to the start is left to Z, as the Figma exports do.
export function emit(pieces, { close = true } = {}) {
  if (!pieces.length) throw new Error('empty subpath');
  const p0 = start(pieces[0]);
  let d = `M${pt(p0)}`;
  let cur = p0;
  const n = pieces.length;
  pieces.forEach((s, i) => {
    const a = start(s);
    if (Math.hypot(a[0] - cur[0], a[1] - cur[1]) > 1e-6) throw new Error(`gap in chain at ${pt(cur)} -> ${pt(a)}`);
    if (s.t === 'L') {
      const b = end(s);
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 1e-3) return;          // no zero-length pieces
      const last = i === n - 1;
      if (close && last && Math.hypot(b[0] - p0[0], b[1] - p0[1]) < 1e-6) { cur = b; return; }
      d += `L${pt(b)}`;
      cur = b;
    } else {
      for (const [c1, c2, p3] of arcCubics(s)) d += `C${pt(c1)} ${pt(c2)} ${pt(p3)}`;
      cur = end(s);
    }
  });
  if (close) {
    if (Math.hypot(cur[0] - p0[0], cur[1] - p0[1]) > 1e-6 && pieces[n - 1].t !== 'L') throw new Error('open contour');
    d += 'Z';
  }
  return d;
}

// A band of a mirrored region: left profile clipped to [ya, yb], its mirror,
// and the two cut edges. `cw` true walks it clockwise on screen (top edge left
// to right first), as the plates run; false walks it the other way, as a
// knockout must under nonzero.
export function band(leftProfile, ya, yb, { cw = true, mirror = 12 } = {}) {
  const left = clip(leftProfile, ya, yb);
  if (!left.length) throw new Error(`band ${ya}..${yb} is empty`);
  const right = left.map((s) => mirrorX(s, mirror));
  const lt = start(left[0]), lb = end(left[left.length - 1]);
  const rt = start(right[0]), rb = end(right[right.length - 1]);
  const edge = (a, b) => (Math.hypot(b[0] - a[0], b[1] - a[1]) > 1e-3 ? [L(a, b)] : []);
  if (cw) return [...edge(lt, rt), ...right, ...edge(rb, lb), ...left.slice().reverse().map(reverse)];
  return [...left, ...edge(lb, rb), ...right.slice().reverse().map(reverse), ...edge(rt, lt)];
}

// Painted distance from a dot to a round-capped or butt bar, both of radius 1.
export function segDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  let u = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  const inside = u >= 0 && u <= 1;
  u = Math.max(0, Math.min(1, u));
  return { d: Math.hypot(p[0] - a[0] - u * dx, p[1] - a[1] - u * dy), inside };
}
