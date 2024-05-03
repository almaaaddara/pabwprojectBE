const express = require("express");
const router = express.Router();
const Room_Type = require("../controller/room_typeController");
const upload = require("../middleware/upload");

// endpoint add
router.post("/add", upload.single("image"), Room_Type.addRoom_Type);

// endpoint read all
router.get("/", Room_Type.getRoom_Type);

router.get("/:id", Room_Type.getRoom_TypeId);

// endpoint update
router.patch("/update/:id", Room_Type.updateRoom_Type);

// endpoint delete
router.delete("/delete/:id", Room_Type.deleteRoom_Type);

module.exports = router;
