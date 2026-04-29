const { ApiClient } = require("../models");

const authenticateApiKey = async (req, res, next) => {
  try {

    const apiKey = req.headers["x-api-key"];
    const apiSecret = req.headers["x-api-secret"];

    if (!apiKey || !apiSecret) {
      return res.status(401).json({
        success: false,
        message: "API credentials required.",
        details: null
      });
    }

    const client = await ApiClient.findOne({
      where: {
        apiKey,
        apiSecret,
        isActive: true
      }
    });

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Invalid API credentials.",
        details: null
      });
    }

    req.apiClient = client;

    next();

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
      details: null
    });
  }
};

module.exports = authenticateApiKey;