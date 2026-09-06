import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [prompt,  setPrompt]  = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      // Show after 30 seconds
      setTimeout(() => setVisible(true), 30000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  //lets see if it works 

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const result = await prompt.userChoice
    if (result.outcome === 'accepted') {
      setVisible(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0   }}
          exit={{    opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className="glass-card rounded-2xl p-4 flex items-center gap-4"
            style={{ border: '0.5px solid rgba(124,92,252,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
              <span className="text-2xl">✨</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-ink-100/90">
                Install KAIROS
              </div>
              <div className="text-[11px] text-ink-100/40">
                Add to home screen for quick access 💜
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleInstall}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}
              >
                Install
              </button>
              <button
                onClick={() => setVisible(false)}
                className="text-ink-100/30 hover:text-ink-100/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}