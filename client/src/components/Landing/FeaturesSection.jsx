import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, Compass, Award, BookOpen, HelpCircle, User } from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Talk to KAI',
    desc: 'Your AI older sister. Warm, patient, judgment-free. She understands Indian colleges, family pressure, financial constraints — and speaks to you like a real person.',
    tag: 'AI Companion',
    color: '#9B7EFF',
    href: '/chat',
  },
  {
    icon: Compass,
    number: '02',
    title: 'Career Compass',
    desc: 'A gentle guided journey to discover realistic career paths that actually fit your life — your marks, your city, your family situation, your dreams.',
    tag: 'Career Guidance',
    color: '#E879F9',
    href: '/compass',
  },
  {
    icon: Award,
    number: '03',
    title: 'Scholarships Hub',
    desc: '500+ real Indian scholarships. NSP, state government, NGO, girl-specific. Plain English. Step-by-step applications. Deadline reminders. Zero jargon.',
    tag: 'Financial Aid',
    color: '#C4B5FD',
    href: '/scholarships',
  },
  {
    icon: BookOpen,
    number: '04',
    title: 'Real Stories',
    desc: 'First-gen girls who made it through — their real stories, their struggles, their wins. So you know it\'s possible. So you know you\'re not alone.',
    tag: 'Community',
    color: '#9B7EFF',
    href: '/stories',
  },
  {
    icon: HelpCircle,
    number: '05',
    title: 'Ask Anything',
    desc: 'Completely anonymous Q&A. No login needed. No question is too basic or too embarrassing. Ask what you\'ve always been afraid to ask.',
    tag: 'Safe Space',
    color: '#E879F9',
    href: '/ask',
  },
  {
    icon: User,
    number: '06',
    title: 'My KAIROS',
    desc: 'Your personal dashboard. Track scholarship applications, saved career paths, KAI conversations, goals and milestones — all in one warm space.',
    tag: 'Dashboard',
    color: '#C4B5FD',
    href: '/dashboard',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22,1,0.36,1] }}
   className="glass-card rounded-2xl p-6 hover:border-violet-500/25 transition-all duration-400 cursor-pointer"
whileHover={{ y: -4 }}
onClick={() => window.location.href = feature.href}
    >
      {/* Number */}
      <div className="text-[10px] font-bold tracking-[2px] text-violet-500/25 mb-4">
        {feature.number}
      </div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${feature.color}15`,
          border: `0.5px solid ${feature.color}30`,
        }}
      >
        <Icon size={18} style={{ color: feature.color }} />
      </div>

      {/* Content */}
      <div className="text-[10px] font-semibold tracking-[2px] uppercase mb-2"
        style={{ color: `${feature.color}80` }}>
        {feature.tag}
      </div>
      <h3 className="font-display font-bold text-[17px] text-ink-100/90 mb-3">
        {feature.title}
      </h3>
      <p className="text-[12px] text-ink-100/35 leading-[1.75]">
        {feature.desc}
      </p>

      {/* Arrow */}
      <div className="mt-5 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: feature.color }}>
        Explore →
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${feature.color}08, transparent 70%)` }}
      />
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="relative py-24">
      <div className="section">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-violet-500/30" />
            <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
              Everything you need
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100 max-w-md">
              One platform. <br />
              <span className="gradient-text">Every tool she needs.</span>
            </h2>
            <p className="text-ink-100/35 text-sm max-w-xs leading-relaxed">
              Built specifically for first-generation students in India.
              Everything in one place. Always free.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}