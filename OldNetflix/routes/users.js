const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication, isAdmin } =require('../middleware/authentication')

router.post('/register', UserController.register); // USER REGISTER
router.post('/login', UserController.login); // USER LOGIN
router.get('/logout', authentication, UserController.logout); // USER LOGOUT
router.get('/info', authentication, UserController.getUserInfo); //*Arreglar
router.put('/user', UserController.UserModified); // USER MODIFY **
// router.delete('/user=:id', authentication, isAdmin, UserController.UserDelete); /// USER DELETE **

// SEARCH
router.get('/', UserController.UsersAll); // ALL USERS
router.get('/user=:id', authentication, isAdmin, UserController.UserById); // USER BY ID
router.get('/user/username=:username', authentication, isAdmin, UserController.UserByName); // USER BY USERNAME

// ORDERS
router.get('/order/', authentication, UserController.UsersOrdersAll); //1.5 ALL A USER ORDERS
router.get('/email=:email', authentication, isAdmin, UserController.OrderByEmail); //3 ORDER BY USER EMAIL
router.get('/orderDate=:id', authentication, isAdmin, UserController.UserByOrderDates); //4 ORDER BY ORDER DATE ¿?
router.get('/order/id=:id', authentication, isAdmin, UserController.UsersOrdersByUserId); //8 A USER ORDERS BY USER ID todos los datos, usuario, pedido y peliculas por pedido





module.exports = router;
