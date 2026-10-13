/**
 * Pure geometry helpers for the hero globe — no three.js import, so they are
 * cheap to unit-test.
 */

export type Vec3 = [number, number, number]

/** Latitude/longitude in degrees → a point on a sphere of `radius`. */
export function latLngToVec3(lat: number, lng: number, radius = 1): Vec3 {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

/** Evenly spread `count` points over a sphere (Fibonacci lattice), flat xyz array. */
export function fibonacciSphere(count: number, radius = 1): Float32Array {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    out[i * 3] = Math.cos(theta) * r * radius
    out[i * 3 + 1] = y * radius
    out[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return out
}

/**
 * Control point for a great-arc-ish flight path between two surface points:
 * the normalised midpoint lifted off the surface in proportion to distance.
 */
export function arcControlPoint(a: Vec3, b: Vec3, radius = 1): Vec3 {
  const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]
  const len = Math.hypot(...mid) || 1
  const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
  const lift = radius * (1 + dist * 0.28)
  return [(mid[0] / len) * lift, (mid[1] / len) * lift, (mid[2] / len) * lift]
}

/** The delivery hub and the U.S. cities the arcs reach. */
export const HUB = { name: 'India', lat: 21.1, lng: 78.9 }
export const CITIES = [
  { name: 'Wilmington', lat: 39.74, lng: -75.55 },
  { name: 'New York', lat: 40.71, lng: -74.0 },
  { name: 'Austin', lat: 30.27, lng: -97.74 },
  { name: 'Denver', lat: 39.74, lng: -104.99 },
  { name: 'Los Angeles', lat: 34.05, lng: -118.24 },
]
