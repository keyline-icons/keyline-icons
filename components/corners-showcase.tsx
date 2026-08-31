import Link from "next/link"

import { Glyph, artOf, type Corners } from "@/components/glyph"
import { CORNER_SAMPLE_ICON_NAMES } from "@/lib/home"
import type { Icon } from "@/lib/icons"

/**
 * The corners section: one drawing, twice, at a size the corner is visible at.
 *
 * **Two panels rather than three.** The rows above it are three-ups because
 * they are showing three of something; this axis has two values and inventing a
 * third panel to keep the rhythm would have meant finding something to say that
 * is neither treatment. So the pair is centred and capped instead, which keeps
 * the panels about the width of a three-up's column rather than letting two of
 * them sprawl across 1400px.
 *
 * **The specimen is scaled up, which is the whole device.** At 24px a 2-unit
 * keyline is two pixels and a corner radius is one, so the difference between
 * the treatments is a rumour; scaled up it is the drawing's construction. That
 * is the same argument the icon page makes for its own specimen square. See
 * `components/icon-detail.tsx`.
 *
 * **It is sized as a fraction of the panel, not by padding around a `size-full`
 * glyph.** The icon page fills its box because the box is square and the glyph
 * is the only thing in it; this panel is `aspect-5/4`, so a filled drawing is
 * governed by the height and the padding has to be quoted in two places to say
 * one thing. `SPECIMEN` is that one thing, and it is a fraction rather than a
 * pixel size so the drawing keeps its proportion to the panel from a 1400px
 * page down to a phone.
 *
 * **The specimen draws at 1.5 and the strip at 2, and the split is load-bearing
 * rather than fussy.** Even at this size a 2-unit keyline is 12px of ink, which
 * reads as a poster of an icon rather than a drawing of one; 1.5 is the same
 * allowance `components/keyline-showcase.tsx` takes for its 56px tick. It is
 * safe here for a reason particular to this drawing: `image` is a closed
 * contour running 3 to 21 in both treatments, so no cap is involved and nothing
 * about where its ink stops depends on the width.
 *
 * The strip stays at 2, and for a plainer reason: 24 is the size the set ships
 * at, and a sample at ship size that is not at ship weight is not a sample. The
 * cap geometry is authored against that width too. `smartphone`'s speaker slot
 * is `M10.5 6H13.5` rounded and `M9.5 6L14.5 6` sharp, which paint to the same
 * 9.5 and 14.5 only because a 2-unit round cap adds at each end exactly the
 * half-unit the squared one gives up. Thin it and the row stops being true
 * about where the ink stops.
 *
 * **The five under it are at 24, 1:1.** The specimen answers what the treatment
 * does; the strip answers whether it survives the size a glyph actually ships
 * at, which is the question a corner treatment has to answer and the one a
 * poster-sized sample cannot. Same five in both panels, so the row reads across.
 *
 * Centred with a gap rather than distributed. The icon page's size ramp is
 * `justify-between` and earns it, because each sample there carries a label
 * that has to sit under it; five bare glyphs pushed to the ends of a 496px box
 * read as a row that has lost something out of the middle.
 */

/**
 * How much of the panel the specimen takes, as a fraction of both its sides.
 *
 * The panel is `aspect-5/4`, so the height is the shorter side and the one that
 * governs a square drawing: 38% of a 397px box is a 151px glyph, and the width
 * this resolves to is wider than that and never binds. Big enough that a 3-unit
 * corner radius is a dozen pixels of arc, small enough that the drawing sits in
 * the panel rather than filling it.
 */
const SPECIMEN = "38%"

/** The scaled specimen's keyline, thinned. See the note above. */
const SPECIMEN_STROKE = 1.5

/** The strip, at the size and the weight these drawings ship at. */
const SHIP = 24
const SHIP_STROKE = 2

function Panel({
  icons,
  corners,
  href,
  label,
  name,
  rest,
}: {
  icons: Icon[]
  corners: Corners
  href: string
  /** The link's accessible name, since its own text is a whole sentence. */
  label: string
  /** The clause in full-strength ink: the treatment's name. */
  name: string
  rest: string
}) {
  const [specimen, ...strip] = CORNER_SAMPLE_ICON_NAMES
  const byName = new Map(icons.map((icon) => [icon.name, icon]))
  const art = (candidate: string) => {
    const icon = byName.get(candidate)
    return icon ? artOf(icon, "stroke", corners) : undefined
  }
  const hero = art(specimen)

  return (
    /*
      Both panels seed the treatment they show, including the rounded one.

      The styles row above deliberately leaves `?corners=regular` off its links,
      because a card about duotone has no business overruling the reader's own
      setting on its way past. Here the treatment is the subject: a panel headed
      "Rounded" that opens the grid in sharp because that is where the reader
      last left it would be the one mismatch this section exists to rule out.
    */
    <Link href={href} aria-label={label} className="group block">
      <div className="relative aspect-5/4 overflow-hidden rounded-lg bg-muted transition-colors group-hover:bg-muted-hover">
        {hero && (
          <span className="absolute inset-0 flex items-center justify-center text-foreground">
            {/*
              The fraction is on a wrapper rather than on the drawing, because
              `Glyph` takes a class and not a style and the number belongs in
              one named place rather than baked into a class string.
            */}
            <span
              className="flex shrink-0"
              style={{ width: SPECIMEN, height: SPECIMEN }}
            >
              <Glyph
                art={hero}
                size={24}
                stroke={SPECIMEN_STROKE}
                className="size-full"
              />
            </span>
          </span>
        )}
      </div>

      {/*
        A second box rather than a strip inside the first, which is how the icon
        page stacks the same two ideas. Sharing one box would have put a 24px
        row in the same field of view as a 260px drawing and asked the reader to
        read it as a separate statement.
      */}
      <div className="mt-3 flex items-center justify-center gap-8 rounded-lg bg-muted px-5 py-4 text-foreground transition-colors group-hover:bg-muted-hover sm:gap-10">
        {strip.map((candidate) => {
          const drawn = art(candidate)

          return drawn ? (
            <Glyph
              key={candidate}
              art={drawn}
              size={SHIP}
              stroke={SHIP_STROKE}
              className="shrink-0"
            />
          ) : null
        })}
      </div>

      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">{name}</span> {rest}
      </p>
    </Link>
  )
}

export function CornersShowcase({ icons }: { icons: Icon[] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:gap-6 xl:gap-8">
      <Panel
        icons={icons}
        corners="regular"
        href="/icons?corners=regular"
        label="Browse the icons with rounded corners"
        name="Rounded"
        rest="is the drawing as the set is built. Every corner takes a radius off one ladder and every stroke ends round, which is what stops a glyph reading as brittle at the size it ships at."
      />

      <Panel
        icons={icons}
        corners="sharp"
        href="/icons?corners=sharp"
        label="Browse the icons with sharp corners"
        name="Sharp"
        /*
          No claim here about the ink reaching as far, which an earlier draft
          made. It holds for a cap on an open stroke and for a contour drawn on
          the same box, and it fails on exactly the case this strip now carries:
          a true point on an oblique apex projects past the fillet it replaced,
          which is the difference a reader is looking at in `triangle-alert`.
          The 24×24 box is the claim that is true of every drawing, and it is
          the one a layout actually depends on.
        */
        rest="squares every one of them. Same drawing, same 24×24 box, same name on disk, so nothing in a layout moves when you swap one for the other."
      />
    </div>
  )
}
