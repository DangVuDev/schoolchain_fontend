// src/pages/event/PaymentSuccessPage.tsx
import { ArrowRight, CheckCircle, Home, Zap } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PaymentSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { event, tier } = state || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-purple-900/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/30 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center">
        {/* Big Success Icon */}
        <div className="mb-10 animate-bounce">
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-emerald-500/20 border-4 border-emerald-500 shadow-2xl shadow-emerald-500/50">
            <CheckCircle size={100} className="text-emerald-400" />
          </div>
        </div>

        {/* Animated Ticket NFT */}
        <div className="relative mb-12 animate-[float_6s_ease-in-out_infinite]">
          <div className="w-80 h-48 mx-auto bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-4 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white drop-shadow-2xl">
              Ticket
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white/90 font-bold text-lg">{event?.title || "Spring Music Festival 2025"}</p>
              <p className="text-white/70 text-sm">{tier?.name || "VIP Section"}</p>
            </div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-white/50 blur-md animate-[scan_3s_linear_infinite]" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          MUA VÉ THÀNH CÔNG!
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Vé NFT đã được mint và gửi vào ví của bạn
        </p>

        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 rounded-full text-xl font-black shadow-2xl shadow-emerald-600/50 mb-10">
          <Zap size={28} />
          0 GAS FEE • Miễn phí mint
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/my-tickets')}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            Xem vé của tôi
            <ArrowRight size={24} />
          </button>

          <button
            onClick={() => navigate('/events')}
            className="w-full py-5 border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/10 transition flex items-center justify-center gap-3"
          >
            <Home size={24} />
            Về trang chủ
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes scan {
          0% { transform: translateX(-120%) translateY(-50%); }
          100% { transform: translateX(120%) translateY(-50%); }
        }
      `}</style>
    </div>
  )
}