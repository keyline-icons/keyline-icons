"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Half the knob, in px. The travel is inset by this at both ends. */
const KNOB_INSET = 14

/**
 * The gap between two ticks, shared by every ruler on the page.
 *
 * Widths used to be picked by eye — `w-56` for size, `w-32` for stroke — while
 * the ranges have very different step counts: 33 for 16–48 by 1, 9 for 1–3 by
 * a quarter. That put one tick every 6px on one and every 12.5px on the other,
 * so two sliders sitting side by side read at different scales. Deriving the
 * width from the number of steps keeps the pitch identical and lets the length
 * say what it should: how much range there is.
 */
const TICK_PITCH = 6

/** The tick's own width — `w-0.5`. It counts: see `trackWidth`. */
const TICK_WIDTH = 2

/**
 * A scrubber drawn as a row of ticks.
 *
 * Every step gets a tick and the round values get a taller one, so the ruler
 * reads as a scale rather than as decoration — you can see where 24 and 32 sit
 * without a label under each.
 */
function TickSlider({
  value,
  onChange,
  min,
  max,
  step,
  major,
  label,
  unit = "px",
  trackClassName,
  className,
}: {
  value: number
  onChange: (next: number) => void
  min: number
  max: number
  step: number
  /** Which values get the taller tick. */
  major: (value: number) => boolean
  /** Accessible name — the control carries no visible one. */
  label: string
  /** Suffix on the value. Empty for counts, which have no unit. */
  unit?: string
  /** Overrides the pitch-derived width — `flex-1` to fill a container. */
  trackClassName?: string
  className?: string
}) {
  const steps = React.useMemo(() => {
    const count = Math.round((max - min) / step) + 1
    return Array.from({ length: count }, (_, i) => min + i * step)
  }, [min, max, step])

  const fraction = (value - min) / (max - min)

  /*
    `justify-between` spreads the free space, not the pitch: the first tick
    starts at the edge and the last one ends at it, so the distance between
    their left edges is `(inner - TICK_WIDTH) / (steps - 1)`. Leaving the tick's
    own width out of this made the pitch drift by `2 / (steps - 1)` — 5.94 on a
    33-step ruler against 5.75 on a 9-step one.
  */
  const trackWidth =
    (steps.length - 1) * TICK_PITCH + TICK_WIDTH + KNOB_INSET * 2

  return (
    <div
      className={cn(
        // rounded-lg to match the input and the buttons either side of it.
        "relative flex h-9 items-center gap-1 rounded-lg bg-muted px-2.5",
        className
      )}
    >
      <div
        className={cn("relative h-full", trackClassName)}
        style={trackClassName ? undefined : { width: trackWidth }}
      >
        <div
          aria-hidden="true"
          className="flex h-full items-center justify-between px-3.5"
        >
          {steps.map((tick) => (
            <span
              key={tick}
              className={cn(
                "w-0.5 rounded-full transition-colors",
                // Both heights stay under the knob's, so the knob always reads
                // as the thing on top of the ruler.
                major(tick) ? "h-3.5" : "h-2",
                tick <= value ? "bg-foreground" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* The knob from the phone switch, at its size: h-4 w-7, slide only. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 h-4 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5 bg-white shadow-sm transition-[left] duration-150 ease-out motion-reduce:transition-none"
          style={{
            left: `calc(${KNOB_INSET}px + ${fraction} * (100% - ${KNOB_INSET * 2}px))`,
          }}
        />

        {/*
          The real control, invisible over the top. Its thumb is sized to match
          the drawn knob so the browser's own value mapping lands where the knob
          is, and arrow keys keep working for free.
        */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
          aria-label={label}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none"
        />
      </div>

      <span className="w-10 text-right text-sm text-muted-foreground tabular-nums">
        {value}
        {unit && (
          <span className="ml-0.5 text-xs text-muted-foreground/70">
            {unit}
          </span>
        )}
      </span>
    </div>
  )
}

export { TickSlider }
