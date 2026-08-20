import { SET_REPO_SLUG } from "@/lib/site-chrome"

/**
 * How many people have starred the repo, or `null` when GitHub will not say.
 *
 * `null` is the expected answer today, not the error case: the repo is private,
 * and the unauthenticated API answers a private repo with a 404, exactly as it
 * answers one that does not exist. The bar is built for that, so publishing the
 * repo turns the count on with no code change and no deploy.
 *
 * Server-side on purpose. A count fetched in the browser is one more request on
 * every page load, it arrives after the first paint and shifts the bar when it
 * lands, and it is invisible to anything that does not run scripts. Fetched
 * here it is already in the HTML.
 *
 * Never throws. A number in a nav bar is not worth a 500, and the API is
 * reachable from a build, a preview and an edge region with three different
 * failure modes: rate limits at 60 requests an hour per IP for anonymous
 * callers, network refusals, and a body that is not the shape documented. All
 * three land on the same `null` and the bar simply shows no number.
 */
export async function repoStars(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${SET_REPO_SLUG}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // One call an hour across the whole site, shared by every page that
        // renders the bar. Without this each request would spend one of the 60
        // anonymous calls the IP is allowed per hour, and a burst of traffic
        // would rate-limit the count away for the rest of it.
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) return null

    const repo: unknown = await response.json()
    const stars =
      typeof repo === "object" && repo !== null
        ? (repo as { stargazers_count?: unknown }).stargazers_count
        : undefined

    return typeof stars === "number" ? stars : null
  } catch {
    return null
  }
}

/**
 * 1_284 -> "1.2k". Star counts sit in a fixed slot in the bar, and a five-digit
 * number there is wide enough to push the controls beside it around.
 *
 * One decimal place, and only when it says something: 1.0k is noise, so 1_000
 * reads "1k". Above 10k the decimal is dropped entirely, which is where it
 * stops being informative and starts being four characters of precision nobody
 * reads.
 */
export function formatStars(stars: number): string {
  if (stars < 1000) return String(stars)

  const thousands = stars / 1000
  if (thousands >= 10) return `${Math.round(thousands)}k`

  // Rounded before the decimal is judged, not after: 9_999 is 9.999k, which
  // reads "10.0k" if the two steps are the other way round.
  const rounded = Math.round(thousands * 10) / 10

  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}k`
}
