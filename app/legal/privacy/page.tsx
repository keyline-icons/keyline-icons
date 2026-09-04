import { SETTINGS_COOKIE, SETTINGS_DEFAULTS } from "@/lib/browser-settings"
import { loadIcons } from "@/lib/icons"
import { pageMetadata, SITE_URL } from "@/lib/seo"
import {
  LEGAL,
  SET_ISSUES_URL,
  SET_REPO_URL,
  SET_TITLE,
} from "@/lib/site-chrome"
import {
  LegalLink,
  LegalList,
  LegalPage,
  LegalSection,
} from "@/components/legal-page"

/**
 * What the site does with the people who read it.
 *
 * The rule this page follows is the same one `lib/seo.ts` applies to structured
 * data: **it may only describe what is actually there.** Every claim below is
 * checkable against a file in this repository, and the specifics are named so
 * that it can be checked rather than taken on trust: the cookie by its literal
 * name, the settings by the keys the cookie holds, the events by the names
 * `lib/analytics.ts` declares. A policy made of "we may collect certain
 * information" says nothing and cannot be falsified, which is the opposite of
 * the point.
 *
 * That makes it a page with a maintenance rule attached, and the rule has
 * already been tested once. **Anything that touches the reader's browser moves
 * this page with it.** The first draft said the site had no analytics, which
 * was true when it was written and false within the hour: `<Analytics />` and
 * `<SpeedInsights />` landed in `app/layout.tsx` in the same working tree. A
 * privacy policy that is accurate on the day it ships and never re-read is the
 * normal failure, so the list to check against is short and specific:
 *
 * - `app/layout.tsx`, for anything mounted on every page.
 * - `lib/analytics.ts`, whose `Events` type is the complete list of what is
 *   sent. Adding an event there means adding it here.
 * - `lib/browser-settings.ts`, for what the cookie holds.
 * - `next.config.ts`, for any origin the browser is allowed to reach.
 *
 * **The GA4 disclosure is derived, not written.** `components/google-analytics.tsx`
 * renders nothing unless `NEXT_PUBLIC_GA_ID` is set, so whether this site has a
 * third-party tracker on it is decided by an environment variable in the Vercel
 * project rather than by anything in the repository. A policy that named Google
 * would be false today; one that promised there was no Google would be false the
 * hour somebody set the variable, and nobody setting an environment variable
 * thinks to re-read a privacy policy.
 *
 * So the page reads the same variable the component reads. GA off, and the
 * cookie section says there is one cookie. GA on, and the page names Google as a
 * processor and says that GA writes cookies of its own. Both are prerendered at
 * build, which is also when the component's value is inlined, so the two cannot
 * disagree.
 *
 * What this does **not** do is put a consent banner on the page, and turning GA
 * on for EU visitors is the moment that becomes a real question rather than a
 * theoretical one. See the note in the component.
 *
 * Two facts here are easy to get wrong from memory and were checked:
 *
 * - **Geist is self-hosted.** `next/font/google` downloads the files at build
 *   and serves them from this origin, so no request reaches Google. Swapping to
 *   a `<link>` at fonts.googleapis.com would quietly make that sentence false.
 * - **Contributor avatars do not leak the reader to GitHub.** They are
 *   `next/image` against the one `remotePatterns` entry in `next.config.ts`, so
 *   the server fetches github.com and the browser only ever talks to us. An
 *   unoptimised `<img>` pointed at the same URL would.
 *
 * `updated` is hand-kept: the date the policy last changed, not the date the
 * file was last touched.
 */
export const metadata = pageMetadata({
  path: LEGAL.privacy,
  title: "Privacy",
  description:
    `How ${SET_TITLE} handles your data: no accounts, no ads and no ` +
    `cross-site tracking. Page views are counted without cookies, and the one ` +
    `cookie the site sets remembers how you like the icons drawn.`,
  socialDescription:
    "No accounts, no ads, no cross-site tracking, and nothing here knows who you are.",
})

export default async function Page() {
  /*
    The settings the cookie actually holds, read off the defaults rather than
    typed into the sentence. A sixth setting added to `BrowserSettings` would
    otherwise be a thing the site stores and the policy does not mention, which
    is the one kind of error on this page that matters.
  */
  const stored = Object.keys(SETTINGS_DEFAULTS)

  /*
    Counted, not typed. The sentence about loading speed named a figure that was
    already 113 drawings out of date, which is what a number written into prose
    does: nothing lints it, and it is wrong from the next release onward. Every
    other count on the site comes off `loadIcons()` for the same reason.
  */
  const drawings = (await loadIcons()).length

  /* The origin as a reader would say it, from the one place it is written. */
  const host = SITE_URL.replace(/^https:\/\//, "")

  /*
    Whether GA4 is actually on the page, read from the same variable
    `components/google-analytics.tsx` reads. See the note above: this is what
    keeps the two sections below true in both states rather than in one.
  */
  const googleAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID)

  return (
    <LegalPage path={LEGAL.privacy} title="Privacy" updated="2026-08-23">
      <LegalSection id="scope" title="What this covers">
        <p>
          This site, at {host}, and nothing else. The set is also published on
          GitHub, npm, Figma Community and paper.design, and those are other
          people&apos;s platforms: what they collect when you visit them is
          governed by their policies, not by this one.
        </p>
      </LegalSection>

      <LegalSection id="not-collected" title="What is not collected">
        <p>
          There is no account to make, and nothing on this site asks you for a
          name, an email address, or anything else about you. Specifically:
        </p>
        <LegalList>
          <li>No sign-in, no user accounts, no profiles.</li>
          <li>
            No advertising, no ad network, no tracking pixels, and nothing that
            follows you to another site.
          </li>
          <li>No session recording and no heat maps.</li>
          <li>
            No third-party embeds: no iframes, no hosted video, no comment
            widget, no chat bubble, no scripts loaded from anyone else&apos;s
            domain.
          </li>
          <li>
            No forms. Nothing here collects an email address, so there is no
            list to be on and nothing to unsubscribe from.
          </li>
        </LegalList>
        <p>
          Nothing is sold or handed to anyone for their own purposes. What is
          measured, and who processes it, is the next section.
        </p>
      </LegalSection>

      <LegalSection id="measured" title="What is measured">
        <p>
          Two things, both through{" "}
          <LegalLink href="https://vercel.com/legal/privacy-policy">
            Vercel
          </LegalLink>
          , which hosts this site and processes the measurements on our behalf.
          Neither sets a cookie.
        </p>
        <LegalList>
          <li>
            <strong className="font-medium text-foreground">Page views.</strong>{" "}
            Which pages are opened, and which site or search sent you. Counted
            without a cookie and without an identifier that survives the day, so
            a return visit next week is a new visit as far as the numbers are
            concerned.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Loading speed.
            </strong>{" "}
            How long pages take to render and respond, which is what tells us a
            page of {drawings} drawings has become slow on a phone.
          </li>
        </LegalList>
        <p>
          On top of those, a handful of things you do with the set are counted:
          copying an icon&apos;s snippet or its name, downloading an SVG,
          copying an install command, sharing the set or copying its link, and a
          search that found nothing.
        </p>
        <p>
          <strong className="font-medium text-foreground">
            The empty search sends what you typed.
          </strong>{" "}
          It is the one event that carries anything you entered, and it is the
          reason the list exists: a search for a drawing the set does not have
          is a request for it from someone who will never file one, and it is
          the only signal in the product that says what to draw next. What is
          searched here is a public list of icon names.
        </p>
        {googleAnalytics && (
          <p>
            Those events are also sent to{" "}
            <LegalLink href="https://policies.google.com/privacy">
              Google Analytics
            </LegalLink>
            , which is where they are actually counted, along with the page view
            they hang off. Unlike the two above, it writes cookies of its own;
            they are Google&apos;s rather than ours, and they are described in
            Google&apos;s policy rather than here.
          </p>
        )}
        <p>
          Every one of those events describes the set, never you: an icon name,
          a style, a filter you picked, a file format, a package manager, a
          query typed into the icon search. No identifiers, no addresses, and
          nothing typed anywhere else on the site. The complete list is the{" "}
          <LegalLink href={`${SET_REPO_URL}/blob/main/lib/analytics.ts`}>
            Events type
          </LegalLink>{" "}
          in the repository, which is a shorter and more honest answer than this
          paragraph: an event that is not in it cannot be sent.
        </p>
      </LegalSection>

      <LegalSection
        id="cookie"
        title={googleAnalytics ? "Cookies" : "The one cookie"}
      >
        <p>
          The icon browser lets you change how the set is drawn, and remembers
          it. That is the entire purpose of the only cookie this site sets for
          itself
          {googleAnalytics
            ? ", and the only one under our control. Google Analytics sets its own, which are Google's and are covered by their policy."
            : ". Nothing in the section above sets one."}
        </p>
        <LegalList>
          <li>
            Name: <code className="text-foreground">{SETTINGS_COOKIE}</code>,
            first-party, <code className="text-foreground">SameSite=Lax</code>.
          </li>
          <li>
            Contents: {stored.join(", ")}. Nothing else, and no identifier of
            any kind. It does not say who you are, because the site does not
            know.
          </li>
          <li>
            Written only when you change one of those settings, never on arrival
            and never in the background.
          </li>
          <li>
            Lifetime: one year. It is a preference, not a session, and it is
            read by the server so the page is drawn your way in the first paint
            rather than corrected afterwards.
          </li>
        </LegalList>
        <p>
          {googleAnalytics
            ? "This one is set by an action you take, carries no identifier, and is never sent anywhere but back to this site."
            : "There is no consent banner because there is nothing to consent to: the cookie is set by an action you take, carries no identifier, and is never sent anywhere but back to this site."}{" "}
          Reset in the icon browser puts the defaults back, and clearing site
          data in your browser removes it outright.
        </p>
        <p>
          Your light or dark preference is kept the same way, in your
          browser&apos;s own local storage under{" "}
          <code className="text-foreground">theme</code>. It never reaches the
          server.
        </p>
      </LegalSection>

      <LegalSection id="requests" title="What your browser loads">
        <p>
          Every page is served from this origin, and so is everything on it,
          including the two measurement scripts: they are served from a path on
          this site rather than from someone else&apos;s domain. Two more cases
          are worth naming, since both are usually third-party requests
          elsewhere:
        </p>
        <LegalList>
          <li>
            <strong className="font-medium text-foreground">Fonts.</strong>{" "}
            Geist is downloaded when the site is built and served from here. No
            request goes to Google Fonts, so nothing there sees your visit.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Contributor avatars.
            </strong>{" "}
            The pictures beside a drawing&apos;s credits come from GitHub, but
            this site fetches them and re-serves them. Your browser talks to us;
            github.com does not see you.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="server" title="What the server sees">
        <p>
          The site is hosted on Vercel, which keeps ordinary server logs as
          every web host does: the IP address a request came from, the time, the
          URL, the browser&apos;s user agent string. They exist so the site can
          be delivered and defended against abuse. They are not used to build a
          profile of you and are not sold.
        </p>
        <p>
          The site makes one outbound call of its own, and it makes it from the
          server: the star count in the header comes from GitHub&apos;s API,
          cached for an hour and shared by everyone. Your visit never reaches
          GitHub for it.
        </p>
      </LegalSection>

      <LegalSection id="links" title="Where the links go">
        <p>
          The header, the footer and several pages link out to GitHub, X, Figma,
          npm and paper.design, and the Share menu hands this site&apos;s
          address to whichever network you pick. Those are separate services
          with their own terms and their own tracking; following a link puts you
          on their site under their rules. The links are plain anchors, with no
          redirect and no tag that would tell us you clicked.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="Requests about your data">
        <p>
          There is normally nothing to request. No account exists, nothing
          measured here identifies you, and the only record of a visit is a
          server log entry held by the host for a short period.
        </p>
        <p>
          If you want to ask anyway,{" "}
          <LegalLink href={SET_ISSUES_URL}>open an issue</LegalLink> on the
          repository. That tracker is public, so please do not put personal
          details in one: describe what you are asking for, not who you are.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <p>
          The date at the top of the page is the day the policy last changed. It
          moves when the policy does, not when the site is deployed.
        </p>
        <p>
          Because this page is a file in a public{" "}
          <LegalLink href={SET_REPO_URL}>repository</LegalLink>, every revision
          of it is in the commit history, with the reason in the message. That
          is a stronger record than a sentence promising to notify you, and it
          is checkable by anyone.
        </p>
      </LegalSection>

      {/*
        Deliberately no "children under 13" section, no list of legal bases and
        no data-controller block. Every one of them is standard boilerplate, and
        every one of them here would be describing processing that does not
        happen. A policy padded with clauses about data nobody holds is the kind
        that teaches readers not to read policies.
      */}
    </LegalPage>
  )
}
