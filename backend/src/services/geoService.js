const { Op } = require("sequelize");
const { State, District, Subdistrict, Village } = require("../models");
const ApiError = require("../utils/apiError");
const { getPagination, paginatedResponse } = require("../utils/pagination");

function buildTextFilter(query, field = "name") {
  if (!query.q) {
    return {};
  }
  return { [field]: { [Op.iLike]: `%${query.q}%` } };
}

function sortOrder(sort = "name") {
  if (sort.startsWith("-")) {
    return [[sort.slice(1), "DESC"]];
  }
  return [[sort, "ASC"]];
}

async function listStates(query) {
  const pagination = getPagination(query);
  const result = await State.findAndCountAll({
    where: buildTextFilter(query),
    limit: pagination.limit,
    offset: pagination.offset,
    order: sortOrder(query.sort)
  });
  return paginatedResponse(result, pagination);
}

async function getState(id) {
  const state = await State.findByPk(id);
  if (!state) throw new ApiError(404, "State not found");
  return state;
}

async function listDistricts(query) {
  const pagination = getPagination(query);
  const where = {
    ...buildTextFilter(query),
    ...(query.stateId ? { stateId: query.stateId } : {})
  };

  const result = await District.findAndCountAll({
    where,
    include: [{ model: State, as: "state", attributes: ["id", "name", "slug"] }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: sortOrder(query.sort)
  });
  return paginatedResponse(result, pagination);
}

async function getDistrict(id) {
  const district = await District.findByPk(id, {
    include: [{ model: State, as: "state", attributes: ["id", "name", "slug"] }]
  });
  if (!district) throw new ApiError(404, "District not found");
  return district;
}

async function listSubdistricts(query) {
  const pagination = getPagination(query);
  const where = {
    ...buildTextFilter(query),
    ...(query.districtId ? { districtId: query.districtId } : {})
  };

  const result = await Subdistrict.findAndCountAll({
    where,
    include: [
      {
        model: District,
        as: "district",
        attributes: ["id", "name", "slug", "stateId"],
        include: [{ model: State, as: "state", attributes: ["id", "name", "slug"] }]
      }
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: sortOrder(query.sort)
  });
  return paginatedResponse(result, pagination);
}

async function getSubdistrict(id) {
  const subdistrict = await Subdistrict.findByPk(id, {
    include: [
      {
        model: District,
        as: "district",
        attributes: ["id", "name", "slug", "stateId"],
        include: [{ model: State, as: "state", attributes: ["id", "name", "slug"] }]
      }
    ]
  });
  if (!subdistrict) throw new ApiError(404, "Subdistrict not found");
  return subdistrict;
}

async function listVillages(query) {
  const pagination = getPagination(query);
  const where = {
    ...buildTextFilter(query),
    ...(query.subdistrictId ? { subdistrictId: query.subdistrictId } : {})
  };

  const districtWhere = query.districtId ? { id: query.districtId } : undefined;
  const stateWhere = query.stateId ? { id: query.stateId } : undefined;

  const result = await Village.findAndCountAll({
    where,
    include: [
      {
        model: Subdistrict,
        as: "subdistrict",
        attributes: ["id", "name", "slug", "districtId"],
        include: [
          {
            model: District,
            as: "district",
            attributes: ["id", "name", "slug", "stateId"],
            where: districtWhere,
            include: [{ model: State, as: "state", attributes: ["id", "name", "slug"], where: stateWhere }]
          }
        ]
      }
    ],
    distinct: true,
    limit: pagination.limit,
    offset: pagination.offset,
    order: sortOrder(query.sort)
  });
  return paginatedResponse(result, pagination);
}

async function getVillage(id) {
  const village = await Village.findByPk(id, {
    include: [
      {
        model: Subdistrict,
        as: "subdistrict",
        attributes: ["id", "name", "slug", "districtId"],
        include: [
          {
            model: District,
            as: "district",
            attributes: ["id", "name", "slug", "stateId"],
            include: [{ model: State, as: "state", attributes: ["id", "name", "slug"] }]
          }
        ]
      }
    ]
  });
  if (!village) throw new ApiError(404, "Village not found");
  return village;
}

module.exports = {
  listStates,
  getState,
  listDistricts,
  getDistrict,
  listSubdistricts,
  getSubdistrict,
  listVillages,
  getVillage
};
