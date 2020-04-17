const { Actors, City, User, Order, Movie, Sequelize } = require('../models');
const { Op } = Sequelize;


const ActorController = {
    ActorsAll(req, res){
        Actors.findAll()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        })
    },

    ActorById(req, res){
        let { id } = req.params;
        Actors.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Movie,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }]
        })
            
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

    ActorByName(req, res){
        let { name } = req.params;
        Actors.findOne({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { name },           
            include: [{
                model: Movie,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],}
            )
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

}


module.exports = ActorController;