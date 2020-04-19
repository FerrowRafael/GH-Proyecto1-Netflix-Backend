const express = require('express');
const router = express.Router();
const CityController =require('../controllers/CityController');

router.get('/', CityController.CitiesAll); //Filtro todas ciudades
router.get('/user', CityController.CitiesUsers); //Filtro todas ciudades con Usuarios
router.get('/name=:name', CityController.CityByName);//Hacer filtro ciudades por nombre

module.exports = router;