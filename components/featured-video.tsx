"use client"

import { useEffect, useRef, useState } from "react"
import type { StaticImageData } from "next/image"

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
  const [still, setStill] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

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
