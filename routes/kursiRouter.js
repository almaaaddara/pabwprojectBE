const express = require("express");
const router = express.Router();
const Kursi = require("../controller/kursiController");


// endpoint add kursi
router.post("/add", Kursi.createKursi);

// endpoint read all kursi
router.get("/", Kursi.getKursi);

router.get("/:id", Kursi.getKursiById);

// endpoint update kursi (BELUM BERHASIL!!!)
// router.patch("/update/:id", Kursi.updateKursi);

// endpoint delete kursi
router.delete("/delete/:id", Kursi.deleteKursi);

module.exports = router;