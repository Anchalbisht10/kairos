import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { Heart, Globe, Sparkles, ArrowRight } from 'lucide-react'

export default function CreatorPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-80px' })
  const inView2 = useInView(ref2, { once: true, margin: '-80px' })
  const inView3 = useInView(ref3, { once: true, margin: '-80px' })
  const inView4 = useInView(ref4, { once: true, margin: '-80px' })

  return (
    <div className="bg-void-950 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.10) 0%, transparent 70%)' }} />
        </div>

        <div className="section relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                The Creator
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h1 className="font-display font-extrabold leading-[1.08] mb-6"
style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
              <span className="text-ink-100">Built by someone who</span>
              <br />
              <span className="gradient-text">lived the problem.</span>
            </h1>
            <p className="text-ink-100/40 text-base leading-relaxed max-w-xl mx-auto">
              KAIROS was not built in a boardroom. It was built by a first-generation
              girl from Rishikesh who knows exactly what it feels like to have
              no map and no older sister to call.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Creator profile */}
      <section className="py-16 border-t border-violet-500/08">
        <div className="section">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Photo + details */}
              <motion.div
                ref={ref1}
                initial={{ opacity: 0, x: -30 }}
                animate={inView1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                {/* Photo placeholder */}
           <img
  src="/anchal.jpg"
  alt="Anchal Bisht — Founder of KAIROS"
  className="w-full aspect-square object-cover object-top"
/>

                {/* Name + details */}
                <div className="glass-card rounded-2xl p-6"
                  style={{ border: '0.5px solid rgba(155,126,255,0.15)' }}>
                  <h2 className="font-display font-extrabold text-2xl text-ink-100 mb-1">
                    Anchal Bisht
                  </h2>
                  <p className="text-violet-400/60 text-[11px] tracking-[2px] uppercase mb-4">
                    Founder · Designer · Developer
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'From',     value: 'Rishikesh, Uttarakhand' },
                      { label: 'Building', value: 'KAIROS + Chianya'       },
                      { label: 'Mission',  value: 'Educational equity for all' },
                      { label: 'Contact',  value: 'anchal001bisht@gmail.com'        },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[12px]">
                        <span className="text-ink-100/25 w-16 flex-shrink-0">{item.label}</span>
                        <span className="text-ink-100/60">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Story */}
              <motion.div
                ref={ref2}
                initial={{ opacity: 0, x: 30 }}
                animate={inView2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <p className="font-display text-xl italic text-ink-100/70 leading-relaxed mb-6">
                    "I did not choose to build KAIROS.
                    I built it because I had no choice but to."
                  </p>
                </div>

                <p className="text-ink-100/50 text-[13px] leading-[1.95]">
                  I am the first person in my entire family to pursue higher
                  education in the real sense of the word. When it was time to
                  choose my career path, I had no one who truly understood what
                  I was navigating. I listened to cousins and siblings who were
                  themselves confused. I followed advice that came from fear,
                  not knowledge.
                </p>

                <p className="text-ink-100/50 text-[13px] leading-[1.95]">
                  I ended up in a field I never wanted — not because I lacked
                  ability, but because I lacked guidance. I had no map. I had
                  no older sister who had already been through it and come back
                  to help.
                </p>

                <p className="text-ink-100/50 text-[13px] leading-[1.95]">
                  That experience did not break me. It clarified me. I began to
                  see that my story was not unique. Across India — in Tier 2 cities,
                  in semi-rural towns, in families where no one had ever filled
                  a college application form — millions of young people were making
                  the same confused, uninformed decisions I made.
                </p>

                <div className="rounded-2xl p-5"
                  style={{ background: 'rgba(124,92,252,0.06)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
                  <p className="text-ink-100/65 text-[13px] leading-[1.9] italic">
                    "I want to solve problems at the root. Not just help one person —
                    but build something that helps thousands find their own way.
                    That is why I started. That is why I will not stop."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The name origin */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section max-w-3xl mx-auto">
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                The name origin
              </span>
            </div>

            {/* KAIROS */}
            <div className="glass-card rounded-3xl p-8 mb-6"
              style={{ border: '0.5px solid rgba(155,126,255,0.2)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="font-display font-extrabold text-4xl gradient-text tracking-[4px]">
                  KAIROS
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-500/30 to-transparent" />
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { word: 'KAI',  meaning: 'Sea · Ocean · Vast · Limitless' },
                  { word: '+',    meaning: ''                                },
                  { word: 'ROS',  meaning: 'From Greek: sacred moment'      },
                ].map((item, i) => (
                  item.word === '+' ? (
                    <div key={i} className="flex items-center text-ink-100/20 font-display text-2xl">+</div>
                  ) : (
                    <div key={i} className="glass-card rounded-xl px-4 py-3">
                      <div className="font-display font-extrabold text-lg gradient-text mb-1">{item.word}</div>
                      <div className="text-[10px] text-ink-100/35">{item.meaning}</div>
                    </div>
                  )
                ))}
              </div>

              <p className="text-ink-100/50 text-[13px] leading-[1.9] mb-4">
                KAIROS comes from ancient Greek philosophy — <em className="text-ink-100/70">the sacred moment that is different
                from all others. The moment that changes everything.</em> Philosophers and
                theologians used KAIROS to describe the moment a person's destiny shifts.
              </p>
              <p className="text-ink-100/50 text-[13px] leading-[1.9]">
                Every first-generation student has a KAIROS moment — the moment she
                decides to rise above everything she was born into. We are that moment.
              </p>
            </div>

            {/* KAI */}
            <div className="glass-card rounded-3xl p-8"
              style={{ border: '0.5px solid rgba(232,121,249,0.15)' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="font-display font-extrabold text-4xl"
                  style={{ background: 'linear-gradient(90deg, #E879F9, #C4B5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  KAI
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-fuchsia-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    origin:  'Japanese',
                    word:    'Kai (海)',
                    meaning: 'Sea · Ocean — vast, limitless, without boundaries',
                    color:   '#9B7EFF',
                  },
                  {
                    origin:  'Sanskrit',
                    word:    'Kaya (काया)',
                    meaning: 'The vessel that carries knowledge forward',
                    color:   '#E879F9',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl p-4"
                    style={{ background: `${item.color}08`, border: `0.5px solid ${item.color}25` }}>
                    <div className="text-[9px] font-bold tracking-[2px] uppercase mb-1"
                      style={{ color: `${item.color}60` }}>{item.origin}</div>
                    <div className="font-display font-bold text-base mb-1"
                      style={{ color: item.color }}>{item.word}</div>
                    <div className="text-[11px] text-ink-100/40 leading-relaxed">{item.meaning}</div>
                  </div>
                ))}
              </div>

              <p className="text-ink-100/50 text-[13px] leading-[1.9]">
                KAI is the AI companion at the heart of KAIROS. Her name carries
                the vastness of an ocean — because knowledge, like the sea, should
                have no boundaries. And like a vessel, she carries that knowledge
                forward to every student who needs it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two projects */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section max-w-3xl mx-auto">
          <motion.div
            ref={ref4}
            initial={{ opacity: 0, y: 30 }}
            animate={inView4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                The work
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-100 mb-10">
              Two platforms. <span className="gradient-text">One mission.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {/* KAIROS */}
              <div className="glass-card rounded-2xl p-6"
                style={{ border: '0.5px solid rgba(155,126,255,0.2)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-100">KAIROS</div>
                    <div className="text-[10px] text-violet-400/60">Educational Equity Platform</div>
                  </div>
                </div>
                <p className="text-[12px] text-ink-100/40 leading-relaxed mb-4">
                  AI-powered guidance for first-generation students. Career compass,
                  scholarship discovery, KAI companion, anonymous Q&A, peer stories.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['SDG 4', 'SDG 5', 'SDG 10', 'Free Forever'].map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(155,126,255,0.1)', color: '#9B7EFF' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chianya */}
              <div className="glass-card rounded-2xl p-6"
                style={{ border: '0.5px solid rgba(52,211,153,0.15)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #065F52, #34D399)' }}>
                    <Heart size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-ink-100">Chianya</div>
                    <div className="text-[10px] text-emerald-400/60">Forest of Consciousness</div>
                  </div>
                </div>
                <p className="text-[12px] text-ink-100/40 leading-relaxed mb-4">
                  A digital sanctuary for youth mental health. A forest where young
                  people arrive exactly as they are — without explanation, without
                  judgment, without cost.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['SDG 3', 'SDG 10', 'Free Forever'].map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Original work declaration */}
           <div className="rounded-2xl p-6 text-left flex flex-col gap-5"
  style={{ background: 'rgba(124,92,252,0.05)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
  <div className="flex items-center gap-3">
    <Globe size={20} className="text-violet-400 flex-shrink-0" />
    <h3 className="font-display font-bold text-base text-ink-100/80">
      Transparency Statement
    </h3>
  </div>

  {/* Original work */}
  <div>
    <div className="text-[10px] font-bold tracking-[2px] uppercase text-violet-400/50 mb-2">
      Original Work
    </div>
    <p className="text-[12px] text-ink-100/40 leading-relaxed">
      KAIROS — including its name, concept, design, KAI character, codebase,
      and all original content — is the sole original work of Anchal Bisht.
      Created independently from scratch. No copied code, no cloned design,
      no existing platform replicated. Protected under Indian Copyright Act, 1957.
    </p>
  </div>

  {/* Solo founder */}
  <div>
    <div className="text-[10px] font-bold tracking-[2px] uppercase text-violet-400/50 mb-2">
      Solo Founder
    </div>
    <p className="text-[12px] text-ink-100/40 leading-relaxed">
      KAIROS is built, designed, and maintained by one person — Anchal Bisht.
      There is no advisory board, no legal entity registered, no external funding.
      This is a mission-driven independent project at early stage, built with
      conviction and personal resources.
    </p>
  </div>

  {/* Free forever */}
  <div>
    <div className="text-[10px] font-bold tracking-[2px] uppercase text-violet-400/50 mb-2">
      Sustainability Model
    </div>
    <p className="text-[12px] text-ink-100/40 leading-relaxed">
      KAIROS is free forever. There is no monetization plan, no subscription,
      no advertising. The mission is access — not profit. Long-term sustainability
      will be explored through grants, fellowships, and institutional partnerships
      as the platform grows.
    </p>
  </div>

  {/* Language roadmap */}
  <div>
    <div className="text-[10px] font-bold tracking-[2px] uppercase text-violet-400/50 mb-2">
      Language Roadmap
    </div>
    <p className="text-[12px] text-ink-100/40 leading-relaxed">
      KAIROS currently operates in English and understands Hinglish naturally.
      Future plans include support for Hindi, Tamil, Telugu, Bengali, and other
      major Indian languages — to reach students in their most comfortable tongue.
      The platform is India-focused by design, built deep rather than wide.
    </p>
  </div>

  {/* Contact */}
  <div className="pt-3 border-t border-violet-500/10">
    <p className="text-[11px] text-ink-100/25">
      Contact: anchal001bisht@gmail.com · © 2026 Anchal Bisht. All rights reserved.
    </p>
  </div>
</div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-violet-500/08">
        <div className="section text-center">
          <p className="text-ink-100/25 text-sm mb-6 italic font-display">
            "Built for the girl who needed an older sister and found this instead."
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/about" className="btn-ghost text-sm py-2.5 px-6">
              Our Mission
            </Link>
            <Link to="/signup" className="btn-primary text-sm py-2.5 px-6">
              Begin Your Journey <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}