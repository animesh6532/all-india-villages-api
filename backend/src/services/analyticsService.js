const { fn, col, literal, Op } = require("sequelize");
const { State, District, Village, ApiLog } = require("../models");

async function getOverview() {
  const [totalStates, totalDistricts, totalVillages, apiCalls, topSearches, dailyUsage] = await Promise.all([
    State.count(),
    District.count(),
    Village.count(),
    ApiLog.count(),
    ApiLog.findAll({
      attributes: ["path", [fn("COUNT", col("id")), "count"]],
      where: { path: { [Op.iLike]: "%/api/search%" } },
      group: ["path"],
      order: [[literal("count"), "DESC"]],
      limit: 8
    }),
    ApiLog.findAll({
      attributes: [
        [literal("DATE(created_at)"), "date"],
        [fn("COUNT", col("id")), "calls"]
      ],
      group: [literal("DATE(created_at)")],
      order: [[literal("DATE(created_at)"), "ASC"]],
      limit: 14
    })
  ]);

  return {
    totals: {
      states: totalStates,
      districts: totalDistricts,
      villages: totalVillages,
      apiCalls
    },
    topSearches,
    dailyUsage
  };
}

module.exports = { getOverview };
