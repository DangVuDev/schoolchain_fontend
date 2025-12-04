// src/pages/event/TicketDetailPage.tsx – BẢN HOÀN HẢO NHẤT VIỆT NAM 2025
import { ArrowLeft, CheckCircle, Wallet, Calendar, Share2, Globe, ArrowUpRight, MapPin, Copy, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TicketDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-32">
      {/* Background Glow – giống hệt SendReceipt */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-5 pt-6 sm:pt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white/60 hover:text-white transition mb-8"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-medium">Quay lại vé của tôi</span>
        </button>

        {/* Main Content – Responsive Grid */}
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* LEFT: Ticket Visual + Info */}
          <div className="space-y-6">
            {/* Big NFT Ticket Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] md:aspect-auto md:h-96 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 relative flex items-center justify-center">
                {/* Ticket Number Badge */}
                <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70">NFT Ticket</p>
                  <p className="text-2xl font-black">#8042</p>
                </div>

                {/* Countdown Badge */}
                <div className="absolute bottom-5 left-5 bg-emerald-500/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl">
                  <p className="text-3xl font-black">36</p>
                  <p className="text-sm -mt-1">ngày nữa</p>
                </div>

                {/* Main Ticket Content */}
                <div className="text-center px-10">
                  <div className="text-8xl mb-6">Music</div>
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">
                    Spring Music<br />Festival 2025
                  </h1>
                  <p className="text-2xl mt-4 text-white/90">VIP • Ghế A1</p>
                </div>
              </div>
            </div>

            {/* Event Info Card */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-black mb-6">Thông tin sự kiện</h3>
              <div className="space-y-5">
                {[
                  { label: 'Ngày giờ', value: '20/02/2025 • 19:00 - 23:00' },
                  { label: 'Địa điểm', value: 'Sân vận động chính ĐH Bách Khoa', sub: '268 Lý Thường Kiệt, Q.10, TP.HCM' },
                  { label: 'Loại vé', value: 'VIP Section • Hàng A, Ghế 1' },
                  { label: 'Nghệ sĩ', value: 'Sơn Tùng M-TP, HIEUTHUHAI, Orange, tlinh' },
                  { label: 'Chủ sở hữu', value: 'Nguyễn Thị Mai Anh', sub: 'MSSV: 22DH110001', highlight: true },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-white/50 text-sm">{item.label}</p>
                      <p className="text-lg font-bold mt-1">{item.value}</p>
                      {item.sub && <p className="text-emerald-400 text-sm mt-1">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-black mb-6">Thông tin Blockchain</h3>
              <div className="space-y-4 text-sm">
                {[
                  ['Token ID', '#8042'],
                  ['Contract', '0x9a8f...3c2b', true],
                  ['Mạng', 'Polygon zkEVM'],
                  ['Ngày mint', '15/01/2025'],
                  ['Tiêu chuẩn', 'ERC-721'],
                  ['Có thể chuyển', 'Có', true],
                ].map(([label, value, highlight]) => (
                  <div key={label as string} className="flex justify-between items-center py-2">
                    <span className="text-white/50">{label}</span>
                    <span className={`font-bold ${highlight ? 'text-emerald-400' : ''}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: QR + Actions */}
          <div className="space-y-6">
            {/* QR Code Card */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 text-center">
              <h3 className="text-2xl font-black mb-6">Mã vào cửa</h3>
              
              <div className="bg-white rounded-3xl p-8 mb-6 inline-block shadow-2xl">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl flex items-center justify-center text-6xl font-black text-white shadow-inner">
                  QR
                </div>
              </div>

              <p className="text-white/60 mb-8 text-lg">
                Xuất trình mã này tại cổng để vào sự kiện
              </p>

              <div className="space-y-4">
                <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl">
                  <Download size={24} />
                  Lưu mã QR
                </button>
                <button className="w-full py-5 rounded-2xl bg-white/10 border-2 border-white/20 font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/20 transition">
                  <Wallet size={24} />
                  Thêm vào Apple/Google Wallet
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-black mb-5">Hành động nhanh</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: 'Thêm lịch' },
                  { icon: Share2, label: 'Chia sẻ vé' },
                  { icon: Globe, label: 'Xem trên Explorer' },
                  { icon: ArrowUpRight, label: 'Chuyển vé' },
                  { icon: MapPin, label: 'Chỉ đường' },
                  { icon: Copy, label: 'Sao chép ID' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group"
                  >
                    <Icon size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/50 rounded-3xl p-6 flex items-center gap-4 shadow-lg shadow-emerald-600/20">
              <CheckCircle size={48} className="text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-2xl font-black text-emerald-400">ĐÃ XÁC THỰC</p>
                <p className="text-white/70 mt-1">Vé NFT này được xác thực trên blockchain, không thể làm giả.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}