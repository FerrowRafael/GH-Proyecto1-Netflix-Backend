const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', authentication, UserController.logout); 
router.get('/info', authentication, UserController.getInfo); //*Arreglar
router.put('/user=:id', UserController.UserModified);
router.delete('/user=:id', UserController.UserDelete);

// SEARCH
router.get('/', UserController.UsersAll);
router.get('/user=:id', UserController.UserById);
router.get('/user/username=:username', UserController.UserByName);


// ORDERS
router.get('/order/', UserController.UsersOrdersAll); //8 ALL A USERs ORDERS
router.get('/order=:id', UserController.UsersOrdersById); // A USER ORDERS BY USER ID todos los datos, usuario, pedido y peliculas por pedido
router.get('/orderDate=:id', UserController.UserOrderDates); //4 ORDER BY ORDER DATE ¿?
router.get('/email=:email', UserController.OrderByEmail); //3 ORDER BY USER EMAIL



module.exports = router;
