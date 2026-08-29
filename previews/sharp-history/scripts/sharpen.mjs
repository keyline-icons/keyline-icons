// Sharp = every corner radius CLAMPED AT 1, not set to 1.
//
// The difference matters: the cursor family draws its arrow at r=0.5 and its
// tip at 0.7, so setting every corner to 1 made the sharp variant rounder than
// the drawing it came from. A ceiling leaves those alone and only pulls the
// house ladder's 3s and 4s down.
//
// One pass over the rounded drawing: find the fillet, recover the corner it was
// cut from, put back a fillet of min(original, 1). Round cap kept throughout,
// so the painted box is the geometry box grown by a unit and nothing else has
// to be modelled.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const CAP = 1;
const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const mul=(a,k)=>[a[0]*k,a[1]*k], len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1], cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const par=(a,b)=>{const la=len(a),lb=len(b);return la>1e-6&&lb>1e-6&&Math.abs(cross(a,b)/(la*lb))<5e-2;};
function isect(p,u,q,v){const d=cross(u,v);if(Math.abs(d)<1e-9)return null;
  return add(p, mul(u, ((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/d));}
function circleThrough(a,b,c){const [ax,ay]=a,[bx,by]=b,[cx,cy]=c;
  const d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by)); if(Math.abs(d)<1e-9) return null;
  const ux=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/d;
  const uy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/d;
  return { C:[ux,uy], R: Math.hypot(ax-ux, ay-uy) };}
const cubicAt=(p0,p1,p2,p3,t)=>{const u=1-t;return [0,1].map(i=>u*u*u*p0[i]+3*u*u*t*p1[i]+3*u*t*t*p2[i]+t*t*t*p3[i]);};

function segsOf(d){const runs=[];let segs=[],x=0,y=0,sx=0,sy=0;
 const flush=c=>{if(segs.length)runs.push({segs,closed:c});segs=[];};
 for(const {cmd,args} of tokenize(d)){const rel=cmd===cmd.toLowerCase(),U=cmd.toUpperCase();
  const ax=i=>rel?x+args[i]:args[i], ay=i=>rel?y+args[i]:args[i];
  if(U==='M'){flush(false);x=ax(0);y=ay(1);sx=x;sy=y;}
  else if(U==='L'||U==='H'||U==='V'){const nx=U==='V'?x:U==='H'?(rel?x+args[0]:args[0]):ax(0);
    const ny=U==='H'?y:U==='V'?(rel?y+args[0]:args[0]):ay(1);
    segs.push({t:'l',p0:[x,y],p1:[nx,ny]});x=nx;y=ny;}
  else if(U==='C'){const p3=[ax(4),ay(5)];segs.push({t:'c',p0:[x,y],p1:[ax(0),ay(1)],p2:[ax(2),ay(3)],p3});x=p3[0];y=p3[1];}
  else if(U==='Z'){if(Math.abs(x-sx)>1e-9||Math.abs(y-sy)>1e-9)segs.push({t:'l',p0:[x,y],p1:[sx,sy]});flush(true);x=sx;y=sy;}
  else return null;}
 flush(false);return runs;}

function filletAt(V, A, B, r) {
  const u = unit(sub(A,V)), w = unit(sub(B,V));
  const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u,w))));
  if (alpha < 1e-3 || Math.PI - alpha < 1e-3) return null;
  const t = Math.min(r/Math.tan(alpha/2), len(sub(A,V))*0.95, len(sub(B,V))*0.95);
  const rr = t*Math.tan(alpha/2), k = (4/3)*Math.tan((Math.PI-alpha)/4)*rr;
  const T1 = add(V, mul(u,t)), T2 = add(V, mul(w,t));
  return { T1, T2, C1: sub(T1, mul(u,k)), C2: sub(T2, mul(w,k)) };
}

export function sharpen(d, ceiling = 1) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '', clamped = 0, kept = 0;
  for (const { segs, closed } of runs) {
    const parts = segs.map(s => ({ ...s }));
    const N = parts.length;
    // interior corners: a cubic with a line each side, tangent to both
    for (let i = 0; i < N; i++) {
      const cur = parts[i];
      if (cur.t !== 'c' || cur.done) continue;
      const prev = parts[(i-1+N)%N], next = parts[(i+1)%N];
      if ((!closed && (i === 0 || i === N-1)) || !prev || !next || prev.t !== 'l' || next.t !== 'l') continue;
      const u = sub(cur.p1, cur.p0), v = sub(cur.p3, cur.p2);
      if (!par(u, sub(prev.p1, prev.p0)) || !par(v, sub(next.p1, next.p0))) continue;
      const V = isect(cur.p0, u, cur.p3, mul(v, -1));
      if (!V) continue;
      const a = sub(prev.p0, V), b = sub(next.p1, V);
      const alpha = Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
      const orig = len(sub(cur.p0, V)) * Math.tan(alpha/2);
      if (orig <= ceiling + 1e-6) { kept++; continue; }        // already tighter than the ceiling
      const f = filletAt(V, prev.p0, next.p1, ceiling);
      if (!f) continue;
      prev.p1 = f.T1; next.p0 = f.T2;
      parts[i] = { t: 'c', p0: f.T1, p1: f.C1, p2: f.C2, p3: f.T2, done: true };
      clamped++;
    }
    // terminal corners: a cubic at a free end with one line beside it
    if (!closed && N >= 2) {
      for (const atFirst of [true, false]) {
        const i = atFirst ? 0 : N-1;
        const cur = parts[i], nb = atFirst ? parts[1] : parts[N-2];
        if (!cur || cur.t !== 'c' || cur.done || !nb || nb.t !== 'l') continue;
        const joint = atFirst ? cur.p3 : cur.p0, free = atFirst ? cur.p0 : cur.p3;
        const along = atFirst ? sub(nb.p1, nb.p0) : sub(nb.p0, nb.p1);
        const jointTan = atFirst ? sub(cur.p3, cur.p2) : sub(cur.p1, cur.p0);
        if (!par(jointTan, along)) continue;
        const mid = cubicAt(cur.p0, cur.p1, cur.p2, cur.p3, 0.5);
        const fit = circleThrough(cur.p0, mid, cur.p3);
        if (!fit || fit.R > 8 || fit.R < 0.2) continue;
        if (fit.R <= ceiling + 1e-6) { kept++; continue; }
        const { C, R } = fit;
        const turned = Math.acos(Math.max(-1, Math.min(1, dot(unit(sub(joint,C)), unit(sub(free,C))))));
        const sign = Math.sign(cross(sub(joint,C), sub(free,C))) || 1;
        const a1 = Math.atan2(joint[1]-C[1], joint[0]-C[0]) + sign * Math.max(turned, Math.PI/2);
        const tp = [C[0] + R*Math.cos(a1), C[1] + R*Math.sin(a1)];
        const outDir = unit([-sign*Math.sin(a1), sign*Math.cos(a1)]);
        const V = isect(joint, unit(along), tp, outDir);
        if (!V) continue;
        const endOut = add(V, mul(outDir, Math.max(dot(sub(free,V), outDir), 0)));
        const f = filletAt(V, joint, add(V, mul(outDir, Math.max(len(sub(endOut,V)), ceiling*2))), ceiling);
        if (!f) continue;
        parts[i] = { t: 'seq', atFirst, ...f, end: endOut, joint };
        clamped++;
      }
    }
    // emit
    const head = parts[0];
    const start = head.t === 'seq' ? (head.atFirst ? head.end : head.p0) : head.p0;
    let at = start;
    const L = (p) => { const s = (Math.hypot(p[0]-at[0], p[1]-at[1]) < 1e-3) ? '' : `L${n(p[0])} ${n(p[1])}`; at = p; return s; };
    const C3 = (a,b,c) => { at = c; return `C${n(a[0])} ${n(a[1])} ${n(b[0])} ${n(b[1])} ${n(c[0])} ${n(c[1])}`; };
    let d2 = `M${n(start[0])} ${n(start[1])}`;
    for (const s of parts) {
      if (s.t === 'l') d2 += L(s.p1);
      else if (s.t === 'c') d2 += C3(s.p1, s.p2, s.p3);
      else if (s.atFirst) d2 += L(s.T2) + C3(s.C2, s.C1, s.T1);
      else d2 += L(s.T1) + C3(s.C1, s.C2, s.T2) + L(s.end);
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return { d: out, clamped, kept };
}

if (process.argv[1].endsWith('sharpen.mjs')) {
  mkdirSync('sharp-final', { recursive: true });
  const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);
  const box = (l) => { let b=[Infinity,Infinity,-Infinity,-Infinity];
    for (const d of l) { const p = pathBBox(d); if(!p) continue;
      b=[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[2]),Math.max(b[3],p[3])]; } return b; };
  let clamped = 0, keptTight = 0, grew = [];
  for (const f of readdirSync(K).filter(x => x.endsWith('.svg'))) {
    const src = readFileSync(`${K}/${f}`, 'utf8');
    let c = 0, k = 0;
    const out = src.replace(/ d="([^"]+)"/g, (m, d) => { const r = sharpen(d, 1); if (!r) return m; c += r.clamped; k += r.kept; return ` d="${r.d}"`; });
    writeFileSync(`sharp-final/${f}`, out);
    clamped += c; keptTight += k;
    const T = box(ds(src)), B = box(ds(out));
    const over = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
    if (over > 0.01) grew.push([f.replace('.svg',''), +over.toFixed(2)]);
  }
  console.log({ cornersClamped: clamped, cornersAlreadyTighterThanOne: keptTight, drawingsStillOverTheBox: grew.length });
  grew.sort((a,b)=>b[1]-a[1]);
  console.log(grew.slice(0,10).map(([a,b])=>`${a} ${b}`).join(', '));
}
