"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("Destinations", "title", "name");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("Destinations", "name", "title");
  }
};
