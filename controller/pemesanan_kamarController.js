const { Pemesanan_Kamar } = require("../models");
const ApiError = require("../utils/apiError");

// get all pemesanan kamar
const getPemesanan_Kamar = async (req, res, next) => {
  try {
    const pemesanan_kamar = await Pemesanan_Kamar.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Pemesanan kamar berhasi didapatkan",
      pemesanan_kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get pemesanan kamar by Id
const getPemesanan_KamarId = async (req, res, next) => {
  try {
    const pemesanan_kamar = await Pemesanan_Kamar.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Pemesanan Kamar dengan ID ${req.params.id} didapatkan`,
      pemesanan_kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post pemesanan kamar
const addPemesanan_Kamar = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      start_date,
      end_date,
      id_kamar,
      id_rekanan,
      id_transaksi,
    } = req.body;

    // MEMBUAT LOGS UNTUK pemesanan kamar
    // const logPemesananKamar = await Logs.create({
    //   id_pengguna,
    //   pesan: `Pemesanan Kamar dengan user ID ${id_pengguna} berhasil dilakukan`,
    //   waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
    // });

    const newPemesanan_Kamar = await Pemesanan_Kamar.create({
      name,
      email,
      phone,
      start_date,
      end_date,
      id_kamar,
      id_rekanan,
      id_transaksi,
    });
    res.status(200).json({
      status: "Pemesanan kamar berhasil dilakukan",
      newPemesanan_Kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update pemesanan kamar
const updatePemesanan_Kamar = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      start_date,
      end_date,
      id_kamar,
      id_rekanan,
      id_transaksi,
    } = req.body;

    const pemesanan_kamar = await Pemesanan_Kamar.findOne({
      where: { id: req.params.id },
    });

    if (!pemesanan_kamar) {
      return next(
        new ApiError(
          `Pemesanan Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    pemesanan_kamar.update({
      name,
      email,
      phone,
      start_date,
      end_date,
      id_kamar,
      id_rekanan,
      id_transaksi,
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Pemesanan Kamar dengan ID ${req.params.id} berhasil diperbarui`,
      pemesanan_kamar,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete pemesanan kamar
const deletePemesanan_Kamar = async (req, res, next) => {
  try {
    const pemesanan_kamar = await Pemesanan_Kamar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!pemesanan_kamar) {
      return next(
        new ApiError(
          `Pemesanan Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await Pemesanan_Kamar.destroy({
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
  getPemesanan_Kamar,
  getPemesanan_KamarId,
  addPemesanan_Kamar,
  updatePemesanan_Kamar,
  deletePemesanan_Kamar,
};
