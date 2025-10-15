const mysql = require('mysql');
const config = require('./env');

// 建立連線池 (比單一連線更有效率)
const pool = mysql.createPool(config.database);

// 測試連線
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    return;
  }
  console.log('✅ Database connected successfully');
  connection.release();
});

// 包裝成 Promise 方便使用
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  pool,
  query,
};
