const express = require('express');
const router = express.Router();
const GenreController =require('../controllers/GenreController');

router.get('/', GenreController.GenresAll); // GENRES ALL
router.get('/id=:id', GenreController.GenresById); // GENRE BY ID (WITH MOVIE)
router.get('/name=:name', GenreController.GenresByName); // GENRE BY NAME (WITH MOVIE)

module.exports = router;