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
 * compressed rather than new claims.
 *
 * One fact used to constrain them: neither `@keyline-icons/react` nor
 * `@keyline-icons/cli` was on npm, `/install` said so in a callout, and every
 * answer mentioning the package had to repeat it or the page and its own FAQ
 * would disagree. All three packages published at v0.1.0, the callout came out
 * with them, and the answers here came out at the same time. The rule that
 * survives is the general one: an answer may not promise an install the page
 * does not offer, in either direction.
 *
 * **`homeFaq` never took a position on it**, which is why it needed no edit. Its
 * install-shaped answers describe taking an icon from the browser or the whole
 * set as React components, and send anyone who wants the specifics to
 * `/install`, which owns them. That was written to survive the publish and did.
 *
 * The set's own Figma file went the same way. `/`'s Figma answer was written to
 * survive it too: it says the set is drawn in one Figma file and that the
 * repository is what is public, which was true before publishing and is true
 * after. `iconFaq` was the one stating the negative outright, so when
 * `SET_FIGMA_URL` was filled in with the Community file, that answer moved and
 * this one did not need to.
 */
import {
  ICONIFY_PREFIX,
  REACT_NATIVE_PACKAGE,
  REACT_PACKAGE,
  SVELTE_PACKAGE,
  VUE_PACKAGE,
} from "@/lib/icon-code"
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
 * - rounded and sharp → "Rounded and sharp corners"
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
  files,
  containers,
}: {
  total: number
  /** How many drawings exist per style, in weight order. One treatment. */
  byStyle: { style: string; count: number }[]
  /**
   * Every SVG under `icons/`, both corner treatments, counted by the page.
   *
   * It was the sum of `byStyle` and that stopped being the same number when
   * sharp landed: the per-style counts describe one treatment, because coverage
   * is a fact about a drawing rather than about its corners, while a count of
   * files is a claim about the directory. Passed in rather than derived here,
   * so the page and this answer cannot arrive at two different totals.
   */
  files: number
  /** How many icons wear each container prefix. */
  containers: { square: number; circle: number }
}): FaqEntry[] {
  const stroke = byStyle.find((entry) => entry.style === "stroke")?.count ?? 0

  return [
    {
      question: `What is ${SET_TITLE}?`,
      answer:
        `A free icon set: ${total.toLocaleString("en-US")} icons drawn on one 24×24 grid, each in four styles: ` +
        `stroke, two-tone, duotone and fill, with rounded or sharp corners. ${SET_TAGLINE}, released under ` +
        `the ${SET_LICENSE_NAME}.`,
    },
    {
      question: `How many icons are there, and what are the four styles?`,
      answer:
        `${byStyle.map((entry) => `${entry.count.toLocaleString("en-US")} ${entry.style}`).join(", ")}, each cut with rounded ` +
        `and with sharp corners, so ${files.toLocaleString("en-US")} SVGs in total. ` +
        `Stroke is the drawing the others start from. Two-tone keeps that outline over a 40% plate, which ` +
        `is what duotone meant until 0.9.0. Duotone drops the outline and puts the part that matters in ` +
        `black over a grey body. Fill is solid. Since 1.0.0 every name comes in all four.`,
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
        `${stroke.toLocaleString("en-US")} drawings come in a square- form and ${containers.circle} in a circle-, wrapping the base ` +
        `glyph rather than replacing it. The container also gives a glyph the enclosed area a duotone or a ` +
        `fill needs, which is why a boxed variant can show a glyph solid that the bare drawing only outlines.`,
    },
    {
      /*
        Under the containers question because the sections are in that order on
        the page, and the two answers lean on each other: a container is a
        different icon and a corner treatment is not, which is the distinction
        this one opens with and that one closes with.
      */
      question: `What is the difference between the rounded and sharp icons?`,
      answer:
        `Only the corners and the stroke caps. All ${total.toLocaleString("en-US")} drawings are cut both ways, in every ` +
        `weight they carry, so the two are one set with a switch on it rather than two sets: same ` +
        `names, same 24×24 grid, same coverage in stroke, two-tone, duotone and fill. Rounded takes a radius ` +
        `off one ladder at every corner and ends each stroke round; sharp takes every corner to a ` +
        `true point and squares every cap. The ink reaches exactly as far either way, so nothing in ` +
        `a layout moves when you swap one for the other.`,
    },
    {
      question: `Is there a Figma file?`,
      answer:
        `The set is drawn in one Figma file, as a component set per icon with three variant properties on ` +
        `it: Container, Style and Corners. What is public today is the repository at ${repo}: raw/ holds the export of ` +
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
        `disagree. Each style is its own entry point, and the drawings are also in icons/ in the ` +
        `repository at ${repo} if you would rather copy them than install anything.`,
    },
    {
      question: `Does it work in React Native?`,
      answer:
        `Yes, as ${REACT_NATIVE_PACKAGE}, installed next to react-native-svg, and in Expo too. The names ` +
        `and entry points are the same as ${REACT_PACKAGE}, so shared code changes the package name and ` +
        `nothing else. A native view has no CSS to inherit from, so colour is a color prop rather than ` +
        `currentColor.`,
    },
    {
      question: `Why does each style have its own import path?`,
      answer:
        `So an app ships only the styles it imports. Every name is in all four, and the import path picks ` +
        `the look: ${REACT_PACKAGE}/two-tone for the outline over a plate, ${REACT_PACKAGE}/duotone for the ` +
        `grey body with black detail. Code that imported /duotone before 1.0.0 and wants the old look ` +
        `changes the path to /two-tone.`,
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
        `Yes. For Vue 3, install ${VUE_PACKAGE}, our native Vue component package. For Svelte, install ${SVELTE_PACKAGE}, ` +
        `our native Svelte component package. For Angular, Solid and plain HTML, the set is on Iconify as ${ICONIFY_PREFIX} ` +
        `and iconify-icon. Or take the files: icons/<style>/<name>.svg in the repository are plain normalised SVGs with no wrapper.`,
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
