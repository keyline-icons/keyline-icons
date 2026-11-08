import {
  artOf,
  CONTAINERS,
  type BrowserIcon,
  type Container,
  type Corners,
  type Style,
} from "@/components/glyph"
import type { Sort } from "@/lib/browser-settings"
import { GRID_PAGE_SIZE } from "@/lib/icon-pages"
import { aliasesFor, iconNamedElsewhere } from "@/lib/icon-taxonomy"

/*
  How the grid finds and orders drawings, in a module both halves can import.

  It lived in `components/icon-browser.tsx` until the page had to know which
  120 drawings a URL opens on. That file is a client module and a server
  component cannot call a function out of one, so the choice was this or a
  second copy of the filter on the server, and a copy that drifted would leave
  tiles blank for whoever landed on the difference.

  `pipeline/check-search.mjs` reads this file as text, which is why the helpers
  it lifts are plain `const`s with the exports gathered at the bottom.
*/

/**
 * Grid order: by base name, then by container.
 *
 * Plain `name` order was what this was, and it files a containered name under
 * its prefix — every `circle-` drawing in the set sat in one block under C,
 * away from the drawing it is a boxed copy of. The rest of the set does not
 * read that way: the icon page's container row, the Figma catalogue's cards and
 * the Paper boards all put `dollar-sign` and `circle-dollar-sign` side by side,
 * which is also the order someone scanning for a shape wants, since the two are
 * the same drawing.
 */
const byName = (a: BrowserIcon, b: BrowserIcon) =>
  a.base === b.base
    ? CONTAINERS.indexOf(a.container) - CONTAINERS.indexOf(b.container)
    : a.base.localeCompare(b.base)

/**
 * Whether the query is another set's name for this drawing.
 *
 * Matched on the drawing as well as on its base. The base alone could never
 * land on a containered drawing, because the base of `circle-check` is `check`:
 * `check-circle-2`, another set's name for exactly that drawing, found nothing
 * here while the packages answered it. The base still counts, so a name that
 * points at `message` brings the boxed copies along as it always did.
 */
const namedBy = (icon: BrowserIcon, query: string) => {
  const named = iconNamedElsewhere(query)
  return named === icon.name || named === icon.base
}

/**
 * How far ahead of grid order a search puts a drawing: the one the query
 * names, then the one another set's name for it points at, then the rest.
 *
 * Grid order alone is right for browsing and was wrong for a name. `x` opened
 * on `airpods-open`, `user` on `at` and `trash-2` behind every alphabetically
 * earlier drawing carrying the word, because the grid never ranked a result,
 * it only filtered one. The MCP server, the CLI and the Figma plugin rank the
 * same two tiers first, so a name typed into any of the four leads with the
 * same drawing; pipeline/check-search.mjs runs the names shadcn/create uses
 * through all four to keep it that way.
 *
 * Below those two, the drawings whose name carries the query come next, as
 * the Figma plugin orders them, the other surface that matches inside words:
 * the name starting with it, then the query at a word boundary, then inside a
 * word, and only then the drawings that answer through a keyword alone. Until
 * 6 Oct 2026 the site lifted the first two tiles and sorted everything else by
 * name, and the twelve long arrows of 1.8.0 went missing under `move`: 184
 * drawings answer it through `remove` and the arrows' own keyword, and
 * `move-right` sat in the middle of them, behind `alarm-clock-minus`. The base
 * is read as well as the name, so `circle-arrow-down` stays beside
 * `arrow-down` under a search for it, as it does in grid order.
 */
const leadOf = (icon: BrowserIcon, query: string) => {
  const q = query.trim().toLowerCase()
  if (icon.name === q) return 0
  if (icon.name === iconNamedElsewhere(q)) return 1
  const tier = (name: string) => {
    const i = q ? name.indexOf(q) : -1
    return i === -1 ? 5 : i === 0 ? 2 : name[i - 1] === "-" ? 3 : 4
  }
  return Math.min(tier(icon.name), tier(icon.base))
}

/**
 * When a drawing landed, as a number to sort on. Parsed rather than compared as
 * text, because the stamps carry the committer's offset and two strings in
 * different zones do not sort as the instants they name. A drawing with no
 * history has never been committed, which makes it the newest there is.
 */
const addedAt = (icon: BrowserIcon) =>
  icon.history ? Date.parse(icon.history.added) : Infinity

/**
 * Newest first, and name order inside one landing.
 *
 * A batch arrives in one commit, so thirty drawings share a stamp to the
 * second, and the tie needs an order a reader can follow. Name order is the
 * one they already know from the default grid.
 */
const byNewest = (a: BrowserIcon, b: BrowserIcon) =>
  addedAt(b) - addedAt(a) || byName(a, b)

const SORT_ORDER: Record<Sort, (a: BrowserIcon, b: BrowserIcon) => number> = {
  name: byName,
  newest: byNewest,
}

/**
 * Grid order under a search: tier by tier, then the chosen order within each.
 *
 * The tiers still lead under newest. A search for `x` is asking for `x`, and
 * the drawing it names belongs first whatever order the rest is in; below it,
 * the newest arrow among the arrows is the answer the order was picked for.
 *
 * It takes the comparator rather than the `Sort` key, with name order as the
 * default, because pipeline/check-search.mjs lifts this out as text and runs
 * it untyped: a parameter it can call without `SORT_ORDER` keeps the check
 * asking the same question it did, which is what a search leads with.
 */
const bySearch =
  (query: string, order = byName) =>
  (a: BrowserIcon, b: BrowserIcon) =>
    leadOf(a, query) - leadOf(b, query) || order(a, b)

/**
 * A word reduced to its singular, so a plural finds the family.
 *
 * Every name in the set is singular: `arrow-down`, `file`, `bar-chart`. Every
 * heading on the site's category rail is plural. So "Arrows" sat on the screen
 * while typing `arrows` returned one drawing out of 585, `git-compare-arrows`,
 * the only name carrying the letter. `charts`, `stars` and `bells` returned
 * nothing at all. The plural is what someone reads off our own sidebar and
 * what every other set answers, and here it was the one word that could not
 * work.
 *
 * Applied to both sides, the query word and each word of the haystack, which
 * also carries the other direction: `chevron` reaches `chevrons-left`, which
 * whole words alone could not.
 *
 * Deliberately blunt: no dictionary, no suffix ladder, one `s`. The guards are
 * the whole design, and they are read off this vocabulary rather than guessed.
 * Every `-ss`, `-us` and `-is` word in it is already a word: `progress`,
 * `compass`, `plus`, `minus`, `status`, `axis`. Past those, `lens`, `atlas`
 * and `sideways` are the only three that end in `s` without being a plural.
 * `lens` is the one that mattered. Cut to `len` it lands inside `calendar` and
 * `silence`, and the word someone types for the camera came back with
 * seventeen drawings that are not it.
 *
 * `arrows` is in the list for the opposite reason. The rule would not damage
 * it, it would erase it: the plural asks for the drawings carrying more than
 * one arrowhead, `fullscreen`, `chevrons-up-down`, `refresh-cw`, and folding it
 * into `arrow` answers with the ninety-nine single arrows instead. The word is
 * a keyword on those drawings, in lib/icon-aliases.json, and this is what keeps
 * the two questions apart.
 *
 * Same rule as the MCP server, the CLI and the Figma plugin, checked by
 * pipeline/check-search.mjs.
 */
const singular = (w: string) =>
  w.length < 4 ||
  !w.endsWith("s") ||
  /(ss|us|is|arrows|lens|atlas|sideways)$/.test(w)
    ? w
    : w.endsWith("ies")
      ? `${w.slice(0, -3)}y`
      : /(ch|sh|x|z)es$/.test(w)
        ? w.slice(0, -2)
        : w.slice(0, -1)

/** Every word in `hay` singular, delimiters kept so the words stay separate. */
const stemmed = (hay: string) => hay.replace(/[a-z0-9]+/g, singular)

/**
 * A word that answers only to itself, never to a piece of itself.
 *
 * The grid matches substrings, because someone typing `arro` has not finished
 * the word yet, and that is exactly what would hand `arrows` to `arrow` too.
 * The plural is a different question here, so the token is cut out of the
 * haystack unless the query asked for it whole. Nothing else in the vocabulary
 * wants this: `users` answers to `user` through the singular rule, which is
 * what the singular rule is for.
 *
 * The packages need no equivalent. They match whole words already, so `arrow`
 * cannot reach `arrows` there in the first place.
 *
 * Same rule as the Figma plugin, the other surface that matches substrings.
 */
const CONCEPTS = /(^|[ -])(arrows)(?=$|[ -])/g

/**
 * Whether one icon's haystack answers every word of a query.
 *
 * The raw word first, so nothing that matched before stops matching. The
 * singular pass is the fallback, and it reads the haystack through the same
 * rule, so the two forms meet in the middle whichever side carried the `s`.
 */
const answers = (haystack: string, words: string[]) => {
  const hay = haystack.replace(CONCEPTS, (m, lead, word) =>
    words.includes(word) ? m : lead
  )
  const stem = stemmed(hay)
  return words.every((w) => hay.includes(w) || stem.includes(singular(w)))
}

/**
 * Split a query into the words it is actually asking for.
 *
 * Names on disk are kebab-case, so a raw substring test made "arrow up right"
 * find nothing while "arrow-up-right" found the icon: the space is the one
 * separator nobody types the file name with. Every run of non-alphanumerics is
 * a separator here, so spaces, dashes and underscores are all the same thing.
 *
 * **A camelCase boundary is a separator too**, and it is the one this missed.
 * Lowercasing first left `CheckCircle2` as `checkcircle2`, a single token with
 * no separator in it, matching nothing at all. "check-circle" and "check circle"
 * both worked, which is what made this look fixed: the form that fails is the
 * one someone pastes out of their editor rather than types, and it is the most
 * likely thing a person migrating from another set puts in the box.
 *
 * So the case boundary is read before the lowercasing, and a leftover bare digit
 * is dropped, because another set's trailing `2` disambiguates inside that
 * set and means nothing here. Two shapes count as an identifier: a camelCase boundary,
 * and a single capitalised word ending in digits. The second was missing, so
 * `Share2` stayed one word and matched nothing while `share` sat in the set.
 *
 * Still guarded, because `clock-3`, `dice-5` and `bar-chart-2` are real names.
 * A lowercase query keeps its digits and can still reach them.
 *
 * A trailing `Icon` comes off first, with the digits in front of it. A month of
 * empty searches carried `Globe02Icon`, `CheckmarkCircle02Icon`, `FileCodeIcon`
 * and `SparklesIcon`: names pasted out of a set that suffixes every export, and
 * not one of them found the drawing it named. The first shape has no case
 * boundary at all, `e0` and `2I`, so it was never an identifier here and kept
 * its digits; the others split into a word list ending in `icon`, which nothing
 * carries. The suffix is the third identifier shape, and the strip runs before
 * the split so the digits never become a word to drop.
 *
 * Same rule as `wordsOf` in the MCP server, the CLI and the Figma plugin. Four
 * surfaces, one behaviour, and this was the last of them to get it.
 */
const terms = (query: string) => {
  const identifier =
    /[a-z][A-Z]/.test(query) ||
    /^[A-Z][A-Za-z]*\d+$/.test(query) ||
    /^[A-Z][A-Za-z]*\d*Icon$/.test(query)
  const split = identifier
    ? query
        .replace(/\d*Icon$/, "")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    : query
  return split
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !(identifier && /^\d+$/.test(w)))
}

/**
 * Whether one drawing answers a search: named by it outright, or every word
 * landing somewhere in its name and aliases.
 */
const answersQuery = (i: BrowserIcon, query: string, words: string[]) =>
  namedBy(i, query) || answers([i.name, ...aliasesFor(i.base)].join(" "), words)

/** The order a grid of results is laid out in. */
const gridOrder = (query: string, sort: Sort) =>
  bySearch(query, SORT_ORDER[sort])

/**
 * The drawings an address opens on, worked out on the server so the page can
 * carry those and nothing else.
 *
 * The same steps as the grid's `matches`, `shown`, `ordered` and `paged`, in
 * that order. The category is left out because no address can name one: it
 * always starts on all of them.
 */
export function iconsOnScreen(
  icons: BrowserIcon[],
  view: {
    query: string
    style: Style
    shape: Container | "all"
    corners: Corners
    sort: Sort
    page: number
  }
) {
  const { query, style, shape, corners, sort, page } = view
  const words = terms(query)
  const ordered = icons
    .filter(
      (icon) =>
        artOf(icon, style, corners) &&
        answersQuery(icon, query, words) &&
        (shape === "all" || icon.container === shape)
    )
    .sort(gridOrder(query, sort))
  const last = Math.max(1, Math.ceil(ordered.length / GRID_PAGE_SIZE))
  const current = Math.min(page, last)
  return ordered.slice((current - 1) * GRID_PAGE_SIZE, current * GRID_PAGE_SIZE)
}

/** Words from multi-word aliases that nobody is trying to find an icon by. */
const FILLER = new Set(["and", "the", "for", "with", "from", "into", "that"])

/** Each icon's searchable text and the words in it, built once per page. */
const searchIndex = (icons: readonly Pick<BrowserIcon, "name" | "base">[]) =>
  icons.map((icon) => {
    const text = [icon.name, ...aliasesFor(icon.base)].join(" ")
    return {
      text,
      words: [...new Set(text.split(/[^a-z0-9]+/))],
      named: new Set(icon.name.split("-")),
    }
  })

/**
 * The letters that finish the word being typed: `ball` after `foot`.
 *
 * One completion, drawn in gray inside the field, because the grid under it
 * already shows the matches as they narrow. What it adds is the vocabulary: the
 * words a drawing answers to that are not in its name.
 *
 * A word from a drawing's own name beats an alias, since it is the one that
 * leads the grid, and then the word with the most drawings wins. Earlier words
 * narrow it, so `arrow u` can only become what an arrow can be. A word already whole that
 * answers more drawings than anything longer gets nothing: `arrow` should not
 * keep offering an `s`.
 */
const completionFor = (
  index: ReturnType<typeof searchIndex>,
  query: string
) => {
  const words = terms(query)
  const partial = words.at(-1)
  const earlier = words.slice(0, -1)
  // One letter is enough once earlier words have narrowed it to a few drawings.
  const shortest = earlier.length > 0 ? 1 : 2
  // It has to end on the word, or the letters would print after a space.
  if (
    !partial ||
    partial.length < shortest ||
    !query.toLowerCase().endsWith(partial)
  ) {
    return ""
  }

  let whole = 0
  const counts = new Map<string, number>()
  const inNames = new Set<string>()
  for (const { text, words: own, named } of index) {
    if (earlier.length > 0 && !answers(text, earlier)) continue
    for (const word of own) {
      if (word === partial) whole += 1
      else if (
        word.startsWith(partial) &&
        !earlier.includes(word) &&
        !FILLER.has(word)
      ) {
        counts.set(word, (counts.get(word) ?? 0) + 1)
        if (named.has(word)) inNames.add(word)
      }
    }
  }

  const [best, most] = [...counts].sort(
    ([a, x], [b, y]) =>
      Number(inNames.has(b)) - Number(inNames.has(a)) ||
      y - x ||
      a.localeCompare(b)
  )[0] ?? ["", 0]
  return most >= whole ? best.slice(partial.length) : ""
}

export { answers, answersQuery, completionFor, gridOrder, searchIndex, terms }
