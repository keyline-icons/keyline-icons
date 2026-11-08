"use client"

import * as React from "react"

import {
  type BrowserSettings,
  parseSettings,
  SETTINGS_COOKIE,
  SETTINGS_MAX_AGE,
  serializeSettings,
} from "@/lib/browser-settings"

const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** What this visit wrote, for a browser that refuses to keep the cookie. */
let written = ""

const readStored = () => {
  const prefix = `${SETTINGS_COOKIE}=`
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))
  return cookie ? cookie.slice(prefix.length) : written
}

/**
 * The settings on a page that is built ahead of time, read from the browser.
 *
 * A store rather than state seeded by an effect: React hydrates on the empty
 * server snapshot, so the first client render matches the static HTML, and then
 * re-renders on the real cookie in the same task. A client navigation has no
 * HTML to match and gets the real value on its first render. See
 * `SETTINGS_PREPAINT` for how the wait stays invisible.
 */
export function useStoredSettings() {
  const raw = React.useSyncExternalStore(subscribe, readStored, () => "")
  const settings = React.useMemo(() => parseSettings(raw || undefined), [raw])

  const update = React.useCallback((patch: Partial<BrowserSettings>) => {
    const next = { ...parseSettings(readStored() || undefined), ...patch }
    written = serializeSettings(next)
    document.cookie = `${SETTINGS_COOKIE}=${written}; path=/; max-age=${SETTINGS_MAX_AGE}; SameSite=Lax`
    listeners.forEach((listener) => listener())
  }, [])

  return [settings, update] as const
}

/**
 * The settings, seeded by the server from the cookie it was sent.
 *
 * Because the initial value arrives as a prop, the first client render matches
 * the server's exactly — no hydration correction, so nothing moves after paint.
 * Writes go to state and to the cookie together: state for this page, the
 * cookie for the next request.
 */
export function useBrowserSettings(initial: BrowserSettings) {
  const [settings, setSettings] = React.useState(initial)

  const update = React.useCallback((patch: Partial<BrowserSettings>) => {
    setSettings((current) => {
      const next = { ...current, ...patch }

      // `Lax` and no `Secure`: it is a display preference, and the site runs on
      // plain http in development.
      document.cookie = `${SETTINGS_COOKIE}=${serializeSettings(next)}; path=/; max-age=${SETTINGS_MAX_AGE}; SameSite=Lax`

      return next
    })
  }, [])

  return [settings, update] as const
}
