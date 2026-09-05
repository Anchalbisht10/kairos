import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate    = useNavigate()
  const { login }   = useAuth()
  const [loading,   setLoading]  = useState(false)
  const [showPass,  setShowPass] = useState(false)
  const [form,      setForm]     = useState({ email: '', password: '' })

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill all fields')
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back! 💜')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-display font-extrabold text-base tracking-[4px] text-ink-100">
            KAI<span className="gradient-text">ROS</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8"
        >
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-2xl text-ink-100 mb-1">
              Welcome back 💜
            </h1>
            <p className="text-ink-100/35 text-[12px]">
              KAI has been waiting for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-100/30 hover:text-ink-100/60">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full text-sm py-3.5 justify-center mt-2">
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-[12px] text-ink-100/30 mt-6">
            New to KAIROS?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 transition-colors">
              Create your account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}