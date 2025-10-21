import { useState } from "react";
import api from "../services/api";
import { useNotification } from "./useNotification";

/**
 * 支付相關操作 Hook
 */
export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  /**
   * 初始化 LINE Pay
   */
  const initiateLinePay = async (userId) => {
    setLoading(true);
    try {
      const response = await api.payment.initiateLinePay(userId);

      if (response.data.status === "success" && response.data.urls) {
        return response.data.urls;
      } else {
        showError("取得支付連結失敗", response.data.message || "未知錯誤");
        return null;
      }
    } catch (error) {
      showError(
        "初始化支付失敗",
        error.response?.data?.message || error.message
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 確認 LINE Pay 支付
   */
  const confirmLinePay = async (data, onSuccess, onError) => {
    setLoading(true);
    try {
      const response = await api.payment.confirmLinePay(data);
      if (response.data.status === "success") {
        showSuccess("通知", response.data.message);
        onSuccess?.(response.data);
      } else {
        showError(response.data.message);
        onError?.();
      }
    } catch (error) {
      showError("支付確認失敗", error.message);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    initiateLinePay,
    confirmLinePay,
  };
};
