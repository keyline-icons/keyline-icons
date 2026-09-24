// The path builder and rounded rectangle the table and panel generators share.
/* ------------------------------------------------------------ path builder */
// Absolute commands only. Regular keeps the set's H/V shorthand on axis legs,
// sharp writes every leg as L, as the shipped grids do.
export class P {
  constructor(sharp, digits = sharp ? 4 : 5) { this.sharp = sharp; this.d = ''; this.cur = null; this.start = null; this.dg = digits; this.hv = !sharp; }
  f(v) { const k = 10 ** this.dg; let s = (Math.round(v * k) / k).toFixed(this.dg).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; }
  M(x, y) { this.d += `M${this.f(x)} ${this.f(y)}`; this.cur = [x, y]; this.start = [x, y]; return this; }
  L(x, y) {
    const [cx, cy] = this.cur;
    if (Math.hypot(x - cx, y - cy) < 1e-9) throw new Error('zero-length line');
    if (this.hv && Math.abs(cy - y) < 1e-9) this.d += `H${this.f(x)}`;
    else if (this.hv && Math.abs(cx - x) < 1e-9) this.d += `V${this.f(y)}`;
    else this.d += `L${this.f(x)} ${this.f(y)}`;
    this.cur = [x, y]; return this;
  }
  C(x1, y1, x2, y2, x, y) { this.d += `C${this.f(x1)} ${this.f(y1)} ${this.f(x2)} ${this.f(y2)} ${this.f(x)} ${this.f(y)}`; this.cur = [x, y]; return this; }
  /** Circular arc about (cx, cy), angles in degrees on screen (0 right, 90 down),
   *  split at every multiple of 90 it spans. The current point must be on it. */
  arc(cx, cy, r, a0, a1) {
    const cuts = [a0];
    const dir = Math.sign(a1 - a0);
    for (let q = Math.ceil(Math.min(a0, a1) / 90) * 90; q <= Math.max(a0, a1); q += 90) if (q !== a0 && q !== a1) cuts.push(q);
    if (dir < 0) cuts.sort((p, q) => q - p); else cuts.sort((p, q) => p - q);
    cuts.push(a1);
    const at = (a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    const [sx, sy] = at(a0);
    if (Math.hypot(sx - this.cur[0], sy - this.cur[1]) > 1e-6) throw new Error(`arc starts off the pen: ${sx},${sy} vs ${this.cur}`);
    for (let i = 0; i + 1 < cuts.length; i++) {
      const t0 = (cuts[i] * Math.PI) / 180, t1 = (cuts[i + 1] * Math.PI) / 180;
      const k = (4 / 3) * Math.tan((t1 - t0) / 4) * r;
      const p0 = at(cuts[i]), p3 = at(cuts[i + 1]);
      const d0 = [-Math.sin(t0), Math.cos(t0)], d1 = [-Math.sin(t1), Math.cos(t1)];
      this.C(p0[0] + k * d0[0], p0[1] + k * d0[1], p3[0] - k * d1[0], p3[1] - k * d1[1], p3[0], p3[1]);
    }
    return this;
  }
  Z() { this.d += 'Z'; this.cur = this.start; return this; }
}

/** A rounded rectangle, clockwise from its top edge, the shipped spelling. */
export function rrect(p, x0, y0, x1, y1, r) {
  if (r === 0) { p.M(x0, y0).L(x1, y0).L(x1, y1).L(x0, y1).L(x0, y0).Z(); return p; }
  p.M(x0 + r, y0).L(x1 - r, y0).arc(x1 - r, y0 + r, r, -90, 0).L(x1, y1 - r).arc(x1 - r, y1 - r, r, 0, 90)
    .L(x0 + r, y1).arc(x0 + r, y1 - r, r, 90, 180).L(x0, y0 + r).arc(x0 + r, y0 + r, r, 180, 270).Z();
  return p;
}
