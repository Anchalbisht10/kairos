import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import LandingPage     from './pages/LandingPage'
import LoginPage       from './pages/LoginPage'
import SignupPage      from './pages/SignupPage'
import DashboardPage   from './pages/DashboardPage'
import KAIChatPage     from './pages/KAIChatPage'
import ScholarshipsPage from './pages/ScholarshipsPage'
import StoriesPage     from './pages/StoriesPage'
import AskPage         from './pages/AskPage'
import CompassPage     from './pages/CompassPage'
import PageTransition  from './components/shared/PageTransition'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage         from './pages/TermsPage'
import AccessibilityPage from './pages/AccessibilityPage'
import ContactPage       from './pages/ContactPage'
import CreatorPage from './pages/CreatorPage'
import ScholarshipDetailPage from './pages/ScholarshipDetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0a0125',
            color: '#EDE8FF',
            border: '1px solid rgba(155,126,255,0.2)',
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
          <Route path="/chat" element={<PageTransition><KAIChatPage /></PageTransition>} />
          <Route path="/scholarships" element={<PageTransition><ScholarshipsPage /></PageTransition>} />
          <Route path="/stories" element={<PageTransition><StoriesPage /></PageTransition>} />
          <Route path="/ask" element={<PageTransition><AskPage /></PageTransition>} />
          <Route path="/compass" element={<PageTransition><CompassPage /></PageTransition>} />
          <Route path="/about" element={
  <PageTransition><AboutPage /></PageTransition>
} />
<Route path="/admin" element={
  <PageTransition><AdminPage /></PageTransition>
} />
<Route path="/privacy" element={
  <PageTransition><PrivacyPage /></PageTransition>
} />
<Route path="/terms" element={
  <PageTransition><TermsPage /></PageTransition>
} />
<Route path="/accessibility" element={
  <PageTransition><AccessibilityPage /></PageTransition>
} />
<Route path="/contact" element={
  <PageTransition><ContactPage /></PageTransition>
} />
        <Route path="/creator" element={
  <PageTransition><CreatorPage /></PageTransition>
} />
<Route path="*" element={
  <PageTransition><NotFoundPage /></PageTransition>
} />
        <Route path="/scholarships/:id" element={
          <PageTransition><ScholarshipDetailPage /></PageTransition>
        } />
        </Routes>
      </AnimatePresence>
    </>
  )
}