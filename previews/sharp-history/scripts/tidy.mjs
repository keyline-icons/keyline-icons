// Drop vertices that sit on a straight run between their neighbours. The
// corner recovery leaves the old tangent points behind, which paint the same
// but make the path read like noise.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r,-0) ? '0' : String(r); };
const cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
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
function tidy(d) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '';
  for (const { segs, closed } of runs) {
    const keep = [];
    for (const s of segs) {
      const last = keep[keep.length-1];
      if (s.t === 'l' && last && last.t === 'l') {
        const a = [last.p1[0]-last.p0[0], last.p1[1]-last.p0[1]];
        const b = [s.p1[0]-s.p0[0], s.p1[1]-s.p0[1]];
        const la = Math.hypot(...a), lb = Math.hypot(...b);
        if (la > 1e-9 && lb > 1e-9 && Math.abs(cross(a,b))/(la*lb) < 1e-4 && (a[0]*b[0]+a[1]*b[1]) > 0) {
          last.p1 = s.p1;                    // straight on: merge
          continue;
        }
      }
      if (s.t === 'l' && Math.hypot(s.p1[0]-s.p0[0], s.p1[1]-s.p0[1]) < 1e-6) continue;
      keep.push({ ...s });
    }
    // a closed path usually starts mid-edge, so the join between its last and
    // first segment needs the same treatment or a redundant vertex survives
    // exactly where the drawing began
    if (closed && keep.length > 1) {
      const first = keep[0], last = keep[keep.length-1];
      if (first.t === 'l' && last.t === 'l') {
        const a = [last.p1[0]-last.p0[0], last.p1[1]-last.p0[1]];
        const b = [first.p1[0]-first.p0[0], first.p1[1]-first.p0[1]];
        const la = Math.hypot(...a), lb = Math.hypot(...b);
        if (la > 1e-9 && lb > 1e-9 && Math.abs(cross(a,b))/(la*lb) < 1e-4 && (a[0]*b[0]+a[1]*b[1]) > 0) {
          first.p0 = last.p0;
          keep.pop();
        }
      }
    }
    if (!keep.length) continue;
    let d2 = `M${n(keep[0].p0[0])} ${n(keep[0].p0[1])}`;
    for (const s of keep) {
      d2 += s.t === 'l' ? `L${n(s.p1[0])} ${n(s.p1[1])}`
        : `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return out;
}
for (const f of readdirSync('mid').filter(x => x.endsWith('.svg'))) {
  const src = readFileSync(`mid/${f}`, 'utf8');
  writeFileSync(`mid/${f}`, src.replace(/ d="([^"]+)"/g, (m, d) => { const t = tidy(d); return t === null ? m : ` d="${t}"`; }));
}
console.log('tidied');
