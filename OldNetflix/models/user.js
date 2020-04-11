'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING,
    creditCard: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Token),
    User.hasMany(models.Order),
    User.belongsTo(models.City)
  };
  return User;
};