/** Long US date, e.g. "October 12, 2026". Parsed as UTC so builds are stable. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Turn a tag slug ("virtual-assistance") into a label ("Virtual assistance"). */
export function tagLabel(tag: string | undefined): string {
  if (!tag) return 'Insights'
  const words = tag.replace(/-/g, ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}
