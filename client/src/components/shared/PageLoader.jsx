import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border border-violet-500/20" />
          <motion.div
            className="absolute inset-0 rounded-full border-t border-violet-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <p className="text-[11px] text-ink-100/25 tracking-[2px] uppercase">Loading</p>
      </motion.div>
    </div>
  )
}