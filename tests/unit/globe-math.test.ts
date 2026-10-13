import { describe, expect, it } from 'vitest'
import {
  INDIA,
  US_CITIES,
  arcPointAt,
  arcPoints,
  fibonacciSphere,
  latLonToVec3,
} from '@/components/three/globe-math'

const length = (v: [number, number, number]) => Math.hypot(v[0], v[1], v[2])

describe('latLonToVec3', () => {
  it('places points on the sphere of the given radius', () => {
    for (const city of [INDIA, ...US_CITIES]) {
      const v = latLonToVec3(city.lat, city.lon, 1.6)
      expect(length(v)).toBeCloseTo(1.6, 5)
    }
  })

  it('maps the equator and poles sanely', () => {
    const equator = latLonToVec3(0, 0, 1)
    expect(equator[1]).toBeCloseTo(0, 5)
    const north = latLonToVec3(90, 0, 1)
    expect(north[1]).toBeCloseTo(1, 5)
  })
})

describe('fibonacciSphere', () => {
  it('returns count points on the sphere', () => {
    const positions = fibonacciSphere(500, 2)
    expect(positions.length).toBe(500 * 3)
    for (let i = 0; i < 500; i += 50) {
      const v: [number, number, number] = [
        positions[i * 3]!,
        positions[i * 3 + 1]!,
        positions[i * 3 + 2]!,
      ]
      expect(length(v)).toBeCloseTo(2, 4)
    }
  })
})

describe('arcPoints / arcPointAt', () => {
  const from = latLonToVec3(INDIA.lat, INDIA.lon, 1.6)
  const to = latLonToVec3(US_CITIES[0]!.lat, US_CITIES[0]!.lon, 1.6)

  it('starts at `from` and ends at `to`', () => {
    const points = arcPoints(from, to, 1.6, 16)
    expect(points[0]).toBeCloseTo(from[0], 5)
    expect(points[1]).toBeCloseTo(from[1], 5)
    expect(points[2]).toBeCloseTo(from[2], 5)
    const last = points.length - 3
    expect(length([points[last]!, points[last + 1]!, points[last + 2]!])).toBeCloseTo(1.6, 4)
  })

  it('lifts the midpoint above the sphere surface', () => {
    const mid = arcPointAt(from, to, 1.6, 0.5)
    expect(length(mid)).toBeGreaterThan(1.6)
  })

  it('arcPointAt endpoints match', () => {
    const start = arcPointAt(from, to, 1.6, 0)
    const end = arcPointAt(from, to, 1.6, 1)
    expect(length([start[0] - from[0], start[1] - from[1], start[2] - from[2]])).toBeCloseTo(0, 6)
    expect(length([end[0] - to[0], end[1] - to[1], end[2] - to[2]])).toBeCloseTo(0, 6)
  })
})
