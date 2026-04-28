const router = require("express").Router();
const controller = require("../controllers/authController");
const validate = require("../middleware/validate");
const { generateKeySchema } = require("../validators/commonValidators");

router.post("/generate-key", validate(generateKeySchema), controller.generateKey);

module.exports = router;
