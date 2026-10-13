import Link from 'next/link'
import { FaqAccordion } from '@/components/sections/faq-accordion'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/layout'
import { SectionHeader } from '@/components/ui/typography'
import { globalFaqs } from '@/data/site'

/** Common questions — the first five global FAQs. */
export function FaqPreview() {
  return (
    <Section tone="raised">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              eyebrow="Questions"
              index="07"
              title={
                <>
                  Straight <span className="accent">answers.</span>
                </>
              }
              lead="The questions every prospect asks, answered the way we would on a call."
            >
              <div>
                <Button asChild variant="secondary">
                  <Link href="/faq">All questions</Link>
                </Button>
              </div>
            </SectionHeader>
          </div>
          <FaqAccordion items={globalFaqs.slice(0, 5)} />
        </div>
      </Container>
    </Section>
  )
}
