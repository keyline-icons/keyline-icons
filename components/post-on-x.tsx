"use client"

import { XLogo } from "@/components/brand-logos"
import { Button } from "@/components/ui/button"
import {
  featuredIntent,
  SET_FEATURED_MESSAGES,
  SET_X_HANDLE,
} from "@/lib/site-chrome"

/**
 * The showcase's one control: opens X's composer with an opener already in it.
 *
 * A client component for one reason, and it is the whole reason this is not an
 * `<a>` in the page: the opener is **picked when the button is clicked**, so
 * two people posting on the same day do not post the same sentence.
 * `SET_FEATURED_MESSAGES` says why that matters.
 *
 * Picking during render was the obvious way and is the broken one. The page is
 * statically generated, so a choice made on the server is baked into the HTML
 * and every visitor gets the same one until the next deploy; a choice made in
 * `useState` disagrees with the server's and React reports a hydration
 * mismatch. A click handler runs only on the client and only after hydration,
 * which sidesteps both.
 *
 * **It stays a real link.** `href` carries the first opener, server-rendered,
 * so the button works with no JavaScript, shows a real URL in the status bar,
 * and can be opened in a new tab or copied like any other link. The handler
 * bows out of any click the browser already treats specially, a middle click or
 * one with a modifier held, and lets the default `href` serve it. Only a plain
 * left click and the keyboard's Enter, which also arrives as a click, get the
 * randomised one.
 */
export function PostOnX() {
  return (
    <Button
      size="lg"
      render={
        <a
          href={featuredIntent(SET_FEATURED_MESSAGES[0])}
          target="_blank"
          rel="noopener noreferrer"
          /*
            Stated rather than assembled. The mark is `aria-hidden`, so the
            computed name would be "Post on", and an `sr-only` "X" after it
            concatenates without a space: the button announced itself as
            "Post onX". A label on the anchor replaces the computation instead
            of patching it.
          */
          aria-label={`Post on X, tagging @${SET_X_HANDLE} (opens in a new tab)`}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            /*
              `button !== 0` covers a middle click. The modifiers cover
              cmd/ctrl-click for a background tab and shift-click for a window.
              All of them already do something the reader asked for, and
              `preventDefault` would break every one.
            */
            if (
              event.button !== 0 ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            ) {
              return
            }
            event.preventDefault()
            const opener =
              SET_FEATURED_MESSAGES[
                Math.floor(Math.random() * SET_FEATURED_MESSAGES.length)
              ]
            window.open(featuredIntent(opener), "_blank", "noopener,noreferrer")
          }}
        />
      }
      nativeButton={false}
    >
      {/*
        The mark stands in for the word, so the label reads "Post on" followed
        by the logo rather than carrying both a logo and the letter it already
        means. No `data-icon`: that tightens the padding on a trailing
        affordance like an arrow, and this is the last word of the sentence,
        not an ornament after it.
      */}
      Post on
      <XLogo />
    </Button>
  )
}
