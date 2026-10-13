import { describe, expect, it } from 'vitest'
import { isSpamPath, resolveRedirect, REDIRECTS } from '@/config/redirects'

describe('isSpamPath', () => {
  it('410s casino spam patterns', () => {
    expect(isSpamPath('/casino-royale-bonus')).toBe(true)
    expect(isSpamPath('/best-slot-gacor-2026')).toBe(true)
    expect(isSpamPath('/togel-online')).toBe(true)
    expect(isSpamPath('/wp-admin')).toBe(true)
    expect(isSpamPath('/shell.php')).toBe(true)
  })

  it('does not match real routes', () => {
    expect(isSpamPath('/')).toBe(false)
    expect(isSpamPath('/services')).toBe(false)
    expect(isSpamPath('/services/legal-process-outsourcing')).toBe(false)
    expect(isSpamPath('/contact')).toBe(false)
    expect(isSpamPath('/insights/cost-hire-virtual-assistant-india')).toBe(false)
  })
})

describe('resolveRedirect', () => {
  it('resolves exact legacy paths', () => {
    expect(resolveRedirect('/contact-us')).toBe('/contact')
    expect(resolveRedirect('/home')).toBe('/')
  })

  it('resolves slug patterns', () => {
    expect(resolveRedirect('/blog/some-post')).toBe('/insights/some-post')
  })

  it('returns undefined for unknown paths', () => {
    expect(resolveRedirect('/definitely-not-a-page')).toBeUndefined()
    expect(resolveRedirect('/services')).toBeUndefined()
  })

  it('every redirect target is a real route', () => {
    const known = new Set([
      '/', '/services', '/how-it-works', '/pricing', '/industries',
      '/about', '/careers', '/insights', '/faq', '/contact', '/book',
    ])
    for (const r of REDIRECTS) {
      const target = r.to.includes(':slug') ? r.to.split(':slug')[0]! : r.to
      // Slug targets resolve under a known parent.
      const parent = target.replace(/\/$/, '') || '/'
      expect(
        known.has(parent) || [...known].some((k) => parent.startsWith(k + '/')),
        `${r.from} → ${r.to}`,
      ).toBe(true)
    }
  })
})
