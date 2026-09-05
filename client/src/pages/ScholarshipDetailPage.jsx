import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, BookmarkPlus,
  Check, Award, FileText, Lightbulb,
  ChevronRight, Clock, Users
} from 'lucide-react'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function ScholarshipDetailPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { user }     = useAuth()
  const [scholarship, setScholarship] = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [saved,       setSaved]       = useState(false)

  useEffect(() => {
    fetchScholarship()
  }, [id])

  const fetchScholarship = async () => {
    try {
      const { data } = await axios.get(`/scholarships/${id}`)
      setScholarship(data.scholarship)
      // Check if already saved
      if (user) {
        const isSaved = user.savedScholarships?.some(
          s => s.scholarship === id || s.scholarship?._id === id
        )
        setSaved(isSaved)
      }
    } catch {
      toast.error('Scholarship not found')
      navigate('/scholarships')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return toast.error('Please login to save')
    setSaving(true)
    try {
      await axios.post('/users/scholarships/save', {
        scholarshipId: id,
        status: 'saved',
      })
      setSaved(true)
      toast.success('Scholarship saved! 💜')
    } catch {
      toast.error('Could not save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
      </div>
    </AppLayout>
  )

  if (!scholarship) return null

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/scholarships')}
          className="flex items-center gap-2 text-[12px] text-ink-100/35 hover:text-violet-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Scholarships
        </motion.button>

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-5"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(155,126,255,0.1)', border: '0.5px solid rgba(155,126,255,0.2)' }}>
              <Award size={20} className="text-violet-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-[16px] font-bold text-ink-100/90 leading-snug mb-1">
                {scholarship.title}
              </h1>
              <p className="text-[12px] text-ink-100/40">{scholarship.provider}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[10px] px-3 py-1 rounded-full font-semibold"
              style={{ background: 'rgba(155,126,255,0.1)', color: '#9B7EFF' }}>
              {scholarship.providerType}
            </span>
            {scholarship.eligibility?.genderSpecific === 'Girls Only' && (
              <span className="text-[10px] px-3 py-1 rounded-full font-semibold"
                style={{ background: 'rgba(232,121,249,0.1)', color: '#E879F9' }}>
                Girls Only 💜
              </span>
            )}
            {scholarship.eligibility?.states?.map(state => (
              <span key={state} className="text-[10px] px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(237,232,255,0.4)' }}>
                {state}
              </span>
            ))}
          </div>

          {/* Amount + Deadline */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(155,126,255,0.06)', border: '0.5px solid rgba(155,126,255,0.15)' }}>
              <div className="text-[10px] text-ink-100/30 uppercase tracking-wider mb-1">Amount</div>
              <div className="font-display font-bold text-2xl gradient-text">
                ₹{scholarship.amount?.toLocaleString()}
              </div>
              <div className="text-[11px] text-ink-100/35 mt-0.5">{scholarship.amountDesc}</div>
            </div>
            <div className="rounded-xl p-4"
              style={{ background: 'rgba(155,126,255,0.06)', border: '0.5px solid rgba(155,126,255,0.15)' }}>
              <div className="text-[10px] text-ink-100/30 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock size={10} /> Deadline
              </div>
              <div className="font-semibold text-[14px] text-ink-100/80">
                {scholarship.deadline || 'Check portal'}
              </div>
              <div className="text-[10px] text-orange-400/70 mt-1">
                Verify on official portal
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <a
              href={scholarship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-sm py-3 justify-center"
            >
              Apply Now <ExternalLink size={13} />
            </a>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background: saved ? 'rgba(155,126,255,0.2)' : 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(155,126,255,0.2)',
              }}
            >
              {saved
                ? <Check size={16} className="text-violet-400" />
                : <BookmarkPlus size={16} className="text-ink-100/40" />
              }
            </button>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-5"
        >
          <h2 className="font-bold text-[14px] text-ink-100/80 mb-3 flex items-center gap-2">
            <FileText size={15} className="text-violet-400" />
            About this Scholarship
          </h2>
          <p className="text-[13px] text-ink-100/50 leading-[1.85]">
            {scholarship.description}
          </p>
        </motion.div>

        {/* Eligibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-6 mb-5"
        >
          <h2 className="font-bold text-[14px] text-ink-100/80 mb-4 flex items-center gap-2">
            <Users size={15} className="text-violet-400" />
            Who Can Apply
          </h2>
          <div className="flex flex-col gap-2.5">
            {scholarship.eligibility?.categories?.length > 0 && (
              <div className="flex items-start gap-3">
                <ChevronRight size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-ink-100/30 uppercase tracking-wider">Categories: </span>
                  <span className="text-[12px] text-ink-100/60">{scholarship.eligibility.categories.join(', ')}</span>
                </div>
              </div>
            )}
            {scholarship.eligibility?.incomeLimit > 0 && (
              <div className="flex items-start gap-3">
                <ChevronRight size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-ink-100/30 uppercase tracking-wider">Income Limit: </span>
                  <span className="text-[12px] text-ink-100/60">Below ₹{scholarship.eligibility.incomeLimit.toLocaleString()} per year</span>
                </div>
              </div>
            )}
            {scholarship.eligibility?.courseLevels?.length > 0 && (
              <div className="flex items-start gap-3">
                <ChevronRight size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-ink-100/30 uppercase tracking-wider">Course Levels: </span>
                  <span className="text-[12px] text-ink-100/60">{scholarship.eligibility.courseLevels.join(', ')}</span>
                </div>
              </div>
            )}
            {scholarship.eligibility?.minMarks > 0 && (
              <div className="flex items-start gap-3">
                <ChevronRight size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-ink-100/30 uppercase tracking-wider">Minimum Marks: </span>
                  <span className="text-[12px] text-ink-100/60">{scholarship.eligibility.minMarks}% or above</span>
                </div>
              </div>
            )}
            {scholarship.eligibility?.genderSpecific && (
              <div className="flex items-start gap-3">
                <ChevronRight size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-ink-100/30 uppercase tracking-wider">Gender: </span>
                  <span className="text-[12px] text-ink-100/60">{scholarship.eligibility.genderSpecific}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Documents Required */}
        {scholarship.documentsRequired?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 mb-5"
          >
            <h2 className="font-bold text-[14px] text-ink-100/80 mb-4 flex items-center gap-2">
              <FileText size={15} className="text-violet-400" />
              Documents You Need
            </h2>
            <div className="flex flex-col gap-2.5">
              {scholarship.documentsRequired.map((doc, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  <span className="text-[12px] text-ink-100/55">{doc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Application Steps */}
        {scholarship.applicationSteps?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card rounded-2xl p-6 mb-5"
          >
            <h2 className="font-bold text-[14px] text-ink-100/80 mb-5 flex items-center gap-2">
              <ChevronRight size={15} className="text-violet-400" />
              How to Apply — Step by Step
            </h2>
            <div className="flex flex-col gap-4">
              {scholarship.applicationSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[11px]"
                    style={{ background: 'rgba(155,126,255,0.15)', color: '#9B7EFF', border: '0.5px solid rgba(155,126,255,0.3)' }}>
                    {i + 1}
                  </div>
                  <p className="text-[12px] text-ink-100/55 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tips */}
        {scholarship.tips?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 mb-5"
            style={{ border: '0.5px solid rgba(232,121,249,0.15)' }}
          >
            <h2 className="font-bold text-[14px] text-ink-100/80 mb-4 flex items-center gap-2">
              <Lightbulb size={15} className="text-fuchsia-400" />
              KAI's Tips for This Scholarship
            </h2>
            <div className="flex flex-col gap-3">
              {scholarship.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(232,121,249,0.05)' }}>
                  <span className="text-fuchsia-400 flex-shrink-0 text-sm">💜</span>
                  <p className="text-[12px] text-ink-100/55 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-6 text-center"
        >
          <p className="text-[12px] text-ink-100/30 mb-4">
            Always verify deadline and eligibility on the official portal before applying. 💜
          </p>
          <a
            href={scholarship.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-10 py-3.5 inline-flex"
          >
            Go to Official Portal <ExternalLink size={13} />
          </a>
        </motion.div>

      </div>
    </AppLayout>
  )
}