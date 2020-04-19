const { Movie, Genre, Actors, Sequelize } = require('../models');
const { Op } = Sequelize;
const moment = require('moment');

const UserController = {

    // ALL MOVIES
    MoviesAll(req, res){
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

    // MOVIES BY MOVIE ID
    MoviesById(req, res){
        let { id } = req.params;
        Movie.findOne({
            where: { id },
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

    // MOVIE BY MOVIE TITLE
    MoviesByTitle(req, res){
        Movie.findAll({ 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                title: 
                {
                    [Op.like]: '%'+ req.params.title +'%'
                }
            },         
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

    // MOVIES POPULAR ALL
    MoviesPopularAll(req, res){
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

    // MOVIES POPULAR BY GENRE NAME
    MoviesPopularByGenre(req, res){
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

    // MOVIES POPULAR BY TITLE NAME **
    MoviesPopularByTitle(req, res){  //* Meterle que filtre nombres no completos y por nombre original
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

    // MOVIES PREMIERE ALL
    MoviesPremiereAll(req, res){
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

    // MOVIES PREMIERE BY GENRE NAME
    MoviesPremiereByGenre(req, res){
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

    // MOVIES PREMIERE BY TITLE NAME **
    MoviesPremiereByTitle(req, res){
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

    // MOVIE CREATE (falta añadir id y generos en tabla intermedia)
    async MovieAdd(req, res){
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

    // MOVIE MODIFY
    MovieModify(req, res){
        let body = req.body;
        let { id } = req.params;
        Movie.update({ 
            popularity: body.popularity,
            vote_count: body.vote_count,
            poster_path: body.poster_path,
            backdrop_path: body.backdrop_path,
            original_language: body. original_language,
            original_title: body.original_title,
            title: body.title,
            vote_average: body.vote_average,
            overview: body.overview,
            release_date: body.release_date,
            GenreId: body.GenreId
        },
            { where: 
                { id } 
            }
        )
        .then(data => {
            res.status(200);

            res.send({message: 'Pedido modificado satisfactoriamente'});
            
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        }); 
    },

    // MOVIE DELETE
    MovieDelete(req, res){
        let { id } = req.params;
        Movie.destroy({ where: { id } })
        .then(movie => {
            res.status(200);
            res.send({message: 'Pelicula eliminada satisfactoriamente'});
            res.json(movie)
        })
        .catch(err => {
            res.status(500);
            res.json(`"error": ${err}`);
        });
    },
}

module.exports = UserController;