/** Tiny className joiner, keeps conditional classes readable without a dep. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
