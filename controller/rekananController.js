const { Rekanan } = require("../models")
const ApiError = require("../utils/apiError")

const createMitra = async (req, res, next) => {
    try {
        const { name, address, phone, description, type, id_pengguna } = req.body

        const newMitra = await Rekanan.create({
            name,
            address,
            phone,
            description,
            type,
            id_pengguna
        })
        res.status(200).json({
            status: "Success add new Rekanan",
            newMitra
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

module.exports = {
    createMitra
  };