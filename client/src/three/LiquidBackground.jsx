import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

function LiquidOrb() {
  const outerRef = useRef()
  const midRef   = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    outerRef.current.rotation.y =  t * 0.08
    outerRef.current.rotation.z =  t * 0.05
    midRef.current.rotation.y   = -t * 0.12
    midRef.current.rotation.x   =  t * 0.07
    innerRef.current.rotation.y =  t * 0.18
    innerRef.current.rotation.z = -t * 0.09
  })

  return (
   <group position={[-1, 0, 0]}>
  {/* Outer massive shell */}
  <Sphere ref={outerRef} args={[7, 64, 64]}>
        <MeshDistortMaterial
          color="#2D1060"
          emissive="#7C5CFC"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={1.2}
          transparent
          opacity={0.12}
          roughness={0}
          metalness={1}
        />
      </Sphere>

      {/* Mid shell */}
    <Sphere ref={midRef} args={[5.5, 48, 48]}>
        <MeshDistortMaterial
          color="#3D1A8C"
          emissive="#9B7EFF"
          emissiveIntensity={0.4}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.010}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Inner shell */}
    <Sphere ref={innerRef} args={[4, 32, 32]}>
        <MeshDistortMaterial
          color="#5B3FD9"
          emissive="#C4B5FD"
          emissiveIntensity={0.5}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.08}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
    </group>
  )
}

function FloatingParticles() {
  const ref = useRef()
  const positions = useRef((() => {
    const arr = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  })())

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#9B7EFF"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function LiquidBackground() {
  return (
  <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
  <Canvas
    style={{ width: '100%', height: '100%' }}
    camera={{ position: [0, 0, 4], fov: 120 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[5, 5, 5]}   intensity={2} color="#9B7EFF" />
        <pointLight position={[-5,-5, 3]}  intensity={1} color="#E879F9" />
        <pointLight position={[0, 0, 6]}   intensity={1} color="#C4B5FD" />
        <LiquidOrb />
        <FloatingParticles />
      </Canvas>

      {/* Extra radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(124,92,252,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(232,121,249,0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}