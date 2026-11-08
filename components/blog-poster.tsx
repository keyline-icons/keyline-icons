import Image from "next/image"

import type { BlogCover } from "@/lib/blog"
import { STYLES, type Icon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Glyph } from "@/components/glyph"

/**
 * The posters on the blog index, one per post, inside Apple Newsroom style
 * tiles (his reference, 1 Nov 2026).
 *
 * An update's is the icon wall of his release posters in the X file, the
 * v1.4.0 pair he pointed at ("the attached style looks better"): each new
 * drawing in its four styles side by side, rows of them above and below a
 * one-message hole. Each update has a colour of its own (`TONES`), pale in
 * light mode and deep in dark mode (his calls: "use both light for light,
 * dark for dark", then "do something about all of them being gray").
 *
 * Drawn live from `icons/`, like every picture of this set on the site: a PNG
 * would be a picture of the drawings on the day it was exported. Sized in
 * container units, so one layout serves a 300px tile and a 560px one.
 *
 * Every update wears this one (8 Nov 2026: "we are sticking to one style for
 * update posters"). 2.5.0's exported colour bento was the single exception and
 * stood out in the row, so it went back to the wall.
 */

/** Two drawings to a row, each in its four styles: the poster's eight columns. */
const PER_ROW = 2
/** Two rows above the message and two below, as the release posters run. */
const ROWS_ABOVE = 2
const ROWS_BELOW = 2

/**
 * The poster colours: the six of his colour set of use-case posters in the X
 * file (violet, emerald, sky, amber, rose, indigo). They colour the drawings
 * and the words, never the ground: the poster is the page's own white, or its
 * black in dark mode (1 Nov 2026: "do something about all of them being
 * gray", then "make posters white bg, keep colorful texts, icons").
 *
 * In an order where no two neighbours are alike, wrapping round included:
 * violet beside indigo or sky beside indigo read as one colour. Three apart,
 * the tile below in a row of three, they differ too.
 *
 * Whole class names, never built from parts: Tailwind only emits classes it
 * finds written out in the source.
 */
const TONES = [
  {
    ink: "text-violet-600 dark:text-violet-400",
    head: "text-violet-700 dark:text-violet-300",
    note: "text-violet-600/80 dark:text-violet-300/70",
  },
  {
    ink: "text-emerald-600 dark:text-emerald-400",
    head: "text-emerald-700 dark:text-emerald-300",
    note: "text-emerald-600/80 dark:text-emerald-300/70",
  },
  {
    ink: "text-indigo-600 dark:text-indigo-400",
    head: "text-indigo-700 dark:text-indigo-300",
    note: "text-indigo-600/80 dark:text-indigo-300/70",
  },
  {
    ink: "text-amber-600 dark:text-amber-400",
    head: "text-amber-700 dark:text-amber-300",
    note: "text-amber-800/80 dark:text-amber-300/70",
  },
  {
    ink: "text-sky-600 dark:text-sky-400",
    head: "text-sky-700 dark:text-sky-300",
    note: "text-sky-600/80 dark:text-sky-300/70",
  },
  {
    ink: "text-rose-600 dark:text-rose-400",
    head: "text-rose-700 dark:text-rose-300",
    note: "text-rose-600/80 dark:text-rose-300/70",
  },
] as const

function WallRow({ icons }: { icons: Icon[] }) {
  return (
    <div className="grid grid-cols-8">
      {icons.flatMap((icon) =>
        STYLES.map((style) => (
          /* Square cells, so the rows are as far apart as the columns and the
             wall reads as one field, the way the release posters run it. */
          <div
            key={`${icon.name}-${style}`}
            className="grid aspect-square place-items-center"
          >
            <Glyph
              art={icon.art[style] ?? icon.art.stroke!}
              size={24}
              stroke={1.75}
              className="aspect-square h-auto w-[50%]"
            />
          </div>
        ))
      )}
    </div>
  )
}

/**
 * A wall row of empty places, for a release still being drawn: the same eight
 * cells as a real row, each a dashed square where a drawing will go.
 */
function PlaceholderRow() {
  return (
    <div className="grid grid-cols-8">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="grid aspect-square place-items-center">
          <span className="size-[46%] rounded-[24%] border-[1.5px] border-dashed border-current opacity-55" />
        </div>
      ))}
    </div>
  )
}

export function UpdatePoster({
  icons,
  tone,
  eyebrow,
  headline,
  footnote,
  upcoming = false,
}: {
  icons: Icon[]
  /** A release still being drawn: empty places instead of drawings. */
  upcoming?: boolean
  /** Which of `TONES`; the page counts updates from the oldest, so a post
      keeps its colour as new ones arrive and neighbours never match. */
  tone: number
  eyebrow: string
  headline: string
  /** Shown once the tile is wide enough to carry a third line. */
  footnote?: string
}) {
  const rows: Icon[][] = []
  for (let i = 0; i < (ROWS_ABOVE + ROWS_BELOW) * PER_ROW; i += PER_ROW) {
    const row = icons.slice(i, i + PER_ROW)
    if (row.length) rows.push(row)
  }
  const colour = TONES[tone % TONES.length]

  return (
    /*
      The container, and nothing sized in `cqw` on it: an element cannot query
      itself, so a `cqw` here resolves against the viewport. The first build
      put its padding here and got 4 per cent of the window, 58px a side at
      1440, which shrank the wall to a strip in the middle of the poster.
    */
    <div
      aria-hidden="true"
      className="@container aspect-[3/2] overflow-hidden rounded-md bg-background shadow-xs"
    >
      <div className="flex h-full flex-col justify-center px-[3cqw]">
        <div className={colour.ink}>
          {upcoming
            ? Array.from({ length: ROWS_ABOVE }, (_, i) => (
                <PlaceholderRow key={i} />
              ))
            : rows
                .slice(0, ROWS_ABOVE)
                .map((row, i) => <WallRow key={i} icons={row} />)}
        </div>
        <div className="flex flex-col items-center py-[1.5cqw] text-center">
          <span
            className={cn(
              "text-[max(9px,2cqw)] font-semibold tracking-[0.14em] uppercase",
              colour.note
            )}
          >
            {eyebrow}
          </span>
          <span
            className={cn(
              "mt-[0.8cqw] text-[6.4cqw] leading-none font-semibold tracking-tight",
              colour.head
            )}
          >
            {headline}
          </span>
          {footnote && (
            <span
              className={cn(
                "mt-[1.2cqw] hidden text-[2cqw] @min-[26rem]:block",
                colour.note
              )}
            >
              {footnote}
            </span>
          )}
        </div>
        <div className={colour.ink}>
          {upcoming
            ? Array.from({ length: ROWS_BELOW }, (_, i) => (
                <PlaceholderRow key={i} />
              ))
            : rows
                .slice(ROWS_ABOVE)
                .map((row, i) => <WallRow key={i} icons={row} />)}
        </div>
      </div>
    </div>
  )
}

/**
 * A guide's poster: the projects it compares as a row of marks, over the
 * sheet the post is built on, cropped as it runs off the corner. The sheet's
 * left edge is the marks' left edge, at every width.
 *
 * The marks sit on white tiles in both themes, which is how the post's own
 * table shows them on a dark page: they are other projects' artwork, drawn
 * for a light ground, and recolouring them would make them not their logos.
 */
export function GuidePoster({
  cover,
  className,
}: {
  cover: BlogCover
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-video overflow-hidden rounded-md bg-background shadow-xs",
        className
      )}
    >
      <div className="absolute top-5 left-5 z-10 flex gap-2 sm:top-8 sm:left-8">
        {cover.logos.map((logo) => (
          <span
            key={logo.name}
            className="grid size-9 place-items-center rounded-lg bg-white shadow-xs sm:size-12"
          >
            <Image
              src={logo.src}
              alt=""
              width={28}
              height={28}
              className="size-5 sm:size-7"
            />
          </span>
        ))}
      </div>
      <Image
        src={cover.image.src}
        alt=""
        width={cover.image.width}
        height={cover.image.height}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="absolute top-[30%] left-5 w-[115%] max-w-none rounded-tl-lg border shadow-sm transition-transform duration-300 group-hover:-translate-y-1 sm:left-8 md:top-[28%]"
      />
    </div>
  )
}
