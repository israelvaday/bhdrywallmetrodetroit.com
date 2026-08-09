/**
 * Build a meta description that ends where a human would end it.
 *
 * Service copy is written for the page body and runs 185-595 characters, so a
 * blind `.slice(0, 160)` shipped snippets cut mid-word ("...across Wayne, O").
 * Prefer the last complete sentence that still fills the snippet; otherwise cut
 * on a word boundary and mark the truncation.
 */
const MAX_LENGTH = 160;

/** Below this a sentence-only cut wastes too much of the snippet, so use a word cut instead. */
const MIN_SENTENCE_LENGTH = 110;

export function metaDescription(text: string, max: number = MAX_LENGTH): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  // +1 so a terminator sitting at the budget edge is still visible with its following character.
  const window = clean.slice(0, max + 1);

  let sentenceEnd = -1;
  const terminator = /[.?!](?=\s|$)/g;
  let match: RegExpExecArray | null;
  while ((match = terminator.exec(window)) !== null) {
    if (match.index < max) sentenceEnd = match.index;
  }
  if (sentenceEnd >= MIN_SENTENCE_LENGTH) return window.slice(0, sentenceEnd + 1);

  const wordEnd = window.slice(0, max).lastIndexOf(" ");
  const body = wordEnd > 0 ? window.slice(0, wordEnd) : window.slice(0, max);
  return `${body.replace(/[\s,;:.\-–—]+$/, "")}…`;
}
