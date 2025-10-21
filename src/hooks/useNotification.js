/**
 * Unified notification hook that shares a single Toast ref across the app.
 */
const toastRef = { current: null };

const showToast = (severity, summary, detail) => {
  toastRef.current?.show({
    severity,
    summary,
    detail: detail !== undefined && detail !== null && detail !== "" ? detail : summary,
    life: 3000,
  });
};

export const useNotification = () => {
  const showSuccess = (summary, detail = "") =>
    showToast("success", summary, detail);

  const showError = (summary, detail = "") =>
    showToast("error", summary, detail);

  const showInfo = (summary, detail = "") =>
    showToast("info", summary, detail);

  const showWarn = (summary, detail = "") =>
    showToast("warn", summary, detail);

  return {
    toastRef,
    showSuccess,
    showError,
    showInfo,
    showWarn,
  };
};
