import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, MessageCircle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 text-center max-w-md">

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-display font-extrabold gradient-text mb-4"
            style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', lineHeight: 1 }}>
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-display font-bold text-xl text-ink-100/80 mb-3">
            This page doesn't exist.
          </h1>
          <p className="text-ink-100/35 text-sm leading-relaxed mb-8">
            But your KAIROS moment does. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary text-sm py-3 px-7 flex items-center gap-2">
              <Home size={14} />
              Back to Home
            </Link>
            <Link to="/chat" className="btn-ghost text-sm py-3 px-7 flex items-center gap-2">
              <MessageCircle size={14} />
              Talk to KAI
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}