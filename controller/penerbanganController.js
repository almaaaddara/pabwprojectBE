const { Penerbangan } = require("../models");
const ApiError = require("../utils/apiError");

// get all penerbangan
const getPenerbangan = async (req, res, next) => {
  try {
    const penerbangan = await Penerbangan.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Penerbangan berhasi didapatkan",
      penerbangan,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get penerbangan by Id
const getPenerbanganId = async (req, res, next) => {
  try {
    const penerbangan = await Penerbangan.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `penerbangan dengan ID ${req.params.id} didapatkan`,
      penerbangan,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post penerbangan
const addPenerbangan = async (req, res, next) => {
  try {
    const {
      departure_time,
      arival_time,
      plane_id,
      depart_id,
      destination_id,
    } = req.body;

    // MEMBUAT LOGS UNTUK penerbangan
    // const logPemesananKamar = await Logs.create({
    //   id_pengguna,
    //   pesan: `penerbangan dengan user ID ${id_pengguna} berhasil dilakukan`,
    //   waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
    // });

    const newPenerbangan = await Penerbangan.create({
        departure_time,
      arival_time,
      plane_id,
      depart_id,
      destination_id,
    });
    res.status(200).json({
      status: "penerbangan berhasil dilakukan",
      newPenerbangan,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update penerbangan
const updatePenerbangan = async (req, res, next) => {
  try {
    const {
        departure_time,
      arival_time,
      plane_id,
      depart_id,
      destination_id,
    } = req.body;

    const Penerbangan = await Penerbangan.findOne({
      where: { id: req.params.id },
    });

    if (!Penerbangan) {
      return next(
        new ApiError(
          `penerbangan dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    // Update penerbangan
    Penerbangan.departure_time = departure_time;
    Penerbangan.arival_time = arival_time;
    Penerbangan.plane_id = plane_id;
    Penerbangan.depart_id = depart_id;
    Penerbangan.destination_id = destination_id;

    await Penerbangan.save();

    res.status(200).json({
      status: "Berhasil",
      message: `penerbangan dengan ID ${req.params.id} berhasil diperbarui`,
      Penerbangan,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete penerbangan
const deletePenerbangan = async (req, res, next) => {
  try {
    const Penerbangan = await Penerbangan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!Penerbangan) {
      return next(
        new ApiError(
          `penerbangan dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await Penerbangan.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `penerbangan dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getPenerbangan,
  getPenerbanganId,
  addPenerbangan,
  updatePenerbangan,
  deletePenerbangan,
};
