function getPagination(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 25, 1), 100);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function paginatedResponse({ rows, count }, { page, limit }) {
  return {
    data: rows,
    meta: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    }
  };
}

module.exports = {
  getPagination,
  paginatedResponse
};
