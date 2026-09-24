"use client"

import * as React from "react"

/**
 * How long a jump may take before the destination is let go of anyway.
 *
 * `scrollend` is what normally releases it, and a browser without the event,
 * or a click on the section already in view, which scrolls nowhere and so
 * never ends a scroll, would otherwise leave the row clicked lit for as long
 * as the page stayed open.
 */
const JUMP_TIMEOUT = 3000

/**
 * A smooth scroll to a section, in place of the anchor's jump, and the section
 * it is travelling to while it travels.
 *
 * The changelog's ticks did this first (Zafar, 17 Sep 2026: "let's see how
 * switching tags with smooth scroll looks"), and the install page's contents
 * are the second list of anchors that wanted it (24 Sep: "you didn't add
 * smooth scroll like in changelog"), so it lives here rather than in either.
 *
 * `target` is the index clicked, held until the scroll ends. Without it a list
 * that lights the section in view lit every section the scroll passed through,
 * a flicker of thirteen titles for one click; with it the list moves once and
 * the page catches up.
 *
 * The section's own `scroll-mt-24` is what keeps it clear of the bar:
 * `scrollIntoView` honours scroll margin, so the landing spot is the same one
 * the plain link reaches. The hash still moves, with `pushState`, so the
 * address stays a link to the section and Back returns from it. A click with a
 * modifier is left to the browser, which opens a tab rather than scrolling,
 * and a reader who asks for reduced motion gets the jump.
 */
export function useSectionJump(ids: readonly string[]) {
  const [target, setTarget] = React.useState<number | null>(null)
  const jump = React.useRef<AbortController | null>(null)

  const go = (event: React.MouseEvent<HTMLAnchorElement>, i: number) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    const section = document.getElementById(ids[i])
    if (!section) return
    event.preventDefault()

    jump.current?.abort()
    const controller = new AbortController()
    jump.current = controller
    const release = () => {
      controller.abort()
      setTarget(null)
    }
    window.addEventListener("scrollend", release, { signal: controller.signal })
    const timer = window.setTimeout(release, JUMP_TIMEOUT)
    controller.signal.addEventListener("abort", () =>
      window.clearTimeout(timer)
    )

    setTarget(i)
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    section.scrollIntoView({
      behavior: still ? "auto" : "smooth",
      block: "start",
    })
    window.history.pushState(null, "", `#${ids[i]}`)

    /*
      Focus goes to the section, because cancelling the anchor cancelled the
      one thing it did besides scrolling: moving the point Tab starts from.
      Without this a keyboard reader who pressed Enter on a row was still on
      the row, the next Tab went to the next row, and on the chips the page
      scrolled all the way back up to it (found in review, 24 Sep 2026; the
      ticks had it too). `-1` makes a heading or a section focusable from
      script and nowhere else, `preventScroll` leaves the smooth scroll alone,
      and the outline goes because the anchor's own jump never drew one: the
      next Tab lands on the first link inside, which draws its own.
    */
    if (!section.hasAttribute("tabindex")) {
      section.setAttribute("tabindex", "-1")
      section.style.outline = "none"
    }
    section.focus({ preventScroll: true })
  }

  return { target, go }
}
