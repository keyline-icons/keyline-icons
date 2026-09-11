/**
 * Lift the calendar body's top edge by one unit, across the whole family.
 *
 * Zafar redrew `calendar` on 11 Sep 2026 and the change is exactly one thing:
 * the body's top edge moves from y=6 to y=5. The header rule stays on 11 and
 * the two tick posts stay on 3..7, so the posts now cross the body edge
 * symmetrically, two units above and two inside, where before they stood three
 * above and one in. Every other number in his drawing is the shipped one.
 *
 * So this is a translation of part of a drawing rather than a redraw, and it is
 * applied as one: in each body contour, every point at or above the line where
 * the side walls begin moves up by one. That line is the top corner's own
 * centre — y=9 with the rounded r=3 corner and its r=4 plate, y=6 with the
 * sharp ones — so the top edge and both top corners travel and nothing else
 * moves at all. The ink box is 20 x 20 before and after, because the posts
 * already set it.
 *
 * `calendar-off` cannot be shifted that way and is rebuilt instead: its pieces
 * are the body clipped on the slash, and the slash is diagonal, so moving the
 * edge moves where it is cut. See `off()` below.
 *
 *   node tools/v8/calendar.mjs --check   # rebuild the SHIPPED drawings, and diff
 *   node tools/v8/calendar.mjs           # write the new ones into raw/
 */
import { readFile, writeFile } from "node:fs/promises"
import { emit, subpaths, tokenize, splitCubic, solveT, fmt, arc } from "./paths.mjs"

const ROOT = new URL("../../", import.meta.url)
const check = process.argv.includes("--check")

/** Every name whose body is a whole contour, so a shift is the whole edit. */
const SHIFTED = [
  "calendar",
  "calendar-plus",
  "calendar-minus",
  "calendar-check",
  "calendar-x",
  "calendar-arrow-up",
  "calendar-arrow-down",
  "calendar-arrow-left",
  "calendar-arrow-right",
]

const STYLES = ["stroke", "duotone", "fill"]
const CORNERS = ["regular", "sharp"]
const file = (name, style, corners) =>
  new URL(`raw/${name}/Container=regular, Style=${style}, Corners=${corners}.svg`, ROOT)

/**
 * A body contour, told from a sign or a rule by its size.
 *
 * Nothing smaller than this is a body: the widest thing that is not one is the
 * header rule's own knockout at 12 x 2, and the tallest is a sign at 6 x 6.
 */
const isBody = (s) => s.maxX - s.minX >= 14 && s.maxY - s.minY >= 12

/** The y at which the side walls begin, which is what the top edge travels with. */
const WALL = { regular: 9, sharp: 6 }

function shift(d, corners) {
  const { toks, out } = subpaths(d)
  const bodies = out.filter(isBody)
  if (!bodies.length) return d
  const inBody = (i) => bodies.some((b) => i >= b.from && i <= b.to)
  return emit(toks, (v, slot, i) =>
    slot === "y" && inBody(i) && v <= WALL[corners] ? v - 1 : v
  )
}

/* ------------------------------------------------------------ calendar-off */

const R2 = Math.SQRT2
/** The base stands off the slash by 2 painted units; a fill has no reach of its own. */
const FAR_STROKE = 4 * R2
const FAR_PLATE = 3 * R2
/** Sharp pushes the far stroke end one unit toward the slash, and the plate follows. */
const FAR_SHARP_PLATE = 4 * R2 - 2

/**
 * The six `calendar-off` files, built from the body at top edge `T`.
 *
 * Run with `--check` at T=6 this reproduces what is in `raw/` today, which is
 * the only reason to trust it at T=5: the cut points, the split corner arcs and
 * the plate's r=1 turns all come out of the same arithmetic, so if the model
 * were wrong about any of them the shipped file would say so.
 */
function off(T) {
  const P = T - 1 // the plate's top edge, one unit outside the stroke's
  const k = 1.65685 // the r=3 corner's handle, as raw/ spells it
  const k4 = 2.20914 // and the plate's r=4

  /* The top-left corner, walked the way the near piece walks it: down the left
     wall, round to the top edge. Split where it reaches the slash's centre
     line, which is where a round cap is swallowed whole. */
  const cutArc = (p) => {
    const t = solveT(p, ([x, y]) => x - y)
    const [first] = splitCubic(p, t)
    return { d: `C${first.slice(1).flat().map(fmt).join(" ")}`, end: first[3] }
  }
  const strokeCorner = cutArc([[3, T + 3], [3, T + 3 - k], [6 - k, T], [6, T]])
  const plateCorner = cutArc([[2, T + 3], [2, T + 3 - k4], [6 - k4, P], [6, P]])

  /* Where the far pieces leave the body. On a horizontal edge at height y the
     slash's own line sits at x = y, so a standoff of u units lands at x = y+u. */
  const topCut = (u, y) => y + u
  const sx = topCut(FAR_STROKE, T) // the stroke's cut on the top edge
  const wallY = 21 - FAR_STROKE // and on the right wall, the file's own 15.3431

  /* The plate leaves the silhouette 1.000 from the stroke's cut, turns on an
     r=1 arc centred on that cut, and rejoins at the tangent point — `bell-dot`'s
     construction, and the reason the two land together without solving for it. */
  const turn = (cx, cy, a0, a1) => arc(cx, cy, 1, a0, a1, 2)
  const D = Math.PI / 180
  /* The sharp plate's cut is an irrational the raw files spell to four places;
     everything else here is exact, so only these two are rounded. */
  const f4 = (v) => fmt(+v.toFixed(4))
  const shp = f4(P + FAR_SHARP_PLATE) // where it leaves the plate's top edge
  const shw = f4(22 - FAR_SHARP_PLATE) // and the right wall

  return {
    "stroke/regular": [
      `M${fmt(sx)} ${T}L18 ${T}C${fmt(18 + k)} ${T} 21 ${fmt(T + 3 - k)} 21 ${T + 3}L21 ${fmt(wallY)}` +
        `M20.1213 20.1213C19.5785 20.6642 18.8285 21 18 21L6 21C4.3431 21 3 19.6569 3 18L3 ${T + 3}${strokeCorner.d}` +
        `M7 11L11 11M16 3L16 7M2 2L22 22`,
    ],
    "stroke/sharp": [
      /* One unit further along each free end, so the butt cap paints where the
         round one reached; a cut end buried on the slash is not free and stays. */
      `M${fmt(topCut(FAR_STROKE, T) - 1)} ${T}L21 ${T}L21 ${fmt(wallY + 1)}` +
        `M21 21L3 21L3 ${T}L${T} ${T}` +
        `M6 11L11 11M16 2L16 8M1.7071 1.7071L22.2929 22.2929`,
    ],
    "duotone/regular": [
      `M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22H6C3.7909 22 2 20.2091 2 18V${T + 3}${plateCorner.d}` +
        `L20.8284 20.8284Z` +
        `M${fmt(sx - 1 / R2)} ${fmt(T + 1 / R2)}${turn(sx, T, 135 * D, 270 * D)}H18C${fmt(18 + k4)} ${P} 22 ${fmt(P + 4 - k4)} 22 ${T + 3}` +
        `V${fmt(wallY)}${turn(21, wallY, 0, 135 * D)}L${fmt(sx - 1 / R2)} ${fmt(T + 1 / R2)}Z`,
      `M20.1213 20.1213C19.5785 20.6642 18.8285 21 18 21H6C4.3431 21 3 19.6569 3 18V${T + 3}${strokeCorner.d}` +
        `M7 11H11M2 2L22 22`,
    ],
    "duotone/sharp": [
      `M${P} ${P}H3C2.4477 ${P} 2 ${fmt(T - 0.5523)} 2 ${T}V21C2 21.5523 2.4477 22 3 22H22L${P} ${P}Z` +
        `M${shp} ${P}H21C21.5523 ${P} 22 ${fmt(T - 0.5523)} 22 ${T}V${shw}L${shp} ${P}Z`,
      `M21 21H3V${T}H${T}M6 11H11M1.7071 1.7071L22.2929 22.2929`,
    ],
    "fill/regular": [
      `M20.8284 20.8284C20.1046 21.5523 19.1046 22 18 22L6 22C3.7909 22 2 20.2091 2 18L2 ${T + 3}${plateCorner.d}Z` +
        `M${fmt(sx - 1 / R2)} ${fmt(T + 1 / R2)}${turn(sx, T, 135 * D, 270 * D)}L18 ${P}C${fmt(18 + k4)} ${P} 22 ${fmt(P + 4 - k4)} 22 ${T + 3}` +
        `L22 ${fmt(wallY)}${turn(21, wallY, 0, 135 * D)}L${fmt(sx - 1 / R2)} ${fmt(T + 1 / R2)}Z` +
        `M12 12L7 12C6.4477 12 6 11.5523 6 11C6 10.4477 6.4477 10 7 10L10 10Z`,
      `M16 3L16 7M2 2L22 22`,
    ],
    "fill/sharp": [
      `M${P} ${P}L3 ${P}C2.4477 ${P} 2 ${fmt(T - 0.5523)} 2 ${T}L2 21C2 21.5523 2.4477 22 3 22L22 22L${P} ${P}Z` +
        `M${shp} ${P}L21 ${P}C21.5523 ${P} 22 ${fmt(T - 0.5523)} 22 ${T}L22 ${shw}Z` +
        `M12 12L6 12L6 10L10 10L12 12Z`,
      `M1.7071 1.7071L22.2929 22.2929`,
    ],
  }
}

/* ------------------------------------------------------------------- drive */

const paths = (svg) => [...svg.matchAll(/ d="([^"]*)"/g)].map((m) => m[1])
const replace = (svg, next) => {
  let i = 0
  return svg.replace(/ d="[^"]*"/g, () => ` d="${next[i++]}"`)
}

const report = []
for (const name of SHIFTED) {
  for (const style of STYLES) {
    for (const corners of CORNERS) {
      const url = file(name, style, corners)
      const svg = await readFile(url, "utf8")
      const next = paths(svg).map((d) => shift(d, corners))
      if (check) {
        const same = paths(svg).map((d) => emit(tokenize(d), (v) => v))
        report.push([`${name} ${style} ${corners}`, same.join("|") === paths(svg).join("|") ? "round-trip ok" : "ROUND-TRIP DIFFERS"])
      } else await writeFile(url, replace(svg, next))
    }
  }
}

/* Four places, which is how the family already spells its irrationals: the
   shipped `calendar-off` carries 5.1013 and 15.3431, and a raw file that suddenly
   ran to six would read as a changed number everywhere it had not changed. */
const p4 = (d) => d.replace(/\d+\.\d{5,}/g, (m) => (+(+m).toFixed(4)).toString())

for (const [key, ds0] of Object.entries(off(check ? 6 : 5))) {
  const ds = ds0.map(p4)
  const [style, corners] = key.split("/")
  const url = file("calendar-off", style, corners)
  const svg = await readFile(url, "utf8")
  if (check) {
    const was = paths(svg)
    const ok = was.length === ds.length && was.every((d, i) => same(d, ds[i]))
    report.push([`calendar-off ${style} ${corners}`, ok ? "model reproduces raw/" : `MODEL DIFFERS\n      raw/ ${was.join(" | ")}\n      new  ${ds.join(" | ")}`])
  } else await writeFile(url, replace(svg, ds))
}

/** Two paths are the same drawing when every number agrees to 3dp. */
function same(a, b) {
  const n = (s) => (s.match(/-?\d*\.?\d+/g) ?? []).map((v) => +(+v).toFixed(3))
  const l = (s) => (s.match(/[MLHVCZ]/g) ?? []).join("")
  const [x, y] = [n(a), n(b)]
  return l(a) === l(b) && x.length === y.length && x.every((v, i) => Math.abs(v - y[i]) <= 0.002)
}

if (check) for (const [k, v] of report) console.log(`  ${k.padEnd(34)} ${v}`)
else console.log(`  wrote ${SHIFTED.length * 6 + 6} files`)
