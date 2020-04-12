const axios = require('axios');
const { sequelize } = require('../models/index');
for (let i = 0; i < 501; i++) {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=es-ES&')
        .then(res => {
            const peliculas = res.data.results;
            for (const pelicula of peliculas) {
                sequelize.query(`INSERT INTO movies (popularity, vote_count, poster_path, backdrop_path,
                    original_language, original_title, genre_ids, title, vote_average, overview, release_date)
        VALUES (
            '${pelicula.popularity}',
            '${pelicula.vote_count}',
            '${pelicula.poster_path}',
            '${pelicula.backdrop_path}',
            '${pelicula.original_language}',
            '${pelicula.original_title}',
            '${pelicula.genre_ids}',
            '${pelicula.title}',
            '${pelicula.vote_average}',
            '${pelicula.overview}',
            '${pelicula.release_date}'
            );`)
            }
        })
}

//Arrancar con node Movie.js estando en la carpeta seeders
