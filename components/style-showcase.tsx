"use client"

import * as React from "react"
import Link from "next/link"

import {
  CORNERS,
  SHARP_BADGE,
  Glyph,
  artOf,
  type Corners,
  type Style,
} from "@/components/glyph"
import { Segmented, SegmentedItem } from "@/components/segmented"
import {
  STYLE_BLURBS,
  STYLE_SAMPLE_ICON_NAMES,
  type StyleSampleSet,
} from "@/lib/home"

/**
 * The three style cards: the same twelve drawings, in the same twelve places,
 * one style each.
 *
 * **Everything is held still except the weight.** The icons were the first
 * thing to be held constant, and that was not enough: with a scatter in one
 * card, plates in the second and a named grid in the third, finding `user` in
 * all three meant reading three different pictures. A comparison that has to be
 * hunted for is not a comparison. So the positions and sizes are shared too,
 * and the row now works the way a specimen sheet does: pick any spot, look
 * across, and the same drawing is there three times in three weights.
 *
 * **No plates under the drawings, in any of the three.** They were the duotone
 * card's own idea first — a duotone drawing is a keyline over a plate, so a
 * circle behind it repeated that construction one level up — and then briefly
 * under all twelve in every card, to hold even the background still. Both are
 * gone. A white disc under each glyph turns a scatter of drawings into a row of
 * chips: the eye reads twelve circles with something in them, and what the
 * section is selling is the something.
 *
 * The duotone drawings still have their plate. It is inside the drawing, at
 * reduced opacity, which is the whole style and needs no help from the layout.
 *
 * Positions are hand-placed percentages. A scatter is the one layout that
 * cannot be derived — a random one clumps, a distributed one is a grid with
 * jitter — and percentages are what hold the arrangement together at a third of
 * a 1440px page and at the full width of a phone.
 */

/**
 * Every glyph here is drawn at the keyline it was authored with, and that is
 * not a stylistic decision.
 *
 * There was a ramp: 2 units under 36px, down to 1.25 at 64 and up, so that a
 * big drawing did not render three times heavier than a small one. It looked
 * right on the stroke card and broke the duotone card, because **a duotone
 * plate is baked to a 2-unit keyline**. Open `icons/duotone/folder.svg`: the
 * muted path runs 2 to 22, which is the outer contour of a 2-unit stroke laid
 * on the 3-to-21 centre line the outline path uses. Draw that outline at 1.25
 * and the plate is no longer underneath it, it is 0.375 units proud of it on
 * every side, which renders as the grey hairline around the black keyline.
 *
 * Anything below 2 does it. Above 2 the stroke simply overhangs its own plate
 * and nothing shows. So 2 is the floor for duotone, and since this row exists
 * to show one drawing in three weights, all three cards have to draw at the
 * same width or the comparison is between two variables at once.
 *
 * The blunt-at-large-sizes problem is real and is answered in `SPOTS` instead,
 * by taking the top size down rather than the stroke.
 */
const STROKE = 2

/**
 * Where each drawing sits, as a percentage of the scene, and how big it is.
 * Read by all three cards, in the order `STYLE_SAMPLE_ICON_NAMES` declares.
 *
 * `x` and `y` are the centre, and **every drawing sits fully inside the frame**.
 * Two of them used to hang off opposite edges, on the argument that a scatter
 * whose every element fits is a composition and a composition looks finite. It
 * does not survive contact with the thing being scattered: a cropped photograph
 * reads as a crop, a cropped icon reads as a half-drawn icon, and on a page
 * whose whole claim is that these drawings are complete and consistent, a
 * clipped one is a defect rather than a device.
 *
 * The margins are set against the *narrowest* layout, not this one. Sizes are
 * pixels while positions are percentages, so a glyph that clears the edge in a
 * 442px column can be cut in a 327px one, which is what a phone gives a
 * single-column card. Every spot leaves at least half its own width inside at
 * that width: the 52px folder needs 8% of the box on each side, the 24px
 * calendar 3.7%.
 *
 * The gaps are wider than bare drawings need. They were spaced to clear a plate
 * 1.6× each glyph, back when every one stood on a disc, and the spacing is
 * worth keeping without them: it is what stops a scatter of twelve reading as
 * a cluster.
 *
 * The range is 24 to 52, and the top of it is doing the work a stroke ramp used
 * to. Every glyph draws at 2 units — see `STROKE` — so the rendered keyline
 * scales with the drawing: at 70px that was 5.8px of ink and read as blunt
 * beside a 26px glyph's 2.2px. Capping the largest at 52 puts the widest
 * keyline at 4.3px, which is the same set at two sizes rather than two sets.
 */
const SPOTS: { x: number; y: number; size: number }[] = [
  { x: 18, y: 13, size: 30 },
  { x: 45, y: 9, size: 38 },
  { x: 76, y: 22, size: 44 },
  { x: 10, y: 45, size: 34 },
  { x: 46, y: 45, size: 52 },
  { x: 84, y: 55, size: 34 },
  { x: 9, y: 82, size: 40 },
  { x: 52, y: 84, size: 30 },
  { x: 90, y: 84, size: 46 },
  { x: 66, y: 70, size: 26 },
  { x: 30, y: 24, size: 24 },
  { x: 92, y: 8, size: 28 },
]

/** One card's scene: the shared spots, drawn in one style and one treatment. */
function Scene({
  icons,
  style,
  corners,
}: {
  icons: StyleSampleSet
  style: Style
  corners: Corners
}) {
  return (
    <>
      {STYLE_SAMPLE_ICON_NAMES.map((name, index) => {
        const spot = SPOTS[index]
        const icon = icons[name]
        // Stroke is the fallback and should never be hit: every name in the
        // list is checked against all three style folders. See `lib/home.ts`.
        // The treatment needs no fallback of its own, because every drawing is
        // cut both ways and sharp covers exactly what rounded covers.
        const art =
          icon &&
          (artOf(icon, style, corners) ?? artOf(icon, "stroke", corners))
        if (!spot || !art) return null

        return (
          <div
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <Glyph art={art} size={spot.size} stroke={STROKE} />
          </div>
        )
      })}
    </>
  )
}

/**
 * The frame all three share: the name and count, the scene, the blurb.
 *
 * **The card is not a card.** It was a `bg-muted` panel with 24px of padding
 * and a white scene inside it, which put a surface around text that needed
 * none: the heading and the blurb are page copy, and framing them made three
 * boxes competing with the three boxes in the section below. Only the scene is
 * a surface now, and it is the muted one, so the row reads as three pictures
 * with labels rather than as three panels.
 */
function Card({
  style,
  count,
  icons,
  corners,
}: {
  style: Style
  count: number
  icons: StyleSampleSet
  corners: Corners
}) {
  return (
    /*
      The whole card is the link, and the destination is the grid already
      showing this weight. `?style=` is a seed rather than an address: the
      browser reads it into its filter and still declares `/icons` as its
      canonical, so the three cards do not create three indexed pages. See
      `app/icons/page.tsx`.

      `?corners=` rides along on the same terms, and only where it has something
      to say: the treatment is a persisted setting, so a card showing the
      squared drawings has to hand the grid the treatment it is showing or the
      click lands on whatever the reader last left in the cookie. Left off for
      rounded rather than spelled out, because that is the reader's own setting
      talking and a link should not overrule it to say "the default".

      An `aria-label` because the link's own text is a heading, a count and a
      sentence about how the style is derived, which is a long thing to announce
      and a poor description of where it goes.
    */
    <Link
      href={
        corners === "sharp"
          ? `/icons?style=${style}&corners=sharp`
          : `/icons?style=${style}`
      }
      aria-label={
        corners === "sharp"
          ? `Browse the sharp ${style} icons`
          : `Browse the ${style} icons`
      }
      className="group block"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium capitalize">{style}</h3>
        <span className="text-sm text-muted-foreground tabular-nums">
          {count} icons
        </span>
      </div>

      {/*
        `overflow-hidden` is what lets the scene run off its own edges.

        The hover moves the scene one step off the page, `--muted-hover`, which
        is the site's one hover fill. Nothing else in the card moves: with
        twelve drawings inside it, anything that shifts or lifts on hover reads
        as the icons themselves reacting.
      */}
      <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-lg bg-muted transition-colors group-hover:bg-muted-hover">
        <Scene icons={icons} style={style} corners={corners} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {STYLE_BLURBS[style]}
      </p>
    </Link>
  )
}

export function StyleShowcase({
  icons,
  perStyle,
}: {
  /** The twelve sample drawings in both treatments. See `pickStyleSampleIcons`. */
  icons: StyleSampleSet
  /** Each style with its own count, read off disk. Never typed. */
  perStyle: { style: Style; count: number }[]
}) {
  /*
    The third axis, and the only control on this page.

    Component state rather than the settings cookie the grid and the icon pages
    share. This is a specimen row, not the library: someone who last browsed in
    sharp should still meet the landing page drawn the way the set is described
    everywhere else on it, and the switch is here to be used rather than to be
    arrived at already thrown.
  */
  const [corners, setCorners] = React.useState<Corners>("regular")

  const countOf = (style: Style) =>
    perStyle.find((entry) => entry.style === style)?.count ?? 0

  return (
    <div>
      {/*
        Centred under the section head, because the whole page is, and above the
        cards rather than inside one: it moves all three at once, and a control
        sitting in a card would read as belonging to that card. It also could
        not sit in one, since every card is a link and a button inside a link is
        not a thing a browser will render.

        The site's own picker, not the demos' pill row: this is page chrome, so
        it wears the same recessed track and white chip as the corner switch in
        the icon grid and the preview dock.
      */}
      <div className="flex justify-center">
        <Segmented aria-label="Corner treatment">
          {CORNERS.map((c) => (
            <SegmentedItem
              key={c}
              active={corners === c}
              onClick={() => setCorners(c)}
              badge={c === "sharp" ? SHARP_BADGE : undefined}
            >
              {c === "regular" ? "Rounded" : "Sharp"}
            </SegmentedItem>
          ))}
        </Segmented>
      </div>

      {/*
        The same grid the container section below uses, so the two rows of three
        sit on one rhythm rather than each having their own.

        The counts do not move with the switch, and that is right rather than an
        oversight: coverage is a fact about a drawing, and squaring its corners
        does not change whether it encloses a region a fill needs. The same
        reason the grid's own treatment chips carry no counts beside them.
      */}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        <Card
          style="stroke"
          count={countOf("stroke")}
          icons={icons}
          corners={corners}
        />
        <Card
          style="duotone"
          count={countOf("duotone")}
          icons={icons}
          corners={corners}
        />
        <Card
          style="fill"
          count={countOf("fill")}
          icons={icons}
          corners={corners}
        />
      </div>
    </div>
  )
}
