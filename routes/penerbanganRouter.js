const express = require("express");
const router = express.Router();
const Penerbangan = require("../controller/penerbanganController");

// endpoint add
router.post("/add", Penerbangan.addPenerbangan);

// endpoint read all
router.get("/", Penerbangan.getPenerbangan);

router.get("/:id", Penerbangan.getPenerbanganId);

// endpoint update (BLM BERHASIL)
router.patch("/update/:id", Penerbangan.updatePenerbangan);

// endpoint delete
router.delete("/delete/:id", Penerbangan.deletePenerbangan);

module.exports = router;
