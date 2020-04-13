'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    dateRent: DataTypes.INTEGER,
    dateArrival: DataTypes.INTEGER,
    daysRent: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
  }, {});
  Order.associate = function(models) {

  };
  return Order;
};