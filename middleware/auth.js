const jwt = require("jsonwebtoken");
const { Pengguna } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(new ApiError("Token doesn't exist", 401));
    }

    const token = bearerToken.split("Bearer ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Pengguna.findByPk(payload.id);

    req.user = user;
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
