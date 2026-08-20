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
import { SET_LICENSE_NAME, SET_REPO_URL, SET_TITLE } from "@/lib/site-chrome"

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
 * It varies by more than the name: the styles a drawing actually has go in it,
 * so a stroke-only icon does not advertise a fill it has not got.
 *
 * Length is what shaped the wording. This set's names run from 1 character
 * (`x`) to 35 (`circle-bar-chart-2-horizontal-start`), a snippet truncates
 * mid-clause somewhere past 160, and the longest name has to fit. The first
 * draft ended "copy the SVG or JSX, download it, or install the React
 * component" and overran by five characters on exactly one icon, which is the
 * kind of thing that is only ever found by measuring the whole set. Any edit
 * here has to be measured against `circle-bar-chart-2-horizontal-start` rather
 * than against a short name that leaves room.
 */
export function iconDescription(icon: BrowserIcon): string {
  const styles = listOf(stylesOf(icon))

  return (
    `The ${icon.name} icon, drawn on a 24×24 grid in ${styles}. ` +
    `Free under MIT: copy the SVG, the JSX or the React component.`
  )
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
 * The questions an icon page is actually asked, answered from that icon's own
 * facts.
 *
 * Both the visible section and the `FAQPage` markup are built from this one
 * array, and the answers are plain strings rather than JSX for exactly that
 * reason: structured data has to quote what is on the page, and the only way to
 * guarantee that is for there to be nothing to keep in step. A link inside an
 * answer would fork the two, so the one link this section wants sits under the
 * grid instead.
 *
 * **Every answer names the icon, and most are built from its own facts.** The
 * pattern to avoid is the one overflow.design ships: nine questions about
 * licensing and refunds, byte-identical across a few thousand icon pages, which
 * is a duplicate-content block wearing an FAQ's clothes. The set-level ones here
 * — the licence, the source files, shadcn/ui, contributing — are asked *of this
 * drawing*, because a visitor who landed on one icon from a search is asking
 * whether *that* is free, and where *that* one is drawn.
 *
 * One thing they must not claim, checked rather than assumed:
 *
 * - **The Figma file is not public.** There is no URL for it anywhere in this
 *   repo, so the answer says what is actually available instead: `raw/` and
 *   `icons/`. If the file is ever published, that answer is the one to change.
 *
 * A second constraint used to sit here and no longer binds: the packages were
 * not on npm, so the React answer described the import and the props rather
 * than telling anyone to run an install that would fail. All three published at
 * v0.1.0 and `npm view @keyline-icons/react` now resolves. The answer did not
 * need rewriting, because describing the import was true before the publish and
 * is true after it, which is the better way to write one of these.
 *
 * Worth knowing before adding more: Google stopped showing FAQ rich results for
 * ordinary sites in August 2023 — they are limited to well-known health and
 * government domains now — so this markup buys no stars in the search result.
 * It is here because the answers are worth having on the page, and because the
 * machine-readable copy is read by other engines and by the assistants people
 * increasingly ask instead of searching. Do not add a question for the markup's
 * sake that you would not put on the page.
 */
export function iconFaq(icon: BrowserIcon, all: BrowserIcon[]): IconQuestion[] {
  const name = icon.name
  const styles = stylesOf(icon)
  const missing = STYLES.filter((style) => !icon.art[style])
  const aliases = aliasesFor(icon.base)
  const category = categoryOf(icon.base)
  const family = containerFamily(icon, all).filter(
    (variant) => variant.name !== name
  )

  return [
    {
      question: `What is the ${name} icon for?`,
      answer:
        `${name} is filed under ${category} in ${SET_TITLE}, drawn on the ` +
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
    {
      question: `What size is the ${name} icon, and can I recolour it?`,
      answer:
        `It is a 24×24 vector with a 2px keyline, so it scales to any size; ` +
        `this page draws it at 16, 20, 24 and 32 to show how it holds up small. ` +
        `Colour comes from currentColor, so it inherits the text colour around it and needs no fill or stroke of your own.`,
    },
    {
      question: `How do I use ${name} in React?`,
      answer:
        `The React tab above gives you the line to paste: ` +
        `import { ${componentName(name)} } from "${importPath(styles[0] ?? "stroke")}". ` +
        `Every component takes the usual SVG props plus a size, so ` +
        `<${componentName(name)} size={16} /> and className="size-4" both work, and there is no provider or theme to set up.`,
    },
    {
      question: `Can I use ${name} without React?`,
      answer:
        `Yes, and it needs no install at all. Copy the SVG or the JSX from the tabs above, or download the file; ` +
        `the drawings are also plain normalised SVGs in the repository at icons/<style>/${name}.svg, ` +
        `with no wrapper, no ids and no classes to strip out.`,
    },
    {
      question: `Does ${name} work with shadcn/ui?`,
      answer:
        `That is what the set is drawn for. It uses the same 24×24 box and the same 2px keyline that ` +
        `shadcn/ui's defaults assume, so ${name} sits correctly at size-4 inside a Button and needs no adjustment ` +
        `to your components. Swapping it in where a lucide icon was is an import change, not a markup change.`,
    },
    {
      question: `Is there a Figma file for ${name}?`,
      answer:
        `Not yet as a Community file. The set is drawn in Figma and the button at the top of this page ` +
        `opens the profile it will be published to. For ${name} itself the ` +
        `repository is the source: raw/ holds the export of every variant straight out of Figma, and ` +
        `icons/ holds the normalised SVGs the site, the React components and the packages are built from.`,
    },
    {
      question: `Can I use ${name} in a commercial project, and do I have to credit the set?`,
      answer:
        `Yes to the first. ${SET_TITLE} is released under the ${SET_LICENSE_NAME}, which covers commercial ` +
        `work, client work and products you sell, with no per-seat terms. The licence asks that its notice ` +
        `travels with copies of the set itself rather than with a product that happens to use an icon; ` +
        `the LICENSE file in the repository is the actual grant and governs.`,
    },
    {
      question: `How do I contribute an icon, or report a problem with ${name}?`,
      answer:
        `Through the repository at ${SET_REPO_URL.replace("https://", "")}. Issues are where a missing icon or a ` +
        `wrong drawing gets raised, and pull requests are welcome; contributors keep the credit, which is what the ` +
        `name beside "Drawn by" at the top of this page comes from. One thing to know before opening one: the ` +
        `files under icons/ are build output, so a fix goes into raw/ and gets rebuilt.`,
    },
  ]
}
