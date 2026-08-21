#!/usr/bin/env node
/**
 * Verify each package's `VERSION` constant matches its own package.json.
 *
 *   node pipeline/check-versions.mjs
 *
 * The MCP server and the CLI each hardcode their version in the source, and
 * both report it: `serverInfo.version` in the initialize response, `--version`
 * and the help header in the CLI. npm reads package.json and never looks at the
 * constant, so the two drift silently and npm publishes the mismatch happily.
 *
 * 0.1.1 shipped that way. Both package.json files said 0.1.1 and both binaries
 * introduced themselves as 0.1.0, because the release bumped the manifests and
 * not the constants. Nothing broke, which is the problem: the only symptom is a
 * wrong answer to "what version are you on", months later, from someone
 * reporting a bug.
 */

import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const PACKAGES = ["mcp", "cli"]

const c = (n, s) => `\x1b[${n}m${s}\x1b[0m`

const problems = []
for (const name of PACKAGES) {
  const manifest = JSON.parse(
    await readFile(join(ROOT, "packages", name, "package.json"), "utf8")
  )
  const src = await readFile(join(ROOT, "packages", name, "src", "index.mjs"), "utf8")
  const m = src.match(/const VERSION = "([^"]+)"/)

  if (!m) {
    problems.push(`${name}: no VERSION constant in src/index.mjs`)
  } else if (m[1] !== manifest.version) {
    problems.push(
      `${name}: package.json says ${manifest.version}, src/index.mjs says ${m[1]}`
    )
  }
}

if (problems.length) {
  for (const p of problems) console.error(`  ${c(31, "MISMATCH")} ${p}`)
  console.error(`\nBump both, or the published binary reports the wrong version.`)
  process.exit(1)
}

console.log(c(32, `${PACKAGES.length} packages report the version they ship as`))
