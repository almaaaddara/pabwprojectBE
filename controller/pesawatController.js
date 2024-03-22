const { Pesawat } = require("../models")
const ApiError = require("../utils/apiError")

// Controller CREATE Plane
const createPlane = async (req, res, next) => {
    try {
        const { plane_number, plane_type, airplane_partner } = req.body

        const newPlane = await Pesawat.create({
            plane_number, 
            plane_type, 
            airplane_partner
        })
        res.status(200).json({
            status: "Success add new plane",
            newPlane
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// controller READ Plane
const getPlane = async (req, res, next) => {
    try {
        const Plane = await Pesawat.findAll()

        res.status(200).json({
            status: "Succes",
            Plane
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Controller UPDATE Plane
const updatePlane = async (req, res, next) => {
    try {
        const { plane_number, plane_type } = req.body;
        const PlaneId = req.params.id;

        const Plane = await Plane.findOne({
            where: {
                id: PlaneId
            }
        });

        if (!Plane) {
            return next(new ApiError(`Plane dengan ID ${PlaneId} tidak ditemukan`, 404));
        }

        // Lakukan update pada Plane
        await Plane.update({
            plane_number,
            plane_type
        }, {
            where: {
                id: PlaneId
            }
        });

        res.status(200).json({
            status: "Success",
            message: "Plane updated successfully"
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

// controller DELETE Plane
const deletePlane = async (req, res, next) => {
    try {
      const Plane = await Pesawat.findOne({
        where: {
          id: req.params.id
        }
      })
  
      if (!Plane) {
        return next(new ApiError(`Plane dengan ID ${req.params.id} tidak ditemukan`, 404))
      }
  
      await Plane.destroy({
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
    createPlane,
    getPlane,
    deletePlane,
    updatePlane
  };