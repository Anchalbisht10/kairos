import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, ArrowRight, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 'interests',
    question: 'What do you love doing?',
    sub: 'Think about subjects, hobbies, activities — anything that excites you.',
    placeholder: 'e.g. I love solving math problems, helping people, drawing, reading about science...',
    type: 'textarea',
  },
  {
    id: 'education',
    question: 'What is your current education?',
    sub: 'Tell us where you are right now.',
    placeholder: 'e.g. Just finished 12th PCM, Currently in 2nd year BA...',
    type: 'textarea',
  },
  {
    id: 'marks',
    question: 'What were your approximate marks?',
    sub: 'Be honest — there are good paths for every score range.',
    placeholder: 'e.g. 72% in Class 12, 85% in Class 10...',
    type: 'textarea',
  },
  {
    id: 'location',
    question: 'Where are you based?',
    sub: 'This helps us find colleges and opportunities near you.',
    placeholder: 'e.g. Jaipur, Rajasthan — willing to move to nearby cities...',
    type: 'textarea',
  },
  {
    id: 'financial',
    question: 'What is your financial situation?',
    sub: 'Be honest — we will find paths that work for your reality.',
    placeholder: 'e.g. Family income is around ₹3 lakh per year, can afford college fees up to ₹30,000...',
    type: 'textarea',
  },
  {
    id: 'family',
    question: 'What does your family expect?',
    sub: 'Understanding this helps KAI suggest realistic paths.',
    placeholder: 'e.g. Parents want a government job, or they are open to anything stable...',
    type: 'textarea',
  },
  {
    id: 'goals',
    question: 'What is your dream for 5 years from now?',
    sub: 'Dream big — there are no wrong answers here.',
    placeholder: 'e.g. I want to be financially independent and support my family, become a doctor...',
    type: 'textarea',
  },
]

export default function CompassPage() {
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [step,     setStep]     = useState(-1) // -1 = intro
  const [answers,  setAnswers]  = useState({})
  const [loading,  setLoading]  = useState(false)
  const [results,  setResults]  = useState(null)

  if (!user) {
    navigate('/login')
    return null
  }

  const updateAnswer = (id, value) => setAnswers(p => ({ ...p, [id]: value }))

  const handleNext = () => {
    const current = questions[step]
    if (current && !answers[current.id]?.trim()) {
      return toast.error('Please answer this question to continue 💜')
    }
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/compass/analyze', { answers })
      setResults(data.careers || [])
    } catch {
      toast.error('KAI is thinking — please try again 💜')
    } finally {
      setLoading(false)
    }
  }

  const progress = step >= 0 ? ((step + 1) / questions.length) * 100 : 0

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">

        {/* Intro */}
        {step === -1 && !results && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
              <Compass size={28} className="text-white" />
            </div>
            <h1 className="font-display font-extrabold text-3xl text-ink-100 mb-3">
              Career Compass 🧭
            </h1>
            <p className="text-ink-100/40 text-sm leading-relaxed max-w-md mx-auto mb-8">
              A gentle guided journey to discover career paths that actually fit your real life —
              your marks, your location, your family, your dreams.
              <br /><br />
              KAI will ask you 7 questions. Take your time. Be honest.
              There are no wrong answers here.
            </p>
            <button onClick={() => setStep(0)} className="btn-primary text-sm px-10 py-4">
              Begin My Journey <ArrowRight size={15} />
            </button>
          </motion.div>
        )}

        {/* Questions */}
        {step >= 0 && !results && !loading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-ink-100/25 tracking-wider uppercase">
                  Question {step + 1} of {questions.length}
                </span>
                <span className="text-[10px] text-violet-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/[0.05] rounded-full">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7C5CFC, #9B7EFF)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
                exit={{ opacity:0, x:-30 }} transition={{ duration:0.3 }}
              >
                <h2 className="font-display font-bold text-xl text-ink-100 mb-2">
                  {questions[step].question}
                </h2>
                <p className="text-ink-100/35 text-[12px] mb-6">{questions[step].sub}</p>

                <textarea
                  rows={4}
                  placeholder={questions[step].placeholder}
                  value={answers[questions[step].id] || ''}
                  onChange={e => updateAnswer(questions[step].id, e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-[13px] text-ink-100/80 placeholder-ink-100/20 outline-none focus:border-violet-500/40 resize-none transition-colors leading-relaxed"
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-ghost text-sm py-3 px-5 flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              <button onClick={handleNext} className="btn-primary flex-1 text-sm py-3 justify-center">
                {step === questions.length - 1 ? 'Show My Paths ✨' : 'Continue'} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            className="text-center py-20">
            <div className="w-14 h-14 rounded-full border border-violet-500/30 animate-ping mx-auto mb-6" />
            <p className="text-ink-100/50 text-sm">KAI is analyzing your profile...</p>
            <p className="text-ink-100/25 text-[11px] mt-2">Finding paths that actually fit your life 💜</p>
          </motion.div>
        )}

        {/* Results */}
        {results && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-ink-100 mb-1">
                  Your Career Paths ✨
                </h2>
                <p className="text-ink-100/35 text-[12px]">Based on your profile — real, achievable, just for you.</p>
              </div>
              <button onClick={() => { setStep(-1); setResults(null); setAnswers({}) }}
                className="btn-ghost text-sm py-2 px-4 flex items-center gap-2">
                <RotateCcw size={13} /> Retake
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {results.map((career, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-ink-100">
                        {career.career || career.name || `Path ${i+1}`}
                      </h3>
                      {career.whySuitable && (
                        <p className="text-[12px] text-violet-400/70 mt-0.5">{career.whySuitable}</p>
                      )}
                    </div>
                  </div>

                  {career.educationPath && (
                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-ink-100/25 uppercase tracking-wider mb-1">Education Path</div>
                      <p className="text-[12px] text-ink-100/55 leading-relaxed">{career.educationPath}</p>
                    </div>
                  )}

                  {career.salaryRange && (
                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-ink-100/25 uppercase tracking-wider mb-1">Salary Range</div>
                      <p className="text-[12px] text-ink-100/55">{career.salaryRange}</p>
                    </div>
                  )}

                  {career.scholarship && (
                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-ink-100/25 uppercase tracking-wider mb-1">Scholarship to Apply</div>
                      <p className="text-[12px] text-violet-400/70">{career.scholarship}</p>
                    </div>
                  )}

                  {career.encouragement && (
                    <div className="mt-4 p-3 rounded-xl"
                      style={{ background:'rgba(124,92,252,0.06)', border:'0.5px solid rgba(124,92,252,0.15)' }}>
                      <p className="text-[12px] text-ink-100/60 italic">💜 {career.encouragement}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-ink-100/25 text-[11px] mb-4">Want to explore more? Talk to KAI about these paths.</p>
              <button onClick={() => navigate('/chat')} className="btn-primary text-sm py-3 px-8">
                Talk to KAI about this →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  )
}