import Link from 'next/link'
import { Arcs } from '@/components/brand/arcs'
import { RoundCta } from '@/components/brand/round-cta'
import { Magnetic } from '@/components/motion/magnetic'
import { Parallax } from '@/components/motion/parallax'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'
import { cn } from '@/lib/utils'

/**
 * CtaBand — the forest-green closing band on every page. Copy and actions
 * sit on the left; the rising arcs are anchored to the bottom-right corner
 * and rise as the band scrolls in, with the magnetic round CTA on top — so
 * the art never sits behind the buttons.
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
      className={cn('bg-forest-deep relative isolate overflow-hidden py-24 md:py-36', className)}
    >
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <Parallax
        speed={-0.25}
        className="absolute right-[-30%] bottom-0 -z-10 h-[60%] w-[110%] opacity-50 sm:right-[-15%] sm:w-[80%] lg:right-[-8%] lg:h-[85%] lg:w-[58%] lg:opacity-100"
      >
        <Arcs className="h-full w-full" />
      </Parallax>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sage text-xs font-medium tracking-[0.22em] uppercase">{eyebrow}</p>
            <h2 className="reveal font-display mt-6 max-w-4xl text-5xl leading-[0.98] tracking-[-0.035em] text-balance md:text-7xl xl:text-8xl">
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
          <Magnetic className="hidden justify-self-center lg:block" strength={18}>
            <RoundCta
              href={primary.href}
              label="Let’s talk — book a 30-minute call"
              ring="Let's talk · Let's talk · Let's talk · "
            />
          </Magnetic>
        </div>
      </Container>
    </section>
  )
}
