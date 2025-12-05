'use client';

import { format } from 'date-fns';
import { Calendar, MapPin, Search, Ticket, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


export const EVENT_MOCK_DATA: any[] = [
  // 1. Spring Music Festival 2025 - NỔI BẬT
  {
    _id: "evt_spring2025",
    title: "Spring Music Festival 2025",
    slug: "spring-music-festival-2025",
    shortDescription: "Lễ hội âm nhạc lớn nhất năm do sinh viên Bách Khoa tổ chức!",
    fullDescription: `<p>Đêm nhạc bùng nổ với <strong>Sơn Tùng M-TP • HIEUTHUHAI • Orange • tlinh</strong> và dàn line-up khủng!</p><p>Hơn 5000 sinh viên cùng cháy hết mình tại sân vận động chính.</p>`,
    thumbnail: "https://tse1.mm.bing.net/th/id/OIP.Xp9NaOeI6jQQ8dxu_8F68QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://tse1.mm.bing.net/th/id/OIP.Xp9NaOeI6jQQ8dxu_8F68QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    gallery: [],
    dateStart: new Date("2025-02-20T19:00:00"),
    dateEnd: new Date("2025-02-20T23:59:00"),
    registrationDeadline: new Date("2025-02-15"),
    location: "Sân vận động chính ĐH Bách Khoa",
    locationDetail: "268 Lý Thường Kiệt, Q.10, TP.HCM",
    googleMapsUrl: "https://maps.app.goo.gl/bk2025",
    checkinRadiusMeters: 150,
    ticketTypes: [
      { name: "General Admission", priceVndc: 50000, maxQuantity: 4000, soldQuantity: 3850, benefits: ["Vào cửa chính", "Khu đứng tự do"], isActive: true },
      { name: "VIP Section", priceVndc: 350000, maxQuantity: 500, soldQuantity: 498, benefits: ["Ghế VIP", "Fast-track", "Meet & Greet", "Quà tặng"], isActive: true, seatingSection: "Hàng A-C" },
    ],
    totalTicketsSold: 4348,
    totalRevenueVndc: 185_000_000,
    isActive: true,
    isFeatured: true,
    allowOnlineCheckin: true,
    requireStudentId: true,
    category: "concert",
    tags: ["music", "festival", "hcmut", "son-tung", "live"],
    organizerName: "Đoàn Thanh niên - Hội Sinh viên ĐH Bách Khoa",
    createdBy: "usr_admin" as any,
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date(),
    totalMaxTickets: 4500,
    isSoldOut: false,
    isOngoing: false,
  },

  // 2. Tech Career Fair 2025
  {
    _id: "evt_techfair2025",
    title: "Tech Career Fair 2025",
    slug: "tech-career-fair-2025",
    shortDescription: "Cơ hội việc làm từ 50+ công ty công nghệ hàng đầu",
    fullDescription: `<p>Gặp gỡ trực tiếp <strong>FPT • VNG • Shopee • Tiki • Axon • Viettel</strong> và hơn 50 doanh nghiệp IT.</p><p>CV review 1:1 • Phỏng vấn tại chỗ • Internship & Full-time offer ngay trong ngày!</p>`,
    thumbnail: "https://tse2.mm.bing.net/th/id/OIP.sWvpy29GXaevHlFBC1yLnAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://tse2.mm.bing.net/th/id/OIP.sWvpy29GXaevHlFBC1yLnAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    dateStart: new Date("2025-03-15T09:00:00"),
    dateEnd: new Date("2025-03-15T17:00:00"),
    registrationDeadline: new Date("2025-03-10"),
    location: "Nhà văn hóa Sinh viên TP.HCM",
    locationDetail: "643 Điện Biên Phủ, Q.3",
    ticketTypes: [
      { name: "Free Entry", priceVndc: 0, maxQuantity: 3000, soldQuantity: 2890, benefits: ["Vào cửa tự do", "Nhận CV review", "Tham gia talkshow"], isActive: true },
    ],
    totalTicketsSold: 2890,
    totalRevenueVndc: 0,
    isActive: true,
    isFeatured: true,
    allowOnlineCheckin: true,
    requireStudentId: true,
    category: "seminar",
    tags: ["job", "career", "tech", "recruitment"],
    organizerName: "Câu lạc bộ Công nghệ Thông tin",
    createdBy: "usr_clb_it" as any,
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date(),
    totalMaxTickets: 3000,
    isSoldOut: false,
    isOngoing: false,
  },

  // 3. Art Exhibition: "Future Visions"
  {
    _id: "evt_artexhibition2025",
    title: "Triển lãm Nghệ thuật: Future Visions",
    slug: "future-visions-art-exhibition",
    shortDescription: "Triển lãm nghệ thuật số và truyền thống của sinh viên Kiến trúc - Mỹ thuật",
    fullDescription: `<p>Hơn 200 tác phẩm từ sinh viên ĐH Bách Khoa, ĐH Kiến trúc, ĐH Mỹ thuật TP.HCM.</p><p>Chủ đề: Tương lai • Công nghệ • Con người</p>`,
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    banner: "https://images.unsplash.com/photo-1544966249-4c2acca766ea?w=1600",
    dateStart: new Date("2025-01-10T10:00:00"),
    dateEnd: new Date("2025-01-20T20:00:00"),
    location: "Nhà triển lãm ĐH Bách Khoa",
    ticketTypes: [
      { name: "Miễn phí", priceVndc: 0, maxQuantity: 9999, soldQuantity: 1234, benefits: ["Vào cửa tự do", "Tài liệu triển lãm"], isActive: true },
    ],
    totalTicketsSold: 1234,
    totalRevenueVndc: 0,
    isActive: true,
    isFeatured: false,
    allowOnlineCheckin: false,
    requireStudentId: false,
    category: "other",
    tags: ["art", "exhibition", "culture"],
    organizerName: "Câu lạc bộ Mỹ thuật",
    createdBy: "usr_artclub" as any,
    createdAt: new Date("2024-12-25"),
    updatedAt: new Date(),
    totalMaxTickets: 9999,
    isSoldOut: false,
    isOngoing: false,
  },

  // 4. Basketball Championship Final 2025
  {
    _id: "evt_basketball2025",
    title: "Chung kết Giải Bóng rổ Sinh viên TP.HCM 2025",
    slug: "basketball-championship-2025",
    shortDescription: "Trận chung kết nảy lửa: Bách Khoa vs Kinh Tế",
    fullDescription: `<p>Đỉnh cao bóng rổ sinh viên! Ai sẽ là nhà vô địch 2025?</p>`,
    thumbnail: "https://tse3.mm.bing.net/th/id/OIP.n_tWh6XcxrFj6BYErArjFwHaEI?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://tse3.mm.bing.net/th/id/OIP.n_tWh6XcxrFj6BYErArjFwHaEI?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    dateStart: new Date("2025-04-05T18:00:00"),
    dateEnd: new Date("2025-04-05T21:00:00"),
    location: "Nhà thi đấu Phú Thọ",
    ticketTypes: [
      { name: "Khán đài A", priceVndc: 80000, maxQuantity: 1000, soldQuantity: 998, benefits: ["Gần sân nhất", "Quà tặng đội bóng"], isActive: true },
      { name: "Khán đài B", priceVndc: 50000, maxQuantity: 2000, soldQuantity: 1850, benefits: ["Tầm nhìn tốt"], isActive: true },
    ],
    totalTicketsSold: 2848,
    totalRevenueVndc: 132_400_000,
    isActive: true,
    isFeatured: true,
    allowOnlineCheckin: true,
    requireStudentId: false,
    category: "sport",
    tags: ["basketball", "sport", "championship"],
    organizerName: "Liên đoàn Thể thao Sinh viên",
    createdBy: "usr_sport" as any,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date(),
    totalMaxTickets: 3000,
    isSoldOut: false,
    isOngoing: false,
  },

  // 5. Food Fest 2025: Ẩm thực Sinh viên
  {
    _id: "evt_foodfest2025",
    title: "Food Fest 2025 - Ngày hội Ẩm thực Sinh viên",
    slug: "food-fest-2025",
    shortDescription: "100+ gian hàng từ các trường đại học toàn quốc!",
    fullDescription: `<p>Ăn thả ga, chơi hết mình với ẩm thực 63 tỉnh thành!</p>`,
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    banner: "https://images.unsplash.com/photo-1606787366850-de6330127b61?w=1600",
    dateStart: new Date("2025-05-10T10:00:00"),
    dateEnd: new Date("2025-05-11T22:00:00"),
    location: "Công viên Lê Văn Tám",
    ticketTypes: [
      { name: "Vé vào cửa", priceVndc: 30000, maxQuantity: 5000, soldQuantity: 3210, benefits: ["Vào cửa 2 ngày", "Tặng voucher 20k"], isActive: true },
    ],
    totalTicketsSold: 3210,
    totalRevenueVndc: 96_300_000,
    isActive: true,
    ecommerce: true,
    isFeatured: true,
    allowOnlineCheckin: true,
    requireStudentId: false,
    category: "festival",
    tags: ["food", "culinary", "festival"],
    organizerName: "Hội Sinh viên Việt Nam TP.HCM",
    createdBy: "usr_hsv" as any,
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date(),
    totalMaxTickets: 5000,
    isSoldOut: false,
    isOngoing: false,
  },

  // 6. Workshop: "AI cho mọi người"
  {
    _id: "evt_aiworkshop2025",
    title: "Workshop: AI cho mọi người - Không cần code",
    slug: "ai-for-everyone-workshop",
    shortDescription: "Học AI thực tế chỉ trong 4 giờ!",
    fullDescription: `<p>Dùng ChatGPT, Midjourney, Runway để làm dự án cá nhân.</p><p>Giảng viên: Anh Nguyễn Hoàng Long - AI Engineer tại Silicon Valley</p>`,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    banner: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=1600",
    dateStart: new Date("2025-01-18T13:00:00"),
    dateEnd: new Date("2025-01-18T17:00:00"),
    location: "Phòng họp lớn - Tòa nhà E",
    ticketTypes: [
      { name: "Vé tham dự", priceVndc: 100000, maxQuantity: 150, soldQuantity: 147, benefits: ["Tài liệu", "Certificate", "Networking"], isActive: true },
    ],
    totalTicketsSold: 147,
    totalRevenueVndc: 14_700_000,
    isActive: true,
    isFeatured: false,
    allowOnlineCheckin: true,
    requireStudentId: true,
    category: "workshop",
    tags: ["ai", "tech", "workshop"],
    organizerName: "Câu lạc bộ AI Bách Khoa",
    createdBy: "usr_ai_club" as any,
    createdAt: new Date("2024-12-15"),
    updatedAt: new Date(),
    totalMaxTickets: 150,
    isSoldOut: false,
    isOngoing: false,
  },

  // 7. Party: Freshman Welcome 2025
  {
    _id: "evt_freshman2025",
    title: "Freshman Welcome Party 2025",
    slug: "freshman-welcome-party-2025",
    shortDescription: "Chào tân sinh viên K68 - Đêm hội giao lưu không thể quên!",
    fullDescription: `<p>Chào mừng các bạn K68 đã chính thức trở thành sinh viên Bách Khoa!</p>`,
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    banner: "https://images.unsplash.com/photo-1464366400600-7168bc4a70a1?w=1600",
    dateStart: new Date("2025-09-20T19:00:00"),
    dateEnd: new Date("2025-09-20T23:00:00"),
    location: "Sân khấu ngoài trời KTX Khu A",
    ticketTypes: [
      { name: "Miễn phí cho K68", priceVndc: 0, maxQuantity: 3000, soldQuantity: 2980, benefits: ["Vào cửa", "Quà tặng tân sinh viên"], isActive: true },
    ],
    totalTicketsSold: 2980,
    totalRevenueVndc: 0,
    isActive: true,
    isFeatured: true,
    allowOnlineCheckin: true,
    requireStudentId: true,
    category: "party",
    tags: ["freshman", "welcome", "party"],
    organizerName: "Ban Tuyên giáo Đoàn trường",
    createdBy: "usr_doan" as any,
    createdAt: new Date("2025-07-01"),
    updatedAt: new Date(),
    totalMaxTickets: 3000,
    isSoldOut: false,
    isOngoing: false,
  },
];

export default function EventMarketplacePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-6 pt-14 pb-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">Campus Events</h1>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 rounded-full shadow-2xl shadow-emerald-500/40">
              <Zap className="w-6 h-6" />
              <span className="text-2xl">0 GAS FEE</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm sự kiện, địa điểm..."
                className="w-full pl-16 pr-8 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              />
            </div>
            <Link
              to="/my-tickets"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-orange-600 px-8 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              <Ticket className="w-6 h-6" />
              Vé của tôi
            </Link>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {EVENT_MOCK_DATA.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  const navigate = useNavigate();
  const ticketsLeft = event.totalMaxTickets - event.totalTicketsSold;

  return (
    <div
      onClick={() => navigate(`/events/${event.slug}`, { state: event })}
      className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-600/30 cursor-pointer hover:-translate-y-2"
    >
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {event.isFeatured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-pink-600 px-4 py-2 rounded-lg text-sm font-black shadow-lg">
            NỔI BẬT
          </div>
        )}
        {event.isSoldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-4xl font-black text-red-500">HẾT VÉ</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-black line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {format(event.dateStart, 'dd/MM/yyyy • HH:mm')}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {event.location}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Từ</p>
            <p className="text-3xl font-black text-emerald-400">
              {event.ticketTypes.some((t: any)  => t.priceVndc === 0) ? 'MIỄN PHÍ' : `${event.ticketTypes[0].priceVndc.toLocaleString()} VNDC`}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg text-sm font-bold ${event.isSoldOut ? 'bg-red-600' : 'bg-emerald-500'}`}>
            {event.isSoldOut ? 'HẾT VÉ' : `${ticketsLeft} vé còn`}
          </div>
        </div>
      </div>
    </div>
  );
}