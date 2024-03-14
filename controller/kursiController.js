const { Kursi } = require("../models")
const ApiError = require("../utils/apiError")

// Controller CREATE Kursi
const createKursi = async (req, res, next) => {
    try {
        const { seat_number, seat_status } = req.body

        const newKursi = await Kursi.create({
            seat_number,
            seat_status
        })
        res.status(200).json({
            status: "Success add new kursi",
            newKursi
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// controller READ Kursi
const getKursi = async (req, res, next) => {
    try {
        const kursi = await Kursi.findAll()

        res.status(200).json({
            status: "Succes",
            kursi
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

module.exports = {
    createKursi,
    getKursi
  };