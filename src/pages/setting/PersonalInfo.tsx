// src/pages/PersonalInfo.tsx – Liquid Glass 2025 Edition
import { AlertTriangle, ArrowLeft, CheckCircle2, Mail, Phone, Save, School2, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PersonalInfo() {
  const navigate = useNavigate()

  const [name, setName] = useState('Nguyễn Văn A')
  const [email] = useState('vana.nguyen@hcmut.edu.vn') // email trường: không đổi được
  const [phone, setPhone] = useState('0912 345 678')
  const [studentId] = useState('22DH110001') // không đổi được
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Giả lập gọi API
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Glow – giống hệt các trang trước */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-600/40 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 pt-16 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button onClick={() => navigate(-1)} className="p-4 bg-white/10 rounded-full backdrop-blur-xl hover:bg-white/20 transition">
              <ArrowLeft size={36} />
            </button>

            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Thông tin cá nhân
            </h1>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`p-4 rounded-full backdrop-blur-xl transition-all ${
                saved
                  ? 'bg-emerald-500/20'
                  : isSaving
                  ? 'bg-white/10 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {saved ? (
                <CheckCircle2 size={36} className="text-emerald-400" />
              ) : (
                <Save size={36} className={isSaving ? 'text-white/50' : ''} />
              )}
            </button>
          </div>

          {/* Avatar + Info Card */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User size={64} className="text-white/80" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-black">
                <School2 size={28} className="text-white" />
              </div>
            </div>
            <p className="mt-6 text-3xl font-black">{name || 'Sinh viên'}</p>
            <p className="text-white/50 text-xl">Học viện Công nghệ BK</p>
          </div>

          {/* Form chỉnh sửa thông tin */}
          <div className="space-y-6">
            {/* Họ và tên */}
            <InfoField
              icon={<User size={36} className="text-purple-400" />}
              label="Họ và tên"
              value={name}
              onChange={setName}
              placeholder="Nhập họ và tên"
            />

            {/* Email trường – không sửa được */}
            <InfoField
              icon={<Mail size={36} className="text-orange-400" />}
              label="Email trường"
              value={email}
              disabled
              badge="Đã xác minh"
            />

            {/* Số điện thoại */}
            <InfoField
              icon={<Phone size={36} className="text-emerald-400" />}
              label="Số điện thoại"
              value={phone}
              onChange={setPhone}
              placeholder="0912 345 678"
            />

            {/* Mã sinh viên – không sửa được */}
            <InfoField
              icon={<School2 size={36} className="text-blue-400" />}
              label="Mã sinh viên"
              value={studentId}
              disabled
              badge="Không thể thay đổi"
            />
          </div>

          {/* Cảnh báo */}
          <div className="mt-12 bg-rose-500/20 rounded-3xl p-8 border border-rose-500/40 shadow-2xl">
            <div className="flex items-start gap-5">
              <AlertTriangle size={40} className="text-rose-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-2xl font-black text-rose-300 mb-3">Thông tin quan trọng</p>
                <p className="text-rose-200 text-lg leading-relaxed">
                  Email trường và mã sinh viên được liên kết tự động từ hệ thống trường và{' '}
                  <span className="font-black">không thể thay đổi</span>.
                </p>
                <p className="text-rose-300/80 mt-4">
                  Nếu thông tin sai → Liên hệ Ban Tổ chức Campus Wallet để được hỗ trợ.
                </p>
              </div>
            </div>
          </div>

          {/* Nút lưu lớn (khi có thay đổi) */}
          {(name !== 'Nguyễn Văn A' || phone !== '0912 345 678') && !saved && (
            <button
              onClick={handleSave}
              className="w-full mt-10 py-7 rounded-3xl bg-gradient-to-r from-purple-500 to-orange-500 font-black text-3xl shadow-2xl hover:scale-105 transition-transform"
            >
              {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          )}

          {saved && (
            <div className="mt-10 text-center py-8">
              <CheckCircle2 size={80} className="mx-auto text-emerald-400 mb-4" />
              <p className="text-3xl font-black text-emerald-400">Đã lưu thành công!</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-8 py-6">
        <div className="flex justify-around">
          {['Home', 'Events', 'Wallet', 'Tickets', 'Profile'].map((tab, i) => (
            <div key={tab} className={`text-center ${i === 4 ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-12 h-12 mx-auto mb-2 bg-white/10 rounded-2xl" />
              <p className="text-xs font-bold">{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Component Input đẹp hơn, có badge, hiệu ứng focus
function InfoField({
  icon,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  badge,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  disabled?: boolean
  badge?: string
}) {
  return (
    <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl transition-all hover:border-white/30">
      <div className="flex items-center justify-between mb-4">
        <label className="text-xl text-white/70 font-bold">{label}</label>
        {badge && (
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            disabled ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
          }`}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 text-2xl font-bold bg-transparent outline-none placeholder-white/30 disabled:text-white/50"
        />
      </div>
    </div>
  )
}