const express = require('express');
const router = express.Router();
const MovieController =require('../controllers/MovieController');
const UserController =require('../controllers/UserController');

// ADMINISTRADOR
router.get('/', OrderController.ordersAll); //Filtro todos pedidos de todos los clientes
router.get('/clientId=:id', OrderController.ordersById); //Filtro todos los pedidos de un cliente por ID
router.get('/email=:email', OrderController.ordersByEmail); //Filtro todos los pedidos de un cliente por Correo?

// CLIENTE
router.get('/', OrderController.ordersAll); //Filtro todos pedidos de todos los clientes

module.exports = router;