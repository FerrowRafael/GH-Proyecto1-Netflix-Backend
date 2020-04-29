const express = require('express');
const router = express.Router();
const SearchController =require('../controllers/SearchController');

router.get('/order/dateR=:dateRent', SearchController.OrderByDateRent); // ORDER BY DATERENT **
// router.get('/order/dateA=:dateArrival', SearchController.OrderByDateArrival); // ORDER BY DATEARRIVAL **
router.get('/order/movie=:title', SearchController.OrderByMovieTitle); // ORDER BY MOVIE TITLE **



module.exports = router;