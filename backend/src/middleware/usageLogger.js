const { ApiLog } = require("../models");
const logger = require("../config/logger");

function usageLogger(req, res, next) {
  const startedAt = Date.now();

  res.on("finish", async () => {
    try {
      if (!req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/api/health")) {
        return;
      }

      await ApiLog.create({
        clientId: req.apiClient?.id || null,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs: Date.now() - startedAt,
        ipAddress: req.ip,
        userAgent: req.get("user-agent")
      });
    } catch (error) {
      logger.warn("Failed to write API usage log", { message: error.message });
    }
  });

  next();
}

module.exports = usageLogger;
