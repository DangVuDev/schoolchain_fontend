'use client';

import { format, isPast } from 'date-fns';
import { Calendar, CheckCircle2, Crown, Gift, RefreshCw, Search, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const mockTickets: any[] = [
  {
    _id: "67f8d1a2c9e8b3a1f9d2e4c1",
    eventId: "evt_spring2025" as any,
    userId: "usr_123" as any,
    ticketTypeName: "VIP Platinum",
    ownerName: "Nguyễn Văn An",
    ownerStudentId: "22DH110123",
    ownerEmail: "an.nguyen@hcmut.edu.vn",
    ownerPhone: "0901234567",
    ticketCode: "SMF2025-VIP001",
    qrCodeDataUrl: "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=SMF2025-VIP001",
    pricePaid: 5000000,
    paymentMethod: "vndc",
    paymentTxHash: "0x123abc...xyz789",
    paymentTimestamp: new Date("2025-01-15"),
    benefits: ["Backstage Pass", "Meet & Greet", "Free Merch", "Priority Entry"],
    status: "valid",
    isTransferable: true,
    originalOwnerId: "usr_123" as any,
    purchasedAt: new Date("2025-01-15"),
  },
  {
    _id: "67f8d1a2c9e8b3a1f9d2e4c2",
    eventId: "evt_techfair2025" as any,
    userId: "usr_123" as any,
    ticketTypeName: "Early Bird",
    ownerName: "Trần Thị Mai",
    ownerEmail: "mai.tran@gmail.com",
    ticketCode: "TCF2025-EB456",
    pricePaid: 350000,
    paymentMethod: "promo",
    discountCode: "WELCOME50",
    benefits: ["Fast-track Entry", "Free Coffee"],
    status: "valid",
    isTransferable: false,
    originalOwnerId: "usr_123" as any,
    purchasedAt: new Date("2025-01-10"),
  },
  {
    _id: "67f8d1a2c9e8b3a1f9d2e4c3",
    eventId: "evt_art2024" as any,
    userId: "usr_123" as any,
    ticketTypeName: "Standard",
    ownerName: "Lê Hoàng Minh",
    ticketCode: "ART2024-STD789",
    pricePaid: 0,
    paymentMethod: "gift",
    benefits: ["Free Entry", "Exhibition Guide"],
    status: "used",
    checkedInAt: new Date("2024-12-10T18:30:00"),
    checkinMethod: "qr",
    originalOwnerId: "usr_123" as any,
    purchasedAt: new Date("2024-11-20"),
  },
  {
    _id: "67f8d1a2c9e8b3a1f9d2e4c4",
    eventId: "evt_concert2024" as any,
    userId: "usr_123" as any,
    ticketTypeName: "VIP",
    ownerName: "Phạm Kim Ngân",
    ticketCode: "CON2024-VIP333",
    pricePaid: 8000000,
    paymentMethod: "vndc",
    status: "transferred",
    transferredTo: "usr_999" as any,
    transferredAt: new Date("2024-12-01"),
    isTransferable: true,
    originalOwnerId: "usr_123" as any,
    purchasedAt: new Date("2024-10-15"),
  },
];

const eventInfo = {
  evt_spring2025: { title: "Spring Music Festival 2025", date: new Date("2025-02-20T19:00:00"), emoji: "Music" },
  evt_techfair2025: { title: "Tech Career Fair 2025", date: new Date("2025-01-28T09:00:00"), emoji: "Briefcase" },
  evt_art2024: { title: "Art Exhibition Opening 2024", date: new Date("2024-12-10"), emoji: "Paintbrush" },
  evt_concert2024: { title: "Sơn Tùng M-TP Live Concert", date: new Date("2024-11-25"), emoji: "Microphone" },
};

type FilterType = 'all' | 'upcoming' | 'used' | 'transferred';

export default function MyTicketsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const ticketsWithEvent = mockTickets.map(t => ({
    ...t,
    event: eventInfo[t.eventId as keyof typeof eventInfo] || { title: "Unknown Event", date: new Date(), emoji: "Ticket" },
    isPast: isPast(eventInfo[t.eventId as keyof typeof eventInfo]?.date || new Date()),
  }));

  const filtered = ticketsWithEvent
    .filter(t => 
      t.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(t => {
      if (filter === 'all') return true;
      if (filter === 'upcoming') return t.status === 'valid' && !t.isPast;
      if (filter === 'used') return t.status === 'used';
      if (filter === 'transferred') return t.status === 'transferred';
      return false;
    });

  const counts = {
    all: ticketsWithEvent.length,
    upcoming: ticketsWithEvent.filter(t => t.status === 'valid' && !t.isPast).length,
    used: ticketsWithEvent.filter(t => t.status === 'used').length,
    transferred: ticketsWithEvent.filter(t => t.status === 'transferred').length,
  };

  const getStatusBadge = (ticket: typeof ticketsWithEvent[0]) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1";
    if (ticket.status === 'valid' && !ticket.isPast) return <span className={`${base} bg-emerald-500/20 text-emerald-400 border border-emerald-500/50`}><CheckCircle2 size={12} /> Còn hiệu lực</span>;
    if (ticket.status === 'used') return <span className={`${base} bg-cyan-500/20 text-cyan-400 border border-cyan-500/50`}><CheckCircle2 size={12} /> Đã sử dụng</span>;
    if (ticket.status === 'transferred') return <span className={`${base} bg-orange-500/20 text-orange-400 border border-orange-500/50`}><RefreshCw size={12} /> Đã chuyển</span>;
    if (ticket.status === 'cancelled') return <span className={`${base} bg-red-500/20 text-red-400 border border-red-500/50`}><XCircle size={12} /> Đã hủy</span>;
    return <span className={`${base} bg-gray-500/20 text-gray-400`}>Không xác định</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-20">
      <div className="container mx-auto px-4 pt-8 sm:px-6 sm:pt-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3">Vé của tôi</h1>
          <p className="text-lg sm:text-xl text-gray-400">Quản lý tất cả vé NFT • {counts.all} vé</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm mã vé, sự kiện, tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:border-purple-500 transition text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {(['all', 'used', 'transferred', 'upcoming'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-xl'
                  : 'bg-white/10 border border-white/20 text-gray-400 hover:border-purple-500 hover:text-white'
              }`}
            >
              {f === 'upcoming' && `Sắp tới (${counts.upcoming})`}
              {f === 'used' && `Đã dùng (${counts.used})`}
              {f === 'transferred' && `Đã chuyển (${counts.transferred})`}
              {f === 'all' && `Tất cả (${counts.all})`}
            </button>
          ))}
        </div>

        {/* Ticket Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((ticket) => (
            <div
              key={ticket._id}
              onClick={() => navigate(`/ticket/${ticket.ticketCode}`, { state: ticket })}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-600/20 cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center">
                <div className="text-8xl">{ticket.event.emoji}</div>
                {ticket.ticketTypeName.includes('VIP') && <Crown className="absolute top-4 right-4 text-yellow-400" size={32} />}
                {ticket.paymentMethod === 'gift' && <Gift className="absolute top-4 left-4 text-pink-400" size={28} />}
                <div className="absolute bottom-3 left-3 text-xs font-bold bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  {ticket.ticketCode}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-black text-lg line-clamp-2">{ticket.event.title}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Calendar size={14} />
                  {format(ticket.event.date, 'dd/MM/yyyy')}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-purple-400">{ticket.ticketTypeName}</span>
                  {getStatusBadge(ticket)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}