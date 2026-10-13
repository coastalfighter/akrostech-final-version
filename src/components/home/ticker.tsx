import { Marquee } from '@/components/brand/marquee'
import { services } from '@/config/site'

/** Two counter-scrolling bands under the hero: what we do, how we do it. */
export function Ticker() {
  return (
    <div className="relative z-10 -mt-px">
      <Marquee
        label="Our services"
        items={services.map((s) => s.name)}
        className="bg-lime text-ink py-4 md:py-5"
        itemClassName="font-display text-2xl tracking-[-0.02em] md:text-4xl"
      />
      <Marquee
        reverse
        label="How we work"
        items={[
          'Dedicated, never shared',
          'Your U.S. hours',
          'Vetted three ways',
          'Secure by default',
          'Measured on quality',
          'Fixed quotes in writing',
        ]}
        className="border-line bg-ink-2 text-cream/80 border-y py-4"
        itemClassName="text-sm tracking-[0.2em] uppercase md:text-base"
      />
    </div>
  )
}
