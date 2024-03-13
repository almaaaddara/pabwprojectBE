const express = require("express");
const router = express.Router();
const Transaksi = require("../controller/transaksiController");

// endpoint get all transaksi
router.get("/", Transaksi.getTransaksi);

// endpoint get transaksi by id
router.get("/:id", Transaksi.getTransaksiId);

// endpoint add transaksi
router.post("/add", Transaksi.addTransaksi);

// endpoint delete transaksi
router.delete("/delete/:id", Transaksi.deleteTransaksi);

module.exports = router;
