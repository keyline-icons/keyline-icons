// Sharp does not have to mean radius 0. Put a small fillet back on every corner
// of the de-filleted drawing and see what the painted box does.
//
// A mitre reaches w/sin(a) past its vertex; an r-fillet reaches (r+w) - r/sin(a),
// which at a sharp apex goes NEGATIVE — the arc paints inside the vertex. That
// is why a half-unit radius can hold an envelope a mitre blows through.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';


const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub = (a, b) => [a[0]-b[0], a[1]-b[1]];
const add = (a, b) => [a[0]+b[0], a[1]+b[1]];
const mul = (a, k) => [a[0]*k, a[1]*k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1/len(a));

function segsOf(d) {
  const runs = []; let segs = [], x = 0, y = 0, sx = 0, sy = 0;
  const flush = (c) => { if (segs.length) runs.push({ segs, closed: c }); segs = []; };
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M') { flush(false); x = args[0]; y = args[1]; sx = x; sy = y; }
    else if (U === 'L') { segs.push({ t: 'l', p0: [x,y], p1: [args[0], args[1]] }); x = args[0]; y = args[1]; }
    else if (U === 'H') { segs.push({ t: 'l', p0: [x,y], p1: [args[0], y] }); x = args[0]; }
    else if (U === 'V') { segs.push({ t: 'l', p0: [x,y], p1: [x, args[0]] }); y = args[0]; }
    else if (U === 'C') { segs.push({ t: 'c', p0: [x,y], p1: [args[0],args[1]], p2: [args[2],args[3]], p3: [args[4],args[5]] }); x = args[4]; y = args[5]; }
    else if (U === 'Z') { if (Math.abs(x-sx) > 1e-9 || Math.abs(y-sy) > 1e-9) segs.push({ t: 'l', p0: [x,y], p1: [sx,sy] }); flush(true); x = sx; y = sy; }
    else return null;
  }
  flush(false); return runs;
}

/** The guide's forward construction, section 7: sharp polygon in, fillet out. */
function fillet(V, A, B, r) {
  const u = unit(sub(A, V)), w = unit(sub(B, V));
  const cosA = Math.max(-1, Math.min(1, u[0]*w[0] + u[1]*w[1]));
  const alpha = Math.acos(cosA);
  if (alpha < 1e-3 || Math.PI - alpha < 1e-3) return null;   // collinear, nothing to round
  const t = r / Math.tan(alpha / 2);
  const maxT = Math.min(len(sub(A, V)), len(sub(B, V))) * 0.5;
  const tt = Math.min(t, maxT);
  const rr = tt * Math.tan(alpha / 2);
  const k = (4/3) * Math.tan((Math.PI - alpha) / 4) * rr;
  const T1 = add(V, mul(u, tt)), T2 = add(V, mul(w, tt));
  return { T1, T2, C1: sub(T1, mul(u, k)), C2: sub(T2, mul(w, k)) };
}

function refillet(d, r) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '';
  for (const { segs, closed } of runs) {
    const N = segs.length;
    const parts = segs.map((s) => ({ ...s }));
    const cuts = new Map();
    for (let i = 0; i < N; i++) {
      const cur = parts[i], next = parts[(i+1) % N];
      if (cur.t !== 'l' || next.t !== 'l') continue;
      if (!closed && i === N - 1) continue;
      const f = fillet(cur.p1, cur.p0, next.p1, r);
      if (f) cuts.set(i, f);
    }
    // rewrite endpoints, then emit
    for (const [i, f] of cuts) { parts[i].p1 = f.T1; parts[(i+1) % N].p0 = f.T2; }
    let d2 = `M${n(parts[0].p0[0])} ${n(parts[0].p0[1])}`;
    for (let i = 0; i < N; i++) {
      const s = parts[i];
      d2 += s.t === 'l' ? `L${n(s.p1[0])} ${n(s.p1[1])}`
        : `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
      const f = cuts.get(i);
      if (f) d2 += `C${n(f.C1[0])} ${n(f.C1[1])} ${n(f.C2[0])} ${n(f.C2[1])} ${n(f.T2[0])} ${n(f.T2[1])}`;
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return out;
}


export { refillet };
