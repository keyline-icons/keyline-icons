#!/usr/bin/env node
/**
 * Verify every drawing has a line of its own, and that the line still fits.
 *
 *   node pipeline/check-usage.mjs
 *
 * `lib/icon-usage.json` is what stops the icon pages from being one page 554
 * times. Before it, every one of them read "The X icon, drawn on a 24×24 grid
 * in stroke, duotone and fill", which is the doorway pattern the route was
 * allowed on condition of avoiding, and the reason none of those pages ranked
 * for the query they are obviously about.
 *
 * Nothing else would catch a gap. A base with no line falls back to the old
 * template in `iconDescription`, which renders perfectly, type-checks, and is
 * invisible until someone reads the page — so a drawing added next month
 * quietly rejoins the template unless this fails the build.
 *
 * Four things are checked, and the length one is the reason this measures the
 * real descriptions rather than the lines on their own:
 *
 * - **Coverage.** Every base on disk has a line, and every line has a base.
 * - **Length.** The description a page actually declares fits `SNIPPET_LIMIT`.
 *   A snippet is cut mid-clause past that, and the clause that has to survive
 *   the cut is the one carrying "free" and "MIT".
 * - **Duplication.** No two bases say the same thing. A line copied between two
 *   icons is the failure this file exists to prevent, arriving one entry at a
 *   time.
 * - **Voice.** A line ends in a full stop and carries no spaced dash.
 *
 * Read as text rather than imported, because `lib/icon-pages.ts` is TypeScript
 * and this runs in plain node — the same reason `check-categories.mjs` reads
 * its two files instead of importing them. That means the tail clauses are
 * spelled out twice, here and there, so both spellings are asserted to be
 * present in the source: reword one and this fails rather than measuring a
 * sentence the site stopped writing.
 */

import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const STYLES = ["stroke", "duotone", "fill"]
/* Where a snippet starts being cut off mid-clause. Mirrors SNIPPET_LIMIT in
   lib/icon-pages.ts. */
const SNIPPET_LIMIT = 160

const usageSrc = await readFile(join(ROOT, "lib", "icon-usage.json"), "utf8")
const USAGE = JSON.parse(usageSrc).usage
const pagesSrc = await readFile(join(ROOT, "lib", "icon-pages.ts"), "utf8")
const usageTs = await readFile(join(ROOT, "lib", "icon-usage.ts"), "utf8")

/* The limit lives in one place and is read from it, so raising it there is the
   only way to raise it. */
const USAGE_LIMIT = Number(usageTs.match(/USAGE_LIMIT\s*=\s*(\d+)/)?.[1])
if (!USAGE_LIMIT) {
  console.error(`  ${c(31, "NO LIMIT")}  USAGE_LIMIT not found in lib/icon-usage.ts`)
  process.exit(1)
}

/* The two tails `iconDescription` appends. Asserted against the source below. */
const tail = (styles) => ` On a 24×24 grid in ${styles}, free under MIT.`
const boxedTail = (container, styles) =>
  ` Boxed in a ${container}, in ${styles}, free under MIT.`

for (const literal of [
  "` On a 24×24 grid in ${styles}, free under MIT.`",
  "` Boxed in a ${icon.container}, in ${styles}, free under MIT.`",
]) {
  if (pagesSrc.includes(literal.slice(1, -1))) continue
  console.error(
    `  ${c(31, "DRIFT")}  lib/icon-pages.ts no longer writes ${literal}\n` +
      `  This script measures that wording. Update both together.`
  )
  process.exit(1)
}

const listOf = (items) =>
  items.length <= 1
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`

/* The same base resolution lib/icons.ts does, through the same exceptions file,
   so this counts the set the way the site does. */
const NOT_CONTAINERS = new Set(
  JSON.parse(
    await readFile(join(ROOT, "lib", "icon-not-containers.json"), "utf8")
  ).names
)

const byName = new Map()
for (const style of STYLES) {
  const dir = join(ROOT, "icons", style)
  for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg"))) {
    const name = file.slice(0, -4)
    if (!byName.has(name)) byName.set(name, new Set())
    byName.get(name).add(style)
  }
}

const names = new Set(byName.keys())
const containerOf = (name) => {
  if (NOT_CONTAINERS.has(name)) return "regular"
  const m = /^(square|circle)-(.+)$/.exec(name)
  return m && names.has(m[2]) ? m[1] : "regular"
}

const icons = [...byName.entries()]
  .map(([name, styles]) => {
    const container = containerOf(name)
    return {
      name,
      container,
      base: container === "regular" ? name : name.slice(container.length + 1),
      styles: STYLES.filter((s) => styles.has(s)),
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const bases = [...new Set(icons.map((i) => i.base))].sort()

let failed = false

const missing = bases.filter((b) => !USAGE[b])
if (missing.length) {
  failed = true
  console.error(`  ${c(31, "NO LINE")}  ${missing.join(", ")}`)
  console.error(
    `\n${missing.length} drawing(s) with no line in lib/icon-usage.json.\n` +
      `Each falls back to the old template, which is the same sentence on every\n` +
      `page. Write one line per base: what the drawing shows, and what it is for.`
  )
}

/* A line whose base is gone is dead copy, not a failure: it means a drawing was
   renamed or dropped, and the line is worth removing rather than worth a build
   break. */
const orphans = Object.keys(USAGE).filter((b) => !bases.includes(b))
if (orphans.length) {
  console.log(
    c(33, `  ${orphans.length} line(s) for drawings that no longer exist: ${orphans.join(", ")}`)
  )
}

const long = Object.entries(USAGE).filter(([, line]) => line.length > USAGE_LIMIT)
for (const [base, line] of long) {
  failed = true
  console.error(`  ${c(31, "TOO LONG")}  ${base} — ${line.length}/${USAGE_LIMIT}`)
}

/* The real thing a search result is cut from. */
for (const icon of icons) {
  const line = USAGE[icon.base]
  if (!line) continue
  const styles = listOf(icon.styles)
  const description =
    line +
    (icon.container === "regular"
      ? tail(styles)
      : boxedTail(icon.container, styles))

  if (description.length > SNIPPET_LIMIT) {
    failed = true
    console.error(
      `  ${c(31, "SNIPPET")}  ${icon.name} — ${description.length}/${SNIPPET_LIMIT}`
    )
  }
}

const seen = new Map()
for (const [base, line] of Object.entries(USAGE)) {
  const key = line.toLowerCase()
  if (seen.has(key)) {
    failed = true
    console.error(`  ${c(31, "DUPLICATE")}  ${seen.get(key)} and ${base} say the same thing`)
    continue
  }
  seen.set(key, base)
}

for (const [base, line] of Object.entries(USAGE)) {
  if (!line.endsWith(".")) {
    failed = true
    console.error(`  ${c(31, "NO STOP")}  ${base} — a line is a sentence and ends in one`)
  }
  if (/ [—–-] /.test(line)) {
    failed = true
    console.error(`  ${c(31, "DASH")}  ${base} — the house voice uses commas and colons`)
  }
}

if (failed) process.exit(1)

const longest = Math.max(...Object.values(USAGE).map((l) => l.length))
console.log(
  c(32, `${bases.length} drawings all have a line`) +
    c(90, `  (longest ${longest}/${USAGE_LIMIT}, ${icons.length} pages)`)
)
