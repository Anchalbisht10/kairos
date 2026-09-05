import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/auth/me')
      if (data.success) setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const { data } = await axios.post('/auth/login', { email, password })
    if (data.success) setUser(data.user)
    return data
  }

  const signup = async (formData) => {
    const { data } = await axios.post('/auth/signup', formData)
    if (data.success) setUser(data.user)
    return data
  }

  const logout = async () => {
    await axios.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)