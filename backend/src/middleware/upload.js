const multer = require("multer");
const path = require("path");
const fs = require("fs");

// this iw  what  i make for  Absolute path to uploads folder INSIDE backend
const uploadPath = path.join(__dirname, "../../uploads");

// Create uploads folder if missing
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // , ps =stackoverflow 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG allowed"), false);
};

module.exports = multer({
  storage,
  fileFilter
});
