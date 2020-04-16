const express = require('express');
const router = express.Router();
const OrderController =require('../controllers/OrderController');


// ADMINISTRADOR
router.get('/', OrderController.OrdersAll); //Filtro todos pedidos de todos los clientes
router.get('/order=:id', OrderController.OrderById); //Filtro de un pedido por ID
router.put('/user=:id', OrderController.OrderModify); //Modificacion Pedido
router.delete('/user=:id', OrderController.OrderDelete); //Eliminacion Pedido

// CLIENTE
router.get('/user=:id', OrderController.OrdersAllUser); //Filtro todos pedidos de un cliente
router.post('/user', OrderController.OrderCreate); //Creacion Pedido


module.exports = router;