const express = require("express");
const router = express.Router();
const Pemesanan_Kamar = require("../controller/pemesanan_kamarController");

// endpoint add
router.post("/add", Pemesanan_Kamar.addPemesanan_Kamar);

// endpoint read all
router.get("/", Pemesanan_Kamar.getPemesanan_Kamar);

router.get("/:id", Pemesanan_Kamar.getPemesanan_KamarId);

// endpoint update
router.patch("/update/:id", Pemesanan_Kamar.updatePemesanan_Kamar);

// endpoint delete
router.delete("/delete/:id", Pemesanan_Kamar.deletePemesanan_Kamar);

module.exports = router;
