const { ApiClient } = require("../models");
const ApiError = require("../utils/apiError");
const { hashSecret } = require("../utils/crypto");

async function authenticateApiKey(req, _res, next) {
  try {
    const apiKey = req.header("x-api-key");
    const apiSecret = req.header("x-api-secret");

    if (!apiKey || !apiSecret) {
      throw new ApiError(401, "Missing API credentials. Provide x-api-key and x-api-secret headers.");
    }

    const client = await ApiClient.findOne({ where: { apiKey, isActive: true } });
    if (!client || client.secretHash !== hashSecret(apiSecret)) {
      throw new ApiError(401, "Invalid API credentials.");
    }

    req.apiClient = client;
    client.lastUsedAt = new Date();
    await client.save();
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authenticateApiKey;
