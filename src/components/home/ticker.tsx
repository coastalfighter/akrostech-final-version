import { Marquee } from '@/components/brand/marquee'
import { ScrollSkew } from '@/components/motion/scroll-skew'
import { services } from '@/config/site'

/** Two counter-scrolling bands under the hero; they lean with scroll speed. */
export function Ticker() {
  return (
    <div className="relative z-10 -my-2 overflow-hidden py-2">
      <ScrollSkew>
        <Marquee
          label="Our services"
          items={services.map((s) => s.name)}
          className="bg-lime text-ink -rotate-1 py-4 md:py-5"
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
          className="border-line bg-ink-2 text-cream/80 rotate-1 border-y py-4"
          itemClassName="text-sm tracking-[0.2em] uppercase md:text-base"
        />
      </ScrollSkew>
    </div>
  )
}
