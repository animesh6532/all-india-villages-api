const app = require("./app");
const env = require("./config/env");
const logger = require("./config/logger");
const { sequelize } = require("./models");

async function start() {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established");

    app.listen(env.port, () => {
      logger.info(`API server running on port ${env.port}`);
    });
  } catch (error) {
    logger.error("Failed to start API server", { message: error.message, stack: error.stack });
    process.exit(1);
  }
}

start();
