const router = require("express").Router();
const authenticateApiKey = require("../middleware/authenticateApiKey");

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "All India Villages API is healthy" });
});

router.use("/auth", require("./auth.routes"));

router.use(authenticateApiKey);
router.use("/states", require("./states.routes"));
router.use("/districts", require("./districts.routes"));
router.use("/subdistricts", require("./subdistricts.routes"));
router.use("/villages", require("./villages.routes"));
router.use("/search", require("./search.routes"));
router.use("/analytics", require("./analytics.routes"));

module.exports = router;
