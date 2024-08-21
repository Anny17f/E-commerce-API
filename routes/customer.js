const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct } = require('../controllers/customerController');

router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);

module.exports = router;
