import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import {
  Target, Heart, Globe, BookOpen,
  Users, Award, ArrowRight, Sparkles
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
})

const sdgs = [
  {
    number: 'SDG 4.5',
    title:  'Education Equity',
    desc:   'Free AI guidance for first-generation students in underserved regions of India',
    color:  '#9B7EFF',
  },
  {
    number: 'SDG 5.1',
    title:  'Gender Equality',
    desc:   'Built specifically for girls from Tier 2/3 cities facing systemic barriers',
    color:  '#E879F9',
  },
  {
    number: 'SDG 10.2',
    title:  'Social Inclusion',
    desc:   'Targets students without family networks or financial access to guidance',
    color:  '#C4B5FD',
  },
  {
    number: 'SDG 1.4',
    title:  'Access to Resources',
    desc:   'Connects students to ₹3,000+ crore in unclaimed scholarships annually',
    color:  '#9B7EFF',
  },
]

const stats = [
  { number: '40M+',     label: 'First-generation students in India' },
  { number: '40-50%',   label: 'Of enrolled students are first-gen' },
  { number: '2-3×',     label: 'Higher dropout rate for rural girls' },
  { number: '₹3000Cr+', label: 'In scholarships unclaimed yearly'   },
]

const journey = [
  {
    icon:  Target,
    title: 'The Problem',
    desc:  'First-generation students in Tier 2/3 India lack access to guidance, mentorship, and scholarship information that urban students receive through family networks.',
    color: '#9B7EFF',
  },
  {
    icon:  Sparkles,
    title: 'The Activity',
    desc:  'KAIROS provides AI mentorship through KAI, real scholarship discovery, career guidance, and a safe peer community — all free, all accessible on a basic smartphone.',
    color: '#E879F9',
  },
  {
    icon:  BookOpen,
    title: 'The Output',
    desc:  'Students reached, scholarships discovered, questions answered, career paths found — measurable, real, growing every day.',
    color: '#C4B5FD',
  },
  {
    icon:  Globe,
    title: 'The Impact',
    desc:  'Reduction in education inequality. First-generation students apply to opportunities they would never have found alone. Contribution to SDG 4.5 and SDG 5.1.',
    color: '#9B7EFF',
  },
]

function SectionRef({ children, className }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-void-950 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.10) 0%, transparent 70%)' }} />
        </div>

        <div className="section relative z-10 text-center py-20">
          <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-violet-500/30" />
            <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
              Our Mission
            </span>
            <div className="w-8 h-px bg-violet-500/30" />
          </motion.div>

      <motion.h1 {...fadeUp(0.2)}
            className="font-display font-extrabold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
          >
            <span className="text-ink-100">Education should feel</span>
            <br />
            <span className="gradient-text">safe, warm, and possible.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)}
            className="text-ink-100/40 text-base leading-relaxed max-w-2xl mx-auto mb-10"
          >
            KAIROS exists because 40 million first-generation students in India are navigating
            higher education completely alone — without a parent, relative, or mentor who has
            been through it before them. We built the older sister they never had.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/signup" className="btn-primary text-sm">
              Join KAIROS <ArrowRight size={14} />
            </Link>
            <Link to="/scholarships" className="btn-ghost text-sm">
              Find Scholarships
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The problem — real numbers */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section">
          <SectionRef className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                The scale of the problem
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100 mb-4">
              The gap is <span className="gradient-text">real and measurable.</span>
            </h2>
            <p className="text-ink-100/35 text-sm max-w-xl mx-auto">
              These are not projections. These are documented realities affecting
              millions of students across India right now.
            </p>
          </SectionRef>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <SectionRef key={i}>
                <div className="glass-card rounded-2xl p-6 text-center h-full">
                  <div className="font-display font-extrabold text-3xl gradient-text mb-2">{s.number}</div>
                  <div className="text-[11px] text-ink-100/35 leading-relaxed">{s.label}</div>
                </div>
              </SectionRef>
            ))}
          </div>
        </div>
      </section>

      {/* Theory of Change */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section">
          <SectionRef className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                Theory of Change
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100">
              How KAIROS creates <span className="gradient-text">lasting impact.</span>
            </h2>
          </SectionRef>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {journey.map((item, i) => {
              const Icon = item.icon
              const ref    = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-60px' })
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="glass-card rounded-2xl p-6 relative"
                >
                  {/* Step number */}
                  <div className="text-[10px] font-bold tracking-[2px] mb-4"
                    style={{ color: `${item.color}40` }}>
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}15`, border: `0.5px solid ${item.color}30` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>

                  <h3 className="font-display font-bold text-base text-ink-100/90 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-ink-100/35 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Arrow connector */}
                  {i < journey.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={16} className="text-violet-500/30" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section">
          <SectionRef className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                Global Development Alignment
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100 mb-4">
              Aligned with <span className="gradient-text">UN Sustainable Development Goals.</span>
            </h2>
            <p className="text-ink-100/35 text-sm max-w-xl mx-auto">
              KAIROS directly addresses four UN SDGs through technology,
              community, and accessible AI-powered guidance.
            </p>
          </SectionRef>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sdgs.map((sdg, i) => {
              const ref    = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-60px' })
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 flex gap-5"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
                      style={{ background: `${sdg.color}15`, border: `0.5px solid ${sdg.color}30` }}>
                      <div className="text-[9px] font-bold tracking-wider"
                        style={{ color: `${sdg.color}70` }}>UN</div>
                      <div className="font-display font-extrabold text-[11px]"
                        style={{ color: sdg.color }}>{sdg.number}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14px] text-ink-100/85 mb-2">{sdg.title}</h3>
                    <p className="text-[12px] text-ink-100/35 leading-relaxed">{sdg.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* UNESCO note */}
          <SectionRef className="mt-8">
            <div className="glass-card rounded-2xl p-6 text-center"
              style={{ border: '0.5px solid rgba(155,126,255,0.2)' }}>
              <Globe size={24} className="text-violet-400 mx-auto mb-3" />
              <p className="text-[13px] text-ink-100/50 leading-relaxed max-w-2xl mx-auto">
                KAIROS was built in alignment with UNESCO's commitment to inclusive and equitable
                quality education and the promotion of lifelong learning opportunities for all —
                with a specific focus on girls and marginalized communities in South Asia.
              </p>
            </div>
          </SectionRef>
        </div>
      </section>

     <div className="glass-card rounded-3xl p-10 text-left">
  <div className="flex items-center gap-4 mb-8">
    <div className="text-5xl">🌟</div>
    <div>
      <h2 className="font-display font-extrabold text-2xl text-ink-100">
        Anchal Bisht
      </h2>
      <p className="text-violet-400/60 text-[12px] tracking-wider uppercase mt-1">
        Builder · First-Generation Student · India
      </p>
    </div>
  </div>

  <div className="space-y-5">
    <p className="text-ink-100/60 text-[14px] leading-[1.9]">
      I built KAIROS because I lived the problem.
    </p>

    <p className="text-ink-100/45 text-[13px] leading-[1.9]">
      I am the first person in my entire family to pursue proper higher education.
      And when it was time to choose my path, I had no one who truly understood
      what I was going through. I listened to siblings and cousins who didn't know
      themselves. I ended up in a field I never wanted. Not because I wasn't capable —
      but because I had no guidance, no map, no older sister who had already been through it.
    </p>

    <p className="text-ink-100/45 text-[13px] leading-[1.9]">
      I don't want anyone to go through that confusion. It doesn't matter if you are
      poor or rich, girl or boy, from a village or a city. What matters is that you
      are taking a stand for yourself — and you deserve a proper platform to stand on.
    </p>

    <p className="text-ink-100/45 text-[13px] leading-[1.9]">
      KAIROS is not just for first-generation students. It is for every person who
      is fighting for themselves. Every girl who wants to be independent. Every boy
      who refuses to give up. Every young person who thinks more deeply than the
      world around them — and deserves the tools to act on that depth.
    </p>

    <p className="text-ink-100/45 text-[13px] leading-[1.9]">
      My goal was never to build something only for India. I want this to matter
      globally. Because the problem of young people being left behind without
      guidance, without voice, without opportunity — that is not an Indian problem.
      That is a human problem.
    </p>

    <div className="border-l-2 border-violet-500/30 pl-5 my-6">
      <p className="text-ink-100/70 text-[14px] leading-[1.9] italic font-display">
        "I want to solve problems at the root. Not just help one person —
        but build something that helps thousands find their own way.
        That is why I started. That is why I won't stop."
      </p>
      <p className="text-violet-400/50 text-[11px] mt-2 tracking-wider">
        — Anchal Bisht, Builder of KAIROS
      </p>
    </div>

    <p className="text-ink-100/35 text-[12px] leading-[1.9]">
      KAIROS is part of a larger vision — building technology that serves people,
      not just companies. Alongside KAIROS, I am building Chianya — a youth mental
      health companion that feels like a forest, a home, a place of consciousness.
      Because the problems young people face are connected. Guidance, mental health,
      opportunity — they all belong together.
    </p>
  </div>

  <div className="w-full h-px mt-8 mb-6"
    style={{ background: 'linear-gradient(90deg, transparent, rgba(155,126,255,0.2), transparent)' }}
  />

  <p className="text-[11px] text-ink-100/20 text-center italic">
    Built with code, conviction, and the belief that every young person
    deserves a fighting chance. 💜
  </p>
</div>

      {/* CTA */}
      <section className="py-20 border-t border-violet-500/08">
        <div className="section text-center">
          <SectionRef>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100 mb-4">
              Be part of the <span className="gradient-text">movement.</span>
            </h2>
            <p className="text-ink-100/35 text-sm mb-8 max-w-md mx-auto">
              Every student who finds a scholarship, every girl who stays in college,
              every question answered at 3am — that is the impact KAIROS is building toward.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/signup" className="btn-primary text-sm px-8 py-4">
                Start Your Journey <ArrowRight size={14} />
              </Link>
              <Link to="/scholarships" className="btn-ghost text-sm px-8 py-4">
                Find Scholarships
              </Link>
            </div>
          </SectionRef>
        </div>
      </section>

      <Footer />
    </div>
  )
}