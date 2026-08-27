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
 * What to look at next: the name family first, then the rest of the shelf.
 *
 * The family is the stronger relationship and it is not the same thing as the
 * category — `bell-x` and `bell-dot` are one family on the Mail shelf, and
 * someone who landed on one of them almost always wants the other. Sorting the
 * family to the front means the first row of the grid is the useful one even
 * where the category runs to sixty icons.
 *
 * Container variants are excluded: they are the same drawing and have their own
 * row above this one.
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
  const category = categoryOf(icon.base)
  const family = icon.base.split("-")[0]
  const inFamily = (candidate: BrowserIcon) =>
    candidate.base.split("-")[0] === family

  return all
    .filter(
      (candidate) =>
        candidate.base !== icon.base &&
        (inFamily(candidate) || categoryOf(candidate.base) === category)
    )
    .sort((a, b) => {
      const rank = Number(inFamily(b)) - Number(inFamily(a))
      return rank || a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}

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
          ? `All three: stroke, duotone and fill. They are drawn from the same geometry, so swapping weight never moves anything.`
          : `${listOf(styles.map((style, at) => (at === 0 ? `${style[0].toUpperCase()}${style.slice(1)}` : style)))}. ` +
            `There ${missing.length > 1 ? "are" : "is"} no ${norListOf(missing)} ` +
            `drawing${missing.length > 1 ? "s" : ""} of this one: a filled weight needs an enclosed area, ` +
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
    const stem = icon.base.split("-")[0]
    /*
      Whether the grid below actually opens with a name family, rather than
      whether one could exist. `relatedIcons` sorts the family to the front and
      falls through to the shelf, so for `upload`, which nothing else is named
      after, the first row *is* the shelf — and an answer promising a family
      first is describing a page that is not there, which is the one thing a
      quoted `FAQPage` answer may not do.
    */
    const kin = related.filter((other) => other.base.split("-")[0] === stem)

    questions.push({
      question: `What other icons go with ${name}?`,
      answer:
        `${listOf(shown)}${rest > 0 ? `, and ${rest} more` : ``}, all shown below. ` +
        (kin.length
          ? `The ${stem} family is listed first, then the rest of the ${category} shelf, ` +
            `so the row under this one is the useful one even where a shelf runs long.`
          : `They are the ${category} shelf: nothing else in the set is named after ${stem}.`),
    })
  }

  questions.push(
    {
      question: `How do I import ${name} in React?`,
      answer:
        `<${componentName(name)} /> is the component, and the weight decides the module: ` +
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
