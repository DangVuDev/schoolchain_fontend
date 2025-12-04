// src/pages/Home.tsx – PHIÊN BẢN HOÀN HẢO CHO MỌI THIẾT BỊ 2025
import { useAuth } from '../context/AuthContext'
import { formatBalance, shortenAddress } from '../lib/utils'
import { ArrowRight, Send, QrCode, Ticket, Sparkles, Copy, Eye, EyeOff, History, CheckCircle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const { balance = 1247350, walletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', userName = 'Mai Anh' } = useAuth()
  const [showBalance, setShowBalance] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const quickActions = [
    { to: '/send', icon: Send, label: 'Gửi tiền', gradient: 'from-purple-500 to-violet-600' },
    { to: '/receive', icon: QrCode, label: 'Nhận tiền', gradient: 'from-orange-500 to-amber-500' },
    { to: '/events', icon: Ticket, label: 'Sự kiện', gradient: 'from-emerald-500 to-teal-500' },
    { to: '/rewards', icon: Sparkles, label: 'Khuyến mãi', gradient: 'from-pink-500 to-rose-500' },
  ]

  const banners = [
    { title: '0% Phí chuyển tiền P2P', desc: 'Gửi VNDC miễn phí 100%', emoji: 'Light', bg: 'from-emerald-500 to-teal-500' },
    { title: 'EDM Campus 2025 -50%', desc: 'Vé NFT chỉ từ 350K', emoji: 'Fire', bg: 'from-orange-500 to-red-500' },
    { title: 'Mời bạn – Nhận 50K', desc: 'Cả hai cùng nhận thưởng!', emoji: 'Gift', bg: 'from-pink-500 to-rose-500' },
  ]

  const recentTx = [
    { type: 'in', amount: 250000, from: 'Nguyễn Văn A', time: '2 phút trước' },
    { type: 'out', amount: 150000, to: 'Trần Thị B', time: '15 phút trước' },
    { type: 'in', amount: 850000, from: 'Bán vé EDM Campus', time: 'Hôm qua' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/30 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-32 max-w-7xl">
        {/* Greeting + Wallet Card - Responsive Layout */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {/* Left: Greeting */}
          <div className="lg:col-span-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight">
              Xin chào,<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium">
              Hôm nay bạn muốn làm gì nào?
            </p>
          </div>

          {/* Right: Wallet Card - Big & Beautiful */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-orange-600/20 blur-3xl rounded-3xl group-hover:blur-xl transition-all" />
              <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                {/* 0 GAS Badge */}
                <div className="absolute -top-5 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 rounded-full font-black text-lg shadow-2xl shadow-emerald-500/50 animate-pulse">
                  0 GAS FEE
                </div>

                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center shadow-2xl">
                      <span className="text-5xl font-black">₫</span>
                    </div>
                    <div>
                      <p className="text-white/60 text-lg">VNDC Campus Wallet</p>
                      <p className="text-3xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                        Tài khoản chính
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition"
                  >
                    {showBalance ? <EyeOff size={32} /> : <Eye size={32} />}
                  </button>
                </div>

                {/* Balance */}
                <div className="mb-10">
                  <p className="text-white/60 text-xl mb-4">Số dư khả dụng</p>
                  <div className="flex items-end justify-between">
                    <p className="text-6xl md:text-7xl font-black tracking-tighter">
                      {showBalance ? (
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                          {formatBalance(balance)}
                        </span>
                      ) : (
                        <span className="text-white/20">••••••••</span>
                      )}
                      <span className="text-4xl md:text-5xl ml-3 text-white/80">VNDC</span>
                    </p>
                    <div className="bg-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full text-xl font-bold">
                      +12.5%
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 flex items-center justify-between">
                  <code className="font-mono text-lg tracking-wider text-white/70">
                    {shortenAddress(walletAddress)}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-gradient-to-r from-purple-600 to-orange-600 p-4 rounded-2xl shadow-lg hover:scale-110 transition-all"
                  >
                    {copied ? <CheckCircle size={28} className="text-emerald-400" /> : <Copy size={28} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions – Responsive Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-center lg:text-left">Hành động nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickActions.map((action) => (
              <NavLink
                key={action.to}
                to={action.to}
                className="group text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-full aspect-square rounded-3xl bg-gradient-to-br ${action.gradient} shadow-2xl flex items-center justify-center hover:shadow-3xl hover:shadow-purple-600/50 transition-all`}>
                  <action.icon size={48} className="text-white drop-shadow-2xl" />
                </div>
                <p className="mt-4 text-lg font-bold">{action.label}</p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Banners – Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-center lg:text-left">Ưu đãi đang hot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {banners.map((banner, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <div className={`w-40 h-20 rounded-2xl bg-gradient-to-br ${banner.bg} flex items-center justify-center text-5xl mb-6 shadow-xl`}>
                  {banner.emoji}
                </div>
                <h3 className="text-2xl font-black mb-3">{banner.title}</h3>
                <p className="text-white/70 text-lg mb-6">{banner.desc}</p>
                <div className="flex items-center text-purple-400 font-bold group-hover:translate-x-2 transition">
                  Tìm hiểu thêm <ArrowRight className="ml-2" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions – Chỉ hiện 3, có nút Xem tất cả */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">Giao dịch gần đây</h2>
            <NavLink to="/transactions" className="text-purple-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Xem tất cả <History className="w-5 h-5" />
            </NavLink>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recentTx.map((tx, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${tx.type === 'in' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                    {tx.type === 'in' ? 'v' : '^'}
                  </div>
                  <p className={`text-3xl font-black ${tx.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'in' ? '+' : '-'}
                    {formatBalance(tx.amount)}
                  </p>
                </div>
                <p className="font-semibold text-lg mb-2">
                  {tx.type === 'in' ? 'Từ' : 'Đến'} {tx.from || tx.to}
                </p>
                <p className="text-white/50">{tx.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation – Chỉ hiện trên mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-3xl border-t border-white/10 px-8 py-4 lg:hidden">
        <div className="flex justify-around text-xs">
          {['Home', 'Wallet', 'Events', 'Profile'].map((tab) => (
            <div key={tab} className={`text-center ${tab === 'Home' ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-10 h-10 mx-auto mb-1 bg-white/10 rounded-2xl" />
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}