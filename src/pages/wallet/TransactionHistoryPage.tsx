// src/pages/wallet/TransactionHistoryPage.tsx
import { format } from 'date-fns'
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Coffee,
    Download,
    Flame,
    Gift,
    ScrollText,
    Search,
    Ticket
} from 'lucide-react'
import { useState } from 'react'

interface Transaction {
  id: string
  txHash: string
  type: 'p2p' | 'admin_mint' | 'batch_mint' | 'festival_mint' | 'ticket_purchase' | 'transcript_issue' | 'burn'
  title: string
  description: string
  amount: number // VNDC đã convert
  date: Date
  status: 'success' | 'pending' | 'failed' | 'reverted'
  nftId?: string
  note?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    txHash: '0x9a8f...3c2b',
    type: 'p2p',
    title: 'Nhận từ Nguyễn Văn An',
    description: 'Chuyển khoản cá nhân',
    amount: 50000,
    date: new Date('2025-01-15T14:30:00'),
    status: 'success'
  },
  {
    id: '2',
    txHash: '0xabc123...xyz',
    type: 'ticket_purchase',
    title: 'Mua vé Spring Music Festival 2025',
    description: 'NFT Ticket #8042 • Sơn Tùng M-TP',
    amount: -250000,
    date: new Date('2025-01-14T17:20:00'),
    status: 'success',
    nftId: '8042'
  },
  {
    id: '3',
    txHash: '0xdef456...789',
    type: 'admin_mint',
    title: 'Nhận thưởng học bổng',
    description: 'Học bổng tháng 1/2025 từ Ban Giám hiệu',
    amount: 2000000,
    date: new Date('2025-01-10T09:00:00'),
    status: 'success',
    note: 'Học bổng xuất sắc'
  },
  {
    id: '4',
    txHash: '0x111...222',
    type: 'p2p',
    title: 'Chuyển cho Trần Thị Mai',
    description: 'Gửi tiền ăn sáng',
    amount: -35000,
    date: new Date('2025-01-13T08:15:00'),
    status: 'success'
  },
  {
    id: '5',
    txHash: '0x333...444',
    type: 'transcript_issue',
    title: 'Phát hành bảng điểm NFT',
    description: 'Học kỳ 1 - 2024/2025',
    amount: -50000,
    date: new Date('2025-01-08T14:00:00'),
    status: 'success'
  },
  {
    id: '6',
    txHash: '0x555...666',
    type: 'burn',
    title: 'Đốt token hoàn vé',
    description: 'Hoàn tiền vé Tech Fair 2025',
    amount: 150000,
    date: new Date('2025-01-05T10:30:00'),
    status: 'success'
  },
  {
    id: '7',
    txHash: '0x777...888',
    type: 'festival_mint',
    title: 'Nhận vé miễn phí',
    description: 'Vé VIP Spring Festival 2025 • Quà tặng',
    amount: 0,
    date: new Date('2025-01-03T20:00:00'),
    status: 'success',
    nftId: '9001'
  },
]

export default function TransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | Transaction['type']>('all')

  const filteredTxns = mockTransactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm. toLowerCase()) ||
                         tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.txHash.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || tx.type === filterType
    return matchesSearch && matchesType
  })

  // Icon + màu theo loại giao dịch (hợp lý với backend)
  const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
      case 'p2p':
        return { icon: <ArrowUpRight className="w-6 h-6" />, color: 'text-red-400', bg: 'bg-red-500/10' }
      case 'admin_mint':
      case 'batch_mint':
      case 'festival_mint':
        return { icon: <Gift className="w-6 h-6" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
      case 'ticket_purchase':
        return { icon: <Ticket className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/10' }
      case 'transcript_issue':
        return { icon: <ScrollText className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/10' }
      case 'burn':
        return { icon: <Flame className="w-6 h-6" />, color: 'text-orange-400', bg: 'bg-orange-500/10' }
      default:
        return { icon: <Coffee className="w-6 h-6" />, color: 'text-gray-400', bg: 'bg-gray-500/10' }
    }
  }

  const getAmountColor = (amount: number, type: Transaction['type']) => {
    if (amount > 0) return 'text-emerald-400'
    if (amount < 0) return 'text-red-400'
    if (type.includes('mint') || type === 'burn') return 'text-purple-400'
    return 'text-gray-300'
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const styles = {
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
      pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
      failed: 'bg-red-500/20 text-red-400 border border-red-500/50',
      reverted: 'bg-orange-500/20 text-orange-400 border border-orange-500/50',
    }
    const texts = {
      success: 'Thành công',
      pending: 'Đang xử lý',
      failed: 'Thất bại',
      reverted: 'Bị hoàn tác'
    }
    return <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${styles[status]}`}>{texts[status]}</span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3">Lịch sử giao dịch</h1>
          <p className="text-lg sm:text-xl text-gray-400">Tổng cộng {mockTransactions.length} giao dịch</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-xl text-sm sm:text-base">
              <Download size={20} />
              Export CSV
            </button>
            <button className="px-6 py-3.5 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold hover:bg-white/20 transition text-sm sm:text-base">
              PDF Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl sm:rounded-3xl border border-white/10 p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm giao dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base placeholder-gray-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-5 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-purple-500 focus:outline-none transition text-sm sm:text-base"
            >
              <option value="all">Tất cả loại</option>
              <option value="p2p">Chuyển khoản P2P</option>
              <option value="admin_mint">Nhận từ Admin</option>
              <option value="ticket_purchase">Mua vé NFT</option>
              <option value="transcript_issue">Phát hành bảng điểm</option>
              <option value="burn">Đốt token / Hoàn tiền</option>
            </select>

            {/* Có thể thêm date filter sau */}
            <div className="lg:hidden col-span-2" />
          </div>
        </div>

        {/* Transaction List - Fully Responsive */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 bg-purple-900/30 font-bold text-purple-300 text-sm">
            <div className="col-span-1">Loại</div>
            <div className="col-span-5">Giao dịch</div>
            <div className="col-span-3">Thời gian</div>
            <div className="col-span-2 text-right">Số tiền</div>
            <div className="col-span-1 text-center">Trạng thái</div>
          </div>

          {/* Transaction Items */}
          <div className="divide-y divide-white/10">
            {filteredTxns.map((tx) => {
              const config = getTypeConfig(tx.type)
              return (
                <div
                  key={tx.id}
                  className="p-5 lg:px-8 lg:py-6 hover:bg-white/5 transition cursor-pointer group"
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden flex gap-4">
                    <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-lg truncate">{tx.title}</p>
                        <span className={`text-2xl font-black ${getAmountColor(tx.amount, tx.type)} ml-3 flex-shrink-0`}>
                          {tx.amount === 0 ? 'MIỄN PHÍ' :
                            tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()
                          } VNDC
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{tx.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">{format(tx.date, 'dd/MM/yyyy • HH:mm')}</span>
                        {getStatusBadge(tx.status)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center`}>
                        {config.icon}
                      </div>
                    </div>
                    <div className="col-span-5">
                      <p className="font-bold text-lg">{tx.title}</p>
                      <p className="text-sm text-gray-400 font-mono">
                        {tx.description}
                        {tx.nftId && <span className="text-purple-400 ml-2">#{tx.nftId}</span>}
                      </p>
                    </div>
                    <div className="col-span-3 text-gray-300">
                      {format(tx.date, 'dd/MM/yyyy • HH:mm')}
                    </div>
                    <div className={`col-span-2 text-right text-2xl font-black ${getAmountColor(tx.amount, tx.type)}`}>
                      {tx.amount === 0 ? 'MIỄN PHÍ' :
                        tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()
                      } VNDC
                    </div>
                    <div className="col-span-1 text-center">
                      {getStatusBadge(tx.status)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 text-sm">
            <p className="text-gray-400">Hiển thị {filteredTxns.length} / {mockTransactions.length} giao dịch</p>
            <div className="flex items-center gap-2">
              <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="px-5 py-3 rounded-xl bg-purple-600 font-bold text-sm">1</button>
              <button className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm">2</button>
              <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}