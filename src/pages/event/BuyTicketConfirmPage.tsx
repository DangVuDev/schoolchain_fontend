import { ArrowLeft, Calendar, MapPin, Ticket as TicketIcon, Users, Zap } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BuyTicketConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { event, tier } = location.state || {};

  const quantity = 2;
  const total = tier?.price * quantity;



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition mb-10"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Event
        </button>

        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black mb-4">Confirm Your Purchase</h2>
          <p className="text-xl text-gray-400">Review your order before completing</p>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 rounded-full mt-6 text-xl font-bold">
            <Zap className="w-7 h-7" />
            0 GAS FEE • FREE MINTING
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-12 md:p-16">
            {/* Event Preview */}
            <div className="flex flex-col md:flex-row gap-10 pb-12 border-b border-white/10 mb-12">
              <div className="w-56 h-56 bg-gradient-to-br from-purple-600 to-orange-600 rounded-3xl flex items-center justify-center text-9xl shadow-2xl shadow-purple-600/50 flex-shrink-0">
                Music
              </div>
              <div>
                <h3 className="text-4xl font-black mb-6">{event?.title}</h3>
                <div className="space-y-4 text-lg text-gray-300">
                  <p className="flex items-center gap-4"><Calendar className="w-6 h-6" /> February 20, 2025 • 7:00 PM - 11:00 PM</p>
                  <p className="flex items-center gap-4"><MapPin className="w-6 h-6" /> HCMUT Main Stadium</p>
                  <p className="flex items-center gap-4"><Users className="w-6 h-6" /> Featuring: Sơn Tùng M-TP, HIEUTHUHAI & More</p>
                </div>
                <div className="mt-6 inline-block bg-purple-900/30 border-2 border-purple-500 rounded-xl px-6 py-3">
                  <span className="text-purple-400 font-bold">VIP Section • Seats: A1, A2</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="glass-card rounded-3xl p-10 mb-10">
              <h4 className="text-2xl font-bold mb-8 flex items-center gap-4">
                Purchase Summary
              </h4>
              <div className="space-y-6 text-lg">
                <div className="flex justify-between"><span className="text-gray-400">VIP Seat A1</span> <span>150,000 VNDC</span></div>
                <div className="flex justify-between"><span className="text-gray-400">VIP Seat A2</span> <span>150,000 VNDC</span></div>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between text-xl"><span>Subtotal (2 tickets)</span> <span className="font-bold">300,000 VNDC</span></div>
                  <div className="flex justify-between text-xl"><span>Service Fee</span> <span className="text-emerald-400 font-black">0 VNDC (Waived)</span></div>
                  <div className="flex justify-between text-xl"><span>Network Gas Fee</span> <span className="text-emerald-400 font-black">0 VNDC (Free)</span></div>
                </div>
                <div className="border-t-2 border-white/20 pt-8 flex justify-between items-center">
                  <span className="text-3xl font-bold">Total Payment</span>
                  <div className="text-right">
                    <div className="text-4xl font-black text-purple-400">{total.toLocaleString()} VNDC</div>
                    <div className="text-gray-500">≈ $12.00 USD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* NFT Info */}
            <div className="bg-blue-900/20 border-2 border-blue-500 rounded-2xl p-8 mb-10">
              <div className="flex gap-6">
                <TicketIcon className="w-12 h-12 text-blue-400" />
                <div>
                  <h5 className="text-xl font-bold text-blue-400 mb-3">NFT Tickets Will Be Minted to Your Wallet</h5>
                  <p className="text-gray-300 leading-relaxed">
                    Your tickets will be minted as NFTs on Polygon zkEVM and sent to your wallet immediately after purchase confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Terms */}
            <div className="space-y-8 mb-12">
              <div>
                <label className="text-xl font-bold text-gray-200 mb-4 block">Security Verification Required</label>
                <input type="password" placeholder="Enter the first word of your recovery passphrase..." className="w-full px-6 py-5 bg-white/10 rounded-xl border border-white/20 focus:border-purple-500 outline-none text-lg" />
              </div>
              <label className="flex items-start gap-4 cursor-pointer">
                <input type="checkbox" className="w-6 h-6 mt-1" />
                <span className="text-gray-300 leading-relaxed">
                  I have read and agree to the <a href="#" className="text-purple-400 font-bold">Terms and Conditions</a> and <a href="#" className="text-purple-400 font-bold">Refund Policy</a>.
                </span>
              </label>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-orange-600 py-8 rounded-2xl text-2xl font-black hover:scale-105 transition transform">
              Confirm & Purchase Tickets →
            </button>

            <div className="text-center mt-6">
              <a href="#" className="text-red-500 font-bold text-lg">Cancel Purchase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}