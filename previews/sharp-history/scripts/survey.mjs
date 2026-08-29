import { readdirSync, readFileSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';

const ROOT = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons';

function segsOf(d) {
  const toks = tokenize(d);
  let x=0,y=0,sx=0,sy=0; const runs=[]; let segs=[];
  const flush=(closed)=>{ if(segs.length) runs.push({segs,closed}); segs=[]; };
  for (const {cmd,args} of toks) {
    const rel = cmd===cmd.toLowerCase(), U=cmd.toUpperCase();
    const ax=(i)=> rel? x+args[i]: args[i], ay=(i)=> rel? y+args[i]: args[i];
    if (U==='M'){ flush(false); x=ax(0);y=ay(1);sx=x;sy=y; }
    else if (U==='L'||U==='H'||U==='V'){
      const nx = U==='V'? x : U==='H'? (rel?x+args[0]:args[0]) : ax(0);
      const ny = U==='H'? y : U==='V'? (rel?y+args[0]:args[0]) : ay(1);
      segs.push({type:'line',p0:[x,y],p1:[nx,ny]}); x=nx;y=ny;
    } else if (U==='C'){
      const p3=[ax(4),ay(5)];
      segs.push({type:'cubic',p0:[x,y],p1:[ax(0),ay(1)],p2:[ax(2),ay(3)],p3}); x=p3[0];y=p3[1];
    } else if (U==='Z'){ if(x!==sx||y!==sy) segs.push({type:'line',p0:[x,y],p1:[sx,sy]}); flush(true); x=sx;y=sy; }
    else { flush(false); x=args[args.length-2]??x; y=args[args.length-1]??y; }
  }
  flush(false);
  return runs;
}
const par=(a,b)=>{const la=Math.hypot(...a),lb=Math.hypot(...b);return la>1e-6&&lb>1e-6&&Math.abs((a[0]*b[1]-a[1]*b[0])/(la*lb))<1e-2;};

const stats={};
for (const style of ['stroke','duotone','fill']) {
  let files=0, cubics=0, fillet90=0, filletObl=0, other=0, filesWithOther=new Set(), filesWithCubic=new Set();
  for (const f of readdirSync(`${ROOT}/${style}`)) {
    if (!f.endsWith('.svg')) continue; files++;
    const src=readFileSync(`${ROOT}/${style}/${f}`,'utf8');
    for (const m of src.matchAll(/ d="([^"]+)"/g)) {
      for (const {segs,closed} of segsOf(m[1])) {
        const n=segs.length;
        for (let i=0;i<n;i++){
          const cur=segs[i]; if(cur.type!=='cubic') continue;
          cubics++; filesWithCubic.add(f);
          const prev=segs[(i-1+n)%n], next=segs[(i+1)%n];
          const isEdge = !closed && (i===0||i===n-1);
          if (isEdge || prev.type!=='line' || next.type!=='line'){ other++; filesWithOther.add(f); continue; }
          const u=[prev.p1[0]-prev.p0[0],prev.p1[1]-prev.p0[1]];
          const v=[next.p1[0]-next.p0[0],next.p1[1]-next.p0[1]];
          const lu=Math.hypot(...u), lv=Math.hypot(...v);
          const tangent = par([cur.p1[0]-cur.p0[0],cur.p1[1]-cur.p0[1]],u) && par([cur.p3[0]-cur.p2[0],cur.p3[1]-cur.p2[1]],v);
          if(!tangent){ other++; filesWithOther.add(f); continue; }
          const perp = Math.abs((u[0]*v[0]+u[1]*v[1])/(lu*lv))<1e-3;
          if (perp) fillet90++; else filletObl++;
        }
      }
    }
  }
  stats[style]={files,cubics,fillet90,filletObl,other,filesWithOther:filesWithOther.size,filesWithCubic:filesWithCubic.size};
}
console.log(JSON.stringify(stats,null,2));
