const express = require('express');
const router = express.Router();
const ActorController =require('../controllers/ActorController');

router.get('/', ActorController.ActorsAll); //Filtro todos Actores
router.get('/id=:id', ActorController.ActorById); //Filtro Actores por ID
router.get('/name=:name', ActorController.ActorByName); //Filtro Actores por nombre

module.exports = router;