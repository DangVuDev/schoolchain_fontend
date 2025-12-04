// src/components/BottomNav.tsx – FIXED 2025 EDITION (HOÀN HẢO TRÊN MỌI MÀN HÌNH)
import { NavLink } from 'react-router-dom'
import { Home, Send, QrCode, Ticket, User } from 'lucide-react'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/send', icon: Send, label: 'Gửi' },
  { to: '/receive', icon: QrCode, label: 'Nhận' },
  { to: '/events', icon: Ticket, label: 'Event' },
  { to: '/profile', icon: User, label: 'Tôi' },
] as const

export default function BottomNav() {
  return (
    <>
      {/* Đảm bảo nội dung không bị che bởi BottomNav */}
      <div className="pb-32" />

      {/* Bottom Navigation – Fixed + Safe Area */}
      <div className="fixed inset-x-0 bottom-0 z-50">
        {/* Gradient line trên cùng */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />

        <div className="bg-black/40 backdrop-blur-3xl border-t border-white/10">
          {/* Safe area cho iPhone (notch + home indicator) */}
          <div className="h-20 safe:h-28 md:h-24 flex items-center justify-around px-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className="relative flex flex-col items-center justify-center flex-1 min-w-0 tap-highlight-transparent"
                // Thêm style để click dễ hơn trên mobile
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator – thanh nhỏ trên icon */}
                    {isActive && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full shadow-lg shadow-purple-500/50" />
                    )}

                    {/* Glow background khi active */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-orange-500/20 blur-xl" />
                    )}

                    <div className="relative flex flex-col items-center gap-1 py-2">
                      <Icon
                        className={`w-7 h-7 transition-all duration-300 ${
                          isActive
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 drop-shadow-lg'
                            : 'text-gray-400'
                        }`}
                        strokeWidth={isActive ? 2.8 : 2}
                      />

                      <span
                        className={`text-xs font-bold tracking-wide transition-all duration-300 ${
                          isActive
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400'
                            : 'text-gray-500'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Safe area bottom – cực kỳ quan trọng cho iPhone */}
          <div className="h-8 bg-gradient-to-t from-black/60 to-transparent safe:h-12" />
        </div>
      </div>
    </>
  )
}