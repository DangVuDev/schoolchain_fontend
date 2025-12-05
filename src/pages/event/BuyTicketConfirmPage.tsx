// src/pages/event/BuyTicketConfirmPage.tsx
// CHỈ MUA ĐƯỢC 1 VÉ DUY NHẤT – PHIÊN BẢN CUỐI CÙNG 2025

import { ArrowLeft, Calendar, Lock, MapPin, Ticket, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface TicketTier {
  name: string
  priceVndc: number
  benefits: string[]
  seatingSection?: string
}

interface EventData {
  title: string
  dateStart: Date
  dateEnd: Date
  location: string
  locationDetail?: string
  thumbnail?: string
  banner?: string
}

export default function BuyTicketConfirmPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { event, tier } = (location.state as { event: EventData; tier: TicketTier }) || {}

  // Nếu không có dữ liệu → về trang trước
  if (!event || !tier) {
    navigate(-1)
    return null
  }

  const totalAmount = tier.priceVndc // Chỉ 1 vé

  // 6 ô PIN
  const [pin, setPin] = useState<string[]>(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const isPinComplete = pin.every(digit => digit.length === 1)

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }


// ... trong component của bạn
const [isProcessing, setIsProcessing] = useState(false)

const handleConfirm = async () => {
  if (!isPinComplete || isProcessing) return

  setIsProcessing(true)
  const pinCode = pin.join('')

  // Giả lập xử lý mạng + random kết quả (70% thành công, 30% thất bại)
  const isSuccess = Math.random() < 0.7

  // Delay 2 giây để giống thật
  await new Promise(resolve => setTimeout(resolve, 2000))

  if (isSuccess) {
    // Thành công → chuyển sang màn hình success
    navigate('/payment-success', {
      state: { event, tier, pinCode },
      replace: true
    })
  } else {
    // Thất bại → chuyển sang màn hình failed
    navigate('/payment-failed', {
      state: { error: 'Transaction rejected or network error' },
      replace: true
    })
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 pt-6 max-w-2xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-white/60 hover:text-white transition mb-8">
          <ArrowLeft size={24} />
          <span className="text-lg font-medium">Quay lại</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Xác nhận mua vé
          </h1>
          <p className="text-white/60 mt-3 text-lg">Chỉ cần nhập mã PIN để mint NFT vé</p>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 rounded-full mt-6 text-lg font-black shadow-lg shadow-emerald-600/40">
            <Zap size={24} />
            0 GAS FEE • MIỄN PHÍ MINT
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Event & Tier Info */}
          <div className="p-8 border-b border-white/5">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center text-6xl font-black shadow-2xl flex-shrink-0">
                <Ticket size={48} className="text-white drop-shadow-2xl" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-black mb-3">{event.title}</h3>
                <div className="space-y-2 text-white/70 text-sm sm:text-base">
                  <p className="flex items-center justify-center sm:justify-start gap-3">
                    <Calendar size={18} /> {new Date(event.dateStart).toLocaleDateString('vi-VN')} • 19:00
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-3">
                    <MapPin size={18} /> {event.location}
                  </p>
                </div>
                <div className="mt-5 inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-2xl font-black text-lg shadow-lg">
                  {tier.name}
                  {tier.seatingSection && ` • ${tier.seatingSection}`}
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="p-8 bg-white/5">
            <h4 className="text-2xl font-black mb-6">Số tiền thanh toán</h4>
            <div className="space-y-5 text-lg">
              <div className="flex justify-between">
                <span className="text-white/60">1 × {tier.name}</span>
                <span className="font-bold">{totalAmount.toLocaleString()} VNDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Phí dịch vụ + Gas</span>
                <span className="text-emerald-400 font-black">0 VNDC</span>
              </div>
              <div className="pt-6 border-t-2 border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Tổng cộng</span>
                  <div className="text-right">
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                      {totalAmount.toLocaleString()} VNDC
                    </div>
                    <div className="text-white/50 text-sm">≈ ${(totalAmount / 25000).toFixed(2)} USD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Mint Info */}
          <div className="mx-8 my-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/40 rounded-2xl flex items-start gap-4">
            <Ticket size={40} className="text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xl font-black text-blue-300">Vé sẽ được mint thành NFT</p>
              <p className="text-white/70 mt-1">Sau khi xác nhận, vé NFT sẽ được gửi ngay vào ví của bạn.</p>
            </div>
          </div>

          {/* 6-Digit PIN Input */}
          <div className="px-8 pb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={28} className="text-emerald-400" />
              <h4 className="text-xl font-black">Nhập mã PIN ví (6 số)</h4>
            </div>

            <div className="flex justify-center gap-4">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handlePinChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  className="w-14 h-14 sm:w-16 sm:h-16 text-center text-3xl font-black rounded-2xl bg-white/10 border-2 border-white/20 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 caret-transparent"
                />
              ))}
            </div>

            <p className="text-center text-white/50 text-sm mt-4">
              Mã PIN dùng để ký giao dịch trong ví của bạn
            </p>
          </div>

          {/* Confirm Button */}
          <div className="px-8 pb-10">
            <button
              onClick={handleConfirm}
              disabled={!isPinComplete || isProcessing}
              className={`w-full py-7 rounded-2xl font-black text-2xl transition-all shadow-2xl transform flex items-center justify-center gap-3 ${
                isPinComplete && !isProcessing
                  ? 'bg-gradient-to-r from-purple-600 to-orange-600 hover:scale-105 active:scale-95 shadow-purple-600/60 cursor-pointer'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang xử lý...
                </>
              ) : isPinComplete ? (
                'Xác nhận & Mint NFT Vé'
              ) : (
                'Nhập đủ 6 số để tiếp tục'
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full mt-5 text-red-400 font-bold text-lg hover:text-red-300 transition"
            >
              Hủy mua vé
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}