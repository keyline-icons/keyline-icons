// A terminal corner arc, done properly.
//
// The path stops PART WAY round the corner, so the tangent at the free end is
// not the direction the edge was heading — on copy it is 45 degrees round a
// quarter turn. Fit the circle the arc lies on, complete the turn to the corner
// the drawing meant (90 degrees unless the arc already turned further), and the
// outgoing edge falls out of that. Then fillet at r=1 and run out along that
// edge to where the original end projects, so the stub keeps its length.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const mul=(a,k)=>[a[0]*k,a[1]*k], len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1], cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const par=(a,b)=>{const la=len(a),lb=len(b);return la>1e-6&&lb>1e-6&&Math.abs(cross(a,b)/(la*lb))<5e-2;};
function isect(p,u,q,v){const d=cross(u,v); if(Math.abs(d)<1e-9)return null;
  return add(p, mul(u, ((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/d));}
function circleThrough(a,b,c){
  const ax=a[0],ay=a[1],bx=b[0],by=b[1],cx=c[0],cy=c[1];
  const d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
  if(Math.abs(d)<1e-9) return null;
  const ux=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/d;
  const uy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/d;
  return { C:[ux,uy], R: Math.hypot(ax-ux, ay-uy) };
}
const cubicAt=(p0,p1,p2,p3,t)=>{const u=1-t;return [0,1].map(i=>u*u*u*p0[i]+3*u*u*t*p1[i]+3*u*t*t*p2[i]+t*t*t*p3[i]);};

function segsOf(d){const runs=[];let segs=[],x=0,y=0,sx=0,sy=0;
 const flush=c=>{if(segs.length)runs.push({segs,closed:c});segs=[];};
 for(const {cmd,args} of tokenize(d)){const U=cmd.toUpperCase();
  if(U==='M'){flush(false);x=args[0];y=args[1];sx=x;sy=y;}
  else if(U==='L'){segs.push({t:'l',p0:[x,y],p1:[args[0],args[1]]});x=args[0];y=args[1];}
  else if(U==='H'){segs.push({t:'l',p0:[x,y],p1:[args[0],y]});x=args[0];}
  else if(U==='V'){segs.push({t:'l',p0:[x,y],p1:[x,args[0]]});y=args[0];}
  else if(U==='C'){segs.push({t:'c',p0:[x,y],p1:[args[0],args[1]],p2:[args[2],args[3]],p3:[args[4],args[5]]});x=args[4];y=args[5];}
  else if(U==='Z'){if(Math.abs(x-sx)>1e-9||Math.abs(y-sy)>1e-9)segs.push({t:'l',p0:[x,y],p1:[sx,sy]});flush(true);x=sx;y=sy;}
  else return null;}
 flush(false);return runs;}

function cornerAt(cur, nb, atFirst, r) {
  const joint = atFirst ? cur.p3 : cur.p0;                  // the end that meets the line
  const free  = atFirst ? cur.p0 : cur.p3;
  const along = atFirst ? sub(nb.p1, nb.p0) : sub(nb.p0, nb.p1);   // line direction, away from the joint
  const jointTan = atFirst ? sub(cur.p3, cur.p2) : sub(cur.p1, cur.p0);
  if (!par(jointTan, along)) return null;
  const mid = cubicAt(cur.p0, cur.p1, cur.p2, cur.p3, 0.5);
  const fit = circleThrough(cur.p0, mid, cur.p3);
  if (!fit || fit.R > 8 || fit.R < 0.4) return null;
  const { C, R } = fit;
  const turned = Math.acos(Math.max(-1, Math.min(1, dot(unit(sub(joint, C)), unit(sub(free, C))))));
  const sign = Math.sign(cross(sub(joint, C), sub(free, C))) || 1;
  // complete the turn to a right angle unless the arc already went further
  const total = Math.max(turned, Math.PI / 2);
  const a0 = Math.atan2(joint[1] - C[1], joint[0] - C[0]);
  const a1 = a0 + sign * total;
  const tangentPoint = [C[0] + R * Math.cos(a1), C[1] + R * Math.sin(a1)];
  const outDir = unit([-sign * Math.sin(a1), sign * Math.cos(a1)]);   // tangent there, heading away
  const V = isect(joint, unit(sub(joint, add(joint, along))), tangentPoint, outDir)
         ?? isect(joint, unit(along), tangentPoint, outDir);
  if (!V) return null;
  // where the original end projects onto the outgoing edge, so the stub keeps its reach
  const endOut = add(V, mul(outDir, Math.max(dot(sub(free, V), outDir), 0)));
  const u = unit(sub(joint, V)), w = outDir;
  const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
  if (alpha < 1e-3 || Math.PI - alpha < 1e-3) return null;
  const t = Math.min(r / Math.tan(alpha / 2), len(sub(joint, V)) * 0.9, Math.max(len(sub(endOut, V)), 0.001));
  const rr = t * Math.tan(alpha / 2), k = (4 / 3) * Math.tan((Math.PI - alpha) / 4) * rr;
  const T1 = add(V, mul(u, t)), T2 = add(V, mul(w, t));
  return { T1, C1: sub(T1, mul(u, k)), C2: sub(T2, mul(w, k)), T2, end: endOut };
}

export function fixEnds2(d, r = 1) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '', changed = 0;
  for (const { segs, closed } of runs) {
    const parts = segs.map((s) => ({ ...s }));
    if (!closed && parts.length >= 2) {
      for (const atFirst of [true, false]) {
        const i = atFirst ? 0 : parts.length - 1;
        const cur = parts[i], nb = atFirst ? parts[1] : parts[parts.length - 2];
        if (!cur || cur.t !== 'c' || !nb || nb.t !== 'l') continue;
        const c = cornerAt(cur, nb, atFirst, r);
        if (!c) continue;
        parts[i] = { t: 'seq', atFirst, ...c };
        changed++;
      }
    }
    const head = parts[0];
    const start = head.t === 'seq' ? (head.atFirst ? head.end : head.p0) : head.p0;
    let at = start;
    // a zero-length run-out is not a segment, it is noise
    const L = (p) => { const s = (Math.hypot(p[0]-at[0], p[1]-at[1]) < 1e-3) ? '' : `L${n(p[0])} ${n(p[1])}`; at = p; return s; };
    const C3 = (a, b, c) => { at = c; return `C${n(a[0])} ${n(a[1])} ${n(b[0])} ${n(b[1])} ${n(c[0])} ${n(c[1])}`; };
    let d2 = `M${n(start[0])} ${n(start[1])}`;
    for (const s of parts) {
      if (s.t === 'l') d2 += L(s.p1);
      else if (s.t === 'c') d2 += C3(s.p1, s.p2, s.p3);
      else if (s.atFirst) d2 += L(s.T2) + C3(s.C2, s.C1, s.T1);
      else d2 += L(s.T1) + C3(s.C1, s.C2, s.T2) + L(s.end);
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return { d: out, changed };
}

if (process.argv[1].endsWith('ends2.mjs')) {
  const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
  const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  const box = (l) => { let b=[Infinity,Infinity,-Infinity,-Infinity];
    for (const d of l) { const p = pathBBox(d); if (!p) continue;
      b=[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[2]),Math.max(b[3],p[3])]; } return b; };
  mkdirSync('r1-ends2', { recursive: true });
  const base = readdirSync('r1-parts');
  let touched = 0, corners = 0, grew = [];
  for (const f of readdirSync('r1')) {
    const from = base.includes(f) ? 'r1-parts' : 'r1';
    const src = readFileSync(`${from}/${f}`, 'utf8');
    let c = 0;
    const out = src.replace(/ d="([^"]+)"/g, (m, d) => { const r = fixEnds2(d, 1); if (!r) return m; c += r.changed; return ` d="${r.d}"`; });
    writeFileSync(`r1-ends2/${f}`, out);
    if (c) { touched++; corners += c; }
    const T = box(ds(readFileSync(`${K}/${f}`, 'utf8'))), B = box(ds(out));
    const over = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
    if (over > 0.01) grew.push([f.replace('.svg',''), +over.toFixed(2)]);
  }
  console.log({ drawings: touched, corners });
  console.log('over the box:', grew.length, grew.slice(0,8).map(([a,b])=>`${a} ${b}`).join(', '));
  console.log('\ncopy:', ds(readFileSync('r1-ends2/copy.svg','utf8'))[0]);
}
