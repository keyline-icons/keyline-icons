// gauge-low, gauge-high: the shipped gauge with its needle moved.
//
// The base (raw/gauge): ring r=10 about (12,12), hub a filled r=2 disc, needle
// 12,12 to 12,7 (painting to radius 6), four r=1 marks on radius 6 at 180, 225,
// 315 and 360 degrees. The needle stands where a fifth mark, 270, would be. So
// five positions always hold four marks and one needle: low points at 225, high
// at 315, the mark it points at goes and the 270 mark (12,6) appears.
//
// Ring, plate, disc and hub are the base's own strings. The needle keeps its
// length (5 from the centre). Its sharp end takes the set's cap cut,
// k = (1 - sin a) / cos a with a the angle off the nearer axis: 1 on an axis
// (the base's 12,6), 0.4142 at 45 degrees (timer's knob, 17.6569,8.3431 to
// 19.2929,6.7071), so the butt corner lands on the round cap's box.

import { L, A, emit, f4, pt } from './geo.mjs';

const C = [12, 12];
const RAD = Math.PI / 180;
const polar = (deg, r) => [C[0] + r * Math.cos(deg * RAD), C[1] + r * Math.sin(deg * RAD)];
export const MARKS = [180, 225, 270, 315, 360];
const NEEDLE = 5;
const capCut = (deg) => {
  const a = Math.abs(((deg % 90) + 90) % 90);
  const off = Math.min(a, 90 - a) * RAD;
  return (1 - Math.sin(off)) / Math.cos(off);
};
export const tip = (deg, corners) => polar(deg, NEEDLE + (corners === 'sharp' ? capCut(deg) : 0));

// A mark: r=1 disc split on its cardinals. Stroke files run it clockwise from
// east, fill files anticlockwise (a knockout), exactly as the base's marks run.
export function dot(p, cw) {
  const [x, y] = p;
  const deg = cw ? [0, 90, 180, 270, 360] : [0, -90, -180, -270, -360];
  return emit([A([x, y], 1, deg[0] * RAD, deg[4] * RAD)]);
}

// Hub and needle as one knockout (the base fill's first hole): the needle's two
// flanks from where they meet the hub circle (sqrt 3 out along the needle), a
// round cap about the tip (regular) or a flat end (sharp), and the hub's arc
// round the back.
export function needleHole(deg, corners) {
  const d = [Math.cos(deg * RAD), Math.sin(deg * RAD)];
  const n = [-d[1], d[0]];
  const s3 = Math.sqrt(3);
  const T = tip(deg, corners);
  const a = [C[0] + s3 * d[0] + n[0], C[1] + s3 * d[1] + n[1]];
  const b = [C[0] + s3 * d[0] - n[0], C[1] + s3 * d[1] - n[1]];
  const Tn = [T[0] + n[0], T[1] + n[1]], Tm = [T[0] - n[0], T[1] - n[1]];
  const pieces = [L(a, Tn)];
  if (corners === 'sharp') pieces.push(L(Tn, Tm));
  else pieces.push(A(T, 1, (deg + 90) * RAD, (deg - 90) * RAD));
  pieces.push(L(Tm, b));
  pieces.push(A(C, 2, (deg - 30) * RAD, (deg - 330) * RAD));
  return emit(pieces);
}

const fname = (style, c) => `Container=regular, Style=${style}, Corners=${c}.svg`;
const needleOf = (c) => (c === 'sharp' ? 'M12 12L12 6' : 'M12 12L12 7');

export function build(deg, base) {
  const out = {};
  const marks = MARKS.filter((m) => m !== deg).map((m) => polar(m, 6));
  for (const c of ['regular', 'sharp']) {
    const needle = `M12 12L${pt(tip(deg, c))}`;
    const hubStroke = 'M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z';
    const marksStroke = marks.map((p) => dot(p, true)).join('');
    const marksFill = marks.map((p) => dot(p, false)).join('');
    for (const style of ['stroke', 'two-tone', 'duotone']) {
      let src = base(fname(style, c));
      const oldNeedle = needleOf(c);
      const n = src.split(oldNeedle + '"').length - 1;
      if (n !== 1) throw new Error(`${style} ${c}: needle ${oldNeedle} found ${n} times`);
      src = src.replace(oldNeedle + '"', needle + '"');
      const hubMarks = src.match(/<path d="(M14 12C[^"]*)" fill="black"\/>/);
      if (!hubMarks || !hubMarks[1].startsWith(hubStroke)) throw new Error(`${style} ${c}: hub layer not found`);
      src = src.replace(hubMarks[1], hubStroke + marksStroke);
      out[fname(style, c)] = src;
    }
    let src = base(fname('fill', c));
    const m = src.match(/ d="(M23 12C[^Z]*Z)(M13 10\.2679[^Z]*Z)([^"]*)"/);
    if (!m) throw new Error(`fill ${c}: layout not recognised`);
    out[fname('fill', c)] = src.replace(m[0], ` d="${m[1]}${needleHole(deg, c)}${marksFill}"`);
  }
  return out;
}

// Painted gaps between the needle and every mark, both corners.
export function gaps(deg) {
  const res = [];
  for (const c of ['regular', 'sharp']) {
    const T = tip(deg, c);
    for (const m of MARKS.filter((x) => x !== deg)) {
      const p = polar(m, 6);
      const dx = T[0] - C[0], dy = T[1] - C[1];
      const u = Math.max(0, Math.min(1, ((p[0] - C[0]) * dx + (p[1] - C[1]) * dy) / (dx * dx + dy * dy)));
      let dist = Math.hypot(p[0] - C[0] - u * dx, p[1] - C[1] - u * dy) - 1 - 1;
      if (c === 'sharp' && u === 1) {                           // past a butt end: nearest point of the face
        const len = Math.hypot(dx, dy), n = [-dy / len, dx / len];
        const w = (p[0] - T[0]) * n[0] + (p[1] - T[1]) * n[1];
        const ww = Math.max(-1, Math.min(1, w));
        dist = Math.hypot(p[0] - T[0] - ww * n[0], p[1] - T[1] - ww * n[1]) - 1;
      }
      res.push({ corners: c, mark: m, at: pt(p), gap: +dist.toFixed(4) });
    }
  }
  return res;
}
export { f4 };
