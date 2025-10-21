require("dotenv").config();

const config = {
  // Server
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  // Database (PostgreSQL)
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    max: 10, // 連線池最大連線數
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  // Email
  email: {
    service: process.env.SMTP_SERVICE,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  // Application URL
  appUrl: process.env.APP_URL,
  frontendUrl: process.env.FRONTEND_URL,

  // LINE Pay
  linepay: {
    channelId: process.env.LINEPAY_CHANNEL_ID,
    channelSecret: process.env.LINEPAY_CHANNEL_SECRET_KEY,
    version: process.env.LINEPAY_VERSION,
    site: process.env.LINEPAY_SITE,
  },
};

module.exports = config;
