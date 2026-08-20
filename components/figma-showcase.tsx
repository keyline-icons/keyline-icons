import Image, { type StaticImageData } from "next/image"

import figmaMockup from "@/public/mockups/figma.png"
import paperMockup from "@/public/mockups/paper.png"

import { DesignFileTabs } from "@/components/design-file-tabs"
import { Glyph } from "@/components/glyph"
import type { Icon } from "@/lib/icons"
import { DESIGN_NOTE_ICON_NAMES, PAPER_NOTE_ICON_NAMES } from "@/lib/home"
import { SET_FIGMA_URL, SET_PAPER_URL } from "@/lib/site-chrome"

/**
 * Where the set comes from, which is now two design files rather than one.
 *
 * Every other section on the landing page is about the drawings. This one is
 * about the files they are drawn in, and it exists because the set's own claims
 * only hold if those files and this repository are the same set: the names, the
 * variants and the geometry all have to agree, and each of those is a mechanism
 * rather than a promise.
 *
 * **The two files are not peers, and the copy should not pretend they are.**
 * Figma is where the icons are drawn: component sets, variant properties, the
 * descriptions the search reads. Paper is generated from `icons/` by
 * `pipeline/build-paper.mjs` and written in by an importer, so it is downstream
 * of the repository in a way the Figma file is not. Anything added here has to
 * keep that difference legible, because "available in both" is true and "drawn
 * in both" is not.
 *
 * **What the Figma button opens today.** `SET_FIGMA_URL` is `@keylineicons`,
 * the team Community profile the file will be published to, not the file, which
 * is not published yet; the long note on that constant in `lib/site-chrome.ts`
 * is the one to read before touching it. This section carried a line saying so, under the button,
 * and it is out at the user's request on the basis that the file is coming. The
 * claim still lives where it is owned: the two FAQ answers in `lib/icon-pages.ts`
 * and the note in `lib/faq.ts`. Publish the file and all three move together.
 * `SET_PAPER_URL` is the opposite case and opens the real file.
 *
 * There is still no plugin, kit or download offered anywhere in here, which is
 * why each panel is a screenshot and four sentences rather than a pricing block.
 *
 * What this section had before the screenshot: a `Container` × `Style` matrix
 * built from `check`, `square-check` and `circle-check`, drawn with `Glyph` off
 * `loadIcons()`. It is worth knowing why that came out, because it was the one
 * thing here that could not go stale. It said what the screenshot says, two
 * variant properties and one set per drawing, and said it with nine tiles against
 * a picture of the actual file, so the two together read as the same fact twice.
 * If the image is ever dropped, `FIGMA_SAMPLE_ICON_NAMES` and that component are
 * in the history of this file rather than lost.
 */

/**
 * The Figma screenshot, and the one thing on this page that is not read off
 * disk.
 *
 * It is a placeholder, supplied to sit here until there is a better one, and its
 * costs are worth stating rather than discovering. A raster of the file freezes
 * whatever the file said the day it was taken: the category cards in it carry
 * their own counts, so those numbers will drift from the set while every number
 * in the page's own copy stays live. Nothing checks it, the way nothing checked
 * the favicon before `brand:check` existed. And it cannot follow the theme, so in
 * dark mode it is a lit panel on a dark page.
 *
 * All three are acceptable for a screenshot of a design file, which is a picture
 * of a place rather than a statement about the set. None of them would be
 * acceptable for a figure.
 *
 * Swapping it is dropping a new file in. The size comes from the import, and so
 * does the cache key: a static import lands the file at
 * `/_next/static/media/figma.<content hash>.png`, so replacing the picture
 * changes the URL and nothing anywhere can serve the old one.
 *
 * That is not a detail. This was `<Image src="/mockups/figma.png">` with the
 * dimensions typed out beside it, and both halves bit within a day. The typed
 * height went stale the moment the file was replaced with one 78px taller, and
 * the page drew it at the wrong aspect silently. Then the cropped files went in
 * and the site kept serving the uncropped ones, because Next keys its optimiser
 * cache on the source URL, `/mockups/figma.png` had not changed, and the cache
 * outlives the file. A version query does not help: the optimiser answers a
 * local `url` carrying a query string with a 400.
 */
const MOCKUP = {
  image: figmaMockup,
  /*
    Alt text describes the arrangement, not the pixels. A screen reader user
    gets nothing from "screenshot of Figma"; what the picture is evidence *of* is
    that the set lives in one file as named component sets on a catalogue page,
    and that is what the sentence says.
  */
  alt:
    "The Keyline Icons file open in Figma: a Catalog page of category boards, " +
    "each listing its icons by name, with the layer tree beside it showing one " +
    "component set per drawing.",
}

/**
 * The Paper screenshot, imported the same way and for the same reasons.
 */
const PAPER_MOCKUP = {
  image: paperMockup,
  /*
    What this picture is evidence *of* is that the Paper file is the set rather
    than a sample of it: a cover stating the totals, a board per category, and a
    layer tree in which every drawing is named.
  */
  alt:
    "The Keyline Icons file open in Paper: a Catalog page whose cover states " +
    "the totals, then one board per category listing its icons by name with " +
    "each icon's containered and filled forms beside it, and a layer tree " +
    "down the left naming every category and drawing.",
}

/**
 * A screenshot on its mat.
 *
 * `bg-muted` with 8px of padding around the image: a mat rather than a border.
 * A screenshot of an editor is a light document on a light page, so without
 * something behind it the picture has no edge at all on the left and right where
 * its own background is white; the mat is the same recessed grey as the terminal
 * above it, and it gives the image an edge in both themes.
 *
 * `overflow-hidden` because the rounding is on this element and the image inside
 * it is square-cornered. `rounded-xl` outside, `rounded-lg` inside, which is the
 * concentric pair the browser's tiles use.
 */
function Mockup({
  mockup,
}: {
  mockup: { image: StaticImageData; alt: string }
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-muted p-2">
      {/*
        `next/image` rather than an `img`: these are 3000px-wide PNGs, and what
        the page needs is the resized WebP for the width it is actually drawn at.

        `sizes` has to be told the truth or the browser assumes 100vw and
        fetches the largest candidate on every screen. Measured rather than
        reasoned: the page column tops out at 1376px (`max-w-360` is 1440 less
        the 32px of `lg:px-8` on each side), the mat takes 8px off each edge of
        that, so 1360px is the widest either image is ever drawn.

        Not `priority`. It sits five sections down the page and preloading it
        would compete with the hero for the first bytes.
      */}
      {/* No width or height: a static import carries its own, so they cannot
          disagree with the file the way a typed pair did. */}
      <Image
        src={mockup.image}
        alt={mockup.alt}
        sizes="(min-width: 1440px) 1360px, 100vw"
        className="h-auto w-full rounded-lg"
      />
    </div>
  )
}

/**
 * One of the four notes under a picture.
 *
 * A glyph, then a title, then one line. The left rule each of these carried is
 * gone: four vertical rules under a full-width screenshot drew four columns on a
 * block that already reads as four columns, and the rule was the only border in
 * the section on a page whose surfaces are fills.
 *
 * The glyph is the hero fact card's device without the card: the same 2px
 * keyline from the same set, one step down at 24px because the type under it is
 * `sm` rather than `lg`. It is also what replaces the rule as the thing that
 * starts each column: a drawing carries the alignment a hairline was doing, and
 * says something while it is there.
 */
function Note({
  icon,
  title,
  children,
}: {
  /* Resolved by the caller off `loadIcons()`. Optional because a renamed drawing
     should leave a gap here rather than take the landing page down with it, the
     same call `app/page.tsx` makes for the hero's three. */
  icon?: Icon
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      {icon?.art.stroke && <Glyph art={icon.art.stroke} size={24} stroke={2} />}
      <h3 className="mt-4 text-base font-medium tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  )
}

/**
 * The row of four notes under a picture.
 *
 * Four across at `lg`, two at `sm`, one on a phone. Not four across at `sm`:
 * these are sentences, and a quarter of a 640px screen is a column eleven
 * characters wide.
 *
 * `mt-5 lg:mt-6` on top of the block's own gap, so the two gaps in this section
 * are deliberately unequal: the picker sits tight against the picture it labels,
 * and the notes stand off it, because they are commentary on the picture rather
 * than part of it. One even gap down the whole block made the four glyphs read
 * as a row inside the mat above them.
 */
function Notes({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
      {children}
    </div>
  )
}

/**
 * A path, a property or a command inside a sentence.
 *
 * `components/keyline-showcase.tsx` sets prose code the same way. In full-
 * strength ink against the muted paragraph around it, because the point of it is
 * that these are literal names: `raw/` is a directory, `Container` is a property,
 * and a reader should be able to tell which words they could type.
 */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-foreground">{children}</code>
  )
}

/**
 * The section's body: a header row, then whichever file's panel is chosen.
 *
 * The row across the top is the two things a reader does with this section —
 * choose the tool, or go and open the file — put at opposite ends of the page
 * column. The button was centred under the notes at the foot of the block, which
 * is where a section ends rather than where a toolbar goes, and it left the
 * picker floating alone above a full-width picture.
 *
 * Each picture runs the full width of the column because it is the evidence and
 * everything else here is annotation. It was a panel in the right-hand half of a
 * two-column block first, with the notes stacked down the left; at half width a
 * screenshot of an editor is a picture of an editor with nothing legible in it.
 *
 * `gap-3 lg:gap-4` down the block, a quarter of what it started at. The picture
 * is a big flat rectangle and the two rows around it are small, so air between
 * them read as three separate blocks that happened to land in one section rather
 * than as one block with a picture in it. The section's own `py-16 lg:py-24` is
 * what holds it off the page; nothing inside needs to repeat that job at half
 * strength.
 */
export function FigmaShowcase({ icons }: { icons: Icon[] }) {
  /* One drawing per note, in the order the notes appear, resolved here so every
     name this component renders comes from the two lists `check-demos` reads. */
  const glyph = (name: string) => icons.find((icon) => icon.name === name)
  const [setGlyph, exportGlyph, searchGlyph, checkGlyph] =
    DESIGN_NOTE_ICON_NAMES.map(glyph)
  const [boardGlyph, layerGlyph, builtGlyph, sheetGlyph] =
    PAPER_NOTE_ICON_NAMES.map(glyph)

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <DesignFileTabs
        urls={{ figma: SET_FIGMA_URL, paper: SET_PAPER_URL }}
        panels={{
          figma: (
            <>
              <Mockup mockup={MOCKUP} />
              <Notes>
                <Note icon={setGlyph} title="One component set per icon">
                  Two variant properties on it, <Code>Container</Code> and{" "}
                  <Code>Style</Code>, and nothing else. The names in Figma are
                  the names on disk.
                </Note>

                <Note icon={exportGlyph} title="Exports land untouched">
                  <Code>raw/</Code> holds what came out of Figma, one file per
                  variant, under the name Figma gives it:{" "}
                  <Code>Container=circle, Style=duotone.svg</Code>.
                </Note>

                <Note icon={searchGlyph} title="Search words come from the file">
                  Each set&rsquo;s own description in Figma is the alias list the
                  browser searches, baked out by the keyword step rather than
                  kept in a second table.
                </Note>

                <Note icon={checkGlyph} title="Checked against the repository">
                  <Code>icons:figma</Code> hashes every segment of every variant
                  in the file and diffs it against <Code>raw/</Code>. Twelve
                  blank phones were found that way.
                </Note>
              </Notes>
            </>
          ),
          paper: (
            <>
              <Mockup mockup={PAPER_MOCKUP} />
              <Notes>
                <Note icon={boardGlyph} title="One artboard per category">
                  The canvas is the catalogue: a board per section, split across
                  a few when a section carries more drawings than one board
                  should.
                </Note>

                <Note icon={layerGlyph} title="Layers carry the icon's name">
                  Every drawing is named in the layer tree the way it is named on
                  disk, down to the variant: <Code>circle-check duotone</Code>.
                </Note>

                <Note icon={builtGlyph} title="Generated, not redrawn">
                  <Code>paper:build</Code> composes the whole set out of{" "}
                  <Code>icons/</Code>, so the Paper file is downstream of the
                  same drawings the packages ship.
                </Note>

                <Note icon={sheetGlyph} title="The sheets are checked in CI">
                  <Code>paper:check</Code> re-composes them and fails on any
                  difference, so what the file was built from cannot go stale
                  without the build saying so.
                </Note>
              </Notes>
            </>
          ),
        }}
      />
    </div>
  )
}
