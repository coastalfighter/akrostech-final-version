import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fontVariables } from './fonts'
import { Analytics } from '@/components/consent/analytics'
import { ConsentBanner } from '@/components/consent/consent-banner'
import { ConsentProvider } from '@/components/consent/consent-manager'
import { SiteChrome } from '@/components/layout/site-chrome'
import { SiteFooter } from '@/components/layout/site-footer'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/components/seo/json-ld'
import { MotionProvider } from '@/components/providers/motion-provider'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { env } from '@/lib/env'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${siteConfig.brandName} — Offshore Teams That Work Your Hours`,
    template: `%s · ${siteConfig.brandName}`,
  },
  description:
    'Akrostech Consulting LLC gives U.S. businesses dedicated offshore professionals and digital delivery teams based in India, working during U.S. business hours.',
  robots: env.NEXT_PUBLIC_ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#0A0B0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  return (
    <html lang="en-US" className={cn(fontVariables, 'font-sans')}>
      <body>
        <JsonLd data={[organizationJsonLd(siteUrl), websiteJsonLd(siteUrl)]} />
        <MotionProvider>
          <ConsentProvider>
            <SmoothScroll>
              <SiteChrome />
              <div className="lg:pl-[88px]">
                <div id="main" tabIndex={-1} className="outline-none">
                  {children}
                </div>
                <SiteFooter />
              </div>
              <ConsentBanner />
              <Analytics />
            </SmoothScroll>
          </ConsentProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
