"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The site's one-of-many picker: a recessed muted track, and the chosen chip
 * set into it in white, edged with a hairline.
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
/**
 * `ghost` is the other look, on trial in the preview panel: no track, and the
 * chosen chip filled grey rather than set in white, the way Overflow Design
 * pairs one of each across a divider. The heights do not change, so a ghost
 * group lines up with a track beside it. Pass it to both halves, like `size`.
 */
type SegmentedVariant = "track" | "ghost"

export function Segmented({
  size = "default",
  variant = "track",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  variant?: SegmentedVariant
}) {
  return (
    <div
      /* A group by default, because a plain div drops the `aria-label` every
         caller passes: a screen reader heard a row of pressed buttons with no
         name. Before the spread, so `DesignFileTabs` can still make it a
         `tablist`. */
      role="group"
      data-size={size}
      data-variant={variant}
      className={cn(
        "flex items-center rounded-lg p-0.5",
        variant === "track" && "bg-muted",
        size === "sm" ? "h-8" : "h-9",
        className
      )}
      {...props}
    />
  )
}

/**
 * An option can carry a flag, and `badge` is how it says so.
 *
 * It rides the corner rather than sitting in the row: in flow it would widen
 * the chip, so the two options stop being the same width and the track grows a
 * step the moment the flag is retired. Absolute keeps the control the size it
 * was — the same reason the grid's tile badge is absolute.
 *
 * **It is `aria-hidden`, so the button is still called "Sharp".** Unlike the
 * grid's tiles a child here *would* fold into the accessible name, which is
 * exactly why this is a decision rather than a shrug: a control should be named
 * for what it does, not for how recently it arrived, and "Sharp New" is a worse
 * name than "Sharp". The news itself is on /changelog, which is the surface that
 * owes it.
 *
 * It follows `size` like everything else here: a badge sized for the 36px
 * track is half the height of the 32px one.
 *
 * The track sets no `overflow`, so the badge is free to straddle the edge, but
 * what it hangs over is worth measuring rather than assuming — each of the four
 * corner switches has a different neighbour to its right, and the preview
 * dock's is a fixed panel rather than a page.
 */
export function SegmentedItem({
  active,
  size = "default",
  variant = "track",
  badge,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  active: boolean
  size?: "default" | "sm"
  variant?: SegmentedVariant
  badge?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        // 2px inside the track either way, which is the difference between
        // `rounded-lg` and `rounded-md` — the curves stay concentric.
        //
        // Every label at full ink, chosen or not, and no hover fill: the white
        // face and its hairline are the only mark of the choice, so there is
        // one signal to read rather than a grey-versus-black one on top. A
        // ring rather than a border, because a border widened every chip by
        // 2px and pushed the stroke slider onto the filter row's second line
        // at 1440; the ring sits inside the track's 2px of padding instead.
        "flex items-center rounded-md transition-colors",
        size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3 text-sm",
        variant === "track" && active && "bg-background ring-1 ring-border",
        // With no track to sit in, the unchosen chips need a hover, or the
        // row reads as text rather than as buttons.
        variant === "ghost" && (active ? "bg-muted" : "hover:bg-muted/60"),
        // A style with nothing drawn in it stays in the row rather than
        // vanishing, so the set's coverage is visible instead of implied.
        "disabled:pointer-events-none disabled:opacity-40",
        badge && "relative",
        className
      )}
      {...props}
    >
      {children}
      {badge ? (
        <span
          aria-hidden="true"
          /* The `--primary` pair rather than a literal blue on white: the two
             invert together, so the badge stays legible in dark mode, where
             the blue lightens and its ink turns navy. */
          className={cn(
            "pointer-events-none absolute rounded-full bg-primary font-semibold text-primary-foreground",
            size === "sm"
              ? "-top-1.5 -right-2 px-1 text-[9px] leading-[1.4]"
              : "-top-2 -right-2.5 px-1.5 py-px text-[10px] leading-[1.3]"
          )}
        >
          {badge}
        </span>
      ) : null}
    </button>
  )
}
