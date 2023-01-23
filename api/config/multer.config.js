const multer = require("multer");

const MIME_TYPES = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const nameWithoutExtension = name.split(`.${extension}`)[0];
    callback(null, nameWithoutExtension + Date.now() + "." + extension);
    // callback(null, Date.now() + name);
  },
});

module.exports = multer({ storage }).single("image");
