import type { SVGProps } from "react"

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
