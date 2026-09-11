/**
 * Which paper.design file each board belongs in.
 *
 * The set outgrew one Paper file. The ceiling is on the *file* rather than on a
 * page — on 10 Sep 2026 a bloated Changelog page made every call against the
 * other page answer with "Your file is too large", reads included — so the
 * boards are split across two files, and both the import and the check have to
 * know which file to open before they can look for a board.
 *
 * Parsed out of `lib/site-chrome.ts` rather than kept here, the same call
 * `build-paper.mjs` makes about the category table: the site has to hold these
 * URLs anyway, so a second copy would be a second thing to keep in step, and
 * the one that drifts is the copy nobody clicks.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * The files, in order, as `{ id, url, from }`.
 *
 * The guard is the URL count: every entry declares a `url`, so an entry this
 * parse half-reads shows as a pair count short, and the caller stops. Without
 * it a file whose `from` moved onto its own line would silently take no boards
 * at all, which looks like an empty file rather than a broken read.
 */
export async function paperFiles(root) {
  const src = await readFile(join(root, "lib", "site-chrome.ts"), "utf8")
  const start = src.indexOf("export const SET_PAPER_FILES")
  if (start < 0) throw new Error("lib/site-chrome.ts: no SET_PAPER_FILES export")
  const block = src
    .slice(start, src.indexOf("\n]", start))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    /* Whole-line comments only. The `//` in `https://` is not a comment, and a
       stripper that does not say so takes every URL here down to `https:`. */
    .replace(/^\s*\/\/[^\n]*$/gm, "")

  const urls = [...block.matchAll(/url:\s*"([^"]+)"/g)].length
  const files = [
    ...block.matchAll(/url:\s*"([^"]+)",\s*from:\s*"([^"]+)"/g),
  ].map(([, url, from]) => ({ id: /\/file\/([^/?#]+)/.exec(url)?.[1], url, from }))

  if (!files.length || files.length !== urls) {
    throw new Error(
      `lib/site-chrome.ts: read ${files.length} of ${urls} Paper files. ` +
        `An entry's "from" has moved off its url's line; fix this parse rather ` +
        `than letting a file quietly take no boards.`
    )
  }
  const missing = files.find((f) => !f.id)
  if (missing) throw new Error(`not a Paper file URL: ${missing.url}`)
  return files
}

/**
 * Board name to file id, for every board in the manifest.
 *
 * A category board belongs to the last file whose `from` its shelf sorts at or
 * after, matching `lib/paper-files.ts` so the site's link and the importer's
 * write always name the same file. The first file's `from` is a formality: a
 * shelf sorting before it still falls to the first file rather than off the
 * end.
 *
 * **A surface is not a shelf.** The Catalog surface and the Changelog have no
 * category and sort nowhere in particular, so they are placed rather than
 * ranged: they go in the first file, which is the one a bare link opens and the
 * one the site calls "the Paper file".
 */
export function boardFiles(files, manifest) {
  const out = new Map()
  for (const sheet of manifest.sheets) {
    if (out.has(sheet.artboard)) continue
    if (!sheet.category) {
      out.set(sheet.artboard, files[0])
      continue
    }
    let file = files[0]
    for (const candidate of files) {
      if (sheet.category.localeCompare(candidate.from) >= 0) file = candidate
    }
    out.set(sheet.artboard, file)
  }
  return out
}
