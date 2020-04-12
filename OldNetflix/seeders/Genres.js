const axios = require('axios');
const { sequelize } = require('../models/index');
for (let page = 0; page < 101; page++) {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES')
        .then(res => {
            const peliculas = res.data.results;
            for (const pelicula of peliculas) {
                sequelize.query(`INSERT INTO movies (id, name)
        VALUES (
            '${pelicula.id}',
            '${pelicula.name}',

            );`
            )}
        })
        .catch(function (error) {
            // handle error
            console.log(error);
          })
}
