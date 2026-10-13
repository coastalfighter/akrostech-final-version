/**
 * Canonical business facts — the only facts the site may rely on
 * (Section 2 of the build brief). Unconfirmed values stay out of here
 * and are marked {{CONFIRM}} in copy instead.
 */
export const siteConfig = {
  legalName: 'Akrostech Consulting LLC',
  brandName: 'Akrostech',
  domain: 'akrosstech.com',
  address: {
    street: '1207 Delaware Ave, Unit 2877',
    city: 'Wilmington',
    state: 'DE',
    zip: '19806',
    country: 'USA',
  },
  phone: '+1 (332) 287-0846',
  phoneHref: 'tel:+13322870846',
  primaryContact: {
    name: 'Jennifer',
    role: 'sales',
  },
  linkedin: 'https://www.linkedin.com/company/akrostech-consulting',
  deliveryModel: 'India-based professionals, aligned to EST, CST, MST and PST',
} as const

/**
 * The five services in the exact required order. This order is used for
 * navigation, footer, the services index, the home page, and schema markup.
 */
export const services = [
  { slug: 'website-development', name: 'Website Development' },
  { slug: 'recruitment-process-outsourcing', name: 'Recruitment Process Outsourcing' },
  { slug: 'virtual-assistance', name: 'Virtual Assistance' },
  { slug: 'accounting-outsourcing', name: 'Accounting Outsourcing' },
  { slug: 'legal-process-outsourcing', name: 'Legal Process Outsourcing' },
] as const

export type ServiceSlug = (typeof services)[number]['slug']
