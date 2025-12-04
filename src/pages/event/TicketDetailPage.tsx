import { ArrowLeft, QrCode, Wallet, Share2, Calendar, MapPin, Users, Globe, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TicketDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="container mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition mb-10"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to My Tickets
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: NFT Ticket + Info */}
          <div className="space-y-8">
            {/* Big NFT Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <div className="h-96 md:h-[520px] bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center text-[180px] relative">
                Music
                <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md px-6 py-4 rounded-xl font-black text-lg">
                  NFT #8042
                </div>
                <div className="absolute bottom-6 left-6 bg-emerald-500 px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/50">
                  Event in 36 days
                </div>
              </div>
              <div className="bg-slate-800/90 p-10">
                <h2 className="text-5xl font-black mb-3">Spring Music Festival 2025</h2>
                <p className="text-xl text-gray-300">VIP Section • Seat A1</p>
              </div>
            </div>

            {/* Event Info */}
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                Event Information
              </h3>
              <div className="space-y-8">
                {[
                  { icon: 'Calendar', label: 'Date & Time', value: 'February 20, 2025 • 7:00 PM - 11:00 PM' },
                  { icon: 'Stadium', label: 'Venue', value: 'HCMUT Main Stadium', sub: '268 Lý Thường Kiệt, District 10, HCMC' },
                  { icon: 'Ticket', label: 'Ticket Type', value: 'VIP Section • Row A, Seat 1' },
                  { icon: 'Microphone', label: 'Featured Artists', value: 'Sơn Tùng M-TP, HIEUTHUHAI, Orange' },
                  { icon: 'User', label: 'Ticket Owner', value: 'Nguyễn Thị Mai Anh', sub: 'Student ID: 22DH110001', color: 'text-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <p className="text-xl font-semibold">{item.value}</p>
                      {item.sub && <p className={`text-sm ${item.color || 'text-gray-500'}`}>{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockchain Info */}
            <div className="glass-card rounded-3xl p-10">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                Blockchain Details
              </h3>
              <div className="space-y-5 text-lg">
                {[
                  ['Token ID', '#8042', 'text-purple-400'],
                  ['Contract Address', '0x9a8f...3c2b', 'text-purple-400 font-mono text-sm'],
                  ['Blockchain Network', 'Polygon zkEVM'],
                  ['Minted On', 'Jan 15, 2025 • 2:45 PM'],
                  ['Token Standard', 'ERC-721 (NFT)'],
                  ['Transferable', 'Yes', 'text-emerald-400'],
                ].map(([label, value, className]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className={`font-semibold ${className || ''}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: QR + Actions */}
          <div className="space-y-8">
            {/* QR Code */}
            <div className="glass-card rounded-3xl p-10 text-center">
              <h3 className="text-3xl font-bold mb-8">Entry QR Code</h3>
              <div className="bg-white p-10 rounded-2xl mb-8 inline-block">
                <div className="w-72 h-72 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-4xl font-black text-purple-600">
                  QR<br />CODE
                </div>
              </div>
              <p className="text-gray-400 mb-8">Show this QR code at the venue entrance for admission</p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-orange-600 py-5 rounded-xl font-bold text-xl hover:scale-105 transition mb-4">
                Save QR Code
              </button>
              <button className="w-full border-2 border-slate-700 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition flex items-center justify-center gap-3">
                <Wallet className="w-7 h-7" />
                Add to Apple Wallet
              </button>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                {[
                  ['Calendar', 'Add to Calendar'],
                  ['Share2', 'Share Ticket'],
                  ['Globe', 'View on Explorer'],
                  ['ArrowUpRight', 'Transfer Ticket'],
                  ['MapPin', 'Get Directions'],
                ].map(([icon, text]) => (
                  <button key={text} className="w-full border-2 border-slate-700 py-5 rounded-xl font-bold flex items-center justify-start gap-5 hover:border-purple-500 hover:bg-white/5 transition">
                    <span className="text-3xl">{icon}</span>
                    <span>{text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-emerald-900/20 border-2 border-emerald-500 rounded-2xl p-6 flex gap-5">
              <CheckCircle className="w-10 h-10 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-400 font-bold text-lg">Verified Authentic</p>
                <p className="text-gray-400 text-sm">This NFT ticket is verified on the blockchain and cannot be duplicated or forged.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}