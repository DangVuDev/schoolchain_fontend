// src/pages/SendConfirm.tsx – REBUILD 2025 VERSION
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { formatBalance, shortenAddress } from "../../lib/utils";

export default function SendConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { address = '', amount = 0, note } = location.state || {}

  // 6 ô PIN
  const [pinValues, setPinValues] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<HTMLInputElement[]>([])

  // Hiệu ứng shaking khi lỗi
  const [shake, setShake] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return // Chỉ cho số

    const newPin = [...pinValues]
    newPin[index] = value
    setPinValues(newPin)

    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const pin = pinValues.join('')
  const isPinComplete = pin.length === 6

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleConfirm = () => {
    if (!isPinComplete) return

    const isSuccess = Math.random() < 0.7 // 70% thành công

    if (isSuccess) {
      navigate('/send/receipt', {
        state: { address, amount, note: note || 'Không có ghi chú' },
      })
    } else {
      // Hiệu ứng shake trước khi chuyển trang lỗi
      setShake(true)
      setTimeout(() => setShake(false), 500)

      const errors = [
        { type: 'insufficient', title: 'Insufficient Balance', balance: 35250 },
        { type: 'network', title: 'Network Error' },
        { type: 'invalid_address', title: 'Invalid Recipient' },
        { type: 'limit', title: 'Daily Limit Exceeded' },
      ]
      const err = errors[Math.floor(Math.random() * errors.length)]

      setTimeout(() => {
        navigate('/send/failed', {
          state: {
            errorType: err.type,
            title: err.title,
            attemptedAmount: amount,
            availableBalance: err.balance,
            address,
          },
        })
      }, 400)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center px-6">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-900/10 via-[#0F172A] to-orange-900/10" />

      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-10 p-4 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20 hover:bg-white/20 transition"
        >
          <ArrowLeft size={36} />
        </button>

        <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-10 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <Lock size={56} className="text-white" />
            </div>
            <h1 className="text-5xl font-black text-white">Xác nhận giao dịch</h1>
            <p className="text-xl text-white/80 mt-3">Nhập mã PIN 6 số để gửi tiền</p>
          </div>

          <div className="p-10 space-y-10">
            
            {/* Số tiền */}
            <div className="text-center py-10 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl border border-amber-500/30">
              <p className="text-3xl font-bold text-amber-400 mb-4">Số tiền chuyển</p>
              <p className="text-9xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {formatBalance(amount)}
              </p>
              <p className="text-5xl font-bold text-white mt-3">VNDC</p>
            </div>

            {/* Thông tin giao dịch */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-lg">Người nhận</span>
                <div className="text-right">
                  <p className="font-bold text-xl">Nguyễn Văn A</p>
                  <p className="text-sm font-mono text-white/50">{shortenAddress(address)}</p>
                </div>
              </div>

              {note && note !== 'Không có ghi chú' && (
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-lg">Ghi chú</span>
                  <p className="italic text-white/80 text-right max-w-xs">“{note}”</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-white/60 text-lg">Phí giao dịch</span>
                <p className="text-2xl font-bold text-emerald-400">0 VNDC</p>
              </div>
            </div>

            {/* PIN */}
            <div className="text-center">
              <p className="text-2xl font-bold mb-8 text-white/80">Nhập mã PIN</p>
              <div className={`flex justify-center gap-4 transition-all ${shake ? 'animate-shake' : ''}`}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[i] = el
                      }
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={pinValues[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-16 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border-2 
                      text-center text-5xl font-bold outline-none focus:border-amber-500 transition-all
                      ${pinValues[i] ? 'border-amber-500' : 'border-white/30'}`}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                ))}
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleConfirm}
              disabled={!isPinComplete}
              className={`w-full py-8 rounded-3xl font-black text-3xl transition-all
                ${isPinComplete
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-98'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
            >
              {isPinComplete ? 'Gửi ngay' : 'Nhập đủ 6 số để tiếp tục'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
