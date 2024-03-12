const router = require("express").Router()
const User = require("./penggunaRouter")

router.use('/user', User)

module.exports = router