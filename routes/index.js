const router = require("express").Router();
const User = require("./penggunaRouter");
const Transaksi = require("./transaksiRouter");

router.use("/user", User);
router.use("/transaksi", Transaksi);

module.exports = router;
