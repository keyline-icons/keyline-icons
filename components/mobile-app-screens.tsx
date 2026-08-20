"use client"

import * as React from "react"
import type { ReactNode } from "react"

import { PhoneIcon } from "@/components/phone-icon"
import { PhoneToggle } from "@/components/phone-toggle"
import { cn } from "@/lib/utils"
import {
  BREAKDOWN,
  ENROLLMENT_BARS,
  GLASS_ACTIONS,
  GLASS_NOTIFICATIONS,
  GLASS_WIDGETS,
  ISLAND_NOW,
  ISLAND_SPARK,
  ISLAND_STATS,
  POLICIES,
  STAT_CARDS,
  type MobileIconName,
  type ScreenId,
  type StatusTone,
  type WallpaperTone,
} from "@/lib/mobile-demo"

/** Status colours for the tinted tile behind a settings-row glyph. */
const TONE_TILE: Record<StatusTone, string> = {
  ok: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  busy: "bg-primary/10 text-primary",
  alert: "bg-destructive/10 text-destructive",
  idle: "bg-muted text-muted-foreground",
}

function Screen({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3.5 px-4 pt-1 pb-5">{children}</div>
}

function ScreenHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <header className="flex items-start justify-between gap-3 pt-1">
      <div className="min-w-0">
        <h2 className="text-[22px] leading-tight font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </header>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    // `-mb-2` against the screen's own `gap-3.5`: the label sat 14px from the
    // card below and 14px from the block above, so it read as floating between
    // the two rather than belonging to the one it names. 6px below, 14px above
    // groups it with its card.
    <p className="-mb-2 px-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  )
}

function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-2xl border bg-card", className)}
    >
      {children}
    </div>
  )
}

function Tile({
  icon,
  tone = "idle",
}: {
  icon: MobileIconName
  tone?: StatusTone
}) {
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-xl",
        TONE_TILE[tone]
      )}
    >
      <PhoneIcon name={icon} className="size-[19px]" />
    </span>
  )
}

/* ---------------------------------------------------------------- screens -- */

/**
 * A single live activity. Always near-black, whatever the phone's theme —
 * the island is a hole in the screen, not a surface that follows the app.
 */
function Island({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-neutral-950 px-4 py-3.5 text-white",
        // Stated rather than `shadow-lg`, which is tuned for cards on a page:
        // 10% black over 15px reads as nothing under a solid black pill. A
        // live activity sits above the wallpaper, so it wants a real drop —
        // wide and soft for the lift, plus a tight contact shadow so the
        // bottom edge does not float free of it.
        "shadow-[0_18px_36px_-10px_rgba(0,0,0,0.45),0_4px_10px_-4px_rgba(0,0,0,0.35)]"
      )}
    >
      {children}
    </div>
  )
}

/** Stat colours inside the island, tuned for white-on-black rather than reused
 *  from the light-surface palette. */
const ISLAND_TONE = {
  ok: "text-emerald-400",
  alert: "text-rose-400",
  idle: "text-white/50",
}

/**
 * One live activity carrying both halves: the ticker that is moving, and the
 * session's breadth underneath it.
 */
function IslandScreen() {
  return (
    <div className="flex flex-col px-3 pt-1 pb-5">
      <Island>
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <PhoneIcon name={ISLAND_NOW.icon} className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium tracking-wider text-white/50 uppercase">
              {ISLAND_NOW.eyebrow}
            </p>
            <p className="truncate text-[15px] leading-tight font-semibold">
              {ISLAND_NOW.title}
            </p>
            <p className="mt-0.5 text-[11px] text-white/50">
              {ISLAND_NOW.meta}
            </p>
          </div>
          <span className="text-[15px] font-semibold text-emerald-400 tabular-nums">
            {ISLAND_NOW.change}
          </span>
        </div>

        {/* The bars need a height of their own — a percentage height inside an
            auto-height row resolves to zero, the same trap the Insights chart
            hit. The last tick is solid white so the session reads as ending
            at its high rather than merely somewhere. */}
        <div className="mt-3 flex h-10 items-end gap-[2px]">
          {ISLAND_SPARK.map((tick, index) => (
            <span
              key={index}
              className={cn(
                "flex-1 rounded-[2px]",
                index === ISLAND_SPARK.length - 1 ? "bg-white" : "bg-white/25"
              )}
              style={{ height: `${tick}%` }}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center border-t border-white/10 pt-4">
          {ISLAND_STATS.map((stat) => (
            <span
              key={stat.label}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <PhoneIcon
                name={stat.icon}
                className={cn("size-[22px]", ISLAND_TONE[stat.tone])}
              />
              <span className="text-[19px] leading-none font-semibold tabular-nums">
                {stat.value}
              </span>
              <span className="text-[10px] text-white/50">{stat.label}</span>
            </span>
          ))}
        </div>
      </Island>
    </div>
  )
}

function InsightsScreen() {
  return (
    <Screen>
      <ScreenHeader
        title="Insights"
        subtitle="Fleet health, rolling window"
        action={
          <span className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-muted pr-2 pl-3 text-[12px] font-medium">
            30 days
            <PhoneIcon name="chevron-down" className="size-3.5" />
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-2.5">
        {STAT_CARDS.map((card) => (
          <Card key={card.label} className="p-3">
            <p className="text-[11px] text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-[26px] leading-none font-semibold tabular-nums">
              {card.value}
            </p>
            <p
              className={cn(
                "mt-2 flex items-center gap-1 text-[11px] font-medium",
                card.tone === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-destructive"
              )}
            >
              <PhoneIcon name={card.icon} className="size-4" />
              {card.delta}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-3">
        <div className="flex items-center gap-2">
          <PhoneIcon
            name="square-bar-chart"
            className="size-[18px] text-primary"
          />
          <p className="flex-1 text-[13px] font-medium">Enrollments</p>
          <p className="text-[11px] text-muted-foreground">Last 8 weeks</p>
        </div>
        {/* The bar row needs a definite height of its own — a percentage height
            inside an auto-height column resolves to zero. */}
        <div className="mt-4 flex h-24 items-end gap-1.5">
          {ENROLLMENT_BARS.map((bar, index) => (
            <span
              key={bar.label}
              className={cn(
                "flex-1 rounded-t-[4px]",
                index === ENROLLMENT_BARS.length - 1 ? "bg-primary" : "bg-muted"
              )}
              style={{ height: `${bar.value}%` }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          {ENROLLMENT_BARS.map((bar) => (
            <span
              key={bar.label}
              className="flex-1 text-center text-[9px] text-muted-foreground"
            >
              {bar.label}
            </span>
          ))}
        </div>
      </Card>

      <SectionLabel>Breakdown</SectionLabel>

      <Card className="divide-y">
        {BREAKDOWN.map((row) => (
          <div key={row.label} className="flex items-center gap-3 px-3 py-2.5">
            <PhoneIcon
              name={row.icon}
              className={cn(
                "size-5",
                row.tone === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : row.tone === "down"
                    ? "text-destructive"
                    : "text-muted-foreground"
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] leading-tight font-medium">
                {row.label}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {row.meta}
              </p>
            </div>
            <span className="shrink-0 text-[13px] font-medium tabular-nums">
              {row.value}
            </span>
          </div>
        ))}
      </Card>
    </Screen>
  )
}

function AccessScreen({
  policies,
  onPolicyChange,
}: {
  policies: boolean[]
  onPolicyChange: (index: number, next: boolean) => void
}) {
  return (
    <Screen>
      <ScreenHeader title="Access" subtitle="Policies applied to 128 devices" />

      <div className="flex items-center gap-2.5 rounded-2xl border border-destructive/25 bg-destructive/10 px-3 py-2.5">
        <PhoneIcon name="octagon-alert" className="size-5 text-destructive" />
        <div className="flex-1">
          <p className="text-[12px] leading-snug font-medium text-destructive">
            3 devices out of policy
          </p>
          <p className="text-[11px] text-destructive/70">
            Last checked 12 minutes ago
          </p>
        </div>
        <PhoneIcon
          name="chevron-right"
          className="size-3.5 text-destructive/70"
        />
      </div>

      <SectionLabel>Policies</SectionLabel>

      <Card className="divide-y">
        {POLICIES.map((policy, index) => {
          const on = policies[index]

          return (
            <div
              key={policy.label}
              className="flex items-center gap-3 px-3 py-2.5"
            >
              <Tile icon={policy.icon} tone={on ? "busy" : "idle"} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] leading-tight font-medium">
                  {policy.label}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {policy.meta}
                </p>
              </div>
              <PhoneToggle
                on={on}
                label={policy.label}
                onChange={(next) => onPolicyChange(index, next)}
              />
            </div>
          )
        })}
      </Card>

      <SectionLabel>Danger zone</SectionLabel>

      <Card>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <Tile icon="circle-x" tone="alert" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] leading-tight font-medium text-destructive">
              Revoke every session
            </p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              Signs out all 128 devices
            </p>
          </div>
          <PhoneIcon
            name="chevron-right"
            className="size-3.5 text-muted-foreground"
          />
        </div>
      </Card>

      <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
        <PhoneIcon name="circle-check" className="size-4" />
        Last audit 2h ago — all checks passed
      </p>
    </Screen>
  )
}

/**
 * Glass chrome, keyed off how bright the wallpaper is rather than the site
 * theme — a light photo needs dark glyphs even when the page is in dark mode.
 */
const GLASS: Record<
  WallpaperTone,
  { text: string; panel: string; muted: string; hairline: string }
> = {
  dark: {
    text: "text-white",
    panel: "bg-white/12 border-white/20",
    muted: "text-white/65",
    hairline: "bg-white/15",
  },
  light: {
    text: "text-neutral-900",
    panel: "bg-white/45 border-white/60",
    muted: "text-neutral-900/60",
    hairline: "bg-neutral-900/10",
  },
}

/**
 * The lock screen: every glyph sits on a translucent panel with a photo
 * showing through it, which is the hardest contrast case in the whole demo.
 */
function GlassScreen({
  tone,
  actions,
  onActionChange,
}: {
  tone: WallpaperTone
  actions: boolean[]
  onActionChange: (index: number, next: boolean) => void
}) {
  const g = GLASS[tone]

  return (
    <div className={cn("flex flex-col gap-4 px-4 pt-6 pb-5", g.text)}>
      <div className="relative text-center">
        {/* The clock is the only thing on this screen with no panel under it,
            so on a detailed wallpaper it competes with whatever it lands on —
            the date line and the lock glyph are the first to go. iOS lifts the
            wallpaper behind the clock rather than leaving it to fight; a
            radial veil does the same and stays invisible on the smooth
            wallpapers, where there was nothing to fix. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-12 -top-10 -bottom-3 -z-10"
          style={{
            // Tall enough to reach the date line. Sized to the block rather
            // than to the clock: the date is the dimmest thing here, so a veil
            // that fades out above it fixes the headline and leaves the part
            // that actually needed help.
            background: `radial-gradient(64% 64% at 50% 48%, ${
              tone === "dark" ? "rgba(8,8,10,0.62)" : "rgba(255,255,255,0.62)"
            }, transparent 78%)`,
          }}
        />
        <PhoneIcon name="lock" className="mx-auto size-5 opacity-80" />
        <p className="mt-3 text-[64px] leading-none font-semibold tracking-tight tabular-nums">
          9:41
        </p>
        <p className={cn("mt-1 text-[13px]", g.muted)}>Thursday, 8 August</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {GLASS_WIDGETS.map((widget) => (
          <div
            key={widget.label}
            className={cn("rounded-2xl border p-3 backdrop-blur-xl", g.panel)}
          >
            <div className="flex items-center gap-1.5">
              <PhoneIcon name={widget.icon} className="size-4" />
              <span className={cn("text-[11px] font-medium", g.muted)}>
                {widget.label}
              </span>
            </div>
            <p className="mt-2 text-[24px] leading-none font-semibold tabular-nums">
              {widget.value}
            </p>
            <p className={cn("mt-1 text-[11px]", g.muted)}>{widget.meta}</p>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex items-center justify-between rounded-2xl border px-3 py-3 backdrop-blur-xl",
          g.panel
        )}
      >
        {GLASS_ACTIONS.map((action, index) => {
          const on = actions[index]

          return (
            <button
              key={action.label}
              type="button"
              role="switch"
              aria-checked={on}
              aria-label={action.label}
              onClick={() => onActionChange(index, !on)}
              className="flex flex-1 flex-col items-center gap-1.5 outline-none"
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border transition-all duration-200 active:scale-90",
                  // On takes the accent, so the one lit control on the screen
                  // is the same colour as every other active state in the
                  // mockup. Off stays keyed to the wallpaper, since an unlit
                  // control is a tint of whatever it sits on.
                  on
                    ? "border-transparent bg-primary text-primary-foreground"
                    : cn("border-transparent", g.hairline)
                )}
              >
                <PhoneIcon name={action.icon} className="size-[22px]" />
              </span>
              <span className={cn("text-[10px]", g.muted)}>{action.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {GLASS_NOTIFICATIONS.map((notification) => (
          <div
            key={notification.body}
            className={cn(
              "flex items-start gap-2.5 rounded-2xl border px-3 py-2.5 backdrop-blur-xl",
              g.panel
            )}
          >
            <PhoneIcon
              name={notification.icon}
              className="mt-0.5 size-[18px]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold tracking-wide uppercase">
                {notification.title}
              </p>
              <p className="mt-0.5 text-[12px] leading-snug">
                {notification.body}
              </p>
            </div>
            <span className={cn("shrink-0 text-[11px]", g.muted)}>
              {notification.time}
            </span>
          </div>
        ))}
      </div>

      <p
        className={cn(
          "flex items-center justify-center gap-1.5 pt-1 text-[11px]",
          g.muted
        )}
      >
        <PhoneIcon name="unlock" className="size-4" />
        Swipe up to unlock
      </p>
    </div>
  )
}

/**
 * Switch state lives above this component so the auto-play script can drive the
 * same toggles a finger would, instead of running a parallel fake.
 */
export function AppScreen({
  id,
  wallpaperTone,
  policies,
  onPolicyChange,
  actions,
  onActionChange,
}: {
  id: ScreenId
  wallpaperTone: WallpaperTone
  policies: boolean[]
  onPolicyChange: (index: number, next: boolean) => void
  actions: boolean[]
  onActionChange: (index: number, next: boolean) => void
}) {
  switch (id) {
    case "island":
      return <IslandScreen />
    case "insights":
      return <InsightsScreen />
    case "menu":
      // Photo and the panel only — the backdrop comes from the frame.
      return null
    case "access":
      return (
        <AccessScreen policies={policies} onPolicyChange={onPolicyChange} />
      )
    case "glass":
      return (
        <GlassScreen
          tone={wallpaperTone}
          actions={actions}
          onActionChange={onActionChange}
        />
      )
  }
}
