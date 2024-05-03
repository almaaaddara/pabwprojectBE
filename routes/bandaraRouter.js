const express = require("express");
const router = express.Router();
const Bandara = require("../controller/bandaraController");

// endpoint add bandara
router.post("/add", Bandara.createBandara);

// endpoint read all bandara
router.get("/", Bandara.getbandara);

// endpoint get bandara by id
router.get("/:id", Bandara.getBandaraById);

// endpoint update bandara
router.patch("/update/:id", Bandara.updateBandara);

// endpoint delete bandara
router.delete("/delete/:id", Bandara.deleteBandara);

module.exports = router;
