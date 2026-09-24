import {
  loadIcons,
  SET_RELEASES,
  SET_UNRELEASED,
  SET_VERSION,
  toStyleArt,
  type Corners,
  type Icon,
  type Redraw,
  type ReleaseTopic,
  type StyleArt,
} from "@/lib/icons"
import {
  CHANGELOG_SHARP_ICON_NAMES,
  CHANGELOG_STYLES_ICON_NAMES,
  FOUR_STYLES_RELEASE,
  SHARP_RELEASE,
} from "@/lib/changelog"
import { iconHref } from "@/lib/icon-pages"
import { categoryOf } from "@/lib/icon-taxonomy"
import { pageMetadata } from "@/lib/seo"
import {
  RAIL_ASIDE,
  RAIL_COLUMN,
  RAIL_PAGE,
  SET_TITLE,
} from "@/lib/site-chrome"
import { SiteFooter } from "@/components/site-footer"
import { SiteNav } from "@/components/site-nav"
import { artOf, Glyph, STYLES } from "@/components/glyph"
import { ReactLogo } from "@/components/brand-logos"
import { prose } from "@/components/prose"
import { ReleaseFold } from "@/components/release-fold"
import { ArrowRight } from "@/components/icons"
import { ContentsLabel } from "@/components/page-contents"
import { ReleaseTicks, type ReleaseTick } from "@/components/release-ticks"
import Link from "next/link"

/**
 * What has shipped, release by release.
 *
 * One entry per release, newest first, every release that has ever been cut.
 * An earlier version of it grouped every drawing by the day it was committed
 * and printed all 484 of them as tiles: a second icon browser, filed by date,
 * answering a question `/icons` and the icon pages already answer better. A
 * changelog is for the release, not for the inventory.
 *
 * **Entries are never removed and never rewritten.** The page is generated, so
 * every cut rebuilds it from scratch, and for two releases it was built from
 * `SET_RELEASED_*` and `SET_PREVIOUS_RELEASED_*` — which describe two releases
 * and therefore silently deleted the third. Cutting v0.1.2 dropped v0.1.0 off
 * the bottom and relabelled v0.1.1 "Initial release". Anything added here must
 * read `SET_RELEASES`, which holds all of them, rather than the two scalars.
 *
 * The Figma file carries the same page, written by hand. The two are meant to
 * say the same thing, so an edit here is an edit there.
 *
 * Everything countable is counted. `loadIcons` memoises, so the numbers cost
 * nothing the page was not already paying, and a number typed into a string is
 * a claim with an expiry date. This repo has already shipped one: three counts
 * on the install page, stale by 27 icons before anyone noticed.
 */

/**
 * "1 drawing", not "1 drawings".
 *
 * The page shipped `{n} drawings` for every count including one, which reads as
 * a machine talking. A release that adds a single icon is the common case, so
 * this is not an edge.
 */
/* Grouped, because these reach four figures now: a release that adds a
   treatment counts drawings rather than names, and "1497" beside "2,994" in the
   same sentence reads as two different kinds of number. */
const plural = (n: number, one: string, many = one + "s") =>
  `${n.toLocaleString("en-US")} ${n === 1 ? one : many}`

/**
 * One drawing, named, and a link to its page.
 *
 * At 24px, the size the set is built at and used at: here they are being
 * identified rather than admired, which is the cover's job. The name is set in
 * mono because it is an identifier, the string a reader types into an import,
 * not a caption. It sits at three quarters of the ink rather than on
 * `--muted-foreground`, which at 11px on `--muted` falls just short of AA.
 *
 * `prefetch={false}`, for the reason written out on the landing page: a release
 * entry holds dozens of these, and Next would load every icon page a reader
 * merely scrolled past, on a plan that meters requests.
 */
function Tile({
  name,
  href,
  children,
  caption,
}: {
  name: string
  href: string | null
  children: React.ReactNode
  caption?: React.ReactNode
}) {
  const body = (
    <>
      <span className="flex h-8 items-center justify-center gap-2.5 text-foreground">
        {children}
      </span>
      <span className="w-full truncate text-center font-mono text-[11px] leading-tight tracking-tight text-foreground/75 transition-colors group-hover:text-foreground">
        {name}
        {caption}
      </span>
    </>
  )
  const tile =
    "group flex flex-col items-center gap-2.5 rounded-xl bg-muted px-2 pt-4 pb-3"

  return (
    <li className="flex">
      {href ? (
        <Link
          href={href}
          prefetch={false}
          className={`${tile} w-full transition-colors hover:bg-muted-hover`}
        >
          {body}
        </Link>
      ) : (
        <span className={`${tile} w-full`}>{body}</span>
      )}
    </li>
  )
}

/** Shared by the release tiles and the sharp preview so the two cannot drift. */
const TILE_GRID =
  "not-prose grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-2"

function Tiles({ icons }: { icons: Icon[] }) {
  return (
    <ul className={TILE_GRID}>
      {icons.map((icon) => (
        <Tile key={icon.name} name={icon.name} href={iconHref(icon.name)}>
          <Glyph art={icon.art.stroke!} size={24} stroke={2} />
        </Tile>
      ))}
    </ul>
  )
}

/**
 * A taste of a treatment or a style, faded out at the bottom, with a link to
 * all of it.
 *
 * The tiles are the release tiles with another drawing in them, deliberately:
 * a second tile component is how one surface starts disagreeing with another
 * about what an icon looks like, and the only thing that differs here is which
 * drawing goes in.
 *
 * The fade is a mask rather than a gradient laid over the top. An overlay has
 * to know the colour behind it, so it is a white rectangle that turns into a
 * white rectangle on a dark page unless someone remembers to theme it; a mask
 * takes the tiles out of the paint and lets whatever is behind them through,
 * which is right in both themes and needs no token.
 *
 * The count under it is the whole set rather than what the fade hides, and
 * that is the point of writing it this way: how many are cut off depends on
 * how wide the window is, so a remainder would be a number that is only true
 * at one size.
 */
function FadedPreview({
  icons,
  draw,
  href,
  children,
}: {
  icons: Icon[]
  draw: (icon: Icon) => StyleArt | undefined
  href: string
  children: React.ReactNode
}) {
  return (
    <div className="not-prose">
      <ul
        className={TILE_GRID}
        style={{
          maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 55%, transparent 100%)",
        }}
      >
        {icons.map((icon) => (
          <Tile key={icon.name} name={icon.name} href={iconHref(icon.name)}>
            <Glyph art={draw(icon)!} size={24} stroke={2} />
          </Tile>
        ))}
      </ul>
      <SeeAll href={href}>{children}</SeeAll>
    </div>
  )
}

/** The sharp half, under v0.3.0. `?corners=sharp` lands the browser on it. */
function SharpPreview({ icons, total }: { icons: Icon[]; total: number }) {
  return (
    <FadedPreview
      icons={icons}
      draw={(icon) => artOf(icon, "stroke", "sharp")}
      href="/icons?corners=sharp"
    >
      See all {total.toLocaleString("en-US")} in sharp
    </FadedPreview>
  )
}

/**
 * Two-tone, then duotone, under 1.0.0's Four styles: the style that got its
 * name in that release and the one that was drawn for everything in it.
 * `?style=` seeds the browser's style filter, so each link arrives on the
 * style it just showed.
 */
function StylesPreview({
  icons,
  totals,
}: {
  icons: Icon[]
  totals: Record<"two-tone" | "duotone", number>
}) {
  return (
    <div className="flex flex-col gap-10">
      {(["two-tone", "duotone"] as const).map((style) => (
        <FadedPreview
          key={style}
          icons={icons}
          draw={(icon) => icon.art[style]}
          href={`/icons?style=${style}`}
        >
          See all {totals[style].toLocaleString("en-US")} in {style}
        </FadedPreview>
      ))}
    </div>
  )
}

function SeeAll({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <p className="mt-4 text-sm">
      <Link
        href={href}
        prefetch={false}
        className="group inline-flex items-center gap-1.5 font-medium text-foreground"
      >
        <span className="underline underline-offset-4 group-hover:no-underline">
          {children}
        </span>
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </p>
  )
}

/**
 * A redrawn drawing, taken apart ready to render.
 *
 * The two documents are parsed once in `release()` rather than in the markup,
 * so the component below is a layout and nothing else.
 */
type Pair = {
  name: string
  before: StyleArt | null
  after: StyleArt | null
  /** The treatment both halves were drawn in. See `Redraw` in `lib/icons.ts`. */
  corners: Corners | null
  /** Whether the name still has a page. A renamed drawing's old name does not. */
  live: boolean
}

/**
 * How many sharp corrections the list draws before it hands over to a link.
 *
 * The cut moves a diagonal end by 0.414 of a unit and these are drawn at 24px,
 * so past the first few the reader is shown the same two thumbnails over and
 * over: 303 pairs whose files genuinely differ and whose pictures do not. Six
 * is a row of the grid at its narrowest, which reads as a sample rather than as
 * a list that gave up. Rounded pairs are never capped — those are corrections a
 * reader can actually see.
 */
const SHARP_SHOWN = 6

/**
 * What was redrawn, shown as the change rather than as a claim.
 *
 * A changelog that only names a corrected drawing is asking the reader to
 * remember what it used to look like, and nobody can — which is the whole
 * reason the icon was worth correcting. So the entry carries both drawings out
 * of the refs that bound the release and prints them side by side.
 *
 * Both at the same size, in the same ink, on the same ground: the difference
 * between them is the only thing that should differ, so anything the layout
 * does to one of them it does to both. The pair falls back to whichever half
 * exists, which is the resting state for a drawing that was committed without
 * visibly moving.
 *
 * "Before" and "After" are said once, beside the section's chip, rather than
 * under every drawing: printed per tile they were ninety-eight labels saying
 * the same two words, and the arrow already says which way the change runs.
 * Each drawing still carries its word for a screen reader.
 *
 * A sharp pair says so under the name. Two squared-off drawings shown with the
 * bare name read as the rounded drawing having been squared off, and a release
 * spent entirely in the sharp half — the diagonal end cut, 315 drawings, not
 * one rounded one — would be published as 315 corrections to drawings nobody
 * touched. Rounded carries no marker: it is what a pair is unless it says
 * otherwise, and marking both halves of a distinction is how a caption stops
 * being read at all.
 */
function Redrawn({ pairs }: { pairs: Pair[] }) {
  const rounded = pairs.filter((pair) => pair.corners !== "sharp")
  const sharp = pairs.filter((pair) => pair.corners === "sharp")
  const shown = [...rounded, ...sharp.slice(0, SHARP_SHOWN)]

  const face = (art: StyleArt | null, label: string) =>
    art && (
      <span className="relative">
        <Glyph art={art} size={24} stroke={2} />
        <span className="sr-only">{label}</span>
      </span>
    )

  return (
    <div>
      <ul className="not-prose grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-2">
        {shown.map((pair) => (
          <Tile
            key={pair.name}
            name={pair.name}
            href={pair.live ? iconHref(pair.name) : null}
            caption={
              pair.corners === "sharp" && (
                <span className="text-muted-foreground"> · sharp</span>
              )
            }
          >
            {face(pair.before, "Before")}
            {pair.before && pair.after && (
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 text-muted-foreground"
              />
            )}
            {face(pair.after, "After")}
          </Tile>
        ))}
      </ul>

      {/*
        The count is every sharp correction, not the remainder behind the cut:
        how many the grid shows is fixed but how many fit a row is not, so a
        remainder would be a number that is only true at one width. Same
        reasoning, and the same destination, as the sharp preview above.
      */}
      {sharp.length > SHARP_SHOWN && (
        <SeeAll href="/icons?corners=sharp">
          See all {sharp.length} in sharp
        </SeeAll>
      )}
    </div>
  )
}

/**
 * The cover's drawings, and the arithmetic that crops them.
 *
 * Same construction as the blog index's band, for the same reason: with a hard
 * edge the crop has to land in the gap under a row rather than through one, so
 * the height is derived from the glyph and the gap rather than picked. Change
 * `size-9` or `gap-7` below and these change with them.
 */
const COVER_GLYPH = 36
const COVER_GAP = 28
const COVER_ROWS = 3
/**
 * A row at the column's widest: 768 less the page's 32 a side and the cover's
 * 40 leaves a 624px line, which takes ten 36px drawings 28 apart. It was 60
 * shown for 30 seen, and fourteen covers drawing twice what the crop lets
 * through was 400 SVGs nobody could see. Widen the column and this moves.
 */
const COVER_PER_ROW = 10
const COVER_SHOWN = COVER_ROWS * COVER_PER_ROW
/**
 * Below this a release goes without a cover. Two drawings centred in a band
 * the width of the column read as a frame somebody forgot to fill, and a
 * release that small shows every drawing a few lines further down anyway.
 */
const COVER_FEWEST = 6
/** A line of the four-styles cover: one row, as many as the widest holds. */
const COVER_COLUMNS = COVER_PER_ROW
const coverHeight = (rows: number) =>
  rows * COVER_GLYPH + (rows - 1) * COVER_GAP

type CoverItem = { key: string; art: StyleArt }

/**
 * The release's own drawings, as the picture at the top of its entry.
 *
 * This slot held the same card fourteen times: a dotted ground, the version in
 * a blue pill and the wordmark under it. It said nothing a rail beside it was
 * not already saying, and a changelog whose every cover is identical is a
 * template with the releases poured into it. A release of an icon set has a
 * picture of itself to hand, so that is what goes here, drawn from `icons/`
 * at request time like every other drawing on the site.
 *
 * `lines` is one field that wraps, or several lines that each show one row.
 * The second is the four-styles cover: the same drawings in every line, a
 * style to a line, so a column is one drawing four ways. Cycling the styles
 * across one field was tried first and read as noise, a fill landing beside a
 * stroke at random. Every line holds the same drawings at the same size, so
 * each one wraps at the same place and the columns line up without a grid.
 *
 * Centred rather than pinned left, because unlike the blog's band nothing
 * shares an edge with it inside the frame, and a release of six drawings sits
 * in the middle of its cover rather than in a corner of it. The frame takes its
 * height from the rows it holds rather than a minimum: one row in a band sized
 * for three is mostly grey. Whole rows only: see `coverHeight`.
 *
 * Decoration, so it is inert and `aria-hidden`: every drawing in it is listed
 * by name below, under the shelf it belongs to.
 */
function Cover({ lines }: { lines: CoverItem[][] }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center justify-center gap-7 rounded-2xl bg-muted px-6 py-12 sm:px-10 sm:py-14"
    >
      {lines.map((items, i) => (
        <div
          key={i}
          className="flex w-full flex-wrap content-start justify-center gap-7 overflow-hidden text-foreground"
          style={{ maxHeight: coverHeight(lines.length > 1 ? 1 : COVER_ROWS) }}
        >
          {items.map((item) => (
            <Glyph
              key={item.key}
              art={item.art}
              size={24}
              stroke={1.5}
              className="size-9 shrink-0"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * Deals the drawings out one shelf at a time.
 *
 * A release lists its names in the order git added them, which is families in a
 * run: v0.9.0 opens with nine trucks, so its first two rows would have been
 * a picture of a truck. Taking one from each shelf in turn puts the plane, the
 * leaf, the flask and the lungs in the first row, which is what the release
 * actually was.
 */
function byShelf(icons: Icon[]): Icon[] {
  const shelves = new Map<string, Icon[]>()
  for (const icon of icons) {
    const label = categoryOf(icon.base)
    shelves.set(label, [...(shelves.get(label) ?? []), icon])
  }
  const queues = [...shelves.values()]
  const dealt: Icon[] = []
  for (let round = 0; dealt.length < icons.length; round++) {
    for (const queue of queues) if (queue[round]) dealt.push(queue[round])
  }
  return dealt
}

/**
 * What a release's cover shows: what it added, then what it redrew.
 *
 * The four-styles release lays its drawings out a style to a line, and the
 * sharp release shows the curated sharp sample, because those are what each of
 * them announced. A release that changed no drawing, or too few to fill a row,
 * gets no cover rather than a picture of something else.
 */
function coverOf({
  version,
  icons,
  redrawn,
  sharp,
}: {
  version: string
  icons: Icon[]
  redrawn: Pair[]
  sharp: Icon[]
}): CoverItem[][] {
  if (version === SHARP_RELEASE)
    return [
      sharp.map((icon) => ({
        key: icon.name,
        art: artOf(icon, "stroke", "sharp")!,
      })),
    ]
  const dealt = byShelf(icons)
  if (version === FOUR_STYLES_RELEASE && dealt.length > 0)
    return STYLES.map((style) =>
      dealt.slice(0, COVER_COLUMNS).flatMap((icon) => {
        const art = artOf(icon, style)
        return art ? [{ key: icon.name, art }] : []
      })
    )
  const field = [
    ...dealt.map((icon) => ({ key: icon.name, art: icon.art.stroke! })),
    ...redrawn
      .filter((pair) => pair.after && pair.corners !== "sharp")
      .map((pair) => ({ key: `redrawn-${pair.name}`, art: pair.after! })),
  ].slice(0, COVER_SHOWN)
  return field.length >= COVER_FEWEST ? [field] : []
}

/** Everything under a chip, shelves included, for the count beside it. */
const drawingsIn = (topic: ReleaseTopic): number =>
  topic.names.length +
  topic.updatedNames.length +
  topic.sections.reduce((n, section) => n + drawingsIn(section), 0)

const redrawsIn = (topic: ReleaseTopic): boolean =>
  topic.updatedNames.length > 0 || topic.sections.some(redrawsIn)

/**
 * A release read section by section: a shelf's title, its sentence, what it
 * added, what it redrew, then the next shelf.
 *
 * Zafar, 17 Sep 2026: "topic > icons, topic > icons. not all topics first and
 * then all icons after that", then "categorize them, not just text > icons.
 * titles, etc." The note led and forty tiles followed it, so the sentence about
 * the phone's calls sat a screen above the phones. A section with no drawings
 * is an announcement on its own; the last group, if the generator had to make
 * one, has no title and holds whatever no section claimed.
 *
 * Then "redrawns deserve to be a separate topic, not within a topic and each
 * subtitle must carry shareable link like the main titles": every redraw sits
 * under one Redrawn section whose shelves are sections of their own, and every
 * title is a link to itself.
 */
function Chips({
  topics,
  byName,
  redrawn,
  extra,
}: {
  topics: ReleaseTopic[]
  byName: Map<string, Icon>
  redrawn: Pair[]
  /** Something drawn under one section's sentence, found by its anchor. */
  extra?: { anchor: string; node: React.ReactNode }
}) {
  const pairOf = new Map(redrawn.map((pair) => [pair.name, pair]))
  const drawings = (topic: ReleaseTopic) => {
    const icons = topic.names
      .map((name) => byName.get(name))
      .filter(Boolean) as Icon[]
    const pairs = topic.updatedNames
      .map((name) => pairOf.get(name))
      .filter(Boolean) as Pair[]
    return (
      <>
        {icons.length > 0 && <Tiles icons={icons} />}
        {pairs.length > 0 && <Redrawn pairs={pairs} />}
      </>
    )
  }
  return (
    <>
      {topics.map((topic, i) => {
        const glyph = topic.icon && byName.get(topic.icon)
        const Logo = topic.logo ? LOGOS[topic.logo] : undefined
        const count = drawingsIn(topic)
        return (
          <div
            key={topic.anchor ?? i}
            id={topic.anchor ?? undefined}
            className="mt-14 scroll-mt-24"
          >
            {/*
              The chip is Preline's: a drawing in a white disc and a label, on a
              muted pill. It is a link here where Preline's is not, on Zafar's
              word that every subtitle carries a shareable link like the
              release titles do. The count beside the label is everything under
              the chip, so a reader knows how long a section is before
              scrolling into it.
            */}
            {topic.title && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={`#${topic.anchor}`}
                  className="inline-flex items-center gap-x-2.5 rounded-full bg-muted py-1 ps-1 pe-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted-hover"
                >
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-background text-foreground shadow-xs">
                    {Logo ? (
                      <Logo className="size-4" />
                    ) : (
                      glyph && (
                        <Glyph art={glyph.art.stroke!} size={16} stroke={2} />
                      )
                    )}
                  </span>
                  {topic.title}
                  {count > 0 && (
                    <span className="font-normal text-muted-foreground tabular-nums">
                      {count.toLocaleString("en-US")}
                    </span>
                  )}
                </a>
                {redrawsIn(topic) && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest text-muted-foreground uppercase">
                    Before
                    <ArrowRight aria-hidden="true" className="size-3" />
                    After
                  </span>
                )}
              </div>
            )}
            <div className="mt-5 flex flex-col gap-5">
              {topic.text && (
                <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {prose(topic.text)}
                </p>
              )}
              {extra && topic.anchor === extra.anchor && extra.node}
              {drawings(topic)}
              {topic.sections.map((item, j) => (
                <div
                  key={item.anchor ?? j}
                  id={item.anchor ?? undefined}
                  className="mt-4 flex scroll-mt-24 flex-col gap-4 first:mt-0"
                >
                  {/* Preline's bold lead ("Fixed:", "Docs:"), as a link, in
                      the ink the sentence after it steps down from. */}
                  <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                    {item.title && (
                      <a
                        href={`#${item.anchor}`}
                        className="font-semibold text-foreground underline-offset-4 hover:underline"
                      >
                        {item.title}:
                      </a>
                    )}{" "}
                    {item.text && prose(item.text)}
                  </p>
                  {drawings(item)}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

/**
 * Marks a chip can carry in place of a drawing, by the key the topics file
 * names. A chip about a platform shows that platform's own mark, the way the
 * install page's framework picker does, because a drawing of ours standing in
 * for it would be the set claiming a logo it does not ship.
 */
const LOGOS: Record<string, typeof ReactLogo> = { react: ReactLogo }

/**
 * The chips a release gets when nobody wrote it any: what git says it added and
 * what it redrew, each under Preline's chip, so an old entry reads the same way
 * a written one does.
 */
const defaultChips = (
  anchor: string,
  names: string[],
  updatedNames: string[]
): ReleaseTopic[] =>
  [
    {
      title: "New drawings",
      icon: "sparkles",
      key: "new-drawings",
      names,
      updatedNames: [],
    },
    { title: "Redrawn", icon: "pen", key: "redrawn", names: [], updatedNames },
  ]
    .filter((c) => c.names.length || c.updatedNames.length)
    .map(({ key, ...c }) => ({
      ...c,
      anchor: `${anchor}-${key}`,
      text: null,
      sections: [],
    }))

/**
 * A release's heading: the set's name and the version, then the title.
 *
 * Zafar, 18 Sep 2026: "titles in changelog should lead with Keyline Icons
 * v*:". Built here rather than typed into `lib/icon-release-topics.json`, so
 * every entry carries it and no title can carry a stale one. The unreleased
 * entry takes the version its work is heading for, which is the version the
 * history file keys its title by; a release without a title is the name and
 * version alone.
 */
const headline = (version: string, title: string | null | undefined) =>
  title ? `${SET_TITLE} v${version}: ${title}` : `${SET_TITLE} v${version}`

/**
 * One release: a line naming it, the release's title as a link to itself, its
 * summary, its cover and its chips.
 *
 * **The title leads and the cover follows it**, which is the other way round
 * from Preline: the headline is what a reader scanning the page is reading
 * for, and with the picture first it sat a cover's height below the top of
 * the entry.
 *
 * The version, the date and what the set held at that tag sit on one line
 * above the title. They lived in a sticky rail beside each entry until the
 * rail gave way to `ReleaseTicks`, which marks where the reader is from one
 * place in the margin; a release has to say what it is where it starts, so
 * the facts moved into the entry. The version wears the blog's badge, and the
 * newest entry's badge carries the site's blue dot, the one that marks what is
 * new in the browser.
 */
function Release({
  id,
  badge,
  date,
  dateTime,
  tag,
  count,
  current,
  title,
  summary,
  notice,
  cover,
  children,
}: {
  id: string
  badge: string
  date: string
  dateTime?: string
  /** A word after the date: "Initial release". */
  tag?: string
  count: number
  current: boolean
  title: string
  summary: React.ReactNode
  notice?: string | null
  cover: CoverItem[][]
  children: React.ReactNode
}) {
  return (
    <section id={id} className="min-w-0 scroll-mt-24 pb-20 sm:pb-28">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] tracking-widest text-muted-foreground uppercase">
        <a
          href={`#${id}`}
          className="inline-flex items-center gap-1.5 rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs tracking-tight text-foreground normal-case transition-colors hover:bg-muted-hover"
        >
          {current && (
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
          )}
          {badge}
        </a>
        {dateTime ? (
          <time dateTime={dateTime}>{date}</time>
        ) : (
          <span>{date}</span>
        )}
        {tag && <span>{tag}</span>}
        <span className="tracking-normal normal-case tabular-nums">
          {plural(count, "name")}
        </span>
      </div>
      <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-[1.75rem]">
        <a
          href={`#${id}`}
          className="text-foreground underline-offset-[6px] hover:underline"
        >
          {title}
        </a>
      </h2>
      <div className="mt-3 flex max-w-2xl flex-col gap-3 text-base leading-relaxed text-muted-foreground">
        {summary}
      </div>
      {notice && (
        <p className="mt-5 inline-flex max-w-2xl items-start gap-2.5 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          <span
            aria-hidden="true"
            className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
          />
          {notice}
        </p>
      )}
      {cover.length > 0 && (
        <div className="mt-8">
          <Cover lines={cover} />
        </div>
      )}
      {children}
    </section>
  )
}

/**
 * The stored documents, parsed, with today's drawing as the fallback.
 *
 * A redraw that the generator could not find a visible change for carries no
 * pair, and the honest thing to show for it is the drawing as it stands rather
 * than nothing at all — the icon was still touched in that release. It is the
 * drawing in that redraw's own treatment: falling back to the rounded stroke
 * for a sharp redraw would put the wrong drawing under the caption saying
 * sharp, which is worse than showing nothing.
 */
const pairs = (redraws: Redraw[], byName: Map<string, Icon>): Pair[] =>
  redraws.map((redraw) => {
    const icon = byName.get(redraw.name)
    return {
      name: redraw.name,
      corners: redraw.corners,
      live: Boolean(icon),
      before: redraw.before ? toStyleArt(redraw.before) : null,
      after: redraw.after
        ? toStyleArt(redraw.after)
        : ((icon && artOf(icon, "stroke", redraw.corners ?? "regular")) ??
          null),
    }
  })

/**
 * The release, and anything drawn since it.
 *
 * The release entry is dated by the tag rather than by the newest drawing. It
 * used to take the latter, which was right while the two were the same day and
 * became a lie the moment anything landed afterwards: an entry headed "Initial
 * release" would have carried today's date. What landed afterwards is its own
 * entry, which is the honest place for it.
 */
async function release() {
  const icons = await loadIcons()
  const dated = icons.filter((icon) => icon.history)
  const byName = new Map(icons.map((icon) => [icon.name, icon]))

  /*
   * The thirty are named in `lib/changelog.ts`, not sampled here.
   *
   * This was a spread — every nineteenth name — on the reasoning that a rule
   * needs no maintenance and a list does. The rule put six `circle-*` names in
   * the preview, and a circle has no corners: the ring is the biggest thing in
   * the tile and it is the same drawing in both treatments. The argument, and
   * what replaces the maintenance, are written where the list lives.
   *
   * The count under it stays the whole treatment, so it does not move when the
   * list does.
   */
  const withSharp = icons.filter((icon) => artOf(icon, "stroke", "sharp"))
  const sharpSample = CHANGELOG_SHARP_ICON_NAMES.map((name) =>
    byName.get(name)
  ).filter((icon): icon is Icon =>
    Boolean(icon && artOf(icon, "stroke", "sharp"))
  )

  const stylesSample = CHANGELOG_STYLES_ICON_NAMES.map((name) =>
    byName.get(name)
  ).filter((icon): icon is Icon =>
    Boolean(icon?.art["two-tone"] && icon.art.duotone)
  )

  return {
    count: dated.length,
    sharp: { sample: sharpSample, total: withSharp.length },
    styles: {
      sample: stylesSample,
      totals: {
        "two-tone": icons.filter((icon) => icon.art["two-tone"]).length,
        duotone: icons.filter((icon) => icon.art.duotone).length,
      },
    },
    /*
      One entry per release, newest first, straight off the generated list.
      Counts and membership are as of each tag rather than as of today: the
      entry under "The first cut of the set" used to print the current total,
      so the number grew every time a drawing landed and the sentence described
      a release that never contained them.
    */
    /*
      What has been drawn since the newest tag, if anything. Its own section
      rather than a row inside the newest release: that entry is headed
      "Released" over the tag's own date, and a drawing made after it was never
      in it. `grip-vertical` was drawn twelve hours after v0.1.4 and the page
      announced it as part of v0.1.4, which npm would have contradicted.
    */
    byName,
    unreleased: SET_UNRELEASED && {
      ...SET_UNRELEASED,
      icons: SET_UNRELEASED.names
        .map((name) => byName.get(name))
        .filter(Boolean) as Icon[],
      redrawn: pairs(SET_UNRELEASED.updated, byName),
    },
    entries: SET_RELEASES.map((entry, i) => ({
      ...entry,
      previous: SET_RELEASES[i + 1]?.version ?? null,
      /* Newest first, so the entry after this one in the array is the release
         before it in time, and the newest entry is the only one still current. */
      current: i === 0,
      // The drawings, not their names. A changelog that only names them makes
      // the reader go and look them up, which is the one thing this page is
      // placed to save them.
      icons: entry.names
        .map((name) => byName.get(name))
        .filter(Boolean) as Icon[],
      /* A release is not always drawings added. One that is entirely
         corrections could only say "0 drawings added", which is true and tells
         a reader nothing about why they would upgrade. */
      redrawn: pairs(entry.updated ?? [], byName),
    })),
  }
}

export async function generateMetadata() {
  const { count } = await release()

  return pageMetadata({
    path: "/changelog",
    // Word for word the `h1`, which is the whole point: Google rewrites a
    // title that disagrees with what the page visibly leads with. The root
    // layout's template appends the set name, so this is the page's own name
    // and nothing else.
    title: "Changelog",
    description:
      `Every release of Keyline Icons and what went into it. ${count.toLocaleString("en-US")} ` +
      `drawings on one 24×24 grid, in stroke, two-tone, duotone and fill, free under ` +
      `the MIT licence.`,
    socialDescription:
      "Every release of Keyline Icons and what went into it, newest first.",
  })
}

export default async function Page() {
  const { entries, unreleased, sharp, styles, byName } = await release()

  /*
    Two-tone and duotone under the sentence that announces them, in the
    release that split them, whether that release is still unreleased or
    tagged. Pinned by version for the reason the sharp preview is.
  */
  const stylesExtra = (version: string) =>
    version === FOUR_STYLES_RELEASE && styles.sample.length > 0
      ? {
          anchor: `v${FOUR_STYLES_RELEASE}-four-styles`,
          node: <StylesPreview icons={styles.sample} totals={styles.totals} />,
        }
      : undefined

  /*
    The count sentence, closed rather than leading into a strip: every drawing
    now sits under a chip, so nothing follows it directly.
  */
  const counted = (entry: (typeof entries)[number]) =>
    entry.initial
      ? `The first cut of the set: ${entry.count.toLocaleString("en-US")} drawings on one 24×24 grid, at a 2px keyline, built for shadcn/ui and free under the MIT licence, shipping as SVGs, JSX snippets and React components.`
      : entry.icons.length === 0 && entry.redrawn.length === 0
        ? `No drawing changes since ${entry.previous}. The set still holds ${entry.count.toLocaleString("en-US")}.`
        : entry.icons.length === 0 && entry.files > entry.previousFiles
          ? `${plural(entry.files - entry.previousFiles, "drawing")} added since ${entry.previous} without a new name, taking the set from ${entry.previousFiles.toLocaleString("en-US")} drawings to ${entry.files.toLocaleString("en-US")}.` +
            (entry.redrawn.length > 0
              ? ` ${entry.redrawn.length} redrawn.`
              : "")
          : entry.icons.length === 0
            ? `No new drawings. ${plural(entry.redrawn.length, "redrawn", "redrawn")} since ${entry.previous}, so the set still holds ${entry.count.toLocaleString("en-US")}.`
            : entry.redrawn.length === 0
              ? `${plural(entry.icons.length, "drawing")} added since ${entry.previous}, bringing the set to ${entry.count.toLocaleString("en-US")}.`
              : `${plural(entry.icons.length, "drawing")} added since ${entry.previous}, bringing the set to ${entry.count.toLocaleString("en-US")}, and ${plural(entry.redrawn.length, "redrawn", "redrawn")}.`

  /* The ticks, in page order, labelled the way each entry labels itself. */
  const ticks: ReleaseTick[] = [
    ...(unreleased
      ? [
          {
            id: "unreleased",
            version: "Unreleased",
            date: `Since v${unreleased.since}`,
            title: unreleased.title ?? null,
          },
        ]
      : []),
    ...entries.map((entry) => ({
      id: `v${entry.version}`,
      version: `v${entry.version}`,
      date: entry.label,
      title: entry.title ?? null,
    })),
  ]

  return (
    <>
      <SiteNav />

      {/*
        The prose measure `/blog` and `/install` keep, so the three pages that
        read as writing about the set sit in one column (Zafar, 17 Sep 2026:
        "keep the same container width as blog and install, but just place the
        list on the left, leaving the right side empty"). The page's own box
        was tried first, and the grids filled it at nine a row with the
        sentences stranded at the left of a very wide page.
      */}
      <main className={RAIL_PAGE}>
        <header className={`${RAIL_COLUMN} pt-6 pb-16 sm:pb-24`}>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Changelog
          </h1>
          <p className="mt-4 max-w-xl text-lg text-balance text-muted-foreground">
            Releases, new drawings and announcements, newest first.
          </p>
        </header>

        {/*
          The ticks hang in the left margin, outside the column, so the column
          stays centred where the blog's is and the right margin stays empty.
          The margin is the left track of `RAIL_PAGE`, which runs from the site
          container's edge to the column, so the ticks line up with the logo in
          the bar; the reasoning is on the constant. Its padding is the gap
          between the labels and the text.

          It starts at the first release rather than at the top of the page,
          so the first tick stands level with the first entry it marks (a
          line drawn under the header: "alignment issue"). `top-24` is the
          entries' own `scroll-mt-24`, and the 5px is half a tick row against
          half the version badge's 20px: a tick clicked lands its entry's
          badge on the same line the tick stands on.

          From `xl`: the margin beside a 768px column is 256px of room only
          from 1280 up, and a tick column without room for its labels is a
          control nobody can read. Every entry names its own version above
          its title either way.

          "On this page" is the label the install page's and the blog's rails
          wear (Zafar, 24 Sep 2026). It hangs above the ticks, out of the flow,
          so the first tick still stands level with the first entry and a
          clicked tick still lands its badge on its own line; in the flow it
          would have pushed the column down a label's height and broken both.
        */}
        <aside className={RAIL_ASIDE}>
          <div className="sticky top-24 pt-[5px]">
            <ContentsLabel className="absolute bottom-full pb-2" />
            <ReleaseTicks releases={ticks} />
          </div>
        </aside>

        <div className={RAIL_COLUMN}>
          {/*
          Work since the newest tag leads the page because it is what a
          returning reader is looking for, and it is badged "Unreleased" rather
          than by a version, because it does not have one yet: an install of the
          newest release does not contain it.
        */}
          {unreleased && (
            <Release
              id="unreleased"
              badge="Unreleased"
              date={`Since v${unreleased.since}`}
              count={unreleased.count}
              current
              title={headline(SET_VERSION, unreleased.title)}
              summary={
                <p>
                  {/*
                  Both halves, always. The sentence used to name whichever list
                  was non-empty and drop the other, so a stretch that added
                  three drawings and corrected six announced the three.
                */}
                  {unreleased.icons.length > 0 && unreleased.redrawn.length > 0
                    ? `${plural(unreleased.icons.length, "drawing")} added and ` +
                      `${unreleased.redrawn.length} redrawn since ${unreleased.since}`
                    : unreleased.icons.length > 0
                      ? `${plural(unreleased.icons.length, "drawing")} added since ${unreleased.since}`
                      : `${plural(unreleased.redrawn.length, "drawing")} redrawn since ${unreleased.since}`}
                  . The set is now {unreleased.count.toLocaleString("en-US")}.
                </p>
              }
              notice="In the repo and the design files. Not on npm until the next release."
              cover={coverOf({
                version: SET_VERSION,
                icons: unreleased.icons,
                redrawn: unreleased.redrawn,
                sharp: sharp.sample,
              })}
            >
              {!unreleased.topics && unreleased.note && (
                <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {unreleased.note}
                </p>
              )}
              <Chips
                topics={
                  unreleased.topics ??
                  defaultChips(
                    "unreleased",
                    unreleased.names,
                    unreleased.updatedNames
                  )
                }
                byName={byName}
                redrawn={unreleased.redrawn}
                extra={stylesExtra(SET_VERSION)}
              />
            </Release>
          )}

          {entries.map((entry) => (
            <Release
              key={entry.version}
              id={`v${entry.version}`}
              badge={`v${entry.version}`}
              date={entry.label}
              dateTime={entry.date.slice(0, 10)}
              /*
              "Initial release" belongs to the oldest tag and to nothing else.
              It used to be printed over whichever entry happened to be second
              on the page, which made every release after the second one
              announce its predecessor as the first cut of the set.
            */
              tag={entry.initial ? "Initial release" : undefined}
              count={entry.count}
              current={entry.current && !unreleased}
              title={headline(entry.version, entry.title)}
              summary={
                <>
                  {entry.note && !entry.topics && (
                    <p className="text-foreground">{entry.note}</p>
                  )}
                  <p>{counted(entry)}</p>
                </>
              }
              cover={
                entry.initial
                  ? coverOf({
                      version: entry.version,
                      icons: entry.icons,
                      redrawn: [],
                      sharp: [],
                    })
                  : coverOf({
                      version: entry.version,
                      icons: entry.icons,
                      redrawn: entry.redrawn,
                      sharp: sharp.sample,
                    })
              }
            >
              {(() => {
                const topics =
                  entry.topics ??
                  defaultChips(
                    `v${entry.version}`,
                    entry.names,
                    entry.updatedNames
                  )
                const content = (
                  <>
                    {/*
                    A look at the treatment, under the sentence that announces
                    it. Pinned to the release that introduced it rather than to
                    whatever carries a note: every later release may have a
                    note of its own, and none of them is announcing sharp.
                  */}
                    {entry.version === SHARP_RELEASE && sharp.total > 0 && (
                      <div className="mt-12">
                        <SharpPreview
                          icons={sharp.sample}
                          total={sharp.total}
                        />
                      </div>
                    )}
                    {!entry.initial && (
                      <Chips
                        topics={topics}
                        byName={byName}
                        redrawn={entry.redrawn}
                        extra={stylesExtra(entry.version)}
                      />
                    )}
                  </>
                )
                /* Only the first entry on the page opens in full, the way the
                   design files carry drawings on their newest entry alone: the
                   open window's, else the newest tag's. A release of a row or
                   so fits inside the fold, so it stays open rather than wear a
                   toggle that reveals nothing. */
                const folds =
                  (unreleased || !entry.current) &&
                  !entry.initial &&
                  (entry.icons.length + entry.redrawn.length > 10 ||
                    entry.version === SHARP_RELEASE)
                return folds ? (
                  <ReleaseFold
                    version={entry.version}
                    anchors={topics.flatMap((topic) =>
                      [
                        topic.anchor,
                        ...topic.sections.map((s) => s.anchor),
                      ].filter((a): a is string => Boolean(a))
                    )}
                  >
                    {content}
                  </ReleaseFold>
                ) : (
                  content
                )
              })()}
            </Release>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
