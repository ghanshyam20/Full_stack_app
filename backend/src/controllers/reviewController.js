const { Review, User, Destination } = require("../models");


module.exports = {
  create: async (req, res) => {
    try {
      const { destinationId, rating, comment } = req.body;

      const review = await Review.create({
        userId: req.user.id,
        destinationId,
        rating,
        comment,
      });

      res.json({ message: "Review added", review });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByDestination: async (req, res) => {
    try {
      const { destinationId } = req.params;

      const reviews = await Review.findAll({
        where: { destinationId },
        include: [{ model: User, attributes: ["name"] }],
      });

      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);

      if (!review) return res.status(404).json({ error: "Not found" });
      if (review.userId !== req.user.id)
        return res.status(403).json({ error: "Not allowed" });

      review.comment = req.body.comment;
      review.rating = req.body.rating;
      await review.save();

      res.json({ message: "Updated", review });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const review = await Review.findByPk(id);
      if (!review) return res.status(404).json({ error: "Not found" });

      if (req.user.role !== "admin" && review.userId !== req.user.id)
        return res.status(403).json({ error: "Not allowed" });

      await review.destroy();
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
