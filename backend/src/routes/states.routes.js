const router = require("express").Router();

const controller = require("../controllers/geoController");

const validate = require("../middleware/validate");

const {
  paginationSchema,
  idParamSchema
} = require("../validators/commonValidators");

router.get(
  "/",
  validate(paginationSchema, "query"),
  controller.listStates
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  controller.getState
);

module.exports = router;