import { useState } from 'react';
import api from '../services/api';
import { useNotification } from './useNotification';

/**
 * 統一的認證 Hook
 * 整合所有認證相關邏輯
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  /**
   * 註冊
   */
  const register = async (userData, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.auth.register(userData);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('註冊失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 登入
   */
  const login = async (credentials, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.auth.login(credentials);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        // 儲存 token
        localStorage.setItem('token', response.data.token);
        onSuccess?.(response.data);
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('登入失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 忘記密碼 - 發送驗證碼
   */
  const forgotPassword = async (data, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.auth.forgotPassword(data);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('操作失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 重設密碼
   */
  const resetPassword = async (data, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.auth.resetPassword(data);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('操作失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 驗證 Token
   */
  const verifyToken = async (token) => {
    try {
      const response = await api.auth.verifyToken(token);
      return response.data;
    } catch (error) {
      return false;
    }
  };

  /**
   * 登出
   */
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return {
    loading,
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyToken,
    logout,
  };
};
