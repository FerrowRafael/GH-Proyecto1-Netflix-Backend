const { Actors, City, User, Order, Movie, Sequelize } = require('../models');
const { Op } = Sequelize;


const ActorController = {

    // ACTORS ALL
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

    // ACTOR BY ID
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

    // ACTOR BY NAME
    ActorByName(req, res){
        Actors.findAll({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                name: 
                {
                    [Op.like]: '%'+ req.params.name +'%'
                }
            },               
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