FROM node:18-alpine

WORKDIR /app

# 安裝必要的套件
RUN apk add --no-cache curl

# 先複製 package.json
COPY package*.json ./

# 安裝依賴
RUN npm install --verbose

# 檢查 node_modules 是否存在
RUN ls -la node_modules/ | head -10

# 複製其餘檔案
COPY . .

# 設定環境變數
ENV HOST=mysql.railway.internal
ENV USER=root
ENV PWD=eauLxChLWkTXdiffleYawVxHYSbBRyKh
ENV DATABASE=railway
ENV PORT=3306
ENV URL=http://localhost:8081

EXPOSE 8081
CMD ["node", "index.js"]
