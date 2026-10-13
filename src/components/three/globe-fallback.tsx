'use client'

/**
 * GlobeFallback — static SVG globe for no-WebGL and reduced-motion contexts.
 *
 * A dotted circle with four arcs from India to the US. When `animated` is true
 * (no-WebGL but motion is fine), arcs draw in with a CSS dash animation,
 * staggered. When false (reduced motion), everything renders statically.
 */

const ARCS = [
  { d: 'M 318 218 Q 250 120 96 148', delay: '0.4s' }, // New York
  { d: 'M 318 218 Q 230 160 78 208', delay: '0.9s' }, // Austin
  { d: 'M 318 218 Q 220 190 62 236', delay: '1.4s' }, // Denver
  { d: 'M 318 218 Q 210 220 52 268', delay: '1.9s' }, // Los Angeles
]

export function GlobeFallback({ animated = true }: { animated?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full max-w-[560px]"
        role="img"
        aria-label="Stylized globe showing connections from India to four US cities"
      >
        <defs>
          <pattern id="globe-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1.6" fill="#8b8cff" opacity="0.55" />
          </pattern>
          <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5b5cf6" stopOpacity="0" />
            <stop offset="78%" stopColor="#5b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b8cff" stopOpacity="0.35" />
          </radialGradient>
          <mask id="globe-mask">
            <circle cx="200" cy="200" r="150" fill="white" />
          </mask>
        </defs>

        <circle cx="200" cy="200" r="183" fill="url(#globe-glow)" />
        <g mask="url(#globe-mask)">
          <rect x="50" y="50" width="300" height="300" fill="url(#globe-dots)" />
        </g>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#232b45" strokeWidth="1" />

        {ARCS.map((arc, i) => (
          <path
            key={i}
            d={arc.d}
            fill="none"
            stroke="#8b8cff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={animated ? 0 : 0.75}
            className={animated ? 'globe-arc-draw' : undefined}
            style={animated ? { animationDelay: arc.delay } : undefined}
          />
        ))}

        {/* India marker */}
        <circle cx="318" cy="218" r="5" fill="#ffb547" />
        <circle cx="318" cy="218" r="10" fill="#ffb547" opacity="0.25" />
        {/* US markers */}
        {[
          [96, 148],
          [78, 208],
          [62, 236],
          [52, 268],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#2dd4bf" />
        ))}
      </svg>
      <style>{`
        @keyframes globe-arc-draw {
          0% { stroke-dasharray: 400; stroke-dashoffset: 400; opacity: 0; }
          10% { opacity: 0.75; }
          100% { stroke-dasharray: 400; stroke-dashoffset: 0; opacity: 0.75; }
        }
        .globe-arc-draw {
          animation: globe-arc-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .globe-arc-draw { animation: none; opacity: 0.75; }
        }
      `}</style>
    </div>
  )
}
