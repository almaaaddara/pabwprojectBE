const router = require("express").Router();
const User = require("./penggunaRouter");
const Transaksi = require("./transaksiRouter");
const Logs = require("./logsRouter");

router.use("/user", User);
router.use("/transaksi", Transaksi);
router.use("/log", Logs);

module.exports = router;
