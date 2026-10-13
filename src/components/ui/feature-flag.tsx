import { env } from '@/lib/env'

/**
 * FeatureFlag — renders children only when the named flag is enabled.
 * Social proof (testimonials, logos, case studies, stats) stays hidden in
 * production until the client supplies real data.
 */

const FLAGS = {
  testimonials: () => env.NEXT_PUBLIC_FLAG_TESTIMONIALS,
  'case-studies': () => env.NEXT_PUBLIC_FLAG_CASE_STUDIES,
  'client-logos': () => env.NEXT_PUBLIC_FLAG_CLIENT_LOGOS,
  stats: () => env.NEXT_PUBLIC_FLAG_STATS,
} as const

export type FeatureFlagName = keyof typeof FLAGS

export function isFeatureEnabled(name: FeatureFlagName): boolean {
  return FLAGS[name]()
}

export function FeatureFlag({
  name,
  children,
}: {
  name: FeatureFlagName
  children: React.ReactNode
}) {
  if (!isFeatureEnabled(name)) return null
  return <>{children}</>
}
