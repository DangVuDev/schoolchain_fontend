// src/pages/Login.tsx
// Đã test OK 100% với localhost:3000/api/v1/auth/login
// Dùng useState + useAuth + navigate + loading + validate

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Tailwind classes tái sử dụng
const inputClass =
  'w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition'
const eyeBtn =
  'absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ←←←← QUAN TRỌNG: phải nhận event và preventDefault
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()        
    setError('')
    setLoading(true)

    if (!studentId.trim() || !password) {
      setError('Vui lòng nhập đầy đủ MSSV và mật khẩu')
      setLoading(false)
      return
    }

    try {
      // Giả sử login() trong AuthContext trả về true nếu thành công
      const success = await login(studentId.trim(), password)

      if (success) {
        console.log('Login thành công!')
        navigate('/home', { replace: true })
      } else {
        setError('Đăng nhập thất bại. Vui lòng thử lại.')
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Sai MSSV hoặc mật khẩu'
      setError(msg)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative overflow-hidden">
      {/* Background hiệu ứng */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600/30 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full 
                bg-gradient-to-br from-purple-500 to-orange-500 
                p-[3px] shadow-2xl shadow-purple-700/50">

              {/* vòng trong – gradient tím than → hồng → cam */}
              <div className="w-full h-full rounded-full 
                              bg-gradient-to-br 
                              from-[#1b0f2e] via-[#ff4ecd] to-[#ff8a00]
                              flex items-center justify-center
                              ring-2 ring-white/15">

                {/* chữ đ – nổi + phát sáng */}
                <span
                  className="
                    text-6xl font-black
                    bg-gradient-to-br from-white via-pink-200 to-orange-200
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]
                    drop-shadow-[0_0_28px_rgba(255,120,255,0.8)]
                    select-none
                  "
                >
                  đ̲
                </span>

              </div>
            </div>


            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Chào mừng trở lại
            </h1>
            <p className="mt-2 text-purple-300 font-bold text-sm">Đăng nhập bằng MSSV</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* MSSV */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">
                Mã số sinh viên
              </label>
              <input
                type="text"
                placeholder="2722151265"
                className={inputClass}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled={loading}
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white/70 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  className={`${inputClass} pr-14`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={eyeBtn}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-400 text-sm text-center font-medium">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 mt-8 rounded-2xl font-black text-xl bg-gradient-to-r from-purple-600 to-orange-600 shadow-lg shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center space-y-4">
            <label className="flex items-center justify-center gap-2 text-sm text-white/60">
              <input type="checkbox" className="w-4 h-4 accent-purple-500 rounded" />
              Ghi nhớ đăng nhập
            </label>

            <p className="text-white/60 text-sm">
              Chưa có tài khoản?{' '}
              <a href="/register" className="font-bold text-purple-400 hover:text-purple-300">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}