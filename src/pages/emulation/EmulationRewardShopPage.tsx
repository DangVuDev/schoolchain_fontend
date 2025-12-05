// src/emulation/EmulationRewardShopPage.tsx
import { shopItems, currentUser } from "./mockData";
import { Link } from "react-router-dom";

// Icons giả định (từ mockData)
const ICON: { [key: string]: string } = {
  ShoppingBag: '🛍️',
  TShirt: '👕',
  Coin: '💰',
  Book: '📚',
  Party: '🎉',
};

export default function EmulationRewardShopPage() {
  const currentPoints = currentUser.points;
  const currentPointsFormatted = currentPoints.toLocaleString();
  
  // Lọc category duy nhất
  const categories = Array.from(new Set(shopItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div className="bg-gradient-to-b from-purple-900/50 via-purple-900/30 to-slate-900 pt-10 pb-16 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 flex items-center justify-center gap-3">
            <span className="text-pink-400">🛒</span> Cửa Hàng Đổi Điểm
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Đổi VNDC Points lấy quà tặng độc quyền!</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 px-4">
          <Link to="/campus" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Bảng Xếp Hạng
          </Link>
          <Link to="/campus/tasks" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Nhiệm vụ
          </Link>
          <Link to="/campus/guide" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Thể Lệ
          </Link>
        </div>

        {/* User Stats Card */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="bg-purple-600/20 border-2 border-purple-500 rounded-xl p-5 sm:p-6 flex justify-between items-center shadow-lg">
            <div>
              <p className="text-lg opacity-80">Điểm của bạn:</p>
              <h2 className="text-3xl sm:text-4xl font-black text-yellow-400">{currentPointsFormatted} VNDC Points</h2>
            </div>
            <Link to="/campus/rewards" className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition">
                Xem Phần Thưởng Rank
            </Link>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-12 max-w-6xl mx-auto px-4">
            <button className="px-5 py-2 rounded-full text-sm font-semibold bg-pink-600 hover:bg-pink-700 transition">Tất Cả</button>
            {categories.map(cat => (
                <button key={cat} className="px-5 py-2 rounded-full text-sm font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition">
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Danh sách Sản phẩm */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {shopItems.map((item) => {
            const canAfford = currentPoints >= item.cost;
            
            return (
              <div
                key={item.name}
                className={`flex flex-col items-center text-center p-5 rounded-xl border-2 transition-all duration-300 ${
                  canAfford
                    ? "bg-purple-800/30 border-purple-500 hover:shadow-lg hover:scale-[1.03]"
                    : "bg-gray-800/30 border-gray-700 opacity-60"
                }`}
              >
                <div className="text-5xl mb-3 p-3 bg-white/10 rounded-full">{ICON[item.icon as keyof typeof ICON] || '❓'}</div>
                <h3 className="text-lg font-semibold h-12 flex items-center justify-center">{item.name}</h3>
                <div className="mt-3">
                  <p className="text-xl font-black text-yellow-400">
                    {item.cost.toLocaleString()} <span className="text-sm opacity-80">VNDC Points</span>
                  </p>
                </div>
                <button
                  disabled={!canAfford}
                  className={`mt-4 w-full py-2 rounded-lg font-bold text-sm transition-colors ${
                    canAfford
                      ? "bg-pink-600 hover:bg-pink-700 shadow-md"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  {canAfford ? 'Đổi Ngay' : 'Thiếu Điểm'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}