const router = require("express").Router();

const User = require("./penggunaRouter");
const Rekanan = require("./rekananRouter");
const Transaksi = require("./transaksiRouter");
const Logs = require("./logsRouter");
const Pemesanan_Kamar = require("./pemesanan_kamarRouter");
const Kamar = require("./kamarRouter");
const Room_Type = require("./room_typeRouter");
const Kursi = require("./kursiRouter");
const Bandara = require("./bandaraRouter");
const Pesawat = require("./pesawatRouter");

router.use("/user", User);
router.use("/mitra", Rekanan);
router.use("/transaksi", Transaksi);
router.use("/pemesanan_kamar", Pemesanan_Kamar);
router.use("/kamar", Kamar);
router.use("/room_type", Room_Type);
router.use("/log", Logs);
router.use("/kursi", Kursi);
router.use("/bandara", Bandara);
router.use("/plane", Pesawat);

module.exports = router;
