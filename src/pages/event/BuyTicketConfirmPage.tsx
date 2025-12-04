// src/pages/event/BuyTicketConfirmPage.tsx – FINAL PERFECT EDITION 2025
import { ArrowLeft, Calendar, MapPin, Shield, Ticket, Users, Zap } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BuyTicketConfirmPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { event, tier } = location.state || {}

  const quantity = 2
  const total = tier?.price ? tier.price * quantity : 300000

  const [passphraseWord, setPassphraseWord] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const isReadyToPay = passphraseWord.length > 0 && termsAccepted

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-32">
      {/* Background Glow – đồng bộ toàn app */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 pt-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white/60 hover:text-white transition mb-8"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-medium">Quay lại chọn vé</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Xác nhận thanh toán
          </h1>
          <p className="text-white/60 mt-3 text-lg">Kiểm tra kỹ trước khi hoàn tất</p>

          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 rounded-full mt-6 text-lg font-black shadow-lg shadow-emerald-600/40">
            <Zap size={24} />
            0 GAS FEE • MIỄN PHÍ MINT NFT
          </div>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Event Preview */}
            <div className="p-8 border-b border-white/5">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center text-6xl font-black shadow-2xl flex-shrink-0">
                  Music
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-black mb-3">{event?.title || 'Spring Music Festival 2025'}</h3>
                  <div className="space-y-2 text-white/70">
                    <p className="flex items-center justify-center sm:justify-start gap-3">
                      <Calendar size={20} /> 20/02/2025 • 19:00 - 23:00
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-3">
                      <MapPin size={20} /> Sân vận động chính ĐH Bách Khoa
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-3">
                      <Users size={20} /> Sơn Tùng M-TP, HIEUTHUHAI, Orange, tlinh
                    </p>
                  </div>
                  <div className="mt-4 inline-block bg-purple-900/40 border border-purple-500/60 rounded-2xl px-5 py-2">
                    <span className="text-purple-300 font-bold">VIP • Ghế A1, A2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-8 bg-white/5">
              <h4 className="text-2xl font-black mb-6">Chi tiết thanh toán</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-white/60">2 × Vé VIP (A1, A2)</span>
                  <span className="font-bold">300,000 VNDC</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white/60">Phí dịch vụ</span>
                  <span className="text-emerald-400 font-black">0 VNDC</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-white/60">Phí mạng (Gas)</span>
                  <span className="text-emerald-400 font-black">0 VNDC</span>
                </div>
                <div className="pt-6 border-t-2 border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Tổng cộng</span>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                        {total.toLocaleString()} VNDC
                      </div>
                      <div className="text-white/50 text-sm">≈ $12.00 USD</div>
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
                <p className="text-white/70 mt-1">Vé NFT sẽ được gửi ngay vào ví của bạn trên Polygon zkEVM sau khi thanh toán thành công.</p>
              </div>
            </div>

            {/* Security Verification */}
            <div className="px-8 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={28} className="text-emerald-400" />
                <h4 className="text-xl font-black">Xác minh bảo mật</h4>
              </div>
              <input
                type="text"
                placeholder="Nhập từ thứ 3 trong cụm từ khôi phục..."
                value={passphraseWord}
                onChange={(e) => setPassphraseWord(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/20 placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-400/20 transition text-lg"
              />
            </div>

            {/* Terms */}
            <div className="px-8 pb-8">
              <label className="flex items-start gap-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-6 h-6 mt-0.5 accent-purple-500 rounded"
                />
                <span className="text-white/70 leading-relaxed">
                  Tôi đã đọc và đồng ý với{' '}
                  <span className="text-purple-400 font-bold">Điều khoản dịch vụ</span> và{' '}
                  <span className="text-purple-400 font-bold">Chính sách hoàn tiền</span>
                </span>
              </label>
            </div>

            {/* Confirm Button */}
            <div className="px-8 pb-10">
              <button
                disabled={!isReadyToPay}
                className={`w-full py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl ${
                  isReadyToPay
                    ? 'bg-gradient-to-r from-purple-600 to-orange-600 hover:scale-105 active:scale-95 shadow-purple-600/60'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                {isReadyToPay ? 'Xác nhận & Thanh toán ngay' : 'Vui lòng hoàn tất xác minh'}
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full mt-5 text-red-400 font-bold text-lg hover:text-red-300 transition"
              >
                Hủy thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}