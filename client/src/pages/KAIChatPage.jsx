import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Plus, History, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/shared/AppLayout'
import PageLoader from '../components/shared/PageLoader'
import axios from 'axios'
import toast from 'react-hot-toast'

const WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'kai',
  text: "Hey! I'm KAI — your older sister who already made it through. 💜\n\nTell me what's on your mind. It could be about college, scholarships, career, family pressure, or just how you're feeling. No question is too small or too basic here.",
}

export default function KAIChatPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [messages,       setMessages]       = useState([WELCOME_MESSAGE])
  const [input,          setInput]          = useState('')
  const [thinking,       setThinking]       = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [conversations,  setConversations]  = useState([])
  const [showHistory,    setShowHistory]    = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    if (!loading && !user) navigate('/login')
  }, [user, loading])

  useEffect(() => {
    if (user) {
      loadHistory()
      loadAllConversations()
    }
  }, [user])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const loadHistory = async () => {
    setLoadingHistory(true)
    try {
      const { data } = await axios.get('/kai/conversations')
      if (data.conversations?.length > 0) {
        const latest = data.conversations[0]
        if (latest.messages?.length > 0) {
          const restored = latest.messages.map((m, i) => ({
            id: i, sender: m.sender, text: m.text,
          }))
          setMessages([WELCOME_MESSAGE, ...restored])
        }
      }
    } catch {}
    finally { setLoadingHistory(false) }
  }

  const loadAllConversations = async () => {
    try {
      const { data } = await axios.get('/kai/conversations')
      setConversations(data.conversations || [])
    } catch {}
  }

  const loadConversation = (conv) => {
    if (conv.messages?.length > 0) {
      const restored = conv.messages.map((m, i) => ({
        id: i, sender: m.sender, text: m.text,
      }))
      setMessages([WELCOME_MESSAGE, ...restored])
    }
    setShowHistory(false)
  }

  const sendMessage = async () => {
    if (!input.trim() || thinking) return
    const userMsg = { id: Date.now(), sender: 'user', text: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)
    try {
      const history = messages.filter(m => m.id !== 'welcome').map(m => ({
        sender: m.sender, text: m.text,
      }))
      const { data } = await axios.post('/kai/chat', {
        message: userMsg.text,
        conversationHistory: history,
      })
      const kaiMsg = {
        id: Date.now() + 1, sender: 'kai',
        text: data.response, isCrisis: data.isCrisis,
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  if (loading) return <PageLoader />

  return (
    <AppLayout>
      <div className="flex" style={{ height: '100dvh' }}>

        {/* History sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-72 flex-shrink-0 border-r border-violet-500/10 flex flex-col"
              style={{ background: '#070118' }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/10">
                <span className="text-[12px] font-semibold text-ink-100/60">Chat History</span>
                <button onClick={() => setShowHistory(false)}
                  className="text-ink-100/30 hover:text-ink-100/60">
                  <X size={15} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                {conversations.length === 0 ? (
                  <p className="text-[11px] text-ink-100/25 text-center mt-4">No previous chats</p>
                ) : (
                  conversations.map((conv, i) => (
                    <button key={conv._id}
                      onClick={() => loadConversation(conv)}
                      className="text-left p-3 rounded-xl hover:bg-violet-500/10 transition-all"
                    >
                      <div className="text-[11px] font-semibold text-ink-100/60 mb-1">
                        Chat {conversations.length - i}
                      </div>
                      <div className="text-[10px] text-ink-100/30 truncate">
                        {conv.messages?.[0]?.text?.substring(0, 50) || 'No messages'}...
                      </div>
                      <div className="text-[9px] text-ink-100/20 mt-1">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main chat */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-violet-500/08 bg-void-950/80 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-ink-100/30 hover:text-violet-400 transition-colors p-1.5 rounded-lg hover:bg-violet-500/10"
                title="Chat history"
              >
                <History size={16} />
              </button>
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
            <button
              onClick={() => setMessages([WELCOME_MESSAGE])}
              className="text-[11px] text-ink-100/30 hover:text-violet-400 transition-colors px-3 py-1.5 rounded-lg border border-violet-500/20 hover:border-violet-500/40"
            >
              + New Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      if (line.trim() === '---') return <hr key={i} className="border-fuchsia-500/20 my-3" />
                      if (line.startsWith('- ')) return (
                        <div key={i} className="flex gap-2 mt-1.5">
                          <span className="text-fuchsia-400 flex-shrink-0">•</span>
                          <span dangerouslySetInnerHTML={{ __html: boldLine.replace(/^- /, '') }} />
                        </div>
                      )
                      if (line.trim() === '') return <div key={i} className="h-2" />
                      return <p key={i} dangerouslySetInnerHTML={{ __html: boldLine }} />
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {thinking && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                className="flex gap-3 max-w-2xl">
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
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
              {['Find me scholarships','Help with my career',"I'm feeling lost",'Entrance exam help','Family pressure'].map(prompt => (
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
              KAI understands English and Hinglish 💜
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}