/**
 * One icon, rendered from the markup its own file carries.
 *
 * It lives apart from the browser so that anything else on the site drawing an
 * icon from the set — at grid size or at display size — goes through the same
 * renderer. Two of these is how one surface starts disagreeing with another
 * about what an icon looks like.
 */
export const STYLES = ["stroke", "duotone", "fill"] as const
export type Style = (typeof STYLES)[number]

/**
 * The three container forms, named here rather than inline in the type below.
 *
 * They were a union written out in `BrowserIcon`, which is fine until something
 * has to *validate* against them: `/icons?shape=` arrives as an unchecked
 * string from the URL and has to be narrowed before it can seed a filter. A
 * type cannot do that at runtime, so the values live here and the type is
 * derived from them.
 *
 * This file rather than `lib/icons.ts`, which is the same pair for `STYLES`:
 * that module reads the filesystem, so a client component cannot import from
 * it, and the browser is a client component.
 */
export const CONTAINERS = ["regular", "square", "circle"] as const
export type Container = (typeof CONTAINERS)[number]

export type StyleArt = { body: string; root: Record<string, string> }

/** Git's answers about the drawing, baked at build. See `lib/icons.ts`. */
export type IconHistory = {
  added: string
  addedLabel: string
  updated: string
  updatedLabel: string
  /** The release it shipped in, or null while no tag covers it yet. */
  version: string | null
  /** Everyone whose commits touched it, newest first. */
  by: { name: string; email: string }[]
}

export type BrowserIcon = {
  name: string
  base: string
  container: Container
  art: Partial<Record<Style, StyleArt>>
  history?: IconHistory
  /**
   * Added since the last release, so the grid can badge it.
   *
   * Decided on the server and carried here rather than worked out in the
   * browser: the comparison needs the tag date out of `lib/icon-history.json`,
   * and `lib/icons.ts` reads the icon directories off disk, so a client
   * component cannot import it to ask.
   */
  isNew?: boolean
}

/** kebab-case SVG attribute -> the React prop name. */
const REACT_ATTR: Record<string, string> = {
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-opacity": "fillOpacity",
  "stroke-opacity": "strokeOpacity",
}

export const toReactProps = (a: Record<string, string>) =>
  Object.fromEntries(Object.entries(a).map(([k, v]) => [REACT_ATTR[k] ?? k, v]))

/**
 * Render an icon using the root attributes from its own file.
 *
 * Hardcoding stroke here breaks pure-fill icons: their paths carry no stroke of
 * their own, so an inherited one paints a 2px outline over the whole shape and
 * swallows thin knockouts.
 */
export function Glyph({
  art,
  size,
  stroke,
  className,
}: {
  art: StyleArt
  size: number
  stroke: number
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...toReactProps(art.root)}
      // Only where the file itself sets one. A pure-fill icon carries no stroke
      // at all, and handing it a width would be the first step toward painting
      // an outline over its knockouts.
      {...(art.root["stroke-width"] ? { strokeWidth: stroke } : null)}
      dangerouslySetInnerHTML={{ __html: art.body }}
    />
  )
}
