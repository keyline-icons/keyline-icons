// Helpers for the 1.5.0 batch, on top of the 1.4.0 batch's libraries (lines and arcs in
// la.mjs, region booleans in bool.mjs, cubic runs and clipping in lib.mjs).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as L from '../batch-1-4-0/lib.mjs';
import { outlines, minGap, strokedBBox } from '../../pipeline/lib/geom.mjs';

export const REPO = L.REPO;
export const R2 = Math.SQRT2;
export const U4 = 4 * R2;            // the -off far stroke cut, u = x - y (drawing-a-new-icon.md, "The slash is M2 2L22 22")
export const U3 = 3 * R2;            // the far plate notch, tangent to the far stroke's round cap
export const US = 4 * R2 - 2;        // sharp: the far butt end's nearest corner, and the far plate's straight clip
export const SLASH = { regular: 'M2 2L22 22', sharp: 'M1.7071 1.7071L22.2929 22.2929' };
export const u = (p) => p[0] - p[1];
export const f4 = (v) => { const r = Math.round(v * 1e4) / 1e4; return Object.is(r, -0) || r === 0 ? '0' : String(r); };
export const P = (p) => `${f4(p[0])} ${f4(p[1])}`;
export const assert = (ok, msg) => { if (!ok) throw new Error(msg); };

/* ------------------------------------------------------------- raw files */
/** The layers of a shipped variant, as { kind, d }: stroke | muted | solid | plate. */
export function rawLayers(name, style, corners, container = 'regular') {
  const s = readFileSync(join(REPO, 'raw', name, `Container=${container}, Style=${style}, Corners=${corners}.svg`), 'utf8');
  return [...s.matchAll(/<path([^>]*)\/>/g)].map(([, a]) => {
    const at = (k) => a.match(new RegExp(`\\s${k}="([^"]*)"`))?.[1];
    const d = at('d');
    const stroked = at('stroke') && at('stroke') !== 'none';
    const kind = stroked ? (at('stroke-opacity') ? 'muted' : 'stroke') : at('fill-opacity') ? 'plate' : 'solid';
    return { kind, d: absD(d) };
  });
}
/** One layer's d of a shipped variant, by kind (the n-th of that kind). */
export const rawD = (name, style, corners, kind, n = 0) => rawLayers(name, style, corners).filter((l) => l.kind === kind)[n]?.d;

/* ------------------------------------------------------------- path text */
/** Parse absolute M L H V C Z (the commands raw/ uses) into commands with points; H and V become L. */
export function parseD(d) {
  const out = [];
  let cur = [0, 0], start = [0, 0];
  for (const m of d.matchAll(/([MLHVCZ])([^MLHVCZ]*)/g)) {
    const n = m[2].trim() ? m[2].trim().split(/[\s,]+/).map(Number) : [];
    const c = m[1];
    if (c === 'Z') { out.push({ c: 'Z' }); cur = start; continue; }
    if (c === 'H') { for (const x of n) { cur = [x, cur[1]]; out.push({ c: 'L', p: [cur] }); } continue; }
    if (c === 'V') { for (const y of n) { cur = [cur[0], y]; out.push({ c: 'L', p: [cur] }); } continue; }
    const k = c === 'C' ? 6 : 2;
    for (let i = 0; i < n.length; i += k) {
      const pts = [];
      for (let j = 0; j < k; j += 2) pts.push([n[i + j], n[i + j + 1]]);
      const cc = c === 'M' && i > 0 ? 'L' : c;
      out.push({ c: cc, p: pts });
      cur = pts.at(-1);
      if (cc === 'M') start = cur;
    }
  }
  return out;
}
export const emitD = (cmds) => cmds.map((x) => (x.c === 'Z' ? 'Z' : x.c + x.p.map(P).join(' '))).join('');
/** Rewrite with H and V expanded, every number on 4dp. */
export const absD = (d) => emitD(parseD(d));
/** Map every point of a path. A mirror reverses nothing: direction does not change paint. */
export const mapPts = (d, f) => emitD(parseD(d).map((x) => (x.c === 'Z' ? x : { c: x.c, p: x.p.map(f) })));
export const mirrorX = (d) => mapPts(d, ([x, y]) => [24 - x, y]);
export const mirrorY = (d) => mapPts(d, ([x, y]) => [x, 24 - y]);
export const shift = (d, dx, dy) => mapPts(d, ([x, y]) => [x + dx, y + dy]);

/* --------------------------------------------------------------- measure */
/** Painted gap between two stroked drawings, outline to outline less a unit each (marketing2's gapTo). */
export function gapTo(a, b) {
  let best = Infinity;
  for (const p of outlines(a, 64)) for (const q of outlines(b, 64)) best = Math.min(best, minGap(p, q));
  return best - 2;
}
/** Largest scale in [lo, hi] at which drawing(s) clears `body` by `want`, floored to a twentieth (the cloud rule). */
export function fitScale(drawing, body, want = 2, lo = 0.2, hi = 1.5) {
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (gapTo(drawing(mid), body) >= want) lo = mid; else hi = mid;
  }
  return Math.floor(lo * 20 + 1e-9) / 20;
}
export const ink = (d, cap = 'round') => strokedBBox(d, 1, cap);

/* ------------------------------------------------------------- the -off cut */
// A clip along a run where f(seg, t) changes sign, kept where f >= 0, cut at the true
// boundary by bisection. The same walk as lib.mjs's clipRun, with the predicate given the
// segment and its parameter, so a cut can depend on the tangent there (sharp's butt corner).
export function clipRunF(run, f, samples = 400) {
  const pieces = [];
  run.segs.forEach((s, i) => {
    let t = 0, k = f(s, 0) >= 0;
    for (let j = 1; j <= samples; j++) {
      const tj = j / samples, kj = f(s, tj) >= 0;
      if (kj !== k) {
        const tb = L.bisect((x) => ((f(s, x) >= 0) === k ? -1 : 1), (j - 1) / samples, tj, 60);
        if (k) pieces.push([i, t, tb]);
        t = tb; k = kj;
      }
    }
    if (k) pieces.push([i, t, 1]);
  });
  const chains = [];
  for (const pc of pieces) {
    const last = chains.at(-1)?.at(-1);
    if (last && ((last[0] === pc[0] && Math.abs(last[2] - pc[1]) < 1e-9) || (last[0] + 1 === pc[0] && last[2] === 1 && pc[1] === 0))) chains.at(-1).push(pc);
    else chains.push([pc]);
  }
  if (run.closed && chains.length > 1) {
    const fi = chains[0][0], la = chains.at(-1).at(-1);
    if (fi[1] === 0 && fi[0] === 0 && la[0] === run.segs.length - 1 && la[2] === 1) chains[0] = [...chains.pop(), ...chains[0]];
  }
  return chains.map((ch) => ch.map(([i, t0, t1]) => L.segPiece(run.segs[i], t0, t1)));
}
export const segsD = (segs, close = false) => segs.map((s, k) => L.segD(s, k === 0)).join('') + (close ? 'Z' : '');
export function tangent(s, t) {
  const h = 1e-5, a = L.segAt(s, Math.max(0, t - h)), b = L.segAt(s, Math.min(1, t + h));
  const v = [b[0] - a[0], b[1] - a[1]], n = Math.hypot(...v);
  return [v[0] / n, v[1] / n];
}
/** The base outline cut by the slash: { near, far, farEnds } as segment lists, house cut. */
export function offStroke(d, sharp) {
  const [run] = L.parseRuns(d);
  const near = clipRunF(run, (s, t) => -u(L.segAt(s, t)));
  // regular: the far side keeps u >= 4 sqrt 2 (2 units of daylight past the slash's ink);
  // sharp: a butt face stops where its nearer corner reaches 4 sqrt 2 - 2, as monitor-off.
  const farF = sharp
    ? (s, t) => { const p = L.segAt(s, t), tg = tangent(s, t), n = [-tg[1], tg[0]]; return Math.min(u([p[0] + n[0], p[1] + n[1]]), u([p[0] - n[0], p[1] - n[1]])) - US; }
    : (s, t) => u(L.segAt(s, t)) - U4;
  const far = clipRunF(run, farF);
  return { near, far };
}
