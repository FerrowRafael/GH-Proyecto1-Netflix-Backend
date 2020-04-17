'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieActor = sequelize.define('MovieActor', {
    MovieId: DataTypes.INTEGER,
    ActorId: DataTypes.INTEGER
  }, {});
  MovieActor.associate = function(models) {
    // associations can be defined here
  };
  return MovieActor;
};