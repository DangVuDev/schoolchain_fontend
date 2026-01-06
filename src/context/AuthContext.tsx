// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { post_login, post_register } from '../service/auth.service'
import { getUserInfoFormServer } from '../service/user.service'
import { getWalletInfoFromServer } from '../service/wallet.service'

interface AuthContextType {
  accessToken: string
  refreshToken: string
  isLoggedIn: boolean
  balance: number
  userName: string
  walletAddress: string
  email: string
  phone: string
  studentId: string
  register: (data: any) => Promise<boolean>
  login: (student_id: string, password: string) => Promise<boolean>
  logout: () => void
  getUserInfo: () => void
  getBalanceInfo: () => void
}

const AuthContext = createContext<AuthContextType>({
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  balance: 0,
  userName: '',
  walletAddress: '',
    email: '',
    phone: '',
    studentId: '',
  register: async () => false,
  login: async () => false,
  logout: () => {},
  getUserInfo: () => {},
  getBalanceInfo: () => {}
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
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
      setWalletAddress(localStorage.getItem('walletAddress') || '')
    }
  }, [])

  const login = async (student_id: string, password: string) => {
    const loginResponse =  await post_login({ student_id, password });
    if (loginResponse.success) {
      setIsLoggedIn(true)
      setAccessToken(loginResponse.data.access_token)
      setRefreshToken(loginResponse.data.refresh_token)
      return true
    }
    return false
  }

  const register = async (data: any) => {
    const registerResponse =  await post_register(data);
    if (registerResponse.success) {
      setIsLoggedIn(true)
      setAccessToken(registerResponse.data.access_token)
      setRefreshToken(registerResponse.data.refresh_token)
      return true
    }
    return false
  }


  const getUserInfo = async () => {
    const userResponse = await getUserInfoFormServer()

    if(userResponse != null){
      setEmail(userResponse.data.email)
      setPhone(userResponse.data.phone??'')
      setStudentId(userResponse.data.student_id)
      setUserName(userResponse.data.full_name)
    }
  }

  const getBalanceInfo = async () => {
    const walletResponse = await getWalletInfoFromServer()
    if(walletResponse != null){
      console.log("Wallet Info:", walletResponse.data);
      setWalletAddress(walletResponse.data.address)
      setBalance(walletResponse.data.vndc_balance)
    }
  }



  const logout = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    setBalance(0)
    setUserName('')
    setWalletAddress('')
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, isLoggedIn, balance, userName, walletAddress, email, phone, studentId, register, login, logout,getUserInfo,getBalanceInfo }}>
      {children}
    </AuthContext.Provider>
  )
}