// src/pages/SendConfirm.tsx – BẢN HOÀN HẢO NHẤT VIỆT NAM 2025 (FULL RESPONSIVE)
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { formatBalance, shortenAddress } from '../../lib/utils'

export default function SendConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { recipient, address = '', amount = 0, note } = location.state || {}
  
  // Lấy tên người nhận từ recipient (tương thích với các trang trước)
  const recipientName = recipient?.name || 'Nguyễn Văn A'
  const recipientAvatar = recipient?.avatar || 'NA'

  // 6 ô PIN
  const [pinValues, setPinValues] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<HTMLInputElement[]>([])

  // Hiệu ứng shaking khi lỗi
  const [shake, setShake] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
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

    const isSuccess = Math.random() < 0.7 // 70% thành công (demo)

    if (isSuccess) {
      navigate('/send/receipt', {
        state: { address, amount, note: note || 'Không có ghi chú', recipient },
      })
    } else {
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
    <div className="min-h-screen bg-[#0F172A] text-white pb-28">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-[#0F172A] to-orange-900/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="px-5 pt-6 sm:px-8 max-w-2xl mx-auto">
        {/* Back Button + 0 GAS FEE */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition shadow-lg"
          >
            <ArrowLeft size={28} />
          </button>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-black text-sm shadow-xl shadow-emerald-500/70 animate-pulse">
            0 GAS FEE
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 sm:p-10 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center">
              <Lock size={44} className="sm:size-56 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Xác nhận giao dịch
            </h1>
            <p className="text-base sm:text-lg text-white/80 mt-3">
              Nhập mã PIN 6 số để gửi tiền
            </p>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Amount */}
            <div className="text-center py-8 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-3xl border border-amber-500/30">
              <p className="text-lg sm:text-xl font-bold text-amber-400 mb-3">Số tiền chuyển</p>
              <p className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {formatBalance(amount)}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-2">VNDC</p>
            </div>

            {/* Transaction Info */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-5">
              {/* Recipient */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center text-2xl font-black shadow-xl">
                  {recipientAvatar}
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm">Người nhận</p>
                  <p className="font-bold text-lg">{recipientName}</p>
                  <p className="text-xs font-mono text-white/50">{shortenAddress(address)}</p>
                </div>
              </div>

              {/* Note */}
              {note && note !== 'Không có ghi chú' && (
                <div className="flex justify-between items-start">
                  <span className="text-white/60 text-sm">Ghi chú</span>
                  <p className="italic text-white/80 text-right max-w-xs text-sm">“{note}”</p>
                </div>
              )}

              {/* Fee */}
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">Phí giao dịch</span>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400">0 VNDC</p>
              </div>
            </div>

            {/* PIN Input */}
            <div className="text-center">
              <p className="text-xl font-bold mb-6 text-white/80">Nhập mã PIN</p>
              <div className={`flex justify-center gap-3 sm:gap-4 transition-all ${shake ? 'animate-shake' : ''}`}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      if (el) inputRefs.current[i] = el
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={pinValues[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-12 h-14 sm:w-14 sm:h-16 bg-white/10 backdrop-blur-xl rounded-2xl border-2 
                      text-center text-3xl sm:text-4xl font-bold outline-none focus:border-amber-500 transition-all
                      ${pinValues[i] ? 'border-amber-500' : 'border-white/30'}`}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!isPinComplete}
              className={`w-full py-5 sm:py-7 rounded-3xl font-black text-xl sm:text-2xl transition-all active:scale-95
                ${isPinComplete
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
            >
              {isPinComplete ? 'Gửi ngay' : 'Nhập đủ 6 số để tiếp tục'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav Space */}
      <div className="h-24 lg:hidden" />
      
      {/* Safe Area */}
      <div className="pb-env(safe-area-inset-bottom)" />
    </div>
  )
}