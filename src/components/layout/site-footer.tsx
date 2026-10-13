import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link'
import { Container } from '@/components/ui/layout'

/**
 * Site footer — NAP, service links (in the required order), company links,
 * legal links, newsletter teaser (full form ships in M5), LinkedIn.
 */

const SERVICES = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'Recruitment Process Outsourcing', href: '/services/recruitment-process-outsourcing' },
  { label: 'Virtual Assistance', href: '/services/virtual-assistance' },
  { label: 'Accounting Outsourcing', href: '/services/accounting-outsourcing' },
  { label: 'Legal Process Outsourcing', href: '/services/legal-process-outsourcing' },
]

const COMPANY = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'SMS Terms', href: '/sms-terms' },
]

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs font-medium tracking-[0.25em] text-mist-400 uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-paper-50 text-[15px] text-mist-400 transition-colors duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-line-dark bg-ink-950 border-t" data-surface="dark">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-paper-50 text-2xl font-bold">
              Akrostech
              <span aria-hidden="true" className="text-indigo-glow">
                .
              </span>
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-mist-400">
              Your team, across every hour. Dedicated offshore professionals and a web studio,
              working your U.S. hours.
            </p>
            <address className="mt-6 text-[15px] leading-relaxed text-mist-400 not-italic">
              Akrostech Consulting LLC
              <br />
              1207 Delaware Ave, Unit 2877
              <br />
              Wilmington, DE 19806, USA
              <br />
              <a
                href="tel:+13322870846"
                className="hover:text-paper-50 mt-2 inline-block transition-colors"
              >
                +1 (332) 287-0846
              </a>
            </address>
            <a
              href="https://www.linkedin.com/company/akrostech-consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper-50 mt-6 inline-flex items-center gap-2 text-mist-400 transition-colors"
              aria-label="Akrostech Consulting on LinkedIn (opens in a new tab)"
            >
              <LinkedinLogo aria-hidden="true" weight="duotone" className="size-6" />
              <span className="text-[15px]">LinkedIn</span>
            </a>
          </div>
          <LinkList title="Services" links={SERVICES} />
          <LinkList title="Company" links={COMPANY} />
          <LinkList title="Legal" links={LEGAL} />
        </div>
        <div className="border-line-dark flex flex-col items-start justify-between gap-3 border-t py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-mist-400">
            © 2026 Akrostech Consulting LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <CookieSettingsLink />
            <p className="font-mono text-xs tracking-[0.2em] text-mist-400 uppercase">
              Wilmington · India
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
