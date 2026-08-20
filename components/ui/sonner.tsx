"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheck as CircleCheckIcon,
  CircleProgressHalf as LoaderIcon,
  Info as InfoIcon,
  OctagonAlert as OctagonXIcon,
  TriangleAlert as TriangleAlertIcon,
} from "@/components/icons"
import { DemoIcon } from "@/components/demo-icon"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      /*
        All five come from the set. Sonner ships its own icons and falls back to
        them per key, so a missing entry here is not "no icon", it is a foreign
        one: leaving `info` out was what put a lucide glyph in the toast rather
        than removing one.

        `loading` is `circle-progress-half` spun, which is the same substitution
        `data-table.tsx` already makes for its In Process badge. The set has no
        dedicated spinner, and a three-quarter arc under `animate-spin` reads as
        one.
      */
      icons={{
        success: (
          <DemoIcon
            name="circle-check"
            fallback={CircleCheckIcon}
            className="size-4"
          />
        ),
        info: <DemoIcon name="info" fallback={InfoIcon} className="size-4" />,
        warning: (
          <DemoIcon
            name="triangle-alert"
            fallback={TriangleAlertIcon}
            className="size-4"
          />
        ),
        error: (
          <DemoIcon
            name="octagon-alert"
            fallback={OctagonXIcon}
            className="size-4"
          />
        ),
        loading: (
          <DemoIcon
            name="circle-progress-half"
            fallback={LoaderIcon}
            className="size-4 animate-spin"
          />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
