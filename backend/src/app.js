const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const apiRoutes = require("./routes");
const rateLimiter = require("./middleware/rateLimiter");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const usageLogger = require("./middleware/usageLogger");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(rateLimiter);
app.use(usageLogger);

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
