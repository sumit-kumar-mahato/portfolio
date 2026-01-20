"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import type * as THREE from "three"

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[2.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#1a1a2e"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.9}
          emissive="#0ea5e9"
          emissiveIntensity={0.15}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[2.6, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.05}
          side={2}
        />
      </Sphere>
    </Float>
  )
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1
      ring1Ref.current.rotation.z = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.4) * 0.1
      ring2Ref.current.rotation.y = t * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 4
      ring3Ref.current.rotation.z = -t * 0.1
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.6, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 4 + Math.random() * 3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#0ea5e9" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function HeroSphere() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06b6d4" />
          <spotLight
            position={[0, 10, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#22d3ee"
          />
          <GlowingSphere />
          <FloatingRings />
          <Particles />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
