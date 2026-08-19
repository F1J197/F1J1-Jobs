"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, MOCK_USERS } from './mock-data'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('vitiwork_user') || localStorage.getItem('fijijobs_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = MOCK_USERS.find(u => u.email === email)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('vitiwork_user', JSON.stringify(foundUser))
      localStorage.removeItem('fijijobs_user')
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vitiwork_user')
    localStorage.removeItem('fijijobs_user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
