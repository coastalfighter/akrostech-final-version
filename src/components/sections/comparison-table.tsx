import Link from 'next/link'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

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

const ACCENT_BAR: Record<string, string> = {
  web: 'bg-akros-indigo',
  rpo: 'bg-flame-coral',
  va: 'bg-aurora-teal',
  acct: 'bg-lime-pop',
  legal: 'bg-harvest-gold',
}

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <Section surface="light">
      <Container>
        <Eyebrow>Which fits?</Eyebrow>
        <Heading as="h2" className="mt-4 max-w-3xl">
          Match the service to the pain
        </Heading>
        <Lead className="mt-4">
          Every engagement starts with a conversation, but this is the fastest way to orient
          yourself.
        </Lead>

        {/* Desktop table */}
        <div className="mt-12 hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="font-mono text-xs tracking-[0.2em] text-slate-600 uppercase">
                <th scope="col" className="border-graphite-900/15 border-b px-4 py-3 font-medium">
                  Service
                </th>
                <th scope="col" className="border-graphite-900/15 border-b px-4 py-3 font-medium">
                  Best for
                </th>
                <th scope="col" className="border-graphite-900/15 border-b px-4 py-3 font-medium">
                  Engagement
                </th>
                <th scope="col" className="border-graphite-900/15 border-b px-4 py-3 font-medium">
                  Typical first win
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.service} className="hover:bg-graphite-900/[0.03] transition-colors">
                  <th scope="row" className="border-graphite-900/10 border-b px-4 py-5">
                    <span
                      className={cn(
                        'mr-3 inline-block h-8 w-1 rounded-full align-middle',
                        ACCENT_BAR[row.accent],
                      )}
                      aria-hidden="true"
                    />
                    <Link
                      href={row.href}
                      className="font-display text-graphite-900 hover:text-akros-indigo text-lg font-semibold"
                    >
                      {row.service}
                    </Link>
                  </th>
                  <td className="border-graphite-900/10 border-b px-4 py-5 text-slate-600">
                    {row.bestFor}
                  </td>
                  <td className="border-graphite-900/10 border-b px-4 py-5 text-slate-600">
                    {row.engagement}
                  </td>
                  <td className="border-graphite-900/10 border-b px-4 py-5 text-slate-600">
                    {row.firstWin}
                  </td>
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
              className="border-graphite-900/10 rounded-[20px] border bg-white p-6"
            >
              <span
                className={cn('mb-3 block h-1 w-10 rounded-full', ACCENT_BAR[row.accent])}
                aria-hidden="true"
              />
              <h3 className="font-display text-graphite-900 text-lg font-semibold">
                <Link href={row.href}>{row.service}</Link>
              </h3>
              <dl className="mt-3 space-y-2 text-[15px]">
                <div className="flex gap-2">
                  <dt className="text-graphite-900 shrink-0 font-medium">Best for:</dt>
                  <dd className="text-slate-600">{row.bestFor}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-graphite-900 shrink-0 font-medium">Engagement:</dt>
                  <dd className="text-slate-600">{row.engagement}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-graphite-900 shrink-0 font-medium">First win:</dt>
                  <dd className="text-slate-600">{row.firstWin}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
