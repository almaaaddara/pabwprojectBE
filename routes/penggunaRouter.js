const express = require("express");
const router = express.Router()
const User = require('../controller/penggunaController')
// const autentikasi = require("../middleware/auth");

// endpoint regist peserta
router.post("/register", User.register)


module.exports = router