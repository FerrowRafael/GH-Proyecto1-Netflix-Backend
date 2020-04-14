'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    dateRent: DataTypes.DATE,
    dateArrival: DataTypes.DATE,
    daysRent: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Movie);
  };
  return Order;
};