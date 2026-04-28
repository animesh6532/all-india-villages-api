const rateLimit = require("express-rate-limit");
const env = require("../config/env");

const rateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many API requests. Please try again later."
  }
});

module.exports = rateLimiter;
