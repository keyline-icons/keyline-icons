// Sharp, properly this time.
//
// The bug behind nearly every complaint: stroke-linejoin="round". A vertex that
// is sharp in the geometry still PAINTS as a 1-unit round corner, so reducing
// drawn fillets alone can never sharpen a drawing whose corners were left to the
// join — the check's vertex, the activity zigzag, the bell's bottom corners.
//
// So: take every drawn fillet out to its true vertex, and switch the join to
// mitre so a sharp vertex paints sharp. Round cap kept, since an end is not a
// corner. Sizes are held afterwards by the contour fit.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { paintedBBox, readPaths, polylines } from './stroke-bbox.mjs';
const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r,-0) ? '0' : String(r); };
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


/** Radius and turn direction of a cubic treated as a circular arc. */
function arcOf(c) {
  const mid = cubicAt(c.p0, c.p1, c.p2, c.p3, 0.5);
  const fit = circleThrough(c.p0, mid, c.p3);
  if (!fit) return null;
  const sign = Math.sign(cross(sub(c.p1, c.p0), sub(c.p3, c.p2))) || 1;
  return { R: fit.R, sign };
}
/**
 * Two cubics that curve the same way at the same radius are two halves of one
 * bend, not a corner and the thing it dies into. paperclip's clip is a 180
 * degree bend written as two 90 degree cubics, and without this it reads as a
 * corner twice over.
 */
function sameArc(a, b) {
  const x = arcOf(a), y = arcOf(b);
  if (!x || !y) return false;
  return x.sign === y.sign && Math.abs(x.R - y.R) / Math.max(x.R, y.R) < 0.35;
}

export function sharpen2(d) {
  const runs = segsOf(d);
  if (!runs) return null;
  let out = '', removed = 0, kept = 0;
  for (const run of runs) {
    // Some drawings repeat their opening corner at the end of the path, which
    // leaves that corner with a curve on both sides and nothing able to claim
    // it. filter does this. Drop the retrace; the subpath still closes.
    if (run.closed && run.segs.length > 2) {
      const a = run.segs[0];
      const same = (z) => z && a.t === z.t
        && Math.hypot(a.p0[0]-z.p0[0], a.p0[1]-z.p0[1]) < 1e-6
        && Math.hypot((a.p3||a.p1)[0]-(z.p3||z.p1)[0], (a.p3||a.p1)[1]-(z.p3||z.p1)[1]) < 1e-6;
      const n2 = run.segs.length;
      // the retrace can be last, or last but one when Z synthesised a closing
      // line after it
      if (same(run.segs[n2-1])) run.segs = run.segs.slice(0, -1);
      else if (same(run.segs[n2-2]) && run.segs[n2-1].t === 'l') run.segs = run.segs.slice(0, -2);
    }
    // A closed subpath can also START in the middle of a fillet, which splits
    // that corner across the wrap: the vertex lands in the path but the stale
    // start point stays behind it and Z draws a line back to it, so the edge
    // kinks. Rotate to begin on a straight segment. 393 subpaths in the stroke
    // set start on a curve, 769 in the fill, 726 in the duotone.
    if (run.closed && run.segs[0].t === 'c') {
      const k = run.segs.findIndex((s) => s.t === 'l');
      if (k > 0) run.segs = run.segs.slice(k).concat(run.segs.slice(0, k));
    }
  }
  for (const { segs, closed } of runs) {
    const parts = segs.map(s => ({ ...s }));
    const N = parts.length;
    for (let i = 0; i < N; i++) {
      const cur = parts[i];
      if (cur.t !== 'c' || cur.drop) continue;
      const prev = parts[(i-1+N)%N], next = parts[(i+1)%N];
      if ((!closed && (i === 0 || i === N-1)) || !prev || !next || prev.t !== 'l' || next.t !== 'l') continue;
      const u = sub(cur.p1, cur.p0), v = sub(cur.p3, cur.p2);
      // tangent to at least one neighbour is enough. trophy's foot has a
      // shoulder tangent to the top edge that meets the bottom edge at an
      // angle, and demanding both sides left it round.
      const tanIn = par(u, sub(prev.p1, prev.p0)), tanOut = par(v, sub(next.p1, next.p0));
      if (!tanIn && !tanOut) { kept++; continue; }
      const turn = Math.acos(Math.max(-1, Math.min(1, dot(unit(u), unit(v))))) * 180 / Math.PI;
      // tangent on BOTH sides is proof enough that this is a fillet, however
      // hard it turns — volume's cone apex turns 142 degrees. The tighter cap
      // is only for the one-sided case, where an arc could be a feature.
      if (turn > (tanIn && tanOut ? 175 : 135)) { kept++; continue; }
      const V = isect(cur.p0, u, cur.p3, mul(v, -1));
      if (!V) { kept++; continue; }
      if (len(sub(V, cur.p0)) > 6 || len(sub(V, cur.p3)) > 6) { kept++; continue; }
      // replace the ARC with its corner and leave the neighbours alone, so a
      // one-sided fillet does not swallow the edge beyond it
      parts[i] = { t: 'corner', p0: cur.p0, V, p3: cur.p3 };
      removed++;
    }
    // a fillet between a LINE and a CURVE: the bell's bottom corners, the map
    // pins, the shields. The curve cannot be extended, but its end tangent can:
    // where that tangent meets the line is the corner the fillet was cut from,
    // and a straight run from there to the curve's start is tangent-continuous.
    for (let i = 0; i < N; i++) {
      const cur = parts[i];
      if (cur.t !== 'c' || cur.drop) continue;
      const prev = parts[(i-1+N)%N], next = parts[(i+1)%N];
      if ((!closed && (i === 0 || i === N-1)) || !prev || !next) continue;
      const lineSide = prev.t === 'l' && next.t === 'c' ? 'prev' : (next.t === 'l' && prev.t === 'c' ? 'next' : null);
      if (!lineSide) continue;
      const line = lineSide === 'prev' ? prev : next;
      const curve = lineSide === 'prev' ? next : prev;
      const lineDir = lineSide === 'prev' ? sub(line.p1, line.p0) : sub(line.p0, line.p1);
      const myLineTan = lineSide === 'prev' ? sub(cur.p1, cur.p0) : sub(cur.p3, cur.p2);
      if (!par(myLineTan, lineDir)) continue;
      // the fillet must be short, or it is a feature rather than a corner
      if (len(sub(cur.p3, cur.p0)) > 6) continue;
      // and the thing it dies into must be a real curve, not the other half of
      // a round cap: a cap's sibling arc is as short as the cap itself, and
      // eating it turns a knockout's rounded end into a notch
      if (len(sub(curve.p3, curve.p0)) < 2.5) continue;
      if (sameArc(cur, curve)) continue;
      const curveEnd = lineSide === 'prev' ? curve.p0 : curve.p3;
      const curveTan = lineSide === 'prev' ? sub(curve.p0, curve.p1) : sub(curve.p3, curve.p2);
      const turn = Math.acos(Math.max(-1, Math.min(1, dot(unit(myLineTan), unit(mul(curveTan, -1))))));
      if (turn * 180 / Math.PI < 20) continue;                 // a smooth transition, not a corner
      const V = isect(lineSide === 'prev' ? line.p0 : line.p1, unit(lineDir), curveEnd, unit(curveTan));
      if (!V) continue;
      if (len(sub(V, curveEnd)) > 6 || len(sub(V, cur.p0)) > 6) continue;
      if (lineSide === 'prev') { prev.p1 = V; parts[i] = { t: 'l', p0: V, p1: curveEnd }; }
      else { next.p0 = V; parts[i] = { t: 'l', p0: curveEnd, p1: V }; }
      removed++;
    }

    // A dash that IS a corner: an open subpath made only of arc, with no
    // straight anywhere to hang off. The two end tangents still meet at the
    // corner it was cut from, so the dash becomes an L like every other corner
    // in the drawing — otherwise one dash stays round while its neighbours go
    // sharp, which is how the dashed panels looked wrong.
    if (!closed && parts.every(s => s.t === 'c') && parts.length <= 2) {
      const first = parts[0], last = parts[parts.length - 1];
      const inTan = sub(first.p1, first.p0), outTan = sub(last.p3, last.p2);
      const turn = Math.acos(Math.max(-1, Math.min(1, dot(unit(inTan), unit(outTan)))));
      const deg = turn * 180 / Math.PI;
      // and it must be corner-SIZED. volume's sound waves are an open arc too,
      // with the same turn; the difference is the radius they are drawn at.
      const mid2 = cubicAt(first.p0, first.p1, first.p2, first.p3, 0.5);
      const fitc = circleThrough(first.p0, mid2, last.p3);
      const cornerSized = fitc && fitc.R <= 4 && len(sub(last.p3, first.p0)) <= 6;
      // a corner dash is a QUARTER turn. bell-x's clapper is a 120 degree arc
      // at the same radius, and it is a curve, not a corner
      if (deg > 80 && deg < 100 && cornerSized) {
        const V = isect(first.p0, unit(inTan), last.p3, unit(mul(outTan, -1)));
        if (V && len(sub(V, first.p0)) < 8 && len(sub(V, last.p3)) < 8) {
          const start = first.p0, end = last.p3;
          parts.length = 0;
          parts.push({ t: 'l', p0: start, p1: V }, { t: 'l', p0: V, p1: end });
          removed++;
        }
      }
    }

    // a corner arc at a free end: recover the vertex, keep the endpoint
    if (!closed) {
      for (const atFirst of [true, false]) {
        const list = parts.filter(s => !s.drop);
        const i = atFirst ? 0 : list.length - 1;
        const cur = list[i], nb = atFirst ? list[1] : list[list.length-2];
        if (!cur || cur.t !== 'c' || !nb || nb.t !== 'l') continue;
        const joint = atFirst ? cur.p3 : cur.p0, free = atFirst ? cur.p0 : cur.p3;
        const along = atFirst ? sub(nb.p1, nb.p0) : sub(nb.p0, nb.p1);
        const jointTan = atFirst ? sub(cur.p3, cur.p2) : sub(cur.p1, cur.p0);
        if (!par(jointTan, along)) continue;
        const mid = cubicAt(cur.p0, cur.p1, cur.p2, cur.p3, 0.5);
        const fit = circleThrough(cur.p0, mid, cur.p3);
        if (!fit || fit.R > 8 || fit.R < 0.2) continue;
        const { C, R } = fit;
        const turned = Math.acos(Math.max(-1, Math.min(1, dot(unit(sub(joint,C)), unit(sub(free,C))))));
        const sign = Math.sign(cross(sub(joint,C), sub(free,C))) || 1;
        const a1 = Math.atan2(joint[1]-C[1], joint[0]-C[0]) + sign * Math.max(turned, Math.PI/2);
        const tp = [C[0] + R*Math.cos(a1), C[1] + R*Math.sin(a1)];
        const outDir = unit([-sign*Math.sin(a1), sign*Math.cos(a1)]);
        const V = isect(joint, unit(along), tp, outDir);
        if (!V) continue;
        const endOut = add(V, mul(outDir, Math.max(dot(sub(free,V), outDir), 0)));
        cur.drop = true; removed++;
        if (atFirst) { nb.p0 = V; parts.unshift({ t: 'l', p0: endOut, p1: V }); }
        else { nb.p1 = V; parts.push({ t: 'l', p0: V, p1: endOut }); }
      }
    }
    const live = parts.filter(s => !s.drop);
    if (!live.length) continue;
    let at = live[0].p0;
    const L = (p) => { const s = (Math.hypot(p[0]-at[0], p[1]-at[1]) < 1e-3) ? '' : `L${n(p[0])} ${n(p[1])}`; at = p; return s; };
    let d2 = `M${n(at[0])} ${n(at[1])}`;
    for (const s of live) {
      if (s.t === 'l') d2 += L(s.p1);
      else if (s.t === 'corner') { d2 += L(s.V) + L(s.p3); }
      else { d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`; at = s.p3; }
    }
    out += closed ? d2 + 'Z' : d2;
  }
  return { d: out, removed, kept };
}

if (process.argv[1].endsWith('sharpen2.mjs')) {
  mkdirSync('sharp2', { recursive: true });
  const SHARP = { join: 'miter', cap: 'round', limit: 4 };
  const ROUND = { join: 'round', cap: 'round' };
  let removed = 0, over = [], worstMitre = [];
  for (const f of readdirSync(K).filter(x => x.endsWith('.svg'))) {
    const src = readFileSync(`${K}/${f}`, 'utf8');
    let r = 0;
    let out = src.replace(/ d="([^"]+)"/g, (m, d) => { const s = sharpen2(d); if (!s) return m; r += s.removed; return ` d="${s.d}"`; });
    out = out.replace('stroke-linejoin="round"', 'stroke-linejoin="miter"');
    writeFileSync(`sharp2/${f}`, out);
    removed += r;
    const T = paintedBBox(readPaths(src), ROUND), B = paintedBBox(readPaths(out), SHARP);
    const o = Math.max(T[0]-B[0], B[2]-T[2], T[1]-B[1], B[3]-T[3], 0);
    if (o > 0.01) over.push([f.replace('.svg',''), +o.toFixed(2)]);
    // worst mitre, to see what would bevel at the default limit
    let w = 0;
    for (const p of readPaths(out)) { if (p.filled) continue;
      for (const { pts, closed } of polylines(p.d, 8)) {
        const P = pts.filter((q,i)=>i===0||Math.hypot(q[0]-pts[i-1][0],q[1]-pts[i-1][1])>1e-9);
        const m2 = P.length;
        for (let i=0;i<(closed?m2:m2-2);i++){
          const a=P[i],b=P[(i+1)%m2],c=P[(i+2)%m2];
          const u=[b[0]-a[0],b[1]-a[1]], v=[c[0]-b[0],c[1]-b[1]];
          const lu=Math.hypot(...u), lv=Math.hypot(...v);
          if(lu<1e-9||lv<1e-9) continue;
          const turn=Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(lu*lv))));
          w=Math.max(w, 1/Math.sin((Math.PI-turn)/2));
        }}}
    if (w > 4) worstMitre.push([f.replace('.svg',''), +w.toFixed(1)]);
  }
  over.sort((a,b)=>b[1]-a[1]);
  worstMitre.sort((a,b)=>b[1]-a[1]);
  console.log({ filletsRemoved: removed, drawingsOverTheBox: over.length, drawingsThatWouldBevel: worstMitre.length });
  console.log('worst over:', over.slice(0,10).map(([a,b])=>`${a} ${b}`).join(', '));
  console.log('worst mitres:', worstMitre.slice(0,10).map(([a,b])=>`${a} ${b}`).join(', '));
}
