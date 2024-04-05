// const multer = require("multer");
// const ApiError = require("../utils/apiError");

// const storage = multer.memoryStorage();
// const allowedImageMimeTypes = ["image/jpg", "image/png", "image/jpeg"];

// const imageFilter = (req, file, cb) => {
//   const isAllowedMimeType = allowedImageMimeTypes.includes(file.mimetype);
//   if (isAllowedMimeType) {
//     return cb(null, true);
//   }
//   return cb(new ApiError("Ekstensi gambar tidak valid", 400));
// };

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     if (file.fieldname === "imageFile") {
//       imageFilter(req, file, cb);
//     }
//     cb(new ApiError("Field tidak valid", 400));
//   },
// }).fields([
//   { name: "imageFile", maxCount: 10 },
// ]);

// module.exports = upload;

// --------------------------------------
const multer = require("multer");
const ApiError = require("../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Preserve the original filename
  },
});
const upload = multer({ storage: storage });
