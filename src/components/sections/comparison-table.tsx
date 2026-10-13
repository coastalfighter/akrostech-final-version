import Link from 'next/link'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

/**
 * ComparisonTable — "which service fits" for the services index.
 * Rows: services (in the required order). Columns: best-for, engagement,
 * typical first win. Responsive: cards on small screens.
 */

export interface ComparisonRow {
  service: string
  href: string
  bestFor: string
  engagement: string
  firstWin: string
  accent: string
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <Section tone="ink">
      <Container>
        <Eyebrow>Which fits?</Eyebrow>
        <Heading as="h2" className="mt-6 max-w-3xl">
          Match the service <span className="accent">to the pain.</span>
        </Heading>
        <Lead className="mt-6">
          Every engagement starts with a conversation, but this is the fastest way to orient
          yourself.
        </Lead>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-fog text-xs tracking-[0.2em] uppercase">
                <th scope="col" className="border-line border-b px-4 py-3 font-medium">
                  Service
                </th>
                <th scope="col" className="border-line border-b px-4 py-3 font-medium">
                  Best for
                </th>
                <th scope="col" className="border-line border-b px-4 py-3 font-medium">
                  Engagement
                </th>
                <th scope="col" className="border-line border-b px-4 py-3 font-medium">
                  Typical first win
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.service} className="hover:bg-cream/[0.03] transition-colors">
                  <th scope="row" className="border-line border-b px-4 py-6">
                    <Link
                      href={row.href}
                      className="font-display text-cream hover:text-lime text-xl transition-colors"
                    >
                      {row.service}
                    </Link>
                  </th>
                  <td className="border-line text-fog border-b px-4 py-6">{row.bestFor}</td>
                  <td className="border-line text-fog border-b px-4 py-6">{row.engagement}</td>
                  <td className="border-line text-fog border-b px-4 py-6">{row.firstWin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-10 grid gap-4 lg:hidden">
          {rows.map((row) => (
            <article
              key={row.service}
              className="border-line bg-ink-2 rounded-[var(--radius-card)] border p-6"
            >
              <h3 className="font-display text-cream text-xl">
                <Link href={row.href}>{row.service}</Link>
              </h3>
              <dl className="mt-3 space-y-2 text-[15px]">
                <div className="flex gap-2">
                  <dt className="text-cream shrink-0 font-medium">Best for:</dt>
                  <dd className="text-fog">{row.bestFor}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-cream shrink-0 font-medium">Engagement:</dt>
                  <dd className="text-fog">{row.engagement}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-cream shrink-0 font-medium">First win:</dt>
                  <dd className="text-fog">{row.firstWin}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
