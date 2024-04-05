const express = require("express");
const router = express.Router();
const Pemesanan_Kursi = require("../controller/pemesanan_kursiController");

// endpoint add
router.post("/add", Pemesanan_Kursi.addPemesanan_Kursi);

// endpoint read all
router.get("/", Pemesanan_Kursi.getPemesanan_Kursi);

router.get("/:id", Pemesanan_Kursi.getPemesanan_KursiId);

// endpoint update
router.patch("/update/:id", Pemesanan_Kursi.updatePemesanan_Kursi);

// endpoint delete
router.delete("/delete/:id", Pemesanan_Kursi.deletePemesanan_Kursi);

module.exports = router;
