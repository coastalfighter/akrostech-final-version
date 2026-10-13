import * as React from 'react'
import { Breadcrumbs, type Crumb } from '@/components/layout/breadcrumbs'
import { Container } from '@/components/ui/layout'
import { Eyebrow } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

/**
 * PageHero — a unique hero for every page.
 *
 * Each `variant` renders a distinct decorative visual (all CSS/SVG,
 * aria-hidden): prism, dial, sunrise, open-line, bridge, constellation,
 * collage, waveform, or the default meridian glow. Service pages pass
 * `accent` to tint the visual.
 */

export type HeroVariant =
  | 'prism'
  | 'dial'
  | 'sunrise'
  | 'open-line'
  | 'bridge'
  | 'constellation'
  | 'collage'
  | 'waveform'
  | 'default'

const ACCENT_HEX: Record<string, string> = {
  web: '#5b5cf6',
  rpo: '#ff6b5b',
  va: '#2dd4bf',
  acct: '#a3e635',
  legal: '#f5c451',
}

function HeroVisual({ variant, accent }: { variant: HeroVariant; accent?: string }) {
  const color = accent ? ACCENT_HEX[accent] : '#8b8cff'
  const common = 'pointer-events-none absolute inset-0 overflow-hidden'

  switch (variant) {
    case 'prism':
      // One white beam splitting into five accent beams.
      return (
        <div className={common} aria-hidden="true">
          <div className="absolute top-1/2 left-0 h-px w-1/3 -translate-y-1/2 bg-gradient-to-r from-transparent to-white/70" />
          {Object.values(ACCENT_HEX).map((hex, i) => (
            <div
              key={hex}
              className="absolute top-1/2 left-1/3 h-px w-2/3 origin-left"
              style={{
                background: `linear-gradient(to right, ${hex}, transparent)`,
                transform: `rotate(${-24 + i * 12}deg)`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      )
    case 'dial':
      return (
        <div className={common} aria-hidden="true">
          <svg
            viewBox="0 0 400 400"
            className="absolute -top-20 right-0 h-[480px] w-[480px] opacity-40"
          >
            {[180, 140, 100, 60].map((r) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="#232b45"
                strokeWidth="1"
              />
            ))}
            <line
              x1="200"
              y1="200"
              x2="200"
              y2="40"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="200" cy="200" r="6" fill={color} />
          </svg>
        </div>
      )
    case 'sunrise':
      return (
        <div className={common} aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#ffb547]/15 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#5b5cf6]/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      )
    case 'open-line':
      return (
        <div className={common} aria-hidden="true">
          <svg
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-32 w-full opacity-50"
          >
            <path
              d="M0 60 Q 75 10 150 60 T 300 60 T 450 60 T 600 60"
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          </svg>
        </div>
      )
    case 'bridge':
      return (
        <div className={common} aria-hidden="true">
          <svg
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
            className="absolute bottom-0 h-48 w-full opacity-50"
          >
            <path d="M0 200 Q 300 -40 600 200" fill="none" stroke={color} strokeWidth="2" />
            {[100, 200, 300, 400, 500].map((x) => (
              <line
                key={x}
                x1={x}
                y1={200 - 200 * Math.sin((x / 600) * Math.PI) * 0.55}
                x2={x}
                y2="200"
                stroke="#232b45"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>
      )
    case 'constellation':
      return (
        <div className={common} aria-hidden="true">
          {[
            [12, 22],
            [28, 68],
            [45, 30],
            [62, 72],
            [78, 38],
            [90, 62],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute size-1.5 rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                background: i % 2 ? color : '#8b8cff',
                opacity: 0.8,
              }}
            />
          ))}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-30"
          >
            <path
              d="M12 22 L28 68 L45 30 L62 72 L78 38 L90 62"
              fill="none"
              stroke="#8b8cff"
              strokeWidth="0.3"
            />
          </svg>
        </div>
      )
    case 'collage':
      return (
        <div className={common} aria-hidden="true">
          {['Recruiter', 'Developer', 'Paralegal', 'Accountant', 'Assistant'].map((word, i) => (
            <span
              key={word}
              className="font-display absolute font-bold whitespace-nowrap text-white/[0.05]"
              style={{
                fontSize: `${3 + (i % 3)}rem`,
                left: `${8 + i * 16}%`,
                top: `${18 + ((i * 23) % 55)}%`,
                transform: `rotate(${-8 + i * 4}deg)`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      )
    case 'waveform':
      return (
        <div className={common} aria-hidden="true">
          <svg
            viewBox="0 0 600 160"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 opacity-40"
          >
            {[0, 1, 2].map((row) => (
              <path
                key={row}
                d={`M0 ${80 + row * 12 - 12} Q 75 ${30 + row * 20} 150 ${80 + row * 12 - 12} T 300 ${80 + row * 12 - 12} T 450 ${80 + row * 12 - 12} T 600 ${80 + row * 12 - 12}`}
                fill="none"
                stroke={row === 1 ? color : '#232b45'}
                strokeWidth={row === 1 ? 2 : 1}
              />
            ))}
          </svg>
        </div>
      )
    default:
      return (
        <div className={common} aria-hidden="true">
          <div
            className="absolute -top-32 right-[10%] size-[480px] rounded-full opacity-25 blur-[120px]"
            style={{ background: color }}
          />
        </div>
      )
  }
}

export function PageHero({
  eyebrow,
  title,
  lead,
  variant = 'default',
  accent,
  crumbs,
  children,
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  variant?: HeroVariant
  accent?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn('bg-ink-950 relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28', className)}
    >
      <HeroVisual variant={variant} accent={accent} />
      <Container className="relative">
        {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-paper-50 mt-4 max-w-4xl text-4xl font-bold tracking-[-0.02em] md:text-6xl">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-[68ch] text-lg leading-relaxed text-mist-400">{lead}</p>}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  )
}
