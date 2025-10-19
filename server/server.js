const app = require('./src/app');
const config = require('./src/config/env');
const { connectWithRetry } = require('./src/config/database');

const PORT = config.port;

// 等待資料庫連線後再啟動伺服器
const startServer = async () => {
  try {
    console.log('⏳ Waiting for database connection...');
    await connectWithRetry();
    
    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
    });

    // 優雅關閉
    const gracefulShutdown = () => {
      console.log('\n⏳ Shutting down gracefully...');
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();