'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateRent: {
        type: Sequelize.DATE
      },
      dateArrival: {
        type: Sequelize.DATE
      },
      daysRent: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      MovieId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};