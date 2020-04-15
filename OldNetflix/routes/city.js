const express = require('express');
const router = express.Router();
const CityController =require('../controllers/CityController');

router.get('/', CityController.citiesAll); //Filtro todas ciudades
router.get('/user', CityController.citiesUsers); //Filtro todas ciudades con Usuarios
router.get('/order', CityController.citiesOrders); //Filtro todas ciudades con Orders

module.exports = router;