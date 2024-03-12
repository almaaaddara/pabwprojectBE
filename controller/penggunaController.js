const { Pengguna } = require("../models");
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
        process.env.JWT_SECRET
      );
      res.status(200).json({
        status: "Success",
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        jwt: token,
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

const checkToken = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
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
  checkToken,
  findUser,
};
