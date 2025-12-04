// src/pages/SendReceipt.tsx – PHIÊN BẢN SẠCH, ĐẸP, CHUYÊN NGHIỆP 2025
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, Share2, Download, Home, Copy } from 'lucide-react'
import { formatBalance, shortenAddress } from "../../lib/utils"
import { useState } from 'react'

export default function SendReceipt() {
  const navigate = useNavigate()
  const location = useLocation()
  const { address = '0x9f3a...e8d1f', amount = 50000, note } = location.state || {}

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
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Background nhẹ, không còn confetti hay blob */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-900/10 via-[#0F172A] to-teal-900/10" />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          {/* Main Glass Card */}
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-12 shadow-2xl">

            {/* Big Green Checkmark */}
            <div className="w-36 h-36 mx-auto mb-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-3xl opacity-60" />
              <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle2 size={100} className="text-white" strokeWidth={4} />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-center mb-6">
              Transfer Successful!
            </h1>
            <p className="text-2xl text-white/70 text-center mb-12">
              Your VNDC has been sent instantly
            </p>

            {/* Amount Box */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-4 border-emerald-500 rounded-3xl p-10 mb-10 text-center">
              <div className="text-8xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {formatBalance(amount)}
              </div>
              <p className="text-3xl font-bold text-emerald-400 mt-3">VNDC Sent</p>
            </div>

            {/* Transaction Details */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 space-y-7 text-lg">
              <div className="flex justify-between">
                <span className="text-white/60">Sent to</span>
                <div className="text-right">
                  <p className="font-bold">Trần Văn Hùng</p>
                  <p className="text-sm font-mono text-white/50">{shortenAddress(address)}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">New Balance</span>
                <span className="font-bold text-emerald-400">1,197,350 VNDC</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/60">Transaction Hash</span>
                <button
                  onClick={copyTx}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition"
                >
                  <span className="font-mono text-sm">
                    {txHash.slice(0, 10)}...{txHash.slice(-8)}
                  </span>
                  {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">Time</span>
                <span className="font-medium">{time}</span>
              </div>

              {note && note !== 'Không có ghi chú' && (
                <div className="flex justify-between">
                  <span className="text-white/60">Note</span>
                  <span className="italic text-white/80 max-w-xs text-right">“{note}”</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <button
                onClick={() => navigate('/home')}
                className="py-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 font-black text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-transform shadow-xl"
              >
                <Home size={28} />
                Back to Home
              </button>

              <button className="py-6 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition">
                <Download size={28} />
                Download Receipt
              </button>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap-8 mt-8 text-purple-400 text-lg">
              <button className="hover:underline">View Details</button>
              <span className="text-white/30">•</span>
              <button className="hover:underline flex items-center gap-2">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}