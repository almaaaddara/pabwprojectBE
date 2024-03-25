const { Pesawat, Kursi } = require("../models")
const ApiError = require("../utils/apiError")

// Controller CREATE Plane
const createPlane = async (req, res, next) => {
  try {
      const { plane_number, plane_type, airplane_partner } = req.body

      // Membuat pesawat baru
      const newPlane = await Pesawat.create({
          plane_number, 
          plane_type, 
          airplane_partner
      });

      // Membuat 200 kursi untuk pesawat baru
      const rows = 20;
      const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

      const kursiData = [];
      for (let i = 1; i <= rows; i++) {
          for (let j = 0; j < columns.length; j++) {
              const seat_number = columns[j] + i.toString();
              const seat_status = "True"; // Atur status kursi ke True sesuai kebutuhan
              const plane_id = newPlane.id;

              kursiData.push({ seat_number, seat_status, plane_id });
          }
      }

      // Simpan semua kursi ke dalam database
      await Kursi.bulkCreate(kursiData);

      res.status(200).json({
          status: "Success add new plane",
          newPlane
      });
  } catch (err) {
      next(new ApiError(err.message, 500));
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

const getPlaneById = async (req, res, next) => {
  try {
      const plane = await Pesawat.findOne({
          where: {id: req.params.id}
      })

      res.status(200).json({
          status: "Succes",
          data: plane,
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
    getPlaneById,
    deletePlane,
    updatePlane
  };