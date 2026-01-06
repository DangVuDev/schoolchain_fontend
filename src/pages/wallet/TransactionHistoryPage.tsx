// src/pages/wallet/TransactionHistoryPage.tsx
import { format } from 'date-fns'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  Gift,
  ScrollText,
  Search,
  Ticket,
  UserPlus,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getHistoryTransactions, type FetchTransactionsResult, type Pagination, type TransactionFromAPI } from '../../service/wallet.service'



export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<TransactionFromAPI[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Giả sử bạn có wallet address từ context/auth
  // Thay bằng cách lấy thực tế của bạn (ví dụ: useWallet() hook)
  const walletAddress = localStorage.getItem('wallet_address') || 'Me'

  const fetchTransactions = async (page: number) => {
    setLoading(true)
    try {
      const res = await getHistoryTransactions(page) as FetchTransactionsResult;

      if (res.success) {
        setTransactions(res.data)
        setPagination(res.pagination)
        setCurrentPage(page)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions(1)
  }, [])

  // Tính toán title, description, isIncoming
  const enrichedTxns = transactions.map((tx) => {
    const isIncoming = tx.to.toLowerCase() === walletAddress.toLowerCase()
    const isOutgoing = tx.from.toLowerCase() === walletAddress.toLowerCase()

    let title = ''
    let description = tx.note || ''

    switch (tx.type) {
      case 'p2p':
        title = isIncoming ? 'Nhận chuyển khoản' : 'Chuyển khoản P2P'
        description = description || (isIncoming ? `Từ ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}` : `Đến ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`)
        break
      case 'ticket_purchase':
        title = 'Mua vé sự kiện'
        description = description || 'NFT Ticket'
        break
      case 'admin_mint':
      case 'batch_mint':
      case 'festival_mint':
        title = 'Nhận thưởng / Quà tặng'
        description = description || 'Từ hệ thống'
        break
      case 'transcript_issue':
        title = 'Phát hành bảng điểm NFT'
        description = description || 'Bảng điểm học tập'
        break
      case 'burn':
        title = 'Hoàn tiền / Đốt token'
        description = description || 'Hoàn vé sự kiện'
        break
      case 'reward':
        title = 'Nhận phần thưởng'
        description = description || 'Thưởng từ hệ thống'
        break
      default:
        title = isIncoming ? 'Nhận token' : 'Giao dịch'
        description = tx.type
    }

    return { ...tx, title, description, isIncoming, isOutgoing }
  })

  // Filter
  const filteredTxns = enrichedTxns.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === 'all' || tx.type === filterType
    return matchesSearch && matchesType
  })

  // Icon + màu theo type
  const getTypeConfig = (type: string, isIncoming: boolean) => {
    switch (type) {
      case 'p2p':
        return {
          icon: isIncoming ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />,
          color: isIncoming ? 'text-emerald-400' : 'text-red-400',
          bg: isIncoming ? 'bg-emerald-500/10' : 'bg-red-500/10',
        }
      case 'admin_mint':
      case 'batch_mint':
      case 'festival_mint':
      case 'reward':
        return { icon: <Gift className="w-6 h-6" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
      case 'ticket_purchase':
        return { icon: <Ticket className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/10' }
      case 'transcript_issue':
        return { icon: <ScrollText className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/10' }
      case 'burn':
        return { icon: <Flame className="w-6 h-6" />, color: 'text-orange-400', bg: 'bg-orange-500/10' }
      default:
        return { icon: <UserPlus className="w-6 h-6" />, color: 'text-gray-400', bg: 'bg-gray-500/10' }
    }
  }

  const getAmountDisplay = (amount: string, isIncoming: boolean, type: string) => {
    const num = parseFloat(amount)
    if (num === 0) return 'MIỄN PHÍ'
    if (isIncoming) return `+${parseFloat(amount).toLocaleString()}`
    if (type === 'ticket_purchase' || type === 'transcript_issue') return amount // đã là âm từ backend? nếu không thì - ở đây
    return `-${parseFloat(amount).toLocaleString()}`
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      failed: 'bg-red-500/20 text-red-400 border-red-500/50',
      reverted: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    }
    const texts: Record<string, string> = {
      success: 'Thành công',
      pending: 'Đang xử lý',
      failed: 'Thất bại',
      reverted: 'Bị hoàn tác',
    }
    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${styles[status] || styles.pending}`}>
        {texts[status] || 'Đang xử lý'}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-orange-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3">Lịch sử giao dịch</h1>
          <p className="text-lg sm:text-xl text-gray-400">
            Tổng cộng {pagination.total.toLocaleString()} giao dịch
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-xl">
              <Download size={20} />
              Export CSV
            </button>
            <button className="px-6 py-3.5 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl font-bold hover:bg-white/20 transition">
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
                placeholder="Tìm kiếm theo hash, ghi chú..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-5 py-4 bg-white/10 border border-white/20 rounded-2xl focus:border-purple-500 focus:outline-none transition"
            >
              <option value="all">Tất cả loại</option>
              <option value="p2p">Chuyển khoản P2P</option>
              <option value="ticket_purchase">Mua vé NFT</option>
              <option value="admin_mint">Nhận từ Admin</option>
              <option value="transcript_issue">Phát hành bảng điểm</option>
              <option value="burn">Hoàn tiền / Đốt</option>
              <option value="festival_mint">Vé miễn phí</option>
            </select>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Transaction List */}
        {!loading && (
          <div className="bg-white/5 backdrop-blur-3xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 bg-purple-900/30 font-bold text-purple-300 text-sm">
              <div className="col-span-1">Loại</div>
              <div className="col-span-5">Giao dịch</div>
              <div className="col-span-3">Thời gian</div>
              <div className="col-span-2 text-right">Số tiền</div>
              <div className="col-span-1 text-center">Trạng thái</div>
            </div>

            <div className="divide-y divide-white/10">
              {filteredTxns.length === 0 ? (
                <div className="p-12 text-center text-gray-400">Không tìm thấy giao dịch nào</div>
              ) : (
                filteredTxns.map((tx) => {
                  const config = getTypeConfig(tx.type, tx.isIncoming)
                  return (
                    <div
                      key={tx.id}
                      className="p-5 lg:px-8 lg:py-6 hover:bg-white/5 transition cursor-pointer group"
                    >
                      {/* Mobile */}
                      <div className="lg:hidden flex gap-4">
                        <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-lg truncate">{tx.title}</p>
                              <p className="text-sm text-gray-400 truncate">{tx.description}</p>
                            </div>
                            <span className={`text-2xl font-black ${tx.isIncoming ? 'text-emerald-400' : 'text-red-400'} ml-3 flex-shrink-0`}>
                              {getAmountDisplay(tx.amount, tx.isIncoming, tx.type)} VNDC
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">
                              {format(new Date(tx.timestamp), 'dd/MM/yyyy • HH:mm')}
                            </span>
                            {getStatusBadge(tx.status)}
                          </div>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1">
                          <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center`}>
                            {config.icon}
                          </div>
                        </div>
                        <div className="col-span-5">
                          <p className="font-bold text-lg">{tx.title}</p>
                          <p className="text-sm text-gray-400">
                            {tx.description}
                            <span className="text-gray-500 font-mono ml-2 text-xs">({tx.hash.slice(0, 8)}...{tx.hash.slice(-6)})</span>
                          </p>
                        </div>
                        <div className="col-span-3 text-gray-300">
                          {format(new Date(tx.timestamp), 'dd/MM/yyyy • HH:mm')}
                        </div>
                        <div className={`col-span-2 text-right text-2xl font-black ${tx.isIncoming ? 'text-emerald-400' : 'text-red-400'}`}>
                          {getAmountDisplay(tx.amount, tx.isIncoming, tx.type)} VNDC
                        </div>
                        <div className="col-span-1 text-center">{getStatusBadge(tx.status)}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-5 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 text-sm">
                <p className="text-gray-400">
                  Hiển thị {(currentPage - 1) * pagination.limit + 1} -{' '}
                  {Math.min(currentPage * pagination.limit, pagination.total)} / {pagination.total} giao dịch
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchTransactions(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum = i + 1
                    if (currentPage > 3) pageNum = currentPage - 3 + i + 1
                    if (pageNum > pagination.pages) return null
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchTransactions(pageNum)}
                        className={`px-5 py-3 rounded-xl font-bold transition ${
                          currentPage === pageNum ? 'bg-purple-600' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => fetchTransactions(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}