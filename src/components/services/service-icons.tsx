import { Bell, Calculator, Code, Scales, Users } from '@phosphor-icons/react/dist/ssr'

/** Icon per service accent — the single source of truth for service icons. */
export const SERVICE_ICONS = {
  web: <Code weight="duotone" className="size-6" />,
  rpo: <Users weight="duotone" className="size-6" />,
  va: <Bell weight="duotone" className="size-6" />,
  acct: <Calculator weight="duotone" className="size-6" />,
  legal: <Scales weight="duotone" className="size-6" />,
} as const
