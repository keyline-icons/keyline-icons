// Sharp fill and duotone, without building a stroke outliner.
//
// A fill is the stroke drawing offset outward by half the stroke width, and
// offsetting adds that much to every OUTER corner radius and subtracts it from
// every INNER one. The middle rung's stroke corner is radius 0, so its fill
// corner is 1 outside and 0 inside. That is a rule I can apply to the fills the
// set already has, rather than re-deriving them from the stroke.
//
// Telling outer from inner: at an outer corner the sharp vertex the fillet was
// cut from lies OUTSIDE the filled region (the fillet removes material); at an
// inner corner it lies inside (the fillet adds it). Even-odd containment
// answers that directly.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { polylines } from './stroke-bbox.mjs';
import { sharpen2 } from './sharpen2.mjs';

const ROOT = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r,-0) ? '0' : String(r); };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const mul=(a,k)=>[a[0]*k,a[1]*k], len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1], cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const par=(a,b)=>{const la=len(a),lb=len(b);return la>1e-6&&lb>1e-6&&Math.abs(cross(a,b)/(la*lb))<5e-2;};
function isect(p,u,q,v){const d=cross(u,v);if(Math.abs(d)<1e-9)return null;
  return add(p, mul(u, ((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/d));}

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

/** Even-odd: is p inside the region this path fills? */
function insideFill(d, p) {
  let crossings = 0;
  for (const { pts } of polylines(d, 32)) {
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i+1];
      if ((a[1] > p[1]) !== (b[1] > p[1])) {
        const t = (p[1] - a[1]) / (b[1] - a[1]);
        if (a[0] + t * (b[0] - a[0]) > p[0]) crossings++;
      }
    }
  }
  return crossings % 2 === 1;
}

function filletAt(V, A, B, r) {
  const u = unit(sub(A,V)), w = unit(sub(B,V));
  const alpha = Math.acos(Math.max(-1, Math.min(1, dot(u,w))));
  if (alpha < 1e-3 || Math.PI - alpha < 1e-3) return null;
  const t = Math.min(r/Math.tan(alpha/2), len(sub(A,V))*0.95, len(sub(B,V))*0.95);
  const rr = t*Math.tan(alpha/2), k = (4/3)*Math.tan((Math.PI-alpha)/4)*rr;
  const T1 = add(V, mul(u,t)), T2 = add(V, mul(w,t));
  return { T1, T2, C1: sub(T1, mul(u,k)), C2: sub(T2, mul(w,k)) };
}

/** Clamp a filled outline: outer corners to 1, inner corners to 0. */
export function sharpenFill(d) {
  const runs = segsOf(d);
  if (!runs) return null;
  let outer = 0, inner = 0;
  for (const { segs, closed } of runs) {
    const N = segs.length;
    for (let i = 0; i < N; i++) {
      const cur = segs[i];
      if (cur.t !== 'c' || cur.drop || cur.done) continue;
      const prev = segs[(i-1+N)%N], next = segs[(i+1)%N];
      if ((!closed && (i === 0 || i === N-1)) || !prev || !next || prev.t !== 'l' || next.t !== 'l') continue;
      const u = sub(cur.p1, cur.p0), v = sub(cur.p3, cur.p2);
      if (!par(u, sub(prev.p1, prev.p0)) || !par(v, sub(next.p1, next.p0))) continue;
      const V = isect(cur.p0, u, cur.p3, mul(v, -1));
      if (!V) continue;
      const a = sub(prev.p0, V), b = sub(next.p1, V);
      const alpha = Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
      const orig = len(sub(cur.p0, V)) * Math.tan(alpha/2);
      // nudge just past the vertex along the bisector to classify without
      // landing exactly on the boundary
      const bis = unit(add(unit(a), unit(b)));
      const probe = add(V, mul(bis, 0.05));
      const isInner = insideFill(d, probe);
      const target = isInner ? 0 : 1;
      if (orig <= target + 1e-6) continue;
      if (target === 0) { prev.p1 = V; next.p0 = V; cur.drop = true; }
      else {
        const f = filletAt(V, prev.p0, next.p1, target);
        if (!f) continue;
        prev.p1 = f.T1; next.p0 = f.T2;
        segs[i] = { t:'c', p0:f.T1, p1:f.C1, p2:f.C2, p3:f.T2, done:true };
      }
      isInner ? inner++ : outer++;
    }
  }
  let out = '';
  for (const { segs, closed } of runs) {
    const live = segs.filter(s => !s.drop);
    if (!live.length) continue;
    let at = live[0].p0;
    const L = (p) => { const s = (Math.hypot(p[0]-at[0], p[1]-at[1]) < 1e-3) ? '' : `L${n(p[0])} ${n(p[1])}`; at = p; return s; };
    let d2 = `M${n(at[0])} ${n(at[1])}`;
    for (const s of live) {
      if (s.t === 'l') d2 += L(s.p1);
      else { d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`; at = s.p3; }
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return { d: out, outer, inner };
}

if (process.argv[1].endsWith('sharpen-fill.mjs')) {
  let stats = {};
  for (const style of ['fill', 'duotone']) {
    mkdirSync(`${style}-mid`, { recursive: true });
    let outer = 0, inner = 0, strokes = 0, grew = [];
    for (const f of readdirSync(`${ROOT}/${style}`).filter(x => x.endsWith('.svg'))) {
      const src = readFileSync(`${ROOT}/${style}/${f}`, 'utf8');
      const out = src.replace(/<path[^>]*>/g, (tag) => {
        const m = tag.match(/ d="([^"]+)"/);
        if (!m) return tag;
        // Three constructions live in these files, and they take different
        // rules. An OUTLINE (fill + stroke="none") is the drawing already
        // offset, so its corners are 1 outside and 0 inside. A path that is
        // filled AND stroked is still a centreline, so it follows the stroke
        // rule. Anything else is a plain stroke.
        const outline = / stroke="none"/.test(tag) && / fill="currentColor"/.test(tag);
        const r = outline ? sharpenFill(m[1]) : sharpen2(m[1]);
        if (!r) return tag;
        if (outline) { outer += r.outer; inner += r.inner; } else strokes += r.removed;
        return tag.replace(/ d="[^"]+"/, ` d="${r.d}"`);
      });
      writeFileSync(`${style}-mid/${f}`, out);
      const ds = (s) => [...s.matchAll(/ d="([^"]+)"/g)].map(x => x[1]).join(' ');
      const T = pathBBox(ds(src)), B = pathBBox(ds(out));
      if (T && B) { const e = Math.max(...B.map((v,i)=>Math.abs(v-T[i]))); if (e > 0.01) grew.push([f.replace('.svg',''), +e.toFixed(2)]); }
    }
    grew.sort((a,b)=>b[1]-a[1]);
    stats[style] = { outerCorners: outer, innerCorners: inner, strokeFillets: strokes, boxMoved: grew.length, worst: grew.slice(0,6).map(([a,b])=>`${a} ${b}`).join(', ') };
  }
  console.log(stats);
}
