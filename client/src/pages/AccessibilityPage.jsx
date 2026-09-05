import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { Eye, Zap, Globe, Smartphone, Heart, Mail } from 'lucide-react'

const sections = [
  {
    icon: Heart,
    title: 'Our Commitment',
    content: `KAIROS was built for students who are often left behind by digital platforms — students with limited data, basic smartphones, and sometimes visual or cognitive challenges that make complex websites inaccessible.

Accessibility is not an afterthought at KAIROS. It is part of the mission. A platform built for equity must itself be equitable in how it is experienced.

We are committed to making KAIROS accessible to every student, regardless of ability, device, or internet speed.`
  },
  {
    icon: Eye,
    title: 'Visual Accessibility',
    content: `Current implementations:
- High contrast text throughout — all body text meets WCAG AA contrast standards
- Gradient text used decoratively only — important information is never conveyed through color alone
- Focus indicators on all interactive elements for keyboard navigation
- Alt text principles applied to all meaningful visual content
- Emoji avatars chosen for clarity and universal recognition

In progress:
- Screen reader optimization for all pages
- ARIA labels on all interactive components
- Skip navigation links
- Reduced motion option for users with vestibular disorders`
  },
  {
    icon: Zap,
    title: 'Performance Accessibility',
    content: `KAIROS is built for the student on a 3G connection with a 4GB RAM Android phone. Performance is accessibility.

Current optimizations:
- Lazy loading of all heavy components
- 3D animations gracefully degrade on low-end devices
- Images optimized and served in modern formats
- Critical CSS loaded first for fast initial render
- PWA support for offline access to key pages

KAIROS should load and function meaningfully even on limited mobile data. This is a continuous commitment, not a one-time optimization.`
  },
  {
    icon: Globe,
    title: 'Language Accessibility',
    content: `KAIROS operates in English — the language most accessible to students across India's diverse linguistic landscape for educational and professional contexts.

However, KAI understands and accepts:
- Clear English
- Hinglish (Hindi-English mixed, written in Roman script)
- Natural Indian English phrasing and idiom

KAI never corrects a student's language. She meets them exactly where they are.

Hindi script is intentionally absent from the interface — not to exclude Hindi speakers, but because Roman script Hinglish is more widely accessible across different language backgrounds in India.

Future plans include expanding language support based on user needs.`
  },
  {
    icon: Smartphone,
    title: 'Device Accessibility',
    content: `KAIROS is designed mobile-first because most first-generation students access the internet primarily through smartphones.

Mobile considerations:
- Touch targets are large enough for comfortable use
- No hover-only interactions — everything works on touch
- Text is readable without zooming on standard phone screens
- Forms are designed for mobile keyboards
- PWA installation allows home screen access without app store

Desktop experience is equally considered for students accessing KAIROS through college computer labs or shared family computers.`
  },
  {
    icon: Heart,
    title: 'Cognitive Accessibility',
    content: `KAIROS is designed to reduce cognitive load, especially for students who may be stressed, overwhelmed, or navigating unfamiliar digital environments.

Design decisions for cognitive accessibility:
- Plain language throughout — no bureaucratic jargon
- Step-by-step processes broken into manageable pieces
- Clear visual hierarchy — most important information is always most prominent
- Consistent navigation patterns across all pages
- Progress indicators on multi-step forms (like signup and Compass)
- KAI uses warm, clear, conversational language — never clinical or intimidating`
  },
  {
    icon: Mail,
    title: 'Feedback and Accessibility Requests',
    content: `We know KAIROS is not yet fully accessible in every way it should be. We are actively working to improve.

If you encounter an accessibility barrier on KAIROS:
- Tell us what page or feature caused the issue
- Tell us what assistive technology or device you were using
- Tell us what you were trying to do

We take every accessibility report seriously and will respond within 48 hours.

Email: anchal001bisht@gmail.com

KAIROS is committed to meeting WCAG 2.1 AA standards across all pages. This is an ongoing commitment and we publish updates to this statement as we make improvements.`
  },
]

export default function AccessibilityPage() {
  return (
    <div className="bg-void-950 min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="section relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                Accessibility
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-100 mb-4">
              Built for <span className="gradient-text">every student.</span>
            </h1>
            <p className="text-ink-100/40 text-sm max-w-xl mx-auto leading-relaxed mb-4">
              A platform for equity must itself be equitable in how it is experienced.
              This is our accessibility commitment.
            </p>
            <p className="text-ink-100/25 text-[11px]">
              Last updated: June 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* WCAG badge */}
      <section className="pb-8">
        <div className="section">
          <div className="glass-card rounded-2xl p-5 max-w-3xl mx-auto flex flex-wrap items-center gap-4"
            style={{ border: '0.5px solid rgba(155,126,255,0.2)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(155,126,255,0.1)' }}>
                <Eye size={18} className="text-violet-400" />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-ink-100/70">
                  Target Standard
                </div>
                <div className="text-[11px] text-violet-400">
                  WCAG 2.1 Level AA
                </div>
              </div>
            </div>
            <div className="w-px h-8 bg-violet-500/20 hidden sm:block" />
            <div className="text-[11px] text-ink-100/30 leading-relaxed flex-1">
              We are actively working toward full WCAG 2.1 AA compliance.
              Some areas are still in progress — we update this page as we improve.
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            {sections.map((section, i) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(155,126,255,0.1)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
                      <Icon size={16} className="text-violet-400" />
                    </div>
                    <h2 className="font-display font-bold text-[16px] text-ink-100/90">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-[12.5px] text-ink-100/45 leading-[1.9] whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-violet-500/08">
        <div className="section text-center">
          <p className="text-ink-100/20 text-[11px] max-w-lg mx-auto">
            © 2026 KAIROS by Anchal Bisht. Accessibility is a journey, not a destination.
          </p>
          <Link to="/" className="btn-ghost text-xs py-2 px-6 mt-6 inline-flex">
            ← Back to KAIROS
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}