import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { number: '4 Crore+', label: 'First-generation students in India',    desc: 'navigating college without guidance' },
  { number: '500+',     label: 'Real scholarships catalogued',           desc: 'with plain English explanations' },
  { number: '₹3,000 Cr', label: 'In scholarships go unclaimed yearly',  desc: 'because students don\'t know they exist' },
  { number: '24/7',     label: 'KAI is always here',                     desc: 'even at 3am when anxiety hits' },
]

function StatCard({ number, label, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22,1,0.36,1] }}
      className="relative p-6 rounded-2xl glass-card group hover:border-violet-500/30 transition-all duration-300"
    >
      <div className="text-[11px] font-semibold tracking-[2px] text-violet-500/40 uppercase mb-3">
        0{index + 1}
      </div>
      <div className="font-display font-extrabold text-4xl gradient-text mb-2">
        {number}
      </div>
      <div className="text-ink-100/70 font-semibold text-sm mb-1">{label}</div>
      <div className="text-ink-100/30 text-xs leading-relaxed">{desc}</div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(124,92,252,0.06), transparent 70%)' }}
      />
    </motion.div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500/30" />
            <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
              The problem we're solving
            </span>
            <div className="w-8 h-px bg-violet-500/30" />
          </div>
<h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-100 mb-4">
            The gap is <span className="gradient-text">real.</span>
          </h2>
          <p className="text-ink-100/35 text-sm max-w-md mx-auto leading-relaxed">
            Millions of first-gen students fall through the cracks every year.
            KAIROS exists to catch them.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}