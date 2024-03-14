const { Logs, Pengguna } = require("../models");
const ApiError = require("../utils/apiError");

const getLogs = async (req, res, next) => {
    try {
      const log = await Logs.findAll({
        include: [{
            model: Pengguna,
            attributes: ['name']
      }]
      });
  
      res.status(200).json({
        status: "Success",
        msg: "Data berhasil di GET",
        data: log,
      });
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
};

module.exports = {
    getLogs
  };