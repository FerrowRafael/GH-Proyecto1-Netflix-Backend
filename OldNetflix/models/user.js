'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    CityId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Token),
    User.belongsTo(models.City),
    User.hasMany(models.Order)
  };
  return User;
};