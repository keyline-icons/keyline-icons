"use client"

import * as React from "react"
import Link from "next/link"

import { ArrowRight } from "@/components/icons"
import { AppScreen } from "@/components/mobile-app-screens"
import {
  PhoneIcon,
  PhoneIconProvider,
  usePhoneStyle,
} from "@/components/phone-icon"
import {
  AccentSwatches,
  Swatches,
  AppearanceToggle,
  Segmented,
  SettingRow,
  STYLE_OPTIONS,
  accentStyle,
  type AccentValue,
} from "@/components/demo-controls"
import { MenuPanel } from "@/components/menu-panel"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  GLASS_ACTIONS,
  POLICIES,
  SCREENS,
  WALLPAPERS,
  type MobileIconSet,
  type ScreenId,
  type Style,
  type Wallpaper,
  type WallpaperValue,
} from "@/lib/mobile-demo"

/**
 * Brushed titanium. The alternating light and dark stops are what sell it —
 * a single flat grey reads as cardboard no matter how good the radius is.
 */
const RAIL =
  "bg-[linear-gradient(155deg,#f4f4f6_0%,#b6b6bd_13%,#e9e9ed_27%,#98989f_44%,#dededf_60%,#a5a5ac_78%,#f1f1f3_100%)]"

/** Shorter than the phone on purpose — the stage shows a little over half. */
const STAGE_HEIGHT = 460
/** Breathing room between the phone's near edge and the stage edge. */
const STAGE_INSET = 28

/**
 * How long the app content stays blurred when the screen changes.
 *
 * The blur goes on with no transition and comes off with one, so the content
 * swap — which is instant, and was the last hard cut left in a change that is
 * otherwise a 900ms pan and a 500ms cross-fade — happens while the layer is
 * already out of focus. What you see is a focus pull settling on the new
 * screen rather than one screen replacing another mid-slide.
 *
 * Long enough to cover a paint, short enough that a click never feels delayed.
 */
const SETTLE_MS = 70

function PhoneFrame({
  screen,
  onScreenChange,
  wallpaper,
  settling,
  screenRef,
  policies,
  onPolicyChange,
  actions,
  onActionChange,
}: {
  screen: ScreenId
  onScreenChange: (next: ScreenId) => void
  wallpaper: Wallpaper
  /** True for a beat after a screen change, while the content refocuses. */
  settling: boolean
  screenRef: React.RefObject<HTMLDivElement | null>
  policies: boolean[]
  onPolicyChange: (index: number, next: boolean) => void
  actions: boolean[]
  onActionChange: (index: number, next: boolean) => void
}) {
  const style = usePhoneStyle()

  // Every screen sits on the wallpaper. The two in-app ones put a frosted
  // scrim between it and their content: body text and section labels sit
  // straight on the background there, and on a bare photo they are unreadable.
  // Blurring the picture is what an iOS material does — it keeps the wallpaper
  // present instead of covering it with a slab.
  const scrimmed = screen === "insights" || screen === "access"

  // Behind a scrim the chrome is no longer on the photo, so its colour comes
  // from the site theme again — reading the wallpaper's tone there would put
  // white glyphs on a light-mode surface.
  // Applied to the two layers that actually swap. The chrome is deliberately
  // left sharp: the tab bar is what you just pressed, and blurring it makes
  // the press feel like it missed.
  const refocus = cn(
    "transition-[filter] motion-reduce:blur-none motion-reduce:transition-none",
    settling ? "blur-[5px] duration-0" : "blur-none duration-[420ms] ease-out"
  )

  const onPhoto = !scrimmed
  const overDark = onPhoto && wallpaper.tone === "dark"
  const glassText = onPhoto
    ? overDark
      ? "text-white"
      : "text-neutral-900"
    : undefined

  return (
    <div className="relative shrink-0">
      {/* Three shells, like the device: a brushed titanium rail, the black
          bezel inside it, then the glass. One flat slab never reads as a
          phone — the giveaway is the metal catching light along the edge. */}
      <div
        className={cn("rounded-[3.3rem] p-[4px] ring-1 ring-black/20", RAIL)}
      >
        <div className="rounded-[3.15rem] bg-black p-[9px]">
          {/* Narrower than the frame on small screens rather than scaled: the
              app content is fluid, so it reflows instead of overflowing. */}
          <div
            ref={screenRef}
            className="relative flex h-[740px] w-[352px] max-w-[calc(100vw-5rem)] flex-col overflow-hidden rounded-[2.6rem] bg-background text-foreground"
          >
            {/* Every wallpaper is mounted and the inactive ones are held at
                zero opacity, so a change cross-fades instead of cutting.
                Swapping `background-image` on one element cannot animate —
                the old picture is simply gone on the next frame, which lands
                as a hard cut in the middle of the stage's 900ms pan and reads
                as a glitch rather than a transition.

                Three small files, all decoded up front, so the fade also has
                nothing to wait for. */}
            {/* Widened to `Wallpaper` on the way in: `WALLPAPERS` is `as
                const`, so the entries that leave `blur` off do not carry the
                key at all and the union has no such property to read. */}
            {WALLPAPERS.map((option: Wallpaper) => (
              <span
                key={option.value}
                aria-hidden="true"
                className={cn(
                  "absolute bg-cover bg-center transition-opacity duration-500 ease-out motion-reduce:transition-none",
                  option.blur
                    ? // Oversized, because `blur()` samples past the element's
                      // own edge: at `inset-0` the border pixels fade into
                      // nothing and leave a soft halo inside the screen.
                      // Bleeding it 2rem out puts that falloff outside the
                      // parent's clip — and puts its corners far enough away
                      // that they no longer need a matching radius either.
                      "-inset-8 blur-md"
                    : // Unblurred it goes back to filling the screen exactly,
                      // which keeps the framing the image was cropped for. A
                      // square child clipped by a rounded parent antialiases
                      // against the parent's own background, hence the radius.
                      "inset-0 rounded-[2.6rem]",
                  option.value === wallpaper.value ? "opacity-100" : "opacity-0"
                )}
                style={{ backgroundImage: `url(${option.src})` }}
              />
            ))}

            {/* Not opaque: at full strength this is just the old flat screen
                with a wasted image request behind it. The blur is what makes
                85% readable — it flattens the photo's local contrast so text
                is not competing with edges showing through. */}
            {scrimmed && (
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[2.6rem] bg-background/85 backdrop-blur-2xl"
              />
            )}

            <span
              aria-hidden="true"
              className="absolute top-[10px] left-1/2 z-40 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black"
            />

            {/* Status bar. `signal-high` has no fill drawing and falls back to
              stroke there — it is chrome, not content, so that reads fine. */}
            <div
              className={cn(
                // z-40 like the tab bar: both are device chrome, so a sheet that
                // dims the app must never blur the clock or the battery.
                "relative z-40 flex h-11 shrink-0 items-center justify-between px-6 pt-1.5",
                // Tracks the cross-fade rather than snapping: the glyph
                // colour is chosen by the wallpaper's tone, so an instant
                // flip would put white text on a half-faded light image.
                "transition-colors duration-500",
                glassText
              )}
            >
              <span className="text-[13px] font-semibold tabular-nums">
                9:41
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneIcon name="signal-high" className="size-[15px]" />
                {/* Drawn in `currentColor` so it inverts with the status bar
                  when the glass screen puts it over a light wallpaper. */}
                <span className="flex items-center gap-[2px]">
                  <span className="relative h-[11px] w-[22px] rounded-[3px] border border-current/40">
                    <span className="absolute top-[1.5px] bottom-[1.5px] left-[1.5px] w-[12px] rounded-[1px] bg-current" />
                  </span>
                  <span className="h-[4px] w-[1.5px] rounded-r-full bg-current/40" />
                </span>
              </span>
            </div>

            <div
              data-scroll=""
              className={cn(
                "relative z-10 flex-1 [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden",
                refocus
              )}
            >
              <AppScreen
                id={screen}
                wallpaperTone={wallpaper.tone}
                policies={policies}
                onPolicyChange={onPolicyChange}
                actions={actions}
                onActionChange={onActionChange}
              />
            </div>

            {screen === "menu" && <MenuPanel className={refocus} />}

            {/* A floating bar rather than a full-width one: the pill and the
              action button sit on the app, so on a photo screen the picture
              runs behind and around them. */}
            <nav
              aria-label="App tabs"
              className={cn(
                "relative z-40 shrink-0 px-3 pt-2 pb-1 transition-colors duration-500",
                onPhoto && (overDark ? "text-white" : "text-neutral-900")
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  // Opaque white on every screen. Translucent, it had to be
                  // told whether to lighten or darken for each backdrop, and
                  // got it wrong whenever a wallpaper landed near the value it
                  // was mixing toward. Solid, it reads the same everywhere and
                  // fixes its glyph colour with it.
                  className="flex flex-1 items-center gap-0.5 rounded-full bg-white p-1 text-neutral-900 shadow-sm"
                >
                  {SCREENS.map((tab) => {
                    const isActive = tab.id === screen

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        aria-label={tab.label}
                        onClick={() => onScreenChange(tab.id)}
                        className={cn(
                          // No labels, so every chip is the same width and all
                          // five fit. The selection reads from the white pill
                          // and from the glyph going solid.
                          "flex flex-1 items-center justify-center rounded-full py-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "opacity-55 hover:opacity-90"
                        )}
                      >
                        {/* The selected tab reads as filled the way iOS does it.
                          In duotone and fill the glyph is already solid, so the
                          override only kicks in for stroke. */}
                        <PhoneIcon
                          name={tab.tabIcon}
                          className="size-5"
                          variant={
                            isActive && style === "stroke" ? "fill" : undefined
                          }
                        />
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  aria-label="New"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-90"
                >
                  <PhoneIcon name="plus" className="size-5" />
                </button>
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  "mx-auto mt-2 block h-[5px] w-[120px] rounded-full",
                  onPhoto ? "bg-current opacity-40" : "bg-foreground/25"
                )}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MobileShowcase({
  icons,
  totalIcons,
  heading = true,
}: {
  icons: MobileIconSet
  totalIcons: number
  /**
   * The page heading and its lead. `false` where this is embedded under a
   * heading of its own: the landing page stacks both demos inside one section,
   * and three titles down the middle of one block is two too many. The demo
   * routes leave it on, because there the `h1` is what the `<title>` promises.
   */
  heading?: boolean
}) {
  const [style, setStyle] = React.useState<Style>("stroke")
  const [settling, setSettling] = React.useState(false)
  const [screen, setScreen] = React.useState<ScreenId>("island")
  const [accent, setAccent] = React.useState<AccentValue>("default")
  const [policies, setPolicies] = React.useState(() =>
    POLICIES.map((policy) => policy.on)
  )
  const [actions, setActions] = React.useState(() =>
    GLASS_ACTIONS.map((action) => action.on)
  )
  const [wallpaperValue, setWallpaperValue] = React.useState<WallpaperValue>(
    WALLPAPERS[0].value
  )

  const screenRef = React.useRef<HTMLDivElement | null>(null)
  const stageRef = React.useRef<HTMLDivElement | null>(null)
  const settleTimer = React.useRef<number | null>(null)

  // Clearing on unmount, and on every change, so a fast run through the tabs
  // cannot leave an earlier timer to drop the blur out from under a later one.
  React.useEffect(
    () => () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current)
    },
    []
  )

  const wallpaper =
    WALLPAPERS.find((option) => option.value === wallpaperValue) ??
    WALLPAPERS[0]

  /** The scroll container the screens live in, found through the screen box. */
  const scroller = React.useCallback(
    () =>
      screenRef.current?.querySelector<HTMLElement>("[data-scroll]") ?? null,
    []
  )

  const changeScreen = React.useCallback(
    (next: ScreenId) => {
      setScreen(next)
      // A fresh screen starts at the top; the container is shared, so its
      // scroll position would otherwise carry over from the last tab.
      scroller()?.scrollTo({ top: 0 })

      // Point the window at the half this screen is about, then leave it
      // where the reader puts it. `scrollTo` rather than a transform, so the
      // same pixels move whether the change came from a tab or from a wheel.
      const stage = stageRef.current
      const focus = SCREENS.find((candidate) => candidate.id === next)?.focus
      if (stage) {
        stage.scrollTo({
          top: focus === "bottom" ? stage.scrollHeight - stage.clientHeight : 0,
          behavior: "smooth",
        })
      }

      setSettling(true)
      if (settleTimer.current) window.clearTimeout(settleTimer.current)
      settleTimer.current = window.setTimeout(
        () => setSettling(false),
        SETTLE_MS
      )
    },
    [scroller]
  )

  const flip = React.useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<boolean[]>>,
      index: number,
      next?: boolean
    ) =>
      setter((current) =>
        current.map((value, i) => (i === index ? (next ?? !value) : value))
      ),
    []
  )

  return (
    <PhoneIconProvider icons={icons} style={style}>
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* Held to a reading measure and centred in the 1400px, so the
            paragraph stays short enough to scan rather than running the full
            width of the three columns below it. */}
        {heading && (
          <header className="mx-auto max-w-2xl text-center">
            {/*
            Word for word the route's `<title>`, which is the point: a heading
            and a title that describe the same page are what stop Google
            rewriting the result into something worse. "The set, on a phone
            screen" said the same thing with a comma splice doing the work.
          */}
            <h1 className="text-4xl font-semibold tracking-tight text-balance">
              Icons on a phone screen
            </h1>
            {/*
            Says what the page is, then what to do with it.

            Two earlier versions failed differently. The first spent its
            opening on the app: an invented name, that it was made up, what it
            managed. None of that is the subject. The second kept only the
            technical claim, "nothing in the layout moves, because every glyph
            is a 24×24 box with the same optical weight", which is true, is the
            reason the set is built the way it is, and means nothing to anyone
            who has not personally been bitten by icons reflowing a row. It
            explained a mechanism to a reader who had not yet been told what
            they were looking at.

            So: the contrast with the homepage grid, which is the honest reason
            this page exists, and the size, which is the thing a grid cannot
            show you. The controls are named because they are sitting right
            beside this paragraph and are the whole point of it being
            interactive rather than a screenshot.
          */}
            <p className="mt-3 text-pretty text-muted-foreground">
              The set in an app instead of a grid, at the size icons actually
              ship at. Switch the style, the tab or the accent to compare.
            </p>
          </header>
        )}

        <div
          className={cn(
            "grid items-start justify-center gap-10 lg:grid-cols-[minmax(0,17rem)_auto_minmax(0,17rem)]",
            heading && "mt-10"
          )}
          style={accentStyle(accent)}
        >
          <aside className="order-2 lg:order-1">
            <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              Screens
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              {SCREENS.map((candidate) => {
                const isActive = candidate.id === screen

                return (
                  <button
                    key={candidate.id}
                    type="button"
                    aria-pressed={isActive}
                    // `changeScreen`, not `setScreen` — this list and the tab
                    // bar inside the phone have to do the same thing, or the
                    // scroll reset and the wallpaper only happen from one of
                    // the two ways in.
                    onClick={() => changeScreen(candidate.id)}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                      isActive
                        ? "border-border bg-muted"
                        : "border-transparent hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {/* The selected row goes solid, the same way the tab
                        bar inside the phone does. Only stroke needs the
                        override — duotone and fill are already solid, and a
                        glyph with no fill drawing falls back to stroke rather
                        than vanishing. */}
                      <PhoneIcon
                        name={candidate.tabIcon}
                        className="size-5"
                        variant={
                          isActive && style === "stroke" ? "fill" : undefined
                        }
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {candidate.label}
                      </span>
                      <span className="block text-xs leading-snug text-muted-foreground">
                        {candidate.blurb}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="mt-6 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
              Not every glyph has a duotone or fill drawing yet. Those fall back
              to stroke instead of disappearing, so a style switch can never
              leave a hole in the UI.
            </p>
          </aside>

          {/* The stage is a window onto a phone taller than it. Each screen
              scrolls it to the half worth looking at, and from there you can
              scroll the rest yourself — the framing is a starting point, not a
              fixed crop. Scrollbar hidden because the phone's own edge already
              says which way it moves. */}
          <div className="order-1 lg:order-2">
            <div
              ref={stageRef}
              className="relative w-[27rem] max-w-full [scrollbar-width:none] overflow-y-auto overscroll-contain rounded-[2.5rem] bg-gradient-to-b from-muted to-muted/30 ring-1 ring-border/60 [&::-webkit-scrollbar]:hidden"
              style={{ height: STAGE_HEIGHT }}
            >
              <div
                className="flex justify-center"
                style={{ paddingBlock: STAGE_INSET }}
              >
                <PhoneFrame
                  screen={screen}
                  onScreenChange={changeScreen}
                  wallpaper={wallpaper}
                  settling={settling}
                  screenRef={screenRef}
                  policies={policies}
                  onPolicyChange={(index, next) =>
                    flip(setPolicies, index, next)
                  }
                  actions={actions}
                  onActionChange={(index, next) =>
                    flip(setActions, index, next)
                  }
                />
              </div>
            </div>
          </div>

          <aside className="order-3">
            <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              Settings
            </p>

            <div className="mt-3 rounded-xl border">
              <div className="border-b p-3">
                <p className="text-xs font-medium">Icon style</p>
                <Segmented
                  label="Icon style"
                  value={style}
                  options={STYLE_OPTIONS}
                  onChange={setStyle}
                  className="mt-2 flex w-full"
                />
              </div>

              <div className="border-b p-3">
                <p className="text-xs font-medium">Accent</p>
                <AccentSwatches value={accent} onChange={setAccent} />
              </div>

              {/* Under the accent, because the two do the same kind of job:
                  both restyle the mockup without moving anything in it. The
                  accent ramp is deliberately not among the swatches — that is
                  the control directly above. */}
              <div className="border-b p-3">
                <p className="text-xs font-medium">Wallpaper</p>
                <Swatches
                  label="Wallpaper"
                  value={wallpaperValue}
                  options={WALLPAPERS}
                  onChange={setWallpaperValue}
                />
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {wallpaper.label} is {wallpaper.tone}, so the frosted panels
                  on the Glass screen and every glyph on them flip to{" "}
                  {wallpaper.tone === "dark" ? "white" : "near-black"}.
                </p>
              </div>

              <SettingRow label="Appearance" last>
                <AppearanceToggle />
              </SettingRow>
            </div>

            <Link
              href="/icons"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-4 w-full"
              )}
            >
              Browse all {totalIcons} icons
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </aside>
        </div>
      </div>
    </PhoneIconProvider>
  )
}
