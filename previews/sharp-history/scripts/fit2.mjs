// Contour-by-contour fit, mitre-aware: a mitre reaches past its vertex, so the
// painted box has to be measured rather than assumed.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { paintedBBox } from './stroke-bbox.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const n=v=>{const r=+v.toFixed(4);return Object.is(r,-0)?'0':String(r);};
const SHARP={join:'miter',cap:'round',limit:4}, ROUND={join:'round',cap:'round'};
function splitSubpaths(d){const parts=[];let cur='';
  for(const {cmd,args} of tokenize(d)){const piece=cmd+args.map(a=>n(a)).join(' ');
    if(cmd.toUpperCase()==='M'&&cur){parts.push(cur);cur='';} cur+=piece;}
  if(cur)parts.push(cur);return parts;}
function xform(d,sx,sy,tx,ty){const X=v=>n(v*sx+tx),Y=v=>n(v*sy+ty);
  let out='',x=0,y=0,mx=0,my=0;
  for(const {cmd,args} of tokenize(d)){const U=cmd.toUpperCase();
    if(U==='M'||U==='L'){x=args[0];y=args[1];if(U==='M'){mx=x;my=y;}out+=`${U}${X(x)} ${Y(y)}`;}
    else if(U==='H'){x=args[0];out+=`H${X(x)}`;}
    else if(U==='V'){y=args[0];out+=`V${Y(y)}`;}
    else if(U==='C'){out+=`C${X(args[0])} ${Y(args[1])} ${X(args[2])} ${Y(args[3])} ${X(args[4])} ${Y(args[5])}`;x=args[4];y=args[5];}
    else if(U==='Z'){out+='Z';x=mx;y=my;}
    else return null;}
  return out;}
const pb=(d,o)=>paintedBBox([{d,filled:false}],o);

let fitted = 0, worstErr = 0, worstName = '';
for (const f of readdirSync('sharp2').filter(x=>x.endsWith('.svg'))) {
  const rSrc = readFileSync(`${K}/${f}`,'utf8'), vSrc = readFileSync(`sharp2/${f}`,'utf8');
  const rP=[...rSrc.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]), vP=[...vSrc.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]);
  const rAttrs=[...rSrc.matchAll(/<path([^>]*)>/g)].map(m=>m[1]);
  if (rP.length !== vP.length) continue;
  let moved = 0;
  const outPaths = vP.map((vd,i)=>{
    const filled = / stroke="none"/.test(rAttrs[i]);
    const rS=splitSubpaths(rP[i]), vS=splitSubpaths(vd);
    if(rS.length!==vS.length) return vd;
    return vS.map((vs,j)=>{
      if (filled) return vs;
      const T=pb(rS[j],ROUND);
      let sx=1, sy=1, tx=0, ty=0, cur=vs;
      for (let k=0;k<25;k++){
        cur = xform(vs,sx,sy,tx,ty);
        const B=pb(cur,SHARP);
        const err=Math.max(...B.map((v,q)=>Math.abs(v-T[q])));
        if (err<0.005) break;
        const tw=T[2]-T[0], th=T[3]-T[1], bw=B[2]-B[0], bh=B[3]-B[1];
        if (bw>1e-6) sx *= tw/bw;
        if (bh>1e-6) sy *= th/bh;
        const b2=pb(xform(vs,sx,sy,0,0),SHARP);
        tx=T[0]-b2[0]; ty=T[1]-b2[1];
      }
      if (Math.abs(sx-1)>0.002 || Math.abs(sy-1)>0.002) moved++;
      return cur;
    }).join('');
  });
  let idx=0;
  const out = vSrc.replace(/ d="([^"]+)"/g, ()=>` d="${outPaths[idx++]}"`);
  writeFileSync(`sharp2/${f}`, out);
  if (moved) fitted++;
  const T=paintedBBox([...rSrc.matchAll(/ d="([^"]+)"/g)].map(m=>({d:m[1],filled:false})),ROUND);
  const B=paintedBBox([...out.matchAll(/ d="([^"]+)"/g)].map(m=>({d:m[1],filled:false})),SHARP);
  const e=Math.max(...B.map((v,q)=>Math.abs(v-T[q])));
  if (e>worstErr){worstErr=e;worstName=f;}
}
console.log({ drawingsFitted: fitted, worstBoxError: +worstErr.toFixed(3), worstName });
