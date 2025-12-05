// src/pages/ticket/TicketDetailPage.tsx
import { format } from 'date-fns';
import { AlertCircle, ArrowLeft, ArrowUpRight, Calendar, Check, CheckCircle, Clock, Copy, CreditCard, Download, Gift, Globe, Mail, MapPin, Percent, RotateCcw, Share2, User, Wallet, XCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const eventInfo = {
  evt_spring2025: { title: "Spring Music Festival 2025", date: new Date("2025-02-20T19:00:00"), location: "Sân vận động Quân khu 7, TP.HCM", emoji: "Music" },
  evt_techfair2025: { title: "Tech Career Fair 2025", date: new Date("2025-01-28T09:00:00"), location: "SECC, Q.7, TP.HCM", emoji: "Briefcase" },
  evt_art2024: { title: "Art Exhibition Opening 2024", date: new Date("2024-12-10"), location: "Bảo tàng Mỹ thuật TP.HCM", emoji: "Paintbrush" },
  evt_concert2024: { title: "Sơn Tùng M-TP Live Concert", date: new Date("2024-11-25"), location: "Nhà thi đấu Phú Thọ", emoji: "Microphone" },
};

export default function TicketDetailPage() {
  const navigate = useNavigate()
  const { state: ticket } = useLocation() as { state: any }

  if (!ticket) {
    return <div className="text-center py-20 text-3xl">Không tìm thấy vé</div>
  }

  const event = eventInfo[ticket.eventId as keyof typeof eventInfo] || { title: "Sự kiện không xác định", date: new Date(), location: "N/A", emoji: "Ticket" }
  const daysLeft = Math.max(0, Math.ceil((event.date.getTime() - new Date().getTime()) / (86400000)))
  const isValidAndFuture = ticket.status === 'valid' && daysLeft > 0 && !ticket.isExpired

  // Chức năng ví dụ (thực tế cần implement backend)
  const handleTransfer = () => {
    if (!ticket.isTransferable) return alert('Vé này không thể chuyển nhượng')
    // Logic chuyển nhượng: mở modal nhập người nhận, gọi API
    alert(`Chuyển vé ${ticket.ticketCode} cho người khác?`)
  }

  const handleShare = () => {
    // Chia sẻ link hoặc QR
    alert(`Chia sẻ vé ${ticket.ticketCode}`)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticket.ticketCode)
    alert('Đã copy mã vé')
  }

  const handleDownloadQR = () => {
    if (ticket.qrCodeDataUrl) {
      const link = document.createElement('a')
      link.href = ticket.qrCodeDataUrl
      link.download = `${ticket.ticketCode}.png`
      link.click()
    }
  }

  const handleAddToCalendar = () => {
    // Tạo event ICS hoặc dùng Google Calendar API
    alert(`Thêm sự kiện ${event.title} vào lịch`)
  }

  const handleViewOnExplorer = () => {
    if (ticket.paymentTxHash) {
      window.open(`https://polygonscan.com/tx/${ticket.paymentTxHash}`, '_blank')
    }
  }

  const handleNavigateToLocation = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(event.location)}`, '_blank')
  }

  const handleAddToWallet = () => {
    // Thêm vào Apple/Google Wallet (cần implement pass)
    alert('Thêm vé vào ví điện tử')
  }

  const handleCancel = () => {
    if (ticket.status !== 'valid') return alert('Không thể hủy vé này')
    // Gọi API hủy
    alert(`Hủy vé ${ticket.ticketCode}?`)
  }

  const handleRefundRequest = () => {
    if (ticket.status !== 'valid') return alert('Không thể hoàn tiền vé này')
    // Gọi API hoàn tiền
    alert(`Yêu cầu hoàn tiền cho vé ${ticket.ticketCode}?`)
  }

  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'valid': return <CheckCircle className="text-emerald-400" size={48} />
      case 'used': return <Check className="text-cyan-400" size={48} />
      case 'transferred': return <ArrowUpRight className="text-orange-400" size={48} />
      case 'cancelled': return <XCircle className="text-red-400" size={48} />
      case 'refunded': return <RotateCcw className="text-yellow-400" size={48} />
      case 'expired': return <AlertCircle className="text-gray-400" size={48} />
      default: return <AlertCircle className="text-gray-400" size={48} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-32">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="px-4 sm:px-6 pt-6 sm:pt-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white/60 hover:text-white transition mb-8"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-medium">Quay lại vé của tôi</span>
        </button>

        {/* Main Grid - Responsive */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT: Ticket Visual + Owner + Payment Info */}
          <div className="space-y-6">
            {/* Ticket Visual */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] md:aspect-auto md:h-96 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 relative flex items-center justify-center">
                {/* Ticket Code Badge */}
                <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20">
                  <p className="text-sm text-white/70">Mã vé</p>
                  <p className="text-2xl font-black">{ticket.ticketCode}</p>
                </div>

                {/* Countdown/Status Badge */}
                {isValidAndFuture ? (
                  <div className="absolute bottom-5 left-5 bg-emerald-500/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl">
                    <p className="text-3xl font-black">{daysLeft}</p>
                    <p className="text-sm -mt-1">ngày nữa</p>
                  </div>
                ) : (
                  <div className="absolute bottom-5 left-5 bg-slate-600/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl">
                    <p className="text-2xl font-black capitalize">{ticket.status}</p>
                  </div>
                )}

                {/* Main Content */}
                <div className="text-center px-8">
                  <div className="text-8xl mb-6">{event.emoji}</div>
                  <h1 className="text-4xl md:text-5xl font-black leading-tight">{event.title}</h1>
                  <p className="text-2xl mt-4 text-white/90">{ticket.ticketTypeName}</p>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><User size={24} /> Thông tin chủ vé</h3>
              <div className="space-y-4 text-sm md:text-base">
                <p className="flex items-center gap-3"><span className="w-32 text-white/50">Họ tên</span> <span className="font-bold">{ticket.ownerName}</span></p>
                {ticket.ownerStudentId && <p className="flex items-center gap-3"><span className="w-32 text-white/50">MSSV</span> <span className="font-bold text-emerald-400">{ticket.ownerStudentId}</span></p>}
                <p className="flex items-center gap-3"><span className="w-32 text-white/50">Email</span> <span>{ticket.ownerEmail}</span></p>
                {ticket.ownerPhone && <p className="flex items-center gap-3"><Mail size={20} /> {ticket.ownerPhone}</p>}
                {ticket.ownerAddress && <p className="flex items-center gap-3"><MapPin size={20} /> {ticket.ownerAddress}</p>}
                <p className="flex items-center gap-3"><span className="w-32 text-white/50">Chủ gốc</span> <span className="font-bold">{ticket.originalOwnerId.toString().slice(0,10)}...</span></p>
                {ticket.transferredTo && <p className="flex items-center gap-3"><span className="w-32 text-white/50">Chuyển cho</span> <span className="text-orange-400">{ticket.transferredTo.toString().slice(0,10)}...</span></p>}
                {ticket.transferredAt && <p className="flex items-center gap-3"><Clock size={20} /> Chuyển lúc: {format(new Date(ticket.transferredAt), 'dd/MM/yyyy HH:mm')}</p>}
              </div>
            </div>

            {/* Payment & Benefits */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><CreditCard size={24} /> Thanh toán & Lợi ích</h3>
              <div className="space-y-4 text-sm md:text-base">
                <p className="flex items-center gap-3"><span className="w-32 text-white/50">Giá thanh toán</span> <span className="font-bold">{ticket.pricePaid.toLocaleString()} VND</span></p>
                <p className="flex items-center gap-3"><span className="w-32 text-white/50">Phương thức</span> <span className="capitalize flex items-center gap-2">{ticket.paymentMethod} {ticket.paymentMethod === 'gift' && <Gift size={20} className="text-pink-400" />}</span></p>
                {ticket.paymentTxHash && <p className="flex items-center gap-3"><span className="w-32 text-white/50">Tx Hash</span> <span className="text-emerald-400 break-all">{ticket.paymentTxHash.slice(0,10)}...{ticket.paymentTxHash.slice(-10)}</span></p>}
                {ticket.paymentBlockNumber && <p className="flex items-center gap-3"><span className="w-32 text-white/50">Block</span> {ticket.paymentBlockNumber}</p>}
                {ticket.paymentTimestamp && <p className="flex items-center gap-3"><Clock size={20} /> Thanh toán lúc: {format(new Date(ticket.paymentTimestamp), 'dd/MM/yyyy HH:mm')}</p>}
                {ticket.discountCode && <p className="flex items-center gap-3"><Percent size={20} className="text-yellow-400" /> Mã giảm: {ticket.discountCode}</p>}
                <p className="text-white/50 mt-4">Lợi ích:</p>
                <ul className="list-disc pl-6 space-y-2">
                  {ticket.benefits.map((benefit: string, i: number) => <li key={i} className="text-sm">{benefit}</li>)}
                </ul>
              </div>
            </div>

            {/* Check-in Info */}
            {ticket.checkedInAt && (
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Check size={24} /> Thông tin Check-in</h3>
                <div className="space-y-4 text-sm md:text-base">
                  <p className="flex items-center gap-3"><Clock size={20} /> Lúc: {format(new Date(ticket.checkedInAt), 'dd/MM/yyyy HH:mm')}</p>
                  {ticket.checkedInBy && <p className="flex items-center gap-3"><User size={20} /> Bởi: {ticket.checkedInBy.toString().slice(0,10)}...</p>}
                  <p className="flex items-center gap-3"><span className="w-32 text-white/50">Phương thức</span> {ticket.checkinMethod.toUpperCase()}</p>
                  {ticket.checkinLocation && <p className="flex items-center gap-3"><MapPin size={20} /> {ticket.checkinLocation}</p>}
                </div>
              </div>
            )}

            {/* Dates & Notes */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Calendar size={24} /> Ngày tháng & Ghi chú</h3>
              <div className="space-y-4 text-sm md:text-base">
                <p className="flex items-center gap-3"><Clock size={20} /> Mua lúc: {format(new Date(ticket.purchasedAt), 'dd/MM/yyyy HH:mm')}</p>
                {ticket.cancelledAt && <p className="flex items-center gap-3 text-red-400"><XCircle size={20} /> Hủy lúc: {format(new Date(ticket.cancelledAt), 'dd/MM/yyyy HH:mm')}</p>}
                {ticket.refundedAt && <p className="flex items-center gap-3 text-yellow-400"><RotateCcw size={20} /> Hoàn lúc: {format(new Date(ticket.refundedAt), 'dd/MM/yyyy HH:mm')}</p>}
                {ticket.expiredAt && <p className="flex items-center gap-3 text-gray-400"><AlertCircle size={20} /> Hết hạn: {format(new Date(ticket.expiredAt), 'dd/MM/yyyy HH:mm')}</p>}
                {ticket.note && <p className="mt-4 text-white/70 break-words">{ticket.note}</p>}
              </div>
            </div>
          </div>

          {/* RIGHT: QR + Status + Actions */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6 md:p-8 text-center">
              <h3 className="text-2xl font-black mb-6">Mã QR vào cửa</h3>
              <div className="bg-white rounded-3xl p-6 mb-6 inline-block shadow-2xl">
                {ticket.qrCodeDataUrl ? (
                  <img src={ticket.qrCodeDataUrl} alt="QR Code" className="w-48 h-48 md:w-64 md:h-64" />
                ) : (
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-600 to-orange-600 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-inner">
                    {ticket.ticketCode}
                  </div>
                )}
              </div>
              <p className="text-white/60 mb-8 text-lg">Xuất trình mã này tại cổng để check-in</p>
              <button
                onClick={handleDownloadQR}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-orange-600 font-black text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Download size={24} />
                Tải QR
              </button>
            </div>

            {/* Status Badge */}
            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/50 rounded-3xl p-6 flex flex-col items-center gap-4 shadow-lg shadow-emerald-600/20">
              {getStatusIcon()}
              <div>
                <p className="text-2xl font-black text-emerald-400 uppercase">{ticket.status}</p>
                <p className="text-white/70 mt-1">Vé NFT được xác thực trên blockchain</p>
                {ticket.isExpired && <p className="text-red-400 mt-2">Vé đã hết hạn</p>}
              </div>
            </div>

            {/* Quick Actions - Grid responsive */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-black mb-5">Hành động</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button onClick={handleAddToCalendar} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <Calendar size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Thêm lịch</span>
                </button>
                <button onClick={handleShare} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <Share2 size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Chia sẻ</span>
                </button>
                <button onClick={handleViewOnExplorer} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <Globe size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Explorer</span>
                </button>
                <button onClick={handleTransfer} disabled={!ticket.isTransferable || ticket.status !== 'valid'} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group disabled:opacity-50">
                  <ArrowUpRight size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Chuyển vé</span>
                </button>
                <button onClick={handleNavigateToLocation} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <MapPin size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Chỉ đường</span>
                </button>
                <button onClick={handleCopyCode} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <Copy size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Copy mã</span>
                </button>
                <button onClick={handleAddToWallet} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                  <Wallet size={28} className="text-white/70 group-hover:text-purple-400 transition" />
                  <span className="text-sm font-medium">Thêm wallet</span>
                </button>
                <button onClick={handleCancel} disabled={ticket.status !== 'valid'} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 transition-all flex flex-col items-center gap-2 group disabled:opacity-50">
                  <XCircle size={28} className="text-white/70 group-hover:text-red-400 transition" />
                  <span className="text-sm font-medium">Hủy vé</span>
                </button>
                <button onClick={handleRefundRequest} disabled={ticket.status !== 'valid'} className="py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all flex flex-col items-center gap-2 group disabled:opacity-50">
                  <RotateCcw size={28} className="text-white/70 group-hover:text-yellow-400 transition" />
                  <span className="text-sm font-medium">Hoàn tiền</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}