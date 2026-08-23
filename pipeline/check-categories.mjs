#!/usr/bin/env node
/**
 * Verify every category label has an icon to draw it with.
 *
 *   node pipeline/check-categories.mjs
 *
 * The rail in `components/icon-browser.tsx` maps `CATEGORIES` into rows before
 * it filters out the empty ones, so a label with no entry in `CATEGORY_ICONS`
 * becomes `<undefined />` and React refuses to render the whole browser. Not a
 * missing row in the rail: a 500 on /icons.
 *
 * That is what `Sport` did. It arrived with the twenty-five icon batch, matched
 * `trophy` and `award`, got a count, and had no icon. The comment above
 * `CATEGORY_ICONS` had described this exact failure in advance and nothing
 * enforced it.
 *
 * `next build` does not catch it. /icons is a dynamic route, so it compiles
 * clean and fails at request time, which means the first person to find out is
 * whoever opens the page after a deploy.
 *
 * Read as text rather than imported, because both files are TypeScript with JSX
 * and this runs in plain node, the same reason `check-search.mjs` reads its four
 * searches instead of importing them.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const taxonomy = await readFile(join(ROOT, "lib", "icon-taxonomy.ts"), "utf8")
const browser = await readFile(join(ROOT, "components", "icon-browser.tsx"), "utf8")

/* Every `label:` in the CATEGORIES array, plus the catch-all, which is keyed by
   a constant rather than written out. */
const labels = [...taxonomy.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1])
const other = taxonomy.match(/OTHER_CATEGORY\s*=\s*"([^"]+)"/)?.[1]

const start = browser.indexOf("const CATEGORY_ICONS")
const end = browser.indexOf("const ALL_ICON")
if (start === -1 || end === -1) {
  console.error(
    `  ${c(31, "MISSING")}  no CATEGORY_ICONS block in components/icon-browser.tsx.\n` +
      `    Either it was renamed, in which case update this file, or the rail no\n` +
      `    longer works this way and this check has stopped checking anything.`
  )
  process.exit(1)
}
const block = browser.slice(start, end)

/* Keys are written one per line at two spaces of indent. The catch-all is
   `[OTHER_CATEGORY]:` and is matched by name instead. */
const mapped = new Set([...block.matchAll(/^ {2}([A-Za-z][A-Za-z0-9]*):/gm)].map((m) => m[1]))
if (other && /\[OTHER_CATEGORY\]:/.test(block)) mapped.add(other)

const missing = labels.filter((l) => !mapped.has(l))
/* `other` is keyed by constant rather than written as a `label:`, so it is
   never in `labels` and must not be reported as unused. */
const extra = [...mapped].filter((k) => k !== other && !labels.includes(k))

if (missing.length) {
  console.error(`  ${c(31, "NO ICON")}  ${missing.join(", ")}`)
  console.error(
    `\n${missing.length} category label(s) with no row in CATEGORY_ICONS.\n` +
      `The rail renders <undefined /> for these and /icons returns 500.\n` +
      `Add a row in components/icon-browser.tsx, importing the glyph from\n` +
      `@/components/icons.`
  )
  process.exit(1)
}

/* An extra row is harmless at runtime and still worth saying: it means a
   category was renamed or removed and its icon was left behind. */
if (extra.length) {
  console.log(c(33, `  ${extra.length} unused row(s) in CATEGORY_ICONS: ${extra.join(", ")}`))
}

console.log(c(32, `${labels.length} category labels all have an icon`))
