// src/pages/PassphraseSetup.tsx
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RefreshCw, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'


export default function PassphraseSetup() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { register } = useAuth()
  const [passphrase, setPassphrase] = useState<string[]>(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Focus tự động sang ô tiếp theo khi nhập
  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return // chỉ cho phép 1 chữ số hoặc rỗng

    const newPassphrase = [...passphrase]
    newPassphrase[index] = value
    setPassphrase(newPassphrase)

    // Tự động focus ô kế tiếp
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`)
      nextInput?.focus()
    }
  }

  // Xử lý nút "Tạo ngay"
  const handleCreate = async () => {
    setError(null)
    setIsLoading(true)

    const payload = {
        ...state,
        passphrase: passphrase.join('')
    }

    try {
      const isRegisterSuccess =  await register(payload)
      // Nếu thành công:
      if (!isRegisterSuccess) {
        throw new Error('Đăng ký thất bại. Vui lòng thử lại.')
      }
      setSuccess(true)
      setTimeout(() => {
        navigate('/success')
      }, 1200)
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const isComplete = passphrase.every(digit => digit.length === 1)

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
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-xl">
              <span className="text-4xl font-black">🔐</span>
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Thiết lập mã Passphrase
            </h1>
            <p className="mt-3 text-white/60 text-sm">
              Nhập 6 chữ số để bảo vệ tài khoản của bạn
            </p>
          </div>

          {/* 6 ô nhập số */}
          <div className="grid grid-cols-6 gap-3 mb-8">
            {passphrase.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`aspect-square text-center text-3xl font-bold rounded-2xl bg-white/10 border-2 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 ${
                  digit ? 'border-purple-400' : 'border-white/20'
                } ${success ? 'border-emerald-400' : ''}`}
                disabled={isLoading || success}
              />
            ))}
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          {/* Thông báo thành công */}
          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              Đã tạo thành công! Đang chuyển hướng...
            </div>
          )}

          {/* Nút Tạo ngay */}
          <button
            type="button"
            onClick={handleCreate}
            disabled={!isComplete || isLoading || success}
            className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
              isComplete && !isLoading && !success
                ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-lg shadow-purple-600/50 hover:scale-105'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="animate-spin" size={24} />
                Đang tạo...
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={24} />
                Hoàn tất
              </>
            ) : (
              'Tạo ngay'
            )}
          </button>

          <p className="text-center mt-6 text-white/50 text-xs">
            Mã passphrase này sẽ được dùng để xác thực các giao dịch quan trọng
          </p>
        </div>
      </div>
    </div>
  )
}