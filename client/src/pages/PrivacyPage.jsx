import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { Shield, Lock, Eye, Trash2, Mail } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'Our Commitment to Your Privacy',
    content: `KAIROS was built with privacy as a core value, not an afterthought. We understand that the students who use this platform may be sharing sensitive information — about their family situations, financial conditions, career confusion, and emotional struggles. We treat all of this with the highest respect and confidentiality.

This Privacy Policy explains what information we collect, how we use it, and your rights over your own data. It is written in plain English because you deserve to understand it fully.`
  },
  {
    icon: Eye,
    title: 'What We Collect',
    content: `When you create an account, we collect:
- Your name (or nickname — a real name is never required)
- Email address
- Password (stored as an encrypted hash — we never see your actual password)
- Location (city and state — optional)
- Course and year of study (optional)
- Your chosen emoji avatar

When you use KAIROS, we also store:
- Your conversations with KAI (only with your consent)
- Scholarships you save or apply for
- Stories you submit (with your anonymity choice respected)
- Questions you ask in Ask Anything
- Career Compass results

We do NOT collect:
- Real photos of any kind
- Aadhaar or government ID numbers
- Bank account information
- Your exact address or GPS location`
  },
  {
    icon: Lock,
    title: 'How We Protect Your Data',
    content: `Your security is non-negotiable. Here is exactly how we protect your information:

- Passwords are hashed using bcrypt — we cannot see or recover your password
- Authentication uses JWT tokens stored in httpOnly cookies — not accessible to JavaScript or third parties
- All connections use HTTPS encryption
- Rate limiting prevents brute force attacks
- Input validation protects against injection attacks
- Your conversation history with KAI is stored only with your explicit consent

We do not sell your data. We do not share your data with advertisers. We do not use your data for any purpose other than providing you with KAIROS services.`
  },
  {
    icon: Shield,
    title: 'Anonymity — Your Choice, Always',
    content: `KAIROS was designed with anonymity as a first-class feature, not an option hidden in settings. Here is what that means:

- Ask Anything — all questions are anonymous by default. No login required.
- Stories — you choose whether to share your name or post anonymously. This cannot be changed by anyone, including us.
- Feedback — anonymous by default.
- Avatar system — we use emojis instead of photos because many students from small towns are uncomfortable with digital photos for safety and community reasons. This was a deliberate, empathy-first design decision.

We will never reveal your identity without your explicit permission.`
  },
  {
    icon: Eye,
    title: 'KAI Conversations',
    content: `Your conversations with KAI are private. Here is how they work:

- Conversations are processed by Groq's AI API (Llama 3 model) to generate KAI's responses
- Conversation history is saved to your account so KAI can remember context across sessions
- You can request deletion of your conversation history at any time
- We do not use your conversations to train AI models
- If KAI detects signs of distress in your messages, she responds with extra care and provides crisis support resources. This detection happens automatically to protect your wellbeing — it does not flag your account or share your information with anyone.`
  },
  {
    icon: Trash2,
    title: 'Your Rights Over Your Data',
    content: `You have full control over your data at all times:

- Right to Access — you can request a copy of all data we hold about you
- Right to Correction — you can update your profile information at any time
- Right to Deletion — you can delete your account and all associated data permanently
- Right to Anonymity — you can switch to anonymous mode at any time
- Right to Export — you can export your scholarship tracker, conversations, and Compass results as a PDF
- Right to Withdraw Consent — you can turn off conversation history saving at any time

To exercise any of these rights, contact us at privacy@kairos.in`
  },
  {
    icon: Mail,
    title: 'Contact and Grievances',
    content: `If you have any questions, concerns, or grievances about how KAIROS handles your data, please contact us:

Email: privacy@kairos.in
Response time: Within 48 hours

If you believe your privacy rights have been violated, you may also contact the relevant data protection authority in your jurisdiction.

KAIROS is committed to resolving all privacy concerns transparently and promptly.`
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-void-950 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
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
                Privacy Policy
              </span>
              <div className="w-8 h-px bg-violet-500/30" />
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-100 mb-4">
              Your privacy is <span className="gradient-text">not negotiable.</span>
            </h1>
            <p className="text-ink-100/40 text-sm max-w-xl mx-auto leading-relaxed mb-4">
              KAIROS was built for students who may be sharing vulnerable, personal information.
              We treat that trust as sacred. This policy explains exactly how.
            </p>
            <p className="text-ink-100/25 text-[11px]">
              Last updated: June 2026 · Effective immediately
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick summary */}
      <section className="py-10 border-t border-violet-500/08">
        <div className="section">
          <div className="glass-card rounded-2xl p-6 max-w-3xl mx-auto"
            style={{ border: '0.5px solid rgba(155,126,255,0.2)' }}>
            <h2 className="font-display font-bold text-base text-ink-100 mb-4">
              The short version:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '✅ We never sell your data',
                '✅ No real photos ever required',
                '✅ Anonymous mode always available',
                '✅ You can delete everything anytime',
                '✅ Passwords are encrypted — we cannot see them',
                '✅ No ads, no trackers, no third-party data sharing',
              ].map((point, i) => (
                <div key={i} className="text-[12px] text-ink-100/55 flex items-center gap-2">
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full policy */}
      <section className="py-16">
        <div className="section max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">
            {sections.map((section, i) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
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

      {/* Footer note */}
      <section className="py-10 border-t border-violet-500/08">
        <div className="section text-center">
          <p className="text-ink-100/20 text-[11px] leading-relaxed max-w-lg mx-auto">
            KAIROS is committed to the highest standards of data privacy and student safety.
            This policy is reviewed regularly and updated as needed.
            <br /><br />
            © 2026 KAIROS by Anchal Bisht. All rights reserved.
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