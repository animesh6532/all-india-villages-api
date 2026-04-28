const router = require("express").Router();
const controller = require("../controllers/searchController");
const validate = require("../middleware/validate");
const { searchSchema } = require("../validators/commonValidators");

router.get("/", validate(searchSchema, "query"), controller.search);

module.exports = router;
