import Link from 'next/link'
import { Arcs } from '@/components/brand/arcs'
import { RoundCta } from '@/components/brand/round-cta'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { cn } from '@/lib/utils'

/**
 * CtaBand — the forest-green closing band on every page: a big invitation,
 * a supporting line, the two conversion actions, and the spinning round CTA
 * over the rising arcs.
 */
export function CtaBand({
  eyebrow = 'Ready when you are',
  title,
  body,
  primary = { label: 'Book a 30-min call', href: '/book' },
  secondary = { label: 'Explore services', href: '/services' },
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  body?: React.ReactNode
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  className?: string
}) {
  return (
    <section
      className={cn('bg-forest-deep relative isolate overflow-hidden py-28 md:py-40', className)}
    >
      <Arcs className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-80" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <Container>
        <div className="grid items-end gap-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sage text-xs font-medium tracking-[0.22em] uppercase">{eyebrow}</p>
            <h2 className="reveal font-display mt-6 max-w-4xl text-5xl leading-[0.98] tracking-[-0.035em] text-balance md:text-8xl">
              {title}
            </h2>
            {body && (
              <p className="text-cream/80 mt-8 max-w-[52ch] text-lg leading-relaxed">{body}</p>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href={primary.href}>{primary.label}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
          <RoundCta
            href={primary.href}
            label="Let’s talk — book a 30-minute call"
            ring="Let's talk · Let's talk · Let's talk · "
            className="hidden lg:inline-flex"
          />
        </div>
      </Container>
    </section>
  )
}
