"use client"

import { useEffect } from "react"

import { Mail } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { track } from "@/lib/analytics"
import { CUSTOM_MAILTO, customSource } from "@/lib/custom"

/**
 * Counts one view of `/custom`, with where it came from. Renders nothing.
 *
 * A component of its own so the page stays a server component: reading
 * `?ref=` on the server would make the route dynamic, and a page with no
 * per-request content has no reason to be.
 */
export function CustomView() {
  useEffect(() => {
    track("custom_view", { from: customSource() })
  }, [])

  return null
}

/**
 * The page's one button: it opens the reader's mail app on a prefilled brief.
 *
 * A mailto rather than a checkout, because both offers start with a
 * conversation about which icons, and a payment taken before that is a refund
 * waiting to happen. Rendered twice, in the hero and in the closing card, and
 * `place` keeps the two apart in the counts.
 */
export function CustomInquiry({
  place,
  children,
  className,
}: {
  place: "hero" | "close"
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      size="lg"
      className={className}
      render={<a href={CUSTOM_MAILTO} />}
      nativeButton={false}
      onClick={() => track("custom_click", { place, from: customSource() })}
    >
      <Mail data-icon="inline-start" />
      {children}
    </Button>
  )
}
