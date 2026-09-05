import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Sparkles, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/shared/AppLayout'
import axios from 'axios'
import toast from 'react-hot-toast'
import PageLoader from '../components/shared/PageLoader'

const WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'kai',
  text: "Hey! I'm KAI — your older sister who already made it through. 💜\n\nTell me what's on your mind. It could be about college, scholarships, career, family pressure, or just how you're feeling. No question is too small or too basic here.",
}

export default function KAIChatPage() {
const { user, loading } = useAuth()
const navigate = useNavigate()
const [messages,  setMessages]  = useState([WELCOME_MESSAGE])
const [input,     setInput]     = useState('')
const [thinking,  setThinking]  = useState(false)
const [loadingHistory, setLoadingHistory] = useState(false)
const bottomRef = useRef(null)
const inputRef  = useRef(null)

 useEffect(() => {
  if (!loading && !user) navigate('/login')
}, [user, loading])

useEffect(() => {
  if (user) loadHistory()
}, [user])

const loadHistory = async () => {
  setLoadingHistory(true)
  try {
    const { data } = await axios.get('/kai/conversations')
    if (data.conversations?.length > 0) {
      const latest = data.conversations[0]
      if (latest.messages?.length > 0) {
        const restored = latest.messages.map((m, i) => ({
          id:     i,
          sender: m.sender,
          text:   m.text,
        }))
        setMessages([WELCOME_MESSAGE, ...restored])
      }
    }
  } catch {
    // No history — start fresh
  } finally {
    setLoadingHistory(false)
  }
}

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

const sendMessage = async () => {
  if (!input.trim() || thinking) return

  const userMsg = { id: Date.now(), sender: 'user', text: input.trim() }
  setMessages(prev => [...prev, userMsg])
  setInput('')
  setThinking(true)

  try {
    const history = messages.filter(m => m.id !== 'welcome').map(m => ({
      sender: m.sender,
      text:   m.text,
    }))

    const { data } = await axios.post('/kai/chat', {
      message: userMsg.text,
      conversationHistory: history,
    })

    const kaiMsg = {
      id:       Date.now() + 1,
      sender:   'kai',
      text:     data.response,
      isCrisis: data.isCrisis,
    }
    setMessages(prev => [...prev, kaiMsg])
  } catch {
    toast.error('KAI is taking a moment — please try again 💜')
  } finally {
    setThinking(false)
    inputRef.current?.focus()
  }
}

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

 if (loading) return <PageLoader />

  return (
    <AppLayout>
      <div className="flex flex-col" style={{ height: '100dvh' }}>

        {/* Chat header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-violet-500/08 bg-void-950/80 backdrop-blur-xl flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-ink-100/90">KAI</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-ink-100/30">Always here for you</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ duration: 0.35 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-2xl ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} w-full`}
              >
                {msg.sender === 'kai' && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                    <Sparkles size={13} className="text-white" />
                  </div>
                )}
                {msg.sender === 'user' && (
                  <div className="text-xl flex-shrink-0 mt-1">{user?.avatar}</div>
                )}
     <div
  className={`px-4 py-3 rounded-2xl text-[13px] leading-[1.75] max-w-[85%] ${
    msg.sender === 'user'
      ? 'bg-violet-600/25 border border-violet-500/25 text-ink-100/85 rounded-tr-sm'
      : msg.isCrisis
        ? 'border text-ink-100/75 rounded-tl-sm'
        : 'bg-white/[0.04] border border-white/[0.07] text-ink-100/75 rounded-tl-sm'
  }`}
  style={msg.isCrisis ? {
    background: 'rgba(232,121,249,0.06)',
    border: '0.5px solid rgba(232,121,249,0.25)',
  } : {}}
>
  {msg.isCrisis && (
    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-fuchsia-500/20">
      <span className="text-sm">💜</span>
      <span className="text-[10px] font-semibold text-fuchsia-400/70 uppercase tracking-wider">
        KAI is here for you
      </span>
    </div>
  )}
  {msg.text.split('\n').map((line, i) => {
    const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    if (line.trim() === '---') return (
      <hr key={i} className="border-fuchsia-500/20 my-3" />
    )
    if (line.startsWith('- ')) return (
      <div key={i} className="flex gap-2 mt-1.5">
        <span className="text-fuchsia-400 flex-shrink-0">•</span>
        <span dangerouslySetInnerHTML={{ __html: boldLine.replace(/^- /, '') }} />
      </div>
    )
    if (line.trim() === '') return <div key={i} className="h-2" />
    return (
      <p key={i} dangerouslySetInnerHTML={{ __html: boldLine }} />
    )
  })}
</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Thinking indicator */}
          {thinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0  }}
              className="flex gap-3 max-w-2xl"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7C5CFC, #9B7EFF)' }}>
                <Sparkles size={13} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.07] flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 px-4 lg:px-8 py-4 border-t border-violet-500/08 bg-void-950/80 backdrop-blur-xl">

          {/* Quick prompts */}
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
            {[
              'Find me scholarships',
              'Help with my career',
              'I\'m feeling lost',
              'Entrance exam help',
              'Family pressure',
            ].map(prompt => (
              <button key={prompt} onClick={() => setInput(prompt)}
                className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full border border-violet-500/20 text-violet-400/70 hover:text-violet-300 hover:border-violet-500/40 transition-all whitespace-nowrap">
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1 glass-card rounded-2xl px-4 py-3 flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Talk to KAI — ask anything, share how you're feeling..."
                rows={1}
                className="flex-1 bg-transparent text-[13px] text-ink-100/80 placeholder-ink-100/20 outline-none resize-none max-h-32 leading-relaxed"
                style={{ minHeight: '24px' }}
                onInput={e => {
                  e.target.style.height = 'auto'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!input.trim() || thinking}
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: input.trim() && !thinking
                  ? 'linear-gradient(135deg, #7C5CFC, #9B7EFF)'
                  : 'rgba(155,126,255,0.1)',
              }}
            >
              <Send size={16} className={input.trim() && !thinking ? 'text-white' : 'text-violet-500/40'} />
            </motion.button>
          </div>
          <p className="text-[10px] text-ink-100/15 text-center mt-2">
            KAI understands English and Hinglish — type however feels natural 💜
          </p>
        </div>
      </div>
    </AppLayout>
  )
}