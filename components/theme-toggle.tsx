"use client"

import { useTheme } from "next-themes"

import { Moon, Sun } from "@/components/icons"
import { cn } from "@/lib/utils"

/**
 * The site bar's light/dark switch.
 *
 * It replaced the bar's primary button, which said "Sponsor" and before that
 * "Get started". Both were asks; this is the one control in the bar that does
 * something for the reader, and the sponsor ask moved to the foot of the page
 * where it can make its case in a sentence instead of one word.
 *
 * **Nothing here reads the theme during render.** `next-themes` cannot know the
 * resolved theme on the server, so a component that branches on it renders one
 * thing server-side and another on hydration, and React logs a mismatch for a
 * control that looks fine. Both marks are therefore always in the DOM and CSS
 * picks between them on `.dark` — the same trick the mobile demo's toggle uses.
 * `resolvedTheme` is only read inside the click handler, where the answer is
 * known and no render depends on it.
 *
 * The accessible name is fixed for that reason too: "Toggle dark mode" says
 * what the button does without claiming which state it is in, so it needs no
 * knowledge of the theme to be correct.
 *
 * `d` toggles the theme from anywhere on the site. That hotkey predates this
 * button and lives in `components/theme-provider.tsx`; the button is what makes
 * it discoverable to everyone who was never going to guess it.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {/*
        Sun for light, moon for dark: the same pair the phone and dashboard
        appearance rows use, so every light/dark control on the site agrees about
        what the mark means. Only one is ever visible, and which one is a CSS
        question rather than a render-time one.

        It was `circle-half` over `circle-full`, a half-filled disc and a solid
        one, which is what the set had before `sun` and `moon` were drawn. The
        pair was legible and meant nothing on its own: a half-filled circle is
        the contrast idiom, and it was doing duty as a theme mark because there
        was no theme mark. Each of these says which state it is in without a
        legend.

        Each mark shows the theme you are *in*, not the one you would switch to.
        That was true of the discs and it stays true here, because the button's
        accessible name is fixed at "Toggle dark mode" and does not describe a
        state; a mark showing the destination instead would leave the two saying
        different things.
      */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  )
}
