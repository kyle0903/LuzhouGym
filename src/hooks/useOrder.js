import { useState } from 'react';
import api from '../services/api';
import { useNotification } from './useNotification';

/**
 * 訂單相關操作 Hook
 */
export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { showSuccess, showError } = useNotification();

  /**
   * 取得訂單列表（未付款）
   */
  const getOrders = async (userId) => {
    setLoading(true);
    try {
      const response = await api.product.getCart(userId);
      setOrders(response.data);
      return response.data;
    } catch (error) {
      showError('取得訂單失敗', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * 取得購買記錄（已付款）
   */
  const getPurchaseHistory = async (userId) => {
    setLoading(true);
    try {
      const response = await api.product.getPurchaseHistory(userId);
      return response.data;
    } catch (error) {
      showError('取得購買記錄失敗', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * 刪除訂單
   */
  const deleteOrder = async (cartId, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.product.removeFromCart(cartId);
      console.log(response.data)
      if (response.data.status === 'success') {
        console.log(response.data.message)
        showSuccess('通知', response.data.message);
        // 從本地狀態移除
        setOrders((prev) => prev.filter((order) => order.cart_id !== cartId));
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('刪除訂單失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    orders,
    getOrders,
    getPurchaseHistory,
    deleteOrder,
  };
};
