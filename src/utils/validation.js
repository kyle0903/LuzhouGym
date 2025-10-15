/**
 * 表單驗證工具
 * 統一的驗證規則
 */

export const validators = {
  /**
   * 檢查是否為空
   */
  required: (value, fieldName = '此欄位') => {
    if (!value || value.toString().trim() === '') {
      return `${fieldName}為必填`;
    }
    return null;
  },

  /**
   * 檢查 Email 格式
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return '請輸入有效的電子郵件';
    }
    return null;
  },

  /**
   * 檢查最小長度
   */
  minLength: (value, min) => {
    if (value && value.length < min) {
      return `最少需要 ${min} 個字元`;
    }
    return null;
  },

  /**
   * 檢查密碼一致性
   */
  passwordMatch: (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return '密碼不一致';
    }
    return null;
  },

  /**
   * 檢查是否包含空格
   */
  noSpaces: (value) => {
    if (value && /\s/.test(value)) {
      return '不可包含空格';
    }
    return null;
  },
};

/**
 * 驗證登入表單
 */
export const validateLogin = (user, pwd) => {
  const errors = [];

  if (!user || !pwd) {
    errors.push('有空值未填寫');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 驗證註冊表單
 */
export const validateRegister = (user, pwd, pwdCheck, mail) => {
  const errors = [];

  if (!user || !pwd || !pwdCheck || !mail) {
    errors.push('有空值未填寫');
    return { isValid: false, errors };
  }

  const emailError = validators.email(mail);
  if (emailError) {
    errors.push(emailError);
  }

  const passwordMatchError = validators.passwordMatch(pwd, pwdCheck);
  if (passwordMatchError) {
    errors.push(passwordMatchError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 驗證忘記密碼表單
 */
export const validateForgotPassword = (user, mail) => {
  const errors = [];

  if (!user || !mail) {
    errors.push('有空值未填寫');
    return { isValid: false, errors };
  }

  const emailError = validators.email(mail);
  if (emailError) {
    errors.push(emailError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 驗證重設密碼表單
 */
export const validateResetPassword = (pwd, pwdCheck) => {
  const errors = [];

  if (!pwd || !pwdCheck) {
    errors.push('有空值未填寫');
    return { isValid: false, errors };
  }

  const passwordMatchError = validators.passwordMatch(pwd, pwdCheck);
  if (passwordMatchError) {
    errors.push(passwordMatchError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
