"use client"

import dynamic from "next/dynamic"

/*
  Loaded when a page actually fails, not with every page. Next ships this
  boundary on every route so it can render it, and with the screen imported
  statically each page carried its link and button code a second time: 10 KB
  brotli per page, measured 28 Sep 2026. If the screen itself cannot be
  fetched, that failure escalates to `global-error.tsx`, which is static on
  purpose so that the last resort never depends on a second download.
*/
const ErrorState = dynamic(() =>
  import("@/components/error-state").then((m) => m.ErrorState)
)

/**
 * What a page shows when it throws while rendering, in place of Next's
 * unstyled built-in, which had no way back and ignored the theme. It sits
 * under the root layout, so the theme and fonts are already on; the layout
 * itself failing is `global-error.tsx`'s job. The screen is `ErrorState`.
 */
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <ErrorState
      error={error}
      retry={retry}
      lead="This page failed to draw. Trying again usually fixes it; if it keeps happening, the browser is still one click away."
      way={{ href: "/icons", label: "Browse the icons" }}
    />
  )
}
