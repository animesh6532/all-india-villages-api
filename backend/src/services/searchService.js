const { Op } = require("sequelize");

const {
  State,
  District,
  Village
} = require("../models");

async function search(query) {

  const {
    type,
    value,
    limit = 10
  } = query;

  const searchValue = `%${value}%`;

  // SEARCH STATES
  if (type === "state") {

    const states = await State.findAll({
      where: {
        name: {
          [Op.iLike]: searchValue
        }
      },
      limit: Number(limit)
    });

    return {
      type: "state",
      count: states.length,
      data: states
    };
  }

  // SEARCH DISTRICTS
  if (type === "district") {

    const districts = await District.findAll({
      where: {
        name: {
          [Op.iLike]: searchValue
        }
      },
      limit: Number(limit)
    });

    return {
      type: "district",
      count: districts.length,
      data: districts
    };
  }

  // SEARCH VILLAGES
  if (type === "village") {

    const villages = await Village.findAll({
      where: {
        name: {
          [Op.iLike]: searchValue
        }
      },
      limit: Number(limit)
    });

    return {
      type: "village",
      count: villages.length,
      data: villages
    };
  }

  return {
    type,
    count: 0,
    data: []
  };
}

module.exports = {
  search
};