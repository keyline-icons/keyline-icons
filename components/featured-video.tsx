"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import type { StaticImageData } from "next/image"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

// The setting lives outside React, so it is read as an external store rather
// than copied into state by an effect: that copy costs a second render, and
// `react-hooks/set-state-in-effect` fails `pnpm lint` on it. The server cannot
// read the setting, so it renders the moving clip and the client corrects it
// straight after hydration. The subscription also follows the setting if it
// changes while the page is open.
function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
const prefersStill = () => window.matchMedia(REDUCED_MOTION).matches
const onTheServer = () => false

/**
 * A showcase clip: muted, looping, and only playing while it is on screen.
 *
 * It plays on sight rather than on hover. A wall of posters waiting for a
 * pointer reads as a wall of screenshots, and a phone has no hover to wait for.
 * What it does wait for is the viewport: `preload="none"` and an observer mean
 * a clip below the fold costs nothing until someone scrolls to it, and one
 * scrolled past stops decoding.
 *
 * Under `prefers-reduced-motion` it never starts, and the poster is the card,
 * the same still the gallery would have shown without a video at all.
 *
 * The width and height come off the poster's static import, so the box is
 * reserved before the first frame and the masonry does not reflow when it lands.
 */
export function FeaturedVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster: StaticImageData
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const still = useSyncExternalStore(subscribe, prefersStill, onTheServer)

  useEffect(() => {
    const video = ref.current
    if (!video || still) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    // Dropping `src` does not stop a clip that is already playing, so a
    // setting switched on mid-play has to pause it here.
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [still])

  return (
    <video
      ref={ref}
      src={still ? undefined : src}
      poster={poster.src}
      width={poster.width}
      height={poster.height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className="h-auto w-full"
    />
  )
}
