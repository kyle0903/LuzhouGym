import { useState } from 'react';

/**
 * 統一的表單管理 Hook
 * 減少重複的 useState
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    // 清除該欄位的錯誤
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const setValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const validate = (rules) => {
    const newErrors = {};

    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = values[field];

      // 必填驗證
      if (rule.required && !value) {
        newErrors[field] = rule.message || `${field} 為必填`;
        return;
      }

      // 最小長度驗證
      if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = rule.message || `最少需要 ${rule.minLength} 個字元`;
        return;
      }

      // Email 驗證
      if (rule.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field] = rule.message || '請輸入有效的電子郵件';
        }
      }

      // 自訂驗證函數
      if (rule.validator && typeof rule.validator === 'function') {
        const error = rule.validator(value, values);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    setValue,
    reset,
    validate,
  };
};
