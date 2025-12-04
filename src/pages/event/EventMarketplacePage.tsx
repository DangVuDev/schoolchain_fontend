'use client';

import { Search, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom'; // hoặc useNavigate nếu dùng React Router
import { type Event } from './types/EventTypes';
import { EVENT_MOCK_DATA } from './mock/EventMockData';

export default function EventMarketplacePage() {
  const categories = [
    { label: 'All Events', active: true, gradient: true },
    { label: 'Concerts', icon: 'Music' },
    { label: 'Sports', icon: 'Soccer ball' },
    { label: 'Workshops', icon: 'Graduation cap' },
    { label: 'Career', icon: 'Briefcase' },
    { label: 'Art & Culture', icon: 'Palette' },
    { label: 'Food Fest', icon: 'Utensils' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              Campus Events
            </h1>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 rounded-full shadow-2xl shadow-emerald-500/40">
              <span className="text-2xl">0 GAS FEE</span>
            </div>
          </div>

          {/* Right Side: Search + My Tickets Button */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-16 pr-8 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg placeholder-gray-400"
              />
            </div>

            {/* Quick Action: My Tickets Button */}
            <Link
              to="/my-tickets"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-orange-600 px-8 py-5 rounded-2xl font-bold text-lg whitespace-nowrap hover:scale-105 transition-all shadow-xl shadow-purple-600/40 hover:shadow-2xl"
            >
              <Ticket className="w-6 h-6" />
              My Tickets
            </Link>
          </div>
        </div>

        {/* Categories – TỰ ĐỘNG XUỐNG DÒNG khi màn nhỏ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.label}
              className={`px-6 py-4 rounded-xl font-bold text-base transition-all text-center ${
                cat.active
                  ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white shadow-xl shadow-purple-600/50'
                  : 'bg-slate-800/60 backdrop-blur-md border-2 border-slate-700 text-gray-300 hover:border-purple-500 hover:text-white'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {cat.icon && <span className="text-2xl">{cat.icon}</span>}
                <span>{cat.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {EVENT_MOCK_DATA.map((event, index) => (
            <EventCard key={event.id} event={event} isFeatured={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

// EventCard giữ nguyên như cũ – đẹp 100%
function EventCard({ event, isFeatured }: { event: Event; isFeatured: boolean }) {
  const navigate = useNavigate();

  const isSoldOut = event.currentParticipants >= event.maxParticipants;
  const ticketsLeft = event.maxParticipants - event.currentParticipants;

  const handleClick = () => {
    navigate(`/events/${event.id}`); // hoặc `/event/${event.id}`
  };

  return (
    <div
      onClick={handleClick}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-600/30 transform hover:-translate-y-2"
    >
      {/* Poster */}
      <div className="relative h-72 bg-gradient-to-br from-purple-600 to-orange-600 overflow-hidden">
        <img
          src={event.imageUrl || '/placeholder-event.jpg'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-black shadow-lg">
            FEATURED
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="text-2xl font-black mb-3 line-clamp-2 text-white">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
          Calendar {format(new Date(event.startDate), 'MMM dd, yyyy')}
          {' • '}
          Stadium {event.location}
        </p>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
            <p className="text-3xl font-black text-emerald-400 mt-1">
              {event.ticketPrice === 0 ? (
                'FREE'
              ) : (
                <>
                  {event.ticketPrice.toLocaleString('vi-VN')}
                  <span className="text-lg text-gray-400 ml-1"> VNDC</span>
                </>
              )}
            </p>
          </div>

          <div
            className={`px-5 py-3 rounded-lg font-bold text-sm tracking-wider ${
              isSoldOut ? 'bg-red-600' : 'bg-emerald-500'
            } text-white`}
          >
            {isSoldOut ? 'SOLD OUT' : `${ticketsLeft} left`}
          </div>
        </div>
      </div>
    </div>
  );
}