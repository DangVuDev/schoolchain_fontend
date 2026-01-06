import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { formatBalance, shortenAddress } from '../../lib/utils'
import { tranfer, type TranferResponse, type TranferResponseFaild } from '../../service/wallet.service'

/* ================== Spinner Pending ================== */
const PendingOverlay = () => (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center">
    <div className="bg-white/10 border border-white/20 rounded-3xl px-10 py-12 shadow-2xl flex flex-col items-center gap-6">
      <div className="w-16 h-16 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin" />
      <p className="text-white/80 text-lg font-semibold animate-pulse">
        Đang xử lý giao dịch…
      </p>
      <p className="text-white/50 text-sm text-center">
        Vui lòng không đóng ứng dụng
      </p>
    </div>
  </div>
)

export default function SendConfirm() {
  const navigate = useNavigate()
  const location = useLocation()

  const { recipient, address, amount, note } = location.state || {}

  /* ================== Guard ================== */
  useEffect(() => {
    if (!recipient || !amount) {
      navigate('/send', { replace: true })
    }
  }, [recipient, amount, navigate])

  const recipientName = recipient?.name || 'Người nhận'
  const recipientAvatar = recipient?.avatar

  /* ================== PIN ================== */
  const [pinValues, setPinValues] = useState<string[]>(['', '', '', '', '', ''])
  const inputRefs = useRef<HTMLInputElement[]>([])
  const pin = pinValues.join('')
  const isPinComplete = pin.length === 6

  /* ================== UI States ================== */
  const [isPending, setIsPending] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value) || isPending) return

    const next = [...pinValues]
    next[index] = value
    setPinValues(next)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPending) return
    if (e.key === 'Backspace' && !pinValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  /* ================== Submit ================== */
  const handleConfirm = async () => {
    if (!isPinComplete || isPending) return

    setIsPending(true)

    const response = await tranfer(
      recipient.address,
      amount,
      pin,
      note
    )

    setIsPending(false)

    if (response.success) {
      const respData = response as TranferResponse
      const me = await import('../../service/wallet.service').then(mod => mod.getWalletBalance())
      const newBalance = me || null
      navigate('/send/receipt', {
        state: {
          amount,
          recipient,
          note,
          txHash : respData.data.tx_hash,
          newBalance : newBalance,
          timestamp: Date.now(),
        },
      })
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)

      const err = response as TranferResponseFaild

      navigate('/send/failed', {
        state: {
          errorCode: err.error,
          errorMessage: err.message,
          amount,
          toAddress: recipient.address,
          recipient,
        },
      })
    }
  }

  /* ================== JSX ================== */
  return (
    <>
      {isPending && <PendingOverlay />}

      <div className="min-h-screen bg-[#0F172A] text-white pb-28">
        {/* Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-[#0F172A] to-orange-900/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-600/20 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/20 blur-3xl rounded-full animate-pulse delay-700" />
        </div>

        <div className="px-5 pt-6 max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => !isPending && navigate(-1)}
              disabled={isPending}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition shadow-lg disabled:opacity-40"
            >
              <ArrowLeft size={28} />
            </button>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-full font-black text-sm shadow-xl animate-pulse">
              0 GAS FEE
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-5 bg-white/20 rounded-full flex items-center justify-center">
                <Lock size={42} />
              </div>
              <h1 className="text-3xl font-black">Xác nhận giao dịch</h1>
              <p className="text-white/80 mt-2">Nhập mã PIN 6 số</p>
            </div>

            <div className="p-6 space-y-8">
              {/* Amount */}
              <div className="text-center py-8 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-amber-400 font-bold mb-3">Số tiền chuyển</p>
                <p className="text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {formatBalance(amount)}
                </p>
                <p className="text-2xl font-bold mt-2">VNDC</p>
              </div>

              {/* Recipient */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={recipientAvatar}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{recipientName}</p>
                    <p className="text-xs font-mono text-white/50">
                      {shortenAddress(address)}
                    </p>
                  </div>
                </div>

                {note && (
                  <p className="text-sm italic text-white/70">
                    “{note}”
                  </p>
                )}
              </div>

              {/* PIN */}
              <div className="text-center">
                <p className="font-bold mb-4">Nhập mã PIN</p>
                <div className={`flex justify-center gap-3 ${shake ? 'animate-shake' : ''}`}>
                  {pinValues.map((v, i) => (
                    <input
                      key={i}
                      ref={el => {
                        if (el) inputRefs.current[i] = el
                      }}
                      value={v}
                      disabled={isPending}
                      onChange={e => handleInputChange(i, e.target.value)}
                      onKeyDown={e => handleKeyDown(i, e)}
                      type="tel"
                      maxLength={1}
                      className="w-12 h-14 text-center text-3xl font-black bg-white/10 rounded-2xl border-2 border-white/30 focus:border-amber-500 outline-none disabled:opacity-40"
                    />
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleConfirm}
                disabled={!isPinComplete || isPending}
                className={`w-full py-5 rounded-3xl font-black text-xl transition-all
                  ${isPending
                    ? 'bg-white/10 text-white/40 cursor-wait'
                    : isPinComplete
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black shadow-xl'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
              >
                {isPending ? 'Đang xử lý…' : 'Gửi ngay'}
              </button>
            </div>
          </div>
        </div>

        <div className="h-24 lg:hidden" />
      </div>
    </>
  )
}
