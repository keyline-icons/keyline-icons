/**
 * Emit the v0.5.0 drawings into raw/ (or --out=<dir>/raw).
 *   node tools/v5/build.mjs [name ...] [--out=DIR]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as I from './icons.mjs';
import * as PEN from './pen.mjs';
import { writeSet } from './raw.mjs';
import { offsetContour, contourPath, verify, mirrorSegs, clipContour, clipByDistance } from './offset.mjs';
import { circlePath, Path, onArc, n } from './geom.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const S = (d) => ({ kind: 'stroke', d });
const F = (d) => ({ kind: 'solid', d });
const P = (d) => ({ kind: 'plate', d });

/** The shipped bubble's plate, so the family cannot drift. */
const bubblePlate = (corners) => {
  const src = readFileSync(`${ROOT}/raw/message-plus/Container=regular, Style=duotone, Corners=${corners}.svg`, 'utf8');
  return /<path d="([^"]*)" fill="black" fill-opacity="0.4"/.exec(src)[1];
};

/** A plate for a closed contour, offset one unit and checked. */
function plate(path) {
  const off = offsetContour(path.segs, 1);
  verify(path.segs, off, 1);
  return contourPath(off);
}

/**
 * A straight rule's knockout: the stroke's own outline, a stadium, wound
 * AGAINST the body.
 *
 * Two things have to be right and neither shows in the linter. Each cap arc
 * takes an explicit sweep, because left to the short way round it turns inward
 * and the stadium becomes a bow tie. And the whole run goes counter-clockwise
 * while the bubble runs clockwise: under the non-zero winding these files use,
 * a hole wound the same way as its body simply paints, and the fill comes out
 * as a plain solid. `message-plus` shows the same handedness on its own sign.
 */
const rule = (x0, x1, y, sharp) =>
  sharp
    ? `M${n(x1)} ${n(y - 1)}L${n(x0)} ${n(y - 1)}L${n(x0)} ${n(y + 1)}L${n(x1)} ${n(y + 1)}Z`
    : new Path().M([x1, y - 1]).L([x0, y - 1]).A([x0, y], 270, 90, -1).L([x1, y + 1]).A([x1, y], 90, 270, -1).Z().toString();

const DISC = circlePath([12, 12], 4.5);
const PLATE_DISC = circlePath([12, 12], 5.5);

/**
 * A quote set: the marks, their plate, and the fill that plate makes solid.
 * Nothing is knocked out — a quote mark is its own silhouette.
 */
function quoteSet({ close = false, ...rest } = {}) {
  const out = {};
  for (const sharp of [false, true]) {
    const key = sharp ? 'sharp' : 'regular';
    const marks = I.quoteContours({ ...rest, sharp });
    // The closing pair is the opening one turned through 180 degrees, plate and
    // all — one drawing, not two.
    const d = I.applyTurn(marks.map((m) => m.toString()).join(''), close);
    const pl = I.applyTurn(marks.map(plate).join(''), close);
    out[`stroke.${key}`] = [S(d)];
    out[`duotone.${key}`] = [P(pl), S(d)];
    out[`fill.${key}`] = [F(pl)];
  }
  return out;
}

const SETS = {
  phone: () => {
    // Mirrored, so the base and `phone-off` are one drawing: the handset the
    // slash can cross is the handset the set draws.
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const segs = mirrorSegs(I.phonePath({ sharp }).segs);
      const off = offsetContour(segs, 1);
      verify(segs, off, 1);
      const d = contourPath(segs), pl = contourPath(off);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(pl), S(d)];
      out[`fill.${key}`] = [F(pl)];
    }
    return out;
  },

  'phone-off': () => {
    // The slash's own line, and the two cuts every shipped `-off` uses: the
    // lower-left piece buried on the centre line, the upper-right one standing
    // 4.00 off it rounded — a 2-unit painted gap — and its plate a unit nearer,
    // where the round cap's ink ends. Sharp, the butt cap paints to its own
    // endpoint, so stroke and plate are cut together at 3.00 and sit flush.
    const P0 = [0, 0], NRM = [1 / Math.SQRT2, -1 / Math.SQRT2];
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const base = mirrorSegs(I.phonePath({ sharp }).segs);
      const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
      const near = clipContour(base, P0, NRM, 0, -1)[0];
      const far = clipContour(base, P0, NRM, sharp ? 3 : 4, 1)[0];
      const pl = offsetContour(base, 1);
      verify(base, pl, 1);
      const plate = contourPath(clipContour(pl, P0, NRM, 0, -1)[0]) + contourPath(clipContour(pl, P0, NRM, 3, 1)[0]);
      const nearD = contourPath(near, false);
      const d = contourPath(far, false) + nearD + slash;
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(plate), S(nearD + slash)];
      out[`fill.${key}`] = [F(plate), S(slash)];
    }
    return out;
  },

  // `comma` draws the closing mark, tail hanging, because that is the shape a
  // comma is. The opening pair is that turned through 180 degrees, so it is
  // `quote` that carries the turn and `quote-end` that is drawn.
  quote: () => quoteSet({ close: true }),
  'quote-end': () => quoteSet({}),
  'quote-single': () => quoteSet({ single: true, close: true }),
  'quote-single-end': () => quoteSet({ single: true }),

  // Zafar's two corner brackets, moved out on to the box. His drawing sat on
  // 3..21, two units short of the ink every other drawing reaches; pushed the
  // unit out per corner it lands exactly on the brackets `fullscreen` and
  // `fullscreen-exit` already use, which is the answer the set had already
  // agreed to. So that is what they are named: these two are those, without
  // the diagonal tick. `maximize-2` was taken by the four-arrow drawing and
  // this pair is not that. Stroke only, like every other bracket here.
  'fullscreen-2': () => ({
    'stroke.regular': [S('M14 3H20.5C20.77614 3 21 3.22386 21 3.5V10M10 21H3.5C3.22386 21 3 20.77614 3 20.5V14')],
    'stroke.sharp': [S('M13 3L21 3L21 11M11 21L3 21L3 13')],
  }),

  'fullscreen-exit-2': () => ({
    'stroke.regular': [S('M21 10H14.5C14.22386 10 14 9.77614 14 9.5V3M3 14H9.5C9.77614 14 10 14.22386 10 14.5V21')],
    'stroke.sharp': [S('M22 10L14 10L14 2M2 14L10 14L10 22')],
  }),

  // share-2: a closed silhouette, so it carries the full three styles the way
  // `share` does. The plate is the contour offset a unit and checked, which is
  // the whole reason the drawing had to come off free curves and on to arcs.
  'share-2': () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const path = I.share2({ sharp });
      const off = offsetContour(path.segs, 1);
      verify(path.segs, off, 1);
      const d = path.toString(), pl = contourPath(off);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(pl), S(d)];
      out[`fill.${key}`] = [F(pl)];
    }
    return out;
  },

  zap: () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const segs = I.zapPath({ sharp }).segs;
      const off = offsetContour(segs, 1);
      verify(segs, off, 1);
      const d = contourPath(segs), pl = contourPath(off);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(pl), S(d)];
      out[`fill.${key}`] = [F(pl)];
    }
    return out;
  },

  // The bolt runs top-right to bottom-left and the slash runs the other way,
  // so it crosses the drawing twice and leaves more than one run a side —
  // every run is kept, not just the first, which is the one place this differs
  // from `phone-off`.
  'zap-off': () => {
    const P0 = [0, 0], NRM = [1 / Math.SQRT2, -1 / Math.SQRT2];
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const base = I.zapPath({ sharp }).segs;
      const slash = sharp ? 'M1.7071 1.7071L22.2929 22.2929' : 'M2 2L22 22';
      // A cut stroke stays open; a cut PLATE has to close along the cut, or the
      // fill rule invents a boundary of its own and the plate runs everywhere.
      const open = (runs) => runs.map((r) => contourPath(r, false)).join('');
      const shut = (runs) => runs.map((r) => contourPath(r)).join('');
      const near = open(clipContour(base, P0, NRM, 0, -1, true));
      const far = open(clipContour(base, P0, NRM, sharp ? 3 : 4, 1, true));
      const pl = offsetContour(base, 1);
      verify(base, pl, 1);
      const plate = shut(clipContour(pl, P0, NRM, 0, -1, true)) + shut(clipContour(pl, P0, NRM, 3, 1, true));
      out[`stroke.${key}`] = [S(far + near + slash)];
      out[`duotone.${key}`] = [P(plate), S(near + slash)];
      out[`fill.${key}`] = [F(plate), S(slash)];
    }
    return out;
  },

  // The text-alignment stack. Four rules, not the three `menu` and `list-plus`
  // use, because at three the justified member is three full rules and that is
  // already the hamburger. Rules on 3, 9, 15, 21 and running 3..21, so the ink
  // is the house square on 2..22 both ways, and the ragged member is 6 painted
  // shorter than the full one, which is what carries the alignment at 16px.
  // Sharp extends each free end the unit its round cap painted.
  ...Object.fromEntries(Object.entries({
    'align-left': [3, 15],
    'align-center': [6, 18],
    'align-right': [9, 21],
    'align-justify': [3, 21],
  }).map(([name, [a, b]]) => [name, () => ({
    'stroke.regular': [S(`M3 3H21M${a} 9H${b}M3 15H21M${a} 21H${b}`)],
    'stroke.sharp': [S(`M2 3L22 3M${a - 1} 9L${b + 1} 9M2 15L22 15M${a - 1} 21L${b + 1} 21`)],
  })])),

  // All four marks are stroke only. The B was two closed bowls and so had to
  // carry duotone and fill; drawn as a skeleton it encloses nothing and joins
  // the other three. Either the whole family gets the styles or none does.
  ...Object.fromEntries(['bold', 'italic', 'underline', 'strikethrough'].map((name) => [name, () => ({
    'stroke.regular': [S(I.textMark[name](false))],
    'stroke.sharp': [S(I.textMark[name](true))],
  })])),

  // The pen family: one drawing, three names, and every derived layer comes out
  // of the same contour so a change reaches all three.
  //
  // Sharp is the same geometry as regular here and that is not an oversight:
  // the outline carries no fillet anywhere — the tip and the two shoulders are
  // true vertices already and the cap is a stadium end, not a corner — so there
  // is nothing to de-fillet. What sharp changes is the BAND's caps, and both of
  // its ends are T-junctions on a flank's own centre line, buried by
  // construction, so neither is extended either.
  ...Object.fromEntries(['pen', 'pen-line'].map((name) => [name, () => {
    const body = String(PEN.contour()) + PEN.band();
    const out = {};
    for (const corners of ['regular', 'sharp']) {
      const line = name === 'pen-line' ? PEN.rule(corners === 'sharp') : '';
      // the plate carries the same knockout the fill does, which is what the
      // shipped pen does with its nib triangle
      const solid = PEN.plate() + PEN.capPanel();
      out[`stroke.${corners}`] = [S(body + line)];
      out[`duotone.${corners}`] = [P(solid), S(body + line)];
      out[`fill.${corners}`] = line ? [F(solid), S(line)] : [F(solid)];
    }
    return out;
  }])),

  // pen-off. The slash runs at 45 degrees and the pen's axis is perpendicular
  // to it, so every cut is one number on that axis and none of it is a boolean.
  'pen-off': () => {
    const out = {};
    for (const corners of ['regular', 'sharp']) {
      const sharp = corners === 'sharp';
      const near = PEN.nearRun(), far = PEN.farRun(sharp), slash = PEN.SLASH(sharp);
      out[`stroke.${corners}`] = [S(near + far + PEN.band() + slash)];
      // the far side goes muted, near side full — the law of section 29
      out[`duotone.${corners}`] = [
        P(PEN.nearSolid()),
        { kind: 'muted', d: far + PEN.band() },
        S(near + slash),
      ];
      out[`fill.${corners}`] = [
        F(PEN.nearSolid() + PEN.farSolid(sharp) + PEN.capPanel()),
        S(slash),
      ];
    }
    return out;
  },

  // bell-ring is `bell` plus two waves, and the bell half is READ OUT of
  // raw/bell rather than restated — a base and its compound are one drawing,
  // and the only way to guarantee that is to not have a second copy of it.
  'bell-ring': () => {
    const out = {};
    for (const corners of ['regular', 'sharp']) {
      const duo = readFileSync(`${ROOT}/raw/bell/Container=regular, Style=duotone, Corners=${corners}.svg`, 'utf8');
      const plate = /<path d="([^"]*)" fill="black" fill-opacity="0.4"/.exec(duo)[1];
      const waves = I.bellWaves({ sharp: corners === 'sharp', plate });
      for (const style of ['stroke', 'duotone', 'fill']) {
        const src = readFileSync(`${ROOT}/raw/bell/Container=regular, Style=${style}, Corners=${corners}.svg`, 'utf8');
        const layers = [...src.matchAll(/<path d="([^"]*)"([^>]*)\/>/g)].map((m) => ({ d: m[1], a: m[2] }));
        out[`${style}.${corners}`] = layers.map((l) => (
          /fill-opacity="0.4"/.test(l.a) ? P(l.d)
            : /stroke="black"/.test(l.a) ? S(l.d + waves)
              : F(l.d)));
        // A fill carries no stroke layer of its own on `bell`, so the waves
        // have nowhere to land — give them one.
        if (!out[`${style}.${corners}`].some((l) => l.kind === 'stroke'))
          out[`${style}.${corners}`].push(S(waves));
      }
    }
    return out;
  },

  // The pair comes out of one function so a change to the break rule cannot
  // reach one of them and miss the other.
  ...Object.fromEntries([false, true].map((vertical) => [
    vertical ? 'sliders-vertical' : 'sliders-horizontal',
    () => ({
      'stroke.regular': [S(I.slidersPath({ vertical }))],
      'stroke.sharp': [S(I.slidersPath({ vertical, sharp: true }))],
    }),
  ])),

  // The bullets are their own filled layer, the way `sun-dim` carries its dots.
  list: () => ({
    'stroke.regular': (({ dots, rules }) => [F(dots), S(rules)])(I.sixIcon.list(false)),
    'stroke.sharp': (({ dots, rules }) => [F(dots), S(rules)])(I.sixIcon.list(true)),
  }),

  // The diagonal chain is `link`, not `link-2` — Lucide's naming, which this
  // set follows, and which the two were swapped into on 8 Sep 2026. `link-2`
  // is the horizontal form with the bar, and it is not generated: it is the
  // drawing this name used to carry, sitting in raw/ as it always has.
  //
  // Four free ends, all of them 45 degree arc termini, so sharp differs from
  // regular by the diagonal cut of 0.414 at each.
  link: () => ({
    'stroke.regular': [S(I.link2Path({}))],
    'stroke.sharp': [S(I.link2Path({ sharp: true }))],
  }),

  // unlink comes from Zafar's drawing: the chain come apart on the diagonal,
  // with a break mark at each far corner.
  unlink: () => ({ 'stroke.regular': [S(I.unlinkPath(false))], 'stroke.sharp': [S(I.unlinkPath(true))] }),

  ...Object.fromEntries(['list-ordered', 'text-quote'].map((name) => [name, () => ({
    'stroke.regular': [S(I.sixIcon[name](false))],
    'stroke.sharp': [S(I.sixIcon[name](true))],
  })])),

  // The star is a closed contour, so it carries the full three: the plate is
  // the contour offset a unit and checked, and the pair gets one plate each.
  sparkle: () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const segs = I.sparkleStar({ sharp }).segs;
      const off = offsetContour(segs, 1);
      verify(segs, off, 1);
      const d = contourPath(segs), pl = contourPath(off);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(pl), S(d)];
      out[`fill.${key}`] = [F(pl)];
    }
    return out;
  },

  sparkles: () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const stars = I.sparklePair({ sharp });
      const plates = stars.map((st) => { const off = offsetContour(st.segs, 1); verify(st.segs, off, 1); return contourPath(off); });
      const d = stars.map((st) => contourPath(st.segs)).join(''), pl = plates.join('');
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(pl), S(d)];
      out[`fill.${key}`] = [F(pl)];
    }
    return out;
  },

  'message-lines': () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const top = sharp ? [7, 17] : [8, 16], bot = sharp ? [7, 14] : [8, 13];
      const lines = `M${top[0]} 9L${top[1]} 9M${bot[0]} 13L${bot[1]} 13`;
      const d = I.BUBBLE + lines;
      const holes = rule(top[0], top[1], 9, sharp) + rule(bot[0], bot[1], 13, sharp);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(bubblePlate(key)), S(d)];
      out[`fill.${key}`] = [F(bubblePlate(key) + holes)];
    }
    return out;
  },

  language: () => {
    // An open drawing: stroke and duotone, no fill. The muted layer is the CJK
    // mark, which is what says which way the translation runs — `double-check`
    // and the sunrise pair mute a stroke the same way.
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const p = I.languageParts({ sharp });
      out[`stroke.${key}`] = [S(p.A + p.CJK)];
      out[`duotone.${key}`] = [S(p.A), { kind: 'muted', d: p.CJK }];
    }
    return out;
  },

  layers: () => {
    const out = {};
    for (const sharp of [false, true]) {
      const key = sharp ? 'sharp' : 'regular';
      const { plate: pl, chevrons } = I.layersParts({ sharp });
      const d = pl.toString() + chevrons;
      const solid = plate(pl);
      out[`stroke.${key}`] = [S(d)];
      out[`duotone.${key}`] = [P(solid), S(d)];
      out[`fill.${key}`] = [F(solid), S(chevrons)];
    }
    return out;
  },

  'sun-medium': () => {
    // The brightness family shortens its rays from the outside and leaves the
    // inner end where it is, so the two-unit gap to the disc holds and the
    // drawing itself gets smaller: 3.5 units of ray, then 2.5, then a dot at 2.
    // The step is a unit where it matters — between this and `sun` — and the
    // half unit falls between this and `sun-dim`, which differ in kind anyway.
    const round = DISC + I.sunRays(8.5, 9);
    const sharp = DISC + I.sunRays(7.5, 10);
    return {
      'stroke.regular': [S(round)],
      'duotone.regular': [P(PLATE_DISC), S(round)],
      'fill.regular': [F(PLATE_DISC), S(I.sunRays(8.5, 9))],
      'stroke.sharp': [S(sharp)],
      'duotone.sharp': [P(PLATE_DISC), S(sharp)],
      'fill.sharp': [F(PLATE_DISC), S(I.sunRays(7.5, 10))],
    };
  },

  'sun-dim': () => {
    const dots = I.sunDots(8.5);
    return {
      'stroke.regular': [S(DISC), F(dots)],
      'duotone.regular': [P(PLATE_DISC), S(DISC), F(dots)],
      'fill.regular': [F(PLATE_DISC + dots)],
      'stroke.sharp': [S(DISC), F(dots)],
      'duotone.sharp': [P(PLATE_DISC), S(DISC), F(dots)],
      'fill.sharp': [F(PLATE_DISC + dots)],
    };
  },
};

const args = process.argv.slice(2);
const outArg = args.find((a) => a.startsWith('--out='));
const root = outArg ? resolve(outArg.slice(6)) : ROOT;
const want = args.filter((a) => !a.startsWith('--'));
for (const [name, make] of Object.entries(SETS)) {
  if (want.length && !want.includes(name)) continue;
  writeSet(root, name, make());
  console.log('wrote raw/' + name);
}
