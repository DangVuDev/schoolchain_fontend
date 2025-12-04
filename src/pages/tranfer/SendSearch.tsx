// src/pages/SendSearch.tsx – BẢN HOÀN HẢO 100% CHO MỌI ĐIỆN THOẠI (2025 EDITION)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, QrCode, Star, Wallet } from 'lucide-react'

interface Contact {
  id: string
  name: string
  studentId: string
  avatar: string
  isFavorite: boolean
  lastSent: string
}

const recentContacts: Contact[] = [
  { id: '1', name: 'Trần Văn Hùng', studentId: '22DH110089', avatar: 'TH', isFavorite: true, lastSent: '2 ngày trước' },
  { id: '2', name: 'Lê Thị Diệu', studentId: '22DH110045', avatar: 'LD', isFavorite: false, lastSent: '5 ngày trước' },
  { id: '3', name: 'Phạm Minh Đức', studentId: '22DH110123', avatar: 'PD', isFavorite: false, lastSent: '1 tuần trước' },
  { id: '4', name: 'Nguyễn Ngọc Mai', studentId: '22DH110001', avatar: 'NM', isFavorite: true, lastSent: 'Hôm qua' },
  { id: '5', name: 'Hoàng Văn Nam', studentId: '22DH110567', avatar: 'HN', isFavorite: false, lastSent: '3 ngày trước' },
]

export default function SendSearch() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [manualAddress, setManualAddress] = useState('')

  const filtered = recentContacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.studentId.includes(search)
  )

  const handleSelect = (contact: Contact) => {
    navigate('/send/amount', { state: { recipient: contact } })
  }

  const handleManualSend = () => {
    if (manualAddress.trim()) {
      navigate('/send/amount', { state: { recipient: { name: 'Địa chỉ ví', address: manualAddress } } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="px-4 pt-6 sm:px-6 sm:pt-10 max-w-5xl mx-auto">
        {/* Header - Siêu gọn trên mobile */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition shadow-lg"
          >
            <ArrowLeft size={28} />
          </button>

          <div className="text-center flex-1 -ml-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Gửi VNDC
            </h1>
          </div>

          {/* 0 GAS FEE Badge nhỏ gọn, lệch phải */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-black text-xs sm:text-sm shadow-2xl shadow-emerald-500/70 animate-pulse">
            0 GAS FEE
          </div>
        </div>

        {/* Search Box - Full width, vừa tay */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-white/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên, MSSV, số điện thoại..."
              className="w-full pl-16 pr-6 py-5 text-lg sm:text-xl rounded-3xl bg-white/10 border border-white/20 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition placeholder:text-white/40 font-medium outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Main Grid - Mobile: xếp chồng, Desktop: 2 cột */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: QR + Manual */}
          <div className="space-y-6">
            {/* Quét QR */}
            <button
              onClick={() => navigate('/send/scan')}
              className="w-full group bg-gradient-to-br from-purple-600 to-orange-600 rounded-3xl p-8 shadow-2xl hover:shadow-purple-600/60 active:scale-98 transition-all"
            >
              <QrCode size={64} className="mx-auto mb-4 group-hover:scale-110 transition" />
              <p className="text-2xl font-black text-center">Quét QR</p>
            </button>

            {/* Nhập địa chỉ ví */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Wallet size={36} className="text-purple-400" />
                <p className="text-xl font-bold">Nhập địa chỉ ví</p>
              </div>
              <input
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualSend()}
                placeholder="0x..."
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:border-purple-500 transition placeholder:text-white/40 text-base outline-none"
              />
              <button
                onClick={handleManualSend}
                disabled={!manualAddress.trim()}
                className={`mt-4 w-full py-4 rounded-2xl font-black text-xl transition-all ${
                  manualAddress.trim()
                    ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-xl hover:scale-105 active:scale-95'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                Tiếp tục
              </button>
            </div>
          </div>

          {/* Right: Danh sách liên hệ */}
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-center lg:text-left">
              {search === '' ? 'Gửi gần đây' : `Tìm thấy ${filtered.length} người`}
            </h2>

            <div className="space-y-4">
              {(search === '' ? recentContacts : filtered).map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleSelect(contact)}
                  className="group bg-white/5 backdrop-blur-3xl rounded-3xl p-5 flex items-center gap-5 cursor-pointer border border-white/10 hover:border-purple-500/60 transition-all hover:shadow-xl active:scale-98"
                >
                  {/* Avatar */}
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black shadow-xl
                    ${contact.isFavorite 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-br from-purple-600 to-orange-600'
                    }`}
                  >
                    {contact.avatar}
                    {contact.isFavorite && (
                      <Star className="absolute -top-2 -right-2 w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold truncate flex items-center gap-2">
                      {contact.name}
                      {contact.isFavorite && <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 flex-shrink-0" />}
                    </h3>
                    <p className="text-white/60 text-sm">MSSV: {contact.studentId}</p>
                    <p className="text-white/40 text-xs mt-1">{contact.lastSent}</p>
                  </div>
                </div>
              ))}
            </div>

            {search !== '' && filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-white/40">Không tìm thấy ai cả</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-4 py-4 lg:hidden z-50">
        <div className="flex justify-around items-center text-xs">
          {['Home', 'Send', 'Receive', 'Events', 'Profile'].map((tab) => (
            <div
              key={tab}
              className={`text-center ${tab === 'Send' ? 'text-purple-400 scale-110 font-bold' : 'text-white/50'}`}
            >
              <div className="w-10 h-10 mx-auto mb-1 bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white/30 rounded-full" />
              </div>
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Safe area bottom */}
      <div className="pb-env(safe-area-inset-bottom)" />
    </div>
  )
}