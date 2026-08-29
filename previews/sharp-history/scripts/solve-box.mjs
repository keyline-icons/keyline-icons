// Fit a path into a box by SOLVING its corners, not by clamping coordinates.
//
// clampPath projected every out-of-box coordinate onto the box and fitPath
// translated every out-of-box point by the overshoot. Both tear any corner arc
// or edge that STRADDLES the bound: half its points move and half stay, which
// is where the S-shaped wiggles, the bent cursor tip and every poking tint
// came from. Here the unit of movement is the corner itself: a bare vertex
// moves and its two edges redraw; a corner ARC has its vertex moved and the
// fillet re-solved against the moved vertex, so tangency and radius survive.
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub = (a,b) => [a[0]-b[0], a[1]-b[1]], add = (a,b) => [a[0]+b[0], a[1]+b[1]];
const mul = (a,k) => [a[0]*k, a[1]*k], len = (a) => Math.hypot(a[0], a[1]), unit = (a) => mul(a, 1/len(a));
const dot = (a,b) => a[0]*b[0]+a[1]*b[1], cross = (a,b) => a[0]*b[1]-a[1]*b[0];

function segsOf(d) {
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

// Merge a vertex that sits within `tol` of the straight line between its
// neighbours. Distance-based, so 4-decimal rounding jitter cannot keep a
// leftover tangent point alive the way a relative-cross tolerance did.
function mergeCollinear(run, tol = 0.02) {
  let again = true;
  while (again) {
    again = false;
    const { segs, closed } = run, N = segs.length;
    for (let i = 0; i < N; i++) {
      const a = segs[i], b = segs[(i + 1) % N];
      if (!closed && i === N - 1) break;
      if (a.t !== 'l' || b.t !== 'l') continue;
      const AC = sub(b.p1, a.p0), L = len(AC);
      if (L < 1e-9) continue;
      const d = Math.abs(cross(AC, sub(a.p1, a.p0))) / L;
      if (d < tol && dot(sub(a.p1, a.p0), sub(b.p1, b.p0)) > 0) {
        a.p1 = b.p1;
        segs.splice((i + 1) % N, 1);
        if ((i + 1) % N === 0) run.segs = segs;   // spliced the head: keep array
        again = true; break;
      }
    }
  }
}

function cubicExtremes(s, axis) {
  const c = [s.p0[axis], s.p1[axis], s.p2[axis], s.p3[axis]];
  const vals = [c[0], c[3]];
  const a = -c[0] + 3*c[1] - 3*c[2] + c[3], b = 2*(c[0] - 2*c[1] + c[2]), cc = c[1] - c[0];
  const ts = [];
  if (Math.abs(a) < 1e-12) { if (Math.abs(b) > 1e-12) ts.push(-cc / b); }
  else { const disc = b*b - 4*a*cc; if (disc >= 0) { const q = Math.sqrt(disc); ts.push((-b+q)/(2*a), (-b-q)/(2*a)); } }
  for (const t of ts) if (t > 0 && t < 1) {
    const m = 1 - t;
    vals.push(m*m*m*c[0] + 3*m*m*t*c[1] + 3*m*t*t*c[2] + t*t*t*c[3]);
  }
  return [Math.min(...vals), Math.max(...vals)];
}
function segExtreme(s, axis, side) {          // side: 0 = min, 1 = max
  if (s.t === 'l') { const v = [s.p0[axis], s.p1[axis]]; return side ? Math.max(...v) : Math.min(...v); }
  return cubicExtremes(s, axis)[side];
}

function filletAt(V, A, B, r) {
  const u = unit(sub(A, V)), w = unit(sub(B, V));
  const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
  if (alpha < 1e-3 || Math.PI - alpha < 1e-3) return null;
  const t = Math.min(r / Math.tan(alpha / 2), len(sub(A, V)) * 0.95, len(sub(B, V)) * 0.95);
  const rr = t * Math.tan(alpha / 2), k = (4 / 3) * Math.tan((Math.PI - alpha) / 4) * rr;
  const T1 = add(V, mul(u, t)), T2 = add(V, mul(w, t));
  return { T1, T2, C1: sub(T1, mul(u, k)), C2: sub(T2, mul(w, k)) };
}

// Units of one run: maximal cubic groups, and every line-line vertex / free end.
function unitsOf(run) {
  const { segs, closed } = run, N = segs.length, out = [];
  let i = 0;
  while (i < N) {
    if (segs[i].t === 'c') {
      let j = i;
      while (j + 1 < N && segs[j + 1].t === 'c') j++;
      out.push({ kind: 'group', lo: i, hi: j });
      i = j + 1;
    } else i++;
  }
  for (let k = 0; k < N; k++) {
    const a = segs[k], b = segs[(k + 1) % N];
    if (a.t !== 'l') continue;
    if (!closed && k === N - 1) { out.push({ kind: 'point', at: k, end: 1 }); continue; }
    if (b.t === 'l') out.push({ kind: 'point', at: k, end: 1 });
  }
  if (!closed && segs[0].t === 'l') out.push({ kind: 'point', at: 0, end: 0 });
  return out;
}

function groupExtreme(run, g, axis, side) {
  let v = side ? -Infinity : Infinity;
  for (let k = g.lo; k <= g.hi; k++) {
    const e = segExtreme(run.segs[k], axis, side);
    v = side ? Math.max(v, e) : Math.min(v, e);
  }
  return v;
}

function moveGroup(run, g, delta) {
  const { segs } = run, N = segs.length;
  const first = segs[g.lo], last = segs[g.hi];
  const prev = segs[(g.lo - 1 + N) % N], next = segs[(g.hi + 1) % N];
  const singleCorner = g.lo === g.hi && prev !== next && prev !== last && next !== first
    && prev.t === 'l' && next.t === 'l' && (run.closed || (g.lo > 0 && g.hi < N - 1));
  if (singleCorner) {
    // re-solve the fillet at the moved vertex, keeping its painted radius
    const tin = unit(sub(first.p1, first.p0)), tout = unit(sub(last.p3, last.p2));
    const V = (() => {                                   // tangent intersection
      const d = cross(tin, tout);
      if (Math.abs(d) < 1e-9) return null;
      const q = sub(last.p3, first.p0);
      return add(first.p0, mul(tin, cross(q, tout) / d));
    })();
    if (V) {
      const A = prev.p0, B = next.p1;
      const alpha = Math.acos(Math.max(-1, Math.min(1, dot(unit(sub(A, V)), unit(sub(B, V))))));
      const r = len(sub(first.p0, V)) * Math.tan(alpha / 2);
      const V2 = add(V, delta);
      const f = filletAt(V2, A, B, Math.max(0.2, Math.min(r, 1.5)));
      if (f && [...f.T1, ...f.T2, ...f.C1, ...f.C2].every(Number.isFinite)) {
        prev.p1 = f.T1; next.p0 = f.T2;
        run.segs[g.lo] = { t: 'c', p0: f.T1, p1: f.C1, p2: f.C2, p3: f.T2 };
        return true;
      }
    }
  }
  // rigid translate, neighbours redraw to the moved ends
  for (let k = g.lo; k <= g.hi; k++) {
    const s = segs[k];
    s.p0 = add(s.p0, delta); s.p3 = add(s.p3, delta);
    s.p1 = add(s.p1, delta); s.p2 = add(s.p2, delta);
  }
  if (prev !== last && prev.t === 'l') prev.p1 = segs[g.lo].p0;
  if (next !== first && next.t === 'l') next.p0 = segs[g.hi].p3;
  return true;
}

// opts.record: array that receives {p:[x,y], d:[dx,dy]} for every unit moved.
// opts.imposed: list of the same shape — apply THESE moves to matching local
// units instead of solving against the box (the tint follows its stroke).
export function solveBox(d, T, opts = {}) {
  const runs = segsOf(d);
  if (!runs) return null;
  for (const run of runs) if (run.segs.length > 2) mergeCollinear(run);
  if (opts.imposed) {
    for (const run of runs) {
      const units = unitsOf(run);
      for (const g of units) {
        let c;
        if (g.kind === 'group') {
          const f = run.segs[g.lo], l = run.segs[g.hi];
          c = mul(add(f.p0, l.p3), 0.5);
        } else {
          const s = run.segs[g.at];
          c = g.end ? s.p1 : s.p0;
        }
        let best = null, bd = 1.8;
        for (const m of opts.imposed) {
          const dd = len(sub(c, m.p));
          if (dd < bd) { bd = dd; best = m; }
        }
        if (!best) continue;
        if (g.kind === 'group') moveGroup(run, g, best.d);
        else {
          const s = run.segs[g.at], q = add(g.end ? s.p1 : s.p0, best.d);
          if (g.end) s.p1 = q; else s.p0 = q;
          const N = run.segs.length;
          if (g.end) { const nxt = run.segs[(g.at + 1) % N]; if ((run.closed || g.at < N - 1) && nxt) nxt.p0 = q; }
          else { const prv = run.segs[(g.at - 1 + N) % N]; if (run.closed && prv) prv.p1 = q; }
        }
      }
    }
    return emit(runs);
  }
  const unitCenters = () => runs.flatMap((run) => unitsOf(run).map((g) => {
    if (g.kind === 'group') { const f = run.segs[g.lo], l = run.segs[g.hi]; return mul(add(f.p0, l.p3), 0.5); }
    const s = run.segs[g.at]; return [...(g.end ? s.p1 : s.p0)];
  }));
  const before = opts.record ? unitCenters() : null;
  const sides = [
    { axis: 0, side: 0, bound: T[0], sign: 1 },
    { axis: 0, side: 1, bound: T[2], sign: -1 },
    { axis: 1, side: 0, bound: T[1], sign: 1 },
    { axis: 1, side: 1, bound: T[3], sign: -1 },
  ];
  for (let pass = 0; pass < 5; pass++) {
    let moved = false;
    for (const { axis, side, bound, sign } of sides) {
      // path extreme on this side
      let ext = side ? -Infinity : Infinity;
      for (const run of runs) for (const s of run.segs) {
        const e = segExtreme(s, axis, side);
        ext = side ? Math.max(ext, e) : Math.min(ext, e);
      }
      const over = side ? ext - bound : bound - ext;
      if (over <= 0.001) continue;
      const delta = [0, 0]; delta[axis] = sign * over;
      for (const run of runs) {
        const units = unitsOf(run);
        // every unit that attains the extreme moves; big arcs refuse
        for (const g of units.filter((x) => x.kind === 'group')) {
          const ge = groupExtreme(run, g, axis, side);
          if (Math.abs(ge - ext) > 1e-6) continue;
          const span = Math.abs(groupExtreme(run, g, axis, 1) - groupExtreme(run, g, axis, 0));
          if (span > 3.5) continue;                       // a real arc, not a corner
          moveGroup(run, g, delta); moved = true;
        }
        for (const g of units.filter((x) => x.kind === 'point')) {
          const s = run.segs[g.at];
          const p = g.end ? s.p1 : s.p0;
          if (Math.abs(p[axis] - ext) > 1e-6) continue;
          const q = add(p, delta);
          if (g.end) s.p1 = q; else s.p0 = q;
          const N = run.segs.length;
          if (g.end) { const nxt = run.segs[(g.at + 1) % N]; if ((run.closed || g.at < N - 1) && nxt) nxt.p0 = q; }
          else { const prv = run.segs[(g.at - 1 + N) % N]; if (run.closed && prv) prv.p1 = q; }
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
  if (opts.record) {
    const after = unitCenters();
    // unit lists are index-stable: passes move points, never add or drop them
    if (after.length === before.length) {
      for (let i = 0; i < after.length; i++) {
        const dd = sub(after[i], before[i]);
        if (len(dd) > 1e-6) opts.record.push({ p: before[i], d: dd });
      }
    }
  }
  return emit(runs);
}

function emit(runs) {
  let out = '';
  for (const { segs, closed } of runs) {
    if (!segs.length) continue;
    let d2 = `M${n(segs[0].p0[0])} ${n(segs[0].p0[1])}`, at = segs[0].p0;
    for (const s of segs) {
      if (len(sub(s.p0, at)) > 1e-3) d2 += `L${n(s.p0[0])} ${n(s.p0[1])}`;
      if (s.t === 'l') { if (len(sub(s.p1, s.p0)) > 1e-6) d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`; at = s.p1; }
      else { d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`; at = s.p3; }
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return out;
}
