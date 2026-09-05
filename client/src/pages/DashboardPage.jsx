import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageLoader from '../components/shared/PageLoader'
import { motion } from 'framer-motion'
import {
  MessageCircle, Compass, Award, BookOpen,
  HelpCircle, ArrowRight, Sparkles, TrendingUp
} from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'

const quickActions = [
  { icon: MessageCircle, label: 'Talk to KAI',   sub: 'Your AI companion',      href: '/chat',         color: '#9B7EFF' },
  { icon: Compass,       label: 'Career Compass', sub: 'Discover your path',     href: '/compass',      color: '#E879F9' },
  { icon: Award,         label: 'Scholarships',   sub: '500+ opportunities',     href: '/scholarships', color: '#C4B5FD' },
  { icon: BookOpen,      label: 'Stories',        sub: 'Real student stories',   href: '/stories',      color: '#9B7EFF' },
  { icon: HelpCircle,    label: 'Ask Anything',   sub: 'Anonymous Q&A',          href: '/ask',          color: '#E879F9' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
})

function getTimeGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [scholarships, setScholarships] = useState([])

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    axios.get('/scholarships?limit=3')
      .then(res => setScholarships(res.data.scholarships || []))
      .catch(() => {})
  }, [])

if (loading) return <PageLoader />

  if (!user) return null

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">

        {/* Welcome */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{user.avatar}</span>
            <div>
              <h1 className="font-display font-extrabold text-2xl text-ink-100">
                {getTimeGreeting()}, {user.name}! 💜
              </h1>
              <p className="text-ink-100/35 text-[12px]">
                {user.course ? `${user.course} · ` : ''}{user.location?.city ? `${user.location.city}, ` : ''}{user.location?.state || ''}
              </p>
            </div>
          </div>
        </motion.div>

        {/* KAI welcome card */}
        <motion.div {...fadeUp(0.1)}
          className="glass-card rounded-2xl p-5 mb-6 flex items-center gap-4 cursor-pointer hover:border-violet-500/25 transition-all"
          onClick={() => navigate('/chat')}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-ink-100/80 mb-0.5">KAI is here for you 💜</div>
          <div className="text-[11px] text-ink-100/35">
  {user.savedScholarships?.length > 0
    ? `You have ${user.savedScholarships.length} scholarship${user.savedScholarships.length > 1 ? 's' : ''} saved. Let's work on applying! 💜`
    : `Hey ${user.name.split(' ')[0]}! Tell me what's on your mind — I'm here, always.`
  }
</div>
          </div>
          <ArrowRight size={16} className="text-violet-400 flex-shrink-0" />
        </motion.div>

        {/* Quick actions */}
        <motion.div {...fadeUp(0.2)} className="mb-8">
          <h2 className="text-[11px] font-semibold tracking-[2px] uppercase text-ink-100/25 mb-4">
            What would you like to do?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {quickActions.map(({ icon: Icon, label, sub, href, color }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <Link to={href}
                  className="glass-card rounded-2xl p-4 flex flex-col gap-3 hover:border-violet-500/25 transition-all duration-300 block">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}18`, border: `0.5px solid ${color}30` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-ink-100/80">{label}</div>
                    <div className="text-[10px] text-ink-100/30 mt-0.5">{sub}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      {/* Saved scholarships tracker */}
{user.savedScholarships?.length > 0 && (
  <motion.div {...fadeUp(0.3)} className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[11px] font-semibold tracking-[2px] uppercase text-ink-100/25">
        Your Scholarship Tracker
      </h2>
      <Link to="/scholarships" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
        Find more →
      </Link>
    </div>
    <div className="flex flex-col gap-3">
      {user.savedScholarships.slice(0, 3).map((saved, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="glass-card rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(155,126,255,0.1)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
            <Award size={16} className="text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-ink-100/80 truncate">
              {saved.scholarship?.title || 'Scholarship'}
            </div>
            <div className="text-[10px] text-ink-100/35 mt-0.5">
              {saved.scholarship?.amount ? `₹${saved.scholarship.amount.toLocaleString()}` : ''}
            </div>
          </div>
          <select
            defaultValue={saved.status || 'saved'}
            onChange={async (e) => {
              try {
                await axios.post('/users/scholarships/save', {
                  scholarshipId: saved.scholarship?._id,
                  status: e.target.value,
                })
                toast.success('Status updated! 💜')
              } catch { toast.error('Could not update') }
            }}
            className="text-[10px] px-2 py-1.5 rounded-lg outline-none cursor-pointer"
            style={{ background: 'rgba(155,126,255,0.1)', color: '#9B7EFF', border: '0.5px solid rgba(155,126,255,0.2)' }}
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="pending">Pending</option>
            <option value="won">Won 🎉</option>
          </select>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

{/* Scholarships discovery */}
<motion.div {...fadeUp(0.3)} className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-[11px] font-semibold tracking-[2px] uppercase text-ink-100/25">
      Scholarships for you
    </h2>
    <Link to="/scholarships" className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
      View all →
    </Link>
  </div>
  <div className="flex flex-col gap-3">
    {scholarships.map((s, i) => (
      <motion.div
        key={s._id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + i * 0.1 }}
        className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-violet-500/25 transition-all cursor-pointer"
        onClick={() => navigate(`/scholarships/${s._id}`)}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(155,126,255,0.1)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
          <Award size={16} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-ink-100/80 truncate">{s.title}</div>
          <div className="text-[10px] text-ink-100/35 mt-0.5">
            ₹{s.amount?.toLocaleString()} · {s.providerType}
          </div>
        </div>
        <div className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
          style={{ background: 'rgba(155,126,255,0.12)', color: '#9B7EFF' }}>
          View →
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)}>
          <h2 className="text-[11px] font-semibold tracking-[2px] uppercase text-ink-100/25 mb-4">
            Your journey
          </h2>
          <div className="grid grid-cols-3 gap-2">
         {[
  { label: 'Scholarships saved', value: user.savedScholarships?.length || 0,  emoji: '🏆' },
  { label: 'Compass journeys',   value: user.compassResults?.length    || 0,  emoji: '🧭' },
  { label: 'Days with KAIROS',   value: Math.floor((Date.now() - new Date(user.createdAt)) / 86400000) || 1, emoji: '💜' },
].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                 <div className="text-2xl mb-1">{stat.emoji}</div>
  <div className="font-display font-extrabold text-2xl gradient-text mb-1">{stat.value}</div>
  <div className="text-[10px] text-ink-100/25">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}