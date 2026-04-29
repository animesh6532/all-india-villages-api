const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB HOST:", process.env.DB_HOST);
console.log("DB PORT:", process.env.DB_PORT);
console.log("DB NAME:", process.env.DB_NAME);
console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD:", process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions:
      process.env.DB_SSL === "true"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;