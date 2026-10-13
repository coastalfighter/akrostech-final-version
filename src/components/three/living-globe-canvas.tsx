'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import * as React from 'react'
import * as THREE from 'three'
import {
  INDIA,
  US_CITIES,
  arcPointAt,
  arcPoints,
  fibonacciSphere,
  latLonToVec3,
  type V3,
} from './globe-math'

/**
 * LivingGlobeCanvas — the signature home-hero 3D scene.
 *
 * - Dotted sphere (Fibonacci lattice) with a soft blue fresnel glow.
 * - Arcs of light launch from India to New York, Austin, Denver, Los Angeles,
 *   staggered; a pulse travels each arc in a loop.
 * - City markers (amber India, teal US) with projected HTML labels.
 * - Slow rotation (~0.05 rad/s). Scroll progress (0→1) scales the globe down
 *   and retracts the arcs.
 *
 * Performance: points count adapts to viewport width, DPR capped at 1.75,
 * rendering pauses when the hero leaves the viewport.
 */

const RADIUS = 1.6
const ROTATION_SPEED = 0.05 // rad/s

function makeDotTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.85)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
  }
  return new THREE.CanvasTexture(canvas)
}

function Dots({ count }: { count: number }) {
  const geometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(count, RADIUS), 3))
    return geo
  }, [count])
  const texture = React.useMemo(() => makeDotTexture(), [])
  React.useEffect(
    () => () => {
      geometry.dispose()
      texture.dispose()
    },
    [geometry, texture],
  )
  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.032}
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#93a0ff"
        sizeAttenuation
      />
    </points>
  )
}

const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const FRESNEL_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.6);
    gl_FragColor = vec4(vec3(0.42, 0.52, 1.0) * f, f * 0.85);
  }
`

function FresnelGlow() {
  const material = React.useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: FRESNEL_VERT,
        fragmentShader: FRESNEL_FRAG,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  )
  React.useEffect(() => () => material.dispose(), [material])
  return (
    <mesh scale={1.22} material={material}>
      <sphereGeometry args={[RADIUS, 48, 48]} />
    </mesh>
  )
}

const ALL_CITIES = [INDIA, ...US_CITIES]

function Markers({ texture }: { texture: THREE.Texture }) {
  return (
    <>
      {ALL_CITIES.map((city) => {
        const p = latLonToVec3(city.lat, city.lon, RADIUS)
        return (
          <sprite key={city.name} position={p} scale={[0.1, 0.1, 1]}>
            <spriteMaterial
              map={texture}
              color={city.accent === 'india' ? '#ffb547' : '#2dd4bf'}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </sprite>
        )
      })}
    </>
  )
}

interface ArcData {
  from: V3
  to: V3
  delay: number
  segments: number
}

function Arcs({
  scrollProgress,
  texture,
}: {
  scrollProgress: MotionValue<number>
  texture: THREE.Texture
}) {
  const linesRef = React.useRef<THREE.Line[]>([])
  const pulsesRef = React.useRef<(THREE.Sprite | null)[]>([])

  const arcs = React.useMemo<ArcData[]>(() => {
    const from = latLonToVec3(INDIA.lat, INDIA.lon, RADIUS)
    return US_CITIES.map((city, i) => ({
      from,
      to: latLonToVec3(city.lat, city.lon, RADIUS),
      delay: 0.7 + i * 0.55,
      segments: 72,
    }))
  }, [])

  // Build THREE.Line objects imperatively: the <line> JSX intrinsic collides
  // with SVG's <line> in R3F v9's types.
  const lines = React.useMemo(
    () =>
      arcs.map((arc) => {
        const geo = new THREE.BufferGeometry()
        geo.setAttribute(
          'position',
          new THREE.BufferAttribute(arcPoints(arc.from, arc.to, RADIUS, arc.segments), 3),
        )
        geo.setDrawRange(0, 0)
        const mat = new THREE.LineBasicMaterial({
          color: '#8b8cff',
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        return new THREE.Line(geo, mat)
      }),
    [arcs],
  )

  React.useEffect(() => {
    linesRef.current = lines
    return () => {
      lines.forEach((line) => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
      linesRef.current = []
    }
  }, [lines])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    const scroll = scrollProgress.get()
    arcs.forEach((arc, i) => {
      const line = linesRef.current[i]
      const pulse = pulsesRef.current[i]
      if (!line || !pulse) return
      const launchT = THREE.MathUtils.clamp((elapsed - arc.delay) / 1.5, 0, 1)
      const eased = 1 - Math.pow(1 - launchT, 3)
      const visible = Math.floor(eased * (1 - scroll) * arc.segments)
      line.geometry.setDrawRange(0, Math.max(0, visible))
      line.visible = visible > 2
      if (launchT >= 1 && scroll < 0.9) {
        const t = (elapsed * 0.2 + i * 0.27) % 1
        const p = arcPointAt(arc.from, arc.to, RADIUS, t)
        pulse.position.set(p[0], p[1], p[2])
        pulse.visible = true
      } else {
        pulse.visible = false
      }
    })
  })

  return (
    <>
      {lines.map((line, i) => (
        <primitive key={`arc-${i}`} object={line} />
      ))}
      {arcs.map((arc, i) => (
        <sprite
          key={`pulse-${i}`}
          ref={(el) => {
            pulsesRef.current[i] = el
          }}
          scale={[0.14, 0.14, 1]}
          visible={false}
        >
          <spriteMaterial
            map={texture}
            color="#ffd9a0"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </>
  )
}

function LabelProjector({
  groupRef,
  labelEls,
}: {
  groupRef: React.RefObject<THREE.Group | null>
  labelEls: React.MutableRefObject<(HTMLDivElement | null)[]>
}) {
  const { camera, size } = useThree()
  const scratch = React.useMemo(
    () => ({
      world: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      camDir: new THREE.Vector3(),
      city: new THREE.Vector3(),
    }),
    [],
  )
  const cityVectors = React.useMemo(
    () => ALL_CITIES.map((c) => new THREE.Vector3(...latLonToVec3(c.lat, c.lon, RADIUS))),
    [],
  )

  useFrame(() => {
    const group = groupRef.current
    if (!group) return
    group.updateWorldMatrix(true, false)
    ALL_CITIES.forEach((city, i) => {
      const el = labelEls.current[i]
      const cityVec = cityVectors[i]
      if (!el || !cityVec) return
      scratch.world.copy(cityVec).applyMatrix4(group.matrixWorld)
      scratch.normal.copy(scratch.world).normalize()
      scratch.camDir.copy(camera.position).normalize()
      const facing = scratch.normal.dot(scratch.camDir)
      scratch.city.copy(scratch.world).project(camera)
      const x = (scratch.city.x * 0.5 + 0.5) * size.width
      const y = (-scratch.city.y * 0.5 + 0.5) * size.height
      el.style.transform = `translate(-50%,-150%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`
      el.style.opacity = facing > 0.3 ? '1' : '0'
    })
  })
  return null
}

export function LivingGlobeCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = React.useRef<THREE.Group>(null)
  const labelEls = React.useRef<(HTMLDivElement | null)[]>([])
  const texture = React.useMemo(() => makeDotTexture(), [])
  const [visible, setVisible] = React.useState(true)
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const dotCount = React.useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 1000 : 1900),
    [],
  )

  React.useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setVisible(entry.isIntersecting)
      },
      {
        threshold: 0,
      },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => () => texture.dispose(), [texture])

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <group
          ref={groupRef}
          // Rotation + scroll-driven scale applied imperatively below.
        >
          <GlobeMotion groupRef={groupRef} scrollProgress={scrollProgress} />
          <Dots count={dotCount} />
          <FresnelGlow />
          <Markers texture={texture} />
          <Arcs scrollProgress={scrollProgress} texture={texture} />
        </group>
        <LabelProjector groupRef={groupRef} labelEls={labelEls} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {ALL_CITIES.map((city, i) => (
          <div
            key={city.name}
            ref={(el) => {
              labelEls.current[i] = el
            }}
            className="absolute top-0 left-0 font-mono text-[10px] font-medium tracking-[0.22em] uppercase opacity-0 transition-opacity duration-300"
            style={{ color: city.accent === 'india' ? '#ffb547' : '#9aa3b8' }}
          >
            {city.name}
          </div>
        ))}
      </div>
    </div>
  )
}

function GlobeMotion({
  groupRef,
  scrollProgress,
}: {
  groupRef: React.RefObject<THREE.Group | null>
  scrollProgress: MotionValue<number>
}) {
  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y += Math.min(delta, 0.05) * ROTATION_SPEED
    const s = 1 - scrollProgress.get() * 0.45
    group.scale.setScalar(Math.max(0.4, s))
  })
  return null
}
