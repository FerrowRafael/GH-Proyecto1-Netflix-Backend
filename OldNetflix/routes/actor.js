const express = require('express');
const router = express.Router();
const ActorController =require('../controllers/ActorController');

router.get('/', ActorController.ActorsAll);  // ACTORS ALL
router.get('/id=:id', ActorController.ActorById); // ACTOR BY ID
router.get('/name=:name', ActorController.ActorByName); // ACTOR BY NAME

module.exports = router;