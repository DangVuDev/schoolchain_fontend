// src/emulation/EmulationTasksPage.tsx
import { tasks, currentUser } from "./mockData";
import { Link } from "react-router-dom";

// Icons giả định (từ mockData)
const ICON: { [key: string]: string } = {
  Check: '✅',
  Book: '📚',
  Party: '🎉',
  Coin: '💰',
  Man: '👨🏻‍🎓',
  Daily: '☀️',
  Weekly: '🗓️',
  Event: '🔥',
  Onetime: '🌟',
};

export default function EmulationTasksPage() {
  const currentPoints = currentUser.points.toLocaleString();
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const weeklyTasks = tasks.filter(t => t.type === 'weekly');
  const eventTasks = tasks.filter(t => t.type === 'event' || t.type === 'onetime');

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => {
    const isCompleted = task.progress >= task.total;
    const progressPercent = (task.progress / task.total) * 100;
    const buttonText = isCompleted ? "Đã Hoàn Thành" : task.total > 1 ? "Tiếp Tục" : "Thực Hiện";
    const buttonColor = isCompleted ? "bg-gray-600/50" : "bg-green-500 hover:bg-green-600";
    const statusText = task.total > 1 ? `${task.progress}/${task.total}` : (isCompleted ? "Hoàn thành" : "Chưa");

    const getTypeText = (type: string) => {
        switch (type) {
            case 'daily': return 'Hàng Ngày';
            case 'weekly': return 'Hàng Tuần';
            case 'event': return 'Sự Kiện';
            case 'onetime': return 'Một Lần';
            default: return '';
        }
    };

    return (
      <div className={`p-5 rounded-xl border-2 transition-all duration-300 ${isCompleted ? 'bg-gray-800/50 border-gray-700' : 'bg-white/5 border-purple-500/30 hover:bg-white/10'}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 bg-purple-600/30 rounded-full">{ICON[task.icon as keyof typeof ICON] || '❓'}</div>
            <div>
              <h4 className="text-lg font-bold">{task.title}</h4>
              <p className="text-xs opacity-60 flex items-center gap-2">
                <span className="text-purple-400 font-semibold">{ICON[task.type.charAt(0).toUpperCase() + task.type.slice(1) as keyof typeof ICON] || ''} {getTypeText(task.type)}</span>
                {task.expired && <span className="text-red-400 ml-2">Hết hạn: {task.expired}</span>}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-yellow-400">+ {task.points.toLocaleString()}</p>
            <p className="text-xs opacity-50">VNDC Points</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="opacity-70">Tiến độ:</span>
                <span className="font-semibold">{statusText}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className={`h-2.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-purple-500'}`} 
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
        </div>
        
        <button
          disabled={isCompleted}
          className={`mt-4 w-full py-2 rounded-lg font-bold text-sm transition-colors ${buttonColor}`}
        >
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <div className="bg-gradient-to-b from-pink-900/50 via-purple-900/30 to-slate-900 pt-10 pb-16 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl sm:text-6xl font-black mb-2 flex items-center justify-center gap-3">
            <span className="text-green-400">📝</span> Nhiệm Vụ Campus
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Hoàn thành để tích lũy VNDC Points và thăng hạng!</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 px-4">
          <Link to="/campus" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Bảng Xếp Hạng
          </Link>
          <Link to="/campus/rewards" className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out whitespace-nowrap">
            Đổi thưởng
          </Link>
          <Link to="/campus/guide" className="bg-white/10 backdrop-blur border border-white/30 px-5 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-bold hover:bg-white/20 transition duration-300 ease-in-out whitespace-nowrap">
            Thể Lệ
          </Link>
        </div>

        {/* User Stats Card */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="bg-green-600/20 border-2 border-green-500 rounded-xl p-5 sm:p-6 flex justify-between items-center shadow-lg">
            <div>
              <p className="text-lg opacity-80">Điểm hiện có:</p>
              <h2 className="text-3xl sm:text-4xl font-black text-yellow-400">{currentPoints} VNDC Points</h2>
            </div>
            <Link to="/campus/rewards" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition">
                Đổi Quà Ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Nhiệm vụ Hàng Ngày */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl sm:text-3xl font-black text-purple-400 mb-6 flex items-center gap-3">
            {ICON.Daily} Nhiệm Vụ Hàng Ngày
        </h2>
        <div className="space-y-4">
          {dailyTasks.map((task, index) => <TaskCard key={index} task={task} />)}
        </div>
      </div>
      
      {/* Nhiệm vụ Hàng Tuần */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-2xl sm:text-3xl font-black text-purple-400 mb-6 flex items-center gap-3">
            {ICON.Weekly} Nhiệm Vụ Hàng Tuần
        </h2>
        <div className="space-y-4">
          {weeklyTasks.map((task, index) => <TaskCard key={index} task={task} />)}
        </div>
      </div>

      {/* Nhiệm vụ Sự Kiện/Một Lần */}
      <div className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-2xl sm:text-3xl font-black text-purple-400 mb-6 flex items-center gap-3">
            {ICON.Event} Sự Kiện & Nhiệm Vụ Một Lần
        </h2>
        <div className="space-y-4">
          {eventTasks.map((task, index) => <TaskCard key={index} task={task} />)}
        </div>
      </div>
    </div>
  );
}