// Bake each icon's dates and release into lib/icon-history.json.
//
//   node pipeline/build-history.mjs [--check]
//
// The preview panel states when an icon was added, when it last changed and
// which version it ships in. Git is not there at runtime, because a deployed
// image is the build output rather than the repository, so they are resolved
// here, once, and committed like every other generated artefact.
//
// This file is generated from two inputs, not one: this repository's git log,
// and its own previous contents. The second exists because the public history
// starts on 20 August 2026 and the set was drawn over the fortnight before it.
// See the merge below for what that means and why it is safe to re-run.
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
  execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 << 20,
  })

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
const releases = git(
  "tag",
  "--list",
  "--format=%(refname:short) %(creatordate:iso-strict)"
)
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

/**
 * What the previous run recorded, which is older than this repository's git.
 *
 * The set was drawn over 404 commits between 8 and 19 August 2026, and the
 * public repository opens with one commit dated the 20th: the history was
 * replaced for the open-source release, deliberately, and the drawing dates
 * went with it. Every icon's `added` collapsed to one day, and 503 drawings
 * claiming to have appeared simultaneously is not a fact about anything.
 *
 * So git is not the only input any more. This file's own previous answer is the
 * other, and the two are merged rather than one overwriting the other:
 *
 *   added   = the earlier of the two, because an icon cannot have been added
 *             after the first time anyone recorded it
 *   updated = the later, but only counting commits after the root, for the
 *             reason below
 *   by      = the union, so the rewrite does not drop a contributor
 *
 * **The root commit is not an edit.** It wrote all 1,286 SVGs at once, so git
 * reports every icon as modified on 20 August. Taking that as `updated` would
 * move all 503 to the same day and lose the fortnight a second time, in the
 * other column. It is a history replacement rather than anyone touching a
 * drawing, so it is ignored for icons that were already recorded. A commit
 * after it is a real edit and does count.
 *
 * That makes the merge idempotent and self-maintaining. An icon drawn tomorrow
 * has no recorded entry and takes git's dates unchanged; an icon edited
 * tomorrow is changed by a commit later than the root, so it takes the new
 * `updated` and keeps its true `added`. Nobody has to remember to freeze
 * anything, and `--check` still passes, because merging twice gives the same
 * answer as merging once.
 *
 * The dates are recoverable, not invented: `archive/pre-release-history` on the
 * archive remote still holds all 404 commits. If this file is ever lost, that
 * branch is where it comes back from, not this repository's log.
 */
const prior = JSON.parse(
  await readFile(OUT, "utf8").catch(() => '{"icons":{}}')
)
const priorPeople = prior.people ?? []

/** The commit the public history opens with. Everything predates it. */
const rootDate = git("log", "--reverse", "--format=%cI").split("\n")[0].trim()

for (const [name, was] of Object.entries(prior.icons ?? {})) {
  const now = dates.get(name)
  if (!now) continue

  if (was.added && was.added < now.added) now.added = was.added

  // Only a commit later than the root is someone actually editing the drawing.
  if (was.updated) {
    now.updated =
      now.updated > rootDate && now.updated > was.updated
        ? now.updated
        : was.updated
  }

  for (const i of was.by ?? []) {
    const p = priorPeople[i]
    if (p) now.by.add(`${p.name}\t${p.email}`)
  }
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

/**
 * When the current version was actually cut, from its tag.
 *
 * The Paper boards used to date themselves by the newest drawing change and
 * print it under both "Last updated" and "Released", which made the second one
 * false the moment a release was tagged a day after the last icon was touched.
 * That is exactly what happened: the last drawing changed on 19 August and
 * v0.1.0 was tagged on the 20th.
 *
 * It is resolved here rather than there because this script already reads the
 * tags, and the boards already read this file. Giving `build-paper.mjs` its own
 * git access to answer a question this one has already answered would be a
 * second source for one fact.
 *
 * Null before the first tag, and the surfaces fall back to the drawing date,
 * which is the best available answer when nothing has been released.
 */
const cut = releases.find((r) => r.version === current) ?? releases.at(-1)

const out =
  JSON.stringify(
    {
      $comment: "GENERATED BY pipeline/build-history.mjs — DO NOT EDIT.",
      version: current,
      released: releases.length > 0,
      releasedAt: cut?.date ?? null,
      releasedLabel: cut ? show(cut.date) : null,
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
      c(31, "✗") +
        ` lib/icon-history.json is stale — run \`npm run history:build\``
    )
    process.exit(1)
  }
  console.log(
    c(32, "✓") +
      ` lib/icon-history.json up to date (${Object.keys(icons).length} icons)`
  )
} else {
  await writeFile(OUT, out)
  console.log(
    c(32, "✓") +
      ` lib/icon-history.json — ${Object.keys(icons).length} icons, ` +
      `${releases.length} release${releases.length === 1 ? "" : "s"}, current ${current}`
  )
}
