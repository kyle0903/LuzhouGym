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
        setLoading(false);
      } else {
        showError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      showError('註冊失敗', error.message);
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
        // 成功時保持 loading，直到跳轉完成
        onSuccess?.(response.data);
      } else {
        showError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      showError('登入失敗', error.message);
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
        // 成功時保持 loading，直到跳轉完成
        onSuccess?.();
      } else {
        showError(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      showError('操作失敗', error.message);
      setLoading(false);
    }
  };

  /**
   * 驗證帳號 (透過 email 驗證碼)
   */
  const verifyAccount = async (validcode, onSuccess, onError) => {
    try {
      const response = await api.auth.verifyAccount(validcode);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        onSuccess?.();
      } else {
        showError('警告', response.data.message);
        onError?.();
      }
    } catch (error) {
      showError('驗證失敗', error.message);
      onError?.();
    }
  };

  /**
   * 取得重設密碼資訊
   */
  const getResetCode = async (forgetCode, onSuccess, onError) => {
    try {
      const response = await api.auth.getResetCode(forgetCode);
      if (response.data.status === 'success') {
        onSuccess?.(response.data);
      } else {
        showError('警告', response.data.message);
        onError?.();
      }
    } catch (error) {
      showError('操作失敗', error.message);
      onError?.();
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
   * 變更密碼
   */
  const changePassword = async (data, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.auth.changePassword(data);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        // 成功時保持 loading，直到跳轉完成
        onSuccess?.();
      } else {
        showError('警告', response.data.message);
        setLoading(false);
      }
    } catch (error) {
      showError('操作失敗', error.message);
      setLoading(false);
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
    verifyAccount,
    getResetCode,
    verifyToken,
    changePassword,
    logout,
  };
};
