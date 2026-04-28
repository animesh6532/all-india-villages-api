require("dotenv").config();

const common = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "india_villages",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  dialect: "postgres",
  logging: false
};

module.exports = {
  development: common,
  test: {
    ...common,
    database: process.env.DB_NAME_TEST || "india_villages_test"
  },
  production: {
    ...common,
    dialectOptions:
      String(process.env.DB_SSL || "false") === "true"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false
            }
          }
        : {}
  }
};
