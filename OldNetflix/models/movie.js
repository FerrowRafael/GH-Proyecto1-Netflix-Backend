'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    popularity: DataTypes.INTEGER,
    vote_count: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    original_language: DataTypes.STRING,
    original_title: DataTypes.STRING,
    title: DataTypes.STRING,
    vote_average: DataTypes.DECIMAL,
    overview: DataTypes.STRING,
    release_date: DataTypes.DATE
  }, {});
  Movie.associate = function(models) {
    Movie.belongsToMany(models.User, {
      through: models.Order,
    }),
    Movie.belongsToMany(models.Genre, {
      through: models.MovieGenre,
    })
  };
  return Movie;
};