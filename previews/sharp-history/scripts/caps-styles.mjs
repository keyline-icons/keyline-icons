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
const dirOf=(a,b)=>{const v=sub(b,a),L=len(v);return L>1e-6?mul(v,1/L):null;};
const startTan=(s)=>s.t==='l'?dirOf(s.p0,s.p1):(dirOf(s.p0,s.p1)||dirOf(s.p0,s.p2)||dirOf(s.p0,s.p3));
const endTan=(s)=>s.t==='l'?dirOf(s.p0,s.p1):(dirOf(s.p2,s.p3)||dirOf(s.p1,s.p3)||dirOf(s.p0,s.p3));

// Circles stay circles: a dot's every 2-cubic window IS a chord-2 semicircle
// with antiparallel neighbour tangents, so an all-cubic closed ring whose
// junctions sit equidistant from their own centroid is never a cap.
function isRound(run) {
  if (!run.closed || run.segs.some((s) => s.t !== 'c')) return false;
  const pts = run.segs.map((s) => s.p0);
  const c = mul(pts.reduce((a, p) => add(a, p), [0, 0]), 1 / pts.length);
  const d = pts.map((p) => len(sub(p, c)));
  return Math.max(...d) / Math.min(...d) < 1.35;
}

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
  // Pass 2: a cap whose NEIGHBOURS are curves — the question glyph's stem and
  // hook end between the ?'s own body curves, where pass 1's "arc between two
  // lines" never fires. Same U-turn, read off end tangents instead: a 2-cubic
  // window whose chord is one stroke wide, whose apex stands a unit off the
  // chord, tangent-continuous into antiparallel neighbours.
  for (const run of runs) {
    const segs = run.segs.filter((s) => !s.drop), N = segs.length;
    if (N < 4 || isRound(run)) continue;
    const lim = run.closed ? N : N - 2;
    for (let i = 0; i < lim; i++) {
      const a = segs[i], b = segs[(i + 1) % N];
      if (a.t !== 'c' || b.t !== 'c' || a.drop || b.drop) continue;
      if (!run.closed && (i < 1 || i + 2 >= N)) continue;
      const prev = segs[(i - 1 + N) % N], next = segs[(i + 2) % N];
      if (prev === b || next === a || prev === next || prev.drop || next.drop) continue;
      if (prev.t !== 'c' && next.t !== 'c') continue;   // line-line caps are pass 1's
      const tP = endTan(prev), tN = startTan(next);
      if (!tP || !tN || dot(tP, tN) > -0.9) continue;   // neighbours antiparallel
      const wS = startTan(a), wE = endTan(b);
      if (!wS || !wE || dot(tP, wS) < 0.9 || dot(wE, tN) < 0.9) continue; // continuous
      const A = a.p0, B = b.p3, chord = len(sub(B, A));
      if (chord < 1.5 || chord > 2.5) continue;         // not one stroke wide
      const apex = sub(b.p0, mul(add(A, B), 0.5)), h = len(apex);
      if (h < 0.7 || h > 1.3) continue;                 // a semicircle, not a sweep
      if (dot(apex, tP) / h < 0.8) continue;            // bulging out along the stroke
      if (prev.t === 'l') prev.p1 = add(prev.p1, tP); else prev.p3 = add(prev.p3, tP);
      next.p0 = add(next.p0, tP);                       // butt cap: both sides grow the unit
      a.drop = b.drop = true;
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

// The captions fill's c terminals are AUTHORED (the rounded fill's c is a
// letterform, not an offset, so rebuild-offsets' gate rightly refuses it) and
// their round caps sit between neighbour tangents at dot -0.80 — under the
// antiparallel threshold, which cannot be loosened without eating the -off
// clips. Name list beats shape heuristic: the four terminal runs are replaced
// with the butt-cap quads derived from the sharp stroke's own ends,
// E=(10.7999,13.3999) t=(0.8,-0.6) and its three mirrors.
export const NAMED_CAPS = {
  'captions.svg': [
    ['C10.8518 14.6112 11 14.3148 11 14C11 13.7836 10.9298 13.5731 10.8 13.4C10.6112 13.1482 10.3148 13 10 13', 'L11.4 14.2L10.2 12.6L10 13'],
    ['C10.3148 11 10.6112 10.8518 10.8 10.6C10.9298 10.4269 11 10.2164 11 10C11 9.6852 10.8518 9.3888 10.6 9.2', 'L10.2 11.4L11.4 9.8L10.6 9.2'],
    ['C18.8518 14.6112 19 14.3148 19 14C19 13.7836 18.9298 13.5731 18.8 13.4C18.6111 13.1482 18.3148 13 18 13', 'L19.4 14.2L18.2 12.6L18 13'],
    ['C18.3148 11 18.6111 10.8518 18.8 10.6C18.9298 10.4269 19 10.2164 19 10C19 9.6852 18.8518 9.3888 18.6 9.2', 'L18.2 11.4L19.4 9.8L18.6 9.2'],
  ],
};

export function applyNamedCaps(f, src) {
  let out = src, applied = 0;
  for (const [from, to] of NAMED_CAPS[f] || []) {
    if (!out.includes(from)) { console.log(`NAMED_CAPS MISS ${f}: ${from.slice(0, 40)}…`); continue; }
    out = out.replace(from, to); applied++;
  }
  return { src: out, applied };
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
    const r3 = applyNamedCaps(f, r2.src);
    flattened += r3.applied;
    writeFileSync(`${DIR}/${f}`, r3.src);
  }
  console.log(DIR, { outlineCapsFlattened: flattened, strokeEndsExtended: ext, held });
}
