"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { MobileIconName, MobileIconSet, Style } from "@/lib/mobile-demo"

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

type PhoneIconContextValue = { icons: MobileIconSet; style: Style }

const PhoneIconContext = React.createContext<PhoneIconContextValue | null>(null)

function PhoneIconProvider({
  icons,
  style,
  children,
}: PhoneIconContextValue & { children: React.ReactNode }) {
  const value = React.useMemo(() => ({ icons, style }), [icons, style])

  return (
    <PhoneIconContext.Provider value={value}>
      {children}
    </PhoneIconContext.Provider>
  )
}

/**
 * One glyph inside the mockup, drawn in whichever style the page is showing.
 *
 * Presentation attributes come from the icon's own file rather than being
 * hardcoded: a pure-fill drawing carries no stroke, and inheriting one paints a
 * 2px outline over every knockout. Stroke is the one style every icon has, so
 * it is the fallback when a glyph has no duotone or fill sibling.
 */
function PhoneIcon({
  name,
  className,
  variant,
}: {
  name: MobileIconName
  className?: string
  /** Overrides the page style for this one glyph — the selected tab uses it. */
  variant?: Style
}) {
  const context = React.useContext(PhoneIconContext)

  if (!context) {
    throw new Error("PhoneIcon must be used inside PhoneIconProvider.")
  }

  const art = context.icons[name]
  const drawn = art[variant ?? context.style] ?? art.stroke

  if (!drawn) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...toReactProps(drawn.root)}
      dangerouslySetInnerHTML={{ __html: drawn.body }}
    />
  )
}

/** The style the page is currently showing, for callers that branch on it. */
function usePhoneStyle() {
  const context = React.useContext(PhoneIconContext)

  if (!context) {
    throw new Error("usePhoneStyle must be used inside PhoneIconProvider.")
  }

  return context.style
}

export { PhoneIcon, PhoneIconProvider, usePhoneStyle }
