'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import * as React from 'react'
import * as THREE from 'three'
import { CITIES, HUB, arcControlPoint, fibonacciSphere, latLngToVec3 } from './globe-math'

/**
 * The hero globe (WebGL, client-only, lazy-loaded).
 *
 * A sphere of light points over a dark core, two orbit rings, and flight
 * arcs from India to U.S. cities with packets travelling along them. Scroll
 * progress (0→1 across the hero) spins the globe, tilts it and pulls the
 * camera back; the pointer adds a little parallax.
 */

const LIME = new THREE.Color('#c8f169')
const SAGE = new THREE.Color('#9cc0ad')
const CORE = new THREE.Color('#123a2d')

// India and the U.S. sit on nearly opposite sides of the globe, so their
// arcs cross the far north. The globe is tipped toward the camera (see
// targetX) so those polar arcs face the viewer.
const BASE_SPIN = Math.PI * 0.5

function useArcs() {
  return React.useMemo(() => {
    const hub = new THREE.Vector3(...latLngToVec3(HUB.lat, HUB.lng, 1.001))
    return CITIES.map((city, i) => {
      const end = new THREE.Vector3(...latLngToVec3(city.lat, city.lng, 1.001))
      const ctrl = new THREE.Vector3(
        ...arcControlPoint(
          hub.toArray() as [number, number, number],
          end.toArray() as [number, number, number],
        ),
      )
      const curve = new THREE.QuadraticBezierCurve3(hub, ctrl, end)
      return { curve, end, offset: i / CITIES.length, name: city.name }
    })
  }, [])
}

/** Fresnel rim glow around the globe. */
const atmosphereMaterial = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: { uColor: { value: LIME } },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      gl_FragColor = vec4(uColor, 1.0) * intensity * 0.9;
    }
  `,
})

function Globe({ progress }: { progress: MotionValue<number> }) {
  const group = React.useRef<THREE.Group>(null)
  const ringA = React.useRef<THREE.Mesh>(null)
  const ringB = React.useRef<THREE.Mesh>(null)
  const packets = React.useRef<(THREE.Mesh | null)[]>([])
  const arcs = useArcs()
  const points = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(2600, 1), 3))
    return geometry
  }, [])
  const tubes = React.useMemo(
    () => arcs.map((a) => new THREE.TubeGeometry(a.curve, 64, 0.0055, 6, false)),
    [arcs],
  )
  const hub = React.useMemo(() => new THREE.Vector3(...latLngToVec3(HUB.lat, HUB.lng, 1.01)), [])

  useFrame((state, delta) => {
    const p = progress.get()
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    // Idle spin + scroll spin, eased toward the target so it never jerks.
    const targetY =
      BASE_SPIN + Math.sin(t * 0.15) * 0.25 + p * Math.PI * 0.9 + state.pointer.x * 0.2
    const targetX = 0.95 - p * 0.6 + state.pointer.y * -0.12
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 4)
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 4)
    const scale = 1 + p * 0.35
    g.scale.setScalar(g.scale.x + (scale - g.scale.x) * Math.min(1, delta * 4))

    state.camera.position.z = 4.1 + p * 0.8
    state.camera.position.y = -p * 0.4
    state.camera.lookAt(0, 0, 0)

    if (ringA.current) ringA.current.rotation.z = t * 0.12
    if (ringB.current) ringB.current.rotation.z = -t * 0.08 + p * 2

    arcs.forEach((arc, i) => {
      const mesh = packets.current[i]
      if (!mesh) return
      const u = (t * 0.22 + arc.offset) % 1
      mesh.position.copy(arc.curve.getPoint(u))
      mesh.scale.setScalar(0.6 + Math.sin(u * Math.PI) * 0.8)
    })
  })

  return (
    <group ref={group}>
      {/* Dark core hides the far side of the point cloud for depth. */}
      <mesh>
        <sphereGeometry args={[0.985, 64, 64]} />
        <meshBasicMaterial color={CORE} />
      </mesh>
      <points geometry={points}>
        <pointsMaterial color={SAGE} size={0.02} sizeAttenuation transparent opacity={0.95} />
      </points>
      <mesh scale={1.18} material={atmosphereMaterial}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>

      {tubes.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshBasicMaterial color={LIME} transparent opacity={0.55} />
        </mesh>
      ))}
      {arcs.map((arc, i) => (
        <React.Fragment key={arc.name}>
          <mesh position={arc.end}>
            <sphereGeometry args={[0.018, 12, 12]} />
            <meshBasicMaterial color={LIME} />
          </mesh>
          <mesh
            ref={(el) => {
              packets.current[i] = el
            }}
          >
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </React.Fragment>
      ))}
      <mesh position={hub}>
        <sphereGeometry args={[0.034, 16, 16]} />
        <meshBasicMaterial color={LIME} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.24, 0.0035, 8, 160]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.7} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[1.34, 0.0025, 8, 160]} />
        <meshBasicMaterial color={SAGE} transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

export default function GlobeScene({
  progress,
  active,
}: {
  progress: MotionValue<number>
  /** Pause rendering while the hero is off screen. */
  active: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.1], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Globe progress={progress} />
    </Canvas>
  )
}
