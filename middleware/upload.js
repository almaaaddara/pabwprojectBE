const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    // konfigurasi penamaan file
    filename: function (req, file, cb) {
      cb(
        null,
        file.originalname
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    // Filter jenis file yang diizinkan untuk diunggah
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true); // Terima file
    } else {
      cb(new Error('Jenis file tidak didukung!'), false); // Tolak file
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });

  module.exports = upload