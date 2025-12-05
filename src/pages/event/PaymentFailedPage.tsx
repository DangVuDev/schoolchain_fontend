// src/pages/event/PaymentFailedPage.tsx
import { XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PaymentFailedPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-purple-900/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/30 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center">
        {/* Big Failed Icon */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-red-500/20 border-4 border-red-500 shadow-2xl shadow-red-500/50 animate-pulse">
            <XCircle size={100} className="text-red-400" />
          </div>
        </div>

        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Thanh toán thất bại
        </h1>
        <p className="text-xl text-white/80 mb-6">
          Đã xảy ra lỗi khi mint vé NFT
        </p>

        <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-center gap-3 text-red-300">
            <AlertTriangle size={28} />
            <p className="text-lg font-medium">Vui lòng thử lại sau vài phút</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate(-2)} // Quay lại trang chọn vé
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <RefreshCw size={24} />
            Thử lại thanh toán
          </button>

          <button
            onClick={() => navigate('/events')}
            className="w-full py-5 border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/10 transition"
          >
            Quay lại danh sách sự kiện
          </button>
        </div>
      </div>
    </div>
  )
}