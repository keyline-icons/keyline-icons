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
const KNOBBED = /^(sliders|toggle)/;
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


/** Even-odd containment against ONE subpath, sampled. */
function runPoly(segs) {
  const pts = [];
  for (const s of segs) {
    if (!pts.length) pts.push(s.p0);
    if (s.t === 'l') pts.push(s.p1);
    else for (let i = 1; i <= 12; i++) {
      const u = i / 12, m = 1 - u;
      pts.push([
        m*m*m*s.p0[0] + 3*m*m*u*s.p1[0] + 3*m*u*u*s.p2[0] + u*u*u*s.p3[0],
        m*m*m*s.p0[1] + 3*m*m*u*s.p1[1] + 3*m*u*u*s.p2[1] + u*u*u*s.p3[1],
      ]);
    }
  }
  return pts;
}
function insidePoly(pts, p) {
  let c = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    if ((a[1] > p[1]) !== (b[1] > p[1])) {
      const t = (p[1] - a[1]) / (b[1] - a[1]);
      if (a[0] + t * (b[0] - a[0]) > p[0]) c++;
    }
  }
  return c % 2 === 1;
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
/** The corner points of a sharpened stroke drawing: places where two line
 *  segments meet and actually turn. These are where the sharp look happens,
 *  and a fill or tint may only sharpen where its stroke sibling did. */
export function cornerVerts(d) {
  const runs = segsOf(d);
  const out = [];
  if (!runs) return out;
  for (const { segs, closed } of runs) {
    const N = segs.length;
    for (let i = 0; i < N; i++) {
      const a = segs[i], b = segs[(i + 1) % N];
      if (!closed && i === N - 1) break;
      if (a.t !== 'l' || b.t !== 'l') continue;
      const u = unit(sub(a.p1, a.p0)), w = unit(sub(b.p1, b.p0));
      if (!isFinite(u[0]) || !isFinite(w[0])) continue;
      if (dot(u, w) < Math.cos(15 * Math.PI / 180)) out.push(a.p1);
    }
  }
  return out;
}

export function sharpenFill(d, mode = 'tint') {
  const runs = segsOf(d);
  if (!runs) return null;
  let outer = 0, inner = 0;
  for (const run of runs) {
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
    const N = segs.length;
    // Test containment against THIS subpath, not the whole filled region. Where
    // the shape is a knockout the ink is on the outside, so "is the vertex in
    // the ink" inverts and every outer corner of the hole came out a spike —
    // circle-check's tick and circle-activity's trace both did.
    const own = runPoly(segs.map((z) => ({ ...z })));
    // A knob or a capsule is MOSTLY arc: sliders' knob tints are rounded
    // rects whose curves dominate the perimeter, and squaring them left grey
    // corners poking past the still-oval stroke. Measure the cubic share of
    // the subpath once; past 55 percent, nothing here is a corner.

    for (let i = 0; i < N; i++) {
      if (segs[i].t !== 'c' || segs[i].drop || segs[i].done) continue;
      // A corner in an OFFSET outline is wider than 90 degrees and gets drawn
      // as two or more cubics, so claiming only a lone cubic left every tint
      // corner rounded while its stroke went sharp — filter's funnel was a
      // rounded grey blob behind a sharp black outline. Take the whole run.
      let j = i;
      while (j + 1 < N && segs[j + 1].t === 'c' && !segs[j + 1].done) j++;
      const first = segs[i], last = segs[j], lo = i, hi = j;
      const prev = segs[(lo - 1 + N) % N], next = segs[(hi + 1) % N];
      i = j;
      // prev === next means the run covers every segment but one, so claiming
      // it would pull both ends of that one line onto the vertex and leave
      // nothing behind. The bells and clocks lost their tint entirely that way.
      if (prev === next || (lo === 0 && hi === N - 1)) continue;
      if ((!closed && (lo === 0 || hi === N-1)) || !prev || !next || prev.t !== 'l' || next.t !== 'l') continue;
      const u = sub(first.p1, first.p0), v = sub(last.p3, last.p2);
      if (!par(u, sub(prev.p1, prev.p0)) || !par(v, sub(next.p1, next.p0))) continue;
      const V = isect(first.p0, u, last.p3, mul(v, -1));
      if (!V) continue;                                  // parallel edges: a cap, not a corner
      // Near-parallel tangents put the vertex somewhere absurd, and a straight
      // run makes the bisector undefined. Both come out as NaN in the path, so
      // refuse anything that is not a finite corner within reach.
      if (!isFinite(V[0]) || !isFinite(V[1]) || len(sub(first.p0, V)) > 12) continue;
      // How far the run TURNS, summed cubic by cubic — not the angle between
      // its end tangents, which cannot tell 90 degrees from 270. A corner turns
      // less than half a revolution; map-pin's head is a 270 degree arc between
      // the two lines of its tail, and collapsing that to a vertex ate the pin.
      let turn = 0;
      for (let k = lo; k <= hi; k++) {
        const t0 = sub(segs[k].p1, segs[k].p0), t1 = sub(segs[k].p3, segs[k].p2);
        if (len(t0) > 1e-9 && len(t1) > 1e-9) turn += Math.acos(Math.max(-1, Math.min(1, dot(unit(t0), unit(t1)))));
      }
      if (turn > 176 * Math.PI / 180) continue;
      const a = sub(prev.p0, V), b = sub(next.p1, V);
      const alpha = Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
      const orig = len(sub(first.p0, V)) * Math.tan(alpha/2);
      // A fillet in an offset outline is small; a dome, a pin head or a petal
      // is not. bell's dome reads as one run turning ~170 degrees, and only
      // its radius (~8) tells it apart from cursor's tip (~1.5, turning 150).
      // ...but radius alone is not the whole test: the file bodies carry
      // radius-5 corners that must sharpen, while bell's dome (radius ~8,
      // turning ~170) must not. A quarter-turn at radius 5 is a corner; a
      // near-half-turn at radius 5 is a shape.
      const quarterish = turn <= 120 * Math.PI / 180;
      if (orig > (quarterish ? 6.5 : 4.6) || len(sub(first.p0, V)) > (quarterish ? 14 : 10)) continue;
      // nudge just past the vertex along the bisector to classify without
      // landing exactly on the boundary
      const bis = unit(add(unit(a), unit(b)));
      if (!isFinite(bis[0]) || !isFinite(bis[1])) continue;
      const probe = add(V, mul(bis, 0.05));
      // Zafar's call, 29 Aug: the sharp FILL is fully sharp — every claimed
      // corner goes to the true vertex, knockouts and modifiers included. Only
      // the duotone TINT keeps 1 outside / 0 inside, because it has to sit
      // flush against a stroke whose round join still paints a radius-1 arc.
      const isInner = mode === 'fill' ? true : insidePoly(own, probe);
      const target = isInner ? 0 : 1;
      if (orig <= target + 1e-6) continue;
      if (target === 0) {
        prev.p1 = V; next.p0 = V;
        for (let k = lo; k <= hi; k++) segs[k].drop = true;
      } else {
        const f = filletAt(V, prev.p0, next.p1, target);
        if (!f) continue;
        if (![...f.T1, ...f.T2, ...f.C1, ...f.C2].every(Number.isFinite)) continue;
        prev.p1 = f.T1; next.p0 = f.T2;
        for (let k = lo + 1; k <= hi; k++) segs[k].drop = true;
        segs[lo] = { t:'c', p0:f.T1, p1:f.C1, p2:f.C2, p3:f.T2, done:true };
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
      d2 += L(s.p0);                                // bridge a bevel gap
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
      // Whether a path is stroked is a property of the FILE as much as the
      // path: half the fill set has no stroke attribute on the <svg> at all,
      // so its paths are outlines despite never saying stroke="none".
      const rootStrokes = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
      // reference corners: this file's own strokes, sharpened, plus the sharp
      // stroke sibling from mid/ when it exists
      const out = src.replace(/<path[^>]*>/g, (tag) => {
        const m = tag.match(/ d="([^"]+)"/);
        if (!m) return tag;
        // Three constructions live in these files, and they take different
        // rules. An OUTLINE (fill + stroke="none") is the drawing already
        // offset, so its corners are 1 outside and 0 inside. A path that is
        // filled AND stroked is still a centreline, so it follows the stroke
        // rule. Anything else is a plain stroke.
        const stroked = rootStrokes && !/ stroke="none"/.test(tag);
        const outline = / fill="currentColor"/.test(tag) && !stroked;
        const tinted = /(fill-)?opacity="0/.test(tag);
        const mode = style === 'fill' || !tinted ? 'fill' : 'tint';
        // The sliders and toggles carry capsule KNOBS: the sharp stroke keeps
        // them oval, so their fills and tints stay oval too — the one family
        // where the outline sharpener must not touch anything.
        if (KNOBBED.test(f) && outline) return tag;
        const r = outline ? sharpenFill(m[1], mode) : sharpen2(m[1]);
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
