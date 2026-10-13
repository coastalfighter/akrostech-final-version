import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { PageHero } from '@/components/sections/page-hero'
import { CtaBand } from '@/components/sections/cta-band'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/components/seo/json-ld'
import { SERVICE_ICONS } from '@/components/services/service-icons'
import { ServiceCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'
import { services, type ServiceData } from '@/data/services'
import { env } from '@/lib/env'

/**
 * ServiceTemplate — renders one service page from the M4 data module.
 * M5 swaps the data source to Velite; the template stays.
 */

function TwoCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Section surface="light" padding="compact">
      <Container>
        <Eyebrow>{title}</Eyebrow>
        <div className="mt-8">{children}</div>
      </Container>
    </Section>
  )
}

export function ServiceTemplate({ service }: { service: ServiceData }) {
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
        eyebrow={service.name}
        title={service.heroTitle}
        lead={service.heroLead}
        accent={service.accent}
        crumbs={[{ label: 'Services', href: '/services' }, { label: service.name }]}
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="/book"
            className="bg-akros-indigo inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold text-white transition-colors hover:bg-[#4a4de0]"
          >
            Book a 30-min call <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="/pricing"
            className="border-line-dark text-paper-50 hover:border-indigo-glow inline-flex min-h-[48px] items-center justify-center rounded-full border px-7 text-base font-semibold transition-colors"
          >
            See pricing
          </Link>
        </div>
      </PageHero>

      {/* Answer-first intro */}
      <Section surface="light">
        <Container>
          <p className="text-graphite-900 max-w-[68ch] text-xl leading-relaxed md:text-2xl">
            {service.intro}
          </p>
        </Container>
      </Section>

      {/* Problems → outcomes */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>The problems we solve</Eyebrow>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {service.problems.map((p, i) => (
              <div key={i} className="border-line-dark bg-ink-800 rounded-[20px] border p-6 md:p-8">
                <p className="font-mono text-xs tracking-[0.25em] text-mist-400 uppercase">
                  Before
                </p>
                <p className="mt-2 leading-relaxed text-mist-400">{p.before}</p>
                <div aria-hidden="true" className="meridian-line my-5" />
                <p className="text-aurora-teal font-mono text-xs tracking-[0.25em] uppercase">
                  After
                </p>
                <p className="text-paper-50 mt-2 leading-relaxed">{p.after}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What's included */}
      <TwoCol title="What's included">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((c) => (
            <div
              key={c.title}
              className="border-graphite-900/10 rounded-[20px] border bg-white p-6"
            >
              <h3 className="font-display text-graphite-900 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>
      </TwoCol>

      {/* How it works */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <Heading as="h2" className="mt-4">
            From first call to fully ramped
          </Heading>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="border-line-dark bg-ink-800 rounded-[20px] border p-6"
              >
                <p className="tnum font-display text-indigo-glow text-4xl font-bold">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-paper-50 mt-4 text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-mist-400">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement models */}
      <TwoCol title="Ways to work together">
        <div className="grid gap-4 md:grid-cols-3">
          {service.models.map((m) => (
            <div
              key={m.title}
              className="border-graphite-900/10 rounded-[20px] border bg-white p-6"
            >
              <h3 className="font-display text-graphite-900 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{m.body}</p>
            </div>
          ))}
        </div>
      </TwoCol>

      {/* Tools */}
      <Section surface="light" padding="compact">
        <Container>
          <Eyebrow>{service.toolsTitle}</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-3">
            {service.tools.map((tool) => (
              <li
                key={tool}
                className="border-graphite-900/15 text-graphite-900 rounded-full border px-5 py-2.5 text-[15px] font-medium"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Extra sections (security, practice areas, etc.) */}
      {service.extra?.map((section) => (
        <Section key={section.title} surface="dark" padding="compact">
          <Container>
            <Eyebrow>{section.title}</Eyebrow>
            <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-mist-400">
              {section.body}
            </p>
          </Container>
        </Section>
      ))}

      {/* FAQ */}
      <Section surface="light">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <Heading as="h2" className="mt-4">
                {service.shortName} questions, answered
              </Heading>
              <Lead className="mt-4">
                Straight answers. If yours isn&apos;t here, ask us on the call.
              </Lead>
            </div>
            <FaqAccordion
              items={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
            />
          </div>
        </Container>
      </Section>

      {/* Related services */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Keep exploring</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <ServiceCard
                key={s.slug}
                accent={s.accent}
                icon={SERVICE_ICONS[s.accent]}
                title={s.name}
                description={s.excerpt}
                href={`/services/${s.slug}`}
              />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Let\u2019s talk about your ${service.shortName.toLowerCase()} needs`}
        body="A 30-minute call. No commitment. Tell us what hurts most — we\u2019ll tell you honestly whether we\u2019re the right fix."
      />
    </main>
  )
}
