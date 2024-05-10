const { Hotel } = require("../models");
const ApiError = require("../utils/apiError");

// get all hotel
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Hotel berhasi didapatkan",
      hotel,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get hotel by id
const getHotelId = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Hotel dengan ID ${req.params.id} didapatkan`,
      data: {
        hotel,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post hotel
const addHotel = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
        return next(new ApiError("Silakan pilih file gambar!", 400));
      }  

    const { facility, description, name, address, id_rekanan } = req.body;

    const newHotel = await Hotel.create({
        image: file.path,
        facility,
        description,
        name,
        address,
        id_rekanan
    });
    res.status(200).json({
      status: "Hotel berhasil ditambahkan",
      data: newHotel
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update hotel
const updateHotel = async (req, res, next) => {
  try {
    const { image, facility, description, name, address, id_rekanan } = req.body;

    const hotel = await Hotel.findOne({
      where: { id: req.params.id },
    });

    if (!hotel) {
      return next(
        new ApiError(`Mitra dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await hotel.update({
        image,
        facility,
        description,
        name,
        address,
        id_rekanan
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Hotel dengan ID ${req.params.id} berhasil diupdate`,
      data: {
        hotel,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete hotel
const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!hotel) {
      return next(
        new ApiError(`Mitra dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await Hotel.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Hotel dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getHotel,
  getHotelId,
  addHotel,
  updateHotel,
  deleteHotel,
};
