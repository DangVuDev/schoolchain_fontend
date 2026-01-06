// types/auth.types.ts
export interface LoginCredentials {
  student_id: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    wallet_address: string;
    encrypted_private_key: string;
    iv: string;
    salt: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    wallet_address: string;
    private_key: string;
    encrypted_private_key: string;
    iv: string;
    salt: string;
    auth_tag: string;
  };
}


// services/auth.service.ts (hoặc đặt trực tiếp trong component cũng được)
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth/login';

export const post_login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {

    console.log('Attempting login with credentials:', credentials);

    const response = await axios.post<LoginResponse>(
      API_URL,
      {
        student_id: credentials.student_id,
        password: credentials.password,
      },
      {
        headers: {
          'Content-Type': 'application/json', // ← Đảm bảo có header này
        },
      } // ← ĐÓNG ĐÚNG DẤU NGOẶC Ở ĐÂY, KHÔNG ĐƯỢC THIẾU!
    );
    

    if (response.data.success) {
      const { data } = response.data;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('wallet_address', data.wallet_address);
      localStorage.setItem('encrypted_private_key', data.encrypted_private_key);
      localStorage.setItem('iv', data.iv);
      localStorage.setItem('salt', data.salt);
      localStorage.setItem('user_session', JSON.stringify(data));
    }

    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const post_register = async (data: any): Promise<RegisterResponse> => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/auth/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.success) {
      const resData = response.data.data;
      localStorage.setItem('access_token', resData.access_token);
      localStorage.setItem('refresh_token', resData.refresh_token);
      localStorage.setItem('wallet_address', resData.wallet_address);
      localStorage.setItem('encrypted_private_key', resData.encrypted_private_key);
      localStorage.setItem('iv', resData.iv);
      localStorage.setItem('salt', resData.salt);
      localStorage.setItem('auth_tag', resData.auth_tag);
      localStorage.setItem('user_session', JSON.stringify(resData));
    }
    return response.data;
  } catch (error: any) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};