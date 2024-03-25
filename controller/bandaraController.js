const { Bandara } = require("../models")
const ApiError = require("../utils/apiError")

// Controller CREATE bandara
const createBandara = async (req, res, next) => {
    try {
        const { name, icao_code, city } = req.body

        const newBandara = await Bandara.create({
            name, icao_code, city
        })
        res.status(200).json({
            status: "Success add new bandara",
            newBandara
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Controller Read Bandara By ID
const getBandaraById = async (req, res, next) => {
    try {
        const bandara = await Bandara.findOne({
            where: {id: req.params.id}
        })
  
        res.status(200).json({
            status: "Succes",
            data: bandara,
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
  }

// controller READ bandara
const getbandara = async (req, res, next) => {
    try {
        const bandara = await Bandara.findAll()

        res.status(200).json({
            status: "Succes",
            bandara
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Controller get bandara by ID
const getBandaraId = async (req, res, next) => {
  try {
      const bandara = await Bandara.findOne({
          where: {id: req.params.id}
      })

      res.status(200).json({
          status: "Succes",
          data: bandara,
        })
  } catch (err) {
      next(new ApiError(err.message, 500))
  }
}

// Controller UPDATE bandara
const updateBandara = async (req, res, next) => {
  try {
      const { name, icao_code, city } = req.body;
      const id_bandara = req.params.id;

      const bandara = await Bandara.findOne({
          where: {
              id: id_bandara
          }
      });

      if (!bandara) {
          return next(new ApiError(`Bandara dengan ID ${id_bandara} tidak ditemukan`, 404));
      }

      // Pastikan ada perubahan dalam data sebelum memperbarui
      if (name !== bandara.name || icao_code !== bandara.icao_code || city !== bandara.city) {
          // Lakukan update pada bandara
          await Bandara.update({
              name, icao_code, city
          }, 
          {
              where: {
                  id: id_bandara
              }
          });

          // Ambil bandara yang diperbarui
          const updatedBandara = await Bandara.findOne({
              where: {
                  id: id_bandara
              }
          });

          res.status(200).json({
              status: "Success",
              message: "Bandara updated successfully",
              updatedBandara
          });
      } else {
          // Jika tidak ada perubahan dalam data
          res.status(200).json({
              status: "Success",
              message: "No changes detected, bandara remains the same",
              bandara
          });
      }
  } catch (err) {
      next(new ApiError(err.message, 500));
  }
};

// controller DELETE bandara
const deleteBandara = async (req, res, next) => {
    try {
      const bandara = await Bandara.findOne({
        where: {
          id: req.params.id
        }
      })
  
      if (!bandara) {
        return next(new ApiError(`Bandara dengan ID ${req.params.id} tidak ditemukan`, 404))
      }
  
      await Bandara.destroy({
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
    createBandara,
    getbandara,
    getBandaraById,
    updateBandara,
    deleteBandara
  };