/**
 * The per-icon page: its address, the icons it links out to, and the words it
 * says about itself.
 *
 * These live apart from the route because three surfaces need them and only one
 * of them is the route: the sitemap has to name every icon URL, the preview dock
 * has to link to one, and `generateMetadata` has to write a description that
 * matches what the page visibly says. A second spelling of `/icons/<name>` in
 * any of those is how a sitemap ends up listing URLs the nav never points at.
 *
 * Typed against `BrowserIcon` rather than `lib/icons.ts`'s `Icon`, which is the
 * same shape plus a `node:fs` import at the top of its module. The dock is a
 * client component and cannot pull that in even for a type.
 */
import type { BrowserIcon, Style } from "@/components/glyph"
import { STYLES } from "@/components/glyph"
import { componentName, importPath } from "@/lib/icon-code"
import { aliasesFor, categoryOf } from "@/lib/icon-taxonomy"
import { usageOf } from "@/lib/icon-usage"
import { SET_TITLE } from "@/lib/site-chrome"

/** The segment every icon page hangs off. Written once, read by the sitemap. */
export const ICONS_SEGMENT = "/icons"

export const iconHref = (name: string) => `${ICONS_SEGMENT}/${name}`

/**
 * Tiles per page of the grid at `/icons`. Here rather than in the browser
 * because the server reads `?page=` against it and the sitemap lists the pages
 * it makes, and neither can import a client component.
 */
export const GRID_PAGE_SIZE = 120

/**
 * The two drawings the dock shows its choices on: the star for the style, a
 * plain square for the corners. Here for the reason the page size is: the
 * server sends both with the page, whatever page it is, so the dock has them
 * on first paint. Left to the rest of the set, which loads after the page,
 * they appeared a moment late on every visit where they were not on screen.
 */
export const DOCK_SAMPLES = { style: "star", corners: "square" } as const

/** How many pages the unfiltered grid has, for a set of `total` icons. */
export const gridPageCount = (total: number) =>
  Math.max(1, Math.ceil(total / GRID_PAGE_SIZE))

/**
 * The address of one page of the unfiltered grid. Page 1 is the bare
 * `/icons`, never `?page=1`, so the first page has one address and not two.
 */
export const gridPageHref = (page: number) =>
  page > 1 ? `${ICONS_SEGMENT}?page=${page}` : ICONS_SEGMENT

/** The styles this drawing actually has, in weight order. */
export const stylesOf = (icon: Pick<BrowserIcon, "art">): Style[] =>
  STYLES.filter((style) => icon.art[style])

/**
 * "stroke, duotone and fill" — an Oxford-less list, because it is read as
 * prose in the description and in the page's own lead paragraph.
 */
export function listOf(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`
}

/**
 * The same list under a negation, where "and" is simply wrong: "there is no
 * duotone and fill drawing" says one thing that is both, rather than two things
 * that are missing.
 */
export function norListOf(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? ""
  return `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`
}

/**
 * The same drawing in its other containers, in `regular, square, circle` order.
 *
 * Container variants are the one relationship that is not a suggestion: they
 * are the *same* icon boxed differently, so they get their own row on the page
 * rather than being mixed into the related grid. Returns the whole family
 * including the icon itself, because the row marks the current one.
 */
const CONTAINER_ORDER = ["regular", "square", "circle"] as const

export function containerFamily(icon: BrowserIcon, all: BrowserIcon[]) {
  return all
    .filter((candidate) => candidate.base === icon.base)
    .sort(
      (a, b) =>
        CONTAINER_ORDER.indexOf(a.container) -
        CONTAINER_ORDER.indexOf(b.container)
    )
}

/**
 * What the related grid is worked out from, once per icon list.
 *
 * Word weights are counted over drawings (bases), not names, so that the
 * hundred-odd `circle-` and `square-` containers do not make "circle" look
 * common to every name that genuinely starts with it.
 */
type RelatedIndex = {
  bases: string[]
  /** base -> its variants, one per container. */
  variants: Map<string, BrowserIcon[]>
  nameWords: Map<string, Set<string>>
  searchWords: Map<string, Set<string>>
  /** How rare a word is: ln(drawings / drawings using it). */
  nameWeight: Map<string, number>
  searchWeight: Map<string, number>
}

const relatedIndexes = new WeakMap<BrowserIcon[], RelatedIndex>()

function weigh(bags: Iterable<Set<string>>, total: number) {
  const uses = new Map<string, number>()
  for (const bag of bags)
    for (const word of bag) uses.set(word, (uses.get(word) ?? 0) + 1)
  return new Map(
    [...uses].map(([word, count]) => [word, Math.log(total / count)])
  )
}

function relatedIndex(all: BrowserIcon[]): RelatedIndex {
  const hit = relatedIndexes.get(all)
  if (hit) return hit

  const variants = new Map<string, BrowserIcon[]>()
  for (const icon of all) {
    const list = variants.get(icon.base)
    if (list) list.push(icon)
    else variants.set(icon.base, [icon])
  }
  const bases = [...variants.keys()]
  const nameWords = new Map(
    bases.map((base) => [base, new Set(base.split("-"))])
  )
  // The name's own words go in too: `cloud-upload` lists "upload" as a search
  // term, and that should meet `upload` by its name.
  const searchWords = new Map(
    bases.map((base) => [
      base,
      new Set([
        ...base.split("-"),
        ...aliasesFor(base)
          .join(" ")
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(Boolean),
      ]),
    ])
  )

  const index = {
    bases,
    variants,
    nameWords,
    searchWords,
    nameWeight: weigh(nameWords.values(), bases.length),
    searchWeight: weigh(searchWords.values(), bases.length),
  }
  relatedIndexes.set(all, index)
  return index
}

/**
 * How much two bags of words share, 0 to 1, rare words counting for more.
 * Divided by both bags' size so a long name is not related to everything for
 * having more words to match with.
 */
function overlap(a: Set<string>, b: Set<string>, weight: Map<string, number>) {
  let shared = 0
  let sizeA = 0
  let sizeB = 0
  for (const word of a) {
    const w = weight.get(word) ?? 0
    sizeA += w
    if (b.has(word)) shared += w
  }
  for (const word of b) sizeB += weight.get(word) ?? 0
  return sizeA && sizeB ? shared / Math.sqrt(sizeA * sizeB) : 0
}

/**
 * Words that name the other half of a pair. Sharing words does not find these:
 * `upload` and `download` share none, and `arrow-up` shares more with
 * `arrow-up-down` and fifteen other `arrow-up-` names than with `arrow-down`,
 * which fell off its grid. A name that is this one with a single word turned
 * round is the drawing most people want next, so it is looked for directly.
 */
const OPPOSITES: Record<string, string> = Object.fromEntries(
  (
    [
      ["up", "down"],
      ["left", "right"],
      ["top", "bottom"],
      ["in", "out"],
      ["upload", "download"],
      ["lock", "unlock"],
      ["link", "unlink"],
      ["maximize", "minimize"],
      ["undo", "redo"],
      ["plus", "minus"],
      ["check", "x"],
      ["play", "pause"],
      ["sun", "moon"],
      ["horizontal", "vertical"],
      ["increase", "decrease"],
      ["open", "closed"],
      ["start", "end"],
      ["first", "last"],
      ["min", "max"],
      ["light", "dark"],
      ["empty", "full"],
      ["asc", "desc"],
      ["big", "small"],
    ] as const
  ).flatMap(([a, b]) => [
    [a, b],
    [b, a],
  ])
)

/** Every name that is `base` with one word swapped for its opposite. */
function twinsOf(base: string): Set<string> {
  const words = base.split("-")
  const twins = new Set<string>()
  words.forEach((word, at) => {
    const opposite = OPPOSITES[word]
    if (opposite)
      twins.add(
        [...words.slice(0, at), opposite, ...words.slice(at + 1)].join("-")
      )
  })
  return twins
}

/** How much the signals below count against each other. */
const NAME_WEIGHT = 1
const TWIN_WEIGHT = 1
const SEARCH_WEIGHT = 0.5
const SHELF_WEIGHT = 0.2

/**
 * What to look at next: the drawings that share the most with this one.
 *
 * Ranked on one score, in order of how much each signal counts: the words of
 * the name (or the name with one word turned round, `OPPOSITES`), the words
 * people search for it by, then the shelf. Rare words count for more than
 * common ones, so `circle-three-quarter` meets `circle-quarter`,
 * `square-three-quarter` and `circle-dashed-three-quarter` through "quarter"
 * and "three" before it meets `circle-pen` through "circle".
 *
 * A drawing from another shelf has to be at least as close as being on this
 * one. Below that it is one stray search word, and `coffee-pot` was handed
 * `skip-back` and `chart-area` ahead of its own kitchen.
 *
 * It used to take the first word of the name as the family, sort that family
 * A to Z and cut at the limit. Where the first word is a shape that runs to
 * forty names, the cut fell at `circle-progress-play` and the grid was forty
 * circles in alphabetical order: `circle-quarter` was missing from
 * `circle-three-quarter`'s page and the other way round, as were 1,181 such
 * one-word-apart pairs on 301 pages. A name that only shared a later word,
 * `upload` and `cloud-upload`, never met at all, and `upload` was given the
 * Actions shelf from `alert` onwards.
 *
 * One tile per drawing. Container variants of this drawing have their own row
 * above; another drawing's appear once, in this icon's container where it has
 * one, so `circle-check` leads to `circle-x` and not to `x`, `square-x` and
 * `circle-x` side by side. Boxed copies took 861 tiles on 293 pages before.
 *
 * This is also what makes the route indexable at all. 414 pages differing only
 * by a glyph is a doorway pattern; a page that links its family and its shelf
 * is a page in a graph, and it is why the crawl reaches every icon from any
 * one of them without leaning on the sitemap.
 */
export function relatedIcons(
  icon: BrowserIcon,
  all: BrowserIcon[],
  limit = 18
): BrowserIcon[] {
  const index = relatedIndex(all)
  const category = categoryOf(icon.base)
  const name = index.nameWords.get(icon.base)!
  const search = index.searchWords.get(icon.base)!
  const twins = twinsOf(icon.base)

  const close: { base: string; score: number }[] = []
  const shelf: string[] = []
  for (const base of index.bases) {
    if (base === icon.base) continue
    const score =
      NAME_WEIGHT *
        overlap(name, index.nameWords.get(base)!, index.nameWeight) +
      (twins.has(base) ? TWIN_WEIGHT : 0) +
      SEARCH_WEIGHT *
        overlap(search, index.searchWords.get(base)!, index.searchWeight)
    if (categoryOf(base) === category) {
      if (score > 0) close.push({ base, score: score + SHELF_WEIGHT })
      else shelf.push(base)
    } else if (score >= SHELF_WEIGHT) close.push({ base, score })
  }

  /*
    The shelf behind them is everything sharing nothing but the shelf, which
    ties, and A to Z on a tie gave `upload` `alert` and nine `badge-` names in a
    row. One name per first word, round and round, shows the shelf instead of
    its opening letter.
  */
  const byStem = new Map<string, string[]>()
  for (const base of shelf.sort()) {
    const stem = base.split("-")[0]!
    const list = byStem.get(stem)
    if (list) list.push(base)
    else byStem.set(stem, [base])
  }
  const rounds: string[] = []
  for (let round = 0; rounds.length < shelf.length; round++)
    for (const list of byStem.values())
      if (list[round]) rounds.push(list[round])

  return [
    ...close
      .sort((a, b) => b.score - a.score || a.base.localeCompare(b.base))
      .map(({ base }) => base),
    ...rounds,
  ]
    .slice(0, limit)
    .map((base) => {
      const variants = index.variants.get(base)!
      return (
        variants.find((variant) => variant.container === icon.container) ??
        variants.find((variant) => variant.container === "regular") ??
        variants[0]!
      )
    })
}

/**
 * How the related grid is ordered, in the words the section and its FAQ
 * answer both use: the `FAQPage` markup quotes the answer, so the two cannot
 * be allowed to describe different orders.
 */
export const relatedOrder = (icon: BrowserIcon) =>
  `Closest to ${icon.name} first: its name counts most, then what people ` +
  `search for it by, then the rest of the ${categoryOf(icon.base)} shelf.`

/**
 * The page's title, which the root layout's template turns into
 * `arrow-down icon · Keyline Icons`.
 *
 * Deliberately just the name and the noun. The obvious additions — "free SVG",
 * the category — read well after a 10-character name and push a 30-character
 * one such as `smartphone-arrow-in-down-right` past the ~60 characters a result
 * shows, where the brand is what gets cut. A title that truncates differently
 * on a third of the set is worse than one that is short everywhere, and "free"
 * is already doing its work in the description.
 */
export const iconTitle = (name: string) => `${name} icon`

/**
 * What the page says about itself under its heading, and the first half of what
 * it says to a search result.
 *
 * The two have to agree — Google rewrites a description the page does not back
 * up — so there is one sentence rather than a string in each place.
 *
 * **The line that carries the page is the one from `lib/icon-usage.json`**,
 * which says what this drawing is for. Everything before it was a template with
 * the name dropped into it: 554 pages reading "The X icon, drawn on a 24×24
 * grid in stroke, duotone and fill" are one page 554 times, and a page about
 * `upload` that never says what an upload icon depicts has nothing for
 * "arrow out of a tray icon" to match. The old sentence survives below as the
 * fallback, because a drawing added before its line is written still needs a
 * description, and a page with no description at all is worse than a templated
 * one.
 *
 * The container clause is added here rather than written into the data: one
 * drawing boxed three ways shares a line, and this is what keeps `upload`,
 * `square-upload` and `circle-upload` from declaring three identical
 * descriptions of three separate URLs.
 *
 * Length is what shaped the wording, and it still binds. A snippet is cut
 * mid-clause somewhere past 160, and the clause that must survive the cut is
 * the one carrying "free" and "MIT". `USAGE_LIMIT` is set so the longest line
 * plus the longest tail lands under that on every icon in the set;
 * `pipeline/check-usage.mjs` measures the real descriptions rather than
 * trusting the arithmetic, which is what will be wrong after the next edit
 * here.
 */
export function iconDescription(icon: BrowserIcon): string {
  const styles = listOf(stylesOf(icon))
  const usage = usageOf(icon.base)

  if (!usage) {
    return (
      `The ${icon.name} icon, drawn on a 24×24 grid in ${styles}. ` +
      `Free under MIT: copy the SVG, the JSX or the React component.`
    )
  }

  return icon.container === "regular"
    ? `${usage} On a 24×24 grid in ${styles}, free under MIT.`
    : `${usage} Boxed in a ${icon.container}, in ${styles}, free under MIT.`
}

/** Where a snippet starts being cut off mid-clause. */
const SNIPPET_LIMIT = 160

/**
 * The meta description: the page's own sentence, then as many of the icon's
 * other names as fit.
 *
 * The padding is not filler. A 35-character name leaves no room for anything,
 * while `x` leaves fifty characters of a snippet that would otherwise be made
 * up by Google out of whatever text it finds on the page — and the words worth
 * spending them on are the ones someone would have searched instead of the
 * file name. They are on the page, under "Also called", so the description is
 * describing what is there rather than advertising what is not.
 *
 * The tail is left off the visible paragraph, which sits directly above that
 * section: printing the synonyms twice, forty pixels apart, reads as a bug.
 */
export function iconMetaDescription(icon: BrowserIcon): string {
  const base = iconDescription(icon)
  const fitted: string[] = []

  for (const alias of aliasesFor(icon.base)) {
    const next = `${base} Also called ${listOf([...fitted, alias])}.`
    if (next.length > SNIPPET_LIMIT) break
    fitted.push(alias)
  }

  return fitted.length ? `${base} Also called ${listOf(fitted)}.` : base
}

/**
 * The words someone would have searched for instead, for the page's tag row and
 * for its structured data.
 *
 * The icon's own name is prepended because `keywords` on an `ImageObject` is
 * read as the full list of what the image is about, and a list that omits the
 * thing's own name is a strange one. The tag row on the page drops it again —
 * printing "bell" under a heading that says `bell` is noise.
 */
export const iconKeywords = (icon: BrowserIcon): string[] => [
  icon.name,
  ...aliasesFor(icon.base),
]

export type IconQuestion = { question: string; answer: string }

/**
 * The container question, which is three different questions depending on which
 * end of the family you landed on.
 *
 * Asking "is there a square or circle version of circle-arrow-down?" of the
 * circle version itself is the kind of generated line that tells a reader the
 * page was not written for them. A boxed icon is asked how it relates to the
 * bare glyph instead, which is the thing someone who arrived at the wrong one
 * of three actually wants to know.
 */
function containerQuestion(
  icon: BrowserIcon,
  /** The rest of the family, the icon itself already removed. */
  family: BrowserIcon[]
): IconQuestion {
  const name = icon.name

  if (family.length === 0) {
    return {
      question: `Is there a square or circle version of ${name}?`,
      answer: `No. ${name} is drawn as a bare glyph, and the set has no boxed variant of it.`,
    }
  }

  if (icon.container === "regular") {
    return {
      question: `Is there a square or circle version of ${name}?`,
      answer:
        `Yes. The same drawing is also boxed, as ` +
        `${listOf(family.map((variant) => variant.name))}. Each is its own icon with its own name.`,
    }
  }

  const bare = family.find((variant) => variant.container === "regular")
  const boxed = family.filter((variant) => variant.container !== "regular")

  return {
    question: `How is ${name} different from ${bare?.name ?? icon.base}?`,
    answer:
      `${name} is the same drawing inside a ${icon.container}. ` +
      (bare
        ? `The bare glyph is ${bare.name}`
        : `The bare glyph is ${icon.base}`) +
      (boxed.length
        ? `, and it is also boxed as ${listOf(boxed.map((variant) => variant.name))}.`
        : `.`),
  }
}

/**
 * The questions this drawing is actually asked, answered from its own facts.
 *
 * Both the visible section and the `FAQPage` markup are built from this one
 * array, and the answers are plain strings rather than JSX for exactly that
 * reason: structured data has to quote what is on the page, and the only way to
 * guarantee that is for there to be nothing to keep in step. A link inside an
 * answer would fork the two, so the one link this section wants sits under the
 * grid instead.
 *
 * **Every answer here is about this drawing. That is new, and it is the whole
 * point of the rewrite.** The list used to run to ten questions, of which six
 * were set-level with the name swapped into them: the size ramp, React, using
 * it without React, shadcn/ui, the Figma file, the licence and contributing.
 * The note that stood here defended them, on the argument that someone who
 * landed on one icon from a search is asking whether *that* one is free.
 *
 * That argument missed the thing that decides it. Those same questions are
 * already answered on the two pages that own them — `homeFaq` asks about
 * commercial use, shadcn/ui, the Figma file and the container variants,
 * `installFaq` asks about React, the package and using the set without it — so
 * the icon route was not the only place a visitor could find them. It was the
 * third copy, multiplied by 554, and all three emit `FAQPage` markup. That is
 * the overflow.design pattern this file's own note warned about, arrived at
 * from the other direction: not nine questions about refunds, but nine good
 * questions asked in a place that could not answer any of them differently.
 *
 * So the set-level ones are gone and the closing paragraph under the section
 * points at the pages that hold them. What is left varies per drawing by
 * construction — the category and the words it answers to, the weights it was
 * drawn in and why, its container siblings by name, the drawings around it, the
 * component and module its weights import from, the files on disk, and the
 * dates off its own history. A page with nothing to say in one of them drops
 * that question rather than padding it, which is why this builds an array
 * instead of returning a literal.
 *
 * Worth knowing before adding more: Google stopped showing FAQ rich results for
 * ordinary sites in August 2023 — they are limited to well-known health and
 * government domains now — so this markup buys no stars in the search result.
 * It is here because the answers are worth having on the page, and because the
 * machine-readable copy is read by other engines and by the assistants people
 * increasingly ask instead of searching. Do not add a question for the markup's
 * sake that you would not put on the page, and do not add one whose answer
 * would read the same on every icon in the set.
 */
export function iconFaq(icon: BrowserIcon, all: BrowserIcon[]): IconQuestion[] {
  const name = icon.name
  const styles = stylesOf(icon)
  const missing = STYLES.filter((style) => !icon.art[style])
  const aliases = aliasesFor(icon.base)
  const category = categoryOf(icon.base)
  const usage = usageOf(icon.base)
  const family = containerFamily(icon, all).filter(
    (variant) => variant.name !== name
  )
  const related = relatedIcons(icon, all)

  const questions: IconQuestion[] = [
    {
      question: `What is the ${name} icon for?`,
      answer:
        // The same line the page leads with, which is what makes this answer
        // about the drawing rather than about the shelf it sits on.
        (usage ? `${usage} ` : ``) +
        `It is filed under ${category} in ${SET_TITLE}, drawn on the ` +
        `same 24×24 grid as the rest of the set.` +
        (aliases.length
          ? ` People look for it as ${listOf(aliases)}, and the browser's search matches all of those.`
          : ``),
    },
    {
      question: `What styles does the ${name} icon come in?`,
      answer:
        missing.length === 0
          ? `All four: stroke, two-tone, duotone and fill. They are drawn from the same geometry, so swapping style never moves anything.`
          : `${listOf(styles.map((style, at) => (at === 0 ? `${style[0].toUpperCase()}${style.slice(1)}` : style)))}. ` +
            `There ${missing.length > 1 ? "are" : "is"} no ${norListOf(missing)} ` +
            `drawing${missing.length > 1 ? "s" : ""} of this one: a filled style needs an enclosed area, ` +
            `either in the glyph itself or from a square or circle container.`,
    },
    containerQuestion(icon, family),
  ]

  /*
    The drawings around it, named. The related grid below already links them,
    and naming them in prose is what lets this answer differ from the next
    icon's: a shelf of sixty and a family of two do not read the same.
  */
  if (related.length) {
    const shown = related.slice(0, 6).map((other) => other.name)
    const rest = related.length - shown.length

    // The section's own lead, word for word: the `FAQPage` markup quotes this
    // answer, and an answer describing an order the grid does not have is the
    // one thing it may not do.
    questions.push({
      question: `What other icons go with ${name}?`,
      answer:
        `${listOf(shown)}${rest > 0 ? `, and ${rest} more` : ``}, all shown below. ` +
        relatedOrder(icon),
    })
  }

  questions.push(
    {
      question: `How do I import ${name} in React?`,
      answer:
        `<${componentName(name)} /> is the component, and the style decides the module: ` +
        `${listOf(styles.map((style) => `${style} from "${importPath(style)}"`))}. ` +
        `It takes the usual SVG props plus a size, so <${componentName(name)} size={16} /> ` +
        `and className="size-4" both work, and there is no provider or theme to set up.`,
    },
    {
      question: `Where is the ${name} SVG?`,
      answer:
        `${listOf(styles.map((style) => `icons/${style}/${name}.svg`))} in the repository, ` +
        `normalised: no wrapper, no ids and no classes to strip out. The tabs above hand you ` +
        `the same drawing as SVG or JSX without the download, and neither needs an install.`,
    }
  )

  /*
    Dates, which no other icon shares and which the header of this page already
    prints. Dropped rather than guessed at where a drawing has no history —
    every one of them has, today, and a blank answer is worse than no question.
  */
  if (icon.history) {
    const { addedLabel, updatedLabel, added, updated, version } = icon.history

    questions.push({
      question: `When was ${name} added to the set?`,
      answer:
        `Added ${addedLabel}` +
        (updated !== added ? `, and last redrawn ${updatedLabel}` : ``) +
        `. ` +
        (version
          ? `It ships in v${version}, so an install at that version or later has it.`
          : `It is not in a tagged release yet: it is on the site and in the repository, and the next version will carry it.`),
    })
  }

  return questions
}
