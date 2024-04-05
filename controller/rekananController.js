const { Rekanan } = require("../models");
const ApiError = require("../utils/apiError");

// get all rekanan
const getRekanan = async (req, res, next) => {
  try {
    const rekanan = await Rekanan.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Rekanan berhasi didapatkan",
      rekanan,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get rekanan by id
const getRekananId = async (req, res, next) => {
  try {
    const rekanan = await Rekanan.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Mitra dengan ID ${req.params.id} didapatkan`,
      data: {
        rekanan,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post rekanan
const addRekanan = async (req, res, next) => {
  try {
    const { name, address, phone, description, type, id_pengguna } = req.body;

    const newRekanan = await Rekanan.create({
      name,
      address,
      phone,
      description,
      type,
      id_pengguna,
    });
    res.status(200).json({
      status: "Mitra berhasil ditambahkan",
      data: {
        newRekanan,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update rekanan
const updateRekanan = async (req, res, next) => {
  try {
    const { name, address, phone, description, type, id_pengguna } = req.body;

    const rekanan = await Rekanan.findOne({
      where: { id: req.params.id },
    });

    if (!rekanan) {
      return next(
        new ApiError(`Mitra dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    rekanan.name = name;
    rekanan.address = address;
    rekanan.phone = phone;
    rekanan.description = description;
    rekanan.type = type;
    rekanan.id_pengguna = id_pengguna;

    await rekanan.save();

    res.status(200).json({
      status: "Berhasil",
      message: `Mitra dengan ID ${req.params.id} berhasil diupdate`,
      data: {
        rekanan,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete rekanan
const deleteRekanan = async (req, res, next) => {
  try {
    const rekanan = await Rekanan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!rekanan) {
      return next(
        new ApiError(`Mitra dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await Rekanan.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Mitra dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getRekanan,
  getRekananId,
  addRekanan,
  updateRekanan,
  deleteRekanan,
};
