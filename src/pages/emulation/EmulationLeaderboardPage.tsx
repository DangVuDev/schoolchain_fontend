// src/emulation/EmulationLeaderboardPage.tsx
import { leaderboard, currentUser } from "./mockData";
import { Link } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho một mục trong Leaderboard
interface LeaderboardUser {
    rank: number;
    name: string;
    studentId: string;
    points: number;
    avatar: string;
    isYou?: boolean; // Thêm 'isYou?' (optional) để xử lý trường hợp không có thuộc tính này
}

export default function EmulationLeaderboardPage() {
  const topPerformers = leaderboard.slice(0, 3) as LeaderboardUser[];
  const remainingLeaderboard = leaderboard.slice(3) as LeaderboardUser[];

  // Lấy danh sách hiển thị (Top 10 và người dùng hiện tại nếu không ở Top 10)
  const displayedLeaderboard = remainingLeaderboard.filter((user: LeaderboardUser) => user.rank <= 10 || user.isYou);
  
  // Logic để đảm bảo người dùng hiện tại (currentUser) được hiển thị nếu họ không nằm trong Top 10
  if (currentUser.rank > 10) {
    const userInList = displayedLeaderboard.some((user: LeaderboardUser) => user.isYou);
    if (!userInList) {
        // Chèn người dùng hiện tại vào vị trí thứ 4 (sau Top 3)
        // Cần đảm bảo rằng currentUser được ép kiểu (as LeaderboardUser)
        displayedLeaderboard.splice(0, 0, {...currentUser, isYou: true} as LeaderboardUser);
    }
  }


  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div className="bg-gradient-to-b from-purple-900/50 via-purple-900/30 to-slate-900 pt-10 pb-16 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 flex items-center justify-center gap-3">
            <span className="text-yellow-400">🏆</span> Campus Leaderboard
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Top performers in the VNDC Campus ecosystem</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 px-4">
          <Link to="/campus/tasks" className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out whitespace-nowrap">
            Nhiệm vụ
          </Link>
          <Link to="/campus/rewards" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Đổi thưởng
          </Link>
          <Link to="/campus/guide" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Thể Lệ
          </Link>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-12 flex-wrap px-4">
          <select className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold transition duration-300 hover:border-purple-500">
            <option>📊 All Activities</option>
            <option>💰 Top Earners</option>
            <option>🛒 Most Transactions</option>
            <option>🎫 Event Attendance</option>
            <option>🎨 NFT Collectors</option>
          </select>
          <select className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold transition duration-300 hover:border-purple-500">
            <option>📅 This Month</option>
            <option>This Week</option>
            <option>All Time</option>
            <option>This Semester</option>
          </select>
        </div>

        {/* Top 3 Podium */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 sm:gap-8 items-end">
          {/* Helper array for correct order: 2nd, 1st, 3rd */}
          {[1, 0, 2].map((index, i) => {
            const user = topPerformers[index];
            if (!user) return null; 

            const isFirst = user.rank === 1;
            const podiumStyles = isFirst
              ? "col-span-3 sm:col-span-1 border-yellow-400 bg-yellow-600/10 shadow-2xl transform sm:translate-y-[-20px]"
              : user.rank === 2
                ? "col-span-3 sm:col-span-1 border-slate-400 bg-slate-600/10"
                : "col-span-3 sm:col-span-1 border-amber-700 bg-amber-800/10";
            
            const avatarSize = isFirst ? "w-28 h-28 sm:w-36 sm:h-36 text-7xl" : "w-24 h-24 sm:w-32 sm:h-32 text-5xl sm:text-6xl";
            const podiumBadge = isFirst ? "text-7xl sm:text-8xl mb-6" : "text-6xl sm:text-7xl mb-4";
            const pointSize = isFirst ? "text-5xl sm:text-6xl" : "text-3xl sm:text-4xl";
            const pointsColor = isFirst ? "text-yellow-400" : user.rank === 2 ? "text-slate-400" : "text-amber-700";
            const nameSize = isFirst ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
            const rankOrder = i === 1 ? "order-first sm:order-none" : "order-none";
            const borderSize = isFirst ? "border-4" : "border-3";
            const ringStyle = isFirst ? "ring-4 ring-yellow-400/50" : "";
            const avatarBg = isFirst ? "bg-gradient-to-br from-yellow-400 to-orange-600 border-4 border-yellow-300" : user.rank === 2 ? "bg-gradient-to-br from-slate-400 to-slate-600 border-4 border-slate-500" : "bg-gradient-to-br from-amber-700 to-amber-900 border-4 border-amber-800";


            return (
              <div
                key={user.rank}
                className={`text-center p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all duration-500 ${borderSize} ${podiumStyles} ${rankOrder}`}
              >
                <div className={`${podiumBadge}`}>
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                </div>
                <div 
                  className={`${avatarSize} ${avatarBg} mx-auto rounded-full flex items-center justify-center font-extrabold shadow-xl mb-4 sm:mb-6 ${ringStyle}`}
                  style={isFirst ? { animation: "float 3s ease-in-out infinite" } : {}}
                >
                  {user.avatar}
                </div>
                <h3 className={`${nameSize} font-bold text-white mb-1`}>{user.name}</h3>
                <p className="text-sm sm:text-base opacity-70 mb-4">{user.studentId}</p>
                <div className={`rounded-xl py-3 sm:py-4 px-4 ${isFirst ? 'bg-yellow-400/20 border border-yellow-400' : 'bg-white/10 border border-white/20'}`}>
                  <p className={`${pointSize} font-black ${pointsColor}`}>{user.points.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm opacity-80 mt-1">VNDC Points</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rest of leaderboard (4+) */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl">
          <div className="space-y-4">
            {displayedLeaderboard.map((user: LeaderboardUser) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 sm:gap-6 p-3 sm:p-5 rounded-xl transition-all duration-300 ease-in-out ${
                  user.isYou
                    ? "bg-gradient-to-r from-purple-700/50 to-pink-600/50 border-4 border-purple-500 shadow-lg scale-[1.01] hover:bg-purple-700/60"
                    : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-purple-800"
                }`}
              >
                <span className={`text-2xl sm:text-3xl font-black w-10 sm:w-16 text-center ${user.isYou ? "text-purple-400" : "text-gray-500"}`}>
                  {user.rank}
                </span>
                <div className="text-4xl sm:text-5xl">{user.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-bold truncate">
                    {user.name} {user.isYou && <span className="text-pink-400 text-sm sm:text-base font-semibold">(You)</span>}
                  </h4>
                  <p className="text-xs sm:text-sm opacity-60 truncate">ID: {user.studentId}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xl sm:text-3xl font-black ${user.isYou ? "text-pink-400" : "text-purple-400"}`}>
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-50 mt-0.5">VNDC Points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}