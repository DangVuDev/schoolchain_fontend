import axios from 'axios'

export interface WalletInfoResponse {
    success: boolean
    data: {
        address: string
        vndc_balance: number
        created_at: Date
        is_activated: boolean
    }
}

export const getWalletInfoFromServer = async (): Promise<WalletInfoResponse | null> => {
    const access_token = localStorage.getItem('access_token')

    if (!access_token) {
        console.warn('Không tìm thấy access_token')
        return null
    }

    try {
        const response = await axios.get<WalletInfoResponse>('http://localhost:3000/api/v1/wallet/info', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })

        if (response.data.success) {
            return response.data
        } else {
            console.error('Lấy thông tin wallet thất bại:', response.data)
            return null
        }
    } 
    catch (error: any) {
        // Nếu token hết hạn hoặc lỗi 401 → xóa token
        if (error.response?.status === 401) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_session')
        console.warn('Token hết hạn hoặc không hợp lệ → đã đăng xuất')
        }

        console.error('Error fetching user info:', error.response?.data || error.message)
        return null
    }
}

export const getWalletBalance = async (): Promise<number | null> => {
    const walletInfo = await getWalletInfoFromServer()
    if (walletInfo && walletInfo.success) {
        return walletInfo.data.vndc_balance
    }   else {  
        return null
    }
}

export interface TranferResponse {
  success: boolean;
  data: {   
    tx_hash: string;
    status: string;
    from: string;
    to: string;
    amount: number;
   message: string;
  };
}

export interface TranferResponseFaild {
  success: boolean;
  error: string;
  message: string;
}

export const tranfer =  async (toAddress: string, amount: number, passphrase: string, note?: string): Promise<TranferResponse | TranferResponseFaild> => {
    const access_token = localStorage.getItem('access_token')
    const address = localStorage.getItem('wallet_address')

    if (!access_token) {
        console.warn('Không tìm thấy access_token')
        return { success: false, error: 'No access token', message: 'Không tìm thấy access_token' }
    }
    try {
        const response = await axios.post('http://localhost:3000/api/v1/transfer/p2p', 
        {
            to_address: toAddress,
            amount: amount,
            passphrase,
            message: note || `Chuyển ${amount} VNDC từ ${address} đến ${toAddress}`
        },
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })  
        if (response.data.success) {
            return response.data
        } else {
            console.error('Chuyển tiền thất bại:', response.data)
            return response.data
        }
    } catch (error: any) {
        console.error('Error during transfer:', error.response?.data || error.message)
        return { success: false, error: 'Transfer error', message: error.response?.data?.message || 'Lỗi trong quá trình chuyển tiền' }
    }
}



export interface TransactionFromAPI {
  id: string
  hash: string
  type: string // p2p, ticket_purchase, reward, admin_mint, transcript_issue, burn, festival_mint, batch_mint...
  from: string
  to: string
  amount: string // đã formatUnits thành string
  status: 'success' | 'pending' | 'failed' | 'reverted'
  note?: string
  timestamp: string // ISO string
}


export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface FetchTransactionsResult {
    success: boolean
  data: TransactionFromAPI[]
  pagination: Pagination
}

export const getHistoryTransactions = async (page: number) => {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
        console.warn('Không tìm thấy access_token')
        return { transactions: [], pagination: null }
    }
    try {
        const response = await axios.get<FetchTransactionsResult | null>('http://localhost:3000/api/v1/wallet/transactions', {
            headers: {
                Authorization: `Bearer ${access_token}`,    
                'Content-Type': 'application/json',
            },
            params: {
                page,
                limit: 10,
            },
        })
        if (response.data && response.data.success) {
            return response.data
        } else {
            console.error('Lấy danh sách giao dịch thất bại:', response.data)
            return null
        }
    } catch (error: any) {
        console.error('Error fetching transactions:', error.response?.data || error.message)
        return null
    }
  }

export interface PrivateKeyResponse {
    success: boolean
    warning: string
    data: {
        private_key: string
        address: string
    }
}

export const revertedPrivateKey = async (passphrase: string)=> {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
        console.warn('Không tìm thấy access_token')
        return null
    }
    try {
        const response = await axios.post<PrivateKeyResponse | null>('http://localhost:3000/api/v1/wallet/export-private-key',
        {
            passphrase,
        },
        {
            headers: {  
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            },
        })
        
        if (response.data?.success) {
            return response.data
        }
        else {
            console.error('Lấy private key thất bại:', response.data)  
            return null
        }
    }
    catch (error: any) {
        console.error('Error fetching private key:', error.response?.data || error.message)
        return null
    }
}
