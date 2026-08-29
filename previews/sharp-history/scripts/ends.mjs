// Corner arcs at the END of an open path. The de-fillet skipped them because a
// fillet needs a line on both sides, and these have one line and a free end.
// The other side is still recoverable: the tangent where the arc leaves the
// path. Intersect that with the adjacent line and the corner reappears; fillet
// it at r=1 and run out to the original endpoint, so the drawing ends exactly
// where it ended before.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub = (a,b) => [a[0]-b[0], a[1]-b[1]], add = (a,b) => [a[0]+b[0], a[1]+b[1]];
const mul = (a,k) => [a[0]*k, a[1]*k], len = (a) => Math.hypot(a[0],a[1]);
const unit = (a) => mul(a, 1/len(a));
const par = (a,b) => { const la=len(a), lb=len(b); return la>1e-6 && lb>1e-6 && Math.abs((a[0]*b[1]-a[1]*b[0])/(la*lb)) < 5e-2; };
function isect(p,u,q,v) { const den = u[0]*v[1]-u[1]*v[0]; if (Math.abs(den) < 1e-9) return null;
  const t = ((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/den; return add(p, mul(u,t)); }

function segsOf(d) {
  const runs = []; let segs = [], x=0, y=0, sx=0, sy=0;
  const flush = (c) => { if (segs.length) runs.push({ segs, closed: c }); segs = []; };
  for (const { cmd, args } of tokenize(d)) {
    const U = cmd.toUpperCase();
    if (U === 'M') { flush(false); x=args[0]; y=args[1]; sx=x; sy=y; }
    else if (U === 'L') { segs.push({ t:'l', p0:[x,y], p1:[args[0],args[1]] }); x=args[0]; y=args[1]; }
    else if (U === 'H') { segs.push({ t:'l', p0:[x,y], p1:[args[0],y] }); x=args[0]; }
    else if (U === 'V') { segs.push({ t:'l', p0:[x,y], p1:[x,args[0]] }); y=args[0]; }
    else if (U === 'C') { segs.push({ t:'c', p0:[x,y], p1:[args[0],args[1]], p2:[args[2],args[3]], p3:[args[4],args[5]] }); x=args[4]; y=args[5]; }
    else if (U === 'Z') { if (Math.abs(x-sx)>1e-9||Math.abs(y-sy)>1e-9) segs.push({ t:'l', p0:[x,y], p1:[sx,sy] }); flush(true); x=sx; y=sy; }
    else return null;
  }
  flush(false); return runs;
}
function arc(V, A, B, r) {
  const u = unit(sub(A,V)), w = unit(sub(B,V));
  const alpha = Math.acos(Math.max(-1, Math.min(1, u[0]*w[0]+u[1]*w[1])));
  if (alpha < 1e-3 || Math.PI-alpha < 1e-3) return null;
  const t = Math.min(r/Math.tan(alpha/2), len(sub(A,V))*0.9, len(sub(B,V))*0.9);
  const rr = t*Math.tan(alpha/2), k = (4/3)*Math.tan((Math.PI-alpha)/4)*rr;
  const T1 = add(V, mul(u,t)), T2 = add(V, mul(w,t));
  return { T1, T2, C1: sub(T1, mul(u,k)), C2: sub(T2, mul(w,k)), r: rr };
}

/** Re-cut a terminal corner arc to radius r, keeping the endpoint where it is. */
export function fixEnds(d, r = 1) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '', changed = 0;
  for (const { segs, closed } of runs) {
    const parts = segs.map((s) => ({ ...s }));
    if (!closed && parts.length >= 2) {
      for (const at of ['first', 'last']) {
        const i = at === 'first' ? 0 : parts.length - 1;
        const cur = parts[i];
        const nb = at === 'first' ? parts[1] : parts[parts.length - 2];
        if (!cur || cur.t !== 'c' || !nb || nb.t !== 'l') continue;
        // the free end, and the tangent leaving it
        const free = at === 'first' ? cur.p0 : cur.p3;
        const tanFree = at === 'first' ? sub(cur.p0, cur.p1) : sub(cur.p3, cur.p2);
        const joint = at === 'first' ? cur.p3 : cur.p0;
        const along = at === 'first' ? sub(nb.p1, nb.p0) : sub(nb.p0, nb.p1);
        if (!par(at === 'first' ? sub(cur.p3, cur.p2) : sub(cur.p0, cur.p1), along)) continue;
        const V = isect(joint, along, free, tanFree);
        if (!V) continue;
        const a = arc(V, joint, free, r);
        if (!a || a.r > 6) continue;
        // line from the joint to T1, arc, then line out to the original end
        if (at === 'first') parts[i] = { t: 'seq', from: free, pieces: [{ to: a.T2 }, { arcTo: a.T1, c1: a.C2, c2: a.C1 }] };
        else parts[i] = { t: 'seq', from: cur.p0, pieces: [{ to: a.T1 }, { arcTo: a.T2, c1: a.C1, c2: a.C2 }, { to: free }] };
        if (at === 'first') parts[i].pieces.push({ to: joint });
        changed++;
      }
    }
    // emit
    const start = parts[0].t === 'seq' ? parts[0].from : parts[0].p0;
    let d2 = `M${n(start[0])} ${n(start[1])}`;
    for (const s of parts) {
      if (s.t === 'l') d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`;
      else if (s.t === 'c') d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
      else for (const p of s.pieces) d2 += p.arcTo ? `C${n(p.c1[0])} ${n(p.c1[1])} ${n(p.c2[0])} ${n(p.c2[1])} ${n(p.arcTo[0])} ${n(p.arcTo[1])}` : `L${n(p.to[0])} ${n(p.to[1])}`;
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return { d: out, changed };
}

if (process.argv[1].endsWith('ends.mjs')) {
  const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
  const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  const box = (l) => { let b=[Infinity,Infinity,-Infinity,-Infinity];
    for (const d of l) { const p = pathBBox(d); if (!p) continue;
      b=[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[2]),Math.max(b[3],p[3])]; } return b; };
  mkdirSync('r1-ends', { recursive: true });
  let touched = 0, corners = 0, grew = [];
  for (const f of readdirSync('r1-parts').concat(readdirSync('r1'))) {
    const from = readdirSync('r1-parts').includes(f) ? 'r1-parts' : 'r1';
    if (readdirSync('r1-ends').includes(f)) continue;
    const src = readFileSync(`${from}/${f}`, 'utf8');
    let c = 0;
    const out = src.replace(/ d="([^"]+)"/g, (m, d) => { const r = fixEnds(d, 1); if (!r) return m; c += r.changed; return ` d="${r.d}"`; });
    writeFileSync(`r1-ends/${f}`, out);
    if (c) { touched++; corners += c; }
    const T = box(ds(readFileSync(`${K}/${f}`, 'utf8'))), B = box(ds(out));
    const over = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
    if (over > 0.01) grew.push([f.replace('.svg',''), +over.toFixed(2)]);
  }
  console.log({ drawingsWithTerminalCorners: touched, cornersFixed: corners });
  grew.sort((a,b) => b[1]-a[1]);
  console.log('still over the box:', grew.length, grew.slice(0, 12).map(([a,b]) => `${a} ${b}`).join(', '));
}
