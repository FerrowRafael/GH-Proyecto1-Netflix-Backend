const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')

router.post('/register', UserController.register); // USER REGISTER
router.post('/login', UserController.login); // USER LOGIN
router.get('/logout', authentication, UserController.logout); // USER LOGOUT
router.get('/info', authentication, UserController.getInfo); //*Arreglar
router.put('/user=:id', UserController.UserModified); // USER MODIFY
router.delete('/user=:id', UserController.UserDelete); /// USER DELETE

// SEARCH
router.get('/', UserController.UsersAll); // ALL USERS
router.get('/user=:id', UserController.UserById); // USER BY ID
router.get('/user/username=:username', UserController.UserByName); // USER BY USERNAME


// ORDERS
router.get('/order/', UserController.UsersOrdersAll); //1.5 ALL A USER ORDERS
router.get('/email=:email', UserController.OrderByEmail); //3 ORDER BY USER EMAIL
router.get('/orderDate=:id', UserController.UserByOrderDates); //4 ORDER BY ORDER DATE ¿?
router.get('/order/id=:id', UserController.UsersOrdersByUserId); //8 A USER ORDERS BY USER ID todos los datos, usuario, pedido y peliculas por pedido





module.exports = router;
