// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  balance: number
  userName: string
  walletAddress: string
  email: string
  phone: string
  studentId: string
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  balance: 0,
  userName: '',
  walletAddress: '',
    email: '',
    phone: '',
    studentId: '',
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [balance, setBalance] = useState(0)
  const [userName, setUserName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [studentId, setStudentId] = useState('')

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(logged)
    if (logged) {
      setBalance(Number(localStorage.getItem('balance') || 50000))
      setUserName(localStorage.getItem('userName') || 'Sinh viên')
      setWalletAddress(localStorage.getItem('walletAddress') || '0xAbC...XyZ123')
    }
  }, [])

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('balance', '50000')
    localStorage.setItem('userName', 'Nguyễn Văn A')
    localStorage.setItem('walletAddress', '0x71C2...9f8a')
    setIsLoggedIn(true)
    setBalance(50000)
    setUserName('Nguyễn Văn A')
    setWalletAddress('0x71C2...9f8a')
  }

  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setBalance(0)
    setUserName('')
    setWalletAddress('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, balance, userName, walletAddress, email, phone, studentId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}