import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AvatarPicker from '../components/Auth/AvatarPicker'
import toast from 'react-hot-toast'

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
  'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
  'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir',
]

const steps = ['Account', 'About You', 'Your Avatar']

export default function SignupPage() {
  const navigate  = useNavigate()
  const { signup } = useAuth()

  const [step, setStep]       = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const [form, setForm] = useState({
    name:     '',
    email:    '',
    password: '',
    age:      '',
    city:     '',
    state:    '',
    course:   '',
    year:     '',
    avatar:   '🌟',
  })

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

  const nextStep = () => {
    if (step === 0) {
      if (!form.name || !form.email || !form.password) {
        return toast.error('Please fill all fields')
      }
      if (form.password.length < 6) {
        return toast.error('Password must be at least 6 characters')
      }
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await signup({
        name:     form.name,
        email:    form.email,
        password: form.password,
        avatar:   form.avatar,
        age:      form.age ? Number(form.age) : undefined,
        location: { city: form.city, state: form.state },
        course:   form.course,
        year:     form.year,
      })
      toast.success(`Welcome to KAIROS, ${form.name}! 💜`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-md relative z-10">

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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-2xl text-ink-100 mb-1">
              {step === 0 && 'Create your account'}
              {step === 1 && 'Tell us about you'}
              {step === 2 && 'Choose your avatar'}
            </h1>
            <p className="text-ink-100/35 text-[12px]">
              {step === 0 && 'Your KAIROS moment begins here.'}
              {step === 1 && 'This helps KAI personalize your experience.'}
              {step === 2 && 'Pick an emoji that feels like you — no photos needed.'}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                style={{ background: i <= step ? 'linear-gradient(90deg, #7C5CFC, #9B7EFF)' : 'rgba(155,126,255,0.15)' }} />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="What should KAI call you?"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
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
                      placeholder="At least 6 characters"
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
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">Age</label>
                    <input
                      type="number"
                      placeholder="17-25"
                      value={form.age}
                      onChange={e => update('age', e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">City</label>
                    <input
                      type="text"
                      placeholder="Your city"
                      value={form.city}
                      onChange={e => update('city', e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">State</label>
                  <select
                    value={form.state}
                    onChange={e => update('state', e.target.value)}
                    className="w-full bg-void-900 border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 outline-none focus:border-violet-500/50 transition-colors"
                  >
                    <option value="">Select your state</option>
                    {indianStates.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">Course</label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech CSE, BA English, BSc Nursing"
                    value={form.course}
                    onChange={e => update('course', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-ink-100/40 uppercase tracking-wider mb-1.5 block">Year</label>
                  <select
                    value={form.year}
                    onChange={e => update('year', e.target.value)}
                    className="w-full bg-void-900 border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 outline-none focus:border-violet-500/50 transition-colors"
                  >
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Final Year</option>
                    <option>Postgraduate</option>
                    <option>Just finished 12th</option>
                  </select>
                </div>
                <p className="text-[11px] text-ink-100/25 text-center">
                  All fields optional — you can fill these later 💜
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              >
                {/* Preview */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl"
                  style={{ background: 'rgba(124,92,252,0.08)', border: '0.5px solid rgba(124,92,252,0.2)' }}>
                  <div className="text-4xl">{form.avatar}</div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink-100/80">{form.name}</div>
                    <div className="text-[11px] text-ink-100/35">{form.course || 'KAIROS Member'}</div>
                  </div>
                </div>
                <AvatarPicker selected={form.avatar} onSelect={v => update('avatar', v)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="btn-ghost flex items-center gap-2 text-sm py-3 px-5">
                <ArrowLeft size={14} /> Back
              </button>
            )}
            {step < 2 ? (
              <button onClick={nextStep}
                className="btn-primary flex-1 text-sm py-3 justify-center">
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="btn-primary flex-1 text-sm py-3 justify-center">
                {loading ? 'Creating your account...' : 'Begin My Journey 💜'}
              </button>
            )}
          </div>

          {/* Login link */}
          <p className="text-center text-[12px] text-ink-100/30 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}