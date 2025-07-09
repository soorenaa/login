'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type User = {
  name: {
    first: string
    last: string
  }
  phone: string
  picture: {
    thumbnail: string
  }
}

type AuthContextType = {
  user: User | null
  login: (phone: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (phone: string) => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us')
      const data = await response.json()
      const randomUser = data.results[0]
      console.log(data);
      
      const userData = {
        name: randomUser.name,
        phone: phone,
        picture: randomUser.picture
      }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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