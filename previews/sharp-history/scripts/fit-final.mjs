// Contour-by-contour fit, on the clamped drawings.
import { readFileSync, writeFileSync } from 'node:fs';
import { tokenize, pathBBox } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
const K='/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const n=v=>{const r=+v.toFixed(4);return Object.is(r,-0)?'0':String(r);};
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
const names = process.argv.slice(2);
for (const name of names) {
  const rSrc = readFileSync(`${K}/${name}.svg`,'utf8'), vSrc = readFileSync(`sharp-final/${name}.svg`,'utf8');
  const rP=[...rSrc.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]), vP=[...vSrc.matchAll(/ d="([^"]+)"/g)].map(m=>m[1]);
  if (rP.length !== vP.length) { console.log(name, 'skipped'); continue; }
  let moved=0;
  const outPaths = vP.map((vd,i)=>{
    const rS=splitSubpaths(rP[i]), vS=splitSubpaths(vd);
    if(rS.length!==vS.length) return vd;
    return vS.map((vs,j)=>{
      const T=pathBBox(rS[j]), B=pathBBox(vs);
      if(!T||!B) return vs;
      const tw=T[2]-T[0], th=T[3]-T[1], bw=B[2]-B[0], bh=B[3]-B[1];
      const sx = bw>1e-6 ? tw/bw : 1, sy = bh>1e-6 ? th/bh : 1;
      if (Math.abs(sx-1)<0.002 && Math.abs(sy-1)<0.002) return vs;
      moved++;
      const t = xform(vs, sx, sy, 0, 0);
      const b2 = pathBBox(t);
      return xform(vs, sx, sy, T[0]-b2[0], T[1]-b2[1]);
    }).join('');
  });
  let idx=0;
  writeFileSync(`sharp-final/${name}.svg`, vSrc.replace(/ d="([^"]+)"/g, ()=>` d="${outPaths[idx++]}"`));
  console.log(name.padEnd(28), 'contours moved', moved);
}
