import { ArrowLeft, Calendar, Check, MapPin, Share2, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENT_MOCK_DATA } from './mock/EventMockData';

const event = EVENT_MOCK_DATA[0]; // Ví dụ lấy event đầu tiên

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  selected?: boolean;
}

export default function EventDetailPage() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);

  const ticketTiers: TicketTier[] = [
    {
      id: 'general',
      name: 'General Admission',
      price: 50000,
      description: 'Standing area',
      perks: ['Entry to main stadium', 'Access to all performances', 'Festival merchandise giveaway'],
      selected: true,
    },
    {
      id: 'vip',
      name: 'VIP Section',
      price: 150000,
      description: 'Reserved seating + perks',
      perks: [
        'VIP reserved seat',
        'Fast-track entry',
        'Exclusive VIP lounge access',
        'Meet & greet with artists',
        'Limited edition NFT badge',
        'Free drinks & food',
      ],
    },
  ];

  const handleBuyTicket = () => {
    if (selectedTier) {
      navigate('/events/buy', { state: { event, tier: selectedTier } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Hero Banner */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center">
          <span className="text-9xl md:text-[200px]">Music</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-slate-800/90 backdrop-blur-md w-14 h-14 rounded-full flex items-center justify-center hover:bg-slate-700 transition"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-10">
        {/* Badges */}
        <div className="flex flex-wrap gap-4 mb-8">
          <span className="bg-orange-600 px-6 py-3 rounded-xl font-bold">FEATURED</span>
          <span className="bg-emerald-600 px-6 py-3 rounded-xl font-bold">342 SEATS LEFT</span>
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 rounded-full flex items-center gap-3 font-bold">
            <Zap className="w-6 h-6" />
            0 GAS FEE
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-10">{event.title}</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-8">Event Details</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <Calendar className="w-8 h-8" />
                  <div>
                    <p className="text-gray-400">Date & Time</p>
                    <p className="text-xl font-semibold">February 20, 2025 • 7:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <MapPin className="w-8 h-8" />
                  <div>
                    <p className="text-gray-400">Venue</p>
                    <p className="text-xl font-semibold">HCMUT Main Stadium</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Users className="w-8 h-8" />
                  <div>
                    <p className="text-gray-400">Organized by</p>
                    <p className="text-xl font-semibold">Student Union HCMUT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-6">About This Event</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Join us for the biggest music event of the year! Spring Music Festival 2025 features live performances from top Vietnamese artists, student bands, and DJ sets...
              </p>
            </div>

            {/* What's Included */}
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-6">What's Included</h3>
              <div className="space-y-4">
                {selectedTier?.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Check className="w-6 h-6 text-emerald-500" />
                    <span className="text-gray-300">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Buy Ticket */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-10 sticky top-8">
              <h3 className="text-2xl font-bold mb-8">Select Ticket</h3>
              <div className="space-y-6">
                {ticketTiers.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`rounded-2xl p-6 cursor-pointer transition-all ${
                      tier.selected || selectedTier?.id === tier.id
                        ? 'bg-purple-900/30 border-2 border-purple-500'
                        : 'bg-slate-800/60 border-2 border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xl font-bold">{tier.name}</h4>
                      <input type="radio" checked={selectedTier?.id === tier.id} readOnly />
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                    <p className="text-3xl font-black text-purple-400">
                      {tier.price.toLocaleString()} <span className="text-lg text-gray-400">VNDC</span>
                    </p>
                  </div>
                ))}

                <button
                  onClick={handleBuyTicket}
                  disabled={!selectedTier}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-600 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Ticket →
                </button>

                <button className="w-full glass-card border-2 border-slate-700 py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:border-purple-500 transition">
                  <Share2 className="w-6 h-6" />
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}