const app = require('./src/app');
const config = require('./src/config/env');

const PORT = config.port;

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