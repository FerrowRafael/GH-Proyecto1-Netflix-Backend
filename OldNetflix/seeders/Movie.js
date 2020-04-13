const axios = require('axios');
const { Movie } = require('../models/');
for (let page = 1; page < 21; page++) {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES&page=${page}`)
        .then(res => {
            const peliculas = res.data.results;
            for (const pelicula of peliculas) {
                Movie.create(pelicula)
                .then(movie=>{
                    movie.addGenre(pelicula.genre_ids)
                })
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
}

//Arrancar con node Movie.js estando en la carpeta seeders
