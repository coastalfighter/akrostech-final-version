import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * Social proof components — TestimonialCard, LogoWall, CaseStudyCard.
 *
 * FLAGGED: the brief forbids inventing testimonials, client logos, or
 * case-study outcomes. These components ship so the design is ready, but
 * nothing renders them until the client supplies real, approved proof.
 * No placeholder quotes. No lorem ipsum. Empty states stay empty.
 */

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card>
      <blockquote className="text-cream text-lg leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer className="mt-6">
        <p className="text-cream font-medium">{testimonial.name}</p>
        <p className="text-fog text-sm">
          {testimonial.role}, {testimonial.company}
        </p>
      </footer>
    </Card>
  )
}

export function LogoWall({ logos }: { logos: { name: string; src: string }[] }) {
  if (logos.length === 0) return null
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {logos.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          className="h-8 w-auto opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
        />
      ))}
    </div>
  )
}

export interface CaseStudy {
  title: string
  industry: string
  challenge: string
  outcome: string
  href: string
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className={cn('flex flex-col')}>
      <p className="text-sage text-xs tracking-[0.25em] uppercase">{study.industry}</p>
      <h3 className="font-display text-cream mt-3 text-xl">{study.title}</h3>
      <p className="text-fog mt-2">{study.challenge}</p>
      <p className="text-cream mt-4 flex-1 font-medium">{study.outcome}</p>
      <a
        href={study.href}
        className="text-lime hover:text-cream mt-6 text-[15px] font-medium transition-colors"
      >
        Read the case study
      </a>
    </Card>
  )
}
