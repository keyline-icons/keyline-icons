"use client"

import * as React from "react"

/**
 * Keeps an old link alive after its section moved to the release's own page.
 *
 * `/changelog#v1.0.0-four-styles` has been shared in posts and release notes,
 * and a hash never reaches the server, so no redirect rule can see it. Every
 * anchor starts with its release's version, which is how this knows where the
 * section went. A release's own `#v1.0.0` still lands on its row and stays.
 */
export function ChangelogHash() {
  React.useEffect(() => {
    const follow = () => {
      const target = decodeURIComponent(window.location.hash.slice(1))
      if (!target || document.getElementById(target)) return
      const version = /^v\d+\.\d+\.\d+/.exec(target)?.[0]
      if (version && document.getElementById(version)) {
        window.location.replace(`/changelog/${version}#${target}`)
      }
    }

    follow()
    window.addEventListener("hashchange", follow)
    return () => window.removeEventListener("hashchange", follow)
  }, [])

  return null
}
