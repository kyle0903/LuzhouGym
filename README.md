# LuzhouGym

## 簡介

本專案是參考市面上健身房網站，並基於 ReactJS 和 Express.js 開發的健身房網站，提供會員瀏覽課程資訊、購買商品、以及管理個人檔案的功能，並支援 Line Pay 線上付款

## 技術棧

- **程式語言**：JavaScript、HTML、CSS
- **前端框架**：ReactJS
- **後端框架**：Express.js
- **資料庫**：MySQL
- **版本控制**：Git

## 系統功能

- 會員管理
    - 會員註冊、登入、登出
    - 忘記密碼功能
    - 會員個人檔案與文章修改
    - 會員歷史文章與按讚內容查詢
      
- 瀏覽健身房課程與位置
    - 使用者可以查看課程內容、教練介紹以及健身房的地點資訊
      
- 商品購買
    - 支援購物車功能，輕鬆選購健身相關商品
    - **Line Pay 線上付款**：提供便利且安全的付款方式

## 安裝與使用

### 1. 環境需求

- Node.js (推薦使用 LTS 版本)
- MySQL
- Git

### 2. 安裝步驟

1. Clone 專案至本地端
    
    ```bash
    git clone https://github.com/kyle0903/LuzhouGym.git
    cd LuzhouGym
    
    ```
    
2. 安裝前端相依套件：
    
    ```bash
    npm install
    ```
    
3. **安裝後端相依套件**：
    
    ```bash
    cd server
    npm install
    ```
    

### 3. 模型系統

- CommonJS(若要使用ES6標準，在package.json加上type:”module”
- 以下為模型系統差異：
    
    
    | 特性 | `require` | `import` |
    | --- | --- | --- |
    | 語法 | `const module = require('module')` | `import module from 'module'` |
    | 模組系統 | CommonJS (CJS) | ES Modules (ESM) |
    | 執行時機 | 動態載入 (運行時解析) | 靜態載入 (編譯時解析) |
    | 適用環境 | Node.js (預設 CommonJS) | ES6+ (現代前端, Node.js 需 `type: "module"` 或 `.mjs` 副檔名) |

### 4. 資料庫設定

- 更新 `server/config/config.js` 中的資料庫連線設定
- 確保 MySQL 正常運行，以及能夠與資料庫連線

### 5. 資料庫結構

- **member_info**
    
    用於存儲會員的基本資訊及帳號認證狀態。
    
    - **id** (INT, PRIMARY KEY) - 會員唯一識別碼
    - **user** (VARCHAR) - 帳號名稱
    - **password** (VARCHAR) - 密碼（加密儲存）
    - **email** (VARCHAR) - 電子郵件
    - **create_date** (DATETIME) - 帳號創建時間
    - **vertify** (TINYINT) - 帳號是否已驗證 (0: 未驗證, 1: 已驗證)

---

- **random_table**
    
    用於存儲用戶認證與忘記密碼的驗證碼。
    
    - **id** (INT, PRIMARY KEY)
    - **user_id** (INT, FOREIGN KEY) - 對應 `member_info.id`
    - **randomCode** (VARCHAR) - 隨機碼，用於認證或忘記密碼驗證

---

- **member_basic_info**
    
    存儲會員的額外個人資訊，例如大頭貼與身體數據。
    
    - **user_id** (INT, PRIMARY KEY, FOREIGN KEY) - 對應 `member_info.id`
    - **image** (VARCHAR) - 大頭貼圖片路徑
    - **gender** (VARCHAR) - 性別
    - **age** (INT) - 年齡
    - **height** (FLOAT) - 身高
    - **weight** (FLOAT) - 體重

---

- **product_info**
    
    用於存儲健身房商品的相關資訊。
    
    - **id** (INT, PRIMARY KEY) - 商品唯一識別碼
    - **name** (VARCHAR) - 商品名稱
    - **price** (FLOAT) - 商品價格
    - **quantity** (INT) - 庫存數量

---

- **order_info**
    
    儲存用戶購物車及訂單的資訊，包括與 Line Pay 的支付狀態。
    
    - **cart_id** (INT, PRIMARY KEY) - 購物車或訂單唯一識別碼
    - **user_id** (INT, FOREIGN KEY) - 對應 `member_info.id`
    - **product_id** (INT, FOREIGN KEY) - 對應 `product_info.id`
    - **product_name** (VARCHAR) - 商品名稱
    - **product_price** (FLOAT) - 商品單價
    - **quantity** (INT) - 購買數量
    - **total** (FLOAT) - 訂單總價
    - **product_pic** (VARCHAR) - 商品圖片路徑
    - **pay** (TINYINT) - 支付狀態 (0: 未支付, 1: 已支付)

### 6. 伺服器啟動

- 前端： `http://localhost:3000`
    
    ```bash
    npm run start
    ```
    
- 後端 API： `http://localhost:8081`
    
    ```bash
    cd server
    npm run start
    ```
