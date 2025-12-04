// src/pages/Login.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden bg-black text-white">

      {/* Background effects giống trang Send */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-orange-900/20" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-purple-600/40 blur-3xl rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-orange-600/40 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      {/* Card */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-12 shadow-2xl">

        {/* Logo */}
        <div className="text-center mb-12">
          <svg height="100" viewBox="0 0 90 90" width="100" className="mx-auto mb-6">
            <circle cx="45" cy="45" r="43" fill="url(#g)" opacity="0.2" />
            <text x="45" y="60" textAnchor="middle"
                  fontSize="48" fontWeight="900"
                  className="fill-transparent bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text">
              ₫
            </text>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa"/>
                <stop offset="100%" stopColor="#fb923c"/>
              </linearGradient>
            </defs>
          </svg>

          <h1 className="text-5xl font-black bg-gradient-to-r from-violet-300 to-orange-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="mt-4 inline-block px-6 py-2 rounded-full text-sm font-bold bg-white/10 border border-white/20 text-purple-300 shadow-xl backdrop-blur-xl">
            ⚡ 0 GAS FEE
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-8">

          {/* Student ID */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Student ID</label>
            <input
              type="text"
              placeholder="22DH110001"
              className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                         placeholder:text-white/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
                         transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                           placeholder:text-white/40 pr-14
                           focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition"
              >
                {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-3 text-white/60 cursor-pointer text-lg">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              Remember me
            </label>

            <button className="text-purple-300 font-semibold hover:text-purple-200 text-lg transition">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-6 rounded-3xl text-2xl font-black bg-gradient-to-r from-purple-600 to-orange-600 
                       text-white shadow-2xl active:scale-95 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-8 text-white/40 text-base">or continue with</div>

        {/* FaceID */}
        <button className="w-full py-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 
                           text-xl font-semibold flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
          <span className="text-2xl">🔐</span> FaceID / Biometric
        </button>

        <p className="text-center mt-8 text-white/60 text-lg">
          New student?{' '}
          <a href="/register" className="text-purple-300 font-bold hover:text-purple-200 transition">
            Create account
          </a>
        </p>
      </div>
    </div>
  )
}
