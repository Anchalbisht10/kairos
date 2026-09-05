import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Heart, MapPin, BookOpen, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function StoryCard({ story, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const colors = ['#9B7EFF', '#E879F9', '#C4B5FD']
  const color  = colors[index % 3]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 cursor-pointer hover:border-violet-500/25 transition-all duration-300 flex flex-col"
    >
      {/* Avatar + info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-3xl flex-shrink-0">{story.avatar || '🌟'}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] text-ink-100/85">{story.displayName}</div>
          {story.location?.city && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={9} className="text-ink-100/25" />
              <span className="text-[10px] text-ink-100/30">
                {story.location.city}, {story.location.state}
              </span>
            </div>
          )}
          {story.course && (
            <div className="flex items-center gap-1 mt-0.5">
              <BookOpen size={9} className="text-ink-100/25" />
              <span className="text-[10px] text-ink-100/25">{story.course}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {story.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {story.tags.slice(0, 3).map(tag => (
            <span key={tag}
              className="text-[9px] px-2.5 py-1 rounded-full font-semibold tracking-[0.5px]"
              style={{
                background: `${color}12`,
                color:      `${color}90`,
                border:     `0.5px solid ${color}25`,
              }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Story preview */}
      <p className="text-[12px] text-ink-100/45 leading-[1.8] flex-1 mb-5">
        "{story.storyText?.substring(0, 180)}..."
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-ink-100/25">
          <Heart size={12} />
          <span>{story.likes?.toLocaleString() || 0}</span>
        </div>
        <Link to="/stories"
          className="text-[10px] font-semibold transition-colors"
          style={{ color: `${color}80` }}>
          Read full story →
        </Link>
      </div>
    </motion.div>
  )
}

export default function StoriesPreview() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [stories,  setStories]  = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/stories?limit=3`)
      .then(res => setStories(res.data.stories || []))
      .catch(() => setStories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="stories" className="relative py-24">
      <div className="section">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-violet-500/30" />
              <span className="text-[10px] tracking-[3px] text-violet-400 uppercase font-semibold">
                Real stories
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-100">
              Girls just like you <br />
              <span className="gradient-text">who made it through.</span>
            </h2>
          </div>
          <Link to="/stories" className="btn-ghost text-sm self-start lg:self-auto">
            Read all stories →
          </Link>
        </motion.div>

        {/* Stories */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 rounded-full border border-violet-500/30 animate-ping" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.map((s, i) => (
              <StoryCard key={s._id} story={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}