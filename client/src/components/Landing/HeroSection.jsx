import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import KAICharacter from './KAICharacter'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { n: '40M+', l: 'First-gen students'  },
  { n: '100+', l: 'Real scholarships listed' },
  { n: '24/7', l: 'KAI is always here'  },
]

const bubbles = [
  { tag: '✦ KAI found',      text: 'NSP scholarship — ₹12,000/yr. You qualify!',   side: 'left',  top: '20%' },
  { tag: '✦ Compass result', text: '3 career paths match your profile.',             side: 'right', top: '35%' },
  { tag: '✦ KAI says',       text: '"You\'re not alone. I\'m right here."',         side: 'left',  top: '62%' },
  { tag: '✦ Story shared',   text: 'Priya from Jaipur won her first scholarship.',   side: 'right', top: '65%' },
]

export default function HeroSection() {
  return (
   <motion.section
  className="relative min-h-screen bg-void-950 overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.10) 0%, transparent 65%)' }}
        />
      </div>

      <div className="section relative z-10">
   <div className="grid lg:grid-cols-2 gap-0 items-center min-h-screen pb-10 pt-20 lg:pt-0" style={{ paddingTop: undefined }}>

          {/* LEFT */}
          <div className="flex flex-col justify-center lg:pr-12">

            {/* Eyebrow */}
              <motion.div {...fadeUp(0.9)} className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[3px] text-violet-400 uppercase">
                For first-generation students · India
              </span>
            </motion.div>

            {/* Headline */}
           <motion.div {...fadeUp(1.0)} className="mb-7">
              <p className="text-[13px] font-light text-ink-100/30 tracking-[3px] uppercase mb-2">
                every girl deserves
              </p>
            <h1 className="leading-[1.08] tracking-[-0.3px]"
  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                <span
                  className="gradient-text block"
                  style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontWeight: 900 }}
                >
                  her moment
                </span>
                <span className="text-ink-100 block font-display font-extrabold tracking-[-1px]">
                  to rise.
                </span>
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div {...fadeUp(0.28)} className="w-8 h-px bg-violet-600/40 mb-7" /><motion.div {...fadeUp(1.08)} className="w-8 h-px bg-violet-600/40 mb-7" />
            {/* Sub */}
        <motion.p {...fadeUp(1.1)}
              className="text-[13px] text-ink-100/35 leading-[1.85] max-w-[300px] mb-10 font-light">
              The sacred KAIROS moment — when she decides to
              rise above everything. KAI is the AI older sister
              who already made it through, here for every step.
            </motion.p>

            {/* CTAs */}
<motion.div {...fadeUp(1.2)} className="flex flex-wrap gap-3 mb-12">
              <a href="/signup" className="btn-primary text-[12px] py-3 px-7">
                Find Your Moment <ArrowRight size={13} />
              </a>
              <a href="#kai" className="btn-ghost text-[12px] py-3 px-7">
                Meet KAI
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(1.3)} className="flex gap-8">
              {stats.map(s => (
                <div key={s.n} className="border-l border-violet-500/20 pl-4">
                  <div className="font-display text-[18px] font-extrabold text-violet-300">{s.n}</div>
                  <div className="text-[10px] text-ink-100/25 mt-0.5 tracking-[0.3px]">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

{/* RIGHT — KAI with entrance animation */}
<div className="relative h-[400px] lg:h-screen flex items-center justify-center mt-8 lg:mt-0">

  {/* Vertical separator */}
  <div className="absolute left-0 top-[15%] bottom-[15%] w-px hidden lg:block"
    style={{ background: 'linear-gradient(180deg, transparent, rgba(155,126,255,0.12), transparent)' }}
  />

  {/* KAI entrance — comes in big from center then shrinks to position */}
<motion.div
  initial={{
    scale: 1.1,
    opacity: 0,
    y: 40,
    filter: 'blur(16px)',
  }}
  animate={{
    scale: 1,
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  }}
  transition={{
    duration: 1.6,
    ease: [0.22, 1, 0.36, 1],
    delay: 0.4,
  }}
  className="absolute inset-0"
>
  <KAICharacter />
</motion.div>

  {/* Floating bubbles — appear after KAI settles */}
 {bubbles.map((b, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: b.side === 'left' ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 1.8 + i * 0.15 }}
    className={`absolute z-20 glass-card rounded-2xl px-3.5 py-3 w-[140px]
      hidden sm:block
      ${b.side === 'left' ? 'left-2 lg:left-4' : 'right-2 lg:right-4'}`}
    style={{ top: b.top }}
  >
      <div className="text-[9px] font-semibold text-violet-400 tracking-[0.5px] mb-1">{b.tag}</div>
      <p className="text-[11px] text-ink-100/55 leading-[1.6]">{b.text}</p>
    </motion.div>
  ))}

  {/* KAI label — appears last */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.2, duration: 0.5 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
  >
    <div className="font-display text-[11px] font-bold tracking-[4px] text-ink-100/40">KAI</div>
    <div className="text-[9px] tracking-[2px] text-ink-100/18 uppercase">Your AI Companion</div>
    <div className="flex gap-1.5 mt-1">
      {[0, 150, 300].map(d => (
        <div key={d} className="w-1 h-1 rounded-full bg-violet-500 animate-bounce"
          style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  </motion.div>
</div>
       
        </div>
      </div>


    </motion.section>
  )
}