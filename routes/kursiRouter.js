const express = require("express");
const router = express.Router();
const Kursi = require("../controller/kursiController");


// endpoint add kursi
router.post("/add", Kursi.createKursi);

// endpoint read all kursi
// router.get("/getall", Kursi.getKursi); BELUM SELESAI YA


module.exports = router;