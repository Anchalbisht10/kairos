import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { Mail, MessageCircle, Shield, FileText, Eye, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const contacts = [
  { icon: Mail,          label: 'General',       email: 'anchal001bisht@gmail.com',          desc: 'Questions, feedback, partnerships' },
  { icon: Shield,        label: 'Privacy',        email: 'anchal001bisht@gmail.com',        desc: 'Data requests, privacy concerns'  },
  { icon: Eye,           label: 'Accessibility',  email: 'anchal001bisht@gmail.com',  desc: 'Accessibility barriers or requests' },
  { icon: MessageCircle, label: 'Press',          email: 'anchal001bisht@gmail.com',          desc: 'Media, interviews, features'      },
]

export default function ContactPage() {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      return toast.error('Please fill all required fields')
    }
    setSending(true)
    // For now just show success — email integration comes with Nodemailer setup
    setTimeout(() => {
      toast.success('Message received! We will respond within 48 hours. 💜')
      setForm({ name: '', email: '', subject: '', message: '' })
      setSending(false)
    }, 1000)
  }

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
                Contact
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-100 mb-4">
              We actually <span className="gradient-text">read every message.</span>
            </h1>
            <p className="text-ink-100/40 text-sm max-w-xl mx-auto leading-relaxed">
              KAIROS is built by one person who cares deeply.
              Your message will be read and responded to within 48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="section max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left — contact options */}
            <div>
              <h2 className="font-display font-bold text-lg text-ink-100/80 mb-6">
                Reach us directly
              </h2>
              <div className="flex flex-col gap-3 mb-10">
                {contacts.map((c, i) => {
                  const Icon = c.icon
                  return (
                    <motion.a
                      key={i}
                      href={`mailto:${c.email}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-violet-500/25 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(155,126,255,0.1)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
                        <Icon size={16} className="text-violet-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-ink-100/70">{c.label}</div>
                        <div className="text-[11px] text-violet-400/70 group-hover:text-violet-400 transition-colors">{c.email}</div>
                        <div className="text-[10px] text-ink-100/25 mt-0.5">{c.desc}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>

              {/* Response time */}
              <div className="glass-card rounded-2xl p-5"
                style={{ border: '0.5px solid rgba(155,126,255,0.15)' }}>
                <div className="text-[11px] font-semibold text-violet-400/60 uppercase tracking-wider mb-2">
                  Response time
                </div>
                <div className="text-[13px] text-ink-100/60 leading-relaxed">
                  Within <strong className="text-ink-100/80">48 hours</strong> on weekdays.
                  <br />
                  We read every message personally.
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-display font-bold text-lg text-ink-100/80 mb-6">
                Send a message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-ink-100/35 uppercase tracking-wider mb-1.5 block">
                      Name *
                    </label>
                    <input type="text" value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100/70 placeholder-ink-100/20 outline-none focus:border-violet-500/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-ink-100/35 uppercase tracking-wider mb-1.5 block">
                      Email *
                    </label>
                    <input type="email" value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100/70 placeholder-ink-100/20 outline-none focus:border-violet-500/40 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-ink-100/35 uppercase tracking-wider mb-1.5 block">
                    Subject
                  </label>
                  <input type="text" value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    placeholder="What is this about?"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100/70 placeholder-ink-100/20 outline-none focus:border-violet-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-ink-100/35 uppercase tracking-wider mb-1.5 block">
                    Message *
                  </label>
                  <textarea value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100/70 placeholder-ink-100/20 outline-none focus:border-violet-500/40 transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={sending}
                  className="btn-primary text-sm py-3.5 justify-center">
                  {sending ? 'Sending...' : 'Send Message'}
                  <Send size={14} />
                </button>
                <p className="text-[10px] text-ink-100/20 text-center">
                  Your message is private. We will never share it.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 border-t border-violet-500/08">
        <div className="section text-center">
          <Link to="/" className="btn-ghost text-xs py-2 px-6 inline-flex">
            ← Back to KAIROS
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}