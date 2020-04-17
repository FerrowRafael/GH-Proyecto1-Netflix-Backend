const express = require('express');
const router = express.Router();
const SearchController =require('../controllers/SearchController');

router.get('/order/dateR=:dateRent', SearchController.OrderByDateRent); //Busqueda pedidos por fecha alquiler
// router.get('/order/dateA=:dateArrival', SearchController.OrderByDateArrival); //Busqueda pedidos por fecha entrega
router.get('/order/movie=:title', SearchController.OrderByMovieTitle); //Busqueda pedidos por fecha alquiler



module.exports = router;