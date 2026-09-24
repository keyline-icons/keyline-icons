"use client"

import * as React from "react"

/**
 * The line a section has to cross to become the current one, as a share of the
 * window's height.
 *
 * A third of the way down rather than at the top edge, because a title sits
 * under the fixed bar and a reader who has just scrolled one into view is
 * reading it well before it reaches the top.
 */
const READING_LINE = 0.35

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true })
  window.addEventListener("resize", onChange)
  return () => {
    window.removeEventListener("scroll", onChange)
    window.removeEventListener("resize", onChange)
  }
}

/**
 * Which section the reader is in: the last one whose top has crossed the
 * reading line.
 *
 * The bottom of the page is its own case. The last sections of a page are
 * often short, so the final one can never reach the line however far the page
 * scrolls, and without this its entry could not be lit by scrolling at all.
 */
function currentIndex(ids: readonly string[]): number {
  const doc = document.documentElement
  if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
    return ids.length - 1
  }
  const line = window.innerHeight * READING_LINE
  let current = 0
  for (let i = 0; i < ids.length; i++) {
    const section = document.getElementById(ids[i])
    if (section && section.getBoundingClientRect().top <= line) current = i
  }
  return current
}

/**
 * The index, in `ids`, of the section in view.
 *
 * Shared by the changelog's release ticks and the install page's contents,
 * which were going to be two copies of one scroll listener. Read through
 * `useSyncExternalStore`, the site's rule for anything only the browser can
 * know: the server commits to the first section and the client corrects it on
 * hydration without a mismatch.
 */
export function useSectionInView(ids: readonly string[]): number {
  const key = ids.join("\n")
  const getSnapshot = React.useCallback(
    () => currentIndex(key.split("\n")),
    [key]
  )
  return React.useSyncExternalStore(subscribe, getSnapshot, () => 0)
}
