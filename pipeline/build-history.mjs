// Bake each icon's dates and release into lib/icon-history.json.
//
//   node pipeline/build-history.mjs [--check]
//
// The preview panel states when an icon was added, when it last changed and
// which version it ships in. All three are git facts, and git is not there at
// runtime: a deployed image is the build output, not the repository. So they
// are resolved here, once, and committed like every other generated artefact.
//
// Deliberately NOT in `icons:ci`. Every commit that touches a drawing changes
// its date, so a check would fail on the commit that makes the change and pass
// only after a second commit regenerating this — a loop that teaches people to
// ignore it. Run it with the icon build when you have changed drawings.

import { readdir, readFile, writeFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const OUT = join(ROOT, "lib", "icon-history.json")
const check = process.argv.includes("--check")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const git = (...args) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 })

/** The version an unreleased icon will first appear in. */
const current = JSON.parse(
  await readFile(join(ROOT, "packages", "react", "package.json"), "utf8")
).version

/**
 * Release tags with their dates, oldest first.
 *
 * Only semver-shaped tags count. This repo also carries `backup/pre-scrub`
 * tags, and a branch parked as a tag is not a release.
 */
const releases = git("tag", "--list", "--format=%(refname:short) %(creatordate:iso-strict)")
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [tag, date] = line.split(" ")
    return { tag, date, version: tag.replace(/^v/, "") }
  })
  .filter((r) => /^\d+\.\d+\.\d+$/.test(r.version))
  .sort((a, b) => a.date.localeCompare(b.date))

/**
 * One pass over the log, newest commit first.
 *
 * A `git log` per file would be 1,242 subprocesses. Walking one stream instead
 * means the first time a path appears is its newest commit and the last time is
 * its oldest, which is exactly `updated` and `added`.
 */
const log = git(
  "log",
  "--diff-filter=AMR",
  "--name-only",
  "--format=commit %cI%x09%an%x09%ae",
  "--",
  "icons"
)

/** name -> { added, updated, by: Set<"name\temail"> }. Dates are ISO 8601. */
const dates = new Map()
let at = null
let who = null

for (const line of log.split("\n")) {
  if (line.startsWith("commit ")) {
    const [date, author, email] = line.slice(7).split("\t")
    at = date.trim()
    // Tab-separated, because a name can contain anything but a tab.
    who = `${author}\t${email}`
    continue
  }

  const name = /^icons\/(?:stroke|duotone|fill)\/(.+)\.svg$/.exec(line)?.[1]
  if (!name || !at) continue

  const entry = dates.get(name)
  if (!entry) dates.set(name, { added: at, updated: at, by: new Set([who]) })
  else {
    // Newest first, so anything later in the stream is older.
    entry.added = at
    entry.by.add(who)
  }
}

/** The first release cut after the icon was added, or the one being worked on. */
const releaseFor = (added) =>
  releases.find((r) => r.date >= added)?.version ?? current

/**
 * Formatted here rather than in the browser.
 *
 * `toLocaleDateString` gives the server and the client different answers when
 * their locales differ, which React reports as a hydration mismatch on a date
 * nobody looks at twice. One string, decided at build, cannot disagree.
 */
const show = (iso) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))

/**
 * Only names that still exist.
 *
 * The log remembers every icon this repo ever had, including the ones renamed
 * or dropped along the way — 58 of them — and a history entry for a drawing
 * nobody can find is dead weight in a file the page ships.
 */
const live = new Set(
  (await readdir(join(ROOT, "icons", "stroke")))
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.slice(0, -4))
)

/**
 * Everyone who has touched a drawing, once each, with the icons pointing at
 * them by index.
 *
 * By index because the alternative is writing the same name and address into
 * 414 entries, and this file is imported by the page — every repetition is
 * payload. One list, and `lib/icon-contributors.ts` decides what each git
 * identity is called on screen.
 */
const people = []
const indexOf = (who) => {
  const at = people.indexOf(who)
  return at === -1 ? people.push(who) - 1 : at
}

const entries = [...dates.entries()]
  .filter(([name]) => live.has(name))
  .sort(([a], [b]) => a.localeCompare(b))

const icons = Object.fromEntries(
  entries.map(([name, { added, updated, by }]) => [
    name,
    {
      added,
      addedLabel: show(added),
      updated,
      updatedLabel: show(updated),
      version: releaseFor(added),
      by: [...by].map(indexOf),
    },
  ])
)

const out =
  JSON.stringify(
    {
      $comment: "GENERATED BY pipeline/build-history.mjs — DO NOT EDIT.",
      version: current,
      released: releases.length > 0,
      people: people.map((who) => {
        const [name, email] = who.split("\t")
        return { name, email }
      }),
      icons,
    },
    null,
    0
  ) + "\n"

if (check) {
  const have = await readFile(OUT, "utf8").catch(() => "")
  if (have !== out) {
    console.error(
      c(31, "✗") + ` lib/icon-history.json is stale — run \`npm run history:build\``
    )
    process.exit(1)
  }
  console.log(c(32, "✓") + ` lib/icon-history.json up to date (${Object.keys(icons).length} icons)`)
} else {
  await writeFile(OUT, out)
  console.log(
    c(32, "✓") +
      ` lib/icon-history.json — ${Object.keys(icons).length} icons, ` +
      `${releases.length} release${releases.length === 1 ? "" : "s"}, current ${current}`
  )
}
