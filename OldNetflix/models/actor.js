'use strict';
module.exports = (sequelize, DataTypes) => {
  const Actors = sequelize.define('Actors', {
    name: DataTypes.STRING
  }, {});
  Actors.associate = function(models) {
    Actors.belongsToMany(models.Movie, {
      through: models.MovieActor,
    })
  };
  return Actors;
};