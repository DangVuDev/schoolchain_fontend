import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/home' : '/register')
    }, 3000)
    return () => clearTimeout(timer)
  }, [isLoggedIn, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 animate-spin-slow shadow-neon mb-12" />
      <h1 className="text-7xl font-black bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
        VNDC CAMPUS
      </h1>
      <p className="text-gray-400 mt-4 text-lg">v3.0 • Polygon zkEVM • 0 GAS FEE</p>
      <div className="w-96 h-3 bg-gray-800 rounded-full mt-16 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-orange-500 w-4/5 animate-pulse" />
      </div>
    </div>
  )
}