const express = require('express');
const router = express.Router();
const OrderController =require('../controllers/OrderController');


// ADMINISTRADOR
router.get('/', OrderController.ordersAll); //Filtro todos pedidos de todos los clientes
router.get('/order=:id', OrderController.orderById); //Filtro de un pedido por ID
// router.get('/email=:email', OrderController.orderByEmail); //Filtro todos los pedidos de un cliente por Correo?


// CLIENTE
router.post('/user', OrderController.orderCreate); //Creacion Pedido
router.get('/user=:id', OrderController.ordersAllUser); //Filtro todos pedidos de un cliente
// router.put('/user=:id', OrderController.orderModify); //Creacion Pedido


module.exports = router;