const express = require("express");

const { log, getLogData } = require("../controller/logDetailsController");
const authenticate = require("../middleware/authentication");
const router = express.Router();

router.post("/", authenticate, log);
router.get("/user", authenticate, getLogData);

module.exports = router;
