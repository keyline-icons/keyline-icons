"use client"

import * as React from "react"

import type { IconProps } from "@/components/icons"
import type { DashboardIconSet, Style } from "@/lib/dashboard-demo"

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
const toReactProps = (a: Record<string, string>) =>
  Object.fromEntries(Object.entries(a).map(([k, v]) => [REACT_ATTR[k] ?? k, v]))

type DemoIconContextValue = { icons: DashboardIconSet; style: Style }

const DemoIconContext = React.createContext<DemoIconContextValue | null>(null)

function DemoIconProvider({
  icons,
  style,
  children,
}: DemoIconContextValue & { children: React.ReactNode }) {
  const value = React.useMemo(() => ({ icons, style }), [icons, style])

  return (
    <DemoIconContext.Provider value={value}>
      {children}
    </DemoIconContext.Provider>
  )
}

/**
 * One glyph that follows the page's chosen style, falling back to the icon's
 * own React component when there is nothing to follow.
 *
 * That fallback is the whole design. The dashboard draws roughly a dozen of its
 * glyphs through shared `ui/` primitives — the checkbox tick, the select and
 * dropdown chevrons, the sidebar toggle, the toast icons — and those components
 * render on every other page of the site too, where no provider exists and no
 * icon data has been loaded. Converting them outright would mean either
 * shipping the icon set to every route or leaving those glyphs behind when the
 * style switches. Passing the static component in as `fallback` keeps
 * tree-shaking intact (each caller still imports exactly the one icon it uses)
 * while letting the same element switch style inside the mockup.
 *
 * Presentation attributes come from the icon's own file rather than being
 * hardcoded: a pure-fill drawing carries no stroke, and inheriting one paints a
 * 2px outline over every knockout. Stroke is the one style every icon has, so
 * it is what a glyph with no duotone or fill sibling falls back to.
 *
 * `width`/`height` are set to 24 to match what the generated components
 * default to, so a caller's `size-4` overrides the same way in both paths and a
 * glyph does not change size depending on which branch drew it.
 */
function DemoIcon({
  name,
  fallback: Fallback,
  className,
  ...rest
}: {
  name: string
  fallback: (props: IconProps) => React.JSX.Element
  className?: string
  /**
   * Swallowed, never rendered. Base UI's `render` prop clones the element it is
   * given and passes its own children in, so `<Select.Icon render={<DemoIcon/>}>`
   * arrives here carrying children — and React refuses an element that has both
   * children and `dangerouslySetInnerHTML`, which took the whole page down with
   * a 500 the first time this shipped.
   *
   * The generated icon components never hit it: they spread props and then set
   * their own paths as children, so anything injected is overwritten. An icon's
   * content is its own geometry either way, so dropping this is correct rather
   * than merely convenient.
   */
  children?: React.ReactNode
} & Omit<IconProps, "children" | "size">) {
  // Dropped rather than destructured to a discard, which the repo's lint reads
  // as an unused binding whatever it is named.
  const props = { ...rest }
  delete (props as { children?: unknown }).children

  const context = React.useContext(DemoIconContext)
  const art = context?.icons[name]
  const drawn = art ? (art[context.style] ?? art.stroke) : undefined

  if (!drawn) {
    return <Fallback className={className} {...props} />
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      aria-hidden="true"
      focusable="false"
      className={className}
      {...toReactProps(drawn.root)}
      {...props}
      dangerouslySetInnerHTML={{ __html: drawn.body }}
    />
  )
}

export { DemoIcon, DemoIconProvider }
