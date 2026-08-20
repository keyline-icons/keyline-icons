"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The site's one-of-many picker: a recessed muted track, and the chosen chip
 * lifted out of it in white.
 *
 * It exists as a component because there are now three of these on the page —
 * the style group in the filter row, and the style and format groups in the
 * preview panel — and "active is white" only stays one idiom while there is one
 * definition of it.
 *
 * The 2px of padding is exactly the difference between `rounded-lg` and
 * `rounded-md`, so the chip's curve nests inside the track's.
 */
/**
 * Two heights, and the pair is the whole reason this takes a prop: 36 is the
 * filter row's, where the group sits beside sliders and menus of that height,
 * and 32 is the preview dock's, where every control was dropped a step to give
 * the panel back the room it was taking from the grid.
 */
export function Segmented({
  size = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-size={size}
      className={cn(
        "flex items-center rounded-lg bg-muted p-0.5",
        size === "sm" ? "h-8" : "h-9",
        className
      )}
      {...props}
    />
  )
}

export function SegmentedItem({
  active,
  size = "default",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  active: boolean
  size?: "default" | "sm"
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        // 2px inside the track either way, which is the difference between
        // `rounded-lg` and `rounded-md` — the curves stay concentric.
        "flex items-center rounded-md transition-colors",
        size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
        active
          ? "bg-background shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        // A style with nothing drawn in it stays in the row rather than
        // vanishing, so the set's coverage is visible instead of implied.
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
}
