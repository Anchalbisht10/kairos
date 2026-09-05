import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

// 3D living orb behind KAI
function LivingOrb() {
  const outerRef = useRef()
  const midRef   = useRef()
  const coreRef  = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    outerRef.current.rotation.y = t * 0.2
    outerRef.current.rotation.z = t * 0.1
    midRef.current.rotation.y   = -t * 0.3
    midRef.current.rotation.x   = t * 0.15
    coreRef.current.rotation.y  = t * 0.4
  })

  return (
    <group>
      {/* Outer shell */}
      <Sphere ref={outerRef} args={[2.2, 64, 64]}>
        <MeshDistortMaterial
          color="#3D1A8C"
          emissive="#7C5CFC"
          emissiveIntensity={0.6}
          distort={0.45}
          speed={1.5}
          transparent
          opacity={0.15}
          roughness={0}
          metalness={1}
        />
      </Sphere>

      {/* Mid shell */}
      <Sphere ref={midRef} args={[1.7, 48, 48]}>
        <MeshDistortMaterial
          color="#5B3FD9"
          emissive="#9B7EFF"
          emissiveIntensity={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Core */}
      <Sphere ref={coreRef} args={[1.1, 32, 32]}>
        <MeshDistortMaterial
          color="#7C5CFC"
          emissive="#C4B5FD"
          emissiveIntensity={1.2}
          distort={0.2}
          speed={3}
          transparent
          opacity={0.25}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbital rings */}
      <OrbRing radius={2.4} speed={0.4}  color="#9B7EFF" tilt={[0.4, 0, 0]}      />
      <OrbRing radius={2.8} speed={0.25} color="#E879F9" tilt={[1.1, 0.3, 0.2]}  />
      <OrbRing radius={3.2} speed={0.18} color="#C4B5FD" tilt={[0.6, 1.0, 0.4]}  />

      {/* Particles */}
      <OrbParticles />
    </group>
  )
}

function OrbRing({ radius, speed, color, tilt }) {
  const dotRef = useRef()
  const angle  = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angle.current += delta * speed
    if (dotRef.current) {
      dotRef.current.position.x = Math.cos(angle.current) * radius
      dotRef.current.position.z = Math.sin(angle.current) * radius
    }
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 128]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={1} transparent opacity={0.2}
        />
      </mesh>
      <mesh ref={dotRef} position={[radius, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} />
      </mesh>
    </group>
  )
}

function OrbParticles() {
  const ref = useRef()
  const positions = useRef((() => {
    const arr = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      const r     = 2.5 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.random() * Math.PI
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  })())

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.06
    ref.current.rotation.x = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9B7EFF" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Floating sparkle
function FloatingSparkle({ x, y, delay, color }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-20"
      style={{ left: x, top: y, background: color, boxShadow: `0 0 8px ${color}` }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -30, -60] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  )
}

// Orbiting dot around KAI
function OrbitingDot({ index }) {
  const colors   = ['#9B7EFF','#E879F9','#C4B5FD','#9B7EFF','#E879F9','#C4B5FD']
  const radius   = 135 + index * 16
  const duration = 6 + index * 1.5
  const delay    = index * 0.8
  return (
    <motion.div
      className="absolute w-2 h-2 rotate-45 pointer-events-none z-20"
      style={{ background: colors[index], boxShadow: `0 0 10px ${colors[index]}, 0 0 20px ${colors[index]}80` }}
      animate={{
        x: [0,1,2,3,4].map(s => Math.cos(s * Math.PI * 0.5) * radius),
        y: [0,1,2,3,4].map(s => Math.sin(s * Math.PI * 0.5) * radius),
        rotate: [0, 180, 360],
        scale:  [1, 1.4, 1, 1.4, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    />
  )
}

export default function KAICharacter() {
  const containerRef = useRef(null)
  const [blink,   setBlink]   = useState(false)
  const [eyeGlow, setEyeGlow] = useState(false)

  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 })
  const rotateY = useTransform(springX, [-200, 200], [-14, 14])
  const rotateX = useTransform(springY, [-200, 200], [10, -10])

  useEffect(() => {
    const b = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3500)
    return () => clearInterval(b)
  }, [])

  useEffect(() => {
    const g = setInterval(() => {
      setEyeGlow(true)
      setTimeout(() => setEyeGlow(false), 800)
    }, 2500)
    return () => clearInterval(g)
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const sparkles = [
    { x: '12%', y: '18%', delay: 0,   color: '#9B7EFF' },
    { x: '78%', y: '14%', delay: 0.7, color: '#E879F9' },
    { x: '8%',  y: '52%', delay: 1.4, color: '#C4B5FD' },
    { x: '82%', y: '48%', delay: 0.3, color: '#9B7EFF' },
    { x: '18%', y: '74%', delay: 1.1, color: '#E879F9' },
    { x: '72%', y: '68%', delay: 1.9, color: '#C4B5FD' },
    { x: '42%', y: '8%',  delay: 0.5, color: '#9B7EFF' },
    { x: '86%', y: '28%', delay: 1.7, color: '#E879F9' },
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
    >
      {/* Sparkles */}
      {sparkles.map((s, i) => <FloatingSparkle key={i} {...s} />)}

      {/* ── LAYER 1: Three.js orb behind KAI ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.05} />
          <pointLight position={[3, 4, 4]}   intensity={4}   color="#9B7EFF" />
          <pointLight position={[-3,-2, 3]}  intensity={2.5} color="#E879F9" />
          <pointLight position={[0, 3, 5]}   intensity={2}   color="#C4B5FD" />
          <pointLight position={[0,-3, 2]}   intensity={1.5} color="#7C5CFC" />
          <LivingOrb />
        </Canvas>
      </div>

      {/* ── LAYER 2: KAI SVG on top ── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          rotateY, rotateX,
          perspective: 800,
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 0 40px rgba(124,92,252,0.8))',
          zIndex: 10,
          position: 'relative',
        }}
        whileHover={{ scale: 1.04 }}
      >
        <svg width="240" height="320" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#F5D5C8"/>
              <stop offset="100%" stopColor="#E8B8A4"/>
            </radialGradient>
            <radialGradient id="hairGrad2" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#2D1060"/>
              <stop offset="100%" stopColor="#0D0420"/>
            </radialGradient>
            <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9B7EFF" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="skirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3D1A8C"/>
              <stop offset="100%" stopColor="#1E0D50"/>
            </linearGradient>
            <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B3FD9"/>
              <stop offset="100%" stopColor="#2D1060"/>
            </linearGradient>
            <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#9B7EFF" stopOpacity="0"/>
              <stop offset="50%"  stopColor="#C4B5FD" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#9B7EFF" stopOpacity="0"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Ground glow */}
          <ellipse cx="100" cy="248" rx="55" ry="10" fill="url(#glowGrad)" opacity="0.5"/>

          {/* HAIR BACK */}
          <ellipse cx="100" cy="74" rx="40" ry="44" fill="url(#hairGrad2)"/>
          <ellipse cx="100" cy="55" rx="36" ry="28" fill="#0D0420"/>
          <ellipse cx="100" cy="48" rx="30" ry="22" fill="#0D0420"/>
          <ellipse cx="100" cy="42" rx="26" ry="18" fill="#1A0840"/>
          <path d="M62 80 Q46 115 48 165 Q50 182 58 188 Q64 170 66 140 Q68 110 70 85Z" fill="#0D0420"/>
          <path d="M138 80 Q154 115 152 165 Q150 182 142 188 Q136 170 134 140 Q132 110 130 85Z" fill="#0D0420"/>

          {/* NECK */}
          <rect x="91" y="112" width="18" height="18" rx="4" fill="url(#skinGrad)"/>

          {/* DRESS */}
          <path d="M65 128 Q60 145 58 165 Q56 185 58 202 Q70 208 100 208 Q130 208 142 202 Q144 185 142 165 Q140 145 135 128 Q118 136 100 136 Q82 136 65 128Z" fill="url(#dressGrad)"/>
          <motion.path
            d="M65 128 Q60 145 58 165 Q56 185 58 202 Q70 208 100 208 Q130 208 142 202 Q144 185 142 165 Q140 145 135 128 Q118 136 100 136 Q82 136 65 128Z"
            fill="url(#shimmerGrad)"
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
          <path d="M82 128 Q100 141 118 128 L112 136 Q100 144 88 136Z" fill="#C4B5FD" opacity="0.5"/>
          <path d="M80 156 Q100 159 120 156" stroke="#9B7EFF" strokeWidth="1.5" strokeOpacity="0.4" fill="none"/>
          <path d="M78 170 Q100 173 122 170" stroke="#9B7EFF" strokeWidth="1" strokeOpacity="0.3" fill="none"/>

          {/* Chest gem */}
          <motion.polygon points="100,148 106,155 100,162 94,155" fill="#C4B5FD" filter="url(#glow)"
            animate={{ opacity:[0.9,1,0.9], scale:[1,1.15,1] }}
            transition={{ duration:2, repeat:Infinity }}
            style={{ transformOrigin:'100px 155px' }}
          />

          {/* SKIRT */}
          <path d="M58 202 Q54 218 52 232 Q70 240 100 242 Q130 240 148 232 Q146 218 142 202 Q130 208 100 208 Q70 208 58 202Z" fill="url(#skirtGrad)"/>
          <path d="M52 232 Q70 244 100 246 Q130 244 148 232" stroke="#9B7EFF" strokeWidth="1.5" strokeOpacity="0.5" fill="none" filter="url(#glow)"/>

          {/* ARMS */}
          <path d="M65 133 Q50 144 46 162 Q44 170 48 175 Q54 168 59 157 Q64 144 69 136Z" fill="url(#skinGrad)"/>
          <circle cx="47" cy="177" r="7.5" fill="url(#skinGrad)"/>
          <path d="M135 133 Q150 144 154 162 Q156 170 152 175 Q146 168 141 157 Q136 144 131 136Z" fill="url(#skinGrad)"/>
          <circle cx="153" cy="177" r="7.5" fill="url(#skinGrad)"/>

          {/* HEAD */}
          <ellipse cx="100" cy="80" rx="34" ry="36" fill="url(#skinGrad)"/>
          <ellipse cx="67" cy="82" rx="5" ry="6" fill="url(#skinGrad)"/>
          <ellipse cx="133" cy="82" rx="5" ry="6" fill="url(#skinGrad)"/>

          {/* HAIR FRONT */}
          <path d="M66 72 Q66 44 100 40 Q134 44 134 72 Q120 60 100 59 Q80 60 66 72Z" fill="url(#hairGrad2)"/>
          <path d="M70 65 Q72 42 100 38 Q128 42 130 65 Q115 55 100 54 Q85 55 70 65Z" fill="#0D0420"/>
          <ellipse cx="100" cy="46" rx="28" ry="16" fill="#0D0420"/>
          {/* === GRADUATION CAP === */}
          {/* Cap board — flat top */}
          <motion.rect
            x="62" y="30" width="76" height="8" rx="2"
            fill="#1A0840"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(124,92,252,0.4))' }}
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '100px 34px' }}
          />
          {/* Cap board shine */}
          <rect x="63" y="31" width="74" height="2" rx="1" fill="rgba(155,126,255,0.3)" />

          {/* Cap top center bump */}
          <rect x="88" y="22" width="24" height="10" rx="2" fill="#120830" />

          {/* Tassel string */}
          <motion.line
            x1="128" y1="34" x2="134" y2="52"
            stroke="#E879F9" strokeWidth="1.5" strokeLinecap="round"
            animate={{ x2: [132, 136, 132], y2: [50, 54, 50] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Tassel end */}
          <motion.circle
            cx="134" cy="54" r="3"
            fill="#E879F9"
            style={{ filter: 'drop-shadow(0 0 4px #E879F9)' }}
            animate={{ cx: [132, 136, 132], cy: [52, 56, 52] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Tassel fringe */}
          <motion.g
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <line x1="132" y1="54" x2="130" y2="62" stroke="#E879F9" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
            <line x1="134" y1="54" x2="134" y2="63" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
            <line x1="136" y1="54" x2="138" y2="62" stroke="#9B7EFF" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
          </motion.g>
          <motion.circle cx="76" cy="52" r="3.5" fill="#9B7EFF" filter="url(#glow)"
            animate={{ opacity:[0.9,1,0.9], r:[3.5,4.2,3.5] }}
            transition={{ duration:2, repeat:Infinity, delay:0.3 }}
          />
          <motion.circle cx="124" cy="52" r="3.5" fill="#E879F9" filter="url(#glow)"
            animate={{ opacity:[0.9,1,0.9], r:[3.5,4.2,3.5] }}
            transition={{ duration:2, repeat:Infinity, delay:0.8 }}
          />

          {/* EYES */}
          <ellipse cx="87" cy="82" rx="9.5" ry="9.5" fill="white"/>
          {blink ? (
            <ellipse cx="87" cy="82" rx="9.5" ry="2" fill="#1A0840"/>
          ) : (
            <>
              <ellipse cx="87" cy="83" rx="7" ry="7.5" fill="#2D1060"/>
              <ellipse cx="87" cy="84" rx="4.5" ry="5" fill="#1A0840"/>
              <circle cx="83.5" cy="80.5" r="2.2" fill="white" opacity="0.95"/>
              <circle cx="90" cy="85.5" r="1.2" fill="white" opacity="0.5"/>
              <ellipse cx="87" cy="83" rx="7" ry="7.5" fill="#9B7EFF" opacity={eyeGlow ? 0.5 : 0.18}/>
            </>
          )}
          <ellipse cx="113" cy="82" rx="9.5" ry="9.5" fill="white"/>
          {blink ? (
            <ellipse cx="113" cy="82" rx="9.5" ry="2" fill="#1A0840"/>
          ) : (
            <>
              <ellipse cx="113" cy="83" rx="7" ry="7.5" fill="#2D1060"/>
              <ellipse cx="113" cy="84" rx="4.5" ry="5" fill="#1A0840"/>
              <circle cx="109.5" cy="80.5" r="2.2" fill="white" opacity="0.95"/>
              <circle cx="116" cy="85.5" r="1.2" fill="white" opacity="0.5"/>
              <ellipse cx="113" cy="83" rx="7" ry="7.5" fill="#E879F9" opacity={eyeGlow ? 0.5 : 0.18}/>
            </>
          )}

          {/* Eyelashes */}
          <path d="M78 77 Q80 73 83 75" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M82 74 Q85 70 88 72" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M88 73 Q91 70 93 73" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M103 75 Q105 72 108 74" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M109 73 Q112 70 115 72" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M115 72 Q118 70 120 73" stroke="#1A0840" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

          {/* Eyebrows */}
          <path d="M79 72 Q87 67 95 71" stroke="#2D1060" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <path d="M105 71 Q113 67 121 72" stroke="#2D1060" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

          {/* Nose + Mouth */}
          <path d="M97 93 Q100 97 103 93" stroke="#D4A090" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d="M91 102 Q100 110 109 102" stroke="#C4826E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          <path d="M93 102 Q100 107 107 102" fill="#E8A090" opacity="0.35"/>

          {/* Blush */}
          <ellipse cx="77" cy="94" rx="8.5" ry="5" fill="#FFB3A0" opacity="0.32"/>
          <ellipse cx="123" cy="94" rx="8.5" ry="5" fill="#FFB3A0" opacity="0.32"/>
        </svg>
      </motion.div>

      {/* Orbiting dots on top */}
      {[0,1,2,3,4,5].map(i => <OrbitingDot key={i} index={i} />)}

      {/* Breathing glow */}
      <motion.div
        className="absolute w-56 h-56 rounded-full pointer-events-none z-0"
        animate={{ scale:[1,1.15,1], opacity:[0.15,0.35,0.15] }}
        transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
        style={{ background:'radial-gradient(ellipse, rgba(155,126,255,0.45) 0%, transparent 70%)' }}
      />
    </div>
  )
}