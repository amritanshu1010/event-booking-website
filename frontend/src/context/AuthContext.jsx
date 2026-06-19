import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const savedUser = localStorage.getItem('event-user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (nextUser) => {
    setUser(nextUser)

    if (typeof window !== 'undefined') {
      localStorage.setItem('event-user', JSON.stringify(nextUser))
    }
  }

  const logout = () => {
    setUser(null)

    if (typeof window !== 'undefined') {
      localStorage.removeItem('event-user')
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
