const express = require('express');
const router = express.Router();
const OrderController =require('../controllers/OrderController');



router.get('/', OrderController.OrdersAll); //1 ALL ORDERS 
router.post('/order', OrderController.OrderCreate); //5 ORDER CREATE
router.put('/order=:id', OrderController.OrderModify); //6 ORDER MODIFY
router.delete('/order=:id', OrderController.OrderDelete); //7 ORDER DELETE

router.get('/order=:id', OrderController.OrderById); //2 ORDER BY ORDER ID
router.get('/order/user=:id', OrderController.OrdersByUserId); //8.5 ORDERS BY USER ID (Hay otra version mejor en USERS)



module.exports = router;