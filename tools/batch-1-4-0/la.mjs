// Exact geometry on contours of lines and circular arcs, in the v5 segment format:
// {type:'L', p0, p1} | {type:'A', c, r, a0, a1} (degrees, screen angles).
// An arc offsets to a concentric arc and a line to a parallel line, so a plate
// or an inner edge built here is arithmetic, not an approximation.
import * as V5 from '../v5/geom.mjs';
import * as V6 from '../v6/outline.mjs';
const { add, sub, mul, len, unit, dot, onArc, arcTo, pt, fillet } = V5;
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const rad = (a) => (a * Math.PI) / 180, deg = (a) => (a * 180) / Math.PI;
const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));
export { V6 };

export const Ls = (p0, p1) => ({ type: 'L', p0, p1 });
export const As = (c, r, a0, a1) => ({ type: 'A', c, r, a0, a1 });
export const sP = (s) => (s.type === 'L' ? s.p0 : onArc(s.c, s.r, s.a0));
export const eP = (s) => (s.type === 'L' ? s.p1 : onArc(s.c, s.r, s.a1));
export function tanAt(s, which) {
  if (s.type === 'L') return unit(sub(s.p1, s.p0));
  const a = rad(which === 'end' ? s.a1 : s.a0), dir = Math.sign(s.a1 - s.a0) || 1;
  return mul([-Math.sin(a), Math.cos(a)], dir);
}
export const segAt = (s, t) => (s.type === 'L' ? add(s.p0, mul(sub(s.p1, s.p0), t)) : onArc(s.c, s.r, s.a0 + (s.a1 - s.a0) * t));
export const segLen = (s) => (s.type === 'L' ? len(sub(s.p1, s.p0)) : (Math.abs(s.a1 - s.a0) * Math.PI * s.r) / 180);

/* ---------------------------------------------------------------- builders */
export const circleLA = (c, r) => [As(c, r, 0, 360)];
/** Closed polygon with per-vertex fillet radii (0 = true corner). */
export function polyLA(pts, radii) {
  const n = pts.length, out = [];
  const corners = pts.map((V, i) => {
    const r = radii[i] ?? 0;
    if (r <= 1e-9) return { T1: V, T2: V, arc: null };
    const f = fillet(pts[(i - 1 + n) % n], V, pts[(i + 1) % n], r);
    let a0 = ang(f.F, f.T1), a1 = ang(f.F, f.T2);
    while (a1 - a0 > 180) a1 -= 360;
    while (a0 - a1 > 180) a1 += 360;
    return { T1: f.T1, T2: f.T2, arc: As(f.F, r, a0, a1) };
  });
  for (let i = 0; i < n; i++) {
    const c = corners[i], nx = corners[(i + 1) % n];
    if (c.arc) out.push(c.arc);
    if (len(sub(nx.T1, c.T2)) > 1e-9) out.push(Ls(c.T2, nx.T1));
  }
  return out;
}
export const rrectLA = (x0, y0, x1, y1, r) => polyLA([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], [r, r, r, r]);

/* ---------------------------------------------------------------- measure */
export function sample(segs, per = 64) {
  const pts = [];
  for (const s of segs) {
    const k = s.type === 'L' ? 2 : Math.max(4, Math.ceil(Math.abs(s.a1 - s.a0) / 3));
    for (let i = 0; i < k; i++) pts.push(segAt(s, i / k));
  }
  return pts;
}
export function signedArea(segs) {
  const q = sample(segs); let a = 0;
  for (let i = 0; i < q.length; i++) { const u = q[i], v = q[(i + 1) % q.length]; a += u[0] * v[1] - v[0] * u[1]; }
  return a / 2;
}
export const reverseLA = (segs) => [...segs].reverse().map((s) => (s.type === 'L' ? Ls(s.p1, s.p0) : As(s.c, s.r, s.a1, s.a0)));
export function distToLA(p, segs) {
  let best = Infinity;
  for (const s of segs) {
    if (s.type === 'L') {
      const u = sub(s.p1, s.p0), t = Math.max(0, Math.min(1, dot(sub(p, s.p0), u) / (dot(u, u) || 1)));
      best = Math.min(best, len(sub(p, add(s.p0, mul(u, t)))));
    } else {
      const a = ang(s.c, p), lo = Math.min(s.a0, s.a1), hi = Math.max(s.a0, s.a1);
      let on = false;
      for (let k = -2; k <= 2; k++) if (a + 360 * k >= lo - 1e-9 && a + 360 * k <= hi + 1e-9) on = true;
      best = Math.min(best, on ? Math.abs(len(sub(p, s.c)) - s.r) : Math.min(len(sub(p, sP(s))), len(sub(p, eP(s)))));
    }
  }
  return best;
}

/* ---------------------------------------------------------------- offset */
// Crossing of two pieces treated as whole lines / whole circles, nearest to V.
function meet(a, b, V) {
  const X = V6.crossings(a, b);
  if (!X.length) return null;
  return X.sort((p, q) => len(sub(p, V)) - len(sub(q, V)))[0];
}
function setStart(s, p) { if (s.type === 'L') { s.p0 = p; return; } let a = ang(s.c, p); a += 360 * Math.round((s.a0 - a) / 360); s.a0 = a; }
function setEnd(s, p) { if (s.type === 'L') { s.p1 = p; return; } let a = ang(s.c, p); a += 360 * Math.round((s.a1 - a) / 360); s.a1 = a; }

/**
 * Offset a closed contour by d: d > 0 outward (away from the enclosed area), d < 0 inward.
 * Convex corners opening up take an arc of |d| about the vertex; corners that
 * close are trimmed to the crossing, dropping any piece the crossing swallows.
 */
export function offsetLA(segs0, d) {
  const segs = segs0.map((s) => ({ ...s }));
  const orient = signedArea(segs) > 0 ? 1 : -1;         // +1: clockwise on screen (interior on the right)
  const outN = (t) => mul([t[1], -t[0]], orient);       // outward normal for travel direction t
  const pieces = [];
  segs.forEach((s, i) => {
    if (s.type === 'L') {
      const nn = mul(outN(unit(sub(s.p1, s.p0))), d);
      pieces.push({ seg: Ls(add(s.p0, nn), add(s.p1, nn)), src: i });
    } else {
      const mid = segAt(s, 0.5), radial = unit(sub(mid, s.c));
      const on = outN(tanAt({ ...s, a0: (s.a0 + s.a1) / 2 }, 'start'));
      const convex = dot(radial, on) > 0 ? 1 : -1;
      const r = s.r + convex * d;
      pieces.push({ seg: r > 1e-9 ? As(s.c, r, s.a0, s.a1) : null, src: i, collapsed: r <= 1e-9, c: s.c });
    }
  });
  // joins, resolved round the loop until stable
  const n = pieces.length;
  const out = [];
  const alive = pieces.map((p) => !p.collapsed);
  const nextAlive = (i) => { for (let k = 1; k <= n; k++) if (alive[(i + k) % n]) return (i + k) % n; return -1; };
  for (let pass = 0; pass < 6; pass++) {
    let changed = false;
    for (let i = 0; i < n; i++) {
      if (!alive[i]) continue;
      const j = nextAlive(i);
      if (j < 0 || j === i) continue;
      const a = pieces[i].seg, b = pieces[j].seg;
      const e = eP(a), s0 = sP(b);
      if (len(sub(e, s0)) < 1e-7) continue;
      // original vertex between them (end of the source piece before j)
      const V = sP(segs[pieces[j].src]);
      const t0 = tanAt(segs[pieces[i].src], 'end'), t1 = tanAt(segs[pieces[j].src], 'start');
      const turn = cross(t0, t1) * orient;                 // > 0: convex corner
      const opening = (turn > 1e-9 && d > 0) || (turn < -1e-9 && d < 0);
      if (opening && j === (i + 1) % n) continue;          // filled with an arc below
      const X = meet(a, b, V);
      const ok = X && V6.within(a, X) && V6.within(b, X);
      if (ok) { setEnd(a, X); setStart(b, X); changed = true; continue; }
      if (!opening || j !== (i + 1) % n) {
        // the crossing lies past one piece's end: drop the shorter and retry
        if (segLen(a) < segLen(b)) alive[i] = false; else alive[j] = false;
        changed = true;
      }
    }
    if (!changed) break;
  }
  for (let i = 0; i < n; i++) {
    if (!alive[i]) continue;
    const j = nextAlive(i);
    const a = pieces[i].seg, b = pieces[j].seg;
    out.push(a);
    const e = eP(a), s0 = sP(b);
    if (len(sub(e, s0)) < 1e-7) continue;
    const V = sP(segs[pieces[j].src]);
    let a0 = ang(V, e), a1 = ang(V, s0);
    while (a1 - a0 > 180) a1 -= 360;
    while (a0 - a1 > 180) a1 += 360;
    out.push(As(V, Math.abs(d), a0, a1));
  }
  return out;
}
/** Every sample of the offset sits |d| from the source, or this throws. */
export function verifyOffset(src, off, d, tol = 0.003) {
  let worst = 0;
  for (const p of sample(off)) worst = Math.max(worst, Math.abs(distToLA(p, src) - Math.abs(d)));
  if (worst > tol) throw new Error(`offset off by ${worst.toFixed(4)}`);
  return worst;
}

/* ---------------------------------------------------------------- emit */
export function dLA(segs, close = true) {
  let d = `M${pt(sP(segs[0]))}`;
  for (const s of segs) {
    if (s.type === 'L') d += `L${pt(s.p1)}`;
    else for (const c of arcTo(s.c, s.r, s.a0, s.a1)) d += `C${pt(c.c1)} ${pt(c.c2)} ${pt(c.p)}`;
  }
  return close ? d + 'Z' : d;
}
/** Open run outline (stroke band) with round or butt caps: the v6 outliner. */
export const bandLA = (segs, cap = 'round') => V6.outlineRun(segs, 1, cap);

/** Lines stay lines; each arc becomes its cubics, split at the cardinals. */
export function toGeo(segs) {
  const out = [];
  for (const s of segs) {
    if (s.type === 'L') { out.push({ t: 'L', p: [[...s.p0], [...s.p1]] }); continue; }
    let start = onArc(s.c, s.r, s.a0);
    for (const c of arcTo(s.c, s.r, s.a0, s.a1)) { out.push({ t: 'C', p: [start, c.c1, c.c2, c.p] }); start = c.p; }
  }
  // exact continuity
  for (let i = 1; i < out.length; i++) out[i].p[0] = out[i - 1].p.at(-1);
  return out;
}

/**
 * The runs of an open or closed LA contour that stay `dist` or more from an
 * obstacle's centre line, as open runs cut exactly where the distance crosses.
 */
export function clipByDistLA(segs, obstacle, dist) {
  const f = (s, t) => distToLA(segAt(s, t), obstacle) - dist;
  const pieces = [];
  for (const s of segs) {
    const N = 240, ts = [];
    let prev = f(s, 0);
    for (let i = 1; i <= N; i++) {
      const cur = f(s, i / N);
      if ((prev < 0) !== (cur < 0)) {
        let a = (i - 1) / N, b = i / N, fa = prev;
        for (let k = 0; k < 60; k++) { const m = (a + b) / 2, fm = f(s, m); if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m; }
        ts.push((a + b) / 2);
      }
      prev = cur;
    }
    const cuts = [0, ...ts, 1];
    for (let k = 0; k + 1 < cuts.length; k++) {
      const t0 = cuts[k], t1 = cuts[k + 1];
      if (t1 - t0 < 1e-9) continue;
      const keep = f(s, (t0 + t1) / 2) >= 0;
      const part = s.type === 'L' ? Ls(segAt(s, t0), segAt(s, t1)) : As(s.c, s.r, s.a0 + (s.a1 - s.a0) * t0, s.a0 + (s.a1 - s.a0) * t1);
      pieces.push({ part, keep, closesRun: t1 === 1, opensRun: t0 === 0 });
    }
  }
  // chain kept pieces that are contiguous
  const runs = [];
  let cur = null;
  for (const p of pieces) {
    if (!p.keep) { if (cur) { runs.push(cur); cur = null; } continue; }
    if (cur && len(sub(eP(cur.at(-1)), sP(p.part))) < 1e-7) cur.push(p.part);
    else { if (cur) runs.push(cur); cur = [p.part]; }
  }
  if (cur) runs.push(cur);
  // a closed contour: join the last run onto the first when they meet
  if (runs.length > 1 && len(sub(eP(runs.at(-1).at(-1)), sP(runs[0][0]))) < 1e-7) runs[0] = [...runs.pop(), ...runs[0]];
  return runs;
}

/**
 * The painted band of a run whose pieces meet on tangents (lines and arcs, no
 * corners), built directly: left offsets, the end cap, right offsets back, the
 * start cap. The v6 outliner drops a short stub line where it meets an arc; a
 * smooth run needs no joins, so this has nothing to decide.
 */
export function bandSmooth(segs, cap = 'round', h = 1) {
  const off = (s, side) => {           // side +1: left of travel, -1: right
    if (s.type === 'L') { const t = unit(sub(s.p1, s.p0)), nn = mul([t[1], -t[0]], side * h); return Ls(add(s.p0, nn), add(s.p1, nn)); }
    const r = s.r + side * Math.sign(s.a1 - s.a0) * h;
    return As(s.c, r, s.a0, s.a1);
  };
  const left = segs.map((s) => off(s, 1));
  const right = segs.map((s) => off(s, -1)).reverse().map((s) => (s.type === 'L' ? Ls(s.p1, s.p0) : As(s.c, s.r, s.a1, s.a0)));
  const E = eP(segs.at(-1)), S = sP(segs[0]);
  const tE = tanAt(segs.at(-1), 'end'), tS = tanAt(segs[0], 'start');
  const capAt = (P, t, from, to) => {
    if (cap === 'butt') return [Ls(from, to)];
    let a0 = ang(P, from), a1 = ang(P, to);
    // bulge along t: the half turn passing P + t
    const mid = ang(P, add(P, t));
    let cand = a1; while (cand - a0 > 180) cand -= 360; while (a0 - cand > 180) cand += 360;
    const passes = (x0, x1, m) => { let mm = m; while (mm < Math.min(x0, x1)) mm += 360; while (mm > Math.max(x0, x1)) mm -= 360; return mm >= Math.min(x0, x1) && mm <= Math.max(x0, x1); };
    if (!passes(a0, cand, mid)) cand += cand > a0 ? -360 : 360;
    return [As(P, h, a0, cand)];
  };
  return [...left, ...capAt(E, tE, eP(left.at(-1)), sP(right[0])), ...right, ...capAt(S, mul(tS, -1), eP(right.at(-1)), sP(left[0]))];
}
/** A run's pieces all meet on tangents. */
export function isSmooth(segs) {
  for (let i = 0; i + 1 < segs.length; i++) {
    const a = tanAt(segs[i], 'end'), b = tanAt(segs[i + 1], 'start');
    if (Math.abs(cross(a, b)) > 1e-6 || dot(a, b) < 0) return false;
  }
  return true;
}
export const bandAny = (segs, cap = 'round') => (isSmooth(segs) ? bandSmooth(segs, cap) : bandLA(segs, cap));
