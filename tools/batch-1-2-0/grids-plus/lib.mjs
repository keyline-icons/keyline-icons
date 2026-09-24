// Helpers for the grids-plus generator (1.2.0). Nothing here writes a file.
// Paths are the raw/ dialect: absolute M L H V C Z only, numbers to 4 places.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../paths.mjs';

export const WT = ROOT;
export const STYLES = ['stroke', 'two-tone', 'duotone', 'fill'];
export const CORNERS = ['regular', 'sharp'];
export const fileName = (style, corners) => `Container=regular, Style=${style}, Corners=${corners}.svg`;
export const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';

/** A shipped raw file, read from this checkout's raw/ (never written). */
export const shipped = (name, style, corners) => readFileSync(join(WT, 'raw', name, fileName(style, corners)), 'utf8');
/** Every <path .../> tag of a file, in order. */
export const tags = (svg) => [...svg.matchAll(/<path[^>]*\/>/g)].map((m) => m[0]);
export const dOf = (tag) => tag.match(/ d="([^"]+)"/)[1];

/** Four places, trailing zeros dropped, no negative zero: the raw files' own spelling. */
export function fmt(n) {
  if (!Number.isFinite(n)) throw new Error(`non-finite coordinate ${n}`);
  let s = (Math.round(n * 1e4) / 1e4).toFixed(4).replace(/\.?0+$/, '');
  if (s === '-0') s = '0';
  return s;
}

/** Command records with the source spelling of every number kept. */
export function parse(d) {
  const t = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  const out = [];
  let i = 0, cmd = null;
  const AR = { M: 2, L: 2, H: 1, V: 1, C: 6, Z: 0 };
  while (i < t.length) {
    if (/^[A-Za-z]$/.test(t[i])) {
      cmd = t[i++];
      if (cmd !== cmd.toUpperCase()) throw new Error(`relative command ${cmd} in ${d}`);
      if (cmd === 'Z') { out.push({ cmd, args: [] }); continue; }
    }
    const args = t.slice(i, i + AR[cmd]); i += AR[cmd];
    out.push({ cmd, args });
    if (cmd === 'M') cmd = 'L';
  }
  return out;
}
export const emit = (cmds) => cmds.map(({ cmd, args }) => cmd + args.join(' ')).join('');

/**
 * Translate command by command. A coordinate that does not move is re-emitted
 * exactly as spelled (re-rounding a shipped number is a change to the drawing).
 */
export function translate(d, dx, dy) {
  const mx = (s) => (dx ? fmt(+s + dx) : s), my = (s) => (dy ? fmt(+s + dy) : s);
  return emit(parse(d).map(({ cmd, args }) => {
    if (cmd === 'H') return { cmd, args: [mx(args[0])] };
    if (cmd === 'V') return { cmd, args: [my(args[0])] };
    return { cmd, args: args.map((a, k) => (k % 2 ? my(a) : mx(a))) };
  }));
}

/** Subpaths of a d string, each starting with its M. */
export const subpathsOf = (d) => d.match(/M[^M]+/g) || [];

/** One cubic for a circular arc of radius r about c, from angle a0 to a1 (radians, screen y down). */
export function arcCubic(c, r, a0, a1) {
  const k = (4 / 3) * Math.tan((a1 - a0) / 4) * r;
  const p0 = [c[0] + r * Math.cos(a0), c[1] + r * Math.sin(a0)];
  const p3 = [c[0] + r * Math.cos(a1), c[1] + r * Math.sin(a1)];
  const t0 = [-Math.sin(a0), Math.cos(a0)], t1 = [-Math.sin(a1), Math.cos(a1)];
  const p1 = [p0[0] + k * t0[0], p0[1] + k * t0[1]];
  const p2 = [p3[0] - k * t1[0], p3[1] - k * t1[1]];
  return { p0, p1, p2, p3 };
}

/** Distance from a point to a segment. */
export function pointSeg(p, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const L2 = vx * vx + vy * vy;
  let t = L2 ? ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy);
}

/** Dense polyline samples of a path (for distance checks), per subpath. */
export function sample(d, step = 0.02) {
  const subs = [];
  let cur = null, pos = [0, 0], start = [0, 0];
  const push = (p) => cur.push(p);
  for (const { cmd, args } of parse(d)) {
    const a = args.map(Number);
    if (cmd === 'M') { cur = [[a[0], a[1]]]; subs.push(cur); pos = [a[0], a[1]]; start = pos; continue; }
    let seg;
    if (cmd === 'L') seg = (t) => [pos[0] + (a[0] - pos[0]) * t, pos[1] + (a[1] - pos[1]) * t];
    if (cmd === 'H') seg = (t) => [pos[0] + (a[0] - pos[0]) * t, pos[1]];
    if (cmd === 'V') seg = (t) => [pos[0], pos[1] + (a[0] - pos[1]) * t];
    if (cmd === 'Z') seg = (t) => [pos[0] + (start[0] - pos[0]) * t, pos[1] + (start[1] - pos[1]) * t];
    if (cmd === 'C') {
      const p0 = pos;
      seg = (t) => { const u = 1 - t; return [0, 1].map((j) => u * u * u * p0[j] + 3 * u * u * t * a[j] + 3 * u * t * t * a[2 + j] + t * t * t * a[4 + j]); };
    }
    const end = seg(1);
    const n = Math.max(2, Math.ceil(Math.hypot(end[0] - pos[0], end[1] - pos[1]) / step) * (cmd === 'C' ? 3 : 1));
    for (let i = 1; i <= n; i++) push(seg(i / n));
    pos = end;
  }
  return subs;
}

/** Smallest centre-line distance between two paths (sampled). */
export function centreGap(d1, d2, step = 0.02) {
  const A = sample(d1, step).flat(), B = sample(d2, step);
  let best = Infinity;
  for (const p of A) for (const s of B) for (let i = 1; i < s.length; i++) best = Math.min(best, pointSeg(p, s[i - 1], s[i]));
  return best;
}

export const svg = (...parts) => HEAD + parts.filter(Boolean).join('') + '</svg>\n';
export const strokeTag = (d, { sharp, op = 1 } = {}) =>
  `<path d="${d}" stroke="black"${op < 1 ? ` stroke-opacity="${op}"` : ''} stroke-width="2" stroke-linecap="${sharp ? 'butt' : 'round'}" stroke-linejoin="round"/>\n`;
export const fillTag = (d, { op = 1, evenodd = false } = {}) =>
  `<path d="${d}" fill="black"${op < 1 ? ` fill-opacity="${op}"` : ''}${evenodd ? ' fill-rule="evenodd" clip-rule="evenodd"' : ''}/>\n`;

export function assert(cond, msg) { if (!cond) throw new Error(msg); }
/** Replace exactly one occurrence, or throw. */
export function swapOnce(text, from, to, where) {
  const n = text.split(from).length - 1;
  assert(n === 1, `${where}: expected one "${from}", found ${n}`);
  return text.replace(from, to);
}
