import { useState } from 'react';
import api from '../services/api';
import { useNotification } from './useNotification';

/**
 * 會員相關操作 Hook
 */
export const useMember = () => {
  const [loading, setLoading] = useState(false);
  const [memberData, setMemberData] = useState(null);
  const { showSuccess, showError } = useNotification();

  /**
   * 取得會員基本資料
   */
  const getMemberInfo = async (id) => {
    setLoading(true);
    try {
      const response = await api.member.getBasicInfo(id);
      setMemberData(response.data);
      return response.data;
    } catch (error) {
      showError('取得會員資料失敗', error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 更新會員基本資料
   */
  const updateMemberInfo = async (id, data, onSuccess) => {
    setLoading(true);
    try {
      const response = await api.member.updateBasicInfo(id, data);
      if (response.data.status === 'success') {
        showSuccess('通知', response.data.message);
        setMemberData(response.data.data);
        onSuccess?.();
      } else {
        showError(response.data.message);
      }
    } catch (error) {
      showError('更新失敗', error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    memberData,
    getMemberInfo,
    updateMemberInfo,
  };
};
