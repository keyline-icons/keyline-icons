import Script from "next/script"

/**
 * GA4, when there is a property to send to, and nothing at all when there is
 * not.
 *
 * The site's page views come from Vercel Web Analytics, which is free on Hobby
 * and needs nothing here. This exists for the other half: custom events are a
 * Pro feature on Vercel and free and unmetered on GA4, and the events in
 * `lib/analytics.ts` are the ones worth keeping, above all which searches found
 * nothing. `track()` already calls `window.gtag` when it is defined, so turning
 * this on is the whole integration.
 *
 * **To turn it on**, set `NEXT_PUBLIC_GA_ID` to the `G-` measurement ID in the
 * Vercel project's environment variables and redeploy. Unset, this renders
 * `null` and not one byte is requested, which is what keeps the default build
 * free of a tracker.
 *
 * Two things to know before setting it:
 *
 * - **GA4 writes cookies.** The Vercel scripts do not, which is why the site
 *   has no consent banner today. Turning this on for EU visitors is the moment
 *   that stops being true, so it is a decision rather than a switch.
 * - **The counts will be low.** A design-tools audience blocks
 *   `googletagmanager.com` at a rate worth assuming is large. Read GA4 here for
 *   the shape of a distribution, which queries missed most often, and Vercel
 *   for the totals.
 *
 * `afterInteractive` rather than `beforeInteractive`: nothing on the page waits
 * on it, and a 45KB tracker ahead of the app is 45KB ahead of the app. Events
 * fired before it loads queue in `dataLayer` and go out when it arrives, so
 * nothing is lost by making it wait.
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID

  if (!id) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      {/*
        The standard bootstrap, with one addition: `send_page_view` stays on, so
        GA4's own history-change measurement counts the route changes that make
        up most of this site's navigation. `gtag` has to be a `function`
        declaration and has to use `arguments`, because what it pushes is the
        arguments object itself; an arrow function with rest parameters pushes
        an array and GA reads nothing from it.
      */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  )
}
