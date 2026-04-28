const logger = require("../config/logger");

function notFoundHandler(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const isOperational = statusCode < 500;

  if (!isOperational) {
    logger.error(error.message, { stack: error.stack });
  }

  return res.status(statusCode).json({
    success: false,
    message: isOperational ? error.message : "Internal server error",
    details: error.details || null
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
