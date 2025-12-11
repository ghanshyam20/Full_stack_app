"use strict";

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      travelers: {
        type: DataTypes.INTEGER,
        allowNull: true, 
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
