const express = require("express");
const router = express.Router();
const Pesawat = require("../controller/pesawatController");


// endpoint add Pesawat
router.post("/add", Pesawat.createPlane);

// endpoint read all Pesawat (BELUM SELESAIII)
router.get("/", Pesawat.getPlane);

router.get("/:id", Pesawat.getPlaneById);

// endpoint update Pesawat (BELUM BERHASIL!!)
// router.patch("/update/:id", Pesawat.updatePlane);

// endpoint delete Pesawat
router.delete("/delete/:id", Pesawat.deletePlane);

module.exports = router;