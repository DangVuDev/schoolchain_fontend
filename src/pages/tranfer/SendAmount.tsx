// src/pages/SendAmount.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserFromAddress } from '../../service/user.service'

interface Recipient {
  recipientId?: string
  address?: string
  name: string
  studentId?: string
  avatar: string
  isFavorite?: boolean
}

export default function SendAmount() {
  const navigate = useNavigate()
  const location = useLocation()

  // Dữ liệu ban đầu từ navigation
  const initialData = location.state?.recipient || {}
  const amountPrefill = location.state?.amount || ''

  const [recipient, setRecipient] = useState<Recipient>({
    name: initialData.name || 'Đang tải...',
    studentId: initialData.studentId,
    avatar: initialData.avatar || '??',
    address: initialData.address,
    recipientId: initialData.recipientId,
    isFavorite: initialData.isFavorite || false,
  })

  const [amount, setAmount] = useState(amountPrefill)
  const [note, setNote] = useState('')

  const balance = 1_247_350
  const formatInput = (v: string) => v.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const rawAmount = Number(amount.replace(/,/g, '') || 0)


  const fetchRecipientByAddressOrId = async (address: string) => {
      const receiverInfo = await getUserFromAddress(address);
      if (receiverInfo && receiverInfo.data) {

        const receiver = {
          name: receiverInfo.data.full_name,
          studentId: receiverInfo.data.student_id,
          avatar: 'https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg',
          address: initialData.address,
          recipientId: receiverInfo.data._id,
          isFavorite: initialData.isFavorite || false,
        }
        setRecipient(receiver);
      } else {
        setRecipient((prev) => ({...prev, name: 'Ví lạ'}));
      }
  }

useEffect(() => {
  // Nếu không có address nào → có thể do lỗi navigate → quay về scan
  if (!initialData.address) {
    navigate('/send/scan', { replace: true });
    return;
  }

  document.title = `Gửi VNDC đến ${recipient.name}`;

  if (!initialData.name || !initialData.studentId) {
    if (initialData.address) {
      fetchRecipientByAddressOrId(initialData.address);
    }
  }
}, [initialData.address]); // Thêm dependency để chắc chắn

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pb-28">
      {/* Background glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-orange-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="px-5 pt-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition">
            <ArrowLeft size={28} />
          </button>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-black text-sm shadow-lg">
            0 GAS FEE
          </div>
        </div>

        {/* Người nhận */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 text-center mb-10 border border-white/10">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-orange-600 flex items-center justify-center text-3xl font-black shadow-xl">
            <img src={recipient.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold">{recipient.name}</h3>
          {recipient.studentId ? (
            <p className="text-white/60">MSSV: {recipient.studentId}</p>
          ) : (
            <p className="text-white/50 text-sm">Ví lạ • {recipient.address?.slice(0, 10)}...{recipient.address?.slice(-8)}</p>
          )}
        </div>

        {/* Nhập số tiền */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 mb-10 border-4 border-purple-500 shadow-2xl">
          <input
            type="tel"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(formatInput(e.target.value))}
            placeholder="0"
            autoFocus
            className="w-full text-center text-7xl font-black bg-transparent outline-none placeholder:text-white/20"
          />
          <p className="text-3xl text-white/60 text-center mt-2">VNDC</p>

          <div className="flex justify-between items-center mt-10">
            <span className="text-white/70">Số dư: {balance.toLocaleString()} VNDC</span>
            <button
              onClick={() => setAmount(balance.toString())}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl font-black shadow-lg hover:scale-110 transition"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="mb-10">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm lời nhắn (tuỳ chọn)..."
            rows={3}
            className="w-full px-6 py-5 rounded-3xl bg-white/5 backdrop-blur border border-white/20 focus:border-purple-500 transition placeholder:text-white/40 resize-none outline-none"
          />
        </div>

        {/* Tiếp tục */}
        <button
          onClick={() => navigate('/send/confirm', {
            state: { recipient, amount: rawAmount, note }
          })}
          disabled={!rawAmount}
          className={`w-full py-6 rounded-3xl font-black text-3xl transition-all ${
            rawAmount
              ? 'bg-gradient-to-r from-purple-600 to-orange-600 shadow-2xl hover:scale-105 active:scale-95'
              : 'bg-white/10 text-white/30'
          }`}
        >
          Tiếp tục
        </button>
      </div>

      <div className="h-24" />
    </div>
  )
}