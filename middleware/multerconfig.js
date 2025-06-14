const multer = require("multer");
const path = require("path");

// Storage location and filename
const storage = multer.diskStorage({destination: function (req, file, cb) {
    cb(null, "./public/upload"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
