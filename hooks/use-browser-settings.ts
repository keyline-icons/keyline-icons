"use client"

import * as React from "react"

import {
  type BrowserSettings,
  SETTINGS_COOKIE,
  SETTINGS_MAX_AGE,
  serializeSettings,
} from "@/lib/browser-settings"

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
