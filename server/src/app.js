const express = require('express');
const cors = require('cors');
const path = require('path');

// 引入路由
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// 引入配置
const config = require('./config/env');
require('./config/database'); // 初始化資料庫連線

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 服務 React 靜態檔案
app.use(express.static(path.join(__dirname, '../build')));

// API 路由
app.use('/api', authRoutes);
app.use('/api', memberRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);

// 處理 React Router (所有非 API 路由都返回 index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

module.exports = app;