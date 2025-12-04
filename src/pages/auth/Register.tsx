// src/pages/Register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const getStrength = () => {
    if (password.length >= 12) return 4
    if (password.length >= 9) return 3
    if (password.length >= 6) return 2
    if (password.length > 0) return 1
    return 0
  }

  const strength = getStrength()
  const strengthColors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) return
    navigate('/passphrase')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black via-black to-gray-900 relative overflow-hidden text-white">
      
      {/* Background neon blur effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-purple-600/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-orange-600/40 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-12 shadow-2xl">

        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 shadow-[0_0_25px_rgba(255,165,0,0.5)] mb-6">
            <span className="text-5xl font-black">₫</span>
          </div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-violet-300 to-orange-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="inline-block px-6 py-2 rounded-full text-sm font-bold bg-white/10 border border-white/20 text-purple-300 shadow-xl backdrop-blur-xl">
            ⚡ 0 GAS FEE • FREE FOREVER
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Student ID */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Student ID</label>
            <input
              type="text"
              placeholder="22DH110001"
              className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                         placeholder:text-white/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all"
              required
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Full Name</label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                         placeholder:text-white/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all"
              required
            />
          </div>

          {/* University Email */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">University Email</label>
            <input
              type="email"
              placeholder="abc@hcmut.edu.vn"
              className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                         placeholder:text-white/40 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 transition-all"
              required
            />
            <p className="text-sm text-purple-400 mt-2 flex items-center gap-2">
              <CheckCircle2 size={18} /> Must end with .edu.vn
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter strong password"
                className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                           placeholder:text-white/40 pr-14 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition"
              >
                {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
              </button>
            </div>

            {/* Strength bar */}
            {password.length > 0 && (
              <div className="mt-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="h-3 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i <= strength ? strengthColors[strength - 1] : '#334155' }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium" style={{ color: strengthColors[strength - 1] || '#94a3b8' }}>
                  {strength === 4 && 'Very Strong'}
                  {strength === 3 && 'Strong'}
                  {strength === 2 && 'Medium'}
                  {strength === 1 && 'Weak'}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-3 text-lg font-semibold text-white/80">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter password"
                className="w-full px-6 py-5 text-xl rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 
                           placeholder:text-white/40 pr-14 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition"
              >
                {showConfirm ? <EyeOff size={26} /> : <Eye size={26} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-7 h-7 mt-1 rounded border-2 border-purple-400/40 accent-purple-500"
            />
            <span className="text-white/80 text-base leading-relaxed">
              I agree to the <span className="text-purple-300 font-bold">Terms of Service</span> and{' '}
              <span className="text-purple-300 font-bold">Privacy Policy</span>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={!termsAccepted || strength < 3}
            className={`w-full py-6 text-2xl font-black rounded-3xl bg-gradient-to-r from-purple-600 to-orange-600 text-white shadow-2xl tracking-wide transition-all ${
              !termsAccepted || strength < 3
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)]'
            }`}
          >
            Create Account →
          </button>
        </form>

        <p className="text-center mt-8 text-white/60 text-lg">
          Already have an account?{' '}
          <a href="/login" className="text-purple-300 font-bold hover:text-purple-200 transition">
            Sign In
          </a>
        </p>

      </div>
    </div>
  )
}
