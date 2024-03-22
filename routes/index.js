const router = require("express").Router();
const User = require("./penggunaRouter");
const Rekanan = require("./rekananRouter");
const Transaksi = require("./transaksiRouter");
const Logs = require("./logsRouter");
const Kursi = require("./kursiRouter");
const Bandara = require("./bandaraRouter");
const Pesawat = require("./pesawatRouter");

router.use("/user", User);
router.use("/rekan", Rekanan);
router.use("/transaksi", Transaksi);
router.use("/log", Logs);
router.use("/kursi", Kursi);
router.use("/bandara", Bandara);
router.use("/plane", Pesawat);

module.exports = router;
