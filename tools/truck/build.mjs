/**
 * truck, redrawn, and its nine compounds.  11 Sep 2026.
 *
 * The modifier goes in the TOP-LEFT corner, because the truck has no other:
 * the cab fills the top right and the rear wheel the bottom right, and a 6-unit
 * box flush in either of those ink corners overlaps by 2.00 with nothing that
 * can be opened — a roof and a windscreen cannot be notched away and leave a
 * cab, and a wheel is a disc.  The cargo box can open, the way `file-*` and
 * `calendar-*` open theirs.
 *
 * It cannot stay closed.  The walls sit at 2 and 14, so the box's interior
 * paints 10 across against the sign's 8: 1.00 either side.  (A 4-unit sign has
 * exactly one solution, path 6..10 by 8..12, with zero slack in both axes,
 * because the near wheel bulges into the box from below.)
 *
 * And the house 6 does not fit the corner while the box's top-right fillet is
 * r=3.  The sign's ink ends at 9, so the outline has to stop at x=12 — one unit
 * past that fillet's own tangent at 11 — and the whole top of the box goes with
 * it.  5 is the ceiling on the truck exactly as drawn.  So the base moves, the
 * way `mail` went 18x14 -> 20x16 to host its corner: the cargo box's two TOP
 * corners come in from r=3 to r=2, which puts the fillet's tangent at x=12,
 * exactly where the 6 needs it.  Nothing else about the truck changes — the
 * cab, the wheels, the wheelbase and every extent are untouched, and the SHARP
 * treatment has no fillets to change, so its three variants are left alone.
 *
 * Family constants, defined once here so they cannot drift:
 *
 *   sign box     path 2..8 by 4..10, ink 1..9 by 3..11, flush in the truck's
 *                own ink corner, so every compound measures 1,3..23,21 — the
 *                base's box, and no member translates.
 *   stroke cuts   rounded (12, 4) and (2, 14); sharp (11, 4) and (2, 13), which
 *                is the same ink, a butt cap painting where the disc reached.
 *   notch         x = 11, y = 13 for the plate AND the fill region, both of
 *                which have no reach, so both clear the sign's ink by 2.00.
 *                Cornered r=2 rounded, true in sharp: r=2 puts the arc's own
 *                centre on the sign's ink corner, so it holds exactly 2.00 and
 *                r=3 would cut to 1.59.
 *   plate ends    rounded, an r=1 turn centred on each cap, tracing it (the
 *                `folder` recipe); sharp, flush along the butt bar's face.
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeSet } from '../v5/raw.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const raw = (name, style, corners) =>
  / d="([^"]+)"/.exec(readFileSync(join(ROOT, 'raw', name, `Container=regular, Style=${style}, Corners=${corners}.svg`), 'utf8'))[1]

/* every path below is lifted out of raw/, never retyped: the head of each one
   is replaced and the tail carried verbatim. */
const cut = (d, from, to) => {
  if (!d.includes(from)) throw new Error(`raw/ has moved: ${from}`)
  return d.replace(from, to)
}

/* ---------------------------------------------------------------- the base */
const SHIPPED = {
  stroke: raw('truck', 'stroke', 'regular'),
  plate: raw('truck', 'duotone', 'regular').split('M14 18V7')[0],
  solid: /^([^"]*?Z)/.exec(raw('truck', 'fill', 'regular'))[1],
}
/* the stroke layer is one `d` holding the box, the rule, the cab and the two
   wheels; `rest` is everything but the box. */
const REST = SHIPPED.stroke.slice(SHIPPED.stroke.indexOf('M10 18'))

const BOX = 'M14 18V6C14 4.89543 13.1046 4 12 4H4C2.89543 4 2 4.89543 2 6V17C2 17.5523 2.44772 18 3 18H4'
const STROKE = BOX + REST
const PLATE = cut(raw('truck', 'duotone', 'regular').split('"')[0],
  'M1 7C1 4.790861 2.790861 3 5 3L11 3C13.209139 3 15 4.790861 15 7L15 7',
  'M1 6C1 4.34315 2.34315 3 4 3L12 3C13.6569 3 15 4.34315 15 6L15 7')
const SOLID = cut(SHIPPED.solid,
  'V7C2 5.34315 3.34315 4 5 4H11C12.6569 4 14 5.34315 14 7V18',
  'V6C2 4.89543 2.89543 4 4 4H12C13.1046 4 14 4.89543 14 6V18')

/* ----------------------------------------------------------- the compounds */
/* the box, opened: two pieces, the top run ending on the fillet's own tangent */
const OPEN = {
  regular: ['M14 18V6C14 4.89543 13.1046 4 12 4', 'M2 14V17C2 17.5523 2.44772 18 3 18H4'],
  sharp: ['M14 18L14 4L11 4', 'M2 13L2 18L5 18'],
}
const SHARPSTROKE = raw('truck', 'stroke', 'sharp')
const RESTSHARP = SHARPSTROKE.slice(SHARPSTROKE.indexOf('M9 18L14 18'))

/* the plate, notched.  rounded: the r=3 box corner runs straight into the r=1
   turn on the top cap, both tangent at (12,3). */
const PLATE_OPEN = 'M11 4C11 3.44772 11.44772 3 12 3' +
  PLATE.replace('M1 6C1 4.34315 2.34315 3 4 3L12 3', '').replace(/Z$/, '') +
  'L1 14C1 13.44772 1.44772 13 2 13L9 13C10.10457 13 11 12.10457 11 11L11 4Z'
const PLATE_OPEN_SHARP = cut(raw('truck', 'duotone', 'sharp').split('"')[0], 'M2 3L11 3', 'M11 3')
  .replace('L1 4C1 3.4477 1.4477 3 2 3Z', 'L1 13L11 13L11 3Z')

/* the fill region, notched on the same lines */
const SOLID_OPEN = cut(SOLID, 'V6C2 4.89543 2.89543 4 4 4H12C13.1046 4 14 4.89543 14 6V18',
  'V13H9C10.1046 13 11 12.1046 11 11V4H12C13.1046 4 14 4.89543 14 6V18')
const SOLID_SHARP = /^([^"]*?Z)/.exec(raw('truck', 'fill', 'sharp'))[1]
const SOLID_OPEN_SHARP = cut(SOLID_SHARP, 'L2 5C2 4.4477 2.4477 4 3 4L13 4', 'L2 13L11 13L11 4L13 4')

/* the signs, lifted out of the `file-*` family (box 14..20 by 16..22) and
   translated by (-12, -12) into ours.  Straight-line paths only, so a pair-wise
   translate is safe; H and V are expanded in the source strings above it. */
const SIGNS = {
  plus: ['M5 4V10M2 7H8', 'M5 3L5 11M1 7L9 7'],
  minus: ['M2 7H8', 'M1 7L9 7'],
  check: ['M2 7L4 9L8 5', 'M1.7071 6.7071L4 9L8.2929 4.7071'],
  x: ['M2 4L8 10M8 4L2 10', 'M1.7071 3.7071L8.2929 10.2929M8.2929 3.7071L1.7071 10.2929'],
  'arrow-down': ['M5 4V10M2 7L5 10L8 7', 'M5 3L5 10M1.7071 6.7071L5 10L8.2929 6.7071'],
  'arrow-up': ['M5 10V4M2 7L5 4L8 7', 'M5 11L5 4M1.7071 7.2929L5 4L8.2929 7.2929'],
  'arrow-left': ['M8 7H2M5 4L2 7L5 10', 'M9 7L2 7M5.2929 3.7071L2 7L5.2929 10.2929'],
  'arrow-right': ['M2 7H8M5 4L8 7L5 10', 'M1 7L8 7M4.7071 3.7071L8 7L4.7071 10.2929'],
  /* the bolt is an object rather than a sign, so it is drawn at size rather
     than scaled off `zap`, whose r=1 corners would come out at 0.33.  Two 45°
     runs and a level bar, the round join doing every corner — `activity`'s
     vocabulary.  It paints 2..8 by 3..11, narrower than its box, which is the
     `wifi-info` case: a narrow sign sits on its box's centre line. */
  electric: ['M6 4L3 7H7L4 10', 'M6.2929 3.7071L3 7L7 7L3.7071 10.2929'],
}

const sets = { truck: {
  'stroke.regular': [{ kind: 'stroke', d: STROKE }],
  'duotone.regular': [{ kind: 'plate', d: PLATE }, { kind: 'stroke', d: STROKE }],
  'fill.regular': [{ kind: 'solid', d: SOLID }, { kind: 'stroke', d: STROKE }],
} }
for (const [sign, [round, sharp]] of Object.entries(SIGNS)) {
  const S = OPEN.regular.join('') + REST + round
  const H = OPEN.sharp.join('') + RESTSHARP + sharp
  sets[`truck-${sign}`] = {
    'stroke.regular': [{ kind: 'stroke', d: S }],
    'duotone.regular': [{ kind: 'plate', d: PLATE_OPEN }, { kind: 'stroke', d: S }],
    'fill.regular': [{ kind: 'solid', d: SOLID_OPEN }, { kind: 'stroke', d: S }],
    'stroke.sharp': [{ kind: 'stroke', d: H }],
    'duotone.sharp': [{ kind: 'plate', d: PLATE_OPEN_SHARP }, { kind: 'stroke', d: H }],
    'fill.sharp': [{ kind: 'solid', d: SOLID_OPEN_SHARP }, { kind: 'stroke', d: H }],
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = process.argv[2] ?? ROOT
  for (const [name, variants] of Object.entries(sets)) writeSet(out, name, variants)
  console.log(`wrote ${Object.keys(sets).length} sets to ${out}/raw`)
}
export { sets, SIGNS, STROKE, PLATE, SOLID, OPEN, REST }
