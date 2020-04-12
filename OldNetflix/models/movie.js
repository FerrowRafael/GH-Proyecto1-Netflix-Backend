'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    idMovie: DataTypes.INTEGER,
    popularity: DataTypes.INTEGER,
    vote_count: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING,
    original_language: DataTypes.STRING,
    original_title: DataTypes.STRING,
    genre_ids: DataTypes.INTEGER, //Tabla aparte
    title: DataTypes.STRING,
    vote_average: DataTypes.DECIMAL,
    overview: DataTypes.STRING,
    release_date: DataTypes.STRING
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