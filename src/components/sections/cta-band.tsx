import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Heading } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * CTA band — the Meridian band closing every page. Headline, supporting
 * line, and the two conversion actions.
 */

export function CtaBand({
  title,
  body,
  primary = { label: 'Book a 30-min call', href: '/book' },
  secondary = { label: 'Explore services', href: '/services' },
  className,
}: {
  title: React.ReactNode
  body?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  className?: string
}) {
  return (
    <Section surface="dark" padding="roomy" className={cn('relative overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{ background: 'var(--meridian-gradient)' }}
      />
      <Container className="relative">
        <p className="text-paper-50/80 font-mono text-xs font-medium tracking-[0.25em] uppercase">
          Ready when you are
        </p>
        <Heading as="h2" className="mt-4 max-w-4xl">
          {title}
        </Heading>
        {body && (
          <p className="text-paper-50/80 mt-4 max-w-[62ch] text-lg leading-relaxed">{body}</p>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
