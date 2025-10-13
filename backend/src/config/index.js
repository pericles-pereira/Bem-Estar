const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const config = {
  // Servidor
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "default-jwt-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // Session
  SESSION_SECRET: process.env.SESSION_SECRET || "default-session-secret",

  // Firebase
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'seu_google_client_id_aqui.apps.googleusercontent.com',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || true,

  // Desenvolvimento
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

module.exports = config;
