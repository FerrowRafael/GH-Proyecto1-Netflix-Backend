'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieGenre = sequelize.define('MovieGenre', {
    MovieId: DataTypes.INTEGER,
    GenreId: DataTypes.INTEGER
  }, {});
  MovieGenre.associate = function(models) {
    // associations can be defined here
  };
  return MovieGenre;
};