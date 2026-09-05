import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import axios from 'axios'

export default function FeedbackSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/feedback`)
      .then(res => setFeedback(res.data.feedback?.slice(0, 6) || []))
      .catch(() => {})
  }, [])

  if (feedback.length === 0) return null

  return (
    <section className="relative py-24">
      <div className="section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500/30" />
            <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
              What students say
            </span>
            <div className="w-8 h-px bg-violet-500/30" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100">
            Real feedback from <span className="gradient-text">real students.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedback.map((f, i) => (
            <motion.div
              key={f._id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-sm">
                    {si < f.stars ? '⭐' : '☆'}
                  </span>
                ))}
              </div>

              {/* Message */}
              {f.message && (
                <p className="text-[12px] text-ink-100/55 leading-relaxed mb-4">
                  "{f.message}"
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center gap-2">
                <span className="text-xl">{f.emoji}</span>
                <div>
                  <div className="text-[11px] font-semibold text-ink-100/50">
                    {f.isAnonymous ? 'Anonymous Student' : f.displayName}
                  </div>
                  <div className="text-[10px] text-ink-100/25">KAIROS Student</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}