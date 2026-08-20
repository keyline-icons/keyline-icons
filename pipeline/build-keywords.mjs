// Bake the Figma component-set descriptions into lib/icon-keywords.json.
//
//   node pipeline/build-keywords.mjs --emit          # print the snippet to run in Figma
//   node pipeline/build-keywords.mjs dump.txt        # ingest Figma's answer
//   node pipeline/build-keywords.mjs < dump.txt      # same, from stdin
//   node pipeline/build-keywords.mjs --check         # fail if the committed file is stale
//
// The search field only ever matched the file name, so `arrow-down` was
// unreachable by "south", "descend" or "sort descending" — the words someone
// who does not already know the set would type. Those words exist: every
// component set in Figma carries them in its description, comma separated, and
// that description is the one place they are curated. This bakes them out so
// the site can search them.
//
// Like pipeline/check-figma.mjs, this cannot reach Figma on its own: there is
// no API token in this repo and the design file is not in the build. So it runs
// in two steps — `--emit` prints a snippet you run through the Figma plugin API,
// and that snippet's output comes back here. Which also keeps it out of CI,
// which has no Figma.
//
// Keywords are attached to the BASE name, not to every variant. One set in
// Figma covers all three containers, so `square-arrow-down` and
// `circle-arrow-down` read their words off `arrow-down` — see `lib/icons.ts`.

import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const OUT = join(ROOT, "lib", "icon-keywords.json")

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

/**
 * The snippet to run through the Figma plugin API. One line per component set,
 * `name<TAB>description`.
 *
 * Tab separated rather than `=` separated, because a description is prose
 * someone typed and may hold any punctuation, while a layer name may not hold a
 * tab. Whitespace inside a description is flattened for the same reason: a
 * newline in there would arrive here as an extra row.
 *
 * RESUMING
 *
 * The plugin bridge truncates a long return value and the whole set does not
 * fit in one, so the snippet stops before the limit rather than being cut at
 * it, and says where to pick up: the last line comes back as `#NEXT=<name>`,
 * which goes into `AFTER` for the next run. Append each run to the same file.
 *
 * That marker is load-bearing. A truncated dump looks exactly like a file where
 * half the icons have no description, and the result would be a quietly
 * half-searchable set — so a dump whose last line is still a `#NEXT=` is
 * refused below rather than ingested.
 */
const SNIPPET = `// Leave AFTER empty for the first run. Each run ends with #NEXT=<name>; put
// that name here and run again, until no #NEXT comes back.
const AFTER = "";
const BUDGET = 16000;

const p = figma.root.children.find(x => x.name === "Components");
await p.loadAsync();
const sets = p.children.filter((n) => n.type === "COMPONENT_SET")
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
const rows = [];
let size = 0, next = null;
for (const s of sets) {
  if (AFTER && s.name <= AFTER) continue;
  const row = s.name + "\\t" + (s.description || "").replace(/\\s+/g, " ").trim();
  // Always emit at least one row, or a single oversized description stalls forever.
  if (rows.length && size + row.length + 1 > BUDGET) { next = rows[rows.length - 1].split("\\t")[0]; break; }
  rows.push(row); size += row.length + 1;
}
return rows.join("\\n") + (next ? "\\n#NEXT=" + next : "");`

if (process.argv.includes("--emit")) {
  console.log(SNIPPET)
  process.exit(0)
}

const check = process.argv.includes("--check")
const file = process.argv.slice(2).find((a) => !a.startsWith("--"))

const readStdin = async () => {
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  return Buffer.concat(chunks).toString("utf8")
}

/**
 * The base names the set actually has, by the same rule `lib/icons.ts` uses: a
 * `square-`/`circle-` prefix is only a container when the thing it wraps exists,
 * so `circle-half` is its own base and `circle-arrow-down` is not.
 */
async function bases() {
  const names = new Set(
    (await readdir(join(ROOT, "icons", "stroke")))
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.slice(0, -4))
  )
  const out = new Set()
  for (const name of names) {
    const m = /^(square|circle)-(.+)$/.exec(name)
    out.add(m && names.has(m[2]) ? m[2] : name)
  }
  return out
}

const dump = (file ? await readFile(file, "utf8") : await readStdin()).trim()

if (!dump) {
  console.error(
    c(31, "✗") +
      " nothing to read. Run with --emit, paste the snippet into Figma, and" +
      " feed its output back:\n    node pipeline/build-keywords.mjs dump.txt"
  )
  process.exit(1)
}

const lines = dump.split("\n").map((l) => l.trim()).filter(Boolean)

if (lines.at(-1).startsWith("#NEXT=")) {
  console.error(
    c(31, "✗") +
      ` the dump ends at \`${lines.at(-1)}\` — Figma had more to say.` +
      "\n   Put that name in the snippet's AFTER, run it again, and append the" +
      " output to the same file."
  )
  process.exit(1)
}

const known = await bases()
const keywords = {}
const unknown = []

for (const line of lines) {
  // A `#NEXT=` that is not the last line is where one run met the next.
  if (line.startsWith("#NEXT=")) continue

  const at = line.indexOf("\t")
  const name = at === -1 ? line : line.slice(0, at)
  const description = at === -1 ? "" : line.slice(at + 1)

  if (!known.has(name)) {
    unknown.push(name)
    continue
  }

  // The description is a comma-separated list of the words someone would search
  // by. Case and spacing are the writer's; neither is worth carrying, and the
  // site matches lowercased.
  const terms = [
    ...new Set(
      description
        .toLowerCase()
        .split(",")
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter(Boolean)
    ),
  ]

  if (terms.length) keywords[name] = terms
}

const sorted = Object.fromEntries(
  Object.entries(keywords).sort(([a], [b]) => a.localeCompare(b))
)

const out =
  JSON.stringify(
    {
      $comment: "GENERATED BY pipeline/build-keywords.mjs — DO NOT EDIT.",
      $source: "Figma component-set descriptions, keyed by base name.",
      keywords: sorted,
    },
    null,
    0
  ) + "\n"

const missing = [...known].filter((b) => !sorted[b]).sort()

if (check) {
  const have = await readFile(OUT, "utf8").catch(() => "")
  if (have !== out) {
    console.error(
      c(31, "✗") + " lib/icon-keywords.json is stale — re-run the Figma dump"
    )
    process.exit(1)
  }
  console.log(
    c(32, "✓") + ` lib/icon-keywords.json up to date (${Object.keys(sorted).length} icons)`
  )
} else {
  await writeFile(OUT, out)
  console.log(
    c(32, "✓") +
      ` lib/icon-keywords.json — ${Object.keys(sorted).length} of ${known.size} bases described`
  )
}

// Both of these are reported rather than fatal: a description is written by
// hand, and the set is meant to outrun it. But an icon nobody can find by
// anything except its file name is the whole reason this file exists, so the
// gap is named out loud every run instead of sitting in the JSON as an absence.
if (missing.length) {
  console.log(
    c(33, "!") +
      ` ${missing.length} with no description in Figma: ${missing.slice(0, 12).join(", ")}` +
      (missing.length > 12 ? `, +${missing.length - 12} more` : "")
  )
}

if (unknown.length) {
  console.log(
    c(33, "!") +
      ` ${unknown.length} named in Figma but not in icons/: ${unknown.slice(0, 12).join(", ")}` +
      (unknown.length > 12 ? `, +${unknown.length - 12} more` : "")
  )
}
