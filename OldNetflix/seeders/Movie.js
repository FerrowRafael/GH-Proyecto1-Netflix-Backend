const axios = require('axios');
const { sequelize } = require('../models/index');
for (let page = 0; page < 101; page++) {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES&page=${page}')
        .then(res => {
            const peliculas = res.data.results;
            for (const pelicula of peliculas) {
                sequelize.query(`INSERT INTO movies (idMovie, popularity, vote_count, poster_path, backdrop_path,
                    original_language, original_title, genre_ids, title, vote_average, overview, release_date)
        VALUES (
            '${pelicula.id}',
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
            );`
            )}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
}

//Arrancar con node Movie.js estando en la carpeta seeders
