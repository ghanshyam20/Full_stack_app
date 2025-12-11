const { Destination } = require("../models");   
const { Op } = require("sequelize");

exports.searchDestinations = async (req, res) => {
  try {
    const query = req.query.q || "";

    const results = await Destination.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` }
      }
    });

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error during search" });
  }
};

exports.getAllDestinations = async (req, res) => {
  try {
    const data = await Destination.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load data" });
  }
};

exports.getDestinationById = async (req, res) => {
  try {
    const item = await Destination.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Error fetching destination" });
  }
};

exports.createDestination = async (req, res) => {
  try {
    const newItem = await Destination.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file ? "/uploads/" + req.file.filename : null,
    });

    res.json(newItem);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to create" });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const item = await Destination.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });

    await item.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file ? "/uploads/" + req.file.filename : item.imageUrl,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const item = await Destination.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });

    await item.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
