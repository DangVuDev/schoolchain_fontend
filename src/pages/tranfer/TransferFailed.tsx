// src/pages/TransferFailed.tsx
import { AlertCircle, Home, RotateCw, Wallet } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const TRANSFER_ERROR_MAP: Record<string, {
  title: string
  description: string
  action?: 'retry' | 'home' | 'wallet'
}> = {
  INSUFFICIENT_BALANCE: {
    title: 'Số dư không đủ',
    description: 'Bạn không đủ VNDC để thực hiện giao dịch này',
    action: 'wallet',
  },

  INVALID_PASSPHRASE: {
    title: 'Sai mã PIN',
    description: 'Mã PIN bạn nhập không chính xác',
    action: 'retry',
  },

  INVALID_ADDRESS: {
    title: 'Địa chỉ không hợp lệ',
    description: 'Địa chỉ người nhận không tồn tại hoặc sai định dạng',
    action: 'retry',
  },

  WALLET_NOT_FOUND: {
    title: 'Ví chưa được tạo',
    description: 'Vui lòng tạo ví trước khi giao dịch',
    action: 'home',
  },

  TRANSFER_FAILED: {
    title: 'Lỗi hệ thống',
    description: 'Blockchain đang bận, vui lòng thử lại sau',
    action: 'retry',
  },
}


export default function TransferFailed() {
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    navigate('/home')
    return null
  }

  const {
    errorCode,
    errorMessage,
    amount,
    recipient,
  } = state

  const errorUI = TRANSFER_ERROR_MAP[errorCode] || {
    title: 'Giao dịch thất bại',
    description: errorMessage || 'Có lỗi xảy ra',
    action: 'retry',
  }

  const time = new Date().toLocaleString('vi-VN')

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-3xl rounded-3xl border border-red-500/30 shadow-2xl">

        {/* Header */}
        <div className="text-center py-10">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertCircle size={56} className="text-red-400" />
          </div>

          <h1 className="text-4xl font-black text-red-400">
            {errorUI.title}
          </h1>

          <p className="text-white/70 mt-4 px-6">
            {errorUI.description}
          </p>
        </div>

        {/* Info */}
        <div className="px-8 pb-8 space-y-4">
          <div className="flex justify-between">
            <span className="text-white/60">Số tiền</span>
            <span className="font-bold">{amount} VNDC</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Người nhận</span>
            <span className="font-mono text-sm">
              {recipient?.address}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/60">Thời gian</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-8 pb-10 space-y-4">
          {errorUI.action === 'retry' && (
            <button
              onClick={() => navigate(-1)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 font-black flex justify-center gap-3"
            >
              <RotateCw /> Thử lại
            </button>
          )}

          {errorUI.action === 'wallet' && (
            <button
              onClick={() => navigate('/wallet')}
              className="w-full py-4 rounded-2xl bg-white/10 flex justify-center gap-3"
            >
              <Wallet /> Xem ví
            </button>
          )}

          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl bg-white/10 flex justify-center gap-3"
          >
            <Home /> Về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}
