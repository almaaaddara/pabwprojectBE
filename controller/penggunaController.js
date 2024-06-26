const { Pengguna, Logs } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

// Fungsi Register (menambah data)
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const existingUser = await Pengguna.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email telah terdaftar",
      });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await Pengguna.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      const logRegistrasi = await Logs.create({
        id_pengguna: newUser.id,
        pesan: `User dengan ID ${newUser.id} berhasil terdaftar`,
        waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
      })
    }

    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// Fungsi Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Pengguna.findOne({
      where: { email },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "6h"});

        // MEMBUAT LOGS UNTUK LOGIN
      const logLogin = await Logs.create({
        id_pengguna: user.id,
        pesan: `User dengan ID ${user.id} berhasil login`,
        waktu: new Date().toISOString().slice(0, 19).replace("T", " "),
      });

      res.status(200).json({
        status: "Success",
        message: "Login successful",
        token: token,
      });
    } else {
      // next(new ApiError("Email or password does not match", 401))
      res.status(401).json({
        status: "Failed",
        message: "Email or Password does not match",
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// update user
const updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, balance } = req.body;

    const user = await Pengguna.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return next(
        new ApiError(`User dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await user.update({
      name,
      email,
      phone,
      password,
      role,
      balance
    });

    res.status(200).json({
      status: "Berhasil",
      message: `User dengan ID ${req.params.id} berhasil diupdate`,
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      data: data,
    });
  }

  return res.json({
    msg: "Token invalid",
  });
};

const getAllUser = async (req, res, next) => {
  try {
    const user = await Pengguna.findAll();

    res.status(200).json({
      status: "Success",
      msg: "Data berhasil di GET",
      data: user,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const getUserById = async (req, res, next) => {
  try {
      const user = await Pengguna.findOne({
          where: {id: req.params.id}
      })

      res.status(200).json({
          status: "Succes",
          data: user,
        })
  } catch (err) {
      next(new ApiError(err.message, 500))
  }
}

// delete user
const deleteUser = async (req, res, next) => {
  try {
    const user = await Pengguna.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return next(
        new ApiError(`Pengguna dengan ID ${req.params.id} tidak ditemukan`, 404)
      );
    }

    await Pengguna.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Berhasil",
      message: `Pengguna dengan ID ${req.params.id} berhasil dihapus`,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  updateUser,
  getUserById,
  verifyToken,
  deleteUser
};
