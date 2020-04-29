const { Movie, Genre, Actors, Sequelize } = require('../models');
const { Op } = Sequelize;
const moment = require('moment');

const UserController = {

    // ALL MOVIES
    async MoviesAll(req, res){
        await Movie.findAll({
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

    // MOVIES BY MOVIE ID (WITH GENRE AND ACTORS)
    MoviesById(req, res){
        let { id } = req.params;
        Movie.findAll({
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

    // MOVIE BY MOVIE TITLE (WITH GENRE AND ACTORS)
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
            .then(title => {
                res.status(200);
                res.json(title);
            })
            .catch(err => {
                res.status(500);
                res.json(`"error": ${err}`);
            });
    },

    // MOVIE BY MOVIE TITLE (WITH ACTORS)
    MoviesYActorByTitle(req, res){
        Movie.findAll({
            where: {
                title: 
                {
                    [Op.like]: '%'+ req.params.title +'%'
                }
            },  
            include: [{
                model: Actors,
                where: {
                    name:
                    {
                        [Op.like]: '%'+ req.params.title +'%'  
                    },
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }
                
            }]          
        })


    },

    // MOVIES POPULAR ALL (WITH GENRE AND ACTORS)
    MoviesPopularAll(req, res){
        Movie.findAll({
            where: 
                {vote_count: {
                    [Op.gt]: 10000
                }},
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

    // MOVIES POPULAR BY GENRE NAME (WITH MOVIE)
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

    // MOVIES PREMIERE ALL (WITH GENRE)
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

    // MOVIES PREMIERE BY GENRE NAME (WITH MOVIE)
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

    // MOVIE CREATE (falta añadir id y generos en tabla intermedia)
    async MovieAdd(req, res){
        try{
            const movie = await Movie.create({...req.body})
               movie.addGenre(req.body.GenreId)
            res.send({ movie: movie, message: 'Pelicula creada satisfactoriamente' })
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

            res.send({message: 'Pelicula modificada satisfactoriamente'});
            
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