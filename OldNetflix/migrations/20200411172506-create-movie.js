'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMovie: {
        type: Sequelize.INTEGER
      },
      popularity: {
        type: Sequelize.INTEGER
      },
      vote_count: {
        type: Sequelize.INTEGER
      },
      poster_path: {
        type: Sequelize.STRING
      },
      backdrop_path: {
        type: Sequelize.STRING
      },
      original_language: {
        type: Sequelize.STRING
      },
      original_title: {
        type: Sequelize.STRING
      },
      genre_ids: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      vote_average: {
        type: Sequelize.DECIMAL
      },
      overview: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies');
  }
};