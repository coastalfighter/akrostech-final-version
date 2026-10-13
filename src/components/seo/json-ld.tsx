/**
 * JSON-LD structured data — rendered as <script type="application/ld+json">
 * in page <head> via Next.js metadata. Keeps GEO/AI-search surfaces rich.
 */

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const ORG_ID = 'https://akrosstech.com/#organization'

export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Akrostech Consulting LLC',
    url: siteUrl,
    logo: `${siteUrl}/static/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-332-287-0846',
      contactType: 'sales',
      areaServed: 'US',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1207 Delaware Ave, Unit 2877',
      addressLocality: 'Wilmington',
      addressRegion: 'DE',
      postalCode: '19806',
      addressCountry: 'US',
    },
    sameAs: ['https://www.linkedin.com/company/akrostech-consulting'],
  }
}

export function websiteJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Akrostech Consulting',
    publisher: { '@id': ORG_ID },
  }
}

export function serviceJsonLd(opts: {
  siteUrl: string
  slug: string
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${opts.siteUrl}/services/${opts.slug}#service`,
    name: opts.name,
    description: opts.description,
    url: `${opts.siteUrl}/services/${opts.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: 'US',
    serviceType: opts.name,
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleJsonLd(opts: {
  siteUrl: string
  slug: string
  title: string
  description: string
  date: string
  authorName: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: `${opts.siteUrl}/insights/${opts.slug}`,
    datePublished: opts.date,
    author: { '@type': 'Person', name: opts.authorName },
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbJsonLd(
  siteUrl: string,
  crumbs: { label: string; href?: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
    })),
  }
}
