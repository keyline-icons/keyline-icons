import type { Icon, Style } from "@/lib/icons"

export type { Style }

/**
 * Every icon the phone mockup is allowed to draw.
 *
 * Two jobs. It keeps the page from shipping the whole set to the client for a
 * mockup that shows thirty glyphs, and — because the screens are typed against
 * this literal — a renamed or misspelled icon is a type error instead of a
 * silent hole in the UI.
 */
export const MOBILE_ICON_NAMES = [
  "chevron-down",
  "chevron-right",
  "circle-arrow-down",
  "circle-bar-chart",
  "circle-bar-chart-2",
  "circle-check",
  "circle-half",
  "circle-navigation",
  "circle-trending-down",
  "circle-trending-up",
  "circle-x",
  "cursor-window",
  "lock",
  "moon",
  "octagon-alert",
  "plus",
  "settings",
  "signal-high",
  "smartphone",
  "smartphone-check",
  "smartphone-horizontal",
  "square-bar-chart",
  "square-bar-chart-horizontal-start",
  "square-menu",
  "square-trending-up",
  "terminal-cursor",
  "triangle-alert",
  "unlock",
  "user",
  "user-check",
  "user-plus",
] as const

export type MobileIconName = (typeof MOBILE_ICON_NAMES)[number]

/** Same shape as `Icon["art"][style]`, restated so client code never imports `lib/icons` (it reads the filesystem). */
export type MobileIconArt = { body: string; root: Record<string, string> }
export type MobileIconSet = Record<
  MobileIconName,
  Partial<Record<Style, MobileIconArt>>
>

/**
 * Narrow a full `loadIcons()` result down to what the mockup draws.
 *
 * Throws rather than rendering blanks: if an icon is renamed on disk the page
 * should fail loudly at render time, not ship a screen with gaps in it.
 */
export function pickMobileIcons(icons: Icon[]): MobileIconSet {
  const byName = new Map(icons.map((icon) => [icon.name, icon]))
  const set = {} as MobileIconSet
  const missing: string[] = []

  for (const name of MOBILE_ICON_NAMES) {
    const icon = byName.get(name)
    if (!icon) {
      missing.push(name)
      continue
    }
    set[name] = icon.art
  }

  if (missing.length > 0) {
    throw new Error(
      `The mobile demo references icons that are not in the set: ${missing.join(", ")}`
    )
  }

  return set
}

export type ScreenId = "island" | "insights" | "menu" | "access" | "glass"

export type StatusTone = "ok" | "busy" | "alert" | "idle"

/**
 * Dynamic Island live activities.
 *
 * The island is always black, whatever the phone's theme, so this is the one
 * screen that shows every glyph knocked out in white. Worth having: a stroke
 * that reads on paper can still close up when it is light-on-dark.
 */
export const ISLAND_NOW = {
  icon: "circle-bar-chart-2",
  eyebrow: "Market open",
  title: "NVDA",
  meta: "Nasdaq · 184.20",
  change: "+1.84%",
} satisfies { icon: MobileIconName } & Record<string, unknown>

/**
 * Twelve ticks of the session, as a share of the day's high.
 *
 * Replaces the progress bar the island used to carry. A progress bar has one
 * number in it; a sparkline reads as a chart at a glance, which is the family
 * this screen is showing off.
 */
export const ISLAND_SPARK = [
  22, 28, 25, 34, 30, 41, 37, 33, 46, 52, 48, 59, 55, 68, 64, 76, 71, 83, 79,
  91, 88, 100,
]

export type IslandStat = {
  icon: MobileIconName
  value: string
  label: string
  tone: "ok" | "alert" | "idle"
}

export const ISLAND_STATS: IslandStat[] = [
  // Contained cuts, though the columns are already visually separated. The
  // uncontained ones cannot be used here: a bar chart drawn as three open
  // strokes has no interior, so it has no fill to switch to, and the style
  // picker has nothing to vary. Only a container gives all three styles.
  { icon: "circle-trending-up", value: "318", label: "Gainers", tone: "ok" },
  { icon: "circle-bar-chart", value: "2.4B", label: "Volume", tone: "idle" },
  {
    icon: "circle-trending-down",
    value: "182",
    label: "Decliners",
    tone: "alert",
  },
]

export type StatCard = {
  label: string
  value: string
  icon: MobileIconName
  delta: string
  tone: "up" | "down"
}

export const STAT_CARDS: StatCard[] = [
  {
    label: "Enrolled",
    value: "128",
    icon: "circle-trending-up",
    delta: "+12",
    tone: "up",
  },
  {
    label: "Incidents",
    value: "6",
    icon: "circle-trending-down",
    delta: "−40%",
    tone: "down",
  },
]

/** Eight weeks of enrollments, as a share of the tallest week. */
export const ENROLLMENT_BARS = [
  { label: "W1", value: 38 },
  { label: "W2", value: 52 },
  { label: "W3", value: 45 },
  { label: "W4", value: 61 },
  { label: "W5", value: 74 },
  { label: "W6", value: 58 },
  { label: "W7", value: 86 },
  { label: "W8", value: 100 },
]

export type BreakdownRow = {
  icon: MobileIconName
  label: string
  meta: string
  value: string
  tone: "up" | "down" | "flat"
}

export const BREAKDOWN: BreakdownRow[] = [
  {
    // The steepest riser in the list, so it takes the square container —
    // Field ops below it keeps the circle, and two identical glyphs three
    // rows apart read as a copy-paste slip rather than a distinction.
    icon: "square-trending-up",
    label: "Design",
    meta: "24 devices",
    value: "+18",
    tone: "up",
  },
  {
    icon: "circle-trending-up",
    label: "Field ops",
    meta: "61 devices",
    value: "+6",
    tone: "up",
  },
  {
    icon: "circle-trending-down",
    label: "Support",
    meta: "19 devices",
    value: "−3",
    tone: "down",
  },
  {
    icon: "square-bar-chart-horizontal-start",
    label: "Compliance rate",
    meta: "Rolling 30 days",
    value: "97%",
    tone: "flat",
  },
  {
    icon: "circle-bar-chart",
    label: "Median check-in",
    meta: "Across all groups",
    value: "4.2m",
    tone: "flat",
  },
]

export type PolicyRow = {
  icon: MobileIconName
  label: string
  meta: string
  on: boolean
}

export const POLICIES: PolicyRow[] = [
  {
    icon: "lock",
    label: "Passcode required",
    meta: "6+ digits · 10 attempts",
    on: true,
  },
  {
    icon: "user-check",
    label: "Two-factor for admins",
    meta: "Enforced since Mar 2",
    on: true,
  },
  {
    icon: "smartphone-check",
    label: "Device attestation",
    meta: "Blocks jailbroken hardware",
    on: true,
  },
  {
    icon: "unlock",
    label: "Guest kiosk",
    meta: "Allowed on 4 devices",
    on: false,
  },
  {
    icon: "cursor-window",
    label: "Screen capture",
    meta: "Blocked in managed apps",
    on: false,
  },
  {
    icon: "terminal-cursor",
    label: "Remote shell",
    meta: "Support window only",
    on: false,
  },
]

/**
 * The wallpaper behind every screen.
 *
 * `tone` is the image's own brightness, not the site theme: it decides whether
 * the frosted panels, their text and the status bar go light or dark. Two light
 * and two dark, so every screen can be judged in both directions.
 */
export type WallpaperTone = "light" | "dark"

export type Wallpaper = {
  value: string
  label: string
  tone: WallpaperTone
  /** Stand-in gradient for the picker swatch, so it needs no image request. */
  swatch: string
  src: string
  /**
   * Softens the image behind the UI. Per-wallpaper rather than global because
   * the set splits cleanly: the gradients want it, and the drawing must not
   * have it. Blur removes exactly the frequencies that carry fine line work,
   * so on `napping` it would dissolve the strokes the screen exists to test.
   * On a gradient there is nothing to lose and a calmer field to gain.
   */
  blur?: boolean
}

export const WALLPAPERS = [
  {
    // Gradient folds, blurred. It carries the blur more cheaply than the
    // others: there is no grain or line work in it to lose, only a few soft
    // folds where one colour laps over the next.
    //
    // Drawn here rather than photographed. This was Unsplash photo
    // 1618005182384-a83a8bd57fbe, which is free to use but not under the
    // licence this repo ships: the Unsplash licence forbids selling
    // unmodified copies, and MIT grants recipients exactly that right. An MIT
    // repo containing it would be granting a right it does not hold. Redrawn
    // as SVG at the same palette and composition, so the whole repo is
    // honestly one licence and there is no carve-out to explain.
    value: "aurora",
    label: "Aurora",
    src: "/wallpapers/aurora.svg",
    // Vivid but never dark: the purple sits mid, the cyan and the pale patch
    // are brighter still, so near-black glyphs beat white across the frame.
    tone: "light",
    swatch: "linear-gradient(150deg,#B06BF0,#8B3FE8 50%,#22C3F0)",
    blur: true,
  },
  {
    // Custom line art, and the only drawing in the set. It is the sharpest
    // test here for a reason the photographs are not: it is drawn in strokes
    // of roughly the weight the icons are, so a glyph has to read as the
    // foreground against marks that look like it rather than against a wash.
    // Never blurred — softening the strokes is the one thing that would take
    // the test away.
    //
    // The ink also sits low, through the band the menu panel and the tab bar
    // occupy, so the drawing is behind the UI rather than politely beside it.
    // Cream everywhere else, which is what keeps the panels readable.
    value: "napping",
    label: "Napping",
    src: "/wallpapers/napping.png",
    tone: "light",
    swatch: "linear-gradient(150deg,#F7F5F1,#2A2A2A 58%,#EFEDE8)",
  },
  {
    value: "midnight",
    label: "Midnight",
    src: "/wallpapers/midnight.svg",
    blur: true,
    tone: "dark",
    swatch: "linear-gradient(150deg,#33333D,#0A0A0C 55%,#1E293B)",
  },
] as const satisfies readonly Wallpaper[]

export type WallpaperValue = (typeof WALLPAPERS)[number]["value"]

export type GlassWidget = {
  icon: MobileIconName
  label: string
  value: string
  meta: string
}

export const GLASS_WIDGETS: GlassWidget[] = [
  {
    icon: "smartphone",
    label: "Fleet",
    value: "121",
    meta: "devices online",
  },
  {
    icon: "triangle-alert",
    label: "Alerts",
    value: "3",
    meta: "need a look",
  },
]

export type GlassAction = {
  icon: MobileIconName
  label: string
  on: boolean
}

export const GLASS_ACTIONS: GlassAction[] = [
  { icon: "lock", label: "Lock", on: true },
  /* `moon` for Dim, now that the set has one. It was `circle-half`, the
     contrast mark, standing in for a night mark that did not exist. */
  { icon: "moon", label: "Dim", on: false },
  { icon: "circle-navigation", label: "Locate", on: false },
  { icon: "smartphone-horizontal", label: "Rotate", on: false },
]

export type GlassNotification = {
  icon: MobileIconName
  title: string
  body: string
  time: string
}

export const GLASS_NOTIFICATIONS: GlassNotification[] = [
  {
    icon: "smartphone-check",
    title: "Beacon",
    body: "Maya's iPhone 15 Pro finished enrolling",
    time: "2m",
  },
  {
    icon: "triangle-alert",
    title: "Beacon",
    body: "3 devices failed the passcode policy",
    time: "18m",
  },
  {
    icon: "user-plus",
    title: "Beacon",
    body: "Priya Shah accepted your invite",
    time: "1h",
  },
]

/**
 * The rows of the Menu screen — a settings list carrying one glyph each,
 * on frosted glass over the rows behind it.
 */
export type PanelRow = {
  icon: MobileIconName
  label: string
  value?: string
  /** The row the menu opened on. Exactly one carries it. */
  active?: boolean
}

export const PANEL_ROWS: PanelRow[] = [
  { icon: "smartphone", label: "Devices", value: "128" },
  { icon: "circle-arrow-down", label: "Updates", value: "3", active: true },
  { icon: "user", label: "People", value: "9" },
  { icon: "square-bar-chart", label: "Reports" },
  { icon: "lock", label: "Security" },
  { icon: "unlock", label: "Guest access", value: "Off" },
  { icon: "terminal-cursor", label: "Console", value: "Off" },
  { icon: "settings", label: "Settings" },
]

/**
 * Which half of the phone the stage shows for a screen.
 *
 * The mockup is cropped, so each screen points the frame at whatever part of
 * it is worth looking at — the header and first rows, or the sheet and the tab
 * bar. Switching screens pans between the two.
 */
export type ScreenFocus = "top" | "bottom"

export type ScreenMeta = {
  id: ScreenId
  label: string
  tabIcon: MobileIconName
  blurb: string
  focus: ScreenFocus
}

export const SCREENS: ScreenMeta[] = [
  {
    id: "island",
    label: "Island",
    tabIcon: "smartphone-horizontal",
    blurb:
      "A market activity on the island: the trending and bar-chart families, knocked out in white.",
    focus: "top",
  },
  {
    id: "glass",
    label: "Glass",
    tabIcon: "circle-half",
    blurb:
      "Frosted panels over a photo, which is where icon contrast actually gets tested.",
    focus: "top",
  },
  {
    id: "insights",
    label: "Insights",
    tabIcon: "square-bar-chart",
    blurb: "Numbers, deltas and a chart: the trending and bar-chart families.",
    focus: "top",
  },
  {
    id: "access",
    label: "Access",
    tabIcon: "lock",
    blurb: "Settings rows, where a 20px glyph has to read at a glance.",
    focus: "bottom",
  },
  {
    id: "menu",
    label: "Menu",
    // The literal thing, and — unlike the chevrons this replaced — it has a
    // fill drawing, so the row and the tab go solid when selected instead of
    // quietly falling back to stroke.
    tabIcon: "square-menu",
    blurb: "A settings menu on frosted glass: icon, label, nothing else.",
    focus: "bottom",
  },
]
