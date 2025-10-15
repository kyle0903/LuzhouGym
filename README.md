# 前端檔案結構說明

## 📁 目錄結構

```
src/
├── pages/                    # 📄 頁面元件
│   ├── MainPage.js          # 首頁
│   ├── Login.js             # 登入/註冊頁面
│   ├── Member.js            # 會員中心頁面
│   ├── Course.js            # 課程介紹頁面
│   ├── Product.js           # 商品列表頁面
│   ├── Order.js             # 購物車/訂單頁面
│   ├── Pay.js               # LINE Pay 支付確認頁面
│   ├── ChangePwd.js         # 修改密碼元件
│   └── index.js             # 統一導出
│
├── components/              # 🧩 共用元件
│   ├── Navbar.js            # 導航列 (原 Navbarr.js)
│   ├── Carousel/            # 輪播圖元件
│   │   ├── HomeCarousel.js  # 首頁輪播 (原 NavPic.js)
│   │   └── CourseCarousel.js # 課程輪播 (原 CoursePic.js)
│   └── index.js             # 統一導出
│
├── hooks/                   # 🪝 Custom Hooks
│   ├── useAuth.js           # 認證相關 (登入、註冊、忘記密碼)
│   ├── useNotification.js   # 通知管理 (Toast)
│   ├── useForm.js           # 表單狀態管理
│   └── index.js             # 統一導出
│
├── services/                # 🔌 API 服務
│   └── api.js               # 統一的 API 呼叫
│
├── utils/                   # 🛠️ 工具函數
│   ├── validation.js        # 表單驗證工具
│   └── index.js             # 統一導出
│
├── assets/                  # 🖼️ 靜態資源
│   └── images/              # 圖片資源 (原 pic/)
│       ├── gymNavPic_1.jpg  # 首頁輪播圖1
│       ├── gymNavPic_2.jpg  # 首頁輪播圖2
│       ├── gymNavPic_3.jpg  # 首頁輪播圖3
│       ├── coursePic1.jpeg  # 課程輪播圖1
│       ├── coursePic2.jpeg  # 課程輪播圖2
│       ├── coursePic3.jpeg  # 課程輪播圖3
│       ├── course1.jpeg     # 課程照片
│       ├── course2.jpeg
│       ├── course3.jpeg
│       ├── coach1.png       # 教練照片
│       ├── coach2.png
│       ├── coach3.png
│       ├── company.jpeg     # 公司/場地照片
│       ├── gymLogo.png      # Logo
│       └── uploadIcon.png   # 上傳圖示
│
├── styles/                  # 🎨 樣式檔案
│   ├── index.css            # 全域基礎樣式
│   ├── App.css              # App 樣式
│   └── custom.css           # 自訂樣式 (原 test.css)
│
├── App.js                   # 主應用,路由配置
└── index.js                 # React 入口
```

---

## 📝 各檔案功能說明

### Pages (頁面元件)

#### 1. MainPage.js
- **功能**: 網站首頁
- **包含**:
  - 導航列 (Navbar)
  - 輪播圖 (HomeCarousel)
  - 公司介紹
  - 教練介紹
- **路由**: `/`

#### 2. Login.js
- **功能**: 會員登入/註冊頁面
- **包含**:
  - 登入表單
  - 註冊表單
  - 忘記密碼功能
- **路由**:
  - `/login` - 登入頁面
  - `/login/:validcode` - 信箱驗證
  - `/login/forgetPwd/:forgetCode` - 重設密碼

#### 3. Member.js
- **功能**: 會員中心
- **包含**:
  - 個人資料顯示/編輯
  - 修改密碼 (ChangePwd 元件)
- **路由**: `/member/:id`

#### 4. Course.js
- **功能**: 課程介紹頁面
- **包含**:
  - 課程輪播圖 (CourseCarousel)
  - 課程詳細介紹
- **路由**: `/course`

#### 5. Product.js
- **功能**: 商品列表頁面
- **包含**:
  - 商品展示
  - 加入購物車功能
- **路由**: `/product`

#### 6. Order.js
- **功能**: 購物車/訂單頁面
- **包含**:
  - 購物車列表
  - 刪除商品
  - 結帳功能 (LINE Pay)
- **路由**: `/order/:id`

#### 7. Pay.js
- **功能**: LINE Pay 支付確認頁面
- **包含**:
  - 處理 LINE Pay 回調
  - 確認訂單
- **路由**: `/linepay/confirm`

#### 8. ChangePwd.js
- **功能**: 修改密碼元件
- **說明**: 在 Member.js 中使用,不是獨立頁面

---

### Components (共用元件)

#### 1. Navbar.js
- **功能**: 網站導航列
- **使用**: 所有頁面共用

#### 2. HomeCarousel.js
- **功能**: 首頁輪播圖
- **圖片**: gymNavPic_1/2/3.jpg

#### 3. CourseCarousel.js
- **功能**: 課程頁面輪播圖
- **圖片**: coursePic1/2/3.jpeg

---

### Hooks (Custom Hooks)

#### 1. useAuth.js
- **功能**: 認證相關邏輯
- **包含**:
  - `register()` - 註冊
  - `login()` - 登入
  - `forgotPassword()` - 忘記密碼
  - `resetPassword()` - 重設密碼
  - `verifyToken()` - 驗證 Token
  - `logout()` - 登出

#### 2. useNotification.js
- **功能**: 通知管理
- **包含**:
  - `showSuccess()` - 成功通知
  - `showError()` - 錯誤通知
  - `showInfo()` - 一般通知

#### 3. useForm.js
- **功能**: 表單狀態管理
- **包含**:
  - `handleChange()` - 更新欄位
  - `validate()` - 驗證表單
  - `reset()` - 重置表單

---

### Services (API 服務)

#### api.js
- **功能**: 統一的 API 呼叫
- **包含**:
  - `api.auth.*` - 認證相關 API
  - `api.member.*` - 會員相關 API
  - `api.product.*` - 產品相關 API
  - `api.payment.*` - 支付相關 API

---

### Utils (工具函數)

#### validation.js
- **功能**: 表單驗證工具
- **包含**:
  - `validators.*` - 驗證器
  - `validateLogin()` - 登入表單驗證
  - `validateRegister()` - 註冊表單驗證
  - `validateForgotPassword()` - 忘記密碼驗證

---

## 🚀 使用方式

### 1. 導入頁面元件

```javascript
// 方式 1: 單獨導入
import MainPage from './pages/MainPage';

// 方式 2: 從 index.js 統一導入 (推薦)
import { MainPage, Login, Member } from './pages';
```

### 2. 導入共用元件

```javascript
// 方式 1: 單獨導入
import Navbar from './components/Navbar';

// 方式 2: 從 index.js 統一導入 (推薦)
import { Navbar, HomeCarousel } from './components';
```

### 3. 使用 Hooks

```javascript
import { useAuth, useNotification, useForm } from './hooks';

function MyComponent() {
  const { login } = useAuth();
  const { showSuccess } = useNotification();
  const form = useForm({ user: '', pwd: '' });

  // ...
}
```

### 4. 使用 API 服務

```javascript
import api from './services/api';

// 認證
await api.auth.login({ user, pwd });

// 會員
await api.member.getBasicInfo(id);

// 產品
await api.product.getAll();

// 支付
await api.payment.initiateLinePay(id);
```

### 5. 使用驗證工具

```javascript
import { validateLogin, validators } from './utils';

const { isValid, errors } = validateLogin(user, pwd);
if (!isValid) {
  console.error(errors[0]);
}
```

---

## 📊 重構前後對比

| 項目 | 重構前 | 重構後 | 改進 |
|------|--------|--------|------|
| **總檔案數** | ~40 個 | ~25 個 | ⬇️ 37.5% |
| **目錄結構** | 扁平化 | 分層清晰 | ✅ |
| **無用檔案** | 6 個 | 0 個 | ✅ |
| **元件命名** | 不統一 | 統一規範 | ✅ |
| **路徑管理** | 分散 | 集中管理 | ✅ |
| **可維護性** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |

---

## 🔍 找檔案指南

**需要修改首頁?** → `src/pages/MainPage.js`

**需要修改登入?** → `src/pages/Login.js`

**需要修改導航列?** → `src/components/Navbar.js`

**需要修改 API?** → `src/services/api.js`

**需要修改驗證邏輯?** → `src/utils/validation.js`

**需要添加新頁面?** → 放在 `src/pages/`

**需要添加新元件?** → 放在 `src/components/`

**需要添加新圖片?** → 放在 `src/assets/images/`

---

## ⚠️ 注意事項

1. **不要直接修改 `index.js` 導出檔案**
   - 這些檔案僅用於統一導出
   - 修改實際的元件檔案即可

2. **圖片路徑**
   - 所有圖片都在 `src/assets/images/`
   - 使用相對路徑導入: `import pic from '../assets/images/xxx.jpg'`

3. **樣式檔案**
   - 全域樣式在 `src/styles/`
   - 元件特定樣式可以放在元件旁邊

4. **新增檔案時記得更新 index.js**
   - 例如新增頁面後,更新 `src/pages/index.js`

---

## 📚 相關文檔

- [後端重構指南](../server/README.md)
- [前端重構指南](../FRONTEND_REFACTOR.md)
- [清理計畫](../CLEANUP_PLAN.md)
- [遷移指南](../MIGRATION_GUIDE.md)
