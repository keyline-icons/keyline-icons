import { type BrowserIcon } from "@/components/glyph"
import { SET_TITLE } from "@/lib/site-chrome"
import { cn } from "@/lib/utils"

/**
 * Where the letters sit, and how wide they actually are.
 *
 * `advance` is measured, not chosen, and it describes exactly one string:
 * `SET_TITLE` — "Keyline Icons" — in Geist SemiBold at 280 with this tracking,
 * which measures 1656.71 and is rounded to the unit. The box is derived from
 * that rather than the other way round, because `textLength` does not fit type
 * to a box, it *forces* it. Picking a round 1200 first condensed the word to
 * 68% of its natural width, which reads as a different, worse typeface and
 * closes up every counter the icons are supposed to show through.
 *
 * So this number is coupled to the name and dies with it. Renaming the set
 * again invalidates it, and the failure is quiet — the word simply renders
 * slightly wrong. Character count is no guide either: "Keyline Icons" is a
 * letter longer than "Shadcn Icons" and 45 units narrower, so the last rename
 * would have stretched the word rather than squeezing it. Re-measure against
 * the real webfont:
 *
 *     await document.fonts.ready
 *     text.style.cssText = "font:600 280px var(--font-sans); letter-spacing:-0.03em"
 *     text.textContent = SET_TITLE
 *     text.getComputedTextLength()
 */
const TYPE = {
  size: 280,
  advance: 1657,
  baseline: 230,
  /** Left and right margin, so the word never touches the edge. */
  inset: 24,
}

/** The wordmark's own box, sized to hold the type at its natural width. */
const VIEW = { width: TYPE.advance + TYPE.inset * 2, height: 250 }

/**
 * The pitch of the icon field, in the wordmark's units.
 *
 * This is the number that decides whether the effect works, and it is bounded
 * from both sides. A stem here is about 34 units across: at 20 it carries
 * barely one icon, the counters of the a and the o fill in, and the word reads
 * as static. Much below 15 the glyphs stop being legible as glyphs and the
 * other half of the trick goes instead.
 */
const CELL = 16

/**
 * The size each glyph is actually drawn at — larger than the pitch, so they
 * overlap.
 *
 * Set equal to the pitch, the field covers about a fifth of its area in ink and
 * the letters read as pale grey rather than as letters. Shrinking the pitch
 * does not help: a glyph's ink is a fixed fraction of its own box, so scaling
 * everything down gives finer texture at exactly the same coverage. Overlap is
 * the only lever that adds ink without lying about the 2-unit stroke, and it
 * also stops the field reading as a grid of separate stamps — which is what a
 * dense engraving does, and the reason this looks drawn rather than tiled.
 */
const GLYPH = 22

/**
 * The band the letters can possibly reach, as a fraction of the box.
 *
 * Cells outside it are dropped before they are ever emitted. They would be
 * clipped away regardless, but only after the browser had instanced and laid
 * out every one of them — and at this pitch that is several hundred nodes
 * doing nothing.
 */
const INK = { top: 0.05, bottom: 0.95 }

/**
 * The wordmark, set in the site's own type and used as a hole.
 *
 * The words are the mask and the icons are the ink: the letterforms clip a
 * field of the actual set, so the mark reads as a wordmark across the room and
 * dissolves into three hundred real glyphs up close. It is the oldest move in
 * type specimens — the giant `Aa` filled with the character set — on a page
 * that is already built like one.
 *
 * Two things make it hold together:
 *
 * `textLength` pins the word's advance width, so the mask is the same box
 * whether the webfont has loaded or the fallback is still up. Without it the
 * letters resize when the font swaps and every icon behind them visibly
 * re-crops on first paint. `lengthAdjust` has to be `spacingAndGlyphs` rather
 * than the default, or a fallback with different metrics keeps its own glyph
 * widths and only the gaps stretch.
 *
 * The field is `<use>` against one `<defs>` entry per distinct icon, not a few
 * hundred inlined copies. Same picture, a fifth of the markup, and the browser
 * gets to instance them.
 */
export function WordmarkField({
  icons,
  className,
}: {
  icons: BrowserIcon[]
  className?: string
}) {
  const pool = icons.filter((icon) => icon.art.stroke)
  if (pool.length === 0) return null

  const cols = Math.ceil(VIEW.width / CELL)
  const rows = Math.ceil(VIEW.height / CELL)

  /**
   * Which icon lands in a cell.
   *
   * Deterministic, because this renders on the server and again on the client
   * and the two have to agree — `Math.random` here is a hydration mismatch with
   * extra steps. The `row * col` term is what stops the sequence marching in
   * diagonal stripes, which a plain `row * cols + col` walk does visibly.
   */
  const pick = (row: number, col: number) =>
    pool[(row * 31 + col * 17 + row * col * 7) % pool.length]

  const top = VIEW.height * INK.top - CELL
  const bottom = VIEW.height * INK.bottom

  // Half the overlap, so the field stays centred on its own pitch rather than
  // drifting down and right of it.
  const back = (GLYPH - CELL) / 2

  const cells: { x: number; y: number; icon: BrowserIcon }[] = []
  for (let row = 0; row < rows; row++) {
    const y = row * CELL
    if (y < top || y > bottom) continue

    for (let col = 0; col < cols; col++) {
      cells.push({ x: col * CELL - back, y: y - back, icon: pick(row, col) })
    }
  }

  // Only the icons that actually land somewhere get a definition.
  const used = new Map<string, BrowserIcon>()
  for (const cell of cells) used.set(cell.icon.name, cell.icon)

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className={cn("w-full", className)}
      // The caller owns the accessible name. Below the breakpoint where this
      // resolves, the hero shows the words as ordinary type instead, and two
      // labelled copies of the wordmark in one heading is one too many.
      aria-hidden="true"
    >
      <defs>
        <clipPath id="wordmark-field">
          <text
            x={VIEW.width / 2}
            y={TYPE.baseline}
            textAnchor="middle"
            textLength={TYPE.advance}
            lengthAdjust="spacingAndGlyphs"
            // A real declaration, not a presentation attribute: `var()` in an
            // SVG attribute is not reliably resolved, and a font-family that
            // silently fails here takes the whole mask's shape with it.
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: `${TYPE.size}px`,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            {SET_TITLE}
          </text>
        </clipPath>

        {/*
          Each definition is stored at its final size, not at the icon's own 24.
          That is what lets every instance below be a bare `x`/`y` — carrying
          `scale(0.9166…)` on 1650 elements instead costs about 120KB of markup
          to say the same thing 1650 times.
        */}
        {[...used.values()].map((icon) => (
          <g
            key={icon.name}
            id={`wf-${icon.name}`}
            transform={`scale(${(GLYPH / 24).toFixed(4)})`}
            dangerouslySetInnerHTML={{ __html: icon.art.stroke!.body }}
          />
        ))}
      </defs>

      {/*
        One set of stroke attributes for the whole field. Every member is a
        stroke variant, so none of them needs its own — and the fine line work
        is the point: solid fills at this pitch read as a grey block, where
        outlines read as the drawings they are.
      */}
      <g
        clipPath="url(#wordmark-field)"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {cells.map((cell, i) => (
          <use key={i} href={`#wf-${cell.icon.name}`} x={cell.x} y={cell.y} />
        ))}
      </g>
    </svg>
  )
}
