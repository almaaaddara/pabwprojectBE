const express = require("express");
const router = express.Router();
const Logs = require("../controller/logsController");

// endpoint GET ALL LOGS
router.get("/", Logs.getLogs);

module.exports = router;