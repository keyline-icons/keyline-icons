// hourglass-start, -half, -end: the shipped hourglass with its sand.
//
// The base is not redrawn. Its stroke, plate and fill contour are read from its
// own raw files and kept verbatim; only the sand is added. The construction is
// the liquid level the set already ships in flask-conical, flask-round and
// test-tube (a level line wall to wall in stroke; the whole plate grey under the
// stroke in two-tone; the contents black from the line's top ink down to the
// OUTER contour in duotone; the fill solid with only the empty part knocked out,
// down to the line's top ink). Stroke carries no solid (styles.md, "Stroke
// carries only dots"): the sand is the region the level line closes against the
// glass, so every line ends ON the wall's centre line.
//
// The base, measured off its raw (centre lines): walls x = 6 and 18, bars y = 2
// and 22, shoulder vertices (6,7) and (18,7) filleted r = 2, bulbs meeting at a
// true vertex at (12,12). Plate = the centre line offset 1 out, fill knockout =
// offset 1 in. Everything below derives from those numbers.

import { L, A, band, emit, xAt, mirrorY, reverse, clip, start, end, pt } from './geo.mjs';

const R61 = Math.sqrt(61);
const V = [6, 7], W = [12, 12];
const nIn = [5 / R61, -6 / R61];            // unit normal of the upper-left diagonal, into the bulb
const nOut = [-nIn[0], -nIn[1]];
const TH = Math.atan2(nOut[1], nOut[0]);   // 129.81 degrees: the fillet's end on the diagonal
const t = (2 * (R61 - 5)) / 6;              // fillet r=2 tangent length at the shoulder (0.9367)
const F = [8, 7 - t];                       // fillet centre, tangent to x=6 at y=6.0633
const add = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
// point on the diagonal line offset by `off` toward the interior, at a given x or y
const diagAtX = (off, x) => [x, 7 + (5 * (x - 6) - off * R61) / 6];
const diagAtY = (off, y) => [6 + (6 * (y - 7) + off * R61) / 5, y];

// Left-side profiles of the UPPER bulb, top to bottom.
const upper = {
  regular: {
    centre: [L([6, 2], [6, F[1]]), A(F, 2, Math.PI, TH), L(add(F, nOut, 2), W)],
    inner: [L([7, 3], [7, F[1]]), A(F, 1, Math.PI, TH), L(add(F, nOut, 1), diagAtX(1, 12))],
    outer: [L([5, 3], [5, F[1]]), A(F, 3, Math.PI, TH), L(add(F, nOut, 3), diagAtY(-1, 12))],
  },
  sharp: {
    centre: [L([6, 2], V), L(V, W)],
    inner: [L([7, 3], diagAtX(1, 7)), L(diagAtX(1, 7), diagAtX(1, 12))],
    outer: [L([5, 3], [5, 7]), A(V, 1, Math.PI, TH), L(add(V, nOut, 1), diagAtY(-1, 12))],
  },
};
const flip = (profile) => profile.slice().reverse().map((s) => reverse(mirrorY(s)));
const lower = {
  regular: {
    centre: flip(upper.regular.centre),
    inner: flip(upper.regular.inner),
    // the plate runs on round the bottom bar: its left end is a stadium cap
    outer: [...flip(upper.regular.outer), L([5, 21], [4, 21]), A([4, 22], 1, 1.5 * Math.PI, 0.5 * Math.PI)],
  },
  sharp: {
    centre: flip(upper.sharp.centre),
    inner: flip(upper.sharp.inner),
    outer: [...flip(upper.sharp.outer), L([5, 21], [3, 21]), L([3, 21], [3, 23])],
  },
};

// Straight runs of each centre line, for the rule that a level line ends on a
// wall's straight run (styles.md: detail caps sit on the straight run).
export const RUNS = {
  upperVertical: [2, F[1]],
  upperDiagonal: [add(F, nOut, 2)[1], 12],
  lowerDiagonal: [12, 24 - add(F, nOut, 2)[1]],
  lowerVertical: [24 - F[1], 22],
};

export function parts(cfg, corners) {
  const U = upper[corners], D = lower[corners];
  const line = (profile, y) => {
    const xl = xAt(profile, y);
    return `M${pt([xl, y])}L${pt([24 - xl, y])}`;
  };
  const lines = (cfg.up ? line(U.centre, cfg.up) : '') + (cfg.low ? line(D.centre, cfg.low) : '');
  // fill: air knocked out, wound against the plate
  const airUp = emit(band(U.inner, 3, cfg.up ? cfg.up - 1 : 12, { cw: false }));
  const airLow = emit(band(D.inner, 12, cfg.low ? cfg.low - 1 : 21, { cw: false }));
  // duotone: sand black from the line's top ink to the outer contour
  const sand = (cfg.up ? emit(band(U.outer, cfg.up - 1, 12)) : '') + (cfg.low ? emit(band(D.outer, cfg.low - 1, 23)) : '');
  return { lines, airUp, airLow, sand, U, D };
}

const FILES = ['stroke', 'two-tone', 'duotone', 'fill'];
const fname = (style, c) => `Container=regular, Style=${style}, Corners=${c}.svg`;

// Swap one d="..." for another; the base's attribute order and spelling stay.
function swapD(src, oldD, newD) {
  const n = src.split(`d="${oldD}"`).length - 1;
  if (n !== 1) throw new Error(`expected one path with d="${oldD.slice(0, 30)}..." found ${n}`);
  return src.replace(`d="${oldD}"`, `d="${newD}"`);
}
const pathsOf = (src) => [...src.matchAll(/<path\s[^>]*?\sd="([^"]*)"|<path d="([^"]*)"/g)].map((m) => m[1] ?? m[2]);

export function build(cfg, base) {
  const out = {};
  for (const c of ['regular', 'sharp']) {
    const p = parts(cfg, c);
    const b = Object.fromEntries(FILES.map((s) => [s, base(fname(s, c))]));

    // stroke and two-tone: the base's own stroke path, level lines appended
    const strokeD = pathsOf(b.stroke)[0];
    out[fname('stroke', c)] = swapD(b.stroke, strokeD, strokeD + p.lines);
    const ttPaths = pathsOf(b['two-tone']);
    if (ttPaths[1] !== strokeD) throw new Error('two-tone stroke layer differs from the stroke variant');
    out[fname('two-tone', c)] = swapD(b['two-tone'], ttPaths[1], ttPaths[1] + p.lines);

    // duotone: plate, then the sand, then the bars, as flask-conical stacks them
    const [plateD, barsD] = pathsOf(b.duotone);
    const barsTag = b.duotone.match(/<path d="[^"]*" stroke=[^>]*\/>\n/)[0];
    if (!barsTag.includes(barsD)) throw new Error('bars layer not found');
    out[fname('duotone', c)] = b.duotone.replace(barsTag, `<path d="${p.sand}" fill="black"/>\n${barsTag}`);

    // fill: the base's outer contour verbatim, the empty glass knocked out
    const fillD = pathsOf(b.fill)[0];
    const outerD = fillD.slice(0, fillD.indexOf('Z') + 1);
    if (outerD !== plateD) throw new Error('fill contour and duotone plate disagree');
    out[fname('fill', c)] = b.fill.replace(`<path d="${fillD}" fill="black"/>`,
      `<path fill-rule="evenodd" clip-rule="evenodd" d="${outerD}${p.airUp}${p.airLow}" fill="black"/>`);
    if (out[fname('fill', c)] === b.fill) throw new Error('fill not rewritten');
  }
  return out;
}

// For the self-test: the base's own upper-bulb knockout, regenerated.
export const baseKnockout = (c) => emit(band(upper[c].inner, 3, 12, { cw: false }));
export { upper, lower, clip, start, end };
