const { Kursi } = require("../models")
const ApiError = require("../utils/apiError")

// Controller CREATE Kursi
const createKursi = async (req, res, next) => {
    try {
        const { seat_number, seat_status, plane_id } = req.body

        const newKursi = await Kursi.create({
            seat_number,
            seat_status,
            plane_id
        })
        res.status(200).json({
            status: "Success add new kursi",
            newKursi
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// controller READ Kursi
const getKursi = async (req, res, next) => {
    try {
        const kursi = await Kursi.findAll()

        res.status(200).json({
            status: "Succes",
            kursi
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Read Kursi By ID
const getKursiById = async (req, res, next) => {
  try {
      const kursi = await Kursi.findOne({
          where: {id: req.params.id}
      })

      res.status(200).json({
          status: "Succes",
          data: kursi,
        })
  } catch (err) {
      next(new ApiError(err.message, 500))
  }
}

// Controller GET Kursi By Status
const getKursiByStatus = async (req, res, next) => {
  try {
    const { seat_status } = req.query;
    
    if (seat_status !== 'True' && seat_status !== 'False') {
      return next(new ApiError("Status harus berupa 'True' atau 'False'", 400));
    }

    const seats = await Kursi.findAll({
      attributes: ['id', 'seat_number', 'seat_status'],
      where: { seat_status }
    });

    res.status(200).json({
      status: "Success",
      data: seats
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// Controller to count seats with status "False"
const kursiTersedia = async (req, res, next) => {
  try {
    const trueSeatCount = await Kursi.count({
      where: { seat_status: 'True' }
    });

    res.status(200).json({
      status: "Success",
      data: trueSeatCount
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

// Controller UPDATE Kursi
const updateKursi = async (req, res, next) => {
    try {
        const { seat_number, seat_status } = req.body;
        const kursiId = req.params.id;

        const kursi = await Kursi.findOne({
            where: {
                id: kursiId
            }
        });

        if (!kursi) {
            return next(new ApiError(`Kursi dengan ID ${kursiId} tidak ditemukan`, 404));
        }

        // Lakukan update pada kursi
        await kursi.update({
            seat_number,
            seat_status
        }, {
            where: {
                id: kursiId
            }
        });

        res.status(200).json({
            status: "Success",
            message: "Kursi updated successfully"
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

// controller DELETE kursi
const deleteKursi = async (req, res, next) => {
    try {
      const kursi = await Kursi.findOne({
        where: {
          id: req.params.id
        }
      })
  
      if (!kursi) {
        return next(new ApiError(`Kursi dengan ID ${req.params.id} tidak ditemukan`, 404))
      }
  
      await Kursi.destroy({
        where: {
          id: req.params.id
        }
      })
  
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully"
      })
    } catch (err) {
      next(new ApiError(err.message, 500))
    }
  }


module.exports = {
    createKursi,
    getKursi,
    getKursiById,
    getKursiByStatus,
    kursiTersedia,
    deleteKursi,
    updateKursi
  };