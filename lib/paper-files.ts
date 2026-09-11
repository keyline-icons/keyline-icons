import { CATEGORIES, categoryOf } from "@/lib/icon-taxonomy"
import { SET_PAPER_FILES } from "@/lib/site-chrome"

/**
 * Which paper.design file holds which shelf, and what to call each file.
 *
 * `SET_PAPER_FILES` says where the files are and where each one starts; this
 * turns that into the two answers the site needs — the shelves a file holds,
 * for the menu's label, and the file a given drawing is in, for the icon page's
 * button. Kept out of `site-chrome.ts` so that module stays a table of
 * addresses with no imports of its own.
 *
 * **Alphabetical, because that is the order the boards were written in.**
 * `pipeline/build-paper.mjs` sorts a copy of `CATEGORIES` by label and never
 * the array itself, whose order is resolution order rather than presentation
 * order, and the import walks the sheets in that sorted order. A file's range
 * is therefore a contiguous run of that sort, which is what lets `from` alone
 * describe it.
 */
const SHELVES = [...CATEGORIES]
  .map((c) => c.label)
  .sort((a, b) => a.localeCompare(b))

export type PaperFile = {
  url: string
  /** The shelves this file holds, alphabetically. */
  shelves: string[]
  /** "Actions to Git", or the one shelf's name where a file holds one. */
  label: string
}

/**
 * The files, each carrying the shelves that fall in its range.
 *
 * A shelf belongs to the last file whose `from` it sorts at or after, so a
 * category added to `icon-taxonomy.ts` lands in a file without anything here
 * being edited. It also means the first file's `from` is a formality: anything
 * sorting before it still falls to the first file rather than off the end.
 */
export const PAPER_FILES: PaperFile[] = SET_PAPER_FILES.map((file, i, all) => {
  const next = all[i + 1]?.from
  const shelves = SHELVES.filter(
    (shelf) =>
      (i === 0 || shelf.localeCompare(file.from) >= 0) &&
      (!next || shelf.localeCompare(next) < 0)
  )
  return {
    url: file.url,
    shelves,
    label:
      shelves.length > 1
        ? `${shelves[0]} to ${shelves[shelves.length - 1]}`
        : (shelves[0] ?? file.from),
  }
})

/** The file holding one shelf, falling back to the first where none matches. */
export function paperFileForCategory(category: string): PaperFile {
  return PAPER_FILES.find((f) => f.shelves.includes(category)) ?? PAPER_FILES[0]
}

/**
 * The file holding one drawing, resolved from its name through the same
 * category table the browser's rail is built from.
 *
 * An icon whose name matches no shelf cannot reach a board at all — the Paper
 * build fails by name rather than filing it anywhere — so the fallback here is
 * only ever reached by a drawing that is not in Paper yet, and the first file
 * is the right place to send someone looking for one.
 */
export function paperFileForIcon(base: string): PaperFile {
  return paperFileForCategory(categoryOf(base))
}
