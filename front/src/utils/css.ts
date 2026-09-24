/**
 * Quoted CSS `url()`: Vite inlines small assets as data URIs whose content
 * (spaces, parentheses…) would break an unquoted `url(...)`.
 */
export function cssUrl(url: string): string {
  return `url(${JSON.stringify(url)})`
}
