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
/* The base does NOT move, and the sign is FIVE units rather than the house six.
   Two cuts were tried first and both were wrong, each in a way only a render
   showed:

   - Bringing the cargo box's two top corners in from r=3 to r=2 buys the house
     6 a straight cut. Overlaid on the shipped drawing the smaller radius reads
     as a defect rather than a decision, and Zafar found it at the box's top
     right on 12 Sep 2026.
   - Keeping r=3 and cutting INTO the fillet, two thirds round at (12, 4.1707),
     keeps the corner arc exactly and buys the 6 as well. But a cut arc's cap
     puts the ROUNDED body's ink top at 3.17 where the sharp body's stays at 3,
     so for the two signs that do not themselves reach y=3 — a minus is 2 units
     of ink and a check 4 — the sharp drawing paints outside its own rounded
     sibling. The ink-box highlighter turned those six cells red, which is what
     red is for.

   So the outline stops on the fillet's own tangent at (11, 4), which is the
   only cut that leaves both treatments' ink at 3, and the sign comes down to 5
   to clear that cap's disc by 2.00. The set has no other 5-unit modifier box;
   `list-*`'s is 4 and every corner family's is 6. It is the ceiling this body
   has, and the arithmetic is in the commit.
*/
const SHIPPED = {
  stroke: raw('truck', 'stroke', 'regular'),
  plate: raw('truck', 'duotone', 'regular').split('M14 18V7')[0],
  solid: /^([^"]*?Z)/.exec(raw('truck', 'fill', 'regular'))[1],
}
/* the stroke layer is one `d` holding the box, the rule, the cab and the two
   wheels; `rest` is everything but the box. */
const REST = SHIPPED.stroke.slice(SHIPPED.stroke.indexOf('M10 18'))

const STROKE = SHIPPED.stroke
const PLATE = raw('truck', 'duotone', 'regular').split('"')[0]
const SOLID = SHIPPED.solid

/* ----------------------------------------------------------- the compounds */
/* the box, opened: two pieces, the top run ending on the fillet's own tangent */
const OPEN = {
  regular: ['M14 18V7C14 5.34315 12.6569 4 11 4', 'M2 13V17C2 17.5523 2.44772 18 3 18H4'],
  sharp: ['M14 18L14 4L10 4', 'M2 12L2 18L5 18'],
}
const SHARPSTROKE = raw('truck', 'stroke', 'sharp')
const RESTSHARP = SHARPSTROKE.slice(SHARPSTROKE.indexOf('M9 18L14 18'))

/* the plate, notched.  rounded: the r=3 box corner runs straight into the r=1
   turn on the top cap, both tangent at (12,3). */
/* The plate's two cut ends trace their caps: an r=1 turn centred on each, so
   the grey stops exactly where the black does — `folder`'s recipe. The notch's
   own corner is r=2, whose centre lands ON the sign's ink corner (8, 10), so
   every point of that arc is exactly 2.00 from the sign. */
const PLATE_OPEN = 'M10 4C10 3.44772 10.44772 3 11 3' +
  PLATE.replace(/^M1 7C1 4\.790861 2\.790861 3 5 3L11 3/, '').replace(/Z$/, '') +
  'L1 13C1 12.44772 1.44772 12 2 12L8 12C9.10457 12 10 11.10457 10 10L10 4Z'
const PLATE_OPEN_SHARP = cut(raw('truck', 'duotone', 'sharp').split('"')[0], 'M2 3L11 3', 'M10 3L11 3')
  .replace('L1 4C1 3.4477 1.4477 3 2 3Z', 'L1 12L10 12L10 3Z')

/* the fill region, notched on the same lines */
const SOLID_OPEN = cut(SOLID, 'V7C2 5.34315 3.34315 4 5 4H11C12.6569 4 14 5.34315 14 7V18',
  'V12H8C9.10457 12 10 11.10457 10 10V4H11C12.6569 4 14 5.34315 14 7V18')
const SOLID_SHARP = /^([^"]*?Z)/.exec(raw('truck', 'fill', 'sharp'))[1]
const SOLID_OPEN_SHARP = cut(SOLID_SHARP, 'L2 5C2 4.4477 2.4477 4 3 4L13 4', 'L2 12L10 12L10 4L13 4')

/* the signs, lifted out of the `file-*` family (box 14..20 by 16..22) and
   translated by (-12, -12) into ours.  Straight-line paths only, so a pair-wise
   translate is safe; H and V are expanded in the source strings above it. */
const SIGNS = {
  plus: ['M4.5 4V9M2 6.5H7', 'M4.5 3L4.5 10M1 6.5L8 6.5'],
  minus: ['M2 6.5H7', 'M1 6.5L8 6.5'],
  check: ['M2 6.5L3.6667 8.1667L7 4.8333', 'M1.7071 6.2071L3.6667 8.1667L7.2929 4.5404'],
  x: ['M2 4L7 9M7 4L2 9', 'M1.7071 3.7071L7.2929 9.2929M7.2929 3.7071L1.7071 9.2929'],
  'arrow-down': ['M4.5 4V9M2 6.5L4.5 9L7 6.5', 'M4.5 3L4.5 9M1.7071 6.2071L4.5 9L7.2929 6.2071'],
  'arrow-up': ['M4.5 9V4M2 6.5L4.5 4L7 6.5', 'M4.5 10L4.5 4M1.7071 6.7929L4.5 4L7.2929 6.7929'],
  'arrow-left': ['M7 6.5H2M4.5 4L2 6.5L4.5 9', 'M8 6.5L2 6.5M4.7929 3.7071L2 6.5L4.7929 9.2929'],
  'arrow-right': ['M2 6.5H7M4.5 4L7 6.5L4.5 9', 'M1 6.5L7 6.5M4.2071 3.7071L7 6.5L4.2071 9.2929'],
  /* the bolt is an object rather than a sign, so it is drawn at size rather
     than scaled off `zap`, whose r=1 corners would come out at a third of a
     unit.  Two 45-degree runs and a level bar, the round join doing every
     corner — `activity`'s vocabulary.  It paints 1.83..7.17 across, narrower
     than its box, which is the `wifi-info` case: a narrow sign sits on its
     box's centre line and its ink stops short of the body's. */
  electric: ['M5.3333 4L2.8333 6.5H6.1667L3.6667 9', 'M5.6262 3.7071L2.8333 6.5L6.1667 6.5L3.3738 9.2929'],
}

const sets = {}
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
