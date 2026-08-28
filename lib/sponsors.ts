/**
 * Who is sponsoring the set, and where their name is owed.
 *
 * Two published tiers on GitHub Sponsors promise placement, so this list is a
 * commitment rather than a nicety: `$25 a month` puts a name in the README and
 * `$100 a month` puts it on this site as well. Both were published before
 * either place existed, which is the wrong order and is why this file exists.
 *
 * Maintained by hand, deliberately. The alternative is the GitHub API at build
 * time, which needs a token in CI, fails the build when sponsorship is
 * unreachable, and rewrites the page for a change that happens a few times a
 * year. A pull request adding four lines is the cheaper mechanism, and it
 * leaves a record of when someone started.
 *
 * `since` is the month they started, so the list can be ordered by it rather
 * than by amount: a queue of who arrived first reads better than a leaderboard,
 * and nobody's contribution is ranked against anyone else's.
 *
 * When someone sponsors:
 *
 *   1. Add them here, `web` only if they gave one.
 *   2. Write the same name into README.md, between the `SPONSORS:start` and
 *      `SPONSORS:end` comments. Two places, by hand, because `readmes:fix`
 *      substitutes digits inside sentences and cannot do this: see its header
 *      for why it is a check rather than a generator.
 *   3. Say thanks. The $10 one-time tier promises a post on X as well.
 */
export type Sponsor = {
  /** As they want to be credited, which is not always their login. */
  name: string
  /** GitHub login, for the avatar and the link when there is no site. */
  login: string
  /** Their own URL, when they would rather the link went there. */
  web?: string
  /** ISO month they started, e.g. "2026-09". */
  since: string
  /** Which tier, because only `website` earns a place on the site. */
  tier: "readme" | "website"
}

/**
 * Everyone owed a name, oldest first.
 *
 * The empty state stays written down rather than being deleted now that there
 * is a name here: an invisible section is the version that rots, because it
 * looks identical whether there are no sponsors or the list broke, and nobody
 * finds out which. The pages say "nobody yet" when this is empty.
 *
 * `login` is `github.com/preline`, the organisation, which is what the avatar
 * is fetched from. The library itself lives under a different org, so the two
 * do not match and that is not a mistake: this is who sponsors, not where the
 * code is.
 */
export const SPONSORS: Sponsor[] = [
  {
    name: "Preline",
    login: "preline",
    web: "https://preline.co",
    since: "2026-08",
    tier: "website",
  },
]

/** Those owed a place on the site. The README lists everyone. */
export const siteSponsors = () =>
  SPONSORS.filter((s) => s.tier === "website").sort((a, b) =>
    a.since.localeCompare(b.since)
  )

/** Where a sponsor's name should point. Their site if they gave one. */
export const sponsorHref = (s: Sponsor) =>
  s.web ?? `https://github.com/${s.login}`
