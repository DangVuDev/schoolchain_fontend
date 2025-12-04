// src/pages/SendSearch.tsx – PHIÊN BẢN HOÀN HẢO CHO MỌI THIẾT BỊ
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-32 max-w-7xl">
        {/* Header - Desktop: rộng rãi | Mobile: nhỏ gọn */}
        <div className="flex items-center justify-between mb-16">
          <button
            onClick={() => navigate(-1)}
            className="p-4 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 transition shadow-lg"
          >
            <ArrowLeft size={36} />
          </button>

          <div className="text-center flex-1">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Gửi VNDC
            </h1>
            <div className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-black text-3xl shadow-2xl shadow-emerald-500/60 animate-pulse">
              0 GAS FEE
            </div>
          </div>

          <div className="w-16 md:w-20" />
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Search + QR + Manual Address */}
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-center lg:text-left">
              Tìm người nhận
            </h2>
            {/* Search Box */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-10 shadow-2xl">
              <div className="relative">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm tên, mã sinh viên hoặc số điện thoại..."
                  className="w-full pl-24 pr-10 py-9 text-2xl md:text-3xl rounded-3xl bg-white/10 border border-white/20 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition placeholder:text-white/40 font-medium"
                />
              </div>
            </div>

            {/* QR & Manual Address */}
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => navigate('/send/scan')}
                className="group bg-gradient-to-br from-purple-600 to-orange-600 rounded-3xl p-10 shadow-2xl hover:shadow-purple-600/60 active:scale-98 transition-all"
              >
                <QrCode size={80} className="mx-auto mb-6 group-hover:scale-110 transition" />
                <p className="text-3xl font-black text-center">Quét QR</p>
              </button>

              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Wallet size={48} className="text-purple-400" />
                  <p className="text-2xl font-bold">Nhập địa chỉ ví</p>
                </div>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSend()}
                  placeholder="0x..."
                  className="w-full px-6 py-6 rounded-2xl bg-white/10 border border-white/20 focus:border-purple-500 transition placeholder:text-white/40 text-lg"
                />
                <button
                  onClick={handleManualSend}
                  disabled={!manualAddress.trim()}
                  className={`mt-6 w-full py-6 rounded-2xl font-black text-2xl transition-all ${
                    manualAddress.trim()
                      ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-xl hover:scale-105'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>

          {/* Right: Recent Contacts */}
          <div className="lg:pl-12">
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-center lg:text-left">
              {search === '' ? 'Gửi gần đây' : 'Kết quả tìm kiếm'}
            </h2>

            <div className="space-y-6">
              {(search === '' ? recentContacts : filtered).map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleSelect(contact)}
                  className="group bg-white/5 backdrop-blur-3xl rounded-3xl p-8 flex items-center gap-8 cursor-pointer border border-white/10 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-600/40"
                >
                  <div className={`relative w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl
                    ${contact.isFavorite 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-br from-purple-600 to-orange-600'
                    }`}
                  >
                    {contact.avatar}
                    {contact.isFavorite && (
                      <Star className="absolute -top-3 -right-3 w-12 h-12 fill-yellow-400 text-yellow-400 drop-shadow-2xl" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold flex items-center gap-4">
                      {contact.name}
                      {contact.isFavorite && <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />}
                    </h3>
                    <p className="text-white/60 text-xl">MSSV: {contact.studentId}</p>
                    <p className="text-white/40 text-lg mt-2">Gửi lần cuối: {contact.lastSent}</p>
                  </div>

                </div>
              ))}
            </div>

            {search !== '' && filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-3xl text-white/40">Không tìm thấy kết quả</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav - Chỉ hiện khi màn nhỏ */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-3xl border-t border-white/10 px-8 py-6 lg:hidden">
        <div className="flex justify-around text-sm">
          {['Home', 'Send', 'Receive', 'Events', 'Profile'].map((tab) => (
            <div key={tab} className={`text-center ${tab === 'Send' ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-12 h-12 mx-auto mb-1 bg-white/10 rounded-2xl" />
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}