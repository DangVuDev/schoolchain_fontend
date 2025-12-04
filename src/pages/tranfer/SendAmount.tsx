// src/pages/SendAmount.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function SendAmount() {
  const navigate = useNavigate()
  const location = useLocation()
  const recipient = location.state?.recipient || { name: 'Trần Văn Hùng', studentId: '22DH110089', avatar: 'TH' }

  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const formatInput = (v: string) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const rawAmount = Number(amount.replace(/,/g, '') || 0)
  const balance = 1247350

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />

      <div className="container mx-auto px-6 pt-12 pb-32 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => navigate(-1)} className="p-4 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition">
            <ArrowLeft size={36} />
          </button>
          <div className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-black text-2xl shadow-2xl">
            0 GAS FEE
          </div>
        </div>

        {/* Recipient */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 mb-12 border border-white/10 shadow-2xl text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center text-5xl font-black shadow-2xl">
            {recipient.avatar}
          </div>
          <h3 className="text-4xl font-black mb-3">{recipient.name}</h3>
          <p className="text-white/60 text-xl">MSSV: {recipient.studentId}</p>
        </div>

        {/* Amount Input */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-12 mb-10 border-4 border-purple-500 shadow-2xl shadow-purple-600/40">
          <div className="text-center">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(formatInput(e.target.value))}
              placeholder="0"
              className="w-full text-center text-8xl font-black bg-transparent outline-none placeholder:text-white/20"
            />
            <p className="text-3xl text-white/60 mt-6">VNDC</p>
            {rawAmount > 0 && (
              <p className="text-xl text-white/50 mt-4">
                ≈ ${(rawAmount * 0.0000418).toFixed(2)} USD
              </p>
            )}
          </div>

          <div className="flex justify-between items-center mt-10">
            <span className="text-xl text-white/70">Số dư: {balance.toLocaleString()} VNDC</span>
            <button
              onClick={() => setAmount(balance.toLocaleString())}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="mb-12">
          <label className="block text-2xl font-bold mb-6 text-center">Ghi chú (tuỳ chọn)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm lời nhắn cho người nhận..."
            rows={4}
            className="w-full px-10 py-8 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/20 focus:border-purple-500 transition placeholder:text-white/40 resize-none text-xl"
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => navigate('/send/confirm', { state: { recipient, amount: rawAmount, note } })}
          disabled={!rawAmount}
          className={`w-full py-10 rounded-3xl font-black text-4xl shadow-2xl transition-all transform ${
            rawAmount
              ? 'bg-gradient-to-r from-purple-600 to-orange-600 hover:scale-105 active:scale-98 shadow-purple-600/60'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  )
}