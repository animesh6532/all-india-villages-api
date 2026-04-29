const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT || 5000),

  frontendOrigin:
    process.env.FRONTEND_ORIGIN || "http://localhost:5173",

  rateLimitWindowMs: Number(
    process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000
  ),

  rateLimitMax: Number(
    process.env.RATE_LIMIT_MAX || 1000
  ),

  database: {
    host: process.env.DB_HOST || "localhost",

    port: Number(process.env.DB_PORT || 5432),

    name: process.env.DB_NAME || "villages_db",

    user: process.env.DB_USER || "postgres",

    password: process.env.DB_PASSWORD || "postgres123",

    ssl: String(process.env.DB_SSL || "false") === "true",
  },
};

console.log("ENV DB PASSWORD:", env.database.password);

module.exports = env;