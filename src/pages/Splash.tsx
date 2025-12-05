// src/pages/Splash.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const navigate = useNavigate()
  // Giả định useAuth cung cấp trạng thái đăng nhập
  const { isLoggedIn } = useAuth() 

  // --- Logic Chuyển hướng ---
  useEffect(() => {
    // Chuyển hướng sau 3 giây (3000ms)
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/home' : '/register')
    }, 3000)
    return () => clearTimeout(timer)
  }, [isLoggedIn, navigate])

  // --- Màu sắc Gradient ---
  const GRADIENT_PURPLE = '#8B5CF6'; // Violet-500
  const GRADIENT_ORANGE = '#F97316'; // Orange-600

  // --- SVG Token Icon ---
  // Sử dụng SVG gốc để có hiệu ứng 3 vòng tròn và biểu tượng '₫'
  const TokenIcon = () => (
    <div className="relative" style={{ marginBottom: '50px' }}>
      {/* Hiệu ứng Glow/Neon xung quanh */}
      <div 
        className="absolute inset-[-10px] rounded-full"
        style={{ 
          filter: `drop-shadow(0 0 40px ${GRADIENT_PURPLE}99)`, // Neon Drop Shadow
          animation: 'pulse-slow 3s infinite alternate', // Giả định keyframe pulse-slow
        }}
      />

      <svg 
        width="220" 
        height="220" 
        viewBox="0 0 220 220" 
        style={{ margin: '0 auto', animation: 'spin-custom 3s linear infinite' }} // Giả định keyframe spin-custom
      >
        {/* Định nghĩa Gradient cho stroke và text fill */}
        <defs>
          <linearGradient id="splash-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: GRADIENT_PURPLE }} />
            <stop offset="100%" style={{ stopColor: GRADIENT_ORANGE }} />
          </linearGradient>
        </defs>

        {/* Các vòng tròn Token */}
        <circle cx="110" cy="110" r="105" fill="none" stroke="url(#splash-grad)" strokeWidth="8" />
        <circle cx="110" cy="110" r="88" fill="none" stroke="url(#splash-grad)" strokeWidth="7" />
        <circle cx="110" cy="110" r="70" fill="none" stroke="url(#splash-grad)" strokeWidth="6" />

        {/* Biểu tượng "₫" */}
        <text 
          x="110" 
          y="145" 
          fontSize="120" 
          fontWeight="900" 
          fill="url(#splash-grad)" 
          textAnchor="middle" 
          fontFamily="Inter"
        >
          ₫
        </text>
      </svg>
    </div>
  );


  return (
    // Nền tối với gradient nhẹ ở trung tâm
    <div className="min-h-screen flex flex-col items-center justify-center 
                    bg-slate-900 text-white px-8 relative overflow-hidden"
    >
      
      {/* Container chính */}
      <div className="z-10 flex flex-col items-center max-w-lg w-full">
        
        {/* Logo Token SVG */}
        <TokenIcon />
        
        {/* Tiêu đề ứng dụng */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
            style={{
                // Hiệu ứng Gradient Text Clip (như trong CSS gốc)
                backgroundImage: `linear-gradient(135deg, ${GRADIENT_PURPLE}, ${GRADIENT_ORANGE})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '25px',
            }}
        >
          VNDC CAMPUS
        </h1>
        
        {/* Slogan */}
        <p className="text-xl sm:text-2xl text-gray-400 font-semibold"
           style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '70px' }}
        >
          Blockchain Payment for Students
        </p>
        
        {/* Loading Bar */}
        <div 
          className="w-full h-3 bg-gray-800 rounded-xl overflow-hidden shadow-inner"
          style={{ width: '350px', backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
        >
          {/* Thanh tiến trình (Giả định 65% đã tải) */}
          <div 
            className="h-full rounded-xl"
            style={{ 
              width: '65%', 
              backgroundImage: `linear-gradient(90deg, ${GRADIENT_PURPLE}, ${GRADIENT_ORANGE})`,
              boxShadow: `0 0 18px ${GRADIENT_PURPLE}80`, // Shadow của thanh tiến trình
              animation: 'load-progress 1.5s ease-out forwards' // Giả định keyframe load-progress
            }} 
          />
        </div>
        
        {/* Trạng thái tải */}
        <p className="text-sm text-gray-500 mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Loading blockchain...
        </p>

        {/* Thông tin phiên bản */}
        <div className="mt-20 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            v3.0.0 • <span className="text-green-400 font-semibold">Polygon zkEVM</span>
        </div>

      </div>
    </div>
  )
}

/* LƯU Ý QUAN TRỌNG VỀ ANIMATION:
  Để hiệu ứng quay và pulse hoạt động, bạn cần định nghĩa các keyframes sau trong file CSS hoặc tailwind.config.js của mình:

  // 1. Quay logo
  @keyframes spin-custom {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  // 2. Hiệu ứng nhấp nháy cho glow (tùy chọn)
  @keyframes pulse-slow {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  // 3. Hoạt ảnh giả định cho thanh load (nếu muốn nó chạy từ 0 đến 65%)
  @keyframes load-progress {
    from { width: 0%; }
    to { width: 65%; }
  }
*/