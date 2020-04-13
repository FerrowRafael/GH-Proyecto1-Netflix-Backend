const { Movie, Genre, Sequelize } = require('../models');
const { Op } = Sequelize;

const UserController = {

    // ALL MOVIES
    moviesAll(req, res){
        Movie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
            model: Genre,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }],})
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            })
    },

    moviesById(req, res){
        let { id } = req.params;
        Movie.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id },           
                include: [{
                model: Genre,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
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

    moviesByTitle(req, res){
        let { title } = req.params;
        Movie.findOne({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { title },           
                include: [{
                model: Genre,
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

    // POPULAR
    popularAll(req, res){
        Movie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: 
                {vote_count: {
                    [Op.gt]: 10000
                  }
                }
            }
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

    // Popular por Genero
    popularByGenre(req, res){
        let { name} = req.params;
        Genre.findOne({
            where: { name },  
            attributes: { exclude: ['createdAt', 'updatedAt'] },         
            include: [{
                model: Movie,
                where: 
                {vote_count: {
                    [Op.gt]: 10000
                  }
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
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

    popularByTitle(req, res){  //*Meterle que filtre nombres no completos y por nombre original
        let { title } = req.params;
        Movie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {[
                Op.and]: [
                    { title },
                    {vote_count: {[Op.gt]: 10000}}
                ]}
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

    // PREMIERE
    premiereAll(req, res){
        Movie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: 
                {release_date: 2019-06-21}
            }
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

    premiereByGenre(req, res){
        let { name} = req.params;
        Genre.findOne({
            where: { name },  
            attributes: { exclude: ['createdAt', 'updatedAt'] },         
            include: [{
                model: Movie,
                // where: 
                // {vote_count: {
                //     [Op.gt]: 10000
                //   }
                // },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
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

    premiereByTitle(req, res){

    },

    // ACTOR
    actorAll(req, res){

    },

}

module.exports = UserController;