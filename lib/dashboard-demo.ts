import type { Icon, Style } from "@/lib/icons"

export type { Style }

/**
 * Every icon the dashboard mockup is allowed to draw.
 *
 * The same two jobs `MOBILE_ICON_NAMES` does: it keeps the page from shipping
 * all 414 icons to the client to draw fifty, and `pipeline/check-demos.mjs`
 * picks any `*_ICON_NAMES` list up automatically, so a rename on disk fails the
 * build instead of leaving a hole in the UI.
 *
 * This list is longer than the phone's because it includes the glyphs inside
 * the shared `ui/` primitives — the checkbox tick, the select and dropdown
 * chevrons, the sidebar's panel toggle, the toast icons. Those are drawn by
 * components the whole site uses, not just this page, which is why they render
 * through `DemoIcon`'s fallback rather than being converted outright.
 */
export const DASHBOARD_ICON_NAMES = [
  "audio-lines",
  "bar-chart",
  "bell",
  "bracket-arrow-right",
  "calendar",
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "chevrons-left",
  "chevrons-right",
  "circle-check",
  "circle-plus",
  "circle-progress-half",
  "circle-progress-three-quarter",
  "circle-user",
  "clock",
  "credit-card",
  "file",
  "file-spreadsheet",
  "file-text",
  "folder",
  "folders",
  "globe",
  "headset",
  "home",
  "info",
  "mail",
  "more-horizontal",
  "more-vertical",
  "music-note",
  "octagon-alert",
  "panel-left",
  "panel-right",
  "plus",
  "receipt",
  "record",
  "route",
  "search",
  "settings",
  "share",
  "shopping-bag",
  "signal-high",
  "smartphone",
  "sun",
  "bin",
  "trending-down",
  "trending-up",
  "triangle-alert",
  "users",
  "volume",
  "x",
] as const

export type DashboardIconName = (typeof DASHBOARD_ICON_NAMES)[number]

/** Same shape as `Icon["art"][style]`, restated so client code never imports `lib/icons` (it reads the filesystem). */
export type DashboardIconArt = { body: string; root: Record<string, string> }
export type DashboardIconSet = Record<
  string,
  Partial<Record<Style, DashboardIconArt>>
>

/**
 * Narrow a full `loadIcons()` result down to what the mockup draws.
 *
 * Throws rather than rendering blanks, for the reason `pickMobileIcons` does:
 * a renamed icon should fail at render time, not ship a dashboard with gaps.
 */
export function pickDashboardIcons(icons: Icon[]): DashboardIconSet {
  const byName = new Map(icons.map((icon) => [icon.name, icon]))
  const set: DashboardIconSet = {}
  const missing: string[] = []

  for (const name of DASHBOARD_ICON_NAMES) {
    const icon = byName.get(name)
    if (!icon) {
      missing.push(name)
      continue
    }
    set[name] = icon.art
  }

  if (missing.length > 0) {
    throw new Error(
      `The dashboard demo references icons that are not in the set: ${missing.join(", ")}`
    )
  }

  return set
}
