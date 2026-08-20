import { Glyph } from "@/components/glyph"
import type { Icon } from "@/lib/icons"

/**
 * The hole the hero's words sit in, and the band of drawings around it.
 *
 * Written once and set on both `mask-image` and its `-webkit-` twin. Safari
 * shipped the unprefixed property recently enough that the prefixed one is
 * still worth carrying, and a wall that renders unmasked is not a degraded
 * version of this, it is an unreadable headline.
 */
const MASK =
  "radial-gradient(closest-side at 50% 48%, transparent 0, transparent 62%, black 82%, black 90%, transparent 100%)"

/**
 * The field of drawings behind the hero.
 *
 * It is the one place on the site that shows the *size* of the set rather than
 * stating it, which is what a landing page owes a visitor who has not scrolled
 * yet: a number in a sentence is a claim, and two hundred glyphs behind the
 * headline is the evidence for it.
 *
 * Three things about it are load-bearing:
 *
 * - **It is decoration, so it is inert.** `aria-hidden` and
 *   `pointer-events-none`, because a screen reader announcing two hundred
 *   nameless drawings before the heading would make the page unusable, and a
 *   full-bleed layer over the hero would otherwise swallow every click aimed at
 *   the search field.
 * - **The sample is evenly spaced through the set, not the first N.** The
 *   library is sorted by name, so the first two hundred entries are the
 *   alphabet up to about `git-*`: a wall of arrows, bar charts and calendars
 *   that reads as a set with three ideas in it. Stepping through the whole list
 *   samples every shelf.
 * - **The fade is a mask, not an opacity.** The wall has to be absent behind
 *   the headline and present at the edges, and that is one shape rather than
 *   one value. See the note on the gradient below.
 */
export function IconWall({
  icons,
  count = 220,
  className,
}: {
  icons: Icon[]
  /** How many drawings to place. Trimmed to what the set actually has. */
  count?: number
  className?: string
}) {
  /*
    Every Nth drawing, computed rather than listed. A hardcoded list of two
    hundred names would be two hundred things to rename, and it is exactly the
    kind of list `pipeline/check-demos.mjs` exists to catch going stale. Only
    the drawings that have a stroke form are eligible, which is all of them
    today, and the filter is what keeps that true rather than assumed.
  */
  const pool = icons.filter((icon) => icon.art.stroke)
  const step = Math.max(
    1,
    Math.floor(pool.length / Math.min(count, pool.length))
  )
  const sample = pool.filter((_, index) => index % step === 0).slice(0, count)

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        /*
          One annulus: transparent at the centre, opaque through the band, and
          transparent again before the far edge. A mask keeps what is opaque, so
          this clears the drawings out from behind the heading and the field,
          brings them up around it, and takes them away rather than cutting them
          off at the edge of the box.

          One gradient rather than two composited layers, because
          `mask-composite` is the newer half of the feature and the fallback for
          it is the whole wall rendering at full strength across the headline. An
          annulus needs no compositing at all.

          `closest-side` sizes the ellipse to the box, so the ring is a fraction
          of the hero rather than a measurement in pixels that only holds at one
          width. What had to be tuned is where the hole ends: it has to be wider
          than the measure the headline is set to and taller than the block from
          the heading down to the buttons, or drawings appear behind words. At
          62% it clears both with room to spare, which leaves the outer 38% for
          the band, and that is why the band is thin and mostly in the corners.

          The wall is allowed to run under the figures below the buttons. They
          sit on opaque `--muted` cards, so nothing shows through them, and
          stopping the layer short of them would put a hard edge across a
          gradient that is meant to fade out.
        */
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      {/*
        A fixed cell rather than a fluid column count, so the drawings keep
        their spacing and the wall simply carries fewer of them on a narrow
        screen. `justify-center` is what stops the last row hanging off to one
        side.

        `text-muted-foreground/30` in one place: the glyphs paint from
        `currentColor`, so the whole wall is one ink and it inverts with the
        theme along with everything else.
      */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-7 text-muted-foreground/30">
        {sample.map((icon) => (
          <Glyph
            key={icon.name}
            art={icon.art.stroke!}
            size={24}
            stroke={2}
            className="shrink-0"
          />
        ))}
      </div>
    </div>
  )
}
