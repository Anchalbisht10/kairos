import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Award, ExternalLink, BookmarkPlus, Check, MapPin, Globe } from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const indianStates = [
  'Uttar Pradesh', 'Maharashtra', 'Bihar', 'Rajasthan',
  'West Bengal', 'Tamil Nadu', 'Madhya Pradesh',
  'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Telangana',
  'Odisha', 'Punjab', 'Haryana', 'Himachal Pradesh',
  'Uttarakhand', 'Jharkhand', 'Chhattisgarh', 'Assam',
  'Kerala', 'Goa', 'Delhi', 'Jammu & Kashmir',
]

const categories = ['All', 'Central Government', 'State Government', 'NGO', 'Private', 'Girl-Specific']

export default function ScholarshipsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [scholarships, setScholarships] = useState([])
  const [loading,      setLoading]      = useState(false)
  const [search,       setSearch]       = useState('')
  const [category,     setCategory]     = useState('All')
  const [selectedState,setSelectedState]= useState(null)
  const [saving,       setSaving]       = useState(null)
  const [saved,        setSaved]        = useState({})
  const [view,         setView]         = useState('home') // home | results

  const fetchScholarships = async (state, cat) => {
    setLoading(true)
    setView('results')
    try {
      const params = {}
      if (state && state !== 'All India') params.state = state
      if (cat && cat !== 'All') params.category = cat
      if (search) params.search = search
      const { data } = await axios.get('/scholarships', { params })
      setScholarships(data.scholarships || [])
    } catch {
      toast.error('Could not load scholarships')
    } finally {
      setLoading(false)
    }
  }

  const handleStateSelect = (state) => {
    setSelectedState(state)
    fetchScholarships(state, category)
  }

  const handleAllIndia = () => {
    setSelectedState('All India')
    fetchScholarships(null, 'Central Government')
    setCategory('Central Government')
  }

  const handleSave = async (scholarshipId) => {
    if (!user) return toast.error('Please login to save scholarships')
    setSaving(scholarshipId)
    try {
      await axios.post('/users/scholarships/save', { scholarshipId, status: 'saved' })
      setSaved(prev => ({ ...prev, [scholarshipId]: true }))
      toast.success('Scholarship saved! 💜')
    } catch {
      toast.error('Could not save scholarship')
    } finally {
      setSaving(null)
    }
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mb-8">
          <h1 className="font-display font-extrabold text-2xl text-ink-100 mb-1">
            Scholarships Hub 🏆
          </h1>
          <p className="text-ink-100/35 text-[12px]">
            Real scholarships. Plain English. Step by step. Always free.
          </p>
        </motion.div>

        {/* Home view — state selector */}
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            >
              {/* All India button */}
              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.1 }}
                className="mb-8"
              >
                <button
                  onClick={handleAllIndia}
                  className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                    <Globe size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-lg text-ink-100">All India Scholarships</div>
                    <div className="text-[12px] text-ink-100/40">Central government, national NGOs, corporate scholarships available everywhere</div>
                  </div>
                  <div className="ml-auto text-violet-400 text-[11px] font-semibold group-hover:translate-x-1 transition-transform">
                    Explore →
                  </div>
                </button>
              </motion.div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-ink-100/25 tracking-wider uppercase">Or select your state</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              {/* State grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {indianStates.map((state, i) => (
                  <motion.button
                    key={state}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleStateSelect(state)}
                    className="glass-card rounded-xl p-4 text-left hover:border-violet-500/30 transition-all group"
                  >
                    <MapPin size={13} className="text-violet-400/50 mb-2 group-hover:text-violet-400 transition-colors" />
                    <div className="text-[12px] font-medium text-ink-100/70 group-hover:text-ink-100/90 transition-colors">
                      {state}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Coming soon states */}
              <div className="mt-4 text-center">
                <p className="text-[11px] text-ink-100/20">
                  More states being added daily 💜
                </p>
              </div>
            </motion.div>
          )}

          {/* Results view */}
          {view === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            >
              {/* Back + header */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => { setView('home'); setScholarships([]); setSelectedState(null) }}
                  className="text-[12px] text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
                >
                  ← Back
                </button>
                <div className="h-4 w-px bg-white/[0.1]" />
                <div className="flex items-center gap-2">
                  {selectedState === 'All India'
                    ? <Globe size={14} className="text-violet-400" />
                    : <MapPin size={14} className="text-violet-400" />
                  }
                  <span className="text-[13px] font-semibold text-ink-100/70">
                    {selectedState}
                  </span>
                </div>
              </div>

              {/* Search bar */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                  <Search size={14} className="text-ink-100/30" />
                  <input
                    type="text"
                    placeholder="Search scholarships..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && fetchScholarships(selectedState, category)}
                    className="flex-1 bg-transparent text-[13px] text-ink-100/80 placeholder-ink-100/20 outline-none"
                  />
                </div>
                <button
                  onClick={() => fetchScholarships(selectedState, category)}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  Search
                </button>
              </div>

              {/* Category filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                  <button key={cat}
                    onClick={() => { setCategory(cat); fetchScholarships(selectedState, cat) }}
                    className={`flex-shrink-0 text-[11px] px-4 py-2 rounded-full border transition-all ${
                      category === cat
                        ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 font-semibold'
                        : 'border-white/[0.08] text-ink-100/35 hover:text-ink-100/60'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Results */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scholarships.map((s, i) => (
                    <motion.div
                      key={s._id}
                      initial={{ opacity:0, y:20 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay: i * 0.06 }}
                      className="glass-card rounded-2xl p-5 flex flex-col hover:border-violet-500/25 transition-all cursor-pointer"
onClick={() => navigate(`/scholarships/${s._id}`)}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background:'rgba(155,126,255,0.1)', border:'0.5px solid rgba(155,126,255,0.2)' }}>
                          <Award size={16} className="text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[12px] font-semibold text-ink-100/85 leading-snug mb-1">{s.title}</h3>
                          <div className="text-[10px] text-ink-100/30">{s.provider}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background:'rgba(155,126,255,0.1)', color:'#9B7EFF' }}>
                          {s.providerType}
                        </span>
                        {s.eligibility?.genderSpecific === 'Girls Only' && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background:'rgba(232,121,249,0.1)', color:'#E879F9' }}>
                            Girls Only 💜
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-display font-bold text-xl gradient-text">
                            ₹{s.amount?.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-ink-100/30">{s.amountDesc}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-ink-100/25">Deadline</div>
                          <div className="text-[11px] font-semibold text-ink-100/55">{s.deadline || 'Check portal'}</div>
                        </div>
                      </div>

                      <p className="text-[11px] text-ink-100/35 leading-relaxed mb-4 flex-1">
                        {s.description?.substring(0, 100)}...
                      </p>

                      <div className="flex gap-2">
                        <a href={s.applicationLink} target="_blank" rel="noopener noreferrer"
                          className="flex-1 btn-primary text-[11px] py-2.5 justify-center">
                          Apply Now <ExternalLink size={11} />
                        </a>
                        <button
                          onClick={() => handleSave(s._id)}
                          disabled={saving === s._id || saved[s._id]}
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                          style={{
                            background: saved[s._id] ? 'rgba(155,126,255,0.2)' : 'rgba(255,255,255,0.04)',
                            border: '0.5px solid rgba(155,126,255,0.2)',
                          }}
                        >
                          {saved[s._id]
                            ? <Check size={14} className="text-violet-400" />
                            : <BookmarkPlus size={14} className="text-ink-100/40" />
                          }
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {scholarships.length === 0 && (
                    <div className="col-span-2 text-center py-20">
                      <div className="text-4xl mb-3">🔍</div>
                      <div className="text-ink-100/40 text-sm mb-2">
                        No scholarships found for {selectedState} yet.
                      </div>
                      <div className="text-ink-100/25 text-[12px]">
                        We're adding more state scholarships daily. Check All India scholarships in the meantime!
                      </div>
                      <button
                        onClick={handleAllIndia}
                        className="btn-primary text-sm py-2.5 px-6 mt-4"
                      >
                        View All India Scholarships
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}