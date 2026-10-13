import Link from 'next/link'
import { Marquee } from '@/components/brand/marquee'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { PageHero } from '@/components/sections/page-hero'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/components/seo/json-ld'
import { SERVICE_ICONS } from '@/components/services/service-icons'
import { Button } from '@/components/ui/button'
import { LinkCard } from '@/components/ui/card'
import { Container, GridFill, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, SectionHeader } from '@/components/ui/typography'
import { services, type ServiceData } from '@/data/services'
import { env } from '@/lib/env'

/**
 * ServiceTemplate — one layout for all five service pages, fed by the CMS:
 * hero → answer-first intro → before/after → what's included → process →
 * engagement models → tools band → extras → FAQ → related → CTA.
 */

export function ServiceTemplate({ service }: { service: ServiceData }) {
  const index = services.findIndex((s) => s.slug === service.slug)
  const related = services.filter((s) => s.slug !== service.slug)
  const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')

  return (
    <main>
      <JsonLd
        data={[
          serviceJsonLd({
            siteUrl,
            slug: service.slug,
            name: service.name,
            description: service.excerpt,
          }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd(siteUrl, [
            { label: 'Services', href: '/services' },
            { label: service.name },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Service ${String(index + 1).padStart(2, '0')} — ${service.name}`}
        title={service.heroTitle}
        lead={service.heroLead}
        word={service.shortName}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/book">Book a 30-min call</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </PageHero>

      {/* Answer-first intro */}
      <Section tone="forest" padding="compact">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <span className="bg-lime text-ink flex size-16 items-center justify-center rounded-full [&_svg]:size-7">
              {SERVICE_ICONS[service.accent]}
            </span>
            <p className="reveal font-display max-w-5xl text-2xl leading-[1.3] tracking-[-0.015em] text-balance md:text-4xl">
              {service.intro}
            </p>
          </div>
        </Container>
      </Section>

      {/* Before → after */}
      <Section tone="ink">
        <Container>
          <SectionHeader
            eyebrow="The problems we solve"
            index="01"
            title={
              <>
                From <span className="accent">this</span>, to <span className="accent">that.</span>
              </>
            }
          />
          <div className="mt-16 space-y-5">
            {service.problems.map((p, i) => (
              <div
                key={i}
                className="border-line grid overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-2"
              >
                <div className="bg-ink-2 p-7 md:p-10">
                  <p className="text-fog text-xs tracking-[0.22em] uppercase">Before</p>
                  <p className="text-fog mt-4 text-lg leading-relaxed">{p.before}</p>
                </div>
                <div className="bg-forest-deep p-7 md:p-10">
                  <p className="text-lime text-xs tracking-[0.22em] uppercase">After</p>
                  <p className="text-cream mt-4 text-lg leading-relaxed">{p.after}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What's included */}
      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="What's included"
            index="02"
            title={
              <>
                Everything you need, <span className="accent">nothing you don&rsquo;t.</span>
              </>
            }
          />
          <ul className="border-line bg-line mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <li key={c.title} className="bg-ink-2 p-8 md:p-10">
                <span className="tnum text-sage text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display mt-8 text-2xl tracking-[-0.015em]">{c.title}</h3>
                <p className="text-fog mt-3 leading-relaxed">{c.body}</p>
              </li>
            ))}
            <GridFill count={service.capabilities.length} className="bg-ink-2" />
          </ul>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="ink">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            index="03"
            title={
              <>
                From first call <span className="accent">to fully ramped.</span>
              </>
            }
          />
          <ol className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {service.process.map((step, i) => (
              <li key={step.title}>
                <span
                  aria-hidden="true"
                  className="text-outline tnum font-display block text-[6.5rem] leading-[0.8] tracking-[-0.05em]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display mt-6 text-2xl tracking-[-0.015em]">
                  <span className="sr-only">{`Step ${i + 1}:`}</span> {step.title}
                </h3>
                <p className="text-fog mt-3 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement models */}
      <Section tone="raised">
        <Container>
          <SectionHeader
            eyebrow="Ways to work together"
            index="04"
            title={
              <>
                Pick the shape <span className="accent">that fits.</span>
              </>
            }
          />
          <div
            className={
              service.models.length === 2
                ? 'mt-16 grid gap-5 md:grid-cols-2'
                : 'mt-16 grid gap-5 md:grid-cols-3'
            }
          >
            {service.models.map((m, i) => (
              <div
                key={m.title}
                className={
                  i === 0
                    ? 'bg-lime text-ink rounded-[var(--radius-card)] p-8 md:p-10'
                    : 'border-line bg-ink rounded-[var(--radius-card)] border p-8 md:p-10'
                }
              >
                <h3 className="font-display text-3xl tracking-[-0.02em]">{m.title}</h3>
                <p
                  className={
                    i === 0 ? 'text-ink/75 mt-4 leading-relaxed' : 'text-fog mt-4 leading-relaxed'
                  }
                >
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tools */}
      <section aria-labelledby="tools-heading" className="border-line bg-ink border-y py-14">
        <Container>
          <Eyebrow id="tools-heading">{service.toolsTitle}</Eyebrow>
        </Container>
        <Marquee
          label={service.toolsTitle}
          items={service.tools}
          className="mt-8"
          itemClassName="font-display text-3xl tracking-[-0.02em] text-cream/80 md:text-5xl"
        />
      </section>

      {/* Extras (security, practice areas, …) */}
      {service.extra && service.extra.length > 0 && (
        <Section tone="ink" padding="compact">
          <Container>
            <div className="grid gap-5 lg:grid-cols-2">
              {service.extra.map((section) => (
                <div
                  key={section.title}
                  className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-8 md:p-10"
                >
                  <Heading as="h3">{section.title}</Heading>
                  <p className="text-fog mt-4 text-lg leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section tone="raised">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeader
                eyebrow="FAQ"
                index="05"
                title={
                  <>
                    {service.name} questions, <span className="accent">answered.</span>
                  </>
                }
                lead="Straight answers. If yours isn’t here, ask us on the call."
              />
            </div>
            <FaqAccordion items={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* Related */}
      <Section tone="ink">
        <Container>
          <SectionHeader
            eyebrow="Keep exploring"
            title={
              <>
                The rest of <span className="accent">the studio.</span>
              </>
            }
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <LinkCard
                key={s.slug}
                href={`/services/${s.slug}`}
                eyebrow={s.shortName}
                title={s.name}
                description={s.tagline}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Let&rsquo;s talk about your <span className="accent">{service.name.toLowerCase()}</span>{' '}
            needs.
          </>
        }
        body="Thirty minutes, no commitment. Tell us what hurts most — we’ll tell you honestly whether we’re the right fix."
      />
    </main>
  )
}
