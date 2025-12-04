// src/components/BottomNav.tsx
import { NavLink } from 'react-router-dom'
import { Home, Send, QrCode, Ticket, User } from 'lucide-react'

export default function BottomNav() {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/send', icon: Send, label: 'Gửi' },
    { to: '/receive', icon: QrCode, label: 'Nhận' },
    { to: '/events', icon: Ticket, label: 'Event' },
    { to: '/profile', icon: User, label: 'Tôi' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-glass/80 backdrop-blur-3xl border-t border-white/10">
      {/* Gradient line trên cùng */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-purple-400 to-orange-500" />

      <div className="flex justify-around items-center h-24 px-6">
        {navItems.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="relative flex flex-col items-center gap-1.5 py-3 px-5 rounded-3xl transition-all duration-300 group"
          >
            {({ isActive }) => (
              <>
                {/* Background glow khi active */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-orange-500/30 rounded-3xl blur-xl" />
                )}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full shadow-neon" />
                )}

                <Icon
                  className={`w-7 h-7 transition-all duration-300 relative z-10 ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500 drop-shadow-lg'
                      : 'text-gray-400 group-hover:text-white/70'
                  }`}
                  strokeWidth={isActive ? 3 : 2}
                />

                <span
                  className={`text-xs font-bold tracking-wider transition-all duration-300 relative z-10 ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500'
                      : 'text-gray-500 group-hover:text-white/60'
                  }`}
                >
                  {navItems.find(i => i.to === to)?.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}