const { City, User, Order, Sequelize } = require('../models');
const { Op } = Sequelize;

const CityController = {
    // GET ALL CITIES
    citiesAll(req, res){
        City.findAll()
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    citiesUsers(req, res){
        City.findAll({
            include:[User]})
        
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    citiesOrders(req, res){
        City.findAll({
            include:[Order]})
        
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },
}

module.exports = CityController;