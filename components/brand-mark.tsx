import type { SVGProps } from "react"

/**
 * The site's logo mark.
 *
 * Inlined rather than loaded from `public/logo/logo.svg` (where the original
 * lives): it renders at 28px in the nav on every page, and a request plus a
 * paint-in for something that small is worse than the markup. `next/image`
 * does not optimise SVG anyway, and a bare `<img>` trips the repo's lint.
 *
 * It carries its own surface — a flat `--primary` tile with the pennant on top
 * — so it needs no container behind it. Size it with `className`; there is
 * deliberately no `width`/`height` here.
 *
 * Two notes on the translation from the original file:
 *
 * - The colours are the `--primary` pair rather than the `#171717` and `white`
 *   they were drawn as. `--primary` resolves to exactly that black in light
 *   mode, so nothing moves there — but it inverts for dark, and a fixed white
 *   pennant would have gone white-on-white. Running the glyph on
 *   `--primary-foreground` means the two always invert together.
 * - The pennant is filled *and* stroked in the same colour. That stroke is not
 *   an outline; it is what fattens the shape to its drawn weight and rounds
 *   its tips, so the two have to stay the same colour or a seam shows up.
 *
 * The export's `clipPath` is dropped. It clipped to the full 40×40 canvas and
 * nothing in the drawing reaches it, so it never removed a pixel.
 *
 * This component is hand-written, but the tab and touch icons in `app/` are
 * generated from the same source file — redraw the logo and run
 * `npm run brand:build`, or they keep shipping the old mark.
 */
export function BrandMark({
  className,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31.916 0H8.07899C3.61455 0 0 3.615 0 8.08V31.925C0 36.385 3.61455 40 8.07899 40H31.921C36.3805 40 40 36.385 40 31.92V8.08C39.995 3.615 36.3805 0 31.916 0Z"
        /*
          Inline declarations rather than `fill-primary`, and each reads a
          custom property that falls back to the token. The mark has to invert
          on a `--primary` surface: the tile is `--primary` too, so on the
          design-files button it painted black on black and only the pennant
          survived. A parent sets `--brand-mark-tile` / `--brand-mark-glyph` to
          the opposite pair and this repaints, with nothing to thread through
          the components in between — custom properties inherit into a nested
          `<svg>`, and an inline declaration beats every class rule, which a
          Tailwind utility on this element would not.

          Both properties take the *pair*, never a literal colour, so the swap
          still inverts with the theme: `--primary` and `--primary-foreground`
          trade places in dark mode, and a hardcoded white tile would be
          white-on-white there.
        */
        style={{ fill: "var(--brand-mark-tile, var(--primary))" }}
      />
      <path
        d="M13 28.3445V11.6597C13 11.3284 13.3162 11.0887 13.6351 11.1783L26.6351 14.8269C26.8509 14.8874 27 15.0842 27 15.3083V24.7811C27 25.0064 26.8494 25.2038 26.6322 25.2634L13.6322 28.8267C13.314 28.9139 13 28.6745 13 28.3445Z"
        /* Filled and stroked in one colour: the stroke is what fattens the
           pennant to its drawn weight and rounds its tips, so the two have to
           stay equal or a seam shows. */
        style={{
          fill: "var(--brand-mark-glyph, var(--primary-foreground))",
          stroke: "var(--brand-mark-glyph, var(--primary-foreground))",
        }}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
