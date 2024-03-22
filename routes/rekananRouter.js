const express = require("express");
const router = express.Router();
const Rekanan = require("../controller/rekananController");


// endpoint add kursi
router.post("/add", Rekanan.createMitra);


module.exports = router;