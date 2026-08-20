/**
 * The "Did you mean" behind the browser's empty search state.
 *
 * The correction never leaves the set's own vocabulary: the candidate words
 * are the segments of the names and aliases the search already matches
 * against, so a suggestion is a word the grid can actually answer, not a
 * dictionary's idea of what the typo meant.
 */

/**
 * Optimal string alignment distance, capped.
 *
 * Levenshtein plus adjacent transposition, because swapped letters are the
 * misspelling keyboards actually produce; "clanedar" is one edit here and two
 * without it. The cap keeps the scan cheap: a row's minimum can only grow, so
 * once it passes the cap the word is dropped without finishing the table, and
 * a length gap wider than the cap never starts it.
 */
export function osaDistance(a: string, b: string, cap: number): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1
  if (a === b) return 0

  let prev2: number[] | null = null
  let prev: number[] = Array.from({ length: b.length + 1 }, (_, j) => j)

  for (let i = 1; i <= a.length; i++) {
    const row: number[] = [i]
    let rowMin = i

    for (let j = 1; j <= b.length; j++) {
      let best = Math.min(
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
        prev[j] + 1,
        row[j - 1] + 1
      )
      if (
        prev2 !== null &&
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        best = Math.min(best, prev2[j - 2] + 1)
      }
      row.push(best)
      if (best < rowMin) rowMin = best
    }

    if (rowMin > cap) return cap + 1
    prev2 = prev
    prev = row
  }

  return prev[b.length]
}

/**
 * How far a word may be corrected. Short words earn one edit, or "up" would
 * answer to half the alphabet; longer words earn the extra slips their length
 * invites.
 */
const capFor = (length: number) => (length <= 4 ? 1 : length <= 8 ? 2 : 3)

/**
 * The nearest vocabulary word within the cap, or null when nothing is close
 * enough to say with a straight face.
 *
 * Ties break to the more frequent word, then alphabetically: "mial" should
 * land on the mail that appears on twenty-five icons rather than on a rare
 * token the same distance away, and the answer should not depend on map
 * order.
 */
export function nearestWord(
  word: string,
  vocabulary: ReadonlyMap<string, number>
): string | null {
  const cap = capFor(word.length)
  let best: string | null = null
  let bestDistance = cap + 1
  let bestCount = 0

  for (const [token, count] of vocabulary) {
    const d = osaDistance(word, token, Math.min(cap, bestDistance))
    if (d > cap || d > bestDistance) continue
    const better =
      d < bestDistance ||
      count > bestCount ||
      (count === bestCount && best !== null && token < best)
    if (better) {
      best = token
      bestDistance = d
      bestCount = count
    }
  }

  return best
}
