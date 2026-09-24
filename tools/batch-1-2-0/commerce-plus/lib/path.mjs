// Path editing for compounds cut out of shipped drawings.
//
// A shipped base is edited, never redrawn: its segments are parsed with their
// source spelling kept, so a coordinate the cut does not touch re-emits exactly
// as it was written (re-rounding pushed 6.11498 to 6.115 once), and only the
// points a cut creates are new numbers, written to four decimals.

const ARITY = { M: 2, L: 2, H: 1, V: 1, C: 6, Z: 0 };

/** A point, optionally carrying the source spelling of each coordinate. */
export const P = (x, y, sx = null, sy = null) => ({ x, y, sx, sy });
const dec = (s) => (s && s.includes('.') ? s.split('.')[1].length : 0);

export function fmt(v) {
  if (!Number.isFinite(v)) throw new Error(`non-finite coordinate ${v}`);
  const r = Math.round(v * 1e4) / 1e4;
  return String(Object.is(r, -0) ? 0 : r);
}
const num = (v, s) => (s != null ? s : fmt(v));
const pt = (p) => `${num(p.x, p.sx)} ${num(p.y, p.sy)}`;

/**
 * Parse an absolute M/L/H/V/C/Z path into subpaths of line and cubic segments.
 * H and V are expanded against the running point, which is what a later
 * offset or split needs anyway. A Z that closes a gap becomes an explicit
 * segment marked `implicit`, so emit() can write the Z back instead of it.
 */
export function parse(d) {
  const toks = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  const subs = [];
  let i = 0, cmd = null, cur = null, sub = null, start = null;
  const take = () => { const s = toks[i++]; return [Number(s), s]; };
  while (i < toks.length) {
    if (/^[MLHVCZ]$/i.test(toks[i])) {
      cmd = toks[i++];
      if (cmd !== cmd.toUpperCase()) throw new Error(`relative command ${cmd} in ${d}`);
      if (cmd === 'Z') {
        if (Math.hypot(cur.x - start.x, cur.y - start.y) > 1e-9) sub.segs.push({ t: 'L', p0: cur, p1: start, implicit: true });
        sub.closed = true; cur = start;
        continue;
      }
    }
    if (cmd === 'M') {
      const [x, sx] = take(), [y, sy] = take();
      cur = start = P(x, y, sx, sy); sub = { start, segs: [], closed: false }; subs.push(sub); cmd = 'L';
    } else if (cmd === 'L') {
      const [x, sx] = take(), [y, sy] = take(); const p = P(x, y, sx, sy);
      sub.segs.push({ t: 'L', p0: cur, p1: p }); cur = p;
    } else if (cmd === 'H') {
      const [x, sx] = take(); const p = P(x, cur.y, sx, cur.sy);
      sub.segs.push({ t: 'L', p0: cur, p1: p }); cur = p;
    } else if (cmd === 'V') {
      const [y, sy] = take(); const p = P(cur.x, y, cur.sx, sy);
      sub.segs.push({ t: 'L', p0: cur, p1: p }); cur = p;
    } else if (cmd === 'C') {
      const v = []; for (let k = 0; k < 6; k++) v.push(take());
      const c1 = P(v[0][0], v[1][0], v[0][1], v[1][1]), c2 = P(v[2][0], v[3][0], v[2][1], v[3][1]), p = P(v[4][0], v[5][0], v[4][1], v[5][1]);
      sub.segs.push({ t: 'C', p0: cur, c1, c2, p1: p }); cur = p;
    } else throw new Error(`unexpected ${cmd}`);
  }
  return subs;
}

/** Emit subpaths. A run is { segs, closed }; its start is its first segment's p0. */
export function emit(runs) {
  let out = '';
  for (const r of runs) {
    const segs = r.segs.filter((s) => !(r.closed && s.implicit));
    if (!segs.length) continue;
    out += `M${pt(segs[0].p0)}`;
    for (const s of segs) out += s.t === 'L' ? `L${pt(s.p1)}` : `C${pt(s.c1)} ${pt(s.c2)} ${pt(s.p1)}`;
    if (r.closed) out += 'Z';
  }
  return out;
}

/** Translate by whole units, keeping each coordinate's source precision. */
export function translate(runs, dx, dy) {
  if (!Number.isInteger(dx) || !Number.isInteger(dy)) throw new Error('translate by whole units only');
  const mv = (p) => {
    const x = p.x + dx, y = p.y + dy;
    const sx = p.sx != null ? String(Number(x.toFixed(dec(p.sx)))) : null;
    const sy = p.sy != null ? String(Number(y.toFixed(dec(p.sy)))) : null;
    return P(x, y, sx, sy);
  };
  const memo = new Map();
  const m = (p) => { if (!memo.has(p)) memo.set(p, mv(p)); return memo.get(p); };
  return runs.map((r) => ({ ...r, start: r.start && m(r.start), segs: r.segs.map((s) => (s.t === 'L' ? { ...s, p0: m(s.p0), p1: m(s.p1) } : { ...s, p0: m(s.p0), c1: m(s.c1), c2: m(s.c2), p1: m(s.p1) })) }));
}

/* ------------------------------------------------------------ evaluation */

export function at(s, t) {
  if (s.t === 'L') return [s.p0.x + (s.p1.x - s.p0.x) * t, s.p0.y + (s.p1.y - s.p0.y) * t];
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, e = t * t * t;
  return [a * s.p0.x + b * s.c1.x + c * s.c2.x + e * s.p1.x, a * s.p0.y + b * s.c1.y + c * s.c2.y + e * s.p1.y];
}
/** Unit tangent in the direction of travel. */
export function tangent(s, t) {
  let dx, dy;
  if (s.t === 'L') { dx = s.p1.x - s.p0.x; dy = s.p1.y - s.p0.y; } else {
    const u = 1 - t;
    dx = 3 * u * u * (s.c1.x - s.p0.x) + 6 * u * t * (s.c2.x - s.c1.x) + 3 * t * t * (s.p1.x - s.c2.x);
    dy = 3 * u * u * (s.c1.y - s.p0.y) + 6 * u * t * (s.c2.y - s.c1.y) + 3 * t * t * (s.p1.y - s.c2.y);
    if (Math.hypot(dx, dy) < 1e-9) { const q = at(s, t < 0.5 ? t + 1e-4 : t - 1e-4), p = at(s, t); dx = (q[0] - p[0]) * (t < 0.5 ? 1 : -1); dy = (q[1] - p[1]) * (t < 0.5 ? 1 : -1); }
  }
  const l = Math.hypot(dx, dy); return [dx / l, dy / l];
}

/** Split a segment at t: [before, after]. New points are plain numbers. */
export function split(s, t) {
  if (t <= 1e-12) return [null, s];
  if (t >= 1 - 1e-12) return [s, null];
  const m = at(s, t), mp = P(m[0], m[1]);
  if (s.t === 'L') return [{ t: 'L', p0: s.p0, p1: mp }, { t: 'L', p0: mp, p1: s.p1 }];
  const lerp = (a, b) => P(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  const a = lerp(s.p0, s.c1), b = lerp(s.c1, s.c2), c = lerp(s.c2, s.p1), d = lerp(a, b), e = lerp(b, c);
  return [{ t: 'C', p0: s.p0, c1: a, c2: d, p1: mp }, { t: 'C', p0: mp, c1: e, c2: c, p1: s.p1 }];
}

/** Bisect for t where coordinate k (0 = x, 1 = y) of the segment equals v. */
export function solveCoord(s, k, v) {
  const n = 400; let prev = at(s, 0)[k] - v;
  for (let i = 1; i <= n; i++) {
    const cur = at(s, i / n)[k] - v;
    if (prev === 0) return (i - 1) / n;
    if (Math.sign(cur) !== Math.sign(prev)) {
      let lo = (i - 1) / n, hi = i / n;
      for (let j = 0; j < 60; j++) { const m = (lo + hi) / 2; if (Math.sign(at(s, m)[k] - v) === Math.sign(prev)) lo = m; else hi = m; }
      return (lo + hi) / 2;
    }
    prev = cur;
  }
  if (Math.abs(prev) < 1e-12) return 1;
  throw new Error(`segment never reaches ${'xy'[k]} = ${v}`);
}

/** Parameter of the point on the segment nearest q, and its distance. */
export function nearest(s, q) {
  const n = 800; let best = 0, bd = Infinity;
  for (let i = 0; i <= n; i++) { const p = at(s, i / n), d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < bd) { bd = d; best = i / n; } }
  let lo = Math.max(0, best - 1 / n), hi = Math.min(1, best + 1 / n);
  for (let j = 0; j < 80; j++) {
    const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
    const da = Math.hypot(...at(s, a).map((v, k) => v - q[k])), db = Math.hypot(...at(s, b).map((v, k) => v - q[k]));
    if (da < db) hi = b; else lo = a;
  }
  const t = (lo + hi) / 2, p = at(s, t);
  return { t, d: Math.hypot(p[0] - q[0], p[1] - q[1]), p };
}

/* ------------------------------------------------------------ building */

export const line = (a, b) => ({ t: 'L', p0: a.x != null ? a : P(...a), p1: b.x != null ? b : P(...b) });
const toP = (a) => (a.x != null ? a : P(a[0], a[1]));

/**
 * A circular arc as cubics, split at every multiple of 90 degrees it spans
 * (a single cubic across a quadrant passes near its extreme, not on it).
 * Angles in radians, y down; `from` and `to` are the exact end points when
 * given, so an arc meets its neighbours without drift.
 */
export function arc(c, r, a0, a1, from = null, to = null) {
  const cuts = [a0];
  const dir = Math.sign(a1 - a0);
  const q = Math.PI / 2;
  let k = dir > 0 ? Math.floor(a0 / q + 1e-9) + 1 : Math.ceil(a0 / q - 1e-9) - 1;
  for (;; k += dir) { const a = k * q; if (dir > 0 ? a >= a1 - 1e-9 : a <= a1 + 1e-9) break; cuts.push(a); }
  cuts.push(a1);
  const pAt = (a) => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  const snap = (a) => { const p = pAt(a); return P(...p.map((v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v))); };
  const segs = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const b0 = cuts[i], b1 = cuts[i + 1], h = (4 / 3) * Math.tan((b1 - b0) / 4) * r;
    const p0 = i === 0 && from ? toP(from) : snap(b0), p1 = i === cuts.length - 2 && to ? toP(to) : snap(b1);
    const t0 = [-Math.sin(b0), Math.cos(b0)], t1 = [-Math.sin(b1), Math.cos(b1)];
    segs.push({ t: 'C', p0, c1: P(p0.x + t0[0] * h, p0.y + t0[1] * h), c2: P(p1.x - t1[0] * h, p1.y - t1[1] * h), p1 });
  }
  return segs;
}

/** Chain segments so each starts on the previous end, asserting the gap is float noise. */
export function chain(parts, closed = false, tol = 2e-3) {
  const segs = parts.flat().filter(Boolean).filter((s) => !(s.t === 'L' && Math.hypot(s.p1.x - s.p0.x, s.p1.y - s.p0.y) < 1e-6));
  for (let i = 1; i < segs.length; i++) {
    const a = segs[i - 1].p1, b = segs[i].p0, g = Math.hypot(a.x - b.x, a.y - b.y);
    if (g > tol) throw new Error(`chain gap ${g.toFixed(4)} at (${a.x.toFixed(3)},${a.y.toFixed(3)}) -> (${b.x.toFixed(3)},${b.y.toFixed(3)})`);
    segs[i] = { ...segs[i], p0: a };
  }
  if (closed) {
    const a = segs.at(-1).p1, b = segs[0].p0, g = Math.hypot(a.x - b.x, a.y - b.y);
    if (g > tol) throw new Error(`closing gap ${g.toFixed(4)}`);
    // snap the ring's last point onto its first, so Z closes on nothing
    segs[segs.length - 1] = { ...segs.at(-1), p1: b };
  }
  return { segs, closed };
}

/** Reverse a list of segments. */
export const reverse = (segs) => segs.slice().reverse().map((s) => (s.t === 'L' ? { t: 'L', p0: s.p1, p1: s.p0 } : { t: 'C', p0: s.p1, c1: s.c2, c2: s.c1, p1: s.p0 }));

/**
 * The house sharp stub for a formerly round-capped free end (tools/sharp-cap-cut.mjs):
 * k = (1 - sin t) / cos t along the tangent, t off the nearer axis, so the butt
 * face's far corner lands where the round cap reached on the dominant axis.
 * `box` clamps the stub so neither corner of the butt face leaves it ("held
 * ends still yield to the box"): a sharp drawing paints its rounded sibling's
 * box exactly. Returns the new end point and the face's two corners.
 */
export function stub(end, u, box = null) {
  const a = Math.atan2(Math.abs(u[1]), Math.abs(u[0])), th = Math.min(a, Math.PI / 2 - a);
  let k = (1 - Math.sin(th)) / Math.cos(th);
  const n = [-u[1], u[0]];
  const corners = (k) => { const e = [end[0] + u[0] * k, end[1] + u[1] * k]; return [e, [e[0] + n[0], e[1] + n[1]], [e[0] - n[0], e[1] - n[1]]]; };
  let clamped = false;
  if (box) {
    const out = (k) => corners(k).slice(1).some(([x, y]) => x < box[0] - 1e-9 || y < box[1] - 1e-9 || x > box[2] + 1e-9 || y > box[3] + 1e-9);
    if (out(k)) { let lo = 0, hi = k; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (out(m)) hi = m; else lo = m; } k = lo; clamped = true; }
  }
  const [e, c1, c2] = corners(k);
  return { k, end: e, corners: [c1, c2], clamped };
}
