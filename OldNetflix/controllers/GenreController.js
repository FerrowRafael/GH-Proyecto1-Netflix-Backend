const { Genre, Movie, Sequelize } = require('../models');
const { Op } = Sequelize;

const GenreController = {

    // GENRES ALL
    GenresAll(req, res){
        Genre.findAll()
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        })
    },

    // GENRE BY ID (WITH MOVIE)
    GenresById(req, res){
        let { id } = req.params;
        Genre.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id },           
                include: {
                model: Movie,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
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

    // GENRE BY NAME (WITH MOVIE)
    GenresByName(req, res){
        let { name } = req.params;
        Genre.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { name },           
                include: [{
                model: Movie,
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
    }
}

module.exports = GenreController;