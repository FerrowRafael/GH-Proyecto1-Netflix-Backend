const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', authentication, UserController.logout); 
router.get('/info', authentication, UserController.getInfo); //*Arreglar
router.put('=:id', UserController.UserModified);
router.delete('=:id', UserController.UserDelete);

// Search
router.get('/', UserController.UsersAll);
router.get('=:id', UserController.UsersById);
router.get('/user=:username', UserController.UsersByName);


module.exports = router;
