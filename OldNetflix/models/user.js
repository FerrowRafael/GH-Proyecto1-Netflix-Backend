'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Token),
    User.hasMany(models.Order)
  };
  return User;
};