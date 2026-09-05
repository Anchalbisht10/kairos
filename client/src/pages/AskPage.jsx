import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Send, ChevronUp, Plus, X, Search } from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'


const categories = ['all','career','scholarship','exam','family','personal','other']

export default function AskPage() {
  const { user } = useAuth()
  const [questions,   setQuestions]   = useState([])
  const [loading,     setLoading]     = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category,    setCategory]    = useState('all')
  const [showForm,    setShowForm]    = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
  const [form,        setForm]        = useState({ questionText:'', category:'other', isAnonymous:true })

  useEffect(() => { fetchQuestions() }, [category])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const params = category !== 'all' ? { category } : {}
      const { data } = await axios.get('/ask', { params })
      setQuestions(data.questions || [])
    } catch {
      toast.error('Could not load questions')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.questionText.trim()) return toast.error('Please write your question')
    setSubmitting(true)
    try {
      const { data } = await axios.post('/ask', form)
      setQuestions(prev => [data.question, ...prev])
      setForm({ questionText:'', category:'other', isAnonymous:true })
      setShowForm(false)
      toast.success('KAI has answered your question! 💜')
    } catch {
      toast.error('Could not submit question')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpvote = async (id) => {
    if (!user) return toast.error('Please login to upvote')
    try {
      await axios.post(`/ask/${id}/upvote`)
      setQuestions(prev => prev.map(q =>
        q._id === id ? { ...q, upvotes: (q.upvotes || 0) + 1 } : q
      ))
    } catch {}
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-ink-100 mb-1">Ask Anything 🙋</h1>
            <p className="text-ink-100/35 text-[12px]">Anonymous Q&A — no question is too basic or too embarrassing.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
            <Plus size={14} /> Ask
          </button>
        </motion.div>

        {/* Search */}
<div className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
  <Search size={14} className="text-ink-100/30 flex-shrink-0" />
  <input
    type="text"
    placeholder="Search questions..."
    value={searchQuery}
    onChange={e => setSearchQuery(e.target.value)}
    className="flex-1 bg-transparent text-[13px] text-ink-100/70 placeholder-ink-100/20 outline-none"
  />
</div>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full border capitalize transition-all ${
                category === cat
                  ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 font-semibold'
                  : 'border-white/[0.08] text-ink-100/35 hover:text-ink-100/60'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Questions */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {questions.map((q, i) => (
              <motion.div key={q._id}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex gap-3 mb-3">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold capitalize flex-shrink-0"
                    style={{ background:'rgba(155,126,255,0.1)', color:'#9B7EFF' }}>
                    {q.category}
                  </span>
                </div>

                <p className="text-[13px] font-medium text-ink-100/80 mb-4 leading-relaxed">
                  Q: {q.questionText}
                </p>

                {q.kaiResponse && (
                  <div className="rounded-xl p-4 mb-3"
                    style={{ background:'rgba(124,92,252,0.06)', border:'0.5px solid rgba(124,92,252,0.15)' }}>
                    <div className="text-[10px] font-semibold text-violet-400 mb-2">✦ KAI's Answer</div>
                    <p className="text-[12px] text-ink-100/60 leading-relaxed">{q.kaiResponse}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button onClick={() => handleUpvote(q._id)}
                    className="flex items-center gap-1.5 text-[11px] text-ink-100/25 hover:text-violet-400 transition-colors">
                    <ChevronUp size={14} />
                    <span>{q.upvotes || 0} helpful</span>
                  </button>
                </div>
              </motion.div>
            ))}

            {questions.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="text-4xl mb-3">🙋</div>
                <div className="text-ink-100/40 text-sm">No questions yet in this category. Be the first to ask!</div>
              </div>
            )}
          </div>
        )}

        {/* Ask modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 z-50 bg-void-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale:0.95 }} animate={{ scale:1 }} exit={{ scale:0.95 }}
                className="glass-card rounded-3xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg text-ink-100">Ask KAI Anything</h2>
                  <button onClick={() => setShowForm(false)} className="text-ink-100/30 hover:text-ink-100/60">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.isAnonymous}
                      onChange={e => setForm(p => ({ ...p, isAnonymous: e.target.checked }))}
                      className="w-4 h-4 accent-violet-500"
                    />
                    <span className="text-[12px] text-ink-100/50">Ask anonymously</span>
                  </label>

                  <select value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-void-900 border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 outline-none capitalize">
                    {['career','scholarship','exam','family','personal','other'].map(c => (
                      <option key={c} value={c} className="capitalize">{c}</option>
                    ))}
                  </select>

                  <textarea placeholder="Ask anything — no question is too small or too basic 💜"
                    value={form.questionText} rows={4}
                    onChange={e => setForm(p => ({ ...p, questionText: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none resize-none"
                  />

                  <button onClick={handleSubmit} disabled={submitting}
                    className="btn-primary w-full py-3 justify-center text-sm">
                    {submitting ? 'KAI is thinking... 💜' : 'Get KAI\'s Answer'} <Send size={13} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}