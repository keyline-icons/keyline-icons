// Helpers for the progress-circle drafts (1.2.0): raw/ file I/O, subpath
// handling and a painted-ink sampler the checks share. No coordinates live
// here; build.mjs takes every drawing from shipped raw/ files or solves it.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../paths.mjs';

export const WT = ROOT;
export const RAW = join(WT, 'raw');
export const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
export const CORNERS = ['regular', 'sharp'];
export const fileName = (style, corners, container = 'regular') =>
  `Container=${container}, Style=${style}, Corners=${corners}.svg`;
export const readRaw = (name, style, corners, container = 'regular') =>
  readFileSync(join(RAW, name, fileName(style, corners, container)), 'utf8');

export const tags = (svg) => [...svg.matchAll(/<path[^>]*\/>/g)].map((m) => m[0]);
export const dOf = (t) => t.match(/ d="([^"]+)"/)[1];
export const attr = (t, a) => (t.match(new RegExp(` ${a}="([^"]+)"`)) || [])[1];
export const setD = (t, d) => t.replace(/ d="[^"]+"/, ` d="${d}"`);
export const subs = (d) => d.match(/M[^M]+/g) || [];

// Figma's export spelling: six significant digits, no trailing zeros.
export const fmt = (v) => {
  const r = +(+v).toPrecision(6);
  return Object.is(r, -0) ? '0' : String(r);
};

/** Absolute M/L/H/V/C/Z only (all this family uses); throws on anything else. */
export function parse(d) {
  const t = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  const out = []; let i = 0, c = null, cur = [0, 0], start = [0, 0], s = null;
  const n = () => { const v = +t[i++]; if (!Number.isFinite(v)) throw new Error(`NaN in ${d}`); return v; };
  while (i < t.length) {
    if (/[A-Za-z]/.test(t[i])) { c = t[i++]; if (!/[MLHVCZ]/.test(c)) throw new Error(`command ${c} in ${d}`); }
    if (c === 'M') { cur = [n(), n()]; start = cur; s = { segs: [], closed: false, start: cur }; out.push(s); c = 'L'; }
    else if (c === 'L') { const p = [n(), n()]; s.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (c === 'H') { const p = [n(), cur[1]]; s.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (c === 'V') { const p = [cur[0], n()]; s.segs.push({ k: 'L', a: cur, b: p }); cur = p; }
    else if (c === 'C') { const c1 = [n(), n()], c2 = [n(), n()], p = [n(), n()]; s.segs.push({ k: 'C', a: cur, c1, c2, b: p }); cur = p; }
    else if (c === 'Z') { if (Math.hypot(cur[0] - start[0], cur[1] - start[1]) > 1e-9) s.segs.push({ k: 'L', a: cur, b: start }); s.closed = true; cur = start; }
  }
  return out;
}

const bez = (g, u) => { const v = 1 - u; return [0, 1].map((j) => v * v * v * g.a[j] + 3 * v * v * u * g.c1[j] + 3 * v * u * u * g.c2[j] + u * u * u * g.b[j]); };

/** Centre line of one subpath as points at most `step` apart; vertex flags mark true corners. */
export function sample(sp, step = 0.05) {
  const pts = [sp.segs.length ? sp.segs[0].a : sp.start];
  const corner = [true];
  sp.segs.forEach((g) => {
    const L = g.k === 'L' ? Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1])
      : Math.hypot(g.c1[0] - g.a[0], g.c1[1] - g.a[1]) + Math.hypot(g.c2[0] - g.c1[0], g.c2[1] - g.c1[1]) + Math.hypot(g.b[0] - g.c2[0], g.b[1] - g.c2[1]);
    const k = Math.max(1, Math.ceil(L / step));
    for (let j = 1; j <= k; j++) { const u = j / k; pts.push(g.k === 'L' ? [g.a[0] + (g.b[0] - g.a[0]) * u, g.a[1] + (g.b[1] - g.a[1]) * u] : bez(g, u)); corner.push(j === k); }
  });
  return { pts, corner, closed: sp.closed };
}

/**
 * Boundary points of a stroked subpath's paint (half-width 1): the band's two
 * edges, a disc round every vertex (a round join or cap), and for a butt cap
 * the end face instead of the disc. Every point returned is painted, so a
 * distance measured between two such clouds never reads short.
 */
export function strokeInk(sp, cap) {
  const { pts, corner, closed } = sample(sp);
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    out.push([pts[i][0] - ty, pts[i][1] + tx], [pts[i][0] + ty, pts[i][1] - tx]);
    const end = !closed && (i === 0 || i === n - 1);
    if (corner[i] && !(end && cap === 'butt')) for (let k = 0; k < 96; k++) { const t = (k / 96) * 2 * Math.PI; out.push([pts[i][0] + Math.cos(t), pts[i][1] + Math.sin(t)]); }
    if (end && cap === 'butt') for (let k = -10; k <= 10; k++) out.push([pts[i][0] - ty * k / 10, pts[i][1] + tx * k / 10]);
  }
  return out;
}

/** Boundary points of a filled subpath (the path itself is the ink edge). */
export const fillInk = (sp) => sample(sp).pts;

export function box(points) {
  let b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of points) b = [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)];
  return b;
}

/** Nearest distance between two point clouds, bucketed. */
export function gap(A, B) {
  const G = 0.5, grid = new Map();
  for (const p of B) { const k = `${Math.floor(p[0] / G)},${Math.floor(p[1] / G)}`; (grid.get(k) || grid.set(k, []).get(k)).push(p); }
  let best = Infinity;
  for (const p of A) {
    const gx = Math.floor(p[0] / G), gy = Math.floor(p[1] / G);
    for (let r = 0; r < 60; r++) {
      if (best < (r - 1) * G) break;
      for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const cell = grid.get(`${gx + dx},${gy + dy}`); if (!cell) continue;
        for (const q of cell) best = Math.min(best, Math.hypot(p[0] - q[0], p[1] - q[1]));
      }
    }
  }
  return best;
}

/** Every painted element of a file: one entry per subpath, with its tone. */
export function elements(svg) {
  const out = [];
  for (const t of tags(svg)) {
    const stroked = attr(t, 'stroke') && attr(t, 'stroke') !== 'none';
    const cap = attr(t, 'stroke-linecap') || 'butt';
    const op = +(attr(t, stroked ? 'stroke-opacity' : 'fill-opacity') || 1);
    for (const sp of parse(dOf(t))) out.push({ sp, stroked, cap, op, ink: stroked ? strokeInk(sp, cap) : fillInk(sp) });
  }
  return out;
}
