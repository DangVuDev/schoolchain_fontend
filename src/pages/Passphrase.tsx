import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const words = ['apple', 'brave', 'candy', 'dream', 'eagle', 'flame', 'grace', 'honey', 'ivory', 'jazz', 'kingdom', 'lemon']

export default function Passphrase() {
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-black to-gray-900">
      <div className="max-w-2xl w-full p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-15px_rgba(168,85,247,0.6)]">

        <h1 className="text-4xl font-black text-center mb-10 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
          12 từ khóa bảo mật
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {words.map((word, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-2xl py-5 text-center font-mono text-sm text-white/80 shadow-neon"
            >
              <span className="text-purple-400 font-bold mr-2">{i + 1}.</span>
              {word}
            </div>
          ))}
        </div>

        <div className="bg-red-900/40 border border-red-600 rounded-3xl p-6 text-center mb-8 shadow-[0_0_25px_rgba(255,0,0,0.4)]">
          <p className="font-bold text-red-400 text-lg">⚠️ Không chụp màn hình!</p>
          <p className="mt-2 text-white/70">Ghi lại 12 từ theo đúng thứ tự và cất giữ an toàn</p>
        </div>

        <label className="flex items-center gap-4 text-lg cursor-pointer select-none mb-8">
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            className="w-7 h-7 rounded border-2 border-purple-400/40 accent-purple-500"
          />
          <span className="text-white/80">Tôi đã ghi lại an toàn</span>
        </label>

        <button
          onClick={() => navigate('/success')}
          disabled={!checked}
          className={`w-full py-6 text-2xl font-black rounded-2xl bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-xl tracking-wide transition-all ${
            !checked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)]'
          }`}
        >
          Tiếp tục →
        </button>
      </div>
    </div>
  )
}
