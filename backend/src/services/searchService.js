const { Op } = require("sequelize");
const { State, District, Subdistrict, Village } = require("../models");
const { getPagination, paginatedResponse } = require("../utils/pagination");

async function search(query) {
  const pagination = getPagination(query);

  if (query.village) {
    const result = await Village.findAndCountAll({
      where: { name: { [Op.iLike]: `%${query.village}%` } },
      include: [
        {
          model: Subdistrict,
          as: "subdistrict",
          attributes: ["id", "name"],
          include: [
            {
              model: District,
              as: "district",
              attributes: ["id", "name"],
              include: [{ model: State, as: "state", attributes: ["id", "name"] }]
            }
          ]
        }
      ],
      distinct: true,
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["name", "ASC"]]
    });
    return { type: "village", ...paginatedResponse(result, pagination) };
  }

  if (query.district) {
    const result = await District.findAndCountAll({
      where: { name: { [Op.iLike]: `%${query.district}%` } },
      include: [{ model: State, as: "state", attributes: ["id", "name"] }],
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["name", "ASC"]]
    });
    return { type: "district", ...paginatedResponse(result, pagination) };
  }

  const result = await State.findAndCountAll({
    where: { name: { [Op.iLike]: `%${query.state}%` } },
    limit: pagination.limit,
    offset: pagination.offset,
    order: [["name", "ASC"]]
  });
  return { type: "state", ...paginatedResponse(result, pagination) };
}

module.exports = { search };
