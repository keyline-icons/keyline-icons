#!/usr/bin/env node
/**
 * Verify every featured example holds together before it ships.
 *
 *   node pipeline/check-featured.mjs
 *
 * `lib/featured.ts` is hand-kept: an accepted submission means saving an image
 * under `public/featured/`, importing it, and typing an entry beside the
 * others. Three things that have to agree, edited by a person, on the surface
 * of the site with the least traffic to notice a break. TypeScript checks the
 * half it can see, that every entry's `image` is a real import of a real file.
 * This checks the half it cannot:
 *
 * - Every entry's image filename is its `slug`, so `public/featured/` stays
 *   navigable by eye and a card can be traced to its file without reading the
 *   imports. Avatars are exempt: they are named for the poster, not the entry,
 *   because one person can be featured twice and has one face either way.
 * - Every file in `public/featured/` is imported by some entry. An orphan is
 *   dead weight in every clone, and nothing else would ever mention it again.
 * - `added` parses as a real `YYYY-MM-DD` date, because the gallery sorts by
 *   comparing these as strings and a malformed one sorts arbitrarily rather
 *   than failing.
 * - `url` is https or a site path. An http entry would be the one mixed-content
 *   link on the site.
 * - `post` is an https x.com link, and present. It is the provenance and the
 *   permission at once, so an entry without one is an entry nobody can check.
 * - `avatar` is imported from `public/featured/avatars/`, so faces stay in one
 *   folder rather than mixed in with the screenshots.
 * - Slugs are kebab-case and unique, since the slug is the card's React key.
 *
 * It reads `lib/featured.ts` as text rather than importing it, the same reason
 * `check-usage.mjs` reads `lib/icon-pages.ts`: the file is TypeScript and this
 * runs in plain node. The line scanner leans on the entries being formatted the
 * way Prettier leaves them, one field per line, which the repo already
 * guarantees.
 *
 * An empty list is a pass with a yellow note, not a failure. The page ships
 * with nothing in it on purpose, and the day a real entry lands is the day
 * this check starts earning its place in `icons:ci`.
 */

import { readdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const FEATURED_TS = join(ROOT, "lib", "featured.ts")
const IMAGES_DIR = join(ROOT, "public", "featured")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const source = await readFile(FEATURED_TS, "utf8")

/*
  The imports: variable name to filename. Every entry's `image:` must name one
  of these variables, and every file on disk must be named by one of them.
*/
const imports = new Map()
for (const m of source.matchAll(
  /^import (\w+) from "@\/public\/featured\/([^"]+)"$/gm
)) {
  imports.set(m[1], m[2])
}

/*
  The entries, by line scanner: a `slug:` line opens an entry and every field
  line until the next one belongs to it. Blind to nesting, which is fine while
  entries hold no nested objects, and wrong the day one does, at which point
  this check fails loudly on the entry rather than passing quietly, because the
  fields it expects will be missing.
*/
const entries = []
let entry = null
for (const line of source.split("\n")) {
  const slug = line.match(/^\s*slug: "([^"]+)"/)
  if (slug) {
    entry = { slug: slug[1] }
    entries.push(entry)
    continue
  }
  if (!entry) continue
  const field = line.match(/^\s*(url|post|added|image|avatar): (.+?),?$/)
  if (field) entry[field[1]] = field[2].replace(/^"|"$/g, "")
}

const problems = []
const seen = new Set()

for (const e of entries) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) {
    problems.push({
      kind: "BADSLUG",
      slug: e.slug,
      why: "slugs are kebab-case: they name the image file and the card",
    })
  }
  if (seen.has(e.slug)) {
    problems.push({
      kind: "DUPSLUG",
      slug: e.slug,
      why: "already used above, and the slug is the card's React key",
    })
  }
  seen.add(e.slug)

  if (
    !e.added ||
    !/^\d{4}-\d{2}-\d{2}$/.test(e.added) ||
    Number.isNaN(Date.parse(e.added))
  ) {
    problems.push({
      kind: "BADDATE",
      slug: e.slug,
      why: `added is ${e.added ? `"${e.added}"` : "missing"}, and the gallery sorts these as strings`,
    })
  }

  if (e.url && !e.url.startsWith("https://") && !e.url.startsWith("/")) {
    problems.push({
      kind: "BADURL",
      slug: e.slug,
      why: `"${e.url}" is neither https nor a site path`,
    })
  }

  if (!e.post) {
    problems.push({
      kind: "NOPOST",
      slug: e.slug,
      why: "no post: the link back to X is the provenance and the permission",
    })
  } else if (!/^https:\/\/x\.com\//.test(e.post)) {
    problems.push({
      kind: "BADPOST",
      slug: e.slug,
      why: `"${e.post}" is not an https x.com link`,
    })
  }

  if (e.avatar) {
    const face = imports.get(e.avatar)
    if (!face) {
      problems.push({
        kind: "NOFACE",
        slug: e.slug,
        why: `avatar is ${e.avatar}, which matches no featured import`,
      })
    } else if (!face.startsWith("avatars/")) {
      problems.push({
        kind: "MISFILED",
        slug: e.slug,
        why: `its avatar is ${face}: faces belong in public/featured/avatars/`,
      })
    }
  }

  const file = imports.get(e.image)
  if (!file) {
    problems.push({
      kind: "NOIMAGE",
      slug: e.slug,
      why: `image is ${e.image ?? "missing"}, which matches no featured import`,
    })
  } else if (file.replace(/\.[a-z]+$/, "") !== e.slug) {
    problems.push({
      kind: "MISFILED",
      slug: e.slug,
      why: `its image is ${file}: the filename is the slug, so the folder stays traceable`,
    })
  }
}

/*
  Imports and disk, both directions.

  Read as two levels, not one. Avatars live in `public/featured/avatars/`, and a
  flat `readdir` returns that folder as an entry: it matches no import, so the
  orphan pass below reported the whole directory as a stray file every run.
  Directory entries are dropped and their contents listed with the prefix the
  imports actually carry.
*/
const listFiles = async (dir, prefix = "") => {
  if (!existsSync(dir)) return []
  const found = []
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.name.startsWith(".")) continue
    if (item.isDirectory()) {
      found.push(...(await listFiles(join(dir, item.name), `${prefix}${item.name}/`))) 
    } else {
      found.push(`${prefix}${item.name}`)
    }
  }
  return found
}

const onDisk = await listFiles(IMAGES_DIR)
for (const [name, file] of imports) {
  if (!onDisk.includes(file)) {
    problems.push({
      kind: "NOFILE",
      slug: name,
      why: `imports public/featured/${file}, which is not on disk`,
    })
  }
}
const imported = new Set(imports.values())
for (const file of onDisk) {
  if (!imported.has(file)) {
    console.log(
      c(
        33,
        `  ORPHAN   public/featured/${file} is imported by no entry: delete it or feature it`
      )
    )
  }
}

if (problems.length) {
  for (const p of problems) {
    console.error(`  ${c(31, p.kind.padEnd(8))} ${p.slug}  ${p.why}`)
  }
  console.error(
    `\n${problems.length} broken featured entr${problems.length === 1 ? "y" : "ies"} across ${entries.length}.`
  )
  console.error("Fix lib/featured.ts and public/featured/ so the two agree.")
  process.exit(1)
}

if (entries.length === 0) {
  console.log(
    c(33, "No featured examples yet. lib/featured.ts is deliberately empty.")
  )
} else {
  console.log(
    c(
      32,
      `Featured entries all resolve (${entries.length} entries, ${onDisk.length} images)`
    )
  )
}
