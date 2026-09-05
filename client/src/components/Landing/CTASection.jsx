import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24">
      <div className="section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative glass-card rounded-3xl px-8 py-16 text-center overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,92,252,0.15), transparent 70%)' }} />

          {/* Floating dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              className="absolute w-1 h-1 rounded-full bg-violet-400"
              style={{
                top: `${20 + i * 12}%`,
                left: `${10 + i * 14}%`,
                boxShadow: '0 0 6px #9B7EFF',
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}
          >
            <Sparkles size={24} className="text-white" />
          </motion.div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-100 mb-5 leading-[1.05]">
            Your <span className="gradient-text">KAIROS moment</span><br />
            is waiting.
          </h2>
          <p className="text-ink-100/35 text-sm max-w-md mx-auto mb-10 leading-relaxed">
        Built for first-generation students who refuse to give up on their dreams.
Real scholarships. Real guidance. Real support.
KAI is ready when you are.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/signup" className="btn-primary text-sm px-10 py-4">
              Begin Your Journey <ArrowRight size={15} />
            </a>
            <a href="#kai" className="btn-ghost text-sm px-10 py-4">
              Meet KAI first
            </a>
          </div>

          <p className="text-ink-100/18 text-[11px] mt-6">
            Free forever. No credit card. No hidden fees.
          </p>
        </motion.div>
      </div>
    </section>
  )
}