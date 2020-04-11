const express = require('express');
const router = express.Router();
const UserController =require('../controllers/UserController');
const { authentication } =require('../middleware/authentication')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', authentication, UserController.logout); //*Arreglar
router.get('/info', authentication, UserController.getInfo); //*Arreglar
router.get('/', UserController.getUsersAll);
router.get('/:id', UserController.getUsersById);
router.get('/user/:firstname', UserController.getUsersByName);
router.put('/:id', UserController.modifiedUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
