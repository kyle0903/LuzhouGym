import { useState } from 'react';
import api from '../services/api';
import { useNotification } from './useNotification';

/**
 * 產品和購物車相關操作 Hook
 */
export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { showSuccess, showError } = useNotification();

  /**
   * 取得所有產品
   */
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await api.product.getAll();
      setProducts(response.data);
      return response.data;
    } catch (error) {
      showError('取得產品列表失敗', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * 加入購物車
   */
  const addToCart = async (data, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.product.addToCart(data);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('加入購物車失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 取得購物車數量
   */
  const getCartCount = async (userId) => {
    try {
      const response = await api.product.getCart(userId);
      const count = response.data?.length || 0;
      setCartCount(count);
      return count;
    } catch (error) {
      console.error('取得購物車數量失敗:', error);
      return 0;
    }
  };

  return {
    loading,
    products,
    cartCount,
    getAllProducts,
    addToCart,
    getCartCount,
  };
};
