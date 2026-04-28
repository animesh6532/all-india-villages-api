const router = require("express").Router();
const controller = require("../controllers/geoController");
const validate = require("../middleware/validate");
const { paginationSchema, idParamSchema } = require("../validators/commonValidators");

router.get("/", validate(paginationSchema, "query"), controller.listSubdistricts);
router.get("/:id", validate(idParamSchema, "params"), controller.getSubdistrict);

module.exports = router;
