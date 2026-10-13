import { ImageResponse } from 'next/og'

/**
 * Shared OG image renderer — Meridian dark, brand mark, title, accent rule.
 * next/og can't use next/font, so this uses system font stacks with tight
 * tracking to echo the Bricolage Grotesque feel.
 */

export const OG_SIZE = { width: 1200, height: 630 }

const ACCENT: Record<string, string> = {
  web: '#8B7CFF',
  rpo: '#FF9F6B',
  va: '#4FD1C5',
  acct: '#F6C76A',
  legal: '#7CE3A8',
  default: '#8B7CFF',
}

export function ogImage({
  eyebrow,
  title,
  accent = 'default',
  footer = 'akrosstech.com',
}: {
  eyebrow: string
  title: string
  accent?: string
  footer?: string
}) {
  const color = ACCENT[accent] ?? ACCENT.default
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#070B16',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${color}, #4a4de0)`,
            }}
          />
          <span
            style={{ color: '#F4F1EA', fontSize: '28px', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            AKROSTECH
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span
            style={{
              color,
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              color: '#F4F1EA',
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '960px',
            }}
          >
            {title}
          </span>
          <div style={{ width: '120px', height: '4px', backgroundColor: color, borderRadius: '2px' }} />
        </div>
        <span style={{ color: '#8A8FA3', fontSize: '20px', letterSpacing: '0.04em' }}>{footer}</span>
      </div>
    ),
    { ...OG_SIZE },
  )
}
