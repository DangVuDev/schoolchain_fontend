'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Ticket {
  id: string;
  tokenId: number;
  eventTitle: string;
  eventDate: Date;
  seat: string;
  type: 'VIP' | 'General' | 'Standard';
  gradient: string;
  emoji: string;
  isPast: boolean;
}

const mockTickets: Ticket[] = [
  { id: '1', tokenId: 8042, eventTitle: 'Spring Music Festival 2025', eventDate: new Date('2025-02-20'), seat: 'VIP Section • Seat A1', type: 'VIP', gradient: 'from-purple-600 to-orange-600', emoji: 'Music', isPast: false },
  { id: '2', tokenId: 8043, eventTitle: 'Spring Music Festival 2025', eventDate: new Date('2025-02-20'), seat: 'VIP Section • Seat A2', type: 'VIP', gradient: 'from-purple-600 to-orange-600', emoji: 'Music', isPast: false },
  { id: '3', tokenId: 7921, eventTitle: 'Tech Career Fair 2025', eventDate: new Date('2025-01-28'), seat: 'General Admission', type: 'General', gradient: 'from-emerald-600 to-teal-700', emoji: 'Briefcase', isPast: false },
  { id: '4', tokenId: 7154, eventTitle: 'Art Exhibition Opening', eventDate: new Date('2024-12-10'), seat: 'Standard • Seat B12', type: 'Standard', gradient: 'from-slate-600 to-slate-700', emoji: 'Paintbrush', isPast: true },
  { id: '5', tokenId: 6847, eventTitle: 'Basketball Championship', eventDate: new Date('2024-11-25'), seat: 'VIP • Seat C5', type: 'VIP', gradient: 'from-slate-600 to-slate-700', emoji: 'Basketball', isPast: true },
  { id: '6', tokenId: 6234, eventTitle: 'Book Fair & Author Meet', eventDate: new Date('2024-10-15'), seat: 'General Admission', type: 'General', gradient: 'from-slate-600 to-slate-700', emoji: 'Books', isPast: true },
];

type FilterType = 'upcoming' | 'past' | 'all';

export default function MyTicketsPage() {
  const [filter, setFilter] = useState<FilterType>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockTickets
    .filter(t => t.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(t => filter === 'all' || (filter === 'upcoming' && !t.isPast) || (filter === 'past' && t.isPast));

  const counts = {
    upcoming: mockTickets.filter(t => !t.isPast).length,
    past: mockTickets.filter(t => t.isPast).length,
    all: mockTickets.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-6 pt-16 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-3">My NFT Tickets</h1>
            <p className="text-xl text-gray-400">Your event ticket collection • {counts.all} Total</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl focus:outline-none focus:border-purple-500 transition text-lg"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          {(['upcoming', 'past', 'all'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-2xl shadow-purple-600/50'
                  : 'bg-white/10 backdrop-blur-md border-2 border-slate-700 text-gray-400 hover:border-purple-500 hover:text-white'
              }`}
            >
              {f === 'upcoming' && 'Upcoming'}
              {f === 'past' && 'Past Events'}
              {f === 'all' && 'All Tickets'}
              {' '}(<span className={filter === f ? 'text-white' : ''}>{counts[f]}</span>)
            </button>
          ))}
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Component con có navigate
function TicketCard({ ticket }: { ticket: Ticket }) {
  const navigate = useNavigate();
  const daysLeft = differenceInDays(ticket.eventDate, new Date());

  const goToDetail = () => {
    navigate(`/ticket/${ticket.tokenId}`);
    // Hoặc: navigate(`/my-tickets/${ticket.id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-600/30 hover:-translate-y-2"
    >
      <div className="relative">
        <div className={`h-80 bg-gradient-to-br ${ticket.gradient} flex items-center justify-center text-9xl`}>
          {ticket.emoji}
          <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md px-5 py-3 rounded-lg font-black text-sm">
            NFT #{ticket.tokenId}
          </div>
        </div>

        {!ticket.isPast && (
          <div className="absolute bottom-4 left-4 bg-emerald-500 px-5 py-3 rounded-lg font-bold shadow-lg shadow-emerald-500/50">
            {daysLeft > 0 ? `${daysLeft} days left` : 'Today!'}
          </div>
        )}
        {ticket.isPast && (
          <div className="absolute bottom-4 left-4 bg-slate-600 px-5 py-3 rounded-lg font-bold">
            Attended
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 line-clamp-2">{ticket.eventTitle}</h3>
        <p className="text-gray-400 text-sm mb-2">
          Calendar {format(ticket.eventDate, 'MMM dd, yyyy • h:mm a')}
        </p>
        <p className="text-gray-400 text-sm mb-6">{ticket.seat}</p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Ngăn click toàn card
              goToDetail();
            }}
            className="bg-gradient-to-r from-purple-600 to-orange-600 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            View QR
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
            className="border-2 border-slate-700 py-4 rounded-xl font-bold hover:bg-white/10 transition"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}