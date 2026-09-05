import { motion } from 'framer-motion'

const avatars = [
  '🌟', '✨', '💫', '🌸', '🌺', '🌻', '🌹', '🦋',
  '🌙', '⭐', '🔮', '💎', '🌈', '🦄', '🌊', '🍀',
  '🌴', '🎯', '🚀', '💜', '🌿', '🦚', '🎨', '🌛',
  '🔆', '💐', '🎪', '🌮', '🎭', '🦋',
]

export default function AvatarPicker({ selected, onSelect }) {
  return (
    <div className="w-full">
      <p className="text-[11px] text-ink-100/40 mb-3 tracking-wide">
        Choose your avatar — no photos needed 💜
      </p>
      <div className="grid grid-cols-6 gap-2">
        {avatars.map((avatar, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => onSelect(avatar)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full aspect-square rounded-xl text-2xl flex items-center justify-center transition-all duration-200 ${
              selected === avatar
                ? 'ring-2 ring-violet-500 bg-violet-500/20'
                : 'bg-white/[0.03] hover:bg-violet-500/10 border border-white/[0.06]'
            }`}
          >
            {avatar}
          </motion.button>
        ))}
      </div>
    </div>
  )
}