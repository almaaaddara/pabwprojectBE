const { Transaksi } = require("../models");
const ApiError = require("../utils/apiError");
const Sequelize = require("sequelize");

// get all transaksi
const getTransaksi = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Transaksi berhasi didapatkan",
      transaksi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get transaksi by Id
const getTransaksiId = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Transaksi dengan ID ${req.params.id} didapatkan`,
      data: {
        transaksi,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post transaksi
const addTransaksi = async (req, res, next) => {
  try {
    const { price, status, id_pengguna } = req.body;

    // MEMBUAT LOGS UNTUK LOGIN
    // const logTransaksi = await Logs.create({
    //   id_pengguna,
    //   pesan: `Transaksi dengan user ID ${id_pengguna} berhasil dilakukan`,
    //   waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
    // });

    const newTransaksi = await Transaksi.create({
      price,
      status,
      id_pengguna,
    });
    res.status(200).json({
      status: "Transaksi Berhasil dilakukan",
      data: {
        newTransaksi,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update transaksi
// const updateTransaksi = async (req, res, next) => {
//   try {
//     const { price, status, id_pengguna } = req.body;

//     const transaksi = await Transaksi.findOne({
//       where: { id: req.params.id },
//     });

//     if (!transaksi) {
//       return next(
//         new ApiError(
//           `Transaksi dengan ID ${req.params.id} tidak ditemukan`,
//           404
//         )
//       );
//     }

//     kamar.update({price, status, id_pengguna})

//     res.status(200).json({
//       status: "Berhasil",
//       message: `Transaksi dengan ID ${req.params.id} berhasil diupdate`,
//       kamar,
//     });
//   } catch (err) {
//     next(new ApiError(err.message, 500));
//   }
// };

// delete transaksi
const deleteTransaksi = async (req, res, next) => {
  try {
    const transaksi = await Transaksi.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!transaksi) {
      return next(
        new ApiError(
          `Transaksi dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await Transaksi.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: "Transaksi berhasil dihapus",
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getTransaksi,
  getTransaksiId,
  addTransaksi,
  // updateTransaksi,
  deleteTransaksi,
};
