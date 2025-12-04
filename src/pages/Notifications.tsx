// src/pages/Notifications.tsx – Liquid Glass 2025 Edition
import { ArrowLeft, Bell, BellOff, CreditCard, Ticket, Gift, Megaphone, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Notifications() {
  const navigate = useNavigate()

  // Cài đặt thông báo
  const [pushEnabled, setPushEnabled] = useState(true)
  const [transaction, setTransaction] = useState(true)
  const [event, setEvent] = useState(true)
  const [offer, setOffer] = useState(true)
  const [marketing, setMarketing] = useState(false)

  // Danh sách thông báo mẫu
  const notifications = [
    {
      id: 1,
      type: 'transaction',
      title: 'Nhận 1.250.000 VNDC',
      desc: 'Từ Trần Minh Quân • Vừa xong',
      icon: CreditCard,
      color: 'emerald',
      amount: '+1.250.000 VNDC',
      time: 'Vừa xong'
    },
    {
      id: 2,
      type: 'event',
      title: 'Vé NFT đã sẵn sàng!',
      desc: 'Spring Campus Fest 2025 • Check-in ngay',
      icon: Ticket,
      color: 'purple',
      time: '15 phút trước'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Flash Sale 70% vé VIP',
      desc: 'Chỉ trong 2 giờ tới • Đừng bỏ lỡ!',
      icon: Gift,
      color: 'orange',
      time: '1 giờ trước'
    },
    {
      id: 4,
      type: 'marketing',
      title: 'Airdrop 100.000 VNDC cho sinh viên',
      desc: 'Tham gia ngay • Kết thúc sau 3 ngày',
      icon: Megaphone,
      color: 'pink',
      time: '1 ngày trước'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Glow – giống hệt WalletDetail & Security */}
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
              Thông báo
            </h1>
            {pushEnabled ? <Bell size={36} className="text-purple-400" /> : <BellOff size={36} className="text-white/40" />}
          </div>

          {/* Grid responsive: mobile dọc, laptop chia 2 cột */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Cột 1: Cài đặt thông báo */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <Bell size={40} className="text-purple-400" />
                Cài đặt thông báo
              </h2>

              <div className="space-y-5">
                {/* Tổng bật/tắt */}
                <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                        {pushEnabled ? <Bell size={36} className="text-white" /> : <BellOff size={36} className="text-white/60" />}
                      </div>
                      <div>
                        <p className="text-2xl font-black">Tất cả thông báo</p>
                        <p className="text-white/60">Push notification</p>
                      </div>
                    </div>
                    <Toggle checked={pushEnabled} onChange={setPushEnabled} />
                  </div>
                </div>

                {/* Các loại thông báo */}
                {[
                  { label: 'Giao dịch & Chuyển tiền', icon: CreditCard, color: 'emerald', state: transaction, set: setTransaction },
                    { label: 'Sự kiện & Vé NFT', icon: Ticket, color: 'purple', state: event, set: setEvent },
                  { label: 'Ưu đãi & Flash Sale', icon: Gift, color: 'orange', state: offer, set: setOffer },
                  { label: 'Tin tức & Airdrop', icon: Megaphone, color: 'pink', state: marketing, set: setMarketing },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-6 shadow-2xl flex items-center justify-between hover:border-white/30 transition">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center shadow-lg`}>
                        <item.icon size={32} className="text-white" />
                      </div>
                      <p className="text-xl font-black">{item.label}</p>
                    </div>
                    <Toggle checked={item.state} onChange={item.set} />
                  </div>
                ))}
              </div>
            </div>

            {/* Cột 2: Danh sách thông báo */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <Package size={40} className="text-orange-400" />
                Thông báo mới
              </h2>

              <div className="space-y-5">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:border-purple-500/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${notif.color}-500 to-${notif.color}-600 flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <notif.icon size={36} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl font-black text-white group-hover:text-purple-300 transition">
                          {notif.title}
                        </p>
                        {notif.amount && (
                          <p className="text-3xl font-black text-emerald-400 mt-1">{notif.amount}</p>
                        )}
                        <p className="text-white/70 mt-1">{notif.desc}</p>
                        <p className="text-white/40 text-sm mt-3">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Không còn thông báo */}
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                    <BellOff size={48} className="text-white/30" />
                  </div>
                  <p className="text-xl text-white/50 font-medium">Bạn đã đọc hết thông báo</p>
                  <p className="text-white/40 mt-2">Không còn thông báo mới</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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

// Toggle Switch – xịn hơn, có hiệu ứng gradient
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-20 h-11 rounded-full transition-all duration-300 shadow-inner ${
        checked 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
          : 'bg-white/10 border border-white/20'
      }`}
    >
      <div
        className={`absolute top-1.5 left-1.5 w-9 h-9 rounded-full bg-white shadow-lg transition-transform duration-300 ${
          checked ? 'translate-x-9' : ''
        }`}
      />
    </button>
  )
}