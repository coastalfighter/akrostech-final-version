import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

/** Savings calculator teaser — the full interactive calculator ships in M5. */

export function SavingsTeaser() {
  return (
    <Section surface="light">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>What it costs</Eyebrow>
            <Heading as="h2" className="mt-4">
              Honest pricing, no mystery math
            </Heading>
            <Lead className="mt-4">
              Pick a role, see the estimated annual savings against a comparable U.S. hire — with
              the assumptions shown, not hidden.
            </Lead>
            <div className="mt-8">
              <Button asChild>
                <a href="/pricing">
                  Estimate your savings <ArrowRight aria-hidden="true" className="hidden" />
                </a>
              </Button>
            </div>
          </div>
          <div className="border-graphite-900/10 rounded-[20px] border bg-white p-8 shadow-[0_24px_64px_rgba(7,11,22,0.08)]">
            <p className="font-mono text-xs tracking-[0.25em] text-slate-600 uppercase">
              Every quote shows its work
            </p>
            <ul className="mt-6 space-y-4">
              {[
                ['U.S. benchmark', 'Comparable salary, taxes & benefits — cited, not guessed'],
                ['Our fixed rate', 'Per resource or per project, in writing before work starts'],
                ['What’s included', 'Management, backup coverage & supervision — no add-ons later'],
              ].map(([term, detail]) => (
                <li key={term} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="bg-akros-indigo mt-2 size-2 shrink-0 rounded-full"
                  />
                  <span>
                    <span className="text-graphite-900 block font-medium">{term}</span>
                    <span className="block text-sm text-slate-600">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-600">
              Final savings benchmarks are confirmed with the client before launch.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
