// src/pages/TransferFailed.tsx
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Home, Wallet, RotateCw, MessageCircle } from 'lucide-react'

export default function TransferFailed() {
  const navigate = useNavigate()

  // Random lỗi (mỗi lần reload sẽ random 1 trong 4 lỗi phổ biến)
  const errors = [
    {
      title: "Insufficient Balance",
      description: "You don't have enough VNDC to complete this transfer",
      attempted: 50000,
      balance: 35250,
      icon: "Warning",
    },
    {
      title: "Network Error",
      description: "Transaction failed due to network congestion. Please try again later.",
      attempted: 50000,
      balance: 197350,
      icon: "Network",
    },
    {
      title: "Invalid Recipient Address",
      description: "The recipient address is not valid or does not exist on this network.",
      attempted: 50000,
      balance: 197350,
      icon: "User X",
    },
    {
      title: "Daily Limit Exceeded",
      description: "You have reached your daily transfer limit. Please try again tomorrow.",
      attempted: 50000,
      balance: 197350,
      icon: "Lock",
    },
  ]

  const error = errors[Math.floor(Math.random() * errors.length)]
  const { title, description, attempted, balance } = error

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      {/* Background nhẹ đỏ */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-900/10 via-[#0F172A] to-rose-900/10" />

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          {/* Main Glass Card */}
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-12 shadow-2xl">

            {/* Big Red X */}
            <div className="w-36 h-36 mx-auto mb-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 rounded-full blur-3xl opacity-60" />
              <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-rose-700 rounded-full flex items-center justify-center shadow-2xl">
                <AlertCircle size={100} className="text-white" strokeWidth={4} />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-center mb-6">
              Transfer Failed
            </h1>
            <p className="text-2xl text-white/70 text-center mb-12">
              Unable to complete transaction
            </p>

            {/* Error Box */}
            <div className="bg-red-900/20 border-4 border-red-500 rounded-3xl p-10 mb-10">
              <div className="flex items-start gap-5 mb-6">
                <span className="text-5xl">Warning</span>
                <div className="text-left flex-1">
                  <p className="text-2xl font-bold text-red-400 mb-2">{title}</p>
                  <p className="text-lg text-red-300">{description}</p>
                </div>
              </div>

              <div className="bg-red-900/30 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Attempted Amount</span>
                  <span className="font-bold text-white">
                    {attempted.toLocaleString()} VNDC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Available Balance</span>
                  <span className="font-bold text-red-400">
                    {balance.toLocaleString()} VNDC
                  </span>
                </div>
              </div>
            </div>

            {/* Main Action Button */}
            <button className="w-full py-7 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 font-black text-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-transform shadow-xl mb-6">
              <RotateCw size={32} />
              Try Again with Different Amount
            </button>

            {/* Secondary Buttons */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <button className="py-5 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition">
                <Wallet size={28} />
                View Balance
              </button>
              <button
                onClick={() => navigate('/home')}
                className="py-5 rounded-2xl bg-white/10 backdrop-blur-xl border-2 border-white/20 font-bold text-xl flex items-center justify-center gap-3 hover:bg-white/20 transition"
              >
                <Home size={28} />
                Back to Home
              </button>
            </div>

            {/* Support Box */}
            <div className="bg-blue-900/20 border-2 border-blue-500 rounded-2xl p-6 text-center">
              <p className="text-blue-300">
                Need help? Contact support at{' '}
                <a href="mailto:support@vndc.io" className="font-bold underline">
                  support@vndc.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}