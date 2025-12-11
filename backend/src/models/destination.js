"use strict";

module.exports = (sequelize, DataTypes) => {
  const Destination = sequelize.define(
    "Destination",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      category: DataTypes.STRING, // ✔ YOU WERE MISSING THIS
    },
    {}
  );

  Destination.associate = function (models) {
    if (models.Booking) {
      Destination.hasMany(models.Booking, {
        foreignKey: "destinationId",
        onDelete: "CASCADE",
      });
    }
  };

  return Destination;
};
