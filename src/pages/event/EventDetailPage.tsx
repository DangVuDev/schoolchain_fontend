import { format } from 'date-fns';
import { ArrowLeft, Calendar, Check, MapPin, Share2, Ticket, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function EventDetailPage() {
  const navigate = useNavigate();
  const { state: mockEvent } = useLocation() as { state: any }
  const [selectedTier, setSelectedTier] = useState(mockEvent.ticketTypes[0]);
  

  const ticketsLeft = mockEvent.totalMaxTickets - mockEvent.totalTicketsSold;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Banner */}
      <div className="relative h-96 md:h-[520px] overflow-hidden">
        <img src={mockEvent.banner} alt={mockEvent.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-8 left-8 bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/30 transition">
          <ArrowLeft size={28} />
        </button>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10 pb-20">
        <div className="flex flex-wrap gap-4 mb-8">
          {mockEvent.isFeatured && <span className="bg-gradient-to-r from-orange-600 to-pink-600 px-6 py-3 rounded-xl font-bold">NỔI BẬT</span>}
          <span className="bg-emerald-600 px-6 py-3 rounded-xl font-bold">{ticketsLeft} vé còn</span>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 rounded-full flex items-center gap-3 font-bold">
            <Zap className="w-6 h-6" />
            0 GAS FEE
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6">{mockEvent.title}</h1>
        <p className="text-xl text-gray-300 mb-10 max-w-4xl">{mockEvent.shortDescription}</p>

        {/* Responsive Layout: Mobile = dọc, Desktop = 2 cột */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">
          {/* Left: Info + Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8">
              <h3 className="text-3xl font-black mb-8">Thông tin sự kiện</h3>
              <div className="grid sm:grid-cols-2 gap-8 text-lg">
                <div className="flex gap-4"><Calendar className="w-8 h-8 text-purple-400" /><div><p className="text-gray-400">Thời gian</p><p className="font-bold">{format(mockEvent.dateStart, 'dd/MM/yyyy • HH:mm')} - {format(mockEvent.dateEnd, 'HH:mm')}</p></div></div>
                <div className="flex gap-4"><MapPin className="w-8 h-8 text-purple-400" /><div><p className="text-gray-400">Địa điểm</p><p className="font-bold">{mockEvent.location}</p></div></div>
                <div className="flex gap-4"><Users className="w-8 h-8 text-purple-400" /><div><p className="text-gray-400">Ban tổ chức</p><p className="font-bold">{mockEvent.organizerName}</p></div></div>
                <div className="flex gap-4"><Ticket className="w-8 h-8 text-purple-400" /><div><p className="text-gray-400">Check-in</p><p className="font-bold">{mockEvent.allowOnlineCheckin ? 'Online + Tại chỗ' : 'Chỉ tại chỗ'}</p></div></div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8">
              <h3 className="text-3xl font-black mb-6">Giới thiệu</h3>
              <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: mockEvent.fullDescription }} />
            </div>
          </div>

          {/* Right: Ticket Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 sticky top-8">
              <h3 className="text-2xl font-black mb-6">Chọn loại vé</h3>
              <div className="space-y-5">
                {mockEvent.ticketTypes.filter((t: any) => t.isActive).map((tier: any) => {
                  const soldOut = tier.soldQuantity >= tier.maxQuantity;
                  return (
                    <div
                      key={tier.name}
                      onClick={() => !soldOut && setSelectedTier(tier)}
                      className={`rounded-2xl p-6 cursor-pointer transition-all border-2 ${selectedTier?.name === tier.name ? 'border-purple-500 bg-purple-900/30' : 'border-white/10'} ${soldOut ? 'opacity-60' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-xl font-bold">{tier.name}</h4>
                        {soldOut && <span className="bg-red-600 px-3 py-1 rounded text-sm">Hết vé</span>}
                      </div>
                      {tier.seatingSection && <p className="text-purple-400 text-sm mb-2">{tier.seatingSection}</p>}
                      <p className="text-3xl font-black text-emerald-400 mb-4">
                        {tier.priceVndc === 0 ? 'MIỄN PHÍ' : `${tier.priceVndc.toLocaleString()} VNDC`}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-400">
                        {tier.benefits.map((b: any, i:any) => (
                          <li key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {b}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                <button
                  onClick={() => navigate('/events/buy', { state: { event: mockEvent, tier: selectedTier } })}
                  disabled={!selectedTier || selectedTier.soldQuantity >= selectedTier.maxQuantity}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-600 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mua vé ngay
                </button>

                <button className="w-full border-2 border-white/20 py-5 rounded-xl font-bold flex items-center justify-center gap-d3 hover:border-purple-500 transition">
                  <Share2 className="w-6 h-6" />
                  Chia sẻ sự kiện
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}