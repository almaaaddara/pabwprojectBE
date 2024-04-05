const { Pemesanan_Kursi } = require("../models");
const ApiError = require("../utils/apiError");

// get all pemesanan kamar
const getPemesanan_Kursi = async (req, res, next) => {
  try {
    const pemesanan_kursi = await Pemesanan_Kursi.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Pemesanan kursi berhasi didapatkan",
      pemesanan_kursi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get pemesanan kamar by Id
const getPemesanan_KursiId = async (req, res, next) => {
  try {
    const pemesanan_kursi = await Pemesanan_Kursi.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Pemesanan Kursi dengan ID ${req.params.id} didapatkan`,
      pemesanan_kursi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post pemesanan kamar
const addPemesanan_Kursi = async (req, res, next) => {
  try {
    const {
      name,
      NIK,
      gender,
      id_penerbangan,
      id_kursi,
      id_transaksi,
    } = req.body;

    // MEMBUAT LOGS UNTUK pemesanan kamar
    // const logPemesananKamar = await Logs.create({
    //   id_pengguna,
    //   pesan: `Pemesanan Kamar dengan user ID ${id_pengguna} berhasil dilakukan`,
    //   waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
    // });

    const newPemesanan_Kursi = await Pemesanan_Kursi.create({
        name,
        NIK,
        gender,
        id_penerbangan,
        id_kursi,
        id_transaksi,
    });
    res.status(200).json({
      status: "Pemesanan kursi berhasil dilakukan",
      newPemesanan_Kursi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update pemesanan kamar
const updatePemesanan_Kursi = async (req, res, next) => {
  try {
    const {
        name,
        NIK,
        gender,
        id_penerbangan,
        id_kursi,
        id_transaksi,
    } = req.body;

    const Pemesanan_Kursi = await Pemesanan_Kursi.findOne({
      where: { id: req.params.id },
    });

    if (!Pemesanan_Kursi) {
      return next(
        new ApiError(
          `Pemesanan Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    // Update pemesanan kamar
    Pemesanan_Kursi.name = name;
    Pemesanan_Kursi.NIK = NIK;
    Pemesanan_Kursi.gender = gender;
    Pemesanan_Kursi.id_penerbangan = id_penerbangan;
    Pemesanan_Kursi.id_kursi = id_kursi;
    Pemesanan_Kursi.id_transaksi = id_transaksi;

    await Pemesanan_Kursi.save();

    res.status(200).json({
      status: "Berhasil",
      message: `Pemesanan Kamar dengan ID ${req.params.id} berhasil diperbarui`,
      Pemesanan_Kursi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete pemesanan kamar
const deletePemesanan_Kursi = async (req, res, next) => {
  try {
    const Pemesanan_Kursi = await Pemesanan_Kursi.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!Pemesanan_Kursi) {
      return next(
        new ApiError(
          `Pemesanan Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await Pemesanan_Kursi.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Pemesanan Kamar dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getPemesanan_Kursi,
  getPemesanan_KursiId,
  addPemesanan_Kursi,
  updatePemesanan_Kursi,
  deletePemesanan_Kursi,
};
