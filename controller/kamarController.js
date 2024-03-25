const { Kamar } = require("../models");
const ApiError = require("../utils/apiError");

// get all kamar
const getKamar = async (req, res, next) => {
  try {
    const kamar = await Kamar.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Kamar berhasi didapatkan",
      kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get kamar by id
const getKamarId = async (req, res, next) => {
  try {
    const kamar = await Kamar.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Kamar dengan ID ${req.params.id} didapatkan`,
      kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post kamar
const addKamar = async (req, res, next) => {
  try {
    const { room_number, room_capacity, price, room_type } = req.body;

    const newKamar = await Kamar.create({
      room_number,
      room_capacity,
      price,
      room_type,
    });
    res.status(200).json({
      status: "Kamar berhasil ditambahkan",
      newKamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update kamar
const updateKamar = async (req, res, next) => {
  try {
    const { room_number, room_capacity, price, room_type } = req.body;

    const kamar = await Kamar.findOne({
      where: { id: req.params.id },
    });

    if (!kamar) {
      return next(
        new ApiError(`Kamar dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    kamar.room_number = room_number;
    kamar.room_capacity = room_capacity;
    kamar.price = price;
    kamar.room_type = room_type;

    await kamar.save();

    res.status(200).json({
      status: "Berhasil",
      message: `Kamar dengan ID ${req.params.id} berhasil diupdate`,
      kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete kamar
const deleteKamar = async (req, res, next) => {
  try {
    const kamar = await Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kamar) {
      return next(
        new ApiError(`Kamar dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await Kamar.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: "Kamar berhasil dihapus",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getKamar,
  getKamarId,
  addKamar,
  updateKamar,
  deleteKamar,
};
