/**
 * The questions `/` and `/install` answer, and the one rule they follow.
 *
 * Three sets of questions exist on the site: the per-icon one in
 * `lib/icon-pages.ts`, built from a drawing's own facts and living beside them,
 * and the two here.
 *
 * `homeFaq` is a restored `siteFaq`, which asked nine questions under the icon
 * grid until that section was dropped and took its `FAQPage` node with it. It is
 * back because the landing page now has the sections to back it, and it is
 * shorter than the original by two: the lucide question moved to `/install`,
 * where the answer is an import change rather than a claim about this page, and
 * the contributing question went with it, because nothing on `/` is about
 * contributing.
 *
 * **Every answer has to be backed by the page it sits on.** Structured data may
 * only describe what is there, and the answers below are the page's own prose
 * compressed rather than new claims. One fact constrains them, verified rather
 * than assumed: neither `@keyline-icons/react` nor `@keyline-icons/cli` is on
 * npm yet, and `/install` says so in a callout, so any answer mentioning the
 * package has to say the same thing or the page and its own FAQ disagree.
 *
 * **`homeFaq` handles that fact by not raising it.** The landing page used to
 * carry "Not published yet." under its terminal and no longer does, so an answer
 * there stating the npm status would be the FAQ making a claim its own page has
 * dropped, and an answer implying the opposite would be false. Both of its
 * install-shaped answers describe what is true today and is on the page, copying
 * the SVG or taking the React components from the repository, and they send anyone
 * who needs the status to `/install`, which owns it and states it.
 *
 * The set's own Figma file is likewise still unpublished, and `/`'s Figma answer
 * is written the same way: it says the set is drawn in one Figma file and that
 * the repository is what is public, which is true whether or not the file is
 * ever published. `iconFaq` is the one that states the negative outright; if
 * `SET_FIGMA_URL` is ever filled in with a real file, that answer is the one to
 * move, and this one still reads correctly.
 */
import { REACT_PACKAGE } from "@/lib/icon-code"
import {
  SET_LICENSE_NAME,
  SET_REPO_URL,
  SET_TAGLINE,
  SET_TITLE,
} from "@/lib/site-chrome"

/** One question and its answer, as plain text. See `components/faq.tsx`. */
export type FaqEntry = { question: string; answer: string }

const repo = SET_REPO_URL.replace("https://", "")

/**
 * `/`'s questions: the ones asked before deciding to take a set at all.
 *
 * Every answer here is a section of the landing page compressed, and that is the
 * rule rather than a description: the page emits this same array as `FAQPage`
 * structured data, so an answer with no section behind it is markup describing a
 * page that does not exist. The mapping, so the next person can check it:
 *
 * - what it is, how many, why the styles differ → the hero and its fact cards
 * - free for commercial work → the hero's licence card
 * - shadcn/ui, installing → "Works in your stack" and the demos
 * - square and circle → "Square and circle containers"
 * - Figma → "Design files"
 *
 * Drop a section and the matching question goes with it.
 *
 * Every number is derived from what was counted off disk, never typed, which is
 * the same rule the page's own copy follows.
 */
export function homeFaq({
  total,
  byStyle,
  containers,
}: {
  total: number
  /** How many drawings exist per style, in weight order. */
  byStyle: { style: string; count: number }[]
  /** How many icons wear each container prefix. */
  containers: { square: number; circle: number }
}): FaqEntry[] {
  const files = byStyle.reduce((sum, entry) => sum + entry.count, 0)
  const stroke = byStyle.find((entry) => entry.style === "stroke")?.count ?? 0

  return [
    {
      question: `What is ${SET_TITLE}?`,
      answer:
        `A free icon set: ${total} icons drawn on one 24×24 grid, each in up to three weights: ` +
        `stroke, duotone and fill. ${SET_TAGLINE}, released under the ${SET_LICENSE_NAME}, ` +
        `and made entirely with AI.`,
    },
    {
      question: `How many icons are there, and why do the three styles differ?`,
      answer:
        `${byStyle.map((entry) => `${entry.count} ${entry.style}`).join(", ")}, so ${files} SVGs in total. ` +
        `Stroke is complete by definition, because it is the drawing the other two are derived from. ` +
        `Duotone and fill need an area to fill, and not every glyph encloses one: bar-chart is three open ` +
        `strokes with no interior, so it carries stroke only. That is measured off each outline rather than ` +
        `decided by hand, which is why the counts are what they are.`,
    },
    {
      question: `Are the icons free to use in commercial projects?`,
      answer:
        `Yes. The set is released under the ${SET_LICENSE_NAME}, which covers commercial work, client work ` +
        `and products you sell, with no per-seat terms and no subscription. The LICENSE file in the ` +
        `repository is the actual grant and governs.`,
    },
    {
      question: `Do these work with shadcn/ui?`,
      answer:
        `That is what they are drawn for. The set uses the same 24×24 box and the same 2px keyline that ` +
        `shadcn/ui's defaults assume, so an icon lands correctly at size-4 inside a Button with no ` +
        `adjustment to your components. This whole site is built with them, which is the same claim tested ` +
        `end to end rather than asserted.`,
    },
    {
      question: `Do I have to install anything?`,
      answer:
        `Not to use one icon. Open any drawing in the browser and take it as SVG or JSX, at whatever size ` +
        `and stroke width you have set, then paste it into a component. For the whole set as React ` +
        `components there is ${REACT_PACKAGE}, one component per icon generated from the same files, and ` +
        `the install page covers how to get it.`,
    },
    {
      question: `Why do some icons come in square and circle versions?`,
      answer:
        `Because a container is a different icon, not a style of one: ${containers.square} of the ` +
        `${stroke} drawings come in a square- form and ${containers.circle} in a circle-, wrapping the base ` +
        `glyph rather than replacing it. The container also gives a glyph the enclosed area a duotone or a ` +
        `fill needs, which is why boxed variants often have all three weights where the bare drawing has one.`,
    },
    {
      question: `Is there a Figma file?`,
      answer:
        `The set is drawn in one Figma file, as a component set per icon with two variant properties on it, ` +
        `Container and Style. What is public today is the repository at ${repo}: raw/ holds the export of ` +
        `every variant straight out of Figma, under the name Figma gives it, and icons/ holds the normalised ` +
        `SVGs the site, the React components and the packages are all built from.`,
    },
  ]
}

/**
 * `/install`'s questions: the ones asked with an editor already open.
 *
 * Each is answered somewhere on that page in longer form. This section is the
 * short answer for someone scanning, and the machine-readable copy of it; if a
 * question here has no section above it, the section is what is missing, not
 * the answer.
 */
export function installFaq(): FaqEntry[] {
  return [
    {
      question: `Do I need to install anything to use one icon?`,
      answer:
        `No. The icon browser copies any drawing as SVG or JSX at the size and stroke width you set, and ` +
        `pasting that into a component is the whole install. Every drawing colours from currentColor, so it ` +
        `needs no fill or stroke attribute of your own.`,
    },
    {
      question: `Which package do I install for React?`,
      answer:
        `${REACT_PACKAGE}, which generates one component per icon from the same SVGs, so the two cannot ` +
        `disagree. It is built in the repository and is not on npm at the time of writing: until it is, copy ` +
        `the SVGs or take the files from icons/ in the repository at ${repo}.`,
    },
    {
      question: `Why does each style have its own import path?`,
      answer:
        `Because the three do not cover the same icons. Stroke has every drawing; duotone and fill only ` +
        `those that enclose an area, so a single component taking a weight prop would accept combinations ` +
        `that do not exist. Importing from ${REACT_PACKAGE}/duotone instead makes a missing name a build ` +
        `error rather than a blank glyph.`,
    },
    {
      question: `How do I size an icon inside a shadcn/ui Button?`,
      answer:
        `Button sizes nested SVGs itself, with [&_svg:not([class*='size-'])]:size-4, which reads: make any ` +
        `nested icon 16px unless it already carries a size- class. So a bare icon is 16px, a size prop is ` +
        `overridden by that class, and className="size-6" is what actually changes it. Sidebar and ` +
        `DropdownMenu use the same rule without the exception clause, so there your own class will not win.`,
    },
    {
      question: `What stroke width should I use?`,
      answer:
        `Two, which is what the set is drawn and tested at on the 24 grid, including at 16px where the ` +
        `tighter drawings had to be opened up to survive. Lighter weights are for large decorative use; ` +
        `below 16px they break the drawings up rather than refine them, because the gaps between elements ` +
        `were measured against a 2-unit keyline.`,
    },
    {
      question: `How do I switch from lucide?`,
      answer:
        `Change the import. Both sets are 24×24 with a 2px keyline and a currentColor stroke, so the markup ` +
        `stays as it is. One prop has no equivalent here: lucide's absoluteStrokeWidth. The stroke scales ` +
        `with the icon instead, which is what keeps an enlarged keyline looking drawn rather than hairline.`,
    },
    {
      question: `Can I use the set without React?`,
      answer:
        `Yes. icons/<style>/<name>.svg in the repository are plain normalised SVGs with no wrapper, no ids ` +
        `and no classes to strip out, so they drop into any framework or none. Treat them as build output: ` +
        `to change a drawing, change it in raw/ and rebuild.`,
    },
    {
      question: `Is the set free for commercial use?`,
      answer:
        `Yes. It is released under the ${SET_LICENSE_NAME}, which covers commercial and client work. The ` +
        `licence asks that its notice travels with copies of the set itself rather than with a product that ` +
        `happens to use an icon; the LICENSE file in the repository is the actual grant.`,
    },
  ]
}
