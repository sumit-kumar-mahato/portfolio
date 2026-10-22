"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/**
 * A terrain of ~16k points rolling like a live signal. All motion happens in
 * the vertex shader, so the CPU only updates two uniforms per frame. The
 * cursor is projected onto the ground plane and raises a glowing ripple.
 */

const COLS = 200
const ROWS = 100
const SPACING = 0.22

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixel;
  attribute float aRand;
  varying float vHeight;
  varying float vRipple;
  varying float vFade;

  void main() {
    vec3 p = position;
    float wave =
      sin(p.x * 0.32 + uTime * 0.55) * 0.42 +
      cos(p.z * 0.48 + uTime * 0.42) * 0.34 +
      sin((p.x + p.z) * 0.16 + uTime * 0.28) * 0.6;

    float d = distance(p.xz, uMouse);
    float ripple = exp(-d * d * 0.09) * (1.0 + 0.3 * sin(d * 2.4 - uTime * 3.2));
    p.y += wave + ripple * 1.25;

    vHeight = clamp((p.y + 1.3) / 3.4, 0.0, 1.0);
    vRipple = ripple;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixel * (1.1 + aRand * 1.1 + ripple * 1.6) * (7.0 / -mv.z);

    vFade = (1.0 - smoothstep(13.0, 26.0, -mv.z)) * (1.0 - smoothstep(10.0, 20.0, abs(p.x)));
  }
`

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vHeight;
  varying float vRipple;
  varying float vFade;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = 1.0 - smoothstep(0.05, 0.5, r);
    float glow = clamp(vRipple * 1.1 + smoothstep(0.7, 1.0, vHeight) * 0.35, 0.0, 1.0);
    vec3 col = mix(uBase, uAccent, glow);
    gl_FragColor = vec4(col, soft * vFade * (0.22 + 0.78 * vHeight + vRipple * 0.5));
  }
`

function Field({ pointer }: { pointer: React.RefObject<{ x: number; y: number; active: boolean }> }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const { camera, gl } = useThree()
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
  const mouse = useMemo(() => new THREE.Vector2(0, 2), [])

  const geometry = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3)
    const rand = new Float32Array(COLS * ROWS)
    let k = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c
        positions[i * 3] = (c - COLS / 2) * SPACING
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (r - ROWS / 2) * SPACING - 5
        // Deterministic pseudo-random so the field is stable between renders.
        k = (k * 9301 + 49297) % 233280
        rand[i] = k / 233280
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1))
    return g
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 2) },
      uPixel: { value: Math.min(gl.getPixelRatio(), 2) * 2.2 },
      uBase: { value: new THREE.Color("#6b6964") },
      uAccent: { value: new THREE.Color("#d4ff3f") },
    }),
    [gl],
  )

  useFrame((state, delta) => {
    const m = material.current
    if (!m) return
    const t = state.clock.elapsedTime
    m.uniforms.uTime.value = t

    const p = pointer.current
    if (p?.active) {
      ndc.set(p.x, p.y)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) mouse.set(hit.x, hit.z)
    } else {
      // No pointer (touch / idle): let the ripple wander on its own.
      mouse.set(Math.sin(t * 0.35) * 7, Math.cos(t * 0.27) * 2.5)
    }
    m.uniforms.uMouse.value.lerp(mouse, 1 - Math.exp(-delta * 4))
  })

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  )
}

export default function DataField({ active = true }: { active?: boolean }) {
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      pointer.current.active = true
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.4, 9], fov: 50, near: 0.1, far: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ camera }) => camera.lookAt(0, 0, -3)}
      style={{ pointerEvents: "none" }}
    >
      <Field pointer={pointer} />
    </Canvas>
  )
}
