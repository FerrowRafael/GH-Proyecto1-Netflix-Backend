const express = require('express');
const router = express.Router();
const OrderController =require('../controllers/OrderController');
const { authentication, isAdmin } =require('../middleware/authentication')


router.get('/info/all', authentication, isAdmin, OrderController.OrdersAll); //1 ALL ORDERS **Añadir lo de isAdmin
router.post('/order', authentication, OrderController.OrderCreate); //5 ORDER CREATE xs
router.put('/order/id=:id', authentication, isAdmin, OrderController.OrderModify); //6 ORDER MODIFY xd
router.delete('/order/id=:id', authentication, isAdmin, OrderController.OrderDelete); //7 ORDER DELETE xd

router.get('/order/id=:id', authentication, isAdmin, OrderController.OrderById); //2 ORDER BY ORDER ID xd
router.get('/order/user=:id', authentication, isAdmin, OrderController.OrdersByUserId); //8.5 ORDERS BY USER ID xd (Hay otra version mejor en USERS)

router.get('/user', authentication, OrderController.OrdersUser);
module.exports = router;