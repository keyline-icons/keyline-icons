"use client"

import type { ReactNode } from "react"

import {
  AudioLines as AudioLinesIcon,
  Calendar as CalendarIcon,
  ChevronRight as ChevronRightIcon,
  CircleProgressThreeQuarter as CircleProgressThreeQuarterIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  MoreHorizontal as MoreHorizontalIcon,
  MusicNote as MusicNoteIcon,
  Receipt as ReceiptIcon,
  ShoppingBag as ShoppingBagIcon,
  SignalHigh as SignalHighIcon,
  Sun as SunIcon,
  Volume as VolumeIcon,
} from "@/components/icons"
import { DemoIcon } from "@/components/demo-icon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/*
  Every row on this page is drawn from `@/components/icons`. The cards used to
  reach into lucide for the handful of subjects the set had no glyph for: a
  camera for Instagram, a cloud for SoundCloud, a sun and a thermometer for the
  light, a gauge for the transfer limit. That is a strange thing for the
  library's own shop window to do, because the demo was quietly advertising
  another set's coverage as part of ours.

  The fix is the one `c1b4cee` used on the mobile demo. Rather than hunting for
  the nearest glyph and letting a few rows read as a stretch, the subjects moved
  to things this set actually draws. The links card is an artist's links, the
  room card is levels rather than colour temperature, and the payments card
  ends on a receipt. No row is captioned for a glyph we do not have.
*/
const linkRows = [
  {
    label: "Spotify Artist URL",
    value: "spotify.com/artist/3j...2k",
    icon: (
      <DemoIcon name="music-note" fallback={MusicNoteIcon} className="size-4" />
    ),
  },
  {
    label: "SoundCloud URL",
    value: "soundcloud.com/username",
    icon: (
      <DemoIcon
        name="audio-lines"
        fallback={AudioLinesIcon}
        className="size-4"
      />
    ),
  },
  {
    label: "Merch Store",
    value: "store.yoursite.com",
    icon: (
      <DemoIcon
        name="shopping-bag"
        fallback={ShoppingBagIcon}
        className="size-4"
      />
    ),
    muted: true,
  },
  {
    label: "Website",
    value: "https://yoursite.com",
    icon: <DemoIcon name="globe" fallback={GlobeIcon} className="size-4" />,
    muted: true,
  },
]

const levelRows = [
  {
    label: "Brightness",
    value: 78,
    /* `sun`, now that the set has one. It was `circle-half`, which is the
       contrast mark and was standing in for a brightness mark that did not
       exist. */
    icon: (
      <DemoIcon name="sun" fallback={SunIcon} className="size-6 shrink-0" />
    ),
  },
  {
    label: "Volume",
    value: 35,
    icon: (
      <DemoIcon
        name="volume"
        fallback={VolumeIcon}
        className="size-6 shrink-0"
      />
    ),
  },
  {
    label: "Fade",
    value: 8,
    icon: (
      <DemoIcon name="clock" fallback={ClockIcon} className="size-6 shrink-0" />
    ),
  },
  {
    label: "Signal",
    value: 62,
    icon: (
      <DemoIcon
        name="signal-high"
        fallback={SignalHighIcon}
        className="size-6 shrink-0"
      />
    ),
  },
]

const paymentRows = [
  {
    title: "Change transfer limit",
    description: "Adjust how much you can send from your balance.",
    icon: (
      <DemoIcon
        name="circle-progress-three-quarter"
        fallback={CircleProgressThreeQuarterIcon}
        className="size-8 shrink-0"
      />
    ),
  },
  {
    title: "Scheduled transfers",
    description: "Set up a transfer to send at a later date.",
    icon: (
      <DemoIcon
        name="calendar"
        fallback={CalendarIcon}
        className="size-8 shrink-0"
      />
    ),
  },
  {
    title: "Receipts",
    description: "Download a record of every payment you have made.",
    icon: (
      <DemoIcon
        name="receipt"
        fallback={ReceiptIcon}
        className="size-8 shrink-0"
      />
    ),
  },
]

function IconPill({
  children,
  muted,
}: {
  children: ReactNode
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-lg bg-muted px-3 text-base",
        muted && "text-muted-foreground"
      )}
    >
      {children}
    </div>
  )
}

function SliderPreview({ value }: { value: number }) {
  return (
    <div className="relative h-5 min-w-28 flex-1">
      <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-muted" />
      <div
        className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-foreground"
        style={{ width: `${value}%` }}
      />
      <div
        className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background shadow-sm"
        style={{ left: `${value}%` }}
      />
    </div>
  )
}

/*
  Container queries, not `xl:`. These cards now live inside a browser mockup
  roughly 1040px wide on a 1440px screen, and a viewport breakpoint asks the
  wrong question there: `xl:` fired on the window and packed three cards into
  226px each while the frame had 758px to give them. `@main` is the content
  column itself, so the cards reflow when the frame is narrow and go three-up
  only when there is genuinely room.
*/
export function DashboardExampleCards() {
  return (
    <section className="grid auto-rows-fr gap-4 px-4 lg:px-6 @2xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="h-full gap-0 p-6">
        <div className="flex h-full flex-col gap-5">
          <h2 className="text-xl font-semibold">Social Links</h2>
          <div className="grid gap-5">
            {linkRows.map((row) => (
              <label key={row.label} className="grid gap-2">
                <span className="font-medium">{row.label}</span>
                <IconPill muted={row.muted}>
                  {row.icon}
                  <span className="min-w-0 truncate">{row.value}</span>
                </IconPill>
              </label>
            ))}
          </div>
          <div className="mt-auto flex justify-end gap-2 pt-2">
            <Button variant="secondary">Discard</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card className="h-full gap-0 p-6">
        <div className="flex h-full flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Kitchen Island</h2>
              <p className="mt-2 text-base text-muted-foreground">
                Hue Color Ambient
              </p>
            </div>
            <button
              type="button"
              className="relative mt-1 h-6 w-11 rounded-full bg-foreground"
              aria-label="Kitchen Island power"
            >
              <span className="absolute top-1 right-1 size-4 rounded-full bg-background" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Cooking", "Dining", "Nightlight", "Focus"].map((item) => (
              <button
                key={item}
                type="button"
                className="h-9 rounded-full border bg-background px-4 text-sm font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid flex-1 gap-3">
            {levelRows.map((row) => (
              <div
                key={row.label}
                className="flex min-h-16 items-center gap-4 rounded-lg border px-4"
              >
                {row.icon}
                <span className="min-w-24 font-medium">{row.label}</span>
                <SliderPreview value={row.value} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="h-full gap-0 p-6">
        <div className="flex h-full flex-col gap-5">
          <div className="flex items-center gap-3 text-base">
            <span className="text-muted-foreground">Home</span>
            <DemoIcon
              name="chevron-right"
              fallback={ChevronRightIcon}
              className="size-4 text-muted-foreground"
            />
            <DemoIcon
              name="more-horizontal"
              fallback={MoreHorizontalIcon}
              className="size-4 text-muted-foreground"
            />
            <DemoIcon
              name="chevron-right"
              fallback={ChevronRightIcon}
              className="size-4 text-muted-foreground"
            />
            <span className="font-medium">Payments</span>
          </div>

          <div className="grid flex-1 gap-4">
            {paymentRows.map((row) => (
              <button
                key={row.title}
                type="button"
                className="flex min-h-28 items-center gap-4 rounded-lg bg-muted/70 px-5 text-left transition hover:bg-muted"
              >
                {row.icon}
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{row.title}</span>
                  <span className="mt-1 block text-muted-foreground">
                    {row.description}
                  </span>
                </span>
                <DemoIcon
                  name="chevron-right"
                  fallback={ChevronRightIcon}
                  className="size-5 shrink-0 text-muted-foreground"
                />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </section>
  )
}
