// This middleware checks if the logged-in user is an admin.
// If the user is NOT admin, they cannot access admin routes.

module.exports = (req, res, next) => {
  // If req.user is missing OR role is not admin → stop request
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  // If role is admin → allow request
  next();
};
