const searchService = require("../services/searchService");
const { success } = require("../utils/response");

async function search(req, res, next) {
  try {
    success(res, await searchService.search(req.query));
  } catch (error) {
    next(error);
  }
}

module.exports = { search };
