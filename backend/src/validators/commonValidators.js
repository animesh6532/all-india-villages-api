const Joi = require("joi");

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(25),
  stateId: Joi.number().integer().positive(),
  districtId: Joi.number().integer().positive(),
  subdistrictId: Joi.number().integer().positive(),
  q: Joi.string().trim().min(2).max(120),
  sort: Joi.string().valid("name", "-name", "createdAt", "-createdAt").default("name")
}).unknown(true);

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

const searchSchema = Joi.object({
  village: Joi.string().trim().min(2).max(160),
  district: Joi.string().trim().min(2).max(140),
  state: Joi.string().trim().min(2).max(120),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(25)
}).or("village", "district", "state");

const generateKeySchema = Joi.object({
  name: Joi.string().trim().min(2).max(160).required(),
  email: Joi.string().trim().email().max(180).required()
});

module.exports = {
  paginationSchema,
  idParamSchema,
  searchSchema,
  generateKeySchema
};
