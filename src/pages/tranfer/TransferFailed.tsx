// src/pages/TransferFailed.tsx – FINAL RESPONSIVE EDITION 2025 (ĐẸP TỪ ĐIỆN THOẠI ĐẾN LAPTOP)
import { AlertCircle, Home, RotateCw, Wallet, HelpCircle, Copy, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function TransferFailed() {
  const navigate = useNavigate()

  const errors = [
    { title: "Số dư không đủ", description: "Bạn không đủ VNDC để thực hiện giao dịch này", attempted: 50000, balance: 35250 },
    { title: "Lỗi mạng", description: "Giao dịch thất bại do mạng quá tải. Vui lòng thử lại sau ít phút.", attempted: 50000, balance: 197350 },
    { title: "Địa chỉ không hợp lệ", description: "Địa chỉ người nhận không tồn tại hoặc sai định dạng.", attempted: 50000, balance: 197350 },
    { title: "Vượt hạn mức ngày", description: "Bạn đã đạt giới hạn chuyển tiền trong ngày. Thử lại vào ngày mai nhé!", attempted: 50000, balance: 197350 },
  ]

  const error = errors[Math.floor(Math.random() * errors.length)]
  const { title, description, attempted, balance } = error

  const time = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const [copied, setCopied] = useState(false)

  const copyAmount = () => {
    navigator.clipboard.writeText(attempted.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white overflow-hidden">
      {/* Background Glow – Đỏ cam cháy bỏng, scale theo màn hình */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-orange-900/30" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-red-600/25 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      {/* Container chính – responsive từ mobile → desktop */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-lg lg:max-w-2xl xl:max-w-4xl">

          {/* Main Glass Card – tự động scale đẹp trên mọi màn hình */}
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl lg:rounded-4xl border border-white/10 shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="text-center py-10 px-6 sm:py-12 lg:py-16">
              <div className="relative w-28 h-28 mx-auto mb-8 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl opacity-70 animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                  <AlertCircle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-white" strokeWidth={4} />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
                Gửi thất bại!
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto">
                Không thể hoàn tất giao dịch lúc này
              </p>
            </div>

            {/* Amount Box – siêu to trên laptop */}
            <div className="mx-6 mb-8 lg:mx-12 lg:mb-12">
              <div className="bg-gradient-to-br from-red-600/30 via-pink-600/20 to-orange-600/30 border-4 border-red-500/60 rounded-3xl lg:rounded-4xl p-8 lg:p-12 text-center shadow-2xl">
                <p className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-none">
                  {attempted.toLocaleString()}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-300 mt-4">VNDC không gửi được</p>
              </div>
            </div>

            {/* Error Details Card */}
            <div className="mx-6 mb-8 lg:mx-12 lg:mb-12">
              <div className="bg-white/5 backdrop-blur-3xl rounded-2xl lg:rounded-3xl border border-red-500/30 p-6 lg:p-10 space-y-6 lg:space-y-8">

                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-400">{title}</h2>
                  <p className="text-white/70 mt-3 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="bg-red-900/30 rounded-2xl lg:rounded-3xl p-6 lg:p-8 space-y-5 lg:space-y-6">
                  <div className="flex justify-between items-center text-lg lg:text-xl">
                    <span className="text-white/60">Số tiền muốn gửi</span>
                    <button
                      onClick={copyAmount}
                      className="flex items-center gap-3 font-bold text-red-400 hover:text-red-300 transition"
                    >
                      {attempted.toLocaleString()} VNDC
                      {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-lg lg:text-xl">
                    <span className="text-white/60">Số dư hiện tại</span>
                    <span className="font-bold text-white">{balance.toLocaleString()} VNDC</span>
                  </div>

                  <div className="flex justify-between items-center text-base lg:text-lg">
                    <span className="text-white/60">Thời gian</span>
                    <span className="font-medium">{time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons – đẹp cả mobile lẫn laptop */}
            <div className="px-6 pb-8 lg:px-12 lg:pb-12 space-y-6">
              <button className="w-full py-6 lg:py-8 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-red-600 to-orange-600 font-black text-xl lg:text-2xl xl:text-3xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-600/60">
                <RotateCw className="w-8 h-8 lg:w-10 lg:h-10" />
                Thử lại với số tiền khác
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <button className="py-5 lg:py-6 rounded-2xl lg:rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-lg lg:text-xl flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition">
                  <Wallet className="w-7 h-7 lg:w-8 lg:h-8" />
                  Xem ví của tôi
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="py-5 lg:py-6 rounded-2xl lg:rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-lg lg:text-xl flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition"
                >
                  <Home className="w-7 h-7 lg:w-8 lg:h-8" />
                  Về trang chủ
                </button>
              </div>
            </div>

            {/* Support Box */}
            <div className="mx-6 mb-8 lg:mx-12 lg:mb-12">
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/40 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-center">
                <div className="flex items-center justify-center gap-3 text-blue-300 text-lg lg:text-xl">
                  <HelpCircle className="w-7 h-7 lg:w-8 lg:h-8" />
                  <p>
                    Cần hỗ trợ ngay? Gửi mail cho chúng tôi:{' '}
                    <a href="mailto:support@vndc.io" className="font-bold underline hover:text-blue-200 transition">
                      support@vndc.io
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap- gap-8 pb-10 text-red-400 text-base lg:text-lg">
              <button className="hover:underline">Báo cáo lỗi này</button>
              <span className="text-white/30">•</span>
              <button className="hover:underline">Xem lịch sử giao dịch</button>
            </div>
          </div>
        </div>
      </div>

      {/* Safe area cho iPhone */}
      <div className="h-20 sm:hidden" />
      <div className="pb-env(safe-area-inset-bottom)" />
    </div>
  )
}