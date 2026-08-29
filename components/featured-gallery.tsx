import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { ArrowUpRight } from "@/components/icons"
import { initials } from "@/lib/icon-contributors"
import { featuredHref, type FeaturedExample } from "@/lib/featured"

/**
 * The featured-example wall: screenshots of the set in shipped interfaces.
 * `/examples` renders everyone through it and the landing page renders the
 * flagged entries through the same component, so a card cannot drift between
 * the two places it appears.
 *
 * **The screenshot is the card.** No title under it, no caption, no strip of
 * the icons it contains. All of those were built first and came out: a
 * submitted screenshot is already a picture of a named product, and a title
 * repeating that name under every card turns a wall of work into a directory
 * listing. What is left is the reference this page is measured against, a
 * gallery where the only chrome on an image is who made it and a way in.
 *
 * The masonry is CSS columns, not a grid. Screenshots arrive at whatever shape
 * the interface was, and a grid would either crop them to one aspect or leave
 * a rag of white under the short ones; columns pack them as sent, which is the
 * point of a page about other people's work. The cost is that entries read
 * down each column rather than across the row, which is fine for a gallery
 * ordered by date and would be wrong for anything ordered by rank.
 * `break-inside-avoid` is what keeps a card from being sliced across two
 * columns, and it goes on the card, not the list.
 */
export function FeaturedGallery({
  entries,
  columns = 4,
}: {
  entries: FeaturedExample[]
  /**
   * How wide the masonry gets. The landing page shows three and would leave a
   * fourth column empty at the gallery's own width, which reads as a card that
   * failed to load rather than as a deliberate three.
   */
  columns?: 3 | 4
}) {
  return (
    <ul className={`columns-1 gap-4 sm:columns-2 ${COLUMNS[columns]}`}>
      {entries.map((entry) => (
        <Card key={entry.slug} entry={entry} />
      ))}
    </ul>
  )
}

/*
  Tailwind only emits classes it can find in the source, so the two widths are
  written out rather than interpolated from the prop.
*/
const COLUMNS = {
  3: "lg:columns-3",
  4: "lg:columns-3 xl:columns-4",
} as const

/*
  The card, as a surface. `bg-muted` under the image so a shot with transparency
  sits on something and the corner is round before it loads.

  The hairline is not decoration. Submitted screenshots are mostly light UI on a
  white ground, and on this page's own white that leaves a card with no edge:
  the first fill of six had two entries reading as loose text floating in the
  column. The stage in `components/mobile-showcase.tsx` rings itself at the same
  weight for the same reason, and a ring rather than a border keeps it off the
  layout so the masonry's column maths does not move.
*/
const SURFACE = "overflow-hidden rounded-xl bg-muted ring-1 ring-border/60"

/**
 * The wall before anything is on it: dashed cards at the heights real ones
 * arrive at.
 *
 * An empty page cannot show its own layout, and this one spends its whole
 * height explaining how to get onto a grid the reader has never seen. The
 * ghosts answer that in the only way that is honest about a gallery with
 * nothing in it: they are obviously not content, and they still say a
 * screenshot goes here, at any shape.
 *
 * **Nothing of ours is ever drawn on this wall, not even as a sample.** Six
 * finished mockups were rendered into it once, and they were wrong twice over:
 * this grid is the readers' work and no one else's, and a wall that opens with
 * six of our own interfaces is the page answering its own question. They were
 * moved up into a panel of illustrated steps instead, and that panel is gone
 * too. The page is a heading, a button and this wall.
 *
 * Each card carried a dashed circle in both bottom corners for a while, marking
 * where the avatar and the open button land. They came out. A placeholder earns
 * its place by reading instantly as one, and picking out two pieces of card
 * furniture inside an empty box is detail the reader has no use for yet.
 *
 * It shares `COLUMNS` with the real gallery deliberately. Written with its own
 * copy of the column classes, this would keep the old layout the day the wall
 * changed and quietly promise a shape the page no longer has.
 *
 * The heights are arbitrary and inline. They are the one thing here that has to
 * be uneven, since an even grid of placeholders would advertise the wrong
 * layout, and Tailwind cannot emit a class it never sees written down.
 *
 * The outline is `muted-foreground/25`, not `border`. `--border` is a hairline
 * between two surfaces and is tuned to disappear: in dark mode it resolves to
 * white at a tenth, which left these ghosts almost invisible on the page they
 * exist to explain. `--muted-foreground` is a mid grey in both themes, so one
 * opacity reads the same in each.
 *
 * **The bottom edge is cut flat, then faded.** Balanced columns end at four
 * different heights, and eight dashed boxes stopping in a rag reads as a layout
 * that broke rather than as a preview. A gradient alone was tried first and is
 * not enough: it lightens the rag without straightening it. So the wrapper is a
 * fixed height with `overflow-hidden`, and the gradient hides the cut. Tuning
 * the heights until the columns happen to level cannot work: the same eight are
 * dealt into four columns, three, and one.
 *
 * The list itself is left unconstrained and the height goes on the wrapper.
 * Constraining the list would hand a fixed height to a multi-column box, which
 * changes how it balances rather than simply cropping what it drew.
 */
export function FeaturedGalleryPlaceholder({
  columns = 4,
}: {
  columns?: 3 | 4
}) {
  return (
    <div className="relative h-[26rem] overflow-hidden">
      <ul
        aria-hidden="true"
        className={`columns-1 gap-4 sm:columns-2 ${COLUMNS[columns]}`}
      >
        {GHOST_HEIGHTS.map((height, index) => (
          <li
            key={index}
            style={{ height }}
            className="mb-4 break-inside-avoid rounded-xl border border-dashed border-muted-foreground/25 bg-muted/40"
          />
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background"
      />
    </div>
  )
}

/* Eight, and none of them the same: enough to fill four columns twice over. */
const GHOST_HEIGHTS = [232, 310, 196, 268, 288, 208, 252, 184]

/**
 * One entry: the screenshot, with its maker in the corner and a way in.
 *
 * The avatar is a **sibling** of the screenshot's link rather than a child of
 * it. Both are links, and an anchor inside an anchor is invalid markup that
 * browsers resolve by breaking one of them; as siblings in a positioned box
 * they overlap on screen and stay two separate links. The arrow is the reason
 * this arrangement is worth the trouble: it is only paint, so it can sit inside
 * the screenshot's hit area and still light up when the card is hovered.
 */
function Card({ entry }: { entry: FeaturedExample }) {
  /*
    The credit points at X rather than GitHub, because that is where the
    submission came from and where the person can be thanked. `initials` is
    still borrowed from the contributor helpers: one fallback face for the
    whole site, whichever platform the name arrived through.
  */
  const profile = entry.x ? `https://x.com/${entry.x}` : undefined

  const href = featuredHref(entry)
  const internal = href?.startsWith("/")

  const shot = (
    <Image
      src={entry.image}
      alt={entry.alt}
      sizes="(min-width: 1280px) 340px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="h-auto w-full"
    />
  )

  const surface = `block ${SURFACE}`

  return (
    <li className="group relative mb-4 break-inside-avoid">
      {href ? (
        internal ? (
          <Link
            href={href}
            prefetch={false}
            aria-label={`Open ${entry.title}`}
            className={surface}
          >
            {shot}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${entry.title} (opens in a new tab)`}
            className={surface}
          >
            {shot}
          </a>
        )
      ) : (
        <div className={surface}>{shot}</div>
      )}

      {/*
        The credit, over the bottom-left corner. `ring-2 ring-background` is
        what keeps a face legible on a screenshot of any colour: the ring is
        the page's own fill, so it reads as a cut-out in both themes rather
        than as a white outline that only works on light shots.
      */}
      {profile ? (
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 rounded-full ring-2 ring-background transition-transform hover:scale-105"
        >
          <Avatar avatar={entry.avatar} name={entry.name} />
          <span className="sr-only">
            {entry.name} on X (opens in a new tab)
          </span>
        </a>
      ) : (
        <span className="absolute bottom-3 left-3 rounded-full ring-2 ring-background">
          <Avatar avatar={entry.avatar} name={entry.name} />
          <span className="sr-only">{entry.name}</span>
        </span>
      )}

      {/*
        The way in, as paint rather than as a control. The whole screenshot is
        already the link; a second anchor here would be two links to one place
        for a keyboard to step through, and `pointer-events-none` is what lets
        a click on the arrow land on the link underneath it.
      */}
      {href && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <ArrowUpRight className="size-4" />
        </span>
      )}
    </li>
  )
}

/**
 * The face, or the initials the preview dock falls back to without one.
 *
 * A static import rather than a URL, so no width or height is typed here
 * either: the file the curator pulled down carries its own.
 */
function Avatar({ avatar, name }: { avatar?: StaticImageData; name: string }) {
  return avatar ? (
    <Image src={avatar} alt="" className="size-9 rounded-full bg-muted" />
  ) : (
    <span
      aria-hidden="true"
      className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium"
    >
      {initials(name)}
    </span>
  )
}
