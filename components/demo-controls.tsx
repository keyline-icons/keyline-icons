"use client"

import * as React from "react"
import type { CSSProperties } from "react"
import { useTheme } from "next-themes"

import { Moon, Sun } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Style } from "@/lib/icons"

/**
 * The controls both demos put beside their mockup.
 *
 * They were written for the phone and copied nowhere; when the dashboard grew
 * the same settings panel the choice was to duplicate four widgets or move
 * them here. Two settings stacks that drift apart would be worse than either
 * page having a slightly less specific control, and the styling of a segmented
 * control is exactly the kind of thing that gets tweaked on one page and
 * forgotten on the other.
 */

export const STYLE_OPTIONS: { value: Style; label: string }[] = [
  { value: "stroke", label: "Stroke" },
  { value: "duotone", label: "Duotone" },
  { value: "fill", label: "Fill" },
]

/**
 * Accents are written straight onto `--primary`, so every `text-primary` and
 * `bg-primary` inside the mockup moves at once rather than each control being
 * told about the setting.
 */
export const ACCENTS = [
  { value: "default", label: "Default", color: null },
  { value: "blue", label: "Blue", color: "#2563eb" },
  { value: "violet", label: "Violet", color: "#7c3aed" },
  { value: "emerald", label: "Emerald", color: "#059669" },
  { value: "amber", label: "Amber", color: "#d97706" },
] as const

export type AccentValue = (typeof ACCENTS)[number]["value"]

/**
 * The inline style an accent becomes, or `undefined` for the default.
 *
 * `--primary-foreground` moves with it: the four accents are all mid-tone
 * enough that white is the only readable text on them, and leaving it on the
 * theme's own value gives near-black on blue in light mode.
 */
export function accentStyle(accent: AccentValue): CSSProperties | undefined {
  const color = ACCENTS.find((option) => option.value === accent)?.color

  if (!color) return undefined

  return {
    "--primary": color,
    "--primary-foreground": "#ffffff",
    "--ring": color,
    "--sidebar-primary": color,
    "--sidebar-primary-foreground": "#ffffff",
  } as CSSProperties
}

/** One label-and-control line in the settings stack. */
export function SettingRow({
  label,
  last,
  children,
}: {
  label: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2.5",
        !last && "border-b"
      )}
    >
      <span className="text-xs font-medium">{label}</span>
      {children}
    </div>
  )
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (next: T) => void
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex rounded-full bg-muted p-0.5", className)}
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-7 flex-1 rounded-full px-3.5 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * A row of round swatches, one of which is selected.
 *
 * One component for the accent row and both wallpaper rows, because they were
 * always the same widget with different data: same 28px hit box, same offset
 * selection ring, same hairline border. Keeping them apart meant a tweak to the
 * ring on one page and not the other, and the two rows sit in the same settings
 * stack where that would show immediately.
 *
 * The ring rides the dot, not the button. On the button it was sized by the
 * 28px hit area — 8px of daylight around a 16px swatch — and shrinking the
 * button to close that would have shrunk the target with it. Here the two are
 * independent.
 *
 * The hairline is not decoration either: the wallpaper swatches run to
 * near-white and near-black, and whichever end matches the card behind it loses
 * its edge without one. It is a `border` rather than an inset ring because the
 * selected state needs the ring slot and one element cannot carry two.
 */
export function Swatches<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { value: T; label: string; swatch: string }[]
  onChange: (next: T) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="mt-2 flex items-center gap-1.5"
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex size-7 items-center justify-center rounded-full transition-transform",
              !isActive && "hover:scale-110"
            )}
          >
            <span
              className={cn(
                "size-4 rounded-full border border-foreground/20 transition-shadow",
                isActive &&
                  "ring-2 ring-foreground/40 ring-offset-2 ring-offset-background"
              )}
              style={{ background: option.swatch }}
            />
          </button>
        )
      })}
    </div>
  )
}

const ACCENT_SWATCHES = ACCENTS.map((option) => ({
  value: option.value,
  label: option.label,
  // The default accent has no colour of its own; it is whatever `--primary`
  // currently resolves to, which is exactly what the swatch should show.
  swatch: option.color ?? "var(--primary)",
}))

export function AccentSwatches({
  value,
  onChange,
}: {
  value: AccentValue
  onChange: (next: AccentValue) => void
}) {
  return (
    <Swatches
      label="Accent colour"
      value={value}
      options={ACCENT_SWATCHES}
      onChange={onChange}
    />
  )
}

/**
 * The current theme is unknowable during SSR, so the label and icon are both
 * rendered and picked by the `dark:` variant. Branching on state instead would
 * either mismatch on hydration or need a mount flag that flickers.
 */
export function AppearanceToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={buttonVariants({ variant: "outline", size: "sm" })}
    >
      {/* Sun and moon, matching the site bar's toggle. They replaced a
          half-filled disc and a solid one, which were what the set had before
          those two were drawn. The label beside the mark says the same thing in
          words, and it switches on the same `dark:` variant. */}
      <span data-icon="inline-start" className="contents">
        <Sun className="size-3.5 dark:hidden" />
        <Moon className="hidden size-3.5 dark:block" />
      </span>
      <span className="dark:hidden">Light</span>
      <span className="hidden dark:inline">Dark</span>
    </button>
  )
}
