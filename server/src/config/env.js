require('dotenv').config();

const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8081,

  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'luzhou_gym',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'pluto',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Email
  email: {
    service: process.env.SMTP_SERVICE || 'Gmail',
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },

  // Application URL
  appUrl: process.env.APP_URL || 'http://localhost:8081',

  // LINE Pay
  linepay: {
    channelId: process.env.LINEPAY_CHANNEL_ID,
    channelSecret: process.env.LINEPAY_CHANNEL_SECRET_KEY,
    version: process.env.LINEPAY_VERSION || 'v3',
    site: process.env.LINEPAY_SITE || 'https://sandbox-api-pay.line.me',
    returnHost: process.env.LINEPAY_RETURN_HOST || 'http://localhost:8081',
    returnConfirmUrl: process.env.LINEPAY_RETURN_CONFIRM_URL || '/api/payment/confirm',
    returnCancelUrl: process.env.LINEPAY_RETURN_CANCEL_URL || '/api/payment/cancel',
  },
};

module.exports = config;
