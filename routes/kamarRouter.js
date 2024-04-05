const express = require("express");
const router = express.Router();
const Kamar = require("../controller/kamarController");

// endpoint read all
router.get("/", Kamar.getKamar);

// read by id
router.get("/:id", Kamar.getKamarId);

// endpoint add
router.post("/add", Kamar.addKamar);

// endpoint update
router.patch("/update/:id", Kamar.updateKamar);

// endpoint delete
router.delete("/delete/:id", Kamar.deleteKamar);

module.exports = router;
