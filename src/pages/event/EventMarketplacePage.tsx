'use client';

import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Search, Ticket, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {useEvents } from '../../context/EventsContext';


const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl bg-gray-200 h-[320px]" />
)

export default function EventMarketplacePage() {
  const {
    events,
    loading,
    pagination,
    fetchPage
  } = useEvents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-6 pt-14 pb-20">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              Campus Events
            </h1>

            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 rounded-full shadow-2xl shadow-emerald-500/40">
              <Zap className="w-6 h-6" />
              <span className="text-2xl font-bold">0 GAS FEE</span>
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
              to="/events/create"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-orange-600 px-8 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              <Ticket className="w-6 h-6" />
              Tạo sự kiện
            </Link>

            <Link
              to="/my-tickets"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-orange-600 px-8 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              <Ticket className="w-6 h-6" />
              Vé của tôi
            </Link>
          </div>
        </div>

        {/* ================= EVENT GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: pagination.limit }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : events.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
        </div>

        {/* ================= PAGINATION ================= */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-14">
            <button
              disabled={pagination.page === 1}
              onClick={() => fetchPage(pagination.page - 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Trang trước
            </button>

            <span className="text-lg font-semibold">
              Trang {pagination.page} / {pagination.totalPages}
            </span>

            <button
              disabled={pagination.page === pagination.totalPages}
              onClick={() => fetchPage(pagination.page + 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Trang sau
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
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