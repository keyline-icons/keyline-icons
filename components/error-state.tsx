"use client"

import * as React from "react"
import Link from "next/link"

import { CircleAlert } from "@/components/icons"
import { Button } from "@/components/ui/button"

/**
 * The "something went wrong" screen, shared by `app/error.tsx` and
 * `app/global-error.tsx`.
 *
 * One component rather than two copies because both boundaries ship with every
 * page, so the bundler emits each in full; written twice, each carried its own
 * copy of `next/link` and the button's internals. Drawn like the 404: the
 * set's glyph, one sentence and two ways forward, in the site's tokens.
 *
 * `retry` rather than `reset`, per the installed Next docs: it fetches the
 * segment again before re-rendering it, so a failure that was a bad response
 * rather than a bad render can recover from here. The digest is shown because
 * it is what matches a report to the server's log; the message is not, since
 * for a server error it is a generic stand-in anyway.
 */
export function ErrorState({
  error,
  retry,
  lead,
  way,
}: {
  error: Error & { digest?: string }
  retry: () => void
  lead: string
  /** The link beside "Try again". */
  way: { href: string; label: string }
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex w-full max-w-360 flex-1 flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
      <CircleAlert className="size-10 text-muted-foreground" />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-muted-foreground">{lead}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Button
          variant="outline"
          render={<Link href={way.href} />}
          nativeButton={false}
        >
          {way.label}
        </Button>
      </div>
      {error.digest && (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Reference {error.digest}
        </p>
      )}
    </main>
  )
}
