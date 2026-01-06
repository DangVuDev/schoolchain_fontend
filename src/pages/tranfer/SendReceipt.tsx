import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, Copy, Home, Download, Share2 } from 'lucide-react'
import { formatBalance, shortenAddress } from '../../lib/utils'
import { useEffect, useState } from 'react'

export default function SendReceipt() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    recipient,
    amount,
    note,
    txHash,
    newBalance,
    timestamp,
  } = location.state || {}

  /* ================== Guard ================== */
  useEffect(() => {
    if (!recipient || !amount || !txHash) {
      navigate('/home', { replace: true })
    }
  }, [recipient, amount, txHash, navigate])

  const [copied, setCopied] = useState(false)

  const time = timestamp
    ? new Date(timestamp).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleString('vi-VN')

  const copyTx = () => {
    navigator.clipboard.writeText(txHash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 sm:px-8 pt-10 sm:pt-14 max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-400/50 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-full h-full bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle2 size={78} strokeWidth={4} />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Giao dịch thành công
          </h1>

          <p className="text-white/70 text-lg sm:text-xl">
            Bạn đã gửi {formatBalance(amount)} VNDC
          </p>
        </div>

        {/* Amount */}
        <div className="text-center mb-12">
          <p className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {formatBalance(amount)}
          </p>
          <p className="text-xl sm:text-2xl text-emerald-300 mt-2">
            VNDC
          </p>
        </div>

        {/* Details */}
        <div className="space-y-6 text-base sm:text-lg">
          <Row
            label="Người nhận"
            value={
              <>
                <p className="font-bold">{recipient.name}</p>
                <p className="text-xs sm:text-sm font-mono text-white/50">
                  {shortenAddress(recipient.address)}
                </p>
              </>
            }
          />

          <Row
            label="Số dư mới"
            value={
              <span className="font-bold text-emerald-400">
                {formatBalance(newBalance)} VNDC
              </span>
            }
          />

          <Row
            label="Tx Hash"
            value={
              <button
                onClick={copyTx}
                className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition"
              >
                <span className="font-mono text-sm">
                  {txHash.slice(0, 8)}...{txHash.slice(-6)}
                </span>
                {copied ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            }
          />

          <Row label="Thời gian" value={time} />

          {note && (
            <Row
              label="Ghi chú"
              value={
                <span className="italic text-white/80 max-w-[70%] text-right">
                  “{note}”
                </span>
              }
            />
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          <button
            onClick={() => navigate('/home')}
            className="py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition"
          >
            <Home size={26} />
            Trang chủ
          </button>

          <button
            className="py-5 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/10 active:scale-95 transition"
          >
            <Download size={26} />
            Tải biên lai
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-6 mt-10 text-emerald-400 text-sm">
          <button className="hover:underline">Xem chi tiết</button>
          <span className="text-white/30">•</span>
          <button className="hover:underline flex items-center gap-2">
            <Share2 size={16} />
            Chia sẻ
          </button>
        </div>
      </div>

      <div className="h-24 lg:hidden" />
    </div>
  )
}

/* ================== Row Component ================== */
function Row({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex justify-between items-start gap-6">
      <span className="text-white/60">{label}</span>
      <div className="text-right">{value}</div>
    </div>
  )
}
