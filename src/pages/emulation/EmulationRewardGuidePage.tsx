// src/emulation/EmulationRewardGuidePage.tsx
import { rewardTiers, guideSections, currentUser } from "./mockData";
import { Link } from "react-router-dom";

// Icons giả định (từ mockData)
const ICON: { [key: string]: string } = {
  Trophy: '🏆',
  Document: '📄',
  Gift: '🎁',
};

export default function EmulationRewardGuidePage() {
    const currentPoints = currentUser.points.toLocaleString();

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div className="bg-gradient-to-b from-purple-900/50 via-pink-900/30 to-slate-900 pt-10 pb-16 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 flex items-center justify-center gap-3">
            <span className="text-yellow-400">{ICON.Document}</span> Thể Lệ & Giải Thưởng
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Thông tin chi tiết về hệ thống tích điểm và phần thưởng VNDC Campus.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 px-4">
          <Link to="/campus/leaderboard" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Bảng Xếp Hạng
          </Link>
          <Link to="/campus/tasks" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Nhiệm vụ
          </Link>
          <Link to="/campus/rewards" className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out whitespace-nowrap">
            Cửa Hàng
          </Link>
        </div>

        {/* User Stats Card */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="bg-pink-600/20 border-2 border-pink-500 rounded-xl p-5 sm:p-6 flex justify-between items-center shadow-lg">
            <div>
              <p className="text-lg opacity-80">Điểm của bạn:</p>
              <h2 className="text-3xl sm:text-4xl font-black text-yellow-400">{currentPoints} VNDC Points</h2>
            </div>
            <Link to="/campus/leaderboard" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition">
                Xem Rank Của Tôi
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        
        {/* --- Cột 1 & 2: Thể Lệ (Guide) --- */}
        <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-black text-purple-400 mb-8 flex items-center gap-3">
                Thông Tin Chi Tiết
            </h2>
            <div className="space-y-6">
                {guideSections.map((section, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="text-2xl">{section.icon}</span> {section.title}
                        </h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                            {section.content.map((item, i) => (
                                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* --- Cột 3: Phần Thưởng Rank (Tiers) --- */}
        <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-black text-pink-400 mb-8 flex items-center gap-3">
                {ICON.Trophy} Giải Thưởng Rank
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg space-y-4">
                {rewardTiers.map((tier) => {
                    const isTop3 = tier.rank === "1" || tier.rank === "2" || tier.rank === "3";
                    const rankColor = tier.rank === "1" ? "text-yellow-400" : tier.rank === "2" ? "text-slate-400" : tier.rank === "3" ? "text-amber-700" : "text-pink-400";
                    
                    return (
                        <div key={tier.rank} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                            <p className="text-lg font-bold mb-1 flex items-center gap-2">
                                <span className={`text-xl font-black ${rankColor}`}>
                                    {isTop3 ? (tier.rank === "1" ? '🥇' : tier.rank === "2" ? '🥈' : '🥉') : '🏅'}
                                </span> 
                                Hạng {tier.rank}
                            </p>
                            <p className="text-white/80 pl-8">{tier.reward}</p>
                        </div>
                    );
                })}
            </div>
            
            <Link to="/campus" className="mt-8 block text-center bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl font-bold transition shadow-xl">
                Xem Bảng Xếp Hạng Chi Tiết
            </Link>
        </div>
      </div>
    </div>
  );
}