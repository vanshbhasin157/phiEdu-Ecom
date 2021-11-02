const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();

router.post('/signup',userControllers.userRegister);
router.post('/login',userControllers.userLogin);

module.exports = router