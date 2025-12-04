// src/pages/SendAmount.tsx – BẢN HOÀN HẢO NHẤT CHO MỌI ĐIỆN THOẠI
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function SendAmount() {
  const navigate = useNavigate()
  const location = useLocation()
  const recipient = location.state?.recipient || { 
    name: 'Trần Văn Hùng', 
    studentId: '22DH110089', 
    avatar: 'TH',
    isFavorite: true 
  }

  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const formatInput = (v: string) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const rawAmount = Number(amount.replace(/,/g, '') || 0)
  const balance = 1247350

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-28">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="px-5 pt-6 sm:px-8 sm:pt-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition shadow-lg"
          >
            <ArrowLeft size={28} />
          </button>

          {/* 0 GAS FEE Badge nhỏ gọn, lệch phải */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-black text-sm shadow-xl shadow-emerald-500/70 animate-pulse">
            0 GAS FEE
          </div>
        </div>

        {/* Recipient Card */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 mb-10 border border-white/10 shadow-2xl text-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-2xl">
            {recipient.avatar}
            {recipient.isFavorite && (
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">Star</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black">{recipient.name}</h3>
          <p className="text-white/60 text-base sm:text-lg mt-1">MSSV: {recipient.studentId}</p>
        </div>

        {/* Amount Input – SIÊU ĐẸP TRÊN MOBILE */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 sm:p-12 mb-10 border-4 border-purple-500 shadow-2xl shadow-purple-600/50">
          <div className="text-center">
            <input
              type="tel"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(formatInput(e.target.value))}
              placeholder="0"
              autoFocus
              className="w-full text-center text-6xl sm:text-7xl lg:text-8xl font-black bg-transparent outline-none placeholder:text-white/20 caret-purple-400"
            />
            <p className="text-2xl sm:text-3xl text-white/60 mt-4">VNDC</p>
            
            {rawAmount > 0 && (
              <p className="text-lg sm:text-xl text-white/50 mt-3">
                ≈ ${(rawAmount * 0.0000418).toFixed(2)} USD
              </p>
            )}
          </div>

          {/* Balance + MAX */}
          <div className="flex justify-between items-center mt-8 sm:mt-10">
            <span className="text-base sm:text-lg text-white/70">
              Số dư: {balance.toLocaleString()} VNDC
            </span>
            <button
              onClick={() => setAmount(balance.toString())}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:scale-110 active:scale-95 transition"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mb-10">
          <label className="block text-xl sm:text-2xl font-bold mb-4 text-center">
            Ghi chú (tuỳ chọn)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm lời nhắn cho người nhận..."
            rows={3}
            className="w-full px-6 py-5 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/20 focus:border-purple-500 transition placeholder:text-white/40 resize-none text-base sm:text-lg outline-none"
          />
        </div>

        {/* Confirm Button – Full width, dễ bấm */}
        <button
          onClick={() => navigate('/send/confirm', { 
            state: { recipient, amount: rawAmount, note } 
          })}
          disabled={!rawAmount}
          className={`w-full py-6 sm:py-8 rounded-3xl font-black text-2xl sm:text-3xl shadow-2xl transition-all transform active:scale-95 ${
            rawAmount
              ? 'bg-gradient-to-r from-purple-600 to-orange-600 hover:scale-105 shadow-purple-600/60'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>

      {/* Mobile Bottom Nav Space */}
      <div className="h-24 lg:hidden" />
      
      {/* Safe area */}
      <div className="pb-env(safe-area-inset-bottom)" />
    </div>
  )
}