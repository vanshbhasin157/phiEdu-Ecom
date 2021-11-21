const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/checkAuth')
router.post('/signup',userControllers.userRegister);
router.post('/login',userControllers.userLogin);
router.post('/address',userControllers.addAddress);
router.get('/profile/:userId',auth.checkAuth,userControllers.getUserProfile);

module.exports = router