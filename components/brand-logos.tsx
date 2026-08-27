import type { SVGProps } from "react"

import { BrandMark } from "@/components/brand-mark"

/**
 * Three company logos, GitHub's, X's and Figma's, for the links that point at
 * those services.
 *
 * These deliberately do not live in `@/components/icons`, and the usual rule
 * that the site draws itself with its own set does not reach them. A logo is
 * not an icon: it is a fixed mark owned by someone else, it cannot be redrawn
 * on this set's 24 grid without becoming a different mark, and it cannot be
 * exported to `icons/` without shipping another company's trademark inside an
 * MIT-licensed set. Anything that is a UI affordance still comes from the set.
 *
 * Both are the official marks at their official proportions, used to point at
 * the two services and nothing else, which is what each company's own brand
 * policy asks for.
 *
 * `fill="currentColor"` on solid shapes, so they inherit the bar's ink and its
 * hover the same way every other glyph in the panel does. They carry no stroke
 * at all, which is why they can sit next to a 2px keyline set without either
 * looking wrong: at 16px a solid mark reads as a logo rather than as an icon
 * drawn to the wrong weight.
 */
type LogoProps = Omit<SVGProps<SVGSVGElement>, "children">

export function GitHubLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

/**
 * The one that breaks the `currentColor` rule above, and has to.
 *
 * Figma's mark is five coloured shapes; drawn in one ink it is an unreadable
 * stack of rounded rectangles rather than a logo anyone recognises. The colours
 * are the official ones, and they stay fixed in both themes because they are a
 * trademark rather than part of this site's palette.
 *
 * That also means it is the only mark on the site that does not respond to the
 * theme, which is correct: a logo that changes colour with the page is not that
 * company's logo any more.
 */
export function FigmaLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 57"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
        style={{ fill: "#1abcfe" }}
      />
      <path
        d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z"
        style={{ fill: "#0acf83" }}
      />
      <path
        d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z"
        style={{ fill: "#ff7262" }}
      />
      <path
        d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z"
        style={{ fill: "#f24e1e" }}
      />
      <path
        d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z"
        style={{ fill: "#a259ff" }}
      />
    </svg>
  )
}

/**
 * Paper's mark, for the disabled tab in the design-files section.
 *
 * **Their geometry, not a version of it.** The path is lifted from the wordmark
 * Paper serves inline on paper.design, with the lettering beside it dropped and
 * the `viewBox` closed around what is left: 26 units square, one subpath, their
 * own `#81ACEC`. That is deliberate and it is the rule this file learned the hard
 * way: `VueLogo`, `SvelteLogo` and `AngularLogo` were drawn here by eye and then
 * deleted, because a logo drawn from memory is a slightly wrong logo, and a
 * slightly wrong logo is worse than no logo at all.
 *
 * In its brand colour and fixed in both themes, for the same reason Figma's is:
 * a trademark is not part of this site's palette. One flat blue rather than
 * Figma's five, so this one takes `fill` on the element and needs no per-path
 * `style`.
 */
/**
 * Figma's mark and the set's own, as one lockup, for the plugin.
 *
 * The plugin tab wants to say two things at once — whose editor it runs in and
 * whose icons it carries — and either mark alone says only one of them. Figma's
 * on its own is the tab beside it wearing the same logo; ours on its own is a
 * mark most readers have never seen attached to a word they have.
 *
 * Built by nesting both components inside one `<svg>` rather than by copying
 * their paths. `BrandMark` is the only place the logo is drawn, and
 * `public/logo/logo.svg` is already a copy that renders nowhere; a third would
 * be the one that goes stale. Nested `<svg>` elements take `x`/`y`/`width`/
 * `height` and establish their own viewport, so each mark keeps its own
 * viewBox and neither has to be re-solved against this one.
 *
 * Two numbers are deliberate. The marks are **not** the same height: Figma's is
 * six outlined shapes with air between them and ours is a solid tile, so at
 * equal heights the tile reads heavier and drags the pair off balance. It sits
 * at 34 against Figma's 40, centred. And the gap is 10, wider than the 7 it
 * first shipped at: neither mark carries side bearing of its own, so the whole
 * separation lives in this number, and at 7 the tile's hard left edge sat close
 * enough to Figma's rightmost column to read as one crowded shape rather than
 * as two marks.
 */
export function FigmaPluginLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70.67 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <FigmaLogo x={0} y={0} width={26.67} height={40} />
      <BrandMark x={36.67} y={3} width={34} height={34} />
    </svg>
  )
}

export function PaperLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M15.9874 0H3.99685V3.99685H15.9874V15.9874H3.99685V3.99685L0 3.99687V15.9874V25.9795H3.99685H15.9874V15.9874H25.9795V3.99685V0H15.9874Z"
        style={{ fill: "#81acec" }}
      />
    </svg>
  )
}

export function XLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

/**
 * The one framework mark on the landing page's install row.
 *
 * Same rule as the three above: a logo is a fixed mark owned by someone else,
 * so these live here rather than in `@/components/icons` and are never exported
 * to `icons/`. They are used nominatively, to name the framework a chip stands
 * for, which is what every one of these projects' brand guidelines allows.
 *
 * **Drawn in its own brand colour**, like Figma's mark above and unlike every
 * glyph from the set: React's logo is React's, and the colour is most of what
 * makes it recognisable at 16px. `#61DAFB` is the official value and it is fixed
 * in both themes, for the reason the Figma note gives: a logo that changes
 * colour with the page is not that company's logo any more.
 *
 * Vue, Svelte and Angular were here too, drawn for a row of "coming soon" chips
 * that named three packages nobody had started. The chips went and these went
 * with them rather than sitting unused, which also retired two marks that were
 * hand-built approximations rather than the official paths. When a second
 * package genuinely ships, take that project's published SVG rather than
 * reconstructing one from memory: this mark is a circle and three ellipses 60°
 * apart, which is exact geometry, and most logos are not.
 */
export function ReactLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#61DAFB"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB" stroke="none" />
      {/* Three orbits, 60° apart. The stroke is thin on purpose: the mark is a
          hairline atom, and drawing it at this set's 2px keyline would make it
          a different logo. */}
      <g strokeWidth="1">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="11"
          ry="4.2"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  )
}

/**
 * The four networks the share menu can hand a link to, beyond X.
 *
 * Same rule as every mark above, and it is the rule that matters most here:
 * **these are the projects' own published paths, not versions of them.** All
 * four were taken from simple-icons, which tracks each company's current
 * official mark, and dropped in unchanged at their own 24-unit box. The note on
 * `ReactLogo` says why that is not fussiness: `VueLogo`, `SvelteLogo` and
 * `AngularLogo` were drawn here by eye and then deleted, because a logo drawn
 * from memory is a slightly wrong logo, and a slightly wrong logo beside four
 * correct ones is the thing a reader notices without being able to say what is
 * wrong.
 *
 * All four are single-path monochrome marks, so unlike Figma's and Paper's they
 * take `currentColor` and inherit whatever ink the row they sit in is using.
 * The share menu tints them per network on hover, which it can only do because
 * they are drawn in one ink to begin with.
 *
 * They are used nominatively, to name the destination a share row opens, which
 * is what each company's brand policy allows. None of them is exported to
 * `icons/`: shipping another company's trademark inside an MIT-licensed set is
 * the one thing this file exists to prevent.
 */
export function ThreadsLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
    </svg>
  )
}

export function BlueskyLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
    </svg>
  )
}

export function LinkedInLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function RedditLogo(props: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" />
    </svg>
  )
}
