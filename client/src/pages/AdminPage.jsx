import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Users, BookOpen, Award, MessageCircle,
  Star, Check, X, Trash2, Plus, Eye,
  BarChart3, Sparkles, LogOut
} from 'lucide-react'

const tabs = [
  { id: 'dashboard',    label: 'Dashboard',    icon: BarChart3    },
  { id: 'stories',      label: 'Stories',      icon: BookOpen     },
  { id: 'scholarships', label: 'Scholarships', icon: Award        },
  { id: 'questions',    label: 'Questions',    icon: MessageCircle},
  { id: 'feedback',     label: 'Feedback',     icon: Star         },
  { id: 'users',        label: 'Users',        icon: Users        },
]

export default function AdminPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [data,      setData]      = useState({})
  const [fetching,  setFetching]  = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user)          return navigate('/login')
      if (!user.isAdmin)  return navigate('/dashboard')
    }
  }, [user, loading])

  useEffect(() => {
    if (user?.isAdmin) fetchData(activeTab)
  }, [activeTab, user])

  const fetchData = async (tab) => {
    setFetching(true)
    try {
      const endpoint = tab === 'dashboard' ? '/admin/stats' : `/admin/${tab}`
      const { data: res } = await axios.get(endpoint)
      setData(prev => ({ ...prev, [tab]: res.stats || res[tab] || res.stories || res.questions || res.feedback || res.users || res.scholarships }))
    } catch {
      toast.error('Could not load data')
    } finally {
      setFetching(false)
    }
  }

  const approveStory = async (id) => {
    try {
      await axios.put(`/admin/stories/${id}/approve`)
      toast.success('Story published! 💜')
      fetchData('stories')
    } catch { toast.error('Failed') }
  }

  const deleteItem = async (type, id) => {
    if (!confirm('Are you sure?')) return
    try {
      await axios.delete(`/admin/${type}/${id}`)
      toast.success('Removed.')
      fetchData(type)
    } catch { toast.error('Failed') }
  }

  if (loading || !user?.isAdmin) return (
    <div className="min-h-screen bg-void-950 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
    </div>
  )

  return (
    <div className="min-h-screen bg-void-950 flex">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-56 bg-void-900/80 backdrop-blur-xl border-r border-violet-500/08 flex flex-col z-40">
        <div className="p-5 border-b border-violet-500/08">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-sm tracking-[3px] text-ink-100">
              KAIROS
            </span>
          </div>
          <div className="text-[9px] tracking-[2px] text-violet-400/50 uppercase ml-9">
            Admin Panel
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-medium w-full text-left transition-all ${
                activeTab === id
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                  : 'text-ink-100/35 hover:text-ink-100/60 hover:bg-white/[0.03]'
              }`}>
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-violet-500/08">
          <button onClick={() => { logout(); navigate('/') }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] text-red-400/50 hover:text-red-400 hover:bg-red-400/05 transition-all w-full">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-2xl text-ink-100">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p className="text-ink-100/30 text-[12px] mt-1">
              Welcome back, {user.name} 💜
            </p>
          </div>

          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
            </div>
          ) : (
            <>
              {/* DASHBOARD */}
              {activeTab === 'dashboard' && data.dashboard && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users',        value: data.dashboard.users,            color: '#9B7EFF' },
                    { label: 'Scholarships',        value: data.dashboard.scholarships,     color: '#E879F9' },
                    { label: 'Stories Pending',     value: data.dashboard.pendingStories,   color: '#C4B5FD' },
                    { label: 'Stories Published',   value: data.dashboard.publishedStories, color: '#9B7EFF' },
                    { label: 'Questions',           value: data.dashboard.questions,        color: '#E879F9' },
                    { label: 'Feedback',            value: data.dashboard.feedback,         color: '#C4B5FD' },
                    { label: 'Avg Rating',          value: `${data.dashboard.avgRating}⭐`, color: '#9B7EFF' },
                  ].map((stat, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="glass-card rounded-2xl p-5"
                    >
                      <div className="font-display font-extrabold text-3xl mb-1"
                        style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-[11px] text-ink-100/30">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* STORIES */}
              {activeTab === 'stories' && (
                <div>
                  <div className="flex gap-3 mb-6">
                    {['pending', 'published'].map(s => (
                      <button key={s} onClick={() => {
                        fetchData('stories')
                      }}
                        className="text-[11px] px-4 py-2 rounded-full border border-violet-500/20 text-violet-400 capitalize">
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4">
                    {(data.stories || []).map(story => (
                      <div key={story._id} className="glass-card rounded-2xl p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xl">{story.avatar}</span>
                              <div>
                                <div className="text-[13px] font-semibold text-ink-100/80">{story.displayName}</div>
                                <div className="text-[10px] text-ink-100/30">{story.location?.city}, {story.location?.state} · {story.course}</div>
                              </div>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full ml-auto ${story.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-violet-500/10 text-violet-400'}`}>
                                {story.isPublished ? 'Published' : 'Pending'}
                              </span>
                            </div>
                            <p className="text-[12px] text-ink-100/40 leading-relaxed line-clamp-3">
                              {story.storyText}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            {!story.isPublished && (
                              <button onClick={() => approveStory(story._id)}
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-500/10 hover:bg-green-500/20 transition-all">
                                <Check size={14} className="text-green-400" />
                              </button>
                            )}
                            <button onClick={() => deleteItem('stories', story._id)}
                              className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 transition-all">
                              <Trash2 size={14} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!(data.stories?.length) && (
                      <div className="text-center py-12 text-ink-100/25 text-sm">No stories found</div>
                    )}
                  </div>
                </div>
              )}

              {/* SCHOLARSHIPS */}
              {activeTab === 'scholarships' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[12px] text-ink-100/30">{data.scholarships?.length || 0} scholarships</div>
                    <button
                      onClick={() => navigate('/admin/scholarship/new')}
                      className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                      <Plus size={12} /> Add Scholarship
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {(data.scholarships || []).map(s => (
                      <div key={s._id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-ink-100/80 truncate">{s.title}</div>
                          <div className="text-[10px] text-ink-100/30 mt-0.5">
                            {s.providerType} · ₹{s.amount?.toLocaleString()} · {s.eligibility?.states?.join(', ')}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <span className={`text-[9px] px-2 py-1 rounded-full ${s.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {s.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <button onClick={() => deleteItem('scholarships', s._id)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 transition-all">
                            <Trash2 size={12} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* QUESTIONS */}
              {activeTab === 'questions' && (
                <div className="flex flex-col gap-4">
                  {(data.questions || []).map(q => (
                    <div key={q._id} className="glass-card rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 capitalize">{q.category}</span>
                            <span className="text-[9px] text-ink-100/25">{q.isAnonymous ? 'Anonymous' : 'Named'}</span>
                          </div>
                          <p className="text-[13px] font-medium text-ink-100/75 mb-3">{q.questionText}</p>
                          {q.kaiResponse && (
                            <p className="text-[11px] text-ink-100/35 leading-relaxed border-l border-violet-500/20 pl-3">
                              {q.kaiResponse.substring(0, 150)}...
                            </p>
                          )}
                        </div>
                        <button onClick={() => deleteItem('questions', q._id)}
                          className="w-9 h-9 rounded-xl flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 flex-shrink-0">
                          <Trash2 size={13} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* FEEDBACK */}
              {activeTab === 'feedback' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(data.feedback || []).map(f => (
                    <div key={f._id} className="glass-card rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{f.emoji}</span>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-xs">{i < f.stars ? '⭐' : '☆'}</span>
                              ))}
                            </div>
                          </div>
                          {f.message && (
                            <p className="text-[12px] text-ink-100/45 leading-relaxed mb-2">"{f.message}"</p>
                          )}
                          <div className="text-[10px] text-ink-100/25">
                            {f.isAnonymous ? 'Anonymous' : f.displayName}
                          </div>
                        </div>
                        <button onClick={() => deleteItem('feedback', f._id)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 flex-shrink-0">
                          <Trash2 size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* USERS */}
              {activeTab === 'users' && (
                <div className="flex flex-col gap-3">
                  {(data.users || []).map(u => (
                    <div key={u._id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                      <span className="text-2xl flex-shrink-0">{u.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-ink-100/80">{u.name}</div>
                        <div className="text-[10px] text-ink-100/30">{u.email} · {u.location?.city}, {u.location?.state}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {u.isAdmin && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400">Admin</span>
                        )}
                        <span className="text-[9px] text-ink-100/20">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}