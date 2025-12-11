const { Booking, User, Destination } = require("../models");

// -----------------------------------------------------
// USER — Create a Booking
// -----------------------------------------------------
exports.create = async (req, res) => {
  try {
    const { destinationId, name, email, travelers, notes, date } = req.body;

    if (!destinationId || !name || !email || !travelers || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      destinationId,
      name,
      email,
      travelers,
      notes,
      date,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// -----------------------------------------------------
// USER — Update Booking  ⭐ NEW ⭐
// -----------------------------------------------------
exports.update = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only owner of booking OR admin can edit
    if (booking.userId !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, email, travelers, notes, date } = req.body;

    await booking.update({
      name: name ?? booking.name,
      email: email ?? booking.email,
      travelers: travelers ?? booking.travelers,
      notes: notes ?? booking.notes,
      date: date ?? booking.date,
    });

    res.json({ message: "Booking updated", booking });
  } catch (err) {
    console.error("Update Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// -----------------------------------------------------
// USER — View Own Bookings
// -----------------------------------------------------
exports.myBookings = async (req, res) => {
  try {
    const list = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Destination, attributes: ["id", "name", "imageUrl", "price"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (err) {
    console.error("myBookings Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// -----------------------------------------------------
// ADMIN — View ALL Bookings
// -----------------------------------------------------
exports.all = async (req, res) => {
  try {
    const list = await Booking.findAll({
      include: [
        { model: User, attributes: ["id", "email", "role"] },
        { model: Destination, attributes: ["id", "name", "imageUrl", "price"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(list);
  } catch (err) {
    console.error("Admin View Bookings Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// -----------------------------------------------------
// ADMIN — Delete Booking
// -----------------------------------------------------
exports.delete = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error("Delete Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// -----------------------------------------------------
// USER — Update Booking
// -----------------------------------------------------
exports.update = async (req, res) => {
  try {
    const { name, email, travelers, notes, date } = req.body;

    const booking = await Booking.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.update({
      name: name ?? booking.name,
      email: email ?? booking.email,
      travelers: travelers ?? booking.travelers,
      notes: notes ?? booking.notes,
      date: date ?? booking.date,
    });

    res.json({ message: "Booking updated", booking });
  } catch (err) {
    console.error("Update Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
