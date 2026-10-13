import { Bell, Calculator, Code, Scales, Users } from '@phosphor-icons/react/dist/ssr'
import { ServiceCard } from '@/components/ui/card'
import { Container, Section } from '@/components/ui/layout'
import { Eyebrow, Heading, Lead } from '@/components/ui/typography'

/** "What we do" — the five services in the required order. */

const SERVICES = [
  {
    accent: 'web' as const,
    icon: <Code weight="duotone" className="size-6" />,
    title: 'Website Development',
    description:
      'Marketing sites, web apps, and stores — designed, built, and cared for. Our newest service, and the proof we build as well as staff.',
    href: '/services/website-development',
  },
  {
    accent: 'rpo' as const,
    icon: <Users weight="duotone" className="size-6" />,
    title: 'Recruitment Process Outsourcing',
    description:
      'A dedicated recruiting engine for staffing agencies and HR teams: sourcing, screening, ATS management, and scheduling.',
    href: '/services/recruitment-process-outsourcing',
  },
  {
    accent: 'va' as const,
    icon: <Bell weight="duotone" className="size-6" />,
    title: 'Virtual Assistance',
    description: 'A dedicated VA for founders and small teams: inbox, calendar, customers, admin.',
    href: '/services/virtual-assistance',
  },
  {
    accent: 'acct' as const,
    icon: <Calculator weight="duotone" className="size-6" />,
    title: 'Accounting Outsourcing',
    description:
      'Bookkeeping, AP/AR, payroll, and close support for small businesses and CPA firms — alongside your CPA.',
    href: '/services/accounting-outsourcing',
  },
  {
    accent: 'legal' as const,
    icon: <Scales weight="duotone" className="size-6" />,
    title: 'Legal Process Outsourcing',
    description:
      'Paralegal support for U.S. law firms: intake, document prep, discovery, calendaring — under attorney supervision.',
    href: '/services/legal-process-outsourcing',
  },
]

export function ServicesBento() {
  return (
    <Section surface="dark">
      <Container>
        <Eyebrow>What we do</Eyebrow>
        <Heading as="h2" className="mt-4 max-w-3xl">
          Five services. One way of working.
        </Heading>
        <Lead className="mt-4">
          Five services. One model: dedicated people, never shared. Pick the one that hurts most
          right now — most clients start with one and add more.
        </Lead>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
          <ServiceCard
            accent="web"
            icon={<Code weight="duotone" className="size-6" />}
            title="Not sure where to start?"
            description="Take the 3-question service finder, or book a call and we'll point you to the right one."
            href="/services"
          />
        </div>
      </Container>
    </Section>
  )
}
