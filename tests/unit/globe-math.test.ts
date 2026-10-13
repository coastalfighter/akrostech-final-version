import { describe, expect, it } from 'vitest'
import {
  CITIES,
  HUB,
  arcControlPoint,
  fibonacciSphere,
  latLngToVec3,
} from '@/components/three/globe-math'

const length = (v: readonly number[]) => Math.hypot(...v)

describe('latLngToVec3', () => {
  it('puts every point on the sphere', () => {
    for (const { lat, lng } of [HUB, ...CITIES]) {
      expect(length(latLngToVec3(lat, lng, 2))).toBeCloseTo(2, 6)
    }
  })

  it('maps the poles to the y axis', () => {
    const [x, y, z] = latLngToVec3(90, 0)
    expect(y).toBeCloseTo(1, 6)
    expect(Math.abs(x) + Math.abs(z)).toBeCloseTo(0, 6)
  })
})

describe('fibonacciSphere', () => {
  it('returns count xyz triples on the sphere', () => {
    const pts = fibonacciSphere(500, 1.5)
    expect(pts).toHaveLength(1500)
    for (let i = 0; i < 500; i += 50) {
      expect(length([pts[i * 3]!, pts[i * 3 + 1]!, pts[i * 3 + 2]!])).toBeCloseTo(1.5, 5)
    }
  })
})

describe('arcControlPoint', () => {
  it('lifts the arc above the surface, more for longer flights', () => {
    const hub = latLngToVec3(HUB.lat, HUB.lng)
    const near = latLngToVec3(28.6, 77.2) // Delhi
    const far = latLngToVec3(34.05, -118.24) // Los Angeles
    const nearLift = length(arcControlPoint(hub, near))
    const farLift = length(arcControlPoint(hub, far))
    expect(nearLift).toBeGreaterThan(1)
    expect(farLift).toBeGreaterThan(nearLift)
  })
})
