import { Moon, SunHorizon, Sun } from '@phosphor-icons/react/dist/ssr'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'

/**
 * The 24-hour handoff — three moments on one arc: you log off, the team
 * works through your night, you wake up to finished work.
 */

const MOMENTS = [
  {
    icon: SunHorizon,
    time: '6:00 PM',
    place: 'Austin',
    title: 'You log off.',
    body: 'The brief, the priorities and the open threads hand off to a team that is just starting its day.',
  },
  {
    icon: Moon,
    time: 'Overnight',
    place: 'India',
    title: 'We get it done.',
    body: 'Candidates screened. Invoices reconciled. Pages shipped. The support inbox cleared — before your alarm.',
  },
  {
    icon: Sun,
    time: '8:00 AM',
    place: 'Austin',
    title: 'You wake up ahead.',
    body: 'A morning brief waits in Slack: what shipped, what needs you, what is next. No catching up.',
  },
]

export function Handoff() {
  return (
    <Section tone="forest" className="overflow-hidden">
      <div aria-hidden="true" className="grain absolute inset-0" />
      <Container className="relative">
        <SectionHeader
          eyebrow="The 24-hour handoff"
          index="02"
          title={
            <>
              Your day ends. <span className="accent">Ours begins.</span>
            </>
          }
          lead="Real-time overlap during your working day, plus a follow-the-sun shift that hands finished work back by morning."
        />

        <div className="relative mt-20">
          <svg
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-40 w-full md:block"
          >
            <path
              d="M 60 150 Q 600 -90 1140 150"
              fill="none"
              stroke="var(--color-sage)"
              strokeOpacity="0.45"
              strokeDasharray="4 10"
              strokeWidth="2"
            />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {MOMENTS.map((m, i) => (
              <li key={m.title} className={i === 1 ? 'md:pt-0' : 'md:pt-28'}>
                <span className="bg-lime text-ink flex size-14 items-center justify-center rounded-full">
                  <m.icon aria-hidden="true" weight="fill" className="size-6" />
                </span>
                <p className="mt-8 flex items-baseline gap-3">
                  <span className="tnum font-display text-4xl tracking-[-0.02em] md:text-5xl">
                    {m.time}
                  </span>
                  <span className="text-sage text-xs tracking-[0.2em] uppercase">{m.place}</span>
                </p>
                <h3 className="font-display mt-4 text-2xl italic">{m.title}</h3>
                <p className="text-cream/75 mt-3 max-w-[38ch] leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-cream/60 mt-16 text-sm">
          Illustration — what ships overnight depends on your scope.
        </p>
      </Container>
    </Section>
  )
}
