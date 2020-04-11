const express = require('express');
const router = express.Router();
const CityController =require('../controllers/CityController');

router.get('/', CityController.citiesAll); //Filtro todas ciudades


module.exports = router;