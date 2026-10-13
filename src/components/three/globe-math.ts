/**
 * Pure math for the Living Globe. No three.js dependency here so the geometry
 * can be unit-tested in node.
 */

export type V3 = [number, number, number]

export interface City {
  name: string
  lat: number
  lon: number
  /** India glows amber; US cities glow teal. */
  accent: 'india' | 'us'
}

export const INDIA: City = { name: 'India', lat: 13.0, lon: 77.6, accent: 'india' }

export const US_CITIES: City[] = [
  { name: 'New York', lat: 40.7, lon: -74.0, accent: 'us' },
  { name: 'Austin', lat: 30.3, lon: -97.7, accent: 'us' },
  { name: 'Denver', lat: 39.7, lon: -105.0, accent: 'us' },
  { name: 'Los Angeles', lat: 34.1, lon: -118.2, accent: 'us' },
]

/** Convert latitude/longitude to a point on a sphere of `radius`. */
export function latLonToVec3(lat: number, lon: number, radius: number): V3 {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lon + 180) * Math.PI) / 180
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

/** Evenly distributed points on a sphere (Fibonacci lattice). */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3)
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = goldenAngle * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

function normalize(v: V3): V3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / len, v[1] / len, v[2] / len]
}

function dot(a: V3, b: V3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

/**
 * Point on a great-circle arc from `from` to `to`, lifted above the sphere.
 * Uses spherical interpolation (slerp) with a sinusoidal altitude profile,
 * so the arc always stays above the surface — even for long hauls like
 * India → New York, where a quadratic bezier would clip through the globe.
 */
export function arcPointAt(from: V3, to: V3, radius: number, t: number): V3 {
  const f = normalize(from)
  const u = normalize(to)
  const angle = Math.acos(clamp(dot(f, u), -1, 1))
  const maxAlt = radius * 0.42

  let dir: V3
  const sinAngle = Math.sin(angle)
  if (sinAngle < 1e-6) {
    // Antipodal (or identical) points: fall back to normalized lerp.
    dir = normalize([f[0] + (u[0] - f[0]) * t, f[1] + (u[1] - f[1]) * t, f[2] + (u[2] - f[2]) * t])
  } else {
    const a = Math.sin((1 - t) * angle) / sinAngle
    const b = Math.sin(t * angle) / sinAngle
    dir = [a * f[0] + b * u[0], a * f[1] + b * u[1], a * f[2] + b * u[2]]
  }
  const altitude = 1 + (maxAlt / radius) * Math.sin(Math.PI * t)
  return [dir[0] * radius * altitude, dir[1] * radius * altitude, dir[2] * radius * altitude]
}

/** Sampled arc from `from` to `to`, lifted above the sphere. */
export function arcPoints(from: V3, to: V3, radius: number, segments = 64): Float32Array {
  const positions = new Float32Array((segments + 1) * 3)
  for (let i = 0; i <= segments; i++) {
    const p = arcPointAt(from, to, radius, i / segments)
    positions[i * 3] = p[0]
    positions[i * 3 + 1] = p[1]
    positions[i * 3 + 2] = p[2]
  }
  return positions
}
