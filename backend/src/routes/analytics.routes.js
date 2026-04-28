const router = require("express").Router();
const controller = require("../controllers/analyticsController");

router.get("/overview", controller.overview);

module.exports = router;
