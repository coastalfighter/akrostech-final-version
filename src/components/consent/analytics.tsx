'use client'

import Script from 'next/script'
import * as React from 'react'
import { useConsent } from './consent-manager'
import { env } from '@/lib/env'

/**
 * Analytics — loads third-party scripts only after consent.
 *
 * - Google Analytics 4 → needs `analytics` consent
 * - Meta Pixel + LinkedIn Insight → need `marketing` consent
 * Each fires only when its measurement ID is configured. Nothing loads
 * before the visitor chooses, and rejecting keeps the site fully working.
 */

function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}

function MetaPixel({ id }: { id: string }) {
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${id}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}

function LinkedInInsight({ id }: { id: string }) {
  return (
    <Script id="linkedin-insight" strategy="afterInteractive">
      {`
        _linkedin_partner_id = "${id}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript"; b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      `}
    </Script>
  )
}

export function Analytics() {
  const { consent } = useConsent()
  const [mounted, setMounted] = React.useState(false)

  // Wait for hydration: localStorage consent is read in ConsentProvider's
  // mount effect, so scripts must not render during SSR/prerender.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || !consent) return null

  const gaId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const metaId = env.NEXT_PUBLIC_META_PIXEL_ID
  const linkedinId = env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

  return (
    <>
      {consent.analytics && gaId && <GoogleAnalytics id={gaId} />}
      {consent.marketing && metaId && <MetaPixel id={metaId} />}
      {consent.marketing && linkedinId && <LinkedInInsight id={linkedinId} />}
    </>
  )
}
