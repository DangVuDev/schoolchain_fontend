// src/pages/Home.tsx – BẢN HOÀN HẢO NHẤT VIỆT NAM 2025 (FULL RESPONSIVE + SIÊU MƯỢT)
import { useAuth } from '../context/AuthContext'
import { formatBalance, shortenAddress } from '../lib/utils'
import {
  ArrowRight, Send, QrCode, Ticket, Sparkles, Copy, Eye, EyeOff,
  History, CheckCircle, ArrowUpRight, ArrowDownRight,
  ShoppingBag
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const { balance, walletAddress, userName,getBalanceInfo,getUserInfo } = useAuth()
  console.log("Wallet Address in Home:", walletAddress);
  const [showBalance, setShowBalance] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(()=>{
    getUserInfo()
    getBalanceInfo()
  },[])



  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const quickActions = [
    { to: '/send', icon: Send, label: 'Gửi tiền', gradient: 'from-purple-500 to-violet-600' },
    { to: '/receive', icon: QrCode, label: 'Nhận tiền', gradient: 'from-orange-500 to-amber-500' },
    { to: '/events', icon: Ticket, label: 'Sự kiện', gradient: 'from-emerald-500 to-teal-500' },
    { to: '/campus', icon: Sparkles, label: 'Emulation', gradient: 'from-pink-500 to-rose-500' },
    { to: '/shop', icon: ShoppingBag, label: 'Shopping', gradient: 'from-green-500 to-teal-500' },
  ]

  const banners = [
    { title: '0% Phí chuyển tiền P2P', desc: 'Gửi VNDC miễn phí 100%', emoji: 'Lightning', bg: 'from-emerald-500 to-teal-500' },
    { title: 'EDM Campus 2025 -50%', desc: 'Vé NFT chỉ từ 350K', emoji: 'Fire', bg: 'from-orange-500 to-red-500' },
    { title: 'Mời bạn – Nhận 50K', desc: 'Cả hai cùng nhận thưởng!', emoji: 'Gift', bg: 'from-pink-500 to-rose-500' },
  ]

  const recentTx = [
    { type: 'in', amount: 250000, from: 'Nguyễn Văn A', time: '2 phút trước' },
    { type: 'out', amount: 150000, to: 'Trần Thị B', time: '15 phút trước' },
    { type: 'in', amount: 850000, from: 'Bán vé EDM Campus', time: 'Hôm qua' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-24 lg:pb-8">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/30 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-4 pt-8 sm:px-6 sm:pt-12 max-w-7xl mx-auto">
        {/* Greeting + Wallet Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 lg:mb-16">
          {/* Greeting */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Xin chào,<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="mt-3 text-base sm:text-lg lg:text-2xl text-white/70 font-medium">
              Hôm nay bạn muốn làm gì nào?
            </p>
          </div>

          {/* Wallet Card */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-orange-600/20 blur-3xl rounded-3xl group-hover:blur-xl transition-all" />
              <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">

                {/* 0 GAS FEE Badge – LUÔN LỆCH PHẢI, ĐẸP TỪ MOBILE ĐẾN DESKTOP */}
                <div className="
                  absolute 
                  -top-4 
                  right-4                      /* Luôn lệch phải */
                  left-auto 
                  translate-x-0 
                  lg:-right-4                   /* Vẫn giữ vị trí đẹp trên desktop */
                  bg-gradient-to-r from-emerald-500 to-teal-500 
                  px-4 sm:px-6 
                  py-2 sm:py-2.5 
                  rounded-full 
                  font-black 
                  text-xs sm:text-sm 
                  shadow-2xl shadow-emerald-500/70 
                  animate-pulse
                  whitespace-nowrap
                  z-10
                ">
                  <span className="hidden sm:inline">0 GAS FEE FOREVER</span>
                  <span className="sm:hidden">0 GAS FEE</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Logo đ có gạch ngang */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center shadow-2xl overflow-hidden">
                      <span className="text-4xl sm:text-5xl font-black text-white relative">
                        đ
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 sm:w-8 h-1.5 bg-white/80 rounded-full blur-sm"></span>
                      </span>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm sm:text-base">VNDC Campus Wallet</p>
                      <p className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                        Tài khoản chính
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition"
                  >
                    {showBalance ? <EyeOff size={28} /> : <Eye size={28} />}
                  </button>
                </div>

                {/* Balance */}
                <div className="mb-6">
                  <p className="text-white/60 text-sm sm:text-base mb-2">Số dư khả dụng</p>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                      {showBalance ? (
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                          {formatBalance(balance)}
                        </span>
                      ) : (
                        <span className="text-white/20">••••••••</span>
                      )}
                      <span className="text-2xl sm:text-3xl ml-2 text-white/80">VNDC</span>
                    </p>
                    <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm sm:text-base font-bold">
                      +12.5%
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 flex items-center justify-between border border-white/10">
                  <code className="font-mono text-sm sm:text-base tracking-wider text-white/70 break-all">
                    {shortenAddress(walletAddress)}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="bg-gradient-to-r from-purple-600 to-orange-600 p-3 rounded-2xl shadow-lg hover:scale-110 transition-all"
                  >
                    {copied ? <CheckCircle size={24} className="text-emerald-400" /> : <Copy size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center lg:text-left">Hành động nhanh</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8 max-w-3xl mx-auto lg:max-w-none">
            {quickActions.map((action) => (
              <NavLink
                key={action.to}
                to={action.to}
                className="group text-center transform transition-all hover:scale-105 active:scale-95"
              >
                <div className={`
                  relative rounded-3xl bg-gradient-to-br ${action.gradient}
                  w-full aspect-square max-w-36 sm:max-w-40 mx-auto
                  flex items-center justify-center shadow-2xl
                  group-hover:shadow-purple-500/60 transition-all
                `}>
                  <action.icon size={60} className="text-white drop-shadow-2xl" />
                </div>
                <p className="mt-3 text-sm sm:text-base lg:text-lg font-bold text-white/90">
                  {action.label}
                </p>
              </NavLink>
            ))}
          </div>
        </section>

        {/* Banners */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center lg:text-left">Ưu đãi đang hot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banners.map((banner, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer">
                <div className={`w-40 h-20 rounded-2xl bg-gradient-to-br ${banner.bg} flex items-center justify-center text-4xl mb-4 shadow-xl`}>
                  {banner.emoji === 'Lightning' ? 'Lightning' : banner.emoji === 'Fire' ? 'Fire' : 'Gift'}
                </div>
                <h3 className="text-lg sm:text-xl font-black mb-2">{banner.title}</h3>
                <p className="text-white/70 text-sm sm:text-base mb-4">{banner.desc}</p>
                <div className="flex items-center text-purple-400 font-bold text-sm sm:text-base group-hover:translate-x-2 transition">
                  Tìm hiểu thêm <ArrowRight className="ml-2" size={18} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-black">Giao dịch gần đây</h2>
            <NavLink to="/transactions" className="text-purple-400 font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm sm:text-base">
              Xem tất cả <History size={20} />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentTx.map((tx, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'in' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                    {tx.type === 'in' ? (
                      <ArrowUpRight size={28} className="text-emerald-400" />
                    ) : (
                      <ArrowDownRight size={28} className="text-rose-400" />
                    )}
                  </div>
                  <p className={`text-2xl font-black ${tx.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'in' ? '+' : '-'}
                    {formatBalance(tx.amount)}
                  </p>
                </div>
                <p className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">
                  {tx.type === 'in' ? 'Từ' : 'Đến'} {tx.from || tx.to}
                </p>
                <p className="text-white/50 text-sm">{tx.time}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Bottom Padding cho Bottom Nav */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}