const express = require("express");
const router = express.Router();
const Hotel = require("../controller/hotelController");
const upload = require("../middleware/upload");

// endpoint add
router.post("/add", upload.single("image"), Hotel.addHotel);

// endpoint read all
router.get("/", Hotel.getHotel);

router.get("/:id", Hotel.getHotelId);

// endpoint update
router.patch("/update/:id", Hotel.updateHotel);

// endpoint delete
router.delete("/delete/:id", Hotel.deleteHotel);

module.exports = router;
