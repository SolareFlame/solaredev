/** Links leaving the site open in a new tab. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

export function externalLinkAttrs(href: string): { target?: string; rel?: string } {
  return isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
