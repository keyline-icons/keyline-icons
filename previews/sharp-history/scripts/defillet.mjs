import { readdirSync, readFileSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const ROOT='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const par=(a,b)=>{const la=Math.hypot(...a),lb=Math.hypot(...b);return la>1e-6&&lb>1e-6&&Math.abs((a[0]*b[1]-a[1]*b[0])/(la*lb))<1e-2;};
function segsOf(d){const toks=tokenize(d);let x=0,y=0,sx=0,sy=0;const runs=[];let segs=[];
 const flush=(c)=>{if(segs.length)runs.push({segs,closed:c});segs=[];};
 for(const{cmd,args}of toks){const rel=cmd===cmd.toLowerCase(),U=cmd.toUpperCase();
  const ax=(i)=>rel?x+args[i]:args[i],ay=(i)=>rel?y+args[i]:args[i];
  if(U==='M'){flush(false);x=ax(0);y=ay(1);sx=x;sy=y;}
  else if(U==='L'||U==='H'||U==='V'){const nx=U==='V'?x:U==='H'?(rel?x+args[0]:args[0]):ax(0);const ny=U==='H'?y:U==='V'?(rel?y+args[0]:args[0]):ay(1);segs.push({type:'line',p0:[x,y],p1:[nx,ny]});x=nx;y=ny;}
  else if(U==='C'){const p3=[ax(4),ay(5)];segs.push({type:'cubic',p0:[x,y],p1:[ax(0),ay(1)],p2:[ax(2),ay(3)],p3});x=p3[0];y=p3[1];}
  else if(U==='Z'){if(x!==sx||y!==sy)segs.push({type:'line',p0:[x,y],p1:[sx,sy]});flush(true);x=sx;y=sy;}
  else{flush(false);x=args[args.length-2]??x;y=args[args.length-1]??y;}}
 flush(false);return runs;}
// intersection of line through p0 dir u and line through p3 dir v
function isect(p0,u,p3,v){const den=u[0]*v[1]-u[1]*v[0];if(Math.abs(den)<1e-9)return null;
 const t=((p3[0]-p0[0])*v[1]-(p3[1]-p0[1])*v[0])/den;return [p0[0]+u[0]*t,p0[1]+u[1]*t];}
let grew=0,total=0,worst=[],pushedOut=0;
for(const f of readdirSync(ROOT)){ if(!f.endsWith('.svg'))continue; total++;
 const src=readFileSync(`${ROOT}/${f}`,'utf8');
 let maxPush=0, out=false;
 for(const m of src.matchAll(/ d="([^"]+)"/g)){
  const [bx0,by0,bx1,by1]=pathBBox(m[1]);
  for(const{segs,closed}of segsOf(m[1])){const n=segs.length;
   for(let i=0;i<n;i++){const cur=segs[i];if(cur.type!=='cubic')continue;
    const prev=segs[(i-1+n)%n],next=segs[(i+1)%n];
    if((!closed&&(i===0||i===n-1))||prev.type!=='line'||next.type!=='line')continue;
    const u=[cur.p1[0]-cur.p0[0],cur.p1[1]-cur.p0[1]];
    const v=[cur.p3[0]-cur.p2[0],cur.p3[1]-cur.p2[1]];
    const pu=[prev.p1[0]-prev.p0[0],prev.p1[1]-prev.p0[1]],pv=[next.p1[0]-next.p0[0],next.p1[1]-next.p0[1]];
    if(!par(u,pu)||!par(v,pv))continue;
    const V=isect(cur.p0,u,cur.p3,[-v[0],-v[1]]); if(!V)continue;
    const push=Math.max(bx0-V[0], V[0]-bx1, by0-V[1], V[1]-by1, 0);
    if(push>0.001){maxPush=Math.max(maxPush,push); if(V[0]<1.001||V[0]>22.999||V[1]<1.001||V[1]>22.999) out=true;}
   }}}
 if(maxPush>0.001){grew++;worst.push([f,+maxPush.toFixed(2)]);}
 if(out)pushedOut++;
}
worst.sort((a,b)=>b[1]-a[1]);
console.log({total,filesWhoseBoundsGrow:grew,filesPushedPastCanvasEdge:pushedOut});
console.log('worst 15:',worst.slice(0,15));
