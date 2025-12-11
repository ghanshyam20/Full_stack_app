const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// User leaves a review , this is for futre implement 
router.post("/", auth, ctrl.create);

// Get all reviews for a destination , futue implement 
router.get("/:destinationId", ctrl.getByDestination);

// User updates own review
router.put("/:id", auth, ctrl.update);

// User deletes own review or Admin deletes any
router.delete("/:id", auth, ctrl.delete);

module.exports = router;
