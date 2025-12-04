// src/pages/Receive.tsx – BẢN HOÀN HẢO NHẤT VIỆT NAM 2025
import { Copy, Share2, Download, CheckCircle2, ArrowDownToLine, Sparkles, Wallet } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { useAuth } from '../../context/AuthContext'
import { formatBalance, shortenAddress } from '../../lib/utils'

export default function Receive() {
  const { walletAddress, userName = 'Bạn' } = useAuth()
  const address = walletAddress || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const paymentLink = amount
    ? `vndc://pay?to=${address}&amount=${amount.replace(/,/g, '')}`
    : address

  useEffect(() => {
    if (!canvasRef.current) return

    QRCode.toCanvas(
      canvasRef.current,
      paymentLink,
      {
        width: 400,
        margin: 2,
        color: { dark: '#8B5CF6', light: '#FFFFFF' },
        errorCorrectionLevel: 'H',
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
      text: `${userName} đang yêu cầu bạn gửi ${amount ? formatBalance(Number(amount.replace(/,/g, ''))) + ' VNDC' : 'một khoản tiền bất kỳ'} nhé!`,
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
    a.download = `QR_NhanTien_${userName}_${amount || 'BatKy'}_${new Date().toISOString().slice(0,10)}.png`
    a.click()
  }

  const formatInput = (v: string) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const quickAmounts = [
    '50,000', '100,000', '200,000', '500,000',
    '1,000,000', '2,000,000', '5,000,000', '10,000,000'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-32 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
            Nhận VNDC
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/70 font-medium">
            Quét mã QR hoặc chia sẻ link để nhận tiền nhanh chóng
          </p>
        </div>

        {/* 0 GAS FEE Badge */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-6 px-16 py-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-black text-4xl shadow-2xl shadow-emerald-500/70 animate-pulse">
            <Sparkles className="w-14 h-14" />
            0 GAS FEE
            <Sparkles className="w-14 h-14" />
          </div>
        </div>

        {/* Main Content - 2 cột trên desktop */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left: QR Code + Amount */}
          <div className="space-y-12">
            {/* QR Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-orange-600/30 blur-3xl rounded-3xl group-hover:blur-xl transition-all" />
              <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-12 shadow-2xl">
                <div className="rounded-3xl">
                  <canvas ref={canvasRef} className="w-full  mx-auto rounded-3xl shadow-2xl" />
                </div>
                <div className="text-center mt-8">
                  <p className="text-3xl font-black text-purple-400">VNDC Campus Wallet</p>
                  <p className="text-white/60 mt-2 text-xl">Quét để gửi tiền cho {userName}</p>
                </div>
              </div>
            </div>

            {/* Amount Request */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <h3 className="text-4xl font-black text-center mb-10">
                {amount ? 'Yêu cầu số tiền cố định' : 'Yêu cầu số tiền (tùy chọn)'}
              </h3>

              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(formatInput(e.target.value))}
                  placeholder="0"
                  className="w-full px-16 py-12 text-center text-7xl md:text-8xl font-black bg-white/10 rounded-3xl border-2 border-white/20 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition placeholder:text-white/30"
                />
                {amount && (
                  <button
                    onClick={() => setAmount('')}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl text-white/40 hover:text-white transition"
                  >
                    ×
                  </button>
                )}
              </div>

              {amount && (
                <div className="text-center mt-10">
                  <p className="text-5xl md:text-6xl font-black text-emerald-400 animate-pulse">
                    {formatBalance(Number(amount.replace(/,/g, '')))} VNDC
                  </p>
                  <p className="text-white/60 text-2xl mt-4">Sẽ tự động điền khi quét QR</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions + Quick Amounts */}
          <div className="space-y-12">
            {/* Quick Amount Buttons */}
            {!amount && (
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-12 shadow-2xl">
                <h3 className="text-4xl font-black text-center mb-10">Chọn số tiền nhanh</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className="py-8 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-black text-2xl hover:bg-white/20 hover:border-purple-500 active:scale-95 transition-all shadow-xl hover:shadow-purple-500/60"
                    >
                      {val.replace(',000', 'K').replace('1,000,000', '1M').replace('2,000,000', '2M').replace('5,000,000', '5M').replace('10,000,000', '10M')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet Address */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <div className="flex items-center gap-6 mb-8">
                <Wallet className="w-16 h-16 text-purple-400" />
                <div>
                  <p className="text-2xl text-white/60">Địa chỉ ví của bạn</p>
                  <code className="text-3xl font-mono text-white/90 tracking-wider">
                    {shortenAddress(address)}
                  </code>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="w-full py-8 rounded-3xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-3xl flex items-center justify-center gap-6 shadow-2xl hover:scale-105 active:scale-95 transition"
              >
                {copied ? <CheckCircle2 size={48} className="text-emerald-400" /> : <Copy size={48} />}
                {copied ? 'Đã sao chép!' : 'Sao chép link thanh toán'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <button
                onClick={handleShare}
                className="py-10 rounded-3xl bg-white/10 backdrop-blur-3xl border-2 border-white/20 font-black text-3xl flex items-center justify-center gap-6 hover:bg-white/20 hover:border-purple-500 active:scale-95 transition-all shadow-2xl"
              >
                <Share2 size={56} />
                Chia sẻ ngay
              </button>

              <button
                onClick={handleDownloadQR}
                className="py-10 rounded-3xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-3xl flex items-center justify-center gap-6 active:scale-95 transition-all shadow-2xl"
              >
                <Download size={56} />
                Tải QR Code
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-3xl p-12 border-2 border-emerald-500/40 text-center">
              <ArrowDownToLine size={80} className="mx-auto mb-8 text-emerald-400" />
              <p className="text-4xl font-black mb-6">Chỉ cần quét là gửi được!</p>
              <p className="text-2xl text-white/80 leading-relaxed">
                {amount
                  ? 'Người gửi sẽ thấy sẵn số tiền bạn yêu cầu và chỉ cần xác nhận'
                  : 'Người gửi có thể nhập bất kỳ số tiền nào họ muốn'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav - Chỉ hiện trên điện thoại */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-3xl border-t border-white/10 px-8 py-6 lg:hidden">
        <div className="flex justify-around text-sm">
          {['Home', 'Send', 'Receive', 'Events', 'Profile'].map((tab) => (
            <div key={tab} className={`text-center ${tab === 'Receive' ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-14 h-14 mx-auto mb-1 bg-white/10 rounded-3xl" />
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}