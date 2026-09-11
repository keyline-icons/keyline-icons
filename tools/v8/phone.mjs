/**
 * Turn the phone family over, and the slash with it.
 *
 * Zafar's `refs/phone.svg` of 11 Sep 2026 is the shipped drawing mirrored about
 * x=12, coordinate for coordinate: 22 against 2, 21.1046 against 2.8954,
 * 15.2964 against 8.7036, all the way down. Nothing about the handset changes,
 * only which way it lies. A receiver reads earpiece-first at the top left, which
 * is the external convention that outranks this set's own rule about a free
 * diagonal running bottom-left to top-right.
 *
 * So the whole family is that one mirror, and `phone-off` comes with it. That is
 * the exception he asked for and it needs no special case: the slash is part of
 * the drawing, so `M2 2L22 22` turns into `M22 2L2 22` along with everything
 * else, and every cut, standoff and plate clip keeps the distance it had.
 *
 * It has to turn over. The handset now lies along the main diagonal, which is
 * the slash's own line, and §8's test rules that out: an element running beside
 * the slash is cut lengthwise into stubs instead of being crossed once. Measured
 * on the new drawing, the handset's span in `u = x - y` is 12.7 against a band
 * 5.66 wide, so more than half of it falls inside. Across the other diagonal it
 * spans 25.9 and loses one bite from the middle. `bluetooth` is the icon that
 * had no way out, because both diagonals were taken; here only one is.
 *
 *   node tools/v8/phone.mjs --check   # measure both diagonals, write nothing
 *   node tools/v8/phone.mjs           # mirror the twelve files
 */
import { readFile, writeFile } from "node:fs/promises"
import { emit, tokenize, subpaths } from "./paths.mjs"

const ROOT = new URL("../../", import.meta.url)
const check = process.argv.includes("--check")
const NAMES = ["phone", "phone-off"]
const STYLES = ["stroke", "duotone", "fill"]
const CORNERS = ["regular", "sharp"]
const file = (name, style, corners) =>
  new URL(`raw/${name}/Container=regular, Style=${style}, Corners=${corners}.svg`, ROOT)

/** x goes to 24 - x. A `V` carries no x, and an `H` carries nothing else. */
const mirror = (d) => emit(tokenize(d), (v, slot) => (slot === "x" ? 24 - v : v))

/**
 * How far a drawing runs across a diagonal, in that diagonal's own coordinate.
 *
 * §8's test: an element that crosses the slash spans far more than the band's
 * 5.66 and loses one bite out of the middle; one that runs beside it spans about
 * the same and is cut into stubs.
 */
function span(d, f) {
  const { out } = subpaths(d)
  const vs = out.flatMap((s) => s.pts.map(f))
  return Math.max(...vs) - Math.min(...vs)
}

if (check) {
  const d = await readFile(file("phone", "stroke", "regular"), "utf8")
  const now = / d="([^"]*)"/.exec(d)[1]
  const next = mirror(now)
  const row = (label, s) =>
    `  ${label.padEnd(22)} span ${span(next, s).toFixed(2).padStart(6)}   band 5.66   ${
      span(next, s) > 12 ? "crosses it once" : "runs along it, cut into stubs"
    }`
  console.log("  the redrawn phone, measured against each diagonal:\n")
  console.log(row("M2 2 L22 22", ([x, y]) => x - y))
  console.log(row("M22 2 L2 22", ([x, y]) => x + y))
  const ref = await readFile(new URL("refs/phone.svg", ROOT), "utf8")
  const his = / d="([^"]*)"/.exec(ref)[1]
  const num = (s) => (s.match(/-?\d*\.?\d+/g) ?? []).map(Number)
  const pts = (s) => JSON.stringify(subpaths(s).out.map((p) => p.pts.map((q) => q.map((v) => +v.toFixed(4)))))
  console.log(`\n  his refs/phone.svg is the mirror: ${pts(his) === pts(next) ? "yes, every point" : "NO — they differ"}`)
} else {
  let n = 0
  for (const name of NAMES)
    for (const style of STYLES)
      for (const corners of CORNERS) {
        const url = file(name, style, corners)
        const svg = await readFile(url, "utf8")
        await writeFile(url, svg.replace(/ d="([^"]*)"/g, (_, d) => ` d="${mirror(d)}"`))
        n++
      }
  console.log(`  mirrored ${n} files`)
}
