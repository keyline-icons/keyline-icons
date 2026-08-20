"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** How far the knob travels: 48px track − 28px knob − 2×2px padding. */
const TRAVEL = 16

/** Past this many pixels a press counts as a drag rather than a tap. */
const DRAG_THRESHOLD = 3

/**
 * The switch's appearance, in one place, worn by both exports.
 *
 * They were one component and the classes were written inline. A mock of a
 * settings page then needed a switch that is a picture rather than a control,
 * and the shortest way to get one is a rounded div with a white dot in it,
 * which is how a second switch with its own proportions ends up on the site.
 * Naming the two surfaces here is what makes `PhoneToggleFace` free.
 */
const TRACK =
  "relative h-5 w-12 shrink-0 rounded-full transition-colors duration-200"

const KNOB =
  // A capsule, wider than it is tall. It only ever slides — no scale, no
  // stretch; deforming it on the way across read as cartoonish.
  "absolute top-0.5 left-0.5 h-4 w-7 rounded-full border border-black/5 bg-white shadow-sm"

/** Lit or not. The one colour decision, shared so it cannot drift. */
const track = (on: boolean) => (on ? "bg-primary" : "bg-muted-foreground/25")

/**
 * The switch as a picture: no handlers, no focus, nothing announced.
 *
 * For mock interfaces, where a real switch would be a control a reader can tab
 * to and operate inside a screenshot. Use it anywhere UI is being *depicted*
 * rather than offered — see `components/keyline-showcase.tsx` — and use
 * `PhoneToggle` for anything that actually toggles something.
 *
 * It takes no `onChange`, which is also what lets a server component render it:
 * a function cannot cross the server/client boundary, so a presentational
 * variant that required a no-op handler would throw on every page that used it.
 */
function PhoneToggleFace({
  on,
  className,
}: {
  on: boolean
  className?: string
}) {
  return (
    <span aria-hidden="true" className={cn(TRACK, track(on), className)}>
      <span
        className={KNOB}
        style={{ transform: `translateX(${on ? TRAVEL : 0}px)` }}
      />
    </span>
  )
}

type Drag = { originX: number; dx: number; moved: boolean }

/**
 * An iOS-style switch you can either tap or drag.
 *
 * Pointer input commits on pointerup rather than on click, so a drag that ends
 * back where it started does not also register as a tap. Keyboard activation
 * still arrives as a click with `detail === 0`, which is the one case the click
 * handler exists for.
 */
function PhoneToggle({
  on,
  onChange,
  label,
  className,
}: {
  on: boolean
  onChange: (next: boolean) => void
  label: string
  className?: string
}) {
  const [drag, setDrag] = React.useState<Drag | null>(null)

  const offset = drag
    ? Math.min(TRAVEL, Math.max(0, (on ? TRAVEL : 0) + drag.dx))
    : on
      ? TRAVEL
      : 0

  const commit = (next: boolean) => {
    if (next === on) return
    onChange(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        setDrag({ originX: event.clientX, dx: 0, moved: false })
      }}
      onPointerMove={(event) => {
        setDrag((current) => {
          if (!current) return null
          const dx = event.clientX - current.originX
          return {
            ...current,
            dx,
            moved: current.moved || Math.abs(dx) > DRAG_THRESHOLD,
          }
        })
      }}
      onPointerUp={() => {
        if (!drag) return
        commit(drag.moved ? offset > TRAVEL / 2 : !on)
        setDrag(null)
      }}
      onPointerCancel={() => setDrag(null)}
      onClick={(event) => {
        if (event.detail === 0) commit(!on)
      }}
      className={cn(
        TRACK,
        // `touch-none` so dragging the knob on a phone does not scroll the list
        // underneath it.
        // A ring here means focus and nothing else. The lit state used to carry
        // a decorative `ring-primary/25` rim, but with a near-black accent that
        // renders grey and is indistinguishable from the focus ring.
        "touch-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        track(on),
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          KNOB,
          // A decelerating curve with no control point past 1, so the knob
          // settles into place rather than rebounding off the far end. While
          // the finger is down it has to track the pointer exactly, so the
          // transition comes off entirely.
          !drag &&
            "transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
        )}
        style={{ transform: `translateX(${offset}px)` }}
      />
    </button>
  )
}

export { PhoneToggle, PhoneToggleFace }
