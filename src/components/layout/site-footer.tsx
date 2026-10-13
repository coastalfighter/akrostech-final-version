import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr'
import { Parallax } from '@/components/motion/parallax'
import Link from 'next/link'
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link'
import { Container } from '@/components/ui/layout'
import { siteConfig } from '@/config/site'
import { LEGAL_NAV, NAV, SECONDARY_NAV, SERVICE_NAV } from './nav'

/**
 * Site footer — a closing invitation, link columns (services in the required
 * order), NAP, legal links, and an oversized wordmark sign-off.
 */

function LinkList({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sage text-xs font-medium tracking-[0.22em] uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-cream/75 hover:text-lime text-[15px] transition-colors duration-200"
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
  const year = new Date().getFullYear()
  return (
    <footer className="border-line bg-ink relative overflow-hidden border-t">
      <Container>
        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <address className="text-cream/75 text-[15px] leading-relaxed not-italic">
              {siteConfig.legalName}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip},{' '}
              {siteConfig.address.country}
            </address>
            <a
              href={siteConfig.phoneHref}
              className="tnum font-display hover:text-lime mt-5 block text-2xl transition-colors"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Akrostech Consulting on LinkedIn (opens in a new tab)"
              className="text-cream/75 hover:text-lime mt-6 inline-flex items-center gap-2 text-[15px] transition-colors"
            >
              <LinkedinLogo aria-hidden="true" weight="fill" className="size-5" />
              LinkedIn
            </a>
          </div>
          <LinkList title="Services" links={SERVICE_NAV} />
          <LinkList title="Company" links={[...NAV.slice(1), ...SECONDARY_NAV]} />
          <LinkList title="Legal" links={LEGAL_NAV} />
        </div>

        <div className="border-line text-fog flex flex-col items-start justify-between gap-4 border-t py-7 text-sm sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <CookieSettingsLink />
            <p className="tracking-[0.18em] uppercase">Wilmington · India</p>
          </div>
        </div>
      </Container>

      {/* Oversized sign-off. SVG text scales with the viewport and, being
          decorative, stays out of the accessibility tree and contrast checks. */}
      <Parallax speed={-0.18}>
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 200"
          className="pointer-events-none -mb-[1.5%] block w-full select-none"
        >
          <text
            x="500"
            y="172"
            textAnchor="middle"
            textLength="960"
            lengthAdjust="spacingAndGlyphs"
            className="fill-forest font-display"
            fontSize="230"
          >
            akrostech
          </text>
        </svg>
      </Parallax>
    </footer>
  )
}
