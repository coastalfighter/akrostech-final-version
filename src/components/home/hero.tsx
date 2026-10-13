import Link from 'next/link'
import { Arcs } from '@/components/brand/arcs'
import { Button } from '@/components/ui/button'
import { LiveClock } from './live-clock'

/**
 * Home hero — full-height forest field, an oversized serif headline, the
 * live Wilmington/India clock, and the rising-arcs horizon.
 */
export function Hero() {
  return (
    <section className="bg-forest-deep relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-32 pb-14 md:pt-40">
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-60"
      />
      <Arcs className="absolute -bottom-10 left-1/2 -z-10 h-[52vh] w-[140vw] max-w-none -translate-x-1/2 opacity-90 md:w-[110vw]" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 md:px-10">
        <p className="intro text-sage flex flex-wrap items-center gap-x-4 gap-y-2 text-xs tracking-[0.22em] uppercase">
          <span className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="bg-lime size-1.5 rounded-full" />
            Offshore staffing &amp; web studio
          </span>
          <span aria-hidden="true" className="text-cream/30 hidden sm:inline">
            /
          </span>
          <span>Wilmington, DE · Teams in India</span>
        </p>

        <h1 className="display-xl intro intro-1 mt-10 max-w-[12ch] md:mt-14">
          Your team, <span className="accent">on your</span> clock.
        </h1>

        <div className="mt-auto grid items-end gap-10 pt-16 lg:grid-cols-[1.2fr_auto_auto]">
          <p className="intro intro-2 text-cream/85 max-w-[46ch] text-lg leading-relaxed md:text-xl">
            Dedicated recruiters, assistants, bookkeepers and paralegals in India — plus a web
            studio that ships. They work your U.S. hours, inside your tools, and answer to your
            standards.
          </p>
          <div className="intro intro-3 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/book">Book a 30-min call</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Explore services</Link>
            </Button>
          </div>
          <div className="intro intro-4 w-full lg:w-[300px]">
            <LiveClock />
          </div>
        </div>
      </div>
    </section>
  )
}
