const express = require('express');
const router = express.Router();
const MovieController =require('../controllers/MovieController');

// ALL MOVIES
router.get('/', MovieController.moviesAll); //Filtro todas peliculas
router.get('/id=:id', MovieController.moviesById); //Filtro todas peliculas por Id
router.get('/genre/:genre', MovieController.moviesByGenre); //Filtro todas peliculas por Genero *
router.get('/title=:title', MovieController.moviesByTitle); //Filtro todas peliculas por Titulo

// POPULAR
router.get('/popular', MovieController.popularAll); //Filtro todas populares
router.get('/popular/genre/:genre', MovieController.popularByGenre); //Filtro todas populares por Genero
router.get('/popular/title/:title', MovieController.popularByTitle); //Filtro todas populares por Titulo

// PREMIERE
router.get('/premiere', MovieController.premiereAll); //Filtro todas premiere
router.get('/premiere/genre/:genre', MovieController.premiereByGenre); //Filtro todas premiere
router.get('/premiere/title/:title', MovieController.premiereByTitle); //Filtro todas premiere

// ACTOR
router.get('/actor', MovieController.actorAll); //Filtro todas actor

module.exports = router;
