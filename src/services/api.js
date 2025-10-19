import axios from 'axios';

// API 基礎 URL (生產環境會自動使用相同域名)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 請求攔截器 (可以在這裡添加 token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API 端點常數
export const API_ENDPOINTS = {
  // 基礎 URL
  HOME: process.env.REACT_APP_API_URL || 'http://localhost:3000',

  // 認證相關
  SIGN: `${API_BASE_URL}/api/sign`,
  SIGN_ENABLE: `${API_BASE_URL}/api/signEnable`,
  LOGIN: `${API_BASE_URL}/api/login`,
  TOKEN: `${API_BASE_URL}/api/token`,
  FORGETPWD: `${API_BASE_URL}/api/forgetPwd`,
  GETCODE: `${API_BASE_URL}/api/getCode`,
  FORGETPWD_UPDATE: `${API_BASE_URL}/api/forgetPwdUpdate`,
  CHANGEPWD: `${API_BASE_URL}/api/changepwd`,

  // 會員相關
  MEMBER: `${API_BASE_URL}/api/basicmember`,
  UPDATE: `${API_BASE_URL}/api/update`,

  // 產品相關
  PRODUCT: `${API_BASE_URL}/api/product`,
  ADDCART: `${API_BASE_URL}/api/addcart`,
  ORDER: `${API_BASE_URL}/api/order`,

  // 支付相關
  LINEPAY: `${API_BASE_URL}/api/linepay`,
};

// API 服務
const api = {
  // 認證相關
  auth: {
    register: (data) => apiClient.post('/sign', data),
    login: (data) => apiClient.post('/login', data),
    verifyToken: (token) => apiClient.post('/token', { token }),
    verifyAccount: (validcode) => apiClient.get(`/signEnable/${validcode}`),
    forgotPassword: (data) => apiClient.post('/forgetPwd', data),
    getResetCode: (forgetCode) => apiClient.get(`/getCode/${forgetCode}`),
    resetPassword: (data) => apiClient.post('/forgetPwdUpdate', data),
    changePassword: (data) => apiClient.post('/changepwd', data),
  },

  // 會員相關
  member: {
    getBasicInfo: (id) => apiClient.get(`/basicmember/${id}`),
    updateBasicInfo: (id, data) => apiClient.post(`/update/${id}`, data),
  },

  // 產品相關
  product: {
    getAll: () => apiClient.get('/product'),
    addToCart: (data) => apiClient.post('/addcart', data),
    getCart: (id) => apiClient.get(`/order/${id}`),
    removeFromCart: (cartId) => apiClient.delete(`/order/delete/${cartId}`),
  },

  // 支付相關
  payment: {
    initiateLinePay: (id) => apiClient.get(`/linepay/${id}`),
    confirmLinePay: (data) => apiClient.post('/linepay/confirm', data),
  },
};

export default api;