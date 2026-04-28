const analyticsService = require("../services/analyticsService");
const { success } = require("../utils/response");

async function overview(req, res, next) {
  try {
    success(res, { data: await analyticsService.getOverview() });
  } catch (error) {
    next(error);
  }
}

module.exports = { overview };
