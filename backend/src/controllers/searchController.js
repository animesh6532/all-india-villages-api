const searchService = require("../services/searchService");

const { success } = require("../utils/response");


async function search(req, res, next) {

  try {

    const result = await searchService.search(req.query);

    success(res, result);

  } catch (error) {

    next(error);

  }

}


module.exports = {
  search
};