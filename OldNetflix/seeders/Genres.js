const axios = require('axios');
const { sequelize } = require('../models/index');


axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=es-ES')
    .then(res => {
        const generos = res.data.genres;
        
        for (const genero of generos) {
            
            sequelize.query(`INSERT INTO genres (id, name)
        VALUES (
            '${genero.id}', 
            '${genero.name}');`)
        }
    })
