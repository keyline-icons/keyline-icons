/**
 * A point-set signature per variant, computed the same way on both sides.
 *
 * Figma spells a path its own way and re-bases it to the node, so the strings
 * never match; what is invariant is the set of points at 2dp, which is what
 * `check-figma` compares for the same reason. Connectivity is not in it, so
 * this is a check that the right geometry landed, not that it is joined the
 * right way round — the eight exports read back in full cover that.
 */
import { readFile } from "node:fs/promises"
import { subpaths } from "./paths.mjs"

const ROOT = new URL("../../", import.meta.url)
export const hash = (s) => {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, "0")
}
/*
 * A SET of points, not a list of them, and that is the whole subtlety.
 * Figma re-emits a closed subpath's final edge as an explicit line back to the
 * start, but only where the path does not already return there — so a multiset
 * gains a duplicate on some subpaths and not others, and six of seventy-two
 * variants read as drift on 11 Sep 2026 when every coordinate agreed.
 */
export const sigOf = (ds) =>
  hash(
    [
      ...new Set(
        ds
          .flatMap((d) => subpaths(d).out.flatMap((s) => s.pts))
          .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
      ),
    ]
      .sort()
      .join(";")
  )

const NAMES = process.argv.slice(2)
const out = {}
for (const name of NAMES)
  for (const corners of ["regular", "sharp"])
    for (const style of ["stroke", "duotone", "fill"]) {
      let svg
      try {
        svg = await readFile(new URL(`raw/${name}/Container=regular, Style=${style}, Corners=${corners}.svg`, ROOT), "utf8")
      } catch { continue }
      out[`${name}|${style}|${corners}`] = sigOf([...svg.matchAll(/ d="([^"]*)"/g)].map((m) => m[1]))
    }
console.log(JSON.stringify(out))
