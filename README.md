# 🏋️ LuzhouGym — 蘆洲健身房全端管理系統

> 一個使用 React + Express.js + PostgreSQL 打造的健身房官方網站與會員管理系統，支援會員註冊／登入、商品購買、LINE Pay 線上付款，並透過 Docker 容器化部署至 GCP Cloud Run。

---

## � 專案簡介

LuzhouGym 是一套為蘆洲健身房量身打造的**全端 Web 應用程式**，涵蓋以下核心功能：

- 🔐 **會員系統** — 註冊、登入、Email 驗證、忘記密碼、JWT Token 驗證
- 🛍️ **商品系統** — 商品瀏覽、加入購物車、訂單管理
- 💳 **LINE Pay 支付** — 整合 LINE Pay API 完成線上付款流程
- 👤 **會員中心** — 個人資料管理、密碼修改
- 🏫 **課程展示** — 健身課程介紹與教練資訊
- � **容器化部署** — Docker 多階段建置，部署於 GCP Cloud Run

---

## 🛠️ 技術架構

### 系統架構圖

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                   │
│                    React 18 + Bootstrap 5                │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST API
┌──────────────────────────▼──────────────────────────────┐
│                   Express.js API Server                  │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  │
│  │  Auth   │  │  Member  │  │ Product │  │ Payment  │  │
│  │ Module  │  │  Module  │  │ Module  │  │  Module  │  │
│  └────┬────┘  └────┬─────┘  └────┬────┘  └────┬─────┘  │
│       │            │             │             │         │
│  ┌────▼────────────▼─────────────▼─────────────▼─────┐  │
│  │          Services / Business Logic                │  │
│  └──────────────────────┬────────────────────────────┘  │
│                         │                               │
│  ┌──────────────────────▼────────────────────────────┐  │
│  │            Models / Data Access Layer             │  │
│  └──────────────────────┬────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────┘
                          │
          ┌───────────────▼───────────────┐
          │     PostgreSQL Database       │
          │  ┌───────────────────────┐    │
          │  │  member_info          │    │
          │  │  member_basic_info    │    │
          │  │  product_info         │    │
          │  │  order_info           │    │
          │  │  random_table (驗證碼) │    │
          │  └───────────────────────┘    │
          └───────────────────────────────┘

外部服務：
  • LINE Pay Sandbox API — 線上支付
  • Gmail SMTP — 會員驗證信 / 忘記密碼信
  • GCP Cloud Run — 容器化部署
```

### Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| **前端**     | React 18, React Router v6, Bootstrap 5, PrimeReact |
| **後端**     | Node.js 18, Express.js 4                         |
| **資料庫**   | PostgreSQL 15                                     |
| **認證**     | JWT (jsonwebtoken), bcryptjs                      |
| **支付**     | LINE Pay API v3                                   |
| **郵件**     | Nodemailer + Gmail SMTP                           |
| **部署**     | Docker, docker-compose, GCP Cloud Run             |

---

## 📁 專案結構

```
LuzhouGym/
├── public/                     # React 靜態資源
├── src/                        # 前端源碼 (React)
│   ├── pages/                  # 頁面元件
│   │   ├── MainPage.js         #   首頁
│   │   ├── Login.js            #   登入/註冊
│   │   ├── Member.js           #   會員中心
│   │   ├── Course.js           #   課程介紹
│   │   ├── Product.js          #   商品列表
│   │   ├── Order.js            #   購物車/訂單
│   │   ├── Pay.js              #   LINE Pay 回調
│   │   └── ChangePwd.js        #   修改密碼元件
│   ├── components/             # 共用元件 (Navbar, Carousel)
│   ├── hooks/                  # Custom Hooks (useAuth, useForm...)
│   ├── services/               # API 呼叫層
│   ├── utils/                  # 工具函數 (表單驗證)
│   ├── assets/                 # 圖片資源
│   ├── styles/                 # 樣式檔案
│   └── App.js                  # 路由配置
│
├── server/                     # 後端源碼 (Express)
│   ├── server.js               # 伺服器入口
│   ├── src/
│   │   ├── app.js              # Express 主程式
│   │   ├── config/             # 環境變數 & 資料庫連線配置
│   │   ├── routes/             # API 路由定義
│   │   ├── controllers/        # 請求處理器
│   │   ├── services/           # 業務邏輯
│   │   ├── models/             # 資料存取層 (SQL)
│   │   └── utils/              # 工具服務 (JWT, Email, LINE Pay)
│   └── database/
│       └── init.sql            # 資料庫初始化腳本
│
├── Dockerfile                  # 多階段建置 (前端 build → 後端 serve)
├── docker-compose.yml          # 本地開發環境 (PostgreSQL + API)
└── package.json                # 前端依賴
```

---

## 🚀 快速開始

### 前置需求

- **Node.js** >= 18
- **PostgreSQL** >= 15 (或使用 Docker)
- **Docker & Docker Compose** (選用，推薦)

### 方式一：Docker Compose (推薦)

```bash
# 1. 複製環境變數
cp .env.example .env
cp server/.env.example server/.env

# 2. 編輯 server/.env 填入實際配置值

# 3. 啟動服務 (PostgreSQL + API)
docker-compose up -d

# 4. 開啟前端開發伺服器
npm install
npm start
```

前端預設：`http://localhost:3000`
後端 API：`http://localhost:8081`

### 方式二：本地開發

```bash
# 1. 安裝前端依賴
npm install

# 2. 安裝後端依賴
cd server && npm install && cd ..

# 3. 設定環境變數
cp .env.example .env
cp server/.env.example server/.env
# 編輯 server/.env，填入 PostgreSQL 連線資訊等

# 4. 初始化資料庫
psql -U postgres -d luzhou_gym -f server/database/init.sql

# 5. 啟動後端
cd server && npm run dev

# 6. 另開終端，啟動前端
npm start
```

---

## ⚙️ 環境變數

### 前端 (`.env`)

| 變數 | 說明 | 預設值 |
|------|------|--------|
| `REACT_APP_API_URL` | API 後端位址 | `http://localhost:8081` |

### 後端 (`server/.env`)

| 變數 | 說明 | 預設值 |
|------|------|--------|
| `NODE_ENV` | 環境模式 | `development` |
| `PORT` | 伺服器端口 | `8081` |
| `DB_HOST` | 資料庫主機 | `localhost` |
| `DB_PORT` | 資料庫端口 | `5432` |
| `DB_USER` | 資料庫使用者 | `postgres` |
| `DB_PASSWORD` | 資料庫密碼 | — |
| `DB_NAME` | 資料庫名稱 | `luzhou_gym` |
| `JWT_SECRET` | JWT 密鑰 | — |
| `JWT_EXPIRES_IN` | Token 過期時間 | `24h` |
| `SMTP_SERVICE` | 郵件服務商 | `Gmail` |
| `SMTP_USER` | 寄件帳號 | — |
| `SMTP_PASSWORD` | 寄件密碼 (應用程式密碼) | — |
| `LINEPAY_CHANNEL_ID` | LINE Pay 商戶 ID | — |
| `LINEPAY_CHANNEL_SECRET_KEY` | LINE Pay 密鑰 | — |
| `LINEPAY_VERSION` | LINE Pay API 版本 | `v3` |
| `LINEPAY_SITE` | LINE Pay 端點 | Sandbox URL |

---

## 📡 API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| `POST` | `/api/register` | 會員註冊 |
| `POST` | `/api/login` | 會員登入 |
| `POST` | `/api/forgotPassword` | 忘記密碼 |
| `GET` | `/api/verify/:code` | Email 驗證 |
| `GET` | `/api/member/basic/:id` | 取得會員基本資料 |
| `PUT` | `/api/member/basic/:id` | 更新會員基本資料 |
| `GET` | `/api/product` | 取得所有商品 |
| `POST` | `/api/product/cart` | 加入購物車 |
| `GET` | `/api/order/:id` | 取得購物車內容 |
| `POST` | `/api/payment/request/:id` | 發起 LINE Pay 付款 |
| `GET` | `/api/payment/confirm` | LINE Pay 付款確認回調 |

---

## 📦 資料庫結構

| 資料表 | 說明 |
|--------|------|
| `member_info` | 會員帳號資訊 (帳號、密碼、Email、驗證狀態) |
| `member_basic_info` | 會員基本資料 (年齡、性別、電話、地址) |
| `product_info` | 商品資訊 (名稱、價格、庫存、圖片) |
| `order_info` | 訂單 / 購物車記錄 |
| `random_table` | Email 驗證碼 |

---

## 🌐 部署

本專案使用 **Docker 多階段建置**，一個 Image 即包含前後端：

```bash
# 建置 Docker Image
docker build -t luzhougym .

# 運行
docker run -p 8081:8081 --env-file server/.env luzhougym
```

生產環境中，Express 會直接 serve React 的 build 靜態檔案，無需另外部署前端。

**GCP Cloud Run 部署**：
```bash
# 推送至 Artifact Registry
docker tag luzhougym asia-east1-docker.pkg.dev/<PROJECT_ID>/luzhougym/luzhougym_api:latest
docker push asia-east1-docker.pkg.dev/<PROJECT_ID>/luzhougym/luzhougym_api:latest

# 部署至 Cloud Run
gcloud run deploy luzhougym --image asia-east1-docker.pkg.dev/<PROJECT_ID>/luzhougym/luzhougym_api:latest --region asia-east1
```

---

## � 專案說明範本

> 如果需要在報告、面試或 Portfolio 中簡短說明這個專案，可以參考以下版本：

### 一句話版本

> 使用 React + Express.js + PostgreSQL 開發的健身房全端網站，整合 LINE Pay 支付與會員系統，並透過 Docker 部署至 GCP Cloud Run。

### 簡短版（約 100 字）

> LuzhouGym 是一套全端健身房管理系統，前端使用 React 18 搭配 Bootstrap 打造響應式介面，後端以 Express.js 實作 RESTful API，資料庫採用 PostgreSQL。系統涵蓋會員註冊登入（JWT 驗證 + Email 認證）、商品瀏覽與購物車、LINE Pay 線上金流等功能，並以 Docker 多階段建置容器化部署至 GCP Cloud Run。

### 詳細版（約 200 字）

> LuzhouGym 是為蘆洲健身房開發的全端 Web 應用程式。前端採用 React 18 + React Router v6 實現 SPA，搭配 Bootstrap 5 與 PrimeReact 元件庫建立現代化使用者介面。後端使用 Express.js 搭建 RESTful API，遵循 MVC 架構模式（Routes → Controllers → Services → Models），資料庫選用 PostgreSQL。
>
> 核心功能包括：
> - **會員系統**：支援註冊、登入（JWT Token 驗證）、Email 信箱驗證、忘記密碼等完整流程
> - **商品與購物車**：商品瀏覽、加入購物車、數量調整、訂單管理
> - **LINE Pay 支付**：整合 LINE Pay API v3，實現完整的付款與確認流程
> - **DevOps**：使用 Docker 多階段建置（Multi-stage Build）打包前後端為單一映像，透過 docker-compose 管理本地開發環境，並部署至 GCP Cloud Run

### 做了哪些事（功能清單）

1. ✅ 建立 React SPA 前端，包含首頁、課程、商品、會員中心等頁面
2. ✅ 實作 Express.js RESTful API 後端，採用 MVC 分層架構
3. ✅ 設計 PostgreSQL 資料庫結構（5 張資料表 + 索引優化）
4. ✅ 實作完整會員認證流程（JWT + bcrypt 密碼加密 + Email 驗證）
5. ✅ 串接 LINE Pay API v3 實現線上支付功能
6. ✅ 使用 Nodemailer 發送驗證信與密碼重設信
7. ✅ 使用 Custom Hooks 封裝前端邏輯（useAuth, useForm, useNotification）
8. ✅ 前端表單驗證工具模組化
9. ✅ Docker 多階段建置 + docker-compose 本地開發環境
10. ✅ 部署至 GCP Cloud Run（Artifact Registry + Cloud Run）
11. ✅ 程式碼重構：從 ~40 個檔案精簡至 ~25 個，建立清晰分層結構

---

## � License

此專案為個人 Side Project，僅供學習與展示用途。
