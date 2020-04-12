const { Movie, Sequelize } = require('../models');
const { Op } = Sequelize;

const UserController = {

    // ALL MOVIES
    moviesAll(req, res){
        Movie.findAll()
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
        Movie.findAll(
            { where: { id } })
            .then(data => {
                res.status(200);
                res.json(data);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

    moviesByGenre(req, res){

    },

    moviesByTitle(req, res){
        let { title } = req.params;
        Movie.findAll({ where: { title} })
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

    },

    popularById(req, res){

    },

    popularByGenre(req, res){

    },

    popularByTitle(req, res){

    },

    // PREMIERE
    premiereAll(req, res){

    },

    premiereById(req, res){

    },

    premiereByGenre(req, res){

    },

    premiereByTitle(req, res){

    },

    // ACTOR
    actorAll(req, res){

    },

}

module.exports = UserController;