const { City, User, Order, Movie, Sequelize } = require('../models');
const { Op } = Sequelize;

const CityController = {

    // GET ALL CITIES
    CitiesAll(req, res){
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
    CitiesUsers(req, res){
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

    CityByName(req, res){
        let { name } = req.params;
        City.findOne({
            where: { name }, 
            attributes: { exclude: ['createdAt', 'updatedAt'] },          
        })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    }
}

module.exports = CityController;