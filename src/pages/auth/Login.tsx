// src/pages/Login.tsx – SẠCH NHẤT VIỆT NAM 2025
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

// REUSABLE CLASSES – CHỈ KHAI BÁO 1 LẦN
const inputClass = "w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition"
const eyeBtnClass = "absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-5 py-12 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/30 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-purple-600/50">
              <span className="text-5xl font-black">₫</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Chào mừng trở lại
            </h1>
            <p className="mt-2 text-purple-300 font-bold text-sm">Đăng nhập bằng MSSV</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-white/70">Mã số sinh viên</label>
              <input type="text" placeholder="22DH110001" className={inputClass} required />
            </div>

            <div>
              <label className="text-sm font-semibold text-white/70">Mật khẩu</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  className={inputClass + " pr-12"}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={eyeBtnClass}>
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-purple-500 rounded" />
                <span className="text-white/60">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-purple-400 font-medium hover:text-purple-300">
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-5 mt-6 rounded-2xl font-black text-xl bg-gradient-to-r from-purple-600 to-orange-600 shadow-lg shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all"
            >
              Đăng nhập
            </button>
          </form>

          <div className="my-8 text-center">
            <div className="inline-flex items-center gap-3 text-white/60 text-sm">
              <div className="w-12 h-px bg-white/20" />
              <span>hoặc</span>
              <div className="w-12 h-px bg-white/20" />
            </div>
            <button className="mt-4 w-full py-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center gap-3 hover:bg-white/15 transition text-sm font-medium">
              <span className="text-2xl">Face ID</span>
              Đăng nhập bằng khuôn mặt
            </button>
          </div>

          <p className="text-center text-white/60 text-sm">
            Chưa có tài khoản?{' '}
            <a href="/register" className="font-bold text-purple-400 hover:text-purple-300">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}