import { useRef } from 'react';

/**
 * 統一的通知 Hook
 * 取代重複的 Toast 邏輯
 */
export const useNotification = () => {
  const toastRef = useRef(null);

  const showSuccess = (message, detail = '') => {
    toastRef.current?.show({
      severity: 'success',
      summary: message,
      detail,
      life: 3000,
    });
  };

  const showError = (message, detail = '') => {
    toastRef.current?.show({
      severity: 'error',
      summary: '警告',
      detail: detail || message,
      life: 3000,
    });
  };

  const showInfo = (message, detail = '') => {
    toastRef.current?.show({
      severity: 'info',
      summary: '通知',
      detail: detail || message,
      life: 3000,
    });
  };

  return {
    toastRef,
    showSuccess,
    showError,
    showInfo,
  };
};
