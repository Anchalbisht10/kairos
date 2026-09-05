import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const links = [
  { label: 'Meet KAI',     href: '/chat'          },
  { label: 'Compass',      href: '/compass'       },
  { label: 'Scholarships', href: '/scholarships'  },
  { label: 'Stories',      href: '/stories'       },
  { label: 'Ask Anything', href: '/ask'           },
  { label: 'Our Mission',  href: '/about'         },
  { label: 'The Creator',  href: '/creator'       },
]

export default function Navbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.8 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-void-950/90 backdrop-blur-xl border-b border-violet-500/10' : ''
        }`}
      >
        <div className="section flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-sm tracking-[4px] text-ink-100">
              KAI<span className="gradient-text">ROS</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map(link => (
              <Link key={link.href} to={link.href}
                className={`text-[11px] font-medium tracking-[0.3px] transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-violet-300'
                    : 'text-ink-100/40 hover:text-ink-100/80'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-[11px] py-2 px-5">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login"  className="btn-ghost text-[11px] py-2 px-4">Sign In</Link>
                <Link to="/signup" className="btn-primary text-[11px] py-2 px-5">Begin Journey ↗</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-ink-100/50 hover:text-ink-100 transition-colors p-2"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: '#04010E', paddingTop: '64px' }}
          >
            <div className="flex flex-col p-6 gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={link.href}
                    className="flex items-center py-3 px-4 rounded-xl text-[14px] text-ink-100/60 hover:text-violet-300 hover:bg-violet-500/10 transition-all">
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-violet-500/10">
                {user ? (
                  <Link to="/dashboard" className="btn-primary text-sm py-3 justify-center">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login"  className="btn-ghost text-sm py-3 justify-center">Sign In</Link>
                    <Link to="/signup" className="btn-primary text-sm py-3 justify-center">Begin Your Journey</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}