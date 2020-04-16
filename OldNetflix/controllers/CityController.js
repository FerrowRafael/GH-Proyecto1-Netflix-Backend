const { City, User, Order, Movie, Sequelize } = require('../models');
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

    // TODAS LAS CIUDADES CON SUS USUARIOS
    citiesUsers(req, res){
        City.findAll({
            include: [{
                model: User,
                attributes: { exclude: ['createdAt', 'updatedAt']},
                include: [{
                    model: Order,
                    include: [{
                        model: Movie
                    }]
                }]
            }],
        })
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