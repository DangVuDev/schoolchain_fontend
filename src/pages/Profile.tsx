// src/pages/Profile.tsx – BẢN ĐỈNH CAO NHẤT VIỆT NAM 2025
import { useAuth } from '../context/AuthContext'
import { shortenAddress } from '../lib/utils'
import { 
  User, Wallet, Shield, Bell, LogOut, ChevronRight, 
  Copy, CheckCircle2, School2, QrCode, Ticket, Sparkles, Settings
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Profile() {
  const { userName = 'Nguyễn Văn A', email, studentId = '22DH110001', walletAddress } = useAuth()
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  const menuItems = [
    { icon: Shield, label: 'Bảo mật & Riêng tư', desc: 'PIN, Face ID, 2FA', to: '/security' },
    { icon: Bell, label: 'Thông báo', desc: 'Tin nhắn, ưu đãi, sự kiện', to: '/notifications' },
    { icon: QrCode, label: 'Mã QR cá nhân', desc: 'Nhận tiền siêu nhanh', to: '/receive' },
    { icon: User, label: 'Thông tin cá nhân', desc: 'Cập nhật hồ sơ, avatar', to: '/personal-info' },
    { icon: Settings, label: 'Cài đặt ứng dụng', desc: 'Ngôn ngữ, giao diện', to: '/settings' },
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
        {/* Header + Avatar - Responsive */}
        <div className="text-center mb-16">
          <div className="relative inline-block group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-600 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-all duration-1000" />
            
            {/* Avatar */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-9xl md:text-10xl font-black border-4 border-white/20">
                {userName[0].toUpperCase()}
              </div>
            </div>

            {/* Student Badge */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-emerald-500 rounded-full flex items-center justify-center border-8 border-slate-950 shadow-2xl animate-pulse">
              <School2 size={48} className="text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mt-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {userName}
          </h1>
          <p className="text-2xl md:text-3xl text-white/60 mt-4 font-medium">MSSV: {studentId}</p>
          
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-emerald-500/20 rounded-full border-2 border-emerald-500/50">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-black text-emerald-400">ĐÃ XÁC MINH SINH VIÊN</span>
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        

        {/* Quick Actions - Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
          <NavLink to="/my-tickets" className="group">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-12 text-center border border-white/10 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-600/40">
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <Ticket size={80} className="text-white" />
              </div>
              <p className="text-3xl font-black mb-2">Vé NFT</p>
              <p className="text-white/60 text-xl">3 vé đang sở hữu</p>
            </div>
          </NavLink>

          <NavLink to="/receive" className="group">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-12 text-center border border-white/10 hover:border-emerald-500/60 transition-all hover:shadow-2xl hover:shadow-emerald-600/40">
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <QrCode size={80} className="text-white" />
              </div>
              <p className="text-3xl font-black mb-2">Nhận tiền</p>
              <p className="text-white/60 text-xl">Mã QR cá nhân</p>
            </div>
          </NavLink>

          <NavLink to="/wallet-detail" className="group">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-12 text-center border border-white/10 hover:border-orange-500/60 transition-all hover:shadow-2xl hover:shadow-orange-600/40">
              <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
                <Wallet size={80} className="text-white" />
              </div>
              <p className="text-3xl font-black mb-2">Quản lý ví</p>
              <p className="text-white/60 text-xl">Backup, private key</p>
            </div>
          </NavLink>
        </div>

        {/* Menu Settings */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-10">Cài đặt & Bảo mật</h2>
          {menuItems.map((item) => (
            <NavLink key={item.label} to={item.to} className="block group">
              <div className="flex items-center justify-between p-8 md:p-10 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-600/30">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-all shadow-xl">
                    <item.icon size={48} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{item.label}</p>
                    <p className="text-white/60 text-xl">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={48} className="text-white/30 group-hover:text-purple-400 group-hover:translate-x-4 transition-all" />
              </div>
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <div className="max-w-4xl mx-auto mt-20">
          <button
            onClick={handleLogout}
            className="w-full py-10 rounded-3xl bg-gradient-to-r from-rose-600 to-red-600 font-black text-4xl flex items-center justify-center gap-6 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-600/50"
          >
            <LogOut size={56} />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Chỉ hiện trên điện thoại */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-8 py-6 lg:hidden">
        <div className="flex justify-around">
          {['Home', 'Events', 'Send', 'Receive', 'Profile'].map((tab, i) => (
            <div key={tab} className={`text-center ${i === 4 ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-14 h-14 mx-auto mb-2 bg-white/10 rounded-3xl" />
              <p className="text-sm font-bold">{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}