import { cn } from '@/lib/utils'

/**
 * Static globe — shown before the WebGL scene loads, without WebGL, and
 * under prefers-reduced-motion. Same composition as the 3D scene.
 */
export function GlobeFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Stylized globe with flight paths from India to U.S. cities"
      className={cn('h-full w-full', className)}
    >
      <defs>
        <radialGradient id="globe-core" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#1b4537" />
          <stop offset="100%" stopColor="#0d2219" />
        </radialGradient>
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#c8f169" stopOpacity="0" />
          <stop offset="100%" stopColor="#c8f169" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="168" fill="url(#globe-glow)" />
      <circle cx="200" cy="200" r="140" fill="url(#globe-core)" />
      {[-90, -55, -20, 20, 55, 90].map((y) => (
        <ellipse
          key={y}
          cx="200"
          cy={200 + y}
          rx={Math.sqrt(140 * 140 - y * y)}
          ry={Math.sqrt(140 * 140 - y * y) * 0.18}
          fill="none"
          stroke="#9cc0ad"
          strokeOpacity="0.25"
          strokeDasharray="1 5"
        />
      ))}
      {[40, 80, 120].map((rx) => (
        <ellipse
          key={rx}
          cx="200"
          cy="200"
          rx={rx}
          ry="140"
          fill="none"
          stroke="#9cc0ad"
          strokeOpacity="0.2"
          strokeDasharray="1 5"
        />
      ))}
      {['M262 190 Q 200 70 120 150', 'M262 190 Q 190 90 105 170', 'M262 190 Q 180 110 95 190'].map(
        (d) => (
          <path key={d} d={d} fill="none" stroke="#c8f169" strokeOpacity="0.7" strokeWidth="1.5" />
        ),
      )}
      <circle cx="262" cy="190" r="5" fill="#c8f169" />
      {[
        [120, 150],
        [105, 170],
        [95, 190],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#c8f169" />
      ))}
      <ellipse
        cx="200"
        cy="200"
        rx="182"
        ry="52"
        fill="none"
        stroke="#c8f169"
        strokeOpacity="0.5"
        transform="rotate(-18 200 200)"
      />
    </svg>
  )
}
