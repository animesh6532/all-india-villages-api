import api from "./client";

export const geoApi = {
  states: (params) => api.get("/states", { params }).then((response) => response.data),
  districts: (params) => api.get("/districts", { params }).then((response) => response.data),
  subdistricts: (params) => api.get("/subdistricts", { params }).then((response) => response.data),
  villages: (params) => api.get("/villages", { params }).then((response) => response.data),
  search: (params) => api.get("/search", { params }).then((response) => response.data),
  analytics: () => api.get("/analytics/overview").then((response) => response.data),
  generateKey: (payload) => api.post("/auth/generate-key", payload).then((response) => response.data)
};
