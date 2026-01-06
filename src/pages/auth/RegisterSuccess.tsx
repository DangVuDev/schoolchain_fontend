import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

export default function RegisterSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } })
    const timer = setTimeout(() => navigate('/home'), 4000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 bg-black">
      <div>
        <h1 className="text-6xl font-black mb-8 text-white">Chào mừng!</h1>
        <p className="text-3xl mb-6 text-white/80">Bạn nhận ngay</p>
        <p className="text-7xl font-black bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">
          50.000 VNDC
        </p>
        <p className="text-gray-400 mt-10">Đang chuyển về trang chủ...</p>
      </div>
    </div>
  )
}
