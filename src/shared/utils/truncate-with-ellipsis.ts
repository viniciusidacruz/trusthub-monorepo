export function truncateWithEllipsis(
  text: string | null | undefined,
  limit: number
): string {
  if (text == null) return "";

  const n = Number(limit);
  if (!Number.isFinite(n) || n <= 0) return "";

  const chars = Array.from(text);
  if (chars.length <= n) return text;

  return chars.slice(0, n).join("") + "...";
}
