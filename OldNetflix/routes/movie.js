const express = require('express');
const router = express.Router();
const MovieController =require('../controllers/MovieController');

// ALL MOVIES
router.get('/', MovieController.MoviesAll); // MOVIES ALL
router.get('/id=:id', MovieController.MoviesById); // MOVIES BY MOVIE ID
router.get('/title=:title', MovieController.MoviesByTitle); // MOVIE BY MOVIE TITLE
// router.get('/search=:title', MovieController.MoviesByTitleActor); // MOVIE BY MOVIE TITLE AND ACTOR **

// POPULAR
router.get('/popular', MovieController.MoviesPopularAll); // MOVIES POPULAR ALL
router.get('/popular/genre=:name', MovieController.MoviesPopularByGenre); // MOVIES POPULAR BY GENRE NAME
// router.get('/popular/title=:title', MovieController.MoviesPopularByTitle); // MOVIES POPULAR BY TITLE NAME **

// PREMIERE
router.get('/premiere', MovieController.MoviesPremiereAll); // MOVIES PREMIERE ALL
router.get('/premiere/genre=:name', MovieController.MoviesPremiereByGenre); // MOVIES PREMIERE BY GENRE NAME
// router.get('/premiere/title=:title', MovieController.premiereByTitle); // MOVIES PREMIERE BY TITLE NAME **

router.post('/', MovieController.MovieAdd); // MOVIE CREATE (falta añadir id y generos en tabla intermedia)
router.put('/id=:id', MovieController.MovieModify); // MOVIE MODIFY
router.delete('/id=:id', MovieController.MovieDelete); // MOVIE DELETE

module.exports = router;
