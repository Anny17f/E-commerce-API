const express = require('express');
const router = express.Router();
const { addProduct, 
        editProduct, 
        deleteProduct, 
        getProducts 
    } = require('../controllers/adminController');
    
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/products', authMiddleware('admin'), addProduct);
router.put('/products/:id', authMiddleware('admin'), editProduct);
router.delete('/products/:id', authMiddleware('admin'), deleteProduct);
router.get('/products', authMiddleware('admin'), getProducts);

module.exports = router;
