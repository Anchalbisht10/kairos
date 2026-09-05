import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const emojis = [
  { emoji: '🤩', label: 'Amazing'  },
  { emoji: '😊', label: 'Happy'    },
  { emoji: '😐', label: 'Okay'     },
  { emoji: '😕', label: 'Confused' },
  { emoji: '💜', label: 'Grateful' },
  { emoji: '🙏', label: 'Thankful' },
]

export default function FeedbackWidget() {
  const { user } = useAuth()
  const [open,          setOpen]          = useState(false)
  const [stars,         setStars]         = useState(0)
  const [hoveredStar,   setHoveredStar]   = useState(0)
  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [message,       setMessage]       = useState('')
  const [isAnonymous,   setIsAnonymous]   = useState(true)
  const [submitting,    setSubmitting]    = useState(false)
  const [submitted,     setSubmitted]     = useState(false)

  const handleSubmit = async () => {
    if (!stars)         return toast.error('Please give a star rating 💜')
    if (!selectedEmoji) return toast.error('Please pick an emoji 💜')
    setSubmitting(true)
    try {
      await axios.post('/feedback', { stars, emoji: selectedEmoji.emoji, message, isAnonymous })
      setSubmitted(true)
      setTimeout(() => {
        setOpen(false)
        setSubmitted(false)
        setStars(0)
        setSelectedEmoji(null)
        setMessage('')
      }, 2500)
    } catch {
      toast.error('Could not submit — please try again')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSubmitted(false)
    setStars(0)
    setSelectedEmoji(null)
    setMessage('')
  }

  return (
    <>
      {/* Floating tab button — RIGHT SIDE */}
      <motion.button
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0  }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => setOpen(!open)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center gap-2 py-3 px-3 rounded-l-2xl"
        style={{
          background:      'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
          boxShadow:       '-4px 0 20px rgba(124,92,252,0.3)',
          writingMode:     'vertical-rl',
          textOrientation: 'mixed',
        }}
      >
        <MessageCircle size={14} className="text-white rotate-90" />
        <span className="text-white text-[10px] font-semibold tracking-wider">
          Feedback
        </span>
      </motion.button>

      {/* Panel — opens to the LEFT of the tab, on the RIGHT side of screen */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
           className="fixed inset-0 z-40"
style={{ background: 'rgba(4,1,14,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            />

            {/* Widget panel */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              exit={{    opacity: 0, x: 40, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
className="fixed right-10 z-50 w-80"
style={{
  top: '50%',
  transform: 'translateY(-50%)',
  maxHeight: '85vh',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgba(155,126,255,0.3) transparent',
}}
              style={{ maxHeight: '88vh', overflowY: 'auto', scrollbarWidth: 'none' }}
              onClick={e => e.stopPropagation()}
            >
             <div className="rounded-3xl"
                style={{
                  background: '#0A0125',
                  border: '0.5px solid rgba(124,92,252,0.25)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                }}>

                {/* Header */}
                <div className="px-5 py-4 flex items-center justify-between border-b border-violet-500/10"
                  style={{ background: 'rgba(124,92,252,0.08)' }}>
                  <div>
                    <div className="font-display font-bold text-sm text-ink-100">
                      Share your thoughts 💜
                    </div>
                    <div className="text-[10px] text-ink-100/35 mt-0.5">
                      Your feedback shapes KAIROS
                    </div>
                  </div>
                  {/* CLOSE BUTTON */}
                  <button
                    onClick={handleClose}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
                  >
                    <X size={14} className="text-ink-100/50" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1   }}
                      className="text-center py-8"
                    >
                      <div className="text-5xl mb-3">💜</div>
                      <div className="font-display font-bold text-base text-ink-100 mb-1">
                        Thank you so much!
                      </div>
                      <div className="text-[12px] text-ink-100/40 leading-relaxed">
                        Your feedback helps us build a better KAIROS for every student.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col gap-5">

                      {/* Stars */}
                      <div>
                        <div className="text-[11px] font-semibold text-ink-100/40 uppercase tracking-wider mb-3">
                          How was your experience?
                        </div>
                        <div className="flex gap-2">
                          {[1,2,3,4,5].map(star => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setStars(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              className="text-2xl transition-all duration-150"
                            >
                              {star <= (hoveredStar || stars) ? '⭐' : '☆'}
                            </motion.button>
                          ))}
                        </div>
                        {stars > 0 && (
                          <div className="text-[10px] text-violet-400 mt-1">
                            {stars === 5 ? 'Amazing! 🎉' :
                             stars === 4 ? 'Great! 😊' :
                             stars === 3 ? 'Good 👍' :
                             stars === 2 ? 'Could be better 😐' :
                             'Sorry to hear that 💜'}
                          </div>
                        )}
                      </div>

                      {/* Emoji */}
                      <div>
                        <div className="text-[11px] font-semibold text-ink-100/40 uppercase tracking-wider mb-3">
                          How are you feeling?
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {emojis.map(e => (
                            <motion.button
                              key={e.emoji}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedEmoji(e)}
                              className="flex flex-col items-center p-2 rounded-xl transition-all"
                              style={{
                                background: selectedEmoji?.emoji === e.emoji
                                  ? 'rgba(124,92,252,0.2)'
                                  : 'rgba(255,255,255,0.03)',
                                border: selectedEmoji?.emoji === e.emoji
                                  ? '1px solid rgba(124,92,252,0.4)'
                                  : '1px solid rgba(255,255,255,0.06)',
                              }}
                            >
                              <span className="text-xl">{e.emoji}</span>
                            </motion.button>
                          ))}
                        </div>
                        {selectedEmoji && (
                          <div className="text-[10px] text-violet-400 mt-1">
                            Feeling {selectedEmoji.label}
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <div className="text-[11px] font-semibold text-ink-100/40 uppercase tracking-wider mb-2">
                          Anything to add? (optional)
                        </div>
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Tell us what helped, what can be better, or just say hi 💜"
                          rows={3}
                          className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-3 py-2.5 text-[12px] text-ink-100/70 placeholder-ink-100/20 outline-none resize-none focus:border-violet-500/40 transition-colors leading-relaxed"
                        />
                      </div>

                      {/* Anonymous toggle */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setIsAnonymous(!isAnonymous)}
                          className="w-9 h-5 rounded-full relative flex-shrink-0 transition-all duration-300"
                          style={{
                            background: isAnonymous
                              ? 'linear-gradient(135deg, #7C5CFC, #9B7EFF)'
                              : 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <div
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300"
                            style={{ left: isAnonymous ? '18px' : '2px' }}
                          />
                        </div>
                        <span className="text-[11px] text-ink-100/40">
                          {isAnonymous ? 'Posting anonymously 🔒' : 'Posting with your name'}
                        </span>
                      </label>

                      {/* Submit */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full py-3 rounded-xl font-semibold text-[13px] text-white flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)',
                          boxShadow:  '0 4px 20px rgba(124,92,252,0.3)',
                          opacity:    submitting ? 0.7 : 1,
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Feedback'}
                        <Send size={13} />
                      </motion.button>

                      <p className="text-[10px] text-ink-100/18 text-center">
                        Feedback is public and sorted by stars ⭐
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}