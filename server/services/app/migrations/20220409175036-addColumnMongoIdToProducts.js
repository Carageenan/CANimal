"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "userMongoId", { type: Sequelize.DataTypes.STRING });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "userMongoId");
  },
};
