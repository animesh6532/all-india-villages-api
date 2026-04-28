const geoService = require("../services/geoService");
const { success } = require("../utils/response");

const controller = {
  async listStates(req, res, next) {
    try {
      success(res, await geoService.listStates(req.query));
    } catch (error) {
      next(error);
    }
  },
  async getState(req, res, next) {
    try {
      success(res, { data: await geoService.getState(req.params.id) });
    } catch (error) {
      next(error);
    }
  },
  async listDistricts(req, res, next) {
    try {
      success(res, await geoService.listDistricts(req.query));
    } catch (error) {
      next(error);
    }
  },
  async getDistrict(req, res, next) {
    try {
      success(res, { data: await geoService.getDistrict(req.params.id) });
    } catch (error) {
      next(error);
    }
  },
  async listSubdistricts(req, res, next) {
    try {
      success(res, await geoService.listSubdistricts(req.query));
    } catch (error) {
      next(error);
    }
  },
  async getSubdistrict(req, res, next) {
    try {
      success(res, { data: await geoService.getSubdistrict(req.params.id) });
    } catch (error) {
      next(error);
    }
  },
  async listVillages(req, res, next) {
    try {
      success(res, await geoService.listVillages(req.query));
    } catch (error) {
      next(error);
    }
  },
  async getVillage(req, res, next) {
    try {
      success(res, { data: await geoService.getVillage(req.params.id) });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = controller;
