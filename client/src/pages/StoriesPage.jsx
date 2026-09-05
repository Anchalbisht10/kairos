import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MapPin, BookOpen, Plus, X, Send } from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function StoriesPage() {
  const { user } = useAuth()
  const [stories,   setStories]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [showForm,  setShowForm]  = useState(false)
  const [liking,    setLiking]    = useState(null)
  const [form,      setForm]      = useState({
    displayName: '', isAnonymous: false,
    city: '', state: '', course: '', year: '',
    background: '', storyText: '', tags: '',
  })

  useEffect(() => { fetchStories() }, [])

  const fetchStories = async () => {
    try {
      const { data } = await axios.get('/stories')
      setStories(data.stories || [])
    } catch {
      toast.error('Could not load stories')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (id) => {
    if (!user) return toast.error('Please login to like stories')
    setLiking(id)
    try {
      const { data } = await axios.post(`/stories/${id}/like`)
      setStories(prev => prev.map(s => s._id === id ? { ...s, likes: data.likes } : s))
    } catch {
      toast.error('Could not like story')
    } finally {
      setLiking(null)
    }
  }

  const handleSubmit = async () => {
    if (!form.storyText.trim()) return toast.error('Please write your story')
    try {
      await axios.post('/stories', {
        ...form,
        displayName: form.isAnonymous ? 'Anonymous' : (form.displayName || user?.name),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      })
      toast.success('Story submitted! It will be published after a quick review. 💜')
      setShowForm(false)
      setForm({ displayName:'', isAnonymous:false, city:'', state:'', course:'', year:'', background:'', storyText:'', tags:'' })
    } catch {
      toast.error('Could not submit story')
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl text-ink-100 mb-1">Real Stories 📖</h1>
            <p className="text-ink-100/35 text-[12px]">Girls just like you who made it through.</p>
          </div>
          {user && (
            <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
              <Plus size={14} /> Share Yours
            </button>
          )}
        </motion.div>

        {/* Stories */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {stories.map((s, i) => (
              <motion.div key={s._id}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl flex-shrink-0">{s.avatar || '🌟'}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-[13px] text-ink-100/85">{s.displayName}</div>
                    <div className="flex items-center gap-3 mt-1">
                      {s.location?.city && (
                        <div className="flex items-center gap-1">
                          <MapPin size={9} className="text-ink-100/25" />
                          <span className="text-[10px] text-ink-100/30">{s.location.city}, {s.location.state}</span>
                        </div>
                      )}
                      {s.course && (
                        <div className="flex items-center gap-1">
                          <BookOpen size={9} className="text-ink-100/25" />
                          <span className="text-[10px] text-ink-100/25">{s.course}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {s.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background:'rgba(155,126,255,0.1)', color:'#9B7EFF', border:'0.5px solid rgba(155,126,255,0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[12.5px] text-ink-100/55 leading-[1.85] mb-4 whitespace-pre-line">
                  "{s.storyText}"
                </p>

                <div className="flex items-center justify-between">
                  <button onClick={() => handleLike(s._id)} disabled={liking === s._id}
                    className="flex items-center gap-1.5 text-[11px] text-ink-100/25 hover:text-violet-400 transition-colors">
                    <Heart size={13} />
                    <span>{s.likes?.toLocaleString() || 0}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Submit story modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              className="fixed inset-0 z-50 bg-void-950/90 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }}
                exit={{ scale:0.95, opacity:0 }}
                className="glass-card rounded-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg text-ink-100">Share Your Story</h2>
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
                    <span className="text-[12px] text-ink-100/50">Share anonymously</span>
                  </label>

                  {!form.isAnonymous && (
                    <input type="text" placeholder="Your name or nickname"
                      value={form.displayName}
                      onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50"
                    />
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="City" value={form.city}
                      onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                      className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50"
                    />
                    <input type="text" placeholder="State" value={form.state}
                      onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                      className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <input type="text" placeholder="Your course (e.g. B.Tech CSE)" value={form.course}
                    onChange={e => setForm(p => ({ ...p, course: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50"
                  />

                  <textarea placeholder="Your story — be as honest and real as you want. This is a safe space." 
                    value={form.storyText} rows={6}
                    onChange={e => setForm(p => ({ ...p, storyText: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50 resize-none"
                  />

                  <input type="text" placeholder="Tags (comma separated e.g. Scholarship, Family Pressure)"
                    value={form.tags}
                    onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-ink-100 placeholder-ink-100/20 outline-none focus:border-violet-500/50"
                  />

                  <button onClick={handleSubmit} className="btn-primary w-full py-3 justify-center text-sm">
                    Submit My Story <Send size={13} />
                  </button>

                  <p className="text-[10px] text-ink-100/20 text-center">
                    Stories are reviewed before publishing to keep this space safe 💜
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}