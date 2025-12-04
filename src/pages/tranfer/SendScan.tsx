// src/pages/SendScan.tsx
import { ArrowLeft, Flashlight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SendScan() {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-orange-900/40" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-4 rounded-full bg-white/20 backdrop-blur-3xl hover:bg-white/30 transition shadow-2xl"
        >
          <ArrowLeft size={36} />
        </button>

        <div className="flex items-center gap-4">
          <button className="px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/30 font-bold flex items-center gap-3 hover:bg-white/30 transition">
            <Flashlight size={28} />
            Đèn flash
          </button>
        </div>
      </div>

      {/* 0 GAS Badge */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 z-10">
        <div className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-black text-3xl shadow-2xl shadow-emerald-500/60 animate-pulse">
          0 GAS FEE
        </div>
      </div>

      {/* QR Scanner Frame */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-96 h-96">
          {/* 4 góc tím phát sáng */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border-8 border-purple-500 shadow-lg shadow-purple-500/80"
              style={{
                top: i < 2 ? '-8px' : 'auto',
                bottom: i >= 2 ? '-8px' : 'auto',
                left: i % 2 === 0 ? '-8px' : 'auto',
                right: i % 2 === 1 ? '-8px' : 'auto',
                borderRadius: i === 0 ? '32px 0 0 0' : i === 1 ? '0 32px 0 0' : i === 2 ? '0 0 0 32px' : '0 0 32px 0',
              }}
            />
          ))}

          {/* Dòng quét laser */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-lg shadow-purple-500/80">
            <div className="h-full w-full bg-purple-500 animate-[laser_2s_infinite]" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="text-5xl font-black mb-6">Quét mã QR</h2>
        <p className="text-2xl text-white/80">Hướng camera vào mã của người nhận</p>
      </div>

      {/* Manual Entry */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-8 z-10">
        <button
          onClick={() => navigate('/send/search')}
          className="w-full py-8 bg-white/10 backdrop-blur-3xl rounded-3xl border-2 border-white/30 font-black text-2xl hover:bg-white/20 transition shadow-2xl"
        >
          Nhập địa chỉ ví thủ công
        </button>
      </div>

      <style>{`
        @keyframes laser {
          0%, 100% { transform: translateY(-200px); opacity: 0; }
          50% { transform: translateY(200px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}