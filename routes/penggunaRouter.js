const express = require("express");
const router = express.Router();
const User = require("../controller/penggunaController");
// const autentikasi = require("../middleware/auth");

// endpoint POST data regist pengguna
router.post("/register", User.register);

// endpoint POST login pengguna (untuk membaca email dan password)
router.post("/login", User.login);


router.patch("/update/:id", User.updateUser);

// endpoint POST untuk ngecek token pengguna saat login
router.post("/token", User.verifyToken)

// endpoint GET untuk mendapatkan data All Peserta
router.get("/", User.getAllUser);

// endpoint GET untuk mendapatkan data Peserta by ID
router.get("/:id", User.getUserById);

router.delete("/delete/:id", User.deleteUser);


module.exports = router;
