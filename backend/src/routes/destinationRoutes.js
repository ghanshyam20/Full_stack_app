

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/destinationController");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  }
});
const upload = multer({ storage });


// ⭐️ MUST BE FIRST — SEARCH ROUTE
router.get("/search", controller.searchDestinations);

// ⭐️ MUST BE SECOND — GET ONE
router.get("/:id", controller.getDestinationById);

// ⭐️ GET ALL DESTINATIONS
router.get("/", controller.getAllDestinations);

// ⭐ ADMIN ROUTES
router.post("/", upload.single("image"), controller.createDestination);
router.put("/:id", upload.single("image"), controller.updateDestination);
router.delete("/:id", controller.deleteDestination);

module.exports = router;
