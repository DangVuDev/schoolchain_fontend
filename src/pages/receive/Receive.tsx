// src/pages/Receive.tsx – BẢN HOÀN HẢO NHẤT, ĐẸP NHƯ BẢN GỐC + QUÉT DỄ
import { Copy, Share2, Download, CheckCircle2, ArrowDownToLine, Sparkles, Wallet } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { useAuth } from '../../context/AuthContext'
import { formatBalance, shortenAddress } from '../../lib/utils'

export default function Receive() {
  const { walletAddress, userName = 'Bạn' } = useAuth()
  const fullAddress = walletAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Tạo chuỗi dữ liệu QR: chỉ address + amount (đơn giản, dễ quét)
  const rawAmount = amount.replace(/,/g, '')
  const paymentLink = amount && Number(rawAmount) > 0 
    ? `${fullAddress}?amount=${rawAmount}`
    : fullAddress

  // Tạo QR đen trắng chất lượng cao, dễ quét
  useEffect(() => {
    if (!canvasRef.current) return

    const size = window.innerWidth < 768 ? 280 : 400

    QRCode.toCanvas(
      canvasRef.current,
      paymentLink,
      {
        width: size,
        margin: 4,                    // Margin lớn giúp camera tách biệt dễ dàng
        color: { dark: '#000000', light: '#FFFFFF' }, // Đen trắng thuần túy
        errorCorrectionLevel: 'H',    // Sửa lỗi 30% – quét được dù bẩn/xước
      },
      (error) => {
        if (error) console.error("QR Error:", error)
      }
    )
  }, [paymentLink])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(paymentLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Nhận tiền VNDC từ tôi',
      text: `${userName} đang yêu cầu bạn gửi ${amount ? formatBalance(Number(rawAmount)) + ' VNDC' : 'một khoản tiền bất kỳ'} nhé!`,
      url: paymentLink,
    }

    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData) } catch {}
    } else {
      handleCopy()
    }
  }

  const handleDownloadQR = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png', 1.0)
    const a = document.createElement('a')
    a.href = url
    a.download = `QR_NhanTien_${userName}_${amount ? rawAmount : 'BatKy'}_${new Date().toISOString().slice(0,10)}.png`
    a.click()
  }

  const formatInput = (v: string) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const quickAmounts = [
    '50,000', '100,000', '200,000', '500,000',
    '1,000,000', '2,000,000', '5,000,000', '10,000,000'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-24 md:pb-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient leading-tight">
            Nhận VNDC
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/70 font-medium px-4">
            Quét mã QR hoặc chia sẻ link để nhận tiền nhanh chóng
          </p>
        </div>

        {/* 0 GAS FEE Badge */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-black text-2xl sm:text-4xl shadow-2xl shadow-emerald-500/70 animate-pulse">
            <Sparkles className="w-6 h-6 sm:w-10 sm:h-10" />
            0 GAS FEE
            <Sparkles className="w-6 h-6 sm:w-10 sm:h-10" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: QR + Amount */}
          <div className="space-y-8">
            {/* QR Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-orange-600/30 blur-3xl group-hover:blur-xl transition-all" />
              <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
                <div className="flex justify-center">
                  <canvas ref={canvasRef} className="rounded-3xl shadow-2xl max-w-full h-auto" />
                </div>
                <div className="text-center mt-6">
                  <p className="text-2xl sm:text-3xl font-black text-purple-400">VNDC Campus Wallet</p>
                  <p className="text-white/60 mt-2 text-lg sm:text-xl">Quét để gửi tiền cho {userName}</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-black text-center mb-8">
                {amount ? 'Yêu cầu số tiền cố định' : 'Nhập số tiền (tùy chọn)'}
              </h3>

              <div className="relative max-w-full">
                <input
                  type="tel"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => setAmount(formatInput(e.target.value))}
                  placeholder="0"
                  className="w-full px-8 py-10 sm:px-12 sm:py-14 text-center text-5xl sm:text-7xl font-black bg-white/10 rounded-3xl border-2 border-white/20 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition placeholder:text-white/30 outline-none"
                />
                {amount && (
                  <button
                    onClick={() => setAmount('')}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-4xl sm:text-6xl text-white/40 hover:text-white transition"
                  >
                    ×
                  </button>
                )}
              </div>

              {amount && (
                <div className="text-center mt-8">
                  <p className="text-4xl sm:text-6xl font-black text-emerald-400 animate-pulse">
                    {formatBalance(Number(rawAmount))} VNDC
                  </p>
                  <p className="text-white/60 text-lg sm:text-xl mt-3">Sẽ tự động điền khi quét</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Amounts */}
            {!amount && (
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
                <h3 className="text-2xl sm:text-3xl font-black text-center mb-6">Chọn nhanh</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className="py-5 sm:py-7 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-black text-lg sm:text-2xl hover:bg-white/20 hover:border-purple-500 active:scale-95 transition-all shadow-xl"
                    >
                      {val.replace(',000', 'K').replace('1,000,000', '1M').replace('2,000,000', '2M').replace('5,000,000', '5M').replace('10,000,000', '10M')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet Address */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Wallet className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400" />
                <div>
                  <p className="text-lg sm:text-2xl text-white/60">Địa chỉ ví</p>
                  <code className="text-xl sm:text-3xl font-mono text-white/90 break-all">
                    {shortenAddress(fullAddress)}
                  </code>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="w-full py-6 sm:py-8 rounded-3xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-2xl sm:text-3xl flex items-center justify-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition"
              >
                {copied ? <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" /> : <Copy className="w-10 h-10 sm:w-12 sm:h-12" />}
                {copied ? 'Đã sao chép!' : 'Sao chép link'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={handleShare}
                className="py-8 sm:py-10 rounded-3xl bg-white/10 backdrop-blur-3xl border-2 border-white/20 font-black text-2xl sm:text-3xl flex items-center justify-center gap-4 hover:bg-white/20 hover:border-purple-500 active:scale-95 transition-all shadow-2xl"
              >
                <Share2 className="w-10 h-10 sm:w-14 sm:h-14" />
                Chia sẻ
              </button>

              <button
                onClick={handleDownloadQR}
                className="py-8 sm:py-10 rounded-3xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-2xl sm:text-3xl flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl"
              >
                <Download className="w-10 h-10 sm:w-14 sm:h-14" />
                Tải QR
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-3xl p-8 border-2 border-emerald-500/40 text-center">
              <ArrowDownToLine className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-emerald-400" />
              <p className="text-2xl sm:text-3xl font-black mb-4">Chỉ cần quét là gửi!</p>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                {amount
                  ? 'Người gửi sẽ thấy sẵn số tiền bạn yêu cầu'
                  : 'Người gửi có thể nhập bất kỳ số tiền nào'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-4 py-4 lg:hidden z-50">
        <div className="flex justify-around items-center text-xs sm:text-sm">
          {['Home', 'Send', 'Receive', 'Events', 'Profile'].map((tab) => (
            <div
              key={tab}
              className={`text-center ${tab === 'Receive' ? 'text-purple-400 scale-110 font-bold' : 'text-white/50'} transition-all`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white/30 rounded-full" />
              </div>
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Safe Area Bottom */}
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  )
}