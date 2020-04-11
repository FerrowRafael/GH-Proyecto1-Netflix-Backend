'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    city: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    City.hasMany(models.User)
  };
  return City;
};