import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const conversation = [
  { from: 'user', text: 'I don\'t know what to do after 12th. My parents want me to do B.Com but I\'m interested in computers.', delay: 0 },
  { from: 'kai',  text: 'I hear you — and this is one of the most common struggles first-gen students face. The good news? You don\'t have to choose between what you love and what\'s practical. Let me show you some paths that combine both.', delay: 1.2 },
  { from: 'user', text: 'But I scored only 68% in 12th. Will any good college take me?', delay: 2.8 },
  { from: 'kai',  text: '68% is absolutely enough for many excellent programs. BCA, BSc Computer Science, and several private engineering colleges have lower cutoffs. Plus — I found 3 scholarships you may qualify for right now. Want me to walk you through them?', delay: 4.2 },
]

function ChatBubble({ message, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: message.from === 'user' ? 20 : -20, y: 10 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay: message.delay * 0.3, ease: [0.22,1,0.36,1] }}
      className={`flex gap-3 ${message.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {message.from === 'kai' && (
        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
          <Sparkles size={12} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[12.5px] leading-[1.7] ${
          message.from === 'user'
            ? 'bg-violet-600/20 border border-violet-500/20 text-ink-100/80 rounded-tr-sm'
            : 'bg-white/[0.04] border border-white/[0.06] text-ink-100/70 rounded-tl-sm'
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  )
}

export default function KAIChatPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kai" className="relative py-24">
      <div className="section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                Meet KAI
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100 mb-6 leading-[1.1]">
              The older sister <br />
              <span className="gradient-text">who already made it.</span>
            </h2>
            <p className="text-ink-100/35 text-sm leading-[1.85] mb-8 max-w-sm">
              KAI isn't a chatbot. She's an emotionally intelligent AI companion
              who understands Indian colleges, family pressure, financial
              constraints — and speaks to you like a real person, not a product.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {[
                'Understands English, Roman Hindi, and mixed language',
                'Remembers your profile, goals, and past conversations',
                'Available at 3am when the anxiety hits',
                'Never makes you feel embarrassed for asking basics',
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  <span className="text-[12px] text-ink-100/45">{point}</span>
                </motion.div>
              ))}
            </div>
<Link to="/signup" className="btn-primary text-sm">
  Start talking to KAI →
</Link>
          </motion.div>

          {/* Right — Chat */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
            className="relative"
          >
            {/* Chat window */}
            <div className="glass-card rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-violet-500/10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-ink-100/90">KAI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-ink-100/30">Always online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 flex flex-col gap-4 min-h-[320px]">
                {conversation.map((msg, i) => (
                  <ChatBubble key={i} message={msg} index={i} />
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.5 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-3 glass-card rounded-2xl px-4 py-3">
                 <input
  type="text"
  placeholder="Sign up to talk to KAI..."
  readOnly
  onClick={() => window.location.href = '/signup'}
  className="flex-1 bg-transparent text-[12px] text-ink-100/50 placeholder-ink-100/20 outline-none cursor-pointer"
/>
                  <button className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                    <Send size={12} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Glow behind chat */}
            <div className="absolute -inset-4 rounded-3xl pointer-events-none -z-10"
              style={{ background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.12), transparent 70%)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}