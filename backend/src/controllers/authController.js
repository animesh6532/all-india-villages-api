const authService = require("../services/authService");
const { success } = require("../utils/response");

async function generateKey(req, res, next) {
  try {
    success(res, { data: await authService.generateKey(req.body) }, "API credentials generated", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = { generateKey };
