import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar          from '../components/shared/Navbar'
import HeroSection     from '../components/Landing/HeroSection'
import StatsSection    from '../components/Landing/StatsSection'
import FeaturesSection from '../components/Landing/FeaturesSection'
import KAIChatPreview  from '../components/Landing/KAIChatPreview'
import StoriesPreview  from '../components/Landing/StoriesPreview'
import FeedbackSection from '../components/Landing/FeedbackSection'
import CTASection      from '../components/Landing/CTASection'
import Footer          from '../components/shared/Footer'
import LiquidBackground from '../three/LiquidBackground'
import FeedbackWidget  from '../components/shared/FeedbackWidget'
import ScrollReveal    from '../components/Landing/ScrollReveal'
import PWAInstallPrompt from '../components/shared/PWAInstallPrompt'

export default function LandingPage() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="relative bg-void-950 overflow-x-hidden">

      {/* Scroll ribbon reveal — shows once on first load */}
      {!revealed && (
        <ScrollReveal onComplete={() => setRevealed(true)} />
      )}

      <LiquidBackground />
      <FeedbackWidget />

   <motion.div
  className="relative z-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
>
  <Navbar />
  <HeroSection />
  <StatsSection />
        <FeaturesSection />
        <KAIChatPreview />
        <StoriesPreview />
        <FeedbackSection />
        <CTASection />
        <Footer />
        <PWAInstallPrompt />
   </motion.div>
    </div>
  )
}