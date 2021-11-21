const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const auth = require('../middleware/checkAuth')

router.post('/addProduct',productController.addNewProduct);
router.get('/getAll',productController.getAllProducts);
router.get('getProduct/:id',productController.getProductById);

module.exports = router