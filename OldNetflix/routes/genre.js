const express = require('express');
const router = express.Router();
const GenreController =require('../controllers/GenreController');

router.get('/', GenreController.GenresAll); //Filtro todos Generos
router.get('/id=:id', GenreController.GenresById); //Filtro Generos por ID
router.get('/name=:name', GenreController.GenresByName); //Filtro Generos por nombre

module.exports = router;