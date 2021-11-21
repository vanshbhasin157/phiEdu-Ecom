const express = require('express');
const productCategoryController = require('../controllers/productCategoryController');
const router = express.Router();
const auth = require('../middleware/checkAuth')

router.post('/addCategory',productCategoryController.createProductCategory);
router.get('/getAll',productCategoryController.getAllCategories);

module.exports = router