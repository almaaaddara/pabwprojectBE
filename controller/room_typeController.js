const multer = require("multer");
const { Room_Type } = require("../models");
const ApiError = require("../utils/apiError");

// get all room type
const getRoom_Type = async (req, res, next) => {
  try {
    const room_type = await Room_Type.findAll();

    res.status(200).json({
      status: "Berhasil",
      message: "Tipe Kamar berhasi didapatkan",
      room_type,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// get room type by id
const getRoom_TypeId = async (req, res, next) => {
  try {
    const room_type = await Room_Type.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Tipe Kamar dengan ID ${req.params.id} didapatkan`,
      room_type,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// post room type
const addRoom_Type = async (req, res, next) => {
  try {
    const { room_type, image } = req.body;

    const newRoom_Type = await Room_Type.create({
      room_type,
      image,
    });
    res.status(200).json({
      status: "Room Type berhasil ditambahkan",
      newRoom_Type,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update room type
const updateRoom_Type = async (req, res, next) => {
  try {
    const { room_type, image } = req.body;
    const roomtype = await Room_Type.findOne({
      where: { id: req.params.id },
    });

    if (!roomtype) {
      return next(
        new ApiError(
          `Tipe Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await roomtype.update({
      room_type,
      image,
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Tipe Kamar dengan ID ${roomTypeId} berhasil diperbarui`,
      roomType,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// delete room type
const deleteRoom_Type = async (req, res, next) => {
  try {
    const room_type = await Room_Type.findOne({
      where: { id: req.params.id },
    });

    if (!room_type) {
      return next(
        new ApiError(
          `Tipe Kamar dengan ID ${req.params.id} tidak ditemukan`,
          404
        )
      );
    }

    await Room_Type.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Tipe Kamar dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  getRoom_Type,
  getRoom_TypeId,
  addRoom_Type,
  updateRoom_Type,
  deleteRoom_Type,
};
