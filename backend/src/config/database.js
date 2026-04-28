const { Sequelize } = require("sequelize");
const env = require("./env");
const logger = require("./logger");

const sequelize = new Sequelize(env.database.name, env.database.user, env.database.password, {
  host: env.database.host,
  port: env.database.port,
  dialect: "postgres",
  logging: env.nodeEnv === "development" ? (message) => logger.debug(message) : false,
  dialectOptions: env.database.ssl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {},
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
