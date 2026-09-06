import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, Compass, Award, BookOpen,
  HelpCircle, LayoutDashboard, LogOut, Menu, X, Sparkles
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import FeedbackWidget from './FeedbackWidget'
import PWAInstallPrompt from "./PWAInstallPrompt";

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    href: '/dashboard'    },
  { icon: MessageCircle,   label: 'Talk to KAI',  href: '/chat'         },
  { icon: Compass,         label: 'Compass',      href: '/compass'      },
  { icon: Award,           label: 'Scholarships', href: '/scholarships' },
  { icon: BookOpen,        label: 'Stories',      href: '/stories'      },
  { icon: HelpCircle,      label: 'Ask Anything', href: '/ask'          },
]

export default function AppLayout({ children }) {
  const { user, logout } = useAuth()
  const location  = useLocation()
  const navigate  = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('See you soon! 💜')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-void-950 flex">

      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-60 fixed left-0 top-0 bottom-0 z-40 border-r border-violet-500/08 bg-void-950/80 backdrop-blur-xl">

        {/* Logo */}
        <div className="p-6 border-b border-violet-500/08">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-sm tracking-[4px] text-ink-100">
              KAI<span className="gradient-text">ROS</span>
            </span>
          </Link>
        </div>

        {/* User */}
        <div className="p-4 border-b border-violet-500/08">
          <div className="flex items-center gap-3 p-3 rounded-2xl"
            style={{ background: 'rgba(124,92,252,0.06)' }}>
            <div className="text-2xl">{user?.avatar}</div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-ink-100/80 truncate">{user?.name}</div>
              <div className="text-[10px] text-ink-100/30 truncate">{user?.course || 'KAIROS Member'}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = location.pathname === href
            return (
              <Link key={href} to={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-200 ${
                  active
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                    : 'text-ink-100/35 hover:text-ink-100/70 hover:bg-white/[0.03]'
                }`}>
                <Icon size={15} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-violet-500/08">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-medium text-ink-100/30 hover:text-red-400 hover:bg-red-400/05 transition-all w-full">
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-void-950/90 backdrop-blur-xl border-b border-violet-500/08 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-display font-extrabold text-sm tracking-[4px] text-ink-100">
          KAI<span className="gradient-text">ROS</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xl">{user?.avatar}</span>
          <button onClick={() => setOpen(!open)} className="text-ink-100/50">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* // ok this above line is quite important  */}

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:hidden fixed inset-0 z-30 bg-void-950/95 backdrop-blur-xl pt-16 px-4"
          >
            <nav className="flex flex-col gap-2 pt-4">
              {navItems.map(({ icon: Icon, label, href }) => (
                <Link key={href} to={href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-ink-100/60 hover:text-violet-300 hover:bg-violet-500/10 transition-all">
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
              <button onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 transition-all mt-4">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pt-16 lg:pt-0 min-h-screen overflow-x-hidden">
        {children}
      </main>
       <FeedbackWidget />
       <PWAInstallPrompt />
    </div>
  )
}