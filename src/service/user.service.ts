// src/services/user.service.ts hoặc src/api/user.api.ts

import axios from 'axios'

export interface UserInfoResponse {
  success: boolean
  data: {
    _id: string
    student_id: string
    full_name: string
    email: string
    phone?: string // phone có thể null
    role: 'student' | 'admin' | 'finance' | 'teacher' | 'education'
    created_at?: string
  }
}

// Hàm lấy thông tin user hiện tại từ backend
export const getUserInfoFormServer = async (): Promise<UserInfoResponse | null> => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    console.warn('Không tìm thấy access_token')
    return null
  }

  try {
    const response = await axios.get<UserInfoResponse>('http://localhost:3000/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.data.success) {
      return response.data // ← Trả về thông tin user
    } else {
      console.error('Lấy thông tin user thất bại:', response.data)
      return null
    }
  } catch (error: any) {
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

export const getUserFromStudentId = async (studentId: string): Promise<UserInfoResponse | null> => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    console.warn('Không tìm thấy access_token')
    return null
  }
  try {
    const response = await axios.get<UserInfoResponse>(`http://localhost:3000/api/v1/user/profile/${studentId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.data.success) {
      return response.data // ← Trả về thông tin user
    }
    else {
      console.error('Lấy thông tin user thất bại:', response.data)
      return null
    }
  } catch (error: any) {
    console.error('Error fetching user info by student ID:', error.response?.data || error.message)
    return null
  }
}

// Hàm tạo anonymous user mặc định
const createAnonymousUser = (address: string): UserInfoResponse => {
  return {
    success: true,
    data: {
      _id: 'anonymous-' + address.toLowerCase().slice(0, 12), // tạo _id giả dựa trên address
      student_id: 'anonymous',
      full_name: 'Anonymous User',
      email: 'anonymous@example.com',
      phone: "",
      role: 'student', // có thể thay đổi thành role mặc định phù hợp với app của bạn
      created_at: new Date().toISOString(),
    },
  }
}

export const getUserFromAddress = async (address: string): Promise<UserInfoResponse> => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    console.warn('Không tìm thấy access_token → trả về anonymous user')
    return createAnonymousUser(address)
  }

  try {
    // ⚠️ THAY ĐỔI QUAN TRỌNG: Dùng relative path thay vì localhost
    const response = await axios.get<UserInfoResponse>(
      `/api/v1/user/profile/${address}`,  // ← Bỏ http://localhost:3000
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.success) {
      return response.data
    } else {
      console.warn('API success: false → dùng anonymous', response.data)
      return createAnonymousUser(address)
    }
  } catch (error: any) {
    // Cải thiện log để dễ debug
    if (error.message === 'Network Error') {
      console.error('🌐 Network Error: Không thể kết nối đến backend. Kiểm tra URL và backend có đang chạy không.')
      console.error('Current origin:', window.location.origin)
    } else {
      console.error('Error fetching user info:', error.response?.data || error.message)
    }
    return createAnonymousUser(address)
  }
}
export const updatePinCodeUsingOldPin = async (oldPin: string, newPin: string): Promise<any> => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    console.warn('Không tìm thấy access_token')
    return null
  }
  try {
    const response = await axios.put<any>('http://localhost:3000/api/v1/user/passphrase/update_using_old', 
    { 
      old_passphrase: oldPin,
      new_passphrase: newPin, 
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Error updating pin code:', error.response?.data || error.message)
    return null
  }
};

export const updatePinCodeUsingPrivateKey = async (privateKey: string, newPin: string): Promise<any> => {
  const access_token = localStorage.getItem('access_token')
  if (!access_token) {
    console.warn('Không tìm thấy access_token')
    return null
  }
  try {
    const response = await axios.put<any>('http://localhost:3000/api/v1/user/passphrase/update_using_private_key', 
    { 
      private_key: privateKey,
      new_passphrase: newPin, 
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Error updating pin code:', error.response?.data || error.message)
    return null
  }
};