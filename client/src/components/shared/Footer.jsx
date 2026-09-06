import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
const links = {
  Platform: [
    { label: 'Meet KAI',       href: '/chat'          },
    { label: 'Career Compass', href: '/compass'       },
    { label: 'Scholarships',   href: '/scholarships'  },
    { label: 'Stories',        href: '/stories'       },
    { label: 'Ask Anything',   href: '/ask'           },
  ],
  Support: [
    { label: 'Our Mission',    href: '/about'         },
    { label: 'The Creator',    href: '/creator'       },
    { label: 'Privacy Policy', href: '/privacy'       },
    { label: 'Terms of Use',   href: '/terms'         },
    { label: 'Contact',        href: '/contact'       },
    { label: 'Accessibility',  href: '/accessibility' },
  ],
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
        <li key={item.label}>
          <Link
            to={item.href}
            className="text-[12px] text-ink-100/28 hover:text-violet-300 transition-colors duration-200"
          >
            {item.label}
          </Link>
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