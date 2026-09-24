// The sparkle seat search database-sparkles uses, seat-a's (tools/v8/c2/seat-a.mjs)
// line for line, carried out of the dropped table-2 generator on its own.
import { translateD } from './lib/path.mjs';
import { cut, polyOf, distTo, starPolys } from './lib/cutter.mjs';

// ---------------------------------------------------------------- sparkles
export const RL = 4, RS = 2.5, AIR = 2;
const lenOf = (d) => (d ? polyOf(d, 24).reduce((a, q) => a + q.slice(1).reduce((t, p, i) => t + Math.hypot(p[0] - q[i][0], p[1] - q[i][1]), 0), 0) : 0);
const bboxOf = (d) => { const P = polyOf(d, 24).flat(); const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };
const safeCut = (d, st) => { try { return cut(d, st, { air: AIR, box: 3, keep: 1.5 }).d || ''; } catch { return null; } };
const minDist = (d, s) => { const S = starPolys([s])[0]; return Math.min(...polyOf(d, 48).flat().map((p) => distTo(p, S))); };
export const gapStars = (a, b) => { const A = starPolys([a])[0]; return Math.min(...starPolys([b])[0][0].map((p) => distTo(p, A))); };
const CORNERS = { tr: [1, -1], br: [1, 1], tl: [-1, -1], bl: [-1, 1] };
const mv = (d, [dx, dy]) => (dx || dy ? translateD(d, dx, dy) : d);

/**
 * seat-a (tools/v8/c2/seat-a.mjs, his option A seats of 22 Sep 2026), ported to
 * take the drawing: every corner, whole balanced paddings 1..4 with the lead star
 * touching the box in its corner and the base moved by whole units (at most 3),
 * the second star 2 clear of the lead and off its axes, the sharp drawing split
 * no more than the rounded one. Cost: length cut + 1.5 per unit moved + 0.15 x
 * distance + 3 x (1 - |sin 2a|). `protect` lists stroke subpaths that must come
 * through uncut (here: every rule). The logic is seat-a's line for line.
 */
export function seatA(strokes, sharpStrokes, protect = [], { top = 0, maxShift = 3 } = {}) {
  const subs = strokes.match(/M[^M]+/g);
  const bb = bboxOf(strokes);
  const ink = [bb[0] - 1, bb[1] - 1, bb[2] + 1, bb[3] + 1].map((v) => Math.round(v * 2) / 2);
  const small = subs.filter((sp) => /Z/i.test(sp) && (() => { const b = bboxOf(sp); return Math.max(b[2] - b[0], b[3] - b[1]) <= 8; })());
  const total = lenOf(strokes);
  const breaks = (d) => (d.match(/M/g) || []).length - (d.match(/Z/gi) || []).length;
  const whole = (dx, dy, stars) => protect.every((i) => { const sp = mv(subs[i], [dx, dy]); const k = safeCut(sp, stars); return k !== null && Math.abs(lenOf(k) - lenOf(sp)) < 0.05; });
  const cands = [];
  for (const [sx, sy] of Object.values(CORNERS)) for (let L = 1; L <= 4; L++) for (let T = 1; T <= 4; T++) {
    const dx = sx > 0 ? L - ink[0] : (24 - L) - ink[2];
    const dy = sy > 0 ? T - ink[1] : (24 - T) - ink[3];
    if (dx % 1 || dy % 1 || Math.abs(dx) > maxShift || Math.abs(dy) > maxShift) continue;
    const moved = [ink[0] + dx, ink[1] + dy, ink[2] + dx, ink[3] + dy];
    if (moved[0] < L || moved[1] < T || moved[2] > 24 - L || moved[3] > 24 - T) continue;
    const c = [sx > 0 ? 24 - L - RL : L + RL, sy > 0 ? 24 - T - RL : T + RL];
    const lead = { c, R: RL };
    const S = mv(strokes, [dx, dy]);
    if (small.some((sp) => minDist(mv(sp, [dx, dy]), lead) < AIR + 1)) continue;
    const k = safeCut(S, [lead]); if (k === null) continue;
    if (!whole(dx, dy, [lead])) continue;
    cands.push({ dx, dy, L, T, lead, S, SS: mv(sharpStrokes, [dx, dy]), dmg: total - lenOf(k) + 1.5 * (Math.abs(dx) + Math.abs(dy)) });
  }
  cands.sort((a, b) => a.dmg - b.dmg);
  let best = null;
  const groups = new Map();
  const tryAt = (cd, x, y) => {
    const s = { c: [x, y], R: RS };
    const far = Math.hypot(x - cd.lead.c[0], y - cd.lead.c[1]);
    if (far > RL + RS + 7 || gapStars(cd.lead, s) < AIR) return;
    if (small.some((sp) => minDist(mv(sp, [cd.dx, cd.dy]), s) < AIR + 1)) return;
    const k = safeCut(cd.S, [cd.lead, s]); if (k === null) return;
    if (!whole(cd.dx, cd.dy, [cd.lead, s])) return;
    const ks = safeCut(cd.SS, [cd.lead, s]); if (ks === null) return;
    if (breaks(ks) - breaks(cd.SS) > breaks(k) - breaks(cd.S)) return;
    const off = Math.abs(Math.sin(2 * Math.atan2(y - cd.lead.c[1], x - cd.lead.c[0])));
    const cost = total - lenOf(k) + 1.5 * (Math.abs(cd.dx) + Math.abs(cd.dy)) + 0.15 * far + 3 * (1 - off);
    if (!best || cost < best.cost) best = { cost, cd, s };
    const key = `${cd.lead.c[0] > 12 ? 'r' : 'l'}${cd.lead.c[1] > 12 ? 'b' : 't'}:${Math.sign(Math.round(s.c[0] - cd.lead.c[0]))},${Math.sign(Math.round(s.c[1] - cd.lead.c[1]))}`;
    if (!groups.has(key) || cost < groups.get(key).cost) groups.set(key, { cost, cd, s, key });
  };
  for (const cd of cands.slice(0, top ? 12 : 3)) {
    const box = [cd.L, cd.T, 24 - cd.L, 24 - cd.T];
    for (let x = box[0] + RS; x <= box[2] - RS; x += 1) for (let y = box[1] + RS; y <= box[3] - RS; y += 1) tryAt(cd, x, y);
  }
  if (top) return [...groups.values()].sort((a, b) => a.cost - b.cost).slice(0, top).map(({ cd, s, key, cost }) => ({ key, cost: +cost.toFixed(2), lead: [...cd.lead.c, RL], small: [...s.c, RS], shift: [cd.dx, cd.dy] }));
  if (!best) return null;
  {
    const { cd, s } = best; const box = [cd.L, cd.T, 24 - cd.L, 24 - cd.T];
    for (let x = s.c[0] - 1; x <= s.c[0] + 1; x += (RS % 1 ? 1 : 0.5)) for (let y = s.c[1] - 1; y <= s.c[1] + 1; y += (RS % 1 ? 1 : 0.5))
      if (x >= box[0] + RS && x <= box[2] - RS && y >= box[1] + RS && y <= box[3] - RS) tryAt(cd, x, y);
  }
  const { cd, s } = best;
  return { lead: [...cd.lead.c, RL], small: [...s.c, RS], shift: [cd.dx, cd.dy], cost: +best.cost.toFixed(2), cut: +(total - lenOf(safeCut(cd.S, [cd.lead, s]))).toFixed(2), total: +total.toFixed(2) };
}
