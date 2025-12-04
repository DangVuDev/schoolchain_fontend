// src/pages/Security.tsx
import { ArrowLeft, ShieldCheck, Fingerprint, Key, Smartphone, AlertTriangle, ChevronRight, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Security() {
  const navigate = useNavigate()
  const [biometric, setBiometric] = useState(true)
  const [twoFA, setTwoFA] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Glow – giống hệt WalletDetail */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-600/40 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 pt-16 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-12">
            <button onClick={() => navigate(-1)} className="p-4 bg-white/10 rounded-full backdrop-blur-xl">
              <ArrowLeft size={36} />
            </button>
            <h1 className="flex-1 text-center text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Bảo mật & Riêng tư
            </h1>
          </div>

          {/* Grid responsive giống WalletDetail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cài đặt bảo mật */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black mb-4">Cài đặt bảo mật</h2>

              {/* Đăng nhập sinh trắc học */}
              <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <Fingerprint size={36} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">Sinh trắc học</p>
                      <p className="text-white/60">Face ID / Touch ID</p>
                    </div>
                  </div>
                  <Toggle checked={biometric} onChange={setBiometric} />
                </div>
              </div>

              {/* 2FA */}
              <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <Key size={36} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">Xác thực 2 lớp (2FA)</p>
                      <p className="text-white/60">Google Authenticator / SMS</p>
                    </div>
                  </div>
                  <Toggle checked={twoFA} onChange={setTwoFA} />
                </div>
              </div>

              {/* Đổi mã PIN */}
              <div
                onClick={() => navigate('/change-pin')}
                className="cursor-pointer bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl hover:border-purple-500/60 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                      <ShieldCheck size={36} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">Đổi mã PIN ví</p>
                      <p className="text-white/60">Bảo vệ giao dịch & rút tiền</p>
                    </div>
                  </div>
                  <ChevronRight size={36} className="text-white/40" />
                </div>
              </div>
            </div>

            {/* Thiết bị đăng nhập */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black mb-4">Thiết bị đã đăng nhập</h2>

              <div className="space-y-5">
                {[
                  { device: 'iPhone 15 Pro Max', location: 'Hà Nội, Việt Nam', time: 'Đang hoạt động', current: true },
                  { device: 'MacBook Pro • Chrome', location: 'Đà Nẵng, Việt Nam', time: '2 ngày trước' },
                  { device: 'iPad Pro 2024', location: 'TP. Hồ Chí Minh', time: '1 tuần trước' },
                ].map((session, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-6 shadow-2xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                        <Smartphone size={36} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{session.device}</p>
                        <p className="text-white/60 text-sm">{session.location}</p>
                        <p className="text-white/40 text-xs mt-1">{session.time}</p>
                      </div>
                    </div>

                    {session.current ? (
                      <span className="px-5 py-3 bg-emerald-500/20 rounded-2xl text-emerald-400 font-bold text-lg">
                        Thiết bị này
                      </span>
                    ) : (
                      <button className="px-5 py-3 bg-rose-500/20 rounded-2xl text-rose-400 font-bold flex items-center gap-2 hover:bg-rose-500/30 transition">
                        <LogOut size={20} />
                        Đăng xuất
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full py-6 rounded-3xl bg-rose-500/20 border border-rose-500/40 font-black text-2xl text-rose-300 hover:bg-rose-500/30 transition">
                Đăng xuất tất cả thiết bị khác
              </button>
            </div>
          </div>

          {/* Cảnh báo cuối trang */}
          <div className="mt-12 bg-rose-500/20 rounded-3xl p-8 border border-rose-500/40 shadow-2xl">
            <div className="flex items-start gap-5">
              <AlertTriangle size={40} className="text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-3xl font-black text-rose-300 mb-3">Cảnh báo bảo mật</p>
                <p className="text-rose-200 text-lg leading-relaxed">
                  VNDC Campus <span className="font-black">không bao giờ</span> yêu cầu bạn cung cấp:
                </p>
                <ul className="mt-4 space-y-2 text-rose-200/90 text-lg">
                  <li>• 12 từ khôi phục (seed phrase)</li>
                  <li>• Private key</li>
                  <li>• Mã PIN giao dịch</li>
                  <li>• Mã xác thực 2FA qua tin nhắn/telegram</li>
                </ul>
                <p className="mt-6 text-rose-300 font-bold">
                  Ai yêu cầu những thông tin này = ĐANG LỪA ĐẢO!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav – giữ nguyên */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-8 py-6">
        <div className="flex justify-around">
          {['Home', 'Events', 'Wallet', 'Tickets', 'Profile'].map((tab, i) => (
            <div key={tab} className={`text-center ${i === 4 ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-12 h-12 mx-auto mb-2 bg-white/10 rounded-2xl" />
              <p className="text-xs font-bold">{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Toggle component – đẹp hơn, có hiệu ứng
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-20 h-10 rounded-full transition-all duration-300 shadow-inner ${
        checked ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-white/10'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-lg transition-transform duration-300 ${
          checked ? 'translate-x-10' : ''
        }`}
      />
    </button>
  )
}