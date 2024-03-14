const { Pengguna, Logs } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

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
          role: user.role,
          email: user.email,
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

const findUser = async (req, res, next) => {
  try {
    const user = await Pengguna.findAll();

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  findUser,
  verifyToken,
};
