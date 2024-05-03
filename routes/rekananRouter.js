const express = require("express");
const router = express.Router();
const Rekanan = require("../controller/rekananController");

// endpoint get all Rekanan
router.get("/", Rekanan.getRekanan);

// endpoint get Rekanan by id
router.get("/:id", Rekanan.getRekananId);

// endpoint add mitra
router.post("/add", Rekanan.addRekanan);

// endpoint add mitra
router.patch("/update/:id", Rekanan.updateRekanan);

// endpoint delete Rekanan
router.delete("/delete/:id", Rekanan.deleteRekanan);

module.exports = router;
