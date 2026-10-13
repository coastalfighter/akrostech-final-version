import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  Bell,
  Calculator,
  Check,
  Code,
  Copy,
  Scales,
  Users,
} from '@phosphor-icons/react/dist/ssr'
import { Button, IconButton } from '@/components/ui/button'
import { Card, FeatureCard, ServiceCard } from '@/components/ui/card'
import { Checkbox, ConsentCheckbox } from '@/components/ui/checkbox'
import { FeatureFlag } from '@/components/ui/feature-flag'
import { Field, Input, Textarea } from '@/components/ui/field'
import { Container, MeridianDivider, Section } from '@/components/ui/layout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

/**
 * Design-system styleguide — dev only.
 * Excluded from indexing (robots noindex) and from production builds
 * (renders 404 when NODE_ENV=production). Never linked from the site.
 */
export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
}

const services = [
  {
    accent: 'web' as const,
    icon: <Code weight="duotone" className="size-6" />,
    title: 'Website Development',
    description: 'Marketing sites, web apps, and stores — designed, built, and cared for.',
    href: '/services/website-development',
  },
  {
    accent: 'rpo' as const,
    icon: <Users weight="duotone" className="size-6" />,
    title: 'Recruitment Process Outsourcing',
    description: 'A dedicated recruiting engine: sourcing to offer, inside your ATS.',
    href: '/services/recruitment-process-outsourcing',
  },
  {
    accent: 'va' as const,
    icon: <Bell weight="duotone" className="size-6" />,
    title: 'Virtual Assistance',
    description: 'A VA for your inbox, calendar, customers, and admin.',
    href: '/services/virtual-assistance',
  },
  {
    accent: 'acct' as const,
    icon: <Calculator weight="duotone" className="size-6" />,
    title: 'Accounting Outsourcing',
    description: 'Bookkeeping, AP/AR, payroll, and close support alongside your CPA.',
    href: '/services/accounting-outsourcing',
  },
  {
    accent: 'legal' as const,
    icon: <Scales weight="duotone" className="size-6" />,
    title: 'Legal Process Outsourcing',
    description: 'Paralegal support for law firms, under attorney supervision.',
    href: '/services/legal-process-outsourcing',
  },
]

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`border-line-dark size-10 rounded-[12px] border ${className}`}
        aria-hidden="true"
      />
      <span>
        <span className="text-paper-50 data-[surface=light]:text-graphite-900 block font-mono text-xs">
          {name}
        </span>
        <span className="block font-mono text-xs text-mist-400">{hex}</span>
      </span>
    </div>
  )
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main>
      {/* ——— Typography (dark) ——— */}
      <Section surface="dark">
        <Container>
          <Eyebrow>Styleguide · Typography</Eyebrow>
          <Heading as="h1" className="mt-4">
            Headlines rise from a mask
          </Heading>
          <Lead className="mt-4">
            Lead paragraphs run 65–72 characters at 18px with a relaxed line height. This one
            demonstrates the answer-first block style every service page opens with.
          </Lead>
          <Heading as="h2" className="mt-12">
            Heading two demonstrates the scale
          </Heading>
          <Heading as="h3" className="mt-8">
            Heading three for subsections
          </Heading>
        </Container>
      </Section>

      <Container>
        <MeridianDivider className="my-0" />
      </Container>

      {/* ——— Buttons (dark) ——— */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Actions · Buttons</Eyebrow>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button>Book a 30-min call</Button>
            <Button variant="secondary">Explore services</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <IconButton aria-label="Copy link">
              <Copy aria-hidden="true" />
            </IconButton>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button arrow={false}>No arrow</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Container>
      </Section>

      {/* ——— Buttons (light) ——— */}
      <Section surface="light" padding="compact">
        <Container>
          <Eyebrow>Actions · Buttons on light</Eyebrow>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button>Book a 30-min call</Button>
            <Button variant="secondary">Explore services</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
        </Container>
      </Section>

      {/* ——— Cards (dark) ——— */}
      <Section surface="dark">
        <Container>
          <Eyebrow>Cards · Service cards</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
            <FeatureCard icon={<Check weight="duotone" />} title="Dedicated, not shared">
              Every professional works for one client. No shared pools, no fractional attention.
            </FeatureCard>
          </div>
          <Eyebrow className="mt-12">Cards · Base card</Eyebrow>
          <Card className="mt-6 max-w-xl">
            <p className="text-paper-50">Base card surface for custom compositions.</p>
          </Card>
        </Container>
      </Section>

      {/* ——— Cards (light) ——— */}
      <Section surface="light">
        <Container>
          <Eyebrow>Cards · On light</Eyebrow>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ServiceCard
              accent="web"
              icon={<Code weight="duotone" className="size-6" />}
              title="Website Development"
              description="Marketing sites, web apps, and stores."
              href="/services/website-development"
            />
            <FeatureCard icon={<Check weight="duotone" />} title="Measured quality">
              Reporting, KPIs, and regular reviews — not vibes.
            </FeatureCard>
          </div>
        </Container>
      </Section>

      {/* ——— Forms (dark) ——— */}
      <Section surface="dark">
        <Container>
          <Eyebrow>Forms · Dark</Eyebrow>
          <div className="mt-6 grid max-w-xl gap-6">
            <Field label="Full name" hint="As it should appear on the contract." required>
              <Input placeholder="Ada Lovelace" />
            </Field>
            <Field label="Email with error" error="Enter a valid work email.">
              <Input type="email" placeholder="you@company.com" />
            </Field>
            <Field label="Project details">
              <Textarea placeholder="Tell us what you need…" />
            </Field>
            <Field label="Service needed">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Website Development</SelectItem>
                  <SelectItem value="rpo">Recruitment Process Outsourcing</SelectItem>
                  <SelectItem value="va">Virtual Assistance</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex items-center gap-3">
              <Checkbox id="sg-check" />
              <label htmlFor="sg-check" className="text-sm text-mist-400">
                Plain checkbox with label
              </label>
            </div>
            <ConsentCheckbox label="I agree to the processing of my data per the privacy policy. (Never pre-checked.)" />
            <Button className="justify-self-start">Get my estimate</Button>
          </div>
        </Container>
      </Section>

      {/* ——— Forms (light) ——— */}
      <Section surface="light">
        <Container>
          <Eyebrow>Forms · Light</Eyebrow>
          <div className="mt-6 grid max-w-xl gap-6">
            <Field label="Full name" required>
              <Input placeholder="Ada Lovelace" />
            </Field>
            <Field label="Service needed">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Website Development</SelectItem>
                  <SelectItem value="va">Virtual Assistance</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <ConsentCheckbox label="I agree to the processing of my data per the privacy policy." />
          </div>
        </Container>
      </Section>

      {/* ——— Tokens ——— */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Tokens · Palette</Eyebrow>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Swatch name="ink-950" hex="#070B16" className="bg-ink-950" />
            <Swatch name="ink-800" hex="#111832" className="bg-ink-800" />
            <Swatch name="paper-50" hex="#F6F4EF" className="bg-paper-50" />
            <Swatch name="akros-indigo" hex="#5B5CF6" className="bg-akros-indigo" />
            <Swatch name="indigo-glow" hex="#8B8CFF" className="bg-indigo-glow" />
            <Swatch name="sunrise-amber" hex="#FFB547" className="bg-sunrise-amber" />
            <Swatch name="aurora-teal" hex="#2DD4BF" className="bg-aurora-teal" />
            <Swatch name="signal-coral" hex="#FF6B5B" className="bg-signal-coral" />
          </div>
          <Eyebrow className="mt-10">Tokens · Motion</Eyebrow>
          <p className="mt-4 font-mono text-sm text-mist-400">
            ease-out-expo · ease-in-out-quart · spring-soft (260/30) · 150 / 400 / 900ms · stagger
            60ms
          </p>
        </Container>
      </Section>

      {/* ——— Feature flags ——— */}
      <Section surface="dark" padding="compact">
        <Container>
          <Eyebrow>Utility · Feature flags</Eyebrow>
          <p className="mt-4 text-mist-400">
            Testimonials block (flag off by default — nothing renders below this line):
          </p>
          <FeatureFlag name="testimonials">
            <Card className="mt-4">
              <p className="text-paper-50">This would be a testimonial.</p>
            </Card>
          </FeatureFlag>
          <p className="mt-4 font-mono text-xs text-mist-400">(end of flagged region)</p>
        </Container>
      </Section>
    </main>
  )
}
