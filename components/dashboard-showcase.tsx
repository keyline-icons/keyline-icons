"use client"

import * as React from "react"
import Link from "next/link"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardExampleCards } from "@/components/dashboard-example-cards"
import { DataTable } from "@/components/data-table"
import { DemoIconProvider } from "@/components/demo-icon"
import {
  ACCENTS,
  AccentSwatches,
  AppearanceToggle,
  Segmented,
  SettingRow,
  STYLE_OPTIONS,
  Swatches,
  accentStyle,
  type AccentValue,
} from "@/components/demo-controls"
import { ArrowRight } from "@/components/icons"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import type { DashboardIconSet, Style } from "@/lib/dashboard-demo"
// The wallpapers were drawn for the phone and live with it. Both demos show
// them now, but moving the data would churn a file full of the reasoning for
// why each picture is in the set, for no gain beyond a tidier import path.
import { WALLPAPERS } from "@/lib/mobile-demo"
import { cn } from "@/lib/utils"

/**
 * How tall the window's viewport is.
 *
 * The dashboard is not scaled down to fit. The whole argument this page makes
 * is that the set holds up at 16px in dense UI, and a `transform: scale()`
 * would shrink every glyph below the size being argued about — a screenshot of
 * the claim rather than the claim. So the frame is a real viewport at 1:1 and
 * scrolls, exactly as a short browser window would.
 */
const VIEWPORT_HEIGHT = 640

/**
 * The desktop behind the window, and the reason it is worth having.
 *
 * A wallpaper on the phone is not decoration: the two in-app screens put
 * frosted panels over it, so every glyph on them has to hold its own against a
 * photograph. Dropping the same picture behind an opaque dashboard would test
 * nothing at all — the icons would never touch it.
 *
 * So the sidebar goes translucent when a wallpaper is on, which is what a real
 * desktop app does anyway: macOS gives sidebars a vibrancy material and keeps
 * the content pane opaque. That puts the sidebar's fifteen glyphs directly over
 * the picture and makes the control the same contrast test the phone's is,
 * rather than a nicer backdrop.
 *
 * `none` leads and is the default, so the window's own appearance is the one
 * that ships and the desktop is something you go looking for. The phone has no
 * equivalent because a phone screen always has a wallpaper; a window on a plain
 * surface is an ordinary thing to see.
 */
const DESKS = [
  { value: "none", label: "None", swatch: "var(--muted)" },
  ...WALLPAPERS.map((paper) => ({
    value: paper.value,
    label: paper.label,
    swatch: paper.swatch,
  })),
] as const

type DeskValue = (typeof DESKS)[number]["value"]

export function DashboardShowcase({
  icons,
  data,
  totalIcons,
  heading = true,
}: {
  icons: DashboardIconSet
  data: React.ComponentProps<typeof DataTable>["data"]
  totalIcons: number
  /** The page heading and its lead. See the note on `MobileShowcase`'s. */
  heading?: boolean
}) {
  const [style, setStyle] = React.useState<Style>("stroke")
  const [accent, setAccent] = React.useState<AccentValue>("default")
  const [desk, setDesk] = React.useState<DeskValue>("none")

  const accentLabel = ACCENTS.find((option) => option.value === accent)?.label
  const wallpaper = WALLPAPERS.find((option) => option.value === desk)

  return (
    <DemoIconProvider icons={icons} style={style}>
      {/*
        `w-full` is load-bearing, not belt-and-braces. The layout wraps every
        page in `flex min-h-svh flex-col`, so this is a flex item, and an auto
        margin on the cross axis suppresses `align-items: stretch` — the box
        shrink-wraps its content instead of filling the line. The frame then
        collapsed to 468px in a 1440px viewport, because a dashboard is happy
        to be narrow. It is why the house container in the skill is written
        `mx-auto w-full max-w-…` rather than `mx-auto max-w-…`.
      */}
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12">
        {heading && (
          <header className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance">
              Icons in a shadcn/ui dashboard
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              A sidebar, a data table and three cards, drawn at the 16px they
              actually ship at. Switch the style or the accent and watch the
              layout hold still.
            </p>
          </header>
        )}

        <div
          className={cn(
            "grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)]",
            heading && "mt-10"
          )}
          style={accentStyle(accent)}
        >
          {/*
            The window chrome is doing real work, not decoration. Without it the
            dashboard filled the page edge to edge and read as this site's own
            product rather than as a specimen of the icons — which is the whole
            reason this page exists.
          */}
          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="flex items-center gap-3 border-b bg-muted/50 px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-foreground/15" />
                <span className="size-3 rounded-full bg-foreground/15" />
                <span className="size-3 rounded-full bg-foreground/15" />
              </div>
              <div className="mx-auto w-full max-w-xs truncate rounded-md bg-background px-3 py-1 text-center text-xs text-muted-foreground">
                app.example.com/dashboard
              </div>
              {/* Balances the traffic lights so the address bar centres. */}
              <div className="w-[42px] shrink-0" aria-hidden="true" />
            </div>

            {/*
              `translate-z-0` is load-bearing. The sidebar is `fixed inset-y-0
              h-svh`, built for a whole viewport, and inside an ordinary div it
              escapes the frame and pins itself to the browser's own window. A
              transform makes this element the containing block for fixed
              descendants, so the sidebar lands against the frame instead. The
              two `min-h-full` / `h-full` overrides below are the other half:
              they replace `svh` units, which no containing block can redirect.
            */}
            <div
              className="relative translate-z-0 overflow-hidden"
              style={{ height: VIEWPORT_HEIGHT }}
            >
              {/*
                Two elements, and which one scrolls matters. The transform is on
                the outer box so it becomes the containing block for the
                sidebar's `position: fixed`; the scrolling happens on the inner
                one. Put both jobs on a single element and the sidebar, now
                positioned against a box that is itself the scrollport's
                content, scrolls up out of the window with the table — where a
                real fixed sidebar would stay put. Splitting them pins the
                sidebar to the frame and lets only the content move.
              */}
              {/*
                The desktop. Absolutely positioned rather than a background on
                the scroller, so it stays put while the content moves, the same
                way a wallpaper does not scroll when you scroll a window.
              */}
              {wallpaper && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${wallpaper.src})` }}
                />
              )}
              <div className="relative h-full overflow-auto">
                <SidebarProvider
                  className={cn(
                    "min-h-full",
                    // The wrapper paints `bg-sidebar` across the whole window
                    // for the inset variant, so it has to give way before any
                    // wallpaper is visible at all. The blur goes on the inner
                    // panel from here rather than in `ui/sidebar.tsx`, so the
                    // cost is paid only when there is something to blur.
                    wallpaper &&
                      cn(
                        "has-data-[variant=inset]:bg-transparent",
                        // The glass is the sidebar's *own* token at reduced
                        // opacity, not a re-themed surface. Overriding
                        // `--sidebar-foreground` to suit the picture was the
                        // first attempt and it broke the Inbox button: that one
                        // is `variant="outline"`, whose `bg-background` reads
                        // neither `--background` nor `--color-background` at
                        // runtime, so the chip stayed white while its glyph
                        // went white with everything else. Tinting instead
                        // leaves every token contract inside the sidebar
                        // exactly as it was, so each control stays correct in
                        // both themes and there is nothing to keep in sync.
                        "[&_[data-slot=sidebar-inner]]:bg-sidebar/55",
                        "[&_[data-slot=sidebar-inner]]:backdrop-blur-xl"
                      ),
                    // shadcn rounds the inset variant's content pane and leaves
                    // the sidebar square, which is invisible while the two are
                    // the same colour and the panel has nothing to sit against.
                    // The glass gave it edges, and a square panel beside a
                    // rounded one then reads as a mistake. `rounded-xl` is the
                    // radius `SidebarInset` already uses, so the pair match
                    // rather than merely both being round.
                    //
                    // Unconditional: with no wallpaper the panel and its
                    // wrapper are the same fill, so the corners cost nothing
                    // and there is no second state to keep in step.
                    "[&_[data-slot=sidebar-inner]]:rounded-xl"
                  )}
                  style={
                    {
                      "--sidebar-width": "calc(var(--spacing) * 68)",
                      "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                  }
                >
                  <AppSidebar variant="inset" className="h-full" />
                  <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                      <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                          <SectionCards />
                          <DashboardExampleCards />
                          <DataTable data={data} />
                        </div>
                      </div>
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </div>
              <Toaster />
            </div>
          </div>

          <aside>
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
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  Every glyph in the window switches, down to the checkbox ticks
                  and the chevrons in the table&apos;s menus. Not one row
                  reflows.
                </p>
              </div>

              <div className="border-b p-3">
                <p className="text-xs font-medium">Accent</p>
                <AccentSwatches value={accent} onChange={setAccent} />
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {accentLabel} writes `--primary`, which the badges, the active
                  sidebar row and the primary buttons all read.
                </p>
              </div>

              <div className="border-b p-3">
                <p className="text-xs font-medium">Desktop</p>
                <Swatches
                  label="Desktop wallpaper"
                  value={desk}
                  options={DESKS}
                  onChange={setDesk}
                />
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {wallpaper
                    ? `The sidebar is glass over ${wallpaper.label}, so its fifteen glyphs are reading against a picture rather than a flat fill.`
                    : "Put the window on a desktop and the sidebar turns to glass, which is where a 16px glyph has to hold its own against a picture."}
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
    </DemoIconProvider>
  )
}
