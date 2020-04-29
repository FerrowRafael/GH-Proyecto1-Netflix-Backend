const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication, isAdmin } =require('../middleware/authentication')

// USERS
router.post('/register', UserController.register); // 1 USER REGISTER xd
router.post('/login', UserController.login); // 2 USER LOGIN xd
router.get('/logout', authentication, UserController.logout); // 3 USER LOGOUT xd
router.get('/info', authentication, UserController.UserInfo); // 4 USER INFO xd
router.put('/update', authentication, UserController.UserModified); // 5 USER MODIFY xd

// ADMIN
router.delete('/delete/id=:id', authentication, isAdmin, UserController.UserDelete); /// 6 USER DELETE xd
router.get('/info/all', authentication, isAdmin, UserController.UsersAll); // 7 ALL USERS **Falta añadir isAdmin
router.get('/info/id=:id', authentication, isAdmin, UserController.UserById); // 8 USER BY ID xd
router.get('/info/username=:username', authentication, isAdmin, UserController.UserByName); // 9 USER BY USERNAME xd

// ORDERS
router.get('/order/', authentication, isAdmin, UserController.UsersOrdersAll); // 10 1.5 ALL A USER ORDERS xd
router.get('/order/email=:email', authentication, isAdmin, UserController.OrderByEmail); //11 3 ORDER BY USER EMAIL xd
router.get('/order/orderDate=:id', authentication, isAdmin, UserController.UserByOrderDates); //12 4 ORDER BY ORDER DATE ¿?
router.get('/order/id=:id', authentication, isAdmin, UserController.UsersOrdersByUserId); //13 8 A USER ORDERS BY USER ID todos los datos, usuario, pedido y peliculas por pedido
  

module.exports = router;
