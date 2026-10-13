import { describe, expect, it } from 'vitest'
import { services, siteConfig } from '@/config/site'

describe('siteConfig', () => {
  it('uses the exact legal and brand names', () => {
    expect(siteConfig.legalName).toBe('Akrostech Consulting LLC')
    expect(siteConfig.brandName).toBe('Akrostech')
    expect(siteConfig.domain).toBe('akrosstech.com')
  })

  it('exposes a callable phone link', () => {
    expect(siteConfig.phoneHref).toBe('tel:+13322870846')
    expect(siteConfig.phone).toContain('(332) 287-0846')
  })

  it('points at the company LinkedIn page', () => {
    expect(siteConfig.linkedin).toBe('https://www.linkedin.com/company/akrostech-consulting')
  })
})

describe('services', () => {
  it('lists the five services in the exact required order', () => {
    expect(services.map((service) => service.slug)).toEqual([
      'website-development',
      'recruitment-process-outsourcing',
      'virtual-assistance',
      'accounting-outsourcing',
      'legal-process-outsourcing',
    ])
    expect(services.map((service) => service.name)).toEqual([
      'Website Development',
      'Recruitment Process Outsourcing',
      'Virtual Assistance',
      'Accounting Outsourcing',
      'Legal Process Outsourcing',
    ])
  })
})
