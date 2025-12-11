"use strict";

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true, // TEMPORARY FIX
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true, // TEMPORARY FIX
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true, // TEMPORARY FIX
      },
      travelers: {
        type: DataTypes.INTEGER,
        allowNull: true, // TEMPORARY FIX
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {}
  );

  Booking.associate = function (models) {
    Booking.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Booking.belongsTo(models.Destination, {
      foreignKey: "destinationId",
      onDelete: "CASCADE",
    });
  };

  return Booking;
};
