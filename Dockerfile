# ================================
# 多階段構建 Dockerfile
# 適用於 GCP Cloud Run 或其他容器平台
# ================================

# ============ 階段 1: 建置前端 ============
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 複製前端 package 檔案
COPY package*.json ./

# 安裝前端依賴
RUN npm ci --only=production

# 複製前端源碼
COPY public ./public
COPY src ./src

# 建置前端 (會生成 build 資料夾)
RUN npm run build

# ============ 階段 2: 準備後端 ============
FROM node:18-alpine AS backend-builder

WORKDIR /app/server

# 複製後端 package 檔案
COPY server/package*.json ./

# 安裝後端依賴 (包含生產環境依賴)
RUN npm ci --only=production

# ============ 階段 3: 最終映像 ============
FROM node:18-alpine

# 安裝 supervisord
RUN apk add --no-cache supervisor

WORKDIR /app

# 複製後端代碼
COPY --from=backend-builder /app/server/node_modules ./server/node_modules
COPY server ./server

# 複製前端建置檔案到後端 build 目錄
COPY --from=frontend-builder /app/build ./server/build

# 複製 supervisord 配置
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 建立日誌目錄
RUN mkdir -p /var/log/supervisor

# 暴露端口 (預設 8081,但 Cloud Run 會使用 PORT 環境變數)
ENV PORT=8081
EXPOSE 8081

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${PORT}/api/product', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 使用 supervisord 啟動
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]