const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/bookingController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// USER — create booking
router.post("/", auth, ctrl.create);

// USER — update booking  
router.put("/:id", auth, ctrl.update);

// USER — view own bookings
router.get("/my", auth, ctrl.myBookings);

// ADMIN — view all bookings
router.get("/", auth, isAdmin, ctrl.all);

// ADMIN — delete booking
router.delete("/:id", auth, isAdmin, ctrl.delete);


router.put("/:id", auth, ctrl.update);  // user can update booking


module.exports = router;
