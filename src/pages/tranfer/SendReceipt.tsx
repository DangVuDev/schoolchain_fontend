// src/pages/SendReceipt.tsx – BẢN HOÀN HẢO NHẤT VIỆT NAM 2025 (TÍM CAM EDITION)
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, Share2, Download, Home, Copy } from 'lucide-react'
import { formatBalance, shortenAddress } from '../../lib/utils'
import { useState } from 'react'

export default function SendReceipt() {
  const navigate = useNavigate()
  const location = useLocation()
  const { recipient, amount = 50000, note = '' } = location.state || {}
  const recipientName = recipient?.name || 'Người nhận'
  const recipientAddress = recipient?.address || location.state?.address || '0x9f3a...e8d1f'

  const [copied, setCopied] = useState(false)
  const txHash = "0x9f3a1b2c3d4e5f678901234567890abcdef1234567890abcdef12345678e8d1f"
  const time = new Date().toLocaleString('vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const copyTx = () => {
    navigator.clipboard.writeText(txHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-28">
      {/* Background Glow – Tím cam huyền thoại */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 pt-8 sm:px-8 sm:pt-12 max-w-lg mx-auto">
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          {/* Success Header */}
          <div className="text-center py-10 px-6">
            {/* Big Checkmark – Tím cam */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-orange-400 rounded-full blur-3xl opacity-70 animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle2 size={80} className="text-white" strokeWidth={4} />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Gửi thành công!
            </h1>
            <p className="text-lg sm:text-xl text-white/70">
              {formatBalance(amount)} VNDC đã được gửi ngay lập tức
            </p>
          </div>

          {/* Amount Box – Tím cam đỉnh cao */}
          <div className="mx-6 mb-8 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-orange-600/30 border-4 border-purple-500/60 rounded-3xl p-8 text-center shadow-2xl">
            <p className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-tight">
              {formatBalance(amount)}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-300 mt-3">VNDC đã gửi</p>
          </div>

          {/* Transaction Details */}
          <div className="bg-white/5 backdrop-blur-3xl rounded-2xl mx-6 mb-8 p-6 border border-white/10 space-y-5 text-base sm:text-lg">
            <div className="flex justify-between">
              <span className="text-white/60">Gửi đến</span>
              <div className="text-right">
                <p className="font-bold">{recipientName}</p>
                <p className="text-xs sm:text-sm font-mono text-white/50">{shortenAddress(recipientAddress)}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Số dư mới</span>
              <span className="font-bold text-purple-400">1,197,350 VNDC</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-white/60">Tx Hash</span>
              <button
                onClick={copyTx}
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition text-xs sm:text-sm"
              >
                <span className="font-mono">
                  {txHash.slice(0, 8)}...{txHash.slice(-6)}
                </span>
                {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="flex justify-between">
              <span className="text-white/60">Thời gian</span>
              <span className="font-medium text-sm sm:text-base">{time}</span>
            </div>

            {note && note !== 'Không có ghi chú' && (
              <div className="flex justify-between">
                <span className="text-white/60">Ghi chú</span>
                <span className="italic text-white/80 text-right text-sm sm:text-base max-w-[60%] leading-tight">
                  “{note}”
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mx-6 mb-6">
            <button
              onClick={() => navigate('/home')}
              className="py-5 sm:py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-purple-600/60"
            >
              <Home size={28} />
              Về trang chủ
            </button>

            <button className="py-5 sm:py-6 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition-all shadow-xl">
              <Download size={28} />
              Tải biên lai
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 pb-8 text-purple-400 text-sm sm:text-base">
            <button className="hover:underline">Xem chi tiết</button>
            <span className="text-white/30">•</span>
            <button className="hover:underline flex items-center gap-2">
              <Share2 size={18} />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Space */}
      <div className="h-24 lg:hidden" />
      <div className="pb-env(safe-area-inset-bottom)" />
    </div>
  )
}