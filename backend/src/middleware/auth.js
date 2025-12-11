// This middleware checks if the user is logged in.
// It reads the token, verifies it, and loads the user's details from the database.

const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // 1. this wil  Read token from request header
    const authHeader = req.headers.authorization;

    // If no token → user is not logged in , yedi token xaina vaney user login xaina vanne bujhunxa
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract the actual token
    const token = authHeader.split(" ")[1];

    // 2. Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user from database using ID inside token , token vitra ko id use garera user nikalxa
    const user = await User.findByPk(decoded.id);

    // If user does not exist → block access ,, yedi user vayena vane xirna didaina 
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Attach simple user details to request (others can read it)
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // "admin" or "user"
    };

    // Allow request to continue
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
