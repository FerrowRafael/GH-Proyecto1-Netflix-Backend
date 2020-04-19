const axios = require('axios');
const { Actors } = require('../models/');

for (let page = 1; page < 201; page++) {
axios.get(`https://api.themoviedb.org/3/person/popular?api_key=f1cbc5636aa2f2d3b7c9f1c1ca7c91de&language=en-US&page=${page}`)
    .then(res => {
        const resultados = res.data.results;
        
        for (const resultado of resultados) {
            Actors.create({
                name:resultado.name, 
                id:resultado.id,
                profile_path:resultado.profile_path

            })
            .then(actors => {resultado.known_for.forEach(actor => {actors.addMovie(actor.id)})})
            .catch(function (error) {
                // handle error
                console.log(error);
              })
            
            
        }
    })
}