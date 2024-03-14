const express = require("express");
const router = express.Router();
const User = require("../controller/penggunaController");
// const autentikasi = require("../middleware/auth");

// endpoint regist peserta
router.post("/register", User.register);

// endpoint login peserta
router.post("/login", User.login);
router.post("/token", User.verifyToken)
// router.get("/", autentikasi, Auth.checkToken);
// router.get("/get", Auth.findUser);
// router.get("/peserta/token/:token", Auth.getPesertaJWT);
// router.get("/token/:token", Auth.getUserJWT);

module.exports = router;
