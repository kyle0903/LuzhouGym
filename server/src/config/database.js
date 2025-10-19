const { Pool } = require('pg');
const config = require('./env');

// 建立 PostgreSQL 連線池
const pool = new Pool(config.database);

// 資料庫連線重試函數
const connectWithRetry = async (retries = 5, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ Database connected successfully');
      return true;
    } catch (err) {
      console.log(`❌ Database connection attempt ${i + 1} failed:`, err.message);
      
      if (i === retries - 1) {
        console.error('❌ Database connection failed after all retries');
        throw err;
      }
      
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// 立即嘗試連線（非阻塞）
connectWithRetry().catch(err => {
  console.error('❌ Failed to connect to database:', err.message);
});

// 包裝成 Promise 方便使用
const query = async (sql, params) => {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  pool,
  query,
  connectWithRetry,
};
