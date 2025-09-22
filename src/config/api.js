// API 配置檔案
const API_URL = "http://localhost:8081";

// API 端點配置
const API_ENDPOINTS = {
  HOME: `${API_URL}/`,
  SIGN: `${API_URL}/api/sign`,
  LOGIN: `${API_URL}/api/login`,
  TOKEN: `${API_URL}/api/token`,
  MEMBER: `${API_URL}/api/basicmember`,
  ORDER: `${API_URL}/api/order`,
  CHANGEPWD: `${API_URL}/api/changepwd`,
  PRODUCT: `${API_URL}/api/product`,
  ADDCART: `${API_URL}/api/addcart`,
  LINEPAY: `${API_URL}/api/linepay`,
  FORGETPWD: `${API_URL}/api/forgetPwd`,
  FORGETPWD_UPDATE: `${API_URL}/api/forgetPwdUpdate`,
  GETCODE: `${API_URL}/api/getCode`,
  SIGN_ENABLE: `${API_URL}/api/signEnable`
};

// 導出
export { API_URL, API_ENDPOINTS };
export default API_URL;
