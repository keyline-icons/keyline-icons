// Progress-circle drafts for 1.2.0: circle-progress-pause, circle-progress-stop,
// loader-circle. All 8 variants each, raw/ format, into ./raw. Nothing is
// typed in: every path is read from a shipped raw/ file or solved below.
//
//   node build.mjs
//
// THE CONTAINED GLYPH. circle-progress-play, -check and -x carry the glyph of
// their base's Container=circle variant verbatim, in both corners: the ring's
// well is the circle container's well (ring r=10 about 12,12), so the glyph
// sized for circle-play is the one that goes in. Checked below rather than
// assumed. Per style they follow two constructions:
//   closed glyph (play): stroke = outline; two-tone = the circle fill's
//     knockout as a 0.4 plate under the outline; duotone and fill = that
//     knockout solid black. Dashes 0.4 in two-tone and duotone.
//   open glyph (check, x): the outline in every style; dashes 0.4 in two-tone
//     and duotone; fill copies the stroke.
// stop is a closed glyph (a rounded square, fillable), so it is built as play;
// pause is two open bars (nothing enclosed), so it is built as x. Both are
// swapped into the sibling's own files, so ring, dashes, layer order and
// attribute spelling stay byte for byte the shipped family's.
//
// LOADER-CIRCLE. The house ring (r=10 about 12,12, ink 1..23) opened by one
// quadrant. The only arcs whose ink reaches all four sides with both ends on
// an extreme are the ones ending on two cardinals 270 degrees apart, so the
// arc runs 3 o'clock clockwise to 12 o'clock and the gap is the top-right
// quadrant (the spinner's usual opening). The arc is the shipped `circle`
// cut on those cardinals, its quarters verbatim, per corner. Sharp: the arc
// is a shape, not a fillet, so only the caps change, butt with the axis stub
// of 1 along each end's tangent (sharp-cap-cut's k on an axis), the form
// circle-progress-three-quarter ships (`M13 22L12 22` ... `22 12L22 13`).
// Every style is the stroke file, byte for byte (his call, round 2). The arc
// is one element, and SKILL.md lets only a single-element glyph copy the
// stroke into two-tone and duotone; circle-dashed and x ship that way and
// carry lint's DUOTONE warning for it. Fill follows styles.md's "open glyph,
// no container: stroke only": an open arc encloses nothing, so the parity
// fallback copies the stroke (bar-chart's case); a black disc would be
// circle's fill. The first round put the whole ring under the arc as a 0.4
// track. That read as circle-progress-three-quarter at 16px, and in sharp
// the stubs' outer corners stood 0.046 off the track (tjunction-sweep, T at
// 22,11 and 13,2): with no track under them the ends are free, which is what
// the stubs are for. Rejected: the track, and the gap quadrant alone in grey.
import { outDir } from '../paths.mjs';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STYLES, CORNERS, fileName, readRaw, tags, dOf, setD, subs, fmt, parse, sample } from './lib.mjs';

const OUT = join(outDir(), 'raw');
const C = [12, 12];

// A subpath belongs to the glyph when all of it lies well inside the ring's
// well (inner ink radius 9); ring arcs, dashes and container discs sit at 10 or 11.
const farthest = (sp) => Math.max(...sample(parse(sp)[0], 0.1).pts.map(([x, y]) => Math.hypot(x - C[0], y - C[1])));
const isGlyph = (sp) => farthest(sp) < 8;
const glyphOf = (d) => subs(d).filter(isGlyph).join('');

/** The contained glyph of `name`'s Container=circle variant, by role. */
function circleGlyph(name, corners) {
  return {
    outline: glyphOf(dOf(tags(readRaw(name, 'stroke', corners, 'circle')).find((t) => glyphOf(dOf(t))))),
    solid: glyphOf(dOf(tags(readRaw(name, 'fill', corners, 'circle')).find((t) => glyphOf(dOf(t))))),
  };
}

/**
 * Rewrite a sibling's file with another glyph: in each <path>, the glyph's
 * subpaths (contiguous) are replaced where they stand, everything else kept
 * verbatim. `swap(glyphString)` names the replacement or throws.
 */
function swapGlyph(svg, swap) {
  let n = 0;
  const out = svg.replace(/<path[^>]*\/>/g, (t) => {
    const parts = subs(dOf(t));
    const idx = parts.map((sp, i) => (isGlyph(sp) ? i : -1)).filter((i) => i >= 0);
    if (!idx.length) return t;
    if (idx.at(-1) - idx[0] !== idx.length - 1) throw new Error('glyph subpaths not contiguous');
    n++;
    const g = idx.map((i) => parts[i]).join('');
    const d = [...parts.slice(0, idx[0]), swap(g), ...parts.slice(idx.at(-1) + 1)].join('');
    return setD(t, d);
  });
  if (!n) throw new Error('no glyph found');
  return out;
}

// ---- the rule, read off the shipped family before anything is built -------
for (const c of CORNERS) {
  const play = circleGlyph('play', c);
  for (const s of STYLES) {
    for (const g of tags(readRaw('circle-progress-play', s, c)).map((t) => glyphOf(dOf(t))).filter(Boolean))
      if (g !== play.outline && g !== play.solid) throw new Error(`circle-progress-play ${s} ${c}: glyph is not circle-play's`);
    for (const sib of ['x', 'check']) {
      const own = circleGlyph(sib, c).outline;
      for (const g of tags(readRaw(`circle-progress-${sib}`, s, c)).map((t) => glyphOf(dOf(t))).filter(Boolean))
        if (g !== own) throw new Error(`circle-progress-${sib} ${s} ${c}: glyph is not circle-${sib}'s outline`);
    }
  }
}

const files = {}; // name -> { fileName: svg }
const put = (name, style, corners, svg) => ((files[name] ||= {})[fileName(style, corners)] = svg);

// ---- circle-progress-stop: circle-progress-play with circle-stop's glyph ----
for (const c of CORNERS) {
  const play = circleGlyph('play', c), stop = circleGlyph('stop', c);
  for (const s of STYLES)
    put('circle-progress-stop', s, c, swapGlyph(readRaw('circle-progress-play', s, c), (g) => {
      if (g === play.outline) return stop.outline;
      if (g === play.solid) return stop.solid;
      throw new Error('unknown play glyph');
    }));
}

// ---- circle-progress-pause: circle-progress-x with circle-pause's glyph -----
for (const c of CORNERS) {
  const x = circleGlyph('x', c), pause = circleGlyph('pause', c);
  for (const s of STYLES)
    put('circle-progress-pause', s, c, swapGlyph(readRaw('circle-progress-x', s, c), (g) => {
      if (g === x.outline) return pause.outline;
      throw new Error('unknown x glyph');
    }));
}

// ---- loader-circle: the shipped circle, cut ----------------------------------
// raw/circle is the house ring, one cubic per quarter from 12 o'clock
// clockwise. The arc is its last three quarters (3 o'clock round to 12),
// verbatim, per corner.
const K = (4 / 3) * Math.tan(Math.PI / 8), R = 10;
const pt = (p) => `${fmt(p[0])} ${fmt(p[1])}`;
function ring(corners) {
  const d = dOf(tags(readRaw("circle", "stroke", corners))[0]);
  const qs = d.match(/C[^CZ]+/g);
  const sp = parse(d)[0];
  if (!sp.closed || qs.length !== 4 || sp.segs.length !== 4) throw new Error("circle is not four quarters");
  // each quarter ends on a cardinal of r=10 and carries the house handle
  const card = [[22, 12], [12, 22], [2, 12], [12, 2]];
  sp.segs.forEach((g, i) => {
    if (Math.hypot(g.b[0] - card[i][0], g.b[1] - card[i][1]) > 1e-9) throw new Error("quarter " + i + " off its cardinal");
    for (const [h, e] of [[g.c1, g.a], [g.c2, g.b]]) if (Math.abs(Math.hypot(h[0] - e[0], h[1] - e[1]) - K * R) > 2e-3) throw new Error("handle off the house control");
  });
  return { d, qs, segs: sp.segs };
}
const HEAD = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n';
const stroke = (d, sharp) =>
  `<path d="${d}" stroke="black" stroke-width="2" stroke-linecap="${sharp ? "butt" : "round"}" stroke-linejoin="round"/>\n`;
for (const c of CORNERS) {
  const sharp = c === "sharp";
  const { qs, segs } = ring(c);
  const [first, , last] = [segs[1], segs[2], segs[3]];
  let arc = `M${pt(first.a)}${qs[1]}${qs[2]}${qs[3]}`;
  if (sharp) {
    // a free end takes the stub along its own tangent (read off the handle):
    // k = (1 - sin t) / cos t with t off the nearer axis, 1 on an axis (sharp-cap-cut)
    const stub = (e, h) => {
      const u = [e[0] - h[0], e[1] - h[1]], l = Math.hypot(u[0], u[1]);
      const t = Math.min(Math.abs(Math.atan2(u[1], u[0])) % (Math.PI / 2), Math.PI / 2 - (Math.abs(Math.atan2(u[1], u[0])) % (Math.PI / 2)));
      const k = (1 - Math.sin(t)) / Math.cos(t);
      return [e[0] + (u[0] / l) * k, e[1] + (u[1] / l) * k];
    };
    arc = `M${pt(stub(first.a, first.c1))}L${pt(first.a)}${qs[1]}${qs[2]}${qs[3]}L${pt(stub(last.b, last.c2))}`;
  }
  // one element: every style is the stroke file (see the header)
  const plain = HEAD + stroke(arc, sharp) + "</svg>\n";
  for (const s of STYLES) put("loader-circle", s, c, plain);
  // the stubs are free ends: each butt face lies across the arc's own tangent
  // at 1 past the cardinal, inside the rounded box 1..23 (checked by check.mjs)
  if (sharp && !/^M22 11L22 12C.*L13 2$/.test(arc)) throw new Error("loader-circle sharp stubs are not the axis unit: " + arc);
}

// ---- assertions before writing ---------------------------------------------
for (const [name, fs] of Object.entries(files)) {
  if (Object.keys(fs).length !== 8) throw new Error(`${name}: ${Object.keys(fs).length} files`);
  for (const [f, svg] of Object.entries(fs)) {
    for (const t of tags(svg)) {
      const d = dOf(t);
      if (/NaN|Infinity/.test(d)) throw new Error(`${name} ${f}: non-finite`);
      for (const sp of parse(d)) for (const g of sp.segs) {
        if (Math.hypot(g.b[0] - g.a[0], g.b[1] - g.a[1]) < 1e-3) throw new Error(`${name} ${f}: zero-length piece`);
        if (g.k === 'C' && (Math.hypot(g.c1[0] - g.a[0], g.c1[1] - g.a[1]) < 1e-3 || Math.hypot(g.c2[0] - g.b[0], g.c2[1] - g.b[1]) < 1e-3))
          throw new Error(`${name} ${f}: control point on its endpoint`);
      }
    }
  }
}

for (const [name, fs] of Object.entries(files)) {
  mkdirSync(join(OUT, name), { recursive: true });
  for (const [f, svg] of Object.entries(fs)) writeFileSync(join(OUT, name, f), svg);
}
console.log(Object.entries(files).map(([n, fs]) => `${n}: ${Object.keys(fs).length} files`).join('\n'));
