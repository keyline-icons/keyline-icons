// Butt caps, and the extension that keeps them honest.
//
// A butt cap paints to the endpoint where a round cap painted a unit past it,
// so switching the cap alone shortens every open stroke — the battery's bars
// would lose a unit at each end. Push each free end out by that unit instead.
//
// FREE is the whole trick: an end that lands on another part of the drawing is
// not free, and extending it punches through. home's door and map's folds were
// broken exactly this way the first time round.
import { tokenize } from 'file:///Users/zafarismatullaev/Documents/GitHub/keyline-icons/pipeline/lib/geom.mjs';
import { polylines } from './stroke-bbox.mjs';
const n = (v) => { const r = +v.toFixed(4); return Object.is(r,-0) ? '0' : String(r); };
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const mul=(a,k)=>[a[0]*k,a[1]*k], len=a=>Math.hypot(a[0],a[1]), unit=a=>mul(a,1/len(a));

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

const distToRun = (p, pts) => {
  let m = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i+1];
    const vx = b[0]-a[0], vy = b[1]-a[1], L2 = vx*vx + vy*vy;
    let t = L2 ? ((p[0]-a[0])*vx + (p[1]-a[1])*vy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    m = Math.min(m, Math.hypot(p[0]-a[0]-vx*t, p[1]-a[1]-vy*t));
  }
  return m;
};

// How far this particular end may go. A round cap paints a disc of radius 1
// about the endpoint; a butt cap paints a 2-wide bar across it. A full unit is
// right for a straight end, but on a CURVE the straight stub leaves the arc the
// drawing was turning along — volume's waves grew 0.83 that way. So on curved
// ends only, take the largest reach whose cap corners still land inside the box
// the rounded drawing painted. Straight ends always take the whole unit, even
// diagonal ones: a square end on a diagonal is wider than a round one by
// construction, and trimming it to fit cost volume-x the symmetry of its X.
function reachFor(end, dir, T, curved) {
  if (!T || !curved) return 1;
  const perp = [-dir[1], dir[0]];
  let r = 1;
  for (const sgn of [1, -1]) {
    for (const ax of [0, 1]) {
      const base = end[ax] + sgn * perp[ax], step = dir[ax];
      if (Math.abs(step) < 1e-9) continue;
      const lo = (T[ax] - base) / step, hi = (T[ax + 2] - base) / step;
      r = Math.min(r, Math.max(lo, hi));
    }
  }
  return Math.max(0, r);
}

export function buttCaps(src, reach = 1, T = null) {
  // every stroked run in the file, for the freeness test
  // Whether a path is stroked is a property of the FILE as much as the path:
  // a fill whose <svg> sets no stroke has outlines, not strokes, however little
  // it says stroke="none".
  const rootStrokes = / stroke="currentColor"/.test(src.slice(0, src.indexOf('>')));
  const isStroked = (tag) => rootStrokes && !/ stroke="none"/.test(tag);
  const strokedPaths = [...src.matchAll(/<path[^>]*>/g)]
    .filter((m) => isStroked(m[0]))
    .map((m) => (m[0].match(/ d="([^"]+)"/) || [])[1])
    .filter(Boolean);
  // keyed by subpath, because an end landing on ANOTHER subpath of the same
  // path is exactly the case that must not be extended: home's door meets the
  // base, and the arrow shaft ends on the arrowhead's own vertex
  const allRuns = [];
  strokedPaths.forEach((d, pi) => polylines(d, 24).forEach((r, ri) => allRuns.push({ id: pi + ':' + ri, pts: r.pts })));
  let extended = 0, held = 0;

  const out = src.replace(/<path([^>]*)>/g, (tag, attrs) => {
    if (!isStroked(tag)) return tag;
    const m = attrs.match(/ d="([^"]+)"/);
    if (!m) return tag;
    const runs = segsOf(m[1]);
    if (!runs) return tag;
    const myIndex = strokedPaths.indexOf(m[1]);
    let ri = -1;
    for (const { segs, closed } of runs) {
      ri++;
      if (closed || !segs.length) continue;
      for (const atFirst of [true, false]) {
        const s = atFirst ? segs[0] : segs[segs.length-1];
        const end = atFirst ? s.p0 : (s.t === 'c' ? s.p3 : s.p1);
        const inner = atFirst ? (s.t === 'c' ? s.p1 : s.p1) : (s.t === 'c' ? s.p2 : s.p0);
        const dir = unit(sub(end, inner));
        if (!isFinite(dir[0])) continue;
        const moved = add(end, mul(dir, Math.min(reach, reachFor(end, dir, T, s.t === 'c'))));
        // is anything else within reach of this end, and is the extension still
        // in it afterwards? A neighbour the stub clears entirely is not in the
        // way — heart-hand's bar ends a unit below the palm's own start, and
        // grows away from it. home's door, which ends ON the base, is.
        let near = Infinity, nearMoved = Infinity;
        const mine = myIndex + ':' + ri;
        for (const run of allRuns) {
          if (run.id === mine) continue;          // its own subpath, not a neighbour
          near = Math.min(near, distToRun(end, run.pts));
          nearMoved = Math.min(nearMoved, distToRun(moved, run.pts));
        }
        if (near < 1.2 && nearMoved < 1.2) {
          // An end that stops short of a neighbour leaves a NOTCH where the
          // round cap used to bulge into it — arrow-down-left's diagonal sat
          // 1.1 off its elbow and the wedge showed. Bury the butt exactly on
          // the neighbour's centreline: its band covers a unit past that, so
          // the joint closes, and nothing ever punches through the far edge.
          // home's door ends ON its base (near 0) and correctly stays put.
          if (near > 0.05) {
            const t = Math.min(reach, near);
            const buried = add(end, mul(dir, t));
            if (atFirst) s.p0 = buried; else { if (s.t === 'c') s.p3 = buried; else s.p1 = buried; }
            extended++;
          } else held++;
          continue;
        }
        if (atFirst) { if (s.t === 'c') s.p0 = moved; else s.p0 = moved; }
        else { if (s.t === 'c') s.p3 = moved; else s.p1 = moved; }
        extended++;
      }
    }
    let d2 = '';
    for (const { segs, closed } of runs) {
      let at = segs[0].p0;
      d2 += `M${n(at[0])} ${n(at[1])}`;
      for (const s of segs) {
        if (s.t === 'l') d2 += `L${n(s.p1[0])} ${n(s.p1[1])}`;
        else d2 += `C${n(s.p1[0])} ${n(s.p1[1])} ${n(s.p2[0])} ${n(s.p2[1])} ${n(s.p3[0])} ${n(s.p3[1])}`;
      }
      if (closed) d2 += 'Z';
    }
    return tag.replace(/ d="[^"]+"/, ` d="${d2}"`);
  }).replace('stroke-linecap="round"', 'stroke-linecap="butt"');
  return { src: out, extended, held };
}

if (process.argv[1].endsWith('caps.mjs')) {
  const { readFileSync, writeFileSync, readdirSync } = await import('node:fs');
  const { paintedBBox, readPaths } = await import('./stroke-bbox.mjs');
  const K = '/Users/zafarismatullaev/Documents/GitHub/keyline-icons/icons/stroke';
  let ext = 0, held = 0;
  for (const f of readdirSync('mid').filter(x => x.endsWith('.svg'))) {
    const T = paintedBBox(readPaths(readFileSync(`${K}/${f}`, 'utf8')), { join: 'round', cap: 'round' });
    const r = buttCaps(readFileSync(`mid/${f}`, 'utf8'), 1, T);
    writeFileSync(`mid/${f}`, r.src);
    ext += r.extended; held += r.held;
  }
  console.log({ endsExtended: ext, endsHeldBecauseSomethingWasThere: held });
}
