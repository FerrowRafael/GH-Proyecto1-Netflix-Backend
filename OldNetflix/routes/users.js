const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', authentication, UserController.logout); 
router.get('/info', authentication, UserController.getInfo); //*Arreglar
router.put('/user=:id', UserController.UserModified);
router.delete('=:id', UserController.UserDelete);

// SEARCH
router.get('/', UserController.UsersAll);
router.get('user=:id', UserController.UsersById);
router.get('/user=:username', UserController.UsersByName);

// ORDERS
router.get('/order=:id', UserController.UsersOrdersById); //Todos los datos, usuario, pedido y peliculas por pedido
router.get('/orderDate=:id', UserController.UserOrderDates); //Fechas pedidos por usuario
router.get('/order/email=:email', UserController.OrderByEmail); //Busqueda pedidos por email usuario



module.exports = router;
