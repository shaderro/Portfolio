/** Client-safe Notion page ID helpers (no server dependencies). */
export function normalizePageId(input: string): string {
  if (!input?.trim()) return "";
  const urlMatch = input.match(/([0-9a-f]{32})/i);
  if (urlMatch) return urlMatch[1].toLowerCase();
  return input.replace(/-/g, "").toLowerCase();
}
