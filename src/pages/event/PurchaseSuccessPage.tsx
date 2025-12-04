import { CheckCircle, Ticket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-12">
          <CheckCircle className="w-32 h-32 mx-auto text-emerald-500 animate-pulse" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-purple-400">
          Purchase Successful!
        </h1>
        <p className="text-2xl text-gray-300 mb-12">
          Your NFT tickets have been minted and sent to your wallet
        </p>

        <div className="glass-card rounded-3xl p-12 mb-12">
          <Ticket className="w-24 h-24 mx-auto mb-8 text-purple-400" />
          <h3 className="text-3xl font-bold mb-4">Spring Music Festival 2025</h3>
          <p className="text-xl text-gray-300">2 × VIP Section Tickets</p>
          <p className="text-4xl font-black text-emerald-400 mt-6">300,000 VNDC</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/my-tickets"
            className="bg-gradient-to-r from-purple-600 to-orange-600 px-10 py-6 rounded-2xl text-xl font-bold hover:scale-105 transition flex items-center justify-center gap-3"
          >
            View My Tickets
            <ArrowRight className="w-6 h-6" />
          </Link>
          <Link
            to="/events"
            className="border-2 border-purple-500 px-10 py-6 rounded-2xl text-xl font-bold hover:bg-purple-500/20 transition"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    </div>
  );
}