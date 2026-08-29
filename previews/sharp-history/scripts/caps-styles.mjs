// Square ends for the fill and the duotone.
//
// Two constructions, two jobs, same intent as caps.mjs on the stroke set.
//
// A DUOTONE's glyph is a stroke, so switching its cap is Figma's business, but
// the geometry still has to grow a unit at each free end or it paints short.
// buttCaps already does that.
//
// A FILL's glyph is an outline, and its round cap is baked in: a semicircle of
// radius 1 joining the two sides of the stroke, which is why circle-check kept
// round ends when the stroke beside it had square ones. Find that U-turn — an
// arc between two ANTIPARALLEL lines whose chord is about the stroke width —
// and replace it with a flat end pushed out a unit, which is exactly where the
// semicircle's apex was.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { buttCaps } from './caps.mjs';

const n = (v) => { const r = +v.toFixed(4); return Object.is(r, -0) ? '0' : String(r); };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const mul=(a,k)=>[a[0]*k,a[1]*k], len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a));
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];

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

export function flattenOutlineCaps(d) {
  const runs = segsOf(d);
  if (!runs) return null;
  let caps = 0;
  for (const run of runs) {
    // A closed path can start in the MIDDLE of a cap, splitting its arc across
    // the wrap — battery's bars came out flat at one end and round at the
    // other that way. Rotate to start on a straight run first; on a closed
    // path the start point is arbitrary anyway.
    if (run.closed && run.segs[0].t === 'c') {
      const k = run.segs.findIndex((s) => s.t === 'l');
      if (k > 0) run.segs = run.segs.slice(k).concat(run.segs.slice(0, k));
    }
    const segs = run.segs, N = segs.length;
    if (N < 3) continue;
    for (let i = 0; i < N; i++) {
      if (segs[i].t !== 'c') continue;
      let j = i;                                   // the whole arc, however many cubics
      while (j + 1 < N && segs[j + 1].t === 'c') j++;
      const prev = run.closed ? segs[(i - 1 + N) % N] : segs[i - 1];
      const next = run.closed ? segs[(j + 1) % N] : segs[j + 1];
      i = j;
      if (!prev || !next || prev.t !== 'l' || next.t !== 'l') continue;
      const dP = unit(sub(prev.p1, prev.p0)), dN = unit(sub(next.p1, next.p0));
      if (!isFinite(dP[0]) || !isFinite(dN[0])) continue;
      if (dot(dP, dN) > -0.9) continue;            // a corner, not a U-turn
      const chord = len(sub(next.p0, prev.p1));
      if (chord < 1.5 || chord > 2.5) continue;    // not one stroke wide: a real feature
      prev.p1 = add(prev.p1, dP);                  // the flat end sits where the apex was
      next.p0 = add(next.p0, dP);
      for (let k = j; k >= 0 && segs[k].t === 'c'; k--) segs[k].drop = true;
      caps++;
    }
  }
  let out = '';
  for (const { segs, closed } of runs) {
    const live = segs.filter((s) => !s.drop);
    if (!live.length) continue;
    let at = live[0].p0;
    out += `M${n(at[0])} ${n(at[1])}`;
    for (const s of live) {
      if (Math.hypot(s.p0[0] - at[0], s.p0[1] - at[1]) > 1e-4) { out += `L${n(s.p0[0])} ${n(s.p0[1])}`; at = s.p0; }
      if (s.t === 'l') { if (Math.hypot(s.p1[0]-at[0], s.p1[1]-at[1]) > 1e-4) out += `L${n(s.p1[0])} ${n(s.p1[1])}`; at = s.p1; }
      else { out += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`; at = s.p3; }
    }
    if (closed) out += 'Z';
  }
  return { d: out, caps };
}

if (process.argv[1].endsWith('caps-styles.mjs')) {
  const DIR = process.argv[2];
  let flattened = 0, ext = 0, held = 0;
  for (const f of readdirSync(DIR).filter((x) => x.endsWith('.svg'))) {
    const src = readFileSync(`${DIR}/${f}`, 'utf8');
    const rootStrokes = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
    // outlines first
    const step1 = src.replace(/<path([^>]*)>/g, (tag, attrs) => {
      const stroked = rootStrokes && !/ stroke="none"/.test(tag);
      if (stroked || !/ fill="currentColor"/.test(tag)) return tag;
      const m = attrs.match(/ d="([^"]+)"/);
      if (!m) return tag;
      const r = flattenOutlineCaps(m[1]);
      if (!r || !r.caps) return tag;
      flattened += r.caps;
      return tag.replace(/ d="[^"]+"/, ` d="${r.d}"`);
    });
    // then the stroked layers
    const r2 = buttCaps(step1);
    ext += r2.extended; held += r2.held;
    writeFileSync(`${DIR}/${f}`, r2.src);
  }
  console.log(DIR, { outlineCapsFlattened: flattened, strokeEndsExtended: ext, held });
}
