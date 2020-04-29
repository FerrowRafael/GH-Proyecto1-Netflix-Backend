const express = require('express');
const router = express.Router();
const CityController =require('../controllers/CityController');

router.get('/', CityController.CitiesAll); // GET ALL CITIES
router.get('/user', CityController.CitiesUsers); // GET ALL CITIES (WITH USERS AND ORDERS)
router.get('/name=:name', CityController.CityByName); // CITY BY NAME

module.exports = router;