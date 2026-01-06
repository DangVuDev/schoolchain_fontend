// src/pages/Register.tsx – SẠCH NHẤT VIỆT NAM 2025
import { CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CHỈ KHAI BÁO 1 LẦN – DÙNG LẠI Ở CẢ LOGIN VÀ REGISTER
const inputClass = "w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition"
const eyeBtnClass = "absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const strength = password.length >= 12 ? 4 : password.length >= 9 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!termsAccepted || strength < 3) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      student_id: formData.get('student_id') as string,
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string
    }

    if (data.password !== formData.get('confirmPassword') as string) {
      alert('Mật khẩu không khớp')
      return
    }

    console.log('FORM DATA:', data)

    navigate('/passphrase', { state: data })
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
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-xl">
              <span className="text-4xl font-black">₫</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Tạo tài khoản mới
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" placeholder="Mã số sinh viên" name="student_id" className={inputClass} required />
            <input type="text" placeholder="Họ và tên" name="full_name" className={inputClass} required />
            <input type="text" placeholder="Số điện thoại" name="phone" className={inputClass} required />
            <div>
              <input type="email" placeholder="Email sinh viên (@edu.vn)" name="email" className={inputClass} required />
              <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                <CheckCircle2 size={14} /> Bắt buộc đuôi .edu.vn
              </p>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu mạnh (tối thiểu 9 ký tự)"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + " pr-12"}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={eyeBtnClass}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {password && (
                <div className="mt-3">
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-all ${i < strength ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-white/10'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-bold mt-1.5 ${strength === 4 ? 'text-emerald-400' : strength === 3 ? 'text-yellow-400' : strength === 2 ? 'text-orange-400' : 'text-red-400'}`}>
                    {strength === 4 ? 'Rất mạnh' : strength === 3 ? 'Mạnh' : strength === 2 ? 'Trung bình' : 'Yếu'}
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} placeholder="Nhập lại mật khẩu" name="confirmPassword" className={inputClass + " pr-12"} required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={eyeBtnClass}>
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <label className="flex items-start gap-3 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 accent-purple-500 rounded"
              />
              <span className="text-white/70 leading-tight">
                Tôi đồng ý với <span className="text-purple-400 font-bold">Điều khoản dịch vụ</span> và{' '}
                <span className="text-purple-400 font-bold">Chính sách bảo mật</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={!termsAccepted || strength < 3}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
                termsAccepted && strength >= 3
                  ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-lg shadow-purple-600/50 hover:scale-105'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              Tiếp tục
            </button>
          </form>

          <p className="text-center mt-8 text-white/60 text-sm">
            Đã có tài khoản?{' '}
            <a href="/login" className="font-bold text-purple-400 hover:text-purple-300">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}