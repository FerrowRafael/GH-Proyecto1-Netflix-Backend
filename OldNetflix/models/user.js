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
    photo: DataTypes.STRING,
    creditCard: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Token),
    User.belongsTo(models.City),
    User.belongsToMany(models.Movie, {
      through: models.Order,
    })
  };
  return User;
};