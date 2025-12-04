// src/pages/Profile.tsx – MOBILE PERFECT EDITION 2025
import {
  Bell,
  ChevronRight,
  LogOut,
  QrCode,
  School2,
  Settings,
  Shield,
  Sparkles,
  Ticket,
  User,
  Wallet,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { userName = 'Nguyễn Văn A', studentId = '22DH110001' } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => navigate('/login')

  const menuItems = [
    { icon: Shield, label: 'Bảo mật & Riêng tư', desc: 'PIN, Face ID, 2FA', to: '/security' },
    { icon: Bell, label: 'Thông báo', desc: 'Tin nhắn, ưu đãi, sự kiện', to: '/notifications' },
    { icon: QrCode, label: 'Mã QR cá nhân', desc: 'Nhận tiền siêu nhanh', to: '/receive' },
    { icon: User, label: 'Thông tin cá nhân', desc: 'Cập nhật hồ sơ, avatar', to: '/personal-info' },
    { icon: Settings, label: 'Cài đặt ứng dụng', desc: 'Ngôn ngữ, giao diện', to: '/settings' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 pt-8 pb-10">
        {/* Avatar + Info – gọn đẹp trên mobile */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-600 blur-3xl rounded-full opacity-60" />

            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1.5 shadow-2xl">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl sm:text-7xl font-black">
                {userName[0].toUpperCase()}
              </div>
            </div>

            {/* Student Badge */}
            <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-950 shadow-xl">
              <School2 size={28} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {userName}
          </h1>
          <p className="text-lg text-white/60 mt-2">MSSV: {studentId}</p>

          <div className="flex justify-center mt-5">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 rounded-full border border-emerald-500/40">
              <Sparkles size={18} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">ĐÃ XÁC MINH</span>
              <Sparkles size={18} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions – 1 cột trên mobile, 3 cột trên tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap- gap-5 mb-12">
          {[
            { to: '/my-tickets', icon: Ticket, color: 'from-purple-600 to-pink-600', title: 'Vé NFT', desc: '3 vé đang sở hữu' },
            { to: '/receive', icon: QrCode, color: 'from-emerald-500 to-teal-600', title: 'Nhận tiền', desc: 'Mã QR cá nhân' },
            { to: '/wallet-detail', icon: Wallet, color: 'from-orange-500 to-red-600', title: 'Quản lý ví', desc: 'Backup, private key' },
          ].map((item) => (
            <NavLink key={item.to} to={item.to} className="group">
              <div className="bg-white/5 backdrop-blur-3xl rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                  <item.icon size={40} className="text-white" />
                </div>
                <p className="text-xl font-bold">{item.title}</p>
                <p className="text-white/50 text-sm mt-1">{item.desc}</p>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Menu Settings – gọn gàng, dễ bấm */}
        <div className="space-y-4 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-6">Cài đặt & Bảo mật</h2>
          {menuItems.map((item) => (
            <NavLink key={item.label} to={item.to} className="block group">
              <div className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <item.icon size={28} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{item.label}</p>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-white/30 group-hover:text-purple-400 group-hover:translate-x-2 transition-all" />
              </div>
            </NavLink>
          ))}
        </div>

        {/* Logout Button – vừa tay, dễ bấm */}
        <div className="max-w-xl mx-auto mt-12">
          <button
            onClick={handleLogout}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 font-bold text-xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-600/50"
          >
            <LogOut size={28} />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  )
}