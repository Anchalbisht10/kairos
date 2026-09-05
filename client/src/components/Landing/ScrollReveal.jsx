import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollReveal({ onComplete }) {
  const [open,  setOpen]  = useState(false)
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true),  1000)
    const t2 = setTimeout(() => setDone(true),  2800)
    const t3 = setTimeout(() => onComplete(),   3600)
    return () => [t1,t2,t3].forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain-overlay"
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width:  i % 3 === 0 ? 2.5 : 1.5,
                  height: i % 3 === 0 ? 2.5 : 1.5,
                  top:  `${5 + (i * 37.3) % 90}%`,
                  left: `${5 + (i * 53.7) % 90}%`,
                  background: i % 2 === 0 ? '#9B7EFF' : '#E879F9',
                  boxShadow: `0 0 4px ${i % 2 === 0 ? '#9B7EFF' : '#E879F9'}`,
                }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{
                  duration: 1.5 + (i % 3),
                  repeat: Infinity,
                  delay: (i * 0.12) % 2,
                }}
              />
            ))}
          </div>

          {/* LEFT CURTAIN */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 z-10"
            style={{
              width: '50%',
              background: 'linear-gradient(135deg, #0D0420 0%, #1A0840 50%, #0D0420 100%)',
              borderRight: '1px solid rgba(155,126,255,0.0)',
            }}
            animate={open ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            {/* Curtain edge glow */}
            <div className="absolute right-0 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(155,126,255,0.6), rgba(232,121,249,0.4), transparent)' }}
            />
            {/* Curtain texture folds */}
            {[15,30,45,60,75].map((pos, i) => (
              <div key={i}
                className="absolute top-0 bottom-0 w-px opacity-20"
                style={{
                  left: `${pos}%`,
                  background: 'linear-gradient(180deg, transparent, rgba(155,126,255,0.3), transparent)',
                }}
              />
            ))}
          </motion.div>

          {/* RIGHT CURTAIN */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 z-10"
            style={{
              width: '50%',
              background: 'linear-gradient(225deg, #0D0420 0%, #1A0840 50%, #0D0420 100%)',
            }}
            animate={open ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.4, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            {/* Curtain edge glow */}
            <div className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(155,126,255,0.6), rgba(232,121,249,0.4), transparent)' }}
            />
            {/* Curtain texture folds */}
            {[25,40,55,70,85].map((pos, i) => (
              <div key={i}
                className="absolute top-0 bottom-0 w-px opacity-20"
                style={{
                  left: `${pos}%`,
                  background: 'linear-gradient(180deg, transparent, rgba(155,126,255,0.3), transparent)',
                }}
              />
            ))}
          </motion.div>

          {/* CENTER CONTENT — visible before curtains open */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-0"
            style={{ background: '#04010E' }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Top line */}
            <motion.div
              className="w-px bg-gradient-to-b from-transparent via-violet-500 to-transparent mb-8"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 60, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Every girl deserves */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 2vw, 18px)',
                color: 'rgba(155,126,255,0.5)',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}
            >
              every girl deserves
            </motion.p>

            {/* KAIROS */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1   }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '10px',
                background: 'linear-gradient(90deg, #9B7EFF, #C4B5FD, #E879F9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
              }}
            >
              KAIROS
            </motion.h1>

            {/* Divider line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="h-px mb-4"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(155,126,255,0.5), transparent)' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: '10px',
                letterSpacing: '3px',
                color: 'rgba(237,232,255,0.2)',
                textTransform: 'uppercase',
              }}
            >
              the sacred moment that changes everything
            </motion.p>

            {/* Bottom line */}
            <motion.div
              className="w-px bg-gradient-to-b from-transparent via-violet-500 to-transparent mt-8"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 60, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}