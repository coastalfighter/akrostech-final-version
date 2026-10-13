import { services } from '@/config/site'

/** Primary navigation — shown in the top bar and the full-screen menu. */
export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
] as const

export const SECONDARY_NAV = [
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const SERVICE_NAV = services.map((s) => ({
  label: s.name,
  href: `/services/${s.slug}`,
}))

export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'SMS Terms', href: '/sms-terms' },
] as const
