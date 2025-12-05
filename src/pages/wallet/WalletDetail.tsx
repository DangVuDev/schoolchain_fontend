// src/pages/WalletDetail.tsx
import { AlertTriangle, ArrowLeft, CheckCircle2, Copy, Key, Lock, ShieldCheck, Unlock } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { formatBalance, shortenAddress } from '../../lib/utils'

export default function WalletDetail() {
  const navigate = useNavigate()
  const { walletAddress } = useAuth()

  // State cho Export Private Key
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [copiedPrivateKey, setCopiedPrivateKey] = useState(false)

  // State cho Đổi mã bảo mật
  const [showChangePin, setShowChangePin] = useState(false)
  const [authMethod, setAuthMethod] = useState<'oldPin' | 'privateKey' | null>(null)
  const [oldPin, setOldPin] = useState('')
  const [privateKeyInput, setPrivateKeyInput] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmNewPin, setConfirmNewPin] = useState('')
  const [changePinSuccess, setChangePinSuccess] = useState(false)

  // Giả lập dữ liệu (thực tế sẽ lấy từ backend + decrypt bằng PIN/private key)
  const realPrivateKey = "0x4f3edf982fc53e8a6977f57381e0e8d5c8728c2f8e9b3c4d7a9e8c5b2d1f9e8c7a5d3" // ví dụ
  const currentPin = "1234" // PIN hiện tại (giả lập)

  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(realPrivateKey)
    setCopiedPrivateKey(true)
    setTimeout(() => setCopiedPrivateKey(false), 2000)
  }

  const handleRevealPrivateKey = () => {
    if (pinInput === currentPin) {
      setShowPrivateKey(true)
      setPinInput('')
    } else {
      alert('Mã PIN không đúng!')
    }
  }

  const handleChangePin = () => {
    if (newPin !== confirmNewPin) {
      alert('Mã PIN mới không khớp!')
      return
    }
    if (newPin.length < 4) {
      alert('Mã PIN phải có ít nhất 4 chữ số!')
      return
    }

    let authenticated = false

    if (authMethod === 'oldPin' && oldPin === currentPin) {
      authenticated = true
    }
    if (authMethod === 'privateKey' && privateKeyInput.trim() === realPrivateKey) {
      authenticated = true
    }

    if (!authenticated) {
      alert('Xác thực thất bại! Vui lòng kiểm tra lại mã PIN cũ hoặc private key.')
      return
    }

    // TODO: Gọi API đổi PIN ở đây
    console.log('Đổi PIN thành công:', newPin)
    setChangePinSuccess(true)
    setTimeout(() => {
      setShowChangePin(false)
      setChangePinSuccess(false)
      // Reset form
      setOldPin('')
      setPrivateKeyInput('')
      setNewPin('')
      setConfirmNewPin('')
      setAuthMethod(null)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/40 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-orange-600/40 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="px-6 pt-16 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-12">
            <button onClick={() => navigate(-1)} className="p-4 bg-white/10 rounded-full backdrop-blur-xl">
              <ArrowLeft size={36} />
            </button>
            <h1 className="flex-1 text-center text-5xl font-black bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Quản lý ví
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Thông tin ví */}
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck size={40} className="text-emerald-400" />
                <h2 className="text-3xl font-black">Thông tin ví</h2>
              </div>
              <p className="text-white/70 mb-4 text-xl">Ví được liên kết với tài khoản của bạn và không thể thay đổi.</p>
              <div className="space-y-6">
                <div>
                  <p className="text-white/70 mb-2 text-lg">Địa chỉ ví VNDC</p>
                  <div className="flex items-center justify-between bg-white/5 rounded-2xl p-6">
                    <p className="font-mono text-xl tracking-wider flex-1">
                      {shortenAddress(walletAddress || '')}
                    </p>
                    <button onClick={() => navigator.clipboard.writeText(walletAddress || '')} className="ml-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20">
                      <Copy size={32} />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-white/70 mb-2 text-lg">Số dư</p>
                  <p className="text-3xl font-black text-emerald-400">{formatBalance(500000)} VNDC</p>
                </div>
              </div>
            </div>

            {/* Export Private Key */}
            <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <Key size={40} className="text-orange-400" />
                <h2 className="text-3xl font-black">Export Private Key</h2>
              </div>
              <p className="text-white/70 mb-6 text-lg">
                Private key được mã hóa an toàn. Nhập mã PIN hiện tại để giải mã và xuất.
              </p>

              {!showPrivateKey ? (
                <div className="space-y-4">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Nhập mã PIN hiện tại"
                    className="w-full py-6 px-6 rounded-3xl bg-white/5 border border-white/20 text-xl placeholder-white/50 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleRevealPrivateKey}
                    className="w-full py-6 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 font-black text-2xl"
                  >
                    Giải mã Private Key
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <p className="font-mono text-xl tracking-wider break-all">{realPrivateKey}</p>
                  </div>
                  <button
                    onClick={handleCopyPrivateKey}
                    className="w-full py-6 rounded-3xl bg-white/10 border border-white/20 font-black text-2xl flex items-center justify-center gap-4 hover:bg-white/20"
                  >
                    {copiedPrivateKey ? <CheckCircle2 size={32} className="text-emerald-400" /> : <Copy size={32} />}
                    Sao chép Private Key
                  </button>
                  <div className="bg-rose-500/20 rounded-2xl p-6 border border-rose-500/40">
                    <div className="flex items-start gap-4">
                      <AlertTriangle size={32} className="text-rose-400" />
                      <p className="text-rose-300 text-lg">
                        CỰC KỲ NGUY HIỂM! Ai có private key đều kiểm soát toàn bộ ví. KHÔNG CHIA SẺ!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Đổi mã bảo mật */}
            <div className="lg:col-span-2 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                {changePinSuccess ? <Unlock size={40} className="text-emerald-400" /> : <Lock size={40} className="text-purple-400" />}
                <h2 className="text-3xl font-black">Đổi mã bảo mật (PIN)</h2>
              </div>

              {!showChangePin ? (
                <button
                  onClick={() => setShowChangePin(true)}
                  className="w-full py-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 font-black text-2xl"
                >
                  Đổi mã bảo mật
                </button>
              ) : changePinSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={80} className="mx-auto text-emerald-400 mb-6" />
                  <p className="text-3xl font-black text-emerald-400">Đổi mã bảo mật thành công!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-white/70 text-lg">
                    Chọn một trong hai cách để xác thực trước khi đổi mã PIN mới:
                  </p>

                  {/* Chọn phương thức xác thực */}
                  {!authMethod && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setAuthMethod('oldPin')}
                        className="p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition"
                      >
                        <Lock size={32} className="mx-auto mb-3 text-emerald-400" />
                        <p className="font-bold text-xl">Dùng mã PIN cũ</p>
                      </button>
                      <button
                        onClick={() => setAuthMethod('privateKey')}
                        className="p-6 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition"
                      >
                        <Key size={32} className="mx-auto mb-3 text-orange-400" />
                        <p className="font-bold text-xl">Dùng Private Key gốc</p>
                      </button>
                    </div>
                  )}

                  {/* Form xác thực + đổi PIN */}
                  {authMethod && (
                    <>
                      {authMethod === 'oldPin' && (
                        <input
                          type="password"
                          value={oldPin}
                          onChange={(e) => setOldPin(e.target.value)}
                          placeholder="Nhập mã PIN cũ"
                          className="w-full py-6 px-6 rounded-3xl bg-white/5 border border-white/20 text-xl placeholder-white/50 focus:outline-none focus:border-emerald-500"
                        />
                      )}
                      {authMethod === 'privateKey' && (
                        <input
                          type="password"
                          value={privateKeyInput}
                          onChange={(e) => setPrivateKeyInput(e.target.value)}
                          placeholder="Dán private key gốc"
                          className="w-full py-6 px-6 rounded-3xl bg-white/5 border border-white/20 text-xl placeholder-white/50 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      )}

                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="Nhập mã PIN mới (tối thiểu 4 số)"
                        className="w-full py-6 px-6 rounded-3xl bg-white/5 border border-white/20 text-xl placeholder-white/50 focus:outline-none focus:border-purple-500"
                      />
                      <input
                        type="password"
                        value={confirmNewPin}
                        onChange={(e) => setConfirmNewPin(e.target.value)}
                        placeholder="Xác nhận mã PIN mới"
                        className="w-full py-6 px-6 rounded-3xl bg-white/5 border border-white/20 text-xl placeholder-white/50 focus:outline-none focus:border-purple-500"
                      />

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setShowChangePin(false)
                            setAuthMethod(null)
                            setOldPin('')
                            setPrivateKeyInput('')
                            setNewPin('')
                            setConfirmNewPin('')
                          }}
                          className="flex-1 py-6 rounded-3xl bg-white/10 border border-white/20 font-black text-2xl"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={handleChangePin}
                          className="flex-1 py-6 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 font-black text-2xl"
                        >
                          Xác nhận đổi PIN
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-3xl border-t border-white/10 px-8 py-6">
        <div className="flex justify-around">
          {['Home', 'Events', 'Wallet', 'Tickets', 'Profile'].map((tab, i) => (
            <div key={tab} className={`text-center ${i === 2 ? 'text-purple-400 scale-125' : 'text-white/40'}`}>
              <div className="w-12 h-12 mx-auto mb-2 bg-white/10 rounded-2xl" />
              <p className="text-xs font-bold">{tab}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}