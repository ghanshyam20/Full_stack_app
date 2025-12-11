// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ---------------------------------------------------------
// BASIC MIDDLEWARE
// ---------------------------------------------------------
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// SERVE UPLOADED IMAGES CORRECTLY
// ---------------------------------------------------------
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ---------------------------------------------------------
// DATABASE SYNC
// ---------------------------------------------------------
const db = require("./models");

// Keep alter:true ONLY during development
db.sequelize
  .sync({ alter: true })
  .then(() => console.log("📦 Database synced with new models."))
  .catch((err) => console.error("❌ Sync error:", err));

// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes"));

// User Routes (Admin + Profile)
app.use("/api/users", require("./routes/userRoutes"));

// Destinations Routes
app.use("/api/destinations", require("./routes/destinationRoutes"));

// Bookings Routes
app.use("/api/bookings", require("./routes/bookingRoutes"));

// Reviews Routes
app.use("/api/reviews", require("./routes/reviewRoutes"));

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});

module.exports = app;
