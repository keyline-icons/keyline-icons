// Rebuild a tint (or matched-fill outline) as the TRUE offset of its solved
// sharp stroke, instead of surgically sharpening the drawn rounded outline.
//
// Corner surgery and the box solver each move a drawing toward its own
// target, and on oblique glyphs the tint and the stroke land a few tenths
// apart — the grey pokes Zafar keeps finding. An outline OFFSET from the very
// stroke it must hug cannot misregister: radius-1 arcs at convex vertices
// (what a round join paints), trimmed intersections at reflex ones, cubics
// carried by Tiller–Hanson. Applied only where the ROUNDED file proves the
// relationship: a tint subpath sitting exactly 1 off one closed stroke
// subpath of the same file.
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub = (a,b) => [a[0]-b[0], a[1]-b[1]], add = (a,b) => [a[0]+b[0], a[1]+b[1]];
const mul = (a,k) => [a[0]*k, a[1]*k], len = (a) => Math.hypot(a[0], a[1]), unit = (a) => mul(a, 1/len(a));
const dot = (a,b) => a[0]*b[0]+a[1]*b[1], cross = (a,b) => a[0]*b[1]-a[1]*b[0];

export function segsOf(d) {
  const runs = []; let segs = [], x = 0, y = 0, sx = 0, sy = 0;
  const flush = (c) => { if (segs.length) runs.push({ segs, closed: c }); segs = []; };
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M') { flush(false); x = args[0]; y = args[1]; sx = x; sy = y; }
    else if (U === 'L') { segs.push({ t:'l', p0:[x,y], p1:[args[0],args[1]] }); x = args[0]; y = args[1]; }
    else if (U === 'H') { segs.push({ t:'l', p0:[x,y], p1:[args[0],y] }); x = args[0]; }
    else if (U === 'V') { segs.push({ t:'l', p0:[x,y], p1:[x,args[0]] }); y = args[0]; }
    else if (U === 'C') { segs.push({ t:'c', p0:[x,y], p1:[args[0],args[1]], p2:[args[2],args[3]], p3:[args[4],args[5]] }); x = args[4]; y = args[5]; }
    else if (U === 'Z') { if (Math.abs(x-sx) > 1e-9 || Math.abs(y-sy) > 1e-9) segs.push({ t:'l', p0:[x,y], p1:[sx,sy] }); flush(true); x = sx; y = sy; }
    else return null;
  }
  flush(false); return runs;
}

export function samplePts(segs, per = 10) {
  const pts = [];
  for (const s of segs) {
    if (s.t === 'l') { pts.push(s.p0); }
    else for (let i = 0; i < per; i++) {
      const u = i / per, m = 1 - u;
      pts.push([
        m*m*m*s.p0[0] + 3*m*m*u*s.p1[0] + 3*m*u*u*s.p2[0] + u*u*u*s.p3[0],
        m*m*m*s.p0[1] + 3*m*m*u*s.p1[1] + 3*m*u*u*s.p2[1] + u*u*u*s.p3[1],
      ]);
    }
  }
  if (segs.length) pts.push(segs[segs.length - 1].t === 'l' ? segs[segs.length - 1].p1 : segs[segs.length - 1].p3);
  return pts;
}
const insidePoly = (pts, p) => {
  let c = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    if ((a[1] > p[1]) !== (b[1] > p[1])) {
      const t = (p[1] - a[1]) / (b[1] - a[1]);
      if (a[0] + t * (b[0] - a[0]) > p[0]) c++;
    }
  }
  return c % 2 === 1;
};
export function maxOffsetErr(ptsA, segsB, want = 1) {
  const B = [];
  const bp = samplePts(segsB, 16);
  for (let i = 0; i < bp.length - 1; i++) B.push([bp[i], bp[i + 1]]);
  let worst = 0;
  for (const p of ptsA) {
    let m = Infinity;
    for (const [a, b] of B) {
      const v = sub(b, a), L2 = dot(v, v);
      let t = L2 ? dot(sub(p, a), v) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      const q = add(a, mul(v, t));
      const dd = len(sub(p, q));
      if (dd < m) m = dd;
    }
    worst = Math.max(worst, Math.abs(m - want));
  }
  return worst;
}

function tangentAt(s, end) {
  if (s.t === 'l') return unit(sub(s.p1, s.p0));
  const cands = end ? [sub(s.p3, s.p2), sub(s.p3, s.p1), sub(s.p3, s.p0)]
                    : [sub(s.p1, s.p0), sub(s.p2, s.p0), sub(s.p3, s.p0)];
  for (const c of cands) if (len(c) > 1e-9) return unit(c);
  return [1, 0];
}

const ptAt = (s, t) => {
  if (s.t === 'l') return add(s.p0, mul(sub(s.p1, s.p0), t));
  const m = 1 - t;
  return [
    m*m*m*s.p0[0] + 3*m*m*t*s.p1[0] + 3*m*t*t*s.p2[0] + t*t*t*s.p3[0],
    m*m*m*s.p0[1] + 3*m*m*t*s.p1[1] + 3*m*t*t*s.p2[1] + t*t*t*s.p3[1],
  ];
};
const dAt = (s, t) => {
  if (s.t === 'l') return sub(s.p1, s.p0);
  const m = 1 - t;
  return [
    3*m*m*(s.p1[0]-s.p0[0]) + 6*m*t*(s.p2[0]-s.p1[0]) + 3*t*t*(s.p3[0]-s.p2[0]),
    3*m*m*(s.p1[1]-s.p0[1]) + 6*m*t*(s.p2[1]-s.p1[1]) + 3*t*t*(s.p3[1]-s.p2[1]),
  ];
};
const casteljau = (s, t) => {
  const a = add(s.p0, mul(sub(s.p1, s.p0), t)), b = add(s.p1, mul(sub(s.p2, s.p1), t));
  const c = add(s.p2, mul(sub(s.p3, s.p2), t));
  const ab = add(a, mul(sub(b, a), t)), bc = add(b, mul(sub(c, b), t));
  return { a, c, ab, bc, mid: add(ab, mul(sub(bc, ab), t)) };
};
const splitLeft = (s, t) => {
  if (s.t === 'l') return { t: 'l', p0: s.p0, p1: ptAt(s, t) };
  const { a, ab, mid } = casteljau(s, t);
  return { t: 'c', p0: s.p0, p1: a, p2: ab, p3: mid };
};
const splitRight = (s, t) => {
  if (s.t === 'l') return { t: 'l', p0: ptAt(s, t), p1: s.p1 };
  const { c, bc, mid } = casteljau(s, t);
  return { t: 'c', p0: mid, p1: bc, p2: c, p3: s.p3 };
};

/**
 * Where two offset arms overlap at a reflex corner, find the crossing that
 * trims the least — the corner the drawing meant. Flatten both, take the
 * polyline crossing nearest the join, then refine it with Newton on
 * A(tA) = B(tB) so the trim lands on the true curves rather than on facets.
 */
function reflexCrossing(A, B) {
  const N = 96, pa = [], pb = [];
  for (let i = 0; i <= N; i++) { pa.push(ptAt(A, i / N)); pb.push(ptAt(B, i / N)); }
  let best = null;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const u = sub(pa[i + 1], pa[i]), v = sub(pb[j + 1], pb[j]), den = cross(u, v);
    if (Math.abs(den) < 1e-12) continue;
    const w = sub(pb[j], pa[i]);
    const s = cross(w, v) / den, r = cross(w, u) / den;
    if (s < 0 || s > 1 || r < 0 || r > 1) continue;
    const tA = (i + s) / N, tB = (j + r) / N, score = (1 - tA) + tB;
    if (!best || score < best.score) best = { tA, tB, score };
  }
  if (!best) return null;
  let { tA, tB } = best;
  for (let k = 0; k < 24; k++) {
    const F = sub(ptAt(A, tA), ptAt(B, tB));
    if (len(F) < 1e-12) break;
    const da = dAt(A, tA), db = dAt(B, tB), det = -cross(da, db);
    if (Math.abs(det) < 1e-12) break;
    const na = tA + (db[1] * F[0] - db[0] * F[1]) / det;
    const nb = tB + (da[1] * F[0] - da[0] * F[1]) / det;
    if (!isFinite(na) || !isFinite(nb) || na < 0 || na > 1 || nb < 0 || nb > 1) break;
    tA = na; tB = nb;
  }
  return len(sub(ptAt(A, tA), ptAt(B, tB))) < 1e-6 ? { tA, tB } : best;
}

/** Offset one CLOSED subpath (lines + cubics) by d to its outside. */
export function offsetClosed(segs, d) {
  const poly = samplePts(segs, 10);
  // pick the normal sign that leaves the region
  const t0 = tangentAt(segs[0], false);
  const mid = segs[0].t === 'l' ? mul(add(segs[0].p0, segs[0].p1), 0.5) : segs[0].p0;
  let sgn = 1;
  if (insidePoly(poly, add(mid, mul([t0[1], -t0[0]], sgn * 0.5)))) sgn = -1;
  const norm = (t) => mul([t[1], -t[0]], sgn);

  const N = segs.length, out = [];
  const off = segs.map((s) => {
    if (s.t === 'l') {
      const nn = mul(norm(tangentAt(s, false)), d);
      return { t: 'l', p0: add(s.p0, nn), p1: add(s.p1, nn) };
    }
    // Tiller–Hanson: offset the control legs, reintersect
    const legs = [[s.p0, s.p1], [s.p1, s.p2], [s.p2, s.p3]].map(([a, b]) => {
      const v = sub(b, a);
      return len(v) > 1e-9 ? { a, b, n: mul(norm(unit(v)), d) } : null;
    });
    const L = legs.filter(Boolean);
    const first = L[0], last = L[L.length - 1];
    const p0 = add(s.p0, first.n), p3 = add(s.p3, last.n);
    const meet = (A, B) => {
      const u = sub(A.b, A.a), v = sub(B.b, B.a);
      const den = cross(u, v);
      if (Math.abs(den) < 1e-9) return null;
      const a0 = add(A.a, A.n), b0 = add(B.a, B.n);
      const t = cross(sub(b0, a0), v) / den;
      return add(a0, mul(u, t));
    };
    let p1, p2;
    if (L.length === 3) { p1 = meet(L[0], L[1]) ?? add(s.p1, L[0].n); p2 = meet(L[1], L[2]) ?? add(s.p2, L[2].n); }
    else if (L.length === 2) { const m = meet(L[0], L[1]) ?? add(s.p1, L[0].n); p1 = m; p2 = m; }
    else { p1 = add(s.p1, first.n); p2 = add(s.p2, first.n); }
    return { t: 'c', p0, p1, p2, p3 };
  });
  for (let i = 0; i < N; i++) {
    const a = segs[i], b = segs[(i + 1) % N];
    const A = off[i], B = off[(i + 1) % N];
    out.push(A);
    const tin = tangentAt(a, true), tout = tangentAt(b, false);
    const turn = Math.acos(Math.max(-1, Math.min(1, dot(tin, tout))));
    if (turn < 1e-3) { B.p0 = A.t === 'l' ? A.p1 : A.p3; continue; }        // smooth join
    const Aend = A.t === 'l' ? A.p1 : A.p3;
    // offsets DIVERGE (round join paints an arc) when the path turns away
    // from the offset side: cross and side sign agree
    const gapDir = cross(tin, tout) * sgn;
    if (gapDir > 0) {
      // CONVEX for this offset side: the round join paints an arc of radius d
      const k = (4 / 3) * Math.tan(turn / 4) * d;
      out.push({ t: 'c', p0: Aend, p1: add(Aend, mul(tin, k)), p2: sub(B.p0, mul(tout, k)), p3: B.p0 });
    } else {
      // REFLEX: the offsets overlap; trim to their intersection
      if (A.t === 'l' && B.t === 'l') {
        const den = cross(sub(A.p1, A.p0), sub(B.p1, B.p0));
        if (Math.abs(den) > 1e-9) {
          const t = cross(sub(B.p0, A.p0), sub(B.p1, B.p0)) / den;
          const X = add(A.p0, mul(sub(A.p1, A.p0), t));
          if (len(sub(X, Aend)) < 3 * d) { A.p1 = X; B.p0 = X; continue; }
        }
      }
      // A curved arm has no single intersection to solve for, so trim both
      // arms at the crossing instead. Connecting them rather than trimming
      // drags the outgoing arm's start onto the incoming arm's end — a full
      // 2 * d apart at a right angle — which collapses the corner into a
      // spike: heart's notch, the cloud shoulders, the message tails.
      const X = reflexCrossing(A, B);
      if (X && len(sub(ptAt(A, X.tA), Aend)) < 3 * d && X.tA > 0.01 && X.tB < 0.99) {
        const LA = splitLeft(A, X.tA), RB = splitRight(B, X.tB);
        Object.assign(A, LA); Object.assign(B, RB);
        B.p0 = A.t === 'l' ? A.p1 : A.p3;                // one shared point exactly
        continue;
      }
      B.p0 = Aend;                                       // fallback: just connect
    }
  }
  let d2 = `M${n(out[0].p0[0])} ${n(out[0].p0[1])}`, at = out[0].p0;
  for (const s of out) {
    if (len(sub(s.p0, at)) > 1e-3) d2 += `L${n(s.p0[0])} ${n(s.p0[1])}`;
    if (s.t === 'l') { if (len(sub(s.p1, s.p0)) > 1e-6) d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`; at = s.p1; }
    else { d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`; at = s.p3; }
  }
  return d2 + 'Z';
}

export function signedArea(segs) {
  const pts = samplePts(segs, 6);
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}
export function reverseD(d) {
  const runs = segsOf(d);
  const { segs } = runs[0];
  const out = [];
  for (let i = segs.length - 1; i >= 0; i--) {
    const s = segs[i];
    out.push(s.t === 'l' ? { t: 'l', p0: s.p1, p1: s.p0 } : { t: 'c', p0: s.p3, p1: s.p2, p2: s.p1, p3: s.p0 });
  }
  let d2 = `M${n(out[0].p0[0])} ${n(out[0].p0[1])}`;
  for (const s of out) {
    if (s.t === 'l') d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`;
    else d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
  }
  return d2 + 'Z';
}
