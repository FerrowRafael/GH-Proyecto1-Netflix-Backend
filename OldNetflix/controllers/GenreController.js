const { Genre, Movie, Sequelize } = require('../models');
const { Op } = Sequelize;

const GenreController = {

    // TODOS LOS GENEROS
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

    // FILTRO GENERO POR ID (CON PELICULAS)
    GenresById(req, res){
        let { id } = req.params;
        Genre.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id },           
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
    },

    // FILTRO GENERO POR NOMBRE (CON PELICULAS)
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