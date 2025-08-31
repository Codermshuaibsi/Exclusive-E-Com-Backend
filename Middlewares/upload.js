const multer = require("multer");
const path = require("path");

// Store files temporarily
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

module.exports = upload;
