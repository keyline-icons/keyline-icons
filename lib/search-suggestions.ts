import type { StyleArt } from "@/lib/icons"

/**
 * The names the search field offers, in the order it offers them.
 *
 * The placeholder used to state the size of the set. A number answers "how
 * many", which is not the question someone arrives with: they want to know
 * whether the thing they need is in here. A name answers that, and a few names
 * in turn answer it across more of the set than any single line could.
 *
 * Three rules for editing this list:
 *
 * - **Short.** The placeholder is one line inside a 12-unit-tall field, and it
 *   has to survive a 375px screen. Names here run to 12 characters; the set's
 *   longest is `circle-bar-chart-2-horizontal-start`, which would be cut off
 *   mid-word on a phone.
 * - **Ordinary.** These are examples of what the set covers, so they should be
 *   things anyone would think to search for. A name nobody would type teaches
 *   nothing about coverage.
 * - **Spread out.** One per shelf as far as possible, rather than five arrows.
 *   The list is a sample of the library, and a sample from one corner of it
 *   reads as a library with one corner.
 *
 * The first entry is what the server renders and what anyone with reduced
 * motion sees for the whole visit, so it carries the most weight. `bell` is
 * the plainest thing in the set.
 *
 * Named `*_ICON_NAMES` deliberately: `pipeline/check-demos.mjs` finds every
 * `export const <NAME>_ICON_NAMES = [...] as const` under `lib/` and fails the
 * build if any of them names an icon that is not on disk. A renamed drawing
 * would otherwise leave a suggestion here that finds nothing when typed, which
 * is worse than no suggestion at all and would be caught by nobody.
 */
export const SEARCH_SUGGESTION_ICON_NAMES = [
  "bell",
  "calendar",
  "arrow-right",
  "user",
  "bin",
  "circle-check",
  "credit-card",
  "settings",
] as const

/**
 * Those names matched to their drawings, for the field that shows the icon it
 * is spelling.
 *
 * Both search fields call this — the browser's hero and the landing page's —
 * because both have the set in hand and neither should be writing the same
 * `find` twice. The parameter is structural rather than `Icon` or `BrowserIcon`
 * so that this file, which is otherwise a list of strings, does not have to
 * import either.
 *
 * Stroke, because it is the one style every icon is drawn in, and because a
 * search field is chrome: it wears the site's own keyline rather than whatever
 * weight the grid happens to be set to.
 *
 * A name with nothing behind it is dropped rather than drawn as a hole. That
 * should be unreachable — `pipeline/check-demos.mjs` fails the build on a
 * suggestion that names no icon — so this is the belt to that check's braces.
 */
export function searchSuggestions(
  icons: readonly { name: string; art: { stroke?: StyleArt } }[]
): { name: string; art: StyleArt }[] {
  return SEARCH_SUGGESTION_ICON_NAMES.map((name) => {
    const art = icons.find((icon) => icon.name === name)?.art.stroke
    return art ? { name, art } : null
  }).filter((entry) => entry !== null)
}
