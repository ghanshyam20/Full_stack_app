const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/userController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

/**
 * USER ROUTES
 */

// Logged-in user's profile
router.get("/profile", auth, ctrl.getProfile);


/**
 * ADMIN ROUTES
 * All these require:
 *  - User logged in
 *  - User role = admin
 */

// Admin → Get all users
router.get("/all", auth, isAdmin, ctrl.getAllUsers);

// Admin → Delete a user
router.delete("/:id", auth, isAdmin, ctrl.deleteUser);

// Admin → Update user email or role
router.put("/:id", auth, isAdmin, ctrl.updateUser);

// Admin → Make user admin
router.put("/:id/make-admin", auth, isAdmin, ctrl.makeAdmin);

module.exports = router;
