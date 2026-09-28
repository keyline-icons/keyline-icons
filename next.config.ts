import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { NextConfig } from "next"
import { renames } from "./lib/icon-renames.json"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  images: {
    /*
      Contributor avatars, which are `github.com/<handle>.png`. One host, and
      only the avatar path on it: `remotePatterns` is an allow-list, and the
      point of listing a pathname is that this app can never be turned into an
      image proxy for the rest of github.com.
    */
    remotePatterns: [
      { protocol: "https", hostname: "github.com", pathname: "/*.png" },
    ],
  },
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  /*
    `/shadcn` became `/install` when the page outgrew its name. A rename with no
    redirect is the one way to actually lose what a URL has earned: a link into
    the old address 404s, and a 404 tells a crawler to drop the page rather than
    to follow it somewhere.

    `permanent: true` is a 308, which is the strongest signal there is that the
    address moved — stronger than the canonical on the new page, and the reason
    the canonical alone is not enough here. The old URL is not listed anywhere:
    `SITE_LINKS` carries the new one, so the nav, the footer and the sitemap all
    moved with it.
  */
  /*
    `/` was the second entry here, and it is gone. The browser moved to `/icons`
    so that every icon URL would sit under one folder, and the origin forwarded
    to it with a 308, which left the site with nothing at its own address. The
    cost of that was written down at the time along with the way back: take the
    entry out and put `app/page.tsx` in. `app/page.tsx` is the landing page, so
    the entry is out.

    Nothing needs forwarding in its place. A redirect exists to keep a *moved*
    address alive, and `/` did not move: it is a real page again, with its own
    canonical and its own content, and `/icons` keeps everything it earned while
    it stood in for it. The one thing that would break the arrangement is
    rendering the grid at both addresses, which is the duplication the route
    policy exists to prevent, and neither page does.
  */
  /*
    Renamed icons, for the same reason as `/shadcn`. An icon page is an
    address Google has already crawled, so a rename without an entry here is a
    404 in Search Console: two of these three were listed there on 14 Sep 2026.
    A rename adds its old name to `lib/icon-renames.json`; a drawing that was
    removed outright does not, since a 404 is the true answer for it.

    A rename from 1.0.0 on forwards its registry items too, in every style and
    corner (`/r/sharp/fill/rocket-2.json` included). The shadcn CLI follows a
    redirect, so `@keyline/rocket-2` keeps installing until the next major.
  */
  /*
    The demo wallpapers, which Next serves from `public/` with `max-age=0`, so
    every page that shows the phone asked for all three again on every visit.
    A day, not `immutable`: these names are not content-hashed the way
    `/_next/static` is, so a redrawn wallpaper has to be able to reach a reader
    who already has the old one. `stale-while-revalidate` is a bonus in the
    browsers that honour it, not the part this relies on.
  */
  async headers() {
    return [
      {
        source: "/wallpapers/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: "/shadcn", destination: "/install", permanent: true },
      ...renames.map(({ from, to }) => ({
        source: `/icons/${from}`,
        destination: `/icons/${to}`,
        permanent: true,
      })),
      ...renames
        .filter(({ version }) => Number(version.split(".")[0]) >= 1)
        .map(({ from, to }) => ({
          source: `/r/:path*/${from}.json`,
          destination: `/r/:path*/${to}.json`,
          permanent: true,
        })),
    ]
  },
  /*
    The shadcn catalog, split on whether the request asks a question. With no
    parameters it is the prerendered file, byte for byte what every CLI before
    4.17.0 downloads and searches itself. With any one of the four that 4.17.0
    and later send, it is `registry/search`, which answers a page.

    Four rules per address because `has` is AND, and any single parameter is
    enough to mean a search. The CLI always sends `limit` and `offset`, so
    `limit` alone would catch it; the rest are for a hand-written `?q=arrow`.

    `beforeFiles`, not the array form. The catalog is a static file, and a plain
    rewrite is only consulted after files have been checked, so it would never
    fire. Nothing here costs the bare request anything: the rule is matched at
    the edge and the file is served as it always was.
  */
  async rewrites() {
    return {
      beforeFiles: ["/r/registry.json", "/r/registry"].flatMap((source) =>
        ["q", "type", "limit", "offset"].map((key) => ({
          source,
          has: [{ type: "query" as const, key }],
          destination: "/r/registry/search",
        }))
      ),
    }
  },
}

export default nextConfig
