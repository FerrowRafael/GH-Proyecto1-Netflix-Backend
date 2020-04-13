const express = require('express');
const router = express.Router();
const GenreController =require('../controllers/GenreController');

router.get('/', GenreController.genresAll); //Filtro todas ciudades
router.get('/id=:id', GenreController.genresById);
router.get('/name=:name', GenreController.genresByName);

module.exports = router;