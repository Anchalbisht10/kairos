import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

const links = {
  Platform: ['Meet KAI', 'Career Compass', 'Scholarships', 'Stories', 'Ask Anything'],
Support: ['Our Mission', 'The Creator', 'Privacy Policy', 'Terms of Use', 'Contact', 'Accessibility'],
  Community:['Student Stories', 'Scholarship Winners', 'Mentorship', 'Campus Connect'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-violet-500/08 py-16">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-display font-extrabold text-base tracking-[4px] text-ink-100">
                KAI<span className="gradient-text">ROS</span>
              </span>
            </div>
            <p className="text-ink-100/30 text-[12px] leading-[1.85] max-w-xs mb-6">
              The sacred moment every first-generation student deserves.
              Built for the girl who needed an older sister and found this instead.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-ink-100/20">
              <span>Built by Anchal Bisht with</span>
              <Heart size={11} className="text-violet-400" />
              <span>for first-gen students in India</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-violet-400/50 mb-4">
                {category}
              </div>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a  href={
  item === 'Our Mission'    ? '/about'       :
  item === 'The Creator'    ? '/creator'     :
  item === 'Privacy Policy' ? '/privacy'     :
  item === 'Terms of Use'   ? '/terms'       :
  item === 'Contact'        ? '/contact'     :
  item === 'Accessibility'  ? '/accessibility':
  '#'
}
  className="text-[12px] text-ink-100/28 hover:text-violet-300 transition-colors duration-200"
>
  {item}
</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-violet-500/08">
          <p className="text-[11px] text-ink-100/18">
            © 2026 KAIROS. Built for every first-generation student.
          </p>
          <p className="text-[11px] text-ink-100/18">
            Free forever · Always judgment-free · Built with love
          </p>
        </div>
      </div>
    </footer>
  )
}