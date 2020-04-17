const { Movie, Genre, Actors, Sequelize } = require('../models');
const { Op } = Sequelize;
const moment = require('moment');

const UserController = {

    // ALL MOVIES
    moviesAll(req, res){
        Movie.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [Genre, Actors],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

    // Filtro peliculas por ID
    moviesById(req, res){
        let { id } = req.params;
        Movie.findOne({
            where: { id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [Genre, Actors],
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
    },

    moviesByTitle(req, res){
        Movie.findAll({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                title: {
                    [Op.like]: '%'+ req.params.title +'%'
                }
            },         
            include: [Genre, Actors]
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

    // POPULAR ALL
    popularAll(req, res){
        Movie.findAll({
            where: 
                {vote_count: {
                    [Op.gt]: 10000
                }},
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [Genre, Actors],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

    // POPULAR BY GENRE
    popularByGenre(req, res){
        let { name } = req.params;
        Genre.findOne({
            where: { name },
            include: [{
                model: Movie,
                where: 
                {vote_count: {
                    [Op.gt]: 10000
                  }
                },
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

    // POPULAR BY TITLE **
    popularByTitle(req, res){  //* Meterle que filtre nombres no completos y por nombre original
        let { title } = req.params;
        Movie.findAll({
            where: {[
                Op.and]: [
                    { title },
                    { vote_count: {[Op.gt]: 10000}}
                ]},
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [Genre, Actors],
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

    // PREMIERE ALL
    premiereAll(req, res){
        Movie.findAll({
            where: {
                release_date: {
                    [Op.between]: [moment().subtract(3, 'months'), moment().format()],
                }},
            include: Genre,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

    // PREMIERE BY GENRE
    premiereByGenre(req, res){
        let { name } = req.params;
        Genre.findOne({
            where: { name },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Movie,
                where: {
                    release_date: {
                        [Op.between]: [moment().subtract(3, 'months'), moment().format()],
                    }},
                
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

    // PREMIERE BY TITLE **
    premiereByTitle(req, res){
        let { title } = req.params;
        Genre.findOne({
            where: { title },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Actors, Movie,
                where: {
                    release_date: {
                        [Op.between]: [moment().subtract(3, 'months'), moment().format()],
                    }}
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

    // CREATE MOVIE
    async movieAdd(req, res){
        try{
            Movie.create({...req.body})
            .then(movie=>{
               movie.addGenre(req.body.GenreId)
               res.send(movie)
            })
        }
        catch{
            res.status(500).send({ message: 'Ha habido un error al crear la pelicula' })
        }    
    },

    // ACTOR
    actorAll(req, res){

    },
}

module.exports = UserController;