import { ImageResponse } from 'next/og'

/**
 * Shared OG image renderer — forest field, rising arcs, cream serif title,
 * lime accents. next/og can't use next/font, so a Georgia serif stack echoes
 * the Fraunces display face.
 */

export const OG_SIZE = { width: 1200, height: 630 }

const INK = '#0A0B0A'
const FOREST = '#112C23'
const FOREST_MID = '#1B4537'
const CREAM = '#F2EDE3'
const LIME = '#C8F169'
const SAGE = '#9CC0AD'

export function ogImage({
  eyebrow,
  title,
  footer = 'akrosstech.com',
}: {
  eyebrow: string
  title: string
  /** Kept for call-site compatibility; every image uses the brand palette. */
  accent?: string
  footer?: string
}) {
  const arcs = [140, 200, 260, 320, 380]
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: FOREST,
        padding: '64px 80px',
        position: 'relative',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      <svg
        width="900"
        height="420"
        viewBox="0 0 900 420"
        style={{ position: 'absolute', right: '-160px', bottom: '0px' }}
      >
        {arcs.map((r, i) => (
          <path
            key={r}
            d={`M ${450 - r} 420 A ${r} ${r} 0 0 1 ${450 + r} 420`}
            fill="none"
            stroke={FOREST_MID}
            strokeWidth={30 - i * 3}
          />
        ))}
        <circle cx="450" cy="420" r="96" fill={LIME} />
      </svg>
      <div style={{ display: 'flex', alignItems: 'baseline', color: CREAM, fontSize: '44px' }}>
        akrostech<span style={{ color: LIME }}>.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '900px' }}>
        <span
          style={{
            color: SAGE,
            fontFamily: 'system-ui, sans-serif',
            fontSize: '22px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            color: CREAM,
            fontSize: '72px',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </span>
      </div>
      <span
        style={{
          display: 'flex',
          color: INK,
          backgroundColor: LIME,
          borderRadius: '999px',
          padding: '10px 22px',
          alignSelf: 'flex-start',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '20px',
        }}
      >
        {footer}
      </span>
    </div>,
    { ...OG_SIZE },
  )
}
