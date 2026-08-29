// What radius does each corner actually have in the rounded drawing?
import { readFileSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], len=a=>Math.hypot(a[0],a[1]);
const par=(a,b)=>{const la=len(a),lb=len(b);return la>1e-6&&lb>1e-6&&Math.abs((a[0]*b[1]-a[1]*b[0])/(la*lb))<1e-2;};
function segsOf(d){const runs=[];let segs=[],x=0,y=0,sx=0,sy=0;
 const flush=c=>{if(segs.length)runs.push({segs,closed:c});segs=[];};
 for(const {cmd,args} of tokenize(d)){const rel=cmd===cmd.toLowerCase(),U=cmd.toUpperCase();
  const ax=i=>rel?x+args[i]:args[i], ay=i=>rel?y+args[i]:args[i];
  if(U==='M'){flush(false);x=ax(0);y=ay(1);sx=x;sy=y;}
  else if(U==='L'||U==='H'||U==='V'){const nx=U==='V'?x:U==='H'?(rel?x+args[0]:args[0]):ax(0);
    const ny=U==='H'?y:U==='V'?(rel?y+args[0]:args[0]):ay(1);
    segs.push({t:'l',p0:[x,y],p1:[nx,ny]});x=nx;y=ny;}
  else if(U==='C'){const p3=[ax(4),ay(5)];segs.push({t:'c',p0:[x,y],p1:[ax(0),ay(1)],p2:[ax(2),ay(3)],p3});x=p3[0];y=p3[1];}
  else if(U==='Z'){if(x!==sx||y!==sy)segs.push({t:'l',p0:[x,y],p1:[sx,sy]});flush(true);x=sx;y=sy;}}
 flush(false);return runs;}
function isect(p,u,q,v){const den=u[0]*v[1]-u[1]*v[0];if(Math.abs(den)<1e-9)return null;
  const t=((q[0]-p[0])*v[1]-(q[1]-p[1])*v[0])/den;return [p[0]+u[0]*t,p[1]+u[1]*t];}
for (const name of process.argv.slice(2)) {
  const out = [];
  for (const m of readFileSync(`${K}/${name}.svg`,'utf8').matchAll(/ d="([^"]+)"/g)) {
    for (const {segs,closed} of segsOf(m[1])) {
      const n=segs.length;
      for (let i=0;i<n;i++){
        const cur=segs[i]; if(cur.t!=='c') continue;
        const prev=segs[(i-1+n)%n], next=segs[(i+1)%n];
        if((!closed&&(i===0||i===n-1))||prev.t!=='l'||next.t!=='l') continue;
        const u=sub(cur.p1,cur.p0), v=sub(cur.p3,cur.p2);
        if(!par(u,sub(prev.p1,prev.p0))||!par(v,sub(next.p1,next.p0))) continue;
        const V=isect(cur.p0,u,cur.p3,[-v[0],-v[1]]); if(!V) continue;
        const t=len(sub(cur.p0,V));
        const a=[ (prev.p0[0]-V[0]),(prev.p0[1]-V[1]) ], b=[ (next.p1[0]-V[0]),(next.p1[1]-V[1]) ];
        const alpha=Math.acos(Math.max(-1,Math.min(1,(a[0]*b[0]+a[1]*b[1])/(len(a)*len(b)))));
        out.push(+(t*Math.tan(alpha/2)).toFixed(2));
      }
    }
  }
  console.log(name.padEnd(22), 'corner radii:', out.sort((a,b)=>a-b).join(', ') || 'none detected');
}
