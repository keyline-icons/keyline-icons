"use client"

import { PhoneIcon } from "@/components/phone-icon"
import { cn } from "@/lib/utils"
import { PANEL_ROWS } from "@/lib/mobile-demo"

/**
 * The settings menu that is the Menu screen.
 *
 * A fixture of that screen rather than something you open: simply there, with
 * no entrance animation and no way to dismiss it. No dividers — the rows are
 * separated by their own padding, and the selected one carries a pill instead,
 * which is what tells you where you are.
 *
 * Solid white rather than frosted, and stated rather than themed: the sheet
 * is opaque, so nothing about it depends on the wallpaper behind it or on the
 * site theme. That is what lets every row below be one fixed set of colours.
 */
function MenuPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-x-2 bottom-[72px] z-30 rounded-2xl border border-black/5 bg-white p-2 shadow-xl",
        className
      )}
    >
      {PANEL_ROWS.map((row) => (
        // A button rather than a div: hover alone would leave the rows
        // unreachable by keyboard and without a pointer cursor.
        <button
          key={row.label}
          type="button"
          aria-current={row.active ? "true" : undefined}
          className={cn(
            // `cursor-pointer` is explicit: Tailwind v4's preflight leaves
            // buttons on `cursor: default`, so hover would change colour
            // without the pointer ever saying the row is clickable.
            "flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25",
            // Every row carries the selected row's ink. The pill alone marks
            // the selection — dimming the rest as well said the same thing
            // twice, and made seven of the eight glyphs harder to read on a
            // screen whose whole job is showing glyphs.
            //
            // Hover still lands one step up from wherever the row already
            // sits, so the selected row stays the selected one under a cursor.
            "text-neutral-900",
            row.active
              ? "bg-neutral-900/[0.07] hover:bg-neutral-900/[0.11]"
              : "hover:bg-neutral-900/[0.04]"
          )}
        >
          <PhoneIcon name={row.icon} className="size-5" />
          <span className="flex-1 text-[14px] font-medium">{row.label}</span>
          {/* The one thing that stays quiet. A count or an Off is the row's
              detail, not its name, and at full strength it competes with the
              label for the same glance. */}
          {row.value && (
            <span className="text-[12px] text-neutral-900/45">{row.value}</span>
          )}
        </button>
      ))}
    </div>
  )
}

export { MenuPanel }
